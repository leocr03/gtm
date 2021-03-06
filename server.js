'use strict';

const express = require('express');

var mongoClient = require('mongodb').MongoClient;

var connect = function(callback) {
    mongoClient.connect('mongodb://db:27017/test', function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log('connected on Mongo!');
            callback(db);
        }
    });
}

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
    console.log("main page");
    res.send("this is the main page")
});

app.get('/insert', function (req, res) {
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

app.get('/clean', function (req, res) {
    connect(function(db){
        console.log("showing objects in Mongo");
        clean(res, db);
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
        res.send(data);
    });
};

/*
var show = function(res, db) {
    db.collection("cats").find({}, function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
}
*/

var clean = function(res, db) {
    db.collection("cats").remove({}, function(err, result) {
        db.close();
        res.send("objects removed");
    });
}

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
