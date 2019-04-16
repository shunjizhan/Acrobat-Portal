var Entity = require('../models/neo4j/entity')

var create = function (session, entity) {
  let query = 'CREATE (c:Entity{id: {id}, entityType: {entityType}, label: {label}}) RETURN c'
  var writexResultPromise = session.writeTransaction(function (transaction) {
    // used transaction will be committed automatically, no need for explicit commit/rollback
    var result = transaction.run(query, {
      id: entity.id,
      entityType: entity.entityType,
      label: label
    })
    return result
  })

  return writexResultPromise.then(_returnBySingleId).catch(_handlePayloadValidation)
}

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

// Exports functions.
module.exports = {
  create: create,
  update: update
}