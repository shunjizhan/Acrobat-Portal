import React, { Component } from 'react';
import TopBar from "../TopBar/TopBar";
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios'
import './SearchPage.css';


class SearchPage extends Component {
    // we only need to save search result here
    // queries for display is saved at TopBar Component
    // queries for search is saved in (advanced) search
    state = {
        results: [],
        queries: null
    }

    // handleSearch = query => {
    //     console.log(query);
    //     this.setState({ query });

    //     if (query === ''){
    //         this.setState({ results: []});
    //         return;
    //     }

    //     axios.post("http://localhost:3001/api/searchDataES", { searchKey: query })
    //         .then(res => { 
    //             const results = res.data.data.map(info => {
    //                 return {
    //                     id: info._source.id, 
    //                     text: info._source.content
    //                 }
    //             })
    //             this.setState({ results }) 
    //         });
    // }

    handleAdvancedSearch = queries => {
        console.log('advanced search: ', queries);

        if (queries === '') { return; }

        axios.post("http://localhost:3001/api/searchRelation", { source: queries.query1, target: queries.query2, label: queries.relation})
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
                        handleSearch={ this.handleSearch } 
                        handleAdvancedSearch={ this.handleAdvancedSearch } 
                    /> 
                </div>

                { results.length > 0 &&
                    <div id='search-result-container'>
                        <SearchResults 
                            queries={ queries }
                            results={ results } 
                        />      
                    </div>  
                }  
    
            </div>
        );
    }
}

export default SearchPage;