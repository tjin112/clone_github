const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const session = require("koa-session");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')
const auth  = require('./server/auth')
// 处理http请求的响应
const handle = app.getRequestHandler();

//创建redis client
const redis = new Redis()
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.keys = ["taimin develpo github app"];
  const SESSION_CONFIG = {
    key: "jid",
    store:new RedisSessionStore(redis)
  };
  server.use(session(SESSION_CONFIG, server));
  //配置处理oauth登陆

  auth(server)
  server.use(async (ctx, next) => {
        console.log(ctx.session.user)
    // }

    await next();
  });
  router.get('/api/user/info', async ctx => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })
  server.use(router.routes());

  server.use(async (ctx, next) => {
    // ctx.cookies.set("id", "userid:123");
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res);
    ctx.req = false;
  });
  server.listen(3000, () => {
    console.log("Koa server listening on 3000");
  });
});