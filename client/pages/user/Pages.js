import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createPaginationContainer, graphql } from 'react-relay'

import PageList from '../../components/user/PageList'

export const PAGE_COUNT = 6

const Pages = ({ viewer, router, relay }) => (
  <div>
    <PageList
      pages={viewer.pages.edges}
      hasMore={relay.hasMore()}
      editPage={id => router.push(`/page/${id}/edit`)}
      onMore={() => relay.isLoading() || relay.loadMore(PAGE_COUNT)}
    />
  </div>
)

Pages.propTypes = {
  relay: PropTypes.shape({
    hasMore: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
  }).isRequired,
  router: routerShape.isRequired,
  viewer: PropTypes.shape({
    pages: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
}

export default createPaginationContainer(
  Pages,
  graphql`
    fragment Pages_viewer on Viewer {
      pages (after: $afterCursor first: $count) @connection(key: "Pages_pages") {
        pageInfo {
          hasNextPage
          endCursor
        },
        edges {
          node {
            id
            ...PageListItem_page
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.pages
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }) {
      return {
        afterCursor: cursor,
        count,
      }
    },
  },
)
