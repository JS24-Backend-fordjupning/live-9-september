import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  const review = JSON.parse(event.body); // { ISBN, memberId, rating, text }

  const commandForBook = new PutItemCommand({
    TableName: "js24BookLibraryTable",
    Item: {
      pk: { S: `BOOK#${review.isbn}` },
      sk: { S: `REVIEW#MEMBER#${review.memberId}` },
      rating: { S: review.rating },
      text: { S: review.text },
    },
  });

  const commandForMember = new PutItemCommand({
    TableName: "js24BookLibraryTable",
    Item: {
      pk: { S: `MEMBER#${review.memberId}` },
      sk: { S: `REVIEW#BOOK#${review.isbn}` },
      rating: { S: review.rating },
      text: { S: review.text },
    },
  });

  await client.send(commandForBook);
  await client.send(commandForMember);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "review added!",
    }),
  };
};
