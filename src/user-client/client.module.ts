import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetClientsQueryHandler } from './queries/handler/get-clients-query.handler';
import { CreateClientCommandHandler } from './commands/handler/create-client-command.handler';
import { DeleteClientCommandHandler } from './commands/handler/delete-client-command.handler';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    ClientService,
    GetClientsQueryHandler,
    CreateClientCommandHandler,
    DeleteClientCommandHandler,
  ],
  exports: [TypeOrmModule, ClientService],
})
export class ClientModule {}
