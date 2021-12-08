import { DocumentClient } from "aws-sdk/clients/dynamodb";

const documentClient = new DocumentClient();

export const handler = async (event: any) => {
  const params = {
    TableName: process.env.PLAYLIST_TABLE || "PlaylistTable",
  };

  try {
    const { Items } = await documentClient.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(Items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
