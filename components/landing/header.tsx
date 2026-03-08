"use client";

interface HeaderProps {
  onLoginClick: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-sm">DT</span>
          </div>
          <span className="font-semibold text-foreground">Deal Triage OS</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#framework" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Framework
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Pricing
          </a>
          <button
            onClick={onLoginClick}
            className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
          >
            Log in
          </button>
        </nav>
      </div>
    </header>
  );
}
