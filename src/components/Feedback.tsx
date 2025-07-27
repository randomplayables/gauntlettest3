import React from 'react'

interface FeedbackProps {
  feedback: 'too low' | 'too high' | 'correct' | null
}

const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {
  if (feedback === null) {
    return null
  }

  let message = ''
  if (feedback === 'too low') {
    message = 'Your guess is too low.'
  } else if (feedback === 'too high') {
    message = 'Your guess is too high.'
  } else {
    message = 'Your guess is correct!'
  }

  return <p className="feedback">{message}</p>
}

export default Feedback