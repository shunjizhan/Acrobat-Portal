import React, { Component } from 'react';
// import DatabaseTest from '../DatabaseTest/DatabaseTest'
import ButtonPanel from '../ButtonPanel/ButtonPanel'
import TitlePanel from '../TitlePanel/TitlePanel'
import './AcrobatPortal.css';


class AcrobatPortal extends Component {
    state = {};

    render() {
        return (
            <div id='AcrobatPortal'>
                <TitlePanel />
                <ButtonPanel />
            </div>
        );
    }
}

export default AcrobatPortal;