// @desc:    Compares two arrays containing the queried routes by their IDs
// @params:  prevRoutes, currentRoutes: Array - containing the queried routes
// @return:  boolean

const compareRoutes = (prevRoutes, newRoutes) => {
  if (prevRoutes.length !== newRoutes.length) {
    return false;
  }
  for (let prevRoute of prevRoutes) {
    if (!newRoutes.some(newRoute => prevRoute._id === newRoute._id)) {
      return false;
    }
  }
  return true;
};

export default compareRoutes;
