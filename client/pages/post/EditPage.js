import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { routerShape } from 'found/lib/PropTypes'
import EditPageForm from '../user/EditPageForm'

const EditPage = ({ viewer, router }) => (
  <div>
    <EditPageForm
      page={viewer.page}
      router={router}
    />
  </div>
)

EditPage.propTypes = {
  router: routerShape.isRequired,
  viewer: PropTypes.shape({
    page: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      linkText: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default createFragmentContainer(
  EditPage,
  graphql`
    fragment EditPage_viewer on Viewer {
      page (pageId: $pageId) {
        id
        title
        slug
        linkText
      }
    }
  `,
)
