module.exports = {
  views: {
    id: {
      map: require('./id').toString()
    },
    keyword: {
      map: require('./keyword').toString(),
      reduce: (function (keys, values) { return values.length; }).toString()
    }
  },
  lists: {
    keys: require('./keys').toString()  
  }
};