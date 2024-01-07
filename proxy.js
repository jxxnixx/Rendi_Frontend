const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://20.249.3.253:8000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
