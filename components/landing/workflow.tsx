import { FileText, Cpu, Target } from "lucide-react";

export function Workflow() {
  const steps = [
    {
      icon: FileText,
      step: "01",
      title: "Input Lead Data",
      description: "Enter the information from your seller conversation. Property details, seller situation, and timeline.",
    },
    {
      icon: Cpu,
      step: "02",
      title: "Four Gate Analysis",
      description: "The system runs your lead through Authority, Timeline, Financial Reality, and Motivation checks.",
    },
    {
      icon: Target,
      step: "03",
      title: "Get Your Verdict",
      description: "Receive a clear CHASE, PARK, or DROP verdict with detailed reasoning and suggested next actions.",
    },
  ];

  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">HOW IT WORKS</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            From lead to verdict in seconds
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            No more spreadsheets. No more gut feelings. Just clear, consistent lead qualification.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 flex items-center justify-center bg-background border border-border rounded-2xl mb-6">
                  <item.icon className="w-10 h-10 text-accent" />
                </div>
                <span className="text-xs font-mono text-muted-foreground mb-2">STEP {item.step}</span>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
