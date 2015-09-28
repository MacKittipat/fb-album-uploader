var request = require('sync-request');
var fs = require('fs');
var FormData = require('form-data');
var https = require('https');

// Get access_token from https://developers.facebook.com/tools/explorer
var fbAccessToken = '';

// Create album
// https://developers.facebook.com/docs/graph-api/reference/user/albums#Creating
var fbGraphUrl = 'https://graph.facebook.com/v2.4/'
  + '/{albumId}/albums?access_token='
  + fbAccessToken + '&name=testmac';

var res = request(
  'POST',
  fbGraphUrl
);

var jsonString = res.getBody('utf-8');
console.log(jsonString);

var json = JSON.parse(jsonString);

// Upload images
// https://developers.facebook.com/docs/graph-api/reference/photo#Creating

var form = new FormData(); //Create multipart form
form.append('file', fs.createReadStream('/IMG_0756.JPG')); //Put file

var options = {
    method: 'POST',
    host: 'graph.facebook.com',
    path: '/' + json.id + '/photos?access_token='+fbAccessToken,
    headers: form.getHeaders(),
}

//Do POST request, callback for response
var request = https.request(options, function (res){
     console.log(res);
});

//Binds form to request
form.pipe(request);
