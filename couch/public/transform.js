var _ = require('underscore');

module.exports = function (db, metadataId, format, callback) {
  callback = callback || function () {};
  db.view('transformations', format, {key: metadataId}, function (err, response) {
    if (err) { callback(err); return; }
    var result = _.map(response.rows, function (row) { 
      return row.value; 
    });
    
    if (result.length > 0) {
      callback(null, _.first(result));
    } else {
      callback(new Error('The metadata record ' + metadataId + ' could not be transformed into ' + format + '.'));
    }
  });
};