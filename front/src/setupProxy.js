const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/auth", {
      target: "http://127.0.0.1:8000",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api", {
      target: "http://127.0.0.1:5000/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/token", {
      target: "http://127.0.0.1:4000/",
      changeOrigin: true,
    })
  );
};
