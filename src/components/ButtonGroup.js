import React, { Component } from 'react';
import SendDataButton from './SendDataButton';
import { doGet, doPost } from '../service/dataService'

class ButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.handleGet = this.handleGet.bind(this)
    }
    handleGet() {
        doGet(this.props.url);
    }
    render () {
        const { url } = this.props;
        return <div>
            <SendDataButton onClick = {handleGet} text={'GET'} />
            <SendDataButton onClick = {doPost} text={'POST'} />
            {url}
        </div>
    }
}
export default ButtonGroup