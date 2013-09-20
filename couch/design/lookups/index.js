module.exports = {
  id: {
    map: require('./id').toString()
  },
  keyword: {
    map: require('./keyword').toString(),
    reduce: (function (keys, values) { return values.length; }).toString()
  }
};