var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));

//gets home page
router.get('/posts', (req, res) => {
  db.Post.findAll().then((blogPosts) => {
    res.render('posts/index', { blogPosts: blogPosts });
  }).catch((error) => {
    throw error;
  });
});

//gets new page
router.get('/posts/new', (req, res) => {
  res.render('posts/new');
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
  console.log("this works");
  db.Post.create(req.body).then((post) => {
    res.redirect('/' + post.slug);
  });
});

//posts edited blog data to db
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
