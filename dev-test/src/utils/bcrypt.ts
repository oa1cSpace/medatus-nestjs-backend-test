import * as bcrypt from 'bcrypt';

const SALT = 10;

export async function encodePassword(rawPwd: string): Promise<string> {
  return bcrypt.hash(rawPwd, SALT);
}

export async function comparePassword(rawPwd: string, pwdHash: string) {
  return bcrypt.compare(rawPwd, pwdHash);
}
