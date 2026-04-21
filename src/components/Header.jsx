export default function Header({ theme, onToggleTheme, onHome, currentView, onMultiplayer }) {
  return (
    <header className="header">
      <div className="header-left">
        {currentView !== 'decks' && (
          <button className="btn-icon" onClick={onHome} title="Back to decks">←</button>
        )}
        <h1 className="header-title">🧠 Memory Game</h1>
      </div>
      <div className="header-right">
        {currentView === 'decks' && (
          <button className="btn-multiplayer" onClick={onMultiplayer} title="Multiplayer">
            👥 Multiplayer
          </button>
        )}
        <button className="btn-icon theme-toggle" onClick={onToggleTheme} title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
