var express = require('express'),
    db = require('../models'),
    router = express.Router();

//block unlogged in user viewing admin panel

var requireUser = (req, res, next) => {
  if (req.path === '/') {
    return next();
  }

  if (req.session.user) {
    next();
  } else {
    res.redirect('/admin');
  }
};


router.use(requireUser);

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/posts');
  }

  res.render('login');
});


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
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((userPosts) => {
    res.render('posts/my-posts', { userPosts: userPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});

for (i = 0; i < db.Post.length; i++) {
    console.log(db.Post.length);
    var thisUserPosts = [];
    if (db.Post.UserId === UserId) {
      thisUserPosts.push(db.Post.length[i]);
    }
}

console.log(thisUserPosts);


// router.get('/my-posts', (req, res) => {
//   var userPosts = [posts];
//   userPosts = post.UserId === req.session.userId
//   db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((userPosts) => {
//     res.render('posts/my-posts', { userPosts: userPosts, user: req.session.user });
//   }).catch((error) => {
//     throw error;
//   });
// });


//gets new page
router.get('/posts/new', (req, res) => {
  res.render('posts/new', { user: req.session.user });
});

//gets edit post page
router.get('/posts/:id/edit', (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id
    }
  }).then((post) => {
    res.render('posts/edit', { post: post, user: req.session.user });
  });
});

//gets a show-post page
router.post('/posts', (req, res) => {
  db.Post.create(req.body).then((post) => {
    res.redirect('/' + post.slug);
  });
});

//edits post data
router.put('/posts/:id', (req, res) => {
  db.Post.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/admin/posts');
  });
});

//deletes post
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
