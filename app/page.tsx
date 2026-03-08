"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { OutputPreview } from "@/components/landing/output-preview";
import { LiveDemo } from "@/components/landing/live-demo";
import { Stats } from "@/components/landing/stats";
import { FourGates } from "@/components/landing/four-gates";
import { Workflow } from "@/components/landing/workflow";
import { Verdicts } from "@/components/landing/verdicts";
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

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  const openApp = () => {
    // Navigate to the app - adjust path as needed
    window.location.href = "/app";
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Header onLoginClick={() => setShowLogin(true)} />
      <Hero
        onBuyClick={handleBuyNow}
        onDemoClick={scrollToDemo}
        onAppClick={openApp}
        loading={loading}
      />
      <OutputPreview />
      <LiveDemo />
      <Stats />
      <section id="framework">
        <FourGates />
      </section>
      <Workflow />
      <Verdicts />
      <section id="pricing">
        <Pricing onBuyClick={handleBuyNow} loading={loading} />
      </section>
      <CTA onBuyClick={handleBuyNow} loading={loading} />
      <Footer />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
}
