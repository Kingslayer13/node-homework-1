require! [fs, express]

app = express!

app.use express.bodyParser!

app.get "*", (request, response, nextRoute) ->
    file = "." + request.path

    if file is "./" then file = "./index.html"

    (error, info) <- fs.stat file

    if error or not info.isFile!
        nextRoute!
    else
        response.sendfile file

app.get "/files", (request, response) ->
    (error, files) <- fs.readdir, "./files"
    response.send error or files

app.get "/files/delete/:name", (request, response) ->
    {name} = request.param!
    (error) <- fs.unlink, "./files/" + name
    response.send error or name

app.all "/files/create", (request, response) ->
    {name, content} = request.param!
    (error) <- fs.writeFile, "./files/" + name, content
    response.send error or name

app.listen 1333

do ->
    send = app.response.__proto__.send
    app.response.__proto__.send = (value) ->
        if value instanceof Error
            send.call this, 500, value
        else
            send ...