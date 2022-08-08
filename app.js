
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const teacherDashboardRouter = require('./routes/teacherDashboardRoute')
const userNoticesRouter = require('./routes/userNoticesRoute')
const authRouter = require('./routes/authRoute')

const app = express()

var store = new MongoDBStore({
    uri: `mongodb+srv://newuser:newuser@cluster0.jhrxo.mongodb.net/contactdb?retryWrites=true&w=majority`,
    collection: 'Sessions',
    expires: 600*86400*1000
  });

//Set up view engine
app.set('view engine', 'ejs')

//Set up middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        cookie: {
            maxAge  : new Date(Date.now() + 30*86400*1000), 
            expires : new Date(Date.now() + 30*86400*1000),
        },
        resave: false,
        saveUninitialized: false,
        store: store
    })
]

app.use(middleware)

app.get('/', (req,res) => {
    res.send('Hello')
})

app.get('/auth/common', (req,res) => {
    let title = "User or Teacher Login";
    res.render('pages/authCommon.ejs', { title })
})

app.use('/user/notices', userNoticesRouter)

app.use('/teacher/dashboard', teacherDashboardRouter)

app.use('/auth', authRouter)

app.get('/', (req,res) => {
    res.redirect('/notices')
})

const PORT = process.env.PORT || 8080


mongoose
    .connect(`mongodb+srv://newuser:newuser@cluster0.jhrxo.mongodb.net/attendancedb?retryWrites=true&w=majority`, {
        useNewUrlParser: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
        })
    })
    .catch(e => {
        console.log(e)
    })