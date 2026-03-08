import { X, Check } from "lucide-react";

export function Comparison() {
  const traditional = [
    "30-60 minutes per lead",
    "Incomplete information",
    "Emotional decision making",
    "Inconsistent analysis",
  ];

  const dealTriage = [
    "Instant signal extraction",
    "Objective structural framework",
    "CHASE / PARK / DROP verdict",
    "Clear next action",
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">COMPARISON</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Traditional deal evaluation vs Deal Triage OS
          </h2>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Traditional */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-muted-foreground mb-6">Traditional underwriting</h3>
            <ul className="space-y-4">
              {traditional.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="p-1 bg-destructive/10 rounded-full shrink-0">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deal Triage OS */}
          <div className="bg-card border border-accent/30 rounded-xl p-6 md:p-8 ring-1 ring-accent/20">
            <h3 className="text-lg font-semibold text-foreground mb-6">Deal Triage OS</h3>
            <ul className="space-y-4">
              {dealTriage.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="p-1 bg-accent/20 rounded-full shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
