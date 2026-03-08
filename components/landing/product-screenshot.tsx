import { Check, AlertTriangle, X, Clock, Users, DollarSign, Home, Handshake, Target, Zap, Calendar } from "lucide-react";

export function ProductScreenshot() {
  const signals = [
    { name: "Timeline to Close", value: "30-60 days", status: "pass", icon: Clock },
    { name: "Authority Alignment", value: "Sole decision maker", status: "pass", icon: Target },
    { name: "Decision Maker Count", value: "1 person", status: "pass", icon: Users },
    { name: "Payoff Clarity", value: "$142k confirmed", status: "pass", icon: DollarSign },
    { name: "Listing Trigger", value: "No active listing", status: "pass", icon: Calendar },
    { name: "Motivation Strength", value: "High - relocation", status: "pass", icon: Zap },
    { name: "Occupancy", value: "Vacant", status: "pass", icon: Home },
    { name: "Cooperation Level", value: "Responsive", status: "warn", icon: Handshake },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <Check className="w-4 h-4 text-accent" />;
      case "warn":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "fail":
        return <X className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">PRODUCT PREVIEW</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            See every signal at a glance
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            The decision panel shows extracted signals, classification, and your next action.
          </p>
        </div>

        {/* Product screenshot mockup */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-sm font-mono text-muted-foreground">Deal Triage OS</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Signal extraction panel */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-mono text-muted-foreground">EXTRACTED SIGNALS</h3>
                    <span className="text-xs text-muted-foreground">8 signals analyzed</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {signals.map((signal, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-background border border-border rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <signal.icon className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">{signal.name}</p>
                            <p className="text-sm text-foreground font-medium">{signal.value}</p>
                          </div>
                        </div>
                        {getStatusIcon(signal.status)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Decision panel */}
                <div className="space-y-4">
                  {/* Classification */}
                  <div className="bg-background border border-accent/30 rounded-xl p-5">
                    <p className="text-xs font-mono text-muted-foreground mb-3">CLASSIFICATION</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-accent">CHASE</span>
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <Zap className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>

                  {/* Deal Health */}
                  <div className="bg-background border border-border rounded-xl p-5">
                    <p className="text-xs font-mono text-muted-foreground mb-3">DEAL HEALTH</p>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 h-8 rounded ${i <= 4 ? "bg-accent" : "bg-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-foreground">4/5</span>
                    </div>
                  </div>

                  {/* Next Action */}
                  <div className="bg-background border border-border rounded-xl p-5">
                    <p className="text-xs font-mono text-muted-foreground mb-3">REQUIRED ACTION</p>
                    <p className="text-foreground font-medium text-sm leading-relaxed">
                      Verify payoff with lender. Schedule property walkthrough within 48 hours.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors">
                      Save Lead
                    </button>
                    <button className="flex-1 py-2.5 bg-muted text-foreground text-sm font-medium rounded-lg hover:bg-muted/80 transition-colors">
                      Export
                    </button>
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
