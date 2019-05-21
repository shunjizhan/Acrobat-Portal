import React, { Component } from 'react';
import Result from './Result/Result';
import PropTypes from 'prop-types';
import './SearchResults.css';


class SearchResults extends Component {
    state = {}

    render() {
        const { results, textEntities } = this.props;

        return (
        <div id='searchResults'>
            {
                results.length <= 0 ? '': results.map(eachData => {
                    eachData.textEntities = textEntities;
                    return <Result 
                        displayData={ eachData }
                        key={ eachData.id }
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