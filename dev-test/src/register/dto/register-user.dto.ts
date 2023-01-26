import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly username: string;

  @IsString({ message: 'Password should be a string' })
  @Length(8, 64, { message: 'Password length 8 - 64 characters' })
  readonly password: string;
}
