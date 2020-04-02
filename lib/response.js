let codes = require('../codes');

let types = {
  html: "text/html",
  ".html": "text/html",
  json: "application/json",
  png: "image/png"
};

function response(res) {
  let response = { ...res};
  response.send = function(value) {
    res.write(value)
    res.end();
  }
  response.status = function(status) {
    res.writeHead(status);
  }
  response.sendStatus = function(status) {
    res.writeHead(status);
    res.write(codes[status]);
    res.end();
  }
  response.set = function(key, value) {
    res.setHeader(key, value)
  }
  response.type = async function(type) {
    await res.setHeader("Content-Type", types[type])
  }
  response.json = function(obj) {
    this.type("json");
    this.send(JSON.stringify(obj));
  }
  response.setHeader = function (name, value) { res.setHeader(name, value) };
  response.removeHeader = function(name) { res.removeHeader(name) };
  return response
}

module.exports = response