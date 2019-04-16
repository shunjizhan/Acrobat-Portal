import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import AdvancedSearchBar from "../AdvancedSearchBar/AdvancedSearchBar";
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import { Link } from "react-router-dom";
import './TopBar.css';


class TopBar extends Component {
    state = {
        mode: 'advanced',
        queries: {
            query1: '',
            queyr2: '',
            relation: null    
        }
    };

    handleTyping = query1 => {
        this.setState({ query1 }); 
    }

    handleAdvancedTyping = queries => {
        console.log(queries);
        this.setState({ queries });
    }

    switchSearchMode = () => {
        const mode = this.state.mode === 'basic'? 'advanced' : 'basic';
        this.setState({ mode });
        console.log(this.state);
    }

    render() {
        const { handleSearch, handleAdvancedSearch } = this.props;
        const { mode, queries } = this.state;
        console.log(queries);
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
                            handleTyping={ this.handleTyping } 
                            handleModeSwitch={ this.switchSearchMode } 
                        />
                    }
                    {
                        mode === 'advanced' &&
                        <AdvancedSearchBar 
                            handleSearch={ handleAdvancedSearch } 
                            handleTyping={ this.handleAdvancedTyping } 
                            handleModeSwitch={ this.switchSearchMode } 
                        />
                    }
                </div>  

                <div id='query-builder-container'>
                    { (queries.query1 || queries.query2) && <QueryBuilder queries={ queries } /> } 
                </div>         
            </div>
        );
    }
}

export default TopBar;