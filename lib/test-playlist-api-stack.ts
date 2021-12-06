import * as core from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class TestPlaylistApiStack extends core.Stack {
  constructor(scope: core.App, id: string, props?: core.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "PlaylistTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING},
      tableName: "PlaylistTable",
    });

    const playlistHandler = new lambda.Function(this, "PlaylistHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "create-playlist.handler",
      code: lambda.Code.fromAsset("functions"),
      environment: {
        PLAYLIST_TABLE: table.tableName,
      },
    });

    table.grantReadWriteData(playlistHandler);

    const playlistApi = new apigateway.RestApi(this, "PlaylistApi");

    playlistApi.root
      .resourceForPath("/playlists")
      .addMethod("POST", new apigateway.LambdaIntegration(playlistHandler));

    new core.CfnOutput(this, "PlaylistApiUrl", {
      value: playlistApi.url ?? "Something went wrong!",
    });
  }
}
