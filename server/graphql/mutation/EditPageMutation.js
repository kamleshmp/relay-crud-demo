import { GraphQLNonNull, GraphQLString } from 'graphql'
import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
  fromGlobalId, 
} from 'graphql-relay'

import UserType from '../type/UserType'
import { PageConnection } from '../type/PageType'

export default mutationWithClientMutationId({
  name: 'EditPage',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
    linkText: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    pageEdge: {
      type: PageConnection.edgeType,
      resolve: async (newPage, args, { db }) => {
        const pages = await db.getPages().then((allpages)=> {
          return allpages;
        });
        const res = {};
        res.cursor = cursorForObjectInConnection(pages, newPage);
        res.node = newPage
        return res
    },
    },
    user: {
      type: UserType,
      resolve: (newPage, args, { db }, tokenData) =>
        db.getUserById(tokenData.userId),
    },
  },
  mutateAndGetPayload: (data, { db }, { rootValue: { tokenData } }) =>
    db.editPage(fromGlobalId(data.id).id, data, tokenData),
})
