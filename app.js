"use strict";
var photo_1 = require("./models/photo");
var photos_1 = require("./api/photos");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var index_1 = require("./routes/index");
var users_1 = require("./routes/users");
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/api/photos', photos_1.default);
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err['status'] || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var connectionString = 'mongodb://MichaelH:987db1789@ds041150.mlab.com:41150/mhahn577database1';
var mongoose = require("mongoose");
mongoose.connect(connectionString).then(function () {
    mongoose.connection.db.dropDatabase(function () {
        photo_1.default.create({
            name: 'Earth P 1',
            description: 'Lightning in the canyon.',
            imageURL: 'http://i.imgur.com/vCMwhsK.jpg'
        }).catch(function (err) {
            console.error('failed to seed photos: ' + err.message);
            console.dir(err);
        });
    });
});
module.exports = app;
