import { Controller, Get, Post, Delete, HttpStatus, Req, Res, Param } from '@nestjs/common';
import { ApiService } from './api.service';
import { Request, Response } from 'express';

@Controller('/api')
export class ApiController {
	constructor(private readonly apiService: ApiService) {}

	@Post('/newpost')
	newPost(@Req() request: Request, @Res() response: Response) {
		const newpost = {
			author: request.body['author'],
			text: request.body['text'],
		}
		this.apiService.newPost(newpost.author, newpost.text);
		return response.status(HttpStatus.CREATED);
	}

	@Delete('/deletepost/:id')
	async deletePost(@Param('id') id: any, @Res() response: Response) {
		if (!isNaN(id)){
			const res: boolean = await this.apiService.deletePost(parseInt(id));
			if (res)
				return response.status(HttpStatus.OK);
		}
		return response.status(HttpStatus.NOT_FOUND);
	}

	@Get('/posts')
	async getPosts(@Res() response: Response) {
		const posts = await this.apiService.getPosts({
			take: 100
		});
		return response.status(HttpStatus.OK).json(posts);
	}

	@Get('/posts/offset=:offset&n=:n')
	async getPostSpan(@Param('offset') offset: any,
		@Param('n') n: any, @Res() response: Response) {
		if (!isNaN(offset) && !isNaN(n)) {
			const params: Array<number> = [parseInt(offset), parseInt(n)];
			if (params[1] <= 100) {
				const props: Object = {
					skip: params[0],
					take: params[0] + params[1]
				}
				const post: any = await this.apiService.getPosts(props);
				if (post)
					return response.status(HttpStatus.OK).json(post);
			}
		}
		return response.status(HttpStatus.NOT_FOUND);
	}

	@Get('/posts/id=:id')
	async getPost(@Param('id') id: any, @Res() response: Response) {
		if (!isNaN(id)) {
			const post: any = await this.apiService.getPost(parseInt(id));
			if (post)
				return response.status(HttpStatus.OK).json(post);
		}
		return response.status(HttpStatus.NOT_FOUND);
	}
}
