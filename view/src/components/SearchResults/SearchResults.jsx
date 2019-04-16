import React, { Component } from 'react';
import Result from './Result/Result';
import PropTypes from 'prop-types';
import './SearchResults.css';


class SearchResults extends Component {
    state = {}

    render() {
        const { results, query } = this.props;

        return (
        <div id='searchResults'>
            {
                results.length <= 0 ? '': results.map(res => {
                    const { text, id } = res;
                    return <Result 
                        text={text}
                        id={id}
                        key={id}
                    />
                })
            }

        </div>);
    }
}

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SearchResults.defaultProps = {
    results: []
}


export default SearchResults;