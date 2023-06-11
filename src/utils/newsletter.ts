import { ID } from "appwrite";
import { database, server } from "@utils/appwrite";

export const addSubscriber = async (email: string) => {
  const subscriber = await database.createDocument(
    server.database,
    server.emailCollection,
    ID.unique(),
    {
      email,
    }
  );
  return subscriber;
};
