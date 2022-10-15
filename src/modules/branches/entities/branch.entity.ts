import { User } from '@users/entities';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Branch {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  location: string;

  //   @OneToMany(() => User)
  //   employees: User;
}
