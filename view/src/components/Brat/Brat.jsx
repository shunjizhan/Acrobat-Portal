import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Brat.css';

import collData from './collData';
// import defaultDocData from './defaultDocData';

const options = {
    // assetsPath: "static/",
    // webFontURLs: [//
    //     'fonts/Astloch-Bold.ttf',
    //     'fonts/PT_Sans-Caption-Web-Regular.ttf',
    //     'fonts/Liberation_Sans-Regular.ttf'
    // ],
    // ajax: 'local',
    // overWriteModals: false,
    // maxFragmentLength: 30,
    // showTooltip: true
}

class Brat extends Component {
    state = {
        docData: this.props.docData
    }
    collData = collData;

    componentDidMount(){
        var elem = document.getElementById("brat-editor");
        window.brat = new window.BratFrontendEditor(elem, this.collData, this.state.docData, options);
    }

    handleSubmit = () => {
        console.log(this.state.docData);

        // this should be the same? docData was passed by reference to brat!!
        // console.log(docData);
    }

    redraw = () => {
        if (window.brat != null) {
            window.brat.dispatcher.post('requestRenderData', [this.state.docData]);
            window.brat.dispatcher.post('current', [this.collData, this.state.docData, {}]);
        }
    }


    render () {
        const { text, _id } = this.props.docData;

        return(
            <div className='brat'>
                <div className='brat-intro'>
                    <FontAwesomeIcon icon={['fal', 'file-alt']}/>
                    Details about case report <span className='report-id'>{ _id }</span>
                </div>

                <div className='report-plain-text'>{ text }</div>

{/*                <span 
                    className='button submit-report'
                    onClick={this.handleSubmit}
                >
                    submit case report
                </span>

                <span 
                    className='button'
                    onClick={this.redraw}
                >
                    redraw
                </span>*/}

                <div id="brat-editor" />

            </div>
        );
    }
}

Brat.propTypes = {
    docData: PropTypes.object.isRequired
};

export default Brat;