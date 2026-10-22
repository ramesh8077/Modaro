// Preloader settings. mode "scene" = 3D particle entrance (needs `npm i three`); it falls back to the CSS panel entrance if WebGL is unavailable.
export const introConfig = {
  enabled: true,
  mode: "scene",           // "scene" | "panels"
  // Show once per tab session; ?intro=replay previews the full entrance again.
  storageKey: "modaro-intro-v3",
  // colours
  sceneBg: "radial-gradient(ellipse at 50% 45%, #1F4B3F 0%, #183B32 45%, #10291F 100%)",
  panel: "#183B32", panelEdge: "#10291F", ink: "#F5F1E8", accent: "#B69A68",
  // 3D scene
  particles: { desktop: 9000, mobile: 5000 },
  formMs: 1800,            // particles gather into the wordmark
  holdMs: 400,             // short pause on the finished wordmark
  flyMs: 1300,             // camera flies through to the website
  // CSS panel fallback
  perspective: 1400, perspectiveMobile: 900, rotation: 58, rotationMobile: 22, openMs: 850, readyBeatMs: 700,
  minMs: 0,
  maxMs: 5000,             // hard cap from app start, INCLUDING the exit
  fontMs: 800,
  logoSrc: "", wordmark: "MODARO", descriptor: "THE LUXURY STAY",
};
