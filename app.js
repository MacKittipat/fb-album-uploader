var request = require('sync-request');
var fs = require('fs');
var FormData = require('form-data');
var https = require('https');
var util = require('util');

// Get access_token from https://developers.facebook.com/tools/explorer
// Require `publish_actions` permission.
// Click `Get Token` > `Get Access Token` to select permission.
var fbAccessToken = '';

var userId = '';
var albumName = '';
var imageFolder = '';

// ===== Create album =====
// https://developers.facebook.com/docs/graph-api/reference/user/albums#Creating
var fbCreateAlbumUrl = 'https://graph.facebook.com/v2.4/'
  + '/' + userId + '/albums?access_token='
  + fbAccessToken + '&name=' + albumName;

var createAlbumRes = request(
  'POST',
  fbCreateAlbumUrl
);

var createAlbumResString = createAlbumRes.getBody('utf-8');
var createAlbumResJson = JSON.parse(createAlbumResString);
console.log('Create album response : ' + createAlbumResString);


// ===== Upload images =====
// https://developers.facebook.com/docs/graph-api/reference/photo#Creating
// https://aguacatelang.wordpress.com/2013/01/05/post-photo-from-node-js-to-facebook/

var imagePaths = fs.readdirSync(imageFolder);
for(var i=0; i<imagePaths.length; i++) {
  console.log('-----> ' + imagePaths[i]);
  var form = new FormData();
  form.append('file', fs.createReadStream(imageFolder + '/' + imagePaths[i]));

  var options = {
    method: 'POST',
    host: 'graph.facebook.com',
    path: '/' + createAlbumResJson.id + '/photos?access_token=' + fbAccessToken,
    headers: form.getHeaders(),
  }

  // Do POST request, callback for response
  var request = https.request(options, function (res) {
    console.log(util.inspect(obj));
  });

  // Binds form to request
  form.pipe(request);
}
