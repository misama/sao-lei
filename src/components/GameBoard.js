/**
 * Created by xzou2 on 11/15/18.
 */
import React from 'react';
import SingleGrid from './SingleGrid';
import '../styles/grid.css'
class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: [],
        };
        this.checkStatus = this.checkStatus.bind(this);
        this.handleZero = this.handleZero.bind(this);
    }

    checkStatus(status) {
        if (status){
            this.props.gameFail(status);
        }
    };

    handleZero(position, totalRows, totalColumns){
        const checked = [];
        const updateZero = (arr, rowNumber, gridNumber) => {
            if(rowNumber >= totalRows || gridNumber >= totalColumns ||
                rowNumber <0 || gridNumber<0 ||
                checked.indexOf(`${rowNumber}-${gridNumber}`) >=0) return;
            checked.push(`${rowNumber}-${gridNumber}`);
            arr.push(
                `${rowNumber}-${gridNumber}`
            );
            if(this.props.game[rowNumber][gridNumber] === 0){
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
    }

    render () {
        const { game, totalRows, totalColumns, gameStatus } = this.props;
        return (
            <ul>
                {game.map((row, rowNumber)=>
                    (<p className="row" key={ rowNumber }>{row.map(
                        (grid, gridNumber) =>
                            <SingleGrid
                                gameStatus={ gameStatus }
                                key={ gridNumber }
                                totalRows = { totalRows }
                                totalColumns = { totalColumns }
                                position={{rowNumber, gridNumber}}
                                checkGameStatus={this.checkStatus}
                                isGridZero = { this.handleZero }
                                opened={ this.state.opened.indexOf(rowNumber+'-'+gridNumber)>=0}
                                value={grid}>
                            </SingleGrid>
                    )}</p>)
                )}
            </ul>
        )
    }
}
export default GameBoard