const http = require('http')

http.createServer(function(req, res){
    console.log("Me LLamaron...:", req.url)
    if(req.url === '/pedro'){
        res.end("Hola Pedro, espero que estes de maravilla!")
    }
    else if(req.url === '/jose'){
        res.end("Esta es otro recurso!")
    }
    else{
        res.end("Hola Mundo!")
    }
    
}).listen(80)