import React, { Component } from 'react';
import TopBar from "../TopBar/TopBar";
import SearchResults from '../SearchResults/SearchResults';
import Brat from '../Brat/Brat';
import axios from 'axios'
import './SearchPage.css';


const defaultDocData = {
    "_id": "1234567890abcdefg",
    "messages": [],
    "source_files": [
        "ann",
        "txt"
    ],
    "modifications": [],
    "normalizations": [],
    "entities": [
        ["T1", "Age", [[36, 38]]],
    ],
    "attributes": [],
    "triggers": [],
    "events": [],
    "comments": [],
    "text": "This is a sample case report who is 21 years old"
}; 


class SearchPage extends Component {
    state = {
        query: '',          // real search query
        text: '',           // text when user is typing
        results: [{id: '0', text: 'go search something!'}],
        docData: defaultDocData
    }

    handleTyping = text => this.setState({ text });

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

    getReportDetails = id => {
        axios.post("http://localhost:3001/api/getCaseReportById", { id })
            .then(res => {
                console.log(res);
                const data = res.data.data[0];
                this.setState({docData: data})
            })
            .catch(err => console.log(err));
    }

    render() {
        const { text, query, results } = this.state;

        return (
            <div id='searchPage'>  
                <div id='top-bar-container'>
                    <TopBar 
                        text={text}
                        handleSearch={this.handleSearch} 
                        handleTyping={this.handleTyping} 
                    /> 
                </div>

                <div id='search-result-container'>
                    <SearchResults 
                        query={query}
                        results={results} 
                        getReportDetails={this.getReportDetails}
                    />      
                </div>    

                <Brat 
                    docData={this.state.docData}
                />

    
            </div>
        );
    }
}

export default SearchPage;