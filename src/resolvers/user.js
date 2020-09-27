
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

const createToken = async (user, secret, expiresIn) => {
    const { id, email, username, role } = user;
    return await jwt.sign({ id, email, username, role }, secret, {
        expiresIn,
    });
};

export default {
    Query: {
        users: (_, { }, { models }) => {
            return models.User.find()
        }
    },
    Mutation: {
        signUp: async (_, input, { models, secret }) => {
            const aUser = new models.User(input.signUpInput);
            await aUser.save();
            return {
                token: createToken(aUser, secret, '120m'),
            };
        },
        signIn: async (_, { email, password }, { models, secret }) => {
            email = email.toLowerCase();
            const user = await models.User.findByLogin(email);

            if (!user) {
                throw new UserInputError(
                    'No user found with this login credentials.',
                );
            }

            const isValid = await user.validatePassword(password);

            if (!isValid) {
                throw new AuthenticationError('Invalid password.');
            }

            return {
                token: createToken(user, secret, '120m'),
            };
        }
    }
};
