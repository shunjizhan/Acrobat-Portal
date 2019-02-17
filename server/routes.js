const express = require('express');
const axios = require('axios');
const Data = require("./models/mongo/data");
const CaseReport = require("./models/mongo/case_report");

//在这里我们可以建立controller，然后在controller里做api要做的事情
// var HomeController = require('./controllers/home_controller.js');

module.exports = function(app) {
    // append /api for our http requests
    var router = express.Router();
    app.use("/api", router);


    // 这样我们call api的时候可以把前后端交互的逻辑移到controller里,比如
    // app.get('/', HomeController.index);
    // app.get('/getData', DataController.getData);等等

    // HomeController我写了，顺稷你看看怎么显示react的界面，或者我们可以以后再说。
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
        
        var re = new RegExp(searchKey);

        Data.find( { message:re }, (err, data) => {
            if (err) return res.send(err);
            return res.json({ success : true, data: data });
        });
    });

    /* ------------------------- Machine Learning API Routers ------------------------------ */
    router.post("/getPrediction", (req, res) => {
        const params = req.body.data;
        console.log(params);
        axios.get('http://127.0.0.1:5000/', { params })
            .then(response => {
                data = response.data
                console.log(data);
                return res.json(data);
            })
            .catch(error => { console.log(error); });
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