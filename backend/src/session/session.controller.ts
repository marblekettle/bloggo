import { Session, Controller, Get, Res, HttpStatus } from '@nestjs/common';
import * as secureSession from '@fastify/secure-session';
import { FastifyReply } from 'fastify';

@Controller('/api/session')
export class SessionController {
	constructor() {this.num = 1;}

	private num: number;

	@Get('')
	testSession(@Session() session: secureSession.Session,
		@Res() response: FastifyReply) {
		console.log(session);
		console.log(this.num);
		let thisnum: number | null = session.get('thisnum');
		if (!thisnum) {
			thisnum = this.num;
			session.set('thisnum', this.num);
			this.num += 1;
		}
		return response.status(HttpStatus.OK).send({'num': thisnum});
	}
}
