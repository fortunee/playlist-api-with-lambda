import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as crypto from "crypto";

// Generate a unique ID with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initializing DynamoDB SDK
const documentClient = new DocumentClient();

export const handler = async (event: any) => {
  const { title } = JSON.parse(event.body);

  try {
    const params = {
      TableName: process.env.PLAYLIST_TABLE || "PlaylistTable",
      Item: {
        id: generateUUID(),
        title,
        episodes: [],
      },
    };
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
