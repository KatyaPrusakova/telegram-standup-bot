import { checkSignature } from '@/pages/api/lib/_helpers';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './lib/_connectToDatabase';

async function handleRequest(req: VercelRequest, res: VercelResponse) {
  const isValid = checkSignature(req?.body || {});

  if (!isValid && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ status: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();

  const user = await db.collection('users').findOne({ userId: req.body.id });

  if (!user) {
    return res.status(404).json({ statusText: 'User not found' });
  }

  const groupTitles = user.groups.filter((g) => !!g).map((g) => g.title);

  return res.status(200).json(groupTitles);
}

export default handleRequest;
