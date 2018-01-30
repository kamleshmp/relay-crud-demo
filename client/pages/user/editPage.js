import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'

import styles from './editPage.css'

const EditPage = ({ viewer }) => (
  <div>
    <div className={styles.container}>
      <h1 className={styles.title}>{viewer.page.title}</h1>
      <div className={styles.user}>
        by {viewer.page.creator.firstName} {viewer.page.creator.lastName}
      </div>

      <div>{viewer.page.slug}</div>
      <div>{viewer.page.linkText}</div>
    </div>
  </div>
)

EditPage.propTypes = {
  viewer: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      linkText: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
}

export default createFragmentContainer(
  EditPage,
  graphql`
    fragment EditPage_viewer on Viewer {
      page (pageId: $pageId) {
        title
        slug
        linkText
        creator {
          firstName
          lastName
        }
      }
    }
  `,
)
