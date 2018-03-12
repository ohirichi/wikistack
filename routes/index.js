'use strict';
var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');
const models = require('../models');
const Page = models.Page;
// var client = require('./db');

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', (req, res, next)=>{
    Page.findAll()
    .then(function(foundPages){
        console.log(foundPages);
        res.render('index', {
        pages: foundPages
        });
    });
});




module.exports=router;
