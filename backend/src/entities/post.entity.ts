import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	author: string;
	@Column('text')
	text: string;
	@Column('date')
	date: Date
}
