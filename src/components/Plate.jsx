import { useState } from "react";

const TONES = { forest: ["#1E4A3E", "#112D25"], olive: ["#6A7156", "#454C37"], sand: ["#E9E1CE", "#D6CBB1"], charcoal: ["#363B36", "#1F231F"] };
const L = { vectorEffect: "non-scaling-stroke" };
const ART = {
  arch: <>{[0, 7, 14].map((k) => <path key={k} {...L} d={`M${18 + k} 125 V${58 + k * 0.4} a${32 - k} ${32 - k} 0 0 1 ${64 - 2 * k} 0 V125`} />)}</>,
  lines: <>{[...Array(7)].map((_, i) => <path key={i} {...L} d={`M0 ${28 + i * 13} q12.5 -4 25 0 t25 0 t25 0 t25 0`} />)}</>,
  rings: <>{[18, 30, 42].map((r) => <circle key={r} {...L} cx="70" cy="38" r={r} />)}<circle {...L} cx="20" cy="104" r="12" /></>,
  frame: <><rect {...L} x="10" y="10" width="80" height="105" /><rect {...L} x="18" y="18" width="64" height="89" /><path {...L} d="M10 115 L90 10" /></>,
};

// Photo when `src` exists; otherwise a designed abstract plate (tone + fine brass line-work). Never shows placeholder text.
export default function Plate({ img, className = "", eager = false, ...rest }) {
  const [bad, setBad] = useState(false);
  if (img?.src && !bad)
    return <img src={img.src} alt={img.alt} width={img.w} height={img.h} decoding="async" loading={eager ? "eager" : "lazy"} onError={() => setBad(true)} style={{ objectPosition: img.focus }} className={`object-cover ${className}`} {...rest} />;
  const [a, b] = TONES[img?.tone] || TONES.forest;
  return (
    <div aria-hidden="true" className={`relative overflow-hidden ${className}`} style={{ background: `linear-gradient(160deg, ${a}, ${b})` }} {...rest}>
      <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" fill="none" stroke="#B69A68" strokeWidth="1" strokeOpacity=".4">{ART[img?.variant] || ART.arch}</svg>
      <span className="absolute inset-0" style={{ background: "radial-gradient(circle at 28% 18%, rgba(245,241,232,.16), transparent 55%)" }} />
    </div>
  );
}
