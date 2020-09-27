export default {
    Query: {
        children: (_, { }, { models }) => {
            return models.Children.find()
        }
    },
    Mutation: {
        addChild: async (_, { name, grade }, { models }) => {
            const achild = new models.Children({ name, grade });
            await achild.save();
            return achild;
        }
    }
};
