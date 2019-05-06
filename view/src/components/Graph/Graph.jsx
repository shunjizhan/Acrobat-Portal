import React, { Component } from "react";
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import Dagre from 'cytoscape-dagre';
import {buildGraphElementsFromGraphData} from '../../utils';
import {buildSubGraphElementsFromGraphData} from '../../utils';

Cytoscape.use(Dagre);



class Graph extends Component {

  render(){
    const { graphData, entities  }= this.props;
    // console.log('data:', graphData);
    console.log('entities:', entities);
    
    // Create the Elements (Nodes) to be visualized
    var elements = buildGraphElementsFromGraphData(graphData);
    var sub_elements = buildSubGraphElementsFromGraphData(graphData, entities);
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
        "selector": "node[type]",
        "style": {
          "content": "data(label)",
          "text-valign": "center",
          "text-halign": "center",
          "width": 60,
          "height": 60,
          "shape": "data(type)",
          "background-color": "data(color)",               // node color
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
          "curve-style": "straight",
          'label': 'data(label)',
          "font-size": 10,
          "length": 10
        }
      },
      {
        "selector": "edge[arrow]",
        "style": {
          "target-arrow-shape": "data(arrow)",
          "line-color": "data(c)"
        }
      }
    ];
    
    return (
      <div>
        <div>
          <CytoscapeComponent 
            elements={sub_elements} 
            style={ { width: '100%', height: '500px'}} 
            layout={layout} 
            stylesheet={stylesheet} ></CytoscapeComponent>
        </div>
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
