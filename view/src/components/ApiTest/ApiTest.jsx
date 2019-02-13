import React, { Component } from 'react';
import axios from "axios";
import './ApiTest.css';


class ApiTest extends Component {
    state = {
        prediction: null,
        fixed_acidity: 1
    }

    click = fixed_acidity => {
        // maybe this should be get request
        // but don't know how to pass parameters with get method yet
        axios.post('http://localhost:3001/api/getPrediction', {
            data: { fixed_acidity } 
        })
        .then(response => {
            const data = response.data
            const prediction = data.prediction
            console.log(prediction);
            this.setState({ prediction })
        })
        .catch(error => { console.log(error); });
    }

    render() {
        return (
        <div id='apiTest' className='apiTest'>
            <input
                type="text"
                onChange={e => this.setState({ fixed_acidity: e.target.value })}
                placeholder="input the fixed_acidity"
                style={{ width: "200px" }}
            />

            <button style={{'width': '300px', 'height':'30px', 'zIndex': 10} } onClick={ () => this.click(this.state.fixed_acidity) }>get prediction</button>

            <div id='pred'>
                Wine Quality with fixed_acidity {this.state.fixed_acidity}: {this.state.prediction? this.state.prediction : ''}
            </div>

        </div>);
    }
}

export default ApiTest;