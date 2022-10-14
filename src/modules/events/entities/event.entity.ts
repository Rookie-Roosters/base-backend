import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
    @ApiProperty({ description: "The notification's primary key" })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ description: 'Recruiment Status value' })
    @Column({ type: 'varchar', length: 32 })
    value: string;
    text: string;
    link: string;
    date: Date;
    isAlreadySeen: boolean;
}
