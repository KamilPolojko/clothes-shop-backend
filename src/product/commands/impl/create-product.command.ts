import { createClientDTO } from '../dto/create-client.dto';

export class CreateClientCommand {
  constructor(public readonly clientDTO: createClientDTO) {}
}
