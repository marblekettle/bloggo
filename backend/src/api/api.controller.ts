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
			title: request.body['title'],
			author: request.body['author'],
			text: request.body['text'],
		}
		this.apiService.newPost(newpost.title,
			newpost.author,
			newpost.text);
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

	@Get('/testposts')
	testPosts(@Res() response: Response) {
		return response.status(HttpStatus.OK).json([{
			id: 2,
			title: "Lorem Ipsum",
			author: "TestUser",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			date: new Date(2020,2,20,20,20,20)},{
			id: 1,
			title: "FitnessGram",
			author: "Anon",
			text: "The FitnessGram Pacer test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter Pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal *boop*. A single lap should be completed each time you hear this sound *ding*. Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
			date: new Date(2015,1,15,15,15,15)},{
			id: 0,
			title: "Never Gonna Give You Up",
			author: "Rick Astley",
			text: "This is a short post.",
			date: new Date(3000,3,30,3,30,30)
		}]);
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
