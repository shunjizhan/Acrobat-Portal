import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Result.css';


class Result extends Component {
    handleClick = () => {
        const { getReportDetails } = this.props;
        const id = this.props.info.id;
        getReportDetails(id);
    }

    render() {
        const text = this.props.info.text;

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
    info: PropTypes.object,
    getReportDetails: PropTypes.func,
};

Result.defaultProps = {
    info: {},    
}

export default Result;