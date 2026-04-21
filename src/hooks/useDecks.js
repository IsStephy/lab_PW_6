import { useState, useCallback } from 'react'
import { loadDecks, saveDecks } from '../utils/storage'

export function useDecks() {
  const [decks, setDecks] = useState(loadDecks)

  const commit = useCallback((next) => {
    setDecks(next)
    saveDecks(next)
  }, [])

  const addDeck = useCallback((name, cardTheme) => {
    commit([...decks, {
      id: Date.now().toString(),
      name,
      cardTheme,
      favorite: false,
      createdAt: Date.now(),
      bestScores: {},
    }])
  }, [decks, commit])

  const deleteDeck = useCallback((id) => {
    commit(decks.filter(d => d.id !== id))
  }, [decks, commit])

  const toggleFavorite = useCallback((id) => {
    commit(decks.map(d => d.id === id ? { ...d, favorite: !d.favorite } : d))
  }, [decks, commit])

  return { decks, addDeck, deleteDeck, toggleFavorite }
}
