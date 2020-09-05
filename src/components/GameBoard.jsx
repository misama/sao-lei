import React from 'react';
import SingleGrid from './SingleGrid';
import {generateGame} from "../service/dataService";
import '../styles/grid.css'

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        const {totalRows, totalColumns, totalLei} = props;
        this.state = {
            gameStatus: 'inProgress',
            gameMatrix:  generateGame(totalRows, totalColumns, totalLei),
            opened: [],
        };
        this.gameFail = this.gameFail.bind(this);
        this.handleZero = this.handleZero.bind(this);
        this.openGrid = this.openGrid.bind(this);
    }

    gameFail() {
        this.setState({gameStatus: 'fail'});
        this.props.gameFinish('fail');
    };

    openGrid(position) {
        const {totalRows, totalColumns, totalLei} = this.props;
        if (this.state.opened.indexOf(`${position.rowNumber}-${position.gridNumber}`) < 0) {
            this.state.opened.push(`${position.rowNumber}-${position.gridNumber}`)
        }
        if (this.state.opened.length === totalRows*totalColumns-totalLei) {
            this.setState({gameStatus: 'win'});
            this.props.gameFinish('win');
        }
    }

    handleZero(position){
        const checked = [];
        const {totalRows, totalColumns} = this.props;
        const updateZero = (arr, rowNumber, gridNumber) => {
            if(rowNumber >= totalRows || gridNumber >= totalColumns ||
                rowNumber <0 || gridNumber<0 ||
                checked.indexOf(`${rowNumber}-${gridNumber}`) >=0) return;
            checked.push(`${rowNumber}-${gridNumber}`);
            if(arr.indexOf(`${rowNumber}-${gridNumber}`) < 0){
                arr.push(
                    `${rowNumber}-${gridNumber}`
                );
            }
            if(this.state.gameMatrix[rowNumber][gridNumber] === 0){
                updateZero(arr, rowNumber, gridNumber);
                updateZero(arr, rowNumber-1, gridNumber);
                updateZero(arr, rowNumber+1, gridNumber);

                updateZero(arr, rowNumber, gridNumber-1);
                updateZero(arr, rowNumber+1, gridNumber-1);
                updateZero(arr, rowNumber-1, gridNumber-1);

                updateZero(arr, rowNumber-1, gridNumber+1);
                updateZero(arr, rowNumber, gridNumber+1);
                updateZero(arr, rowNumber+1, gridNumber+1);
            }else{
                return;
            }
        };
        updateZero(this.state.opened, position.rowNumber, position.gridNumber);
        this.setState({
            opened: this.state.opened
        });
        if (this.state.opened.length === 70) {
            this.setState({gameStatus: 'win'});
            this.props.gameFinish('win');
        }
    }

    render () {
        return (
            <React.Fragment>
                <ul>
                    {this.state.gameMatrix.map((row, rowNumber)=>
                        (<p className="row" key={ rowNumber }>{row.map(
                            (grid, gridNumber) =>
                                <SingleGrid
                                    gameStatus={ this.state.gameStatus }
                                    key={ gridNumber }
                                    position={{rowNumber, gridNumber}}
                                    gameFail={this.gameFail}
                                    isGridZero = { this.handleZero }
                                    openGrid = {this.openGrid}
                                    opened={ this.state.opened.indexOf(rowNumber+'-'+gridNumber)>=0}
                                    value={grid}>
                                </SingleGrid>
                        )}</p>)
                    )}
                </ul>
            </React.Fragment>
        )
    }
}
export default GameBoard