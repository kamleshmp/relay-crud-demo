import { GraphQLObjectType } from 'graphql'

import RegisterMutation from '../mutation/RegisterMutation'
import LoginMutation from '../mutation/LoginMutation'
import LogoutMutation from '../mutation/LogoutMutation'
import CreatePageMutation from '../mutation/CreatePageMutation'
import DeletePageMutation from '../mutation/DeletePageMutation'
import EditPageMutation from '../mutation/EditPageMutation'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    register: RegisterMutation,
    login: LoginMutation,
    logout: LogoutMutation,
    createPage: CreatePageMutation,
    deletePage: DeletePageMutation,
    editPage: EditPageMutation,
  }),
})
