import 'dotenv/config';

// Middleware to verify that the 'key' parameter exists and matches the secret key.
export default function verify(req, res, next) {
  const key = req.body?.key;
  if (!key || key !== process.env.SECRET_KEY) {
    // Deny access with a 403 Forbidden response if verification fails.
    return res.status(403).json({ message: "Forbidden action" });
  }
  next();
}