```typescript
import { useState, useEffect } from 'react'
import { initGameSession, saveGameData } from '../services/apiService'

type Feedback = 'too low' | 'too high' | 'correct' | null

interface UseGame {
  secretNumber: number | null
  setSecretNumber: (num: number) => void
  makeGuess: (guess: number) => void
  guesses: number[]
  feedback: Feedback
  resetGame: () => void
}

function useGame(): UseGame {
  const [secretNumber, setSecretNumber] = useState<number | null>(null)
  const [guesses, setGuesses] = useState<number[]>([])
  const [feedback, setFeedback] = useState<Feedback>(null)

  useEffect(() => {
    const initialize = async () => {
      try {
        await initGameSession()
      } catch (error) {
        console.error('Error initializing game session:', error)
      }
    }
    initialize()
  }, [])

  const makeGuess = (guess: number) => {
    if (secretNumber === null) {
      console.warn('Secret number is not set.')
      return
    }
    const updatedGuesses = [...guesses, guess]
    setGuesses(updatedGuesses)

    let result: Feedback = 'correct'
    if (guess < secretNumber) {
      result = 'too low'
    } else if (guess > secretNumber) {
      result = 'too high'
    }

    setFeedback(result)

    saveGameData({
      guesses: updatedGuesses,
      feedback: result,
    }).catch((error) => {
      console.error('Error saving game data:', error)
    })
  }

  const resetGame = () => {
    setSecretNumber(null)
    setGuesses([])
    setFeedback(null)
    const initialize = async () => {
      try {
        await initGameSession()
      } catch (error) {
        console.error('Error re-initializing game session:', error)
      }
    }
    initialize()
  }

  return {
    secretNumber,
    setSecretNumber,
    makeGuess,
    guesses,
    feedback,
    resetGame,
  }
}

export default useGame
```