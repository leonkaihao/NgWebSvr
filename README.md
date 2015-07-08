# NgWebSvr Description
## Description
NgWebSvr is a framework of websvr as a seed, integrated with functions below:
-- Frontend: Angular
-- Design: Google Material, with angular support
-- Backend: Nodejs http server, express framework
-- Database: Mongodb
-- Cache & Session: Redis
-- Support basic support include sessions and user access logics
-- Browser: Chrome recommended. Other browser? Better not.
## install
-- install redis, reference to http://redis.io/
-- install mongodb, reference to https://www.mongodb.org/
-- Install server components
> npm install
> bower install

you may find tip below, select 1, because angular-animate has some known-issue with angular-material, now we should use the matched version.
```
Unable to find a suitable version for angular, please choose one:
    1) angular#1.3.17 which resolved to 1.3.17 and is required by angular-animate#1.3.17, angular-route#1.3.17
    2) angular#~1.3.10 which resolved to 1.3.17 and is required by websvr
    3) angular#~1.3 which resolved to 1.3.17 and is required by angular-busy#4.1.3
    4) angular#1.4.2 which resolved to 1.4.2 and is required by angular-animate#1.4.2, angular-aria#1.4.2, angular-messages#1.4.2, angular-resource#1.4.2, angular-touch#1.4.2
    5) angular#^1.3.0 || >1.4.0-beta.0 which resolved to 1.4.2 and is required by angular-material#0.10.0
Prefix the choice with ! to persist it to bower.json

? Answer: 1
```
## configure
see config.json, there's enough comment in it, you should config it for your personal website.
## build a distribution
-- Install gulp component
> npm install -g gulp
-- Use gulp
```
> gulp
> or
> gulp build
```