import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Result.css';


class Result extends Component {
    render() {
        const { info } = this.props;
        const { id, text } = info;

        return (
        <div className='result'>
            <div>id: {id}</div>
            <div>{text}</div>
            <br />
        </div>);
    }
}

Result.propTypes = {
    info: PropTypes.object,
};

Result.defaultProps = {
    info: {}    
}

export default Result;