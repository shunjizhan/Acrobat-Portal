import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Brat.css';

import collData from './collData';

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
    state = {}
    collData = collData;

    componentDidMount(){
        var elem = document.getElementById("brat-editor");
        window.brat = new window.BratFrontendEditor(elem, this.collData, this.props.docData, options);
    }

    handleSubmit = () => {
        console.log(this.props.docData);

        // this should be the same? docData was passed by reference to brat!!
        // console.log(docData);
    }

    redraw = () => {
        if (window.brat != null) {
            window.brat.dispatcher.post('requestRenderData', [this.props.docData]);
            window.brat.dispatcher.post('current', [this.collData, this.props.docData, {}]);
        }
    }

    render () {

        this.redraw()

        const _id = this.props.docData._id;
        return(
            <div id='brat'>
                <span id='brat-intro'>
                    Details about case report <span id='report-id'>{ _id }</span>
                </span>

                <span 
                    id='submit-report' 
                    className='button'
                    onClick={this.handleSubmit}
                >
                    submit case report
                </span>

                <span 
                    className='button'
                    onClick={this.redraw}
                >
                    redraw
                </span>

                <div id="brat-editor" />

            </div>
        );
    }
}

Brat.propTypes = {
    docData: PropTypes.object.isRequired
};

export default Brat;