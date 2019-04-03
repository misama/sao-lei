import React from 'react';
import ReactDOM from 'react-dom'
import GameBoard from './components/GameBoard';
import { generateGame } from './service/dataService';
import './styles/grid.css';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game:  generateGame(10, 8, 10),
            totalRows: 10,
            totalColumns: 8,
            totalLei: 10,
            status: 'inProgress',
            gameIndex: 0,
        };
        this.setEasyGame = this.setEasyGame.bind(this);
        this.setMediateGame = this.setMediateGame.bind(this);
        this.setHardGame = this.setHardGame.bind(this);
        this.reStart = this.reStart.bind(this);
        this.gameFail = this.gameFail.bind(this);
        this.inProgress = this.inProgress.bind(this);
    }

    gameFail() {
        this.setState({
            status: 'fail',
        });
    };

    setEasyGame() {
        this.setState({
          game: generateGame(10, 8, 10),
          totalRows: 10,
          totalColumns: 8,
          totalLei: 10,
          status: 'inProgress',
          gameIndex: this.state.gameIndex + 1,
        });
    }

    setMediateGame() {
        this.setState({
            game: generateGame(18, 14, 40),
            totalRows: 18,
            totalColumns: 14,
            totalLei: 40,
            status: 'inProgress',
            gameIndex: this.state.gameIndex + 1,
        });
    }

    setHardGame() {
        this.setState({
            game: generateGame(30, 16, 99),
            totalRows: 30,
            totalColumns: 16,
            totalLei: 99,
            status: 'inProgress',
            gameIndex: this.state.gameIndex + 1,
        });
    }

    reStart() {
        this.setState({
            game: generateGame(this.state.totalRows, this.state.totalColumns, this.state.totalLei),
            status: 'inProgress',
            gameIndex: this.state.gameIndex + 1,
        })
    }

    inProgress() {
        if(this.state.status === 'inProgress') return;
        this.setState({
            status: 'inProgress',
        });
    }

    render () {
        return (
            <div>
                <GameBoard key={this.state.gameIndex}
                           gameFail={this.gameFail}
                           totalRows={this.state.totalRows}
                           totalColumns={this.state.totalColumns}
                           game={this.state.game}
                           gameStatus={this.state.status}
                           startGame={this.inProgress}
                           handleZero={this.handleZero}/>
                <button onClick={this.setEasyGame}>Easy</button>
                <button onClick={this.setMediateGame}>Mediate</button>
                <button onClick={this.setHardGame}>Hard</button>
                <button onClick={this.reStart}>reStart</button>
            </div>
        )
    }
}
ReactDOM.render(<Game />, document.getElementById('game-wrapper'));
