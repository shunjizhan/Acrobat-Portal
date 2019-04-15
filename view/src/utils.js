import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

export const buildFontAwesomeLib = () => {
    library.add(fal, far, fas, fab)
};

export const buildGraphFromGraphData = (graphData) => {
	var nodes = [];
	var edges = [];
	var pmID = graphData.pmID;

	var i;
    
    // From Entities
    var nID2index = new Map();									// node ID to word index
    var nID2nType = new Map();									// node ID to entity type
    for (i=0; i < graphData.entities.length; i++) {
      const nodeID = graphData.entities[i][0];
      const nodeType = graphData.entities[i][1];
      const nodeTextSIndex = graphData.entities[i][2][0][0];
      const nodeTextEIndex = graphData.entities[i][2][0][1];

      nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
      nID2nType.set(nodeID, nodeType);
    }
    // From Triggers
    for (i=0; i < graphData.triggers.length; i++) {
      const nodeID = graphData.triggers[i][0];
      const nodeType = graphData.triggers[i][1];
      const nodeTextSIndex = graphData.triggers[i][2][0][0];
      const nodeTextEIndex = graphData.triggers[i][2][0][1];

      nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
      nID2nType.set(nodeID, nodeType);
    }

    // Create the Edges to be visualized
    // First map all events to a node
    var eID2nID = new Map();
    for (i=0; i<graphData.events.length; i++) {
      const eventID = graphData.events[i][0];
      const nodeID = graphData.events[i][1];
      eID2nID.set(eventID, nodeID);
    }
    // Create edges from Relatiosn
    var nodeSet = new Set();
    for (i=0; i < graphData.relations.length; i++) {
      const eventID_1 = graphData.relations[i][2][0][1];
      const eventID_2 = graphData.relations[i][2][1][1];
      const event_label = graphData.relations[i][1];

      const sourcID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
      const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;

      var nodeText;
      if (!nodeSet.has(sourcID)) {
        nodeText = graphData.text.substring(nID2index.get(sourcID)[0], nID2index.get(sourcID)[1]);

        nodes.push( {
        	nodeID: sourcID,
        	label: nodeText,
        	entityType: nID2nType.get(sourcID)
        })
        nodeSet.add(sourcID);
      }

      if (!nodeSet.has(targetID)) {
        nodeText = graphData.text.substring(nID2index.get(targetID)[0], nID2index.get(targetID)[1]);

        nodes.push( {
        	nodeID: targetID,
        	label: nodeText,
        	entityType: nID2nType.get(targetID)
        })
        nodeSet.add(targetID);
      }

      edges.push( {
      	source: sourcID,
      	target: targetID,
      	label: event_label
      });
  }
	return {Nodes: nodes, Edges: edges, pmID: pmID};
}

export const buildGraphElementsFromGraphData = (graphData) => {
	var i;
    // Create the Elements (Nodes) to be visualized
    var elements = [];

    // From Entities
    var nID2index = new Map();
    for (i=0; i < graphData.entities.length; i++) {
      const nodeID = graphData.entities[i][0];
      const nodeTextSIndex = graphData.entities[i][2][0][0];
      const nodeTextEIndex = graphData.entities[i][2][0][1];
      // const nodeText = graphData.text.substring(nodeTextSIndex,nodeTextEIndex);
      // elements.push( {
      //   data: {
      //     id: nodeID, 
      //     label: nodeText
      //   }
      // });
      nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
    }
    // From Triggers
    for (i=0; i < graphData.triggers.length; i++) {
      const nodeID = graphData.triggers[i][0];
      const nodeTextSIndex = graphData.triggers[i][2][0][0];
      const nodeTextEIndex = graphData.triggers[i][2][0][1];
      // const nodeText = graphData.text.substring(nodeTextSIndex,nodeTextEIndex);
      // elements.push( {
      //   data: {
      //     id: nodeID, 
      //     label: nodeText
      //   }
      // });
      nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
    }

    // Create the Edges to be visualized
    // First map all events to a node
    var eID2nID = new Map();
    for (i=0; i<graphData.events.length; i++) {
      const eventID = graphData.events[i][0];
      const nodeID = graphData.events[i][1];
      eID2nID.set(eventID, nodeID);
    }
    // From Relatiosn
    var nodeSet = new Set();
    for (i=0; i < graphData.relations.length; i++) {
      const eventID_1 = graphData.relations[i][2][0][1];
      const eventID_2 = graphData.relations[i][2][1][1];
      const event_label = graphData.relations[i][1];
      // if (event_label=='BEFORE') {
        // continue;
      // }
      const sourcID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
      const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;

      var nodeText;
      if (!nodeSet.has(sourcID)) {
        nodeText = graphData.text.substring(nID2index.get(sourcID)[0], nID2index.get(sourcID)[1]);
        nodeText = nodeText.length>15 ? nodeText.substring(0,15) : nodeText;
        elements.push( {
          data: {
            id: sourcID,
            label: nodeText
          }
        });
        nodeSet.add(sourcID);
      }

      if (!nodeSet.has(targetID)) {
        nodeText = graphData.text.substring(nID2index.get(targetID)[0], nID2index.get(targetID)[1]);
        nodeText = nodeText.length>15 ? nodeText.substring(0,15) : nodeText;
        elements.push( {
          data: {
            id: targetID,
            label: nodeText
          }
        });
        nodeSet.add(targetID);
      }
      var color="rgb(1, 136, 203)";
      // if (event_label=='BEFORE'){
      //   color = 'red';
      // }
      // else if (event_label=='MODIFY') {
      //   color = 'blue';
      // }
      // else if (event_label=='IDENTICAL') {
      //   color = 'green';
      // }
      elements.push( {
        data: {
          source: sourcID,
          target: targetID,
          label: event_label,
          arrow: 'triangle',
          c: color
        }
      });
  }
  return elements;
}