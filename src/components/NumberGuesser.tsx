import React, { useState } from 'react'
import { MIN_NUMBER, MAX_NUMBER } from '../constants'

interface NumberGuesserProps {
  onGuess: (num: number) => void
}

const NumberGuesser: React.FC<NumberGuesserProps> = ({ onGuess }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (error) {
      setError('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const guess = parseInt(inputValue, 10)
    if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
      setError(`Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`)
      return
    }
    onGuess(guess)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="number-guesser">
      <label htmlFor="guess-input">
        Enter your guess ({MIN_NUMBER}–{MAX_NUMBER}):
      </label>
      <input
        id="guess-input"
        type="number"
        value={inputValue}
        onChange={handleChange}
        min={MIN_NUMBER}
        max={MAX_NUMBER}
        placeholder={`${MIN_NUMBER}`}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Submit Guess</button>
    </form>
  )
}

export default NumberGuesser