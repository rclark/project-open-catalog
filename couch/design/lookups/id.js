module.exports = function (metadata) {
  emit(metadata._id, metadata.title);
  emit(metadata.identifier, metadata.title);
};