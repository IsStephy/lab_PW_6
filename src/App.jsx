import { useState, useEffect } from 'react'
import { loadSettings, saveSettings } from './utils/storage'
import { useDecks } from './hooks/useDecks'
import Header from './components/Header'
import DeckManager from './components/DeckManager'
import GameSettings from './components/GameSettings'
import GameBoard from './components/GameBoard'

export default function App() {
  const [view, setView] = useState('decks') // decks | settings | game
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [gameConfig, setGameConfig] = useState(null)
  const [theme, setTheme] = useState(() => loadSettings().theme || 'light')
  const { decks, addDeck, deleteDeck, toggleFavorite, updateBestScore } = useDecks()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    saveSettings({ theme })
  }, [theme])

  const handlePlay = (deck) => { setSelectedDeck(deck); setView('settings') }
  const handleStartGame = (gridSize, cardStyle) => { setGameConfig({ gridSize, cardStyle }); setView('game') }
  const handleWin = ({ moves, time, gridId }) => updateBestScore(selectedDeck.id, gridId, { moves, time })
  const handleBack = () => { setView('decks'); setSelectedDeck(null); setGameConfig(null) }

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        onHome={handleBack}
        currentView={view}
        onMultiplayer={() => alert('Multiplayer coming soon!')}
      />
      <main className="main-content">
        {view === 'decks' && (
          <DeckManager decks={decks} onPlay={handlePlay} onDelete={deleteDeck}
            onToggleFavorite={toggleFavorite} onAddDeck={addDeck} />
        )}
        {view === 'settings' && selectedDeck && (
          <GameSettings deck={selectedDeck} onStart={handleStartGame} onBack={() => setView('decks')} />
        )}
        {view === 'game' && selectedDeck && gameConfig && (
          <GameBoard deck={selectedDeck} gridSize={gameConfig.gridSize} cardStyle={gameConfig.cardStyle}
            onBack={handleBack} onWin={handleWin} />
        )}
      </main>
    </div>
  )
}
