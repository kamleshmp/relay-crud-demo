import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation EditPageMutation($input: EditPageInput!) {
    editPage(input: $input) {
      pageEdge {
        node {
          id
          title
          slug
          linkText
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
