import React, { Component } from 'react';
import TopBar from "../TopBar/TopBar";
import SearchResults from '../SearchResults/SearchResults';
import LoginModal from '../LoginModal/LoginModal';
import axios from 'axios';
import './SearchPage.css';
import { combineMultiWordEntity } from '../../utils';


class SearchPage extends Component {
    state = {
        results: [],                // search results
        textEntities: [],           // predicted entities
        queryText: ''               // query plain text
    }

    handleTyping = queryText => {
        const _isLetter = c => /^[a-zA-Z()]$/.test(c);
        if (_isLetter(queryText.charAt(queryText.length - 1))) { return }

        // if last typing is not alphabet
        // go over crf API to get entities
        axios.post('http://localhost:3001/api/getPrediction', {
            data: { query: queryText } 
        })
        .then(response => {
            const { data: { entity_types, tokens } } = response;
            const textEntities = combineMultiWordEntity(entity_types, tokens);
            
            // update state to save current entity tokens
            this.setState({ 
                textEntities,
                queryText
            }); 
        })
        .catch(error => { console.log(error); });
    }

    handleSearch = () => {
        const { textEntities, queryText } = this.state;
        const queryObj = {
            entities: textEntities,
            query: queryText
        }
        console.log('basic search: ', queryObj);

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

                this.setState({ results }) 
            })
            .catch(err => console.log(err));
    }     

    render() {
        const { results, textEntities } = this.state;

        return (
            <div id='searchPage'>  
                <LoginModal />

                <div id='top-bar-container'>
                    <TopBar 
                        textEntities={ textEntities }
                        handleSearch={ this.handleSearch } 
                        handleAdvancedSearch={ this.handleAdvancedSearch } 
                        handleTyping={ this.handleTyping } 
                    /> 
                </div>

                { results.length > 0 &&
                    <div id='search-result-container'>
                        <SearchResults 
                            results={ results } 
                            textEntities={ textEntities }
                        />      
                    </div>  
                }  
    
            </div>
        );
    }
}

export default SearchPage;