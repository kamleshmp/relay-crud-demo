import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { createToken, decodeToken } from '../../authentication'
import { ROLES, ERRORS } from '../../config'

import UserType from '../type/UserType'

export default mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async ({ email, password }, { db }, { rootValue }) => {
    let userData = {};
    await db.getUserWithCredentials(email, password).then((user) =>{
      // set session token so that user is authenticated on next requests via a cookie
      if (!user) {
        throw new Error(ERRORS.WrongEmailOrPassword)
      }
      if (user) {
        userData = user;
        /* eslint-disable no-param-reassign */
        rootValue.session.token = createToken(user)
        rootValue.tokenData = decodeToken(rootValue.session.token)
        /* eslint-enable no-param-reassign */
      } 
    })

    return { userData }
  },
})
