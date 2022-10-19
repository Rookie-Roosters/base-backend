import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@users/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true, default: null })
  icon?: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  // @OneToMany(() => Branch, (branch) => branch.company)
  // branches: Branch[];

  // @ApiProperty({ description: 'A list containing the credentials needed to access into each bank integration' })
  // @OneToMany(() => BankCredentials, (credentials) => credentials.company)
  // bankCredentials: BankCredentials[];

  //   @ApiProperty({ description: 'Every user who belongs to the company' })
  //   @OneToMany(() => User)
  //   employees: User[];
}
