import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateClientCommandHandler } from '../user-client/commands/handler/create-client-command.handler';
import { DeleteClientCommandHandler } from '../user-client/commands/handler/delete-client-command.handler';
import { Client } from '../user-client/entities/client.entity';
import { ClientService } from '../user-client/client.service';
import { GetClientsQueryHandler } from '../user-client/queries/handler/get-clients-query.handler';
import { ClientController } from '../user-client/client.controller';


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
