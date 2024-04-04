import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamodbClient = new DynamoDBClient({});
const clientsTable = process.env["CLIENTS_TABLE_NAME"] || ""

export const hendle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
const connectionId = event.requestContext.connectionId as string
const routeKey = event.requestContext.routeKey as string;
const body = event.body || "";

  switch(routeKey) {
    case "$connect":
      return handleConnect(connectionId);
    case "$disconnect":
    case "msg":
  }

  return {
    statusCode: 200,
    body: "",
  };
};

const handleConnect = async (connectionId: string): Promise<APIGatewayProxyResult> => {
  await dynamodbClient.send(
    new PutItemCommand({
        TableName: clientsTable, 
        Item: {
          connectionId: {
            S: connectionId,
          },
        },
    }),
  );

  return {
    statusCode: 200,
    body: "",
  }
};
const handleDisconnect = async (connectionId: string): Promise<APIGatewayProxyResult> => {};
const handleMsg = async (thisConnectionId: string): Promise<APIGatewayProxyResult> => {};
