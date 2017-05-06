'use strict';

const express = require('express');

var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

var connect = function(callback) {
    mongoClient.connect('mongodb://mongo:27017/test', function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log('connected on Mongo!');
            callback(db);
        }
    });
}

var morgan = require('morgan');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// Constants
const PORT = 8000;

// App
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  next();
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.post('/api/insert', function (req, res) {
    connect(function(db){
        console.log("inserting object in Mongo");
        insert(res, db);
    });
});

app.get('/api/show', function (req, res) {
    connect(function(db){
        console.log("showing objects in Mongo");
        show(res, db);
    });
});

app.delete('/api/clean', function (req, res) {
    connect(function(db){
        console.log("cleaning all objects in Mongo");
        clean(res, db, null);
    });
});

app.delete('/api/clean/:id', function (req, res) {
    connect(function(db){
        var id = req.params.id;
        console.log("cleaning objects in Mongo with id [" + id + "]");
        clean(res, db, id);
    });
});

app.get('/api/count', function (req, res) {
    connect(function(db){
        console.log("cleaning objects in Mongo");
        count(res, db);
    });
});

var insert = function(res, db) {
    db.collection("cats").insert({"name":"Tom Cat!"}, function(err, result) {
        db.close();
        res.send("object inserted");
    });
}

var show = function(res, db) {
    db.collection("cats").find({}).toArray(function(err, data){
        db.close();
        res.send(data);
    });
};

var clean = function(res, db, id) {
    if (id != null) {
        db.collection("cats").deleteOne({ "_id": new mongodb.ObjectID('' + id)}, function(err, result) {
            db.close();
            res.send("objects of id [" + id +"] removed");
        });
    } else {
        db.collection("cats").remove({}, function(err, result) {
            db.close();
            res.send("objects removed");
        });
    }
};

var count = function(res, db) {
    db.collection("cats").count({}, function(err, result) {
        console.log("counting objects in Mongo: " + result);
        db.close();
        res.send("" + result);
    });
};

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
