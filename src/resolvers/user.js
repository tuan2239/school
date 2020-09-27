export default {
    Query: {
        users: (_, { }, { models }) => {
            return models.User.find()
        }
    },
    Mutation: {
        signUp: async (_, input, { models }) => {
            const aUser = new models.User(input.signUpInput);
            await aUser.save();
            return aUser;
        }
    }
};
