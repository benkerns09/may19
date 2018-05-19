var express = require('express');
var router = express.Router();


const fs = require('fs');
const util = require('util');//need this util to do promises with fs.readFile
const readFile = util.promisify(fs.readFile);

/* GET home page. */

router.get('/', function(req, res, next) {

  readFile('blog-posts.json')//file is read
    .then((data) => {//.then is called. Now I have access to the data that was read from the file
      const blogPosts = JSON.parse(data);//to convert to a real javaScript object

      let dataForTemplate = {
        title: 'Panda Express',
        myName: 'chris aquino',
        cats: ['oakley', 'milla'],
        posts: blogPosts
      };//these are all available to my index.hbs

      res.render('index', dataForTemplate);//rendering the index.hbs. Don't have to specificy ".hbs" because express cool like that
    }).catch(err => {//good practice but not that important
      console.log(err);
    })

});
    
    module.exports = router;