const AWS = require("aws-sdk");
const crypto = require("crypto");

// Generate a unique ID with no external dependencies
const generateUUID = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Initializing DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

export default async (event: any) => {
  const { title } = JSON.parse(event.body);

  const params = {
    TableName: 'PlaylistTable',
    Item: {
      id: generateUUID(),
      title,
      episodes: [],
    },
  };

  try {
    await documentClient.put(params).promise();

    return {
      statusCode: 200,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
