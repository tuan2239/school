import 'dotenv/config';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import schema from './schema';
import resolvers from './resolvers';
import models from './models';
import jwt from "jsonwebtoken";

const app = express();

const getMe = async req => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }
};

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req }) => {
            if (req) {
                const me = await getMe(req);
                return {
                    models,
                    me,
                    secret: process.env.SECRET
                };
            }
        }
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
