/**
 * Created by xzou2 on 11/13/18.
 */
import React from 'react';
import '../styles/grid.css'

class SingleGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 'default', pressTime:0};
        this.handleClick = this.handleClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.touchStart = this.touchStart.bind(this);
    }

    handleClick() {
        if(this.props.gameStatus === 'fail'){
            return;
        }

        if(this.state.status !== 'default'){
            return;
        }
        if(this.props.value !== 9 && this.props.value !== 0) {
            this.setState({
                status: 'open'
            });
        } else if (this.props.value === 9){
            this.setState({
                status: 'trigger'
            });
            this.props.checkGameStatus(true);
        } else {
            this.props.isGridZero(this.props.position, this.props.totalRows, this.props.totalColumns);
        }
    }

    handleRightClick(e) {
        e.stopPropagation();
        e.preventDefault();
        if(this.pressTime) {return;}
        if (this.state.status === 'open' || this.props.opened) {
            return;
        }
        this.setState({
            status: this.state.status === 'marked' ? 'default' : 'marked'
        });
    }

    handleTouchEnd(){
        clearTimeout(this.pressTime);
    }

    touchStart(){
        this.pressTime  = setTimeout(()=>{
            this.setState({
                status: this.state.status === 'marked' ? 'default' : 'marked'
            });
        }, '1000');
    }

    render () {
        const { value, opened, gameStatus } = this.props;
        let currentStatue = '';
        if (gameStatus !== 'fail') {
            switch (this.state.status) {
                case 'open':
                    currentStatue = value;
                    break;
                case 'marked':
                    currentStatue = 'marked';
                    break;
                case 'trigger':
                    currentStatue = 'trigger';
                    break;
                default:
                    currentStatue = '';
            }
        } else {
            switch (this.state.status){
                case 'trigger':
                    currentStatue = 'trigger';
                    break;
                default:
                    currentStatue = value;
            }
        }
        if (gameStatus !== 'newGame' && opened){
            switch (this.state.status){
                case 'trigger':
                    currentStatue = 'trigger';
                    break;
                default:
                    currentStatue = value;
            }
        }
        return <span
            className={`grid${currentStatue} grid ${currentStatue && currentStatue!== 'marked' ? 'open' : 'default' }`}
            onClick={this.handleClick}
            onContextMenu={this.handleRightClick}
            onTouchStart={this.touchStart}
            onTouchEnd={this.handleTouchEnd}
        >
            {/[1-8]/.test(currentStatue) ? currentStatue: ''}</span>
    }
}
export default SingleGrid