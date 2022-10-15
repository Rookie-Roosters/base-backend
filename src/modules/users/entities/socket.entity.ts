import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Socket {
    @ApiProperty({ description: "The socket's primary key" })
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({type: 'varchar', description: "The socket's connection Id"})
    @Column({ type: 'varchar', length: 64 })
    socketId: string;

    @ApiProperty({ description: "The user's sockets list" })
    @ManyToOne(() => User)
    user: User
}