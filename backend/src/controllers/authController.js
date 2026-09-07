const prisma = require('../config/prismaClient');
const { hashPassword, comparePassword } = require('../utils/hash');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');

// Users can register with email OR mobile, plus a username and password.
async function register(req, res, next) {
  try {
    const { username, email, mobile, password, dateOfBirth, parentalConsent } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({ error: 'Provide an email or a mobile number' });
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          email ? { email } : undefined,
          mobile ? { mobile } : undefined,
        ].filter(Boolean),
      },
    });
    if (existing) {
      return res.status(409).json({ error: 'Username, email, or mobile already in use' });
    }

    // Minors: require an explicit parental-consent flag rather than collecting
    // extra personal data. Enforce it here instead of trusting the frontend.
    let isMinor = false;
    if (dateOfBirth) {
      const age = Math.floor((Date.now() - new Date(dateOfBirth).getTime()) / (365.25 * 24 * 3600 * 1000));
      isMinor = age < 18;
    }
    if (isMinor && !parentalConsent) {
      return res.status(400).json({ error: 'Parental consent is required for users under 18' });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        email: email || null,
        mobile: mobile || null,
        passwordHash,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        parentalConsent: Boolean(parentalConsent),
      },
      select: { id: true, username: true, email: true, mobile: true, role: true },
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { identifier, password } = req.body; // identifier = username, email, or mobile

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }, { mobile: identifier }],
      },
    });

    // Same generic error whether the user doesn't exist or the password is
    // wrong - avoids leaking which usernames/emails are registered.
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user.id, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // httpOnly cookie so the refresh token is never reachable from JS (mitigates XSS token theft)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });

    const payload = verifyRefreshToken(token);
    const accessToken = signAccessToken({ id: payload.id, role: payload.role });
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
}

function logout(req, res) {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
}

module.exports = { register, login, refresh, logout };
