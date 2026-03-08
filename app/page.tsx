"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { Workflow } from "@/components/landing/workflow";
import { Verdicts } from "@/components/landing/verdicts";
import { ProductScreenshot } from "@/components/landing/product-screenshot";
import { Pricing } from "@/components/landing/pricing";
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
      
      {/* Hero - product explanation */}
      <Hero
        onBuyClick={handleBuyNow}
        onDemoClick={scrollToWorkflow}
        onAppClick={openApp}
        loading={loading}
      />
      
      {/* Problem - why investors waste time */}
      <Problem />
      
      {/* How it works - 4 steps */}
      <section id="how-it-works">
        <Workflow />
      </section>
      
      {/* Decision Framework - CHASE / PARK / DROP */}
      <section id="framework">
        <Verdicts />
      </section>
      
      {/* Product screenshot - decision panel and signals */}
      <ProductScreenshot />
      
      {/* Pricing */}
      <section id="pricing">
        <Pricing onBuyClick={handleBuyNow} loading={loading} />
      </section>
      
      {/* Final CTA */}
      <CTA onBuyClick={handleBuyNow} loading={loading} />
      
      <Footer />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
}
