import React, { Component } from "react";
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import Dagre from 'cytoscape-dagre';
import {buildGraphElementsFromGraphData} from '../../utils';

Cytoscape.use(Dagre);



class Graph extends Component {

  render(){
    const { graphData }  = this.props;
    // console.log('data:', graphData);
    
    // Create the Elements (Nodes) to be visualized
    var elements = buildGraphElementsFromGraphData(graphData);

    // // From Entities
    // var nID2index = new Map();
    // for (i=0; i < graphData.entities.length; i++) {
    //   const nodeID = graphData.entities[i][0];
    //   const nodeTextSIndex = graphData.entities[i][2][0][0];
    //   const nodeTextEIndex = graphData.entities[i][2][0][1];
    //   // const nodeText = graphData.text.substring(nodeTextSIndex,nodeTextEIndex);
    //   // elements.push( {
    //   //   data: {
    //   //     id: nodeID, 
    //   //     label: nodeText
    //   //   }
    //   // });
    //   nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
    // }
    // // From Triggers
    // for (i=0; i < graphData.triggers.length; i++) {
    //   const nodeID = graphData.triggers[i][0];
    //   const nodeTextSIndex = graphData.triggers[i][2][0][0];
    //   const nodeTextEIndex = graphData.triggers[i][2][0][1];
    //   // const nodeText = graphData.text.substring(nodeTextSIndex,nodeTextEIndex);
    //   // elements.push( {
    //   //   data: {
    //   //     id: nodeID, 
    //   //     label: nodeText
    //   //   }
    //   // });
    //   nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
    // }

    // // Create the Edges to be visualized
    // // First map all events to a node
    // var eID2nID = new Map();
    // for (i=0; i<graphData.events.length; i++) {
    //   const eventID = graphData.events[i][0];
    //   const nodeID = graphData.events[i][1];
    //   eID2nID.set(eventID, nodeID);
    // }
    // // From Relatiosn
    // var nodeSet = new Set();
    // for (var i=0; i < graphData.relations.length; i++) {
    //   const eventID_1 = graphData.relations[i][2][0][1];
    //   const eventID_2 = graphData.relations[i][2][1][1];
    //   const event_label = graphData.relations[i][1];
    //   // if (event_label=='BEFORE') {
    //     // continue;
    //   // }
    //   const sourcID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
    //   const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;

    //   var nodeText;
    //   if (!nodeSet.has(sourcID)) {
    //     nodeText = graphData.text.substring(nID2index.get(sourcID)[0], nID2index.get(sourcID)[1]);
    //     nodeText = nodeText.length>15 ? nodeText.substring(0,15) : nodeText;
    //     elements.push( {
    //       data: {
    //         id: sourcID,
    //         label: nodeText
    //       }
    //     });
    //     nodeSet.add(sourcID);
    //   }

    //   if (!nodeSet.has(targetID)) {
    //     nodeText = graphData.text.substring(nID2index.get(targetID)[0], nID2index.get(targetID)[1]);
    //     nodeText = nodeText.length>15 ? nodeText.substring(0,15) : nodeText;
    //     elements.push( {
    //       data: {
    //         id: targetID,
    //         label: nodeText
    //       }
    //     });
    //     nodeSet.add(targetID);
    //   }
    //   var color="rgb(1, 136, 203)";
    //   // if (event_label=='BEFORE'){
    //   //   color = 'red';
    //   // }
    //   // else if (event_label=='MODIFY') {
    //   //   color = 'blue';
    //   // }
    //   // else if (event_label=='IDENTICAL') {
    //   //   color = 'green';
    //   // }
    //   elements.push( {
    //     data: {
    //       source: sourcID,
    //       target: targetID,
    //       label: event_label,
    //       arrow: 'triangle',
    //       c: color
    //     }
    //   });
      // }

      // else if (event_label=='MODIFY') {
      //   const sourcID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
      //   const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;

      // // if (!nodeSet.has(sourcID)) {
      //   elements2.push( {
      //     data: {
      //       id: sourcID,
      //       label: graphData.text.substring(nID2index.get(sourcID)[0], nID2index.get(sourcID)[1])
      //     }
      //   });
      //   nodeSet.add(sourcID);
      // // }

      // // if (!nodeSet.has(targetID)) {
      //   elements2.push( {
      //     data: {
      //       id: targetID,
      //       label: graphData.text.substring(nID2index.get(targetID)[0], nID2index.get(targetID)[1])
      //     }
      //   });
      //   nodeSet.add(targetID);
      // // }

      //   elements2.push( {
      //     data: {
      //       source: sourcID,
      //       target: targetID,
      //       label: event_label,
      //       arrow: 'triangle'
      //     }
      //   });
      // }
    // }
    // Layout
    const layout = {
      name: 'dagre',
      nodeSep: 100,
      nodeDimensionsIncludeLabels: true
      // ranker: "longest-path"
      // name: 'breadthfirst',
      // directed: true,
      // padding: 10
    };

    const stylesheet = [
        {
          "selector": "node",
          "style": {
            "content": "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            // "text-font-size": 100,
            // "width": 40,
            // "height": 40,
            "background-color": "rgb(244, 149, 65)",              // node color
            "text-outline-color": "rgb(244, 149, 65)",
            "text-outline-opacity": 1,
            "text-outline-width": 0,
            "color": "black",                                     // text color
            "overlay-color": "#fff"
          }
        },
        {
          "selector": "edge",
          "style": {
            "width": 3,
            "curve-style": "straight"
          }
        },
        {
          "selector": "edge[arrow]",
          "style": {
            "target-arrow-shape": "data(arrow)",
            "line-color": "data(c)"
          }
        }
      ]
    

    // elements.push( { data: { id: 'three', label: 'Node 3' }, position: { x: 500, y: 250 } } );
    // elements.push( {data: { source: 'three', target: 'two', label: 'Edge from Node3 to Node2'}});
    return (
      <div>
      <div>
      <CytoscapeComponent 
        elements={elements} 
        style={ { width: '100%', height: '500px'}} 
        layout={layout} 
        stylesheet={stylesheet} ></CytoscapeComponent>
      </div>
      </div>
    );
  }
}
export default Graph;
