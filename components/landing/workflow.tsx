import { FileText, Cpu, Target } from "lucide-react";

export function Workflow() {
  const steps = [
    {
      icon: FileText,
      step: "01",
      title: "Paste the Lead",
      description: "Drop the seller message or property description into Deal Triage OS.",
    },
    {
      icon: Cpu,
      step: "02",
      title: "Signals Are Extracted",
      description: "The system evaluates four deal signals: Motivation, Price Alignment, Property Condition, and Timeline.",
    },
    {
      icon: Target,
      step: "03",
      title: "Get a Verdict",
      description: "Each lead receives a clear action: CHASE (worth pursuing), PARK (follow up later), or DROP (structurally dead).",
    },
  ];

  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">HOW IT WORKS</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            See how a deal gets triaged
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Three steps. Instant clarity. No more guessing.
          </p>
        </div>

        {/* Steps - horizontal on desktop */}
        <div className="relative">
          {/* Desktop: horizontal layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-background border border-border rounded-2xl mb-4">
                    <item.icon className="w-8 h-8 text-accent" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mb-2">STEP {item.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: vertical layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-background border border-border rounded-xl shrink-0">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-4" />
                  )}
                </div>
                <div className="pt-2 pb-4">
                  <span className="text-xs font-mono text-muted-foreground">STEP {item.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
