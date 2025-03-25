import { clsx } from 'clsx'
import './Status.css'

const Status = (props) => {
  const gameStatusClass = clsx('status', {
    'lost': props.isGameLost,
    'won': props.isGameWon,
    'farewell': props.farewell != "" ? true : false 
  })

  function RenderGameStatus() {
    if (!props.isGameOver) {
      return ( 
        <>
          <p>{ props.farewell }</p>
        </>
      )
    }

    if (props.isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    }

    if (props.isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly!</p>
        </>
      )
    }
  }

  return (
    <section aria-live="polite" role="status" className={gameStatusClass}>
      { RenderGameStatus() }
    </section>
  )
}

export default Status