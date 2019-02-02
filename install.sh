#!/bin/bash
echo "installing node modules for server..."
cd server/
npm install

echo "installing node modules for frontend..."
cd ../view/
npm install

echo "installing general node modules ..."
cd ..
npm install