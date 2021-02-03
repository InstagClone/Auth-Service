import jwt from 'jsonwebtoken';
import config from '../config';
import { verifiedMember, findUser } from './authentication';
import type { User } from './authentication';

export interface IJWTToken {
  iss?: string;
  sub?: string;
  scopes?: Array<string>;
  token_type?: string;
  grant_type?: string;
}

export interface ITokenResponse {
  id_token: string;
  access_token: string;
  scope: string;
  refresh_token?: string;
  expires_in: number;
}

const EXPIRES_IN = 60 * 60 * 1; // EXPIRES IN 1 HOUR

const getAccessTokenPayload = (userId: string): IJWTToken => {
  const response = {
    iss: 'https://instagclone-auth.herokuapp.com/',
    sub: userId,
    aud: 'instagClone',
    scopes: ['openid', 'profile'],
    token_name: 'access_token',
    token_type: 'Bearer',
    grant_type: 'password'
  };
  return response;
}

const getIdTokenPayload = (userId: string, username: string): IJWTToken => {
  const response = {
    iss: 'https://instagclone-auth.herokuapp.com/',
    sub: userId,
    username: username,
    email: 'random@test.com',
    aud: 'instagClone',
    token_name: 'id_token',
  };
  return response;
}

export async function getAccessToken(userId: string): Promise<string> {
  const jwtPayload: IJWTToken = getAccessTokenPayload(userId);
  const accessToken: string = await jwt.sign(jwtPayload, config.jwtKey!, { expiresIn: EXPIRES_IN });
  return accessToken;
}

export async function getIdToken(userId: string, username: string): Promise<string> {
  const jwtPayload: IJWTToken = getIdTokenPayload(userId, username);
  const idToken: string = await jwt.sign(jwtPayload, config.jwtKey!, { expiresIn: EXPIRES_IN });
  return idToken;
}

export async function getToken(username: string, password: string): Promise<ITokenResponse> {
  const isVerifiedMember: User = await verifiedMember(username, password);
  const accessToken = await getAccessToken(isVerifiedMember.userId);
  const idToken = await getIdToken(isVerifiedMember.userId, isVerifiedMember.username);
  return {
    access_token: accessToken,
    id_token: idToken,
    scope: 'openid profile',
    expires_in: EXPIRES_IN
  };
} 
