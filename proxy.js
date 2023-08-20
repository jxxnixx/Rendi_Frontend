const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://211.33.36.227:8081",
      changeOrigin: true,
    })
  );
};
