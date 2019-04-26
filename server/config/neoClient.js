var neo4j = require('neo4j-driver').v1;
var driver = new neo4j.driver("bolt://54.226.6.209:39322", neo4j.auth.basic("neo4j", "crew-compliance-pilots"));
// var driver = new neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "ucla"));

var getSession = function (context) {
  if (context.neo4jSession) {
    return context.neo4jSession;
  } else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};

module.exports = {
	driver: driver,
	getSession: getSession
}
