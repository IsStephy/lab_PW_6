import { useState, useEffect, useCallback, useRef } from 'react'
import { generateCards } from '../utils/cardData'

export function useGame(deck, gridSize) {
  const [cards, setCards] = useState(() => generateCards(deck.cardTheme, gridSize.pairs))
  const [flippedIds, setFlippedIds] = useState([])
  const [matchedPairIds, setMatchedPairIds] = useState(new Set())
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing')
  const [isChecking, setIsChecking] = useState(false)

  const timerRef = useRef(null)
  const checkRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000)
    return () => {
      clearInterval(timerRef.current)
      clearTimeout(checkRef.current)
    }
  }, [])

  useEffect(() => {
    if (gameStatus === 'won') clearInterval(timerRef.current)
  }, [gameStatus])

  const flipCard = useCallback((cardId) => {
    if (isChecking || flippedIds.length >= 2 || flippedIds.includes(cardId)) return

    const newFlipped = [...flippedIds, cardId]
    setFlippedIds(newFlipped)

    if (newFlipped.length < 2) return

    setMoves(m => m + 1)
    setIsChecking(true)

    const c1 = cards.find(c => c.id === newFlipped[0])
    const c2 = cards.find(c => c.id === newFlipped[1])

    if (c1.pairId === c2.pairId) {
      setMatchedPairIds(prev => {
        const next = new Set([...prev, c1.pairId])
        if (next.size === gridSize.pairs) setGameStatus('won')
        return next
      })
      setFlippedIds([])
      setIsChecking(false)
    } else {
      checkRef.current = setTimeout(() => {
        setFlippedIds([])
        setIsChecking(false)
      }, 900)
    }
  }, [isChecking, flippedIds, cards, gridSize.pairs])

  const resetGame = useCallback(() => {
    clearInterval(timerRef.current)
    clearTimeout(checkRef.current)
    setCards(generateCards(deck.cardTheme, gridSize.pairs))
    setFlippedIds([])
    setMatchedPairIds(new Set())
    setMoves(0)
    setTime(0)
    setGameStatus('playing')
    setIsChecking(false)
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000)
  }, [deck, gridSize])

  return { cards, flippedIds, matchedPairIds, moves, time, gameStatus, isChecking, flipCard, resetGame }
}
