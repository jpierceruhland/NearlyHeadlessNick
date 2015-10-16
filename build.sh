#!/bin/bash

rm -rf nearlyheadless.zip

git ls-files | zip nearlyheadless -@

echo "Built to nearlyheadless.zip"
