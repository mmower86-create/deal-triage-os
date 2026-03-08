"use client";

import { ArrowRight, Play, ExternalLink } from "lucide-react";

interface HeroProps {
  onBuyClick: () => void;
  onDemoClick: () => void;
  onAppClick: () => void;
  loading: boolean;
}

export function Hero({ onBuyClick, onDemoClick, onAppClick, loading }: HeroProps) {
  return (
    <section className="relative hero-grid">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm text-muted-foreground">Structural Acquisition Intelligence</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground max-w-4xl text-balance leading-[1.1]">
            Stop underwriting leads before
            <br />
            <span className="text-muted-foreground">Authority and Timeline are confirmed.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Paste first-call seller notes. Instantly get CHASE / PARK / DROP, a Deal Health score (0-5), and the next action to take.
          </p>
          
          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBuyClick}
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Start Membership — $97/month"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={onDemoClick}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
            >
              <Play className="w-4 h-4" />
              Run Live Demo
            </button>
          </div>
          
          {/* Tertiary CTA */}
          <button
            onClick={onAppClick}
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open the App
          </button>
          
          {/* Price note */}
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="text-accent font-medium">$97/month</span> or <span className="text-accent font-medium">$970/year</span> (2 months free)
          </p>
        </div>
      </div>
    </section>
  );
}
