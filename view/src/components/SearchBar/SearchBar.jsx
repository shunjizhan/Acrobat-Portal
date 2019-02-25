import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchBar.css';


class SearchBar extends Component {
    state = {}

    render() {
        return (
        <div id='searchBar'>
            <input type="text" id="searchText" placeholder="search in over 1000000+ medical case reports..." />
            <button type="submit" id="searchButton">
                <FontAwesomeIcon icon={['fas', 'search']} />
            </button>
        </div>);
    }
}

export default SearchBar;