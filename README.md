
- TODO: remove unnecessary data from this file
- TODO: use haproxy and someway to restart crashed apps
- TODO: usar um lint

Disk catalog
==================

This project is a Disk Catalog. The objective is to show how ElasticSearch can
be used with MongoDB in order to provide full-text search.

The chosen framework for the backend is Node.js and AngularJS 2 for the frontend.

Installation
------------

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
to install them on OSX. Please choose a version >= 4.2

Tests
-----

To run tests you should install mocha

```shell
  npm install –g mocha@1.16.2
```

and after that, with ElasticSearch and MongoDB running just execute

```shell
  mocha
```

Execution
---------

To run the application simply run on your terminal

```shell
  node app.js
```

Performance
------------

Development

- POST `/disks` (to create new disks) 200 reqs / sec
- GET `/` (list of 25 objects): 200 reqs/sec


Author & Credits
----------------
This application was written by [Paulo Soares](phsoares.ita@gmail.com).

License
-------
Copyright (c) 2011 Erwin Matthijssen, released under the MIT license
