import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/bcrypt';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}
  async login(username: string, password: string) {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isPasswordMatching = await comparePassword(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
    // check if the user's password has not been changed in the last 180 days
    const lastPasswordChange = new Date(user.lastPasswordChange);
    const today = new Date();
    const passwordAge = today.getTime() - lastPasswordChange.getTime();
    const passwordAgeInDays = passwordAge / (1000 * 3600 * 24);
    if (passwordAgeInDays > 180) {
      throw new HttpException(
        'Your password has expired, please change your password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
