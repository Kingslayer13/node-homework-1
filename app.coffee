express = require("express")
app = express()
fs = require("fs")

app.use express.bodyParser()

#region =================== Utils =========================
ifNotErrorSend = (message, options) ->
    return (error) ->
        if not error
            if typeof message is "function" then message = message.apply(this, arguments)

            options.using.send message
        else
            options.using.send 500, error

#endregion ================================================

app.get "*", (request, response, nextRoute) ->
    file = "." + request.path

    if file is "./" then file = "./index.html"

    fs.stat file, (error, info) ->
        if error or not info.isFile()
            nextRoute()
            return

        response.sendfile file

app.get "/files", (request, response) ->
    fs.readdir "./files", ifNotErrorSend ((error, files) -> files), using: response

app.get "/files/delete/:name", (request, response) ->
    name = request.param("name")
    fs.unlink "./files/" + name, ifNotErrorSend name, using: response

app.all "/files/create", (request, response) ->
    name = request.param("name")
    fs.writeFile "./files/" + name, request.param("content"), ifNotErrorSend name, using: response

app.listen 1333