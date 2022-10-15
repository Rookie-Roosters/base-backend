import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsBoolean } from 'class-validator';
import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Authentication } from '@authentication/entities';

@Entity()
export class User {
  @ApiPropertyOptional({ description: 'User unique identifier' })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ description: "User's email address" })
  @IsEmail()
  @Column()
  email: string;

  @ApiProperty({ description: "User's first name" })
  @IsString()
  @Column()
  firstName: string;

  @ApiProperty({ description: "User's last name" })
  @IsString()
  @Column()
  lastName: string;

  @Column({ default: true })
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
//Not normalized yet
  @ApiProperty({type: [String], description: "User's socket connections"})
  @IsString()
  sockets: string[];
  @OneToOne(() => Authentication)
  @JoinColumn()
  authentication?: Authentication;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
