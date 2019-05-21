import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import { Link } from "react-router-dom";
import './TopBar.css';


/*
    Component that contains the search bar and 
    the query builder under the search bar
                                                */
class TopBar extends Component {
    handleTyping = query => {
        this.props.handleTyping(query);
    }

    handleSearch = () => {
        this.props.handleSearch();
    }

    // handleEntitySelect = (index, type) => {
    //     const newState = { ...this.state };
    //     newState.textEntities[index].type = type;
    //     this.setState(newState);
    // }

    render() {
        const { textEntities, queries } = this.props;
        console.log('textEntities: ', textEntities);
        return (
            <div id='topBar'>  
                <Link to="/" id='title'>
                    CREAT<span id='E'>e</span>
                </Link>

                <div id='search-bar-container'>
                    <SearchBar 
                        handleSearch={ this.handleSearch } 
                        handleTyping={ this.handleTyping } 
                    />
                </div>  

                <div id='query-builder-container'>
                    <QueryBuilder 
                        queries={ queries } 
                        entities={ textEntities }
                        handleEntitySelect={ this.handleEntitySelect }
                    /> 
                </div>         
            </div>
        );
    }
}

export default TopBar;