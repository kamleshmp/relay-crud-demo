import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import CreatePageMutation from '../../mutation/CreatePageMutation'
import styles from './CreatePage.css'

class CreatePage extends React.Component {
  static propTypes = {
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

    CreatePageMutation.commit({
      environment,
      input: { title, slug, linkText },
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
            name="title"
            floatingLabelText="Title"
            fullWidth
            validations="isWords"
            validationError="Please enter a title"
            required
          />

          <FormsyText
            name="slug"
            floatingLabelText="slug"
            fullWidth
            validations="isWords"
            validationError="Please enter a slug"
            required
          />

          <FormsyText
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
  CreatePage,
  graphql`
    fragment CreatePage_viewer on Viewer {
      canPublish
    }
  `,
)

export default container
