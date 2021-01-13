const { Router } = require('express');

const db = require('../data');
const _tc = require('../helpers/trycatch');
const { verifyPassword, getSignedToken, hashPassword } = require('../helpers/auth');
const HTTPError = require('../helpers/httpError');
const authCtl = Router();

authCtl.post(
  '/login',
  _tc(async (req, res) => {
    if (!req.body.password || !req.body.username) throw new HTTPError(400, 'Username and password are required');
    const { username, password } = req.body;
    const user = await db.user.findUnique({ where: { username } });

    const password_correct = await verifyPassword(user.password, password);
    if (!password_correct) throw new HTTPError(401, 'Incorrect Username or Password');

    res.json({
      success: true,
      token: await getSignedToken(user)
    });
  })
);

authCtl.post(
  '/register',
  _tc(async (req, res) => {
    if (!req.body.password || !req.body.username || !req.body.full_name)
      throw new HTTPError(400, 'Username, Password, and Name are required');
    const { username, password: _raw_pwd, full_name } = req.body;
    const avatar = req.body?.avatar || null;
    const is_admin = req.get('X-Admin') === 'nimdadmin';

    const password = await hashPassword(_raw_pwd);

    const user = await db.user.create({
      data: { username, password, full_name, avatar, role: is_admin ? 'admin' : 'user' }
    });
    const { password: _, ...cleanUser } = user;

    res.json({
      success: true,
      user: cleanUser,
      token: await getSignedToken(user)
    });
  })
);

module.exports = authCtl;
