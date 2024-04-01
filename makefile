include .env

IMAGE=benjyongzh/where-atm-sg
TAG=1.0.2
	
build-image:
	docker build . -t "$(IMAGE):$(TAG)"
	
push-image: build-image
	docker push "$(IMAGE):$(TAG)"

run-image:
	docker run -d -p 3000:3000 "$(IMAGE):$(TAG)"

compose:
	docker compose -f docker-compose.yaml up 