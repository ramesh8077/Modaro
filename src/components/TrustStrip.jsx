// TrustStrip — Inspired by LuxuryEscapes trust signals + Roseate award badges
// Displays a scrolling marquee of stats, awards & credentials

const items = [
  { icon: "★", value: "4.9/5", label: "Guest Rating" },
  { icon: "🏆", value: "Award-Winning", label: "Private Retreat" },
  { icon: "🌿", value: "Mohand Forest", label: "Doorstep Nature" },
  { icon: "👥", value: "500+", label: "Celebrations Hosted" },
  { icon: "🔒", value: "Exclusively Private", label: "Never Shared" },
  { icon: "🛏️", value: "4 Luxury", label: "Bedrooms" },
  { icon: "🏊", value: "Infinity Pool", label: "Poolside Living" },
  { icon: "✨", value: "Bespoke", label: "Guest Experience" },
];

function TrustItem({ icon, value, label }) {
  return (
    <div className="flex shrink-0 items-center gap-5 px-8">
      <span className="text-xl" aria-hidden="true">{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-lg font-medium text-forest">{value}</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-olive">{label}</span>
      </div>
      {/* Gold ornamental divider */}
      <span
        aria-hidden="true"
        className="ml-4 h-6 w-px bg-gradient-to-b from-transparent via-brass to-transparent opacity-50"
      />
    </div>
  );
}

export default function TrustStrip() {
  // Duplicate items for seamless infinite loop
  const allItems = [...items, ...items];
  return (
    <section
      aria-label="Awards and credentials"
      className="overflow-hidden border-y border-charcoal/10 bg-[#f0ece0] py-4"
    >
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <TrustItem key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
