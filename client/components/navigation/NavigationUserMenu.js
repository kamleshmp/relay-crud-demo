import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'

import MenuItem from 'material-ui/MenuItem'

import LogoutMutation from '../../mutation/LogoutMutation'

function onLogout(environment) {
  LogoutMutation.commit({
    environment,
    onCompleted: () =>
      // eslint-disable-next-line no-undef
      location.assign(`${location.protocol}//${location.host}`),
    onError: errors => console.error('logout failed', errors[0]),
  })
}

const NavigationUserMenu = ({ viewer, navigateTo, relay }) => {
  const {
    isLoggedIn,
  } = viewer || {}

  if (isLoggedIn) {
    return (
      <span>
        <MenuItem onClick={() => navigateTo('/user/page/create')}>
          Add Page
        </MenuItem>
        <MenuItem onClick={() => navigateTo('/pages')}>
          My Pages
        </MenuItem>
        <MenuItem onClick={() => onLogout(relay.environment)}>
          Logout
        </MenuItem>
      </span>
    )
  }

  return <MenuItem onClick={() => navigateTo('/login')}>Login</MenuItem>
}

NavigationUserMenu.propTypes = {
  relay: PropTypes.shape({
    environment: PropTypes.any.isRequired,
  }).isRequired,
  navigateTo: PropTypes.func.isRequired,
  viewer: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
}

NavigationUserMenu.defaultProps = {
  viewer: {},
}

export default createFragmentContainer(
  NavigationUserMenu,
  graphql`
    fragment NavigationUserMenu_viewer on Viewer {
      isLoggedIn
    }
  `,
)
