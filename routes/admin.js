var express = require('express'),
    db = require('../models'),
    router = express.Router();

//to see admin panel, users must be logged in

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

//redirect unlogged-in users to log in pages

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/posts');
  }

  res.render('login');
});


//gets home page of logged-in admin panel
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


router.get('/my-posts', (req, res) => {
  db.Post.findById(req.session.user.id).then((userPosts) => {
    var userPosts = [];
// if req.session.user.id === Post.UserId then push Post to userPosts
      res.render('posts/my-posts', { userPosts: userPosts, user: req.session.user });
    }).catch((error) => {
      throw error;
    });
  });


// router.get('/my-posts', (req, res) => {
//   db.Post.findById(req.session.user.id, {
//     where: {
//       post.UserId: req.session.user.id
//     }
//   }).then((userPosts) => {
//     // if req.session.user.id === Post.UserId then push Post to userPosts
//       res.render('posts/my-posts', { userPosts: userPosts, user: req.session.user });
//     }).catch((error) => {
//       throw error;
//     });
//   });

//post route defined
// app.post('/posts/:id/comments', (req, res) => {
//   //post in database find by id // current page post id then posts
//   db.Post.findById(req.params.id).then((post) => {
// // declare var as inside of comment text box
//     var comment = req.body;
//     // the comment id is equal to current post id
//     comment.PostId = post.id;
//     //create the comment
//     db.Comment.create(comment).then(() => {
//       //submit data and refresh page
//       res.redirect('/' + post.slug);
//         });
//   });
// });

var findUserPostsPosts = function() {
for (i = 0; i < db.Post.length; i++) {
    console.log(db.Post.length);
    var thisUserPosts = [];
    if (db.Post.UserId === UserId) {
      thisUserPosts.push(db.Post.length[i]);
    }
    return user;
}
}
console.log("beh");





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

//posts blogpost to db
router.post('/posts', (req, res) => {
  console.log("does this bit work?");
  db.Post.create(req.body).then((post) => {
    res.redirect('/' + post.slug);
    }).catch((error) => {
      console.log(error);
      res.render('posts/new', { errors: error.errors, user: req.session.user });

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
  }).catch((error) => {
    res.render('posts/new', { errors: error.errors });
  })
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
