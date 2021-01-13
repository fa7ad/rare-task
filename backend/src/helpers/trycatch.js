/**
 * @param {import("express").RequestHandler} amw
 * @return {import("express").RequestHandler} 
 */
const _tc = amw => async (req, res, next) => {
  try {
    await amw(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = _tc;
