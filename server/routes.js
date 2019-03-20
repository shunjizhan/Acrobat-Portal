const express = require('express');
const axios = require('axios');
const Data = require("./models/mongo/data");
const CaseReport = require("./models/mongo/case_report");
const searchModule = require('./search.js');
const mongo = require('mongodb');


//在这里我们可以建立controller，然后在controller里做api要做的事情
// var HomeController = require('./controllers/home_controller.js');

module.exports = function(app) {
    // append /api for our http requests
    var router = express.Router();
    app.use("/api", router);


    // 这样我们call api的时候可以把前后端交互的逻辑移到controller里,比如
    // app.get('/', HomeController.index);
    // app.get('/getData', DataController.getData);等等

    /* ------------------------- Database Routers ------------------------------ */
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

    // this is our create methid
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

    /* --------------------------------- Search APIs --------------------------------------- */
    // this is the method for basic text search on the data message
    router.post("/searchData", (req, res) => {
        const {id, searchKey} = req.body;
        // console.log(req);
        // console.log(searchKey);
        // console.log('searchData api message');

        var re = new RegExp(searchKey);

        Data.find( { message:re }, (err, data) => {
            if (err) return res.send(err);
            return res.json({ success : true, data: data });
        });
    });

    router.post('/searchDataES',(req, res) => {
        // console.log(req.body);
        const {searchKey} = req.body;
        // var req_body = new RegExp(searchKey);
        searchModule.search(searchKey, function(data) {
            console.log(data,'server')
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
                console.log(data);
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
        console.log(id);
        // console.log("get case report by id API")
        // console.log(id);
        // console.log(searchKey);

        var oid = new mongo.ObjectID(id)
        CaseReport.find( {_id : oid}, (err, caseReport) => {
            if (err) return res.send(err);
            // console.log("success");
            return res.json({ success: true, data: caseReport});
        });
    });

    // putCaseReport
    router.post("/putCaseReport", (req, res) => {
        const {txt, ann} = req.body;
        let caseReport = new CaseReport();

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

        caseReport.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true});
        });
    });

    // For Future Use If We Are Having Users
    /* --------------------------------------- SIGNUP --------------------------------------- */

    // app.get('/signup', function(req, res) {
    //     res.render('home/signup', {
    //         loggedIn : req.loggedIn,
    //         user : req.user, 
    //         message: req.flash('signupMessage') });
    // });

    /* --------------------------------------- LOGOUT --------------------------------------- */

    // app.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/home/login');
    // });
};