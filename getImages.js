var fs = require('fs');
  //  , request = require('request'),
  //  mdir = require('mdrip');
//var xml2js = require('xml2js');
var json;
var dir='datafiles/';
var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function rot(dir){
fs.readdir(dir,function(err,result){
	console.log(err);
	
	result.forEach(function(d){
		if(d.indexOf('.json')<0)
		{
			console.log('inside '+d);
			rot(dir+d+'/');
		}
		fileData = JSON.parse(fileData);
		for (i = 0; i < fileData.length - 1; i++) {
			console.log(fileData[i]);
			folderPath = fileData[i].folder+'/'+fileData[i].subfolder+'/';// 'Agriculture/Agricultural Growing Media/';
			download('http:' + fileData[i].url, folderPath + fileData[i].url.substring(fileData[i].url.lastIndexOf('/') + 1), function () {
				console.log(fileData[i].url);
			});
		}
		fs.raadfile();
	})
});
}
rot(dir);
/*fileData = fs.readFileSync('dataFiles/productImageSrc.json', 'ascii');
var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
fileData = JSON.parse(fileData);
for (i = 0; i < fileData.length - 1; i++) {
    console.log(fileData[i]);
    folderPath = 'Agriculture/Agricultural Growing Media/';
    download('http:' + fileData[i].url, folderPath + fileData[i].url.substring(fileData[i].url.lastIndexOf('/') + 1), function () {
        console.log(fileData[i].url);
    });
}*/
//console.log(fileData.length);
