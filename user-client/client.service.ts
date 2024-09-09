import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { ClientDTO } from './commands/dto/client.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: string): Promise<Client | null> {
    return await this.clientRepository.findOneBy({ id });
  }

  async create(dto: ClientDTO) {
    return await this.clientRepository.save({ id: uuidv4(), ...dto });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.clientRepository.remove(user);
  }
}
