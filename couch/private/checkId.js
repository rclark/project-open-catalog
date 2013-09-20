module.exports = function (db, metadata, callback) {
  callback = callback || function () {};
  
  db.view('lookups', 'id', {key: metadata.identifier}, function (err, response) {
    var result = response.rows.length > 0 ? new Error('The identifier ' + metadata.identifier + ' is already being used.') : null;
    callback(result, null);
  });
};