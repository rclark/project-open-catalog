var _ = require('underscore'),
    get = require('./get');

module.exports = function (db, criteria, callback) {
  get(db, criteria, function (err, metadatas) {
    metadatas = _.map(metadatas, function (metadata) {
      return _.extend(metadata, {_deleted: true});
    });
    db.bulk({docs: metadatas}, callback);
  });
};