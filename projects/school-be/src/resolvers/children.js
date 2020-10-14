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
        },
        updateChild: async (parent, { id, fund }, { models }) => {
            return await models.Fund.findByIdAndUpdate(
              id,
              children,
              { new: true },
            );
          },
        removeChild: async (parent, { id }, { models, me }) => {
            const children= await models.Children.findById(id);
    
            if (children) {
              await children.remove();
              return true;
            } else {
              return false;
            }
          }
        
    }
};
