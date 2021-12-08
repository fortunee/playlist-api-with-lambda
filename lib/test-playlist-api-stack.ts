import {
  aws_apigateway as apigateway,
  aws_lambda as lambda,
  aws_dynamodb as dynamodb,
  StackProps,
  Stack,
  CfnOutput,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class TestPlaylistApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "PlaylistTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      tableName: "PlaylistTable",
    });

    const createPlaylistHandler = new lambda.Function(this, "CreatePlaylistHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "create-playlist.handler",
      code: lambda.Code.fromAsset("functions"),
      environment: {
        PLAYLIST_TABLE: table.tableName,
      },
    });

    const getPlaylistsHandler = new lambda.Function(this, "GetPlaylistsHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "get-playlist.handler",
      code: lambda.Code.fromAsset("functions"),
      environment: {
        PLAYLIST_TABLE: table.tableName,
      },
    });

    table.grant(createPlaylistHandler, "dynamodb:PutItem");
    table.grant(getPlaylistsHandler, "dynamodb:Scan");

    const playlistApi = new apigateway.RestApi(this, "PlaylistApi");

    const rootPath = playlistApi.root.addResource("playlists");
    rootPath.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createPlaylistHandler)
    );
    rootPath.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getPlaylistsHandler)
    );

    new CfnOutput(this, "PlaylistApiUrl", {
      value: playlistApi.url ?? "Something went wrong!",
    });
  }
}
