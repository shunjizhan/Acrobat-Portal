import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueryItem from '../QueryItem/QueryItem';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QueryBuilder.css';


class QueryBuilder extends Component {
    render() {
        let { text } = this.props;

        if (!text) { return }
        text = text.split(' ');

        return (
            <div id='queryBuilder' >
            {   
                text.map((word, index) => 
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
    text: PropTypes.string,
};

export default QueryBuilder;