const { parse } = require("querystring");

const url = require("url");

function request(req, body) {
  let urlParse = url.parse(req.url, true)
  let query = parse(req.url, true);
  let request = {
    ...req,
    ...urlParse,
    query,
    body
  };

  
  return request
}

module.exports = request