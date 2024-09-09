import { ClientDTO } from '../dto/client.dto';

export class CreateClientCommand {
  constructor(public readonly clientDTO: ClientDTO) {}
}
