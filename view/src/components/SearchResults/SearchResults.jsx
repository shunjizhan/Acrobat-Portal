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
                query.length <= 0? '':
                <span id='search-result-title'>
                    Search Results for <span id='query'>{query}</span>
                </span>
            }

            {
                results.length <= 0 ? '': results.map(res => {
                    const { text, id } = res;
                    return <Result 
                        text={text}
                        id={id}
                        key={id}
                        getReportDetails={this.props.getReportDetails}
                    />
                })
            }

            <hr />
        </div>);
    }
}

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
    query: PropTypes.string,
    getReportDetails: PropTypes.func,
};

SearchResults.defaultProps = {
    results: []
}


export default SearchResults;