#!/bin/bash

export start_dir=$PWD
cd ../orgfeed/scripts
. ./auxiliary/prepare_launch.sh
cd $start_dir

if [[ $PGPASSWORD != '' ]]; then
    docker-compose stop
    docker-compose rm orgfeed_api orgfeed_front
    docker-compose up --no-start --build --force-recreate
fi
