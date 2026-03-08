"use client";

import { ArrowRight } from "lucide-react";

interface HeroProps {
  onBuyClick: () => void;
  onLoginClick: () => void;
  loading: boolean;
}

export function Hero({ onBuyClick, onLoginClick, loading }: HeroProps) {
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
            <span className="text-sm text-muted-foreground">For Real Estate Wholesalers</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground max-w-4xl text-balance leading-[1.1]">
            Stop chasing leads
            <br />
            <span className="text-muted-foreground">you already know are dead.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Deal Triage OS uses our Four Gate Framework to instantly qualify seller leads.
            Know in seconds whether to CHASE, PARK, or DROP.
          </p>
          
          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBuyClick}
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Get Instant Access"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={onLoginClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
            >
              Already purchased? Log in
            </button>
          </div>
          
          {/* Price badge */}
          <p className="mt-6 text-sm text-muted-foreground">
            Starting at <span className="text-accent font-medium">$97/month</span> or <span className="text-accent font-medium">$970/year</span> (save 17%)
          </p>
        </div>
      </div>
    </section>
  );
}
