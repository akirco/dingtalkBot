const prefix = '/api';
module.exports = {
  selectRoute: (path) => {
    return `${prefix}/${path}/query`;
  },
  insertRoute: (path) => {
    return `${prefix}/${path}/insert`;
  },
  updateRoute: (path) => {
    return `${prefix}/${path}/update`;
  },
  delRoute: (path) => {
    return `${prefix}/${path}/del`;
  },
};
