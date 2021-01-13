const express = require('express');
const bodyParser = require('body-parser');
const { getUserFromToken } = require('./middleware/auth');

const PORT = parseInt(process.env.PORT || '8000', 10);
const app = express();

app.use(bodyParser.json());

app.use('/healthcheck', require('./controllers/healthcheck'));
app.use('/auth', require('./controllers/auth'));
app.use('/user', getUserFromToken, require('./controllers/user'));

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err?.status ?? 500).json({
    success: false,
    message: err?.message ?? err?.stack ?? String(err),
    __raw: { ...err }
  });
});

app.listen(PORT, () => console.log(`🚀 Backend: http://localhost:${PORT}`));
