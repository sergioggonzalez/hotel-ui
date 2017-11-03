#!/usr/bin/env bash

rm -rf node_modules/

npm install && bower install

grunt dev
