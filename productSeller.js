var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/Ino';
var item = 'jhg';
MongoClient.connect(url, function (err, db) {
    var request = require("request")
        , cheerio = require("cheerio")
        , url = "https://www.alibaba.com/product-detail/12-18mesh-10-16mesh-Natural-Raw_60470177741.html?spm=a2700.7724856.0.0.KorXOH&s=p";
    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body)
                , breadCrumb = $("#J-ls-content > div.grid.grid-c2-e5.ls-grid-bcl > div.col-main > div > div > div.ui-breadcrumb").text();
            var temp = $('body > div.l-page > div.l-page-main > div.l-main-content > div.l-grid.l-grid-sub.l-grid-extra > div.l-col-main > div > div:nth-child(4) img');
            var categoryFolder = 'Agriculture';
            var subCategoryFolder = 'Agricultural Growing Media';
            var tempArr = '';
            breadCrumb = breadCrumb.replace(/\s/g, "");
            for (var iterate = 0; iterate < temp.length; iterate++) {
                tempArr += '{"folder":"' + categoryFolder + '","subfolder":"' + subCategoryFolder + '","url":"' + temp[iterate].getAttribute('src') + '"}';
                if (iterate != temp.length - 1) tempArr += ',';
            }
            var html = body.replace(/\s/g, "");
            html = html.replace(/"/g, "#");
            //GET SELLER INFORMATION
            var seller = $('#J-ls-content > div.grid.grid-c2-e6.ls-grid-main > div.col-extra > div > div.extra-card > div > div.card-supplier > a.company-name.link-default'); // + 'contactinfo.html';
            var data = '{"category":"","subcategory":"","pageURL":"' + url + '","pageHtml":"' + html + '","sellerName":"' + seller.text() + '","sellerWebsite":"' + seller.attr('href') + '","breadCrumb":"' + breadCrumb + '"}';
            data = JSON.parse(data);
            //PUT DATA IN MONGODB
            db.collection('ad').insert(data, function (err, records) {
                console.log('Data is inserted correctly Into MongoDB');
                db.close();
            });
            var item = '';
            seller = seller.attr('href') + 'contactinfo.html';
            //OPEN SELLER CONTACT PAGE
            request(seller, function (error, response, body) {
                var $j = cheerio.load(body);
                item = $j('.company-info-data tr:nth-child(3) > td:nth-child(3) > a');
                //OPEN SELLER WEBSITE
                request($j(item[0]).attr('href'), function (error, response, body) {
                    var data = '';
                    console.log(body);
                });
                //item = item.replace(/\s/g, '');
                console.log(item.length);
            });
            console.log(seller);
        }
        else {
            console.log("We’ve encountered an error: " + error);
        }
    });
});
