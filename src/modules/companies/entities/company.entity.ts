import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  //   @ApiProperty({ description: 'Every user who belongs to the company' })
  //   @OneToMany(() => User)
  //   employees: User[];
}
