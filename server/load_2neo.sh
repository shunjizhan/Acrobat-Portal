#!/bin/bash

echo "Loading data from mongodb to neo4j";

node importDataFromMg2Neo.js putGraphNode

echo "complete putGraphNode";

echo "Wait 5 seconds...";

sleep 5

echo "Wait completed";

node importDataFromMg2Neo.js putNodeRelationship

echo "complete putNodeRelationship";