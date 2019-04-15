import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './TypeSelect.css';


/* ----- drop down menu for each token ----- */
class DropDown extends Component {
    state = {
        current: this.props.dropDownData[0]
    }

    render() {
        const { current, handleSelect, dropDownData } = this.props;
        return (
            <DropdownButton id="dropdown-basic-button" title={current} >
            {
                dropDownData.map(key => (
                    <Dropdown.Item
                        eventKey={key} 
                        onSelect={handleSelect}
                        key={key}
                    >
                    {key}
                    </Dropdown.Item>
                ))
            }
            </DropdownButton>
        )
    }
}


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