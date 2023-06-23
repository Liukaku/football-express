import { JwtParseResult } from '../utils/types';
import jwt_decode from 'jwt-decode';

export default function jwtHandler(req, res) {
  const tokens: string[] = JSON.parse(`${req.headers.authorisation}`);
  const jwtArray = tokens[0].split('.');
  let jwtHeader: JwtParseResult;
  try {
    jwtHeader = jwt_decode(jwtArray[1], { header: true });
  } catch (err) {
    res.status(400).send({ message: 'Invalid JWT' });
  }

  if (jwtHeader.aud !== 'authenticated') {
    res.status(401).send({ message: 'Unauthorised' });
  }
}
