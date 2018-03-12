const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.post('/', function(req, res, next) {
    // const page = Page.build({
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status
    // });
    // // const user = User.build({
    // //     name: req.body.user,
    // //     email: req.body.email
    // // });
    // // user.save()


    // page.save()
    // .then(function(savedPage) {
    //     res.redirect(savedPage.route);
    // })
    // .catch(next);

    User.findOrCreate({
        where: {
          name: req.body.name,
          email: req.body.email
        }
      })
      .then(function (values) {

        const user = values[0];

        const page = Page.build({
          title: req.body.title,
          content: req.body.content
        });

        return page.save().then(function (page) {
          return page.setAuthor(user);
        });

      })
      .then(function (page) {
        res.redirect(page.route);
      })
      .catch(next);
});

router.get('/add', function(req, res, next) {
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
        where: {
          urlTitle: req.params.urlTitle
        }
      })
    //   .then(User.findOne({
    //       where: {
    //         name: req.body.user
    //       }
    //   }))
      .then(function(foundPage){
        res.render('wikipage', {
            page: foundPage
        });
      })
      .catch(next);
});

module.exports=router;
