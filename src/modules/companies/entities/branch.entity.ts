import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Main establishment to which this branch office belongs' })
  @ManyToOne(() => Company)
  company: Company;

  @ApiProperty({ description: 'Name of this branch office' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Information of this branch office location' })
  @Column()
  location?: string;

  @ApiProperty({ description: 'Direct contact phone number' })
  @Column()
  phone?: string;

  @ApiProperty({ description: 'A list of users who work in this branch office' })
  @OneToMany(() => User, (user) => user.branch)
  employees: User[];
}
