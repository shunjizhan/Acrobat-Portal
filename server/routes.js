const express = require('express');
const axios = require('axios');
const Data = require("./models/mongo/data");
const CaseReport = require("./models/mongo/case_report");
const searchModule = require('./controllers/search_controller.js');
const mongo = require('mongodb');
const CaseReport2 = require("./models/mongo/case_report2");
const User = require("./models/mongo/user");
const bcrypt = require('bcrypt');
const session = require('express-session')

const client = require('./config/neoClient.js');
var writeResponse = require('./helpers/response').writeResponse
var Graph = require('./controllers/graph_controller')
var uuidv1 = require('uuid/v1')

// var HomeController = require('./controllers/home_controller.js');
var fs=require('fs');
var bodyparser=require('body-parser');

module.exports = function(app) {
    // append /api for our http requests
    var router = express.Router();
    app.use("/api", router);


    // app.get('/', HomeController.index);
    // app.get('/getData', DataController.getData);

    /* ------------------------- Mongo Database Routers ------------------------------ */
    // this is our get method
    // this method fetches all available data in our database
    router.get("/getData", (req, res) => {
        Data.find((err, data) => {
            if (err) return res.json({ success: false, error: err });

            return res.json({ success: true, data: data });
        });
    });

    // this is our update method
    // this method overwrites existing data in our database
    router.post("/updateData", (req, res) => {
        const { id, update } = req.body;

        Data.findOneAndUpdate(id, update, err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    });

    // this is our delete method
    // this method removes existing data in our database
    router.delete("/deleteData", (req, res) => {
        const { id } = req.body;

        Data.findOneAndDelete(id, err => {
            if (err) return res.send(err);
            return res.json({ success: true });
        });
    });

    // this is our create method
    // this method adds new data in our database
    router.post("/putData", (req, res) => {
        let data = new Data();
        // console.log(req.body);
        const { id, message } = req.body;

        if ((!id && id !== 0) || !message) {
            return res.json({
                success: false,
                error: "INVALID INPUTS"
            });
        }
        data.message = message;
        data.id = id;
        data.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    });

    /* ----------------------------- Neo4j Database Routers ---------------------------------- */
    // this is our create method
    // this method adds new node in our database
    router.post("/putGraphNode", (req, res, next) => {
        const { nodes, pmID } = req.body;
        var req2 = {};
        const create = (nodes, i) => {

            req2.id = nodes[i].nodeID;
            req2.label = nodes[i].label;
            req2.entityType = nodes[i].entityType;
            req2.pmID = pmID;

            Graph.create(client.getSession(req2), req2)
            .then(response => { 
                i++;
                if (i < nodes.length) {
                    create(nodes, i);
                }else{
                    // writeResponse(res, response);
                    console.log("putGraphNode");
                }
            })
            .catch(next)
        }
        create(nodes, 0);
    });

    // this method adds new relationship in our database
    router.post("/putNodeRelationship", (req, res, next) => {
        const { edges, pmID } = req.body;
        var req2 = {};

        const buildRelation = (edges, i) => {
            req2.source = edges[i].source;
            req2.target = edges[i].target;
            req2.label = edges[i].label;
            req2.pmID = pmID;

            Graph.buildRelation(client.getSession(req2), req2)
            .then(response => { 
                i++;
                if (i < edges.length) {
                    buildRelation(edges, i);
                }else{
                    console.log("buildRelation");
                    // writeResponse(res, response);
                }
            })
            .catch(next)
        }
        buildRelation(edges, 0);
    });

    // this method search nodes with a relationship in our database
    router.post("/searchRelation", (req, res, next) => {
        Graph.searchRelation(client.getSession(req), req.body)
            .then(response => res.json({ success : true, data: response }))
            .catch(next)
    });

    // this method search nodes with multiple relationships in our database
    router.post("/searchMultiRelations", (req, res, next) => {
        Graph.searchMultiRelations(client.getSession(req), req.body)
            .then(response => res.json({ success : true, data: Object.values(response) }))
            .catch(next)
    });

    // this method search nodes with their properties in our database
    router.post("/searchNodes", (req, res, next) => {
        var entities = req.body.entities;
        var query = req.body.query;
        console.log(query);
        const pmIDSet = new Set();
        Graph.searchNodes(client.getSession(req), req.body)
            .then(response => {
                var dict = response; // Get Object
                response = Object.values(dict); // Get Values
                response.forEach(item => pmIDSet.add(item.pmID));
                console.log(pmIDSet, 'pmIDSet');
                searchModule.search2(query, function(data) { // Get ElasticSearch Data for filtering
                    targetData = []; // Target data with priority from neo4j
                    restData = []; // Rest search results from ElasticSearch
                    for (i = 0; i < data.length; i++) { 
                      data[i]._source.content = data[i]._source.content.substring(0,350)+'...'; // Trim to 350 length
                      if (pmIDSet.has(data[i]._source.pmID) ) {
                        data[i]._source.entities = dict[(data[i]._source.pmID).toString()].entities;
                        targetData.push(data[i]);
                      }else{
                        restData.push(data[i]);
                      }
                    }
                    data = targetData.concat(restData);
                    console.log(data);
                    return res.json({ success : true, data: data });
                });
            })
            .catch(next)
        
    });

    // this method delete nodes and relationships in our database
    router.delete("/deleteNodes", (req, res, next) => {
        Graph.removeAll(client.getSession(req))
            .then(response => writeResponse(res, response))
            .catch(next)
    });

    /* --------------------------------- OLD Search APIs --------------------------------------- */
    // this is the method for basic text search on the data message
    router.post("/mongo-db/searchData", (req, res) => {
        const {id, searchKey} = req.body;
        var re = new RegExp(searchKey);
        Data.find( { message:re }, (err, data) => {
            if (err) return res.send(err);
            return res.json({ success : true, data: data });
        });
    });

    router.post('/elastic-search/searchData',(req, res) => {
        const {searchKey} = req.body;
        searchModule.search2(searchKey, function(data) {
            for (i = 0; i < data.length; i++) { 
              data[i]._source.content = data[i]._source.content.substring(0,350)+'...';
            }
            return res.json({ success : true, data: data });
        });
    });

    /* ------------------------- Machine Learning API Routers ------------------------------ */
    router.post("/getPrediction", (req, res) => {
        const params = req.body.data;
        // console.log(params);
        axios.get('http://127.0.0.1:5000/', { params })
            .then(response => {
                data = response.data
                // console.log(data);
                return res.json(data);
            })
            .catch(error => { console.log(error); });
    });

    /* --------------------------------- CaseReport APIs ----------------------------------- */
    // getCaseReport
    // this get API fetches all case reports stored in the mongo db
    router.get("/getCaseReport", (req, res) => {
        CaseReport.find((err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: data });
        });
    });


    // getCaseReportById
    // this get API fetches a case report stored in the mongo db that has the given id
    router.post("/getCaseReportById", (req, res) => {
        const { id } = req.body;
        // console.log(req,'?????');
        // console.log("get case report by id API")
        // console.log(req.body);
        // console.log(searchKey);

        // var oid = new mongo.ObjectID(id)
        CaseReport.find( {pmID : parseInt(id)}, (err, caseReport) => {
            if (err) return res.send(err);
            // console.log("success");
            // console.log(caseReport);
            return res.json({ success: true, data: caseReport});
        });
    });

    router.get("/getCaseReportByIId/:pid", (req, res) => {
        var id  = (req.params.pid);
        console.log(id);
        // console.log(req.params,'?????');
        // console.log("get case report by id API")
        // console.log(req.body);
        // console.log(searchKey);

        // var oid = new mongo.ObjectID(id)
        CaseReport.find( {pmID : parseInt(id)}, (err, caseReport) => {
            if (err) return res.send(err);
            // console.log("success");
            // console.log(caseReport);
            return res.json({ success: true, data: caseReport});
        });
    });
    // putCaseReport
    router.post("/putCaseReport", (req, res) => {
        const {pmid, txt, ann} = req.body;
        let caseReport = new CaseReport();

        console.log('caseReport api messge');
        // console.log(pmid);
        caseReport.pmID = parseInt(pmid);
        caseReport.text = txt;
        caseReport.entities = [];
        caseReport.attributes = [];
        caseReport.relations = [];
        caseReport.triggers = [];
        caseReport.events = [];
        caseReport.comments = [];
        caseReport.equivs = [];
        caseReport.action = "getDocument";
        caseReport.source_files = ["ann", "txt"];
        caseReport.graph_index_data_before = [];
        caseReport.graph_text_data_before = [];

        if (typeof req.body.ann == 'undefined') {
            return res.json({success: false, error: "ann input is not defined"});
        }

        let lines = ann.split(/\r?\n/);
        var i;
        for (i = 0; i<lines.length; i++) {
            let line = lines[i];
            let infos = line.split('\t');
            var type = infos[0];

            // entity or trigger-event
            if (type.charAt(0) == 'T') {            
                // if not followed by event, then this is entity
                if (i==lines.length-1 || lines[i+1].charAt(0)!= 'E') {
                    // add entity to caseReport.entities
                    let entityID = infos[0];
                    let entityContent = infos[1].split(' ');
                    caseReport.entities.push([entityID, entityContent[0], [[parseInt(entityContent[1]), parseInt(entityContent[2])]]]);
                }
                // else this is trigger for event
                else {
                    // add trigger to caseReport.entities
                    let triggerID = infos[0];
                    let triggerContent = infos[1].split(' ');
                    caseReport.triggers.push([triggerID, triggerContent[0], [[parseInt(triggerContent[1]), parseInt(triggerContent[2])]]]);
                }
            } 
            // relation
            else if (type.charAt(0) == 'R') {     
                let relationID = infos[0];
                let relationContent = infos[1].split(' ');
                caseReport.relations.push([relationID, relationContent[0], [["Arg1",relationContent[1].split(':')[1]], ["Arg2", relationContent[2].split(':')[1]]]]);
            } 
            // event
            else if (type.charAt(0) == 'E') {     
                // add to caseReports.events
                let eventID = infos[0];
                caseReport.events.push([eventID, infos[1].split(':')[1].trim(), []]);
            } 
            // attribute
            else if (type.charAt(0) == 'A') {     
                let attributeID = infos[0];
                let attirbuteContent = infos[1].split(' ');
                caseReport.attributes.push([attributeID, attirbuteContent[0], attirbuteContent[1], attirbuteContent[2]]);
            }
            // comment
            else if (type.charAt(0) == '#') {
                let commentContent = infos[1].split(' ');
                caseReport.comments.push([commentContent[1], commentContent[0], infos[2]]);
            }
            // overlap
            else if (type.charAt(0) == '*') {
                let overlapContent = infos[1].split(' ');
                let overlapData = [];
                overlapData.push('*');
                var j;
                for (j =0; j<overlapContent.length; j++) {
                    overlapData.push(overlapContent[j]);
                }
                caseReport.equivs.push(overlapData);
            }

        //     var nID2index = new Map();
        //     for (var j = 0; j < caseReport.entities.length; j++) {      // map nodes to text from entities
        //         const nodeID = caseReport.entities[j][0];
        //         const nodeTextSIndex = caseReport.entities[j][2][0][0];
        //         const nodeTextEIndex = caseReport.entities[j][2][0][1];
        //         // const nodeText = caseReport.text.substring(nodeTextSIndex,nodeTextEIndex);
        //         nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
        //     }
        //     for (var j = 0; j < caseReport.triggers.length; j++) {      // map nodes to text from triggers
        //         const nodeID = caseReport.triggers[j][0];
        //         const nodeTextSIndex = caseReport.triggers[j][2][0][0];
        //         const nodeTextEIndex = caseReport.triggers[j][2][0][1];
        //         // const nodeText = caseReport.text.substring(nodeTextSIndex,nodeTextEIndex);
        //         nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
        //     }

        //     var eID2nID = new Map();
        //     for (var j = 0; j < caseReport.events.length; j++) {
        //         const eventID = caseReport.events[j][0];
        //         const nodeID = caseReport.events[j][1];
        //         eID2nID.set(eventID, nodeID);
        //     }

        //     for (var j = 0; j < caseReport.relations.length; j++) {
        //         const event_label = caseReport.relations[j][1];
        //         if (event_label!='BEFORE') {
        //             continue;
        //         }
        //         const eventID_1 = caseReport.relations[j][2][0][1];
        //         const eventID_2 = caseReport.relations[j][2][1][1];
        //         const nodeID_1 = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
        //         const nodeID_2 = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;
        //         const n1start = nID2index.get(nodeID_1)[0];
        //         const n1end = nID2index.get(nodeID_1)[1];
        //         const n2start = nID2index.get(nodeID_2)[0];
        //         const n2end = nID2index.get(nodeID_2)[1];

        //         caseReport.graph_index_data_before.push([n1start, n1end, nodeID_1, n2start, n2end, nodeID_2]);
        //         caseReport.graph_text_data_before += caseReport.text.substring(n1start, n1end) + ' ' + caseReport.text.substring(n2start, n2end) + '\n';
        //     }
        }

        caseReport.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true});
        });
    });

    // putCaseReport2
    router.post("/putCaseReport2", (req, res) => {
        const {txt, ann} = req.body;
        let caseReport = new CaseReport2();

        console.log('caseReport api messge');

        caseReport.text = txt;
        caseReport.entities = [];
        caseReport.attributes = [];
        caseReport.relations = [];
        caseReport.triggers = [];
        caseReport.events = [];
        caseReport.comments = [];
        caseReport.equivs = [];
        caseReport.action = "getDocument";
        caseReport.source_files = ["ann", "txt"];
        caseReport.graph_index_data_before = [];
        caseReport.graph_text_data_before = [];

        if (typeof req.body.ann == 'undefined') {
            return res.json({success: false, error: "ann input is not defined"});
        }

        let lines = ann.split(/\r?\n/);
        var i;
        for (i = 0; i<lines.length; i++) {
            let line = lines[i];
            let infos = line.split('\t');
            var type = infos[0];

            // entity or trigger-event
            if (type.charAt(0) == 'T') {            
                // if not followed by event, then this is entity
                if (i==lines.length-1 || lines[i+1].charAt(0)!= 'E') {
                    // add entity to caseReport.entities
                    let entityID = infos[0];
                    let entityContent = infos[1].split(' ');
                    caseReport.entities.push([entityID, entityContent[0], [[parseInt(entityContent[1]), parseInt(entityContent[2])]]]);
                }
                // else this is trigger for event
                else {
                    // add trigger to caseReport.entities
                    let triggerID = infos[0];
                    let triggerContent = infos[1].split(' ');
                    caseReport.triggers.push([triggerID, triggerContent[0], [[parseInt(triggerContent[1]), parseInt(triggerContent[2])]]]);
                }
            } 
            // relation
            else if (type.charAt(0) == 'R') {     
                let relationID = infos[0];
                let relationContent = infos[1].split(' ');
                caseReport.relations.push([relationID, relationContent[0], [["Arg1",relationContent[1].split(':')[1]], ["Arg2", relationContent[2].split(':')[1]]]]);
            } 
            // event
            else if (type.charAt(0) == 'E') {     
                // add to caseReports.events
                let eventID = infos[0];
                caseReport.events.push([eventID, infos[1].split(':')[1].trim(), []]);
            } 
            // attribute
            else if (type.charAt(0) == 'A') {     
                let attributeID = infos[0];
                let attirbuteContent = infos[1].split(' ');
                caseReport.attributes.push([attributeID, attirbuteContent[0], attirbuteContent[1], attirbuteContent[2]]);
            }
            // comment
            else if (type.charAt(0) == '#') {
                let commentContent = infos[1].split(' ');
                caseReport.comments.push([commentContent[1], commentContent[0], infos[2]]);
            }
            // overlap
            else if (type.charAt(0) == '*') {
                let overlapContent = infos[1].split(' ');
                let overlapData = [];
                overlapData.push('*');
                var j;
                for (j =0; j<overlapContent.length; j++) {
                    overlapData.push(overlapContent[j]);
                }
                caseReport.equivs.push(overlapData);
            }
        }


        var nID2index = new Map();
        var k = 0
        for (k = 0; k < caseReport.entities.length; k++) {      // map nodes to text from entities
            const nodeID = caseReport.entities[k][0];
            const nodeTextSIndex = caseReport.entities[k][2][0][0];
            const nodeTextEIndex = caseReport.entities[k][2][0][1];
            // const nodeText = caseReport.text.substring(nodeTextSIndex,nodeTextEIndex);
            nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
        }
        for (k = 0; k < caseReport.triggers.length; k++) {      // map nodes to text from triggers
            const nodeID = caseReport.triggers[k][0];
            const nodeTextSIndex = caseReport.triggers[k][2][0][0];
            const nodeTextEIndex = caseReport.triggers[k][2][0][1];
            // const nodeText = caseReport.text.substring(nodeTextSIndex,nodeTextEIndex);
            nID2index.set(nodeID, [nodeTextSIndex, nodeTextEIndex]);
        }

        var eID2nID = new Map();
        for (k = 0; k < caseReport.events.length; k++) {
            const eventID = caseReport.events[k][0];
            const nodeID = caseReport.events[k][1];
            eID2nID.set(eventID, nodeID);
        }

        console.log(caseReport.relations.length);
        for (k = 0; k < caseReport.relations.length; k++) {
            const event_label = caseReport.relations[k][1];
            if (event_label!='BEFORE') {
                continue;
            }
            // console.log(event_label);
            const eventID_1 = caseReport.relations[k][2][0][1];
            const eventID_2 = caseReport.relations[k][2][1][1];
            const nodeID_1 = eID2nID.has(eventID_1) ? eID2nID.get(eventID_1) : eventID_1;
            const nodeID_2 = eID2nID.has(eventID_2) ? eID2nID.get(eventID_2) : eventID_2;
            const n1start = nID2index.get(nodeID_1)[0];
            const n1end = nID2index.get(nodeID_1)[1];
            const n2start = nID2index.get(nodeID_2)[0];
            const n2end = nID2index.get(nodeID_2)[1];

            caseReport.graph_index_data_before.push([n1start, n1end, nodeID_1, n2start, n2end, nodeID_2]);
            caseReport.graph_text_data_before.push (caseReport.text.substring(n1start, n1end) + ' ' + caseReport.text.substring(n2start, n2end));
        }

        caseReport.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true});
        });
    });

    /* --------------------------------------- SIGNUP --------------------------------------- */

    app.use(session({
        key: 'user_sid',
        secret: 'somerandonstuffs',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }));

    router.post('/createUser', function(req, res) {
        console.log('craetUser API')
        console.log(req.body);
        if (!req.body.email || !req.body.password) {
            return res.json({
                success: false,
                error: "INVALID INPUTS"
            });
        }
        
        let user = {};
        user.email = req.body.email;
        user.password = req.body.password;
        
        User.create(user, function(err, user) {
            if (err) {
                return res.json({success: false, error: err});
            } else {
                return res.json({success: true});
            }
        });
    });

    /* --------------------------------------- SIGNIN --------------------------------------- */
    app.post('/login', function(req, res) {
        var email = req.body.email,
            password = req.body.password;
        console.log(email, password);
        User.findOne({ email: email }).then(function (user, err) {
            if (err) {
                console.log("email not registered");
                return res.json({success: false, error: err});
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                console.log(err);
                return res.json({success: false, error: err});
            }
            console.log("found user");
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return res.json({success: true});
                } else {
                    console.log("err3");
                    return res.json({success: false, error: err});
                }
            })
        });
    });

    /* --------------------------------------- LOGOUT --------------------------------------- */

    app.get('/logout', function(req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    });

};