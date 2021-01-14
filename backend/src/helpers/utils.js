const { values, isNil, any, complement, compose } = require('ramda');

const allNonNil = compose(complement, any(isNil), values);

module.exports = {
  allNonNil
};
