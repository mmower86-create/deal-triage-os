"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [inputDirty, setInputDirty] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showStructural, setShowStructural] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"raw" | "guided">("guided"); // Temporarily set to "guided" for testing
  const [guidedStep, setGuidedStep] = useState(1);
  const [guidedData, setGuidedData] = useState({
    decisionMakerCount: "",
    authorityAligned: "",
    timelineDays: "",
    hardCloseDate: "",
    priceExpectation: "",
    payoffKnown: "",
    netRequirement: "",
    motivation: "",
    listingPlan: "",
    accessFlexibility: "",
  });
  const [savedLeads, setSavedLeads] = useState<any[]>([]);
  const [showSavedLeads, setShowSavedLeads] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const [exporting, setExporting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const sampleTemplate = `SELLER NOTES
Property:
Beds/Baths:
Condition:
Occupancy:

Seller Situation:
Timeline (days):
Price Expectation:
Payoff Amount:
Decision Makers:
Motivation Level (1-10):

Additional Notes:
`;

  const updateGuidedField = (field: string, value: string) => {
    setGuidedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Helper function to build structured notes from guided data
  function buildStructuredNotes() {
    return `
SELLER NOTES

AUTHORITY
- Decision Maker Count: ${guidedData.decisionMakerCount}
- Authority Aligned: ${guidedData.authorityAligned}

TIMELINE
- Timeline Days: ${guidedData.timelineDays}
- Hard Close Date: ${guidedData.hardCloseDate || "Not specified"}

FINANCIAL
- Price Expectation: ${guidedData.priceExpectation}
- Payoff Known: ${guidedData.payoffKnown || "Unknown"}
- Net Requirement: ${guidedData.netRequirement || "Not specified"}

MOTIVATION
- Why Selling: ${guidedData.motivation}
- Listing Plan: ${guidedData.listingPlan || "Unknown"}
- Access Flexibility: ${guidedData.accessFlexibility || "Unknown"}
`.trim();
  }

  // Export helper functions
  function downloadFile(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  function copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
  }

  function buildVerdictSummary() {
    if (!result) return "";

    return `
DEAL TRIAGE VERDICT

Classification: ${result.classification}
Deal Health: ${getClampedScore()} / 5

Required Action:
${
  result.immediate_next_action?.action ||
  (result.classification === "DROP"
    ? "Disqualify lead. Reallocate time."
    : result.classification === "PARK"
    ? "Schedule structured follow-up."
    : "Initiate underwriting.")
}

Generated: ${new Date().toLocaleString()}
`.trim();
  }

  // Saved leads functions
  function saveCurrentLead() {
    if (!result) return;

    const newLead = {
      id: Date.now(),
      classification: result.classification,
      score: getClampedScore(),
      notes,
      timestamp: new Date().toLocaleString(),
      userNote: "", // Initialize empty user note
    };

    const updated = [newLead, ...savedLeads];

    setSavedLeads(updated);
    localStorage.setItem(
      "triage_saved_leads",
      JSON.stringify(updated)
    );
  }

  async function deleteLead(id: number) {
    // Confirm before delete
    if (!confirm("Are you sure you want to delete this lead?")) {
      return;
    }
    
    setDeletingId(id);
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updated = savedLeads.filter((lead) => lead.id !== id);
    setSavedLeads(updated);
    localStorage.setItem(
      "triage_saved_leads",
      JSON.stringify(updated)
    );
    setDeletingId(null);
  }

  function loadLead(lead: any) {
    setNotes(lead.notes);
    setMode("raw");
    setTimeout(() => {
      analyzeLead();
    }, 100);
  }

  // Export all leads as JSON
  async function exportAllLeads() {
    setExporting(true);
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    downloadFile("all-leads.json", JSON.stringify(savedLeads, null, 2));
    setExporting(false);
  }

  // Add note to lead
  function addNoteToLead(leadId: number, note: string) {
    const updated = savedLeads.map(lead => 
      lead.id === leadId ? { ...lead, userNote: note } : lead
    );
    setSavedLeads(updated);
    localStorage.setItem("triage_saved_leads", JSON.stringify(updated));
    setEditingNoteId(null);
    setNoteText("");
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+Enter (or Ctrl+Enter) to analyze
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!loading && notes.trim().length >= 80) {
          analyzeLead();
        }
      }
      
      // Cmd+S (or Ctrl+S) to save current lead
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (result) {
          saveCurrentLead();
        }
      }
      
      // Cmd+Shift+N (or Ctrl+Shift+N) for new raw note
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "N") {
        e.preventDefault();
        setMode("raw");
        setNotes("");
        setResult(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, notes, result]);

  const analyzeLead = async () => {
    const trimmed = notes.trim();

    if (!trimmed) {
      setErrorMsg("Paste seller notes before analyzing.");
      return;
    }

    if (trimmed.length < 80) {
      setErrorMsg(
        "Insufficient seller context. Provide structured call notes."
      );
      return;
    }

    const containsNumber = /\d/.test(trimmed);
    if (!containsNumber) {
      setErrorMsg(
        "Structured notes must include numeric context (price, timeline, payoff, etc)."
      );
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setInputDirty(false); // clears outdated warning when re-analyzing

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: trimmed }),
      });

      const data = await res.json();
      setResult(data);

      setTimeout(() => {
        document
          .getElementById("result-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch {
      setResult(null);
      setErrorMsg("Server error. Try again.");
    }

    setLoading(false);
  };

  const clearInput = () => {
    setNotes("");
    setResult(null);
    setInputDirty(false);
    setErrorMsg("");
  };

  const insertTemplate = () => {
    setNotes(sampleTemplate);
    setResult(null);
    setInputDirty(false);
    setErrorMsg("");
  };

  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      const maxHeight = 400;
      el.style.height = "auto";
      el.style.maxHeight = maxHeight + "px";
      const newHeight = Math.min(el.scrollHeight, maxHeight);
      el.style.height = newHeight + "px";
      el.style.overflowY =
        el.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [notes]);

  // Auto-scroll to results when they load
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  // Load saved leads from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("triage_saved_leads");
    if (stored) {
      setSavedLeads(JSON.parse(stored));
    }
  }, []);

  // Remove unused handleInputChange function and use inline onChange

  const getClampedScore = () => {
    if (!result?.score_breakdown) return 0;

    const total = Object.values(result.score_breakdown).reduce(
      (sum: number, val: any) => sum + (Number(val) || 0),
      0
    );

    return Math.max(0, Math.min(5, total));
  };

  const getVerdictColor = () => {
    if (!result) return "blue";
    if (result.classification === "CHASE") return "green";
    if (result.classification === "PARK") return "yellow";
    return "red";
  };

  const getAccentColor = () => {
    if (!result) return "border-blue-500";
    if (result.classification === "CHASE")
      return "border-green-500";
    if (result.classification === "PARK")
      return "border-yellow-500";
    return "border-red-500";
  };

  const renderHealthBar = () => {
    const score = getClampedScore();
    return (
      <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`h-2 w-10 rounded-sm ${n <= score
              ? getVerdictColor() === "green"
                ? "bg-green-500"
                : getVerdictColor() === "yellow"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              : "bg-[#2A2F3A]"
              }`}
          />
        ))}
      </div>
    );
  };

  const formatValue = (value: any) => {
    if (value === null || value === undefined || value === "")
      return null;

    if (typeof value === "boolean") {
      return value ? "YES" : "NO";
    }

    if (typeof value === "string" && value === value.toUpperCase()) {
      return value.charAt(0) + value.slice(1).toLowerCase();
    }

    return value;
  };

  const renderSignal = (
    label: string,
    value: any,
    fallback: string
  ) => {
    const formatted = formatValue(value);

    return (
      <div className="flex justify-between text-sm border-b border-[#1F2633] py-2">
        <div className="text-gray-400 tracking-wide">
          {label}
        </div>
        <div className="text-right font-medium">
          {formatted !== null
            ? formatted
            : `N/A - ${fallback}`}
        </div>
      </div>
    );
  };

  // Helper for Step validation
  const step1Complete = !!guidedData.decisionMakerCount && !!guidedData.authorityAligned;
  const step2Complete = !!guidedData.timelineDays;
  const step3Complete = !!guidedData.priceExpectation;
  const step4Complete = !!guidedData.motivation;

  return (
    <main className="min-h-screen bg-[#0B0F17] text-[#E6EAF2] px-10 py-14">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Deal Triage OS
          </h1>
          <p className="text-sm text-blue-400 mt-1 tracking-wide">
            Structural Acquisition Intelligence
          </p>
          {/* Keyboard shortcut hint with tooltips */}
          <div className="text-xs text-gray-500 mt-2 flex gap-4">
            <span className="group relative">
              ⌘+Enter: Analyze
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                Analyze current notes
              </span>
            </span>
            <span className="group relative">
              ⌘+S: Save Lead
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                Save current analysis
              </span>
            </span>
            <span className="group relative">
              ⌘+⇧+N: New Note
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                Start fresh raw note
              </span>
            </span>
          </div>
        </div>

        {/* INPUT */}
        <div className="space-y-3">
          {/* Mode Toggle */}
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setMode("raw")}
              className={`px-4 py-2 border text-sm transition ${mode === "raw"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-gray-600 hover:border-gray-400"
                }`}
              aria-label="Switch to raw notes mode"
            >
              Raw Notes
            </button>

            <button
              type="button"
              onClick={() => setMode("guided")}
              className={`px-4 py-2 border text-sm transition ${mode === "guided"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-gray-600 hover:border-gray-400"
                }`}
              aria-label="Switch to guided mode"
            >
              Guided Mode
            </button>
          </div>

          {/* Insert Template - Only shows in Raw Mode */}
          {mode === "raw" && (
            <div className="flex justify-end">
              <button
                onClick={insertTemplate}
                className="text-xs text-blue-400 hover:text-blue-300 transition"
                aria-label="Insert sample template"
              >
                Insert Sample Template
              </button>
            </div>
          )}

          {/* Raw Notes Mode */}
          {mode === "raw" && (
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setInputDirty(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (!loading) analyzeLead();
                  }
                }}
                placeholder="Paste structured first-call notes..."
                className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-4 min-h-[220px] resize-none focus:outline-none"
                aria-label="Raw notes input"
              />

              <div className="flex justify-between text-xs mt-2">
                <span className="text-gray-500">
                  Structured first-call notes. Minimum 80 characters.
                </span>

                <span
                  className={
                    notes.trim().length < 80
                      ? "text-red-400"
                      : "text-green-400"
                  }
                >
                  {notes.trim().length}/80
                </span>
              </div>

              {notes && (
                <button
                  onClick={clearInput}
                  className="absolute top-4 right-4 text-xs text-gray-400 hover:text-gray-200"
                  aria-label="Clear input"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Guided Mode */}
          {mode === "guided" && (
            <div className="bg-[#0F141B] border border-[#1F2633] rounded-md p-6 mt-6">
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                Step {guidedStep} of 5
              </div>

              {/* GUIDED STEP CONTENT */}
              <div className="min-h-[160px]">
                {/* Step 1: Authority */}
                {guidedStep === 1 && (
                  <div className="space-y-6">
                    {/* Title/Context */}
                    <div className="text-xs uppercase tracking-widest text-gray-500">
                      Tier A Gate — Authority
                    </div>

                    {/* Decision Maker Count */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Decision Maker Count
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={guidedData.decisionMakerCount}
                        onChange={(e) =>
                          updateGuidedField("decisionMakerCount", e.target.value)
                        }
                        placeholder="e.g., 1 or 2"
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Decision maker count"
                      />
                    </div>

                    {/* Authority Alignment */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Are all decision makers aligned?
                      </label>
                      <select
                        value={guidedData.authorityAligned}
                        onChange={(e) =>
                          updateGuidedField("authorityAligned", e.target.value)
                        }
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Authority alignment"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>

                      {/* Optional: tiny hint */}
                      <div className="text-xs text-gray-500 mt-2">
                        If not aligned, this usually becomes PARK until confirmed.
                      </div>
                    </div>

                    {/* Inline validation hint */}
                    {(!guidedData.decisionMakerCount || !guidedData.authorityAligned) && (
                      <div className="text-xs text-yellow-400">
                        Required to proceed: decision maker count + alignment.
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Timeline */}
                {guidedStep === 2 && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div className="text-xs uppercase tracking-widest text-gray-500">
                      Tier A Gate — Timeline
                    </div>

                    {/* Timeline in Days */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Timeline (in days)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={guidedData.timelineDays}
                        onChange={(e) =>
                          updateGuidedField("timelineDays", e.target.value)
                        }
                        placeholder="e.g., 30, 60, 120"
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Timeline in days"
                      />
                    </div>

                    {/* Optional Hard Close Date */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Hard Close Date (optional)
                      </label>
                      <input
                        type="date"
                        value={guidedData.hardCloseDate}
                        onChange={(e) =>
                          updateGuidedField("hardCloseDate", e.target.value)
                        }
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Hard close date"
                      />
                    </div>

                    {/* Validation Hint */}
                    {!guidedData.timelineDays && (
                      <div className="text-xs text-yellow-400">
                        Timeline is required to proceed.
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Financial Reality */}
                {guidedStep === 3 && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div className="text-xs uppercase tracking-widest text-gray-500">
                      Financial Reality
                    </div>

                    {/* Price Expectation (REQUIRED) */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Seller Price Expectation
                      </label>
                      <input
                        type="text"
                        value={guidedData.priceExpectation}
                        onChange={(e) =>
                          updateGuidedField("priceExpectation", e.target.value)
                        }
                        placeholder="e.g., 450000 or 'around 450K'"
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Price expectation"
                      />
                    </div>

                    {/* Payoff Known */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Is Payoff Known?
                      </label>
                      <select
                        value={guidedData.payoffKnown}
                        onChange={(e) =>
                          updateGuidedField("payoffKnown", e.target.value)
                        }
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Payoff known"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    {/* Net Requirement (Optional) */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Net Requirement (optional)
                      </label>
                      <input
                        type="text"
                        value={guidedData.netRequirement}
                        onChange={(e) =>
                          updateGuidedField("netRequirement", e.target.value)
                        }
                        placeholder="e.g., needs 300K net"
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Net requirement"
                      />
                    </div>

                    {!guidedData.priceExpectation && (
                      <div className="text-xs text-yellow-400">
                        Price expectation is required to proceed.
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Motivation & Cooperation */}
                {guidedStep === 4 && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div className="text-xs uppercase tracking-widest text-gray-500">
                      Motivation & Cooperation
                    </div>

                    {/* Why Selling (REQUIRED) */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Why are they selling?
                      </label>
                      <textarea
                        value={guidedData.motivation}
                        onChange={(e) =>
                          updateGuidedField("motivation", e.target.value)
                        }
                        placeholder="Relocating, financial stress, inherited property, etc."
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500 resize-none min-h-[100px]"
                        aria-label="Motivation"
                      />
                    </div>

                    {/* Listing Plan */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        If no offer, will they list?
                      </label>
                      <select
                        value={guidedData.listingPlan}
                        onChange={(e) =>
                          updateGuidedField("listingPlan", e.target.value)
                        }
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Listing plan"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="unsure">Unsure</option>
                      </select>
                    </div>

                    {/* Access Flexibility */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Access Flexibility
                      </label>
                      <select
                        value={guidedData.accessFlexibility}
                        onChange={(e) =>
                          updateGuidedField("accessFlexibility", e.target.value)
                        }
                        className="w-full bg-[#131A26] border border-[#1F2633] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Access flexibility"
                      >
                        <option value="">Select</option>
                        <option value="high">High</option>
                        <option value="moderate">Moderate</option>
                        <option value="low">Low</option>
                      </select>
                    </div>

                    {!guidedData.motivation && (
                      <div className="text-xs text-yellow-400">
                        Motivation is required to proceed.
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5: Review & Generate */}
                {guidedStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-xs uppercase tracking-widest text-gray-500">
                      Review & Generate
                    </div>

                    <div className="text-sm text-gray-400 leading-relaxed">
                      Review collected inputs. When ready, generate structured notes and run analysis.
                    </div>

                    <div className="p-4 bg-[#131A26] border border-[#1F2633] rounded-md text-xs text-gray-400 whitespace-pre-wrap">
                      {buildStructuredNotes()}
                    </div>

                    <button
                      onClick={() => {
                        const structured = buildStructuredNotes();
                        
                        setNotes(structured);
                        
                        // Reset wizard state
                        setGuidedStep(1);
                        setGuidedData({
                          decisionMakerCount: "",
                          authorityAligned: "",
                          timelineDays: "",
                          hardCloseDate: "",
                          priceExpectation: "",
                          payoffKnown: "",
                          netRequirement: "",
                          motivation: "",
                          listingPlan: "",
                          accessFlexibility: "",
                        });
                        
                        setMode("raw");
                        
                        setTimeout(() => {
                          analyzeLead();
                        }, 100);
                      }}
                      className="bg-[#1F2633] hover:bg-[#2A3242] text-white px-4 py-2 rounded-md text-sm transition"
                      aria-label="Generate and analyze"
                    >
                      Generate & Analyze
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setGuidedStep((prev) => Math.max(prev - 1, 1))}
                  className="text-sm text-gray-500 hover:text-gray-300"
                  aria-label="Previous step"
                >
                  Back
                </button>

                {/* Next button - Hidden on Step 5 */}
                {guidedStep < 5 && (
                  <button
                    onClick={() => {
                      // Step validation gates
                      if (guidedStep === 1 && !step1Complete) return;
                      if (guidedStep === 2 && !step2Complete) return;
                      if (guidedStep === 3 && !step3Complete) return;
                      if (guidedStep === 4 && !step4Complete) return;

                      setGuidedStep((prev) => Math.min(prev + 1, 5));
                    }}
                    disabled={
                      (guidedStep === 1 && !step1Complete) ||
                      (guidedStep === 2 && !step2Complete) ||
                      (guidedStep === 3 && !step3Complete) ||
                      (guidedStep === 4 && !step4Complete)
                    }
                    className={`text-sm text-white px-4 py-2 rounded-md transition ${
                      (guidedStep === 1 && !step1Complete) ||
                      (guidedStep === 2 && !step2Complete) ||
                      (guidedStep === 3 && !step3Complete) ||
                      (guidedStep === 4 && !step4Complete)
                        ? "bg-[#1F2633]/50 cursor-not-allowed"
                        : "bg-[#1F2633] hover:bg-[#2A3242]"
                    }`}
                    aria-label="Next step"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="text-xs text-red-400">
              {errorMsg}
            </div>
          )}

          <button
            onClick={analyzeLead}
            disabled={loading || notes.trim().length < 80}
            className={`px-6 py-2.5 text-white rounded-lg transition ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : notes.trim().length < 80
                ? "bg-gray-700 cursor-not-allowed"
                : inputDirty
                  ? "bg-yellow-600 hover:bg-yellow-500"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            aria-label="Analyze lead"
          >
            {loading
              ? "Analyzing..."
              : result
                ? "Re-analyze"
                : "Analyze Lead"}
          </button>
        </div>

        {/* OUTPUT - Only show when we have results */}
        {!loading && result?.classification && (
          <div
            ref={resultRef}
            className="space-y-8"
          >
            {/* Export buttons and Save button */}
            {result && (
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => copyToClipboard(notes)}
                  className="text-xs bg-[#1F2633] hover:bg-[#2A3242] px-3 py-1.5 rounded-md transition group relative"
                  aria-label="Copy notes to clipboard"
                >
                  Copy Notes
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Copy to clipboard
                  </span>
                </button>

                <button
                  onClick={() =>
                    downloadFile("structured-notes.txt", notes)
                  }
                  className="text-xs bg-[#1F2633] hover:bg-[#2A3242] px-3 py-1.5 rounded-md transition group relative"
                  aria-label="Download notes as text file"
                >
                  Download Notes
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Save as .txt
                  </span>
                </button>

                <button
                  onClick={() =>
                    downloadFile("verdict-summary.txt", buildVerdictSummary())
                  }
                  className="text-xs bg-[#1F2633] hover:bg-[#2A3242] px-3 py-1.5 rounded-md transition group relative"
                  aria-label="Download verdict summary"
                >
                  Download Verdict
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Save verdict as .txt
                  </span>
                </button>

                <button
                  onClick={saveCurrentLead}
                  className="text-xs bg-[#1F2633] hover:bg-[#2A3242] px-3 py-1.5 rounded-md transition group relative"
                  aria-label="Save current lead"
                >
                  Save Lead
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Save to localStorage
                  </span>
                </button>
              </div>
            )}

            <div
              className={`space-y-8 transition-opacity duration-300 ${inputDirty ? "opacity-60" : "opacity-100"
                }`}
            >
              {inputDirty && (
                <div className="text-sm text-yellow-400">
                  Input modified. Analysis outdated.
                </div>
              )}

              {/* DECISION PANEL */}
              <div
                className={`p-6 bg-[#131A26] border-l-4 ${getAccentColor()} rounded-xl shadow-lg`}
              >
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-[#1F2633]">
                  <div>
                    <div className="flex items-center gap-3 text-xs uppercase text-gray-400 tracking-widest mb-1">
                      Classification
                      <button
                        onClick={() =>
                          setShowGuide(!showGuide)
                        }
                        className="w-5 h-5 flex items-center justify-center rounded-md border text-xs border-[#1F2633] text-gray-400 hover:border-blue-400 hover:text-blue-400 transition"
                        aria-label="Show classification guide"
                      >
                        ?
                      </button>
                    </div>

                    <span
                      className={`px-4 py-1.5 rounded-md border text-sm font-semibold tracking-wide shadow-md ${getVerdictColor() === "green"
                        ? "bg-green-500/5 text-green-500 border-green-500/20"
                        : getVerdictColor() === "yellow"
                          ? "bg-yellow-500/5 text-yellow-500 border-yellow-500/20"
                          : "bg-red-500/5 text-red-500 border-red-500/20"
                        }`}
                    >
                      {result.classification}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase text-blue-500 tracking-widest mb-1">
                      Deal Health
                    </div>
                    <div
                      className={`text-2xl font-bold ${getVerdictColor() === "green"
                        ? "text-green-500"
                        : getVerdictColor() === "yellow"
                          ? "text-yellow-500"
                          : "text-red-500"
                        }`}
                    >
                      {getClampedScore()} / 5
                    </div>
                    {renderHealthBar()}
                  </div>
                </div>

                <div className="mt-3 pt-2">
                  <button
                    onClick={() =>
                      setShowStructural(!showStructural)
                    }
                    className="text-xs text-gray-500 hover:text-gray-300 transition inline-block"
                    aria-label="Toggle scoring components"
                  >
                    {showStructural
                      ? "Hide scoring components"
                      : "View scoring components"}
                  </button>

                  {showStructural &&
                    result.score_breakdown && (
                      <div className="mt-4">
                        {Object.entries(
                          result.score_breakdown
                        ).map(([key, value]: [string, any]) => (
                          <div
                            key={key}
                            className="flex justify-between text-sm border-b border-[#1F2633] py-3"
                          >
                            <div className="text-gray-400 tracking-wide">
                              {key.replace("_score", "")}
                            </div>
                            <div className="font-medium">
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              {/* Tier A Warning Block */}
              {result?.extracted_signals && (
                <>
                  {(!result.extracted_signals.authority_aligned ||
                    !result.extracted_signals.timeline_days) && (
                    <div className="mt-6 p-4 border border-[#2A2F3A] bg-[#0F141D] text-sm text-yellow-400 rounded-md">
                      Structural Warning: Tier A signals unresolved.
                      Do not underwrite until authority and timeline are confirmed.
                    </div>
                  )}
                </>
              )}

              {showGuide && (
                <div className="text-sm text-gray-400 space-y-1">
                  <div>
                    <strong>CHASE:</strong> Immediate underwriting supported.
                  </div>
                  <div>
                    <strong>PARK:</strong> Clarification required before capital deployment.
                  </div>
                  <div>
                    <strong>DROP:</strong> Structural misalignment; redeploy focus.
                  </div>
                </div>
              )}

              {/* EXTRACTED SIGNALS */}
              <div className="p-6 bg-[#131A26] rounded-xl shadow-lg shadow-black/40 space-y-3 border-[#1F2633]">
                <div className="text-xs uppercase text-blue-400 tracking-widest">
                  Extracted Signals
                </div>

                {result?.extracted_signals ? (
                  <>
                    {renderSignal("Timeline Days", result.extracted_signals.timeline_days, "No defined closing window detected.")}
                    {renderSignal("Listing Trigger Days", result.extracted_signals.listing_trigger_days, "No listing trigger identified.")}
                    {renderSignal("Decision Maker Count", result.extracted_signals.decision_maker_count, "Decision maker count unclear.")}
                    {renderSignal("Authority Aligned", result.extracted_signals.authority_aligned, "Authority alignment not confirmed.")}
                    {renderSignal("Payoff Known", result.extracted_signals.payoff_known, "Payoff amount not provided.")}
                    {renderSignal("Retail Anchor", result.extracted_signals.retail_anchor, "No retail anchor identified.")}
                    {renderSignal("Motivation Strength", result.extracted_signals.motivation_strength, "Motivation strength unclear.")}
                    {renderSignal("Occupancy Type", result.extracted_signals.occupancy_type, "Occupancy status unknown.")}
                    {renderSignal("Cooperation Level", result.extracted_signals.cooperation_level, "Cooperation level not assessed.")}
                  </>
                ) : (
                  <div className="text-sm text-gray-400">
                    N/A — No signals extracted from input.
                  </div>
                )}
              </div>

              {/* REQUIRED ACTION SECTION (formerly Immediate Next Action) */}
              <div className="p-8 bg-[#131A26] rounded-xl shadow-lg shadow-black/40 space-y-4">
                <div className="text-xs uppercase text-blue-400 tracking-widest">
                  Required Action
                </div>

                {result.immediate_next_action?.action ? (
                  <>
                    <div className="text-lg font-medium">
                      {result.immediate_next_action.action}
                    </div>
                    {result.immediate_next_action?.why && (
                      <div className="text-sm text-gray-400 leading-relaxed">
                        {result.immediate_next_action.why}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-lg font-medium">
                    {result.classification === "DROP" &&
                      "Disqualify lead. Reallocate time immediately."}
                    {result.classification === "PARK" &&
                      "Schedule structured follow-up to resolve missing signals."}
                    {result.classification === "CHASE" &&
                      "Initiate underwriting and move to offer structuring."}
                  </div>
                )}

                {/* Directional Action Buttons */}
                <div className="mt-4 flex gap-3 flex-wrap">
                  {result.classification === "CHASE" && (
                    <button className="bg-[#1F2633] hover:bg-[#2A3242] text-white text-xs px-4 py-2 rounded-md transition group relative">
                      Begin Offer Structuring
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                        Start underwriting process
                      </span>
                    </button>
                  )}

                  {result.classification === "PARK" && (
                    <button className="bg-[#1F2633] hover:bg-[#2A3242] text-white text-xs px-4 py-2 rounded-md transition group relative">
                      Schedule Clarification Call
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                        Book follow-up
                      </span>
                    </button>
                  )}

                  {result.classification === "DROP" && (
                    <button className="bg-[#1F2633] hover:bg-[#2A3242] text-white text-xs px-4 py-2 rounded-md transition group relative">
                      Disqualify & Move On
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2633] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                        Remove from pipeline
                      </span>
                    </button>
                  )}
                </div>

                {/* Accountability Microcopy */}
                <div className="mt-6 text-xs text-gray-500">
                  Did you execute the required action before moving to the next lead?
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved Leads Panel - Collapsible */}
        {savedLeads.length > 0 && (
          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-gray-500">
                Saved Leads ({savedLeads.length})
              </div>
              <div className="flex gap-3">
                <button
                  onClick={exportAllLeads}
                  disabled={exporting}
                  className={`text-xs px-3 py-1.5 rounded-md transition ${
                    exporting 
                      ? "bg-[#1F2633]/50 cursor-not-allowed" 
                      : "bg-[#1F2633] hover:bg-[#2A3242]"
                  }`}
                  aria-label="Export all leads"
                >
                  {exporting ? "Exporting..." : "Export All"}
                </button>
                <button
                  onClick={() => setShowSavedLeads(!showSavedLeads)}
                  className="text-xs bg-[#1F2633] hover:bg-[#2A3242] px-3 py-1.5 rounded-md transition"
                  aria-label={showSavedLeads ? "Hide saved leads" : "Show saved leads"}
                >
                  {showSavedLeads ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {showSavedLeads && (
              <div className="space-y-3">
                {savedLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 bg-[#131A26] border border-[#1F2633] rounded-md"
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-sm">
                        <div className="font-medium">
                          {lead.classification} — {lead.score}/5
                        </div>
                        <div className="text-xs text-gray-500">
                          {lead.timestamp}
                        </div>
                        {/* User note display/edit */}
                        {editingNoteId === lead.id ? (
                          <div className="mt-2">
                            <textarea
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Add a note..."
                              className="w-full bg-[#0B0F17] border border-[#1F2633] rounded-md p-2 text-xs text-white resize-none"
                              rows={2}
                              aria-label="Lead note"
                            />
                            <div className="flex gap-2 mt-1">
                              <button
                                onClick={() => addNoteToLead(lead.id, noteText)}
                                className="text-xs text-green-400 hover:text-green-300"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingNoteId(null);
                                  setNoteText("");
                                }}
                                className="text-xs text-gray-400 hover:text-gray-300"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          lead.userNote && (
                            <div className="mt-2 text-xs text-gray-400 border-l-2 border-[#1F2633] pl-2">
                              {lead.userNote}
                            </div>
                          )
                        )}
                      </div>

                      <div className="flex gap-3">
                        {!editingNoteId && (
                          <button
                            onClick={() => {
                              setEditingNoteId(lead.id);
                              setNoteText(lead.userNote || "");
                            }}
                            className="text-xs text-gray-400 hover:text-gray-300 transition"
                            aria-label={lead.userNote ? "Edit note" : "Add note"}
                          >
                            {lead.userNote ? "Edit Note" : "Add Note"}
                          </button>
                        )}
                        <button
                          onClick={() => loadLead(lead)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition"
                          aria-label="Load lead"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          disabled={deletingId === lead.id}
                          className={`text-xs transition ${
                            deletingId === lead.id
                              ? "text-gray-500 cursor-not-allowed"
                              : "text-red-400 hover:text-red-300"
                          }`}
                          aria-label="Delete lead"
                        >
                          {deletingId === lead.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}