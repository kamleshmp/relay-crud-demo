import React from 'react'
import { graphql } from 'react-relay'
import Route from 'found/lib/Route'
import makeRouteConfig from 'found/lib/makeRouteConfig'

import App from './App'
import HomePage from '../pages/home/Home'
import EditPage from '../pages/post/EditPage'
import LoginPage from '../pages/user/Login'
import RegisterPage from '../pages/user/Register'
import CreatePage from '../pages/user/CreatePage'
import Pages, { PAGE_COUNT } from '../pages/user/Pages'

const appQuery = graphql`query Routes_App_Query { viewer { ...App_viewer } }`
const homepQuery = graphql`query Routes_Home_Query { viewer { ...Home_viewer } }`
const pagesQuery = graphql`query Routes_Pages_Query ($afterCursor: String, $count: Int!) { viewer { ...Pages_viewer } }`
const editPageQuery = graphql`query Routes_EditPage_Query ($pageId: String!) { viewer { ...EditPage_viewer } }`
const loginQuery = graphql`query Routes_Login_Query { viewer { ...Login_viewer } }`
const registerQuery = graphql`query Routes_Register_Query { viewer { ...Register_viewer } }`
const createPageQuery = graphql`query Routes_CreatePage_Query { viewer { ...CreatePage_viewer } }`

export default makeRouteConfig(
  <Route
    path="/"
    query={appQuery}
    // we use the render method instead of Component here to always display Header
    // and Navigation even if the data has not been fetched yet
    render={({ match, ownProps, props }) =>
      <App {...match} {...ownProps} {...props} isLoading={!props} />}
  >
    <Route Component={HomePage} query={homepQuery} />

    <Route
      path="pages"
      Component={Pages}
      query={pagesQuery}
      prepareVariables={params => ({
        ...params,
        count: PAGE_COUNT,
        afterCursor: null,
      })}
    />

    <Route
      path="page/:pageId/edit"
      Component={EditPage}
      query={editPageQuery}
    />

    <Route path="login" Component={LoginPage} query={loginQuery} />
    <Route path="register" Component={RegisterPage} query={registerQuery} />

    <Route
      path="user/page/create"
      Component={CreatePage}
      query={createPageQuery}
    />
  </Route>,
)
