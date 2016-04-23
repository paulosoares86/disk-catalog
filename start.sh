#!/bin/bash
for i in `seq 3001 3020`;
do
  PORT=$i forever start backend/bin/www
done
