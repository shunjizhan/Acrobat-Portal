import React, { Component } from 'react';
import DatabaseTest from '../DatabaseTest/DatabaseTest';
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Brat from '../Brat/Brat';
import './QueryPanel.css';
import axios from 'axios'

import docData from '../Brat/docData';


class QueryPanel extends Component {
    state = {
        query: '',          // real search query
        text: '',           // text when user is typing
        results: [{id: 0, text: 'go search something!'}],
        docData,
    }

    handleSearch = query => {
        console.log('searched:', query);
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

    handleTyping = text => {
        this.setState({ text });
    }

    getReportDetails = id => {
        console.log('id', id);
        fetch("http://localhost:3001/api/getCaseReport")
            .then(data => data.json())
            .then(res => this.setState({docData: res}));
    }


    render() {
        const { query, text, results } = this.state;

        return (
        <div id='queryPanel' className='buttomPanel'>
            <SearchBar 
                handleSearch={this.handleSearch} 
                handleTyping={this.handleTyping} 
            />
            <QueryBuilder text={text} />
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