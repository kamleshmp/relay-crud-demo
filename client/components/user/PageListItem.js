import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import PropTypes from 'prop-types'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'

const PageListItem = ({ page, deletePage, editPage }) => (
  <TableRow key={page.id} >
    <TableRowColumn>{page.title}</TableRowColumn>
    <TableRowColumn>{page.linkText}</TableRowColumn>
    <TableRowColumn >{page.slug}</TableRowColumn>
    <TableRowColumn><FlatButton label="Edit" onClick={editPage} /></TableRowColumn>
    <TableRowColumn><FlatButton label="Delete" onClick={deletePage} /></TableRowColumn>
  </TableRow>
)

PageListItem.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  deletePage: PropTypes.func.isRequired,
  editPage: PropTypes.func.isRequired,
}

export default createFragmentContainer(
  PageListItem,
  graphql`
    fragment PageListItem_page on Page {
      title
      slug
      linkText
    }
  `,
)
