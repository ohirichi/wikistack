const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/wikistack');

const Page = sequelize.define('page', {
    title: Sequelize.STRING,
    urlTitle: Sequelize.TEXT,
    content: Sequelize.TEXT,
    status: Sequelize.INTEGER,
})

const User = sequelize.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.TEXT,
})