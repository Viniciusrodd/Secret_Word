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

    console.log(words)

    return (
        <div className='App'>
            {/* IF's... */}
            { gameStage === 'start' && <StartScreen /> }
            { gameStage === 'game' && <Game /> }
            { gameStage === 'end' && <GameOver /> }
        </div>
    )
}

export default App
