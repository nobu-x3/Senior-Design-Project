#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
UPLOADED_FILES_DIR="$SCRIPT_DIR/UploadedFiles/Images"
for file in $UPLOADED_FILES_DIR/*
do
    filename=$(basename -- "$file")
    extension="${filename##*.}"
    filename="${filename%.*}"
    # mkdir Server/SESSION/$filename
    mv $file "$UPLOADED_FILES_DIR/base.${extension}"
    mv "$UPLOADED_FILES_DIR/base.${extension}" "$SCRIPT_DIR/Server/SESSION/$filename"
done
pip install deepface flask
cd $SCRIPT_DIR/Server/
export FLASK_APP=sdp_server
flask run
