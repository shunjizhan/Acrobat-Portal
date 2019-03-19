import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Button.css';


const click = () => {console.log('clicked');}

class Button extends Component {
    render() {
        const { icon, text } = this.props;
        return (
            <span className='button' id={this.props.id} onClick={click}>
                <FontAwesomeIcon icon={icon} />
                <span class='button-text'>{text}</span>
            </span>
        );
    }
}

export default Button;