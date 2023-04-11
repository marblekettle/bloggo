FRONTEND_SRC = \
./frontend/src/App.tsx
BACKEND_SRC = \
./backend/src/main.ts \
./backend/src/app.module.ts \
./backend/src/entities/post.entity.ts \
./backend/src/api/api.controller.ts \
./backend/src/api/api.service.ts \
./backend/src/api/post.interface.ts

all: local docker

bloggo-frontend:
	npx create-react-app bloggo-frontend --template typescript

bloggo-backend:
	echo "npm" | nest new bloggo-backend
	cd bloggo-backend && npm i --save express typeorm @nestjs/typeorm pg

docker:
	docker-compose up --build

local: $(FRONTEND_SRC) $(BACKEND_SRC) bloggo-frontend bloggo-backend
	cp -R backend/src/* bloggo-backend/src/
	cp -R frontend/src/* bloggo-frontend/src/
	cp frontend/package.json bloggo-frontend/

clean:
	rm -rf bloggo-frontend
	rm -rf bloggo-backend

re: clean all
