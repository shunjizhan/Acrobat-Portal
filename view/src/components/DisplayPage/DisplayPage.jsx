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
        graphData: {}
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
        const _remove_punc = string => 
            string
            .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"")
            .replace(/\s{2,}/g," ");

        const { id } = this.props.match.params;
        const { docData } = this.state;
        let text, entities, queries, tokensToHighlight;
        if (docData) { 
            ({text} = docData);
        }
        if (this.props.location.state) {
            console.log('data:', this.props.location.state);
            ({ entities, queries } = this.props.location.state); 
            if (queries.query1) {   // relation search
                tokensToHighlight = [queries.query1, queries.query2];
            } else {                // basic search
                tokensToHighlight = _remove_punc(queries.queryText).split(' ')
            }
            
        }
        
        // console.log(queries.queryText, _remove_punc(queries.queryText));
        // console.log('tokensToHighlight:', tokensToHighlight);       
        // console.log('text:', text);       

        return(
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
{/*                { docData && 
                    <div className='graph-container'>
                        <Graph 
                            graphData={ docData }
                            entities={ entities }
                        /> 
                    </div>
                }*/}

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