import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TypeSelect from '../TypeSelect/TypeSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QueryItem.css';


class QueryItem extends Component {
    render() {
        const { word } = this.props;

        return (
            <div className='query-item' >
                <div className='item-word'>
                    { word } 
                </div>
                <FontAwesomeIcon icon={['fas', 'arrow-alt-right']} />
                <TypeSelect 
                    typeName='my type'
                    dropDownData={['aaa', 'bbb', 'ccc']}
                />
            </div>
        );
    }
}

QueryItem.propTypes = {
    word: PropTypes.string,
};

export default QueryItem;