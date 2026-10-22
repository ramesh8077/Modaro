import { useEffect, useRef, useState } from "react";
import { cursorConfig as c } from "../lib/cursorConfig";

const NATIVE =
  'input,textarea,select,[contenteditable=""],[contenteditable="true"],dialog[open],[data-cursor="native"]';

const INTERACTIVE =
  'a[href],button:not(:disabled),[role="tab"],[role="button"],summary,label,[tabindex]:not([tabindex="-1"]),[data-cursor-magnetic]';

function classify(target) {
  if (!(target instanceof Element)) {
    return { mode: "default", magneticElement: null };
  }

  if (target.closest(NATIVE)) {
    return { mode: "native", magneticElement: null };
  }

  const magneticElement = target.closest(
    `${INTERACTIVE},[data-cursor]`
  );
  const cursorElement = target.closest("[data-cursor]");
  const label = cursorElement
    ? c.labels[cursorElement.dataset.cursor]
    : null;

  if (label) {
    return { mode: "label", label, magneticElement };
  }

  return {
    mode: target.closest(INTERACTIVE) ? "link" : "default",
    magneticElement,
  };
}

function Overlay() {
  const root = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);
  const trail = useRef([]);
  const burst = useRef([]);
  const pulse = useRef(null);

  const trailCount = c.trail ? c.trailCount : 0;
  const burstCount = c.clickBurst ? c.clickBurstParticleCount : 0;

  useEffect(() => {
    const html = document.documentElement;
    const s = {
      px: 0,
      py: 0,
      x: 0,
      y: 0,
      targetX: null,
      targetY: null,
      magneticElement: null,
      magneticRect: null,
      op: 0,
      scale: 1,
      vx: 0,
      vy: 0,
      rawVx: 0,
      rawVy: 0,
      angle: 0,
      energy: 0,
      has: false,
      shown: false,
      snap: true,
      mode: "default",
      pressed: false,
      selecting: false,
      last: null,
      pointerTime: 0,
      lastMove: 0,
      clickCount: 0,
      pulseX: 0,
      pulseY: 0,
      pulseAge: Infinity,
      pulseDuration: c.clickBurstDuration,
      raf: 0,
      t: 0,
      tr: Array.from({ length: trailCount }, () => ({
        x: 0,
        y: 0,
        o: 0,
      })),
      bursts: Array.from({ length: burstCount }, () => ({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        age: Infinity,
        duration: c.clickBurstDuration,
      })),
    };

    const refreshMagneticRect = () => {
      s.magneticRect =
        s.magneticElement?.isConnected
          ? s.magneticElement.getBoundingClientRect()
          : null;
    };

    const getMagneticTarget = () => {
      if (
        !c.magnetic ||
        (s.mode !== "link" && s.mode !== "label") ||
        !s.magneticRect
      ) {
        s.targetX = null;
        s.targetY = null;
        return;
      }

      const centerX =
        s.magneticRect.left + s.magneticRect.width / 2;
      const centerY =
        s.magneticRect.top + s.magneticRect.height / 2;
      const distance = Math.hypot(
        s.px - centerX,
        s.py - centerY
      );

      if (distance <= c.magneticDistance) {
        s.targetX =
          s.px + (centerX - s.px) * c.magneticStrength;
        s.targetY =
          s.py + (centerY - s.py) * c.magneticStrength;
      } else {
        s.targetX = null;
        s.targetY = null;
      }
    };

    const tick = (now) => {
      if (!root.current || !dot.current) {
        s.raf = 0;
        return;
      }

      const dt = Math.min((now - (s.t || now)) / 1000, 0.1);
      s.t = now;
      const k = (speed) => 1 - Math.exp(-speed * dt);

      if (s.snap) {
        s.x = s.px;
        s.y = s.py;
        s.tr.forEach((particle) => {
          particle.x = s.px;
          particle.y = s.py;
        });
        s.snap = false;
      }

      getMagneticTarget();

      const targetX = s.targetX ?? s.px;
      const targetY = s.targetY ?? s.py;
      s.x += (targetX - s.x) * k(c.follow);
      s.y += (targetY - s.y) * k(c.follow);

      s.vx += (s.rawVx - s.vx) * k(12);
      s.vy += (s.rawVy - s.vy) * k(12);
      const velocity = Math.hypot(s.vx, s.vy) * 1000;
      s.energy = Math.min(velocity / c.velocitySensitivity, 1);
      if (velocity > 1) {
        s.angle = Math.atan2(s.vy, s.vx);
      }

      const show =
        s.shown &&
        s.mode !== "native" &&
        !s.selecting;
      const interactive =
        s.mode === "link" || s.mode === "label";
      const targetScale = s.pressed
        ? c.pressScale
        : s.mode === "label"
          ? 1.04
          : s.mode === "link"
            ? 1.08
            : 1;
      s.scale += (targetScale - s.scale) * k(18);
      s.op += ((show ? 1 : 0) - s.op) * k(16);

      const stretch = 1 + s.energy * c.velocityStretch;
      const compress = 1 - s.energy * 0.2;
      const glow = c.glow + s.energy * c.velocityGlow + (interactive ? 4 : 0);
      const brightness =
        1 + s.energy * 0.18 + (interactive ? 0.12 : 0);

      // The core stretches along its travel direction and brightens with speed.
      dot.current.style.transform = `
        translate3d(${s.x - c.dot / 2}px, ${s.y - c.dot / 2}px, 0)
        rotate(${s.angle}rad)
        scale(${s.scale * stretch}, ${s.scale * compress})
      `;
      dot.current.style.filter =
        `brightness(${brightness}) drop-shadow(0 0 ${glow}px rgba(182, 154, 104, .72))`;

      const sinceMove = now - s.lastMove;
      const trailFade = Math.max(
        0,
        1 - sinceMove / c.trailFadeMs
      );
      let busy = false;

      // Each pooled particle has its own lag, size, and opacity for a fluid tail.
      s.tr.forEach((particle, i) => {
        const speed = c.trailSpeeds[i] ?? c.trailSpeeds.at(-1);
        particle.x += (s.px - particle.x) * k(speed);
        particle.y += (s.py - particle.y) * k(speed);

        const energyOpacity = 0.2 + s.energy * 0.8;
        const hoverBoost = interactive ? 1.12 : 1;
        const baseOpacity =
          show && sinceMove < c.trailFadeMs
            ? c.trailOpacity *
              Math.pow(c.trailFade, i) *
              energyOpacity *
              hoverBoost *
              trailFade
            : 0;
        particle.o += (baseOpacity - particle.o) * k(13);

        const element = trail.current[i];
        if (!element) return;
        const stretchX = 1 + s.energy * 1.15;
        const stretchY = 1 - s.energy * 0.12;
        element.style.transform = `
          translate3d(${particle.x}px, ${particle.y}px, 0)
          rotate(${s.angle}rad)
          scale(${stretchX}, ${stretchY})
        `;
        element.style.opacity = particle.o.toFixed(3);

        if (
          Math.abs(s.px - particle.x) > 0.1 ||
          Math.abs(s.py - particle.y) > 0.1 ||
          particle.o > 0.003
        ) {
          busy = true;
        }
      });

      // Reuse the same burst elements for every click rather than mounting nodes.
      s.bursts.forEach((particle, i) => {
        const element = burst.current[i];
        if (!element) return;

        if (particle.age >= particle.duration) {
          element.style.opacity = "0";
          return;
        }

        particle.age += dt * 1000;
        const progress = Math.min(particle.age / particle.duration, 1);
        const travel = 1 - (1 - progress) ** 2;
        const x = particle.x + particle.vx * particle.duration * travel;
        const y = particle.y + particle.vy * particle.duration * travel;
        const scale = 0.14 + (1 - progress) * 0.86;
        element.style.transform =
          `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        element.style.opacity =
          ((1 - progress) ** 1.5 * 0.82).toFixed(3);
        busy = true;
      });

      if (pulse.current) {
        if (s.pulseAge < s.pulseDuration) {
          s.pulseAge += dt * 1000;
          const progress = Math.min(
            s.pulseAge / s.pulseDuration,
            1
          );
          pulse.current.style.transform = `
            translate3d(${s.pulseX}px, ${s.pulseY}px, 0)
            scale(${0.2 + progress * 2.5})
          `;
          pulse.current.style.opacity =
            ((1 - progress) ** 1.4 * 0.62).toFixed(3);
          busy = true;
        } else {
          pulse.current.style.opacity = "0";
        }
      }

      root.current.style.opacity = s.op.toFixed(3);
      root.current.style.setProperty(
        "--mc-energy",
        s.energy.toFixed(3)
      );

      const settled =
        !busy &&
        now - s.lastMove >= c.trailFadeMs &&
        Math.abs(s.px - s.x) < 0.1 &&
        Math.abs(s.py - s.y) < 0.1 &&
        Math.abs(targetScale - s.scale) < 0.003 &&
        Math.abs(s.energy) < 0.002 &&
        Math.abs((show ? 1 : 0) - s.op) < 0.003;

      s.raf = settled ? 0 : requestAnimationFrame(tick);
      if (settled) s.t = 0;
    };

    const kick = () => {
      if (!s.raf) {
        s.raf = requestAnimationFrame(tick);
      }
    };

    const apply = (result) => {
      s.mode = result.mode;
      s.magneticElement = result.magneticElement;
      refreshMagneticRect();
      root.current.dataset.state = result.mode;
      label.current.textContent = result.label ?? "";
      kick();
    };

    const hide = () => {
      s.shown = false;
      s.pressed = false;
      s.rawVx = 0;
      s.rawVy = 0;
      kick();
    };

    const release = () => {
      s.pressed = false;
      if (s.selecting) {
        s.selecting = false;
        html.classList.remove("is-selecting");
      }
      kick();
    };

    const onMove = (event) => {
      if (event.pointerType === "touch") return;

      const now = performance.now();
      if (s.pointerTime) {
        const elapsed = Math.max(now - s.pointerTime, 1);
        s.rawVx = Math.max(
          -2.5,
          Math.min(2.5, (event.clientX - s.px) / elapsed)
        );
        s.rawVy = Math.max(
          -2.5,
          Math.min(2.5, (event.clientY - s.py) / elapsed)
        );
      }
      s.pointerTime = now;
      s.px = event.clientX;
      s.py = event.clientY;
      s.lastMove = now;

      if (!s.has) {
        s.has = true;
        html.classList.add("has-custom-cursor");
      }

      if (!s.shown) {
        s.shown = true;
        s.snap = true;
      }

      if (event.target !== s.last) {
        s.last = event.target;
        apply(classify(event.target));
      }

      kick();
    };

    const onDown = (event) => {
      if (event.button !== 0 || event.pointerType === "touch") return;
      s.pressed = true;
      s.px = event.clientX;
      s.py = event.clientY;

      if (c.clickBurst) {
        s.clickCount += 1;
        s.pulseX = event.clientX - 17;
        s.pulseY = event.clientY - 17;
        s.pulseAge = 0;
        s.pulseDuration = c.clickBurstDuration;

        s.bursts.forEach((particle, i) => {
          const angle =
            (i / Math.max(burstCount, 1)) * Math.PI * 2 +
            s.clickCount * 0.17;
          const speed = 0.11 + (i % 3) * 0.045;
          particle.x = event.clientX;
          particle.y = event.clientY;
          particle.vx = Math.cos(angle) * speed;
          particle.vy = Math.sin(angle) * speed;
          particle.duration =
            c.clickBurstDuration * (0.86 + (i % 4) * 0.09);
          particle.age = 0;
        });
      }

      kick();
    };

    const onSelectionChange = () => {
      const selection = getSelection();
      const selecting =
        s.pressed && selection && !selection.isCollapsed;

      if (selecting !== s.selecting) {
        s.selecting = selecting;
        html.classList.toggle("is-selecting", selecting);
        kick();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) hide();
    };

    const onScrollOrResize = () => {
      refreshMagneticRect();
      kick();
    };

    const onClick = () => {
      s.last = null;
    };

    const d = document;
    const w = window;
    d.addEventListener("pointermove", onMove, { passive: true });
    d.addEventListener("pointerdown", onDown, { passive: true });
    ["pointerup", "pointercancel", "dragend"].forEach((event) => {
      d.addEventListener(event, release);
    });
    d.addEventListener("selectionchange", onSelectionChange);
    d.addEventListener("visibilitychange", onVisibilityChange);
    d.addEventListener("click", onClick);
    d.addEventListener("scroll", onScrollOrResize, true);
    w.addEventListener("resize", onScrollOrResize);
    html.addEventListener("pointerleave", hide);
    w.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(s.raf);
      d.removeEventListener("pointermove", onMove);
      d.removeEventListener("pointerdown", onDown);
      ["pointerup", "pointercancel", "dragend"].forEach((event) => {
        d.removeEventListener(event, release);
      });
      d.removeEventListener("selectionchange", onSelectionChange);
      d.removeEventListener("visibilitychange", onVisibilityChange);
      d.removeEventListener("click", onClick);
      d.removeEventListener("scroll", onScrollOrResize, true);
      w.removeEventListener("resize", onScrollOrResize);
      html.removeEventListener("pointerleave", hide);
      w.removeEventListener("blur", hide);
      html.classList.remove("has-custom-cursor", "is-selecting");
    };
  }, [burstCount, trailCount]);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="mc"
      data-state="default"
      style={{
        "--mc-accent": c.accent,
        "--mc-glow": `${c.glow}px`,
      }}
    >
      {Array.from({ length: trailCount }, (_, i) => {
        const size = c.trailSize * Math.pow(0.88, i);
        return (
          <span
            key={`trail-${i}`}
            ref={(element) => {
              trail.current[i] = element;
            }}
            className="mc-trail"
            style={{
              width: size * 1.5,
              height: size * 0.72,
              filter: `blur(${0.35 + i * 0.42}px)`,
            }}
          />
        );
      })}

      {Array.from({ length: burstCount }, (_, i) => (
        <span
          key={`burst-${i}`}
          ref={(element) => {
            burst.current[i] = element;
          }}
          className="mc-burst-particle"
          style={{
            width: 2 + (i % 3) * 0.7,
            height: 2 + (i % 3) * 0.7,
          }}
        />
      ))}

      <span ref={pulse} className="mc-pulse" />

      <div
        ref={dot}
        className="mc-dot"
        style={{
          width: c.dot,
          height: c.dot,
        }}
      />

      <span ref={label} className="mc-label" />
    </div>
  );
}

export default function Cursor() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!c.enabled) return undefined;

    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOn(fine.matches && !calm.matches);

    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);

    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  return on ? <Overlay /> : null;
}
