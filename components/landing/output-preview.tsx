import { ArrowRight, Gauge, Target } from "lucide-react";

export function OutputPreview() {
  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">WHAT YOU GET</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Instant clarity on every lead
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            See exactly what Deal Triage OS returns when you analyze seller notes.
          </p>
        </div>

        {/* Preview cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Input card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-sm font-mono text-muted-foreground">INPUT</span>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                &quot;Talked to seller John, he&apos;s the owner but his wife makes decisions too. They want $180k, owe about $120k. Looking to sell in 60-90 days. Going through divorce, motivated to move on. House needs work, ARV around $220k.&quot;
              </p>
            </div>
          </div>

          {/* Output card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-sm font-mono text-muted-foreground">OUTPUT</span>
            </div>
            <div className="space-y-4">
              {/* Classification */}
              <div className="flex items-center justify-between bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Classification</span>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 font-semibold rounded-md text-sm">
                  PARK
                </span>
              </div>
              
              {/* Deal Health */}
              <div className="flex items-center justify-between bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Deal Health</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-6 rounded-sm ${i <= 3 ? "bg-amber-400" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-semibold">3 / 5</span>
                </div>
              </div>
              
              {/* Next Action */}
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Next Action</span>
                </div>
                <p className="text-foreground font-medium">
                  Confirm wife is on board and verify payoff amount with lender authorization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
