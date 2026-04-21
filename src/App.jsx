import { useState } from 'react'
import { useDecks } from './hooks/useDecks'
import DeckManager from './components/DeckManager'
import GameBoard from './components/GameBoard'

const DEFAULT_GRID = { id: 'easy', label: 'Easy', cols: 4, pairs: 8 }
const DEFAULT_STYLE = { id: 'classic', label: 'Classic' }

export default function App() {
  const [view, setView] = useState('decks')
  const [selectedDeck, setSelectedDeck] = useState(null)
  const { decks, addDeck, deleteDeck, toggleFavorite } = useDecks()

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          {view !== 'decks' && (
            <button className="btn-icon" onClick={() => { setView('decks'); setSelectedDeck(null) }}>←</button>
          )}
          <h1 className="header-title">🧠 Memory Game</h1>
        </div>
      </header>
      <main className="main-content">
        {view === 'decks' && (
          <DeckManager decks={decks} onPlay={(deck) => { setSelectedDeck(deck); setView('game') }}
            onDelete={deleteDeck} onToggleFavorite={toggleFavorite} onAddDeck={addDeck} />
        )}
        {view === 'game' && selectedDeck && (
          <GameBoard deck={selectedDeck} gridSize={DEFAULT_GRID} cardStyle={DEFAULT_STYLE}
            onBack={() => { setView('decks'); setSelectedDeck(null) }} onWin={() => {}} />
        )}
      </main>
    </div>
  )
}
