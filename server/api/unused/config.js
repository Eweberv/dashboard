const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    [Op.or]: [{database: process.env.DB_NAME}, {database: 'dashboard'}],
    [Op.or]: [{user: process.env.DB_USER}, {user: 'dashboard'}],
    [Op.or]: [{password: process.env.DB_PASS}, {password: 'dashboard'}],
    options: {
      dialect: process.env.Dialect || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: '.dashboard.sqlite',
      // Fix warning string operators deprecated
      operatorsAliases: false
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  GITHUB_CLIENT_ID: 'd0a0cfce279eab7d79ec',
  GITHUB_CLIENT_SECRET: '517d3e56da2149cf6b44c53d088c4cb98c32b587',

  OPENWEATHER_APPID: '15292cc85b1cbafe361fc7596f9b62f9',

  STEAM_KEY: 'B971C62FEFEB9E6EBE3C877EB24E236E',

  NOMICS_APPID: 'c59e8de864196b5734805fa4189603e4'
}