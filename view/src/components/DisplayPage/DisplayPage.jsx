import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Brat from '../Brat/Brat'
import Graph from '../Graph/Graph'
import { PacmanLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addHighLight } from '../../utils';
import './DisplayPage.css';


class DisplayPage extends Component {
    state = {
        docData: null,
    }

    componentDidMount(){
        const { id } = this.props.match.params;

        axios.post("http://localhost:3001/api/getCaseReportById", { id })
            .then(res => {
                const data = res.data.data[0];
                this.setState({ docData: data })
            })
            .catch(err => console.log(err));
    }


    render () {
        const { id } = this.props.match.params;
        const { docData } = this.state;
        let text,                   // whole plain text of the case report
            entities,               // entities for graph
            tokensToHighlight,      // array of tokens to highlight
            textEntities;           // plain text highlight entities
        if (docData) { ({ text } = docData); }
        if (this.props.location.state) {
            // console.log('data:', this.props.location.state);
            ({ entities, textEntities } = this.props.location.state); 
            // console.log(textEntities);
            tokensToHighlight = textEntities.map(e => e.label);
            console.log('tokensToHighlight:', tokensToHighlight); 
        }   

        return (
            <div className='display-page'>

                <div className='brat-intro'>
                    <FontAwesomeIcon icon={['fal', 'file-alt']}/>
                    Details about case report <span className='report-id'>{ id }</span>
                </div>

                { docData && 
                    <div 
                        className='report-plain-text'
                        dangerouslySetInnerHTML={{
                            __html: addHighLight(text, tokensToHighlight) 
                        }} 
                    />
                }

                { docData && 
                    <div className='brat-container'>
                        <Brat docData={ docData }/>
                    </div> 
                }
                { docData && 
                    <div className='graph-container'>
                        <Graph 
                            graphData={ docData }
                            entities={ entities }
                        /> 
                    </div>
                }}

                { !docData && 
                    <div className='loading-container'>
                        {`Loading ......`} 
                        <PacmanLoader 
                            sizeUnit={ "px" }
                            size={ 150 }
                            color={ 'rgb(1, 136, 203)' }
                        />
                    </div>  
                }
            </div>
        );
    }
}

// DisplayPage.propTypes = {
//     id: PropTypes.number.isRequired
// };

export default DisplayPage;