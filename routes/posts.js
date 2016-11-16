const express = require('express'),
      Sequelize = require('Sequelize'),
      router = express.Router();

const sequelize = new Sequelize('Jessica', 'Jessica', '', { dialect: 'postgres' });

var post = sequelize.define('post', {
  title: Sequelize.STRING,
  imageURL: Sequelize.STRING, //255 bytes
  author: Sequelize.STRING,
  description: Sequelize.TEXT // text use for larger text data
});

router.get('/', (request, response) => {
  post.findAll({ order: 'id ASC' }).then((posts) => {
    response.render('posts/index', { posts: posts });
  });
});

router.post('/', (request, response) => {
  if (request.body.title) {
    post.create(request.body).then(() => {
      response.redirect('/posts');
    });
  } else {
    response.redirect('posts/new');
  }
});

router.get('/new', (request, response) => {
  response.render('posts/new');
});

router.get('/:id', (request, response) => {
  post.findById(request.params.id).then((post) => {
    response.render('posts/show', { post: post, comment: comment });
  });
});

router.get('/:id/edit', (request, response) => {
  post.findById(request.params.id).then((post) => {
    response.render('posts/edit', { post: post });
  });
});

router.delete('/:id', (request, response) => {
  post.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/posts');
  });
});

router.put('/:id', (request, response) => {
  post.update(request.params, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    respose.redirect('/posts/' + request.params.id);
  });
});

module.exports = router;
