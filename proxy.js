const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://121.166.191.129:9876",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
