import { Zap, AlertTriangle, Clock } from "lucide-react";

type Verdict = "CHASE" | "PARK" | "DROP";

interface TriageOutputProps {
  verdict: Verdict;
  healthScore: number;
  requiredAction: string;
  variant?: "default" | "compact";
}

const verdictConfig = {
  CHASE: {
    icon: Zap,
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    borderClass: "border-accent/20",
  },
  PARK: {
    icon: Clock,
    colorClass: "text-warning",
    bgClass: "bg-warning/10",
    borderClass: "border-warning/20",
  },
  DROP: {
    icon: AlertTriangle,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10",
    borderClass: "border-destructive/20",
  },
};

export function TriageOutput({ verdict, healthScore, requiredAction, variant = "default" }: TriageOutputProps) {
  const config = verdictConfig[verdict];
  const VerdictIcon = config.icon;
  const isCompact = variant === "compact";

  return (
    <div className="space-y-4">
      {/* Verdict Badge */}
      <div>
        <p className="text-xs font-mono text-muted-foreground mb-2">VERDICT</p>
        <div className={`inline-flex items-center gap-2 px-4 py-2.5 ${config.bgClass} border ${config.borderClass} rounded-lg`}>
          <VerdictIcon className={`${isCompact ? "w-4 h-4" : "w-5 h-5"} ${config.colorClass}`} />
          <span className={`${isCompact ? "text-lg" : "text-xl"} font-bold ${config.colorClass}`}>{verdict}</span>
        </div>
      </div>

      {/* Deal Health */}
      <div>
        <p className="text-xs font-mono text-muted-foreground mb-2">DEAL HEALTH</p>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 flex-1 max-w-[140px]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`flex-1 ${isCompact ? "h-5" : "h-6"} rounded-sm ${
                  i <= healthScore ? "bg-accent/60" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className={`${isCompact ? "text-lg" : "text-xl"} font-bold text-foreground`}>{healthScore} / 5</span>
        </div>
      </div>

      {/* Required Action */}
      <div>
        <p className="text-xs font-mono text-muted-foreground mb-2">REQUIRED ACTION</p>
        <div className="bg-card/50 border border-border/80 rounded-lg p-3">
          <p className="text-foreground text-sm leading-relaxed">{requiredAction}</p>
        </div>
      </div>
    </div>
  );
}
