#!/bin/bash

export start_dir=$PWD
cd ../orgfeed/scripts
. ./auxiliary/prepare_launch.sh
cd $start_dir

if [[ $PGPASSWORD != '' ]]; then
    docker-compose up -d
fi
