import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UsersService } from 'src/modules/users';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private usersService: UsersService) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Chats Socket Inited');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.query.Authorization;
    const userId = '633f61b41138defd1e587ad1'; //Here we get the user _id
    this.usersService.addSocketConnection(userId, client.id);
  }

  async sendMessage(receiver: string, message: string) {
    const sockets = await this.usersService.getSockets(receiver);
    const serverSockets = await this.server.fetchSockets();
    sockets.map((socket) => {
      if(serverSockets.findIndex((serverSockets) => serverSockets.id == socket) == -1) {
        this.usersService.deleteSocketConnection(receiver, socket);
      } else {
        this.server.to(socket).emit('message', message);
      }
    })
  }

  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() message: string): void {
  //   this.server.emit('message', message);
  // }

  handleDisconnect(client: Socket) {
    const token = client.handshake.query.Authorization;
    const userId = '633f61b41138defd1e587ad1'; //Here we get the user _id
    this.usersService.deleteSocketConnection(userId, client.id);
  }
}
