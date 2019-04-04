import React from 'react';
import GameBoard from './GameBoard';
import Button from './Button';
import { generateGame } from '../service/dataService';
import '../styles/index.css';

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
            gameIndex: this.state.gameIndex + 1,
            status: 'inProgress',
        })
    }

    render () {
        return (
            <React.Fragment>
                <div className={"gameboard"}>
                    <GameBoard key={this.state.gameIndex}
                               gameFail={this.gameFail}
                               totalRows={this.state.totalRows}
                               totalColumns={this.state.totalColumns}
                               game={this.state.game}
                               gameStatus={this.state.status}
                               handleZero={this.handleZero}/>
                </div>
                <div className={"buttons"}>
                    <Button content="Easy" color="button" onClick={this.setEasyGame}/>
                    <Button content="Mediate" color="button" onClick={this.setMediateGame}/>
                    <Button content="Hard" color="button" onClick={this.setHardGame}/>
                    <Button content="New Game" color="button"  onClick={this.reStart}/>
                </div>
            </React.Fragment>
        )
    }
}

export default Game