import React, { Component } from 'react';
import TopBar from "../TopBar/TopBar";
import './SearchPage.css';


class SearchPage extends Component {
    state = {};

    render() {
        return (
            <div id='searchPage'>  
                <TopBar />           
            </div>
        );
    }
}

export default SearchPage;