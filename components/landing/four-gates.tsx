import { Shield, Clock, DollarSign, Heart } from "lucide-react";

export function FourGates() {
  const gates = [
    {
      icon: Shield,
      name: "Authority",
      question: "Can they actually sell?",
      description: "Verify ownership, title issues, probate status, and decision-making power before you invest time.",
      examples: ["Sole owner or joint?", "Probate filed?", "Power of Attorney?", "Divorce pending?"],
    },
    {
      icon: Clock,
      name: "Timeline",
      question: "When do they need to sell?",
      description: "Understand urgency and deadlines. No timeline = no deal motivation.",
      examples: ["Foreclosure date?", "Moving deadline?", "Job relocation?", "Estate settlement?"],
    },
    {
      icon: DollarSign,
      name: "Financial Reality",
      question: "Do the numbers work?",
      description: "Validate equity position, mortgage balance, and realistic price expectations.",
      examples: ["Mortgage balance?", "Liens or judgments?", "Price expectations?", "Equity position?"],
    },
    {
      icon: Heart,
      name: "Motivation",
      question: "Why are they selling?",
      description: "Uncover the real reason. Strong motivation = flexible terms and faster closes.",
      examples: ["Life event trigger?", "Property burden?", "Financial pressure?", "Emotional attachment?"],
    },
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-accent font-mono text-sm mb-3">THE FRAMEWORK</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Every deal is evaluated using four structural signals.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            The Four Gate Framework ensures you never waste time on structurally invalid deals.
            Each signal must pass before a lead deserves your attention.
          </p>
        </div>

        {/* Gates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gates.map((gate, index) => (
            <div
              key={index}
              className="group p-6 bg-card border border-border rounded-xl hover:border-muted-foreground/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <gate.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground">GATE {index + 1}</span>
                    <h3 className="text-lg font-semibold text-foreground">{gate.name}</h3>
                  </div>
                  <p className="text-foreground font-medium mb-2">{gate.question}</p>
                  <p className="text-muted-foreground text-sm mb-4">{gate.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {gate.examples.map((example, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
