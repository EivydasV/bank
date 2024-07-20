up:
	docker compose up

up-build:
	docker compose up --build

down:
	docker compose down

down-v:
	docker compose down -v

exec-mongo:
	docker exec -it mongo bash

exec-nest:
	docker exec -it nest bash
