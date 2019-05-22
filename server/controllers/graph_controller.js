var Entity = require('../models/neo4j/entity')

/*
	Private response functions for returning all entities
    Return: object{ pmid: { pmID: --- , entities: [ [Array], [Array], ... ] }, {}, ...}
*/
var _manyEntities = function (result) {
    console.log(result.records);
    if (result.records.length == 0) {
        return {};
    }
    res = result.records.map(r => ({ pmID: r.get(result.records[0].keys[0]).properties.pmID, entities: r.keys.map(k => r.get(k).properties.id)}));
    var dict = new Object();
    for (var i = 0; i < res.length; i++) {
        var pmID = res[i].pmID;
        if (!dict.hasOwnProperty(pmID)){
            dict[pmID] = new Object();
            dict[pmID].pmID = pmID;
            dict[pmID].entities = [];
        } 
        dict[pmID].entities.push(res[i].entities);
    }
    console.log(dict, 'object');
    return dict;
    // console.log(result.records.map(r => ({ pmID: r.get('a').properties.pmID, entities: r.keys.map(k => r.get(k).properties.id)})));
    // console.log(result.records.map(r => (new Entity(r.get('a')))));
    // return result.records.map(r => ({ pmID: r.get('a').properties.pmID, entities: r.keys.map(k => r.get(k).properties)}));
    // return result.records.map(r => (new Entity(r.get('a'))))
}

/*
	Private Functions for return single entity
*/
var _returnBySingleId = function (result) {
    var key = result.records[0].keys[0];
    let rec = result.records;
    if (rec.length === 0) {
        let error = {
            message: 'Entity is not found.',
            status: 404
        }
        throw error
    }
    return new Entity(rec[0].get(key));
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
    Private Helper Functions for replacing quries
*/
var matchQuery = function(queries, relations, row){
    var res = ``;
    var queriesLen = 0 
    if (queries.length!=0) {
        res += _entity(0, queries[0], row);
    }
    else{
        return res;
    }
    for (var i = 0; i < queries.length-1; i++) {
        res += ('-'+_relation(relations[i])+'->');
        res += _entity(i+1, queries[i+1], row)
    }
    return res;
}

/*
    Private Helper Functions for replacing entity in query
*/
var _entity = function(i, en, row){
    var va = 'v'+row+i;
    return `(${va}:Entity{label:'${en}'})`
}

/*
    Private Helper Functions for replacing relation in query
*/
var _relation = function(re){
    if (re == 'optional') {
        return `[:]`;
    }else{
        return `[:${re}]`
    }
}

/*
	Public Functions for Creating nodes
*/
var create = function (session, entity) {
    let query = 'CREATE (c:Entity {id: {id}, entityType: {entityType}, label: {label}, pmID: {pmID}}) RETURN c'
    // console.log(entity);
    var writexResultPromise = session.writeTransaction(function (transaction) {
        // used transaction will be committed automatically, no need for explicit commit/rollback
        var result = transaction.run(query, {
            id: entity.id,
            pmID: entity.pmID,
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
    let query = 'MATCH (c:Entity{id: {id}}) SET c += { entityType: {entityType}, label: {label}, pmID: {pmID}} RETURN c'
    var writexResultPromise = session.writeTransaction(function (transaction) {
        // used transaction will be committed automatically, no need for explicit commit/rollback
        var result = transaction.run(query, {
            id: entity.id,
            pmID: entity.pmID,
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
	var relationType = relation.label
	let query = 'MATCH (u:Entity {id: {source}, pmID: {pmID} }), (r:Entity {id: {target}, pmID: {pmID} }) CREATE (u)-[c:'+relationType+']->(r) RETURN c'
	// console.log(query)
	var writexResultPromise = session.writeTransaction(function (transaction) {
        // used transaction will be committed automatically, no need for explicit commit/rollback
	   	var result = transaction.run(query, {
	      source: relation.source,
	      target: relation.target,
	      pmID: relation.pmID
	    })
	    return result;
	})

  	return writexResultPromise.then(
  	response => { console.log("in graph controller"); }).catch(_handlePayloadValidation)
    // return writexResultPromise.then(() => session.readTransaction(findRelationships).then(() => session.close()));
}

/*
    Public Functions for search single relations
*/
var searchRelation = function(session, relation){
    relationship = relation.label;
    source = relation.source;
    target = relation.target;
    var query = ''
    if(source == ''){
    query = `MATCH (a:Entity)-[:${relationship}]-(b:Entity {label: {target}})
        RETURN a, b`
    }else if(target == ''){
    query = `MATCH (a:Entity {label: {source}})-[:${relationship}]-(b:Entity)
        RETURN a, b`
    }else{
    query = `MATCH (a:Entity {label: {source}})-[:${relationship}]-(b:Entity {label: {target}})
        RETURN a, b`
    }
    var readTxResultPromise = session.readTransaction(function (transaction) {
    	var result = transaction.run(query, {
    	  source: relation.source,
    	  target: relation.target
    	})
    	return result
    })

    return readTxResultPromise.then(_manyEntities).catch(_handlePayloadValidation)
}

/*
    Public Functions for search multiple relations
*/
var searchMultiRelations = function(session, input){
    var query = `MATCH `;
    var varList = [];
    for (var i = 0; i < input.length; i++) {
        row = input[i];
        queries = row.queries;
        relations = row.relations;
        query += matchQuery(queries, relations, i);
        query += ', '
        console.log(queries);
        for (var j = 0; j < queries.length; j++) {
            varList.push('v'+i+j);     
        }
    }
    console.log(varList);
    query = query.slice(0, -2);
    query += ' RETURN ';
    varList.forEach(function(element) {
        query += element;
        query += ',';
    });
    query = query.slice(0, -1);
    console.log(query, 'query');
    var readTxResultPromise = session.readTransaction(function (transaction) {
    var result = transaction.run(query, {})
        return result;
    })

    return readTxResultPromise.then(_manyEntities).catch(_handlePayloadValidation)
}

/*
  Public Functions for search nodes
*/
var searchNodes = function(session, object){
    entities = object.entities;
    label_array = [];
    type_array = [];
    entities.forEach(function(entity) {
    if (entity.type != 'O') {
        label_array.push(entity.label);
        type_array.push(entity.type);
    }
    })
    label_s = label_array.map(i => `'${i}'`).join(',');
    type_s = type_array.map(i => `'${i}'`).join(',');
    var query = `MATCH (a:Entity)
        WHERE a.label IN [${label_s}] and a.entityType IN [${type_s}]
        RETURN distinct a`
    console.log(query);
    var readTxResultPromise = session.readTransaction(function (transaction) {
        var result = transaction.run(query, {
            label: object.entities,
            entityType: object.query
        })
        return result
    })

    return readTxResultPromise.then(_manyEntities).catch(_handlePayloadValidation)
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
    removeAll: removeAll,
    searchRelation: searchRelation,
    searchNodes: searchNodes,
    searchMultiRelations: searchMultiRelations
}
