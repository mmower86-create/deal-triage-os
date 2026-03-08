export function Stats() {
  const stats = [
    { value: "25-50", label: "leads analyzed per week", description: "Average wholesaler volume" },
    { value: "30-50%", label: "structurally invalid", description: "Leads that were never viable" },
    { value: "5-10hrs", label: "wasted weekly", description: "On deals that can't close" },
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, index) => (
            <div key={index} className="py-8 md:py-0 md:px-8 first:pl-0 last:pr-0">
              <p className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">{stat.value}</p>
              <p className="mt-2 text-foreground font-medium">{stat.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
