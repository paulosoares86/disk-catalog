Introduction
============

This project is a searchable Disk Catalog built with Express.js and Angular 2. The objective is to show how ElasticSearch can be used along with MongoDB to provide full-text search.

Installation
============

First install ElasticSearch. If you are using OS X you can do this using homebrew

```shell
  $ brew install elasticsearch
```

or follow this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-14-04) if you are using Ubuntu 14.04.

Next you will need to install MongoDB. In OS X you can do this using the command

```shell
  $ brew install mongodb
```

or follow this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04) if you are using Ubuntu 14.04.


The next dependencies you should install are Node.js and npm. You can
follow the steps listed [here](https://coolestguidesontheplanet.com/installing-node-js-on-osx-10-10-yosemite/)
to install them on OS X. If you are on Ubuntu 14.04 you can do this using your terminal:

```
  $ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
  $ sudo apt-get install -y nodejs
```

Either way, please make sure NodeJS version is >= 4.2.

Tests
-----

To run tests you should install mocha

```shell
  $ npm install –g mocha
```

and after that, with ElasticSearch and MongoDB running just execute

```shell
  $ mocha
```

Development
===========

To run the application on your local machine install de dependencies

```shell
  $ npm install
```

start the backend

```shell
  $ node app.js
```

and then start the frontend

```shell
  $ cd frontend
  $ npm start
```

Performance
===========

Development
-----------

- POST `/disks` (to create new disks) 200 reqs / sec
- GET `/` (list of 25 objects): 200 reqs/sec

Production
----------

The stack used was:

1. one instance of Nginx were used to serve static files from frontend app (Angular2)
2. a HAProxy as a load balancer with 20 instances of the backend application (Express.js)
3. one instance of MongoDB to persist data
4. one instance of ElasticSearch to be the database of the search API

- POST `/disks` (to create new disks) 200 reqs / sec
- GET `/disks` (list of 25 objects): 200 reqs/sec

Author & Credits
=================

This application was written by [Paulo Soares](phsoares.ita@gmail.com).

License
=======
Copyright (c) 2016 Paulo Soares, released under the MIT license
