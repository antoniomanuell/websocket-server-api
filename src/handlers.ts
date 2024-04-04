import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DeleteItemCommand, DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const responseOk = {
  statusCode: 200,
  body: "",
};

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
      return handleDisconnect(connectionId);
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

  return responseOk;
};
const handleDisconnect = async (connectionId: string): Promise<APIGatewayProxyResult> => {
  await dynamodbClient.send(
    new DeleteItemCommand({
        TableName: clientsTable, 
        Key: {
          connectionId: {
            S: connectionId,
          },
        },
    }),
  );

  return responseOk;
};
const handleMsg = async (thisConnectionId: string): Promise<APIGatewayProxyResult> => {};
