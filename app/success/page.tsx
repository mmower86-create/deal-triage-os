"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const password = "dealtriage2025"; // Same as in .env.local

  return (
    <main className="min-h-screen bg-[#0B0F17] text-[#E6EAF2] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#131A26] p-8 rounded-md border border-[#1F2633]">
        <h1 className="text-2xl text-white mb-4">Payment Successful! 🎉</h1>
        <p className="text-gray-400 mb-6">
          Thank you for purchasing Deal Triage OS. Here's your access password:
        </p>
        
        <div className="bg-[#0B0F17] p-4 rounded-md border border-[#1F2633] mb-6">
          <p className="text-sm text-gray-400 mb-1">Your Access Password:</p>
          <p className="text-xl text-blue-400 font-mono">{password}</p>
        </div>
        
        <p className="text-gray-400 text-sm mb-6">
          Go to <span className="text-blue-400">dealtriageos.com/app</span> and enter this password to access your tool.
        </p>
        
        <Link
          href="/app"
          className="block w-full text-center py-3 bg-[#1F2633] hover:bg-[#2A3242] text-white text-sm font-medium transition-colors rounded-md"
        >
          Go to App →
        </Link>
      </div>
    </main>
  );
}