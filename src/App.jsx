import './App.css'
import Header from './components/Header/Header'
import Status from './components/Status/Status'
import Chip from './components/Chip/Chip.jsx'
import Keyboard from './components/Keyboard/Keyboard.jsx'
import { clsx } from 'clsx'

import React, { useEffect, useState } from 'react'
import { languages } from './languages.js'
import { getFarewellText , getRandomWord} from './utils.js'
import Confetti from 'react-confetti'

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const [farewellText, setFarewellText] = useState('')

  //Derived values
  const wrongGuessCount = guessedLetters.filter(
    letter => !currentWord.includes(letter)
  ).length
  const isGameLost = wrongGuessCount >= languages.length
  const isGameWon = currentWord.split('').every(
    letter => guessedLetters.includes(letter)
  )
  const isGameOver = isGameLost || isGameWon

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  useEffect(() => {
    if(wrongGuessCount > 0) {
      setFarewellText(getFarewellText(languages[wrongGuessCount - 1].name))
    }
  }
  , [wrongGuessCount])

  const word = currentWord.split('').map((letter, index) => {
    const isCorrect = guessedLetters.includes(letter);
    const shouldRevealLetter = isGameLost || isCorrect

    return (
      <span key={index} className={shouldRevealLetter ? 'correct' : 'hidden'}>
        {shouldRevealLetter ? letter.toUpperCase() : ''}
      </span>
    );
  });

  const languagesChips = languages.map(
    (language, index) => (
      <Chip 
          className={clsx('chip', { 'lost': index < wrongGuessCount })}
          key={language.name}
          languageObj={language}
      />
    )
  )

  function onLetterClick(letter) {
    setGuessedLetters(prevLetters => 
        prevLetters.includes(letter) ? 
            prevLetters : 
            [...prevLetters, letter]
    )
  }

  function resetGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
    setFarewellText('')
  }

  return (
    <main>
      <Header />
      { isGameWon && <Confetti />}
      <Status 
          isGameOver={isGameOver} 
          isGameWon={isGameWon} 
          isGameLost={isGameLost} 
          farewell={farewellText}
      />

      <section className='chips-container'>
        {languagesChips}
      </section>

      <section className='word-container'>
        {word}
      </section>

      <Keyboard 
          alphabet={alphabet} 
          onLetterClick={onLetterClick}
          guessedLetters={guessedLetters}
          currentWord={currentWord}
          isGameOver={isGameOver}
      />

      { isGameOver && <button onClick={resetGame}>New Game</button> }
    </main>
  )
}

export default App
