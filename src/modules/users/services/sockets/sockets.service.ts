import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket, User } from '@users/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SocketsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Socket)
    private readonly socketsRepository: Repository<Socket>,
  ) {}

  async addSocketConnection(user: User, socket: string): Promise<void> {
    const newSocket = this.socketsRepository.create({ socketId: socket, user: user });
    this.socketsRepository.save(newSocket);
  }

  async deleteSocketConnection(socket: string): Promise<void> {
    await this.socketsRepository.delete({ socketId: socket });
  }

  async getSockets(id: number): Promise<Socket[]> {
    return await this.socketsRepository.find({
      where: {
        user: {
          id: id,
        },
      },
    });
  }
}
