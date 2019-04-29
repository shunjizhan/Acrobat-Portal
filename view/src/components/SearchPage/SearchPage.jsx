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
                        text: "info._source.content info._source.content info._source.content info._source.content info._source.content"
                    }
                })
                this.setState({ results }) 
            })
            .catch(err => console.log(err));
    }   

    handleSearch = queryObj => {
        console.log('basic search: ', queryObj);
    }   


    render() {
        const { query, results } = this.state;

        return (
            <div id='searchPage'>  
                <div id='top-bar-container'>
                    <TopBar 
                        handleSearch={ this.handleSearch } 
                        handleAdvancedSearch={ this.handleAdvancedSearch } 
                    /> 
                </div>

                { query &&
                    <div id='search-result-container'>
                        <SearchResults 
                            query={query}
                            results={results} 
                        />      
                    </div>  
                }  
    
            </div>
        );
    }
}

export default SearchPage;