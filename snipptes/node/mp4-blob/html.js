var URL = this.window.URL || this.window.webkitURL
var file = new Blob(["C:\\lichuang\\space\\snippts-node\\mp4-blob\\demo.mp4"], {
  type: "video/mp4"
})
var value = URL.createObjectURL(file)
const videoUrl = value
