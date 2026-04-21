import GameBoard from './components/GameBoard'

const DECK = { id: '1', name: 'Animals', cardTheme: 'animals' }
const GRID = { id: 'easy', label: 'Easy', cols: 4, pairs: 8 }
const STYLE = { id: 'classic', label: 'Classic' }

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">🧠 Memory Game</h1>
        </div>
      </header>
      <main className="main-content">
        <GameBoard deck={DECK} gridSize={GRID} cardStyle={STYLE} onBack={() => {}} onWin={() => {}} />
      </main>
    </div>
  )
}
