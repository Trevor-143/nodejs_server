const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')


const dbURI = `mongodb+srv://trevor_admin:trevor1234@nodedb.ab4w0ip.mongodb.net/nodeDB?retryWrites=true&w=majority`
mongoose.connect(dbURI).then((result) => {
    console.log('db connected')
    
})

//register view engine
app.set('view engine', 'ejs');


//litsening
app.listen(3000);

//middleware and statics
app.use(express.static('public'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Sleeping', snippet: 'This is the best way to sleep' },
        { title: 'Walking', snippet: 'This is the best way to walk' },
        { title: 'Running', snippet: 'This is the best way to run' }
    ]
    res.render('index', {
        title: 'Home',
        blogs
    });
})

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'Learn more'
     });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'Add new Blog'
    });
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Error'
    })
})