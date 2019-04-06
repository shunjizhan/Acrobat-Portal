import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TitlePanel from '../TitlePanel/TitlePanel'
import AddCaseReport from "../AddCaseReport/AddCaseReport";
import MainPage from "../MainPage/MainPage";
import SearchPage from "../SearchPage/SearchPage";
import Brat from "../Brat/Brat";
import './App.css';


class App extends Component {
    state = {};

    render() {
        return (
          <Router>
            <div id='app'>
                {/*<TitlePanel />*/}
                <Switch>
                    <Route exact path="/" component={MainPage}/>    
                    <Route exact path="/search" component={SearchPage}/>    
                    {/*<Route exact path="/brat" component={Brat}/>    */}
                    {/*<Route exact path="/addCaseReport" component={AddCaseReport}/>*/}
                    <Route component={() => (<h1>404!!!</h1>)} />
                </Switch>
            </div>
          </Router>
        );
    }
}

export default App;