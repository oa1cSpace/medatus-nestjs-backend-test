import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { PasswordStrengthValidator } from '../utils/password-strengh-validator';
import { SessionSerializer } from '../auth/session.serializer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [RegisterController],
  providers: [
    RegisterService,
    UsersService,
    UsersRepository,
    PasswordStrengthValidator,
    SessionSerializer,
  ],
})
export class RegisterModule {}
