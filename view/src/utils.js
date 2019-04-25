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

      const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
      const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;

      var nodeText;
      if (!nodeSet.has(sourceID)) {
        nodeText = graphData.text.substring(nID2index.get(sourceID)[0], nID2index.get(sourceID)[1]);

        nodes.push( {
        	nodeID: sourceID,
        	label: nodeText,
        	entityType: nID2nType.get(sourceID)
        })
        nodeSet.add(sourceID);
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
      	source: sourceID,
      	target: targetID,
      	label: event_label
      });
  }
	return {Nodes: nodes, Edges: edges, pmID: pmID};
}


const addEdgeToElements = (graphData, elements, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor) => {
	var nodeText;
	if (!nodeSet.has(sourceID)) {
		nodeText = graphData.text.substring(nID2index.get(sourceID)[0], nID2index.get(sourceID)[1]);
		nodeText = nodeText.length>15 ? nodeText.substring(0,15) : nodeText;
		elements.push( {
			data: {
				id: sourceID,
				label: nodeText,
				type: nType2shape.get( nID2nType.get(sourceID))|| "circle"
			}
		});
		nodeSet.add(sourceID);
	}

	if (!nodeSet.has(targetID)) {
		// console.log(targetID);
		nodeText = graphData.text.substring(nID2index.get(targetID)[0], nID2index.get(targetID)[1]);
		nodeText = nodeText.length>15 ? nodeText.substring(0,15) : nodeText;
		elements.push( {
			data: {
				id: targetID,
				label: nodeText,
				type: nType2shape.get( nID2nType.get(targetID))|| "circle"
			}
		});
		nodeSet.add(targetID);
	}

	elements.push( {
		data: {
			source: sourceID,
			target: targetID,
			label: event_label,
			arrow: 'triangle',
			c: eType2color.get(event_label) || defaultEdgeColor
		}
	});

	// Double connected if overlap
	// if (event_label!='BEFORE') {
	// 	elements.push( {
	// 		data: {
	// 			source: targetID,
	// 			target: sourceID,
	// 			label: event_label,
	// 			arrow: 'triangle',
	// 			c: eType2color.get(event_label) || defaultEdgeColor
	// 		}
	// 	});
	// }
}

export const buildGraphElementsFromGraphData = (graphData) => {

	var nType2shape = new Map([
			// ["type", "ellipse"],
			// ["type", "rectangle"],
			// ["type", "triangle"],
			// ["type", "round-rectangle"],
			// ["type", "bottom-round-rectangle"],
			// ["type", "cut-rectangle"],
			// ["type", "barrel"],
			// ["type", "rhomboid"],
			// ["type", "diamond"],
			// ["type", "pentagon"],
		 // 	["type", "hexagon"],
		 // 	["type", "concave-hexagon"],
		 // 	["type", "heptagon"],
		 // 	["type", "octagon"],
		 // 	["type", "star"],
		 // 	["type", "tag"],
		 // 	["type", "vee"],
	 	["Age", "circle"],											// Entities
	 	["Sex", "ellipse"],
	 	["History", "ellipse"],
	 	["Nonbiological_location", "round-rectangle"],
	 	["detailed_description", "round-rectangle"],
	 	["biological_struture", "round-rectangle"],
	 	["distance", "tag"],
	 	["Lab_value", "tag"],
	 	["Dosage", "star"],
	 	["Severity", "bottom-round-rectangle"],
	 	["Administration", "round-rectangle"],

	 	["Activity", "rectangle"],									// Triggers
	 	["Clinical_event", "star"],
	 	["Sign_symptom", "triangle"],
	 	["Diagnostic_procedure", "star"],
	 	["Duration", "tag"],
	 	["Medication", "octagon"],
	 	["Disease_disorder", "diamond"],
	 	["Coreference", ""],
	 	["Date", "tag"],
	 	["Therapeutic_procedure", "star"]
	]);

	var defaultEdgeColor = "rgb(1, 136, 203)";

	var eType2color =new Map([
		["BEFORE", "red"],
		["MODIFY", "grey"],
		["IDENTICAL", "green"],
		["SUB_PROCEDURE", "purple"],
		["AFTER", "red"],
		["OVERLAP", "black"]
	]);

	var i;
    // Create the Elements (Nodes) to be visualized
    var elements = [];
    // From Entities
    var nID2index = new Map();
    var nID2nType = new Map();
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
    // From Relations
    var nodeSet = new Set();
    for (i=0; i < graphData.relations.length; i++) {
    	const eventID_1 = graphData.relations[i][2][0][1];
		const eventID_2 = graphData.relations[i][2][1][1];
		const event_label = graphData.relations[i][1];
		const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
		const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;

		// SWAP AFTER TO BEFORE
		if (event_label=='AFTER') {
			var temp = sourceID;
			sourceID = targetID;
			targetID = sourceID;
		}

		addEdgeToElements(graphData, elements, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor);
  	}
  	// From Equivs
	for (i=0; i < graphData.equivs.length; i++) {
		const event_label = graphData.equivs[i][1];
		for (var j=2; j< graphData.equivs[i].length-1; j++) {
			for (var k=j+1; k<graphData.equivs[i].length; k++) {
				const eventID_1 = graphData.equivs[i][j];
				const eventID_2 = graphData.equivs[i][k];
				const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
				const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;
				// console.log(i);
				// console.log(j);
				// console.log(k);
				// console.log(eventID_2);
				addEdgeToElements(graphData, elements, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor);
			}
		}
	}
  	return elements;
}