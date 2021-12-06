const AWS = require('aws-sdk');
const crypto = require('crypto');

// Generate a unique ID with no external dependencies
const generateUUID = () => {
  return crypto.randomBytes(16).toString('hex');
}

// Initializing DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event,) => {
  const { title } = JSON.parse(event.body);

  const params = {
    TableName: process.env.PLAYLIST_TABLE || 'playlists',
    Item: {
      id: generateUUID(),
      title,
      episodes: [],
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };

    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }

}