import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiConsumes } from '@nestjs/swagger';
import { signInClientDTO } from './signIn-client.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiConsumes('application/x-www-form-urlencoded')
  async signIn(@Body() dto: signInClientDTO) {
    return 'You have successfully logged in.';
  }
}
