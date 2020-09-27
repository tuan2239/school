export default {
    Query: {
        users: (_, { }, { models }) => {
            return models.User.find()
        }
    },
    Mutation: {
        signUp: async (_, { name, email, passwordHash }, { models }) => {
            const aUser = new models.User({ name, email, passwordHash });
            await aUser.save();
            return aUser;
        }
    }
};
