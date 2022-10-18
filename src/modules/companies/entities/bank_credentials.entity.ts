import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class BankCredentials {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Identifier key of the bank integration' })
  @Column()
  bankName: string;

  @Column({ type: String, length: 4096 })
  credentials: string;

  @Column({ type: String, length: 4096 })
  jwt: string;

  @Column({ type: String, length: 4096 })
  jwtRefresh: string;

  @ManyToOne(() => Company, (company) => company.id, { onDelete: 'CASCADE' })
  company: Company;

  @Column({type: Boolean, default: false})
  exipired: boolean;
}
