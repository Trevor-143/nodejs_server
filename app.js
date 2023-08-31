const express = require('express')
const app = express()

//register view engine
app.set('view engine', 'ejs');


//litsening
app.listen(3000);

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