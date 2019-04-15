import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './DropDown.css';


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

export default DropDown;
