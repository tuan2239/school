import { combineResolvers, skip } from 'graphql-resolvers';
import { ForbiddenError } from "apollo-server-express";

export const isAuthenticated = (_, __, { me }) => me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin =  combineResolvers(
    isAuthenticated,
    (_, __, { me: { role } }) => role === 'admin' ? skip : new ForbiddenError('Not authenticated as admin.')
);