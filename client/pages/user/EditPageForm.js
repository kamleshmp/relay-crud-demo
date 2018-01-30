import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { routerShape } from 'found/lib/PropTypes'
import EditPageMutation from '../../mutation/EditPageMutation'
import styles from '../user/CreatePage.css'

class EditPageForm extends React.Component {
  static propTypes = {
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      linkText: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    router: routerShape.isRequired,
    relay: PropTypes.shape({
      environment: PropTypes.any.isRequired,
    }).isRequired,
  }

  constructor() {
    super()
    this.state = {
      canSubmit: false,
    }
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    })
  }

  createPage = ({ title, slug, linkText }) => {
    const environment = this.props.relay.environment

    EditPageMutation.commit({
      environment,
      input: { id: this.props.page.id, title, slug, linkText },
      onCompleted: () => this.props.router.push('/pages'),
      onError: errors => console.error('Creating page Failed', errors[0]),
    })
  }

  render() {
    return (
      <div className={styles.content}>
        <h2>Add new page</h2>

        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onSubmit={this.createPage}
          className={styles.form}
        >

          <FormsyText
            value={this.props.page.title}
            name="title"
            floatingLabelText="Title"
            fullWidth
            validations="isWords"
            validationError="Please enter a title"
            required
          />

          <FormsyText
            value={this.props.page.slug}
            name="slug"
            floatingLabelText="slug"
            fullWidth
            validations="isWords"
            validationError="Please enter a slug"
            required
          />

          <FormsyText
            value={this.props.page.linkText}
            name="linkText"
            floatingLabelText="linkText"
            fullWidth
            validations="isWords"
            validationError="Please enter a linkText"
            required
          />

          <RaisedButton
            type="submit"
            label="Save page"
            secondary
            fullWidth
            style={{ marginTop: 20 }}
            disabled={!this.state.canSubmit}
          />

        </Formsy.Form>

      </div>
    )
  }
}

const container = createFragmentContainer(
  EditPageForm,
  graphql`
    fragment EditPageForm_viewer on Viewer {
      canPublish
    }
  `,
)

export default container
