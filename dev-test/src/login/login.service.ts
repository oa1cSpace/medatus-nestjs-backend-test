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
      throw new HttpException('No such user', HttpStatus.NOT_FOUND);
    }
    const isPasswordMatching = await comparePassword(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
    return { userId: user.userId, username: user.username };
  }
}
