import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TypeSelect from '../TypeSelect/TypeSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QueryItem.css';


class QueryItem extends Component {
    render() {
        const { word, type } = this.props;

        return (
            <div className='query-item' >
                <div className='item-word'>
                    { word } 
                </div>
                <FontAwesomeIcon icon={['fas', 'arrow-alt-right']} />
                <TypeSelect 
                    typeName={ type }
                    dropDownData={['norm_1', 'norm_2', 'norm_3']}
                />
            </div>
        );
    }
}

QueryItem.propTypes = {
    word: PropTypes.string,
    type: PropTypes.string
};

export default QueryItem;