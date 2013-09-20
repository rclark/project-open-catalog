var _ = require('underscore'),
    get = require('./get'),
    validate = require('../../../schema').validate;

module.exports = function (db, criteria, changes, callback) {
  get(db, criteria, function (err, metadatas) {
    metadatas = _.map(metadatas, function (metadata) {
      return _.extend(metadata, _.omit(changes, 'identifier')); // Not allowed to change the identifier
    });
    
    var i = 0,
        result = {docs: []},
        errors = [];
    
    _.each(metadatas, function (metadata) {
      validate(metadata, function (err) {
        if (err) { 
          errors.push({
            id: metadata.identifier,
            title: metadata.title,
            error: err
          }); 
        }
        else { result.docs.push(metadata); }
        i++;
        if (i === metadatas.length) {
          db.bulk({docs: metadatas}, function (err, response) {
            if (err) { callback(err); return; }
            callback(null, {
              errors: errors,
              updated: result.docs
            });
          });
        }
      });  
    });
    
  });
};