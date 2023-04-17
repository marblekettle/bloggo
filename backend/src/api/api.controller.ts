import { Controller, Get, Post, Delete, HttpStatus,
	Req, Res, Param, Query } from '@nestjs/common';
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
	async getPosts(@Query('id') id: any, @Query('offset') offset: any,
		@Query('n') n: any, @Res() response: Response) {
		let posts: any = null;
		if (id && !offset && !n && !isNaN(id))
			posts = await this.apiService.getPost(parseInt(id));
		else if (!id) {
			let params: Array<number> = [-1, -1];
			if (offset) {
				if (!isNaN(offset))
					params[0] = parseInt(offset);
			} else 
				params[0] = 0;
			if (n) {
				if (!isNaN(n))
					params[1] = parseInt(n);
			} else
				params[1] = 5;
			if (params[0] >= 0 && params[1] >= 0) {
				posts = await this.apiService.getPosts({
					skip: params[0],
					take: params[1]
				});
			}
		}
		if (posts)
			return response.status(HttpStatus.OK).json(posts);
		return response.status(HttpStatus.BAD_REQUEST).json({});
	}
}
