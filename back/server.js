'use strict';

const express = require('express');

var mongoClient = require('mongodb').MongoClient;

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

app.post('/insert', function (req, res) {
    connect(function(db){
        console.log("inserting object in Mongo");
        insert(res, db);
    });
});

app.get('/show', function (req, res) {
    connect(function(db){
        console.log("showing objects in Mongo");
        show(res, db);
    });
});

app.delete('/clean', function (req, res) {
    connect(function(db){
        console.log("cleaning objects in Mongo");
        clean(res, db);
    });
});


app.get('/count', function (req, res) {
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

var clean = function(res, db) {
    db.collection("cats").remove({}, function(err, result) {
        db.close();
        res.send("objects removed");
    });
};

var count = function(res, db) {
    db.collection("cats").count({}, function(err, result) {
        db.close();
        res.send(result);
    });
};

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
