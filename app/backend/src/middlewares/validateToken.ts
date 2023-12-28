import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  let tokenBearer = req.headers.authorization;

  if (!tokenBearer) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const extractToken = tokenBearer.split(' ') || [];
  if (extractToken.length > 1) {
    [, tokenBearer] = extractToken;
  }

  try {
    const secret = process.env.JWT_SECRET || 'jwt-secret';
    const parsed = jwt.verify(tokenBearer, secret) as { id: number; email: string; role: string };
    req.body.user = parsed;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
