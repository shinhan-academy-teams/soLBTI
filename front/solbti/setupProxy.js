const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/bizno",
    createProxyMiddleware({
      target: "https://moneypin.biz",
      changeOrigin: true,
    })
  );
};
