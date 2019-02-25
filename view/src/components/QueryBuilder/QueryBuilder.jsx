import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QueryBuilder.css';


class QueryBuilder extends Component {
    render() {
        return (
            <div id='queryBuilder' >
                This is the query builder <FontAwesomeIcon icon={['fal', 'alicorn']} />
            </div>
        );
    }
}

export default QueryBuilder;