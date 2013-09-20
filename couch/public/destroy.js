var get = require('./get');

module.exports = function (db, metadataId, callback) {
  callback = callback || function () {};
  get(db, metadataId, function (err, metadata) {
    if (err) { callback(err); return; }
    db.destroy(metadata._id, metadata._rev, callback);
  });
};