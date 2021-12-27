#!/bin/sh

for f in src/{scripts,styles,views}/* public/css/*; do
  sed -i 's/af-class-//g' $f
done
