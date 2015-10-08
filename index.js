#!/usr/bin/env node

var Promise = require('bluebird');
var Progress = require('progress');
var program = require('commander');
var join = require('path').join;
var http = require('http-promise');
var mkdirp = Promise.promisify(require('mkdirp'));
var write = Promise.promisify(require('fs').writeFile);
var fetch = Promise.promisify(require('request'));
var cwd = process.cwd();

program
  .version('1.0.0')
  .usage('[options] app.js')
  .option('-o,--output <dir>', 'specify the directory to save snapshot to');

program
  .command('*')
  .description('snapshot the given <app>')
  .action(function (filename) {
    var app = require(join(process.cwd(), filename));
    snapshot(app);
  });

if (require.main === module) {
  program.parse(process.argv);
} else {
  module.exports = snapshot;
}

function snapshot(app) {
  var date = new Date();
  var outputDir = program.output || 'snapshot-' + date.toISOString();
  var server = http.createServerAsync(app);
  var stack = routes(app);
  var progress = new Progress('[:bar] :status', {
    width: 24,
    total: (stack.length * 2) + 1
  });

  server
    .listen(6044)
    .return(stack)
    .each(function (route) {
      progress.tick(1, { status: 'fetching ' + route.path });

      return mkdirp(folderpath(route, outputDir))
        .then(fetchHtml(route))
        .then(returnResponse)
        .tap(function () {
          progress.tick(1, { status: 'writing ' + filepath(route, outputDir) });
        })
        .then(writeHtml(filepath(route, outputDir)));
    })
    .then(function () {
      progress.tick(1, { status: 'finished' });
      server.close();
    })
    .catch(console.error);
};

function routes(app) {
  return app._router.stack.filter(function (layer) {
    if (layer.route && ~layer.route.path.indexOf(':')) {
      console.log('skipping', layer.route.path);
    } else {
      return layer.route;
    }
  }).map(function (layer) {
    return layer.route;
  });
}

function filepath(route, outputDir) {
  if (route.path.match(/\.[^\.]+$/)) return outputDir + route.path;
  return outputDir + route.path.split('/').concat(['index.']).join('/');
}

function folderpath(route, outputDir) {
  if (route.path.match(/\.[^\.]+$/)) {
    return outputDir + route.path.split('/').slice(0, -1).join('/');
  }
  return outputDir + route.path;
}

function fetchHtml(route) {
  return function () {
    return fetch('http://localhost:6044' + route.path);
  }
}

function returnResponse(res) {
  return res[0];
}

function writeHtml(filepath) {
  return function (response) {
    var contentType = response.headers['content-type'];
    var ext = contentType.split(';')[0].split(/\/|\+/).pop() || 'html';
    return write(filepath + ext, response.body);
  };
}
