import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GameBoard from './components/GameBoard';
import { generateGame } from './service/dataService';
import './styles/grid.css';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game:  generateGame(30, 16, 99),
            totalRows: 30,
            totalColumns: 16,
        };
        this.setEasyGame = this.setEasyGame.bind(this);
    }

/*    gameFail() {
        alert('fail');
    };*/

    setEasyGame() {
        this.setState({
          game: generateGame(15, 10, 10),
          totalRows: 15,
          totalColumns: 10,
        });
    }

    render () {
        return (
            <div>
                <GameBoard totalRows={this.state.totalRows}
                           totalColumns={this.state.totalColumns}
                           game={this.state.game}/>
                <button onClick={this.setEasyGame}>easy</button>
            </div>
        )
    }
}
ReactDOM.render(<Game />, document.getElementById('game-wrapper'));
