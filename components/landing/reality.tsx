import { AlertCircle } from "lucide-react";

export function Reality() {
  const causes = [
    "Lack of seller authority",
    "Unrealistic pricing",
    "Weak motivation",
    "Unclear timelines",
  ];

  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-mono text-sm mb-3">REALITY CHECK</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6">
            The reality of deal flow.
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Most investor leads fail before the offer stage.
          </p>
          
          <div className="bg-background border border-border rounded-xl p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-4">Common causes:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {causes.map((cause, index) => (
                <div key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-foreground">{cause}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-foreground font-medium">
            Deal Triage OS identifies these structural problems <span className="text-accent">before</span> you waste time underwriting the deal.
          </p>
        </div>
      </div>
    </section>
  );
}
