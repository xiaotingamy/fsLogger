/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 15:01:12
 * @LastEditTime: 2021-08-23 21:40:03
 * @LastEditors: guoxt
 */
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const router = express.Router()

// registerBaseRouter()

// app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

// function registerBaseRouter () {
//   router.get('/base/get', function(req, res) {
//     res.json(req.query)
//   })

//   router.post('/base/post', function(req, res) {
//     res.json(req.body)
//   })
// }
