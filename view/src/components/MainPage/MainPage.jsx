import React, { Component } from 'react';
import { buildFontAwesomeLib } from '../../utils';
import './MainPage.css';

// build up fontawesome library in root component so everything
// children component can use fontAwesome
buildFontAwesomeLib();

class MainPage extends Component {
    state = {};

    render() {
        return (
            <div id='mainPage'>
                This is the main page
            </div>
        );
    }
}

export default MainPage;