
const views = require('express').Router();

views.get('/', function(req, res, next) {
    res.render('index');
});
views.get('/404', function(req, res, next) {
    res.render('404');
});

views.get('/basic-table', function(req, res, next) {
    res.render('basic-table');
});

views.get('/dashboard', function(req, res, next) {
    res.render('dashboard');
});
views.get('/profile', function(req, res, next) {
    res.render('profile');
});
views.get('/register', function(req, res, next) {
    res.render('register');
});

views.get('/login', function(req, res) {
    res.render('login');
});

views.get('/patient-form', function(req,res,next){
res.render('patient-form');
});

module.exports = views;