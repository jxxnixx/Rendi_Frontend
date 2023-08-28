const { createProxyMiddleware } = require("http-proxy-middleware");
const proxyPath = "/api";

module.exports = function (app) {
  app.use(
    proxyPath,
    createProxyMiddleware({
      target: "http://121.166.191.129:9876",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
