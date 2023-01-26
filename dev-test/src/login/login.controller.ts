import { Body, Controller, Post, Session, UsePipes } from '@nestjs/common';
import { RegisterUserDto } from '../register/dto/register-user.dto';
import { LoginService } from './login.service';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async login(
    @Body() dto: RegisterUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.loginService.login(dto.username, dto.password);
    session.authentidated = true;
    return { session, user };
  }
}
