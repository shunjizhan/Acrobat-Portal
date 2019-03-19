var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {
  hosts: [
    'https://search-acrobate-6oayszlzcxx2isu4cxe2sea3qy.us-east-2.es.amazonaws.com'
  ]
});

module.exports.search = function(searchData, callback) {
  console.log(searchData, 'elasticsearch')
  client.search({
    index: 'casereport',
    type: '_doc',
    body: {
      query: {
        bool: {
          should: {
            match: {
              "content": searchData
            }
          }
        }
      }
    }
  }).then(function (resp) {
    callback(resp.hits.hits);
  }, function (err) {
      callback(err.message)
      console.log(err.message);
  });
}