import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { signUpClientDTO } from './commands/dto/signUp-client.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOneById(id: string): Promise<Client | null> {
    return await this.clientRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<Client | null> {
    return await this.clientRepository.findOneBy({ email });
  }
  async signUp(dto: signUpClientDTO) {
    const { password } = dto;
    const id = uuidv4();
    dto.password = await bcrypt.hash(password, 10);

    await this.clientRepository.save({ id: id, ...dto });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.clientRepository.remove(user);
  }
}
