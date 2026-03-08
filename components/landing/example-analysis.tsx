import { Check, AlertTriangle, ArrowRight, FileText } from "lucide-react";

export function ExampleAnalysis() {
  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">EXAMPLE</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            See it in action
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A realistic example showing exactly how Deal Triage OS processes seller information.
          </p>
        </div>

        {/* Example flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Input */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-muted rounded-lg">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-mono text-muted-foreground">SELLER NOTES</span>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground leading-relaxed">
                &quot;Seller inherited property and wants $210k. Mortgage payoff is $185k. Needs to sell within 45 days.&quot;
              </p>
            </div>
          </div>

          {/* Output */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/20 rounded-lg">
                <ArrowRight className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-mono text-muted-foreground">AI OUTPUT</span>
            </div>

            {/* Classification */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <span className="text-sm text-muted-foreground">Classification</span>
              <span className="px-3 py-1.5 bg-warning/20 text-warning font-bold rounded-lg">
                PARK
              </span>
            </div>

            {/* Signals */}
            <div className="mb-4 pb-4 border-b border-border">
              <span className="text-sm text-muted-foreground mb-3 block">Signals</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Authority</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Timeline</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-foreground">Financial</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Motivation</span>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="mb-4 pb-4 border-b border-border">
              <span className="text-sm text-muted-foreground mb-2 block">Reason</span>
              <p className="text-foreground text-sm">Price expectation likely too high.</p>
            </div>

            {/* Recommended Action */}
            <div>
              <span className="text-sm text-muted-foreground mb-2 block">Recommended Action</span>
              <p className="text-foreground font-medium text-sm">Follow up after price adjustment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
