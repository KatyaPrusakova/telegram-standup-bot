const { createHash, createHmac } = require('crypto');
import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_connectToDatabase';

const secret = createHash('sha256')
  .update(process.env.TELEGRAM_API_KEY)
  .digest();

function checkSignature({ hash, ...data }) {
  if (!hash) {
    return false;
  }

  const checkString = Object.keys(data)
    .sort()
    .map((k) => `${k}=${data[k]}`)
    .join('\n');
  const hmac = createHmac('sha256', secret).update(checkString).digest('hex');
  return hmac === hash;
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const isValid = checkSignature(req?.body || {});

  if (!isValid && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ status: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ userId: req.body.id });

  if (!user) {
    return res.status(404).json({ statusText: 'User not found' });
  }

  return res.status(200).json(user.groups.map((g) => g.title));
};
