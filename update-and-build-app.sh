git pull
docker run -it --rm -w /app -v $(pwd):/app alexsuch/angular-cli:10.2.3 ng build && ng run prometheus-page:server
