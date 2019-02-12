import React, { Component } from 'react';
import axios from "axios";
import './ApiTest.css';


class ApiTest extends Component {
    state = {
        'prediction': null
    }

    click = () => {
        axios.get('http://localhost:3001/api/getPrediction')
        .then(response => {
            const res = response.data
            const prediction = res.data.prediction
            // console.log(prediction);
            this.setState({ prediction })
        })
        .catch(error => { console.log(error); });
    }

    render() {
        return (
        <div id='apiTest' className='apiTest'>
            <button style={{'width': '300px', 'height':'30px', 'zIndex': 10} } onClick={this.click}>get prediction</button>

            <div id='pred'>
                Wine Quality: {this.state.prediction? this.state.prediction : ''}
            </div>

        </div>);
    }
}

export default ApiTest;