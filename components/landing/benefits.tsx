import { Zap, ListChecks, Clock } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: "Faster Deal Filtering",
      description: "Know within seconds if a deal deserves deeper analysis. Stop wasting hours on leads that were never viable.",
    },
    {
      icon: ListChecks,
      title: "Structured Decision Framework",
      description: "Never miss critical signals during seller conversations. The Four Gate Framework ensures consistency every time.",
    },
    {
      icon: Clock,
      title: "Better Time Allocation",
      description: "Focus your time on deals with real potential. Let the system handle the initial qualification.",
    },
  ];

  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">BENEFITS</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Work smarter, not harder
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Reclaim the hours you&apos;ve been losing to bad leads.
          </p>
        </div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-background border border-border rounded-xl text-center"
            >
              <div className="p-4 bg-muted rounded-xl w-fit mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
