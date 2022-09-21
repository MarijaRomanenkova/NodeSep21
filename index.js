const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const catsRoutes = require('./routes/cats')
const expbhs = require('express-handlebars')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = expbhs.create({
    defaultlayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(catsRoutes)

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://marijama:marijama123@cluster0.kxgjeqx.mongodb.net/cats',  
            {
                useNewUrlParser: true
            }
        )
        
        app.listen(PORT, () => {
            console.log('Server running')
        })
    } catch(e) {
        console.log(e)
    }
}

start()