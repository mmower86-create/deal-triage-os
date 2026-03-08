"use client";

import { ArrowRight, ChevronDown, Check, AlertTriangle } from "lucide-react";
import { TriageOutput } from "./triage-output";

interface HeroProps {
  onBuyClick: () => void;
  onDemoClick: () => void;
  onAppClick: () => void;
  loading: boolean;
}

export function Hero({ onBuyClick, onDemoClick, loading }: HeroProps) {
  return (
    <section className="relative hero-grid">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm text-muted-foreground">Structural Acquisition Intelligence</span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
              Most investor leads are
              <br />
              <span className="text-muted-foreground">structurally dead.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Deal Triage OS identifies the few deals worth chasing before you waste 40 minutes underwriting them.
            </p>
            
            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBuyClick}
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Run Your First Deal Through Triage"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onDemoClick}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
              >
                See How It Works
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            {/* Supporting text */}
            <p className="mt-6 text-sm text-muted-foreground">
              Analyze your first 50 leads free.
            </p>
          </div>

          {/* Right: Product preview card */}
          <div className="lg:pl-8">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs font-mono text-muted-foreground">DEAL CLASSIFICATION</span>
              </div>

              {/* Signals */}
              <div className="mb-6">
                <span className="text-xs font-mono text-muted-foreground mb-3 block">SIGNALS</span>
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
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-foreground">Financial</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-foreground">Motivation</span>
                  </div>
                </div>
              </div>

              {/* Triage Output */}
              <TriageOutput
                verdict="CHASE"
                healthScore={4}
                requiredAction="Confirm payoff amount and verify decision maker."
                variant="compact"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
