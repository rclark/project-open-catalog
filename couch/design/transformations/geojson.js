module.exports = function (metadata) {
  if (metadata.hasOwnProperty('spatial')) {
    var coords = metadata.spatial.split(','),
        isBbox = coords.length === 4,
        isPoint = coords.length === 2,
        isGml = false,
        geom = null;
    
    if (isBbox) {
      geom = {
        type: "Polygon",
        coordinates: [ [
          [ Number(coords[0]), Number(coords[1]) ],
          [ Number(coords[0]), Number(coords[3]) ],
          [ Number(coords[2]), Number(coords[3]) ],
          [ Number(coords[2]), Number(coords[1]) ],
          [ Number(coords[0]), Number(coords[1]) ]
        ] ]
      };
    }
    
    if (isPoint) {
      geom = {
        type: "Point",
        coordinates: [ Number(coords[0]), Number(coords[1]) ]
      };
    }
    
    if (geom) {
      emit(metadata.identifier, {
        type: "Feature",
        properties: metadata,
        geometry: geom
      });
    }
  }
};