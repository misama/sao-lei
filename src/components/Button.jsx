import React from 'react';
import '../styles/button.css'

class Button extends React.Component {

    render() {
        const {
            color,
            content,
            onClick,
        } = this.props;

        return (
            <button className={color} onClick={onClick}>
                {content}
            </button>
        )
    }
}

export default Button