const Koa = require('koa');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const { BASE_PORT } = require('../config.js');
const app = new Koa();

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = app.env === 'development';

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const { host = process.env.HOST || '0.0.0.0', port = process.env.PORT || BASE_PORT } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
