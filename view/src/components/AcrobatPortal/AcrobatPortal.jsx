import React, { Component } from 'react';
// import DatabaseTest from '../DatabaseTest/DatabaseTest'
import ButtonPanel from '../ButtonPanel/ButtonPanel'
import TitlePanel from '../TitlePanel/TitlePanel'
import HistoryPanel from '../HistoryPanel/HistoryPanel'
import QueryPanel from '../QueryPanel/QueryPanel'
import { buildFontAwesomeLib } from '../../utils';
import './AcrobatPortal.css';


// build up fontawesome library in root component so everything
// children component can use fontAwesome
buildFontAwesomeLib();


class AcrobatPortal extends Component {
    state = {};

    render() {
        return (
            <div id='acrobatPortal'>
                <TitlePanel />
                <ButtonPanel />
                <HistoryPanel />
                <QueryPanel />
            </div>
        );
    }
}

export default AcrobatPortal;