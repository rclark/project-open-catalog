var nano = require('nano')('http://localhost:5984'),
    _ = require('underscore'),
    
    dbName = 'project-open-catalog',
    db = nano.use(dbName);

module.exports = {
  
  setup: function (callback) {
    require('./public/setup')(nano, dbName, callback);  
  },
  
  get: function (metadataId, callback) {
    require('./public/get')(db, metadataId, callback);
  },
  
  add: function (metadata, callback) {
    require('./public/add')(db, metadata, callback);
  },
  
  update: function (metadataId, changes, callback) {
    require('./public/update')(db, metadataId, changes, callback);
  },
  
  destroy: function (metadataId, callback) {
    require('./public/destroy')(db, metadataId, callback);
  },
  
  transform: function (metadataId, format, callback) {
    require('./public/transform')(db, metadataId, format, callback);
  },
  
  bulk: {
  
    get: function (criteria, callback) {
      require('./public/bulk/get')(db, criteria, callback);  
    },
    
    add: function (metadatas, callback) {
      require('./public/bulk/add')(db, metadatas, callback);
    },
    
    update: function (criteria, changes, callback) {
      require('./public/bulk/update')(db, criteria, changes, callback);
    },
    
    destroy: function (criteria, callback) {
      require('./public/bulk/destroy')(db, criteria, callback);
    }
    
  }
};