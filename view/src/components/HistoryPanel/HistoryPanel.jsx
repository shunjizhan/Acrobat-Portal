import React, { Component } from 'react';
import ApiTest from '../ApiTest/ApiTest'
import './HistoryPanel.css';


class HistoryPanel extends Component {
    render() {
        return (
        <div id='historyPanel' className='buttomPanel'>
            <div id='history-intro'>
            This is the search history panel, we use this to test machine learning API.<br /><br />
            </div>
            <ApiTest />

        </div>);
    }
}

export default HistoryPanel;