export const cursorConfig = {
  enabled: true,
  accent: "#D5A43B",

  // Main brass core and its soft outer bloom.
  dot: 5,
  glow: 12,
  follow: 24,
  pressScale: 0.68,

  // Magnetic pull is intentionally restrained and limited to nearby targets.
  magnetic: true,
  magneticStrength: 0.14,
  magneticDistance: 110,

  // Ten individually lagged particles make up the comet tail.
  trail: true,
  trailCount: 10,
  trailSize: 10,
  trailSpeeds: [34, 28, 23, 19, 16, 13, 10, 8, 6, 4.5],
  trailFade: 0.84,
  trailFadeMs: 420,
  trailOpacity: 0.72,

  // Pointer speed drives both the core stretch and its added glow.
  velocitySensitivity: 1450,
  velocityStretch: 0.72,
  velocityGlow: 10,

  // Reused click particles and a diffuse light pulse.
  clickBurst: true,
  clickBurstParticleCount: 8,
  clickBurstDuration: 560,

  labels: {
    view: "View",
    explore: "Explore",
    drag: "Drag",
  },
};
