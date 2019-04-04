import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import './TopBar.css';


class SearchPage extends Component {
    state = {};

    render() {
        return (
            <div id='topBar'>  
                <Link to="/" id='title'>
                    CREAT<span id='E'>e</span>
                </Link>
                <div id='search-bar-container'>
                    <SearchBar /> 
                </div>           
            </div>
        );
    }
}

export default SearchPage;