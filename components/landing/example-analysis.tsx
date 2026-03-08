import { Zap, Calendar, Target, Users, DollarSign, Home, Handshake } from "lucide-react";

export function ExampleAnalysis() {
  const leadDetails = [
    "Inherited property",
    "Seller lives out of state",
    "Property vacant",
    "Wants to sell within 30 days",
  ];

  const signals = [
    { label: "Timeline", value: "30 days", icon: Calendar },
    { label: "Authority", value: "Sole heir", icon: Target },
    { label: "Decision Makers", value: "1", icon: Users },
    { label: "Payoff", value: "None", icon: DollarSign },
    { label: "Motivation", value: "High", icon: Zap },
    { label: "Occupancy", value: "Vacant", icon: Home },
    { label: "Cooperation", value: "Good", icon: Handshake },
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">EXAMPLE</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            See how a deal gets evaluated.
          </h2>
        </div>

        {/* Example card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Lead summary */}
              <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border">
                <h3 className="text-xs font-mono text-muted-foreground mb-4">LEAD SUMMARY</h3>
                <ul className="space-y-3 mb-8">
                  {leadDetails.map((detail, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xs font-mono text-muted-foreground mb-4">SIGNALS EXTRACTED</h3>
                <div className="space-y-2">
                  {signals.map((signal, index) => (
                    <div key={index} className="flex items-center justify-between bg-background border border-border rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <signal.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{signal.label}</span>
                      </div>
                      <span className="text-sm text-foreground font-medium">{signal.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Verdict */}
              <div className="p-6 md:p-8 bg-muted/30 flex flex-col justify-center">
                {/* Verdict */}
                <div className="mb-8">
                  <h3 className="text-xs font-mono text-muted-foreground mb-3">VERDICT</h3>
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-accent/20 border border-accent/30 rounded-xl">
                    <Zap className="w-8 h-8 text-accent" />
                    <span className="text-4xl font-bold text-accent">CHASE</span>
                  </div>
                </div>

                {/* Deal Health */}
                <div className="mb-8">
                  <h3 className="text-xs font-mono text-muted-foreground mb-3">DEAL HEALTH</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 h-8 rounded ${i <= 4 ? "bg-accent" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-foreground">4 / 5</span>
                  </div>
                </div>

                {/* Required Action */}
                <div>
                  <h3 className="text-xs font-mono text-muted-foreground mb-3">REQUIRED ACTION</h3>
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-foreground font-medium">
                      Schedule property walkthrough within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
