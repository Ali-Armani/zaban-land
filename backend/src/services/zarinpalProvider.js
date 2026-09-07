// Minimal ZarinPal REST integration stub.
// Docs: https://docs.zarinpal.com/
// Replace the fetch calls below with the real endpoint/response handling
// once you have a live merchant ID. Keep ZARINPAL_MERCHANT_ID in .env only.

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;
const CALLBACK_URL = process.env.ZARINPAL_CALLBACK_URL;

const REQUEST_URL = 'https://api.zarinpal.com/pg/v4/payment/request.json';
const VERIFY_URL = 'https://api.zarinpal.com/pg/v4/payment/verify.json';
const STARTPAY_URL = 'https://www.zarinpal.com/pg/StartPay/';

async function requestPayment({ amount, description, userId }) {
  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merchant_id: MERCHANT_ID,
      amount,
      description,
      callback_url: CALLBACK_URL,
      metadata: { userId },
    }),
  });

  const data = await response.json();
  if (data?.data?.authority) {
    return {
      authority: data.data.authority,
      redirectUrl: `${STARTPAY_URL}${data.data.authority}`,
    };
  }
  throw new Error('Failed to create ZarinPal payment request');
}

async function verifyPayment({ authority, amount }) {
  const response = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ merchant_id: MERCHANT_ID, amount, authority }),
  });

  const data = await response.json();
  const success = data?.data?.code === 100 || data?.data?.code === 101;
  return { success, refId: data?.data?.ref_id || null, raw: data };
}

module.exports = { requestPayment, verifyPayment };
