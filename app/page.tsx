"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Login Modal Component
function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/app");
      onClose();
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#131A26] p-8 rounded-md border border-[#1F2633] max-w-md w-full">
        <h2 className="text-xl text-white mb-4">Enter Access Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-[#0B0F17] border border-[#1F2633] rounded-md p-3 text-white mb-4"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-[#1F2633] hover:bg-[#2A3242] text-white text-sm rounded-md disabled:opacity-50"
            >
              {loading ? "Checking..." : "Access App"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-transparent border border-[#1F2633] text-white text-sm rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
    
    // Just redirect to Stripe's hosted checkout page
    window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}`;
    
  } catch (error) {
    console.error("Checkout error:", error);
    setLoading(false);
  }
};
  return (
    <main className="min-h-screen bg-[#0B0F17] text-[#E6EAF2] font-sans antialiased">
      {/* Header with Login Button */}
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <div className="border-b border-[#1F2633] pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Deal Triage OS
            </h1>
            <p className="text-sm text-blue-400 mt-1 tracking-wide">
              Structural Acquisition Intelligence
            </p>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="px-4 py-2 bg-transparent border border-[#1F2633] hover:border-[#2A3242] text-white text-sm rounded-md transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20 border-b border-[#1F2633]">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight text-white">
            Stop underwriting leads
            <span className="text-blue-400 block text-2xl md:text-3xl mt-3 font-normal">
              you already know are dead.
            </span>
          </h2>
          <p className="text-lg text-gray-400 mt-8 leading-relaxed max-w-2xl">
            You run numbers on 25–50 leads a week. 30–50% are structurally invalid—
            missing authority, timeline, or financial reality. Deal Triage OS catches
            them before you waste 40 minutes imagining the assignment fee.
          </p>
          <div className="mt-10 flex gap-4">
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="px-8 py-4 bg-[#1F2633] hover:bg-[#2A3242] text-white text-sm font-medium transition-colors border border-transparent rounded-md disabled:opacity-50"
            >
              {loading ? "Processing..." : "Get Instant Access — $47 →"}
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-8 py-4 bg-transparent border border-[#1F2633] hover:border-[#2A3242] text-white text-sm font-medium transition-colors rounded-md"
            >
              Already have a password? Log in
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-4">One-time payment. Lifetime access.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-[#1F2633]">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#131A26] p-6 rounded-md">
            <p className="text-3xl text-blue-400 mb-2">25-50</p>
            <p className="text-gray-400">leads per week</p>
          </div>
          <div className="bg-[#131A26] p-6 rounded-md">
            <p className="text-3xl text-blue-400 mb-2">30-50%</p>
            <p className="text-gray-400">structurally invalid</p>
          </div>
          <div className="bg-[#131A26] p-6 rounded-md">
            <p className="text-3xl text-blue-400 mb-2">5-10hrs</p>
            <p className="text-gray-400">waste per week</p>
          </div>
        </div>
      </section>

      {/* The Real Pain */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-b border-[#1F2633]">
        <h3 className="text-xs uppercase tracking-widest text-blue-400 mb-6">The real cost isn't time</h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white">
              It's mental drag.
            </p>
          </div>
          <div className="space-y-6 text-gray-400">
            <p className="leading-relaxed">
              You open comps anyway. You imagine the assignment fee anyway. You spend 30 minutes
              underwriting a lead you knew was dead at minute three.
            </p>
            <p className="leading-relaxed">
              That's not time waste. That's cognitive fatigue. False optimism. Self-frustration.
              The system eliminates it.
            </p>
          </div>
        </div>
      </section>

      {/* The Math */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-b border-[#1F2633]">
        <h3 className="text-xs uppercase tracking-widest text-blue-400 mb-6">The math</h3>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-400">
            <p className="text-2xl font-light text-white">15 bad leads per week.</p>
            <p className="leading-relaxed">
              25–50 leads a week. 30–50% are structurally invalid. Call it 15. At 20–40 minutes each,
              that's 5–10 hours a week of underwriting waste.
            </p>
            <p className="leading-relaxed">
              Monthly: 20–40 hours of cognitive bandwidth allocated to deals that were never viable.
            </p>
          </div>
          <div className="bg-[#131A26] p-8 border border-[#1F2633] rounded-md">
            <p className="text-5xl font-light text-white">5–10<span className="text-2xl text-gray-500 ml-1">hrs/wk</span></p>
            <p className="text-sm text-gray-500 mt-2">underwriting structurally invalid leads</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-[#1F2633]">
        <div className="max-w-md mx-auto">
          <div className="bg-[#131A26] p-8 rounded-md border border-[#1F2633]">
            <p className="text-xs text-blue-400 uppercase tracking-widest mb-2">Lifetime Access</p>
            <p className="text-4xl text-white mb-4">$47</p>
            <p className="text-gray-400 text-sm mb-6">One payment. No subscriptions.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400">→</span>
                <span>Full Deal Triage OS access</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400">→</span>
                <span>All future updates</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-400">→</span>
                <span>Email support</span>
              </li>
            </ul>
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="w-full py-3 bg-[#1F2633] hover:bg-[#2A3242] text-white text-sm font-medium transition-colors border border-transparent rounded-md disabled:opacity-50"
            >
              {loading ? "Processing..." : "Buy Now →"}
            </button>
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-[#1F2633]">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl text-gray-300 italic">
            "I built Deal Triage OS because I was tired of spending 30 minutes on leads
            I knew were dead at minute three. Now I disqualify faster and chase harder."
          </p>
          <p className="text-sm text-gray-500 mt-6">— [Your Name], Founder</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-8">
        <p className="text-xs text-gray-600">© Deal Triage OS. Structural acquisition intelligence.</p>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </main>
  );
}
