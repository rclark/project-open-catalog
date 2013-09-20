var schema = require('./openDataSchema'),
    validator = require('amanda')('json');

module.exports = function (metadata, additionals, overrides, callback) {
  validator.validate(metadata, schema(additionals, overrides), { singleError: false }, callback);
};