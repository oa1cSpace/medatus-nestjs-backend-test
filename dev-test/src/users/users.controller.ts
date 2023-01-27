import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @UseGuards(AuthenticatedGuard)
  @Post('change-password')
  async changePassword(
    @Body() dto: { session: any; oldPassword: string; newPassword: string },
    @Session() session: Record<string, any>,
  ) {
    await this.usersService.updatePassword(
      dto.session.userId,
      dto.oldPassword,
      dto.newPassword,
    );
    return { session, message: 'password changed successful' };
  }
}
