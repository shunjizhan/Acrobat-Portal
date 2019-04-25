import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueryItem from '../QueryItem/QueryItem';
import Switch from '@material-ui/core/Switch';
import { combineMultiWordEntity } from '../../utils';

import './QueryBuilder.css';


class QueryBuilder extends Component {
    state = {
        showO: true
    }

    handleToggle = () => {
        this.setState(prevState => ({
            showO: !prevState.showO
        }));
    }

    render() {
        let { 
            queries: { query1, query2, relation },      // advanced search
            types,
            tokens
        } = this.props;

        const { showO } = this.state;

        // console.log('tokens:', tokens.query1, tokens.query1.flat());

        // query1 = query1.trim().split(' ');
        // query2 = query2? query2.trim().split(' ') : '';

        // now only for basic search
        const queryTokens = combineMultiWordEntity(types.query1, tokens.query1);

        return (
            <div id='queryBuilder' >

            show type O<Switch
                checked={ this.state.showO }
                onChange={ this.handleToggle }
            />

            {   
                queryTokens.map((token, index) => {
                    const { text, type } = token;
                    if (type !== 'O' || showO) {
                        return <QueryItem 
                                    word={ text } 
                                    key={ index }
                                    type={ type }
                                />
                    } else {
                        return null;
                    }
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