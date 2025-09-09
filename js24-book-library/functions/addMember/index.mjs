import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  const member = JSON.parse(event.body); // { memberId, name, city }

  const command = new PutItemCommand({
    TableName: "js24BookLibraryTable",
    Item: {
      pk: { S: `MEMBER#${member.memberId}` },
      sk: { S: "PROFILE" },
      name: { S: member.name },
      city: { S: member.city },
    },
  });

  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Member added!",
    }),
  };
};
