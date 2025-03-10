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

const guessesQuantity = 3;

function App() {
    const [ gameStage, SetGameStage ] = useState(stages[0].name);
    const [ words ] = useState(wordsList);

    const [ pickedWord, setPickedWord ] = useState('');
    const [ pickedCategory, setPickedCategory ] = useState('');
    const [ letter, setletter ] = useState([]);

    const [ guessedLetters, setGuessedLetters ] = useState([]);
    const [ wrongLetters, setWrongLetters ] = useState([]);
    const [ guesses, setGuesses] = useState(guessesQuantity);
    const [ score, setScore] = useState(0);
    
    
    const PickWordAndCategory = useCallback(() => {
        // Pick random category
        const categories = Object.keys(words);
        const randomCategory = categories[Math.floor( Math.random() * categories.length )];

        // Pick random words from random category
        const randomWords = words[randomCategory][Math.floor( Math.random() * words[randomCategory].length )];
        return { randomCategory, randomWords };
    });


    // START GAME
    const StartGameFunction = useCallback(() => {
        // Clear all letters
        clearLetterStates();

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
    }, [PickWordAndCategory]);

    // PROCESS THE LETTER INPUT
    const VerifyLetterFunction = (letterGet) => {
        const normalizedLetter = letterGet.toLowerCase();

        // check if the letter has already been utilized
        if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
            return;
        }

        // push a guessed letter or remove a guess
        if(letter.includes(normalizedLetter)){
            setGuessedLetters((actualGuessedLetters) => [
                ...actualGuessedLetters,
                normalizedLetter
            ]);
        }else{
            setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters,
                normalizedLetter
            ]);
            
            setGuesses((actualGuesses) => actualGuesses - 1);
        }
    };

    const clearLetterStates = () => {
        setGuessedLetters([])
        setWrongLetters([])
    };

    // CHECK IF USER LOOSE THE GAME
    useEffect(() => {   // Monitoring hook, his function is executed when the "guesses" var changes
        if(guesses <= 0){
            // reset all the states
            clearLetterStates();

            SetGameStage(stages[2].name);
        }
    }, [guesses]);

    //CHECK IF USER WIN THE GAME
    useEffect(() => {
        const uniqueLetters = [...new Set(letter)];

        // win conditions
        if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
            // add score
            setScore((actualScore) => actualScore += 100);
            
            // restart the game with new word
            StartGameFunction();
        }

    }, [guessedLetters, letter, StartGameFunction]);

    // RESTART THE GAME
    const Retry = () => {
        setScore(0);
        setGuesses(guessesQuantity);

        SetGameStage(stages[0].name);
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
            { gameStage === 'end' && <GameOver retry={ Retry } score={ score }/> }
        </div>
    );
};

export default App;
