import { Clock, Zap, TrendingUp } from "lucide-react";

export function TimeSaved() {
  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">TIME SAVED</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Stop losing hours every week
          </h2>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Without */}
          <div className="p-6 bg-background border border-destructive/30 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-destructive/20 rounded-lg">
                <Clock className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-xs font-mono text-muted-foreground">WITHOUT</span>
            </div>
            <p className="text-3xl font-semibold text-foreground mb-2">3-6 hours</p>
            <p className="text-sm text-muted-foreground">analyzing weak deals per week</p>
          </div>

          {/* With */}
          <div className="p-6 bg-background border border-accent/30 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-mono text-muted-foreground">WITH DEAL TRIAGE</span>
            </div>
            <p className="text-3xl font-semibold text-foreground mb-2">Seconds</p>
            <p className="text-sm text-muted-foreground">to identify deal signals</p>
          </div>

          {/* Result */}
          <div className="p-6 bg-background border border-border rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-muted rounded-lg">
                <TrendingUp className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xs font-mono text-muted-foreground">TIME SAVED</span>
            </div>
            <p className="text-3xl font-semibold text-accent mb-2">10-20 hrs</p>
            <p className="text-sm text-muted-foreground">reclaimed per month</p>
          </div>
        </div>
      </div>
    </section>
  );
}
