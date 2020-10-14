import { isAuthenticated } from "./authorization";

export default {
    Query: {
        children: (_, { }, { models }) => {
            return models.Children.find()
        }
    },
    Mutation: {
        // này để khi nào đăng nhập rồi mới dc làm chuyện đó ^^
        // addChild: combineResolvers(
        //   isAuthenticated,
        //   async (_, { name, grade }, { models }) => {
        //     const achild = new models.Children({ name, grade });
        //     await achild.save();
        //     return achild;
        // }),
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
