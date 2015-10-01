# express-snapshot [![Build Status](https://img.shields.io/travis/alexmingoia/express-snapshot.svg?style=flat)](http://travis-ci.org/alexmingoia/express-snapshot)  [![NPM version](https://img.shields.io/npm/v/express-snapshot.svg?style=flat)](http://badge.fury.io/js/express-snapshot)

> Generate static HTML from Express app. Express app in, static `.html` out.

## Installation

```sh
npm install --global express-snapshot
```

## Usage

```javascript
  Usage: express-snapshot [options] app.js


  Commands:

    *   snapshot the given <app>

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -o,--output <dir>  specify the directory to save snapshot to
```

The above will walk your app routes, requesting each one, and saving the HTML
to a directory structure that mirrors your routes.

![demo](http://i.imgur.com/RzSPHhS.gifv)
