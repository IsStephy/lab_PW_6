const DECKS_KEY = 'mcg-decks'
const SETTINGS_KEY = 'mcg-settings'

function defaultDecks() {
  return [
    { id: '1', name: 'Animals',          cardTheme: 'animals', favorite: false, createdAt: Date.now() - 2000, bestScores: {} },
    { id: '2', name: 'Yummy Food',       cardTheme: 'food',    favorite: true,  createdAt: Date.now() - 1000, bestScores: {} },
    { id: '3', name: 'Beautiful Nature', cardTheme: 'nature',  favorite: false, createdAt: Date.now(),        bestScores: {} },
  ]
}

export function loadDecks() {
  try { return JSON.parse(localStorage.getItem(DECKS_KEY)) || defaultDecks() }
  catch { return defaultDecks() }
}

export function saveDecks(decks) {
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks))
}

export function loadSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {} }
  catch { return {} }
}

export function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
}
