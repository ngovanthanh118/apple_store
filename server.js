const jsonServer = require('json-server');
const app = jsonServer.create();
const middlewares = jsonServer.defaults({
    static: "./build",
});
const router = jsonServer.router('./data/db.json');
const port = process.env.PORT || 4000;
server.use(middlewares);
server.use(jsonServer.rewriter({
    "/api/*": "/$1",
}));
server.use(router);
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});