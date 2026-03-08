"use client";

import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";

interface PricingProps {
  onBuyClick: () => void;
  loading: boolean;
}

export function Pricing({ onBuyClick, loading }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const features = [
    "Full Deal Triage OS access",
    "Four Gate Framework analysis",
    "CHASE / PARK / DROP verdicts",
    "Unlimited lead evaluations",
    "Priority feature updates",
    "Email support",
  ];

  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent font-mono text-sm mb-3">PRICING</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Save 5-10 hours every week. One plan, everything included.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 bg-muted rounded-full transition-colors"
            aria-label="Toggle billing period"
          >
            <div className={`absolute top-1 w-5 h-5 bg-accent rounded-full transition-all ${isAnnual ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent/20 text-accent">
              Save 17%
            </span>
          </span>
        </div>

        {/* Pricing card */}
        <div className="max-w-lg mx-auto">
          <div className="bg-background border border-border rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* Popular badge */}
            {isAnnual && (
              <div className="absolute top-0 right-0 bg-accent text-background text-xs font-medium px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
            )}

            {/* Price */}
            <div className="text-center mb-8">
              <div className="inline-flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-semibold text-foreground">
                  {isAnnual ? "$970" : "$97"}
                </span>
                <span className="text-muted-foreground text-lg">
                  /{isAnnual ? "year" : "month"}
                </span>
              </div>
              {isAnnual && (
                <p className="mt-2 text-muted-foreground">
                  <span className="line-through text-muted-foreground/50">$1,164/year</span>
                  <span className="ml-2 text-accent">Save $194</span>
                </p>
              )}
              {!isAnnual && (
                <p className="mt-2 text-muted-foreground">
                  Billed monthly. Cancel anytime.
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="p-0.5 bg-accent rounded-full">
                    <Check className="w-4 h-4 text-background" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={onBuyClick}
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Start Free Trial"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              7-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
