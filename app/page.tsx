"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { FourGates } from "@/components/landing/four-gates";
import { Workflow } from "@/components/landing/workflow";
import { OutputPreview } from "@/components/landing/output-preview";
import { Verdicts } from "@/components/landing/verdicts";
import { Benefits } from "@/components/landing/benefits";
import { Pricing } from "@/components/landing/pricing";
import { ExampleAnalysis } from "@/components/landing/example-analysis";
import { TimeSaved } from "@/components/landing/time-saved";
import { Founder } from "@/components/landing/founder";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { LoginModal } from "@/components/landing/login-modal";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleBuyNow = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { sessionId } = await response.json();
      window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}`;
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  const scrollToWorkflow = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  const openApp = () => {
    window.location.href = "/app";
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Header onLoginClick={() => setShowLogin(true)} />
      
      {/* Hero with product preview */}
      <Hero
        onBuyClick={handleBuyNow}
        onDemoClick={scrollToWorkflow}
        onAppClick={openApp}
        loading={loading}
      />
      
      {/* Problem section */}
      <Problem />
      
      {/* Four Gate Framework */}
      <section id="framework">
        <FourGates />
      </section>
      
      {/* How it works */}
      <section id="how-it-works">
        <Workflow />
      </section>
      
      {/* Product demonstration */}
      <OutputPreview />
      
      {/* Verdicts explanation */}
      <Verdicts />
      
      {/* Benefits */}
      <Benefits />
      
      {/* Pricing */}
      <section id="pricing">
        <Pricing onBuyClick={handleBuyNow} loading={loading} />
      </section>
      
      {/* Example deal analysis */}
      <ExampleAnalysis />
      
      {/* Time saved */}
      <TimeSaved />
      
      {/* Founder credibility */}
      <Founder />
      
      {/* Final CTA */}
      <CTA onBuyClick={handleBuyNow} loading={loading} />
      
      <Footer />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
}
