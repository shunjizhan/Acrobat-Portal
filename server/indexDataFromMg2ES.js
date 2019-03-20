const mongoose = require("mongoose");
var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {
  hosts: [
    'https://search-acrobate-6oayszlzcxx2isu4cxe2sea3qy.us-east-2.es.amazonaws.com'
  ]
});

const dbRoute = "mongodb://shunhahaha:z132465798@ds123050.mlab.com:23050/hahaha";
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const CaseReport = require("./models/mongo/case_report");
CaseReport.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    var body = [];
    data.forEach(function(row, id) {
             body.push({ index:  { _index: 'casereport', _type: '_doc', _id: (id+1) } });
             body.push({ id: row._id, content: row.text});
        })  
    console.log(body)
    client.indices.putMapping({
       "index": "casereport",
       "type": "_doc",
       "body": {
          "_doc": {
              "properties": {
                  "id": {
                      "type": "text"
                  },
                  "content": {
                      "type": "text"
                  }
              }
          }
       }
    }, function (err, response) {
       // from this point on, if you don't get any error, you may call bulk.
    });
    client.bulk(
        {
            body: body
        }, function (err, resp) {
                if (err) 
                {
                    console.log(err);
                    return;
               }
              else 
              { 
                    console.log("All Is Well");
              }
           });
});
