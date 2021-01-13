const { Router } = require('express');

const db = require('../data');
const _tc = require('../helpers/trycatch');
const HTTPError = require('../helpers/httpError');
const { ensureUserRole } = require('../middleware/auth');

const userCtl = Router();

userCtl.get(
  '/:id',
  ensureUserRole('user'),
  _tc(async (req, res) => {
    if (!req.params.id) throw new HTTPError(400, 'Param :id is missing');
    const result = await db.user.findUnique({ where: { id: +req.params.id } });
    if (!result) throw new HTTPError(404, 'Not Found');
    const { password: _, ...user } = result;
    res.json(user);
  })
);

userCtl.put(
  '/',
  ensureUserRole('user'),
  _tc(async (req, res) => {
    const full_name = req.body?.full_name;
    const avatar = req.body?.avatar;
    const { id } = req.user;
    const updated = { ...req.user, avatar, full_name };
    const { password: _pass, ...cleanUser } = await db.user.update({
      where: { id },
      data: updated
    });
    req.user = { ...cleanUser, password: _pass };
    res.json({ success: true, user: cleanUser });
  })
);

userCtl.delete(
  '/:id',
  ensureUserRole('admin'),
  _tc(async (req, res) => {
    const { password: _, ...result } = await db.user.delete({ where: { id: +req.params.id } });
    res.json({ success: true, result });
  })
);

module.exports = userCtl;
