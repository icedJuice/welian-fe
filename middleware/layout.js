export default function (params) {
  const { store, route, req } = params;
  const cookie = req && req.ctx && req.ctx.request && req.ctx.request.header.cookie;
  if (/WeLian/.test(cookie)) {
    console.log('cookie', cookie);
    // store.dispath('global/get')
  }
// console.log(Object.keys(paramsreq.ctx.request.header.cookie));
// console.log(req.ctx.request.header.cookie);
  // do sth
}

// [ 'isStatic',
//   'isDev',
//   'isHMR',
//   'app',
//   'store',
//   'payload',
//   'error',
//   'base',
//   'env',
//   'req',
//   'res',
//   'ssrContext',
//   'redirect',
//   'beforeNuxtRender',
//   'route',
//   'next',
//   '_redirected',
//   '_errored',
//   'params',
//   'query',
//   '$config' ]


// [ '_readableState',
//   'readable',
//   'domain',
//   '_events',
//   '_eventsCount',
//   '_maxListeners',
//   'socket',
//   'connection',
//   'httpVersionMajor',
//   'httpVersionMinor',
//   'httpVersion',
//   'complete',
//   'headers',
//   'rawHeaders',
//   'trailers',
//   'rawTrailers',
//   'aborted',
//   'upgrade',
//   'url',
//   'method',
//   'statusCode',
//   'statusMessage',
//   'client',
//   '_consuming',
//   '_dumped',
//   'ctx',
//   'originalUrl',
//   '_parsedUrl',
//   '_parsedOriginalUrl' ]
