// IMPORTANDO HOOKS
import { useCallback, useEffect, useState } from 'react'

// IMPORTANDO COMPONENTES
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

// IMPORTANDO ESTILO
import './App.css'

// IMPORTANDO DADOS
import { wordsList } from './data/word'

const stages = [    // ESTÁGIOS DO GAME
    { id: 1, name: 'start' },
    { id: 2, name: 'game' },
    { id: 3, name: 'end' }
];

function App() {
    const [ gameStage, SetGameStage ] = useState(stages[0].name);
    const [ words ] = useState(wordsList);

    const [ pickedWord, setPickedWord ] = useState('');
    const [ pickedCategory, setPickedCategory ] = useState('');
    const [ letter, setletter ] = useState([]);

    const [ guessedLetters, setGuessedLetters ] = useState([]);
    const [ wrongLetters, setWrongLetters ] = useState([]);
    const [ guesses, setGuesses] = useState(3);
    const [ score, setScore] = useState(0);
    
    
    const PickWordAndCategory = () => {
        // Pick random category
        const categories = Object.keys(words);
        const randomCategory = categories[Math.floor( Math.random() * categories.length )];

        // Pick random words from random category
        const randomWords = words[randomCategory][Math.floor( Math.random() * words[randomCategory].length )];
        return { randomCategory, randomWords };
    };


    // START GAME
    const StartGameFunction = () => {
        const { randomCategory, randomWords } = PickWordAndCategory();
        
        // Pick a letter of randomWords
        let letters = randomWords.split('')
        letters = letters.map((letter) => letter.toLowerCase()) //normalizing letter to lowercase

        //fill states
        setPickedCategory(randomCategory)
        setPickedWord(randomWords)
        setletter(letters)
        console.log(letters)

        SetGameStage(stages[1].name)
    };

    // PROCESS THE LETTER INPUT
    const VerifyLetterFunction = (letter) => {
        console.log(letter);
    };

    // RESTART THE GAME
    const Retry = () => {
        SetGameStage(stages[0].name)
    };

    return (
        <div className='App'>
            {/* IF's... */}
            { gameStage === 'start' && <StartScreen startgame={ StartGameFunction } /> }
            { gameStage === 'game' && (
                <Game 
                    verifyletter={ VerifyLetterFunction }
                    pickedWord={ pickedWord }
                    pickedCategory={ pickedCategory }
                    letters={ letter }
                    guessedLetters={ guessedLetters }
                    wrongLetters={ wrongLetters }
                    guesses={ guesses }
                    score={ score }
                />
            )}
            { gameStage === 'end' && <GameOver retry={ Retry }/> }
        </div>
    );
};

export default App;
