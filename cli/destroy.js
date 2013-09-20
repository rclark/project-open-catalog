var couch = require('../couch'),
    
    argv = require('optimist')
      .alias('i', 'metadataId')
      .describe('m', 'the ID of a metadata record to destroy')
      .argv;

couch.destroy(argv.metadataId, response);

function response(err, result) {
  if (err) { console.log(err); return; }
  console.log(result);
}