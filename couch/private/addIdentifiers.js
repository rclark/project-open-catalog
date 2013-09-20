var uuid = require('node-uuid'),
    _ = require('underscore');

module.exports = function (metadatas) {
  if (_.isObject(metadatas)) { metadatas = [ metadatas ]; }
  metadatas = _.map(metadatas, function (metadata) {
    if (!metadata.hasOwnProperty('identifier') || metadata.identifier === '') {
      metadata.identifier = uuid.v4();
    }
    return metadata;
  });
  
  return metadatas.length === 1 ? metadatas[0] : metadatas;
};