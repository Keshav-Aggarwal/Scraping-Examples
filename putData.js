var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/Ino';
var item = 'jhg';
MongoClient.connect(url, function (err, db) {
    var fs = require('fs');
    var myfile = 'dataFiles/categoryURL.json';
    var fileData = fs.readFile(myfile, function (err, data) {
        var json = JSON.parse(data);
        console.log("Connected correctly to server.");
        //console.log(json);
        /*db.collection('categoryPage').insert(json, function (err, records) {
            console.log('Data is inserted correctly Into MongoDB');
            db.close();
        });*/
        db.collection('categoryPage').find({
            started: "false"
        }).toArray(function (err, results) {
            json += (results); // output all records
        });
        console.log(json);
        //db.close();
    });
    //Close connection
});
