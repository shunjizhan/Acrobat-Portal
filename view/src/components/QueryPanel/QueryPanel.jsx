import React, { Component } from 'react';
import DatabaseTest from '../DatabaseTest/DatabaseTest';
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import './QueryPanel.css';


class QueryPanel extends Component {
    state = {
        query: null,
        results: [{id: 1, text: '1111'}, {id: 2, text: '22222'}]
    }

    handleSearch = query => {
        this.setState({ query })
    }

    getReportDetails = id => {
        console.log('id', id);
        fetch("http://localhost:3001/api/getCaseReport")
            .then(data => data.json())
            .then(res => console.log(res));
    }


    render() {
        const { query, results } = this.state;

        return (
        <div id='queryPanel' className='buttomPanel'>
            <SearchBar handleSearch={this.handleSearch} />
            <QueryBuilder query={query} />
            <SearchResults 
                results={results} 
                getReportDetails={this.getReportDetails}
            />
        </div>);
    }
}

export default QueryPanel;