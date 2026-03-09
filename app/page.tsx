"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { CredibilityStrip } from "@/components/landing/credibility-strip";
import { Problem } from "@/components/landing/problem";
import { Workflow } from "@/components/landing/workflow";
import { ExampleAnalysis } from "@/components/landing/example-analysis";
import { Verdicts } from "@/components/landing/verdicts";
import { ProductScreenshot } from "@/components/landing/product-screenshot";
import { Reality } from "@/components/landing/reality";
import { Comparison } from "@/components/landing/comparison";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { LoginModal } from "@/components/landing/login-modal";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleBuyNow = () => {
    window.location.href = "/app";
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
      
      {/* 1. Hero */}
      <Hero
        onBuyClick={handleBuyNow}
        onDemoClick={scrollToWorkflow}
        onAppClick={openApp}
        loading={loading}
      />
      
      {/* 2. Product Walkthrough - directly under hero */}
      <section id="how-it-works">
        <Workflow />
      </section>
      
      {/* 3. Framework Credibility Line */}
      <CredibilityStrip />
      
      {/* 4. Pain / Problem */}
      <Problem />
      
      {/* 5. Example Analysis */}
      <ExampleAnalysis />
      
      {/* 6. Verdict System */}
      <section id="framework">
        <Verdicts />
      </section>
      
      {/* 7. Product Preview */}
      <ProductScreenshot />
      
      {/* 8. Reality / Industry */}
      <Reality />
      
      {/* 9. Comparison */}
      <Comparison />
      
      {/* 10. Pricing */}
      <section id="pricing">
        <Pricing onBuyClick={handleBuyNow} loading={loading} />
      </section>
      
      {/* 11. Final CTA */}
      <CTA onBuyClick={handleBuyNow} loading={loading} />
      
      <Footer />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
}
