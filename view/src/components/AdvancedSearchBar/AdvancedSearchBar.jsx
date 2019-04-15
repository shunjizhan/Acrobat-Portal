import React, { Component } from 'react';
import DropDown from '../DropDown/DropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AdvancedSearchBar.css';


class AdvancedSearchBar extends Component {
    state = {
        query1: '',
        query2: '',
        relation: 'Before'
    }

    _handleTyping = (query, which) => {
        // 这里直接用this.state不知道会不会有什么问题
        // 如果有问题就deep clone this.state
        const newState = this.state;
        if (which === 1) {
            newState.query1 = query;
        } else {
            newState.query2 = query;
        }
        
        this.props.handleTyping(newState);
        this.setState(newState)
    }

    handleTyping_1 = e => this._handleTyping(e.target.value, 1);
    handleTyping_2 = e => this._handleTyping(e.target.value, 2);


    handleSearch = () => {
        // 这里直接用this.state不知道会不会有什么问题
        // 如果有问题就deep clone this.state
        this.props.handleSearch(this.state);
    }

    handleModeSwitch = () => {
        this.props.handleModeSwitch()
    }

    handleSelect = key => {
        this.setState({ relation: key })
    }


    render() {
        const { relation } = this.state;
        const allRelations = ['Before', 'After', 'Overlap'];
        return (
        <div id='search-section'>
            <div id='advanced-search-bar'>
                <input 
                    ref="AdvancedSearchBar_1"
                    type="text" 
                    className="searchText" 
                    placeholder="relation 1" 
                    onChange={ this.handleTyping_1 }
                />
                <div className='drop-down-container'>
                    <DropDown 
                        handleSelect={ this.handleSelect }
                        dropDownData={ allRelations }
                        current={ relation }
                    />
                </div>
                <input 
                    ref="AdvancedSearchBar_2"
                    type="text" 
                    className="searchText" 
                    id="searchText_2" 
                    placeholder="relation 2" 
                    onChange={ this.handleTyping_2 }
                />
                <button 
                    type="submit" 
                    id="searchButton"
                    onClick={ this.handleSearch }
                >
                    <FontAwesomeIcon icon={['fas', 'search']} />
                </button>
            </div>

            <button 
                type="submit" 
                id="basic-search-button"
                onClick={ this.handleModeSwitch }
            >
                Basic
            </button>
        </div>);
    }
}

export default AdvancedSearchBar;