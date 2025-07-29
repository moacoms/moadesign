export default function handler(req, res) {
  res.status(200).json({
    message: 'Hello from Vercel!',
    method: req.method,
    env: {
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set',
    }
  });
}