import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import Brat from '../Brat/Brat';
import './QueryPanel.css';







class QueryPanel extends Component {



    




    render() {
        const { query, text, results } = this.state;

        return (
        <div id='queryPanel' className='buttomPanel'>

            

            <Brat 
                docData={this.state.docData}
            />
        </div>);
    }
}

export default QueryPanel;