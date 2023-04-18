all: local docker

bloggo-frontend:
	npx create-react-app bloggo-frontend --template typescript

bloggo-backend:
	echo "npm" | nest new bloggo-backend
	cd bloggo-backend && npm i --save express typeorm @nestjs/typeorm pg

docker:
	docker-compose up --build

local: bloggo-frontend bloggo-backend
	cp -R backend/src/* bloggo-backend/src/
	cp -R frontend/src/* bloggo-frontend/src/
	cp ./frontend/package.json.local ./bloggo-frontend/package.json

clean:
	rm -rf bloggo-frontend
	rm -rf bloggo-backend

re: clean all
