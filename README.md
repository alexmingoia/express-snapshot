# express-snapshot [![Build Status](https://img.shields.io/travis/alexmingoia/express-snapshot.svg?style=flat)](http://travis-ci.org/alexmingoia/express-snapshot)  [![NPM version](https://img.shields.io/npm/v/express-snapshot.svg?style=flat)](http://badge.fury.io/js/express-snapshot)

> Generate static HTML from Express. Express app in, static `.html` out.

## Installation

```sh
npm install --global express-snapshot
```

## Usage

```javascript
express-snapshot app.js
```

The above will walk routes registered by the app exported in `app.js`,
requesting each one, and saving the HTML to a directory structure that mirrors
your routes. See `express-snapshot --help` for more information.

![demo](http://i.imgur.com/RzSPHhS.gif)
