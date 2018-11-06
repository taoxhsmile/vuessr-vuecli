const serverConf = require('./webpack.server.conf');

const webpack = require('webpack')
const fs  =require('fs')
const path = require('path');
const Mfs = require('memory-fs')
const axios = require('axios')

module.exports = (cb) => {

  const webpackComplier = webpack(serverConf);

  var mfs = new Mfs();
  webpackComplier.outputFileSystem = mfs;

  webpackComplier.watch({}, async (error, stats) => {
    if (error) return console.log(error);

    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(err => console.log(err))

    // server Bundle json文件
    let serverBundlePath = path.join(
      serverConf.output.path,
      'vue-ssr-server-bundle.json'
    )

    console.log(serverBundlePath);

    let serverBundle = JSON.parse(mfs.readFileSync(serverBundlePath, "utf-8"))

    //console.log(serverBundle)

    // client Bundle json文件
    let clientBundle = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json')

    // 模板

    let template = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');

    cb(serverBundle, clientBundle, template)

  })
}