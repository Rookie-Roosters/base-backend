import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authentication {
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ description: 'Access unique identifier required to access. Could be an email, username, etc.' })
  @Column({ unique: true })
  identifier: string;

  @ApiProperty({ description: 'Hashed access key' })
  @Exclude()
  @Column()
  passwordHash: string;
}
