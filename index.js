const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      Sequelize = require('sequelize');

var app = express(),
    sequelize = new Sequelize('Jessica', 'Jessica', '', { dialect: 'postgres' });

var postsRouter = require('./routes/posts');

var db = require('./models');

var post = sequelize.define('post', {
  title: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  author: Sequelize.STRING,
  description: Sequelize.TEXT
});

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.redirect('/posts');
});

app.get('/posts', (request, response) => {

 db.Post.findAll({ order: [['createdAt', 'DESC']]
}).then((posts) => {
    response.render('posts/index', { posts: posts });
  });
});

app.post('/posts', (request, response) => {
  post.create(request.body).then(() => {
    response.redirect('/posts');
  });
});

app.get('/posts/new', (request, response) => {
  response.render('posts/new');
});

app.use('/posts', postsRouter);

app.post('/comments', (req, res) => {
  db.Comment.create(req.body).then((comment) => {
    return comment.getPost().then((post) => {
      res.redirect('/' + post.slug);
    });
  });
});

sequelize.sync().then(() => {
  console.log('Connected to database');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
