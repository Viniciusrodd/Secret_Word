import { useState, useRef } from 'react';
import './Game.css';

const Game = ({ 
        verifyletter, 
        pickedWord, 
        pickedCategory, 
        letters, 
        guessedLetters, 
        wrongLetters, 
        guesses, 
        score 
}) => {
    const [ letter, setLetter ] = useState('');
    const letterInputRef = useRef(null); // catching a reference from input

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        verifyletter(letter);
        setLetter('');
        letterInputRef.current.focus(); // focus on my input element
    };

    return (
        <div className='game'>
            <p className="points">
                <span>Pontuação: { score }</span>
            </p>
            <h1>Adivinhe a palavra</h1>

            <h3 className="tip">
                Dica sobre a palavra: <span>{ pickedCategory }</span>
            </h3>
            <p>Você ainda tem { guesses } tentativas...</p>

            <div className="wordContainer">
                { letters.map((letter, index) => (
                    guessedLetters.includes(letter) ? (
                        <span key={index} className='letter'>{ letter }</span>
                    ) : (
                        <span key={index} className='blankSquare'></span>
                    )
                )) }
            </div>

            <div className="letterContainer">
                <p>Tente adivinhar a letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="letter" 
                        maxLength="1" 
                        required 
                        autoComplete='off'
                        onChange={(e) => setLetter(e.target.value)}
                        value={ letter }
                        ref={letterInputRef} //ref for useRef
                    />
                    <button>Jogar</button>
                </form>
            </div>

            <div className='wrongLettersContainer'>
                <p>Letras já utilizadas:</p>
                { wrongLetters.map((letter, index) => (
                    <span key={index}>| {letter}  |</span>
                )) }
            </div>
        </div>
    );
};

export default Game;