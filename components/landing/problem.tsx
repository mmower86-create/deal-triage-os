import { UserX, DollarSign, Clock } from "lucide-react";

export function Problem() {
  const problems = [
    {
      icon: UserX,
      title: "No real authority",
      description: "Sellers who are not actual decision makers, requiring approval from spouses, co-owners, or heirs who may never agree.",
    },
    {
      icon: DollarSign,
      title: "Unrealistic expectations",
      description: "Price expectations disconnected from reality. No amount of negotiation will bridge a $50k gap on a $150k property.",
    },
    {
      icon: Clock,
      title: "No timeline to sell",
      description: "No urgency, no deadline, no motivation. These leads will drag on for months and close never.",
    },
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-accent font-mono text-sm mb-3">THE PROBLEM</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight text-balance">
            Most investors waste time analyzing deals that were never real opportunities.
          </h2>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-6 bg-card border border-border rounded-xl"
            >
              <div className="p-3 bg-muted rounded-lg w-fit mb-4">
                <problem.icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-12 text-center">
          <p className="text-lg text-foreground font-medium">
            Deal Triage OS identifies these signals <span className="text-accent">instantly</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
