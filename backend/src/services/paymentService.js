// Abstracted payment service. The rest of the app never talks to a specific
// gateway directly - this keeps Stripe/PayPal/ZarinPal/IDPay interchangeable.
// International gateways (Stripe, PayPal) are not usable from Iran, so the
// default provider here is ZarinPal; swap PAYMENT_PROVIDER in .env if needed.

const zarinpal = require('./zarinpalProvider');

const providers = {
  zarinpal,
  // idpay: require('./idpayProvider'),
  // nextpay: require('./nextpayProvider'),
};

function getProvider() {
  const name = process.env.PAYMENT_PROVIDER || 'zarinpal';
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Unknown payment provider: ${name}`);
  }
  return provider;
}

// amount: integer, smallest currency unit (e.g. Rials)
async function createPaymentRequest({ amount, description, userId }) {
  return getProvider().requestPayment({ amount, description, userId });
}

async function verifyPayment({ authority, amount }) {
  return getProvider().verifyPayment({ authority, amount });
}

module.exports = { createPaymentRequest, verifyPayment };
