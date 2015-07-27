# NgWebSvr Description
 [![Travis](https://travis-ci.org/leonkaihao/NgWebSvr.svg?branch=master)](https://travis-ci.org/leonkaihao/NgWebSvr)
## Description
NgWebSvr is a framework of websvr as a seed, integrated with functions below:
 - Frontend: Angular
 - Design: Google Material, with angular support
 - Backend: Nodejs http server, express framework
 - Database: Mongodb
 - Cache & Session: Redis
 - Support basic support include sessions and user access logics
 - Browser: Chrome recommended. Other browser? Better not.

## install
 - install redis, reference to http://redis.io/
 - install mongodb, reference to https://www.mongodb.org/
 - Install server components
```
npm install
```
bower install will be start automaticly for angularjs components after nodejs components are installed.

## configure
See config.json, there's enough comment in it, you should config it for your personal website.
## build a distribution
 - Install gulp component
```
npm install -g gulp
```
 - Use gulp
```
gulp
or
gulp build
```