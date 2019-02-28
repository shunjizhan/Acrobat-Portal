import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TitlePanel from '../TitlePanel/TitlePanel'
import AddCaseReport from "../AddCaseReport/AddCaseReport";
import AcrobatPortal from "../AcrobatPortal/AcrobatPortal";
import Brat from "../Brat/Brat";
import './App.css';


class App extends Component {
    state = {};

    render() {
        return (
          <Router>
            <div id='app'>
                <TitlePanel />
                <Route exact path="/" component={AcrobatPortal}/>    
                <Route exact path="/brat" component={Brat}/>    
                <Route exact path="/addCaseReport" component={AddCaseReport}/>              
            </div>
          </Router>
        );
    }
}

export default App;