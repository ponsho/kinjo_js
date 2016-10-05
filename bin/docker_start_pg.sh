#!/bin/bash
set -uf -o pipefail

PASSWORD=dev
CONTAINER_NAME=dev-db
docker rm -f "$(docker ps -q -a)"
docker run --name $CONTAINER_NAME -e POSTGRES_PASSWORD=$PASSWORD -d -p 5432:5432 postgres

# Connecting:  psql -h localhost -p 5432 -U postgres
