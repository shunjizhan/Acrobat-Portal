import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Brat from '../Brat/Brat'
import Graph from '../Graph/Graph'
import './DisplayPage.css';

class DisplayPage extends Component {
    state = {
        docData: null,
        graphData: {}
    }

    componentDidMount(){
        const { id } = this.props.match.params;

        // load annotation data
        axios.post("http://localhost:3001/api/getCaseReportById", { id })
            .then(res => {
                const data = res.data.data[0];
                this.setState({docData: data})
            })
            .catch(err => console.log(err));

        // load graph data
        // axios.post("http://localhost:3001/api/getGraphDataById", { id })
        //     .then(res => {
        //         const data = res.data.data[0];
        //         this.setState({graphData: data})
        //     })
        //     .catch(err => console.log(err));
    }


    render () {
        const { id } = this.props.match.params;
        const { docData, graphData } = this.state;
        console.log(docData);

        return(
            <div id='display-page'>
                { docData && <Brat docData={docData}/> }
                { !docData && `loading annotation data for case report ${id} ......` }
                <br />

                { docData && <Graph graphData={graphData}/> }
                { !docData && `loading graph data for case report ${id} ......` }
                <br />
            </div>
        );
    }
}

// DisplayPage.propTypes = {
//     id: PropTypes.number.isRequired
// };

export default DisplayPage;