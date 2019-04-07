import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Brat from '../Brat/Brat'
import './DisplayPage.css';

class DisplayPage extends Component {
    state = {
        docData: null
    }

    componentDidMount(){
        const { id } = this.props.match.params;

        axios.post("http://localhost:3001/api/getCaseReportById", { id })
            .then(res => {
                console.log(res);
                const data = res.data.data[0];
                this.setState({docData: data})
            })
            .catch(err => console.log(err));
    }


    render () {
        const { docData } = this.state;
        console.log(docData);

        return(
            <div id='display-page'>
            { docData && <Brat docData={docData}/> }
            { !docData && 'loading case report data...' }
            </div>
        );
    }
}

// DisplayPage.propTypes = {
//     id: PropTypes.number.isRequired
// };

export default DisplayPage;