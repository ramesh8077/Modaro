// TrustStrip — Inspired by LuxuryEscapes trust signals + Roseate award badges
// Displays a scrolling marquee of stats, awards & credentials

const items = [
  { icon: "🛏️", value: "3 Bedrooms", label: "Room to rest" },
  { icon: "👥", value: "6 Guests + kids", label: "Guest capacity" },
  { icon: "🏊", value: "Plunge Pool", label: "Poolside Living" },
  { icon: "🏓", value: "Pickleball Court", label: "Play together" },
  { icon: "🍸", value: "Live Bar", label: "By the poolside" },
  { icon: "🔥", value: "Bonfire Lawn", label: "Evenings outdoors" },
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
      aria-label="Villa Modaro highlights"
      className="overflow-hidden border-y border-charcoal/10 bg-ivory py-4"
    >
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <TrustItem key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
