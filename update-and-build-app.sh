git pull
docker run -it --rm -w /app -v $(pwd):/app alexsuch/angular-cli:10.2.3 ng build --configuration production
#docker run -it --rm -w /app -v $(pwd):/app alexsuch/angular-cli:10.2.3 ng run prometheus-page:server
docker run -it --rm -w /app -v $(pwd):/app alexsuch/angular-cli:10.2.3 npm run start
