import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TitlePanel from '../TitlePanel/TitlePanel'
import { buildFontAwesomeLib } from '../../utils';
import './App.css';
import AddCaseReport from "../AddCaseReport/AddCaseReport";
import AcrobatPortal from "../AcrobatPortal/AcrobatPortal";

class App extends Component {
    state = {};

    render() {
        return (
          <Router>
            <div id='app'>
                <TitlePanel />
                <Route exact path="/" component={AcrobatPortal}/>    
                <Route exact path="/addCaseReport" component={AddCaseReport}/>              
            </div>
          </Router>
        );
    }
}

export default App;