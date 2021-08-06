const sequelize = require('..config/');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./users.json');
const blogData = require('./posts.json');
const commentData = require('./comments.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of blogData) {
    await BlogPost.create({
      ...post,
    });
  };

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  };

  process.exit(0);
};

seedDatabase();