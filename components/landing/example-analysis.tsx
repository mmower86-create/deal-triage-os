import { Zap, TrendingUp, HelpCircle, Clock } from "lucide-react";
import { TriageOutput } from "./triage-output";

export function ExampleAnalysis() {
  const leadSummary = {
    beds: 3,
    baths: 2,
    situation: "Seller relocating in 30 days",
    asking: "$175k",
    arv: "$260k",
  };

  const signals = [
    { label: "Motivation", value: "High", icon: Zap, color: "text-accent" },
    { label: "Price Alignment", value: "Moderate", icon: TrendingUp, color: "text-warning" },
    { label: "Property Condition", value: "Unknown", icon: HelpCircle, color: "text-muted-foreground" },
    { label: "Timeline", value: "Urgent (30 days)", icon: Clock, color: "text-accent" },
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">EXAMPLE</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Example Deal Triage
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            See what the analysis output looks like.
          </p>
        </div>

        {/* Example card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Lead summary */}
              <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border">
                <h3 className="text-xs font-mono text-muted-foreground mb-4">LEAD SUMMARY</h3>
                <div className="space-y-3 mb-8">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">{leadSummary.beds} bed / {leadSummary.baths} bath</span>
                  </p>
                  <p className="text-foreground">{leadSummary.situation}</p>
                  <p className="text-foreground">
                    Asking <span className="font-semibold">{leadSummary.asking}</span>
                  </p>
                  <p className="text-foreground">
                    Estimated ARV <span className="font-semibold">{leadSummary.arv}</span>
                  </p>
                </div>

                <h3 className="text-xs font-mono text-muted-foreground mb-4">SIGNALS</h3>
                <div className="space-y-2">
                  {signals.map((signal, index) => (
                    <div key={index} className="flex items-center justify-between bg-background border border-border rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <signal.icon className={`w-4 h-4 ${signal.color}`} />
                        <span className="text-sm text-muted-foreground">{signal.label}</span>
                      </div>
                      <span className={`text-sm font-medium ${signal.color}`}>{signal.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Verdict */}
              <div className="p-6 md:p-8 bg-muted/20 flex flex-col justify-center">
                <TriageOutput
                  verdict="CHASE"
                  healthScore={4}
                  requiredAction="Verify property condition. If acceptable, pursue immediately."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
