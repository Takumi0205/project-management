let proxyObj = {};
proxyObj['/ws'] = {
  ws: true,
  target: "ws://localhost:8800"
};
proxyObj['/'] = {
  ws: false,
  target: 'http://localhost:8800',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}
