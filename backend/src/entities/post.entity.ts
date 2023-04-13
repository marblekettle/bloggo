import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({orderBy: {id: 'DESC'}})
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	author: string;
	@Column('text')
	text: string;
	@Column('timestamptz')
	date: Date
}
