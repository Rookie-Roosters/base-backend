import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Branch } from './branch.entity';

@Entity()
export class Company {
  @ApiPropertyOptional({ description: 'Company unique identifier' })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({ unique: true })
  rfc: string;

  @Column()
  name: string;

  @Column()
  icon?: string;

  @OneToMany(() => Branch, (branch) => branch.company)
  branches: Branch[];

  //   @ApiProperty({ description: 'Every user who belongs to the company' })
  //   @OneToMany(() => User)
  //   employees: User[];
}
