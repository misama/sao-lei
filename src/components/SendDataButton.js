/**
 * Created by xzou2 on 7/19/18.
 */
import React, { Component } from 'react';
class SendDataButton extends React.Component {
    render () {
        const { onClick, text} = this.props;
        return <button onClick={onClick}>{text}</button>
    }
}
export default SendDataButton