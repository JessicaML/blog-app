const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      logger = require('morgan');


var db = require('./models');

var app = express();

var adminRouter = require('./routes/admin');

app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._metmethod-overridehod;
    delete req.body._method;
    return method;
  }
}));

app.use('/admin', adminRouter);

app.post('/comments', (req, res) => {
  db.Comment.create(req.body).then((comment) => {
    return comment.getPost().then((post) => {
      res.redirect('/' + post.slug);
    });
  });
});

app.get('/', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
    res.render('index', { blogPosts: blogPosts});
  });
});

app.get('/:slug', (req, res) => {
  db.Post.findOne({
    where: {
      slug: req.params.slug
    }
  }).catch((error) => {
    res.status(404).end();
  });
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Web server started at port 3000!');
  });
});
