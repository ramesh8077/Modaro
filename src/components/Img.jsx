import { useState } from "react";
export default function Img({ img, className = "", eager = false, ...rest }) {
  const [bad, setBad] = useState(false);
  if (!img?.src || bad)
    return (
      <div role="img" aria-label={img?.alt} {...rest} className={`${className} grid place-items-center bg-olive/35 px-4 text-center text-xs tracking-widest text-charcoal/60`}>
        Photo to come
      </div>
    );
  return (
    <img src={img.src} alt={img.alt} width={img.w} height={img.h} decoding="async"
      loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined}
      onError={() => setBad(true)} style={{ objectPosition: img.focus }} className={`object-cover ${className}`} {...rest} />
  );
}
