import path from 'node:path'
import { parseArgs } from 'node:util'
import webpack from 'webpack'

const {
  values: { webpackWatch }
} = parseArgs({
  options: {
    webpackWatch: {
      type: 'boolean',
      default: false
    }
  },
  allowPositionals: true
})

export default (config, cb) => {
  const compiler = webpack({
    entry: config.entry,
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(import.meta.dirname, '..', 'src'),
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
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

  if (webpackWatch) {
    compiler.watch({}, log)
  } else {
    compiler.run(log)
  }
}
