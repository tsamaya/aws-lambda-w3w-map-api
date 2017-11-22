# aws-lambda-w3w-map-api

[![Build Status](https://travis-ci.org/tsamaya/aws-lambda-w3w-map-api.svg?branch=master)](https://travis-ci.org/tsamaya/aws-lambda-w3w-map-api)

## Quick start

### Prerequisites

- node, npm or yarn
- serverless : `$ npm install -g serverless`
- what3words API key : [register](https://accounts.what3words.com/)

### AWS - Credentials
[Watch the video on setting up credentials](https://www.youtube.com/watch?v=KngM5bfpttA)

or look at serverles documentatoon about [credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

Adding a profile on the AWS config

    $ serverless config credentials --provider aws --key <YOUR-AWS-KEY> --secret <YOUR-AWS-SECRET> --profile <namedProfile>

### Clone the repo

	$ git clone https://github.com/tsamaya/aws-lambda-w3w-map-api.git

	$ cd aws-lambda-w3w-map-api

### Setup

	$ npm i

create environment.yml file

    $ serverless env --attribute W3W_API_KEY --value <YOUR-W3W-API-KEY> --stage dev

don't forget for the production environment to add the according stage

    $ serverless env --attribute W3W_API_KEY --value <YOUR-W3W-API-KEY> --stage prod


### Quick test

	$ sls offline start

open your browser with [http://localhost:3000/what3words/map?addr=launch.posts.wedge](http://localhost:3000/what3words/map?addr=launch.posts.wedge)

### Quick deploy

	$ sls deploy


# How to

Create a boilerplate for aws-nodejs

    $ serverless create --template aws-nodejs --path serverless create --template aws-nodejs --path aws-lambda-w3w-map-api

    $ cd aws-lambda-w3w-map-api/

    $ ls -al

will output this directory strucutre
```
.
├── .gitignore
├── handler.js
└── serverless.yml
```

`handler.js` contains a hello world example.


init `package.json`

    $ npm init -y


install dependencies

	$ npm i -S axios dotenv ejs

install dev-dependencies

	linting package

	    $ npm i -D eslint eslint-config-airbnb-base eslint-plugin-import

	serverless helpers

	    $ npm i -D serverless-env-generator serverless-offline


edit serverless.yml file

```yaml
plugins:
  - serverless-env-generator
  - serverless-offline

# Plugin config goes into custom:
custom:
  envFiles: #YAML files used to create .env file
    - environment.yml
```

create the travis file

```yaml
language: node_js
node_js:
- '6.10'

env:
  global:
    - SLS_DEBUG=true

before_install:
  - npm i -g serverless

install:
  - npm i
  - serverless env --attribute W3W_API_KEY --value $W3W_API_KEY --stage dev
  - serverless env --attribute W3W_API_KEY --value $W3W_API_KEY --stage prod

after_script: ./deploy.sh
```

Update travis-ci repository settings, and create private environment variables:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- W3W_API_KEY

create the deploy script:

```bash
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

echo "Deploying from branch $BRANCH to stage $STAGE"

sls deploy --stage $STAGE
```

enjoy :smile:

## Resources

- [serverless](https://serverless.com)

## Licensing

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE.md) file.
