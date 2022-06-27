import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'this can bee seen anyone';
  }
  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }
}
