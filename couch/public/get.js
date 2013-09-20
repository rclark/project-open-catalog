module.exports = function (db, metadataId, callback) {
  callback = callback || function () {};
  db.view('lookups', 'id', {key: metadataId, include_docs: true}, function (err, response) {
    if (err) { callback(err); return; }
    if (response.rows.length === 0) { callback(new Error('No records matched the ID you asked for')); return; }
    callback(null, response.rows[0].doc);
  });
};