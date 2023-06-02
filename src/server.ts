import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AppointmentResolver } from "./resolver/appointment";
import path from "node:path";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [AppointmentResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const serve = new ApolloServer({ schema });

  const { url } = await serve.listen();

  console.log(`Running on ${url}`);
}

bootstrap();
