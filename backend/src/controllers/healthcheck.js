const { Router } = require('express');
const db = require('../data');
const _tc = require('../helpers/trycatch');

const healthcheckCtl = Router();

healthcheckCtl.get(
  '/',
  _tc(async (req, res) => {
    const timestamp = Date.now();

    await db.healthcheck.upsert({
      where: { id: 1 },
      create: { timestamp },
      update: { timestamp }
    });

    const finalTime = Date.now();

    res.json({
      success: true,
      time: finalTime,
      dbUpsertDelay: finalTime - timestamp
    });
  })
);

module.exports = healthcheckCtl;
