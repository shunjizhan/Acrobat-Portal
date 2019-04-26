const mongoose = require("mongoose");
const CaseReport = require("./models/mongo/case_report");
const axios = require('axios');
const dbRoute = "mongodb://shunhahaha:z132465798@ds123050.mlab.com:23050/hahaha";
var Graph = require('./controllers/graph_controller')
const testFolder = './COMPLETE/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  // var x = 0;
  files.forEach(file => {
  	if(file.substring(file.length - 4, file.length) == '.ann'){
  		// x++;
    	fileId = parseInt(file.substring(0, file.length - 4));
    	console.log(fileId);
    	axios.post('http://localhost:3001/api/getCaseReportById/', { id:fileId })
            .then(response => {
                data = response.data.data[0];
                // console.log(data);
                var acrobat_graph = buildGraphFromGraphData(data);
                nodes = acrobat_graph.Nodes;
                edges = acrobat_graph.Edges;
                // console.log(nodes);
                // console.log(edges);
               	//--------------------------------------------- 
               	axios.post('http://localhost:3001/api/putGraphNode/', {nodes: nodes, pmID: acrobat_graph.pmID})
               	.then(response => {
               		console.log("response");
	            })
	            .catch(error => { console.log("error in graphnode"); });
	            // //------------------------------------------
	            axios.post('http://localhost:3001/api/putNodeRelationship/', {edges: edges, pmID: acrobat_graph.pmID})
               	.then(response => {
               		console.log("response");
	            })
	            .catch(error => { console.log("error in relation"); });
            })
            .catch(error => { console.log("error"); });
  	}
  });
});
// var buildGraphFromGraphData = function (session, entity)
var buildGraphFromGraphData = function (graphData){
	console.log(graphData);
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

      addEdge(graphData, nodes, edges, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType);
    }

	// Create edges from overlap
	for (i=0; i < graphData.equivs.length; i++) {
		const event_label = graphData.equivs[i][1];
		for (var j=2; j<graphData.equivs[i].length-1;j++){
			var k = j+1;
			const eventID_1 = graphData.equivs[i][j];
			const eventID_2 = graphData.equivs[i][k]
			const sourceID = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
			const targetID = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;

			addEdge(graphData, nodes, edges, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType);
		}
	}
	return {Nodes: nodes, Edges: edges, pmID: pmID};
}


var addEdge = function (graphData, nodes, edges, sourceID, targetID, event_label, nodeSet, nID2index, nID2nType){
	var nodeText;
	if (!nodeSet.has(sourceID)) {
		// console.log(nID2index.get(sourceID));
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