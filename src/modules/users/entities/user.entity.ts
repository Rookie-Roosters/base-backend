import { Authentication } from '@authentication/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
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

  @OneToOne(() => Authentication)
  @JoinColumn()
  authentication: Authentication;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
