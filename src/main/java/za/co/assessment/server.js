var express = require('express');

var app = express();

const axios = require('axios');

var http = require('http');


var fetch = require("node-fetch");
var api = "https://gateway.marvel.com/v1/public/characters?apikey=3739af56c65dfe38d26d021b7b29a136";

var ts = new Date().getTime();


app.listen(8080);
console.log('App listening to port 8080');


function getCharacters(data) {

    var found = '{ "characters" :[' ;

    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var name = data[i].name;
     if(i == 0) {
         found = found +
             '{"id":'  + "\"" + id + "\"" + ',' +
             '"name":'  +  "\"" +name + "\"";

     }else {
         found = found + '},{' +
             '"id":'  + "\"" + id +  "\"" +',' +
             '"name":'  +  "\"" +name + "\""
      }
    }
    found = found +  '}]' +
        '}';

    console.log(found);
    var object = JSON.parse(found);
   // console.log(data);

    return object;
}

function getProfile(data) {
    console.info('Data : '+ data +'\n\n')
    var found = '{ "characters" :[' ;

    for (var i = 0; i < data.length; i++) {
        var name = data[i].name;
        var imagePath = data[i].thumbnail.path;
        var imageName = data[i].comics!=null?data[i].comics.items.name:'';
        var description = data[i].description;
        console.info('name : '+ name + ' \nimagePath : '+ imagePath + '\nimageName : '+ imageName +'\nDescription : '+ description+'\n');
        if(i == 0) {
            found = found +
                '{"name": ' + "\"" +name +"\"" + ',' +
                '"imagePath": ' +"\"" + imagePath  + "\"" +
                ',"stories" :[{';
                for(var stories = 0; stories < data[i].stories.items; stories++){
                  found = found +  '"name":' + "\"" + name + "\"" + ','
                    '"title":' + "\"" + data[i].stories!=null?data[i].stories.items.name:'' + "\"" + ','
                    '"description":' + "\"" + data[i].description + "\"" +'}]' +
                    '}';
            }


        }else {
            found = found +
                '"name": ' + "\"" +name +"\"" + ',' +
                '"imagePath": ' +"\"" + imagePath  + "\"";

            for(var stories = 0; stories < data[i].stories.items; stories++){
               found = found + '},{"name":' + "\"" + name + "\"" + ','
                '"title":' + "\"" + (data[i].stories!=null?data[i].stories.items.name:'') + "\"" + ','
                '"description":' + "\"" + data[i].description + "\"" +'}]' +
                '}';
            }
        }
    }
    found = found +  '}]' +
        '}';
    console.info('\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n' + found + '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    var object = JSON.parse(found);

    return object;
}




app.get('/api/marvel/charactors', (req, res,next) => {

    axios({
              method: 'get',

              url : api,
              headers : {
                  Referer: 'https://developer.marvel.com'
              },
              auth: {
                  username: 'lindiso',
                  password: 'T#chnology18'
              }
          }).then(function (response) {
              var result = '{ "characters" :[' +
                  '{' +
                  "id: " + response.data.data.results.id +',' +
                   "name: " + response.data.data.results.name +
                  '}]' +
                  '}';

   var lookup = getCharacters(response.data.data.results);
    res.send(JSON.stringify(lookup));

}).catch(function (reason) {
    console.log(reason);
})});






//exposing the image and profile rest call
app.post('/api/marvel/charactors/profile', (req, res,next) => {

    axios({
              method: 'get',

              url : api,
              headers : {
                  Referer: 'https://developer.marvel.com'
              },
              auth: {
                  username: 'lindiso',
                  password: 'T#chnology18'
              }
          }).then(function (response) {


   console.info('Request : ' + req.data);
    console.info(response.data.data.results);
    res.send(response.data.data.results);

}).catch(function (reason) {
    console.log(reason);
})});



console.log('App waiting for a rest call........');






