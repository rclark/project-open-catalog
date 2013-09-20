var fs = require('fs'),
    _ = require('underscore'),
    
    couch = require('../couch'),
    
    argv = require('optimist')
      .alias('m', 'metadata')
      .describe('m', 'a path to a JSON metadata file')
      .argv;

if (fs.existsSync(argv.metadata)) {
    fs.readFile(argv.metadata, function (err, content) {
      couch.add(JSON.parse(content), response);
    });
} else {
  couch.add(JSON.parse(argv.metadata), response);
}

function response(err, result) {
  if (err) { console.log(err); return; }
  console.log(result);
}