let middlewares = []
function addMiddleware(callback) {
    middlewares.push({
      listener: callback,
    })
}
function useMiddlewares() {
  let middlewareIndex = 0
  function next() {
    middlewareIndex ++
  }
  while(middlewares[middlewareIndex]) {
    middlewares[middlewareIndex].listener(ranRequest, ranResponse, next)
  }
}
module.exports = {
  add: addMiddleware,
  use: useMiddlewares
}