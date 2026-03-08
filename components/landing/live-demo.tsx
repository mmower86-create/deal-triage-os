"use client";

import { useState } from "react";
import { Loader2, ArrowRight, Target, Gauge, AlertCircle } from "lucide-react";

interface AnalysisResult {
  classification: "CHASE" | "PARK" | "DROP";
  dealHealth: number;
  nextAction: string;
}

export function LiveDemo() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasMinLength = notes.length >= 80;
  const hasNumber = /\d/.test(notes);
  const isValid = hasMinLength && hasNumber;

  const handleAnalyze = async () => {
    if (!isValid) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.");
      }

      const data = await response.json();
      setResult({
        classification: data.classification || data.verdict || "PARK",
        dealHealth: data.dealHealth ?? data.score ?? 3,
        nextAction: data.nextAction || data.action || "Follow up with seller to gather more details.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "CHASE":
        return "bg-emerald-500/20 text-emerald-400";
      case "PARK":
        return "bg-amber-500/20 text-amber-400";
      case "DROP":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 4) return "bg-emerald-400";
    if (score >= 2) return "bg-amber-400";
    return "bg-red-400";
  };

  return (
    <section id="demo" className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent font-mono text-sm mb-3">LIVE DEMO</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Try it now
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Paste real seller notes and see Deal Triage OS in action.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
            {/* Input */}
            <label className="block mb-2 text-sm font-medium text-foreground">
              Paste seller notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Example: Talked to John, owner of 123 Main St. Asking $180k, owes $120k. Wants to sell in 60 days. Going through divorce..."
              className="w-full h-40 p-4 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />

            {/* Validation hints */}
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className={hasMinLength ? "text-emerald-400" : "text-muted-foreground"}>
                {hasMinLength ? "✓" : "○"} At least 80 characters ({notes.length}/80)
              </span>
              <span className={hasNumber ? "text-emerald-400" : "text-muted-foreground"}>
                {hasNumber ? "✓" : "○"} Contains at least one number
              </span>
            </div>

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={!isValid || loading}
              className="mt-6 w-full group inline-flex items-center justify-center gap-2 px-6 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Notes
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-mono text-muted-foreground">ANALYSIS RESULT</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Classification */}
                <div className="flex items-center justify-between bg-muted border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Classification</span>
                  </div>
                  <span className={`px-3 py-1 font-semibold rounded-md text-sm ${getClassificationColor(result.classification)}`}>
                    {result.classification}
                  </span>
                </div>

                {/* Deal Health */}
                <div className="flex items-center justify-between bg-muted border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Deal Health</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-2 h-6 rounded-sm ${i <= result.dealHealth ? getHealthColor(result.dealHealth) : "bg-border"}`}
                        />
                      ))}
                    </div>
                    <span className="text-foreground font-semibold">{result.dealHealth} / 5</span>
                  </div>
                </div>

                {/* Next Action */}
                <div className="bg-muted border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Next Action</span>
                  </div>
                  <p className="text-foreground font-medium">{result.nextAction}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
