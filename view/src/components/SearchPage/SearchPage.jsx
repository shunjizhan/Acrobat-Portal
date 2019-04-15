import React, { Component } from 'react';
import TopBar from "../TopBar/TopBar";
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios'
import './SearchPage.css';



class SearchPage extends Component {
    state = {
        query: '',          // real search query
        text: '',           // text when user is typing
        results: [],
    }

    handleTyping = text => this.setState({ text });
    handleAdvancedTyping = text => console.log('advanced typing: ', text);;

    handleSearch = query => {
        this.setState({ query });

        if (query === ''){
            this.setState({ results: []});
            return;
        }

        axios.post("http://localhost:3001/api/searchDataES", { searchKey: query })
            .then(res => { 
                const results = res.data.data.map(info => {
                    return {
                        id: info._source.id, 
                        text: info._source.content
                    }
                })
                this.setState({ results }) 
            });
    }

    handleAdvancedSearch = query => {
        console.log('advanced search: ', query);
    }   


    render() {
        const { text, query, results } = this.state;

        return (
            <div id='searchPage'>  
                <div id='top-bar-container'>
                    <TopBar 
                        text={text}
                        handleSearch={ this.handleSearch } 
                        handleTyping={ this.handleTyping } 
                        handleAdvancedSearch={ this.handleAdvancedSearch } 
                        handleAdvancedTyping={ this.handleAdvancedTyping } 
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