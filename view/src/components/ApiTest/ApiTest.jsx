import React, { Component } from 'react';
import axios from "axios";
import './ApiTest.css';


const click = () => {
    axios.get('http://127.0.0.1:5000/')
    .then(response => {
        const data = response.data
        console.log(data);
        // return res.json({ success: true, data: data });
    })
    .catch(error => { console.log(error); });
}


class ApiTest extends Component {
    render() {
        return (
        <div id='apiTest' className='apiTest'>
            <button style={{'width': '300px', 'height':'30px', 'zIndex': 10} } onClick={click}>click me to get prediction</button>

        </div>);
    }
}

export default ApiTest;