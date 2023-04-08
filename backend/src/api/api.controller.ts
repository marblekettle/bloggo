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
		const posts = await this.apiService.getPosts();
		return response.status(HttpStatus.OK).json(posts);
	}

	@Get('/posts/:id')
	async getPost(@Param('id') id: any, @Res() response: Response) {
		if (!isNaN(id)){
			const post = await this.apiService.getPost(parseInt(id));
			if (post)
				return response.status(HttpStatus.OK).json(post);
		}
		return response.status(HttpStatus.NOT_FOUND);
	}
}
