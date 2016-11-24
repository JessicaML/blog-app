var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();

// var requireUser = (req, res, next) => {
//   if (req.path === '/admin') {
//     return next();
//   }
//   if (req.session.user) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// };
//
// router.use(requireUser);

router.get('/', (req, res) => {
  res.redirect('/posts');
});


router.use(bodyParser.urlencoded({ extended: false}));

//gets home page
router.get('/posts', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
    res.render('posts/index', { blogPosts: blogPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});

//gets userPosts

//if statement to find only logged-in user posts

router.get('/my-posts', (req, res) => {
  // db.Post.findUserPosts({ order: [['createdAt', 'DESC']] }).then((userPosts) => {
    res.render('posts/user-posts')
  // }).catch((error) => {
  //   throw error;
  // });
});


//gets new page
router.get('/posts/new', (req, res) => {
  res.render('posts/new');
});

//get register page
router.get('/users/new', (req, res) => {
  res.render('users/new');
});

//get login page
router.get('/login', (req, res) => {
  res.render('login');
});

//gets edit pg
router.get('/posts/:id/edit', (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id
    }
  }).then((post) => {
    res.render('posts/edit', { post: post });
  });
});

//posts blogpost to db
router.post('/posts', (req, res) => {
  db.Post.create(req.body).then((post) => {
    res.redirect('/' + post.slug);
  }).catch((error) => {
    console.log(error);
    res.render('posts/new', { errors: error.errors });
  });
});

//posts comment
router.post('/posts/:id/comments', (req, res) => {
  console.log(req.params.content);
  console.log(db.comment);
  db.Post.findById(req.params.id).then((post) => {
    var comment = req.body;
    comment.PostId = post.id;

    db.Comment.create(comment).then(() => {
      res.redirect('/' + post.slug);
    });
  });
});

// puts edits post to db
router.put('/posts/:id', (req, res) => {
  db.Post.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/admin/posts');
  });
});


//deletes  blog data in db
router.delete('/posts/:id', (req, res) => {
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/admin/posts');
  });
});

module.exports = router;
