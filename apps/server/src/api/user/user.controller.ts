import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserPayload } from '@app/common/decorators';
import { UserService } from './user.service';
import { User } from './user.entity';

@ApiTags('User API')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get current user profile
   *
   * @summary Get current user profile
   *
   * @param userId
   *
   * @throws {401} Unauthorized.
   * @throws {404} User not found.
   */
  @Get('me')
  async getMe(@UserPayload('sub') userId: string): Promise<User> {
    const user = await this.userService.findOne(userId, );
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
