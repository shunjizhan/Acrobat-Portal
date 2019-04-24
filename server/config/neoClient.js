var neo4j = require('neo4j-driver').v1;
var driver = new neo4j.driver("bolt://34.229.254.166:33758", neo4j.auth.basic("neo4j", "uncertainties-habits-documentations"));
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
