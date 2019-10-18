import React from 'react';
import '../styles/grid.css'

class SingleGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 'default', opened: false};
        this.handleClick = this.handleClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.touchStart = this.touchStart.bind(this);
    }

    handleClick() {
        if(this.props.gameStatus !== 'inProgress'){
            return;
        }

        if(this.state.status === 'marked'){
            this.setState({
                status: 'question'
            });
        }
        if(this.state.status === 'question'){
            this.setState({
                status: 'marked'
            });
        }

        if(this.state.status !== 'default'){
            return;
        }
        if(this.props.value !== 9 && this.props.value !== 0) {
            this.setState({
                opened: true,
                status: 'open'
            });
            this.props.openGrid(this.props.position);
        } else if (this.props.value === 9){
            this.setState({
                status: 'trigger'
            });
            this.props.gameFail(true);
        } else {
            this.props.isGridZero(this.props.position);
        }
    }

    handleRightClick(e) {
        e.stopPropagation();
        e.preventDefault();
        if(this.pressTime || this.props.gameStatus === 'fail') {return;}

        if(this.state.status === 'marked' || this.state.status === 'question'){
            this.setState({
                status: 'default',
                keepClose: true,
            });
            return;
        }

        if (this.state.status === 'open' || this.props.opened) {
            return;
        }
        this.setState({
            status: 'marked'
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.opened === true && this.state.status !== 'marked' && this.state.status !== 'question') {
            this.setState({ status: 'open' });
        }
    }

    render () {
        const { value, gameStatus } = this.props;
        let currentStatue = '';
        if (gameStatus !== 'fail') {
            switch (this.state.status) {
                case 'open':
                    currentStatue = value;
                    break;
                case 'marked':
                    currentStatue = 'marked';
                    break;
                case 'question':
                    currentStatue = '?';
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
                case 'marked':
                    if(value!==9){
                        currentStatue = 'wrong';
                    }else{
                        currentStatue = value;
                    }
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
            {/[1-8]/.test(currentStatue) || currentStatue === 'X' ? currentStatue: ''}</span>
    }
}
export default SingleGrid