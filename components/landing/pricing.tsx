"use client";

import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";

interface PricingProps {
  onBuyClick: () => void;
  loading: boolean;
}

export function Pricing({ onBuyClick, loading }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const features = [
    "Full Deal Triage OS access",
    "Four Gate Framework analysis",
    "CHASE / PARK / DROP verdicts",
    "Deal Health scoring (0-5)",
    "Required next actions",
    "Unlimited lead evaluations",
    "Priority feature updates",
  ];

  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent font-mono text-sm mb-3">PRICING</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Simple membership pricing
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Investors waste 30-60 minutes underwriting dead leads.<br />
            Deal Triage OS filters them in seconds.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-medium">
            Run your first 50 leads free.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 bg-muted border border-border rounded-full transition-colors"
            aria-label="Toggle billing period"
          >
            <div className={`absolute top-1 w-5 h-5 bg-accent rounded-full transition-all ${isAnnual ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent/20 text-accent">
              2 months free
            </span>
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Monthly */}
          <div className={`bg-background border rounded-2xl p-8 transition-all ${!isAnnual ? 'border-accent ring-1 ring-accent' : 'border-border'}`}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-semibold text-foreground">$97</span>
              <span className="text-muted-foreground">/ month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Billed monthly</p>
            
            {!isAnnual && (
              <button
                onClick={onBuyClick}
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Start Membership"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>

          {/* Annual */}
          <div className={`bg-background border rounded-2xl p-8 relative overflow-hidden transition-all ${isAnnual ? 'border-accent ring-1 ring-accent' : 'border-border'}`}>
            <div className="absolute top-0 right-0 bg-accent text-background text-xs font-medium px-3 py-1 rounded-bl-lg">
              Best Value
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Annual</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-semibold text-foreground">$970</span>
              <span className="text-muted-foreground">/ year</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="line-through text-muted-foreground/50">$1,164</span>
              <span className="ml-2 text-accent">2 months free</span>
            </p>
            
            {isAnnual && (
              <button
                onClick={onBuyClick}
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Start Membership"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Features list */}
        <div className="mt-12 max-w-xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-6">Everything included:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="p-0.5 bg-accent rounded-full shrink-0">
                  <Check className="w-3 h-3 text-background" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cancel note */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Cancel anytime. No questions asked.
        </p>
      </div>
    </section>
  );
}
