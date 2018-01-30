import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'
import {
  connectionArgs,
  connectionFromArray,
  fromGlobalId,
} from 'graphql-relay'

import UserType from './UserType'
import PageType, { PageConnection } from './PageType'

import { ROLES } from '../../config'

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    isLoggedIn: {
      type: GraphQLBoolean,
      resolve: (obj, args, { db }, { rootValue: { tokenData } }) =>
        tokenData.role === ROLES.reader ||
        tokenData.role === ROLES.publisher ||
        tokenData.role === ROLES.admin,
    },
    canPublish: {
      type: GraphQLBoolean,
      resolve: (obj, args, { db }, { rootValue: { tokenData } }) =>
        tokenData.role === ROLES.admin || tokenData.role === ROLES.publisher,
    },
    user: {
      type: UserType,
      // tokenData origins from a cookie containing session data
      // and is set in server/authentication.js
      resolve: (obj, args, { db }, { rootValue: { tokenData } }) =>
        db.getUserById(tokenData.userId),
    },
    pages: {
      type: PageConnection.connectionType,
      args: connectionArgs,
      resolve: async (obj, args, { db }, { rootValue: { tokenData }}) => {
        const pages = await db.getPages(tokenData.userId).then((allpages)=> {
          return allpages;
        });
        return connectionFromArray(pages, args)
      }
    },
    page: {
      type: PageType,
      args: {
        pageId: { type: GraphQLString },
      },
      resolve: async(obj, { pageId }, { db }) => {
         const page = await db.getPage(fromGlobalId(pageId).id).then((pagedata)=> {
          return pagedata;
        });
        return page; 
      }
    },
  }),
})
