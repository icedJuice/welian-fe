const BezierEasing = require('bezier-easing')

const _ = {
  $(selector) {
    return document.querySelector(selector)
  },
  on(element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events]
    }
    events.forEach(event => {
      element.addEventListener(event, handler, { passive: true })
    })
  },
  off(element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events]
    }
    events.forEach(event => {
      element.removeEventListener(event, handler)
    })
  }
}

export const Easing = {
  ease: [0.25, 0.1, 0.25, 1.0],
  linear: [0, 0.0, 1, 1.0],
  'ease-in': [0.42, 0.0, 1, 1.0],
  'ease-out': [0, 0.0, 0.58, 1.0],
  'ease-in-out': [0.42, 0.0, 0.58, 1.0]
}

export const scrollTo = (element, duration = 500, options) => {
  options = options || {}
  options.easing = Easing.ease

  if (typeof element === 'string') {
    element = _.$(element)
  }

  const page = _.$('html, body')
  const events = [
    'scroll',
    'mousedown',
    'wheel',
    'DOMMouseScroll',
    'mousewheel',
    'keyup',
    'touchmove'
  ]
  
  let abort = false

  const abortFn = function() {
    abort = true
  }

  _.on(page, events, abortFn)

  let elementY = 0
  const initialY = window.pageYOffset
  if (Object.is(typeof element, 'number')) {
    elementY = element
  } else {
    elementY = initialY + element.getBoundingClientRect().top
  }

  let targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY

  if (options.offset) {
    targetY += options.offset
  }

  const diff = targetY - initialY
  const easing = Reflect.apply(BezierEasing, BezierEasing, options.easing)
  let start

  const done = function() {
    _.off(page, events, abortFn)
    if (abort && options.onCancel) {
      options.onCancel()
    }
    if (!abort && options.onDone) {
      options.onDone()
    }
  }

  if (!diff) return

  window.requestAnimationFrame(function step(timestamp) {
    if (abort) return done()
    if (!start) start = timestamp

    const time = timestamp - start
    let progress = Math.min(time / duration, 1)
    progress = easing(progress)

    window.scrollTo(0, initialY + diff * progress)

    if (time < duration) {
      window.requestAnimationFrame(step)
    } else {
      done()
    }
  })
}

/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。

*/
// const easeOut = (t, b, c, d) => {
//   let _t = t;
//   let _b = b;
//   let _c = c;
//   let _d = d;
//   const result = -_c * ((_t = _t / _d - 1) * _t * _t * _t - 1) + _b;
//   return result;
// };
/**
*
* @param {*} target 目标元素dom
* @param {*} vertical 是否横向
* @param {*} diff 偏移量
* @param {*} easing 变化曲线函数
* @param {*} duration 变化帧数
*/
// export const scrollTo = (target, {vertical = false, diff = 0, easing = easeOut, duration = 24 }) =>  new Promise((res, rej) => {
//   if (!target) {
//       const error = {message: 'Method [scrollTo] : param target is not a DOM.'};
//       rej(error);
//       return;
//   }
//   const begin = target.scrollTop;
//   if (isAndroid() && target?.scrollTo ) {
//       const scrollParam = {
//           [vertical ? 'left' : 'top']: begin + diff,
//           behavior: 'smooth',
//       };
//       target.scrollTo(scrollParam);
//       res();
//       return;
//   }
//   let t = 0;
//   const dur = vertical ? 'scrollLeft' : 'scrollTop';
//   const timer = setInterval(() => {
//       const currSl = easing(t, begin, diff, duration);
//       if (++ t === duration ) {
//           clearInterval(timer);
//           target[dur] = begin + diff;
//           res();
//           return;
//       }
//       target[dur] = currSl;
//   }, 1000 / 60);
// });