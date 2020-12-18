#!/usr/bin/env bash

set -e

for i in $(find ./src -type f -name "index.njk" -printf "%h\n"); do
    nunjucks "index.njk" "${i}/context.json" \
             --path "$i" \
             --out "./public/" \
             --options "./config/nunjucks.json"
done
