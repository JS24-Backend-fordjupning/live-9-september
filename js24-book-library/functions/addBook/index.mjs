import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  const book = JSON.parse(event.body); // { ISBN, title, author }

  const command = new PutItemCommand({
    TableName: "js24BookLibraryTable",
    Item: {
      pk: { S: `BOOK#${book.isbn}` },
      sk: { S: "PROFILE" },
      title: { S: book.title },
      author: { S: book.author },
    },
  });

  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Book added!",
    }),
  };
};
