import React, { Component } from 'react';
import Button from '../shared/Button/Button'
import './ButtonPanel.css';


class ButtonPanel extends Component {
    render() {
        return (
        <div id='buttonPanel'>
            <Button text='Find case reports'/>
            <Button text='Explore the repository'/>
            <Button text='Add a case report'/>
            <Button text='Help' id='helpButton'/>
        </div>);
    }
}

export default ButtonPanel;