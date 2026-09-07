const prisma = require('../config/prismaClient');
const paymentService = require('../services/paymentService');

const PRO_PRICE_RIALS = 2000000; // example price - adjust as needed
const PRO_DURATION_DAYS = 30;

// Starts a payment flow for the Pro subscription and returns a redirect URL.
async function startProCheckout(req, res, next) {
  try {
    const userId = req.user.id;a

    const payment = await prisma.payment.create({
      data: { userId, provider: process.env.PAYMENT_PROVIDER || 'zarinpal', amount: PRO_PRICE_RIALS },
    });

    const { authority, redirectUrl } = await paymentService.createPaymentRequest({
      amount: PRO_PRICE_RIALS,
      description: 'Zaban Land Pro subscription (30 days)',
      userId,
    });

    await prisma.payment.update({
      where: { id: payment.id },
      data: { providerRefId: authority },
    });

    res.json({ redirectUrl });
  } catch (err) {
    next(err);
  }
}

// Gateway calls this (callback URL) after the user completes/cancels payment.
async function verifyProPayment(req, res, next) {
  try {
    const { Authority: authority } = req.query;

    const payment = await prisma.payment.findFirst({
      where: { providerRefId: authority },
    });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    const { success, refId } = await paymentService.verifyPayment({
      authority,
      amount: payment.amount,
    });

    if (!success) {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED' } });
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'SUCCESS', providerRefId: String(refId) },
    });

    const proExpiresAt = new Date();
    proExpiresAt.setDate(proExpiresAt.getDate() + PRO_DURATION_DAYS);

    await prisma.user.update({
      where: { id: payment.userId },
      data: { role: 'PRO', proExpiresAt },
    });

    res.json({ message: 'Subscription activated', proExpiresAt });
  } catch (err) {
    next(err);
  }
}

module.exports = { startProCheckout, verifyProPayment };
