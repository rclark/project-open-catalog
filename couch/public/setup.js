var _ = require('underscore'),
    
    designDocs = [
      {
        _id: '_design/transformations',
        language: 'javascript',
        views: require('../design/transformations')
      },
      {
        _id: '_design/lookups',
        language: 'javascript',
        views: require('../design/lookups').views,
        lists: require('../design/lookups').lists
      }
    ];

module.exports = function (connection, dbName, callback) {
  callback = callback || function () {};
  
  connection.db.list(function (err, databases) {
    if (!_.contains(databases, dbName)) {
      connection.db.create(dbName, addDesignDocs);  
    } else {
      addDesignDocs(null, null);
    }
  });
    
  function addDesignDocs(err) {
    if (err) { callback(err); return; }
    
    var db = connection.db.use(dbName),
        i = 0;
    
    _.each(designDocs, function (designDoc) {
      var errors = [];
      
      db.get(designDoc._id, mergeDoc);
      
      function mergeDoc(err, response) {
        if (err && err.status_code !== 404) { counter(err); return; }
        response = response || {};
        _.extend(response, designDoc);
        db.insert(response, designDoc._id, counter);
      }
      
      function counter(err) {
        if (err) { errors.push(err); }
        i++;
        if (i === designDocs.length) {
          errors = errors.length === 0 ? null : errors;
          callback(errors);
        }
      }
    });
  }
};