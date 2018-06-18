const path = require('path')
const webpack = require('webpack')
const argv = require('minimist')(process.argv.slice(2))

module.exports = (config, cb) => {
  const compiler = webpack({
    entry: config.entry,
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: ['last 2 versions']
                  }
                }
              ]
            ]
          }
        }
      ]
    },
    plugins: [],
    output: {
      path: path.resolve(config.dist),
      filename: '[name].js',
      chunkFilename: 'async/[name].js',
      publicPath: config.publicPath
    }
  })

  const log = (err, stats) => {
    if (err) {
      console.log(err)

      return cb()
    }

    const formattedStats = stats.toString({
      colors: true,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true,
      version: true,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: false,
      assetsSort: 'name'
    })

    console.log(formattedStats)

    return cb()
  }

  if (argv.watch) {
    compiler.watch({}, log)
  } else {
    compiler.run(log)
  }
}
