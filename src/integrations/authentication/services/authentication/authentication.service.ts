import { Authentication } from '@authentication/entities/authentication.entity';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import to from 'await-to-js';

import { AuthenticationCreateDto } from '@authentication/dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Authentication)
    private authenticationRepository: Repository<Authentication>,
  ) {}

  async createRegistry(dto: AuthenticationCreateDto): Promise<Authentication> {
    const hashedPassword = await bcrypt.hash(dto.plainTextPassword, 10);
    const registry = this.authenticationRepository.create({
      identifier: dto.identifier,
      passwordHash: hashedPassword,
    });
    const [err] = await to(this.authenticationRepository.save(registry));
    if (err) throw new ConflictException('A registry with this identifier already exists', err.message);
    return registry;
  }

  async getRegistry(identifier: string, plainTextPassword: string): Promise<Authentication> {
    const registry = await this.authenticationRepository.findOneBy({ identifier });
    await this.verifyPassword(plainTextPassword, registry.passwordHash);
    return registry;
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const matches = await bcrypt.compare(password, hashedPassword);
    if (!matches) throw new BadRequestException('Wrong credentials provided');
    return true;
  }
}
