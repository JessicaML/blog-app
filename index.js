const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      logger = require('morgan'),
      session = require('express-session');


var db = require('./models');

var app = express();

var adminRouter = require('./routes/admin');

var authRouter = require('./routes/authentication');

app.set('view engine', 'pug');

app.use('/admin', adminRouter);

app.use('/authentication', authRouter);

app.use(logger('dev'));

app.use(session({
   secret: 'our secret key',
   resave: true,
   saveUninitialized: true
 }));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// comment posted to db
app.post('/posts/:id/comments', (req, res) => {
  db.Post.findById(req.params.id).then((post) => {
    var comment = req.body;
    comment.PostId = post.id;
    db.Comment.create(comment).then(() => {
      res.redirect('/' + post.slug);
        });
  });
});


//gets homepage list of posts
app.get('/', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
    res.render('index', { blogPosts: blogPosts});
  });
});

//gets register page
// app.get('/register', (req, res) => {
//   if (req.session.user) {
//     res.redirect('/admin/posts');
//   }
//   res.render('users/new');
// });

app.get('/login', (req, res) => {
  res.render('login');
});

// app.post('/login', (req, res) => {
//   console.log(req.body.email);
//   console.log(req.session.user);
//   db.User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then((userInDB) => {
//     if (userInDB.password === req.body.password) {
//       req.session.user = userInDB;
//       res.redirect('/admin/posts');
//       console.log("this happened");
//       console.log(userInDB.password);
//     } else {
//       res.redirect('/login');
//     }
//   }).catch(() => {
//     res.redirect('/login');
//     console.log("this happened");
//
//   });
// });

//post user data for register
app.post('/users', (req, res) => {
  db.User.create(req.body).then((user) => {
    res.redirect('/');
  }).catch(() => {
    res.redirect('register');
  });
});

//
// app.get('/logout', (req, res) => {
//   req.session.user = undefined;
//   res.redirect('/');
// });


//get post show page
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

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Web server started at port 3000!');
  });
});
