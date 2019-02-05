import React, { Component } from 'react';
import DatabaseTest from '../DatabaseTest/DatabaseTest';
import './QueryPanel.css';


class QueryPanel extends Component {
    render() {
        return (
        <div id='queryPanel' className='buttomPanel'>
            <span style={{fontSize: '150%', 'color': '#f4427a'}}>This is the main query panel, now we temporarily use this space for backend test.<br /> If you can see the messeges from database, then the backend is running successfully!</span>
            <DatabaseTest />
        </div>);
    }
}

export default QueryPanel;