import React, { Component } from 'react';
import DatabaseTest from '../DatabaseTest/DatabaseTest';
import QueryBuilder from '../QueryBuilder/QueryBuilder';
import SearchBar from '../SearchBar/SearchBar';
import './QueryPanel.css';


class QueryPanel extends Component {
    state = {}

    render() {
        return (
        <div id='queryPanel' className='buttomPanel'>
            <SearchBar />
            <QueryBuilder />


            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <span style={{fontSize: '150%', 'color': '#f4427a'}}>This is the main query panel, now we temporarily use this space for backend test.<br /> If you can see the messeges from database, then the backend is running successfully!</span>
            {/*<DatabaseTest />*/}
        </div>);
    }
}

export default QueryPanel;