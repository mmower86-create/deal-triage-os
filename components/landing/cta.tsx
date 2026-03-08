"use client";

import { ArrowRight } from "lucide-react";

interface CTAProps {
  onBuyClick: () => void;
  loading: boolean;
}

export function CTA({ onBuyClick, loading }: CTAProps) {
  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden bg-muted rounded-2xl p-8 md:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          
          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight max-w-3xl mx-auto">
              Stop underwriting bad deals.
              <br />
              <span className="text-muted-foreground">Start triaging them properly.</span>
            </h2>
            <div className="mt-10">
              <button
                onClick={onBuyClick}
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-foreground text-background text-lg font-medium rounded-lg hover:bg-foreground/90 transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Start Using Deal Triage OS"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
