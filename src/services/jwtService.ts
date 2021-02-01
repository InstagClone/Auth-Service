import jwt from 'jsonwebtoken';
import config from '../config';

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

const getIdTokenPayload = (userId: string): IJWTToken => {
  const response = {
    iss: 'https://instagclone-auth.herokuapp.com/',
    sub: userId,
    username: userId,
    email: 'random@test.com',
    aud: 'instagClone',
    token_name: 'id_token',
  };
  return response;
}

export async function getAccessToken(username: string, password: string, grantType: string): Promise<string> {
  const jwtPayload: IJWTToken = getAccessTokenPayload('uuid');
  const accessToken: string = await jwt.sign(jwtPayload, config.jwtKey!, { expiresIn: EXPIRES_IN });
  return accessToken;
}

export async function getIdToken(username: string, password: string, grantType: string): Promise<string> {
  const jwtPayload: IJWTToken = getIdTokenPayload('uuid');
  const idToken: string = await jwt.sign(jwtPayload, config.jwtKey!, { expiresIn: EXPIRES_IN });
  return idToken;
}

export async function getToken(username: string, password: string, grantType: string): Promise<ITokenResponse> {
  const accessToken = await getAccessToken(username, password, grantType);
  const idToken = await getIdToken(username, password, grantType);
  return {
    access_token: accessToken,
    id_token: idToken,
    scope: 'openid',
    expires_in: EXPIRES_IN
  };
} 
