import * as db from '../db';
import bcrypt from 'bcrypt';

export type User = {
  userId: string;
  username: string;
  password: string;
  salt: string;
  obselete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FIND_USER = `
  select * from "User" where username = $1
`;

export async function verifiedMember(username: string, plainedPassword: string): Promise<User> {
  const user: User = await findUser(username);
  const password: string = await bcrypt.hash(plainedPassword, user.salt);
  const isVerified = password === user.password;
  if (!isVerified) {
    throw new Error('Wrong Credentials');
  }
  return user;
}

export async function findUser(username: string): Promise<User> {
  const users: Array<User> = (await db.query(FIND_USER, [username])).rows;
  if (users.length === 0) {
    throw new Error('User cannot be found');
  }
  return users[0];
}
