var Entity = require('../models/neo4j/entity')

/*
	Private Functions for return id
*/
var _returnBySingleId = function (result) {
  let rec = result.records
  // console.log(rec,'rec')
  if (rec.length === 0) {
    let error = {
      message: 'Entity is not found.',
      status: 404
    }
    throw error
  }
  return new Entity(rec[0].get('c'))
}

/*
	Private Functions for handling Payload
*/
var _handlePayloadValidation = function (err) {
  let code = err.code
  if (code === 'Neo.ClientError.Statement.ParameterMissing') {
    let error = {
      message: err.message,
      status: 409
    }
    throw error
  }
  throw err
}

/*
	Public Functions for Creating nodes
*/
var create = function (session, entity) {
  let query = 'CREATE (c:Entity {id: {id}, entityType: {entityType}, label: {label}}) RETURN c'
  console.log(entity);
  var writexResultPromise = session.writeTransaction(function (transaction) {
    // used transaction will be committed automatically, no need for explicit commit/rollback
    var result = transaction.run(query, {
      id: entity.id,
      entityType: entity.entityType,
      label: entity.label
    })
    return result
  })
  return writexResultPromise.then(_returnBySingleId).catch(_handlePayloadValidation)
}

/*
	Public Functions for Updating nodes
*/
var update = function (session, entity) {
  let query = 'MATCH (c:Entity{id: {id}}) SET c += { entityType: {entityType}, label: {label}} RETURN c'
  var writexResultPromise = session.writeTransaction(function (transaction) {
    // used transaction will be committed automatically, no need for explicit commit/rollback
    var result = transaction.run(query, {
      id: entity.id,
      entityType: entity.entityType,
      label: entity.label
    })
    return result
  })

  return writexResultPromise.then(_returnBySingleId).catch(_handlePayloadValidation)
}

/*
	Public Functions for Building relations
*/
var buildRelation = function(session, relation){
	// console.log(relation)
	var relationType = relation.relationship
	let query = 'MATCH (u:Entity {id: {id1} }), (r:Entity {id: {id2} }) CREATE (u)-[c:'+relationType+']->(r) RETURN c'
	console.log(query)
	var writexResultPromise = session.writeTransaction(function (transaction) {
    // used transaction will be committed automatically, no need for explicit commit/rollback
	   	var result = transaction.run(query, {
	      id1: relation.id1,
	      id2: relation.id2,
	    })
	    return result
	})
  
  return writexResultPromise.then(_returnBySingleId).catch(_handlePayloadValidation)
  // return writexResultPromise.then(() => session.readTransaction(findRelationships).then(() => session.close()));
}

/*
	Public Functions for Removing all nodes
*/
var removeAll = function (session) {
  let query = 'MATCH (c) DETACH DELETE c'
  var writexResultPromise = session.writeTransaction(function (transaction) {
    // used transaction will be committed automatically, no need for explicit commit/rollback
    return transaction.run(query)
  })
  return writexResultPromise.then(results => {
    return {
      message: 'All nodes are deleted.'
    }
  })
}

// Exports functions.
module.exports = {
  create: create,
  update: update,
  buildRelation: buildRelation,
  removeAll: removeAll
}
