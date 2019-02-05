import React, { Component } from 'react';
import './TitlePanel.css';


class TitlePanel extends Component {
    render() {
        return (
        <div id='TitlePanel'>
            <div className='titleSection' id='title'><span id='A'>A</span>CROBAT</div>
            <div className='titleSection' id='description'>All Case Reports with Open Biomedical Annotation Terms</div>
            <div className='titleSection' id='account'>Account</div>
        </div>);
    }
}

export default TitlePanel;