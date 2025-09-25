export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-3">
            <img src="https://tacitlabs.co/Tacit%20Logo.png" alt="Tacit Labs" className="w-8 h-8" />
            <span className="font-semibold text-lg text-foreground">Tacit Labs</span>
          </div>
        </div>
      </div>
    </header>
  )
}
