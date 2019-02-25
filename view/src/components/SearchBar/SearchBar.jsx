import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchBar.css';


class SearchBar extends Component {
    state = {}

    render() {
        return (
        <div id='searchBar'>
            <input type="text" id="searchText" placeholder="What are you looking for?" />
            <button type="submit" id="searchButton">
                <FontAwesomeIcon icon={['fas', 'search']} />
            </button>
        </div>);
    }
}

export default SearchBar;