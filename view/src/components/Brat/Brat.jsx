import React, { Component } from 'react';
import './Brat.css';

import collData from './collData';
import docData from './docData';

class Brat extends Component {
    state = {
        collData,
        docData,
        options: {
            assetsPath: "static/",
            webFontURLs: [//
                'fonts/Astloch-Bold.ttf',
                'fonts/PT_Sans-Caption-Web-Regular.ttf',
                'fonts/Liberation_Sans-Regular.ttf'
            ],
            ajax: 'local',
            overWriteModals: false,
            maxFragmentLength: 30,
            showTooltip: true
        }
    }
  componentDidMount(){
    var elem = document.getElementById("brat-editor");
    const { collData, docData, options } = this.state;
    window.bratt = new window.BratFrontendEditor(elem, collData, docData, options);
  }

  handleSubmit = () => {
    console.log(window.bratt.docData);
  }

  handleChange = () => {
    docData.entities = [];
    window.bratt.dispatcher.post('requestRenderData', [docData]);
  }
 
  render () {
    return(
    <div id='brat'>
      <div id="brat-editor" />
      <button 
        id='submit-report' 
        style={{width: 200, height: 100}}
        onClick={this.handleSubmit}
        >
        submit case report
        </button>
              <button 
        style={{width: 200, height: 100}}
        onClick={this.handleChange}
        >
        clear case report
        </button>
    </div>
    );
  }
}

export default Brat;