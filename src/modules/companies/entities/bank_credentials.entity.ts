import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class BankCredentials {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Identifier key of the bank integration' })
  @Column()
  bankName: string;

  @ApiProperty({ description: 'Bank key needed to log in' })
  @Column()
  account: string;

  @ApiProperty({ description: 'Bank key needed to log in' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Bank key needed to log in' })
  @Column()
  token: number;

  // @ManyToOne(() => Company)
  // company: Company;
}
