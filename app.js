var express = require('express'),
    app = express(),
    fs = require('fs');

app.use(express.bodyParser());

app.get('*', function(request, response, nextRoute){
    var file = '.' + request.path;

    if (file === './') file = './index.html';

    fs.stat(file, function(error, info){
        if (error || ! info.isFile()) {
            nextRoute();
            return;
        }

        response.sendfile(file);
    });
});

app.get('/files', function(request, response){
    fs.readdir('files', function(err, files){
        response.send(files);
    });
});

app.get('/files/delete/:fileName', function(request, response){
   fs.unlink('files/' + request.params.fileName, function(error){
       if (error) {
           response.send(500, error);
       }
       else {
           response.send('success');
       }
   });
});

app.post('/files/create', function(request, response){
    fs.writeFile('./files/' + request.body.name, request.body.content, function(error){
        if (error) {
            response.send(500, error);
        }
        else {
            response.send(request.body.name);
        }
    });
});

app.listen(1333);