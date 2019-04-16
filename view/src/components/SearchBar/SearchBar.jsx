import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchBar.css';


class SearchBar extends Component {
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

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.handleSearch();
        }
    }


    render() {
        return (
        <div id='search-section'>
            <div id='searchBar'>
                <input 
                    ref="searchBar"
                    type="text" 
                    id="searchText" 
                    placeholder="search in over 1000000+ medical case reports..." 
                    onChange={ this.handleTyping }
                    onKeyDown={ this.handleKeyDown }
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
                id="advance-search-button"
                onClick={ this.handleModeSwitch }
            >
                Advanced
            </button>
        </div>);
    }
}

export default SearchBar;