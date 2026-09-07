const helmet = require('helmet');

// Central place for all security-related HTTP headers.
// - Content-Security-Policy: restricts where scripts/styles/frames can load from
// - frameguard (X-Frame-Options: DENY): prevents clickjacking (site can't be iframed elsewhere)
// - HSTS: forces HTTPS once a browser has seen it over HTTPS
// - noSniff (X-Content-Type-Options: nosniff): stops MIME-type sniffing attacks
function applySecurityHeaders(app) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'https://pagead2.googlesyndication.com'],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          frameAncestors: ["'none'"], // clickjacking protection
          connectSrc: ["'self'"],
        },
      },
      frameguard: { action: 'deny' },
      hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
      noSniff: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    })
  );
}

module.exports = applySecurityHeaders;
