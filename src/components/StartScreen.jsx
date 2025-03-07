
import './StartScreen.css';

const StartScreen = ({ startgame }) => {
    return (
        <div className='start'>
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <div>
                <i className="material-icons">arrow_circle_down</i>
            </div>
            <button onClick={ startgame }>Começar o jogo</button>
        </div>
    );
};

export default StartScreen;