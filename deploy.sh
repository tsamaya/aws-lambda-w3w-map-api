#!/usr/bin/env bash
set -e

BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}

if [[ $BRANCH == 'master' ]]; then
  STAGE="prod"
elif [[ $BRANCH == 'develop' ]]; then
  STAGE="dev"
fi

if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi

if [ -z ${AWS_ACCESS_KEY_ID+x} ]; then echo "AWS_ACCESS_KEY_ID is unset"; exit 1; else echo "AWS_ACCESS_KEY_ID is set"; fi
if [ -z ${AWS_SECRET_ACCESS_KEY+x} ]; then echo "AWS_SECRET_ACCESS_KEY is unset"; exit 1; else echo "AWS_SECRET_ACCESS_KEY is set"; fi

echo "Deploying from branch $BRANCH to stage $STAGE"

sls deploy --stage $STAGE
