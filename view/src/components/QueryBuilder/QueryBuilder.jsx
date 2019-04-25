import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueryItem from '../QueryItem/QueryItem';
import './QueryBuilder.css';


class QueryBuilder extends Component {
    render() {
        let { 
            queries: { query1, query2, relation }, 
            types,
            tokens
        } = this.props;

        // console.log('tokens:', tokens.query1, tokens.query1.flat());

        query1 = query1.trim().split(' ');
        query2 = query2? query2.trim().split(' ') : '';

        return (
            <div id='queryBuilder' >
            {   
                tokens.query1.flat().map((token, index) => {
                    // temporarily flat all sentence to one long sentence
                    const types1 = types.query1.flat()[index];
                    const word = token[0]
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
    types: PropTypes.object,
    tokens: PropTypes.object,
};

// QueryBuilder.defaultProps = {
//     queries: {
//         query1: '',
//         query2: ''
//     }
// };

export default QueryBuilder;