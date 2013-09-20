var couch = require('../couch'),
    
    argv = require('optimist')
      .alias('i', 'metadataId')
      .describe('m', 'the ID of a metadata record to get')
      .argv;

couch.get(argv.metadataId, response);

function response(err, result) {
  if (err) { console.log(err); return; }
  console.log(result);
}