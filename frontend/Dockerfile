FROM	node:latest

RUN		npm i -g npm
RUN		npm i -g tar create-react-app
RUN		npx create-react-app frontend --template typescript

ADD		./src/	/frontend/src/
ADD		./public/	/frontend/public/
ADD		./package.json	/frontend/

EXPOSE	3000 3001

ENTRYPOINT	cd frontend && npm start
