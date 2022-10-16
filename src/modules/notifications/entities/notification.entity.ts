import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Notification {
  /*
    @ApiProperty({ description: "The notification's primary key" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: "The notification's description" })
    @Column({ type: 'varchar', length: 128 })
    text: string;

    @ApiProperty({ description: "Link to page" })
    @Column({ type: 'varchar', length: 32 })
    link: string;

    @ApiProperty({ description: "Date of creation" })
    @Column({ type: 'date' })
    date: Date;

    @ApiProperty({ description: "If the user has already seen the notification or not" })
    @Column({ type: Boolean })
    isAlreadySeen: boolean;

    @ApiProperty({ description: "The user's notifications list" })
    @ManyToOne(() => User)
    user: User
    */
}
