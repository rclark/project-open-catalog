var _ = require('underscore');

module.exports = function (db, criteria, callback) {
  db.list({include_docs: true}, function (err, response) {
    if (err) { callback(err); return; }
    var metadatas = _.map(response.rows, function (row) {
      return row.doc;
    });
    callback(null, _.filter(metadatas, function(metadata) {
      return metadata._id.indexOf('_design') !== 0 && criteria(metadata);  
    }));
  });
};