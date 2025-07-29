import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    message: 'API is working',
    env: {
      EMAIL_USER: process.env.EMAIL_USER ? '설정됨' : '설정되지 않음',
      EMAIL_PASS: process.env.EMAIL_PASS ? '설정됨' : '설정되지 않음',
      NODE_ENV: process.env.NODE_ENV,
    }
  });
}