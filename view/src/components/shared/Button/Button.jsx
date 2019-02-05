import React, { Component } from 'react';
import './Button.css';


const click = () => {console.log('clicked');}

class Button extends Component {
    render() {
        return (
            <span className='button' id={this.props.id} onClick={click}>
                {this.props.text}
            </span>
        );
    }
}

export default Button;