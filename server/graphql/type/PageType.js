import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField, connectionDefinitions } from 'graphql-relay'

import UserType from './UserType'

const PageType = new GraphQLObjectType({
  name: 'Page',
  description: 'A page',
  fields: () => ({
    id: globalIdField('Page'),
    title: {
      type: GraphQLString,
      description: 'The pages title',
    },
    slug: {
      type: GraphQLString,
      description: 'The pages slug',
    },
    linkText: {
      type: GraphQLString,
      description: 'The pages linkText',
    },
  }),
})

export const PageConnection = connectionDefinitions({
  name: 'Page',
  nodeType: PageType,
})

export default PageType
