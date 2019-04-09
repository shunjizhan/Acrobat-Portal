import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import { Link } from "react-router-dom";
import './TopBar.css';


class SearchPage extends Component {
    state = {};

    render() {
        const { text, handleSearch, handleTyping } = this.props;
        return (
            <div id='topBar'>  
                <Link to="/" id='title'>
                    CREAT<span id='E'>e</span>
                </Link>

                <div id='search-bar-container'>
                    <SearchBar 
                        handleSearch={handleSearch} 
                        handleTyping={handleTyping} 
                    />
                </div>  

                <div id='query-builder-container'>
                    { text && <QueryBuilder text={text} /> } 
                </div>         
            </div>
        );
    }
}

export default SearchPage;