export default function (params) {
  const { store, route, req, redirect, isHMR, isStatic } = params;
  const cookie = req && req.ctx && req.ctx.request && req.ctx.request.header.cookie;
  return new Promise((res) => {
    if (typeof window == 'object') {
      res();
      return;
    }
    const authToken = getAuthToken(cookie);
    if (authToken) {
      store.dispatch('global/getUserInfo', { authToken }).then(res).catch((error) => {
        redirect('/');
        res();
      });
    } else {
      if (/\/user/.test(route.path)) {
        redirect('/');
      }
      res();
    }
  });
}

function getAuthToken (strCookie) {
  if (!strCookie) {
    return null;
  }
  const match = (strCookie || '').match(/WeLink=(.[^;]*)/);
  const authToken = match && match[1];
  return authToken;
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
