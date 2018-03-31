var express = require('express');
var router = express.Router();
var connect = "postgres://postgres:password@localhost:5432/persodb";

var pg = require('pg');


/* GET home page. */
router.get('/', function (req,res) {
    //PG connect
    pg.connect(connect, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM perso', function (err, result) {
            if(err){
                return console.error('error runing query', err);
            }
            console.log('result : ', result.rows);
            res.render('index', {persos :result.rows});
            done();
        });
    });
});

router.post('/add', function(req, res){
//PG connect
    pg.connect(connect, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        client.query("INSERT INTO perso(name, lastname) VALUES($1, $2)", [req.body.newPerso, req.body.lastName]);
        done();
        res.redirect('/');
    });
});

router.post('/update', function(req, res){
//PG connect
    pg.connect(connect, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        client.query("UPDATE perso SET name=($1), lastname=($2) WHERE id=($3)", [req.body.firstName, req.body.lastName, parseInt(req.body.id, 10)]);
        done();
        res.redirect('/');
    });
});

router.post('/delete', function(req, res){
//PG connect
    pg.connect(connect, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        client.query("DELETE from perso WHERE id=($1)", [parseInt(req.body.id, 10)]);
        done();
        res.redirect('/');
    });
});

router.get('/getspot', function (req,res) {
    //PG connect
    pg.connect(connect, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM park', function (err, result) {
            if(err){
                return console.error('error runing query', err);
            }
            console.log('result : ', result.rows);
            res.render('index', {places :result.rows});
            done();
        });
    });
});

router.post('/addspot', function(req, res){
//PG connect
    pg.connect(connect, function(err, client, done){
        if (err){
            return console.error('error fetching client from pool', err);
        }
        client.query("INSERT INTO park(place_num) VALUES($1)", [req.body.newSpot]);
        done();
        res.redirect('/');
    });
});

module.exports = router;