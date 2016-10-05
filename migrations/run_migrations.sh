#!/bin/bash
set -ue -o pipefail

db=${1:-dev}
export PGPASSWORD=dev
psql -h localhost -p 5432 -U postgres -c "DROP DATABASE IF EXISTS $db;"
psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE $db;"

for sql_file in  $(ls *.sql); do
  psql -h localhost -p 5432 -U postgres $db --file $sql_file
done;
