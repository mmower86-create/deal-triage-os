"use client";

import { Check, ArrowRight } from "lucide-react";

interface PricingProps {
  onBuyClick: () => void;
  loading: boolean;
}

export function Pricing({ onBuyClick, loading }: PricingProps) {
  const features = [
    "Full Deal Triage OS access",
    "Four Gate Framework analysis",
    "CHASE / PARK / DROP verdicts",
    "Unlimited lead evaluations",
    "All future updates included",
    "Email support",
  ];

  return (
    <section className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-mono text-sm mb-3">PRICING</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            One price. Lifetime access.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            No subscriptions. No upsells. Pay once and use forever.
          </p>
        </div>

        {/* Pricing card */}
        <div className="max-w-lg mx-auto">
          <div className="bg-background border border-border rounded-2xl p-8 md:p-10">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="inline-flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-semibold text-foreground">$47</span>
              </div>
              <p className="mt-2 text-muted-foreground">One-time payment</p>
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
              {loading ? "Processing..." : "Get Instant Access"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
