import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { PasswordStrengthValidator } from '../utils/password-strengh-validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    UsersService,
    UsersRepository,
    PasswordStrengthValidator,
  ],
})
export class LoginModule {}
