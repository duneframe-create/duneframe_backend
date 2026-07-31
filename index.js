require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const projectsRouter = require('./routes/projects');
const teamRouter = require('./routes/team');
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const servicesRouter = require('./routes/services');
const principlesRouter = require('./routes/principles');
const awardsRouter = require('./routes/awards');
const partnersRouter = require('./routes/partners');
const testimonialsRouter = require('./routes/testimonials');
const postsRouter = require('./routes/posts');
const settingsRouter = require('./routes/settings');
const seedDefaultsIfEmpty = require('./seedDefaults');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studio-site';

app.use(
  cors({
    // Reflect request Origin so Firebase + local Vite both work after deploy
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'dune-frame-server' });
});

app.use('/api/projects', projectsRouter);
app.use('/api/team', teamRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/services', servicesRouter);
app.use('/api/principles', principlesRouter);
app.use('/api/awards', awardsRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/settings', settingsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');

    await seedDefaultsIfEmpty();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
