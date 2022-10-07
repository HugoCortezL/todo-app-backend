import "reflect-metadata"
import { ApolloServer } from 'apollo-server'
import "./database/connection"
import { buildSchema } from 'type-graphql'
import { UserResolver, ListResolver } from './graphql/resolvers'

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [UserResolver, ListResolver]
    })
    const server = new ApolloServer({
        schema
    })
    server.listen({ port: 4000 }, console.log("Server is running"))
}

bootstrap()