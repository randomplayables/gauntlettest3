import React, { useState } from 'react'
import { MIN_NUMBER, MAX_NUMBER } from '../constants'

interface NumberPickerProps {
  onPick: (num: number) => void
}

const NumberPicker: React.FC<NumberPickerProps> = ({ onPick }) => {
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
    const num = parseInt(inputValue, 10)
    if (isNaN(num) || num < MIN_NUMBER || num > MAX_NUMBER) {
      setError(`Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`)
      return
    }
    onPick(num)
  }

  return (
    <form onSubmit={handleSubmit} className="number-picker">
      <label htmlFor="number-input">
        Pick a secret number ({MIN_NUMBER}–{MAX_NUMBER}):
      </label>
      <input
        id="number-input"
        type="number"
        value={inputValue}
        onChange={handleChange}
        min={MIN_NUMBER}
        max={MAX_NUMBER}
        placeholder={`${MIN_NUMBER}`}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Set Number</button>
    </form>
  )
}

export default NumberPicker