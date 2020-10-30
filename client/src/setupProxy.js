
// CORS issue, Proxy設定
//portが違うclientとDBの間の通信の為設定
//参考:セキュリティー上 ex)localhost:5000 <-> localhost:3000通信不可
//https://create-react-app.dev/docs/proxying-api-requests-in-development


const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};