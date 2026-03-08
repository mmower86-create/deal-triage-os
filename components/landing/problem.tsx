import { UserX, DollarSign, Clock, Target } from "lucide-react";

export function Problem() {
  const problems = [
    {
      icon: UserX,
      text: "Seller isn't the decision maker",
    },
    {
      icon: Clock,
      text: "Timeline isn't real",
    },
    {
      icon: Target,
      text: "Motivation is weak",
    },
    {
      icon: DollarSign,
      text: "Price expectations are unrealistic",
    },
  ];

  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="max-w-3xl mb-12">
          <p className="text-accent font-mono text-sm mb-3">THE PROBLEM</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight text-balance">
            Most wholesalers waste 70% of their time on dead deals.
          </h2>
        </div>

        {/* Body content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Every week investors analyze 25-50 leads.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              But most deals fail for the same structural reasons:
            </p>
            
            {/* Problem list */}
            <ul className="space-y-4 mb-8">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/10 rounded-lg shrink-0">
                    <problem.icon className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-foreground">{problem.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:pl-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-foreground leading-relaxed mb-4">
                By the time you realize it, you&apos;ve already spent <span className="text-destructive font-semibold">30-60 minutes</span> underwriting a deal that will never close.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-foreground font-medium">
                  Deal Triage OS identifies these structural problems <span className="text-accent">in seconds.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
