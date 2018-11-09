const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

db.authenticate().
then(() => {
  console.log('connected to the database');
})


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail : true,

    }
  }
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl : true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: Sequelize.ENUM('open', 'closed')

});

module.exports = {Page, User, db};
