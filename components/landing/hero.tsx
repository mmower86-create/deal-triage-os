"use client";

import { ArrowRight, ChevronDown, Check, AlertTriangle } from "lucide-react";

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
              Stop underwriting
              <br />
              <span className="text-muted-foreground">bad deals.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              AI-powered acquisition intelligence that analyzes seller conversations and classifies opportunities before you waste hours on the wrong deal.
            </p>
            
            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBuyClick}
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Start Analyzing Deals"}
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

              {/* Classification */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">Classification</span>
                <span className="px-4 py-2 bg-accent/20 text-accent font-bold rounded-lg text-lg">
                  CHASE
                </span>
              </div>

              {/* Deal Health */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">Deal Health</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-7 rounded-sm ${i <= 4 ? "bg-accent" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-semibold text-lg">4 / 5</span>
                </div>
              </div>

              {/* Signals */}
              <div className="mb-6">
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
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-foreground">Financial</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-foreground">Motivation</span>
                  </div>
                </div>
              </div>

              {/* Required Action */}
              <div className="bg-background border border-border rounded-lg p-4">
                <span className="text-xs font-mono text-muted-foreground mb-2 block">REQUIRED ACTION</span>
                <p className="text-foreground font-medium text-sm">
                  Confirm payoff amount and verify decision maker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
