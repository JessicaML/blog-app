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

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.redirect('/posts');
});

app.get('/posts', (request, response) => {

 db.post.findAll({ order: [['createdAt', 'DESC']]
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

app.get('/', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
    res.render('index', { blogPosts: blogPosts });
  });
});

app.get('/:slug', (req, res) => {
  db.Post.findOne({
    where: {
      slug: req.params.slug
    }
  }).then((post) => {
    return post.getComments().then((comments) => {
      res.render('posts/show', { post: post, comments: comments });
    });
  }).catch((error) => {
    res.status(404).end();
  });
});

sequelize.sync().then(() => {
  console.log('Connected to database');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
