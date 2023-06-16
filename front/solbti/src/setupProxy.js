const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:1190",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/bizno", {
      target: "https://moneypin.biz/",
      changeOrigin: true,
    })
  );
};
