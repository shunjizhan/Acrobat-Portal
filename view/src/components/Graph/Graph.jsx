import React, { Component } from "react";
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import Dagre from 'cytoscape-dagre';
import Klay from 'cytoscape-klay';
import Cola from 'cytoscape-cola';
import {buildGraphElementsFromGraphData} from '../../utils';
import {buildSubGraphElementsFromGraphData} from '../../utils';

Cytoscape.use(Dagre);
Cytoscape.use(Klay);
Cytoscape.use(Cola);

class Graph extends Component {

  render(){
    const { graphData, entities  }= this.props;
    // console.log('data:', graphData);
    console.log('entities:', entities);
    
    // Create the Elements (Nodes) to be visualized
    var elements = buildGraphElementsFromGraphData(graphData);
    var sub_elements = [];
    // var subgraph_width = '80%';
    var subgraph_height = '10px';
    if (entities) {
      sub_elements = buildSubGraphElementsFromGraphData(graphData, entities);
      // subgraph_width = '80%';
      subgraph_height = '500px';
    }
    // Layout
    const layout = {
      name: 'dagre',
      // spacing: 100,
      // borderSpacing: 20,
      nodeSep: 100,
      // nodeDimensionsIncludeLabels: true
      // ranker: "longest-path"
      // name: 'breadthfirst',
      // directed: true,
      // padding: 20
    };

    const layout_klay = {
      name: 'klay'
    }

    const layout_cola = {
      name: 'cola',
      flow: { axis: 'y', minSeparation: 40 },
      // flow: 'dag',
      nodeSpacing: 30,
      avoidOverlap: true
    }

    const stylesheet = [
      {
        "selector": "node[type]",
        "style": {
          "content": "data(label)",
          "text-valign": "center",
          "text-halign": "center",
          "width": 50,
          "height": 50,
          "shape": "data(type)",
          "background-color": "data(color)",               // node color
          "text-outline-color": "rgb(244, 149, 65)",
          "text-outline-opacity": 1,
          "text-outline-width": 0,
          "font-size": 8,
          "color": "black",                                     // text color
          "overlay-color": "#fff",
          "text-wrap": "wrap",
          "text-max-width": 8
        }
      },
      {
        "selector": ':parent',
        'style': {
          "text-valign": "top",
          "background-color": "#9fdfff",
          'background-opacity': 0.333
        }
      },
      {
        "selector": "edge",
        "style": {
          "width": 3,
          // "curve-style": "straight",
          'curve-style': 'bezier',
          'label': 'data(label)',
          "font-size": 10,
          "length": 10
        }
      },
      {
        "selector": "edge[arrow]",
        "style": {
          "target-arrow-shape": "data(arrow)",
          "line-color": "data(c)",
          "edge-text-rotation": "autorotate"
        }
      }
    ];
    
    return (
      <div>
        <div>
          <CytoscapeComponent 
            elements={sub_elements} 
            style={ { width: '80%', height: subgraph_height}} 
            layout={layout_cola}
            stylesheet={stylesheet} 
          ></CytoscapeComponent>
        </div>
        <div>
          <CytoscapeComponent 
            elements={elements} 
            style={ { width: '80%', height: '500px'}} 
            layout={layout_cola} 
            stylesheet={stylesheet} ></CytoscapeComponent>
        </div>
      </div>
    );
  }
}
export default Graph;
