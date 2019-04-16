import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueryItem from '../QueryItem/QueryItem';
import './QueryBuilder.css';


class QueryBuilder extends Component {
    render() {
        console.log(this.props);
        let { queries: { query1, query2, relation } } = this.props;

        query1 = query1.split(' ');
        query2 = query2? query2.split(' ') : '';

        return (
            <div id='queryBuilder' >
            {   
                query1.map((word, index) => 
                    <QueryItem 
                        word={word} 
                        key={index}
                    />
                )
            }

            {   query2 && 
                <div id='relation-container'>
                    <div id='relation'>{ relation }</div>
                </div> }

            {   query2 &&
                query2.map((word, index) => 
                    <QueryItem 
                        word={word} 
                        key={index}
                    />
                )
            }
            </div>
        );
    }
}

QueryBuilder.propTypes = {
    queries: PropTypes.object.isRequired
};

QueryBuilder.defaultProps = {
    queries: {
        query1: '',
        query2: ''
    }
};

export default QueryBuilder;