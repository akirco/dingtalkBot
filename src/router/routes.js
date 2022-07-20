const prefix = '/api';
module.exports = {
  sel: (path) => {
    return `${prefix}/${path}/query`;
  },
  ins: (path) => {
    return `${prefix}/${path}/insert`;
  },
  upd: (path) => {
    return `${prefix}/${path}/update`;
  },
  del: (path) => {
    return `${prefix}/${path}/delete`;
  },
};
