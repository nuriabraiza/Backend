import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userName')
  public findUserByName(@Param('userName') userName: string) {
    return this.userService.findUserByName(userName);
  }

  @Post()
  public cria(@Body() user: User) {
    const createdUser = this.userService.cria(user);
    return createdUser;
  }
}
