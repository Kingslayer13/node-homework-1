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
    fs.readdir('./files', ifNotErrorSend(function(error, files){
        return files;
    }, {"using": response}));
});

app.get('/files/delete/:name', function(request, response){
    var name = request.param('name');
    fs.unlink(
       './files/' + name,
       ifNotErrorSend(name, {"using": response})
   );
});

app.all('/files/create', function(request, response){
    var name = request.param('name');
    fs.writeFile(
        './files/' + name,
        request.param('content'),
        ifNotErrorSend(name, {"using": response})
    );
});

app.listen(1333);

//=====================================================================
/**
 * @param {String|Function} message
 * @param {{using: Function}} options
 * @returns {Function}
 */
function ifNotErrorSend(message, options){
    return function(error){
        if (! error) {
            if (typeof message === 'function') {
                message = message.apply(this, arguments);
            }

            options.using.send(message);
        }
        else {
            options.using.send(500, error);
        }
    }
}