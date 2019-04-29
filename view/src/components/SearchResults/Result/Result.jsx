import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Result.css';


class Result extends Component {
    render() {
        const { text, id } = this.props;
        const displayPath = `search/${id}`;

        return (
        <div className='result' onClick={this.handleClick}>
            <div>
                <FontAwesomeIcon icon={['fab', 'bitcoin']} />
                <span className='search-result-text'>
                    <Link to={{
                      pathname: displayPath,
                      state: {
                        query: 'aaaaaaaa'
                      }
                    }}>{text}</Link>
                </span>
            </div>    
        </div>);
    }
}

Result.propTypes = {
    text: PropTypes.string,
    id: PropTypes.number,
};

Result.defaultProps = {
    text: 'I do not have text ',
    id: 12345 
}

export default Result;