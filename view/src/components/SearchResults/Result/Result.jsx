import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Result.css';


class Result extends Component {
    handleClick = () => {
        const { getReportDetails } = this.props;
        const id = this.props.info.id;
        getReportDetails(id);
    }

    render() {
        const { info } = this.props;
        const { id, text } = info;

        return (
        <div className='result'>
            <div>id: {id}</div>
            <div>{text}</div>
            <button onClick={this.handleClick}>see details =></button>
            <br />
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