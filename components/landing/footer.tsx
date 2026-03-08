export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <span className="text-background font-bold text-xs">DT</span>
            </div>
            <span className="text-sm text-muted-foreground">Deal Triage OS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Structural acquisition intelligence for real estate wholesalers.
          </p>
        </div>
      </div>
    </footer>
  );
}
