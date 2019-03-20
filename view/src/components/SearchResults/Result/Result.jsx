import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Result.css';


class Result extends Component {
    handleClick = () => {
        const { getReportDetails, id } = this.props;
        getReportDetails(id);
    }

    render() {
        const { text } = this.props;

        return (
        <div className='result' onClick={this.handleClick}>
            <div>
                <FontAwesomeIcon icon={['fab', 'bitcoin']} />
                <span className='search-result-text'>{text}</span>
            </div>    
        </div>);
    }
}

Result.propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    getReportDetails: PropTypes.func,
};

Result.defaultProps = {
    text: 'I do not have text ',
    id: '12345' 
}

export default Result;