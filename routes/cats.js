const {Router} = require('express')
const Cat = require('../models/Cat')
const router = Router()

router.get('/', async (req, res) => {
    const cats = await Cat.find({})
    console.log(cats)

    res.render('index', {
        title: 'Cat List',
        cats
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: "Buy Cat"
    })
})

router.post('/create', async (req, res) => {
    const cat = new Cat({
        catName: req.body.catName
    })

    await cat.save()

    res.redirect('/')
})

module.exports = router