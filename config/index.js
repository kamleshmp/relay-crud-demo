module.exports = {
  port: 3000,
  db: {
    name: 'crud_app',
    user: 'postgres',
    password: 'postgres'
  },
  role: {
    admin: 2,
    normal: 1
  },
  token: {
    secret: 'react',
    expired: '1d'
  },
  errCode: {
    1000: 'User not exist',
    1001: 'Wrong email or password',
    1002: 'Permission denied',
    1004: 'User not exist',
  }
}