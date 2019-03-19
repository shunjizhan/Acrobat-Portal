import React, { Component } from 'react';
import Result from './Result/Result';
import PropTypes from 'prop-types';
import './SearchResults.css';


class SearchResults extends Component {
    state = {}

    render() {
        const { results } = this.props;

        return (
        <div id='searchResults'>
            <hr />

            This is the search results: <br /><br />
            {
                results.length <= 0 ? ''
                : results.map(
                    res => <Result 
                                info={res} 
                                getReportDetails={this.props.getReportDetails}
                            />)
            }

            <hr />
        </div>);
    }
}

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object)
};

SearchResults.defaultProps = {
    results: []
}


export default SearchResults;