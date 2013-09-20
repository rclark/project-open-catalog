var validate = require('../../schema').validate,
    checkId = require('../private/checkId'),
    addIdentifiers = require('../private/addIdentifiers'),
    uuid = require('node-uuid');

module.exports = function (db, metadata, callback) {
  callback = callback || function () {};
  
  metadata = addIdentifiers(metadata);
  
  validate(metadata, function (err, validated) {
    if (err) { callback(err); return; }
    checkId(db, metadata, function (err) {
      if (err) { callback(err); return; }
      db.insert(metadata, callback);
    });
  });
};