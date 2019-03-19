import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchBar.css';


class SearchBar extends Component {
    state = {
        query: ''
    }

    handleInputChange = e => {
        this.setState({
            query: e.target.value
        })
    }

    handleSearch = () => {
        this.props.handleSearch(this.state.query);
    }

    render() {
        return (
        <div id='searchBar'>
            <input 
                type="text" id="searchText" 
                placeholder="search in over 1000000+ medical case reports..." 
                onChange={ this.handleInputChange }
            />
            <button 
                type="submit" 
                id="searchButton"
                onClick={ this.handleSearch }
            >
                <FontAwesomeIcon icon={['fas', 'search']} />
            </button>
        </div>);
    }
}

export default SearchBar;