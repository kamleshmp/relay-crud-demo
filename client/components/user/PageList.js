import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table'
import { createFragmentContainer, graphql } from 'react-relay'
import PageListItem from './PageListItem'
import DeletePageMutation from '../../mutation/DeletePageMutation'

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    marginTop: 4,
  },
}

class PageList extends React.Component {
  static propTypes = {
    relay: PropTypes.shape({
      environment: PropTypes.any.isRequired,
    }).isRequired,
  }

  state = {
    width: 1000,
    deletedPage: [],
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', this.setContainerWidth)
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    window.removeEventListener('resize', this.setContainerWidth)
  }

  setContainerRef = (ref) => {
    this.container = ref
    this.setContainerWidth()
  }

  setContainerWidth = () => {
    if (this.container) {
      this.setState({ width: this.container.clientWidth })
    }
  }

  deletePage = ({ id }) => {
    console.log(id)
    const environment = this.props.relay.environment
    DeletePageMutation.commit({
      environment,
      input: { id },
      onCompleted: (res) => {
        const deletedPage = this.state.deletedPage
        deletedPage.push(res.deletePage.pageEdge.node.id)
        this.setState({ deletedPage })
      },
      onError: errors => console.error('Creating page Failed', errors[0]),
    })
  }

  render() {
    const { pages, editPage } = this.props
    const deletedPage = this.state.deletedPage
    return (
      <div ref={this.setContainerRef} style={styles.root}>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn tooltip="Page Title">Title</TableHeaderColumn>
              <TableHeaderColumn tooltip="Page LinkText">LinkText</TableHeaderColumn>
              <TableHeaderColumn tooltip="Page Slug">Slug</TableHeaderColumn>
              <TableHeaderColumn tooltip="Page Edit">Edit</TableHeaderColumn>
              <TableHeaderColumn tooltip="Page Delete">Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              pages.map(({ node }) => (
                deletedPage.indexOf(node.id) === -1 &&
                  <PageListItem
                    key={node.id}
                    page={node}
                    deletePage={() => this.deletePage(node)}
                    editPage={() => editPage(node.id)}
                  />
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

PageList.propTypes = {
  editPage: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  ),
}

PageList.defaultProps = {
  pages: [],
}


const container = createFragmentContainer(
  PageList,
  graphql`
    fragment DeletePage_viewer on Viewer {
      canPublish
    }
  `,
)

export default container
