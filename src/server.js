const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('../data/db.json')
const middlewares = jsonServer.defaults({
  static: "./build",
})
server.use(middlewares)
server.use(jsonServer.rewriter({
  "/api/*":  "/$1",
}))
server.use(router)
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`JSON Server is running ${PORT}`)
})