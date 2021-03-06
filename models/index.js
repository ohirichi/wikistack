const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/wikistack',{
  logging: false
});

const Page = db.define('page', {
  title: {
      type: Sequelize.STRING,
      allowNull: false
  },
  urlTitle: {
      type: Sequelize.STRING,
      allowNull: false
  },
  content: {
      type: Sequelize.TEXT,
      allowNull: false
  },
  status: {
      type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
}

},
{
  getterMethods: {
  route() {
    return ('/wiki/'+ this.getDataValue('urlTitle'));
  }
}
});

Page.beforeValidate(function(page, options) {
    page.urlTitle = page.title.split(' ').join('_');
});

const User = db.define('user', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
    }
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db: db,
  Page: Page,
  User: User
};
