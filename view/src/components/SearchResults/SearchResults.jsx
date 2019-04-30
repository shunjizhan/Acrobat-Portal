import React, { Component } from 'react';
import Result from './Result/Result';
import PropTypes from 'prop-types';
import './SearchResults.css';


class SearchResults extends Component {
    state = {}

    render() {
        const { results, queries } = this.props;

        return (
        <div id='searchResults'>
            {
                results.length <= 0 ? '': results.map(eachData => {
                    return <Result 
                        displayData={ eachData }
                        key={ eachData.id }
                        queries={ queries }
                    />
                })
            }

        </div>);
    }
}

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    queries: PropTypes.object.isRequired,
};

SearchResults.defaultProps = {
    results: []
}


export default SearchResults;