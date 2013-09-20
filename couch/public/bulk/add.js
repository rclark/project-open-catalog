var _ = require('underscore'),
    validate = require('../../../schema').validate,
    addIdentifiers = require('../../private/addIdentifiers'),
    uuid = require('node-uuid');
    
module.exports = function (db, metadatas, callback) {
  callback = callback || function () {};
  
  // Give IDs to records that don't have one
  metadatas = addIdentifiers(metadatas);
  
  var identifiers = [],
      errors = [],
      final = {docs: []},
      i = 0;
  
  // Drop any records that would duplicate identifiers
  metadatas = _.reject(metadatas, function (metadata) {
    var result = _.contains(identifiers, metadata.identifier) ? true : false;
    if (result) { 
      errors.push({
        id: metadata.identifier, 
        title: metadata.title, 
        error: new Error('Duplicated identifier')
      }); 
    } else {
      identifiers.push(metadata.identifier);
    }
    return result;
  });
  
  // Validate
  _.each(metadatas, function (metadata) {
    validate(metadata, function (err) {
      if (err) { 
        errors.push({
          id: metadata.identifier, 
          title: metadata.title, 
          error: err
        });
      }
      else { final.docs.push(metadata) }
      i++;
      if (i === metadatas.length) {
        db.bulk(final, function (err, response) {
          if (err) { callback(err); return; }
          callback(null, {
            errors: errors,
            added: final.docs
          });
        });
      } 
    });
  });
  
};