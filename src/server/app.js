import Koa from 'koa'
import http from 'http'
import serve from 'koa-static'
import koaBody from 'koa-body'

import router from './app/routes'
import {chat} from './app/modules'

import log, {debug} from './app/utils/log'


import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import devConfig from '../../webpack.config'
const compile = webpack(devConfig)


const app = new Koa()
app.keys = ['forwei', 'run.liuwei@live.com']

loadErrors()

//静态文件
app.use(serve(devConfig.output.path))

//解析body
app.use(koaBody({
    multipart: true,
    formLimit: 15,
    formidable: {uploadDir: __dirname + '/app/uploads'}
}))

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
        aggregateTimeout: 60,
        poll: true
    },
    // public path to bind the middleware to 
    // use the same as in webpack 
    publicPath: devConfig.output.publicPath,
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

log(`start server port: ${3000}`)




function loadErrors() {
    app.on("error", (err, ctx) => {
        debug(err)
    })

    process.on('unhandledRejection', (reason, promise) => {
        debug(reason)
    })

    // 捕获未知错误
    process.on('uncaughtException', (err) => {
        debug(err)

        if (err.message.indexOf(' EADDRINUSE ') > -1) {
            process.exit()
        }
    })
}