import gsap from "gsap";
import { introConfig as c } from "./introConfig";

// 3D "arrival" scene (three.js, loaded on demand so it never delays the app's first load):
// brass light-motes gather out of depth into the MODARO wordmark, then the camera flies forward through
// fine architectural frames while the particles scatter, revealing the real page. Driven by GSAP's single ticker.
const VERT = `
uniform float uForm, uFly, uTime, uSize, uPR;
attribute vec3 aTarget; attribute vec4 aRand;
varying float vMix, vA;
void main(){
  float t = clamp((uForm - aRand.x * 0.45) / 0.55, 0.0, 1.0);
  float p = t * t * (3.0 - 2.0 * t);
  vec3 pos = mix(position, aTarget, p);
  float w = (1.0 - p) * 0.5 + 0.02;
  pos += vec3(sin(uTime*0.8 + aRand.w*6.283), cos(uTime*0.7 + aRand.w*5.1), sin(uTime*0.6 + aRand.w*3.7)) * w;
  vec2 dir = pos.xy; float r = length(dir) + 0.001;
  pos.xy += dir / r * uFly * (2.0 + aRand.y * 6.0) * (0.4 + r * 0.1);
  pos.z += uFly * 6.0 * aRand.z;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * uPR * (0.55 + aRand.y * 0.9) / max(0.2, -mv.z);
  gl_Position = projectionMatrix * mv;
  vMix = aRand.z;
  vA = (0.3 + 0.7 * p) * (1.0 - smoothstep(0.6, 1.0, uFly));
}`;
const FRAG = `
precision mediump float;
uniform vec3 uA, uB; varying float vMix, vA;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = 1.0 - smoothstep(0.0, 0.5, d); a *= a;
  gl_FragColor = vec4(mix(uB, uA, vMix * 0.7), a * vA);
}`;
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

// Sample the wordmark's pixels (drawn with the site's display font) into target positions.
function sampleText(text, n, wWorld) {
  const W = 1800, H = 420, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const g = cv.getContext("2d"), size = 250, gap = size * 0.3;
  g.font = `500 ${size}px "Cormorant Garamond", Georgia, serif`; g.fillStyle = g.strokeStyle = "#fff"; g.lineWidth = 5;
  const letters = [...text], widths = letters.map((l) => g.measureText(l).width);
  let x = (W - (widths.reduce((a, b) => a + b, 0) + gap * (letters.length - 1))) / 2; const y = H / 2 + size * 0.33;
  letters.forEach((l, i) => { g.fillText(l, x, y); g.strokeText(l, x, y); x += widths[i] + gap; });
  const d = g.getImageData(0, 0, W, H).data, cand = [];
  let x0 = W, x1 = 0, y0 = H, y1 = 0;
  for (let py = 0; py < H; py += 2) for (let px = 0; px < W; px += 2) if (d[(py * W + px) * 4 + 3] > 128) { cand.push(px, py); x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py); }
  const s = wWorld / Math.max(1, x1 - x0), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, m = Math.max(1, cand.length / 2), out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const k = ((Math.random() * m) | 0) * 2; out[i * 3] = (cand[k] - cx) * s; out[i * 3 + 1] = -(cand[k + 1] - cy) * s; out[i * 3 + 2] = (Math.random() - 0.5) * 0.12; }
  return { out, hWorld: (y1 - y0) * s };
}

export async function createSceneStage({ canvas, bg, desc, signal }) {
  const THREE = await import("three"); // fails -> caller falls back to the CSS panel entrance
  signal?.throwIfAborted();
  try { await Promise.race([document.fonts?.load('500 200px "Cormorant Garamond"'), new Promise((r) => setTimeout(r, c.fontMs))]); } catch { /* fall back to Georgia */ }
  // StrictMode may cancel an earlier setup while imports/fonts load. Never let
  // that abandoned setup create or dispose a renderer on the active canvas.
  signal?.throwIfAborted();
  const small = window.innerWidth < 768, N = small ? c.particles.mobile : c.particles.desktop;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  const pr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pr); renderer.setSize(window.innerWidth, window.innerHeight, false); renderer.setClearColor(0x000000, 0);
  const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 80), scene = new THREE.Scene();
  const CAM_START = 9, CAM_END = 7.6, REF = 8, vh = 2 * Math.tan((45 * Math.PI) / 360) * REF, aspect = window.innerWidth / window.innerHeight;
  const wWorld = vh * aspect * (aspect < 1 ? 0.84 : 0.58);

  const { out, hWorld } = sampleText(c.wordmark, N, wWorld);
  const start = new Float32Array(N * 3), rnd = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    start.set([(Math.random() - 0.5) * 32, (Math.random() - 0.5) * 18, -24 + Math.random() * 28], i * 3);
    rnd.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(start, 3)); geo.setAttribute("aTarget", new THREE.BufferAttribute(out, 3)); geo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 4));
  const u = { uForm: { value: 0 }, uFly: { value: 0 }, uTime: { value: 0 }, uSize: { value: 26 }, uPR: { value: pr }, uA: { value: new THREE.Vector3(...rgb(c.accent)) }, uB: { value: new THREE.Vector3(...rgb(c.ink)) } };
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  scene.add(new THREE.Points(geo, mat));
  const frames = [];
  for (let i = 0; i < 6; i++) {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-9, -5.2, 0), new THREE.Vector3(9, -5.2, 0), new THREE.Vector3(9, 5.2, 0), new THREE.Vector3(-9, 5.2, 0)]);
    const l = new THREE.LineLoop(g, new THREE.LineBasicMaterial({ color: c.accent, transparent: true, opacity: 0.22 })); l.position.z = -3 - i * 5; scene.add(l); frames.push(l);
  }
  const st = { form: 0, fly: 0, camZ: CAM_START }; let px = 0, py = 0, tx = 0, ty = 0;
  const onMove = (e) => { if (e.pointerType === "touch") return; tx = (e.clientX / window.innerWidth - 0.5) * 0.9; ty = -(e.clientY / window.innerHeight - 0.5) * 0.6; };
  const onResize = () => { renderer.setSize(window.innerWidth, window.innerHeight, false); cam.aspect = window.innerWidth / window.innerHeight; cam.updateProjectionMatrix(); };
  window.addEventListener("pointermove", onMove, { passive: true }); window.addEventListener("resize", onResize);
  const tick = (time) => {
    u.uTime.value = time; u.uForm.value = st.form; u.uFly.value = st.fly;
    px += (tx - px) * 0.05; py += (ty - py) * 0.05;
    cam.position.set(px, py, st.camZ); cam.lookAt(0, 0, st.camZ - 10);
    renderer.render(scene, cam);
  };
  gsap.ticker.add(tick); tick(0);
  // descriptor sits just under the particle wordmark
  desc.style.top = `calc(50% + ${(hWorld / 2) * (window.innerHeight / vh) + 28}px)`;

  let dead = false;
  return {
    form() {
      const t = c.formMs / 1000;
      gsap.to(st, { form: 1, duration: t, ease: "power2.inOut" });
      gsap.to(st, { camZ: CAM_END, duration: t + c.holdMs / 1000, ease: "none" });
      gsap.fromTo(desc, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: t * 0.6, ease: "power3.out" });
    },
    fly(done) {
      const t = c.flyMs / 1000;
      gsap.killTweensOf(st, "camZ,form");
      return gsap.timeline({ onComplete: done })
        .to(desc, { autoAlpha: 0, duration: 0.25 }, 0)
        .to(st, { fly: 1, duration: t, ease: "power2.in" }, 0)
        .to(st, { camZ: -26, duration: t, ease: "power3.in" }, 0)
        .to(bg, { autoAlpha: 0, duration: t * 0.4, ease: "none" }, t * 0.5)
        .to(canvas, { autoAlpha: 0, duration: t * 0.25, ease: "none" }, t * 0.75);
    },
    kill() {
      if (dead) return; dead = true;
      gsap.ticker.remove(tick); gsap.killTweensOf([st, desc, bg, canvas]);
      window.removeEventListener("pointermove", onMove); window.removeEventListener("resize", onResize);
      geo.dispose(); mat.dispose(); frames.forEach((l) => { l.geometry.dispose(); l.material.dispose(); });
      renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
