import React, { Component } from "react";
import axios from "axios";
// import ReactDOM from 'react-dom';

// import cytoscape from 'cytoscape';
// import CytoscapeComponent from 'react-cytoscapejs';

// var cy = cytoscape({
//     style: [
//       {
//         selector: 'node',
//         style: {
//           'width': 100,
//           'height': 100,
//           'label': 'data(id)',
//           'shadow-blur': 20,
//           'shadow-color': 'black',
//           'shadow-offset-x': 25,
//           'shadow-offset-y': 35,
//           'shadow-opacity': 0.6,
//           'text-halign': 'center',
//           'text-valign': 'center',
//           'shape': 'rectangle',
//           'text-valign': 'center',
//           'text-halign': 'center',
//           'font-size': 40,
//           'color': 'white',
//           'text-wrap': 'wrap'
//         }
//       },
//       {
//         selector: 'node.a',
//         style: {
//           'background-color': 'red',
//           'shape': 'diamond'
//         }
//       },
//       {
//         selector: 'node.b',
//         style: {
//           'background-color': 'green',
//           'shape': 'rectangle'
//         }
//       }
//     ],
//     elements: [
//       {
//         data: {
//           id: 'a'
//         },
//         classes: 'a'
//       },
//       {
//         data: {
//           id: 'b' 
//         },
//         classes: 'b'
//       },
//       {
//         data: {
//           id: 'ab', 
//           source: 'a',
//           target: 'b'
//         }
//       }
//     ]
//   });

// base6412 = cy.png({
//   full: true,
//   scale:0.5
// });
// cy.on('render pan zoom', function() {
//     base64 = cy.png({
//       full: true,
//       scale: 0.5 //if i use here core.zoom() than there is no bug with shadows on bird view
//     });
//     console.log('in function');
//   });

// console.log( cy.json() );
// var cyJSON = cy.json();
// var jpg64 = cy.png();

class AddCaseReport extends Component {

  constructor() {
    super();

    this.state = {
      caseReport_txt: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // this.cy = cytoscape();
    // this.cyJSON = cy.jpg();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // const newCaseReport = {
    //   caseReportTitle: this.state.caseReport_txt,
    //   caseReportID: this.state.caseReport_ann,
    //   description: this.state.description,
    //   date: this.state.date,
    // };

    axios.post("http://localhost:3001/api/putCaseReport", {
      txt: this.state.caseReport_txt,
      ann: this.state.caseReport_ann
      // date: this.state.date
    }).then(res => {
      console.log(res);
    });
    // console.log(newCaseReport);
  }


  render() {
    return (
      <div>
        <div >
          <div >
            <div >
              <div >
                <h5 >Create Case Report Form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div >
                    <textarea
                      type="text"
                      placeholder="Case Report txt"
                      name="caseReport_txt"
                      value={this.state.caseReport_txt}
                      onChange={this.onChange}
                    />
                  </div>
                  
                  <div >
                    <textarea
                      type="text"
                      placeholder="Case Report ann"
                      name="caseReport_ann"
                      value={this.state.caseReport_ann}
                      onChange={this.onChange}
                    />
                  </div>
                  
                  
                  <h6>Date</h6>
                  <div >
                    <input
                      type="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type="submit"
                  />
                </form>
              </div>
              <div id= 'cy'>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddCaseReport;
