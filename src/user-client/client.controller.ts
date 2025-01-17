import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetClientsQuery } from './queries/impl/get-clients.query';
import { CreateClientCommand } from './commands/impl/create-client.command';
import { ApiConsumes } from '@nestjs/swagger';
import { DeleteClientCommand } from './commands/impl/delete-client.command';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { Client } from './entities/client.entity';
import { createClientDTO } from './commands/dto/create-client.dto';

export type RequestWithUser = Request & { user: Client };

@Controller('/client')
export class ClientController {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/clients')
  async getAllClients() {
    return await this.queryBus.execute(new GetClientsQuery());
  }

  @Post('/register')
  @ApiConsumes('application/x-www-form-urlencoded')
  async signup(@Param() dto: createClientDTO) {
    await this.commandBus.execute(new CreateClientCommand(dto));
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  async getMe(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/clients/:uuid')
  async deleteClient(@Param('uuid') uuid: string) {
    await this.commandBus.execute(new DeleteClientCommand(uuid));
  }
}
