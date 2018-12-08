const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportConf = require('./config/passport');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const morgan = require('morgan');
var multer = require('multer');
var crypto = require('crypto');


const app = express();

//Multer Config

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + '.jpeg');
        })
    }
})

var upload = multer({ storage: storage })
const User = require('./user');
const secret = require('./config/secret');

// //Connect to Db
mongoose.connect(secret.db, { useMongoClient: true }, (err) => {
    err ? console.log(err) : console.log('Database connected');
});
//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Initialize Passport
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || secret.key,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ url: secret.db })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))


app.get('/api/auth', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send({ message: 'unauthorized' });
    }
})
app.post('/api/signup', (req, res) => {
    let user = new User();

    user.username = req.body.username;
    user.password = req.body.password;

    User.findOne({username: req.body.username }, (err, existingUser, next) => {
        if (err) return next(err);
        if (existingUser) {
            res.header(400);
            res.send({ error: 'user already exists' })
        } else {
            user.save(function (err, user) {
                if (err) console.error(err);
                console.log(user);
                res.send({ success: true });
            });
        }
    });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
    User.findOne({ username: req.user.username }, (err, user) => {
        res.send(user);
        if(user.firstTime){
            user.firstTime = false;
            user.save();
        }
    });
})
app.get('/api/logout', (req, res) => {
    req.logout();
    res.send({ success: true });
})
const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));