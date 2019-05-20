import React, { Component } from 'react';
import TopBar from "../TopBar/TopBar";
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios'
import './SearchPage.css';
import { combineMultiWordEntity } from '../../utils';

class SearchPage extends Component {
    // we only need to save search result here
    // queries for display is saved at TopBar Component
    // queries for search is saved in (advanced) search
    state = {
        results: [],
        queries: null,
        entities: [],
        queriesTopBar: {
            query1: '',
            queyr2: '',
            relation: null    
        }
    }

    handleTyping = query1 => {
        const _isLetter = c => /^[a-zA-Z()]$/.test(c);
        if (_isLetter(query1.charAt(query1.length - 1))) { return }

        // if last typing is not alphabet
        // go over crf API to get entities
        axios.post('http://localhost:3001/api/getPrediction', {
            data: { query: query1 } 
        })
        .then(response => {
            const { data: { entity_types, tokens } } = response;
            const entities = combineMultiWordEntity(entity_types, tokens);
            
            // update state to save current entity tokens
            this.setState(prevState => ({ 
                queriesTopBar: { ...prevState.queriesTopBar, query1 },
                entities
            })); 
        })
        .catch(error => { console.log(error); });
    }

    handleAdvancedSearch = queries => {
        console.log('advanced search: ', queries);

        if (queries === []) { return; }

        axios.post("http://localhost:3001/api/searchMultiRelations", queries)
            .then(res => { 
                const results = res.data.data.map(info => {
                    console.log(info)
                    return {
                        id: info.pmID, 
                        entities: info.entities,
                        previewText: "info._source.content info._source.content info._source.content info._source.content info._source.content"
                    }
                })
                this.setState({ 
                    queries,
                    results 
                }) 
            })
            .catch(err => console.log(err));
    }   

    handleSearch = queryObj => {
        console.log('basic search: ', queryObj);

        if (queryObj === {}) { return; }
        var queryText = queryObj.query;
        axios.post("http://localhost:3001/api/searchNodes", queryObj)
            .then(res => { 
                // search results
                const results = res.data.data.map(info => {
                    return {
                        id: info._source.pmID, 
                        entities: info._source.entities,
                        previewText: info._source.content
                    }
                })

                // update query plain text for DisplayPage highlight
                const queries = {
                    queryText,
                    ...this.state.queries
                }
                this.setState({ 
                    queries,
                    results
                }) 
            })
            .catch(err => console.log(err));
    }     


    render() {
        const { queries, results } = this.state;

        return (
            <div id='searchPage'>  
                <div id='top-bar-container'>
                    <TopBar 
                        queries = {this.state.queriesTopBar}
                        entities = {this.state.entities}
                        handleSearch={ this.handleSearch } 
                        handleAdvancedSearch={ this.handleAdvancedSearch } 
                        handleTyping={ this.handleTyping } 
                    /> 
                </div>

                { results.length > 0 &&
                    <div id='search-result-container'>
                        <SearchResults 
                            queries={ queries }
                            results={ results } 
                            entities = {this.state.entities}
                        />      
                    </div>  
                }  
    
            </div>
        );
    }
}

export default SearchPage;