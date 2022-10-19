import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Authentication } from '@authentication/entities';
import { Company } from '@companies/entities';

@Entity()
export class User {
  @ApiProperty({ description: 'User unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

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

  @ApiProperty({ description: "User's icon" })
  @IsString()
  @Column()
  icon: string;

  @OneToOne(() => Authentication)
  @JoinColumn()
  authentication?: Authentication;

  @ManyToOne(() => Company, (company) => company.id, {onDelete: 'SET NULL'})
  company: Company;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
