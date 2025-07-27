import React from 'react'
import useGame from './hooks/useGame'
import NumberPicker from './components/NumberPicker'
import NumberGuesser from './components/NumberGuesser'
import Feedback from './components/Feedback'
import GuessList from './components/GuessList'

const App: React.FC = () => {
  const {
    secretNumber,
    setSecretNumber,
    makeGuess,
    guesses,
    feedback,
    resetGame
  } = useGame()

  return (
    <div className="app-container">
      <h1>Number Guessing Game</h1>
      {secretNumber === null ? (
        <NumberPicker onPick={setSecretNumber} />
      ) : feedback !== 'correct' ? (
        <>
          <NumberGuesser onGuess={makeGuess} />
          <Feedback feedback={feedback} />
          <GuessList guesses={guesses} />
        </>
      ) : (
        <div className="game-over">
          <p>Congratulations! You guessed the number in {guesses.length} attempts.</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  )
}

export default App