import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AdvancedSearchBar.css';


class AdvancedSearchBar extends Component {
    state = {
        query: ''
    }

    handleTyping = e => {
        const query = e.target.value;
        this.setState({query});
        this.props.handleTyping(query);
    }

    handleSearch = () => {
        this.props.handleSearch(this.state.query);
    }

    handleModeSwitch = () => {
        this.props.handleModeSwitch()
    }


    render() {
        return (
        <div id='search-section'>
            <div id='advanced-search-bar'>
                <input 
                    ref="AdvancedSearchBar"
                    type="text" 
                    id="searchText" 
                    placeholder="search in over 1000000+ medical case reports..." 
                    onChange={ this.handleTyping }
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