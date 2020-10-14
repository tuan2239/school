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
        updateChild: async (_, { child }, { models }) => {
            return await models.Children.findByIdAndUpdate(
              child.id,
              child,
              { new: true },
            );
          },
        removeChild: async (_, { id }, { models, me }) => {
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
