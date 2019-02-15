import React, { Component } from 'react';
import axios from "axios";
import './ApiTest.css';


class ApiTest extends Component {
    state = {
        prediction: null,
        fixed_acidity: '?'
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
                onChange={e => this.setState({ fixed_acidity: e.target.value })}
                placeholder="input the fixed_acidity for the wine"
            />

            <button 
                id='pred-button' 
                onClick={ () => this.click(this.state.fixed_acidity) }
            >Prediction Wine Quality</button>

            <div id='pred'>
                Wine Quality with fixed_acidity <span style={{fontWeight: 'bold', color: 'rgb(244, 149, 65)'}}>{this.state.fixed_acidity}</span>:<br/>
                <div id='FA'>{this.state.prediction? this.state.prediction : 0}</div>
            </div>

        </div>);
    }
}

export default ApiTest;