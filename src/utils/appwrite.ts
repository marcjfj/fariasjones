import { Client, Databases } from "appwrite";

const client = new Client();

const server = {
  endpoint: import.meta.env.PUBLIC_AW_ENDPOINT,
  project: import.meta.env.PUBLIC_AW_PROJECT,
  emailCollection: import.meta.env.PUBLIC_AW_EMAIL_COLLECTION,
  database: import.meta.env.PUBLIC_AW_DATABASE,
};

const database = new Databases(client);

client.setEndpoint(server.endpoint).setProject(server.project);

export { client, server, database };
