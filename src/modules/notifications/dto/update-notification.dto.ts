import { PartialType } from '@nestjs/mapped-types';
import { Notification } from '../entities/notification.entity';

export class UpdateNotificationDto extends PartialType(Notification) {
  id: number;
}
