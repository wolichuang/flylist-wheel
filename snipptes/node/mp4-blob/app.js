// https://blog.csdn.net/liuyaqi1993/article/details/76560401

var express = require("express")
var app = require("express")()
var http = require("http").Server(app)
var fs = require("fs")
var path = require("path")
app.use("/static", express.static(path.join(__dirname, "public")))
app.get("/", onRequest)
app.post("/blob", onBlobVideo)
function onRequest(request, response) {
  if (request.method == "GET" && request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" })
    fs.createReadStream("./demo.html").pipe(response)
  }
}

function onBlobVideo(req, res) {
  let path = "./public/demo.mp4"
  let stat = fs.statSync(path)
  let fileSize = stat.size
  let range = req.headers.range

  // fileSize 3332038

  if (range) {
    //有range头才使用206状态码

    let parts = range.replace(/bytes=/, "").split("-")
    let start = parseInt(parts[0], 10)
    let end = parts[1] ? parseInt(parts[1], 10) : start + 999999

    // end 在最后取值为 fileSize - 1
    end = end > fileSize - 1 ? fileSize - 1 : end

    let chunksize = end - start + 1
    let file = fs.createReadStream(path, { start, end })
    let head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    }
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    let head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4"
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
}
http.listen(process.env.PORT || 3000, function () {
  console.log("server started")
})
