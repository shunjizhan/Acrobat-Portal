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

    handleEntitySelect = index => type => {
        this.props.handleEntitySelect(index, type);
    }

    render() {
        const { 
            queries: { query1, query2, relation },      // advanced search
            entities,
        } = this.props;

        const { showO } = this.state;
        // console.log(entities);

        return (
            <div id='queryBuilder' >

                show type O
                <Switch
                    checked={ this.state.showO }
                    onChange={ this.handleToggle }
                />

            {   
                entities.map((token, index) => {
                    const { label, type } = token;
                    const handleEntitySelect = this.handleEntitySelect(index);
                    if (type !== 'O' || showO) {
                        return <QueryItem 
                                    word={ label } 
                                    key={ index }
                                    type={ type }
                                    handleEntitySelect={ handleEntitySelect }
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
                        word={ word } 
                        key={ index }
                    />
                )
            }
            </div>
        );
    }
}

QueryBuilder.propTypes = {
    queries: PropTypes.object.isRequired,
    entities: PropTypes.array,
    handleEntitySelect: PropTypes.func
};

// QueryBuilder.defaultProps = {
//     queries: {
//         query1: '',
//         query2: ''
//     }
// };

export default QueryBuilder;