import { Zap, Clock, X } from "lucide-react";

export function Verdicts() {
  const verdicts = [
    {
      icon: Zap,
      verdict: "CHASE",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      description: "All four gates pass. This lead has real potential.",
      action: "Move fast. Schedule the appointment. Make the offer.",
      example: {
        situation: "Inherited property, sole heir, wants to sell in 30 days, owes nothing, asking below market.",
        gates: ["Authority: Sole heir, probate complete", "Timeline: 30-day deadline", "Financial: No mortgage, clear title", "Motivation: Wants quick sale, lives out of state"],
      },
    },
    {
      icon: Clock,
      verdict: "PARK",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      description: "Some gates pass, but timing or circumstances aren't right yet.",
      action: "Add to follow-up. Set a trigger date. Stay in touch.",
      example: {
        situation: "Motivated seller but listing agreement expires in 60 days. Underwater on mortgage.",
        gates: ["Authority: Owner, can sell", "Timeline: Not urgent yet", "Financial: Needs short sale approval", "Motivation: Frustrated with current agent"],
      },
    },
    {
      icon: X,
      verdict: "DROP",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      description: "One or more gates fail completely. This deal is structurally invalid.",
      action: "Don't waste another minute. Move on immediately.",
      example: {
        situation: "Property in probate, multiple heirs fighting, no clear timeline, unrealistic price expectations.",
        gates: ["Authority: 4 heirs, 2 won't respond", "Timeline: No urgency", "Financial: Wants full retail", "Motivation: Just 'seeing what offers come in'"],
      },
    },
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-accent font-mono text-sm mb-3">THE VERDICTS</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Three clear outcomes. Zero ambiguity.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Every lead gets classified. You always know what to do next.
          </p>
        </div>

        {/* Verdicts */}
        <div className="space-y-6">
          {verdicts.map((item, index) => (
            <div
              key={index}
              className={`p-6 md:p-8 bg-card border ${item.borderColor} rounded-xl`}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Verdict info */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 ${item.bgColor} rounded-lg`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className={`text-2xl font-bold ${item.color}`}>{item.verdict}</h3>
                  </div>
                  <p className="text-foreground mb-3">{item.description}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Action:</span> {item.action}
                  </p>
                </div>

                {/* Right: Example */}
                <div className="lg:w-2/3 lg:border-l lg:border-border lg:pl-8">
                  <p className="text-xs font-mono text-muted-foreground mb-3">EXAMPLE SCENARIO</p>
                  <p className="text-foreground mb-4">{item.example.situation}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.example.gates.map((gate, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className={`mt-1 w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')} flex-shrink-0`} />
                        <span className="text-muted-foreground">{gate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
