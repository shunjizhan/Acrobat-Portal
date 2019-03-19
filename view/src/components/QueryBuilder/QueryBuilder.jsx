import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QueryBuilder.css';


class QueryBuilder extends Component {
    render() {
        return (
            <div id='queryBuilder' >
                {this.props.query && `you searched ${this.props.query}`}
            </div>
        );
    }
}

export default QueryBuilder;