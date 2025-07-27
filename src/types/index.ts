export type Feedback = 'too low' | 'too high' | 'correct' | null

export interface SessionData {
  sessionId: string
}

export interface GameRoundData {
  guesses: number[]
  feedback: Feedback
}

export interface UseGame {
  secretNumber: number | null
  setSecretNumber: (num: number) => void
  makeGuess: (guess: number) => void
  guesses: number[]
  feedback: Feedback
  resetGame: () => void
}