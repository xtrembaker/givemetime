#!/usr/bin/env bash

cd "$(dirname "$0")"
source ./_env.sh
NODE_PATH=../node_modules ../node_modules/.bin/nodemon --watch ../server --watch ../server/auth ../server/server.js