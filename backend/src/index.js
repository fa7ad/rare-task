const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { getUserFromToken } = require('./middleware/auth');

const PORT = parseInt(process.env.PORT || '8000', 10);
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '256mb' }));

app.use('/healthcheck', require('./controllers/healthcheck'));
app.use('/auth', require('./controllers/auth'));
app.use('/user', getUserFromToken, require('./controllers/user'));
app.use('/listing', getUserFromToken, require('./controllers/listing'));

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
