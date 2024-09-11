import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import { ClientService } from './user-client/client.service';

@Injectable()
export class AppService {
  constructor(private clientService: ClientService) {}

  async getHello() {
    return await this.clientService.findOneByEmail(
      'janBrz@gmail.com',
    );
  }
}
