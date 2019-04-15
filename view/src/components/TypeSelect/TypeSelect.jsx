import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropDown from '../DropDown/DropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TypeSelect.css';


/* ----- 
    component that display entity type and 
    normalization suggestions drop down select 
                                            ----- */
class TypeSelect extends Component {
    state = {
        current: this.props.dropDownData[0]
    }

    handleSelect = key => {
        this.setState({ current: key });
        this.props.handleSelect();
    }

    render() {
        const { typeName, dropDownData } = this.props;

        return (
            <div className='type-select' >
                { typeName }
                <span className='drop-down-container'>
                    <DropDown 
                        handleSelect={this.handleSelect}
                        dropDownData={dropDownData}
                        current={this.state.current}
                    />
                </span>
                <FontAwesomeIcon 
                    icon={['far', 'times-circle']} 
                    onClick={() => console.log('close!')}
                />
            </div>
        );
    }
}

TypeSelect.propTypes = {
    typeName: PropTypes.string,
    dropDownData: PropTypes.array,
};

export default TypeSelect;