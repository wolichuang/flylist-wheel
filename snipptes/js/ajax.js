/**
 * tips: httpPut 发送 ajax 请求
 */
const httpPut = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest()
  request.open("PUT", url, true)
  request.setRequestHeader("Content-type", "application/json; charset=utf-8")
  request.onload = () => callback(request)
  request.onerror = () => err(request)
  request.send(data)
}
const data = JSON.stringify({
  id: 1,
  title: "foo",
  body: "bar",
  userId: 1
})
httpPut("https://jsonplaceholder.typicode.com/posts/1", data, (request) => {
  console.log(request.responseText)
})

/*
 * tips: ajax get
 */
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest()
  request.open("GET", url, true)
  request.onload = () => callback(request.responseText)
  request.onerror = () => err(request)
  request.send()
}
httpGet("https://jsonplaceholder.typicode.com/posts/1", console.log)

/*
 * tips: ajax delete
 */
const httpDelete = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest()
  request.open("DELETE", url, true)
  request.onload = () => callback(request)
  request.onerror = () => err(request)
  request.send()
}
httpDelete("https://jsonplaceholder.typicode.com/posts/1", (request) => {
  console.log(request.responseText)
})

/**
 * tips: ajax post
 */
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest()
  request.open("POST", url, true)
  request.setRequestHeader("Content-type", "application/json; charset=utf-8")
  request.onload = () => callback(request.responseText)
  request.onerror = () => err(request)
  request.send(data)
}
const newPost = {
  userId: 1,
  id: 1337,
  title: "Foo",
  body: "bar bar bar"
}
const data = JSON.stringify(newPost)
httpPost("https://jsonplaceholder.typicode.com/posts", data, console.log)
