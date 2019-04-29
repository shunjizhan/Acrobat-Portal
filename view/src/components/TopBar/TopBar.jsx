import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import AdvancedSearchBar from "../AdvancedSearchBar/AdvancedSearchBar";
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import { Link } from "react-router-dom";
import axios from 'axios'
import { combineMultiWordEntity } from '../../utils';
import './TopBar.css';


class TopBar extends Component {

    // we save detailed query tokens here for building searching data obj
    // user typing will update this these detailed query tokens
    state = {
        mode: 'basic',
        queries: {
            query1: '',
            queyr2: '',
            relation: null    
        },
        entities: []
        /*
        [{  
            label: 'label1',
            type: 'type1'  
        }, {
            label: 'label2',
            type: 'type2' 
        },
        ... 
        {
            label: 'label3',
            type: 'type3' 
        }]
        */

        // entity_types: {
        //     // array of array
        //     // 只有一句话，就是[[]]
        //     // 有很多句话就是，就是[[], [], ...]
        //     query1: [],     
        //     queyr2: []
        // },
        // tokens: {
        //     // query sentence after tokenization
        //     // array of array
        //     // 只有一句话，就是[[]]
        //     // 有很多句话就是，就是[[], [], ...]
        //     query1: [],     
        //     queyr2: []
        // }
    }

    handleTyping = query1 => {
        // go over crf API to get entities
        axios.post('http://localhost:3001/api/getPrediction', {
            data: { query: query1 } 
        })
        .then(response => {
            const { data: { entity_types, tokens } } = response;
            // console.log('predction: ', data);
            const entities = combineMultiWordEntity(entity_types, tokens);

            
            // update state to save current entity tokens
            this.setState(prevState => ({ 
                queries: { ...prevState.queries, query1 },
                entities
            })); 
        })
        .catch(error => { console.log(error); });
    }

    handleAdvancedTyping = queries => {
        // console.log(queries);
        this.setState({ queries });
    }

    handleAdvancedSearch = () => {
        const { entities, queries } = this.state;
        const queryObj = {
            query: queries.query1,    // whole query plain text
            entities                  // array of all entities
        };
        this.props.handleAdvancedSearch(queryObj);
    }

    handleEntitySelect = (index, type) => {
        const newState = { ...this.state };
        newState.entities[index].type = type;
        this.setState(newState);
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
        const { handleAdvancedSearch } = this.props;
        const { mode, entities, queries } = this.state;
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
                            handleSearch={ this.handleAdvancedSearch } 
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
                            entities={ entities }
                            handleEntitySelect={ this.handleEntitySelect }
                        /> 
                    } 
                </div>         
            </div>
        );
    }
}

export default TopBar;