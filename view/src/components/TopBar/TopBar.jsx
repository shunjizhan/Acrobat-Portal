import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import AdvancedSearchBar from "../AdvancedSearchBar/AdvancedSearchBar";
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import { Link } from "react-router-dom";
import './TopBar.css';


class TopBar extends Component {
    state = {
        mode: 'advanced'
    };

    switchSearchMode = () => {
        const mode = this.state.mode === 'basic'? 'advanced' : 'basic';
        this.setState({ mode });
        console.log(this.state);
    }

    render() {
        const { 
            text, 
            handleSearch, handleAdvancedSearch, 
            handleTyping, handleAdvancedTyping
        } = this.props;
        const { mode } = this.state;
        return (
            <div id='topBar'>  
                <Link to="/" id='title'>
                    CREAT<span id='E'>e</span>
                </Link>

                <div id='search-bar-container'>
                    {
                        mode === 'basic' &&
                        <SearchBar 
                            handleSearch={ handleSearch } 
                            handleTyping={ handleTyping } 
                            handleModeSwitch={ this.switchSearchMode } 
                        />
                    }
                    {
                        mode === 'advanced' &&
                        <AdvancedSearchBar 
                            handleSearch={ handleAdvancedSearch } 
                            handleTyping={ handleAdvancedTyping } 
                            handleModeSwitch={ this.switchSearchMode } 
                        />
                    }
                </div>  

                <div id='query-builder-container'>
                    { text && <QueryBuilder text={text} /> } 
                </div>         
            </div>
        );
    }
}

export default TopBar;