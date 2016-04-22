#!/bin/bash
for i in `seq 1 100`;
do
  PORT=$[$i + 2999] forever start backend/bin/www
done
