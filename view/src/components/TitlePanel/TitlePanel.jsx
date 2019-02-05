import React, { Component } from 'react';
import './TitlePanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class TitlePanel extends Component {
    render() {
        return (
        <div id='titlePanel'>
            <div className='titleSection' id='title'><span id='A'>A</span>CROBAT</div>
            <div className='titleSection' id='description'>All Case Reports with Open Biomedical Annotation Terms</div>
            <div className='titleSection' id='account'>
                <FontAwesomeIcon icon={['fal', 'user-secret']} />
                <span id='accountText'>Account</span>
            </div>
        </div>);
    }
}

export default TitlePanel;