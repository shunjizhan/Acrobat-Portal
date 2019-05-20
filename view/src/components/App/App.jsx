import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RelationSearchPage from '../RelationSearchPage/RelationSearchPage'
import MainPage from "../MainPage/MainPage";
import SearchPage from "../SearchPage/SearchPage";
import DisplayPage from "../DisplayPage/DisplayPage";

import './App.css';


class App extends Component {
    state = {};

    render() {
        return (
          <Router>
            <div id='app'>
                {/*<TitlePanel />*/}
                <Switch>
                    <Route exact path="/" component={ MainPage }/>    
                    <Route exact path="/search" component={ SearchPage }/>    
                    <Route path="/search/:id" component={ DisplayPage }/>    
                    <Route exact path="/relationSearch" component={ RelationSearchPage }/>    
                    {/*<Route exact path="/addCaseReport" component={AddCaseReport}/>*/}
                    <Route component={() => (<h1>404!!!</h1>)} />
                </Switch>
            </div>
          </Router>
        );
    }
}

export default App;