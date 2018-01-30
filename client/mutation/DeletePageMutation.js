import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation DeletePageMutation($input: DeletePageInput!) {
    deletePage(input: $input) {
      pageEdge {
        node {
          id
        }
      }
    }
  }
`

function commit({ environment, input, onCompleted, onError }) {
  const variables = { input }
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError,
  })
}
export default {
  commit,
}
