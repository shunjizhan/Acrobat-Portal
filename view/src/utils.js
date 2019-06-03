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


const addEdgeToElements = (graphData, elements, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color) => {
	var nodeText;
	if (!nodeSet.has(sourceID)) {
		nodeText = graphData.text.substring(nID2index.get(sourceID)[0], nID2index.get(sourceID)[1]);
		// nodeText = nodeText.length>20 ? nodeText.substring(0,20) : nodeText;
		elements.push( {
			data: {
				id: sourceID,
				label: nodeText,
				type: nType2shape.get( nID2nType.get(sourceID))|| "round-rectangle",
				color: nType2color.get( nID2nType.get(sourceID)) || "green"
			}
		});
		nodeSet.add(sourceID);
	}

	if (!nodeSet.has(targetID)) {
		// console.log(targetID);
		nodeText = graphData.text.substring(nID2index.get(targetID)[0], nID2index.get(targetID)[1]);
		// nodeText = nodeText.length>20 ? nodeText.substring(0,20) : nodeText;
		elements.push( {
			data: {
				id: targetID,
				label: nodeText,
				type: nType2shape.get( nID2nType.get(targetID))|| "round-rectangle",
				// classes: 'multiline-auto',
				color: nType2color.get( nID2nType.get(targetID)) || "green"
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
	// if (event_label=='OVERLAP') {
	// 	elements.push( {
	// 		data: {
	// 			source: targetID,
	// 			target: sourceID,
	// 			// label: event_label,
	// 			arrow: 'triangle',
	// 			c: eType2color.get(event_label) || defaultEdgeColor
	// 		}
	// 	});
	// }
}

const addOverlapToElements = (graphData, elements, parentID, childID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color) => {
	var nodeText;
	if (!nodeSet.has(parentID)) {
		// nodeText = graphData.text.substring(nID2index.get(parentID)[0], nID2index.get(parentID)[1]);
		// nodeText = nodeText.length>20 ? nodeText.substring(0,20) : nodeText;
		nodeText = ""
		elements.push( {
			data: {
				id: parentID,
				label: nodeText,
				type: nType2shape.get( nID2nType.get(parentID))|| "round-rectangle",
				color: nType2color.get( nID2nType.get(parentID)) || "green"
			}
		});
		nodeSet.add(parentID);
	}
	if (!nodeSet.has(childID)) {
		// console.log(targetID);
		nodeText = graphData.text.substring(nID2index.get(childID)[0], nID2index.get(childID)[1]);
		// nodeText = nodeText.length>20 ? nodeText.substring(0,20) : nodeText;
		elements.push( {
			data: {
				id: childID,
				label: nodeText,
				parent: parentID,
				type: nType2shape.get( nID2nType.get(childID))|| "round-rectangle",
				color: nType2color.get( nID2nType.get(childID)) || "green"
			}
		});
		nodeSet.add(childID);
	}

	// elements.push( {
	// 	data: {
	// 		source: parentID,
	// 		target: childID,
	// 		label: "dummy",
	// 		arrow: 'triangle',
	// 		c: eType2color.get(event_label) || defaultEdgeColor
	// 	}
	// });
	// elements.push( {
	// 	data: {
	// 		source: childID,
	// 		target: parentID,
	// 		label: "dummy",
	// 		arrow: 'triangle',
	// 		c: eType2color.get(event_label) || defaultEdgeColor
	// 	}
	// });
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
	 	["Sex", "circle"],
	 	["History", "circle"],
	 	["Nonbiological_location", "circle"],
	 	["detailed_description", "circle"],
	 	["biological_struture", "circle"],
	 	["distance", "circle"],
	 	["Lab_value", "circle"],
	 	["Dosage", "circle"],
	 	["Severity", "circle"],
	 	["Administration", "circle"],

	 	["Activity", "round-rectangle"],									// Triggers
	 	["Clinical_event", "round-rectangle"],
	 	["Sign_symptom", "round-rectangle"],
	 	["Diagnostic_procedure", "round-rectangle"],
	 	["Duration", "round-rectangle"],
	 	["Medication", "round-rectangle"],
	 	["Disease_disorder", "round-rectangle"],
	 	["Coreference", "round-rectangle"],
	 	["Date", "round-rectangle"],
	 	["Therapeutic_procedure", "round-rectangle"]
	]);

	var nType2color = new Map([

	 	["Age", "#EDC1F0"],											// Entities
	 	["Sex", "#EDC1F0"],
	 	["Personal_background", "#EDC1F0"],
	 	["Occupation", "#EDC1F0"],
	 	["Weigh", "#EDC1F0"],
	 	["Height", "#EDC1F0"],
	 	["History", "ellipse"],
	 	["Family_history", "#EDC1F0"],
	 	["Family_member", "#EDC1F0"],
	 	["Medication", "#2FCACA"],
	 	["Lab", "#8f97ff"],
	 	["Therapeutic_procedure", "#6495ed"],
		["Diagnostic_procedure", "#9fdfff"],
		["Sign_disease", "#f4eded"],
		["Sign_symptom", "#DAE48B"],
		["Disease_disorder", "#EB8315"],
		["Activity", "#E07BAF"],
		["Clinical_event","#E07BAF"],
		["Outcome", "#E07BAF"],
		["Subject", "#ffd700"],
		["Negation", "#ffd700"],
		["Uncertainty", "#ffd700"],
		["Condition", "#ffd700"],
		["Quantitative_concept", "#ffd700"],
		["Qualitative_concept", "#ffd700"],
		["Other_entity", "#c1cdcd"],
		["Other_event", "#c1cdcd"],
		["Administration", "#ffd700"],
		["Dosage", "#ffd700"],
		["Frequency", "#ffd700"],
		["Cause", "#ffd700"],
		["Complication", "#ffd700"],
		["Severity", "#ffd700"],
		["Location", "#ffd700"],
		["Result_outcome", "#ffd700"],
		["Lab_value", "#A04AF0"],
		["Biological_structure", "#ffd700"],
		["Detail_description", "#ffd700"],
		["Biological_attribute", "#ffd700"],
		["Nonbiological_location", "#ffd700"],
		["Detailed_description", "#ffd700"],
		["Distance", "#ffd700"],
		["Area", "#ffd700"],
		["Volume", "#ffd700"],
		["Mass", "#ffd700"],
		["Color", "#ffd700"],
		["Shape", "#ffd700"],
		["Texture", "#ffd700"],
		["Coreference", "#808000"]
	]);


	var defaultEdgeColor = "rgb(1, 136, 203)";

	var eType2color =new Map([
		["BEFORE", "black"],
		["MODIFY", "grey"],
		["IDENTICAL", "black"],
		["SUB_PROCEDURE", "black"],
		["AFTER", "black"],
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


    var nodeSet = new Set();
    var overlapID = 0;
	var k;
	for (i=0; i < graphData.equivs.length; i++) {
		const event_label = graphData.equivs[i][1];
		// var parentNode = graphData.equivs[i][2];
		var parentNode = "OV"+overlapID;
		for (k=2; k< graphData.equivs[i].length; k++) {
			const childNode = graphData.equivs[i][k];
			const parentID = eID2nID.has(parentNode) ? eID2nID.get(parentNode) : parentNode;
			const childID = eID2nID.has(childNode) ? eID2nID.get(childNode) : childNode;
			addOverlapToElements(graphData, elements, parentID, childID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color);
		}
		overlapID += 1;
	}

    // From Relations
    
    for (i=0; i < graphData.relations.length; i++) {
    	const eventID_1 = graphData.relations[i][2][0][1];
		const eventID_2 = graphData.relations[i][2][1][1];
		const event_label = graphData.relations[i][1];
		var sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
		var targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;

		// SWAP AFTER TO BEFORE
		if (event_label=='AFTER') {
			var temp = sourceID;
			sourceID = targetID;
			targetID = sourceID;
		}

		addEdgeToElements(graphData, elements, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color);
  	}
  	// From Equivs
	// for (i=0; i < graphData.equivs.length; i++) {
	// 	const event_label = graphData.equivs[i][1];
	// 	for (var j=2; j< graphData.equivs[i].length-1; j++) {
	// 		// for (var k=j+1; k<graphData.equivs[i].length; k++) {
	// 			var k=j+1;
	// 			const eventID_1 = graphData.equivs[i][j];
	// 			const eventID_2 = graphData.equivs[i][k];
	// 			const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
	// 			const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;
	// 			addEdgeToElements(graphData, elements, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color);
	// 			// addEdgeToElements(graphData, elements, targetID, sourceID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color);

	// 		// }
	// 	}
	// }


  	return elements;
}


export const buildSubGraphElementsFromGraphData = (graphData, queryNodes) => {
	var queryNodesSet = new Set();
	var queryNodeIDPairs;
	// console.log(queryNodes);
	// console.log(queryNodes[0]);
	// console.log(queryNodes[0][0]);
	// console.log(queryNodes[0][1]);
	// console.log(queryNodes.length);
	for (var x =0; x <queryNodes.length; x++) {
		queryNodeIDPairs = queryNodes[x];
		queryNodesSet.add(queryNodeIDPairs[0]);
		queryNodesSet.add(queryNodeIDPairs[1]);
		// console.log(queryNodeIDPairs);
		// console.log(queryNodeIDPairs[0]);
		// console.log(queryNodeIDPairs[1]);
	}

	console.log("set length is ");
	console.log(queryNodesSet.size);

	var nType2shape = new Map([
	 	["Age", "circle"],											// Entities
	 	["Sex", "circle"],
	 	["History", "circle"],
	 	["Nonbiological_location", "circle"],
	 	["detailed_description", "circle"],
	 	["biological_struture", "circle"],
	 	["distance", "circle"],
	 	["Lab_value", "circle"],
	 	["Dosage", "circle"],
	 	["Severity", "circle"],
	 	["Administration", "circle"],

	 	["Activity", "round-rectangle"],									// Triggers
	 	["Clinical_event", "round-rectangle"],
	 	["Sign_symptom", "round-rectangle"],
	 	["Diagnostic_procedure", "round-rectangle"],
	 	["Duration", "round-rectangle"],
	 	["Medication", "round-rectangle"],
	 	["Disease_disorder", "round-rectangle"],
	 	["Coreference", "round-rectangle"],
	 	["Date", "round-rectangle"],
	 	["Therapeutic_procedure", "round-rectangle"]
	]);

	var nType2color = new Map([

	 	["Age", "#EDC1F0"],											// Entities
	 	["Sex", "#EDC1F0"],
	 	["Personal_background", "#EDC1F0"],
	 	["Occupation", "#EDC1F0"],
	 	["Weigh", "#EDC1F0"],
	 	["Height", "#EDC1F0"],
	 	["History", "ellipse"],
	 	["Family_history", "#EDC1F0"],
	 	["Family_member", "#EDC1F0"],
	 	["Medication", "#2FCACA"],
	 	["Lab", "#8f97ff"],
	 	["Therapeutic_procedure", "#6495ed"],
		["Diagnostic_procedure", "#9fdfff"],
		["Sign_disease", "#f4eded"],
		["Sign_symptom", "#DAE48B"],
		["Disease_disorder", "#EB8315"],
		["Activity", "#E07BAF"],
		["Clinical_event","#E07BAF"],
		["Outcome", "#E07BAF"],
		["Subject", "#ffd700"],
		["Negation", "#ffd700"],
		["Uncertainty", "#ffd700"],
		["Condition", "#ffd700"],
		["Quantitative_concept", "#ffd700"],
		["Qualitative_concept", "#ffd700"],
		["Other_entity", "#c1cdcd"],
		["Other_event", "#c1cdcd"],
		["Administration", "#ffd700"],
		["Dosage", "#ffd700"],
		["Frequency", "#ffd700"],
		["Cause", "#ffd700"],
		["Complication", "#ffd700"],
		["Severity", "#ffd700"],
		["Location", "#ffd700"],
		["Result_outcome", "#ffd700"],
		["Lab_value", "#A04AF0"],
		["Biological_structure", "#ffd700"],
		["Detail_description", "#ffd700"],
		["Biological_attribute", "#ffd700"],
		["Nonbiological_location", "#ffd700"],
		["Detailed_description", "#ffd700"],
		["Distance", "#ffd700"],
		["Area", "#ffd700"],
		["Volume", "#ffd700"],
		["Mass", "#ffd700"],
		["Color", "#ffd700"],
		["Shape", "#ffd700"],
		["Texture", "#ffd700"],
		["Coreference", "#808000"]
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
    var j;
    var k;
    for (i=0; i<graphData.events.length; i++) {
		const eventID = graphData.events[i][0];
		const nodeID = graphData.events[i][1];
		eID2nID.set(eventID, nodeID);
    }
    // 1st Layer Neighbors 
    var queryNodesSet2ndLayer = new Set();
    for (var queryNode of queryNodesSet) {
    	queryNodesSet2ndLayer.add(queryNode);
    	console.log("in for each loop");
    }
    // From Relations ------------------------------------ 1st neighors
    var nodeSet = new Set();
    for (i=0; i < graphData.relations.length; i++) {
    	const eventID_1 = graphData.relations[i][2][0][1];
		const eventID_2 = graphData.relations[i][2][1][1];
		const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
		const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;
		
		if (queryNodesSet.has(sourceID) || queryNodesSet.has(targetID)) {
			// queryNodesSet.add(sourceID);
			// queryNodesSet.add(targetID);
			queryNodesSet2ndLayer.add(sourceID);
			queryNodesSet2ndLayer.add(targetID);
		}
  	}
  	// From Equivs ------------------------------------ 1st neighors
  	for (i=0; i < graphData.equivs.length; i++) {
		// const event_label = graphData.equivs[i][1];
		for (j=2; j< graphData.equivs[i].length-1; j++) {
			k=j+1;
			const eventID_1 = graphData.equivs[i][j];
			const eventID_2 = graphData.equivs[i][k];
			const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
			const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;
			if (queryNodesSet.has(sourceID) || queryNodesSet.has(targetID)) {
				queryNodesSet.add(sourceID);
				queryNodesSet.add(targetID);
				queryNodesSet2ndLayer.add(sourceID);
				queryNodesSet2ndLayer.add(targetID);
			}
		}
	}
  	
  	// From Equivs ------------------------------------ 2nd neighors
	// for (i=0; i < graphData.equivs.length; i++) {
	// 	const event_label = graphData.equivs[i][1];
	// 	for (j=2; j< graphData.equivs[i].length-1; j++) {
	// 		k=j+1;
	// 		const eventID_1 = graphData.equivs[i][j];
	// 		const eventID_2 = graphData.equivs[i][k];
	// 		const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
	// 		const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;
	// 		if (queryNodesSet.has(sourceID) || queryNodesSet.has(targetID)) {
	// 			addEdgeToElements(graphData, elements, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color);
	// 		}
	// 	}
	// }
	// From Equivs ------------------------------------ 2nd neighors		REDO OVERLAP
	var overlapID = 0
	for (i=0; i < graphData.equivs.length; i++) {
		const event_label = graphData.equivs[i][1];
		// var parentNode = graphData.equivs[i][2];
		var parentNode = "OV"+overlapID;
		for (k=2; k< graphData.equivs[i].length; k++) {
			const childNode = graphData.equivs[i][k];
			const parentID = eID2nID.has(parentNode) ? eID2nID.get(parentNode) : parentNode;
			const childID = eID2nID.has(childNode) ? eID2nID.get(childNode) : childNode;
			
			if (queryNodesSet2ndLayer.has(parentID) || queryNodesSet2ndLayer.has(childID)) {
				addOverlapToElements(graphData, elements, parentID, childID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color);
			}
		}
		overlapID += 1;
	}

	// From Relations ------------------------------------ 2nd neighors
	for (i=0; i < graphData.relations.length; i++) {
    	const eventID_1 = graphData.relations[i][2][0][1];
		const eventID_2 = graphData.relations[i][2][1][1];
		const event_label = graphData.relations[i][1];
		const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
		const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;
		// SWAP AFTER TO BEFORE
		// if (event_label=='AFTER') {
		// 	var temp = sourceID;
		// 	sourceID = targetID;
		// 	targetID = sourceID;
		// }
		if (queryNodesSet2ndLayer.has(sourceID) || queryNodesSet2ndLayer.has(targetID)) {
			console.log("sourceID is : " + sourceID);
			console.log("targetID is : " + targetID);
			addEdgeToElements(graphData, elements, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType, nType2shape, eType2color, defaultEdgeColor, nType2color);
		}
  	}

  	console.log("new set length is ");
	console.log(queryNodesSet2ndLayer.size);

  	return elements;
}




export const combineMultiWordEntity = (entity_types, tokens) => {
    /*  args:
        [entity_types] array of array
        [tokens] array of array
        outer array is the whole article, inner array is each sentence

        return type: array of object
        [{  
            label: 'label1',
            type: 'type1'  
        }, {
            label: 'label2',
            type: 'type2' 
        },
        ... 
        {
            label: 'label3',
            type: 'type3' 
        }]

                                                                      */
    const _flat = arrays => [].concat.apply([], arrays);

    entity_types = _flat(entity_types);
    tokens = _flat(tokens);

    const res = [];
    let i = entity_types.length - 1;
    while (i >= 0) {
        let type = entity_types[i];
        let label = tokens[i];
        if (type === 'O' || type === 'S') {     // single token
            res.unshift({ label, type });
            i --;
        } else {
            let name;
            [type, name] = type.split('-');
            if (type === 'B') {
                res.unshift({ label, type: name });
                i --;
            } else {
                // type I or E
                // this is a multi word entity
                // look backward until find 'B'
                let entity = label;
                while (type === 'I' || type === 'E') {
                    i --;
                    type = entity_types[i];
                    label = tokens[i];
                    [type, name] = type.split('-');
                    entity = label + ' ' + entity;
                }

                res.unshift({ label: entity, type: name });
                i --;
            }
        }
    }

    return res;

};



export const addHighLight = (text, tokens, className='highLight') => {
    // basically wrap these [tokens] in [text] with span that has [className]
    if (tokens === null) { return text; }

    for (let t of tokens) {
        let highlight = '<span class=' + className + '>' + t + '</span>';
        text = text.replace(t, highlight);
    }

    return text;
};


export const allQueriesToTextEntities = allQueries => {
    /*  args
        [allQueries]: array of object
        [{
            queries: ['A', 'B', 'C'],
            relations: ['BEFORE', 'BEFORE']
        }]

        return type: array of object
        [{  
            label: 'label1',
            type: 'type1'  
        }, {
            label: 'label2',
            type: 'type2' 
        },
        ... 
        {
            label: 'label3',
            type: 'type3' 
        }]
    */
    const res = [];
    allQueries.forEach(q => {
        const { queries } = q;
        queries.forEach(queryItem => {
            res.push({
                label: queryItem,
                type: ''
            })
        });
    });
    return res;
};






















