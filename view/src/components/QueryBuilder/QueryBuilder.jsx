import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QueryBuilder.css';


class QueryBuilder extends Component {
    render() {
        return (
            <div id='queryBuilder' >
                <hr />
                This is the query builder, I am a 半成品, you are searching:
                <span id='qbText'>{ this.props.text? this.props.text : 'nothing' }</span>
                <hr />
            </div>
        );
    }
}

export default QueryBuilder;