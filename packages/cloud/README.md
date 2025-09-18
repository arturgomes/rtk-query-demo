# Cloud API Package

This package provides AWS Lambda-based serverless API endpoints using DynamoDB for data persistence. It mirrors the functionality of the local development API but is designed for production deployment.

## Environment Setup

1. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```

2. Configure your AWS credentials and environment variables:
   - `AWS_REGION`: AWS region for deployment (default: us-east-1)
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `DYNAMODB_POSTS_TABLE`: DynamoDB table name for posts
   - `DYNAMODB_USERS_TABLE`: DynamoDB table name for users

## Available Scripts

- `yarn build` - Compile TypeScript to JavaScript
- `yarn dev` - Run locally with Serverless Offline
- `yarn deploy` - Deploy to AWS
- `yarn remove` - Remove deployment from AWS
- `yarn seed` - Seed DynamoDB with initial data
- `yarn lint` - Run ESLint

## Deployment

1. Build the project:
   ```bash
   yarn build
   ```

2. Deploy to AWS:
   ```bash
   yarn deploy
   ```

3. Seed the database with initial data:
   ```bash
   yarn seed
   ```

## API Endpoints

### Posts
- `GET /posts` - List all posts
- `GET /posts/{id}` - Get specific post
- `POST /posts` - Create new post
- `PATCH /posts/{id}` - Update post
- `DELETE /posts/{id}` - Delete post
- `POST /posts/reset` - Reset posts to original data
- `POST /posts/{id}/upvote` - Upvote a post
- `POST /posts/{id}/downvote` - Downvote a post
- `GET /posts/{id}/votes` - Get vote data for a post

### Users
- `GET /users` - List all users
- `GET /users/{id}` - Get specific user
- `POST /users` - Create new user
- `PATCH /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

## Architecture

- **Runtime**: Node.js 20.x
- **Database**: AWS DynamoDB
- **Framework**: Serverless Framework
- **Language**: TypeScript
- **Deployment**: AWS Lambda + API Gateway

## Local Development

To run the cloud API locally for testing:

```bash
# Install dependencies
yarn install

# Start local development server
yarn dev
```

This will start the API using Serverless Offline on `http://localhost:3000`.