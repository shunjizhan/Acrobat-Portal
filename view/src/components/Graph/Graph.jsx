import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Graph.css';


class Graph extends Component {
    render() {
        return (
        <div className='graph'>
            I am the component to display graph 
        </div>);
    }
}

Graph.propTypes = {
    graphData: PropTypes.object.isRequired,
};

Graph.defaultProps = {

}

export default Graph;