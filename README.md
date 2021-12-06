# playlist-api-with-lambda

A simple AWS Serverless APIs that provides a GET and POST endpoint for creating/reading a playlist data

# Deployment
### 1. Package with [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)

To package the app run the following command in root dir
```
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket {YOUR_BUCKET_NAME}
```

### 2. Deploy with [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)

To deploy the package run
```
sam deploy \
    --template-file packaged.yaml \
    --stack-name {YOUR_STACK_NAME} \
    --capabilities CAPABILITY_IAM
```
