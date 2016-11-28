var UserId = 1;

var Posts = [
    post1 = {
      id : 1,
      text: "bla bla"
    }, post2 = {
      id : 2,
      text: "ya ya"
    },
  ];

var findUserPosts = function(listOfObjects) {
  var thisUserPosts = [];
for (i = 0; i < Posts.length + 1; i++) {
    console.log(Posts.length);
    var thisUserPosts = [];
    if (Posts[i].id === UserId) {
      console.log(Posts[i].id);
      thisUserPosts.push(Posts[i]);
    }
    console.log(thisUserPosts[0]);
    console.log(thisUserPosts[0].text);

    return thisUserPosts;
}
};


findUserPosts(Posts);

// promise


var promise = new Promise(function (resolve, reject) {

  // do the thing
    // if there was an error
    reject(error);
    // if everything went well
    resolve(result); });

//gets userPosts

router.get('/my-posts', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((userPosts) => {
    res.render('posts/my-posts', { userPosts: userPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});

//if statement to find only logged-in user posts

router.get('/my-posts', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((userPosts, thisUserPosts) => {
    console.log("userposts length is....");
    console.log(userPosts.length);
    for (i = 0; i < userPosts.length; i++) {
        if (userPosts.UserId === req.session.user.id) {
          thisUserPosts.push(userPosts[i]);
        }
        console.log(thisUserPosts);
        return thisUserPosts;
    }
    res.render('posts/my-posts', { userPosts: userPosts, thisUserPosts: thisUserPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});



  router.get('/my-posts', (req, res) => {
    db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
      var userPosts = [];
      for each (blogPost in blogPosts) {

    if (blogPost.UserId === req.session.user.id) {
        // call a new function which will return a new promise object
        // and return it
        return ifTruePromise();
    } else {
        // do something, no new promise
        // hope to stop the then chain
    }
  }
}).then(// I can handle the result of ifTruePromise here now);
