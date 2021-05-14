const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// 处理http请求的响应
const handle = app.getRequestHandler()

app.prepare().then(()=>{
    const server = new Koa()
    const router = new Router()

    router.get('/a/:id',async (ctx)=>{
        const id = ctx.params.id
        await handle(ctx.req,ctx.res,{
            pathname:'/a',
            query:{
                id
            }
        })
        ctx.respond = false
    })

    server.use(router.routes())

    server.use(async (ctx,next)=>{
        await handle(ctx.req,ctx.res)
        ctx.req = false
    })
    server.listen(3000,()=>{
        console.log('Koa server listening on 3000')
    })
})