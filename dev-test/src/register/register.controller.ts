import { Body, Controller, Post, Session, UsePipes } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async register(@Body() dto: RegisterUserDto) {
    await this.registerService.register(dto.username, dto.password);
    return { message: 'registration completed successfully' };
  }
}
