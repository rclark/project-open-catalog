var validate = require('../../schema').validate,
    checkId = require('../private/checkId'),
    uuid = require('node-uuid');

module.exports = function (db, metadata, callback) {
  callback = callback || function () {};
  if (!metadata.hasOwnProperty('identifier') || metadata.identifier === '') {
    metadata.identifier = uuid.v4();
  }
  validate(metadata, function (err, validated) {
    if (err) { callback(err); return; }
    checkId(db, metadata, function (err) {
      if (err) { callback(err); return; }
      db.insert(metadata, callback);
    });
  });
}