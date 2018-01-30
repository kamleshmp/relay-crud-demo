import { GraphQLObjectType, GraphQLString } from 'graphql'
import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay'

import { PageConnection } from './PageType'

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    email: {
      description: 'the users email address',
      type: GraphQLString,
    },
    firstName: {
      description: 'the users first name',
      type: GraphQLString,
    },
    lastName: {
      description: 'the users last name',
      type: GraphQLString,
    },
    role: {
      description: 'the users role',
      type: GraphQLString,
    },
    pages: {
      type: PageConnection.connectionType,
      args: connectionArgs,
      resolve: (user, args, { db }, { rootValue: { tokenData } }) =>
        connectionFromArray(db.getPagesForCreator(tokenData), args),
    },
  },
})
