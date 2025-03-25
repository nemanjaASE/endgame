import './Keyboard.css'
import { clsx } from 'clsx'

const Keyboard = (props) => { 
    return (
        <section className='keyboard-container'>
        {props.alphabet.split('').map(
            (letter, index) => {
            const isGuessed = props.guessedLetters.includes(letter)
            const isCorrect = isGuessed && props.currentWord.includes(letter)
            const isWrong = isGuessed && !props.currentWord.includes(letter)
            const className = clsx({
                correct: isCorrect,
                wrong: isWrong,
            })

            return (
                <button 
                    disabled={props.isGameOver}
                    aria-disabled={props.guessedLetters.includes(letter)}
                    aria-label={`Letter ${letter}`}
                    key={index} 
                    className={className} 
                    onClick={() => props.onLetterClick(letter)}
                >
                    {letter.toUpperCase()}
                </button>
            )}
        )}
        </section>
    )
}

export default Keyboard;