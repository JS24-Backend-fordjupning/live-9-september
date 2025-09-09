import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  const { isbn } = event.pathParameters;

  const command = new QueryCommand({
    TableName: "js24BookLibraryTable",
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": { S: `BOOK#${isbn}` },
      ":sk": { S: "REVIEW#" },
    },
  });

  const reviews = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      reviews,
    }),
  };
};
