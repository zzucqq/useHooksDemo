const pkg = require('../package.json');

const config = {
  // 通用配置（dev和prod都生效的）
  global: {
    imageInlineSizeLimit: 8192, // 小图片转行内base64格式的大小限制(kb)
    fontInlineSizeLimit: 8192, // 字体转base64的大小限制(kb)
  },
  // 本地开发配置
  development: {
    // 相对于服务器根目录的路径，用于加载资源。
    publicPath: '/',
  },
  // 打包配置
  build: {
    // 相对于服务器根目录的路径，用于加载资源。（css、js、font部署的路径。2020年4月7日修改，图片、音视频等除index.html外的所有文件，全部放在「s」域名下）
    publicPath: '/' + pkg.name + '/',
  },
};

module.exports = config;
