export default {
    Query: {
        users: (_, { }, { models }) => {
            return models.User.find()
        }
    },
    Mutation: {
        signUp: async (_, { name, email, passwordHash, phone }, { models }) => {
            const aUser = new models.User({ name, email, passwordHash, phone });
            await aUser.save();
            return aUser;
        }
    }
};
