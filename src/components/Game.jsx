import React from 'react';
import GameBoard from './GameBoard';
import Button from './Button';
import '../styles/index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.gameFinish = this.gameFinish.bind(this);
    }

    gameFinish(status) {
        this.setState({
            status: status,
        });
    };

    setEasyGame() {
        this.setState({
            totalRows: 10,
            totalColumns: 8,
            totalLei: 10,
            status: 'inProgress',
            gameIndex: this.state.gameIndex + 1,
        });
    }

    setMediateGame() {
        this.setState({
            totalRows: 18,
            totalColumns: 14,
            totalLei: 40,
            status: 'inProgress',
            gameIndex: this.state.gameIndex + 1,
        });
    }

    setHardGame() {
        this.setState({
            totalRows: 30,
            totalColumns: 16,
            totalLei: 99,
            status: 'inProgress',
            gameIndex: this.state.gameIndex + 1,
        });
    }

    reStart() {
        this.setState({
            gameIndex: this.state.gameIndex + 1,
            status: 'inProgress',
        })
    }

    render () {
        return (
            <React.Fragment>
                {this.state.status !== 'inProgress' ?
                    <div className="wincover">
                        <div className="finishedcontent">
                            <p>YOU {this.state.status.toUpperCase()}!</p>
                            <Button content="New Game" color="button"  onClick={this.reStart}/>
                        </div>
                    </div> : ''}
                <div className={`gameboard${this.state.totalColumns}`}>
                    <GameBoard key={this.state.gameIndex}
                               gameFinish={this.gameFinish}
                               totalRows={this.state.totalRows}
                               totalColumns={this.state.totalColumns}
                               totalLei={this.state.totalLei}/>
                </div>
                <div className={`buttons${this.state.totalColumns}`}>
                    <Button content="New Game" color="green"  onClick={this.reStart}/>
                    <Button content="Easy" color="green" onClick={this.setEasyGame}/>
                    <Button content="Mediate" color="green" onClick={this.setMediateGame}/>
                    <Button content="Hard" color="green" onClick={this.setHardGame}/>
                </div>
            </React.Fragment>
        )
    }
}

export default Game