import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { validateEmail } from '../utils/validate-email';
import { PasswordStrengthValidator } from '../utils/password-strengh-validator';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordValidator: PasswordStrengthValidator,
  ) {}
  async register(username: string, password: string) {
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!validateEmail(username)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
    if (!this.passwordValidator.validate(password)) {
      throw new HttpException('Weak Password', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.createUser(username, password);
  }
}
