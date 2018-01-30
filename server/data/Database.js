import { ROLES, ERRORS } from '../../config'
import models from '../data/models';
const User = models.User;
const Page = models.Page;
const Creator = User;
import { isLoggedIn, canPublish } from '../authentication'
import _ from 'lodash';

export default class Database {

  createPage = async ({ creatorId, title, slug, linkText }, { userId, role }) => {
    const newPage = await Page.create({userId, slug, title, linkText }).then(page => {
      return page.dataValues;
    }).catch(error => {
      console.log('eeeeeeeeeeeeeeeeeeeee.', error);
    });
    return newPage
  }

  editPage = async (id, { title, slug, linkText }, { userId, role }) => {
    const page = await Page.findOne({where: {id: id, userId: userId } }).then((page)=>{
        return page;
    });

    const updatedPage = await page.update({
      title, slug, linkText
    }).then((updatedPage) => {
      return updatedPage
    })
    return updatedPage;
  }

  deletePage = async (id , { userId, role }) => {
    const newPage = await Page.destroy({ where:{ id } }).then(page => {
      return {id};
    }).catch(error => {
      console.log('eeeeeeeeeeeeeeeeeeeee.', error);
    });
    return newPage
  }


  getPage = id => Page.findOne({ where: {id: id}, include:[User]}).then((page)=> {
    const tmpPage = page.toJSON();
    tmpPage.creator = page.User.toJSON();
    delete tmpPage.User
    return tmpPage
  });

  getPages = (userId) => Page.findAll({ where: {userId}, include:[User]}).then((pages)=> {
    const allpages = _.map(pages, (page)=>{
      let tmpPage = {};
      tmpPage = page.dataValues;
      tmpPage.creater = tmpPage.User.dataValues;
      delete tmpPage.creater.createdAt
      delete tmpPage.creater.updatedAt
      delete tmpPage.creater.password
      delete tmpPage.User;
      return tmpPage;
    })
    return allpages
  })

  getPageCreator = (page) => {
    // this is accessible by anyone so only return public data (no email etc.)
    const { firstName, lastName } = this.getUserById(page.creatorId)
    return { firstName, lastName }
  }

  getUserById = async (userId) => {
    const user = await User.findOne({ where: {id: userId} }).then((user)=> {
      return user;
    });
    return user;
  }

  getUserWithCredentials =  (email, password) => {
    return User.findOne({ where: {email: email, password: password} });
  }

  createUser = async ({ email, password, firstName, lastName, role }) => {
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      throw new Error(ERRORS.EmailAlreadyTaken)
    }

    const user = await User
    .build({ email: email, password: password, firstName: firstName,
     lastName: lastName, role: role || 'reader'})
    .save()
    .then(newUser => {
      return newUser;
    })
    .catch(error => {
      console.log('eeeeeeeeeeeeeeeeeeeee.', error);
    })
    return {user: user.dataValues};
  }
}
