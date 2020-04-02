let group = require('../utils/group');
let routes = [];

function addRoute(obj, callback) {
  routes.push({
    route: obj.route,
    method: obj.method,
    listener: callback ? callback : obj.listener
  });
}


function useRoutes(req, res) {
  const methodsArrs = group(routes, "method");
  if (methodsArrs[req.method]) {
    methodsArrs[req.method].map(val => {
      if (val.route == req.pathname) {
        val.listener(req, res);
      }
    });
  }
}
module.exports = {
  add: addRoute,
  use: useRoutes
}