import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import AdvancedSearchBar from "../AdvancedSearchBar/AdvancedSearchBar";
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import { Link } from "react-router-dom";
import axios from 'axios'
import './TopBar.css';


class TopBar extends Component {

    // we save queries here mainly for query builder
    state = {
        mode: 'basic',
        queries: {
            query1: '',
            queyr2: '',
            relation: null    
        },
        entity_types: {
            // array of array
            // 只有一句话，就是[[]]
            // 有很多句话就是，就是[[], [], ...]
            query1: [],     
            queyr2: []
        },
        tokens: {
            // query sentence after tokenization
            // array of array
            // 只有一句话，就是[[]]
            // 有很多句话就是，就是[[], [], ...]
            query1: [],     
            queyr2: []
        }
    };

    handleTyping = query1 => {
        axios.post('http://localhost:3001/api/getPrediction', {
            data: { query: query1 } 
        })
        .then(response => {
            const { data } = response;
            const { entity_types, tokens } = data;
            console.log(data);
            
            this.setState(prevState => ({ 
                queries: { ...prevState.queries, query1 },
                entity_types: { ...prevState.entity_types, query1: entity_types },
                tokens: { ...prevState.tokens, query1: tokens }
            })); 
        })
        .catch(error => { console.log(error); });
    }

    handleAdvancedTyping = queries => {
        // console.log(queries);
        this.setState({ queries });
    }

    switchSearchMode = () => {
        const mode = this.state.mode === 'basic'? 'advanced' : 'basic';
        const queries = {
            query1: '',
            queyr2: '',
            relation: null    
        }
        this.setState({ mode, queries });
    }

    render() {
        const { handleSearch, handleAdvancedSearch } = this.props;
        const { mode, queries, entity_types, tokens } = this.state;
        // console.log(queries);
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
                    { (queries.query1 || queries.query2) && 
                        <QueryBuilder 
                            queries={ queries } 
                            types={ entity_types } 
                            tokens={ tokens } 
                        /> 
                    } 
                </div>         
            </div>
        );
    }
}

export default TopBar;