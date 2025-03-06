import './Game.css';

const Game = ({ verifyletter }) => {
    return (
        <div className='game'>
            <h1>Game</h1>
            <button onClick={ verifyletter }>Finalizar game</button>
        </div>
    );
};

export default Game;