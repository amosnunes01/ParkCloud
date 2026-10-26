.PHONY: build up down restart logs ps health clean

all: up

build:
	docker compose build

up:
	docker compose up -d --build

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

ps:
	docker compose ps

health:
	@echo "Checking ParkCloud Web health..."
	@curl -sI http://localhost/health || echo "Web health check failed"
	@echo "Checking ParkCloud API health..."
	@curl -s http://localhost:5001/api/health || echo "API health check failed"

clean:
	docker compose down -v --rmi local
