var pl = Object.defineProperty;
var ml = (e, t, n) => t in e ? pl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var W = (e, t, n) => ml(e, typeof t != "symbol" ? t + "" : t, n);
import { getCurrentInstance as hl, inject as xt, cloneVNode as As, defineComponent as ve, openBlock as U, createElementBlock as ie, normalizeClass as ge, renderSlot as Pe, computed as se, normalizeStyle as bt, createElementVNode as G, toRef as to, toRefs as or, resolveComponent as qe, createBlock as Ee, createCommentVNode as ke, provide as Ps, reactive as Ei, ref as me, onMounted as ft, onUpdated as sr, watch as ze, onBeforeUnmount as yn, readonly as vl, onDeactivated as gl, createVNode as X, Fragment as lt, Teleport as yl, mergeProps as bl, Transition as wl, withDirectives as El, vShow as Sl, nextTick as ei, withCtx as ue, createTextVNode as Ue, toDisplayString as re, withModifiers as _l, onUnmounted as xs, TransitionGroup as Cl, isVNode as kl, render as no, shallowRef as fn, unref as D, h as ro, createStaticVNode as Ds, renderList as Sr } from "vue";
import { is as Q, getBusinessObject as bn, isAny as ti } from "bpmn-js/lib/util/ModelUtil";
import Ms from "bpmn-js/lib/NavigatedViewer";
import $s from "diagram-js-grid-bg";
import Tl from "bpmn-js-token-simulation/lib/animation";
import Ol from "bpmn-js-token-simulation/lib/features/colored-scopes";
import Al from "bpmn-js-token-simulation/lib/features/context-pads";
import Pl from "bpmn-js-token-simulation/lib/features/simulation-state";
import xl from "bpmn-js-token-simulation/lib/features/show-scopes";
import Dl from "bpmn-js-token-simulation/lib/features/token-count";
import Ml from "bpmn-js-token-simulation/lib/features/exclusive-gateway-settings";
import $l from "bpmn-js-token-simulation/lib/features/inclusive-gateway-settings";
import Ll from "bpmn-js-token-simulation/lib/features/palette";
import Il from "bpmn-js-token-simulation/lib/simulator/Scope";
import { ScopeTraits as io } from "bpmn-js-token-simulation/lib/simulator/ScopeTraits";
import { filterSet as Dn, findSet as oo } from "bpmn-js-token-simulation/lib/simulator/util/SetUtil";
import { eventsMatch as so } from "bpmn-js-token-simulation/lib/simulator/util/EventsUtil";
import { isInterrupting as Nl, isBoundaryEvent as jn, is as $e, isStartEvent as _r, isEventSubProcess as ao, isCompensationEvent as lo, getBusinessObject as Rl, isAny as Ls, isImplicitStartEvent as Bl } from "bpmn-js-token-simulation/lib/simulator/util/ModelUtil";
import Fl from "bpmn-js-token-simulation/lib/simulator/behaviors";
import { SCOPE_CREATE_EVENT as ar, RESET_SIMULATION_EVENT as wn, TOGGLE_MODE_EVENT as Gt, TRACE_EVENT as Is, PAUSE_SIMULATION_EVENT as zl, PLAY_SIMULATION_EVENT as jl, SCOPE_FILTER_CHANGED_EVENT as Vl, SCOPE_DESTROYED_EVENT as Hl } from "bpmn-js-token-simulation/lib/util/EventHelper";
import Ns from "bpmn-js-token-simulation/lib/features/scope-filter";
import Ul from "bpmn-js-token-simulation/lib/features/element-colors";
import ql from "bpmn-js-token-simulation/lib/features/element-support/ElementSupport";
import { escapeHTML as Wl } from "diagram-js/lib/util/EscapeUtil";
import { isAny as Kl } from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import Gl from "bpmn-js/lib/draw/BpmnRenderer";
import { getDi as co, getStrokeColor as fe, getFillColor as Ce, getSemantic as Cr, isThrowEvent as Yl, isTypedEvent as et, black as uo } from "bpmn-js/lib/draw/BpmnRenderUtil";
import { rotate as Xl } from "diagram-js/lib/util/SvgTransformUtil";
import Jl from "bpmn-js/lib/draw/PathMap";
import Zl from "bpmn-js-i18n-zh/lib/bpmn-js";
import { useI18n as Si } from "vue-i18n";
import Ql from "bpmn-js/lib/features/modeling";
const _i = Object.prototype.toString;
function Ci(e) {
  return _i.call(e) === "[object Array]";
}
function ki(e) {
  return _i.call(e) === "[object String]";
}
function Yt(e) {
  return _i.call(e) === "[object Number]" && e === e;
}
function ec(e) {
  return e === void 0;
}
function lr(e) {
  return typeof e == "function";
}
const cr = Symbol("ArcoConfigProvider");
var tc = Object.defineProperty, nc = Object.defineProperties, rc = Object.getOwnPropertyDescriptors, fo = Object.getOwnPropertySymbols, ic = Object.prototype.hasOwnProperty, oc = Object.prototype.propertyIsEnumerable, po = (e, t, n) => t in e ? tc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, sc = (e, t) => {
  for (var n in t || (t = {}))
    ic.call(t, n) && po(e, n, t[n]);
  if (fo)
    for (var n of fo(t))
      oc.call(t, n) && po(e, n, t[n]);
  return e;
}, ac = (e, t) => nc(e, rc(t));
const lc = "A", cc = "arco", ni = "$arco", En = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : lc;
}, Sn = (e, t) => {
  var n;
  t && t.classPrefix && (e.config.globalProperties[ni] = ac(sc({}, (n = e.config.globalProperties[ni]) != null ? n : {}), {
    classPrefix: t.classPrefix
  }));
}, xe = (e) => {
  var t, n, r;
  const i = hl(), o = xt(cr, void 0), s = (r = (n = o == null ? void 0 : o.prefixCls) != null ? n : (t = i == null ? void 0 : i.appContext.config.globalProperties[ni]) == null ? void 0 : t.classPrefix) != null ? r : cc;
  return e ? `${s}-${e}` : s;
};
var Rs = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, n) {
    var r = -1;
    return t.some(function(i, o) {
      return i[0] === n ? (r = o, !0) : !1;
    }), r;
  }
  return (
    /** @class */
    function() {
      function t() {
        this.__entries__ = [];
      }
      return Object.defineProperty(t.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: !0,
        configurable: !0
      }), t.prototype.get = function(n) {
        var r = e(this.__entries__, n), i = this.__entries__[r];
        return i && i[1];
      }, t.prototype.set = function(n, r) {
        var i = e(this.__entries__, n);
        ~i ? this.__entries__[i][1] = r : this.__entries__.push([n, r]);
      }, t.prototype.delete = function(n) {
        var r = this.__entries__, i = e(r, n);
        ~i && r.splice(i, 1);
      }, t.prototype.has = function(n) {
        return !!~e(this.__entries__, n);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(n, r) {
        r === void 0 && (r = null);
        for (var i = 0, o = this.__entries__; i < o.length; i++) {
          var s = o[i];
          n.call(r, s[1], s[0]);
        }
      }, t;
    }()
  );
}(), ri = typeof window < "u" && typeof document < "u" && window.document === document, Xn = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), uc = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Xn) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), dc = 2;
function fc(e, t) {
  var n = !1, r = !1, i = 0;
  function o() {
    n && (n = !1, e()), r && a();
  }
  function s() {
    uc(o);
  }
  function a() {
    var l = Date.now();
    if (n) {
      if (l - i < dc)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(s, t);
    i = l;
  }
  return a;
}
var pc = 20, mc = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], hc = typeof MutationObserver < "u", vc = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = fc(this.refresh.bind(this), pc);
    }
    return e.prototype.addObserver = function(t) {
      ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();
    }, e.prototype.removeObserver = function(t) {
      var n = this.observers_, r = n.indexOf(t);
      ~r && n.splice(r, 1), !n.length && this.connected_ && this.disconnect_();
    }, e.prototype.refresh = function() {
      var t = this.updateObservers_();
      t && this.refresh();
    }, e.prototype.updateObservers_ = function() {
      var t = this.observers_.filter(function(n) {
        return n.gatherActive(), n.hasActive();
      });
      return t.forEach(function(n) {
        return n.broadcastActive();
      }), t.length > 0;
    }, e.prototype.connect_ = function() {
      !ri || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), hc ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !ri || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var n = t.propertyName, r = n === void 0 ? "" : n, i = mc.some(function(o) {
        return !!~r.indexOf(o);
      });
      i && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), Bs = function(e, t) {
  for (var n = 0, r = Object.keys(t); n < r.length; n++) {
    var i = r[n];
    Object.defineProperty(e, i, {
      value: t[i],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, Ht = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || Xn;
}, Fs = ur(0, 0, 0, 0);
function Jn(e) {
  return parseFloat(e) || 0;
}
function mo(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, i) {
    var o = e["border-" + i + "-width"];
    return r + Jn(o);
  }, 0);
}
function gc(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var o = i[r], s = e["padding-" + o];
    n[o] = Jn(s);
  }
  return n;
}
function yc(e) {
  var t = e.getBBox();
  return ur(0, 0, t.width, t.height);
}
function bc(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return Fs;
  var r = Ht(e).getComputedStyle(e), i = gc(r), o = i.left + i.right, s = i.top + i.bottom, a = Jn(r.width), l = Jn(r.height);
  if (r.boxSizing === "border-box" && (Math.round(a + o) !== t && (a -= mo(r, "left", "right") + o), Math.round(l + s) !== n && (l -= mo(r, "top", "bottom") + s)), !Ec(e)) {
    var u = Math.round(a + o) - t, c = Math.round(l + s) - n;
    Math.abs(u) !== 1 && (a -= u), Math.abs(c) !== 1 && (l -= c);
  }
  return ur(i.left, i.top, a, l);
}
var wc = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof Ht(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof Ht(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function Ec(e) {
  return e === Ht(e).document.documentElement;
}
function Sc(e) {
  return ri ? wc(e) ? yc(e) : bc(e) : Fs;
}
function _c(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, o = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, s = Object.create(o.prototype);
  return Bs(s, {
    x: t,
    y: n,
    width: r,
    height: i,
    top: n,
    right: t + r,
    bottom: i + n,
    left: t
  }), s;
}
function ur(e, t, n, r) {
  return { x: e, y: t, width: n, height: r };
}
var Cc = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = ur(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = Sc(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), kc = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, n) {
      var r = _c(n);
      Bs(this, { target: t, contentRect: r });
    }
    return e;
  }()
), Tc = (
  /** @class */
  function() {
    function e(t, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new Rs(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Ht(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) || (n.set(t, new Cc(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Ht(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) && (n.delete(t), n.size || this.controller_.removeObserver(this));
      }
    }, e.prototype.disconnect = function() {
      this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
    }, e.prototype.gatherActive = function() {
      var t = this;
      this.clearActive(), this.observations_.forEach(function(n) {
        n.isActive() && t.activeObservations_.push(n);
      });
    }, e.prototype.broadcastActive = function() {
      if (this.hasActive()) {
        var t = this.callbackCtx_, n = this.activeObservations_.map(function(r) {
          return new kc(r.target, r.broadcastRect());
        });
        this.callback_.call(t, n, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), zs = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Rs(), js = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = vc.getInstance(), r = new Tc(t, n, this);
      zs.set(this, r);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  js.prototype[e] = function() {
    var t;
    return (t = zs.get(this))[e].apply(t, arguments);
  };
});
var Vs = function() {
  return typeof Xn.ResizeObserver < "u" ? Xn.ResizeObserver : js;
}(), ho;
(function(e) {
  e[e.ELEMENT = 1] = "ELEMENT", e[e.FUNCTIONAL_COMPONENT = 2] = "FUNCTIONAL_COMPONENT", e[e.STATEFUL_COMPONENT = 4] = "STATEFUL_COMPONENT", e[e.COMPONENT = 6] = "COMPONENT", e[e.TEXT_CHILDREN = 8] = "TEXT_CHILDREN", e[e.ARRAY_CHILDREN = 16] = "ARRAY_CHILDREN", e[e.SLOTS_CHILDREN = 32] = "SLOTS_CHILDREN", e[e.TELEPORT = 64] = "TELEPORT", e[e.SUSPENSE = 128] = "SUSPENSE", e[e.COMPONENT_SHOULD_KEEP_ALIVE = 256] = "COMPONENT_SHOULD_KEEP_ALIVE", e[e.COMPONENT_KEPT_ALIVE = 512] = "COMPONENT_KEPT_ALIVE";
})(ho || (ho = {}));
var vo;
(function(e) {
  e[e.TEXT = 1] = "TEXT", e[e.CLASS = 2] = "CLASS", e[e.STYLE = 4] = "STYLE", e[e.PROPS = 8] = "PROPS", e[e.FULL_PROPS = 16] = "FULL_PROPS", e[e.HYDRATE_EVENTS = 32] = "HYDRATE_EVENTS", e[e.STABLE_FRAGMENT = 64] = "STABLE_FRAGMENT", e[e.KEYED_FRAGMENT = 128] = "KEYED_FRAGMENT", e[e.UNKEYED_FRAGMENT = 256] = "UNKEYED_FRAGMENT", e[e.NEED_PATCH = 512] = "NEED_PATCH", e[e.DYNAMIC_SLOTS = 1024] = "DYNAMIC_SLOTS", e[e.DEV_ROOT_FRAGMENT = 2048] = "DEV_ROOT_FRAGMENT", e[e.HOISTED = -1] = "HOISTED", e[e.BAIL = -2] = "BAIL";
})(vo || (vo = {}));
const Ti = (e) => !!(e && e.shapeFlag & 1), Oi = (e, t) => !!(e && e.shapeFlag & 6), Hs = (e, t) => !!(e && e.shapeFlag & 16), Oc = (e, t) => !!(e && e.shapeFlag & 32), Vn = (e) => {
  var t, n;
  if (e)
    for (const r of e) {
      if (Ti(r) || Oi(r))
        return r;
      if (Hs(r, r.children)) {
        const i = Vn(r.children);
        if (i)
          return i;
      } else if (Oc(r, r.children)) {
        const i = (n = (t = r.children).default) == null ? void 0 : n.call(t);
        if (i) {
          const o = Vn(i);
          if (o)
            return o;
        }
      } else if (Ci(r)) {
        const i = Vn(r);
        if (i)
          return i;
      }
    }
}, Ac = (e) => {
  if (!e)
    return !0;
  for (const t of e)
    if (t.children)
      return !1;
  return !0;
}, Us = (e, t) => {
  if (e && e.length > 0)
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      if (Ti(r) || Oi(r)) {
        const o = lr(t) ? t(r) : t;
        return e[n] = As(r, o, !0), !0;
      }
      const i = qs(r);
      if (i && i.length > 0 && Us(i, t))
        return !0;
    }
  return !1;
}, qs = (e) => {
  if (Hs(e, e.children))
    return e.children;
  if (Ci(e))
    return e;
}, Ws = (e) => {
  var t, n;
  if (Ti(e))
    return e.el;
  if (Oi(e)) {
    if (((t = e.el) == null ? void 0 : t.nodeType) === 1)
      return e.el;
    if ((n = e.component) != null && n.subTree) {
      const r = Ws(e.component.subTree);
      if (r)
        return r;
    }
  } else {
    const r = qs(e);
    return Ks(r);
  }
}, Ks = (e) => {
  if (e && e.length > 0)
    for (const t of e) {
      const n = Ws(t);
      if (n)
        return n;
    }
}, go = (e) => {
  if (e)
    return lr(e) ? e : () => e;
}, Gs = typeof window > "u" ? global : window, Pc = Gs.requestAnimationFrame, yo = Gs.cancelAnimationFrame;
function bo(e) {
  let t = 0;
  const n = (...r) => {
    t && yo(t), t = Pc(() => {
      e(...r), t = 0;
    });
  };
  return n.cancel = () => {
    yo(t), t = 0;
  }, n;
}
const Ai = () => {
}, xc = () => {
  const { body: e } = document, t = document.documentElement;
  let n;
  try {
    n = (window.top || window.self || window).document.body;
  } catch {
  }
  return {
    height: Math.max(e.scrollHeight, e.offsetHeight, t.clientHeight, t.scrollHeight, t.offsetHeight, (n == null ? void 0 : n.scrollHeight) || 0, (n == null ? void 0 : n.clientHeight) || 0),
    width: Math.max(e.scrollWidth, e.offsetWidth, t.clientWidth, t.scrollWidth, t.offsetWidth, (n == null ? void 0 : n.scrollWidth) || 0, (n == null ? void 0 : n.clientWidth) || 0)
  };
}, Pi = (() => {
  try {
    return !(typeof window < "u" && document !== void 0);
  } catch {
    return !0;
  }
})(), kr = Pi ? Ai : (e, t, n, r = !1) => {
  e.addEventListener(t, n, r);
}, wo = Pi ? Ai : (e, t, n, r = !1) => {
  e.removeEventListener(t, n, r);
}, Dc = (e) => {
  const t = document.createElement("div");
  return t.setAttribute("class", `arco-overlay arco-overlay-${e}`), t;
}, Mc = (e, t) => {
  var n;
  return Pi ? Ai() : (n = document.querySelector(e)) != null ? n : void 0;
}, Eo = (e, t) => {
  if (ki(e)) {
    const n = e[0] === "#" ? `[id='${e.slice(1)}']` : e;
    return Mc(n);
  }
  return e;
};
var Ye = (e, t) => {
  for (const [n, r] of t)
    e[n] = r;
  return e;
};
const $c = ve({
  name: "IconHover",
  props: {
    prefix: {
      type: String
    },
    size: {
      type: String,
      default: "medium"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup() {
    return {
      prefixCls: xe("icon-hover")
    };
  }
});
function Lc(e, t, n, r, i, o) {
  return U(), ie("span", {
    class: ge([
      e.prefixCls,
      {
        [`${e.prefix}-icon-hover`]: e.prefix,
        [`${e.prefixCls}-size-${e.size}`]: e.size !== "medium",
        [`${e.prefixCls}-disabled`]: e.disabled
      }
    ])
  }, [
    Pe(e.$slots, "default")
  ], 2);
}
var Ys = /* @__PURE__ */ Ye($c, [["render", Lc]]);
const Ic = ve({
  name: "IconClose",
  props: {
    size: {
      type: [Number, String]
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    strokeLinecap: {
      type: String,
      default: "butt",
      validator: (e) => ["butt", "round", "square"].includes(e)
    },
    strokeLinejoin: {
      type: String,
      default: "miter",
      validator: (e) => ["arcs", "bevel", "miter", "miter-clip", "round"].includes(e)
    },
    rotate: Number,
    spin: Boolean
  },
  emits: {
    click: (e) => !0
  },
  setup(e, { emit: t }) {
    const n = xe("icon"), r = se(() => [n, `${n}-close`, { [`${n}-spin`]: e.spin }]), i = se(() => {
      const s = {};
      return e.size && (s.fontSize = Yt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: i,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), Nc = ["stroke-width", "stroke-linecap", "stroke-linejoin"], Rc = /* @__PURE__ */ G("path", { d: "M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142" }, null, -1), Bc = [
  Rc
];
function Fc(e, t, n, r, i, o) {
  return U(), ie("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: ge(e.cls),
    style: bt(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, Bc, 14, Nc);
}
var Tr = /* @__PURE__ */ Ye(Ic, [["render", Fc]]);
const Xs = Object.assign(Tr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Tr.name, Tr);
  }
}), zc = ve({
  name: "IconInfoCircleFill",
  props: {
    size: {
      type: [Number, String]
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    strokeLinecap: {
      type: String,
      default: "butt",
      validator: (e) => ["butt", "round", "square"].includes(e)
    },
    strokeLinejoin: {
      type: String,
      default: "miter",
      validator: (e) => ["arcs", "bevel", "miter", "miter-clip", "round"].includes(e)
    },
    rotate: Number,
    spin: Boolean
  },
  emits: {
    click: (e) => !0
  },
  setup(e, { emit: t }) {
    const n = xe("icon"), r = se(() => [n, `${n}-info-circle-fill`, { [`${n}-spin`]: e.spin }]), i = se(() => {
      const s = {};
      return e.size && (s.fontSize = Yt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: i,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), jc = ["stroke-width", "stroke-linecap", "stroke-linejoin"], Vc = /* @__PURE__ */ G("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm2-30a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Zm0 17h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), Hc = [
  Vc
];
function Uc(e, t, n, r, i, o) {
  return U(), ie("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: ge(e.cls),
    style: bt(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, Hc, 14, jc);
}
var Or = /* @__PURE__ */ Ye(zc, [["render", Uc]]);
const qc = Object.assign(Or, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Or.name, Or);
  }
}), Wc = ve({
  name: "IconCheckCircleFill",
  props: {
    size: {
      type: [Number, String]
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    strokeLinecap: {
      type: String,
      default: "butt",
      validator: (e) => ["butt", "round", "square"].includes(e)
    },
    strokeLinejoin: {
      type: String,
      default: "miter",
      validator: (e) => ["arcs", "bevel", "miter", "miter-clip", "round"].includes(e)
    },
    rotate: Number,
    spin: Boolean
  },
  emits: {
    click: (e) => !0
  },
  setup(e, { emit: t }) {
    const n = xe("icon"), r = se(() => [n, `${n}-check-circle-fill`, { [`${n}-spin`]: e.spin }]), i = se(() => {
      const s = {};
      return e.size && (s.fontSize = Yt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: i,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), Kc = ["stroke-width", "stroke-linecap", "stroke-linejoin"], Gc = /* @__PURE__ */ G("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm10.207-24.379a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0L22 26.172l-4.878-4.88a1 1 0 0 0-1.415 0l-1.414 1.415a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414 0l11.5-11.5Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), Yc = [
  Gc
];
function Xc(e, t, n, r, i, o) {
  return U(), ie("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: ge(e.cls),
    style: bt(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, Yc, 14, Kc);
}
var Ar = /* @__PURE__ */ Ye(Wc, [["render", Xc]]);
const Jc = Object.assign(Ar, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Ar.name, Ar);
  }
}), Zc = ve({
  name: "IconExclamationCircleFill",
  props: {
    size: {
      type: [Number, String]
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    strokeLinecap: {
      type: String,
      default: "butt",
      validator: (e) => ["butt", "round", "square"].includes(e)
    },
    strokeLinejoin: {
      type: String,
      default: "miter",
      validator: (e) => ["arcs", "bevel", "miter", "miter-clip", "round"].includes(e)
    },
    rotate: Number,
    spin: Boolean
  },
  emits: {
    click: (e) => !0
  },
  setup(e, { emit: t }) {
    const n = xe("icon"), r = se(() => [n, `${n}-exclamation-circle-fill`, { [`${n}-spin`]: e.spin }]), i = se(() => {
      const s = {};
      return e.size && (s.fontSize = Yt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: i,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), Qc = ["stroke-width", "stroke-linecap", "stroke-linejoin"], e0 = /* @__PURE__ */ G("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm-2-11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2Zm4-18a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V15Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), t0 = [
  e0
];
function n0(e, t, n, r, i, o) {
  return U(), ie("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: ge(e.cls),
    style: bt(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, t0, 14, Qc);
}
var Pr = /* @__PURE__ */ Ye(Zc, [["render", n0]]);
const r0 = Object.assign(Pr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Pr.name, Pr);
  }
}), i0 = ve({
  name: "IconCloseCircleFill",
  props: {
    size: {
      type: [Number, String]
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    strokeLinecap: {
      type: String,
      default: "butt",
      validator: (e) => ["butt", "round", "square"].includes(e)
    },
    strokeLinejoin: {
      type: String,
      default: "miter",
      validator: (e) => ["arcs", "bevel", "miter", "miter-clip", "round"].includes(e)
    },
    rotate: Number,
    spin: Boolean
  },
  emits: {
    click: (e) => !0
  },
  setup(e, { emit: t }) {
    const n = xe("icon"), r = se(() => [n, `${n}-close-circle-fill`, { [`${n}-spin`]: e.spin }]), i = se(() => {
      const s = {};
      return e.size && (s.fontSize = Yt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: i,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), o0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], s0 = /* @__PURE__ */ G("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm4.955-27.771-4.95 4.95-4.95-4.95a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l4.95 4.95-4.95 4.95a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-4.95-4.95 4.95-4.95a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), a0 = [
  s0
];
function l0(e, t, n, r, i, o) {
  return U(), ie("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: ge(e.cls),
    style: bt(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, a0, 14, o0);
}
var xr = /* @__PURE__ */ Ye(i0, [["render", l0]]);
const c0 = Object.assign(xr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + xr.name, xr);
  }
}), u0 = ["info", "success", "warning", "error"], d0 = ve({
  name: "IconLoading",
  props: {
    size: {
      type: [Number, String]
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    strokeLinecap: {
      type: String,
      default: "butt",
      validator: (e) => ["butt", "round", "square"].includes(e)
    },
    strokeLinejoin: {
      type: String,
      default: "miter",
      validator: (e) => ["arcs", "bevel", "miter", "miter-clip", "round"].includes(e)
    },
    rotate: Number,
    spin: Boolean
  },
  emits: {
    click: (e) => !0
  },
  setup(e, { emit: t }) {
    const n = xe("icon"), r = se(() => [n, `${n}-loading`, { [`${n}-spin`]: e.spin }]), i = se(() => {
      const s = {};
      return e.size && (s.fontSize = Yt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: i,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), f0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], p0 = /* @__PURE__ */ G("path", { d: "M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6" }, null, -1), m0 = [
  p0
];
function h0(e, t, n, r, i, o) {
  return U(), ie("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: ge(e.cls),
    style: bt(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, m0, 14, f0);
}
var Dr = /* @__PURE__ */ Ye(d0, [["render", h0]]);
const dr = Object.assign(Dr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Dr.name, Dr);
  }
});
var v0 = Object.defineProperty, So = Object.getOwnPropertySymbols, g0 = Object.prototype.hasOwnProperty, y0 = Object.prototype.propertyIsEnumerable, _o = (e, t, n) => t in e ? v0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, b0 = (e, t) => {
  for (var n in t || (t = {}))
    g0.call(t, n) && _o(e, n, t[n]);
  if (So)
    for (var n of So(t))
      y0.call(t, n) && _o(e, n, t[n]);
  return e;
};
const w0 = (e, t) => {
  const n = b0({}, e);
  for (const r of t)
    r in n && delete n[r];
  return n;
}, E0 = Symbol("ArcoFormItemContext"), S0 = ({
  size: e,
  disabled: t,
  error: n,
  uninject: r
} = {}) => {
  const i = r ? {} : xt(E0, {}), o = se(() => {
    var c;
    return (c = e == null ? void 0 : e.value) != null ? c : i.size;
  }), s = se(() => (t == null ? void 0 : t.value) || i.disabled), a = se(() => (n == null ? void 0 : n.value) || i.error), l = to(i, "feedback"), u = to(i, "eventHandlers");
  return {
    formItemCtx: i,
    mergedSize: o,
    mergedDisabled: s,
    mergedError: a,
    feedback: l,
    eventHandlers: u
  };
}, Js = (e, { defaultValue: t = "medium" } = {}) => {
  const n = xt(cr, void 0);
  return {
    mergedSize: se(() => {
      var i, o;
      return (o = (i = e == null ? void 0 : e.value) != null ? i : n == null ? void 0 : n.size) != null ? o : t;
    })
  };
}, Zs = Symbol("ArcoButtonGroup"), _0 = ve({
  name: "Button",
  components: {
    IconLoading: dr
  },
  props: {
    type: {
      type: String
    },
    shape: {
      type: String
    },
    status: {
      type: String
    },
    size: {
      type: String
    },
    long: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean
    },
    htmlType: {
      type: String,
      default: "button"
    },
    autofocus: {
      type: Boolean,
      default: !1
    },
    href: String
  },
  emits: {
    click: (e) => !0
  },
  setup(e, { emit: t }) {
    const { size: n, disabled: r } = or(e), i = xe("btn"), o = xt(Zs, void 0), s = se(() => {
      var g;
      return (g = n.value) != null ? g : o == null ? void 0 : o.size;
    }), a = se(() => !!(r.value || o != null && o.disabled)), { mergedSize: l, mergedDisabled: u } = S0({
      size: s,
      disabled: a
    }), { mergedSize: c } = Js(l), m = se(() => {
      var g, h, b, w, T, M;
      return [
        i,
        `${i}-${(h = (g = e.type) != null ? g : o == null ? void 0 : o.type) != null ? h : "secondary"}`,
        `${i}-shape-${(w = (b = e.shape) != null ? b : o == null ? void 0 : o.shape) != null ? w : "square"}`,
        `${i}-size-${c.value}`,
        `${i}-status-${(M = (T = e.status) != null ? T : o == null ? void 0 : o.status) != null ? M : "normal"}`,
        {
          [`${i}-long`]: e.long,
          [`${i}-loading`]: e.loading,
          [`${i}-disabled`]: u.value,
          [`${i}-link`]: ki(e.href)
        }
      ];
    });
    return {
      prefixCls: i,
      cls: m,
      mergedDisabled: u,
      handleClick: (g) => {
        if (e.disabled || e.loading) {
          g.preventDefault();
          return;
        }
        t("click", g);
      }
    };
  }
}), C0 = ["href"], k0 = ["type", "disabled", "autofocus"];
function T0(e, t, n, r, i, o) {
  const s = qe("icon-loading");
  return e.href ? (U(), ie("a", {
    key: 0,
    class: ge([
      e.cls,
      { [`${e.prefixCls}-only-icon`]: e.$slots.icon && !e.$slots.default }
    ]),
    href: e.mergedDisabled || e.loading ? void 0 : e.href,
    onClick: t[0] || (t[0] = (...a) => e.handleClick && e.handleClick(...a))
  }, [
    e.loading || e.$slots.icon ? (U(), ie("span", {
      key: 0,
      class: ge(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (U(), Ee(s, {
        key: 0,
        spin: "true"
      })) : Pe(e.$slots, "icon", { key: 1 })
    ], 2)) : ke("v-if", !0),
    Pe(e.$slots, "default")
  ], 10, C0)) : (U(), ie("button", {
    key: 1,
    class: ge([
      e.cls,
      { [`${e.prefixCls}-only-icon`]: e.$slots.icon && !e.$slots.default }
    ]),
    type: e.htmlType,
    disabled: e.mergedDisabled,
    autofocus: e.autofocus,
    onClick: t[1] || (t[1] = (...a) => e.handleClick && e.handleClick(...a))
  }, [
    e.loading || e.$slots.icon ? (U(), ie("span", {
      key: 0,
      class: ge(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (U(), Ee(s, {
        key: 0,
        spin: !0
      })) : Pe(e.$slots, "icon", { key: 1 })
    ], 2)) : ke("v-if", !0),
    Pe(e.$slots, "default")
  ], 10, k0));
}
var Mr = /* @__PURE__ */ Ye(_0, [["render", T0]]);
const O0 = ve({
  name: "ButtonGroup",
  props: {
    type: {
      type: String
    },
    status: {
      type: String
    },
    shape: {
      type: String
    },
    size: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  setup(e) {
    const { type: t, size: n, status: r, disabled: i, shape: o } = or(e), s = xe("btn-group");
    return Ps(Zs, Ei({
      type: t,
      size: n,
      shape: o,
      status: r,
      disabled: i
    })), {
      prefixCls: s
    };
  }
});
function A0(e, t, n, r, i, o) {
  return U(), ie("div", {
    class: ge(e.prefixCls)
  }, [
    Pe(e.$slots, "default")
  ], 2);
}
var Hn = /* @__PURE__ */ Ye(O0, [["render", A0]]);
const st = Object.assign(Mr, {
  Group: Hn,
  install: (e, t) => {
    Sn(e, t);
    const n = En(t);
    e.component(n + Mr.name, Mr), e.component(n + Hn.name, Hn);
  }
});
var P0 = Object.defineProperty, Co = Object.getOwnPropertySymbols, x0 = Object.prototype.hasOwnProperty, D0 = Object.prototype.propertyIsEnumerable, ko = (e, t, n) => t in e ? P0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, on = (e, t) => {
  for (var n in t || (t = {}))
    x0.call(t, n) && ko(e, n, t[n]);
  if (Co)
    for (var n of Co(t))
      D0.call(t, n) && ko(e, n, t[n]);
  return e;
};
const M0 = () => {
  const { height: e, width: t } = xc();
  return {
    width: Math.min(t, window.innerWidth),
    height: Math.min(e, window.innerHeight)
  };
}, To = (e, t) => {
  var n, r;
  const i = e.getBoundingClientRect();
  return {
    top: i.top,
    bottom: i.bottom,
    left: i.left,
    right: i.right,
    scrollTop: i.top - t.top,
    scrollBottom: i.bottom - t.top,
    scrollLeft: i.left - t.left,
    scrollRight: i.right - t.left,
    width: (n = e.offsetWidth) != null ? n : e.clientWidth,
    height: (r = e.offsetHeight) != null ? r : e.clientHeight
  };
}, $0 = (e) => {
  switch (e) {
    case "top":
    case "tl":
    case "tr":
      return "top";
    case "bottom":
    case "bl":
    case "br":
      return "bottom";
    case "left":
    case "lt":
    case "lb":
      return "left";
    case "right":
    case "rt":
    case "rb":
      return "right";
    default:
      return "top";
  }
}, Mn = (e, t) => {
  switch (t) {
    case "top":
      switch (e) {
        case "bottom":
          return "top";
        case "bl":
          return "tl";
        case "br":
          return "tr";
        default:
          return e;
      }
    case "bottom":
      switch (e) {
        case "top":
          return "bottom";
        case "tl":
          return "bl";
        case "tr":
          return "br";
        default:
          return e;
      }
    case "left":
      switch (e) {
        case "right":
          return "left";
        case "rt":
          return "lt";
        case "rb":
          return "lb";
        default:
          return e;
      }
    case "right":
      switch (e) {
        case "left":
          return "right";
        case "lt":
          return "rt";
        case "lb":
          return "rb";
        default:
          return e;
      }
    default:
      return e;
  }
}, L0 = (e, t, {
  containerRect: n,
  triggerRect: r,
  popupRect: i,
  offset: o,
  translate: s
}) => {
  const a = $0(e), l = M0(), u = {
    top: n.top + t.top,
    bottom: l.height - (n.top + t.top + i.height),
    left: n.left + t.left,
    right: l.width - (n.left + t.left + i.width)
  };
  let c = e;
  if (a === "top" && u.top < 0)
    if (r.top > i.height)
      t.top = -n.top;
    else {
      const m = sn("bottom", r, i, {
        offset: o,
        translate: s
      });
      l.height - (n.top + m.top + i.height) > 0 && (c = Mn(e, "bottom"), t.top = m.top);
    }
  if (a === "bottom" && u.bottom < 0)
    if (l.height - r.bottom > i.height)
      t.top = -n.top + (l.height - i.height);
    else {
      const m = sn("top", r, i, {
        offset: o,
        translate: s
      });
      n.top + m.top > 0 && (c = Mn(e, "top"), t.top = m.top);
    }
  if (a === "left" && u.left < 0)
    if (r.left > i.width)
      t.left = -n.left;
    else {
      const m = sn("right", r, i, {
        offset: o,
        translate: s
      });
      l.width - (n.left + m.left + i.width) > 0 && (c = Mn(e, "right"), t.left = m.left);
    }
  if (a === "right" && u.right < 0)
    if (l.width - r.right > i.width)
      t.left = -n.left + (l.width - i.width);
    else {
      const m = sn("left", r, i, {
        offset: o,
        translate: s
      });
      n.left + m.left > 0 && (c = Mn(e, "left"), t.left = m.left);
    }
  return (a === "top" || a === "bottom") && (u.left < 0 ? t.left = -n.left : u.right < 0 && (t.left = -n.left + (l.width - i.width))), (a === "left" || a === "right") && (u.top < 0 ? t.top = -n.top : u.bottom < 0 && (t.top = -n.top + (l.height - i.height))), {
    popupPosition: t,
    position: c
  };
}, sn = (e, t, n, {
  offset: r = 0,
  translate: i = [0, 0]
} = {}) => {
  var o;
  const s = (o = Ci(i) ? i : i[e]) != null ? o : [0, 0];
  switch (e) {
    case "top":
      return {
        left: t.scrollLeft + Math.round(t.width / 2) - Math.round(n.width / 2) + s[0],
        top: t.scrollTop - n.height - r + s[1]
      };
    case "tl":
      return {
        left: t.scrollLeft + s[0],
        top: t.scrollTop - n.height - r + s[1]
      };
    case "tr":
      return {
        left: t.scrollRight - n.width + s[0],
        top: t.scrollTop - n.height - r + s[1]
      };
    case "bottom":
      return {
        left: t.scrollLeft + Math.round(t.width / 2) - Math.round(n.width / 2) + s[0],
        top: t.scrollBottom + r + s[1]
      };
    case "bl":
      return {
        left: t.scrollLeft + s[0],
        top: t.scrollBottom + r + s[1]
      };
    case "br":
      return {
        left: t.scrollRight - n.width + s[0],
        top: t.scrollBottom + r + s[1]
      };
    case "left":
      return {
        left: t.scrollLeft - n.width - r + s[0],
        top: t.scrollTop + Math.round(t.height / 2) - Math.round(n.height / 2) + s[1]
      };
    case "lt":
      return {
        left: t.scrollLeft - n.width - r + s[0],
        top: t.scrollTop + s[1]
      };
    case "lb":
      return {
        left: t.scrollLeft - n.width - r + s[0],
        top: t.scrollBottom - n.height + s[1]
      };
    case "right":
      return {
        left: t.scrollRight + r + s[0],
        top: t.scrollTop + Math.round(t.height / 2) - Math.round(n.height / 2) + s[1]
      };
    case "rt":
      return {
        left: t.scrollRight + r + s[0],
        top: t.scrollTop + s[1]
      };
    case "rb":
      return {
        left: t.scrollRight + r + s[0],
        top: t.scrollBottom - n.height + s[1]
      };
    default:
      return {
        left: 0,
        top: 0
      };
  }
}, I0 = (e) => {
  let t = "0";
  ["top", "bottom"].includes(e) ? t = "50%" : ["left", "lt", "lb", "tr", "br"].includes(e) && (t = "100%");
  let n = "0";
  return ["left", "right"].includes(e) ? n = "50%" : ["top", "tl", "tr", "lb", "rb"].includes(e) && (n = "100%"), `${t} ${n}`;
}, N0 = (e, t, n, r, {
  offset: i = 0,
  translate: o = [0, 0],
  customStyle: s = {},
  autoFitPosition: a = !1
} = {}) => {
  let l = e, u = sn(e, n, r, {
    offset: i,
    translate: o
  });
  if (a) {
    const m = L0(e, u, {
      containerRect: t,
      popupRect: r,
      triggerRect: n,
      offset: i,
      translate: o
    });
    u = m.popupPosition, l = m.position;
  }
  return {
    style: on({
      left: `${u.left}px`,
      top: `${u.top}px`
    }, s),
    position: l
  };
}, R0 = (e, t, n, {
  customStyle: r = {}
}) => {
  if (["top", "tl", "tr", "bottom", "bl", "br"].includes(e)) {
    let o = Math.abs(t.scrollLeft + t.width / 2 - n.scrollLeft);
    return o > n.width - 8 && (t.width > n.width ? o = n.width / 2 : o = n.width - 8), ["top", "tl", "tr"].includes(e) ? on({
      left: `${o}px`,
      bottom: "0",
      transform: "translate(-50%,50%) rotate(45deg)"
    }, r) : on({
      left: `${o}px`,
      top: "0",
      transform: "translate(-50%,-50%) rotate(45deg)"
    }, r);
  }
  let i = Math.abs(t.scrollTop + t.height / 2 - n.scrollTop);
  return i > n.height - 8 && (t.height > n.height ? i = n.height / 2 : i = n.height - 8), ["left", "lt", "lb"].includes(e) ? on({
    top: `${i}px`,
    right: "0",
    transform: "translate(50%,-50%) rotate(45deg)"
  }, r) : on({
    top: `${i}px`,
    left: "0",
    transform: "translate(-50%,-50%) rotate(45deg)"
  }, r);
}, B0 = (e) => e.scrollHeight > e.offsetHeight || e.scrollWidth > e.offsetWidth, Oo = (e) => {
  var t;
  const n = [];
  let r = e;
  for (; r && r !== document.documentElement; )
    B0(r) && n.push(r), r = (t = r.parentElement) != null ? t : void 0;
  return n;
}, Qs = () => {
  const e = {}, t = me(), n = () => {
    const r = Ks(e.value);
    r !== t.value && (t.value = r);
  };
  return ft(() => n()), sr(() => n()), {
    children: e,
    firstElement: t
  };
};
var Ao = ve({
  name: "ResizeObserver",
  props: {
    watchOnUpdated: Boolean
  },
  emits: [
    "resize"
  ],
  setup(e, { emit: t, slots: n }) {
    const { children: r, firstElement: i } = Qs();
    let o;
    const s = (l) => {
      l && (o = new Vs((u) => {
        const c = u[0];
        t("resize", c);
      }), o.observe(l));
    }, a = () => {
      o && (o.disconnect(), o = null);
    };
    return ze(i, (l) => {
      o && a(), l && s(l);
    }), yn(() => {
      o && a();
    }), () => {
      var l;
      return r.value = (l = n.default) == null ? void 0 : l.call(n), r.value;
    };
  }
});
function F0(e, t) {
  const n = me(e[t]);
  return sr(() => {
    const r = e[t];
    n.value !== r && (n.value = r);
  }), n;
}
const Po = Symbol("ArcoTrigger"), z0 = 1e3, j0 = 5e3, V0 = 1;
class H0 {
  constructor() {
    this.popupStack = {
      popup: /* @__PURE__ */ new Set(),
      dialog: /* @__PURE__ */ new Set(),
      message: /* @__PURE__ */ new Set()
    }, this.getNextZIndex = (t) => (t === "message" ? Array.from(this.popupStack.message).pop() || j0 : Array.from(this.popupStack.popup).pop() || z0) + V0, this.add = (t) => {
      const n = this.getNextZIndex(t);
      return this.popupStack[t].add(n), t === "dialog" && this.popupStack.popup.add(n), n;
    }, this.delete = (t, n) => {
      this.popupStack[n].delete(t), n === "dialog" && this.popupStack.popup.delete(t);
    }, this.isLastDialog = (t) => this.popupStack.dialog.size > 1 ? t === Array.from(this.popupStack.dialog).pop() : !0;
  }
}
const $r = new H0();
function ea(e, {
  visible: t,
  runOnMounted: n
} = {}) {
  const r = me(0), i = () => {
    r.value = $r.add(e);
  }, o = () => {
    $r.delete(r.value, e);
  }, s = () => e === "dialog" ? $r.isLastDialog(r.value) : !1;
  return ze(() => t == null ? void 0 : t.value, (a) => {
    a ? i() : o();
  }, {
    immediate: !0
  }), n && (ft(() => {
    i();
  }), yn(() => {
    o();
  })), {
    zIndex: vl(r),
    open: i,
    close: o,
    isLastDialog: s
  };
}
const U0 = ({
  elementRef: e,
  onResize: t
}) => {
  let n;
  return {
    createResizeObserver: () => {
      e.value && (n = new Vs((o) => {
        const s = o[0];
        lr(t) && t(s);
      }), n.observe(e.value));
    },
    destroyResizeObserver: () => {
      n && (n.disconnect(), n = null);
    }
  };
};
var q0 = ve({
  name: "ClientOnly",
  setup(e, {
    slots: t
  }) {
    const n = me(!1);
    return ft(() => n.value = !0), () => {
      var r;
      return n.value ? (r = t.default) == null ? void 0 : r.call(t) : null;
    };
  }
});
const W0 = ({
  popupContainer: e,
  visible: t,
  defaultContainer: n = "body",
  documentContainer: r
}) => {
  const i = me(e.value), o = me(), s = () => {
    const a = Eo(e.value), l = a ? e.value : n, u = a ?? (r ? document.documentElement : Eo(n));
    l !== i.value && (i.value = l), u !== o.value && (o.value = u);
  };
  return ft(() => s()), ze(t, (a) => {
    i.value !== e.value && a && s();
  }), {
    teleportContainer: i,
    containerRef: o
  };
};
var K0 = Object.defineProperty, G0 = Object.defineProperties, Y0 = Object.getOwnPropertyDescriptors, xo = Object.getOwnPropertySymbols, X0 = Object.prototype.hasOwnProperty, J0 = Object.prototype.propertyIsEnumerable, Do = (e, t, n) => t in e ? K0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Z0 = (e, t) => {
  for (var n in t || (t = {}))
    X0.call(t, n) && Do(e, n, t[n]);
  if (xo)
    for (var n of xo(t))
      J0.call(t, n) && Do(e, n, t[n]);
  return e;
}, Q0 = (e, t) => G0(e, Y0(t));
const eu = ["onClick", "onMouseenter", "onMouseleave", "onFocusin", "onFocusout", "onContextmenu"];
var Lr = ve({
  name: "Trigger",
  inheritAttrs: !1,
  props: {
    popupVisible: {
      type: Boolean,
      default: void 0
    },
    defaultPopupVisible: {
      type: Boolean,
      default: !1
    },
    trigger: {
      type: [String, Array],
      default: "hover"
    },
    position: {
      type: String,
      default: "bottom"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    popupOffset: {
      type: Number,
      default: 0
    },
    popupTranslate: {
      type: [Array, Object]
    },
    showArrow: {
      type: Boolean,
      default: !1
    },
    alignPoint: {
      type: Boolean,
      default: !1
    },
    popupHoverStay: {
      type: Boolean,
      default: !0
    },
    blurToClose: {
      type: Boolean,
      default: !0
    },
    clickToClose: {
      type: Boolean,
      default: !0
    },
    clickOutsideToClose: {
      type: Boolean,
      default: !0
    },
    unmountOnClose: {
      type: Boolean,
      default: !0
    },
    contentClass: {
      type: [String, Array, Object]
    },
    contentStyle: {
      type: Object
    },
    arrowClass: {
      type: [String, Array, Object]
    },
    arrowStyle: {
      type: Object
    },
    popupStyle: {
      type: Object
    },
    animationName: {
      type: String,
      default: "fade-in"
    },
    duration: {
      type: [Number, Object]
    },
    mouseEnterDelay: {
      type: Number,
      default: 100
    },
    mouseLeaveDelay: {
      type: Number,
      default: 100
    },
    focusDelay: {
      type: Number,
      default: 0
    },
    autoFitPopupWidth: {
      type: Boolean,
      default: !1
    },
    autoFitPopupMinWidth: {
      type: Boolean,
      default: !1
    },
    autoFixPosition: {
      type: Boolean,
      default: !0
    },
    popupContainer: {
      type: [String, Object]
    },
    updateAtScroll: {
      type: Boolean,
      default: !1
    },
    autoFitTransformOrigin: {
      type: Boolean,
      default: !1
    },
    hideEmpty: {
      type: Boolean,
      default: !1
    },
    openedClass: {
      type: [String, Array, Object]
    },
    autoFitPosition: {
      type: Boolean,
      default: !0
    },
    renderToBody: {
      type: Boolean,
      default: !0
    },
    preventFocus: {
      type: Boolean,
      default: !1
    },
    scrollToClose: {
      type: Boolean,
      default: !1
    },
    scrollToCloseDistance: {
      type: Number,
      default: 0
    }
  },
  emits: {
    "update:popupVisible": (e) => !0,
    popupVisibleChange: (e) => !0,
    show: () => !0,
    hide: () => !0,
    resize: () => !0
  },
  setup(e, {
    emit: t,
    slots: n,
    attrs: r
  }) {
    const {
      popupContainer: i
    } = or(e), o = xe("trigger"), s = se(() => w0(r, eu)), a = xt(cr, void 0), l = se(() => [].concat(e.trigger)), u = /* @__PURE__ */ new Set(), c = xt(Po, void 0), {
      children: m,
      firstElement: S
    } = Qs(), g = me(), h = me(e.defaultPopupVisible), b = me(e.position), w = me({}), T = me({}), M = me({}), N = me(), d = me({
      top: 0,
      left: 0
    });
    let $ = null, P = null;
    const p = se(() => {
      var L;
      return (L = e.popupVisible) != null ? L : h.value;
    }), {
      teleportContainer: f,
      containerRef: v
    } = W0({
      popupContainer: i,
      visible: p,
      documentContainer: !0
    }), {
      zIndex: k
    } = ea("popup", {
      visible: p
    });
    let x = 0, O = !1, q = !1;
    const R = () => {
      x && (window.clearTimeout(x), x = 0);
    }, ae = (L) => {
      if (e.alignPoint) {
        const {
          pageX: J,
          pageY: Oe
        } = L;
        d.value = {
          top: Oe,
          left: J
        };
      }
    }, C = () => {
      if (!S.value || !g.value || !v.value)
        return;
      const L = v.value.getBoundingClientRect(), J = e.alignPoint ? {
        top: d.value.top,
        bottom: d.value.top,
        left: d.value.left,
        right: d.value.left,
        scrollTop: d.value.top,
        scrollBottom: d.value.top,
        scrollLeft: d.value.left,
        scrollRight: d.value.left,
        width: 0,
        height: 0
      } : To(S.value, L), Oe = () => To(g.value, L), mt = Oe(), {
        style: ot,
        position: ht
      } = N0(e.position, L, J, mt, {
        offset: e.popupOffset,
        translate: e.popupTranslate,
        customStyle: e.popupStyle,
        autoFitPosition: e.autoFitPosition
      });
      e.autoFitTransformOrigin && (T.value = {
        transformOrigin: I0(ht)
      }), e.autoFitPopupMinWidth ? ot.minWidth = `${J.width}px` : e.autoFitPopupWidth && (ot.width = `${J.width}px`), b.value !== ht && (b.value = ht), w.value = ot, e.showArrow && ei(() => {
        M.value = R0(ht, J, Oe(), {
          customStyle: e.arrowStyle
        });
      });
    }, A = (L, J) => {
      if (L === p.value && x === 0)
        return;
      const Oe = () => {
        h.value = L, t("update:popupVisible", L), t("popupVisibleChange", L), L && ei(() => {
          C();
        });
      };
      L || ($ = null, P = null), J ? (R(), L !== p.value && (x = window.setTimeout(Oe, J))) : Oe();
    }, B = (L) => {
      var J;
      (J = r.onClick) == null || J.call(r, L), !(e.disabled || p.value && !e.clickToClose) && (l.value.includes("click") ? (ae(L), A(!p.value)) : l.value.includes("contextMenu") && p.value && A(!1));
    }, z = (L) => {
      var J;
      (J = r.onMouseenter) == null || J.call(r, L), !(e.disabled || !l.value.includes("hover")) && (ae(L), A(!0, e.mouseEnterDelay));
    }, Y = (L) => {
      c == null || c.onMouseenter(L), z(L);
    }, ee = (L) => {
      var J;
      (J = r.onMouseleave) == null || J.call(r, L), !(e.disabled || !l.value.includes("hover")) && A(!1, e.mouseLeaveDelay);
    }, ne = (L) => {
      c == null || c.onMouseleave(L), ee(L);
    }, ye = (L) => {
      var J;
      (J = r.onFocusin) == null || J.call(r, L), !(e.disabled || !l.value.includes("focus")) && A(!0, e.focusDelay);
    }, le = (L) => {
      var J;
      (J = r.onFocusout) == null || J.call(r, L), !(e.disabled || !l.value.includes("focus")) && e.blurToClose && A(!1);
    }, be = (L) => {
      var J;
      (J = r.onContextmenu) == null || J.call(r, L), !(e.disabled || !l.value.includes("contextMenu") || p.value && !e.clickToClose) && (ae(L), A(!p.value), L.preventDefault());
    };
    Ps(Po, Ei({
      onMouseenter: Y,
      onMouseleave: ne,
      addChildRef: (L) => {
        u.add(L), c == null || c.addChildRef(L);
      },
      removeChildRef: (L) => {
        u.delete(L), c == null || c.removeChildRef(L);
      }
    }));
    const Te = () => {
      wo(document.documentElement, "mousedown", I), O = !1;
    }, Be = F0(n, "content"), y = se(() => {
      var L;
      return e.hideEmpty && Ac((L = Be.value) == null ? void 0 : L.call(Be));
    }), I = (L) => {
      var J, Oe, mt;
      if (!((J = S.value) != null && J.contains(L.target) || (Oe = g.value) != null && Oe.contains(L.target))) {
        for (const ot of u)
          if ((mt = ot.value) != null && mt.contains(L.target))
            return;
        Te(), A(!1);
      }
    }, F = (L, J) => {
      const [Oe, mt] = L, {
        scrollTop: ot,
        scrollLeft: ht
      } = J;
      return Math.abs(ot - Oe) >= e.scrollToCloseDistance || Math.abs(ht - mt) >= e.scrollToCloseDistance;
    }, K = bo((L) => {
      if (p.value)
        if (e.scrollToClose || a != null && a.scrollToClose) {
          const J = L.target;
          $ || ($ = [J.scrollTop, J.scrollLeft]), F($, J) ? A(!1) : C();
        } else
          C();
    }), H = () => {
      wo(window, "scroll", j), q = !1;
    }, j = bo((L) => {
      const J = L.target.documentElement;
      P || (P = [J.scrollTop, J.scrollLeft]), F(P, J) && (A(!1), H());
    }), oe = () => {
      p.value && C();
    }, de = () => {
      oe(), t("resize");
    }, _e = (L) => {
      e.preventFocus && L.preventDefault();
    };
    c == null || c.addChildRef(g);
    const it = se(() => p.value ? e.openedClass : void 0);
    let we;
    ze(p, (L) => {
      if (e.clickOutsideToClose && (!L && O ? Te() : L && !O && (kr(document.documentElement, "mousedown", I), O = !0)), (e.scrollToClose || a != null && a.scrollToClose) && (kr(window, "scroll", j), q = !0), e.updateAtScroll || a != null && a.updateAtScroll) {
        if (L) {
          we = Oo(S.value);
          for (const J of we)
            J.addEventListener("scroll", K);
        } else if (we) {
          for (const J of we)
            J.removeEventListener("scroll", K);
          we = void 0;
        }
      }
      L && (Je.value = !0);
    }), ze(() => [e.autoFitPopupWidth, e.autoFitPopupMinWidth], () => {
      p.value && C();
    });
    const {
      createResizeObserver: he,
      destroyResizeObserver: St
    } = U0({
      elementRef: v,
      onResize: oe
    });
    ft(() => {
      if (he(), p.value && (C(), e.clickOutsideToClose && !O && (kr(document.documentElement, "mousedown", I), O = !0), e.updateAtScroll || a != null && a.updateAtScroll)) {
        we = Oo(S.value);
        for (const L of we)
          L.addEventListener("scroll", K);
      }
    }), sr(() => {
      p.value && C();
    }), gl(() => {
      A(!1);
    }), yn(() => {
      if (c == null || c.removeChildRef(g), St(), O && Te(), q && H(), we) {
        for (const L of we)
          L.removeEventListener("scroll", K);
        we = void 0;
      }
    });
    const Je = me(p.value), Qe = me(!1), _t = () => {
      Qe.value = !0;
    }, $t = () => {
      Qe.value = !1, p.value && t("show");
    }, Lt = () => {
      Qe.value = !1, p.value || (Je.value = !1, t("hide"));
    };
    return () => {
      var L, J;
      return m.value = (J = (L = n.default) == null ? void 0 : L.call(n)) != null ? J : [], Us(m.value, {
        class: it.value,
        onClick: B,
        onMouseenter: z,
        onMouseleave: ee,
        onFocusin: ye,
        onFocusout: le,
        onContextmenu: be
      }), X(lt, null, [e.autoFixPosition ? X(Ao, {
        onResize: de
      }, {
        default: () => [m.value]
      }) : m.value, X(q0, null, {
        default: () => [X(yl, {
          to: f.value,
          disabled: !e.renderToBody
        }, {
          default: () => [(!e.unmountOnClose || p.value || Je.value) && !y.value && X(Ao, {
            onResize: oe
          }, {
            default: () => [X("div", bl({
              ref: g,
              class: [`${o}-popup`, `${o}-position-${b.value}`],
              style: Q0(Z0({}, w.value), {
                zIndex: k.value,
                pointerEvents: Qe.value ? "none" : "auto"
              }),
              "trigger-placement": b.value,
              onMouseenter: Y,
              onMouseleave: ne,
              onMousedown: _e
            }, s.value), [X(wl, {
              name: e.animationName,
              duration: e.duration,
              appear: !0,
              onBeforeEnter: _t,
              onAfterEnter: $t,
              onBeforeLeave: _t,
              onAfterLeave: Lt
            }, {
              default: () => {
                var Oe;
                return [El(X("div", {
                  class: `${o}-popup-wrapper`,
                  style: T.value
                }, [X("div", {
                  class: [`${o}-content`, e.contentClass],
                  style: e.contentStyle
                }, [(Oe = n.content) == null ? void 0 : Oe.call(n)]), e.showArrow && X("div", {
                  ref: N,
                  class: [`${o}-arrow`, e.arrowClass],
                  style: M.value
                }, null)]), [[Sl, p.value]])];
              }
            })])]
          })]
        })]
      })]);
    };
  }
});
const tu = Object.assign(Lr, {
  install: (e, t) => {
    Sn(e, t);
    const n = En(t);
    e.component(n + Lr.name, Lr);
  }
}), nu = 5;
var ru = ve({
  name: "DotLoading",
  props: {
    size: {
      type: Number
    }
  },
  setup(e) {
    const t = xe("dot-loading");
    return () => {
      const n = e.size ? {
        width: `${e.size}px`,
        height: `${e.size}px`
      } : {};
      return X("div", {
        class: t,
        style: {
          width: e.size ? `${e.size * 7}px` : void 0,
          height: e.size ? `${e.size}px` : void 0
        }
      }, [Array(nu).fill(1).map((r, i) => X("div", {
        class: `${t}-item`,
        key: i,
        style: n
      }, null))]);
    };
  }
}), Ir = ve({
  name: "Spin",
  props: {
    size: {
      type: Number
    },
    loading: Boolean,
    dot: Boolean,
    tip: String,
    hideIcon: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, {
    slots: t
  }) {
    const n = xe("spin"), r = xt(cr, void 0), i = se(() => [n, {
      [`${n}-loading`]: e.loading,
      [`${n}-with-tip`]: e.tip && !t.default
    }]), o = () => {
      if (t.icon) {
        const a = Vn(t.icon());
        if (a)
          return As(a, {
            spin: !0
          });
      }
      return t.element ? t.element() : e.dot ? X(ru, {
        size: e.size
      }, null) : r != null && r.slots.loading ? r.slots.loading() : X(dr, {
        spin: !0,
        size: e.size
      }, null);
    }, s = () => {
      var a, l, u;
      const c = e.size ? {
        fontSize: `${e.size}px`
      } : void 0, m = !!((a = t.tip) != null ? a : e.tip);
      return X(lt, null, [!e.hideIcon && X("div", {
        class: `${n}-icon`,
        style: c
      }, [o()]), m && X("div", {
        class: `${n}-tip`
      }, [(u = (l = t.tip) == null ? void 0 : l.call(t)) != null ? u : e.tip])]);
    };
    return () => X("div", {
      class: i.value
    }, [t.default ? X(lt, null, [t.default(), e.loading && X("div", {
      class: `${n}-mask`
    }, [X("div", {
      class: `${n}-mask-icon`
    }, [s()])])]) : s()]);
  }
});
const xi = Object.assign(Ir, {
  install: (e, t) => {
    Sn(e, t);
    const n = En(t);
    e.component(n + Ir.name, Ir);
  }
}), iu = ve({
  name: "Popover",
  components: {
    Trigger: tu
  },
  props: {
    popupVisible: {
      type: Boolean,
      default: void 0
    },
    defaultPopupVisible: {
      type: Boolean,
      default: !1
    },
    title: String,
    content: String,
    trigger: {
      type: [String, Array],
      default: "hover"
    },
    position: {
      type: String,
      default: "top"
    },
    contentClass: {
      type: [String, Array, Object]
    },
    contentStyle: {
      type: Object
    },
    arrowClass: {
      type: [String, Array, Object]
    },
    arrowStyle: {
      type: Object
    },
    popupContainer: {
      type: [String, Object]
    }
  },
  emits: {
    "update:popupVisible": (e) => !0,
    popupVisibleChange: (e) => !0
  },
  setup(e, { emit: t }) {
    const n = xe("popover"), r = me(e.defaultPopupVisible), i = se(() => {
      var l;
      return (l = e.popupVisible) != null ? l : r.value;
    }), o = (l) => {
      r.value = l, t("update:popupVisible", l), t("popupVisibleChange", l);
    }, s = se(() => [
      `${n}-popup-content`,
      e.contentClass
    ]), a = se(() => [
      `${n}-popup-arrow`,
      e.arrowClass
    ]);
    return {
      prefixCls: n,
      computedPopupVisible: i,
      contentCls: s,
      arrowCls: a,
      handlePopupVisibleChange: o
    };
  }
});
function ou(e, t, n, r, i, o) {
  const s = qe("trigger");
  return U(), Ee(s, {
    class: ge(e.prefixCls),
    trigger: e.trigger,
    position: e.position,
    "popup-visible": e.computedPopupVisible,
    "popup-offset": 10,
    "content-class": e.contentCls,
    "content-style": e.contentStyle,
    "arrow-class": e.arrowCls,
    "arrow-style": e.arrowStyle,
    "show-arrow": "",
    "popup-container": e.popupContainer,
    "animation-name": "zoom-in-fade-out",
    "auto-fit-transform-origin": "",
    onPopupVisibleChange: e.handlePopupVisibleChange
  }, {
    content: ue(() => [
      G("div", {
        class: ge(`${e.prefixCls}-title`)
      }, [
        Pe(e.$slots, "title", {}, () => [
          Ue(re(e.title), 1)
        ])
      ], 2),
      G("div", {
        class: ge(`${e.prefixCls}-content`)
      }, [
        Pe(e.$slots, "content", {}, () => [
          Ue(re(e.content), 1)
        ])
      ], 2)
    ]),
    default: ue(() => [
      Pe(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "trigger", "position", "popup-visible", "content-class", "content-style", "arrow-class", "arrow-style", "popup-container", "onPopupVisibleChange"]);
}
var Nr = /* @__PURE__ */ Ye(iu, [["render", ou]]);
const Bt = Object.assign(Nr, {
  install: (e, t) => {
    Sn(e, t);
    const n = En(t);
    e.component(n + Nr.name, Nr);
  }
});
function su(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
const Mo = [
  "red",
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
  "gray"
], au = ve({
  name: "Tag",
  components: {
    IconHover: Ys,
    IconClose: Xs,
    IconLoading: dr
  },
  props: {
    color: {
      type: String
    },
    size: {
      type: String
    },
    bordered: {
      type: Boolean,
      default: !1
    },
    visible: {
      type: Boolean,
      default: void 0
    },
    defaultVisible: {
      type: Boolean,
      default: !0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    closable: {
      type: Boolean,
      default: !1
    },
    checkable: {
      type: Boolean,
      default: !1
    },
    checked: {
      type: Boolean,
      default: void 0
    },
    defaultChecked: {
      type: Boolean,
      default: !0
    },
    nowrap: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    "update:visible": (e) => !0,
    "update:checked": (e) => !0,
    close: (e) => !0,
    check: (e, t) => !0
  },
  setup(e, { emit: t }) {
    const { size: n } = or(e), r = xe("tag"), i = se(() => e.color && Mo.includes(e.color)), o = se(() => e.color && !Mo.includes(e.color)), s = me(e.defaultVisible), a = me(e.defaultChecked), l = se(() => {
      var w;
      return (w = e.visible) != null ? w : s.value;
    }), u = se(() => {
      var w;
      return e.checkable ? (w = e.checked) != null ? w : a.value : !0;
    }), { mergedSize: c } = Js(n), m = se(() => c.value === "mini" ? "small" : c.value), S = (w) => {
      s.value = !1, t("update:visible", !1), t("close", w);
    }, g = (w) => {
      if (e.checkable) {
        const T = !u.value;
        a.value = T, t("update:checked", T), t("check", T, w);
      }
    }, h = se(() => [
      r,
      `${r}-size-${m.value}`,
      {
        [`${r}-loading`]: e.loading,
        [`${r}-hide`]: !l.value,
        [`${r}-${e.color}`]: i.value,
        [`${r}-bordered`]: e.bordered,
        [`${r}-checkable`]: e.checkable,
        [`${r}-checked`]: u.value,
        [`${r}-custom-color`]: o.value
      }
    ]), b = se(() => {
      if (o.value)
        return {
          backgroundColor: e.color
        };
    });
    return {
      prefixCls: r,
      cls: h,
      style: b,
      computedVisible: l,
      computedChecked: u,
      handleClick: g,
      handleClose: S
    };
  }
});
function lu(e, t, n, r, i, o) {
  const s = qe("icon-close"), a = qe("icon-hover"), l = qe("icon-loading");
  return e.computedVisible ? (U(), ie("span", {
    key: 0,
    class: ge(e.cls),
    style: bt(e.style),
    onClick: t[0] || (t[0] = (...u) => e.handleClick && e.handleClick(...u))
  }, [
    e.$slots.icon ? (U(), ie("span", {
      key: 0,
      class: ge(`${e.prefixCls}-icon`)
    }, [
      Pe(e.$slots, "icon")
    ], 2)) : ke("v-if", !0),
    e.nowrap ? (U(), ie("span", {
      key: 1,
      class: ge(`${e.prefixCls}-text`)
    }, [
      Pe(e.$slots, "default")
    ], 2)) : Pe(e.$slots, "default", { key: 2 }),
    e.closable ? (U(), Ee(a, {
      key: 3,
      role: "button",
      "aria-label": "Close",
      prefix: e.prefixCls,
      class: ge(`${e.prefixCls}-close-btn`),
      onClick: _l(e.handleClose, ["stop"])
    }, {
      default: ue(() => [
        Pe(e.$slots, "close-icon", {}, () => [
          X(s)
        ])
      ]),
      _: 3
    }, 8, ["prefix", "class", "onClick"])) : ke("v-if", !0),
    e.loading ? (U(), ie("span", {
      key: 4,
      class: ge(`${e.prefixCls}-loading-icon`)
    }, [
      X(l)
    ], 2)) : ke("v-if", !0)
  ], 6)) : ke("v-if", !0);
}
var Rr = /* @__PURE__ */ Ye(au, [["render", lu]]);
const Br = Object.assign(Rr, {
  install: (e, t) => {
    Sn(e, t);
    const n = En(t);
    e.component(n + Rr.name, Rr);
  }
}), cu = ve({
  name: "Message",
  components: {
    AIconHover: Ys,
    IconInfoCircleFill: qc,
    IconCheckCircleFill: Jc,
    IconExclamationCircleFill: r0,
    IconCloseCircleFill: c0,
    IconClose: Xs,
    IconLoading: dr
  },
  props: {
    type: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: !1
    },
    showIcon: {
      type: Boolean,
      default: !0
    },
    duration: {
      type: Number,
      default: 3e3
    },
    resetOnUpdate: {
      type: Boolean,
      default: !1
    },
    resetOnHover: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = xe("message");
    let r = 0;
    const i = () => {
      t("close");
    }, o = () => {
      e.duration > 0 && (r = window.setTimeout(i, e.duration));
    }, s = () => {
      r && (window.clearTimeout(r), r = 0);
    };
    return ft(() => {
      o();
    }), sr(() => {
      e.resetOnUpdate && (s(), o());
    }), xs(() => {
      s();
    }), {
      handleMouseEnter: () => {
        e.resetOnHover && s();
      },
      handleMouseLeave: () => {
        e.resetOnHover && o();
      },
      prefixCls: n,
      handleClose: i
    };
  }
});
function uu(e, t, n, r, i, o) {
  const s = qe("icon-info-circle-fill"), a = qe("icon-check-circle-fill"), l = qe("icon-exclamation-circle-fill"), u = qe("icon-close-circle-fill"), c = qe("icon-loading"), m = qe("icon-close"), S = qe("a-icon-hover");
  return U(), ie("li", {
    role: "alert",
    class: ge([
      e.prefixCls,
      `${e.prefixCls}-${e.type}`,
      { [`${e.prefixCls}-closable`]: e.closable }
    ]),
    onMouseenter: t[1] || (t[1] = (...g) => e.handleMouseEnter && e.handleMouseEnter(...g)),
    onMouseleave: t[2] || (t[2] = (...g) => e.handleMouseLeave && e.handleMouseLeave(...g))
  }, [
    e.showIcon && !(e.type === "normal" && !e.$slots.icon) ? (U(), ie("span", {
      key: 0,
      class: ge(`${e.prefixCls}-icon`)
    }, [
      Pe(e.$slots, "icon", {}, () => [
        e.type === "info" ? (U(), Ee(s, { key: 0 })) : e.type === "success" ? (U(), Ee(a, { key: 1 })) : e.type === "warning" ? (U(), Ee(l, { key: 2 })) : e.type === "error" ? (U(), Ee(u, { key: 3 })) : e.type === "loading" ? (U(), Ee(c, { key: 4 })) : ke("v-if", !0)
      ])
    ], 2)) : ke("v-if", !0),
    G("span", {
      class: ge(`${e.prefixCls}-content`)
    }, [
      Pe(e.$slots, "default")
    ], 2),
    e.closable ? (U(), ie("span", {
      key: 1,
      class: ge(`${e.prefixCls}-close-btn`),
      onClick: t[0] || (t[0] = (...g) => e.handleClose && e.handleClose(...g))
    }, [
      X(S, null, {
        default: ue(() => [
          X(m)
        ]),
        _: 1
      })
    ], 2)) : ke("v-if", !0)
  ], 34);
}
var du = /* @__PURE__ */ Ye(cu, [["render", uu]]);
function fu(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !kl(e);
}
var pu = ve({
  name: "MessageList",
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    position: {
      type: String,
      default: "top"
    }
  },
  emits: ["close", "afterClose"],
  setup(e, t) {
    const n = xe("message-list"), {
      zIndex: r
    } = ea("message", {
      runOnMounted: !0
    });
    return () => {
      let i;
      return X(Cl, {
        class: [n, `${n}-${e.position}`],
        name: "fade-message",
        tag: "ul",
        style: {
          zIndex: r.value
        },
        onAfterLeave: () => t.emit("afterClose")
      }, fu(i = e.messages.map((o) => {
        const s = {
          default: go(o.content),
          icon: go(o.icon)
        };
        return X(du, {
          key: o.id,
          type: o.type,
          duration: o.duration,
          closable: o.closable,
          resetOnUpdate: o.resetOnUpdate,
          resetOnHover: o.resetOnHover,
          onClose: () => t.emit("close", o.id)
        }, s);
      })) ? i : {
        default: () => [i]
      });
    };
  }
}), mu = Object.defineProperty, hu = Object.defineProperties, vu = Object.getOwnPropertyDescriptors, $o = Object.getOwnPropertySymbols, gu = Object.prototype.hasOwnProperty, yu = Object.prototype.propertyIsEnumerable, Lo = (e, t, n) => t in e ? mu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Zn = (e, t) => {
  for (var n in t || (t = {}))
    gu.call(t, n) && Lo(e, n, t[n]);
  if ($o)
    for (var n of $o(t))
      yu.call(t, n) && Lo(e, n, t[n]);
  return e;
}, ta = (e, t) => hu(e, vu(t));
class bu {
  constructor(t, n) {
    this.messageCount = 0, this.add = (o) => {
      var s;
      this.messageCount++;
      const a = (s = o.id) != null ? s : `__arco_message_${this.messageCount}`;
      if (this.messageIds.has(a))
        return this.update(a, o);
      const l = Ei(Zn({ id: a }, o));
      return this.messages.value.push(l), this.messageIds.add(a), {
        close: () => this.remove(a)
      };
    }, this.update = (o, s) => {
      for (let a = 0; a < this.messages.value.length; a++)
        if (this.messages.value[a].id === o) {
          const l = !ec(s.duration);
          Object.assign(this.messages.value[a], ta(Zn({}, s), { id: o, resetOnUpdate: l }));
          break;
        }
      return {
        close: () => this.remove(o)
      };
    }, this.remove = (o) => {
      for (let s = 0; s < this.messages.value.length; s++) {
        const a = this.messages.value[s];
        if (a.id === o) {
          lr(a.onClose) && a.onClose(o), this.messages.value.splice(s, 1), this.messageIds.delete(o);
          break;
        }
      }
    }, this.clear = () => {
      this.messages.value.splice(0);
    }, this.destroy = () => {
      this.messages.value.length === 0 && this.container && (no(null, this.container), document.body.removeChild(this.container), this.container = null, zt[this.position] = void 0);
    };
    const { position: r = "top" } = t;
    this.container = Dc("message"), this.messageIds = /* @__PURE__ */ new Set(), this.messages = me([]), this.position = r;
    const i = X(pu, {
      messages: this.messages.value,
      position: r,
      onClose: this.remove,
      onAfterClose: this.destroy
    });
    (n ?? jt._context) && (i.appContext = n ?? jt._context), no(i, this.container), document.body.appendChild(this.container);
  }
}
const zt = {}, na = [...u0, "loading", "normal"], Un = na.reduce((e, t) => (e[t] = (n, r) => {
  ki(n) && (n = { content: n });
  const i = Zn({ type: t }, n), { position: o = "top" } = i;
  return zt[o] || (zt[o] = new bu(i, r)), zt[o].add(i);
}, e), {});
Un.clear = (e) => {
  var t;
  e ? (t = zt[e]) == null || t.clear() : Object.values(zt).forEach((n) => n == null ? void 0 : n.clear());
};
const jt = ta(Zn({}, Un), {
  install: (e) => {
    const t = {
      clear: Un.clear
    };
    for (const n of na)
      t[n] = (r, i = e._context) => Un[n](r, i);
    e.config.globalProperties.$message = t;
  },
  _context: null
});
function wu(e, t) {
  return t = { exports: {} }, e(t, t.exports), t.exports;
}
var Eu = wu(function(e) {
  var t = e.exports = function(n, r) {
    if (r || (r = 16), n === void 0 && (n = 128), n <= 0) return "0";
    for (var i = Math.log(Math.pow(2, n)) / Math.log(r), o = 2; i === 1 / 0; o *= 2)
      i = Math.log(Math.pow(2, n / o)) / Math.log(r) * o;
    for (var s = i - Math.floor(i), a = "", o = 0; o < Math.floor(i); o++) {
      var l = Math.floor(Math.random() * r).toString(r);
      a = l + a;
    }
    if (s) {
      var u = Math.pow(r, s), l = Math.floor(Math.random() * u).toString(r);
      a = l + a;
    }
    var c = parseInt(a, r);
    return c !== 1 / 0 && c >= Math.pow(2, n) ? t(n, r) : a;
  };
  t.rack = function(n, r, i) {
    var o = function(a) {
      var l = 0;
      do {
        if (l++ > 10)
          if (i) n += i;
          else throw new Error("too many ID collisions, use more bits");
        var u = t(n, r);
      } while (Object.hasOwnProperty.call(s, u));
      return s[u] = a, u;
    }, s = o.hats = {};
    return o.get = function(a) {
      return o.hats[a];
    }, o.set = function(a, l) {
      return o.hats[a] = l, o;
    }, o.bits = n || 128, o.base = r || 16, o;
  };
});
function ut(e) {
  if (!(this instanceof ut))
    return new ut(e);
  e = e || [128, 36, 1], this._seed = e.length ? Eu.rack(e[0], e[1], e[2]) : e;
}
ut.prototype.next = function(e) {
  return this._seed(e || !0);
};
ut.prototype.nextPrefixed = function(e, t) {
  var n;
  do
    n = e + this.next(!0);
  while (this.assigned(n));
  return this.claim(n, t), n;
};
ut.prototype.claim = function(e, t) {
  this._seed.set(e, t || !0);
};
ut.prototype.assigned = function(e) {
  return this._seed.get(e) || !1;
};
ut.prototype.unclaim = function(e) {
  delete this._seed.hats[e];
};
ut.prototype.clear = function() {
  var e = this._seed.hats, t;
  for (t in e)
    this.unclaim(t);
};
const Su = Object.prototype.toString;
function Io(e) {
  return e === void 0;
}
function _u(e) {
  return Su.call(e) === "[object Object]";
}
function ra(e, t, n) {
  const r = e.get("scopeIds", !1) || new ut([32, 36]), i = {}, o = {}, s = new Cu(), a = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
  function S(y) {
    return !y.parent || y.parent === y ? y : S(y.parent);
  }
  ee("tick", function() {
    for (const y of a)
      Y("elementChanged", {
        element: y
      });
    a.clear();
  });
  function g(y, I) {
    if (l.push([I, y]), l.length !== 1)
      return;
    let F;
    for (; F = l[0]; ) {
      const [K, H] = F;
      H.destroyed || K(), l.shift();
    }
    Y("tick");
  }
  function h(y) {
    return o[y.type] || s;
  }
  function b(y) {
    const {
      element: I,
      parentScope: F,
      initiator: K = null,
      scope: H = be({
        element: I,
        parent: F,
        initiator: K
      })
    } = y;
    return g(H, function() {
      H.running || H.start(), A("signal", {
        ...y,
        scope: H
      }), h(I).signal({
        ...y,
        scope: H
      }), H.parent && z(H.parent);
    }), H;
  }
  function w(y) {
    const { element: I, scope: F, initiator: K = F } = y, H = be({
      element: I,
      parent: F,
      initiator: K
    });
    return g(H, function() {
      if (H.running || H.start(), $e(I, "bpmn:SequenceFlow")) {
        const j = S(H), oe = I.id;
        let de = m.get(j.id);
        Io(de) && m.set(j.id, /* @__PURE__ */ new Map()), de = m.get(j.id);
        let _e = de.get(oe);
        if (Io(_e) && (_e = 1), _e > 2)
          return;
        _e++, de.set(oe, _e);
      }
      A("enter", y), h(I).enter({
        ...y,
        initiator: K,
        scope: H
      }), H.parent && z(H.parent);
    }), H;
  }
  function T(y) {
    const { element: I, scope: F, initiator: K = F } = y;
    g(F, function() {
      A("exit", y), h(I).exit({
        ...y,
        initiator: K
      }), F.running && F.complete(), C(F, K), F.parent && z(F.parent);
    });
  }
  function M(y) {
    const { event: I, initiator: F, scope: K } = y, H = p(I), j = K.subscriptions, oe = Dn(
      j,
      (he) => so(H, he.event)
    ), de = oe.filter(
      (he) => !he.event.interrupting
    ), _e = oe.filter(
      (he) => he.event.interrupting
    );
    if (!_e.length)
      return de.map((he) => he.triggerFn(F)).flat();
    const it = _e.find((he) => !he.event.boundary) || _e[0], we = Dn(
      j,
      (he) => he.event.persistent || ku(he.event, it.event)
    );
    return j.forEach((he) => {
      we.includes(he) || he.remove();
    }), [it.triggerFn(F)].flat().filter((he) => he);
  }
  function N(y, I, F) {
    I = p(I);
    const K = I.element, H = {
      scope: y,
      event: I,
      element: K,
      triggerFn: F,
      remove() {
        d(H);
      }
    };
    return c.add(H), y.subscriptions.add(H), K && B(K), H;
  }
  function d(y) {
    const { scope: I, event: F } = y;
    c.delete(y), I.subscriptions.delete(y), F.element && B(F.element);
  }
  function $(y) {
    return $e(y, "bpmn:StartEvent") || $e(y, "bpmn:IntermediateCatchEvent") || $e(y, "bpmn:ReceiveTask") || Ou(y) ? Rl(y).name || y.id : null;
  }
  function P(y) {
    return {
      element: y,
      interrupting: !1,
      boundary: !1,
      iref: y.id,
      type: "none"
    };
  }
  function p(y) {
    if (!y.businessObject)
      return y;
    const I = Nl(y), F = jn(y), K = $(y), H = {
      element: y,
      interrupting: I,
      boundary: F,
      ...K ? { iref: K } : {}
    }, j = ia(y)[0];
    if (!j)
      return {
        ...H,
        type: Tu(y) ? "message" : "none"
      };
    if ($e(j, "bpmn:LinkEventDefinition"))
      return {
        ...H,
        type: "link",
        name: j.name
      };
    if ($e(j, "bpmn:SignalEventDefinition"))
      return {
        ...H,
        type: "signal",
        ref: j.signalRef
      };
    if ($e(j, "bpmn:TimerEventDefinition"))
      return {
        ...H,
        type: "timer"
      };
    if ($e(j, "bpmn:ConditionalEventDefinition"))
      return {
        ...H,
        type: "condition"
      };
    if ($e(j, "bpmn:EscalationEventDefinition"))
      return {
        ...H,
        type: "escalation",
        ref: j.escalationRef
      };
    if ($e(j, "bpmn:CancelEventDefinition"))
      return {
        ...H,
        type: "cancel"
      };
    if ($e(j, "bpmn:ErrorEventDefinition"))
      return {
        ...H,
        type: "error",
        ref: j.errorRef
      };
    if ($e(j, "bpmn:MessageEventDefinition"))
      return {
        ...H,
        type: "message",
        ref: j.messageRef
      };
    if ($e(j, "bpmn:CompensateEventDefinition")) {
      let oe = j.activityRef && n.get(j.activityRef.id);
      return oe || (_r(y) && ao(y.parent) ? oe = y.parent.parent : jn(y) ? oe = y.host : oe = y.parent), {
        ...H,
        type: "compensate",
        ref: oe,
        persistent: !0
      };
    }
    throw new Error("unknown event definition", j);
  }
  function f(y, I = !0) {
    const { element: F, parent: K, initiator: H } = y;
    I && A("createScope", {
      element: F,
      scope: K
    });
    const j = new Il(r.next(), F, K, H);
    return K && K.children.push(j), u.add(j), I && Y("createScope", {
      scope: j
    }), B(F), K && B(K.element), j;
  }
  function v(y) {
    if (typeof y == "function")
      return y;
    const { event: I, element: F, scope: K } = y, H = y.elements || F && [F], j = I && p(I);
    return (oe) => (!j || so(j, oe.event)) && (!H || H.includes(oe.element)) && (!K || K === oe.scope);
  }
  function k(y) {
    const I = y === "function" ? y : v(y);
    return (F) => Array.from(F.subscriptions).some(I);
  }
  function x(y) {
    if (typeof y == "function")
      return y;
    const { element: I, waitsOnElement: F, parent: K, trait: H = io.RUNNING, subscribedTo: j } = y, oe = j ? k(j) : () => !0;
    return (de) => (!I || de.element === I) && (!K || de.parent === K) && (!F || de.getTokensByElement(F) > 0) && de.hasTrait(H) && oe(de);
  }
  function O(y) {
    return Dn(c, v(y));
  }
  function q(y) {
    return oo(c, v(y));
  }
  function R(y) {
    return Dn(u, x(y));
  }
  function ae(y) {
    return oo(u, x(y));
  }
  function C(y, I = null) {
    if (!y.destroyed) {
      y.destroy(I);
      for (const F of y.subscriptions) {
        const K = F.event.traits || io.ACTIVE;
        y.hasTrait(K) || d(F);
      }
      if (y.destroyed) {
        for (const F of y.children)
          F.destroyed || C(F, I);
        A("destroyScope", {
          element: y.element,
          scope: y
        }), u.delete(y), Y("destroyScope", {
          scope: y
        });
      }
      B(y.element), y.parent && B(y.parent.element);
    }
  }
  function A(y, I) {
    Y("trace", {
      ...I,
      action: y
    });
  }
  function B(y) {
    a.add(y), l.length || Y("tick");
  }
  function z(y) {
    Y("scopeChanged", {
      scope: y
    });
  }
  function Y(y, I = {}) {
    return t.fire(`tokenSimulation.simulator.${y}`, I);
  }
  function ee(y, I) {
    t.on("tokenSimulation.simulator." + y, I);
  }
  function ne(y, I) {
    t.off("tokenSimulation.simulator." + y, I);
  }
  function ye(y, I) {
    const F = De(y);
    i[y.id || y] = {
      ...F,
      ...I
    }, B(y);
  }
  function le() {
    const y = [];
    return n.forEach((I) => {
      if (!Ls(I, ["bpmn:Process", "bpmn:Participant"]))
        return;
      const F = f(
        {
          element: I
        },
        !1
      );
      y.push(F);
      const K = I.children.filter(_r), H = I.children.filter(Bl);
      for (const j of K) {
        const oe = {
          ...p(j),
          interrupting: !1
        };
        N(
          F,
          oe,
          (de) => b({
            element: I,
            startEvent: j,
            initiator: de
          })
        );
      }
      if (!K.length)
        for (const j of H) {
          const oe = P(j);
          N(
            F,
            oe,
            (de) => b({
              element: I,
              initiator: de
            })
          );
        }
    }), y;
  }
  function be(y) {
    const { element: I } = y, F = f(y), { children: K = [], attachers: H = [] } = I;
    for (const j of K)
      if (ao(j)) {
        const oe = j.children.filter(
          (de) => _r(de) && !lo(de)
        );
        for (const de of oe)
          N(F, de, (_e) => b({
            element: j,
            parentScope: F,
            startEvent: de,
            initiator: _e
          }));
      }
    for (const j of H)
      jn(j) && !lo(j) && N(F, j, (oe) => b({
        element: j,
        parentScope: F.parent,
        hostScope: F,
        initiator: oe
      }));
    return F;
  }
  function De(y) {
    return i[y.id || y] || {};
  }
  function Xe(y, I) {
    if (!I.length)
      return;
    const F = {
      type: "all-completed",
      persistent: !1
    }, K = new Set(I), H = (j) => {
      K.delete(j.scope), K.size === 0 && (ne("destroyScope", H), M({
        scope: y,
        event: F
      }));
    };
    return ee("destroyScope", H), F;
  }
  function Te(y, I = !0) {
    ye(y, {
      wait: I
    });
  }
  function Be() {
    for (const y of u)
      C(y);
    for (const y of le())
      u.add(y);
    m.clear(), Y("tick"), Y("reset");
  }
  this.createScope = f, this.destroyScope = C, this.findScope = ae, this.findScopes = R, this.findSubscription = q, this.findSubscriptions = O, this.waitAtElement = Te, this.waitForScopes = Xe, this.setConfig = ye, this.getConfig = De, this.signal = b, this.enter = w, this.exit = T, this.subscribe = N, this.trigger = M, this.reset = Be, this.on = ee, this.off = ne, this.registerBehavior = function(y, I) {
    o[y] = I;
  };
}
ra.$inject = ["injector", "eventBus", "elementRegistry"];
function Cu() {
  this.signal = function(e) {
    console.log("ignored #exit", e.element);
  }, this.exit = function(e) {
    console.log("ignored #exit", e.element);
  }, this.enter = function(e) {
    console.log("ignored #enter", e.element);
  };
}
function ku(e, t) {
  return e.type === t.type && e.boundary && !t.boundary;
}
function Tu(e) {
  return $e(e, "bpmn:ReceiveTask") || e.incoming.some((t) => $e(t, "bpmn:MessageFlow"));
}
function Ou(e) {
  if (!jn(e))
    return !1;
  const t = ia(e);
  return !t[0] || Ls(t[0], ["bpmn:ConditionalEventDefinition", "bpmn:TimerEventDefinition"]);
}
function ia(e) {
  return e.businessObject.get("eventDefinitions") || [];
}
const Au = 5e3, Pu = {
  __depends__: [Fl],
  __init__: [
    [
      "eventBus",
      "simulator",
      function(e, t) {
        e.on(
          ["tokenSimulation.toggleMode", "tokenSimulation.resetSimulation"],
          Au,
          (n) => {
            t.reset();
          }
        );
      }
    ]
  ],
  simulator: ["type", ra]
};
var Fr, No;
function xu() {
  if (No) return Fr;
  No = 1;
  const e = {
    legend: [1, "<fieldset>", "</fieldset>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    _default: [0, "", ""]
  };
  e.td = e.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"], e.option = e.optgroup = [1, '<select multiple="multiple">', "</select>"], e.thead = e.tbody = e.colgroup = e.caption = e.tfoot = [1, "<table>", "</table>"], e.polyline = e.ellipse = e.polygon = e.circle = e.text = e.line = e.path = e.rect = e.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', "</svg>"];
  function t(n, r = globalThis.document) {
    var m;
    if (typeof n != "string")
      throw new TypeError("String expected");
    const i = /^<!--(.*?)-->$/s.exec(n);
    if (i)
      return r.createComment(i[1]);
    const o = (m = /<([\w:]+)/.exec(n)) == null ? void 0 : m[1];
    if (!o)
      return r.createTextNode(n);
    if (n = n.trim(), o === "body") {
      const S = r.createElement("html");
      S.innerHTML = n;
      const { lastChild: g } = S;
      return g.remove(), g;
    }
    let [s, a, l] = Object.hasOwn(e, o) ? e[o] : e._default, u = r.createElement("div");
    for (u.innerHTML = a + n + l; s--; )
      u = u.lastChild;
    if (u.firstChild === u.lastChild) {
      const { firstChild: S } = u;
      return S.remove(), S;
    }
    const c = r.createDocumentFragment();
    return c.append(...u.childNodes), c;
  }
  return Fr = t, Fr;
}
var Du = /* @__PURE__ */ xu();
const ct = /* @__PURE__ */ su(Du);
function Mu(e, t) {
  return t.forEach(function(n) {
    n && typeof n != "string" && !Array.isArray(n) && Object.keys(n).forEach(function(r) {
      if (r !== "default" && !(r in e)) {
        var i = Object.getOwnPropertyDescriptor(n, r);
        Object.defineProperty(e, r, i.get ? i : {
          enumerable: !0,
          get: function() {
            return n[r];
          }
        });
      }
    });
  }), Object.freeze(e);
}
const $u = Object.prototype.toString;
function Ae(e) {
  return new yt(e);
}
function yt(e) {
  if (!e || !e.nodeType)
    throw new Error("A DOM element reference is required");
  this.el = e, this.list = e.classList;
}
yt.prototype.add = function(e) {
  return this.list.add(e), this;
};
yt.prototype.remove = function(e) {
  return $u.call(e) == "[object RegExp]" ? this.removeMatching(e) : (this.list.remove(e), this);
};
yt.prototype.removeMatching = function(e) {
  const t = this.array();
  for (let n = 0; n < t.length; n++)
    e.test(t[n]) && this.remove(t[n]);
  return this;
};
yt.prototype.toggle = function(e, t) {
  return typeof t < "u" ? t !== this.list.toggle(e, t) && this.list.toggle(e) : this.list.toggle(e), this;
};
yt.prototype.array = function() {
  return Array.from(this.list);
};
yt.prototype.has = yt.prototype.contains = function(e) {
  return this.list.contains(e);
};
function Lu(e, t, n) {
  var r = n ? e : e.parentNode;
  return r && typeof r.closest == "function" && r.closest(t) || null;
}
var Qn = {}, er, ii, Di;
function oa() {
  er = window.addEventListener ? "addEventListener" : "attachEvent", ii = window.removeEventListener ? "removeEventListener" : "detachEvent", Di = er !== "addEventListener" ? "on" : "";
}
var Iu = Qn.bind = function(e, t, n, r) {
  return er || oa(), e[er](Di + t, n, r || !1), n;
}, Nu = Qn.unbind = function(e, t, n, r) {
  return ii || oa(), e[ii](Di + t, n, r || !1), n;
}, gt = /* @__PURE__ */ Mu({
  __proto__: null,
  bind: Iu,
  default: Qn,
  unbind: Nu
}, [Qn]), sa = ["focus", "blur"];
function Ru(e, t, n, r, i) {
  return sa.indexOf(n) !== -1 && (i = !0), gt.bind(e, n, function(o) {
    var s = o.target || o.srcElement;
    o.delegateTarget = Lu(s, t, !0), o.delegateTarget && r.call(e, o);
  }, i);
}
function Bu(e, t, n, r) {
  return sa.indexOf(t) !== -1 && (r = !0), gt.unbind(e, t, n, r);
}
var Fu = {
  bind: Ru,
  unbind: Bu
};
function $n(e, t) {
  return t = t || document, t.querySelector(e);
}
function zu(e, t) {
  return t = t || document, t.querySelectorAll(e);
}
const ju = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/></svg>', Vu = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>', Hu = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"/></svg>', Uu = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/></svg>', qu = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>', Wu = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z"/></svg>', Ku = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>', Gu = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>', Yu = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="arco-icon arco-icon-empty" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"><path d="M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"></path></svg>';
function pt(e) {
  return function(n = "") {
    return `<span class="bts-icon ${n}">${e}</span>`;
  };
}
const Ro = pt(ju), Xu = pt(Yu), Bo = pt(Vu), aa = pt(Hu), Ju = pt(Uu), Zu = pt(qu), Qu = pt(Wu), ed = pt(Ku), Fo = pt(Gu), td = Zu(), nd = Ju(), zo = 1500;
class Mi {
  constructor(t, n, r, i, o) {
    W(this, "_eventBus");
    W(this, "_tokenSimulationPalette");
    W(this, "_notifications");
    W(this, "_translate");
    W(this, "canvasParent");
    W(this, "_paletteEntry");
    W(this, "isActive");
    W(this, "isPaused");
    W(this, "playMarkup");
    W(this, "pauseMarkup");
    this._eventBus = t, this._tokenSimulationPalette = n, this._notifications = r, this._translate = o, this.canvasParent = i.getContainer().parentNode, this.isActive = !1, this.isPaused = !0, this.playMarkup = () => `${td}<span>${o("Play Simulation")}</span>`, this.pauseMarkup = () => `${nd}<span>${o("Pause Simulation")}</span>`, this._init(), t.on(ar, zo, (a) => {
      this.activate(), this.unpause();
    }), t.on([wn, Gt], () => {
      this.deactivate(), this.pause();
    }), t.on(Is, zo, (a) => {
      this.unpause();
    });
    const s = this;
    t.on("i18n.changed", function() {
      s._updateEntry();
    });
  }
  _init() {
    const t = this._translate("Play/Pause Simulation");
    this._paletteEntry = ct(
      `<div class="bts-entry disabled" title="${t}">${this.playMarkup()}</div>`
    ), gt.bind(this._paletteEntry, "click", this.toggle.bind(this)), this._tokenSimulationPalette.addEntry(this._paletteEntry, 1);
  }
  _updateEntry() {
    this._paletteEntry && (this._paletteEntry.innerHTML = this.isPaused ? this.playMarkup() : this.pauseMarkup());
  }
  pause() {
    this.isActive && (Ae(this._paletteEntry).remove("active"), Ae(this.canvasParent).add("paused"), this._paletteEntry.innerHTML = this.playMarkup(), this._eventBus.fire(zl), this._notifications.showNotification({
      text: "Pause Simulation"
    }), this.isPaused = !0);
  }
  unpause() {
    !this.isActive || !this.isPaused || (Ae(this._paletteEntry).add("active"), Ae(this.canvasParent).remove("paused"), this._paletteEntry.innerHTML = this.pauseMarkup(), this._eventBus.fire(jl), this._notifications.showNotification({
      text: "Play Simulation"
    }), this.isPaused = !1);
  }
  toggle() {
    this.isPaused ? this.unpause() : this.pause();
  }
  activate() {
    this.isActive = !0, Ae(this._paletteEntry).remove("disabled");
  }
  deactivate() {
    this.isActive = !1, Ae(this._paletteEntry).remove("active"), Ae(this._paletteEntry).add("disabled");
  }
}
W(Mi, "$inject");
Mi.$inject = [
  "eventBus",
  "tokenSimulationPalette",
  "notifications",
  "canvas",
  "translate"
];
const rd = 2e3, id = aa();
class $i {
  constructor(t, n, r, i) {
    W(this, "_eventBus");
    W(this, "_canvas");
    W(this, "_scopeFilter");
    W(this, "_translate");
    W(this, "container");
    this._eventBus = t, this._canvas = n, this._scopeFilter = r, this._translate = i, this._init(), t.on([Gt, wn], (o) => {
      this.clear();
    });
  }
  _init() {
    this.container = ct('<div class="bts-notifications"></div>'), this._canvas.getContainer().appendChild(this.container);
  }
  clear() {
    for (; this.container.children.length; )
      this.container.children[0].remove();
  }
  showNotification(t) {
    const n = this._translate, {
      text: r,
      type: i = "info",
      icon: o = id,
      scope: s,
      ttl: a = rd
    } = t;
    if (s && !this._scopeFilter.isShown(s))
      return;
    const l = o.startsWith("<") ? o : `<i class="${o}"></i>`, u = s && s.colors, c = u ? `style="color: ${u.auxiliary}; background: ${u.primary}"` : "", m = n(r), S = ct(`
    <div class="bts-notification ${i}">
      <span class="bts-icon">${l}</span>
      <span class="bts-text" title="${m}">${m}</span>
      ${s ? `<span class="bts-scope" ${c}>${s.id}</span>` : ""}
    </div>
  `);
    for (this.container.appendChild(S); this.container.children.length > 4; )
      this.container.children[0].remove();
    setTimeout(function() {
      S.remove();
    }, a);
  }
}
W($i, "$inject");
$i.$inject = ["eventBus", "canvas", "scopeFilter", "translate"];
const fr = {
  __depends__: [Ns],
  notifications: ["type", $i]
}, od = {
  __depends__: [fr],
  __init__: ["pauseSimulation"],
  pauseSimulation: ["type", Mi]
};
class Li {
  constructor(t, n, r, i) {
    W(this, "_eventBus");
    W(this, "_tokenSimulationPalette");
    W(this, "_notifications");
    W(this, "_translate");
    W(this, "_paletteEntry");
    W(this, "_active");
    this._eventBus = t, this._tokenSimulationPalette = n, this._notifications = r, this._translate = i, this._init(), t.on(ar, () => {
      Ae(this._paletteEntry).remove("disabled");
    }), t.on(Gt, (s) => {
      this._active = s.active, this._active || this.resetSimulation();
    });
    const o = this;
    t.on("i18n.changed", function() {
      o._updateEntry();
    });
  }
  _updateEntry() {
    const t = this._translate("Reset Simulation");
    if (this._paletteEntry) {
      const n = this._paletteEntry.querySelector(".bts-entry .bts-entry-text");
      n && (n.innerHTML = t);
    }
  }
  _init() {
    const t = this._translate("Reset Simulation");
    this._paletteEntry = ct(`
    <div class="bts-entry disabled" title="${t}">
      ${Qu()}
      <span class="bts-entry-text">${t}</span>
    </div>
  `), gt.bind(this._paletteEntry, "click", () => {
      this.resetSimulation(), this._notifications.showNotification({
        text: "Reset Simulation",
        type: "info"
      });
    }), this._tokenSimulationPalette.addEntry(this._paletteEntry, 2);
  }
  resetSimulation() {
    Ae(this._paletteEntry).add("disabled"), this._eventBus.fire(wn);
  }
}
W(Li, "$inject");
Li.$inject = ["eventBus", "tokenSimulationPalette", "notifications", "translate"];
const sd = {
  __depends__: [fr],
  __init__: ["resetSimulation"],
  resetSimulation: ["type", Li]
};
var Qr;
let la = (Qr = class {
  constructor(t, n, r) {
    W(this, "_elementRegistry");
    W(this, "_elementColors");
    this._elementRegistry = n, this._elementColors = r;
  }
  _setNeutralColors() {
  }
}, W(Qr, "$inject"), Qr);
la.$inject = ["eventBus", "elementRegistry", "elementColors"];
const ad = {
  __depends__: [Ul],
  __init__: ["neutralElementColors"],
  neutralElementColors: ["type", la]
}, ld = -15, cd = 15;
class Ii {
  constructor(t, n, r) {
    W(this, "_overlays");
    W(this, "_translate");
    this._overlays = t, this._translate = r, n.on([wn, ar, Gt], () => {
      this.clear();
    });
  }
  addElementNotification(t, n) {
    const r = {
      top: ld,
      right: cd
    }, { type: i, icon: o, text: s, scope: a = {} } = n, l = a.colors, u = l ? `style="color: ${l.auxiliary}; background: ${l.primary}"` : "", c = this._translate(s), m = ct(`
    <div class="bts-element-notification ${i || ""}" ${u}>
      ${o || ""}
      <span class="bts-text">${c}</span>
    </div>
  `);
    this._overlays.add(t, "bts-element-notification", {
      position: r,
      html: m,
      show: {
        minZoom: 0.5
      }
    });
  }
  removeElementNotification(t) {
    this._overlays.remove({ element: t });
  }
  clear() {
    this._overlays.remove({ type: "bts-element-notification" });
  }
}
W(Ii, "$inject");
Ii.$inject = ["overlays", "eventBus", "translate"];
const ud = {
  elementNotifications: ["type", Ii]
}, dd = {
  __depends__: [ud, fr],
  __init__: ["elementSupport"],
  elementSupport: ["type", ql]
}, fd = {
  copy: "fbpmn-icon-copy-service-task",
  sc: "fbpmn-icon-sc-service-task",
  dubbo: "fbpmn-icon-dubbo-service-task",
  dmn: "fbpmn-icon-dmn-service-task",
  mq: "fbpmn-icon-mq-service-task",
  rest: "fbpmn-icon-rest-service-task",
  http: "fbpmn-icon-http-service-task",
  email: "fbpmn-icon-mail-service-task",
  camel: "fbpmn-icon-camel-service-task",
  shell: "ibpmn-icon-shell-service-task"
}, pd = {
  copy: "Copy Service Task",
  sc: "Sc Service Task",
  dubbo: "Dubbo Service Task",
  dmn: "Dmn Service Task",
  mq: "Mq Service Task",
  rest: "Rest Service Task",
  http: "Http Service Task",
  email: "Email Service Task",
  camel: "Camel Service Task",
  shell: "Shell Service Task"
};
function pr(e, t) {
  if (!e)
    return [];
  const n = e.get("extensionElements");
  if (!n)
    return [];
  const r = n.get("values");
  return !r || !r.length ? [] : t ? r.filter((i) => Q(i, t)) : r;
}
function ca(e, t) {
  return pr(e, `flowable:${t}`);
}
const md = aa(), hd = Xu("a-lager-icon");
function zr(e) {
  const t = e && e.businessObject.name;
  return t && Wl(t);
}
function jr(e, t) {
  const n = oi(e);
  return n === "none" ? "bpmn-icon-intermediate-event-none" : `bpmn-icon-intermediate-event-${t}-${n}`;
}
function oi(e) {
  const t = bn(e);
  if (ca(
    t,
    "VariableListenerEventDefinition"
  ).length)
    return "multiple";
  if (t.get("eventDefinitions").length === 0)
    return "none";
  const r = t.eventDefinitions[0];
  return Q(r, "bpmn:MessageEventDefinition") ? "message" : Q(r, "bpmn:TimerEventDefinition") ? "timer" : Q(r, "bpmn:SignalEventDefinition") ? "signal" : Q(r, "bpmn:ErrorEventDefinition") ? "error" : Q(r, "bpmn:EscalationEventDefinition") ? "escalation" : Q(r, "bpmn:CompensateEventDefinition") ? "compensation" : Q(r, "bpmn:ConditionalEventDefinition") ? "condition" : Q(r, "bpmn:LinkEventDefinition") ? "link" : Q(r, "bpmn:CancelEventDefinition") ? "cancel" : Q(r, "bpmn:TerminateEventDefinition") ? "terminate" : "none";
}
class Ni {
  constructor(t, n, r, i, o, s, a) {
    W(this, "_notifications");
    W(this, "_tokenSimulationPalette");
    W(this, "_canvas");
    W(this, "_scopeFilter");
    W(this, "_translate");
    W(this, "_container");
    W(this, "_placeholder");
    W(this, "_content");
    W(this, "_close");
    W(this, "_icon");
    W(this, "_emptyMarkup");
    W(this, "_emptyMarkupInner");
    W(this, "_showMarkup");
    W(this, "_hideMarkup");
    W(this, "_paletteEntry");
    this._notifications = n, this._tokenSimulationPalette = r, this._canvas = i, this._scopeFilter = o, this._translate = a, this._emptyMarkupInner = () => `${hd}<span>${a("No Entries")}</span>`, this._emptyMarkup = () => `<p class="bts-entry placeholder">${this._emptyMarkupInner()}</span></p>`, this._showMarkup = () => `${Ro()}<span>${a("Show Simulation Log")}</span>`, this._hideMarkup = () => `${Ro()}<span>${a("Hide Simulation Log")}</span>`, this._init(), t.on(Vl, (u) => {
      zu(".bts-entry[data-scope-id]", this._container).forEach((m) => {
        const S = m.dataset.scopeId;
        Ae(m).toggle("inactive", !this._scopeFilter.isShown(S));
      });
    }), t.on(Hl, (u) => {
      const { scope: c } = u, { element: m } = c, S = c.completed;
      if (!["bpmn:Process", "bpmn:Participant", "bpmn:SubProcess"].includes(m.type))
        return;
      const b = `${Q(m, "bpmn:SubProcess") ? zr(m) || "SubProcess" : "Process"} ${S ? "finished" : "canceled"}`;
      this.log({
        text: b,
        icon: S ? Bo() : ed(),
        scope: c
      });
    }), t.on(ar, (u) => {
      const { scope: c } = u, { element: m } = c;
      if (!["bpmn:Process", "bpmn:Participant", "bpmn:SubProcess"].includes(m.type))
        return;
      const h = `${Q(m, "bpmn:SubProcess") ? zr(m) || "SubProcess" : "Process"} started`;
      this.log({
        text: h,
        icon: Bo(),
        scope: c
      });
    }), t.on(Is, (u) => {
      const { action: c, scope: m, element: S } = u;
      if (c !== "exit")
        return;
      const g = m.parent, h = zr(S);
      if (Q(S, "bpmn:ServiceTask")) {
        const b = S.businessObject.type;
        return this.log({
          text: h || b && pd[b] || "Service task",
          icon: b && fd[b] || "bpmn-icon-service",
          scope: g
        });
      }
      if (Q(S, "bpmn:UserTask"))
        return this.log({
          text: h || "User task",
          icon: "bpmn-icon-user",
          scope: g
        });
      if (Q(S, "bpmn:CallActivity"))
        return this.log({
          text: h || "Call Activity",
          icon: "bpmn-icon-call-activity",
          scope: g
        });
      if (Q(S, "bpmn:ScriptTask"))
        return this.log({
          text: h || "Script task",
          icon: "bpmn-icon-script",
          scope: g
        });
      if (Q(S, "bpmn:BusinessRuleTask"))
        return this.log({
          text: h || "Business Rule task",
          icon: "bpmn-icon-business-rule",
          scope: g
        });
      if (Q(S, "bpmn:ManualTask"))
        return this.log({
          text: h || "Manual task",
          icon: "bpmn-icon-manual-task",
          scope: g
        });
      if (Q(S, "bpmn:ReceiveTask"))
        return this.log({
          text: h || "Receive task",
          icon: "bpmn-icon-receive",
          scope: g
        });
      if (Q(S, "bpmn:SendTask"))
        return this.log({
          text: h || "Send task",
          icon: "bpmn-icon-send",
          scope: g
        });
      if (Q(S, "bpmn:Task"))
        return this.log({
          text: h || "Task",
          icon: "bpmn-icon-task",
          scope: g
        });
      if (Q(S, "bpmn:ExclusiveGateway"))
        return this.log({
          text: h || "Exclusive gateway",
          icon: "bpmn-icon-gateway-xor",
          scope: g
        });
      if (Q(S, "bpmn:ParallelGateway"))
        return this.log({
          text: h || "Parallel gateway",
          icon: "bpmn-icon-gateway-parallel",
          scope: g
        });
      if (Q(S, "bpmn:InclusiveGateway"))
        return this.log({
          text: h || "Inclusive gateway",
          icon: "bpmn-icon-gateway-or",
          scope: g
        });
      if (Q(S, "bpmn:StartEvent"))
        return this.log({
          text: h || "Start event",
          icon: `bpmn-icon-start-event-${oi(S)}`,
          scope: g
        });
      if (Q(S, "bpmn:IntermediateCatchEvent"))
        return this.log({
          text: h || "Intermediate event",
          icon: jr(S, "catch"),
          scope: g
        });
      if (Q(S, "bpmn:IntermediateThrowEvent"))
        return this.log({
          text: h || "Intermediate event",
          icon: jr(S, "throw"),
          scope: g
        });
      if (Q(S, "bpmn:BoundaryEvent"))
        return this.log({
          text: h || "Boundary event",
          icon: jr(S, "catch"),
          scope: g
        });
      if (Q(S, "bpmn:EndEvent"))
        return this.log({
          text: h || "End event",
          icon: `bpmn-icon-end-event-${oi(S)}`,
          scope: g
        });
    }), t.on(wn, () => {
      this.clear(), this.toggle(!0);
    }), t.on(Gt, ({ active: u }) => {
      this.clear(), this.toggle(u);
    });
    const l = this;
    t.on("i18n.changed", function() {
      l._updateEntry();
    });
  }
  _updateEntry() {
    const t = this.isShown();
    this._paletteEntry && (this._paletteEntry.innerHTML = t ? this._hideMarkup() : this._showMarkup()), t && this._updateContent();
  }
  _updateContent() {
    const t = this._translate, n = `${t("Simulation Log")}
        <button class="bts-close" aria-label="Close">
          ${Fo()}
        </button>`, r = this._container.querySelector(".bts-log .bts-header");
    r && (r.innerHTML = n, this._close = $n(".bts-close", this._container), gt.bind(this._close, "click", () => {
      this.toggle(!1);
    })), this._placeholder && (this._placeholder.innerHTML = this._emptyMarkupInner());
  }
  _init() {
    const t = this._translate;
    this._container = ct(`
    <div class="bts-log djs-scrollable hidden">
      <div class="bts-header">
        ${t("Simulation Log")}
        <button class="bts-close" aria-label="Close">
          ${Fo()}
        </button>
      </div>
      <div class="bts-content">
        ${this._emptyMarkup}
      </div>
    </div>
  `), this._placeholder = $n(".bts-placeholder", this._container), this._content = $n(".bts-content", this._container), gt.bind(this._content, "mousedown", (r) => {
      r.stopPropagation();
    }), this._close = $n(".bts-close", this._container), gt.bind(this._close, "click", () => {
      this.toggle(!1);
    }), this._canvas.getContainer().appendChild(this._container);
    const n = t("Toggle Simulation Log");
    this._paletteEntry = ct(`
    <div class="bts-entry" title="${n}">${this._showMarkup}</div>
  `), gt.bind(this._paletteEntry, "click", () => {
      this.toggle();
    }), this._tokenSimulationPalette.addEntry(this._paletteEntry, 3);
  }
  log(t) {
    const n = this._translate, { text: r, type: i = "info", icon: o = md, scope: s } = t, a = this._content;
    this._placeholder && Ae(this._placeholder).add("hidden"), this.isShown() || this._notifications.showNotification(t);
    const l = o.startsWith("<") ? o : `<i class="${o}"></i>`, u = s && s.colors, c = u ? `style="background: ${u.primary}; color: ${u.auxiliary}"` : "", m = n(r), S = ct(`
    <p class="bts-entry ${i} ${s && this._scopeFilter.isShown(s) ? "" : "inactive"}" ${s ? `data-scope-id="${s.id}"` : ""}>
      <span class="bts-icon">${l}</span>
      <span class="bts-text" title="${m}">${m}</span>
      ${s ? `<span class="bts-scope" data-scope-id="${s.id}" ${c}>${s.id}</span>` : ""}
    </p>
  `);
    Fu.bind(S, ".bts-scope[data-scope-id]", "click", (h) => {
      this._scopeFilter.toggle(s);
    });
    const g = Math.abs(a.clientHeight + a.scrollTop - a.scrollHeight) < 2;
    a.appendChild(S), g && (a.scrollTop = a.scrollHeight);
  }
  isShown() {
    const t = this._container;
    return !Ae(t).has("hidden");
  }
  toggle(t = !this.isShown()) {
    const n = this._container;
    t ? (Ae(n).remove("hidden"), this._paletteEntry.innerHTML = this._hideMarkup()) : (Ae(n).add("hidden"), this._paletteEntry.innerHTML = this._showMarkup()), this._updateContent();
  }
  clear() {
    if (this._content) {
      for (; this._content.firstChild; )
        this._content.removeChild(this._content.firstChild);
      this._placeholder = ct(this._emptyMarkup()), this._content.appendChild(this._placeholder);
    }
  }
}
W(Ni, "$inject");
Ni.$inject = [
  "eventBus",
  "notifications",
  "tokenSimulationPalette",
  "canvas",
  "scopeFilter",
  "simulator",
  "translate"
];
const vd = {
  __depends__: [fr, Ns],
  __init__: ["log"],
  log: ["type", Ni]
}, gd = {
  __depends__: [
    Tl,
    Ol,
    Al,
    Pl,
    xl,
    dd,
    od,
    sd,
    Dl,
    // SetAnimationSpeedModule,
    Ml,
    ad,
    $l,
    Ll,
    Pu,
    vd
  ]
};
class Ri {
  constructor(t, n) {
    W(this, "_active");
    W(this, "_eventBus");
    W(this, "_canvas");
    W(this, "_canvasParent");
    this._eventBus = t, this._canvas = n, this._active = !1, t.on("import.parse.start", () => {
      this._active && (this.toggleMode(!1), t.once("import.done", () => {
        this.toggleMode(!0);
      }));
    }), t.on("diagram.init", () => {
      this._canvasParent = this._canvas.getContainer().parentNode;
    });
  }
  toggleMode(t = !this._active) {
    t !== this._active && (t ? Ae(this._canvasParent).add("simulation") : Ae(this._canvasParent).remove("simulation"), this._eventBus.fire(Gt, {
      active: t
    }), this._active = t);
  }
}
W(Ri, "$inject");
Ri.$inject = ["eventBus", "canvas"];
const yd = {
  __init__: ["toggleMode"],
  toggleMode: ["type", Ri]
}, bd = {
  __depends__: [gd, yd]
};
function wd(e, t) {
  if (e.ownerDocument !== t.ownerDocument)
    try {
      return t.ownerDocument.importNode(e, !0);
    } catch {
    }
  return e;
}
function Ed(e, t) {
  return t.appendChild(wd(e, t));
}
function Vr(e, t) {
  return Ed(t, e), e;
}
var si = 2, ua = {
  "alignment-baseline": 1,
  "baseline-shift": 1,
  clip: 1,
  "clip-path": 1,
  "clip-rule": 1,
  color: 1,
  "color-interpolation": 1,
  "color-interpolation-filters": 1,
  "color-profile": 1,
  "color-rendering": 1,
  cursor: 1,
  direction: 1,
  display: 1,
  "dominant-baseline": 1,
  "enable-background": 1,
  fill: 1,
  "fill-opacity": 1,
  "fill-rule": 1,
  filter: 1,
  "flood-color": 1,
  "flood-opacity": 1,
  font: 1,
  "font-family": 1,
  "font-size": si,
  "font-size-adjust": 1,
  "font-stretch": 1,
  "font-style": 1,
  "font-variant": 1,
  "font-weight": 1,
  "glyph-orientation-horizontal": 1,
  "glyph-orientation-vertical": 1,
  "image-rendering": 1,
  kerning: 1,
  "letter-spacing": 1,
  "lighting-color": 1,
  marker: 1,
  "marker-end": 1,
  "marker-mid": 1,
  "marker-start": 1,
  mask: 1,
  opacity: 1,
  overflow: 1,
  "pointer-events": 1,
  "shape-rendering": 1,
  "stop-color": 1,
  "stop-opacity": 1,
  stroke: 1,
  "stroke-dasharray": 1,
  "stroke-dashoffset": 1,
  "stroke-linecap": 1,
  "stroke-linejoin": 1,
  "stroke-miterlimit": 1,
  "stroke-opacity": 1,
  "stroke-width": si,
  "text-anchor": 1,
  "text-decoration": 1,
  "text-rendering": 1,
  "unicode-bidi": 1,
  visibility: 1,
  "word-spacing": 1,
  "writing-mode": 1
};
function Sd(e, t) {
  return ua[t] ? e.style[t] : e.getAttributeNS(null, t);
}
function _d(e, t, n) {
  var r = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), i = ua[r];
  i ? (i === si && typeof n == "number" && (n = String(n) + "px"), e.style[r] = n) : e.setAttributeNS(null, t, n);
}
function Cd(e, t) {
  var n = Object.keys(t), r, i;
  for (r = 0, i; i = n[r]; r++)
    _d(e, i, t[i]);
}
function kd(e, t, n) {
  return typeof t == "string" ? Sd(e, t) : (Cd(e, t), e);
}
var Bi = {
  svg: "http://www.w3.org/2000/svg"
}, jo = '<svg xmlns="' + Bi.svg + '"';
function Td(e) {
  var t = !1;
  e.substring(0, 4) === "<svg" ? e.indexOf(Bi.svg) === -1 && (e = jo + e.substring(4)) : (e = jo + ">" + e + "</svg>", t = !0);
  var n = Od(e);
  if (!t)
    return n;
  for (var r = document.createDocumentFragment(), i = n.firstChild; i.firstChild; )
    r.appendChild(i.firstChild);
  return r;
}
function Od(e) {
  var t;
  return t = new DOMParser(), t.async = !1, t.parseFromString(e, "text/xml");
}
function Ln(e, t) {
  var n;
  return e = e.trim(), e.charAt(0) === "<" ? (n = Td(e).firstChild, n = document.importNode(n, !0)) : n = document.createElementNS(Bi.svg, e), t && kd(n, t), n;
}
const Vo = 0.95, Ad = 1, Ho = 3;
class Pd extends Gl {
  constructor(n, r, i, o, s, a, l) {
    super(n, r, i, o, s, a, l);
    W(this, "_overrideColor");
    const u = this.handlers, c = n && n.defaultFillColor, m = n && n.defaultStrokeColor;
    this._overrideColor = (n == null ? void 0 : n.overrideColor) || !1;
    function S(p) {
      return i.computeStyle(p, ["no-fill"], {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: uo,
        strokeWidth: 2
      });
    }
    function g(p) {
      return i.computeStyle(p, {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: uo,
        strokeWidth: 2,
        fill: "white"
      });
    }
    function h(p, f, v) {
      v = S(v);
      const k = Ln("path", { ...v, d: f });
      return Vr(p, k), k;
    }
    function b(p, f, v) {
      const k = Ln("text", v);
      return k.innerHTML = f, Vr(p, k), k;
    }
    function w(p, f, v, k, x) {
      _u(k) && (x = k, k = 0), k = k || 0, x = g(x);
      const O = f / 2, q = v / 2, R = Ln("circle", {
        cx: O,
        cy: q,
        r: Math.round((f + v) / 4 - k),
        ...x
      });
      return Vr(p, R), R;
    }
    const T = {
      "bpmn:MessageEventDefinition": function(p, f, v = {}, k) {
        const x = o.getScaledPath("EVENT_MESSAGE", {
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.235,
            my: 0.315
          }
        }), O = k ? fe(f, m, v.stroke) : Ce(f, c, v.fill), q = k ? Ce(f, c, v.fill) : fe(f, m, v.stroke);
        return h(p, x, {
          fill: O,
          stroke: q,
          strokeWidth: 1
        });
      },
      "bpmn:TimerEventDefinition": function(p, f, v = {}) {
        const k = w(p, f.width, f.height, 0.2 * f.height, {
          fill: Ce(f, c, v.fill),
          stroke: fe(f, m, v.stroke),
          strokeWidth: 2
        }), x = o.getScaledPath("EVENT_TIMER_WH", {
          xScaleFactor: 0.75,
          yScaleFactor: 0.75,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.5,
            my: 0.5
          }
        });
        h(p, x, {
          stroke: fe(f, m, v.stroke),
          strokeWidth: 2
        });
        for (let O = 0; O < 12; O++) {
          const q = o.getScaledPath("EVENT_TIMER_LINE", {
            xScaleFactor: 0.75,
            yScaleFactor: 0.75,
            containerWidth: f.width,
            containerHeight: f.height,
            position: {
              mx: 0.5,
              my: 0.5
            }
          }), R = f.width / 2, ae = f.height / 2;
          h(p, q, {
            strokeWidth: 1,
            stroke: fe(f, m, v.stroke),
            transform: "rotate(" + O * 30 + "," + ae + "," + R + ")"
          });
        }
        return k;
      },
      "bpmn:EscalationEventDefinition": function(p, f, v = {}, k) {
        const x = o.getScaledPath("EVENT_ESCALATION", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.5,
            my: 0.2
          }
        }), O = k ? fe(f, m, v.stroke) : Ce(f, c, v.fill);
        return h(p, x, {
          fill: O,
          stroke: fe(f, m, v.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:ConditionalEventDefinition": function(p, f, v = {}) {
        const k = o.getScaledPath("EVENT_CONDITIONAL", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.5,
            my: 0.222
          }
        });
        return h(p, k, {
          fill: Ce(f, c, v.fill),
          stroke: fe(f, m, v.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:LinkEventDefinition": function(p, f, v = {}, k) {
        const x = o.getScaledPath("EVENT_LINK", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.57,
            my: 0.263
          }
        }), O = k ? fe(f, m, v.stroke) : Ce(f, c, v.fill);
        return h(p, x, {
          fill: O,
          stroke: fe(f, m, v.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:ErrorEventDefinition": function(p, f, v = {}, k) {
        const x = o.getScaledPath("EVENT_ERROR", {
          xScaleFactor: 1.1,
          yScaleFactor: 1.1,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.2,
            my: 0.722
          }
        }), O = k ? fe(f, m, v.stroke) : Ce(f, c, v.fill);
        return h(p, x, {
          fill: O,
          stroke: fe(f, m, v.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:CancelEventDefinition": function(p, f, v = {}, k) {
        const x = o.getScaledPath("EVENT_CANCEL_45", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.638,
            my: -0.055
          }
        }), O = k ? fe(f, m, v.stroke) : "none", q = h(p, x, {
          fill: O,
          stroke: fe(f, m, v.stroke),
          strokeWidth: 1
        });
        return Xl(q, 45), q;
      },
      "bpmn:CompensateEventDefinition": function(p, f, v = {}, k) {
        const x = o.getScaledPath("EVENT_COMPENSATION", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.22,
            my: 0.5
          }
        }), O = k ? fe(f, m, v.stroke) : Ce(f, c, v.fill);
        return h(p, x, {
          fill: O,
          stroke: fe(f, m, v.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:SignalEventDefinition": function(p, f, v = {}, k) {
        const x = o.getScaledPath("EVENT_SIGNAL", {
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.5,
            my: 0.2
          }
        }), O = k ? fe(f, m, v.stroke) : Ce(f, c, v.fill);
        return h(p, x, {
          strokeWidth: 1,
          fill: O,
          stroke: fe(f, m, v.stroke)
        });
      },
      "bpmn:MultipleEventDefinition": function(p, f, v = {}, k) {
        const x = o.getScaledPath("EVENT_MULTIPLE", {
          xScaleFactor: 1.1,
          yScaleFactor: 1.1,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.222,
            my: 0.36
          }
        }), { stroke: O } = v, q = k ? fe(f, m, O) : Ce(f, c, v.fill);
        return h(p, x, {
          fill: q,
          stroke: O,
          strokeWidth: 1
        });
      },
      "bpmn:ParallelMultipleEventDefinition": function(p, f, v = {}) {
        const k = o.getScaledPath("EVENT_PARALLEL_MULTIPLE", {
          xScaleFactor: 1.2,
          yScaleFactor: 1.2,
          containerWidth: f.width,
          containerHeight: f.height,
          position: {
            mx: 0.458,
            my: 0.194
          }
        });
        return h(p, k, {
          fill: Ce(f, c, v.fill),
          stroke: fe(f, m, v.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:TerminateEventDefinition": function(p, f, v = {}) {
        return w(p, f.width, f.height, 8, {
          fill: fe(f, m, v.stroke),
          stroke: fe(f, m, v.stroke),
          strokeWidth: 4
        });
      }
    };
    function M(p, f, v = {}) {
      const k = Cr(p), x = Yl(k);
      return ca(
        k,
        "VariableListenerEventDefinition"
      ).length ? T["bpmn:MultipleEventDefinition"](
        f,
        p,
        v,
        x
      ) : k.get("eventDefinitions") && k.get("eventDefinitions").length > 1 && k.get("parallelMultiple") ? T["bpmn:ParallelMultipleEventDefinition"](
        f,
        p,
        v
      ) : et(k, "bpmn:MessageEventDefinition") ? T["bpmn:MessageEventDefinition"](
        f,
        p,
        v,
        x
      ) : et(k, "bpmn:TimerEventDefinition") ? T["bpmn:TimerEventDefinition"](f, p, v) : et(k, "bpmn:ConditionalEventDefinition") ? T["bpmn:ConditionalEventDefinition"](f, p, v) : et(k, "bpmn:SignalEventDefinition") ? T["bpmn:SignalEventDefinition"](
        f,
        p,
        v,
        x
      ) : et(k, "bpmn:EscalationEventDefinition") ? T["bpmn:EscalationEventDefinition"](
        f,
        p,
        v,
        x
      ) : et(k, "bpmn:LinkEventDefinition") ? T["bpmn:LinkEventDefinition"](f, p, v, x) : et(k, "bpmn:ErrorEventDefinition") ? T["bpmn:ErrorEventDefinition"](
        f,
        p,
        v,
        x
      ) : et(k, "bpmn:CancelEventDefinition") ? T["bpmn:CancelEventDefinition"](
        f,
        p,
        v,
        x
      ) : et(k, "bpmn:CompensateEventDefinition") ? T["bpmn:CompensateEventDefinition"](
        f,
        p,
        v,
        x
      ) : et(k, "bpmn:TerminateEventDefinition") ? T["bpmn:TerminateEventDefinition"](f, p, v) : null;
    }
    const N = (p, f, v = {}) => {
      v = In(v, ["fill", "stroke"]);
      const k = u["bpmn:Task"](p, f, v), x = f.businessObject.get("type"), O = {
        class: "custom-service",
        fill: fe(f, c, v.stroke),
        stroke: fe(f, m, v.stroke),
        strokeWidth: 0
      }, q = Ln("g", { class: "custom-node-marker" });
      switch (p.insertBefore(q, null), x) {
        case "shell":
          const R = o.getStaticPath("SERVICE_SHELL");
          h(p, R, O);
          break;
        case "copy":
          const ae = o.getStaticPath("SERVICE_COPY");
          h(p, ae, O);
          break;
        case "camel":
          const C = o.getStaticPath("SERVICE_CAMEL");
          h(p, C, O);
          break;
        case "dmn":
          const A = o.getStaticPath("SERVICE_DMN");
          h(p, A, O);
          break;
        case "http":
          const B = o.getStaticPath("SERVICE_HTTP_1");
          h(p, B, O);
          const z = o.getStaticPath("SERVICE_HTTP_2");
          h(p, z, O);
          break;
        case "email":
          const Y = o.getStaticPath("SERVICE_MAIL_1");
          h(p, Y, O);
          const ee = o.getStaticPath("SERVICE_MAIL_2");
          h(p, ee, O);
          break;
        case "mq":
          const ne = o.getStaticPath("SERVICE_MQ_1");
          h(p, ne, O);
          const ye = o.getStaticPath("SERVICE_MQ_2");
          h(p, ye, O);
          break;
        case "sc":
          const le = o.getStaticPath("SERVICE_SC_1");
          h(p, le, O);
          const be = o.getStaticPath("SERVICE_SC_2");
          h(p, be, O);
          break;
        case "dubbo":
          const De = o.getStaticPath("SERVICE_SC_1");
          h(p, De, O);
          const Xe = o.getStaticPath("SERVICE_SC_2");
          h(p, Xe, {
            ...O,
            transform: "scale(0.8 0.8) translate(4 0)"
          }), b(p, "dubbo", { ...O, x: 8, y: 17, fontSize: 4 });
          break;
        case "rest":
          const Te = o.getStaticPath("SERVICE_REST_1");
          h(p, Te, O);
          const Be = o.getStaticPath("SERVICE_REST_2");
          h(p, Be, O);
          break;
        default:
          w(p, 10, 10, 0, {
            fill: Ce(f, c, v.fill),
            stroke: "none",
            transform: "translate(6, 6)"
          });
          const y = o.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
              x: 12,
              y: 18
            }
          });
          h(p, y, {
            fill: Ce(f, c, v.fill),
            stroke: fe(f, m, v.stroke),
            strokeWidth: 1
          }), w(p, 10, 10, 0, {
            fill: Ce(f, c, v.fill),
            stroke: "none",
            transform: "translate(11, 10)"
          });
          const I = o.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
              x: 17,
              y: 22
            }
          });
          h(p, I, {
            fill: Ce(f, c, v.fill),
            stroke: fe(f, m, v.stroke),
            strokeWidth: 1
          });
      }
      return k;
    }, d = (p, f, v = {}) => {
      const { renderIcon: k = !0 } = v;
      v = In(v, ["fill", "stroke"]), Cr(f).get("isInterrupting") === !1 && (v = {
        ...v,
        strokeDasharray: "6"
      });
      const O = w(p, f.width, f.height, {
        fillOpacity: Vo,
        ...v,
        fill: Ce(f, c, v.fill),
        stroke: fe(f, m, v.stroke)
      });
      return k && M(f, p, v), O;
    }, $ = (p, f, v = {}) => {
      const { renderIcon: k = !0 } = v;
      v = In(v, ["fill", "stroke"]);
      const x = Cr(f), O = x.get("cancelActivity");
      v = {
        strokeWidth: 1.5,
        fill: Ce(f, c, v.fill),
        fillOpacity: Ad,
        stroke: fe(f, m, v.stroke)
      }, O === !1 && (v.strokeDasharray = "6");
      const q = w(p, f.width, f.height, v);
      return w(p, f.width, f.height, Ho, {
        ...v,
        fill: "none"
      }), k && M(f, p, v), q;
    }, P = (p, f, v = {}) => {
      const { renderIcon: k = !0 } = v;
      v = In(v, ["fill", "stroke"]);
      const x = w(p, f.width, f.height, {
        fillOpacity: Vo,
        ...v,
        fill: Ce(f, c, v.fill),
        stroke: fe(f, m, v.stroke),
        strokeWidth: 1.5
      });
      return w(p, f.width, f.height, Ho, {
        fill: "none",
        stroke: fe(f, m, v.stroke),
        strokeWidth: 1.5
      }), k && M(f, p, v), x;
    };
    this.handlers["bpmn:ServiceTask"] = N, this.handlers["bpmn:StartEvent"] = d, this.handlers["bpmn:BoundaryEvent"] = $, this.handlers["bpmn:IntermediateEvent"] = P;
  }
  drawShape(n, r, i = {}) {
    let o, s = "var(--color-bg-5)";
    if (!this._overrideColor) {
      const a = co(r);
      o = a.get("color:border-color") || a.get("bioc:stroke"), s = a.get("color:background-color") || a.get("bioc:fill") || "var(--color-bg-5)";
    }
    return Q(r, "bpmn:Activity") ? (i = { stroke: o || "var(--color-activity)", fill: s, ...i }, super.drawShape(n, r, i)) : Q(r, "bpmn:StartEvent") ? (i = { stroke: o || "var(--color-start-event)", fill: s, ...i }, super.drawShape(n, r, i)) : Q(r, "bpmn:EndEvent") ? (i = { stroke: o || "var(--color-end-event)", fill: s, ...i }, super.drawShape(n, r, i)) : Q(r, "bpmn:BoundaryEvent") ? (i = { stroke: o || "var(--color-boundary-event)", fill: s, ...i }, super.drawShape(n, r, i)) : Q(r, "bpmn:CatchEvent") || Q(r, "bpmn:ThrowEvent") ? (i = { stroke: o || "var(--color-catch-event)", fill: s, ...i }, super.drawShape(n, r, i)) : Q(r, "bpmn:Gateway") ? (i = { stroke: o || "var(--color-gateway)", fill: s, ...i }, super.drawShape(n, r, i)) : Q(r, "bpmn:Group") ? (i = { stroke: o || "var(--color-element)", fill: "none", ...i }, super.drawShape(n, r, i)) : super.drawShape(n, r, {
      stroke: o || "var(--color-element)",
      fill: s,
      ...i
    });
  }
  drawConnection(n, r, i = {}) {
    let o;
    if (!this._overrideColor) {
      const s = co(r);
      o = s.get("color:border-color") || s.get("bioc:stroke");
    }
    return Kl(r, ["bpmn:SequenceFlow", "bpmn:MessageFlow", "bpmn:Association"]) ? (i = { stroke: o || "#9cafcf", ...i }, super.drawConnection(n, r, i)) : super.drawConnection(n, r, i);
  }
}
function In(e, t = []) {
  return t.reduce((n, r) => (e[r] && (n[r] = e[r]), n), {});
}
class xd extends Jl {
  constructor() {
    super(), this.pathMap.SERVICE_SHELL = {
      d: "m26.02111,22.35561l-20.79771,0c-0.67287,0 -1.22339,-0.59 -1.22339,-1.31112l0,-15.73338c0,-0.72111 0.55053,-1.31112 1.22339,-1.31112l20.79771,0c0.67287,0 1.22339,0.59 1.22339,1.31112l0,15.73338c0,0.72111 -0.55053,1.31112 -1.22339,1.31112zm-18.85252,-11.09203c-0.19574,0 -0.39149,0.07867 -0.53829,0.236c-0.29361,0.31467 -0.29361,0.83911 0,1.15378l2.78934,2.98934l-2.75264,2.95001c-0.29361,0.31467 -0.29361,0.83911 0,1.15378s0.78297,0.31467 1.07659,0l3.29093,-3.5269c0.29361,-0.31467 0.29361,-0.83911 0,-1.15378l-3.32763,-3.56623c-0.14681,-0.15733 -0.34255,-0.236 -0.53829,-0.236zm10.75364,0l-6.20261,0c-0.41595,0 -0.7585,0.36711 -0.7585,0.81289s0.34255,0.81289 0.7585,0.81289l6.20261,0c0.41595,0 0.7585,-0.36711 0.7585,-0.81289s-0.34255,-0.81289 -0.7585,-0.81289z"
    }, this.pathMap.SERVICE_COPY = {
      d: "m22.25426,4.36071c0.32142,-0.1 0.65571,-0.1 0.97713,0c0.78428,0.25 1.20856,1.05002 1.00284,1.81254l-0.02571,0.0875l-5.82421,16.98784c-0.12857,0.37501 -0.41142,0.68751 -0.77142,0.87502c-0.73285,0.36251 -1.61998,0.0875 -2.0314,-0.58751l-0.05143,-0.0875l-3.65138,-7.10014l-7.30276,-3.55007c-0.29571,-0.15 -0.53999,-0.37501 -0.69428,-0.67501l-0.05143,-0.1l-0.03857,-0.1c-0.25714,-0.76252 0.14143,-1.57503 0.88713,-1.87504l0.09,-0.0375s17.48549,-5.65011 17.48549,-5.65011zm-0.59142,3.62507l-7.99704,7.77515l3.20139,6.22512l4.79565,-14.00028zm-1.18284,-1.15002l-14.41267,4.67509l6.40277,3.11256l8.0099,-7.77515l0,0l0,-0.0125z"
    }, this.pathMap.SERVICE_CAMEL = {
      d: "m21.65023,16.92556c-0.04825,-0.2448 -0.08444,-0.476 -0.13269,-0.7208c-0.10856,-0.5168 -0.21712,-1.0336 -0.32569,-1.5504c0,-0.0408 -0.03619,-0.0816 -0.06031,-0.136c-0.16887,0.4216 -0.10856,0.8296 -0.02412,1.2376c0.10856,0.5168 0.27744,1.0064 0.49456,1.4824c0.07237,0.1496 0.0965,0.3536 0.07237,0.5304c-0.06031,0.7888 -0.15681,1.564 -0.21712,2.35281c-0.01206,0.1496 0.01206,0.3128 0.04825,0.4624c0.0965,0.3944 0.06031,0.8024 0,1.1968c-0.03619,0.1768 -0.10856,0.2992 -0.27744,0.2856c-0.39806,-0.0544 -0.78406,-0.1224 -1.20625,-0.1904c0.08444,-0.2448 0.25331,-0.2856 0.39806,-0.2584c0.25331,0.0408 0.34981,-0.1224 0.39806,-0.3264c0.07237,-0.2992 0.14475,-0.5984 0.15681,-0.8976c0.03619,-0.8568 0.02412,-1.7272 -0.21712,-2.55681c-0.04825,-0.1768 -0.0965,-0.3536 -0.193,-0.5168c-0.20506,-0.3536 -0.27744,-0.748 -0.34981,-1.156c-0.03619,-0.204 -0.12062,-0.3944 -0.20506,-0.5848c-0.02412,-0.0544 -0.10856,-0.1224 -0.15681,-0.1224c-0.04825,0 -0.10856,0.1088 -0.10856,0.1768c-0.01206,0.2448 -0.03619,0.4896 -0.01206,0.7344c0.01206,0.2584 0.04825,0.5168 0.08444,0.7616c0.03619,0.2584 0.07237,0.5168 0.14475,0.7616c0.06031,0.2176 0.04825,0.3944 -0.03619,0.5984l-1.26656,2.74721c-0.07237,0.1496 -0.12062,0.3128 -0.16887,0.4624c-0.12062,0.3944 -0.37394,0.5848 -0.73581,0.612c-0.22919,0.0136 -0.45837,0 -0.68756,-0.0408c-0.08444,0 -0.15681,-0.1224 -0.22919,-0.1768c0.06031,-0.0816 0.10856,-0.1904 0.193,-0.2584c0.07237,-0.0544 0.16887,-0.0816 0.26537,-0.1088c0.36187,-0.0544 0.61519,-0.3128 0.74787,-0.6528c0.21712,-0.5304 0.39806,-1.0744 0.56694,-1.6184c0.0965,-0.2992 0.16887,-0.5984 0.24125,-0.9112c0.0965,-0.5032 -0.03619,-0.9792 -0.15681,-1.4416c-0.07237,-0.2856 -0.07237,-0.5304 0.01206,-0.8024c0.04825,-0.1768 0.04825,-0.408 -0.02412,-0.5712c-0.2895,-0.6664 -0.579,-1.3464 -0.74787,-2.0808c0,-0.0136 -0.02412,-0.0408 -0.04825,-0.0544c-0.04825,0.0408 -0.10856,0.0544 -0.16887,0.0952c-0.56694,0.3672 -1.14594,0.6664 -1.76112,0.884c-0.13269,0.0408 -0.24125,0.1224 -0.37394,0.1904c-0.07237,0.0408 -0.14475,0.0544 -0.21712,0.068c-0.90469,0.0544 -1.80937,0.0816 -2.68994,-0.2448c-0.13269,-0.0544 -0.26537,-0.068 -0.39806,-0.1088c-0.20506,-0.0544 -0.32569,0.0408 -0.32569,0.272c0,0.6936 0.04825,1.3736 0.20506,2.0536c0.12062,0.5168 0.20506,1.0336 0.20506,1.564c0,0.3808 0.10856,0.7616 0.16887,1.1424l0.31362,1.9448c0.03619,0.2448 -0.12062,0.5032 -0.37394,0.544c-0.21712,0.0408 -0.44631,0.0272 -0.66344,0.0408c-0.12062,0 -0.25331,-0.0136 -0.37394,-0.0272c-0.14475,0 -0.193,-0.068 -0.13269,-0.2312c0.07237,-0.1904 0.20506,-0.2856 0.37394,-0.3264c0.33775,-0.0816 0.41012,-0.1904 0.42219,-0.5848c0,-0.612 -0.06031,-1.224 -0.21712,-1.8088c-0.08444,-0.2856 -0.22919,-0.5576 -0.34981,-0.8296c-0.02412,0 -0.03619,0 -0.06031,0.0136c-0.01206,0.1088 -0.03619,0.2176 -0.02412,0.3128c0.03619,0.544 0.08444,1.0744 0.12062,1.6184c0.02412,0.3128 0.03619,0.6256 0.04825,0.9384c0,0.1768 -0.04825,0.2856 -0.22919,0.3128c-0.37394,0.0544 -0.73581,0.1224 -1.12181,0.1768c-0.07237,0 -0.20506,-0.0544 -0.22919,-0.136c-0.04825,-0.136 0.04825,-0.2312 0.16887,-0.272c0.02412,0 0.06031,-0.0136 0.08444,-0.0272c0.26537,-0.1224 0.50662,-0.2856 0.53075,-0.6664c0.02412,-0.544 0.08444,-1.0744 0.10856,-1.6184c0,-0.1632 -0.02412,-0.34 -0.08444,-0.476c-0.193,-0.4488 -0.24125,-0.9112 -0.13269,-1.3872c0.08444,-0.34 0.08444,-0.68 0.01206,-1.02c-0.01206,-0.0816 0,-0.1632 -0.01206,-0.2448c-0.02412,-0.1768 -0.03619,-0.3672 -0.10856,-0.5032c-0.193,-0.34 -0.32569,-0.7072 -0.386,-1.1016c-0.02412,-0.1768 -0.10856,-0.3264 -0.22919,-0.4352c-0.16887,-0.1632 -0.31362,-0.3808 -0.49456,-0.5304c-0.13269,-0.0952 -0.31362,-0.1496 -0.47044,-0.1632c-0.06031,0 -0.16887,0.1224 -0.18094,0.2176c-0.02412,0.1496 -0.08444,0.204 -0.20506,0.2176c-0.37394,0.068 -0.71169,-0.0408 -1.07356,-0.1224c-0.65137,-0.1632 -1.13387,-0.6528 -1.59225,-1.1152c-0.37394,-0.3808 -0.49456,-0.952 -0.59106,-1.5096c-0.06031,-0.3672 -0.13269,-0.7344 -0.15681,-1.1152c-0.01206,-0.3264 0.03619,-0.6664 0.04825,-1.0064c0.01206,-0.204 0.02412,-0.408 0.01206,-0.612c0,-0.0816 -0.08444,-0.1632 -0.14475,-0.2176c-0.27744,-0.1904 -0.54281,-0.4216 -0.89262,-0.4352c-0.15681,0 -0.2895,-0.2448 -0.22919,-0.5032c0.04825,-0.2584 0.10856,-0.5168 0.24125,-0.7344c0.07237,-0.136 0.26537,-0.2176 0.41012,-0.2584c0.34981,-0.068 0.68756,-0.1496 1.01325,-0.3128c0.33775,-0.1632 0.66344,-0.1904 0.965,0.136c0.15681,0.1632 0.37394,0.2176 0.59106,0.1768c0.08444,0 0.193,0.0544 0.27744,0.0952c0.02412,0 0.02412,0.1088 0,0.1496c-0.10856,0.2176 -0.10856,0.3672 0.03619,0.5304c0.37394,0.4216 0.45837,0.9384 0.45837,1.5096c0,0.2856 0,0.5848 0.03619,0.8704c0.02412,0.2992 0.13269,0.3672 0.386,0.2856c0.68756,-0.1904 1.19419,-0.6936 1.55606,-1.3464c0.37394,-0.6528 0.69962,-1.3464 1.03737,-2.0264c0.193,-0.3808 0.36187,-0.7616 0.55487,-1.1288c0.07237,-0.136 0.13269,-0.2584 0.22919,-0.3808c0.24125,-0.34 0.55487,-0.4624 0.85644,-0.34c0.31362,0.1224 0.53075,0.4896 0.51869,0.8976c0,0.1224 -0.01206,0.2584 -0.03619,0.3808c-0.04825,0.2448 0,0.4352 0.0965,0.6528c0.13269,0.34 0.26537,0.6936 0.37394,1.0472c0.0965,0.2584 0.16887,0.5304 0.39806,0.6936c0.10856,0.0816 0.25331,0.1088 0.37394,0.136c0.13269,0.0136 0.24125,-0.0816 0.24125,-0.2312c0,-0.6392 0.21712,-1.2104 0.33775,-1.8088c0.04825,-0.272 0.04825,-0.5576 0.0965,-0.8296c0.0965,-0.4624 0.37394,-0.7208 0.772,-0.8024c0.36187,-0.0816 0.65137,0.068 0.90469,0.3944c0.14475,0.1904 0.31362,0.3672 0.51869,0.4624c0.65137,0.3536 1.10975,0.9112 1.41131,1.6184c0.16887,0.3944 0.34981,0.8024 0.4825,1.2104c0.0965,0.2584 0.13269,0.544 0.16887,0.8296c0.04825,0.3536 0.20506,0.5576 0.51869,0.6664c0.47044,0.1632 0.85644,0.4624 1.13387,0.9248c0.15681,0.2584 0.21712,0.5576 0.21712,0.8704c0,0.5848 0.08444,1.1424 0.193,1.7136c0.07237,0.3944 0.07237,0.816 0.10856,1.224c0.07237,0.8432 0.14475,1.6728 0.21712,2.51601c0,0.0816 0,0.1768 0.01206,0.2448c-0.03619,0 -0.06031,0.0136 -0.0965,0.0136l0,0l0.02412,0.0544z"
    }, this.pathMap.SERVICE_DMN = {
      d: "m4.01314,5.18141l0,16.14588c0,0.66057 0.55194,1.19411 1.2353,1.19411l16.70281,0c0.68336,0 1.2353,-0.53354 1.2353,-1.19411l0,-16.13317c0,-0.66057 -0.55194,-1.19411 -1.2353,-1.19411l-16.71595,0c-0.68336,0 -1.2353,0.53354 -1.2353,1.19411l0,0l0.01314,-0.0127zm5.99251,16.17128l-4.38925,0c-0.22341,0 -0.40739,-0.17785 -0.40739,-0.3938l0,-3.0869l4.7835,0l0,3.468l0,0l0.01314,0.0127zm0,-4.624l-4.79664,0l0,-3.468l4.7835,0l0,3.468l0,0l0.01314,0zm5.99251,4.624l-4.7835,0l0,-3.468l4.7835,0l0,3.468zm0,-4.624l-4.7835,0l0,-3.468l4.7835,0l0,3.468zm5.57198,4.624l-4.38925,0l0,-3.468l4.7835,0l0,3.0869c0,0.21596 -0.18398,0.3938 -0.40739,0.3938l0,0l0.01314,-0.0127zm0.40739,-4.6367l-4.7835,0l0,-3.468l4.7835,0l0,3.468zm0,-4.624l-4.7835,0l0,-3.468l-1.19587,0l0,3.468l-4.7835,0l0,-3.468l-1.19587,0l0,3.468l-4.80978,0l0,-3.0869c0,-0.21596 0.18398,-0.3938 0.40739,-0.3938l15.95375,0c0.22341,0 0.40739,0.17785 0.40739,0.3938l0,3.0869z"
    }, this.pathMap.SERVICE_HTTP_1 = {
      d: "m13.86478,4.01167c-5.441,0 -9.85295,4.31949 -9.86478,9.74804c0,5.38185 4.36463,9.75972 9.85295,9.77139c5.45283,0 9.86478,-4.30782 9.90026,-9.75972c-0.02366,-5.4052 -4.40012,-9.77139 -9.88843,-9.77139l0,0.01167zm-6.30447,8.62731c0.20108,-0.17511 0.3785,-0.37358 0.60324,-0.53702c0.28388,-0.21014 0.6269,-0.29186 0.96992,-0.29186l2.79147,0c0.48496,0 0.91078,-0.18679 1.28928,-0.4553c0.41399,-0.30353 0.82798,-0.59539 1.24197,-0.88725c0.43765,-0.30353 0.87529,-0.61874 1.31294,-0.9106c0.03548,-0.02335 0.0828,-0.05837 0.13011,-0.07005c0,0 0.01183,0.02335 0.02366,0.02335c-0.04731,0.05837 -0.10645,0.11674 -0.1656,0.16344c-1.53767,1.52933 -3.08718,3.04699 -4.62485,4.56465c-0.04731,0.0467 -0.09463,0.08172 -0.14194,0.10507c-0.63873,0.21014 -1.15917,0.57204 -1.62047,1.03901l-0.05914,0.05837s-0.02366,0.01167 -0.04731,0.03502l-0.28388,-0.42027c-0.48496,-0.71213 -0.95809,-1.42426 -1.44305,-2.1364c-0.0828,-0.11674 -0.07097,-0.18679 0.02366,-0.28018l0,0zm9.77015,-0.94562c-0.43765,0.61874 -0.87529,1.23748 -1.32477,1.85621c-0.10645,0.14009 -0.22474,0.26851 -0.31936,0.4086c-0.28388,0.42027 -0.40216,0.88725 -0.40216,1.38924l0,2.56835c0,0.47865 -0.1656,0.88725 -0.50862,1.2258c-0.11828,0.11674 -0.24839,0.23349 -0.35485,0.3619c-0.05914,0.07005 -0.10645,0.07005 -0.18925,0.01167c-0.63873,-0.42027 -1.27745,-0.84055 -1.92801,-1.2725c-0.23657,-0.16344 -0.47313,-0.31521 -0.7097,-0.46697c0.22474,-0.25683 0.44947,-0.49032 0.63873,-0.75883c0.17742,-0.26851 0.30753,-0.57204 0.4613,-0.8639c0.04731,-0.10507 0.10645,-0.21014 0.18925,-0.29186c1.56133,-1.55268 3.12266,-3.09369 4.68399,-4.64637c0.02366,-0.02335 0.04731,-0.0467 0.07097,-0.07005c0,0 0.02366,0.01167 0.03548,0.02335c-0.11828,0.16344 -0.23657,0.33855 -0.34302,0.50199l0,0l0,0.02335zm2.03446,-2.98862c-0.26022,0.44362 -0.55593,0.87557 -0.82798,1.30752c-0.4613,0.72381 -1.12369,1.2725 -1.72693,1.86789c-1.34842,1.34254 -2.69685,2.67341 -4.04527,4.01596c-0.04731,0.0467 -0.07097,0.09339 -0.09463,0.15177c-0.20108,0.66544 -0.6269,1.19078 -1.11186,1.66943c-0.13011,0.12842 -0.27205,0.25683 -0.40216,0.39693c-0.07097,0.08172 -0.13011,0.07005 -0.18925,0s-0.13011,-0.14009 -0.20108,-0.22181c-0.0828,0.08172 -0.15377,0.15177 -0.22474,0.22181c-0.11828,0.11674 -0.21291,0.15177 -0.36668,0.05837c-0.15377,-0.10507 -0.28388,-0.24516 -0.42582,-0.3619c-0.02366,-0.02335 -0.03548,-0.0467 -0.07097,-0.09339c-0.0828,0.07005 -0.15377,0.12842 -0.23657,0.19846c-0.10645,0.08172 -0.22474,0.16344 -0.34302,0.24516c-0.05914,0.03502 -0.14194,0.03502 -0.22474,0.03502c0,-0.07005 0,-0.16344 0.02366,-0.22181c0.10645,-0.16344 0.22474,-0.31521 0.33119,-0.46697c0.02366,-0.03502 0.05914,-0.07005 0.10645,-0.11674c-0.04731,-0.03502 -0.09463,-0.07005 -0.13011,-0.10507c-0.11828,-0.14009 -0.23657,-0.26851 -0.34302,-0.42027c-0.07097,-0.10507 -0.04731,-0.21014 0.04731,-0.30353c0.0828,-0.07005 0.1656,-0.12842 0.26022,-0.19846l0,-0.08172c-0.0828,-0.07005 -0.17742,-0.12842 -0.24839,-0.21014c-0.02366,-0.02335 -0.02366,-0.10507 0,-0.12842c0.48496,-0.47865 0.9226,-0.98064 1.53767,-1.29585c0.1656,-0.08172 0.34302,-0.14009 0.50862,-0.22181c0.0828,-0.0467 0.18925,-0.08172 0.24839,-0.15177c1.72693,-1.70445 3.46568,-3.42057 5.19261,-5.12502c0.27205,-0.25683 0.59141,-0.4553 0.89895,-0.67711c0.42582,-0.30353 0.85164,-0.61874 1.36025,-0.78218c0.20108,-0.07005 0.40216,-0.11674 0.61507,-0.11674s0.30753,0.12842 0.30753,0.33855c0.01183,0.28018 -0.09463,0.54869 -0.22474,0.78218l0,0l0,0.01167z"
    }, this.pathMap.SERVICE_HTTP_2 = {
      d: "m12.86,5.75s-0.08,0.03 -0.09,0.06c-0.06,0.12 -0.11,0.24 -0.18,0.38c0.23,-0.02 0.43,0 0.58,0.16c0.16,0.16 0.19,0.36 0.18,0.57c0.03,0 0.04,0 0.05,0c0.08,-0.03 0.14,-0.06 0.22,-0.1c0.16,-0.07 0.19,-0.14 0.18,-0.31c-0.05,-0.49 -0.45,-0.81 -0.94,-0.75l0,-0.01z"
    }, this.pathMap.SERVICE_MAIL_1 = {
      d: "m22.07399,10.40053l0,-3.48738c0,-0.74889 -0.60144,-1.36366 -1.35882,-1.36366l-4.70017,0l-1.62613,-1.30777c-0.47893,-0.32415 -1.10265,-0.32415 -1.57044,0.01118l-1.54816,1.28541l-4.38831,0c-0.74624,0 -1.35882,0.60359 -1.35882,1.36366l0,3.45385l-1.04696,0.87185l0,9.4897c0,0.74889 0.60144,1.36366 1.35882,1.36366l15.92712,0c0.74624,0 1.35882,-0.60359 1.35882,-1.36366l0,-9.47852l-1.04696,-0.83831l0.00001,-0.00001zm-0.90217,1.93371l-7.37326,3.05146l-7.37326,-3.05146l0,-5.42109c0,-0.25708 0.20048,-0.45828 0.45665,-0.45828l13.83321,0c0.25617,0 0.45665,0.2012 0.45665,0.45828c0,0 0,5.42109 0,5.42109l0.00001,0z"
    }, this.pathMap.SERVICE_MAIL_2 = {
      d: "m13.71,8c-0.78,0 -1.43,0.24 -1.95,0.71c-0.5,0.46 -0.76,1.01 -0.76,1.65s0.22,1.12 0.65,1.51c0.47,0.42 1.11,0.63 1.91,0.63c0.7,0 1.33,-0.19 1.9,-0.56l-0.2,-0.27c-0.49,0.33 -1.05,0.49 -1.68,0.49s-1.06,-0.16 -1.41,-0.48c-0.36,-0.33 -0.54,-0.78 -0.54,-1.35s0.19,-1.04 0.56,-1.42c0.4,-0.41 0.91,-0.61 1.52,-0.61c0.56,0 1.01,0.14 1.38,0.43c0.38,0.3 0.58,0.69 0.58,1.18c0,0.35 -0.11,0.66 -0.33,0.94c-0.23,0.3 -0.51,0.46 -0.84,0.46c-0.09,0 -0.14,-0.04 -0.14,-0.13c0,-0.12 0.11,-0.56 0.31,-1.32c0.13,-0.43 0.23,-0.76 0.31,-0.97l-0.57,0l-0.03,0.06c-0.1,-0.09 -0.27,-0.14 -0.49,-0.14c-0.41,0 -0.77,0.18 -1.1,0.54c-0.39,0.43 -0.58,0.91 -0.58,1.45s0.27,0.84 0.8,0.84c0.35,0 0.6,-0.09 0.76,-0.26c0.03,-0.15 0.05,-0.2 0.05,-0.15c0,0.29 0.19,0.44 0.57,0.44c0.51,0 0.93,-0.19 1.27,-0.56c0.28,-0.33 0.43,-0.71 0.43,-1.16c0,-0.55 -0.2,-1 -0.59,-1.35c-0.44,-0.39 -1.03,-0.59 -1.76,-0.59l-0.01,0l-0.02,-0.01zm0.18,2.49c-0.23,0.56 -0.5,0.83 -0.81,0.83c-0.14,0 -0.21,-0.13 -0.21,-0.39c0,-0.39 0.09,-0.78 0.28,-1.16c0.22,-0.45 0.48,-0.67 0.76,-0.67c0.18,0 0.27,0.12 0.27,0.36s-0.09,0.59 -0.28,1.04l0,0l-0.01,-0.01z"
    }, this.pathMap.SERVICE_MQ_1 = {
      d: "m20.50197,5.06155c-4.36488,-3.06447 -10.22662,1.28779 -12.69472,3.21948c-0.13712,0.10732 0,0.31002 0.13712,0.2504c2.57094,-1.25202 8.72976,-3.88722 11.50637,-1.71705c2.2967,1.7886 1.83965,5.69967 1.70253,7.08285c-0.01143,0.10732 0.12569,0.15501 0.1714,0.05962c0.73129,-1.37126 2.92516,-5.77121 -0.8227,-8.8953zm-1.8168,11.69743c-2.57094,1.25202 -8.72976,3.88722 -11.50637,1.71705c-2.2967,-1.7886 -1.83965,-5.69967 -1.70253,-7.08285c0.01143,-0.10732 -0.12569,-0.14309 -0.1714,-0.05962c-0.73129,1.37126 -2.92516,5.77121 0.8227,8.8953c4.36488,3.07639 10.22662,-1.28779 12.69472,-3.21948c0.13712,-0.10732 0,-0.31002 -0.14854,-0.2504l0.01143,0z"
    }, this.pathMap.SERVICE_MQ_2 = {
      d: "m7.56012,10.65829l0,4.83454c0,0.3223 -0.05385,0.51124 -0.16154,0.57792c-0.09693,0.04446 -0.28001,0.08891 -0.56002,0.12225l0,0.45567l1.96007,0l0,-0.46678c-0.28001,-0.02223 -0.46309,-0.06668 -0.57079,-0.13337c-0.09693,-0.06668 -0.14,-0.25562 -0.14,-0.56681l0,-4.89011l1.69083,6.04596l0.37694,0l1.69083,-6.03485l0,4.86789c0,0.3223 -0.05385,0.52235 -0.16154,0.58904c-0.07539,0.04446 -0.26924,0.08891 -0.57079,0.12225l0,0.45567l2.12161,0l0,-0.46678c-0.31232,-0.03334 -0.50617,-0.06668 -0.59233,-0.13337c-0.09693,-0.06668 -0.14,-0.26673 -0.14,-0.56681l0,-4.83454c0,-0.3223 0.05385,-0.51124 0.17231,-0.58904c0.09693,-0.06668 0.29078,-0.11114 0.57079,-0.13337l0,-0.46678l-1.60467,0l-1.58313,5.6792l-1.5939,-5.6792l-1.65852,0l0,0.45567c0.33386,0.03334 0.52771,0.0778 0.6031,0.13337c0.09693,0.06668 0.14,0.26673 0.14,0.58904l0,0.02223l0.01077,0.01111zm10.98499,4.92346c-0.25847,0 -0.4954,-0.25562 -0.67848,-0.75574c0.71079,-0.73352 1.06619,-1.81157 1.06619,-3.22303c0,-1.15585 -0.2477,-2.10053 -0.75387,-2.84516c-0.44155,-0.65572 -0.9908,-0.97802 -1.64775,-0.97802s-1.2062,0.3223 -1.65852,0.97802c-0.4954,0.74463 -0.7431,1.68931 -0.7431,2.84516s0.2477,2.14498 0.7431,2.8785c0.44155,0.64461 0.9908,0.96691 1.64775,0.96691c0.32309,0 0.6031,-0.08891 0.8508,-0.25562c0.25847,0.68906 0.6031,1.03359 1.01234,1.03359c0.32309,0 0.6031,-0.23339 0.86157,-0.71129l-0.20462,-0.37787c-0.19385,0.27785 -0.3554,0.42233 -0.4954,0.42233l0,0l0,0.02223zm-1.54005,-0.74463c-0.14,0.06668 -0.28001,0.10003 -0.42001,0.10003c-0.40924,0 -0.61387,-0.25562 -0.61387,-0.74463c0,-0.20005 0.04308,-0.36676 0.14,-0.50013c0.08616,-0.12225 0.19385,-0.18894 0.30155,-0.18894c0.28001,0 0.54925,0.42233 0.80772,1.26698c0,-0.02223 -0.07539,0 -0.20462,0.06668l0,0l-0.01077,0zm0.66772,-0.60015c-0.15077,-0.4001 -0.28001,-0.70018 -0.38771,-0.88911c-0.22616,-0.36676 -0.4954,-0.54458 -0.79695,-0.54458c-0.28001,0 -0.50617,0.13337 -0.68925,0.4001c-0.16154,0.23339 -0.2477,0.51124 -0.2477,0.85577c0,0.21116 0.04308,0.4001 0.09693,0.56681c-0.52771,-0.57792 -0.79695,-1.57817 -0.79695,-3.00075c0,-0.9558 0.15077,-1.73377 0.44155,-2.3228c0.31232,-0.64461 0.72156,-0.96691 1.24927,-0.96691c0.40924,0 0.76464,0.21116 1.05542,0.64461c0.42001,0.60015 0.62464,1.48926 0.62464,2.65622s-0.18308,2.06718 -0.54925,2.61177l0,0l0,-0.01111z"
    }, this.pathMap.SERVICE_SC_1 = {
      d: "m14.79685,19.26627l-5.42773,0c-2.11549,0 -3.71117,-1.00376 -4.73869,-2.93505c-0.24177,-0.45741 -0.36265,-0.97835 -0.49563,-1.47388c-0.09671,-0.35576 -0.14506,-0.73694 -0.13297,-1.0927c0.03627,-1.70258 0.65278,-3.12564 1.89789,-4.24375c0.70113,-0.62259 1.49897,-0.99106 2.38143,-1.19435c0.16924,-0.03812 0.3143,-0.20329 0.43519,-0.33035c0.58025,-0.648 1.12423,-1.35953 1.74074,-1.96941c0.55607,-0.54635 1.2572,-0.88941 1.97042,-1.19435c1.19676,-0.52094 2.42979,-0.55906 3.66281,-0.39388c1.31765,0.17788 2.52649,0.74965 3.49357,1.728c1.29347,1.15623 1.97042,2.46494 2.29681,3.29082c0.08462,0.15247 0.21759,0.31765 0.36265,0.39388c1.2572,0.62259 2.09131,1.62635 2.55067,3.01129c0.29012,0.88941 0.33848,1.79153 0.1088,2.66823c-0.35057,1.39764 -1.12423,2.50305 -2.38143,3.18917c-0.74949,0.40659 -1.53524,0.58447 -2.38143,0.57176c-1.7891,-0.02541 -3.55402,0 -5.34311,0l0,0l0,-0.02541zm-0.02418,-0.92753l5.52444,0c0.50772,0 0.99126,-0.08894 1.46271,-0.29223c1.80119,-0.76235 2.80453,-2.87152 2.24846,-4.82822c-0.35057,-1.23247 -1.10005,-2.13458 -2.24846,-2.63011c-0.27804,-0.11435 -0.51981,-0.30494 -0.61651,-0.60988c-0.27804,-0.97835 -0.83411,-1.76611 -1.48688,-2.50305c-0.95499,-1.10541 -2.11549,-1.82964 -3.49357,-2.10917c-1.55942,-0.31765 -3.0463,-0.05082 -4.42439,0.81317c-0.99126,0.62259 -1.74074,1.49929 -2.38143,2.47764c-0.25386,0.38118 -0.56816,0.55906 -0.99126,0.60988c-0.26595,0.03812 -0.54398,0.10165 -0.78575,0.216c-1.52315,0.72423 -2.42979,1.98211 -2.68365,3.6974c-0.15715,1.06729 0.08462,2.10917 0.65278,3.01129c0.89455,1.42306 2.15175,2.1727 3.79579,2.14729c1.80119,-0.01271 3.61446,0 5.42773,0l0.01209,0l-0.01209,0z"
    }, this.pathMap.SERVICE_SC_2 = {
      d: "m17.77926,6.98091c0.13362,0.41985 0.2806,0.78179 0.34741,1.14374c0.25388,1.14374 0.46767,2.30195 0.36078,3.48912c-0.13362,1.40433 -0.60129,2.62046 -1.87069,3.21404c-0.44095,0.20269 -0.92198,0.36194 -1.38966,0.3909c-1.02888,0.05791 -2.05776,0.01448 -3.11337,-0.04343c0.24052,-0.10134 0.48104,-0.21716 0.72155,-0.28955c2.00431,-0.59358 3.36725,-1.99792 4.2625,-3.99584c0.1069,-0.24612 0.33405,-0.55015 0.12026,-0.92657c-0.09353,0.1303 -0.17371,0.23164 -0.24052,0.34746c-0.68147,1.28851 -1.6569,2.27299 -2.85949,2.95344c-0.60129,0.33299 -1.28276,0.5212 -1.9375,0.76732c-0.36078,0.1303 -0.74828,0.17373 -1.09569,0.30403c-0.92198,0.33299 -1.37629,-0.17373 -1.53664,-1.04239c-0.2806,-1.54911 0.36078,-2.73628 1.61681,-3.35882c0.52112,-0.2606 1.1625,-0.28955 1.75043,-0.3909c0.65474,-0.11582 1.32285,-0.11582 1.95086,-0.30403c1.09569,-0.31851 1.99095,-0.99896 2.68578,-1.96896c0.05345,-0.07239 0.12026,-0.14478 0.21379,-0.27508l0.01336,-0.01448zm-7.88363,8.80242c-0.20043,-0.01448 -0.3875,-0.1303 -0.33405,-0.34746c0.02672,-0.14478 0.21379,-0.31851 0.34741,-0.34746c0.21379,-0.05791 0.29397,0.14478 0.29397,0.37642s-0.09353,0.34746 -0.30733,0.33299l0,0l0,-0.01448z"
    }, this.pathMap.SERVICE_REST_1 = {
      d: "m23.73344,12.53547c-0.0373,-0.43299 -0.41027,-0.75136 -0.82055,-0.71315l-0.90757,0.07641c-0.42271,0.0382 -0.88271,-0.26743 -1.04433,-0.66221l-0.63406,-1.26075c-0.22379,-0.35658 -0.19892,-0.91691 0.0746,-1.24802l0.59676,-0.71315c0.27352,-0.33111 0.23622,-0.82777 -0.09946,-1.0952l-1.16866,-1.00605c-0.32325,-0.28017 -0.79568,-0.24196 -1.0692,0.08914c0,0 0,0 0,0l-0.59676,0.71315c-0.27352,0.33111 -0.80811,0.45846 -1.19352,0.2929l-1.31785,-0.42025c-0.41027,-0.08914 -0.77082,-0.52213 -0.80811,-0.94238l-0.0746,-0.92965c-0.0373,-0.43299 -0.41027,-0.75136 -0.82055,-0.71315l-1.51677,0.12735c-0.42271,0.0382 -0.73352,0.40752 -0.69622,0.8405l0.0746,0.92965c0.0373,0.43299 -0.26108,0.90418 -0.64649,1.06973l-1.23082,0.64948c-0.34811,0.24196 -0.89514,0.20376 -1.21839,-0.07641l-0.69622,-0.59854c-0.32325,-0.28017 -0.79568,-0.24196 -1.0692,0.08914c0,0 0,0 0,0l-0.98217,1.19708c-0.27352,0.33111 -0.23622,0.81503 0.08703,1.0952l0.69622,0.61127c0.32325,0.28017 0.44757,0.82777 0.28595,1.22255l-0.41027,1.3499c-0.08703,0.42025 -0.50973,0.78956 -0.92001,0.82777l-0.90757,0.07641c-0.42271,0.0382 -0.73352,0.40752 -0.69622,0.8405l0.12433,1.55365c0.0373,0.43299 0.39784,0.75136 0.82055,0.71315l0.90757,-0.07641c0.42271,-0.0382 0.88271,0.26743 1.04433,0.66221l0.63406,1.26075c0.22379,0.35658 0.19892,0.91691 -0.0746,1.24802l-0.59676,0.71315c-0.27352,0.33111 -0.23622,0.81503 0.08703,1.0952l1.16866,1.00605c0.32325,0.28017 0.79568,0.24196 1.0692,-0.10188l0.59676,-0.71315c0.27352,-0.33111 0.80811,-0.45846 1.19352,-0.2929l1.31785,0.43299c0.41027,0.10188 0.77082,0.52213 0.80811,0.94238l0.0746,0.92965c0.0373,0.43299 0.39784,0.75136 0.82055,0.71315l1.51677,-0.12735c0.42271,-0.0382 0.73352,-0.42025 0.69622,-0.8405l-0.0746,-0.92965c-0.0373,-0.43299 0.26108,-0.90418 0.64649,-1.06973l1.23082,-0.64948c0.34811,-0.24196 0.89514,-0.20376 1.21839,0.07641l0.69622,0.61127c0.32325,0.28017 0.80811,0.24196 1.0692,-0.10188l0.98217,-1.19708c0.27352,-0.33111 0.23622,-0.82777 -0.09946,-1.0952l-0.69622,-0.61127c-0.32325,-0.28017 -0.44757,-0.82777 -0.28595,-1.22255l0.42271,-1.3499c0.09946,-0.42025 0.50973,-0.78956 0.92001,-0.82777l0.90757,-0.07641c0.42271,-0.0382 0.73352,-0.42025 0.69622,-0.8405l-0.12433,-1.56639l0,0l0.01243,0.01273zm-9.39898,6.6476c-2.72272,0.22923 -5.10977,-1.83382 -5.33355,-4.62276c-0.22379,-2.78894 1.79028,-5.23403 4.513,-5.46326s5.10977,1.83382 5.33355,4.62276c0.22379,2.78894 -1.79028,5.23403 -4.513,5.46326z"
    }, this.pathMap.SERVICE_REST_2 = {
      d: "m10.47533,13.3295c0.15872,0 0.24691,-0.07245 0.24691,-0.21736l0,-0.6883l0.75835,0.85132s0.10582,0.05434 0.194,0.05434c0.14109,0 0.22927,-0.07245 0.24691,-0.21736c0,-0.05434 -0.01764,-0.10868 -0.07054,-0.12679l-0.56435,-0.57962c0.38799,-0.07245 0.59963,-0.2717 0.61726,-0.59773c0,-0.47094 -0.28218,-0.70641 -0.84653,-0.70641l-0.59963,0c-0.15872,0 -0.24691,0.07245 -0.24691,0.25358l0,1.75697c0,0.14491 0.08818,0.21736 0.24691,0.21736l0,0l0.01764,0zm0.24691,-1.7932l0.33509,0c0.194,0 0.29981,0.10868 0.31745,0.28981c0,0.16302 -0.10582,0.25358 -0.31745,0.2717l-0.33509,0l0,-0.56151zm2.83941,1.57584c0,-0.12679 -0.08818,-0.19924 -0.22927,-0.19924l-0.61726,0l0,-0.47094l0.54672,0c0.15872,0 0.22927,-0.07245 0.24691,-0.21736c-0.01764,-0.12679 -0.10582,-0.21736 -0.24691,-0.21736l-0.54672,0l0,-0.45283l0.59963,0c0.14109,0 0.22927,-0.07245 0.22927,-0.21736s-0.08818,-0.19924 -0.22927,-0.19924l-0.84653,0c-0.15872,0 -0.24691,0.09057 -0.24691,0.2717l0,1.73886c0,0.14491 0.08818,0.21736 0.24691,0.23547l0.86417,0c0.14109,0 0.22927,-0.07245 0.22927,-0.21736l0,-0.03623l0,-0.01811zm0.98762,-0.19924s-0.194,-0.01811 -0.33509,-0.07245c-0.07054,-0.01811 -0.15872,-0.03623 -0.22927,-0.03623c-0.14109,0 -0.21163,0.07245 -0.21163,0.21736c0,0.21736 0.28218,0.30792 0.81126,0.32604c0.54672,-0.01811 0.8289,-0.25358 0.86417,-0.70641c0,-0.32604 -0.24691,-0.56151 -0.75835,-0.70641c-0.24691,-0.07245 -0.37036,-0.14491 -0.37036,-0.23547c0,-0.12679 0.10582,-0.19924 0.28218,-0.19924c0.07054,0 0.15872,0 0.26454,0.03623c0.08818,0.01811 0.14109,0.03623 0.194,0.03623c0.14109,0 0.21163,-0.09057 0.22927,-0.23547c-0.01764,-0.18113 -0.24691,-0.28981 -0.67017,-0.30792c-0.51145,0.03623 -0.79362,0.2717 -0.8289,0.70641c0,0.28981 0.22927,0.47094 0.68781,0.59773c0.28218,0.07245 0.42327,0.16302 0.42327,0.2717c0,0.16302 -0.12345,0.25358 -0.33509,0.2717l0,0l-0.01764,0.03623zm2.04578,-1.39471l0.37036,0c0.14109,0 0.21163,-0.07245 0.22927,-0.21736c0,-0.12679 -0.08818,-0.19924 -0.22927,-0.19924l-1.25216,0c-0.12345,0 -0.194,0.07245 -0.194,0.19924c0,0.14491 0.07054,0.21736 0.194,0.21736l0.37036,0l0,1.57584c0,0.14491 0.08818,0.21736 0.24691,0.21736s0.24691,-0.07245 0.26454,-0.21736l0,-1.57584zm-4.62065,2.57207c-0.12345,-0.28981 -0.33509,-0.43472 -0.6349,-0.43472c-0.28218,0 -0.47617,0.16302 -0.59963,0.43472l-1.16398,2.8981l0,0.05434s-0.01764,0.10868 -0.01764,0.14491c0,0.23547 0.14109,0.32604 0.38799,0.32604c0.21163,0 0.35272,-0.07245 0.42327,-0.25358l0.17636,-0.50717l1.58725,0l0.15872,0.50717c0.07054,0.16302 0.21163,0.25358 0.42327,0.25358c0.24691,0 0.38799,-0.10868 0.38799,-0.32604c0,-0.05434 0,-0.12679 -0.03527,-0.19924l-1.11107,-2.8981l0.01764,0zm-1.16398,1.93811l0.54672,-1.53962l0.52908,1.53962s-1.0758,0 -1.0758,0zm4.03866,-2.30037l-1.02289,0c-0.26454,0 -0.40563,0.14491 -0.42327,0.4166l0,3.00678c0,0.25358 0.15872,0.38038 0.42327,0.38038s0.40563,-0.12679 0.42327,-0.38038l0,-0.86943l0.6349,0c0.89944,-0.05434 1.35798,-0.47094 1.42852,-1.26792c-0.05291,-0.79698 -0.54672,-1.21358 -1.44616,-1.26792l0,0l-0.01764,-0.01811zm-0.01764,1.82943l-0.58199,0l0,-1.12301l0.58199,0c0.37036,0 0.56435,0.19924 0.58199,0.56151c-0.03527,0.34415 -0.22927,0.52528 -0.58199,0.56151l0,0zm2.1516,-1.88377c-0.26454,0 -0.40563,0.14491 -0.42327,0.4166l0,3.04301c0,0.25358 0.15872,0.38038 0.42327,0.38038s0.40563,-0.12679 0.42327,-0.38038l0,-3.04301c0,-0.25358 -0.15872,-0.39849 -0.42327,-0.4166z"
    };
  }
  getStaticPath(t) {
    var n;
    return ((n = this.pathMap[t]) == null ? void 0 : n.d) || "";
  }
}
const Dd = {
  bpmnRenderer: ["type", Pd],
  pathMap: ["type", xd]
}, Md = {
  "Copy Service Task": "抄送任务",
  "Camel Service Task": "骆驼任务",
  "Sc Service Task": "微服务任务",
  "Dubbo Service Task": "Dubbo 任务",
  "Rest Service Task": "Rest 任务",
  "Dmn Service Task": "决策任务",
  "Http Service Task": "Http 任务",
  "Mq Service Task": "消息任务",
  "Email Service Task": "邮件任务",
  "Shell Service Task": "Shell 任务",
  "Call activity": "调用活动",
  "Sub-process": "子流程",
  "Event sub-process": "事件子流程",
  "Sub-process (collapsed)": "子流程(折叠)",
  "Sub-process (expanded)": "子流程(展开)",
  "Ad-hoc": "临时子流程",
  "Create expanded sub-process": "创建子流程(折叠)",
  "Horizontal expanded pool/participant": "水平泳道(展开)",
  "Vertical expanded pool/participant": "垂直泳道(展开)",
  "Variable start event": "参数开始事件",
  "Variable start event (non-interrupting)": "参数开始事件(非中断)",
  "Variable boundary event": "参数边界事件",
  "Variable boundary event (non-interrupting)": "参数边界事件(非中断)",
  "Variable intermediate catch event": "中间参数捕获事件",
  "Terminate end event": "终止结束事件",
  Transaction: "事务子流程",
  "Boundary event": "边界事件",
  "Expanded pool/participant": "泳道（展开）",
  "Create element": "创建元素",
  "Append element": "追加元素",
  "Create user task": "创建用户任务",
  "Append user task": "追加用户任务",
  "Append compensation service task": "追加补偿服务任务",
  "Set as the default flow": "设为默认流",
  "Add text annotation": "添加文本注释",
  "Connect to other element": "连接到其他元素",
  Gateways: "网关",
  Tasks: "任务",
  "Sub-processes": "子流程",
  Events: "事件",
  Data: "数据对象",
  Participants: "协助",
  Delete: "删除元素",
  //   token simulation
  "Simulation Log": "模拟日志",
  "No Entries": "暂无数据",
  Started: "已启动",
  Finished: "已结束",
  "Process started": "流程启动",
  "SubProcess started": "子流程启动",
  "Process finished": "流程结束",
  "SubProcess finished": "子流程结束",
  "Process canceled": "流程取消",
  "SubProcess canceled": "子流程取消",
  "Intermediate event": "中间事件",
  "Reset Simulation": "重置状态",
  "Play/Pause Simulation": "继续/暂停",
  "Play Simulation": "开始模拟",
  "Pause Simulation": "暂停模拟",
  "Toggle Simulation Log": "模拟日志",
  "Show Simulation Log": "显示日志",
  "Hide Simulation Log": "隐藏日志"
}, da = "__bpmn-designer__";
function $d(e) {
  const t = window.localStorage.getItem(`${da}${e}`);
  return t ? JSON.parse(t) : null;
}
function Fi(e, t) {
  window.localStorage.setItem(`${da}${e}`, JSON.stringify(t || ""));
}
function Ld(e, t) {
  return t = t || {}, $d("local-lang") !== "en_US" && (e = Md[e] || Zl[e] || e), e.replace(/{([^}]+)}/g, function(n, r) {
    return t[r] || "{" + r + "}";
  });
}
const Id = [
  {
    translate: ["value", Ld]
  }
], Nd = "Flowable", Rd = "http://flowable.org/bpmn", Bd = "flowable", Fd = { tagAlias: "lowerCase" }, zd = [], jd = JSON.parse('[{"name":"Definitions","isAbstract":true,"extends":["bpmn:Definitions"],"properties":[{"name":"diagramRelationId","isAttr":true,"type":"String"}]},{"name":"InOutBinding","superClass":["Element"],"isAbstract":true,"properties":[{"name":"source","isAttr":true,"type":"String"},{"name":"sourceExpression","isAttr":true,"type":"String"},{"name":"target","isAttr":true,"type":"String"},{"name":"businessKey","isAttr":true,"type":"String"},{"name":"local","isAttr":true,"type":"Boolean","default":false},{"name":"variables","isAttr":true,"type":"String"}]},{"name":"In","superClass":["InOutBinding"],"meta":{"allowedIn":["bpmn:CallActivity","bpmn:SignalEventDefinition"]}},{"name":"Out","superClass":["InOutBinding"],"meta":{"allowedIn":["bpmn:CallActivity"]}},{"name":"AsyncCapable","isAbstract":true,"extends":["bpmn:Activity","bpmn:Gateway","bpmn:Event"],"properties":[{"name":"async","isAttr":true,"type":"Boolean","default":false},{"name":"asyncBefore","isAttr":true,"type":"Boolean","default":false},{"name":"asyncAfter","isAttr":true,"type":"Boolean","default":false},{"name":"exclusive","isAttr":true,"type":"Boolean","default":true}]},{"name":"Scope","extends":["bpmn:Signal"],"properties":[{"name":"scope","isAttr":true,"type":"String"}]},{"name":"ErrorEventDefinitionExtension","isAbstract":true,"extends":["bpmn:ErrorEventDefinition"],"properties":[{"name":"errorCodeVariable","isAttr":true,"type":"String"},{"name":"errorMessageVariable","isAttr":true,"type":"String"},{"name":"errorVariableLocalScope","isAttr":true,"type":"Boolean"},{"name":"errorVariableTransient","isAttr":true,"type":"Boolean"}]},{"name":"ErrorEventDefinition","superClass":["bpmn:ErrorEventDefinition","Element"],"properties":[{"name":"expression","isAttr":true,"type":"String"}],"meta":{"allowedIn":["bpmn:ServiceTask"]}},{"name":"Error","isAbstract":true,"extends":["bpmn:Error"],"properties":[{"name":"flowable:errorMessage","isAttr":true,"type":"String"}]},{"name":"FormSupported","isAbstract":true,"extends":["bpmn:StartEvent","bpmn:UserTask"],"properties":[{"name":"formKey","isAttr":true,"type":"String"}]},{"name":"Initiator","isAbstract":true,"extends":["bpmn:StartEvent"],"properties":[{"name":"initiator","isAttr":true,"type":"String"}]},{"name":"ScriptTask","isAbstract":true,"extends":["bpmn:ScriptTask"],"properties":[{"name":"resultVariable","isAttr":true,"type":"String"},{"name":"autoStoreVariables","isAttr":true,"type":"Boolean"},{"name":"resource","isAttr":true,"type":"String"}]},{"name":"Process","isAbstract":true,"extends":["bpmn:Process"],"properties":[{"name":"candidateStarterGroups","isAttr":true,"type":"String"},{"name":"candidateStarterUsers","isAttr":true,"type":"String"}]},{"name":"FormalExpression","isAbstract":true,"extends":["bpmn:FormalExpression"],"properties":[{"name":"resource","isAttr":true,"type":"String"}]},{"name":"Assignable","extends":["bpmn:UserTask"],"properties":[{"name":"assignee","isAttr":true,"type":"String"},{"name":"candidateUsers","isAttr":true,"type":"String"},{"name":"candidateGroups","isAttr":true,"type":"String"},{"name":"dueDate","isAttr":true,"type":"String"},{"name":"priority","isAttr":true,"type":"String"}]},{"name":"CallActivity","extends":["bpmn:CallActivity"],"properties":[{"name":"inheritVariables","isAttr":true,"type":"Boolean"},{"name":"calledElementType","isAttr":true,"type":"String"},{"name":"processInstanceName","isAttr":true,"type":"String"}]},{"name":"ServiceTaskLike","extends":["bpmn:ServiceTask","bpmn:BusinessRuleTask","bpmn:SendTask","bpmn:MessageEventDefinition"],"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"resultVariable","isAttr":true,"type":"String"}]},{"name":"DmnCapable","extends":["bpmn:BusinessRuleTask"],"properties":[{"name":"decisionRef","isAttr":true,"type":"String"}]},{"name":"ExternalCapable","extends":["flowable:ServiceTaskLike"],"properties":[{"name":"type","isAttr":true,"type":"String"},{"name":"topic","isAttr":true,"type":"String"}]},{"name":"TaskPriorized","extends":["bpmn:Process","flowable:ExternalCapable"],"properties":[{"name":"taskPriority","isAttr":true,"type":"String"}]},{"name":"Properties","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"values","type":"Property","isMany":true}]},{"name":"Property","superClass":["Element"],"properties":[{"name":"id","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true},{"name":"value","type":"String","isAttr":true}]},{"name":"Connector","superClass":["Element"],"meta":{"allowedIn":["flowable:ServiceTaskLike"]},"properties":[{"name":"inputOutput","type":"InputOutput"},{"name":"connectorId","type":"String"}]},{"name":"InputOutput","superClass":["Element"],"meta":{"allowedIn":["bpmn:FlowNode","flowable:Connector"]},"properties":[{"name":"inputOutput","type":"InputOutput"},{"name":"connectorId","type":"String"},{"name":"inputParameters","isMany":true,"type":"InputParameter"},{"name":"outputParameters","isMany":true,"type":"OutputParameter"}]},{"name":"InputOutputParameter","properties":[{"name":"name","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"},{"name":"definition","type":"InputOutputParameterDefinition"}]},{"name":"InputOutputParameterDefinition","isAbstract":true},{"name":"List","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"items","isMany":true,"type":"InputOutputParameterDefinition"}]},{"name":"Map","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"entries","isMany":true,"type":"Entry"}]},{"name":"Entry","properties":[{"name":"key","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"},{"name":"definition","type":"InputOutputParameterDefinition"}]},{"name":"Value","superClass":["Element"],"properties":[{"name":"id","isAttr":true,"type":"String"},{"name":"name","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"}]},{"name":"Script","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"scriptFormat","isAttr":true,"type":"String"},{"name":"resource","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"}]},{"name":"Field","superClass":["Element"],"meta":{"allowedIn":["flowable:ServiceTaskLike","flowable:ExecutionListener","flowable:TaskListener"]},"properties":[{"name":"name","isAttr":true,"type":"String"},{"name":"expression","type":"String"},{"name":"stringValue","isAttr":true,"type":"String"},{"name":"string","type":"String"}]},{"name":"InputParameter","superClass":["InputOutputParameter"]},{"name":"OutputParameter","superClass":["InputOutputParameter"]},{"name":"Collectable","isAbstract":true,"extends":["bpmn:MultiInstanceLoopCharacteristics"],"superClass":["flowable:AsyncCapable"],"properties":[{"name":"collection","isAttr":true,"type":"String"},{"name":"elementVariable","isAttr":true,"type":"String"}]},{"name":"FailedJobRetryTimeCycle","superClass":["Element"],"meta":{"allowedIn":["flowable:AsyncCapable","bpmn:MultiInstanceLoopCharacteristics"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"ExecutionListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:Task","bpmn:ServiceTask","bpmn:UserTask","bpmn:BusinessRuleTask","bpmn:ScriptTask","bpmn:ReceiveTask","bpmn:ManualTask","bpmn:ExclusiveGateway","bpmn:SequenceFlow","bpmn:ParallelGateway","bpmn:InclusiveGateway","bpmn:EventBasedGateway","bpmn:StartEvent","bpmn:IntermediateCatchEvent","bpmn:IntermediateThrowEvent","bpmn:EndEvent","bpmn:BoundaryEvent","bpmn:CallActivity","bpmn:SubProcess","bpmn:Process"]},"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"onTransaction","isAttr":true,"type":"String"},{"name":"event","isAttr":true,"type":"String"},{"name":"script","type":"Script"},{"name":"fields","type":"Field","isMany":true}]},{"name":"TaskListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"event","isAttr":true,"type":"String"},{"name":"script","type":"Script"},{"name":"fields","type":"Field","isMany":true},{"name":"id","type":"String","isAttr":true},{"name":"eventDefinitions","type":"bpmn:TimerEventDefinition","isMany":true}]},{"name":"EventListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:Process"]},"properties":[{"name":"events","isAttr":true,"type":"String"},{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"throwEvent","isAttr":true,"type":"String"},{"name":"entityType","isAttr":true,"type":"String"},{"name":"signalName","isAttr":true,"type":"String"},{"name":"errorCode","isAttr":true,"type":"String"},{"name":"messageName","isAttr":true,"type":"String"}]},{"name":"FormProperty","superClass":["Element"],"meta":{"allowedIn":["bpmn:StartEvent","bpmn:UserTask"]},"properties":[{"name":"id","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true},{"name":"type","type":"String","isAttr":true},{"name":"required","type":"String","isAttr":true},{"name":"readable","type":"String","isAttr":true},{"name":"writable","type":"String","isAttr":true},{"name":"variable","type":"String","isAttr":true},{"name":"expression","type":"String","isAttr":true},{"name":"datePattern","type":"String","isAttr":true},{"name":"default","type":"String","isAttr":true},{"name":"values","type":"Value","isMany":true}]},{"name":"FormData","superClass":["Element"],"meta":{"allowedIn":["bpmn:StartEvent","bpmn:UserTask"]},"properties":[{"name":"fields","type":"FormField","isMany":true},{"name":"businessKey","type":"String","isAttr":true}]},{"name":"FormField","superClass":["Element"],"properties":[{"name":"id","type":"String","isAttr":true},{"name":"label","type":"String","isAttr":true},{"name":"type","type":"String","isAttr":true},{"name":"datePattern","type":"String","isAttr":true},{"name":"defaultValue","type":"String","isAttr":true},{"name":"properties","type":"Properties"},{"name":"validation","type":"Validation"},{"name":"values","type":"Value","isMany":true}]},{"name":"Validation","superClass":["Element"],"properties":[{"name":"constraints","type":"Constraint","isMany":true}]},{"name":"Constraint","superClass":["Element"],"properties":[{"name":"name","type":"String","isAttr":true},{"name":"config","type":"String","isAttr":true}]},{"name":"ConditionalEventDefinitionExtension","isAbstract":true,"extends":["bpmn:ConditionalEventDefinition"],"properties":[{"name":"variableName","isAttr":true,"type":"String"},{"name":"variableEvents","isAttr":true,"type":"String"}]},{"name":"AssigneeType","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"MultiCompletionCondition","superClass":["Element"],"meta":{"allowedIn":["bpmn:Activity"]},"properties":[{"name":"type","type":"String","isAttr":true},{"name":"conditionType","type":"String","isAttr":true},{"name":"num","type":"Number","isAttr":true},{"name":"body","type":"String","isBody":true}]},{"name":"IdmAssignee","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"IdmCandidateUsers","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask","bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"IdmCandidateGroups","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask","bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NextSequenceFlow","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NextUser","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ModelBpmnExtension","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ProcessNameExp","superClass":["Element"],"meta":{"allowedIn":["bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"Localization","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"locale","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true}]},{"name":"NodeFormExp","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NodeFormType","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"StaticAssigneeVariables","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"MultiInstanceVariables","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ServiceTask","extends":["bpmn:ServiceTask"],"properties":[{"name":"parallelInSameTransaction","type":"Boolean","isAttr":true}]},{"name":"TimeDate","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"BoundaryEvent","extends":["bpmn:BoundaryEvent"],"properties":[{"name":"timerEventDefinition","isBody":true,"type":"flowable:TimerEventDefinition"},{"name":"cancelActivity","isAttr":true,"type":"Boolean","redefines":"bpmn:BoundaryEvent#cancelActivity"}]},{"name":"TimerEventDefinition","superClass":["TimerEventDefinition"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"TimeDuration","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"TimeCycle","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","flowable:endDate","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"},{"name":"endDate","isAttr":true,"type":"String"}]},{"name":"SkipUserTask","extends":["bpmn:UserTask"],"properties":[{"name":"skipExpression","type":"String","isAttr":true}]},{"name":"TransferToUsers","superClass":["Element"],"meta":{"allowedIn":["bpmn:ServiceTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"AuthPoint","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"FormFieldValidation","extends":["bpmn:UserTask","bpmn:StartEvent"],"properties":[{"name":"formFieldValidation","type":"String","isAttr":true}]},{"name":"DataObject","extends":["bpmn:DataObject"],"meta":{"allowedIn":["bpmn:Process","bpmn:SubProcess"]},"properties":[{"name":"itemSubjectRef","type":"String","isAttr":true,"redefines":"bpmn:DataObject#itemSubjectRef"}]},{"name":"InterruptingStartEvent","extends":["bpmn:StartEvent"],"properties":[{"name":"isInterrupting","isAttr":true,"type":"Boolean","redefines":"bpmn:StartEvent#isInterrupting"}]},{"name":"VariableListenerEventDefinition","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"variableName","type":"String","isAttr":true},{"name":"variableChangeType","type":"String","isAttr":true}]},{"name":"TerminateEventDefinition","extends":["bpmn:TerminateEventDefinition"],"properties":[{"name":"terminateAll","isAttr":true,"type":"Boolean"}]},{"name":"AdHoc","extends":["bpmn:AdHocSubProcess"],"properties":[{"name":"cancelRemainingInstances","isAttr":true,"type":"Boolean","redefines":"bpmn:AdHocSubProcess#cancelRemainingInstances"}]}]'), Vd = [], fa = {
  name: Nd,
  uri: Rd,
  prefix: Bd,
  xml: Fd,
  associations: zd,
  types: jd,
  emumerations: Vd
}, pa = [Dd, Id], gh = /* @__PURE__ */ ve({
  name: "BpmnMocker",
  __name: "index",
  props: {
    xml: {
      type: String,
      default: void 0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "light"
    },
    local: {
      type: String,
      default: "zh_CN"
    }
  },
  emits: ["mocker-init", "mocker-destroy"],
  setup(e, { expose: t, emit: n }) {
    const r = e, i = n, { locale: o } = Si(), s = me(void 0), a = fn(), l = () => {
      a.value = new Ms({
        container: s.value,
        moddleExtensions: {
          flowable: fa
        },
        additionalModules: [bd, $s, ...pa],
        bpmnRenderer: {
          overrideColor: !0
        },
        gridLine: { gridLineOpacity: 0.1, gridLineStroke: 1 }
      }), i("mocker-init", a.value);
    }, u = () => {
      var h, b;
      (h = a.value) == null || h.clear(), (b = a.value) == null || b.destroy(), a.value = void 0, i("mocker-destroy", a.value);
    }, c = async (h) => {
      var b, w, T, M;
      try {
        a.value || l(), await ((b = a.value) == null ? void 0 : b.importXML(h)), (w = a.value) == null || w.get("canvas").zoom("fit-viewport", "center");
        const N = (T = a.value) == null ? void 0 : T.get("toggleMode");
        !N._active && N.toggleMode(!0);
        const d = (M = a.value) == null ? void 0 : M.get("eventBus");
        d == null || d.fire("tokenSimulation.resetSimulation");
      } catch (N) {
        console.error(N);
      }
    }, m = (h) => {
      var d;
      const b = (d = a.value) == null ? void 0 : d.get("elementRegistry");
      if (!b) return;
      const w = b.filter(($) => Q($, "bpmn:ExclusiveGateway")), T = a.value.get("simulator"), M = a.value.get("elementColors"), N = a.value.get("simulationStyles");
      for (const $ of w) {
        const P = $.outgoing.find((v) => h.indexOf(v.id) !== -1), p = "--token-simulation-grey-darken-30", f = "--token-simulation-grey-lighten-56";
        P && T.setConfig($, { activeOutgoing: P }), $.outgoing.forEach((v) => {
          const k = h.indexOf(v.id) !== -1 ? p : f, x = N.get(k);
          M.add(v, "exclusive-gateway-settings", { stroke: x }, 2001);
        });
      }
    }, S = (h) => {
      if (h)
        return document.body.setAttribute("arco-theme", h);
      const b = document.body.getAttribute("arco-theme") === "dark";
      document.body.setAttribute("arco-theme", b ? "light" : "dark");
    }, g = (h) => {
      var b;
      h ? o.value = h : o.value = o.value === "zh_CN" ? "en_US" : "zh_CN", Fi("local-lang", o.value), (b = a.value) == null || b.get("eventBus").fire("i18n.changed");
    };
    return ft(() => {
      l(), r.xml && c(r.xml);
    }), yn(() => u()), ze(() => r.local, g, { immediate: !0 }), ze(() => r.theme, S, { immediate: !0 }), t({ createNewProcess: c, setSequenceFlows: m, toggleLang: g, toggleTheme: S }), (h, b) => (U(), Ee(D(xi), {
      style: { width: "100%", height: "100%" },
      loading: e.loading
    }, {
      default: ue(() => [
        G("div", {
          ref_key: "canvasEl",
          ref: s,
          class: "bpmn-mocker"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
});
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Nn = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hd = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xt = (e, t) => ({ size: n, strokeWidth: r = 2, absoluteStrokeWidth: i, color: o, class: s, ...a }, { attrs: l, slots: u }) => ro(
  "svg",
  {
    ...Nn,
    width: n || Nn.width,
    height: n || Nn.height,
    stroke: o || Nn.stroke,
    "stroke-width": i ? Number(r) * 24 / Number(n) : r,
    ...l,
    class: ["lucide", `lucide-${Hd(e)}`],
    ...a
  },
  [...t.map((c) => ro(...c)), ...u.default ? [u.default()] : []]
);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ud = Xt("CircleCheckBigIcon", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qd = Xt("Clock4Icon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wd = Xt("DownloadIcon", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kd = Xt("FullscreenIcon", [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["rect", { width: "10", height: "8", x: "7", y: "8", rx: "1", key: "vys8me" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gd = Xt("ZoomInIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yd = Xt("ZoomOutIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]);
function Uo(e, t, n) {
  const r = encodeURIComponent(n);
  return {
    filename: `${t}.${e.toLowerCase()}`,
    href: `data:application/${e === "svg" ? "text/xml" : "bpmn20-xml"};charset=UTF-8,${r}`,
    data: n
  };
}
function Hr(e, t) {
  if (e && t) {
    const n = document.createElement("a");
    n.download = t, n.href = e, n.click(), URL.revokeObjectURL(n.href);
  }
}
function Xd(e) {
  const t = {
    svg: null,
    mimetype: "image/png",
    quality: 0.92,
    width: "auto",
    height: "auto",
    outputFormat: "base64"
  };
  for (const n in e)
    t[n] = e[n];
  return new Promise(function(n) {
    let r;
    if (typeof t.svg == "string") {
      const u = document.createElement("div");
      u.style.display = "none", u.innerHTML = t.svg, r = u.firstElementChild;
    } else
      r = t.svg;
    const i = document.createElement("canvas"), o = i.getContext("2d"), s = new XMLSerializer().serializeToString(r), a = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(s))), l = new Image();
    l.onload = function() {
      let u, c;
      t.width === "auto" && t.height !== "auto" ? u = l.width / l.height * t.height : t.width === "auto" ? u = l.naturalWidth : u = t.width, t.height === "auto" && t.width !== "auto" ? c = l.height / l.width * t.width : t.height === "auto" ? c = l.naturalHeight : c = t.height, i.width = u, i.height = c, o.drawImage(l, 0, 0, u, c), e.outputFormat == "blob" ? i.toBlob(
        function(m) {
          n(m);
        },
        t.mimetype,
        t.quality
      ) : n(i.toDataURL(t.mimetype, t.quality));
    }, l.src = a;
  });
}
const Vt = document.documentElement;
let Ur = Vt.querySelector("head");
const qo = document.createElement("style");
let Wo = !1, en = !1, qn = "requestFullscreen", Wn = "exitFullscreen", an = "fullscreenElement", ln = "fullscreenchange";
function ma(e) {
  return e instanceof HTMLElement ? e : Vt;
}
function Jt() {
  return Wo ? en : (Wo = !0, "webkitRequestFullScreen" in Vt ? (qn = "webkitRequestFullScreen", Wn = "webkitExitFullscreen", an = "webkitFullscreenElement", ln = "webkitfullscreenchange", en = !0) : "msRequestFullscreen" in Vt ? (qn = "msRequestFullscreen", Wn = "msExitFullscreen", an = "msFullscreenElement", ln = "MSFullscreenChange", en = !0) : "mozRequestFullScreen" in Vt ? (qn = "mozRequestFullScreen", Wn = "mozCancelFullScreen", an = "mozFullScreenElement", ln = "mozfullscreenchange", en = !0) : (console.error("当前浏览器不支持 Fullscreen API !"), en = !1));
}
function Jd(e, t) {
  if (Jt())
    return ma(e)[qn]();
}
function Zd() {
  if (Jt())
    return Vt.contains(qo) && (Ur == null || Ur.removeChild(qo)), document[Wn]();
}
function Qd(e) {
  return Jt() ? ma(e) === document[an] : !1;
}
function e1(e, t) {
  return Jt() ? Qd(e) ? (Zd(), !1) : (Jd(e), !0) : !1;
}
function t1(e) {
  if (!Jt())
    return;
  const t = () => {
    e(!!document[an]);
  };
  return window.addEventListener(ln, t), () => {
    window.removeEventListener(ln, t);
  };
}
const n1 = {
  id: "bpmn-viewer__wrap",
  class: "bpmn-viewer"
}, r1 = {
  key: 0,
  class: "bpmn-viewer__toolbar"
}, i1 = { style: { "text-align": "center", display: "inline-block", width: "40px" } }, o1 = { class: "button-list_column" }, s1 = /* @__PURE__ */ ve({
  name: "BpmnViewer",
  __name: "index",
  props: {
    xml: {
      type: String,
      default: void 0
    },
    theme: {
      type: String,
      default: "light"
    },
    local: {
      type: String,
      default: "zh_CN"
    },
    translatePrefix: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: !1
    },
    toolbar: {
      type: Boolean,
      default: !0
    },
    inPreset: {
      type: Boolean,
      default: !1
    },
    showDownload: {
      type: Boolean,
      default: !1
    },
    fileName: {
      type: String,
      default: ""
    }
  },
  emits: ["viewer-init", "viewer-destroy", "element-hover"],
  setup(e, { expose: t, emit: n }) {
    const r = e, i = n, { locale: o, t: s } = Si(), a = me(void 0), l = fn(), u = {
      opacity: 0.5,
      fill: "#C8E6C9",
      stroke: "#338136"
    }, c = {
      fill: "#FFE0B2",
      stroke: "#6B3C00"
    }, m = () => {
      l.value = new Ms({
        container: a.value,
        moddleExtensions: {
          flowable: fa
        },
        additionalModules: [Ql, $s, ...pa],
        gridLine: { gridLineOpacity: 0.1, gridLineStroke: 1 }
      }), l.value.on("element.hover", ({ element: C, gfx: A }) => {
        i("element-hover", C, A);
      }), l.value.on("canvas.viewbox.changed", ({ viewbox: C }) => {
        $.value = C.scale || 1;
      }), i("viewer-init", l.value);
    }, S = () => {
      var C, A;
      (C = l.value) == null || C.clear(), (A = l.value) == null || A.destroy(), l.value = void 0, i("viewer-destroy", l.value);
    }, g = () => l.value, h = (C) => C ? r.translatePrefix + C : "-", b = async (C) => {
      var A, B;
      try {
        l.value || m(), await ((A = l.value) == null ? void 0 : A.importXML(C)), (B = l.value) == null || B.get("canvas").zoom("fit-viewport", "center");
      } catch (z) {
        console.error(z);
      }
    }, w = (C) => {
      var ee, ne, ye;
      const A = C.reduce(
        (le, be) => (le[be] = !0) && le,
        {}
      ), B = (ee = l.value) == null ? void 0 : ee.get("elementRegistry"), z = (ne = l.value) == null ? void 0 : ne.get("canvas");
      if (!B) return;
      const Y = B.filter((le) => A[le.id]);
      (ye = l.value) == null || ye.get("modeling").setColor(Y, u);
      for (const le of Y)
        z == null || z.addMarker(le, "on-viewer"), z == null || z.addMarker(le, "on-passed");
    }, T = (C) => {
      var ee, ne, ye;
      const A = C.reduce(
        (le, be) => (le[be] = !0) && le,
        {}
      ), B = (ee = l.value) == null ? void 0 : ee.get("elementRegistry"), z = (ne = l.value) == null ? void 0 : ne.get("canvas");
      if (!B) return;
      const Y = B.filter((le) => A[le.id]);
      (ye = l.value) == null || ye.get("modeling").setColor(Y, c);
      for (const le of Y)
        z == null || z.addMarker(le, "on-viewer"), z == null || z.addMarker(le, "on-active");
    }, M = (C) => {
      var Y;
      const A = C.reduce(
        (ee, ne) => (ee[ne] = !0) && ee,
        {}
      ), B = (Y = l.value) == null ? void 0 : Y.get("elementRegistry");
      if (!B) return;
      const z = l.value.get("canvas");
      B.forEach((ee) => {
        if (A[ee.id]) {
          const ne = ee.type.split(":")[1];
          z.addMarker(ee, ne), z.addMarker(ee, "on-processing"), z.addMarker(ee, "on-viewer");
        }
      });
    }, N = (C) => {
      if (r.inPreset) return;
      if (C)
        return document.body.setAttribute("arco-theme", C);
      const A = document.body.getAttribute("arco-theme") === "dark";
      document.body.setAttribute("arco-theme", A ? "light" : "dark");
    }, d = (C) => {
      var A;
      r.inPreset || (C ? o.value = C : o.value = o.value === "zh_CN" ? "en_US" : "zh_CN", Fi("local-lang", o.value), (A = l.value) == null || A.get("eventBus").fire("i18n.changed"));
    }, $ = me(1), P = (C) => {
      const A = l.value.get("canvas");
      C === "fit-viewport" ? A.zoom("fit-viewport", "center") : A.zoom(C, { x: 0, y: 0 });
    }, p = (C) => {
      $.value = Math.floor($.value * 100 - 0.1 * 100) / 100, P($.value);
    }, f = (C) => {
      $.value = Math.floor($.value * 100 + 0.1 * 100) / 100, P($.value);
    }, v = me(Jt()), k = me(!1), x = () => {
      e1(document.querySelector("#bpmn-viewer__wrap"));
    };
    t1((C) => {
      k.value = C;
    });
    const O = (C) => {
      function A(z) {
        const Y = /var\(--([^)]+)\)/g;
        return z.replace(Y, (ee, ne) => B(ne) || ee);
      }
      function B(z) {
        if (z.includes("color-bg"))
          return "none";
        const Y = document.querySelector(".djs-container.djs-parent");
        return window.getComputedStyle(Y).getPropertyValue(`--${z}`);
      }
      return A(C);
    }, q = () => {
      var B, z, Y;
      const C = l.value.get("elementRegistry");
      let A = (B = C.find((ee) => ee.type === "bpmn:Process")) == null ? void 0 : B.businessObject;
      return A || (A = (Y = (z = C.find((ee) => ee.type === "bpmn:Participant")) == null ? void 0 : z.businessObject) == null ? void 0 : Y.processRef), (A == null ? void 0 : A.name) || (A == null ? void 0 : A.id) || "diagram";
    }, R = async (C, A) => {
      try {
        const B = A || r.fileName || q();
        if (C === "xml" || C === "bpmn") {
          const { error: z, xml: Y } = await l.value.saveXML({ format: !0 });
          z && console.error(`[Process Designer Warn ]: ${z.message || z}`);
          const { href: ee, filename: ne } = Uo(C.toUpperCase(), B, Y);
          Hr(ee, ne);
        } else if (C === "svg") {
          const { svg: z } = await l.value.saveSVG(), Y = O(z), { href: ee, filename: ne } = Uo("SVG", B, Y);
          Hr(ee, ne);
        } else
          ae(B);
      } catch (B) {
        console.error(`[Process Designer Warn ]: ${B.message || B}`);
      }
    }, ae = async (C) => {
      const { svg: A } = await l.value.saveSVG(), B = O(A), z = await Xd({ svg: B, outputFormat: "blob" });
      z instanceof Blob && Hr(URL.createObjectURL(z), C);
    };
    return ft(() => {
      m(), r.xml && b(r.xml);
    }), yn(() => S()), ze(() => r.theme, N, { immediate: !0 }), ze(() => r.local, d, { immediate: !0 }), t({
      createNewProcess: b,
      setPassedNodes: w,
      setActiveNodes: T,
      setProcessingMarker: M,
      getModeler: g,
      toggleLang: d,
      toggleTheme: N,
      downloadProcess: R,
      downloadProcessAsPng: ae
    }), (C, A) => (U(), ie("div", n1, [
      e.toolbar ? (U(), ie("div", r1, [
        X(D(Hn), { size: "mini" }, {
          default: ue(() => [
            X(D(Bt), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ue(() => [
                Ue(re(D(s)(h("zoomOut"))), 1)
              ]),
              default: ue(() => [
                X(D(st), {
                  onClick: A[0] || (A[0] = (B) => p())
                }, {
                  default: ue(() => [
                    X(D(Yd), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            X(D(Bt), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ue(() => [
                Ue(re(D(s)(h("zoomReset"))), 1)
              ]),
              default: ue(() => [
                X(D(st), {
                  onClick: A[1] || (A[1] = (B) => P("fit-viewport"))
                }, {
                  default: ue(() => [
                    G("span", i1, re(Math.floor($.value * 10) * 10 + "%"), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            X(D(Bt), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ue(() => [
                Ue(re(D(s)(h("zoomIn"))), 1)
              ]),
              default: ue(() => [
                X(D(st), {
                  onClick: A[2] || (A[2] = (B) => f())
                }, {
                  default: ue(() => [
                    X(D(Gd), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            e.showDownload ? (U(), Ee(D(Bt), {
              key: 0,
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ue(() => [
                G("div", o1, [
                  X(D(st), {
                    onClick: A[3] || (A[3] = (B) => R("bpmn"))
                  }, {
                    default: ue(() => [
                      Ue(re(D(s)(h("exportAsBPMN"))), 1)
                    ]),
                    _: 1
                  }),
                  X(D(st), {
                    onClick: A[4] || (A[4] = (B) => R("xml"))
                  }, {
                    default: ue(() => [
                      Ue(re(D(s)(h("exportAsXML"))), 1)
                    ]),
                    _: 1
                  }),
                  X(D(st), {
                    onClick: A[5] || (A[5] = (B) => R("svg"))
                  }, {
                    default: ue(() => [
                      Ue(re(D(s)(h("exportAsSVG"))), 1)
                    ]),
                    _: 1
                  }),
                  X(D(st), {
                    onClick: A[6] || (A[6] = (B) => R("png"))
                  }, {
                    default: ue(() => [
                      Ue(re(D(s)(h("exportAsPNG"))), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: ue(() => [
                X(D(st), null, {
                  default: ue(() => [
                    X(D(Wd), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : ke("", !0),
            v.value ? (U(), Ee(D(Bt), {
              key: 1,
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ue(() => [
                Ue(re(k.value ? D(s)(h("notFullscreen")) : D(s)(h("onFullscreen"))), 1)
              ]),
              default: ue(() => [
                X(D(st), {
                  class: ge({ "is-unable": k.value }),
                  onClick: A[7] || (A[7] = (B) => x())
                }, {
                  default: ue(() => [
                    X(D(Kd), {
                      name: "Fullscreen",
                      size: 16
                    })
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _: 1
            })) : ke("", !0)
          ]),
          _: 1
        })
      ])) : ke("", !0),
      X(D(xi), {
        style: { width: "100%", height: "100%" },
        loading: e.loading
      }, {
        default: ue(() => [
          G("div", {
            ref_key: "canvasEl",
            ref: a,
            class: "bpmn-viewer__canvas"
          }, null, 512)
        ]),
        _: 1
      }, 8, ["loading"])
    ]));
  }
});
var Le = "top", Ke = "bottom", Ge = "right", Ie = "left", zi = "auto", _n = [Le, Ke, Ge, Ie], Ut = "start", pn = "end", a1 = "clippingParents", ha = "viewport", tn = "popper", l1 = "reference", Ko = /* @__PURE__ */ _n.reduce(function(e, t) {
  return e.concat([t + "-" + Ut, t + "-" + pn]);
}, []), va = /* @__PURE__ */ [].concat(_n, [zi]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Ut, t + "-" + pn]);
}, []), c1 = "beforeRead", u1 = "read", d1 = "afterRead", f1 = "beforeMain", p1 = "main", m1 = "afterMain", h1 = "beforeWrite", v1 = "write", g1 = "afterWrite", y1 = [c1, u1, d1, f1, p1, m1, h1, v1, g1];
function rt(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ve(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Dt(e) {
  var t = Ve(e).Element;
  return e instanceof t || e instanceof Element;
}
function We(e) {
  var t = Ve(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ji(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ve(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function b1(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, i = t.attributes[n] || {}, o = t.elements[n];
    !We(o) || !rt(o) || (Object.assign(o.style, r), Object.keys(i).forEach(function(s) {
      var a = i[s];
      a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function w1(e) {
  var t = e.state, n = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var i = t.elements[r], o = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), a = s.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !We(i) || !rt(i) || (Object.assign(i.style, a), Object.keys(o).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const ga = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: b1,
  effect: w1,
  requires: ["computeStyles"]
};
function nt(e) {
  return e.split("-")[0];
}
var At = Math.max, tr = Math.min, qt = Math.round;
function ai() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ya() {
  return !/^((?!chrome|android).)*safari/i.test(ai());
}
function Wt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), i = 1, o = 1;
  t && We(e) && (i = e.offsetWidth > 0 && qt(r.width) / e.offsetWidth || 1, o = e.offsetHeight > 0 && qt(r.height) / e.offsetHeight || 1);
  var s = Dt(e) ? Ve(e) : window, a = s.visualViewport, l = !ya() && n, u = (r.left + (l && a ? a.offsetLeft : 0)) / i, c = (r.top + (l && a ? a.offsetTop : 0)) / o, m = r.width / i, S = r.height / o;
  return {
    width: m,
    height: S,
    top: c,
    right: u + m,
    bottom: c + S,
    left: u,
    x: u,
    y: c
  };
}
function Vi(e) {
  var t = Wt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ba(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && ji(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function dt(e) {
  return Ve(e).getComputedStyle(e);
}
function E1(e) {
  return ["table", "td", "th"].indexOf(rt(e)) >= 0;
}
function wt(e) {
  return ((Dt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function mr(e) {
  return rt(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ji(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    wt(e)
  );
}
function Go(e) {
  return !We(e) || // https://github.com/popperjs/popper-core/issues/837
  dt(e).position === "fixed" ? null : e.offsetParent;
}
function S1(e) {
  var t = /firefox/i.test(ai()), n = /Trident/i.test(ai());
  if (n && We(e)) {
    var r = dt(e);
    if (r.position === "fixed")
      return null;
  }
  var i = mr(e);
  for (ji(i) && (i = i.host); We(i) && ["html", "body"].indexOf(rt(i)) < 0; ) {
    var o = dt(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Cn(e) {
  for (var t = Ve(e), n = Go(e); n && E1(n) && dt(n).position === "static"; )
    n = Go(n);
  return n && (rt(n) === "html" || rt(n) === "body" && dt(n).position === "static") ? t : n || S1(e) || t;
}
function Hi(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function cn(e, t, n) {
  return At(e, tr(t, n));
}
function _1(e, t, n) {
  var r = cn(e, t, n);
  return r > n ? n : r;
}
function wa() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ea(e) {
  return Object.assign({}, wa(), e);
}
function Sa(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var C1 = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Ea(typeof t != "number" ? t : Sa(t, _n));
};
function k1(e) {
  var t, n = e.state, r = e.name, i = e.options, o = n.elements.arrow, s = n.modifiersData.popperOffsets, a = nt(n.placement), l = Hi(a), u = [Ie, Ge].indexOf(a) >= 0, c = u ? "height" : "width";
  if (!(!o || !s)) {
    var m = C1(i.padding, n), S = Vi(o), g = l === "y" ? Le : Ie, h = l === "y" ? Ke : Ge, b = n.rects.reference[c] + n.rects.reference[l] - s[l] - n.rects.popper[c], w = s[l] - n.rects.reference[l], T = Cn(o), M = T ? l === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, N = b / 2 - w / 2, d = m[g], $ = M - S[c] - m[h], P = M / 2 - S[c] / 2 + N, p = cn(d, P, $), f = l;
    n.modifiersData[r] = (t = {}, t[f] = p, t.centerOffset = p - P, t);
  }
}
function T1(e) {
  var t = e.state, n = e.options, r = n.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || ba(t.elements.popper, i) && (t.elements.arrow = i));
}
const O1 = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: k1,
  effect: T1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Kt(e) {
  return e.split("-")[1];
}
var A1 = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function P1(e, t) {
  var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
  return {
    x: qt(n * i) / i || 0,
    y: qt(r * i) / i || 0
  };
}
function Yo(e) {
  var t, n = e.popper, r = e.popperRect, i = e.placement, o = e.variation, s = e.offsets, a = e.position, l = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, m = e.isFixed, S = s.x, g = S === void 0 ? 0 : S, h = s.y, b = h === void 0 ? 0 : h, w = typeof c == "function" ? c({
    x: g,
    y: b
  }) : {
    x: g,
    y: b
  };
  g = w.x, b = w.y;
  var T = s.hasOwnProperty("x"), M = s.hasOwnProperty("y"), N = Ie, d = Le, $ = window;
  if (u) {
    var P = Cn(n), p = "clientHeight", f = "clientWidth";
    if (P === Ve(n) && (P = wt(n), dt(P).position !== "static" && a === "absolute" && (p = "scrollHeight", f = "scrollWidth")), P = P, i === Le || (i === Ie || i === Ge) && o === pn) {
      d = Ke;
      var v = m && P === $ && $.visualViewport ? $.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        P[p]
      );
      b -= v - r.height, b *= l ? 1 : -1;
    }
    if (i === Ie || (i === Le || i === Ke) && o === pn) {
      N = Ge;
      var k = m && P === $ && $.visualViewport ? $.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        P[f]
      );
      g -= k - r.width, g *= l ? 1 : -1;
    }
  }
  var x = Object.assign({
    position: a
  }, u && A1), O = c === !0 ? P1({
    x: g,
    y: b
  }, Ve(n)) : {
    x: g,
    y: b
  };
  if (g = O.x, b = O.y, l) {
    var q;
    return Object.assign({}, x, (q = {}, q[d] = M ? "0" : "", q[N] = T ? "0" : "", q.transform = ($.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + b + "px)" : "translate3d(" + g + "px, " + b + "px, 0)", q));
  }
  return Object.assign({}, x, (t = {}, t[d] = M ? b + "px" : "", t[N] = T ? g + "px" : "", t.transform = "", t));
}
function x1(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, o = n.adaptive, s = o === void 0 ? !0 : o, a = n.roundOffsets, l = a === void 0 ? !0 : a, u = {
    placement: nt(t.placement),
    variation: Kt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Yo(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Yo(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const D1 = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: x1,
  data: {}
};
var Rn = {
  passive: !0
};
function M1(e) {
  var t = e.state, n = e.instance, r = e.options, i = r.scroll, o = i === void 0 ? !0 : i, s = r.resize, a = s === void 0 ? !0 : s, l = Ve(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && u.forEach(function(c) {
    c.addEventListener("scroll", n.update, Rn);
  }), a && l.addEventListener("resize", n.update, Rn), function() {
    o && u.forEach(function(c) {
      c.removeEventListener("scroll", n.update, Rn);
    }), a && l.removeEventListener("resize", n.update, Rn);
  };
}
const $1 = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: M1,
  data: {}
};
var L1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Kn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return L1[t];
  });
}
var I1 = {
  start: "end",
  end: "start"
};
function Xo(e) {
  return e.replace(/start|end/g, function(t) {
    return I1[t];
  });
}
function Ui(e) {
  var t = Ve(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function qi(e) {
  return Wt(wt(e)).left + Ui(e).scrollLeft;
}
function N1(e, t) {
  var n = Ve(e), r = wt(e), i = n.visualViewport, o = r.clientWidth, s = r.clientHeight, a = 0, l = 0;
  if (i) {
    o = i.width, s = i.height;
    var u = ya();
    (u || !u && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: a + qi(e),
    y: l
  };
}
function R1(e) {
  var t, n = wt(e), r = Ui(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, o = At(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = At(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -r.scrollLeft + qi(e), l = -r.scrollTop;
  return dt(i || n).direction === "rtl" && (a += At(n.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: a,
    y: l
  };
}
function Wi(e) {
  var t = dt(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function _a(e) {
  return ["html", "body", "#document"].indexOf(rt(e)) >= 0 ? e.ownerDocument.body : We(e) && Wi(e) ? e : _a(mr(e));
}
function un(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = _a(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), o = Ve(r), s = i ? [o].concat(o.visualViewport || [], Wi(r) ? r : []) : r, a = t.concat(s);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(un(mr(s)))
  );
}
function li(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function B1(e, t) {
  var n = Wt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Jo(e, t, n) {
  return t === ha ? li(N1(e, n)) : Dt(t) ? B1(t, n) : li(R1(wt(e)));
}
function F1(e) {
  var t = un(mr(e)), n = ["absolute", "fixed"].indexOf(dt(e).position) >= 0, r = n && We(e) ? Cn(e) : e;
  return Dt(r) ? t.filter(function(i) {
    return Dt(i) && ba(i, r) && rt(i) !== "body";
  }) : [];
}
function z1(e, t, n, r) {
  var i = t === "clippingParents" ? F1(e) : [].concat(t), o = [].concat(i, [n]), s = o[0], a = o.reduce(function(l, u) {
    var c = Jo(e, u, r);
    return l.top = At(c.top, l.top), l.right = tr(c.right, l.right), l.bottom = tr(c.bottom, l.bottom), l.left = At(c.left, l.left), l;
  }, Jo(e, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Ca(e) {
  var t = e.reference, n = e.element, r = e.placement, i = r ? nt(r) : null, o = r ? Kt(r) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, l;
  switch (i) {
    case Le:
      l = {
        x: s,
        y: t.y - n.height
      };
      break;
    case Ke:
      l = {
        x: s,
        y: t.y + t.height
      };
      break;
    case Ge:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case Ie:
      l = {
        x: t.x - n.width,
        y: a
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var u = i ? Hi(i) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (o) {
      case Ut:
        l[u] = l[u] - (t[c] / 2 - n[c] / 2);
        break;
      case pn:
        l[u] = l[u] + (t[c] / 2 - n[c] / 2);
        break;
    }
  }
  return l;
}
function mn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, i = r === void 0 ? e.placement : r, o = n.strategy, s = o === void 0 ? e.strategy : o, a = n.boundary, l = a === void 0 ? a1 : a, u = n.rootBoundary, c = u === void 0 ? ha : u, m = n.elementContext, S = m === void 0 ? tn : m, g = n.altBoundary, h = g === void 0 ? !1 : g, b = n.padding, w = b === void 0 ? 0 : b, T = Ea(typeof w != "number" ? w : Sa(w, _n)), M = S === tn ? l1 : tn, N = e.rects.popper, d = e.elements[h ? M : S], $ = z1(Dt(d) ? d : d.contextElement || wt(e.elements.popper), l, c, s), P = Wt(e.elements.reference), p = Ca({
    reference: P,
    element: N,
    strategy: "absolute",
    placement: i
  }), f = li(Object.assign({}, N, p)), v = S === tn ? f : P, k = {
    top: $.top - v.top + T.top,
    bottom: v.bottom - $.bottom + T.bottom,
    left: $.left - v.left + T.left,
    right: v.right - $.right + T.right
  }, x = e.modifiersData.offset;
  if (S === tn && x) {
    var O = x[i];
    Object.keys(k).forEach(function(q) {
      var R = [Ge, Ke].indexOf(q) >= 0 ? 1 : -1, ae = [Le, Ke].indexOf(q) >= 0 ? "y" : "x";
      k[q] += O[ae] * R;
    });
  }
  return k;
}
function j1(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, i = n.boundary, o = n.rootBoundary, s = n.padding, a = n.flipVariations, l = n.allowedAutoPlacements, u = l === void 0 ? va : l, c = Kt(r), m = c ? a ? Ko : Ko.filter(function(h) {
    return Kt(h) === c;
  }) : _n, S = m.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  S.length === 0 && (S = m);
  var g = S.reduce(function(h, b) {
    return h[b] = mn(e, {
      placement: b,
      boundary: i,
      rootBoundary: o,
      padding: s
    })[nt(b)], h;
  }, {});
  return Object.keys(g).sort(function(h, b) {
    return g[h] - g[b];
  });
}
function V1(e) {
  if (nt(e) === zi)
    return [];
  var t = Kn(e);
  return [Xo(e), t, Xo(t)];
}
function H1(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var i = n.mainAxis, o = i === void 0 ? !0 : i, s = n.altAxis, a = s === void 0 ? !0 : s, l = n.fallbackPlacements, u = n.padding, c = n.boundary, m = n.rootBoundary, S = n.altBoundary, g = n.flipVariations, h = g === void 0 ? !0 : g, b = n.allowedAutoPlacements, w = t.options.placement, T = nt(w), M = T === w, N = l || (M || !h ? [Kn(w)] : V1(w)), d = [w].concat(N).reduce(function(le, be) {
      return le.concat(nt(be) === zi ? j1(t, {
        placement: be,
        boundary: c,
        rootBoundary: m,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: b
      }) : be);
    }, []), $ = t.rects.reference, P = t.rects.popper, p = /* @__PURE__ */ new Map(), f = !0, v = d[0], k = 0; k < d.length; k++) {
      var x = d[k], O = nt(x), q = Kt(x) === Ut, R = [Le, Ke].indexOf(O) >= 0, ae = R ? "width" : "height", C = mn(t, {
        placement: x,
        boundary: c,
        rootBoundary: m,
        altBoundary: S,
        padding: u
      }), A = R ? q ? Ge : Ie : q ? Ke : Le;
      $[ae] > P[ae] && (A = Kn(A));
      var B = Kn(A), z = [];
      if (o && z.push(C[O] <= 0), a && z.push(C[A] <= 0, C[B] <= 0), z.every(function(le) {
        return le;
      })) {
        v = x, f = !1;
        break;
      }
      p.set(x, z);
    }
    if (f)
      for (var Y = h ? 3 : 1, ee = function(be) {
        var De = d.find(function(Xe) {
          var Te = p.get(Xe);
          if (Te)
            return Te.slice(0, be).every(function(Be) {
              return Be;
            });
        });
        if (De)
          return v = De, "break";
      }, ne = Y; ne > 0; ne--) {
        var ye = ee(ne);
        if (ye === "break") break;
      }
    t.placement !== v && (t.modifiersData[r]._skip = !0, t.placement = v, t.reset = !0);
  }
}
const U1 = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: H1,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Zo(e, t, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function Qo(e) {
  return [Le, Ge, Ke, Ie].some(function(t) {
    return e[t] >= 0;
  });
}
function q1(e) {
  var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, o = t.modifiersData.preventOverflow, s = mn(t, {
    elementContext: "reference"
  }), a = mn(t, {
    altBoundary: !0
  }), l = Zo(s, r), u = Zo(a, i, o), c = Qo(l), m = Qo(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: m
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": m
  });
}
const W1 = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: q1
};
function K1(e, t, n) {
  var r = nt(e), i = [Ie, Le].indexOf(r) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = o[0], a = o[1];
  return s = s || 0, a = (a || 0) * i, [Ie, Ge].indexOf(r) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function G1(e) {
  var t = e.state, n = e.options, r = e.name, i = n.offset, o = i === void 0 ? [0, 0] : i, s = va.reduce(function(c, m) {
    return c[m] = K1(m, t.rects, o), c;
  }, {}), a = s[t.placement], l = a.x, u = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
const Y1 = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: G1
};
function X1(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Ca({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const J1 = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: X1,
  data: {}
};
function Z1(e) {
  return e === "x" ? "y" : "x";
}
function Q1(e) {
  var t = e.state, n = e.options, r = e.name, i = n.mainAxis, o = i === void 0 ? !0 : i, s = n.altAxis, a = s === void 0 ? !1 : s, l = n.boundary, u = n.rootBoundary, c = n.altBoundary, m = n.padding, S = n.tether, g = S === void 0 ? !0 : S, h = n.tetherOffset, b = h === void 0 ? 0 : h, w = mn(t, {
    boundary: l,
    rootBoundary: u,
    padding: m,
    altBoundary: c
  }), T = nt(t.placement), M = Kt(t.placement), N = !M, d = Hi(T), $ = Z1(d), P = t.modifiersData.popperOffsets, p = t.rects.reference, f = t.rects.popper, v = typeof b == "function" ? b(Object.assign({}, t.rects, {
    placement: t.placement
  })) : b, k = typeof v == "number" ? {
    mainAxis: v,
    altAxis: v
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, v), x = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, O = {
    x: 0,
    y: 0
  };
  if (P) {
    if (o) {
      var q, R = d === "y" ? Le : Ie, ae = d === "y" ? Ke : Ge, C = d === "y" ? "height" : "width", A = P[d], B = A + w[R], z = A - w[ae], Y = g ? -f[C] / 2 : 0, ee = M === Ut ? p[C] : f[C], ne = M === Ut ? -f[C] : -p[C], ye = t.elements.arrow, le = g && ye ? Vi(ye) : {
        width: 0,
        height: 0
      }, be = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : wa(), De = be[R], Xe = be[ae], Te = cn(0, p[C], le[C]), Be = N ? p[C] / 2 - Y - Te - De - k.mainAxis : ee - Te - De - k.mainAxis, y = N ? -p[C] / 2 + Y + Te + Xe + k.mainAxis : ne + Te + Xe + k.mainAxis, I = t.elements.arrow && Cn(t.elements.arrow), F = I ? d === "y" ? I.clientTop || 0 : I.clientLeft || 0 : 0, K = (q = x == null ? void 0 : x[d]) != null ? q : 0, H = A + Be - K - F, j = A + y - K, oe = cn(g ? tr(B, H) : B, A, g ? At(z, j) : z);
      P[d] = oe, O[d] = oe - A;
    }
    if (a) {
      var de, _e = d === "x" ? Le : Ie, it = d === "x" ? Ke : Ge, we = P[$], he = $ === "y" ? "height" : "width", St = we + w[_e], Je = we - w[it], Qe = [Le, Ie].indexOf(T) !== -1, _t = (de = x == null ? void 0 : x[$]) != null ? de : 0, $t = Qe ? St : we - p[he] - f[he] - _t + k.altAxis, Lt = Qe ? we + p[he] + f[he] - _t - k.altAxis : Je, L = g && Qe ? _1($t, we, Lt) : cn(g ? $t : St, we, g ? Lt : Je);
      P[$] = L, O[$] = L - we;
    }
    t.modifiersData[r] = O;
  }
}
const ef = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Q1,
  requiresIfExists: ["offset"]
};
function tf(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function nf(e) {
  return e === Ve(e) || !We(e) ? Ui(e) : tf(e);
}
function rf(e) {
  var t = e.getBoundingClientRect(), n = qt(t.width) / e.offsetWidth || 1, r = qt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function of(e, t, n) {
  n === void 0 && (n = !1);
  var r = We(t), i = We(t) && rf(t), o = wt(t), s = Wt(e, i, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((rt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Wi(o)) && (a = nf(t)), We(t) ? (l = Wt(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : o && (l.x = qi(o))), {
    x: s.left + a.scrollLeft - l.x,
    y: s.top + a.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function sf(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(o) {
    t.set(o.name, o);
  });
  function i(o) {
    n.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function(a) {
      if (!n.has(a)) {
        var l = t.get(a);
        l && i(l);
      }
    }), r.push(o);
  }
  return e.forEach(function(o) {
    n.has(o.name) || i(o);
  }), r;
}
function af(e) {
  var t = sf(e);
  return y1.reduce(function(n, r) {
    return n.concat(t.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function lf(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function cf(e) {
  var t = e.reduce(function(n, r) {
    var i = n[r.name];
    return n[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var es = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ts() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function uf(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, o = i === void 0 ? es : i;
  return function(a, l, u) {
    u === void 0 && (u = o);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, es, o),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, m = [], S = !1, g = {
      state: c,
      setOptions: function(T) {
        var M = typeof T == "function" ? T(c.options) : T;
        b(), c.options = Object.assign({}, o, c.options, M), c.scrollParents = {
          reference: Dt(a) ? un(a) : a.contextElement ? un(a.contextElement) : [],
          popper: un(l)
        };
        var N = af(cf([].concat(r, c.options.modifiers)));
        return c.orderedModifiers = N.filter(function(d) {
          return d.enabled;
        }), h(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!S) {
          var T = c.elements, M = T.reference, N = T.popper;
          if (ts(M, N)) {
            c.rects = {
              reference: of(M, Cn(N), c.options.strategy === "fixed"),
              popper: Vi(N)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(k) {
              return c.modifiersData[k.name] = Object.assign({}, k.data);
            });
            for (var d = 0; d < c.orderedModifiers.length; d++) {
              if (c.reset === !0) {
                c.reset = !1, d = -1;
                continue;
              }
              var $ = c.orderedModifiers[d], P = $.fn, p = $.options, f = p === void 0 ? {} : p, v = $.name;
              typeof P == "function" && (c = P({
                state: c,
                options: f,
                name: v,
                instance: g
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: lf(function() {
        return new Promise(function(w) {
          g.forceUpdate(), w(c);
        });
      }),
      destroy: function() {
        b(), S = !0;
      }
    };
    if (!ts(a, l))
      return g;
    g.setOptions(u).then(function(w) {
      !S && u.onFirstUpdate && u.onFirstUpdate(w);
    });
    function h() {
      c.orderedModifiers.forEach(function(w) {
        var T = w.name, M = w.options, N = M === void 0 ? {} : M, d = w.effect;
        if (typeof d == "function") {
          var $ = d({
            state: c,
            name: T,
            instance: g,
            options: N
          }), P = function() {
          };
          m.push($ || P);
        }
      });
    }
    function b() {
      m.forEach(function(w) {
        return w();
      }), m = [];
    }
    return g;
  };
}
var df = [$1, J1, D1, ga, Y1, U1, ef, O1, W1], ff = /* @__PURE__ */ uf({
  defaultModifiers: df
}), pf = "tippy-box", ka = "tippy-content", mf = "tippy-backdrop", Ta = "tippy-arrow", Oa = "tippy-svg-arrow", Tt = {
  passive: !0,
  capture: !0
}, Aa = function() {
  return document.body;
};
function hf(e, t) {
  return {}.hasOwnProperty.call(e, t);
}
function qr(e, t, n) {
  if (Array.isArray(e)) {
    var r = e[t];
    return r ?? (Array.isArray(n) ? n[t] : n);
  }
  return e;
}
function Ki(e, t) {
  var n = {}.toString.call(e);
  return n.indexOf("[object") === 0 && n.indexOf(t + "]") > -1;
}
function Pa(e, t) {
  return typeof e == "function" ? e.apply(void 0, t) : e;
}
function ns(e, t) {
  if (t === 0)
    return e;
  var n;
  return function(r) {
    clearTimeout(n), n = setTimeout(function() {
      e(r);
    }, t);
  };
}
function vf(e, t) {
  var n = Object.assign({}, e);
  return t.forEach(function(r) {
    delete n[r];
  }), n;
}
function gf(e) {
  return e.split(/\s+/).filter(Boolean);
}
function Ft(e) {
  return [].concat(e);
}
function rs(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function yf(e) {
  return e.filter(function(t, n) {
    return e.indexOf(t) === n;
  });
}
function bf(e) {
  return e.split("-")[0];
}
function nr(e) {
  return [].slice.call(e);
}
function is(e) {
  return Object.keys(e).reduce(function(t, n) {
    return e[n] !== void 0 && (t[n] = e[n]), t;
  }, {});
}
function dn() {
  return document.createElement("div");
}
function hn(e) {
  return ["Element", "Fragment"].some(function(t) {
    return Ki(e, t);
  });
}
function wf(e) {
  return Ki(e, "NodeList");
}
function xa(e) {
  return Ki(e, "MouseEvent");
}
function Ef(e) {
  return !!(e && e._tippy && e._tippy.reference === e);
}
function Sf(e) {
  return hn(e) ? [e] : wf(e) ? nr(e) : Array.isArray(e) ? e : nr(document.querySelectorAll(e));
}
function Wr(e, t) {
  e.forEach(function(n) {
    n && (n.style.transitionDuration = t + "ms");
  });
}
function os(e, t) {
  e.forEach(function(n) {
    n && n.setAttribute("data-state", t);
  });
}
function Da(e) {
  var t, n = Ft(e), r = n[0];
  return r != null && (t = r.ownerDocument) != null && t.body ? r.ownerDocument : document;
}
function _f(e, t) {
  var n = t.clientX, r = t.clientY;
  return e.every(function(i) {
    var o = i.popperRect, s = i.popperState, a = i.props, l = a.interactiveBorder, u = bf(s.placement), c = s.modifiersData.offset;
    if (!c)
      return !0;
    var m = u === "bottom" ? c.top.y : 0, S = u === "top" ? c.bottom.y : 0, g = u === "right" ? c.left.x : 0, h = u === "left" ? c.right.x : 0, b = o.top - r + m > l, w = r - o.bottom - S > l, T = o.left - n + g > l, M = n - o.right - h > l;
    return b || w || T || M;
  });
}
function Kr(e, t, n) {
  var r = t + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(i) {
    e[r](i, n);
  });
}
function ss(e, t) {
  for (var n = t; n; ) {
    var r;
    if (e.contains(n))
      return !0;
    n = n.getRootNode == null || (r = n.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var tt = {
  isTouch: !1
}, as = 0;
function Cf() {
  tt.isTouch || (tt.isTouch = !0, window.performance && document.addEventListener("mousemove", Ma));
}
function Ma() {
  var e = performance.now();
  e - as < 20 && (tt.isTouch = !1, document.removeEventListener("mousemove", Ma)), as = e;
}
function kf() {
  var e = document.activeElement;
  if (Ef(e)) {
    var t = e._tippy;
    e.blur && !t.state.isVisible && e.blur();
  }
}
function Tf() {
  document.addEventListener("touchstart", Cf, Tt), window.addEventListener("blur", kf);
}
var Of = typeof window < "u" && typeof document < "u", Af = Of ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function Rt(e) {
  var t = e === "destroy" ? "n already-" : " ";
  return [e + "() was called on a" + t + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function ls(e) {
  var t = /[ \t]{2,}/g, n = /^[ \t]*/gm;
  return e.replace(t, " ").replace(n, "").trim();
}
function Pf(e) {
  return ls(`
  %ctippy.js

  %c` + ls(e) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function $a(e) {
  return [
    Pf(e),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var vn;
process.env.NODE_ENV !== "production" && xf();
function xf() {
  vn = /* @__PURE__ */ new Set();
}
function at(e, t) {
  if (e && !vn.has(t)) {
    var n;
    vn.add(t), (n = console).warn.apply(n, $a(t));
  }
}
function ci(e, t) {
  if (e && !vn.has(t)) {
    var n;
    vn.add(t), (n = console).error.apply(n, $a(t));
  }
}
function Df(e) {
  var t = !e, n = Object.prototype.toString.call(e) === "[object Object]" && !e.addEventListener;
  ci(t, ["tippy() was passed", "`" + String(e) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), ci(n, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var La = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, Mf = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, Fe = Object.assign({
  appendTo: Aa,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, La, Mf), $f = Object.keys(Fe), Lf = function(t) {
  process.env.NODE_ENV !== "production" && Na(t, []);
  var n = Object.keys(t);
  n.forEach(function(r) {
    Fe[r] = t[r];
  });
};
function Ia(e) {
  var t = e.plugins || [], n = t.reduce(function(r, i) {
    var o = i.name, s = i.defaultValue;
    if (o) {
      var a;
      r[o] = e[o] !== void 0 ? e[o] : (a = Fe[o]) != null ? a : s;
    }
    return r;
  }, {});
  return Object.assign({}, e, n);
}
function If(e, t) {
  var n = t ? Object.keys(Ia(Object.assign({}, Fe, {
    plugins: t
  }))) : $f, r = n.reduce(function(i, o) {
    var s = (e.getAttribute("data-tippy-" + o) || "").trim();
    if (!s)
      return i;
    if (o === "content")
      i[o] = s;
    else
      try {
        i[o] = JSON.parse(s);
      } catch {
        i[o] = s;
      }
    return i;
  }, {});
  return r;
}
function cs(e, t) {
  var n = Object.assign({}, t, {
    content: Pa(t.content, [e])
  }, t.ignoreAttributes ? {} : If(e, t.plugins));
  return n.aria = Object.assign({}, Fe.aria, n.aria), n.aria = {
    expanded: n.aria.expanded === "auto" ? t.interactive : n.aria.expanded,
    content: n.aria.content === "auto" ? t.interactive ? null : "describedby" : n.aria.content
  }, n;
}
function Na(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = []);
  var n = Object.keys(e);
  n.forEach(function(r) {
    var i = vf(Fe, Object.keys(La)), o = !hf(i, r);
    o && (o = t.filter(function(s) {
      return s.name === r;
    }).length === 0), at(o, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var Nf = function() {
  return "innerHTML";
};
function ui(e, t) {
  e[Nf()] = t;
}
function us(e) {
  var t = dn();
  return e === !0 ? t.className = Ta : (t.className = Oa, hn(e) ? t.appendChild(e) : ui(t, e)), t;
}
function ds(e, t) {
  hn(t.content) ? (ui(e, ""), e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? ui(e, t.content) : e.textContent = t.content);
}
function di(e) {
  var t = e.firstElementChild, n = nr(t.children);
  return {
    box: t,
    content: n.find(function(r) {
      return r.classList.contains(ka);
    }),
    arrow: n.find(function(r) {
      return r.classList.contains(Ta) || r.classList.contains(Oa);
    }),
    backdrop: n.find(function(r) {
      return r.classList.contains(mf);
    })
  };
}
function Ra(e) {
  var t = dn(), n = dn();
  n.className = pf, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
  var r = dn();
  r.className = ka, r.setAttribute("data-state", "hidden"), ds(r, e.props), t.appendChild(n), n.appendChild(r), i(e.props, e.props);
  function i(o, s) {
    var a = di(t), l = a.box, u = a.content, c = a.arrow;
    s.theme ? l.setAttribute("data-theme", s.theme) : l.removeAttribute("data-theme"), typeof s.animation == "string" ? l.setAttribute("data-animation", s.animation) : l.removeAttribute("data-animation"), s.inertia ? l.setAttribute("data-inertia", "") : l.removeAttribute("data-inertia"), l.style.maxWidth = typeof s.maxWidth == "number" ? s.maxWidth + "px" : s.maxWidth, s.role ? l.setAttribute("role", s.role) : l.removeAttribute("role"), (o.content !== s.content || o.allowHTML !== s.allowHTML) && ds(u, e.props), s.arrow ? c ? o.arrow !== s.arrow && (l.removeChild(c), l.appendChild(us(s.arrow))) : l.appendChild(us(s.arrow)) : c && l.removeChild(c);
  }
  return {
    popper: t,
    onUpdate: i
  };
}
Ra.$$tippy = !0;
var Rf = 1, Bn = [], Gr = [];
function Bf(e, t) {
  var n = cs(e, Object.assign({}, Fe, Ia(is(t)))), r, i, o, s = !1, a = !1, l = !1, u = !1, c, m, S, g = [], h = ns(H, n.interactiveDebounce), b, w = Rf++, T = null, M = yf(n.plugins), N = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, d = {
    // properties
    id: w,
    reference: e,
    popper: dn(),
    popperInstance: T,
    props: n,
    state: N,
    plugins: M,
    // methods
    clearDelayTimeouts: $t,
    setProps: Lt,
    setContent: L,
    show: J,
    hide: Oe,
    hideWithInteractivity: mt,
    enable: Qe,
    disable: _t,
    unmount: ot,
    destroy: ht
  };
  if (!n.render)
    return process.env.NODE_ENV !== "production" && ci(!0, "render() function has not been supplied."), d;
  var $ = n.render(d), P = $.popper, p = $.onUpdate;
  P.setAttribute("data-tippy-root", ""), P.id = "tippy-" + d.id, d.popper = P, e._tippy = d, P._tippy = d;
  var f = M.map(function(_) {
    return _.fn(d);
  }), v = e.hasAttribute("aria-expanded");
  return I(), Y(), A(), B("onCreate", [d]), n.showOnCreate && St(), P.addEventListener("mouseenter", function() {
    d.props.interactive && d.state.isVisible && d.clearDelayTimeouts();
  }), P.addEventListener("mouseleave", function() {
    d.props.interactive && d.props.trigger.indexOf("mouseenter") >= 0 && R().addEventListener("mousemove", h);
  }), d;
  function k() {
    var _ = d.props.touch;
    return Array.isArray(_) ? _ : [_, 0];
  }
  function x() {
    return k()[0] === "hold";
  }
  function O() {
    var _;
    return !!((_ = d.props.render) != null && _.$$tippy);
  }
  function q() {
    return b || e;
  }
  function R() {
    var _ = q().parentNode;
    return _ ? Da(_) : document;
  }
  function ae() {
    return di(P);
  }
  function C(_) {
    return d.state.isMounted && !d.state.isVisible || tt.isTouch || c && c.type === "focus" ? 0 : qr(d.props.delay, _ ? 0 : 1, Fe.delay);
  }
  function A(_) {
    _ === void 0 && (_ = !1), P.style.pointerEvents = d.props.interactive && !_ ? "" : "none", P.style.zIndex = "" + d.props.zIndex;
  }
  function B(_, V, Z) {
    if (Z === void 0 && (Z = !0), f.forEach(function(ce) {
      ce[_] && ce[_].apply(ce, V);
    }), Z) {
      var pe;
      (pe = d.props)[_].apply(pe, V);
    }
  }
  function z() {
    var _ = d.props.aria;
    if (_.content) {
      var V = "aria-" + _.content, Z = P.id, pe = Ft(d.props.triggerTarget || e);
      pe.forEach(function(ce) {
        var Me = ce.getAttribute(V);
        if (d.state.isVisible)
          ce.setAttribute(V, Me ? Me + " " + Z : Z);
        else {
          var He = Me && Me.replace(Z, "").trim();
          He ? ce.setAttribute(V, He) : ce.removeAttribute(V);
        }
      });
    }
  }
  function Y() {
    if (!(v || !d.props.aria.expanded)) {
      var _ = Ft(d.props.triggerTarget || e);
      _.forEach(function(V) {
        d.props.interactive ? V.setAttribute("aria-expanded", d.state.isVisible && V === q() ? "true" : "false") : V.removeAttribute("aria-expanded");
      });
    }
  }
  function ee() {
    R().removeEventListener("mousemove", h), Bn = Bn.filter(function(_) {
      return _ !== h;
    });
  }
  function ne(_) {
    if (!(tt.isTouch && (l || _.type === "mousedown"))) {
      var V = _.composedPath && _.composedPath()[0] || _.target;
      if (!(d.props.interactive && ss(P, V))) {
        if (Ft(d.props.triggerTarget || e).some(function(Z) {
          return ss(Z, V);
        })) {
          if (tt.isTouch || d.state.isVisible && d.props.trigger.indexOf("click") >= 0)
            return;
        } else
          B("onClickOutside", [d, _]);
        d.props.hideOnClick === !0 && (d.clearDelayTimeouts(), d.hide(), a = !0, setTimeout(function() {
          a = !1;
        }), d.state.isMounted || De());
      }
    }
  }
  function ye() {
    l = !0;
  }
  function le() {
    l = !1;
  }
  function be() {
    var _ = R();
    _.addEventListener("mousedown", ne, !0), _.addEventListener("touchend", ne, Tt), _.addEventListener("touchstart", le, Tt), _.addEventListener("touchmove", ye, Tt);
  }
  function De() {
    var _ = R();
    _.removeEventListener("mousedown", ne, !0), _.removeEventListener("touchend", ne, Tt), _.removeEventListener("touchstart", le, Tt), _.removeEventListener("touchmove", ye, Tt);
  }
  function Xe(_, V) {
    Be(_, function() {
      !d.state.isVisible && P.parentNode && P.parentNode.contains(P) && V();
    });
  }
  function Te(_, V) {
    Be(_, V);
  }
  function Be(_, V) {
    var Z = ae().box;
    function pe(ce) {
      ce.target === Z && (Kr(Z, "remove", pe), V());
    }
    if (_ === 0)
      return V();
    Kr(Z, "remove", m), Kr(Z, "add", pe), m = pe;
  }
  function y(_, V, Z) {
    Z === void 0 && (Z = !1);
    var pe = Ft(d.props.triggerTarget || e);
    pe.forEach(function(ce) {
      ce.addEventListener(_, V, Z), g.push({
        node: ce,
        eventType: _,
        handler: V,
        options: Z
      });
    });
  }
  function I() {
    x() && (y("touchstart", K, {
      passive: !0
    }), y("touchend", j, {
      passive: !0
    })), gf(d.props.trigger).forEach(function(_) {
      if (_ !== "manual")
        switch (y(_, K), _) {
          case "mouseenter":
            y("mouseleave", j);
            break;
          case "focus":
            y(Af ? "focusout" : "blur", oe);
            break;
          case "focusin":
            y("focusout", oe);
            break;
        }
    });
  }
  function F() {
    g.forEach(function(_) {
      var V = _.node, Z = _.eventType, pe = _.handler, ce = _.options;
      V.removeEventListener(Z, pe, ce);
    }), g = [];
  }
  function K(_) {
    var V, Z = !1;
    if (!(!d.state.isEnabled || de(_) || a)) {
      var pe = ((V = c) == null ? void 0 : V.type) === "focus";
      c = _, b = _.currentTarget, Y(), !d.state.isVisible && xa(_) && Bn.forEach(function(ce) {
        return ce(_);
      }), _.type === "click" && (d.props.trigger.indexOf("mouseenter") < 0 || s) && d.props.hideOnClick !== !1 && d.state.isVisible ? Z = !0 : St(_), _.type === "click" && (s = !Z), Z && !pe && Je(_);
    }
  }
  function H(_) {
    var V = _.target, Z = q().contains(V) || P.contains(V);
    if (!(_.type === "mousemove" && Z)) {
      var pe = he().concat(P).map(function(ce) {
        var Me, He = ce._tippy, It = (Me = He.popperInstance) == null ? void 0 : Me.state;
        return It ? {
          popperRect: ce.getBoundingClientRect(),
          popperState: It,
          props: n
        } : null;
      }).filter(Boolean);
      _f(pe, _) && (ee(), Je(_));
    }
  }
  function j(_) {
    var V = de(_) || d.props.trigger.indexOf("click") >= 0 && s;
    if (!V) {
      if (d.props.interactive) {
        d.hideWithInteractivity(_);
        return;
      }
      Je(_);
    }
  }
  function oe(_) {
    d.props.trigger.indexOf("focusin") < 0 && _.target !== q() || d.props.interactive && _.relatedTarget && P.contains(_.relatedTarget) || Je(_);
  }
  function de(_) {
    return tt.isTouch ? x() !== _.type.indexOf("touch") >= 0 : !1;
  }
  function _e() {
    it();
    var _ = d.props, V = _.popperOptions, Z = _.placement, pe = _.offset, ce = _.getReferenceClientRect, Me = _.moveTransition, He = O() ? di(P).arrow : null, It = ce ? {
      getBoundingClientRect: ce,
      contextElement: ce.contextElement || q()
    } : e, eo = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Pn) {
        var Nt = Pn.state;
        if (O()) {
          var fl = ae(), Er = fl.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(xn) {
            xn === "placement" ? Er.setAttribute("data-placement", Nt.placement) : Nt.attributes.popper["data-popper-" + xn] ? Er.setAttribute("data-" + xn, "") : Er.removeAttribute("data-" + xn);
          }), Nt.attributes.popper = {};
        }
      }
    }, Ct = [{
      name: "offset",
      options: {
        offset: pe
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !Me
      }
    }, eo];
    O() && He && Ct.push({
      name: "arrow",
      options: {
        element: He,
        padding: 3
      }
    }), Ct.push.apply(Ct, (V == null ? void 0 : V.modifiers) || []), d.popperInstance = ff(It, P, Object.assign({}, V, {
      placement: Z,
      onFirstUpdate: S,
      modifiers: Ct
    }));
  }
  function it() {
    d.popperInstance && (d.popperInstance.destroy(), d.popperInstance = null);
  }
  function we() {
    var _ = d.props.appendTo, V, Z = q();
    d.props.interactive && _ === Aa || _ === "parent" ? V = Z.parentNode : V = Pa(_, [Z]), V.contains(P) || V.appendChild(P), d.state.isMounted = !0, _e(), process.env.NODE_ENV !== "production" && at(d.props.interactive && _ === Fe.appendTo && Z.nextElementSibling !== P, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function he() {
    return nr(P.querySelectorAll("[data-tippy-root]"));
  }
  function St(_) {
    d.clearDelayTimeouts(), _ && B("onTrigger", [d, _]), be();
    var V = C(!0), Z = k(), pe = Z[0], ce = Z[1];
    tt.isTouch && pe === "hold" && ce && (V = ce), V ? r = setTimeout(function() {
      d.show();
    }, V) : d.show();
  }
  function Je(_) {
    if (d.clearDelayTimeouts(), B("onUntrigger", [d, _]), !d.state.isVisible) {
      De();
      return;
    }
    if (!(d.props.trigger.indexOf("mouseenter") >= 0 && d.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(_.type) >= 0 && s)) {
      var V = C(!1);
      V ? i = setTimeout(function() {
        d.state.isVisible && d.hide();
      }, V) : o = requestAnimationFrame(function() {
        d.hide();
      });
    }
  }
  function Qe() {
    d.state.isEnabled = !0;
  }
  function _t() {
    d.hide(), d.state.isEnabled = !1;
  }
  function $t() {
    clearTimeout(r), clearTimeout(i), cancelAnimationFrame(o);
  }
  function Lt(_) {
    if (process.env.NODE_ENV !== "production" && at(d.state.isDestroyed, Rt("setProps")), !d.state.isDestroyed) {
      B("onBeforeUpdate", [d, _]), F();
      var V = d.props, Z = cs(e, Object.assign({}, V, is(_), {
        ignoreAttributes: !0
      }));
      d.props = Z, I(), V.interactiveDebounce !== Z.interactiveDebounce && (ee(), h = ns(H, Z.interactiveDebounce)), V.triggerTarget && !Z.triggerTarget ? Ft(V.triggerTarget).forEach(function(pe) {
        pe.removeAttribute("aria-expanded");
      }) : Z.triggerTarget && e.removeAttribute("aria-expanded"), Y(), A(), p && p(V, Z), d.popperInstance && (_e(), he().forEach(function(pe) {
        requestAnimationFrame(pe._tippy.popperInstance.forceUpdate);
      })), B("onAfterUpdate", [d, _]);
    }
  }
  function L(_) {
    d.setProps({
      content: _
    });
  }
  function J() {
    process.env.NODE_ENV !== "production" && at(d.state.isDestroyed, Rt("show"));
    var _ = d.state.isVisible, V = d.state.isDestroyed, Z = !d.state.isEnabled, pe = tt.isTouch && !d.props.touch, ce = qr(d.props.duration, 0, Fe.duration);
    if (!(_ || V || Z || pe) && !q().hasAttribute("disabled") && (B("onShow", [d], !1), d.props.onShow(d) !== !1)) {
      if (d.state.isVisible = !0, O() && (P.style.visibility = "visible"), A(), be(), d.state.isMounted || (P.style.transition = "none"), O()) {
        var Me = ae(), He = Me.box, It = Me.content;
        Wr([He, It], 0);
      }
      S = function() {
        var Ct;
        if (!(!d.state.isVisible || u)) {
          if (u = !0, P.offsetHeight, P.style.transition = d.props.moveTransition, O() && d.props.animation) {
            var wr = ae(), Pn = wr.box, Nt = wr.content;
            Wr([Pn, Nt], ce), os([Pn, Nt], "visible");
          }
          z(), Y(), rs(Gr, d), (Ct = d.popperInstance) == null || Ct.forceUpdate(), B("onMount", [d]), d.props.animation && O() && Te(ce, function() {
            d.state.isShown = !0, B("onShown", [d]);
          });
        }
      }, we();
    }
  }
  function Oe() {
    process.env.NODE_ENV !== "production" && at(d.state.isDestroyed, Rt("hide"));
    var _ = !d.state.isVisible, V = d.state.isDestroyed, Z = !d.state.isEnabled, pe = qr(d.props.duration, 1, Fe.duration);
    if (!(_ || V || Z) && (B("onHide", [d], !1), d.props.onHide(d) !== !1)) {
      if (d.state.isVisible = !1, d.state.isShown = !1, u = !1, s = !1, O() && (P.style.visibility = "hidden"), ee(), De(), A(!0), O()) {
        var ce = ae(), Me = ce.box, He = ce.content;
        d.props.animation && (Wr([Me, He], pe), os([Me, He], "hidden"));
      }
      z(), Y(), d.props.animation ? O() && Xe(pe, d.unmount) : d.unmount();
    }
  }
  function mt(_) {
    process.env.NODE_ENV !== "production" && at(d.state.isDestroyed, Rt("hideWithInteractivity")), R().addEventListener("mousemove", h), rs(Bn, h), h(_);
  }
  function ot() {
    process.env.NODE_ENV !== "production" && at(d.state.isDestroyed, Rt("unmount")), d.state.isVisible && d.hide(), d.state.isMounted && (it(), he().forEach(function(_) {
      _._tippy.unmount();
    }), P.parentNode && P.parentNode.removeChild(P), Gr = Gr.filter(function(_) {
      return _ !== d;
    }), d.state.isMounted = !1, B("onHidden", [d]));
  }
  function ht() {
    process.env.NODE_ENV !== "production" && at(d.state.isDestroyed, Rt("destroy")), !d.state.isDestroyed && (d.clearDelayTimeouts(), d.unmount(), F(), delete e._tippy, d.state.isDestroyed = !0, B("onDestroy", [d]));
  }
}
function kn(e, t) {
  t === void 0 && (t = {});
  var n = Fe.plugins.concat(t.plugins || []);
  process.env.NODE_ENV !== "production" && (Df(e), Na(t, n)), Tf();
  var r = Object.assign({}, t, {
    plugins: n
  }), i = Sf(e);
  if (process.env.NODE_ENV !== "production") {
    var o = hn(r.content), s = i.length > 1;
    at(o && s, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var a = i.reduce(function(l, u) {
    var c = u && Bf(u, r);
    return c && l.push(c), l;
  }, []);
  return hn(e) ? a[0] : a;
}
kn.defaultProps = Fe;
kn.setDefaultProps = Lf;
kn.currentInput = tt;
Object.assign({}, ga, {
  effect: function(t) {
    var n = t.state, r = {
      popper: {
        position: n.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(n.elements.popper.style, r.popper), n.styles = r, n.elements.arrow && Object.assign(n.elements.arrow.style, r.arrow);
  }
});
var fi = {
  clientX: 0,
  clientY: 0
}, Fn = [];
function Ba(e) {
  var t = e.clientX, n = e.clientY;
  fi = {
    clientX: t,
    clientY: n
  };
}
function Ff(e) {
  e.addEventListener("mousemove", Ba);
}
function zf(e) {
  e.removeEventListener("mousemove", Ba);
}
var jf = {
  name: "followCursor",
  defaultValue: !1,
  fn: function(t) {
    var n = t.reference, r = Da(t.props.triggerTarget || n), i = !1, o = !1, s = !0, a = t.props;
    function l() {
      return t.props.followCursor === "initial" && t.state.isVisible;
    }
    function u() {
      r.addEventListener("mousemove", S);
    }
    function c() {
      r.removeEventListener("mousemove", S);
    }
    function m() {
      i = !0, t.setProps({
        getReferenceClientRect: null
      }), i = !1;
    }
    function S(b) {
      var w = b.target ? n.contains(b.target) : !0, T = t.props.followCursor, M = b.clientX, N = b.clientY, d = n.getBoundingClientRect(), $ = M - d.left, P = N - d.top;
      (w || !t.props.interactive) && t.setProps({
        // @ts-ignore - unneeded DOMRect properties
        getReferenceClientRect: function() {
          var f = n.getBoundingClientRect(), v = M, k = N;
          T === "initial" && (v = f.left + $, k = f.top + P);
          var x = T === "horizontal" ? f.top : k, O = T === "vertical" ? f.right : v, q = T === "horizontal" ? f.bottom : k, R = T === "vertical" ? f.left : v;
          return {
            width: O - R,
            height: q - x,
            top: x,
            right: O,
            bottom: q,
            left: R
          };
        }
      });
    }
    function g() {
      t.props.followCursor && (Fn.push({
        instance: t,
        doc: r
      }), Ff(r));
    }
    function h() {
      Fn = Fn.filter(function(b) {
        return b.instance !== t;
      }), Fn.filter(function(b) {
        return b.doc === r;
      }).length === 0 && zf(r);
    }
    return {
      onCreate: g,
      onDestroy: h,
      onBeforeUpdate: function() {
        a = t.props;
      },
      onAfterUpdate: function(w, T) {
        var M = T.followCursor;
        i || M !== void 0 && a.followCursor !== M && (h(), M ? (g(), t.state.isMounted && !o && !l() && u()) : (c(), m()));
      },
      onMount: function() {
        t.props.followCursor && !o && (s && (S(fi), s = !1), l() || u());
      },
      onTrigger: function(w, T) {
        xa(T) && (fi = {
          clientX: T.clientX,
          clientY: T.clientY
        }), o = T.type === "focus";
      },
      onHidden: function() {
        t.props.followCursor && (m(), c(), s = !0);
      }
    };
  }
};
kn.setDefaultProps({
  render: Ra
});
const Vf = /* @__PURE__ */ ve({
  __name: "TippyPopover",
  props: {
    target: {
      type: [String, Object],
      default: ""
    },
    selectorParent: {
      type: Object,
      default: () => window.document
    },
    appendToBody: {
      type: Boolean,
      default: !0
    },
    theme: {
      type: String,
      default: "default"
    },
    arrow: {
      type: [Boolean, String],
      default: !0
    },
    delay: {
      type: [Number, Array],
      default: 0
    },
    duration: {
      type: [Number, Array],
      default: () => [300, 250]
    },
    followCursor: {
      type: [String, Boolean],
      default: !1
    },
    hideOnClick: {
      type: [String, Boolean],
      default: !0
    },
    inertia: {
      type: Boolean,
      default: !1
    },
    interactive: {
      type: Boolean,
      default: !0
    },
    interactiveBorder: {
      type: Number,
      default: 2
    },
    interactiveDebounce: {
      type: Number,
      default: 0
    },
    maxWidth: {
      type: [Number, Boolean],
      default: 350
    },
    offset: {
      type: Array,
      default: () => [0, 0]
    },
    zIndex: {
      type: Number,
      default: 800
    },
    placement: {
      type: String,
      default: "top"
    },
    animation: {
      type: [String, Boolean],
      default: "scale"
    },
    trigger: {
      type: String,
      default: "mouseenter click"
    },
    triggerTarget: {
      type: [Object, Array],
      default: null
    }
  },
  setup(e) {
    const t = e, n = fn(null), r = fn(null), i = () => {
      const s = {
        ignoreAttributes: !0,
        allowHTML: !1,
        showOnCreate: !1
        // sticky: false
      };
      return s.appendTo = t.appendToBody ? () => document.body : "parent", s.arrow = t.arrow, s.theme = t.theme, s.delay = t.delay, s.duration = t.duration, s.hideOnClick = t.hideOnClick, s.followCursor = t.followCursor, s.inertia = t.inertia, s.interactive = t.interactive, s.interactiveBorder = t.interactiveBorder, s.interactiveDebounce = t.interactiveDebounce, s.maxWidth = t.maxWidth, s.zIndex = t.zIndex, s.offset = t.offset, s.placement = t.placement, s.animation = t.animation, s.trigger = t.trigger, s.triggerTarget = t.triggerTarget, s;
    }, o = () => {
      if (!t.target)
        return console.warn("Tippy target can not be null");
      const s = typeof t.target == "string" ? t.selectorParent.querySelector(t.target) : t.target, a = i();
      s && (r.value = kn(s, {
        ...a,
        content: n.value,
        plugins: [jf]
      }));
    };
    return ft(() => {
      o();
    }), xs(() => {
      r.value && (Array.isArray(r.value) ? r.value.forEach((s) => {
        s.unmount(), s.destroy();
      }) : (r.value.unmount(), r.value.destroy()));
    }), ze(() => t.target, o), (s, a) => (U(), ie("div", {
      ref_key: "tippyWrapper",
      ref: n,
      class: "tippy-wrapper"
    }, [
      Pe(s.$slots, "default")
    ], 512));
  }
}), Hf = ["width", "height", "stroke-width", "stroke"], Uf = /* @__PURE__ */ G("path", { d: "M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }, null, -1), qf = /* @__PURE__ */ G("path", { d: "M12 14v7" }, null, -1), Wf = /* @__PURE__ */ G("path", { d: "M9 18h6" }, null, -1), Kf = [
  Uf,
  qf,
  Wf
], Gf = /* @__PURE__ */ ve({
  name: "GenderFemale",
  __name: "GenderFemale",
  props: {
    size: {
      type: Number,
      default: 16
    },
    stroke: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: "#2c3e50"
    }
  },
  setup(e) {
    return (t, n) => (U(), ie("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      class: "icon icon-tabler icon-tabler-gender-female",
      width: e.size,
      height: e.size,
      viewBox: "0 0 24 24",
      "stroke-width": e.stroke,
      stroke: e.color,
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, Kf, 8, Hf));
  }
}), Yf = ["width", "height", "stroke-width", "stroke"], Xf = /* @__PURE__ */ G("path", { d: "M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }, null, -1), Jf = /* @__PURE__ */ G("path", { d: "M19 5l-5.4 5.4" }, null, -1), Zf = /* @__PURE__ */ G("path", { d: "M19 5h-5" }, null, -1), Qf = /* @__PURE__ */ G("path", { d: "M19 5v5" }, null, -1), ep = [
  Xf,
  Jf,
  Zf,
  Qf
], tp = /* @__PURE__ */ ve({
  name: "GenderMale",
  __name: "GenderMale",
  props: {
    size: {
      type: Number,
      default: 16
    },
    stroke: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: "#2c3e50"
    }
  },
  setup(e) {
    return (t, n) => (U(), ie("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      class: "icon icon-tabler icon-tabler-gender-male",
      width: e.size,
      height: e.size,
      viewBox: "0 0 24 24",
      "stroke-width": e.stroke,
      stroke: e.color,
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, ep, 8, Yf));
  }
}), np = {
  class: "icon-image",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  width: "72",
  height: "72"
}, rp = /* @__PURE__ */ Ds('<path d="M288.921053 707.654248c-152.288409 12.659309-99.539384-170.917798-51.367801-420.713709C268.191292 68.17078 384.956012 0.707734 515.144851 0.81047c154.674158 0.125566 213.530243 78.695472 262.47805 305.124741 64.118431 367.428176 100.977683 417.152208-17.1226 417.015227-102.005039-0.125566-471.579248-15.29619-471.579248-15.29619z"></path><path d="M73.689965 1023.269436l50.374691-320.295365 260.994091-81.161126h233.803403l281.061779 81.172541 50.386106 320.28395H73.689965z" fill="#AAD5DC"></path><path d="M618.816489 622.543509l280.513857 81.046975L949.499565 1022.561702H74.55751l50.16922-318.982633 260.446168-81.046975h233.643591m0.205472-1.472544h-234.008874L123.402582 702.403318 72.82242 1024h878.35516l-50.591577-321.596682-281.621118-81.332353z"></path><path d="M591.100707 1019.125766H415.468486l-46.721869-387.724165 71.127282-25.729561 137.094955-2.054712 70.625019 31.311528-56.493166 384.19691zM667.958353 265.640024c68.992665-29.416628 96.936749 101.171739 5.262346 153.030388z" fill="#FFCFB5"></path><path d="M585.016476 815.640782H425.194123l7.419794-206.841014-20.958063-131.22761 173.91996 4.006688-12.145631 110.440774 11.586293 223.621162z" fill="#FFCFB5"></path><path d="M677.763895 329.564399c1.141507-100.635231-39.096604-173.577509-39.096604-173.577508l-60.168818 11.98582a496.407018 496.407018 0 0 1-81.378013 9.200544 496.270038 496.270038 0 0 1-81.378012-9.200544l-60.180234-11.98582s-40.181036 72.942278-39.085189 173.577508l-1.141507 92.81591c0 68.17078 101.046173 155.244911 181.739282 155.244911 59.244198 0 181.727867-87.062716 181.727866-155.244911z" fill="#FFE7D9"></path><path d="M320.632109 269.361336c-68.98125-29.428043-96.925334 101.171739-5.25093 153.018973z" fill="#FFCFB5"></path><path d="M515.144851 91.526007c-27.944084 83.158763-124.230174 172.961095-167.801485 177.835329s-71.54964-4.269235-71.54964-4.269235S337.811785 61.287495 515.144851 91.526007z"></path><path d="M445.307471 133.796c9.942523 95.190244 227.833322 186.659176 234.008874 180.848907 20.421555-78.821038 55.831093-7.648095 55.831092-7.648095l-54.4727-202.046686-122.483668-49.084788h-67.953894"></path><path d="M416.119145 1018.383787l-28.537668-236.919715c23.423717 24.348338 90.612802 33.103694 141.980604 33.103694 44.233385 0 80.932825-5.97008 93.101286-14.976568l-32.190489 218.792589z" fill="#FFFFFF"></path><path d="M388.563173 783.484538c10.638842 10.068089 29.302477 18.001561 55.557131 23.629189 24.451074 5.239516 54.792322 8.127528 85.430362 8.127528 43.445745 0 78.558491-5.467817 92.11959-14.131853l-31.836622 216.543821H416.769804L388.563173 783.484538m-1.997637-4.234989l28.90295 239.933293h175.643636s28.537667-194.227365 32.544356-221.38381c-10.684503 10.033844-50.032239 15.981094-94.105812 15.981094-57.075335 0-122.209707-10.079504-142.98513-34.519162z"></path><path d="M370.538782 631.401601l-79.871224 26.905313-3.789802 120.942635h41.710655l-32.453035 39.758678 72.611241 199.535371 48.514034 0.582168-46.721869-387.724165zM647.593873 634.928856l85.670078 24.565225 27.202105 79.996789-54.415625 22.088155 54.415625 17.670524-103.431922 238.951597-65.933427 0.92462 56.493166-384.19691z" fill="#A6D3DB"></path>', 12), ip = [
  rp
], op = /* @__PURE__ */ ve({
  name: "EmptyFemaleImage",
  __name: "EmptyFemaleImage",
  setup(e) {
    return (t, n) => (U(), ie("svg", np, ip));
  }
}), sp = {
  class: "icon-image",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  width: "72",
  height: "72"
}, ap = /* @__PURE__ */ Ds('<path d="M384.177143 618.594286l-263.142857 81.828571L70.131429 1024h883.737142l-50.902857-323.577143-283.337143-81.828571H384.177143z" fill="#262626"></path><path d="M422.828571 493.2h160.8v185.554286h-160.8z" fill="#EAA063"></path><path d="M734.52 196.205714c0 131.165714 11.725714 212.102857-225.771429 210.788572-230.011429-1.268571-249.222857-79.622857-249.222857-210.788572S380.828571 0 511.994286 0s222.525714 65.04 222.525714 196.205714z" fill="#834B12"></path><path d="M678.771429 325.302857c1.142857-101.257143-39.325714-174.64-39.325715-174.64l-60.571428 12.057143a500.48 500.48 0 0 1-81.874286 9.257143 500.571429 500.571429 0 0 1-81.885714-9.257143l-60.571429-12.057143s-40.377143 73.382857-39.325714 174.64l-1.142857 93.382857c0 68.571429 50.491429 80.354286 103.348571 116.068572 27.428571 18.491429 47.92 35.737143 79.508572 40.114285 31.577143-4.377143 52.114286-21.622857 79.497142-40.114285 52.857143-35.714286 103.348571-47.474286 103.348572-116.068572z" fill="#FFBF82"></path><path d="M319.457143 264.731429c-69.382857-29.554286-97.531429 101.794286-5.291429 153.954285zM670.714286 255.577143c69.417143-29.611429 97.531429 101.794286 5.291428 153.954286z" fill="#EAA063"></path><path d="M385.514286 625.382857l116.388571 49.577143 116.502857-49.622857-106.468571 316.24-126.422857-316.194286z" fill="#FFFFFF"></path><path d="M617.171429 626.662857l-105.291429 312.777143-125.017143-312.674286 114.445714 48.754286 0.582858 0.24 0.582857-0.24 114.697143-48.857143m2.445714-2.651428l-117.714286 50.148571-117.714286-50.148571 127.805715 319.737142 107.622857-319.702857z"></path><path d="M479.068571 935.611429l11.108572-235.988572h26.857143l11.108571 235.988572h-49.074286z" fill="#B292CB"></path><path d="M516.634286 700.022857l11.074285 235.188572h-48.217142l11.062857-235.188572h26.08m0.777143-0.8H489.788571l-11.142857 236.8h49.92l-11.154285-236.845714z"></path><path d="M484.52 735.177143a11.828571 11.828571 0 0 1-11.428571-8.937143l-7.268572-28.742857a11.828571 11.828571 0 0 1 11.428572-14.731429h49.28a11.828571 11.828571 0 0 1 11.428571 14.731429L530.702857 726.24a11.851429 11.851429 0 0 1-11.485714 8.937143z" fill="#B292CB"></path><path d="M526.531429 683.177143a11.428571 11.428571 0 0 1 11.085714 14.24l-7.268572 28.731428a11.428571 11.428571 0 0 1-11.085714 8.64h-34.742857a11.428571 11.428571 0 0 1-11.085714-8.64l-7.268572-28.731428a11.428571 11.428571 0 0 1 11.085715-14.24h49.28m0-0.811429h-49.28a12.24 12.24 0 0 0-11.862858 15.245715l7.257143 28.742857a12.24 12.24 0 0 0 11.874286 9.234285h34.742857a12.24 12.24 0 0 0 11.874286-9.234285l7.268571-28.742857a12.251429 12.251429 0 0 0-11.874285-15.245715z"></path><path d="M415.845714 583.931429l86.057143 94.822857-68.502857 60.262857-49.222857-120.422857 31.668571-34.662857z" fill="#FFFFFF"></path><path d="M587.948571 583.931429l-86.045714 94.822857 68.491429 60.262857 49.234285-120.422857-31.68-34.662857z" fill="#FFFFFF"></path><path d="M380.36 619.782857l-58.742857 18.285714 17.268571 94.194286 91.085715 44.685714-87.188572 36.16 169.668572 144.445715a5.028571 5.028571 0 0 0 7.885714-5.782857z" fill="#676568"></path><path d="M623.468571 619.714286l76.137143 21.977143a4.251429 4.251429 0 0 1 3.062857 4.08v128.228571a4.251429 4.251429 0 0 1-2.068571 3.645714l-92.4 55.097143a4.251429 4.251429 0 0 0 0.548571 7.565714l72.24 29.954286a4.251429 4.251429 0 0 1 0.8 7.405714L489.434286 1011.714286a4.24 4.24 0 0 1-6.422857-4.891429l135.28-384.445714a4.228571 4.228571 0 0 1 5.177142-2.662857z" fill="#676568"></path>', 15), lp = [
  ap
], cp = /* @__PURE__ */ ve({
  name: "EmptyMaleImage",
  __name: "EmptyMaleImage",
  setup(e) {
    return (t, n) => (U(), ie("svg", sp, lp));
  }
});
function Fa(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: up } = Object.prototype, { getPrototypeOf: Gi } = Object, hr = /* @__PURE__ */ ((e) => (t) => {
  const n = up.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ze = (e) => (e = e.toLowerCase(), (t) => hr(t) === e), vr = (e) => (t) => typeof t === e, { isArray: Zt } = Array, gn = vr("undefined");
function dp(e) {
  return e !== null && !gn(e) && e.constructor !== null && !gn(e.constructor) && je(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const za = Ze("ArrayBuffer");
function fp(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && za(e.buffer), t;
}
const pp = vr("string"), je = vr("function"), ja = vr("number"), gr = (e) => e !== null && typeof e == "object", mp = (e) => e === !0 || e === !1, Gn = (e) => {
  if (hr(e) !== "object")
    return !1;
  const t = Gi(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, hp = Ze("Date"), vp = Ze("File"), gp = Ze("Blob"), yp = Ze("FileList"), bp = (e) => gr(e) && je(e.pipe), wp = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || je(e.append) && ((t = hr(e)) === "formdata" || // detect form-data instance
  t === "object" && je(e.toString) && e.toString() === "[object FormData]"));
}, Ep = Ze("URLSearchParams"), [Sp, _p, Cp, kp] = ["ReadableStream", "Request", "Response", "Headers"].map(Ze), Tp = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Tn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, i;
  if (typeof e != "object" && (e = [e]), Zt(e))
    for (r = 0, i = e.length; r < i; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o.length;
    let a;
    for (r = 0; r < s; r++)
      a = o[r], t.call(null, e[a], a, e);
  }
}
function Va(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, i;
  for (; r-- > 0; )
    if (i = n[r], t === i.toLowerCase())
      return i;
  return null;
}
const Ot = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Ha = (e) => !gn(e) && e !== Ot;
function pi() {
  const { caseless: e } = Ha(this) && this || {}, t = {}, n = (r, i) => {
    const o = e && Va(t, i) || i;
    Gn(t[o]) && Gn(r) ? t[o] = pi(t[o], r) : Gn(r) ? t[o] = pi({}, r) : Zt(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && Tn(arguments[r], n);
  return t;
}
const Op = (e, t, n, { allOwnKeys: r } = {}) => (Tn(t, (i, o) => {
  n && je(i) ? e[o] = Fa(i, n) : e[o] = i;
}, { allOwnKeys: r }), e), Ap = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Pp = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, xp = (e, t, n, r) => {
  let i, o, s;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; )
      s = i[o], (!r || r(s, e, t)) && !a[s] && (t[s] = e[s], a[s] = !0);
    e = n !== !1 && Gi(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Dp = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Mp = (e) => {
  if (!e) return null;
  if (Zt(e)) return e;
  let t = e.length;
  if (!ja(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, $p = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Gi(Uint8Array)), Lp = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const o = i.value;
    t.call(e, o[0], o[1]);
  }
}, Ip = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Np = Ze("HTMLFormElement"), Rp = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, i) {
    return r.toUpperCase() + i;
  }
), fs = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Bp = Ze("RegExp"), Ua = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Tn(n, (i, o) => {
    let s;
    (s = t(i, o, e)) !== !1 && (r[o] = s || i);
  }), Object.defineProperties(e, r);
}, Fp = (e) => {
  Ua(e, (t, n) => {
    if (je(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (je(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, zp = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((o) => {
      n[o] = !0;
    });
  };
  return Zt(e) ? r(e) : r(String(e).split(t)), n;
}, jp = () => {
}, Vp = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, Yr = "abcdefghijklmnopqrstuvwxyz", ps = "0123456789", qa = {
  DIGIT: ps,
  ALPHA: Yr,
  ALPHA_DIGIT: Yr + Yr.toUpperCase() + ps
}, Hp = (e = 16, t = qa.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function Up(e) {
  return !!(e && je(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const qp = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (gr(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[i] = r;
        const o = Zt(r) ? [] : {};
        return Tn(r, (s, a) => {
          const l = n(s, i + 1);
          !gn(l) && (o[a] = l);
        }), t[i] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, Wp = Ze("AsyncFunction"), Kp = (e) => e && (gr(e) || je(e)) && je(e.then) && je(e.catch), Wa = ((e, t) => e ? setImmediate : t ? ((n, r) => (Ot.addEventListener("message", ({ source: i, data: o }) => {
  i === Ot && o === n && r.length && r.shift()();
}, !1), (i) => {
  r.push(i), Ot.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  je(Ot.postMessage)
), Gp = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ot) : typeof process < "u" && process.nextTick || Wa, E = {
  isArray: Zt,
  isArrayBuffer: za,
  isBuffer: dp,
  isFormData: wp,
  isArrayBufferView: fp,
  isString: pp,
  isNumber: ja,
  isBoolean: mp,
  isObject: gr,
  isPlainObject: Gn,
  isReadableStream: Sp,
  isRequest: _p,
  isResponse: Cp,
  isHeaders: kp,
  isUndefined: gn,
  isDate: hp,
  isFile: vp,
  isBlob: gp,
  isRegExp: Bp,
  isFunction: je,
  isStream: bp,
  isURLSearchParams: Ep,
  isTypedArray: $p,
  isFileList: yp,
  forEach: Tn,
  merge: pi,
  extend: Op,
  trim: Tp,
  stripBOM: Ap,
  inherits: Pp,
  toFlatObject: xp,
  kindOf: hr,
  kindOfTest: Ze,
  endsWith: Dp,
  toArray: Mp,
  forEachEntry: Lp,
  matchAll: Ip,
  isHTMLForm: Np,
  hasOwnProperty: fs,
  hasOwnProp: fs,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ua,
  freezeMethods: Fp,
  toObjectSet: zp,
  toCamelCase: Rp,
  noop: jp,
  toFiniteNumber: Vp,
  findKey: Va,
  global: Ot,
  isContextDefined: Ha,
  ALPHABET: qa,
  generateString: Hp,
  isSpecCompliantForm: Up,
  toJSONObject: qp,
  isAsyncFn: Wp,
  isThenable: Kp,
  setImmediate: Wa,
  asap: Gp
};
function te(e, t, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status ? i.status : null);
}
E.inherits(te, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: E.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Ka = te.prototype, Ga = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Ga[e] = { value: e };
});
Object.defineProperties(te, Ga);
Object.defineProperty(Ka, "isAxiosError", { value: !0 });
te.from = (e, t, n, r, i, o) => {
  const s = Object.create(Ka);
  return E.toFlatObject(e, s, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), te.call(s, e.message, t, n, r, i), s.cause = e, s.name = e.name, o && Object.assign(s, o), s;
};
const Yp = null;
function mi(e) {
  return E.isPlainObject(e) || E.isArray(e);
}
function Ya(e) {
  return E.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ms(e, t, n) {
  return e ? e.concat(t).map(function(i, o) {
    return i = Ya(i), !n && o ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function Xp(e) {
  return E.isArray(e) && !e.some(mi);
}
const Jp = E.toFlatObject(E, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function yr(e, t, n) {
  if (!E.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = E.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, w) {
    return !E.isUndefined(w[b]);
  });
  const r = n.metaTokens, i = n.visitor || c, o = n.dots, s = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && E.isSpecCompliantForm(t);
  if (!E.isFunction(i))
    throw new TypeError("visitor must be a function");
  function u(h) {
    if (h === null) return "";
    if (E.isDate(h))
      return h.toISOString();
    if (!l && E.isBlob(h))
      throw new te("Blob is not supported. Use a Buffer instead.");
    return E.isArrayBuffer(h) || E.isTypedArray(h) ? l && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function c(h, b, w) {
    let T = h;
    if (h && !w && typeof h == "object") {
      if (E.endsWith(b, "{}"))
        b = r ? b : b.slice(0, -2), h = JSON.stringify(h);
      else if (E.isArray(h) && Xp(h) || (E.isFileList(h) || E.endsWith(b, "[]")) && (T = E.toArray(h)))
        return b = Ya(b), T.forEach(function(N, d) {
          !(E.isUndefined(N) || N === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? ms([b], d, o) : s === null ? b : b + "[]",
            u(N)
          );
        }), !1;
    }
    return mi(h) ? !0 : (t.append(ms(w, b, o), u(h)), !1);
  }
  const m = [], S = Object.assign(Jp, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: mi
  });
  function g(h, b) {
    if (!E.isUndefined(h)) {
      if (m.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      m.push(h), E.forEach(h, function(T, M) {
        (!(E.isUndefined(T) || T === null) && i.call(
          t,
          T,
          E.isString(M) ? M.trim() : M,
          b,
          S
        )) === !0 && g(T, b ? b.concat(M) : [M]);
      }), m.pop();
    }
  }
  if (!E.isObject(e))
    throw new TypeError("data must be an object");
  return g(e), t;
}
function hs(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Yi(e, t) {
  this._pairs = [], e && yr(e, this, t);
}
const Xa = Yi.prototype;
Xa.append = function(t, n) {
  this._pairs.push([t, n]);
};
Xa.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, hs);
  } : hs;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function Zp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Ja(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || Zp, i = n && n.serialize;
  let o;
  if (i ? o = i(t, n) : o = E.isURLSearchParams(t) ? t.toString() : new Yi(t, n).toString(r), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class vs {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    E.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Za = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Qp = typeof URLSearchParams < "u" ? URLSearchParams : Yi, e2 = typeof FormData < "u" ? FormData : null, t2 = typeof Blob < "u" ? Blob : null, n2 = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Qp,
    FormData: e2,
    Blob: t2
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Xi = typeof window < "u" && typeof document < "u", hi = typeof navigator == "object" && navigator || void 0, r2 = Xi && (!hi || ["ReactNative", "NativeScript", "NS"].indexOf(hi.product) < 0), i2 = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", o2 = Xi && window.location.href || "http://localhost", s2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Xi,
  hasStandardBrowserEnv: r2,
  hasStandardBrowserWebWorkerEnv: i2,
  navigator: hi,
  origin: o2
}, Symbol.toStringTag, { value: "Module" })), Ne = {
  ...s2,
  ...n2
};
function a2(e, t) {
  return yr(e, new Ne.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, i, o) {
      return Ne.isNode && E.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function l2(e) {
  return E.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function c2(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const i = n.length;
  let o;
  for (r = 0; r < i; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function Qa(e) {
  function t(n, r, i, o) {
    let s = n[o++];
    if (s === "__proto__") return !0;
    const a = Number.isFinite(+s), l = o >= n.length;
    return s = !s && E.isArray(i) ? i.length : s, l ? (E.hasOwnProp(i, s) ? i[s] = [i[s], r] : i[s] = r, !a) : ((!i[s] || !E.isObject(i[s])) && (i[s] = []), t(n, r, i[s], o) && E.isArray(i[s]) && (i[s] = c2(i[s])), !a);
  }
  if (E.isFormData(e) && E.isFunction(e.entries)) {
    const n = {};
    return E.forEachEntry(e, (r, i) => {
      t(l2(r), i, n, 0);
    }), n;
  }
  return null;
}
function u2(e, t, n) {
  if (E.isString(e))
    try {
      return (t || JSON.parse)(e), E.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const On = {
  transitional: Za,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, o = E.isObject(t);
    if (o && E.isHTMLForm(t) && (t = new FormData(t)), E.isFormData(t))
      return i ? JSON.stringify(Qa(t)) : t;
    if (E.isArrayBuffer(t) || E.isBuffer(t) || E.isStream(t) || E.isFile(t) || E.isBlob(t) || E.isReadableStream(t))
      return t;
    if (E.isArrayBufferView(t))
      return t.buffer;
    if (E.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return a2(t, this.formSerializer).toString();
      if ((a = E.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return yr(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return o || i ? (n.setContentType("application/json", !1), u2(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || On.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (E.isResponse(t) || E.isReadableStream(t))
      return t;
    if (t && E.isString(t) && (r && !this.responseType || i)) {
      const s = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? te.from(a, te.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Ne.classes.FormData,
    Blob: Ne.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
E.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  On.headers[e] = {};
});
const d2 = E.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), f2 = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(s) {
    i = s.indexOf(":"), n = s.substring(0, i).trim().toLowerCase(), r = s.substring(i + 1).trim(), !(!n || t[n] && d2[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, gs = Symbol("internals");
function nn(e) {
  return e && String(e).trim().toLowerCase();
}
function Yn(e) {
  return e === !1 || e == null ? e : E.isArray(e) ? e.map(Yn) : String(e);
}
function p2(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const m2 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Xr(e, t, n, r, i) {
  if (E.isFunction(r))
    return r.call(this, t, n);
  if (i && (t = n), !!E.isString(t)) {
    if (E.isString(r))
      return t.indexOf(r) !== -1;
    if (E.isRegExp(r))
      return r.test(t);
  }
}
function h2(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function v2(e, t) {
  const n = E.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(i, o, s) {
        return this[r].call(this, t, i, o, s);
      },
      configurable: !0
    });
  });
}
class Re {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function o(a, l, u) {
      const c = nn(l);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const m = E.findKey(i, c);
      (!m || i[m] === void 0 || u === !0 || u === void 0 && i[m] !== !1) && (i[m || l] = Yn(a));
    }
    const s = (a, l) => E.forEach(a, (u, c) => o(u, c, l));
    if (E.isPlainObject(t) || t instanceof this.constructor)
      s(t, n);
    else if (E.isString(t) && (t = t.trim()) && !m2(t))
      s(f2(t), n);
    else if (E.isHeaders(t))
      for (const [a, l] of t.entries())
        o(l, a, r);
    else
      t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = nn(t), t) {
      const r = E.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return p2(i);
        if (E.isFunction(n))
          return n.call(this, i, r);
        if (E.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = nn(t), t) {
      const r = E.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Xr(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function o(s) {
      if (s = nn(s), s) {
        const a = E.findKey(r, s);
        a && (!n || Xr(r, r[a], a, n)) && (delete r[a], i = !0);
      }
    }
    return E.isArray(t) ? t.forEach(o) : o(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || Xr(this, this[o], o, t, !0)) && (delete this[o], i = !0);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return E.forEach(this, (i, o) => {
      const s = E.findKey(r, o);
      if (s) {
        n[s] = Yn(i), delete n[o];
        return;
      }
      const a = t ? h2(o) : String(o).trim();
      a !== o && delete n[o], n[a] = Yn(i), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return E.forEach(this, (r, i) => {
      r != null && r !== !1 && (n[i] = t && E.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[gs] = this[gs] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function o(s) {
      const a = nn(s);
      r[a] || (v2(i, s), r[a] = !0);
    }
    return E.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Re.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
E.reduceDescriptors(Re.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
E.freezeMethods(Re);
function Jr(e, t) {
  const n = this || On, r = t || n, i = Re.from(r.headers);
  let o = r.data;
  return E.forEach(e, function(a) {
    o = a.call(n, o, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), o;
}
function el(e) {
  return !!(e && e.__CANCEL__);
}
function Qt(e, t, n) {
  te.call(this, e ?? "canceled", te.ERR_CANCELED, t, n), this.name = "CanceledError";
}
E.inherits(Qt, te, {
  __CANCEL__: !0
});
function tl(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new te(
    "Request failed with status code " + n.status,
    [te.ERR_BAD_REQUEST, te.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function g2(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function y2(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let i = 0, o = 0, s;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const u = Date.now(), c = r[o];
    s || (s = u), n[i] = l, r[i] = u;
    let m = o, S = 0;
    for (; m !== i; )
      S += n[m++], m = m % e;
    if (i = (i + 1) % e, i === o && (o = (o + 1) % e), u - s < t)
      return;
    const g = c && u - c;
    return g ? Math.round(S * 1e3 / g) : void 0;
  };
}
function b2(e, t) {
  let n = 0, r = 1e3 / t, i, o;
  const s = (u, c = Date.now()) => {
    n = c, i = null, o && (clearTimeout(o), o = null), e.apply(null, u);
  };
  return [(...u) => {
    const c = Date.now(), m = c - n;
    m >= r ? s(u, c) : (i = u, o || (o = setTimeout(() => {
      o = null, s(i);
    }, r - m)));
  }, () => i && s(i)];
}
const rr = (e, t, n = 3) => {
  let r = 0;
  const i = y2(50, 250);
  return b2((o) => {
    const s = o.loaded, a = o.lengthComputable ? o.total : void 0, l = s - r, u = i(l), c = s <= a;
    r = s;
    const m = {
      loaded: s,
      total: a,
      progress: a ? s / a : void 0,
      bytes: l,
      rate: u || void 0,
      estimated: u && a && c ? (a - s) / u : void 0,
      event: o,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(m);
  }, n);
}, ys = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, bs = (e) => (...t) => E.asap(() => e(...t)), w2 = Ne.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = Ne.navigator && /(msie|trident)/i.test(Ne.navigator.userAgent), n = document.createElement("a");
    let r;
    function i(o) {
      let s = o;
      return t && (n.setAttribute("href", s), s = n.href), n.setAttribute("href", s), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = i(window.location.href), function(s) {
      const a = E.isString(s) ? i(s) : s;
      return a.protocol === r.protocol && a.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), E2 = Ne.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, i, o) {
      const s = [e + "=" + encodeURIComponent(t)];
      E.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), E.isString(r) && s.push("path=" + r), E.isString(i) && s.push("domain=" + i), o === !0 && s.push("secure"), document.cookie = s.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function S2(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function _2(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function nl(e, t) {
  return e && !S2(t) ? _2(e, t) : t;
}
const ws = (e) => e instanceof Re ? { ...e } : e;
function Mt(e, t) {
  t = t || {};
  const n = {};
  function r(u, c, m) {
    return E.isPlainObject(u) && E.isPlainObject(c) ? E.merge.call({ caseless: m }, u, c) : E.isPlainObject(c) ? E.merge({}, c) : E.isArray(c) ? c.slice() : c;
  }
  function i(u, c, m) {
    if (E.isUndefined(c)) {
      if (!E.isUndefined(u))
        return r(void 0, u, m);
    } else return r(u, c, m);
  }
  function o(u, c) {
    if (!E.isUndefined(c))
      return r(void 0, c);
  }
  function s(u, c) {
    if (E.isUndefined(c)) {
      if (!E.isUndefined(u))
        return r(void 0, u);
    } else return r(void 0, c);
  }
  function a(u, c, m) {
    if (m in t)
      return r(u, c);
    if (m in e)
      return r(void 0, u);
  }
  const l = {
    url: o,
    method: o,
    data: o,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (u, c) => i(ws(u), ws(c), !0)
  };
  return E.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const m = l[c] || i, S = m(e[c], t[c], c);
    E.isUndefined(S) && m !== a || (n[c] = S);
  }), n;
}
const rl = (e) => {
  const t = Mt({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: o, headers: s, auth: a } = t;
  t.headers = s = Re.from(s), t.url = Ja(nl(t.baseURL, t.url), e.params, e.paramsSerializer), a && s.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let l;
  if (E.isFormData(n)) {
    if (Ne.hasStandardBrowserEnv || Ne.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if ((l = s.getContentType()) !== !1) {
      const [u, ...c] = l ? l.split(";").map((m) => m.trim()).filter(Boolean) : [];
      s.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (Ne.hasStandardBrowserEnv && (r && E.isFunction(r) && (r = r(t)), r || r !== !1 && w2(t.url))) {
    const u = i && o && E2.read(o);
    u && s.set(i, u);
  }
  return t;
}, C2 = typeof XMLHttpRequest < "u", k2 = C2 && function(e) {
  return new Promise(function(n, r) {
    const i = rl(e);
    let o = i.data;
    const s = Re.from(i.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: u } = i, c, m, S, g, h;
    function b() {
      g && g(), h && h(), i.cancelToken && i.cancelToken.unsubscribe(c), i.signal && i.signal.removeEventListener("abort", c);
    }
    let w = new XMLHttpRequest();
    w.open(i.method.toUpperCase(), i.url, !0), w.timeout = i.timeout;
    function T() {
      if (!w)
        return;
      const N = Re.from(
        "getAllResponseHeaders" in w && w.getAllResponseHeaders()
      ), $ = {
        data: !a || a === "text" || a === "json" ? w.responseText : w.response,
        status: w.status,
        statusText: w.statusText,
        headers: N,
        config: e,
        request: w
      };
      tl(function(p) {
        n(p), b();
      }, function(p) {
        r(p), b();
      }, $), w = null;
    }
    "onloadend" in w ? w.onloadend = T : w.onreadystatechange = function() {
      !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(T);
    }, w.onabort = function() {
      w && (r(new te("Request aborted", te.ECONNABORTED, e, w)), w = null);
    }, w.onerror = function() {
      r(new te("Network Error", te.ERR_NETWORK, e, w)), w = null;
    }, w.ontimeout = function() {
      let d = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const $ = i.transitional || Za;
      i.timeoutErrorMessage && (d = i.timeoutErrorMessage), r(new te(
        d,
        $.clarifyTimeoutError ? te.ETIMEDOUT : te.ECONNABORTED,
        e,
        w
      )), w = null;
    }, o === void 0 && s.setContentType(null), "setRequestHeader" in w && E.forEach(s.toJSON(), function(d, $) {
      w.setRequestHeader($, d);
    }), E.isUndefined(i.withCredentials) || (w.withCredentials = !!i.withCredentials), a && a !== "json" && (w.responseType = i.responseType), u && ([S, h] = rr(u, !0), w.addEventListener("progress", S)), l && w.upload && ([m, g] = rr(l), w.upload.addEventListener("progress", m), w.upload.addEventListener("loadend", g)), (i.cancelToken || i.signal) && (c = (N) => {
      w && (r(!N || N.type ? new Qt(null, e, w) : N), w.abort(), w = null);
    }, i.cancelToken && i.cancelToken.subscribe(c), i.signal && (i.signal.aborted ? c() : i.signal.addEventListener("abort", c)));
    const M = g2(i.url);
    if (M && Ne.protocols.indexOf(M) === -1) {
      r(new te("Unsupported protocol " + M + ":", te.ERR_BAD_REQUEST, e));
      return;
    }
    w.send(o || null);
  });
}, T2 = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), i;
    const o = function(u) {
      if (!i) {
        i = !0, a();
        const c = u instanceof Error ? u : this.reason;
        r.abort(c instanceof te ? c : new Qt(c instanceof Error ? c.message : c));
      }
    };
    let s = t && setTimeout(() => {
      s = null, o(new te(`timeout ${t} of ms exceeded`, te.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", o));
    const { signal: l } = r;
    return l.unsubscribe = () => E.asap(a), l;
  }
}, O2 = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, i;
  for (; r < n; )
    i = r + t, yield e.slice(r, i), r = i;
}, A2 = async function* (e, t) {
  for await (const n of P2(e))
    yield* O2(n, t);
}, P2 = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, Es = (e, t, n, r) => {
  const i = A2(e, t);
  let o = 0, s, a = (l) => {
    s || (s = !0, r && r(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: u, value: c } = await i.next();
        if (u) {
          a(), l.close();
          return;
        }
        let m = c.byteLength;
        if (n) {
          let S = o += m;
          n(S);
        }
        l.enqueue(new Uint8Array(c));
      } catch (u) {
        throw a(u), u;
      }
    },
    cancel(l) {
      return a(l), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, br = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", il = br && typeof ReadableStream == "function", x2 = br && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), ol = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, D2 = il && ol(() => {
  let e = !1;
  const t = new Request(Ne.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Ss = 64 * 1024, vi = il && ol(() => E.isReadableStream(new Response("").body)), ir = {
  stream: vi && ((e) => e.body)
};
br && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !ir[t] && (ir[t] = E.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new te(`Response type '${t}' is not supported`, te.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const M2 = async (e) => {
  if (e == null)
    return 0;
  if (E.isBlob(e))
    return e.size;
  if (E.isSpecCompliantForm(e))
    return (await new Request(Ne.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (E.isArrayBufferView(e) || E.isArrayBuffer(e))
    return e.byteLength;
  if (E.isURLSearchParams(e) && (e = e + ""), E.isString(e))
    return (await x2(e)).byteLength;
}, $2 = async (e, t) => {
  const n = E.toFiniteNumber(e.getContentLength());
  return n ?? M2(t);
}, L2 = br && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: i,
    cancelToken: o,
    timeout: s,
    onDownloadProgress: a,
    onUploadProgress: l,
    responseType: u,
    headers: c,
    withCredentials: m = "same-origin",
    fetchOptions: S
  } = rl(e);
  u = u ? (u + "").toLowerCase() : "text";
  let g = T2([i, o && o.toAbortSignal()], s), h;
  const b = g && g.unsubscribe && (() => {
    g.unsubscribe();
  });
  let w;
  try {
    if (l && D2 && n !== "get" && n !== "head" && (w = await $2(c, r)) !== 0) {
      let $ = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), P;
      if (E.isFormData(r) && (P = $.headers.get("content-type")) && c.setContentType(P), $.body) {
        const [p, f] = ys(
          w,
          rr(bs(l))
        );
        r = Es($.body, Ss, p, f);
      }
    }
    E.isString(m) || (m = m ? "include" : "omit");
    const T = "credentials" in Request.prototype;
    h = new Request(t, {
      ...S,
      signal: g,
      method: n.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: T ? m : void 0
    });
    let M = await fetch(h);
    const N = vi && (u === "stream" || u === "response");
    if (vi && (a || N && b)) {
      const $ = {};
      ["status", "statusText", "headers"].forEach((v) => {
        $[v] = M[v];
      });
      const P = E.toFiniteNumber(M.headers.get("content-length")), [p, f] = a && ys(
        P,
        rr(bs(a), !0)
      ) || [];
      M = new Response(
        Es(M.body, Ss, p, () => {
          f && f(), b && b();
        }),
        $
      );
    }
    u = u || "text";
    let d = await ir[E.findKey(ir, u) || "text"](M, e);
    return !N && b && b(), await new Promise(($, P) => {
      tl($, P, {
        data: d,
        headers: Re.from(M.headers),
        status: M.status,
        statusText: M.statusText,
        config: e,
        request: h
      });
    });
  } catch (T) {
    throw b && b(), T && T.name === "TypeError" && /fetch/i.test(T.message) ? Object.assign(
      new te("Network Error", te.ERR_NETWORK, e, h),
      {
        cause: T.cause || T
      }
    ) : te.from(T, T && T.code, e, h);
  }
}), gi = {
  http: Yp,
  xhr: k2,
  fetch: L2
};
E.forEach(gi, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const _s = (e) => `- ${e}`, I2 = (e) => E.isFunction(e) || e === null || e === !1, sl = {
  getAdapter: (e) => {
    e = E.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const i = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let s;
      if (r = n, !I2(n) && (r = gi[(s = String(n)).toLowerCase()], r === void 0))
        throw new te(`Unknown adapter '${s}'`);
      if (r)
        break;
      i[s || "#" + o] = r;
    }
    if (!r) {
      const o = Object.entries(i).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = t ? o.length > 1 ? `since :
` + o.map(_s).join(`
`) : " " + _s(o[0]) : "as no adapter specified";
      throw new te(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: gi
};
function Zr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Qt(null, e);
}
function Cs(e) {
  return Zr(e), e.headers = Re.from(e.headers), e.data = Jr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), sl.getAdapter(e.adapter || On.adapter)(e).then(function(r) {
    return Zr(e), r.data = Jr.call(
      e,
      e.transformResponse,
      r
    ), r.headers = Re.from(r.headers), r;
  }, function(r) {
    return el(r) || (Zr(e), r && r.response && (r.response.data = Jr.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = Re.from(r.response.headers))), Promise.reject(r);
  });
}
const al = "1.7.7", Ji = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ji[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const ks = {};
Ji.transitional = function(t, n, r) {
  function i(o, s) {
    return "[Axios v" + al + "] Transitional option '" + o + "'" + s + (r ? ". " + r : "");
  }
  return (o, s, a) => {
    if (t === !1)
      throw new te(
        i(s, " has been removed" + (n ? " in " + n : "")),
        te.ERR_DEPRECATED
      );
    return n && !ks[s] && (ks[s] = !0, console.warn(
      i(
        s,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, s, a) : !0;
  };
};
function N2(e, t, n) {
  if (typeof e != "object")
    throw new te("options must be an object", te.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const o = r[i], s = t[o];
    if (s) {
      const a = e[o], l = a === void 0 || s(a, o, e);
      if (l !== !0)
        throw new te("option " + o + " must be " + l, te.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new te("Unknown option " + o, te.ERR_BAD_OPTION);
  }
}
const yi = {
  assertOptions: N2,
  validators: Ji
}, vt = yi.validators;
class Pt {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new vs(),
      response: new vs()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i;
        Error.captureStackTrace ? Error.captureStackTrace(i = {}) : i = new Error();
        const o = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Mt(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: o } = n;
    r !== void 0 && yi.assertOptions(r, {
      silentJSONParsing: vt.transitional(vt.boolean),
      forcedJSONParsing: vt.transitional(vt.boolean),
      clarifyTimeoutError: vt.transitional(vt.boolean)
    }, !1), i != null && (E.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : yi.assertOptions(i, {
      encode: vt.function,
      serialize: vt.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = o && E.merge(
      o.common,
      o[n.method]
    );
    o && E.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete o[h];
      }
    ), n.headers = Re.concat(s, o);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(b) {
      typeof b.runWhen == "function" && b.runWhen(n) === !1 || (l = l && b.synchronous, a.unshift(b.fulfilled, b.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(b) {
      u.push(b.fulfilled, b.rejected);
    });
    let c, m = 0, S;
    if (!l) {
      const h = [Cs.bind(this), void 0];
      for (h.unshift.apply(h, a), h.push.apply(h, u), S = h.length, c = Promise.resolve(n); m < S; )
        c = c.then(h[m++], h[m++]);
      return c;
    }
    S = a.length;
    let g = n;
    for (m = 0; m < S; ) {
      const h = a[m++], b = a[m++];
      try {
        g = h(g);
      } catch (w) {
        b.call(this, w);
        break;
      }
    }
    try {
      c = Cs.call(this, g);
    } catch (h) {
      return Promise.reject(h);
    }
    for (m = 0, S = u.length; m < S; )
      c = c.then(u[m++], u[m++]);
    return c;
  }
  getUri(t) {
    t = Mt(this.defaults, t);
    const n = nl(t.baseURL, t.url);
    return Ja(n, t.params, t.paramsSerializer);
  }
}
E.forEach(["delete", "get", "head", "options"], function(t) {
  Pt.prototype[t] = function(n, r) {
    return this.request(Mt(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
E.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, s, a) {
      return this.request(Mt(a || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  Pt.prototype[t] = n(), Pt.prototype[t + "Form"] = n(!0);
});
class Zi {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let o;
      const s = new Promise((a) => {
        r.subscribe(a), o = a;
      }).then(i);
      return s.cancel = function() {
        r.unsubscribe(o);
      }, s;
    }, t(function(o, s, a) {
      r.reason || (r.reason = new Qt(o, s, a), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Zi(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
}
function R2(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function B2(e) {
  return E.isObject(e) && e.isAxiosError === !0;
}
const bi = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(bi).forEach(([e, t]) => {
  bi[t] = e;
});
function ll(e) {
  const t = new Pt(e), n = Fa(Pt.prototype.request, t);
  return E.extend(n, Pt.prototype, t, { allOwnKeys: !0 }), E.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return ll(Mt(e, i));
  }, n;
}
const Se = ll(On);
Se.Axios = Pt;
Se.CanceledError = Qt;
Se.CancelToken = Zi;
Se.isCancel = el;
Se.VERSION = al;
Se.toFormData = yr;
Se.AxiosError = te;
Se.Cancel = Se.CanceledError;
Se.all = function(t) {
  return Promise.all(t);
};
Se.spread = R2;
Se.isAxiosError = B2;
Se.mergeConfig = Mt;
Se.AxiosHeaders = Re;
Se.formToJSON = (e) => Qa(E.isHTMLForm(e) ? new FormData(e) : e);
Se.getAdapter = sl.getAdapter;
Se.HttpStatusCode = bi;
Se.default = Se;
const An = Se.create({
  baseURL: "/",
  timeout: 100 * 1e3,
  withCredentials: !0,
  headers: {
    common: {
      "X-Requested-With": "XMLHttpRequest"
    },
    post: {
      "Content-Type": "application/json;charset=utf-8"
    }
  }
});
An.interceptors.request.use(
  (e) => {
    try {
      if (parent.window) {
        const t = parent.window.localStorage.getItem("authorizationKey"), n = parent.window.localStorage.getItem("authorizationValue");
        parent.window.localStorage.getItem("flowtoken"), e.headers.flowtoken = parent.window.localStorage.getItem("flowtoken"), e.headers[t] = n;
      } else
        console.error("只在在流程中心用iframe打开，才能获取token!");
    } catch (t) {
      e.headers.flowtoken = localStorage.getItem("flowtoken");
      const n = window.localStorage.getItem("authorizationKey");
      e.headers[n] = window.localStorage.getItem("authorizationValue"), console.error("获取父窗口的token失败！" + t);
    }
    return e;
  },
  (e) => Promise.reject(e)
);
An.interceptors.response.use(
  (e) => {
    if (e && e.status == 200) {
      const t = e.data.code, n = e.data.msg;
      return t === "100" ? Promise.resolve(e.data) : t == 400 ? Promise.reject(n) : t === "101" ? (jt.error(n), Promise.reject(n)) : Promise.reject(e.data);
    } else
      return Promise.reject(e == null ? void 0 : e.data);
  },
  (e) => Promise.reject(e)
);
const F2 = "", rn = F2 + "/flow/query", Qi = {
  /**
   * 通过业务单据id获取当前任务的审批人列表
   */
  GetCurrTaskApplyersByBusinessKey: rn + "/getCurrTaskApplyersByBusinessKey",
  /**
   * 预览自定义流程图
   */
  GetCustomFlowSequenceFlows: rn + "/getCustomFlowSequenceFlows",
  /**
   * 获取高亮线和节点
   */
  GetHighLightedNodeVoByProcessInstanceId: rn + "/getHighLightedNodeVoByProcessInstanceId",
  /**
   * 查询节点信息
   */
  GetOneActivityVoByProcessInstanceIdAndActivityId: rn + "/getOneActivityVoByProcessInstanceIdAndActivityId",
  /**
   * 根据ModelKey查询模板信息
   */
  GetBpmnByModelKey: rn + "/getBpmnByModelKey"
};
function z2(e) {
  return An({
    method: "GET",
    url: Qi.GetHighLightedNodeVoByProcessInstanceId + "/" + e,
    params: {}
  });
}
function j2(e) {
  return An({
    method: "GET",
    url: Qi.GetOneActivityVoByProcessInstanceIdAndActivityId + "/" + e.procInstId + "/" + e.elementId,
    params: {}
  });
}
function V2(e) {
  return An({
    method: "GET",
    url: Qi.GetBpmnByModelKey + "/" + e,
    params: {}
  });
}
function H2(e) {
  return pr(e, "flowable:Field");
}
function U2(e, t) {
  return pr(e).find((n) => Q(n, t));
}
function kt(e, t, n = {}) {
  const r = H2(e), i = t.reduce((s, a) => {
    const [l, u = "string"] = a.split(".");
    return s[l] = u, s;
  }, {}), o = {};
  for (const s of r) {
    const a = s.get("name");
    if (i[a]) {
      const l = n[a];
      l ? o[a] = l(s) : o[a] = s.get(i[a]);
    }
  }
  return o;
}
function q2(e) {
  return Et(e, "bpmn:ErrorEventDefinition");
}
function W2(e) {
  if (!e)
    return;
  if (typeof e.get("timeDate") < "u")
    return "timeDate";
  if (typeof e.get("timeCycle") < "u")
    return "timeCycle";
  if (typeof e.get("timeDuration") < "u")
    return "timeDuration";
}
function K2(e) {
  return Et(e, "bpmn:TimerEventDefinition");
}
function Et(e, t) {
  return (bn(e).get("eventDefinitions") || []).find((i) => Q(i, t));
}
function G2(e) {
  return Q(e, "bpmn:ReceiveTask") ? bn(e) : Et(e, "bpmn:MessageEventDefinition");
}
function Y2(e) {
  return Et(e, "bpmn:SignalEventDefinition");
}
function wi(e) {
  return Et(e, "bpmn:ConditionalEventDefinition");
}
function X2(e) {
  return Et(e, "bpmn:EscalationEventDefinition");
}
function J2(e) {
  return Et(e, "bpmn:CompensateEventDefinition");
}
function Z2(e) {
  return Et(e, "bpmn:TerminateEventDefinition");
}
function cl(e) {
  return pr(
    bn(e),
    "flowable:VariableListenerEventDefinition"
  )[0];
}
const Q2 = ["bpmn:UserTask"], ul = [
  "bpmn:ServiceTask",
  "bpmn:SequenceFlow",
  "bpmn:ScriptTask",
  "bpmn:CallActivity",
  "bpmn:StartEvent",
  "bpmn:EndEvent",
  "bpmn:IntermediateThrowEvent",
  "bpmn:IntermediateCatchEvent"
], Ts = (e) => e.type !== "label" && ti(e, Q2), Os = (e) => e.type === "label" ? !1 : Q(e, "bpmn:SequenceFlow") ? dl(e) : ti(e, [
  "bpmn:EndEvent",
  "bpmn:StartEvent",
  "bpmn:IntermediateThrowEvent",
  "bpmn:IntermediateCatchEvent"
]) ? !rm(e) : ti(e, ul), em = {
  "bpmn:UserTask": {
    custom: !0
  }
}, tm = {
  "bpmn:ServiceTask": (e) => {
    var u;
    const t = e.businessObject, n = t.get("name"), r = n || e.type.replace(/bpmn:|flowable:/, ""), i = ["nodeType"], o = {
      nodeType: e.type
    }, s = {}, a = [];
    n || a.push("header");
    const l = t.get("type");
    if (l)
      switch (i.push("serviceType"), a.push("serviceType"), o.serviceType = l, s.serviceType = "arcoblue", l) {
        case "rest":
          i.push("requestMethod", "requestUrl", "requestBody"), Object.assign(
            o,
            kt(t, ["requestMethod", "requestUrl", "requestBody.expression"])
          );
          break;
        case "copy":
          i.push("transferToUserNos");
          const c = U2(t, "flowable:IdmCandidateUsers"), m = c == null ? void 0 : c.get("body");
          m ? o.transferToUserNos = (u = JSON.parse(m)) == null ? void 0 : u.map((S) => S.name).join(",") : Object.assign(o, kt(t, ["transferToUserNos"])), s.transferToUserNos = "arcoblue";
          break;
        case "http":
          i.push("requestUrl", "requestMethod"), Object.assign(o, kt(t, ["requestUrl", "requestMethod"]));
          break;
        case "dmn":
          i.push("decisionTableReferenceName"), Object.assign(o, kt(t, ["decisionTableReferenceName"])), s.decisionTableReferenceName = "arcoblue";
          break;
        case "sc":
          i.push("serviceId", "url", "method"), Object.assign(o, kt(t, ["serviceId", "url", "method"]));
          break;
        case "dubbo":
          i.push("applicationName", "clazzName", "method", "version", "type"), Object.assign(
            o,
            kt(t, ["applicationName", "clazzName", "method", "version", "type"])
          );
          break;
        case "email":
          i.push("mailTo", "subject", "mailContent"), Object.assign(
            o,
            kt(t, ["to.expression", "subject", "html.expression"])
          );
          break;
      }
    return { loading: !1, header: r, attrs: i, values: o, tags: s, i18n: a };
  },
  "bpmn:ScriptTask": (e) => {
    const t = e.businessObject, n = t.get("name"), r = n || e.type.replace("bpmn:", ""), i = ["scriptFormat"], o = {
      scriptFormat: t.scriptFormat
    }, s = {}, a = [];
    return n || a.push("header"), { loading: !1, header: r, attrs: i, values: o, tags: s, i18n: a };
  },
  "bpmn:CallActivity": (e) => {
    const t = e.businessObject, n = t.get("name"), r = n || e.type.replace("bpmn:", ""), i = ["calledInstance", "inheritVariables"], o = {
      calledInstance: t.get("processInstanceName"),
      inheritVariables: t.get("inheritVariables") || "false"
    }, s = { calledInstance: "arcoblue" }, a = ["inheritVariables"];
    return n || a.push("header"), { loading: !1, header: r, attrs: i, values: o, tags: s, i18n: a };
  },
  "bpmn:SequenceFlow": (e) => {
    const n = e.businessObject.get("name"), r = n || e.type.replace("bpmn:", ""), i = ["condition"], o = dl(e), s = {
      condition: o == null ? void 0 : o.get("body")
    }, a = {}, l = [];
    return n || l.push("header"), { loading: !1, header: r, attrs: i, values: s, tags: a, i18n: l };
  },
  "bpmn:StartEvent": zn,
  "bpmn:EndEvent": zn,
  "bpmn:IntermediateThrowEvent": zn,
  "bpmn:IntermediateCatchEvent": zn
};
function zn(e) {
  var M, N, d, $, P;
  const n = e.businessObject.get("name"), r = !1, i = n || e.type.replace("bpmn:", ""), o = ["eventDefinition"], s = {}, a = { eventDefinition: "arcoblue" }, l = ["eventDefinition"];
  n || l.push("header");
  const u = q2(e);
  if (u)
    return o.push("eventDefinitionName"), s.eventDefinition = "Error", s.eventDefinitionName = ((M = u.get("errorRef")) == null ? void 0 : M.name) || "-", { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  const c = Y2(e);
  if (c)
    return o.push("eventDefinitionName"), s.eventDefinition = "Signal", s.eventDefinitionName = ((N = c.get("signalRef")) == null ? void 0 : N.name) || "-", { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  const m = G2(e);
  if (m)
    return o.push("eventDefinitionName"), s.eventDefinition = "Message", s.eventDefinitionName = ((d = m.get("messageRef")) == null ? void 0 : d.name) || "-", { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  const S = X2(e);
  if (S)
    return o.push("eventDefinitionName"), s.eventDefinition = "Escalation", s.eventDefinitionName = (($ = S.get("escalationRef")) == null ? void 0 : $.name) || "-", { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  if (J2(e))
    return s.eventDefinition = "Compensate", { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  if (Z2(e))
    return o.push("terminateAll"), s.eventDefinition = "Terminate", s.terminateAll = S.terminateAll || "-", { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  const b = cl(e);
  if (b)
    return o.push("variableName", "variableChangeType"), l.push("variableChangeType"), s.eventDefinition = "VariableListener", s.variableName = b.get("variableName") || "-", s.variableChangeType = `var-${b.get("variableChangeType") || "-"}`, { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  const w = wi(e);
  if (w)
    return o.push("conditionExpression"), s.eventDefinition = "Conditional", s.conditionExpression = ((P = w.get("condition")) == null ? void 0 : P.body) || "-", { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  const T = K2(e);
  if (T) {
    s.eventDefinition = "Timer", o.push("timerDefinitionType", "timerEventDefValue"), l.push("timerDefinitionType");
    const p = W2(T) || "";
    return s.timerDefinitionType = p, s.timerEventDefValue = p ? nm(T.get(p)) : "-", { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
  }
  return { loading: r, i18n: l, header: i, attrs: o, values: s, tags: a };
}
function nm(e) {
  return e && e.get("body") || "";
}
function rm(e) {
  return cl(e) ? !1 : !e.businessObject.eventDefinitions || !e.businessObject.eventDefinitions.length;
}
function dl(e) {
  const t = bn(e);
  if (Q(t, "bpmn:SequenceFlow"))
    return t.get("conditionExpression");
  if (wi(t))
    return wi(t).get("condition");
}
const im = { class: "bpmn-preset-viewer" }, om = { class: "node-details_wrap" }, sm = {
  key: 0,
  class: "node-details-info"
}, am = { class: "details_header" }, lm = { class: "details_label" }, cm = { class: "details_value" }, um = { style: { "padding-right": "8px" } }, dm = { class: "person-information-grid" }, fm = { class: "details_special" }, pm = { class: "header-person-img" }, mm = ["src"], hm = { class: "details_label" }, vm = {
  class: "details_value",
  style: { display: "inline-flex", "align-items": "center" }
}, gm = { class: "details_label" }, ym = { class: "details_value" }, bm = { class: "details_label" }, wm = { class: "details_value" }, Em = { class: "details_label" }, Sm = { class: "details_value long" }, _m = { class: "details_label" }, Cm = { class: "details_value long" }, km = { class: "details_label" }, Tm = { class: "details_value" }, Om = { class: "details_label" }, Am = { class: "details_value" }, Pm = { class: "details_label" }, xm = { class: "details_value" }, Dm = { class: "details_label" }, Mm = { class: "details_value" }, $m = { class: "details_header" }, Lm = { class: "details_label" }, Im = { class: "details_value" }, Nm = { key: 1 }, yh = /* @__PURE__ */ ve({
  name: "BpmnPresetViewer",
  __name: "index",
  props: {
    procInstId: {
      type: String,
      required: !0
    },
    modelKey: {
      type: String,
      required: !0
    },
    theme: {
      type: String,
      default: "light"
    },
    local: {
      type: String,
      default: "zh_CN"
    },
    translatePrefix: {
      type: String,
      default: ""
    },
    toolbar: {
      type: Boolean,
      default: !0
    },
    showDownload: {
      type: Boolean,
      default: !1
    },
    fileName: {
      type: String,
      default: ""
    }
  },
  emits: ["viewer-init", "element-hover", "data-change"],
  setup(e, { expose: t, emit: n }) {
    const r = n, i = e, { locale: o, t: s } = Si(), a = me(), l = me(!1), u = me([]), c = me({}), m = {
      processing: "arcoblue",
      finish: "green",
      pending: "orangered"
    }, S = fn(), g = (p) => p ? i.translatePrefix + p : "-", h = (p) => {
      if (p)
        return document.body.setAttribute("arco-theme", p);
      const f = document.body.getAttribute("arco-theme") === "dark";
      document.body.setAttribute("arco-theme", f ? "light" : "dark");
    }, b = (p) => {
      var f;
      p ? o.value = p : o.value = o.value === "zh_CN" ? "en_US" : "zh_CN", Fi("local-lang", o.value), (f = S.value) == null || f.get("eventBus").fire("i18n.changed");
    }, w = () => {
      var f;
      const p = (f = S.value) == null ? void 0 : f.get("elementRegistry");
      p && (u.value = p.filter((v) => Ts(v) || Os(v)).map((v) => v.id));
    }, T = (p) => (S.value = p) && r("viewer-init", p), M = async (p, f) => {
      var v, k;
      try {
        if (!i.procInstId)
          return;
        const { data: x = {} } = await j2({
          procInstId: i.procInstId,
          elementId: f
        }), O = em[p];
        if (O.custom) {
          c.value[f] = {
            loading: !1,
            custom: !0,
            ...x
          };
          return;
        }
        const q = {
          loading: !1,
          header: x[O.header],
          attrs: O.attrs
        }, R = {}, ae = {};
        for (const C of O.attrs)
          (v = O.formatters) != null && v[C] ? R[C] = O.formatters[C](x) : R[C] = x[C], (k = O.useTag) != null && k[C] && (ae[C] = typeof O.useTag[C] == "function" ? O.useTag[C](x) : O.useTag[C]);
        c.value[f] = { ...q, values: R, tags: ae };
      } catch (x) {
        jt.error((x == null ? void 0 : x.message) || "请求失败");
      } finally {
        c.value[f].loading = !1;
      }
    }, N = (p) => {
      if (!c.value[p.id]) {
        if (Ts(p) && i.procInstId)
          return c.value[p.id] = { loading: !0 }, M(p.type, p.id);
        if (Os(p))
          for (const f of ul)
            Q(p, f) && (c.value[p.id] = tm[f](p));
      }
    }, d = async (p, f) => {
      var v, k, x, O, q;
      if ((v = S.value) == null || v.clear(), !p && !f) {
        jt.error("modelKey和procInstId不能同时为空！");
        return;
      }
      try {
        await ei(), u.value = [], c.value = {}, l.value = !0;
        const { data: R, success: ae, msg: C } = f ? await z2(f) : await V2(p);
        if (ae) {
          const {
            activeActivityIds: A = [],
            hisActiveActivityIds: B = [],
            modelXml: z,
            highLightedFlows: Y = []
          } = R || {};
          if (!z) return;
          await ((k = a.value) == null ? void 0 : k.createNewProcess(z)), f && ((x = a.value) == null || x.setPassedNodes([...Y, ...B]), (O = a.value) == null || O.setActiveNodes([...A]), (q = a.value) == null || q.setProcessingMarker([...A]), w());
        } else
          jt.error(C);
        r("data-change", R);
      } finally {
        l.value = !1;
      }
    };
    return ze(
      () => i.local,
      (p) => b(p),
      { immediate: !0 }
    ), ze(
      () => i.theme,
      (p) => h(p),
      { immediate: !0 }
    ), ze(
      () => ({ procInstId: i.procInstId, modelKey: i.modelKey }),
      ({ procInstId: p, modelKey: f }) => d(f, p),
      { immediate: !0 }
    ), t({ reloadViewerXML: d, downloadProcess: async (p, f) => {
      var v;
      (v = a.value) == null || v.downloadProcess(p, f);
    }, toggleTheme: h, toggleLang: b, downloadProcessAsPng: async (p) => {
      var f;
      (f = a.value) == null || f.downloadProcessAsPng(p);
    } }), (p, f) => {
      const v = cp, k = op, x = tp, O = Gf, q = Vf;
      return U(), ie("div", im, [
        X(s1, {
          ref_key: "viewer",
          ref: a,
          loading: D(l),
          theme: e.theme,
          local: e.local,
          "translate-prefix": e.translatePrefix,
          "show-download": e.showDownload,
          toolbar: e.toolbar,
          "file-name": e.fileName,
          "in-preset": "",
          onViewerInit: T,
          onViewerDestroy: T,
          onElementHover: N
        }, null, 8, ["loading", "theme", "local", "translate-prefix", "show-download", "toolbar", "file-name"]),
        (U(!0), ie(lt, null, Sr(D(u), (R) => (U(), Ee(q, {
          key: R,
          "selector-parent": D(a).$el,
          "z-index": 8888,
          target: `[data-element-id=${R}]`
        }, {
          default: ue(() => [
            X(D(xi), {
              loading: D(c)[R] && D(c)[R].loading
            }, {
              default: ue(() => {
                var ae;
                return [
                  G("div", om, [
                    D(c)[R] ? (U(), ie("div", sm, [
                      D(c)[R].custom ? (U(), ie(lt, { key: 0 }, [
                        G("div", am, re(D(c)[R].name), 1),
                        G("div", lm, re(D(s)(g("approver"))), 1),
                        G("div", cm, [
                          G("div", {
                            class: "approval-user-list",
                            style: bt({ "--approval-num": D(c)[R].approvalVos.length })
                          }, [
                            (U(!0), ie(lt, null, Sr(D(c)[R].approvalVos, (C) => (U(), Ee(D(Bt), {
                              key: C.code,
                              position: "bottom",
                              style: { zIndex: 9999 },
                              title: D(s)(g("Personnel information"))
                            }, {
                              content: ue(() => [
                                G("div", dm, [
                                  G("div", fm, [
                                    G("div", pm, [
                                      C.headerImg ? (U(), ie("img", {
                                        key: 0,
                                        src: C.headerImg,
                                        alt: "image"
                                      }, null, 8, mm)) : ke("", !0),
                                      !C.headerImg && C.sex === 1 ? (U(), Ee(v, { key: 1 })) : ke("", !0),
                                      !C.headerImg && C.sex === 2 ? (U(), Ee(k, { key: 2 })) : ke("", !0)
                                    ])
                                  ]),
                                  G("div", hm, re(D(s)(g("Person name"))), 1),
                                  G("div", vm, [
                                    G("span", null, re(C.name), 1),
                                    C.sex === 1 ? (U(), Ee(x, {
                                      key: 0,
                                      color: "#0099FF"
                                    })) : ke("", !0),
                                    C.sex === 2 ? (U(), Ee(O, {
                                      key: 1,
                                      color: "#FF99CC"
                                    })) : ke("", !0)
                                  ]),
                                  G("div", gm, re(D(s)(g("Job number"))), 1),
                                  G("div", ym, re(C.code), 1),
                                  G("div", bm, re(D(s)(g("Mobile phone"))), 1),
                                  G("div", wm, re(C.mobile || "-"), 1),
                                  G("div", Em, re(D(s)(g("Mail"))), 1),
                                  G("div", Sm, re(C.email || "-"), 1),
                                  G("div", _m, re(D(s)(g("Affiliation"))), 1),
                                  G("div", Cm, re(`${C.companyName || "-"}${C.deptName ? " - " + C.deptName : ""}`), 1)
                                ])
                              ]),
                              default: ue(() => [
                                X(D(Br), {
                                  size: "small",
                                  color: C.status ? "arcoblue" : "orangered"
                                }, {
                                  default: ue(() => [
                                    G("span", um, re(C.name), 1),
                                    C.status ? (U(), Ee(D(Ud), {
                                      key: 0,
                                      size: 12
                                    })) : (U(), Ee(D(qd), {
                                      key: 1,
                                      size: 12
                                    }))
                                  ]),
                                  _: 2
                                }, 1032, ["color"])
                              ]),
                              _: 2
                            }, 1032, ["title"]))), 128))
                          ], 4)
                        ]),
                        G("div", km, re(D(s)(g("statusName"))), 1),
                        G("div", Tm, [
                          X(D(Br), {
                            color: m[D(c)[R].status] || "arcoblue"
                          }, {
                            default: ue(() => [
                              Ue(re(D(c)[R].statusName || "-"), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ]),
                        G("div", Om, re(D(s)(g("startDate"))), 1),
                        G("div", Am, re(D(c)[R].startDate || "-"), 1),
                        G("div", Pm, re(D(s)(g("endDate"))), 1),
                        G("div", xm, re(D(c)[R].status === "processing" ? "-" : D(c)[R].endDate || "-"), 1),
                        G("div", Dm, re(D(s)(g("duration"))), 1),
                        G("div", Mm, re(D(c)[R].status === "processing" ? "-" : D(c)[R].duration || "-"), 1)
                      ], 64)) : (U(), ie(lt, { key: 1 }, [
                        G("div", $m, re((ae = D(c)[R].i18n) != null && ae.includes("header") ? D(s)(D(c)[R].header) : D(c)[R].header), 1),
                        (U(!0), ie(lt, null, Sr(D(c)[R].attrs, (C) => {
                          var A, B, z, Y, ee;
                          return U(), ie(lt, { key: C }, [
                            G("div", Lm, re(D(s)(g(C))), 1),
                            G("div", Im, [
                              (A = D(c)[R].tags) != null && A[C] ? (U(), Ee(D(Br), {
                                key: 0,
                                size: "small",
                                color: ((B = D(c)[R].tags) == null ? void 0 : B[C]) || "arcoblue"
                              }, {
                                default: ue(() => {
                                  var ne, ye, le;
                                  return [
                                    Ue(re((ne = D(c)[R].i18n) != null && ne.includes(C) ? D(s)(g((ye = D(c)[R].values) == null ? void 0 : ye[C])) : ((le = D(c)[R].values) == null ? void 0 : le[C]) || "-"), 1)
                                  ];
                                }),
                                _: 2
                              }, 1032, ["color"])) : (U(), ie("span", Nm, re((z = D(c)[R].i18n) != null && z.includes(C) ? D(s)(g((Y = D(c)[R].values) == null ? void 0 : Y[C])) : ((ee = D(c)[R].values) == null ? void 0 : ee[C]) || "-"), 1))
                            ])
                          ], 64);
                        }), 128))
                      ], 64))
                    ])) : ke("", !0)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["loading"])
          ]),
          _: 2
        }, 1032, ["selector-parent", "target"]))), 128))
      ]);
    };
  }
});
export {
  gh as BpmnMocker,
  yh as BpmnPresetViewer,
  s1 as BpmnViewer,
  Vf as TippyPopover
};
