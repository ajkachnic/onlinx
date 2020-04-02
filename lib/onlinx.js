const http = require("http");

let request = require('./request');
let response = require('./response');
let useMiddleware = require('./middleware');
let useRouter = require('./router');

function onlinx() {

  const main = {};
  /**
   * @param {object} obj - The Object taken and used to create routes
   * @param {function} [callback] - The callback function to be called on the route
   */
  main.route = function(obj, callback) {
    useRouter.add(obj, callback);
  };
  main.get = function(route, callback, options = {}) {
    this.route(
      {
        method: "GET",
        route,
        ...options
      },
      callback
    );
  };
  main.delete = function(route, callback, options = {}) {
    this.route(
      {
        method: "DELETE",
        route,
        ...options
      },
      callback
    );
  };
  main.post = function(route, callback, options = {}) {
    this.route(
      {
        method: "POST",
        route,
        ...options
      },
      callback
    );
  }
  main.patch = function(route, callback, options = {}) {
    this.route(
      {
        method: "PATCH",
        route,
        ...options
      },
      callback
    );
    }
  main.put = function(route, callback, options = {}) {
    this.route(
      {
        method: "PUT",
        route,
        ...options
      },
      callback
    );
  }
  main.use = function(callback) { useMiddleware.add(callback) }

  /**
   * Used to setup the HTTP server and establish routes
   * @param {int} port - The port the server is hosted on
   * @param {function} callback - The callback function called after the server is setup. Passed two arguements, req and res
   */
  main.listen = (port, callback) => {
    const bodyParser = "url-encoded";
    let body = "";
    const server = http.createServer(async (req, res) => {
      let ranRequest = request(req, "");
      let ranResponse = response(res);

      req.on("data", chunk => {
        body = body + chunk.toString();
      });
      
      useMiddleware.use()
      useRouter.use(ranRequest, ranResponse)
    });
    server.listen(port, callback);
  };

  return main;
}

module.exports = onlinx;

