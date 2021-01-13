const db = require('../data');
const { verifyToken } = require('../helpers/auth');
const HTTPError = require('../helpers/httpError');
const _tc = require('../helpers/trycatch');

const ROLE_MAP = {
  user: 1,
  admin: 99
};

const getUserFromToken = _tc(async (req, res, next) => {
  const token = req.query?.token || req.get('Authorization') || req.get('X-Auth-Token');
  if (!token) return next();
  const id = await verifyToken(token);
  if (!id) throw new HTTPError(401, 'Unauthorized');
  req.user = await db.user.findUnique({ where: { id } });
  next();
});

const ensureUserRole = role =>
  _tc((req, res, next) => {
    if (!req.user) throw new HTTPError(401, 'Unauthorized');

    const [expected, actual] = [role, req.user.role].map(k => ROLE_MAP?.[k] ?? -100);

    if (actual < expected) {
      throw new HTTPError(403, 'Forbidden');
    }
    next();
  });

module.exports = {
  getUserFromToken,
  ensureUserRole
};
