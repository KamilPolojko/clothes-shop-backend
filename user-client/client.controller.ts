import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetClientsQuery } from './queries/impl/get-clients.query';
import { ClientDTO } from './commands/dto/client.dto';
import { CreateClientCommand } from './commands/impl/create-client.command';
import { ApiConsumes } from '@nestjs/swagger';
import { DeleteClientCommand } from './commands/impl/delete-client.command';

@Controller('/client')
export class ClientController {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @Get('/clients')
  async getAllClients() {
    return await this.queryBus.execute(new GetClientsQuery());
  }

  @Post('/register')
  @ApiConsumes('application/x-www-form-urlencoded')
  async createClient(@Body() dto: ClientDTO) {
    await this.commandBus.execute(new CreateClientCommand(dto));
  }

  @Delete('/clients/:uuid')
  async deleteClient(@Param('uuid') uuid: string) {
    await this.commandBus.execute(new DeleteClientCommand(uuid));
  }
}
