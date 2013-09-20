module.exports = {
  validate: function (metadata, callback) {
    // Validate against default [Project Open Data Schema](http://project-open-data.github.io/schema/)
    require('./validate')(metadata, [], {}, callback);
  },
  
  customize: function (additionals, overrides) {
    // Customize the [Project Open Data Schema](http://project-open-data.github.io/schema/)
    // `additionals` should be an array of extra keys defined by the [Project Open Data Schema](http://project-open-data.github.io/schema/) that you would like to be required in your customized schema.
    // `overrides` should be an object defining [JSON-Schema properties](http://json-schema.org/latest/json-schema-core.html) which will add or overwrite schema properties. Use this to add new properties, or to add specificity to existing properties (for example, `distribution`).
    var schema = require('./openDataSchema')(additionals, overrides);
    
    return {
      schema: schema,
      
      validate: function (metadata, callback) {
        require('./validate')(metadata, additionals, overrides, callback);
      }
    };
  }
};