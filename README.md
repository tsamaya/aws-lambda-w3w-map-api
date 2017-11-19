# aws-lambda-w3w-map-api


## Quick start

### prerequisites

- node, npm or yarn
- serverless : `$ npm install -g serverless`
- what3words API key : [register](https://accounts.what3words.com/)

### AWS - Credentials
[Watch the video on setting up credentials](https://www.youtube.com/watch?v=KngM5bfpttA)

or look at serverles documentatoon about [credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

Adding a profile on the AWS config

    $ serverless config credentials --provider aws --key <YOUR-AWS-KEY> --secret <YOUR-AWS-SECRET> --profile <namedProfile>

### clone the repo

	$ git clone https://github.com/tsamaya/aws-lambda-w3w-map-api.git

	$ cd aws-lambda-w3w-map-api

### setup

	$ npm i

create environment.yml file

    $ serverless env --attribute W3W_API_KEY --value <YOUR-W3W-API-KEY> --stage dev

don't forget for the production environment to add the according stage

    $ serverless env --attribute W3W_API_KEY --value <YOUR-W3W-API-KEY> --stage prod


### quick test

	$ sls offline start

open your browser with [http://localhost:3000/what3words/map?addr=launch.posts.wedge](http://localhost:3000/what3words/map?addr=launch.posts.wedge)

### quick deploy

	$ sls deploy


## Resources

- [serverless](https://serverless.com)

## Licensing

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE.md) file.
