- TODO: use haproxy and someway to restart crashed apps
- TODO: use jslint

Introduction
============

This project is a searchable Disk Catalog built with Express.js and Angular 2. The objective is to show how ElasticSearch can be used along with MongoDB to provide full-text search.

Installation
============

First install ElasticSearch. If you are using OSX you can do this using homebrew

```shell
  brew install elasticsearch
```

Next you will need to install MongoDB. In OSX you can do this using the command

```shell
  brew install mongodb
```

The last dependencies you should install are Node.js and npm. You can
follow the steps listed [here](https://coolestguidesontheplanet.com/installing-node-js-on-osx-10-10-yosemite/)
to install them on OSX. 

Please make sure NodeJS version is >= 4.2

Tests
-----

To run tests you should install mocha

```shell
  npm install –g mocha
```

and after that, with ElasticSearch and MongoDB running just execute

```shell
  mocha
```

Execution
============

Development Environment
-----------------------

To run the application on your local machine start the backend

```shell
  node app.js
```

and after this

```shell
  cd frontend
  npm start
```

Performance
===========

Development

- POST `/disks` (to create new disks) 200 reqs / sec
- GET `/` (list of 25 objects): 200 reqs/sec


Author & Credits
=================

This application was written by [Paulo Soares](phsoares.ita@gmail.com).

License
=======
Copyright (c) 2016 Paulo Soares, released under the MIT license
