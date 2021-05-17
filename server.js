const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const session = require("koa-session");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')
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
  server.use(async (ctx, next) => {
    // console.log(ctx.cookies.get('id'))
    // if(!ctx.session.user){
    //     ctx.session.user = {
    //         name:'taimin',
    //         age:18
    //     }
    // }
    // else{
        console.log(ctx.session.user)
    // }

    await next();
  });
  router.get("/a/:id", async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: {
        id,
      },
    });
    ctx.respond = false;
  });
  router.get("/set/user", async (ctx) => {
    ctx.session.user = {
      name: "taimin",
      age: 18,
    };
    ctx.body = 'set session successfully'
  });
  router.get("/del/user", async (ctx) => {
    ctx.session = null
    ctx.body = 'set session successfully'
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    // ctx.cookies.set("id", "userid:123");
    await handle(ctx.req, ctx.res);
    ctx.req = false;
  });
  server.listen(3000, () => {
    console.log("Koa server listening on 3000");
  });
});