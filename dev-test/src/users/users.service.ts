import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { encodePassword, comparePassword } from '../utils/bcrypt';
import { PasswordStrengthValidator } from '../utils/password-strengh-validator';

type Usr = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordValidator: PasswordStrengthValidator,
  ) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      username: username.toLowerCase(),
    });
  }

  // async getUsers(): Promise<User[]> {
  //   return this.usersRepository.find({});
  // }

  async createUser(username: string, password: string): Promise<Usr> {
    const hashedPassword = await encodePassword(password);
    const res = await this.usersRepository.create({
      userId: uuidv4(),
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    return { userId: res.userId, username: res.username };
  }

  // async updateUser(userId: string, userUpdates: userUpdateUserDto): Promise<User> {
  //   return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  // }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new HttpException('No such user', HttpStatus.NOT_FOUND);
    }
    const isPasswordMatching = await comparePassword(
      oldPassword,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    if (!this.passwordValidator.validate(newPassword)) {
      throw new HttpException('Weak Password', HttpStatus.BAD_REQUEST);
    }
    user.password = await encodePassword(newPassword);
    await this.usersRepository.findOneAndUpdate({ userId }, user);
    const updated = await this.getUserById(userId);
    return { userId: updated.userId, username: updated.username };
  }
}
