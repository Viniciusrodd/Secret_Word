import "./GameOver.css";

const GameOver = ({ retry, score }) => {
    return (
        <div>
            <h1>Fim de jogo!</h1>
            <h3>A sua pontuação foi: <span>{ score }</span></h3>
            <button onClick={ retry } className="resetBtt">Resetar game</button>
        </div>
    )
}

export default GameOver;