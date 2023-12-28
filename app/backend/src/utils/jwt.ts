import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'notsosecret';

function sign(payload: jwt.JwtPayload): string {
  const token = jwt.sign(payload, secret, { expiresIn: '10d' });
  return token;
}

function verify(token: string): jwt.JwtPayload {
  const payload = jwt.verify(token, secret) as jwt.JwtPayload;
  return payload;
}

export default {
  sign,
  verify,
};
