
const GameOver = ({ retry }) => {
    return (
        <div className="start">
            <h1>Game Over</h1>
            <button onClick={ retry }>Resetar game</button>
        </div>
    )
}

export default GameOver;