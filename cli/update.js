var fs = require('fs'),
    _ = require('underscore'),
    
    couch = require('../couch'),
    
    argv = require('optimist')
      .alias('i', 'metadataId')
      .describe('i', 'the ID of a metadata record to update')
      .demand('i')
      .alias('c', 'changes')
      .demand('c')
      .describe('c', 'the changes to make to the metadata record')
      .argv;

if (fs.existsSync(argv.changes)) {
    fs.readFile(argv.changes, function (err, content) {
      couch.update(argv.metadataId, JSON.parse(content), response);
    });
} else {
  couch.update(argv.metadataId, JSON.parse(argv.changes), response);
}

function response(err, result) {
  if (err) { console.log(err); return; }
  console.log(result);
}