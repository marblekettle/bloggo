import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({orderBy: {id: 'DESC'}})
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ nullable: false, default: 'Anon' })
	author: string;
	@Column({ nullable: false, default: '' })
	text: string;
	@Column({ nullable: false, type: 'timestamptz', default: new Date()})
	date: Date
}
