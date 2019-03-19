import React, { Component } from 'react';
import DatabaseTest from '../DatabaseTest/DatabaseTest';
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import './QueryPanel.css';
import axios from "axios";


class QueryPanel extends Component {
    state = {
        query: null,
        results: [{id: 1, text: '1111'}, {id: 2, text: '22222'}]
    }

    handleSearch = query => {
        console.log(query);
        if (query==""){
          this.setState({ results: []});
          return;
        }

        axios.post("http://localhost:3001/api/searchDataES", {
          searchKey: query
        })
          .then(res => this.setState({results : res.data.data.map(info => {
                return {id: info._id, text: info._source.content}
            })
        }));
    }


    render() {
        const { query, results } = this.state;

        return (
        <div id='queryPanel' className='buttomPanel'>
            <SearchBar handleSearch={this.handleSearch} />
            <QueryBuilder query={query} />
            <SearchResults results={results} />
        </div>);
    }
}

export default QueryPanel;