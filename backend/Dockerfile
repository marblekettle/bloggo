FROM 	node:latest

RUN 	npm i -g npm				
RUN 	npm i -g @nestjs/cli
RUN 	echo "npm" | nest new backend
RUN		cd backend && npm i --save express typeorm @nestjs/typeorm pg @fastify/secure-session

ADD		./src/	/backend/src/

EXPOSE	3001 5432

ENTRYPOINT	cd backend && npm start
