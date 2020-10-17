import { isAuthenticated } from "./authorization";
import { combineResolvers } from 'graphql-resolvers';

export default {
  Query: {
    children: combineResolvers(
      isAuthenticated,
      (_, { }, { models }) => {
        return models.Children.find()
      }
    )
  },
  Mutation: {
    addChild: combineResolvers(
      isAuthenticated,
      async (_, { name, grade }, { models }) => {
        const achild = new models.Children({ name, grade });
        await achild.save();
        return achild;
      }),
    updateChild: combineResolvers(
      isAuthenticated,
      async (_, { child }, { models }) => {
        return await models.Children.findByIdAndUpdate(
          child.id,
          child,
          { new: true },
        );
    }),
    removeChild: combineResolvers(
      isAuthenticated,
      async (_, { id }, { models, me }) => {
        const children = await models.Children.findById(id);
  
        if (children) {
          await children.remove();
          return true;
        } else {
          return false;
        }
      }
    )

  }
};
