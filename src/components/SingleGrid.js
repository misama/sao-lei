/**
 * Created by xzou2 on 11/13/18.
 */
import React, { Component } from 'react';
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
        console.log('33333333', this.props.gameStatus)
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
        if(this.pressTime) {return;}
        e.stopPropagation();
        e.preventDefault();
        if (this.state.status === 'open' || this.props.opened) {
            return;
        }
        this.setState({
            status: this.state.status === 'marked' ? 'default' : 'marked'
        });
    }

    handleTouchEnd(){
        console.log('2222222', new Date().getTime() - this.pressTime)
        if(new Date().getTime() - this.pressTime > 1500){
            if (this.state.status === 'open' || this.props.opened) {
                return;
            }
            this.setState({
                status: this.state.status === 'marked' ? 'default' : 'marked'
            });
        }
    }

    touchStart(){
        console.log('44444444')
        this.pressTime = new Date().getTime();
    }

    render () {
        const { value, opened, gameStatus } = this.props;
        console.log('00000000', gameStatus)
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