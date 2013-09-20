var _ = require('underscore'),
    validate = require('../../schema').validate,
    get = require('./get');

module.exports = function (db, metadataId, changes, callback) {
  callback = callback || function () {};
  get(db, metadataId, function (err, metadata) {
    if (err) { callback(err); return; }
    _.extend(metadata, _.omit(changes, 'identifier')); // Not allowed to change the metadata identifier
    validate(metadata, function (err) {
      if (err) { callback(err); return; }
      db.insert(metadata, metadata._id, callback);
    });
  });
};