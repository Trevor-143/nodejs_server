const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const Blog = require('./models/blog')


const dbURI = `mongodb+srv://trevor_admin:trevor1234@nodedb.ab4w0ip.mongodb.net/nodeDB?retryWrites=true&w=majority`
mongoose.connect(dbURI).then((result) => app.listen(3000))

//register view engine
app.set('view engine', 'ejs');



//middleware and statics
app.use(express.static('public'));
app.use(morgan('tiny'));

// // mongoose practice
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my blog',
//         body: 'This is all you need to know about the new blog that i just wrote today in Node JS.'
//     })
//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('650454173bdcebb2888d85d4')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })


app.get('/', (req, res) => {
    // const blogs = [
    //     { title: 'Sleeping', snippet: 'This is the best way to sleep' },
    //     { title: 'Walking', snippet: 'This is the best way to walk' },
    //     { title: 'Running', snippet: 'This is the best way to run' }
    // ]
    // res.render('index', {
    //     title: 'Home',
    //     blogs
    // });
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'Learn more'
     });
})

//blog routes

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            // res.send(result)
            res.render('index', { title: 'all blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
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