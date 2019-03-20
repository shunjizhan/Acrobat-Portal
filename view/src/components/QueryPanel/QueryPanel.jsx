import React, { Component } from 'react';
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Brat from '../Brat/Brat';
import './QueryPanel.css';
import axios from 'axios'


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



class QueryPanel extends Component {
    state = {
        query: '',          // real search query
        text: '',           // text when user is typing
        results: [{id: '0', text: 'go search something!'}],
        docData: defaultDocData
    }

    handleSearch = query => {
        this.setState({ query });

        if (query === ''){
          this.setState({ results: []});
          return;
        }

        axios.post("http://localhost:3001/api/searchDataES", {
          searchKey: query
        })
          .then(res => this.setState({results : res.data.data.map(info => {
                return {id: info._source.id, text: info._source.content}
            })
        }));
    }

    handleTyping = text => this.setState({ text });

    getReportDetails = id => {
        axios.post("http://localhost:3001/api/getCaseReportById", { id })
            .then(res => {
                const data = res.data.data[0];
                this.setState({docData: data})
            })
            .catch(err => console.log(err));
    }


    render() {
        const { query, text, results } = this.state;

        return (
        <div id='queryPanel' className='buttomPanel'>
            <SearchBar 
                handleSearch={this.handleSearch} 
                handleTyping={this.handleTyping} 
            />
            { text && <QueryBuilder text={text} /> }
            <SearchResults 
                query={query}
                results={results} 
                getReportDetails={this.getReportDetails}
            />
            <Brat 
                docData={this.state.docData}
            />
        </div>);
    }
}

export default QueryPanel;