# Bazos Watcher

Simple application watching for webpage changes. User is notified on change e-mail.

Built on top of the AWS services (Lambda, DynamoDB, SES).

# Use:

## Requirements:
- docker
- docker-compose

## Install:

1. Clone repository:

```
git clone https://github.com/ikim23/bazos-watcher.git
```

2. Create .env file:

```
cp .env.template .env
```

3. Set all required environment variables:

|Environment Variable|Description|
|-|-|
|AWS_DEFAULT_REGION|Region for AWS CLI|
|AWS_ACCESS_KEY_ID|Access key ID for AWS CLI & deployment|
|AWS_SECRET_ACCESS_KEY|Secret access key for AWS CLI & deployment|
|SLS_DEBUG|Debug level of Serverless framework. Set to '*' for all logs.
|STAGE|Deployment stage|
|REGION|Deployment region|
|SES_EMAIL|Address used as e-mail sender|
|RECEIVER_EMAIL|Receiver e-mail address|
|QUERY|Phrase to search|

Environment variables are used by `serverless deploy` command. Read more [here](https://serverless.com/framework/docs/providers/aws/guide/credentials#quick-setup).

4. Install NPM packages from Docker:

```
docker-compose run install
```

## Deploy:

Run deploy to AWS from Docker:

```
docker-compose run deploy
```

## More info:

This boilerplate uses [serverless-plugin-include-dependencies](https://github.com/dougmoscrop/serverless-plugin-include-dependencies) to reduce deployment package size.
