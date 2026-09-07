const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const csurf = require('csurf');

const applySecurityHeaders = require('./middleware/securityHeaders');
const { generalLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const quizRoutes = require('./routes/quizRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Security headers first (CSP, clickjacking protection, HSTS, etc.)
applySecurityHeaders(app);

// Only allow the known frontend origin to make credentialed requests (CORS)
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(generalLimiter);

// CSRF protection for cookie-based state-changing requests.
// Not applied to /api/auth or the payment callback, since those either
// issue the session or are called by an external gateway.
const csrfProtection = csurf({ cookie: { httpOnly: true, sameSite: 'strict' } });
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
