import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Socket, Server } from 'socket.io';
import { Notification } from './entities/notification.entity';
import { SocketsService } from '@users/services';
import { CurrentAuth } from '@authentication/decorators';
import { User } from '@users/entities';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway implements OnGatewayDisconnect, OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationsService: NotificationsService, private socketsService: SocketsService) {}

  afterInit(server: Server) {
    console.log('Notification socket connected');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.socketsService.deleteSocketConnection(client.id);
  }

  handleConnection(@CurrentAuth() currentAuth: User, client: Socket, ...args: any[]) {
    const token = client.handshake.query.Authorization;
    console.log(`Client connected: ${client.id}`);
    this.socketsService.addSocketConnection(currentAuth, client.id);
  }

  async send(@CurrentAuth() currentAuth: User, text: string, link: string) {
    //const notification = await this.notificationsService.save(text,link,currentAuth);
    const notification = { text: text, link: link, date: Date.now() };
    const sockets = await this.socketsService.getSockets(currentAuth.id);
    const serverSockets = await this.server.fetchSockets();
    sockets.map((socket) => {
      if (serverSockets.findIndex((serverSockets) => serverSockets.id == socket.socketId) == -1) {
        this.socketsService.deleteSocketConnection(socket.socketId);
      } else {
        this.server.to(socket.socketId).emit('notify', notification);
      }
    });
  }
  /*
  @SubscribeMessage('findAllNotifications')
  async findAll(@CurrentAuth() currentAuth: User, client: Socket, ...args: any[]) {
    await this.notificationsService.findByUser(currentAuth.id).then((notifications)=>{
      this.server.emit('notify', notifications);
      return notifications;
    }); 
  }

  @SubscribeMessage('updateNotification')
  update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(updateNotificationDto.id, updateNotificationDto);
  }

  @SubscribeMessage('updateAllNotifications')
  remove(@MessageBody() id: number) {
    return this.notificationsService.updateAll();
  }*/
}
