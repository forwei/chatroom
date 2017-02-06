import Koa from 'koa'
import http from 'http'
import serve from 'koa-static'

import router from './app/routes'
import {chat} from './app/modules'


import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import devConfig from '../../webpack.config'
const compile = webpack(devConfig)


const app = new Koa()
app.keys = ['forwei', 'run.liuwei@live.com']

//静态文件
app.use(serve(devConfig.output.path))

//路由
app.use(router.routes())

// hot load 插件
app.use(devMiddleware(compile, {
    // display no info to console (only warnings and errors) 
    noInfo: true,
    // display nothing to the console 
    quiet: false,
    // switch into lazy mode 
    // that means no watching, but recompilation on every request 
    lazy: false,
    // watch options (only lazy: false) 
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    // public path to bind the middleware to 
    // use the same as in webpack 
    publicPath: devConfig.output.publicPath,
    // custom headers 
    headers: { "X-Custom-Header": "yes" },
    // options for formating the statistics 
    stats: {
        colors: true
    }
}))
app.use(hotMiddleware(compile))
//


let server = http.Server(app.callback())
app.chat = new chat(server, {serveClient: false})
server.listen(3000)
