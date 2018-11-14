const express = require('express');
const router = express.Router();
const models = require("../models");
const Page = models.Page;
const User = models.User;
const { main, addPage, editPage, wikiPage } = require('../views');

// route /wiki
router.get('/', async (req, res, next) => {
  try{
    const pages = await Page.findAll();
    res.send(main(pages))
  }catch(error){next(error)}

})

// route /wiki
router.post('/', async (req, res, next) => {
 
  try {
    const [ user, wasCreated ] = await User.findOrCreate({
       where: {
         name: req.body.name,
         email: req.body.email
       }
    })
    const page = await Page.create(req.body);
    page.setAuthor(user);
    res.redirect('/wiki' + page.slug)
  }catch(error) {
    next(error)
  }
})

//this route receive the form body, update and redirect to the page
router.post("/:slug", async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    res.redirect("/wiki/" + updatedPages[0].slug);
  } catch (error) { next(error) }
});

router.get("/:slug/delete", async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    });

    res.redirect("/wiki");
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

//put after /wiki/add router, otherwise it will never reach wiki/add
//how to edit this route, after fetching the page by slug, we want to also fetch the user data according
router.get('/:slug', async (req, res, next) => {
  try{
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    if( page === null ){
      res.sendStatus(404);
    }else{
      const author = await page.getAuthor();
      res.send(wikiPage(page,author))
    }
  }catch(error) {
    next(error)
  }
})

//This route handler, use Sequelize to get the page data( with author data) and send a pre-polupated HTML form
//the user should be able to see all form fields already filled with page and author data
router.get("/:slug/edit", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }
  } catch (error) { next(error) }
});

module.exports = router;
