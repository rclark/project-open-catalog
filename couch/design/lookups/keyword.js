module.exports = function (metadata) {
  if (metadata.hasOwnProperty('keyword')) {
    var keywords = metadata.keyword.split(',');
    keywords.forEach(function (keyword) {
      emit(keyword, keywords);
    });
  }
};