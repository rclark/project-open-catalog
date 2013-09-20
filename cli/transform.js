var couch = require('../couch'),
    
    argv = require('optimist')
      .alias('i', 'metadataId')
      .demand('i')
      .describe('m', 'the ID of a metadata record to transform')
      .alias('f', 'format')
      .default('f', 'geojson')
      .describe('f', 'the format to transform the metadata into')
      .argv;

couch.transform(argv.metadataId, argv.format, response);

function response(err, result) {
  if (err) { console.log(err); return; }
  console.log(result);
}