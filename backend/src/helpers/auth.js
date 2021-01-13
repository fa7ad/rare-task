const crypto = require('crypto');
const argon2 = require('argon2');
const HASH_SECRET = process.env.HASH_SECRET || 'a really secure secret';
/**
 * Hash a password
 * @param {string} password
 */
const hashPassword = async password => argon2.hash(password);

/**
 * Verify a password against a hash
 * @param {string} hashed hashed-password
 * @param {string} password plaintext password
 */
const verifyPassword = async (hashed, password) => argon2.verify(hashed, password);

/**
 * @param {import('@prisma/client').User} user
 */
const getSignedToken = async user => {
  const hash = crypto
    .createHash('sha256', HASH_SECRET)
    .update('' + user.id)
    .digest('hex');
  return [hash, user.id].join('.');
};

const verifyToken = async token => {
  const [tok, id] = token.split('.');
  const hash = crypto
    .createHash('sha256', HASH_SECRET)
    .update('' + id)
    .digest('hex');
  return hash === tok ? Number(id) : void 0;
};

module.exports = {
  hashPassword,
  verifyPassword,
  getSignedToken,
  verifyToken
};
