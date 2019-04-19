import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueryItem from '../QueryItem/QueryItem';
import './QueryBuilder.css';


class QueryBuilder extends Component {
    render() {
        let { 
            queries: { query1, query2, relation }, 
            types 
        } = this.props;

        // console.log(types);

        query1 = query1.trim().split(' ');
        query2 = query2? query2.trim().split(' ') : '';

        return (
            <div id='queryBuilder' >
            {   
                query1.map((word, index) => {
                    // temporarily flat all sentence to one long sentence
                    const types1 = types.query1.flat()[index]
                    return <QueryItem 
                                word={ word } 
                                key={ index }
                                type={ types1 }
                            />
                })
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
    queries: PropTypes.object.isRequired,
    types: PropTypes.object
};

// QueryBuilder.defaultProps = {
//     queries: {
//         query1: '',
//         query2: ''
//     }
// };

export default QueryBuilder;