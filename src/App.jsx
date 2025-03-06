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

    // START GAME
    const StartGameFunction = () => {
        SetGameStage(stages[1].name)
    };

    // PROCESS THE LETTER INPUT
    const VerifyLetterFunction = () => {
        SetGameStage(stages[2].name)
    };

    // RESTART THE GAME
    const Retry = () => {
        SetGameStage(stages[0].name)
    };

    return (
        <div className='App'>
            {/* IF's... */}
            { gameStage === 'start' && <StartScreen startgame={ StartGameFunction } /> }
            { gameStage === 'game' && <Game verifyletter={ VerifyLetterFunction }/> }
            { gameStage === 'end' && <GameOver retry={ Retry }/> }
        </div>
    );
};

export default App;
