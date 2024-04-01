include .env

IMAGE=benjyongzh/where-atm-sg
TAG=1.0.2
	
build-image:
#	@docker build . -t "$(IMAGE):$(TAG)" --build-arg GMAPS_API_KEY=$(GMAPS_API_KEY) --build-arg GMAPS_MAP_ID_LIGHT=$(GMAPS_MAP_ID_LIGHT) --no-cache
#	@echo $(GMAPS_API_KEY) > dockertempfiles/temp-api-key.txt
#	@echo $(GMAPS_MAP_ID_LIGHT) > dockertempfiles/temp-map-id-key.txt
#	docker build . -t "$(IMAGE):$(TAG)" --secret id=GMAPS_API_KEY,src=dockertempfiles/temp-api-key.txt --secret id=GMAPS_MAP_ID_LIGHT,src=dockertempfiles/temp-map-id-key.txt --no-cache
#	rm dockertempfiles/temp-map-id-key.txt
#	export GMAPS_API_KEY=$(GMAPS_API_KEY)
#	export NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT=$(NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT)
#	docker build . -t test --secret id=GMAPS_API_KEY,env=GMAPS_API_KEY --secret id=NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT,env=NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT
#	docker build . -t test --secret id=GMAPS_API_KEY,src=.env --secret id=NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT,src=.env
	docker build . -t "$(IMAGE):$(TAG)"
	
push-image: build-image
	docker push "$(IMAGE):$(TAG)"

run-image:
	docker run -d -p 3000:3000 "$(IMAGE):$(TAG)"

compose:
	docker compose -f docker-compose.yaml up 