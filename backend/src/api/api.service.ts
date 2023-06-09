import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "src/entities/post.entity";
import { Repository } from "typeorm";

@Injectable()
export class ApiService {
	constructor(
		@InjectRepository(PostEntity) private postRepo: Repository<PostEntity>
	) {}

	private postToJSON(post: PostEntity): Object {
		if (!post)
			return ({});
		const obj = {
			id: post.id,
			title: post.title,
			author: post.author,
			text: post.text,
			date: post.date
		}
		return (obj);
	}

	async newPost(title: string, author: string, text: string) {
		const topost = new PostEntity;
		topost.title = title;
		topost.author = author;
		topost.text = text;
		topost.date = new Date();
		const posted = await this.postRepo.insert(topost);
		return({posted});
	}

	async deletePost(id: number): Promise<boolean> {
		const post = await this.postRepo.delete({id: id});
		return (post.affected == 1);
	}

	async getPosts(props: Object): Promise<Array<Object>> {
		const posts = await this.postRepo.find(props);
		return (posts.map((p) => this.postToJSON(p)))
	}

	async getPost(id: number): Promise<Array<Object>> {
		const post = await this.postRepo.findOneBy({id});
		return ([this.postToJSON(post)]);
	}
}

/*
@Injectable()
export class ApiService {
	id: number = 0;
	posts: Array<IPost> = [{
		id: 0,
		author: 'Anon',
		text: 'First post.',
		date: new Date()
	}];

	newPost(post: IPost) {
		this.posts.push(post);
	}

	getPosts(): Array<IPost> {
		return (this.posts);
	}

	getPost(id: number): IPost | null {
		for (let i: number = 0; i < this.posts.length; i++) {
			if (this.posts[i].id == id)
				return (this.posts[i]);
		}
		return (null);
	}

	getId(): number {
		this.id++;
		return(this.id);
	}
}
*/
