var app = require('express')(),
    fs = require('fs');

app.get('*', function(request, response, nextRoute){
    var file = '.' + request.path;
    fs.stat(file, function(error, info){
        if (error || ! info.isFile()) {
            nextRoute();
            return;
        }

        fs.readFile(file, function(error, fileContent){
            response.end(fileContent);
        });
    });
});

app.get('/files', function(request, response){
    fs.readdir('files', function(err, files){
        response.send(files);
    });
});

app.listen(1333);