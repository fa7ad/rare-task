const { Router } = require('express');
const { pickAll, omit } = require('ramda');

const db = require('../data');
const _tc = require('../helpers/trycatch');
const { verifyPassword, getSignedToken, hashPassword } = require('../helpers/auth');
const HTTPError = require('../helpers/httpError');
const { allNonNil } = require('../helpers/utils');

const authCtl = Router();

const LOGIN_REQUIRED = ['password', 'username'];
const REGISTER_REQUIRED = ['password', 'username', 'full_name'];

authCtl.post(
  '/login',
  _tc(async (req, res) => {
    const loginData = pickAll(LOGIN_REQUIRED, { ...req.body });
    if (!allNonNil(loginData)) throw new HTTPError(400, 'Username and password are required');
    const { username, password } = loginData;
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
    const registerData = pickAll(REGISTER_REQUIRED, { ...req.body });
    if (!allNonNil(registerData)) throw new HTTPError(400, 'Username, Password, and Name are required');

    const userData = pickAll(['avatar', 'role', ...REGISTER_REQUIRED], {
      ...registerData,
      ...req.body,
      role: req.get('X-Admin') === 'nimdadmin' ? 'admin' : 'user',
      password: await hashPassword(registerData.password)
    });

    const user = await db.user.create({ data: userData });

    res.json({
      success: true,
      user: omit(['password'], user),
      token: await getSignedToken(user)
    });
  })
);

module.exports = authCtl;
