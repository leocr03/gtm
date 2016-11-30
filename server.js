'use strict';

const express = require('express');

var mongoClient = require('mongodb').MongoClient;

var connect = function(callback) {
    mongoClient.connect('mongodb://10.0.0.102:27017/test', function(err, db) {
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
    db.collection("cats").find({}, function(err, docs) {
        docs.each(function(err, doc) {
            if(doc) {
                console.log(doc);
            }
            else {
                res.end();
            }
        });
    });
}

var clean = function(res, db) {
    db.collection("cats").remove({}, function(err, result) {
        db.close();
        res.send("objects removed");
    });
}

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
