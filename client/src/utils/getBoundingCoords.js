// @desc:    Gets the bounding coordinates [lng, lat] of a created map in [sw, ne] order
// @params:  coords: Array - containing all the coordinates of the created route
// @return:  A LngLatBounds object in [sw, ne] order (to be compatible with map.fitBounds())
const getBoundingCoords = coords => {
  if (coords.length <= 1) {
    throw new Error('Zero or one points were given, cannot compute bound');
  }

  let sw = [90, 180];
  let ne = [-90, -180];

  for (let coord of coords) {
    // Set west coord
    if (coord[0] < sw[0]) {
      sw[0] = coord[0];
    }
    // Set south coord
    if (coord[1] < sw[1]) {
      sw[1] = coord[1];
    }
    // Set east coord
    if (coord[0] > ne[0]) {
      ne[0] = coord[0];
    }
    // Set north coord
    if (coord[1] > ne[1]) {
      ne[1] = coord[1];
    }
  }

  return [sw, ne];
};

export default getBoundingCoords;
