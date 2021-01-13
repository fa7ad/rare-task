const { Router } = require("express");
const db = require("../data");

const healthcheckCtl = Router();

healthcheckCtl.get("/", async (req, res) => {
  try {
    const timestamp = +Date.now();

    await db.healthcheck.upsert({
      where: { id: 1 },
      create: { timestamp },
      update: { timestamp },
    });

    const finalTime = Date.now();

    res.json({
      success: true,
      time: finalTime,
      dbUpsertDelay: finalTime - timestamp,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error,
    });
  }
});

module.exports = healthcheckCtl;
