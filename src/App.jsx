import { useState } from 'react'
import { useDecks } from './hooks/useDecks'
import DeckManager from './components/DeckManager'
import GameSettings from './components/GameSettings'
import GameBoard from './components/GameBoard'

export default function App() {
  const [view, setView] = useState('decks')
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [gameConfig, setGameConfig] = useState(null)
  const { decks, addDeck, deleteDeck, toggleFavorite } = useDecks()

  const handleBack = () => { setView('decks'); setSelectedDeck(null); setGameConfig(null) }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          {view !== 'decks' && (
            <button className="btn-icon" onClick={handleBack}>←</button>
          )}
          <h1 className="header-title">🧠 Memory Game</h1>
        </div>
      </header>
      <main className="main-content">
        {view === 'decks' && (
          <DeckManager decks={decks} onPlay={(deck) => { setSelectedDeck(deck); setView('settings') }}
            onDelete={deleteDeck} onToggleFavorite={toggleFavorite} onAddDeck={addDeck} />
        )}
        {view === 'settings' && selectedDeck && (
          <GameSettings deck={selectedDeck}
            onStart={(gridSize, cardStyle) => { setGameConfig({ gridSize, cardStyle }); setView('game') }}
            onBack={() => setView('decks')} />
        )}
        {view === 'game' && selectedDeck && gameConfig && (
          <GameBoard deck={selectedDeck} gridSize={gameConfig.gridSize} cardStyle={gameConfig.cardStyle}
            onBack={handleBack} onWin={() => {}} />
        )}
      </main>
    </div>
  )
}
