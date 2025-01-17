import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClientsQuery } from '../impl/get-clients.query';
import { Client } from '../../entities/client.entity';
import { ClientService } from '../../client.service';

@QueryHandler(GetClientsQuery)
export class GetClientsQueryHandler
  implements IQueryHandler<GetClientsQueryHandler>
{
  constructor(private readonly clientService: ClientService) {}

  async execute(query: GetClientsQueryHandler): Promise<Client[]> {
    return this.clientService.findAll();
  }
}
