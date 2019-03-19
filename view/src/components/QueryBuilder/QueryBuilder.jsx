import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QueryBuilder.css';


class QueryBuilder extends Component {
    render() {
        return (
            <div id='queryBuilder' >
                <hr />
                This is the query builder:
                {this.props.query && `you searched ${this.props.query}`}
                <hr />
            </div>
        );
    }
}

export default QueryBuilder;