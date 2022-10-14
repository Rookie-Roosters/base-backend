import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Socket, Server } from 'socket.io';
import { Notification } from './entities/notification.entity';
import { UsersService } from '@users/services';

@WebSocketGateway(3000, { cors: { origin: '*' } })
export class NotificationsGateway implements OnGatewayDisconnect, OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server:Server;

  constructor(private readonly notificationsService: NotificationsService,
    private usersService: UsersService) {}

  afterInit(server: Server) {
    console.log('Notification socket connected');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.query.Authorization;
    console.log(`Client connected: ${client.id}`);
    const userId = 1;
    this.usersService.addSocketConnection(userId, client.id);
  }

  async send(notification: Notification) {
    const userId = 1;
    this.notificationsService.save(notification);
    const sockets = await this.usersService.getSockets(userId);
    const serverSockets = await this.server.fetchSockets();
    sockets.map((socket) => {
      if(serverSockets.findIndex((serverSockets) => serverSockets.id == socket) == -1) {
        this.usersService.deleteSocketConnection(userId, socket);
      } else {
        this.server.to(socket).emit('notify', notification);
      }
    })
  }

  @SubscribeMessage('findAllNotifications')
  async findAll(client: Socket, ...args: any[]) {
    const userId = 1;
    await this.notificationsService.findByUser(userId).then((notifications)=>{
      this.server.emit('notify', notifications);
      return notifications;
    }); 
  }

  @SubscribeMessage('updateNotification')
  update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(updateNotificationDto.id, updateNotificationDto);
  }

  //@SubscribeMessage('updateAllNotifications')
  //remove(@MessageBody() id: number) {
  //  return this.notificationsService.updateAll();
  //}
}
