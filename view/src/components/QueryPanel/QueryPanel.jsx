import React, { Component } from 'react';
import DatabaseTest from '../DatabaseTest/DatabaseTest';
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import SearchBar from '../SearchBar/SearchBar';
import './QueryPanel.css';


class QueryPanel extends Component {
    state = {
        query: null
    }

    handleSearch = query => {
        this.setState({ query })
    }


    render() {
        return (
        <div id='queryPanel' className='buttomPanel'>
            <SearchBar handleSearch={this.handleSearch} />
            <QueryBuilder query={this.state.query} />
        </div>);
    }
}

export default QueryPanel;