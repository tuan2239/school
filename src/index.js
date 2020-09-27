import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: { models }
    });

    server.applyMiddleware({ app });

    await mongoose.connect('mongodb://localhost:27017/school-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Database Connected'))
        .catch(err => console.log(err));

    app.listen({ port: 4000 }, () => {
        console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
startServer();
