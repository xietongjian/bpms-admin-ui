var Ul = Object.defineProperty;
var Wl = (e, t, n) => t in e ? Ul(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var J = (e, t, n) => Wl(e, typeof t != "symbol" ? t + "" : t, n);
import { ref as re, reactive as _r, inject as St, computed as Z, getCurrentInstance as ql, cloneVNode as Js, defineComponent as be, openBlock as x, createElementBlock as Q, normalizeClass as fe, renderSlot as Oe, normalizeStyle as Ye, createElementVNode as j, toRef as Si, toRefs as $n, resolveComponent as Te, createBlock as ve, createCommentVNode as me, provide as Zs, onMounted as lt, onUpdated as Cr, watch as Re, onBeforeUnmount as tn, readonly as Kl, onDeactivated as Yl, createVNode as H, Fragment as _t, Teleport as Qs, mergeProps as yn, Transition as bo, withDirectives as rt, vShow as ot, nextTick as dr, withCtx as ie, createTextVNode as Ne, toDisplayString as se, withModifiers as wo, onUnmounted as ea, TransitionGroup as Gl, isVNode as Xl, render as fr, shallowRef as Cn, unref as I, h as _i, renderList as Ho, isRef as Jl, createStaticVNode as ta } from "vue";
import { is as oe, getBusinessObject as xn, isAny as Eo } from "bpmn-js/lib/util/ModelUtil";
import na from "bpmn-js/lib/NavigatedViewer";
import ra from "diagram-js-grid-bg";
import Zl from "bpmn-js-token-simulation/lib/animation";
import Ql from "bpmn-js-token-simulation/lib/features/colored-scopes";
import ec from "bpmn-js-token-simulation/lib/features/context-pads";
import tc from "bpmn-js-token-simulation/lib/features/simulation-state";
import nc from "bpmn-js-token-simulation/lib/features/show-scopes";
import rc from "bpmn-js-token-simulation/lib/features/token-count";
import oc from "bpmn-js-token-simulation/lib/features/exclusive-gateway-settings";
import ic from "bpmn-js-token-simulation/lib/features/inclusive-gateway-settings";
import sc from "bpmn-js-token-simulation/lib/features/palette";
import ac from "bpmn-js-token-simulation/lib/simulator/Scope";
import { ScopeTraits as Ci } from "bpmn-js-token-simulation/lib/simulator/ScopeTraits";
import { filterSet as Un, findSet as ki } from "bpmn-js-token-simulation/lib/simulator/util/SetUtil";
import { eventsMatch as Ti } from "bpmn-js-token-simulation/lib/simulator/util/EventsUtil";
import { isInterrupting as lc, isBoundaryEvent as tr, is as Le, isStartEvent as Fr, isEventSubProcess as Oi, isCompensationEvent as Ai, getBusinessObject as cc, isAny as oa, isImplicitStartEvent as uc } from "bpmn-js-token-simulation/lib/simulator/util/ModelUtil";
import dc from "bpmn-js-token-simulation/lib/simulator/behaviors";
import { SCOPE_CREATE_EVENT as kr, RESET_SIMULATION_EVENT as In, TOGGLE_MODE_EVENT as nn, TRACE_EVENT as ia, PAUSE_SIMULATION_EVENT as fc, PLAY_SIMULATION_EVENT as pc, SCOPE_FILTER_CHANGED_EVENT as mc, SCOPE_DESTROYED_EVENT as hc } from "bpmn-js-token-simulation/lib/util/EventHelper";
import sa from "bpmn-js-token-simulation/lib/features/scope-filter";
import vc from "bpmn-js-token-simulation/lib/features/element-colors";
import yc from "bpmn-js-token-simulation/lib/features/element-support/ElementSupport";
import { escapeHTML as gc } from "diagram-js/lib/util/EscapeUtil";
import { isAny as bc } from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import wc from "bpmn-js/lib/draw/BpmnRenderer";
import { getDi as Pi, getStrokeColor as Ee, getFillColor as $e, getSemantic as zr, isThrowEvent as Ec, isTypedEvent as tt, black as Di } from "bpmn-js/lib/draw/BpmnRenderUtil";
import { rotate as Sc } from "diagram-js/lib/util/SvgTransformUtil";
import _c from "bpmn-js/lib/draw/PathMap";
import Cc from "bpmn-js-i18n-zh/lib/bpmn-js";
import { useI18n as rn } from "vue-i18n";
import kc from "bpmn-js/lib/features/modeling";
const Mn = Object.prototype.toString;
function Uo(e) {
  return Mn.call(e) === "[object Array]";
}
function $i(e) {
  return Mn.call(e) === "[object Boolean]";
}
const xi = (e) => Mn.call(e) === "[object Promise]";
function Tr(e) {
  return Mn.call(e) === "[object String]";
}
function mt(e) {
  return Mn.call(e) === "[object Number]" && e === e;
}
function Tc(e) {
  return e === void 0;
}
function pt(e) {
  return typeof e == "function";
}
const Bn = Symbol("ArcoConfigProvider"), Wn = {
  formatYear: "YYYY 年",
  formatMonth: "YYYY 年 MM 月",
  today: "今天",
  view: {
    month: "月",
    year: "年",
    week: "周",
    day: "日"
  },
  month: {
    long: {
      January: "一月",
      February: "二月",
      March: "三月",
      April: "四月",
      May: "五月",
      June: "六月",
      July: "七月",
      August: "八月",
      September: "九月",
      October: "十月",
      November: "十一月",
      December: "十二月"
    },
    short: {
      January: "一月",
      February: "二月",
      March: "三月",
      April: "四月",
      May: "五月",
      June: "六月",
      July: "七月",
      August: "八月",
      September: "九月",
      October: "十月",
      November: "十一月",
      December: "十二月"
    }
  },
  week: {
    long: {
      self: "周",
      monday: "周一",
      tuesday: "周二",
      wednesday: "周三",
      thursday: "周四",
      friday: "周五",
      saturday: "周六",
      sunday: "周日"
    },
    short: {
      self: "周",
      monday: "一",
      tuesday: "二",
      wednesday: "三",
      thursday: "四",
      friday: "五",
      saturday: "六",
      sunday: "日"
    }
  }
}, Oc = {
  locale: "zh-CN",
  empty: {
    description: "暂无数据"
  },
  drawer: {
    okText: "确定",
    cancelText: "取消"
  },
  popconfirm: {
    okText: "确定",
    cancelText: "取消"
  },
  modal: {
    okText: "确定",
    cancelText: "取消"
  },
  pagination: {
    goto: "前往",
    page: "页",
    countPerPage: "条/页",
    total: "共 {0} 条"
  },
  table: {
    okText: "确定",
    resetText: "重置"
  },
  upload: {
    start: "开始",
    cancel: "取消",
    delete: "删除",
    retry: "点击重试",
    buttonText: "点击上传",
    preview: "预览",
    drag: "点击或拖拽文件到此处上传",
    dragHover: "释放文件并开始上传",
    error: "上传失败"
  },
  calendar: Wn,
  datePicker: {
    view: Wn.view,
    month: Wn.month,
    week: Wn.week,
    placeholder: {
      date: "请选择日期",
      week: "请选择周",
      month: "请选择月份",
      year: "请选择年份",
      quarter: "请选择季度",
      time: "请选择时间"
    },
    rangePlaceholder: {
      date: ["开始日期", "结束日期"],
      week: ["开始周", "结束周"],
      month: ["开始月份", "结束月份"],
      year: ["开始年份", "结束年份"],
      quarter: ["开始季度", "结束季度"],
      time: ["开始时间", "结束时间"]
    },
    selectTime: "选择时间",
    today: "今天",
    now: "此刻",
    ok: "确定"
  },
  image: {
    loading: "加载中"
  },
  imagePreview: {
    fullScreen: "全屏",
    rotateRight: "向右旋转",
    rotateLeft: "向左旋转",
    zoomIn: "放大",
    zoomOut: "缩小",
    originalSize: "原始尺寸"
  },
  typography: {
    copied: "已复制",
    copy: "复制",
    expand: "展开",
    collapse: "折叠",
    edit: "编辑"
  },
  form: {
    validateMessages: {
      required: "#{field} 是必填项",
      type: {
        string: "#{field} 不是合法的文本类型",
        number: "#{field} 不是合法的数字类型",
        boolean: "#{field} 不是合法的布尔类型",
        array: "#{field} 不是合法的数组类型",
        object: "#{field} 不是合法的对象类型",
        url: "#{field} 不是合法的 url 地址",
        email: "#{field} 不是合法的邮箱地址",
        ip: "#{field} 不是合法的 IP 地址"
      },
      number: {
        min: "`#{value}` 小于最小值 `#{min}`",
        max: "`#{value}` 大于最大值 `#{max}`",
        equal: "`#{value}` 不等于 `#{equal}`",
        range: "`#{value}` 不在 `#{min} ~ #{max}` 范围内",
        positive: "`#{value}` 不是正数",
        negative: "`#{value}` 不是负数"
      },
      array: {
        length: "`#{field}` 个数不等于 #{length}",
        minLength: "`#{field}` 个数最少为 #{minLength}",
        maxLength: "`#{field}` 个数最多为 #{maxLength}",
        includes: "#{field} 不包含 #{includes}",
        deepEqual: "#{field} 不等于 #{deepEqual}",
        empty: "`#{field}` 不是空数组"
      },
      string: {
        minLength: "字符数最少为 #{minLength}",
        maxLength: "字符数最多为 #{maxLength}",
        length: "字符数必须是 #{length}",
        match: "`#{value}` 不符合模式 #{pattern}",
        uppercase: "`#{value}` 必须全大写",
        lowercase: "`#{value}` 必须全小写"
      },
      object: {
        deepEqual: "`#{field}` 不等于期望值",
        hasKeys: "`#{field}` 不包含必须字段",
        empty: "`#{field}` 不是对象"
      },
      boolean: {
        true: "期望是 `true`",
        false: "期望是 `false`"
      }
    }
  },
  colorPicker: {
    history: "最近使用颜色",
    preset: "系统预设颜色",
    empty: "暂无"
  }
}, Ac = re("zh-CN"), Pc = _r({
  "zh-CN": Oc
}), Dc = () => {
  const e = St(Bn, void 0), t = Z(() => {
    var o;
    return (o = e == null ? void 0 : e.locale) != null ? o : Pc[Ac.value];
  }), n = Z(() => t.value.locale);
  return {
    i18nMessage: t,
    locale: n,
    t: (o, ...i) => {
      const s = o.split(".");
      let a = t.value;
      for (const l of s) {
        if (!a[l])
          return o;
        a = a[l];
      }
      return Tr(a) && i.length > 0 ? a.replace(/{(\d+)}/g, (l, u) => {
        var c;
        return (c = i[u]) != null ? c : l;
      }) : a;
    }
  };
};
var $c = Object.defineProperty, xc = Object.defineProperties, Ic = Object.getOwnPropertyDescriptors, Ii = Object.getOwnPropertySymbols, Mc = Object.prototype.hasOwnProperty, Bc = Object.prototype.propertyIsEnumerable, Mi = (e, t, n) => t in e ? $c(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Lc = (e, t) => {
  for (var n in t || (t = {}))
    Mc.call(t, n) && Mi(e, n, t[n]);
  if (Ii)
    for (var n of Ii(t))
      Bc.call(t, n) && Mi(e, n, t[n]);
  return e;
}, Nc = (e, t) => xc(e, Ic(t));
const Rc = "A", Fc = "arco", So = "$arco", zt = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : Rc;
}, jt = (e, t) => {
  var n;
  t && t.classPrefix && (e.config.globalProperties[So] = Nc(Lc({}, (n = e.config.globalProperties[So]) != null ? n : {}), {
    classPrefix: t.classPrefix
  }));
}, Pe = (e) => {
  var t, n, r;
  const o = ql(), i = St(Bn, void 0), s = (r = (n = i == null ? void 0 : i.prefixCls) != null ? n : (t = o == null ? void 0 : o.appContext.config.globalProperties[So]) == null ? void 0 : t.classPrefix) != null ? r : Fc;
  return e ? `${s}-${e}` : s;
};
var aa = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, n) {
    var r = -1;
    return t.some(function(o, i) {
      return o[0] === n ? (r = i, !0) : !1;
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
        var r = e(this.__entries__, n), o = this.__entries__[r];
        return o && o[1];
      }, t.prototype.set = function(n, r) {
        var o = e(this.__entries__, n);
        ~o ? this.__entries__[o][1] = r : this.__entries__.push([n, r]);
      }, t.prototype.delete = function(n) {
        var r = this.__entries__, o = e(r, n);
        ~o && r.splice(o, 1);
      }, t.prototype.has = function(n) {
        return !!~e(this.__entries__, n);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(n, r) {
        r === void 0 && (r = null);
        for (var o = 0, i = this.__entries__; o < i.length; o++) {
          var s = i[o];
          n.call(r, s[1], s[0]);
        }
      }, t;
    }()
  );
}(), _o = typeof window < "u" && typeof document < "u" && window.document === document, pr = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), zc = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(pr) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), jc = 2;
function Vc(e, t) {
  var n = !1, r = !1, o = 0;
  function i() {
    n && (n = !1, e()), r && a();
  }
  function s() {
    zc(i);
  }
  function a() {
    var l = Date.now();
    if (n) {
      if (l - o < jc)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(s, t);
    o = l;
  }
  return a;
}
var Hc = 20, Uc = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], Wc = typeof MutationObserver < "u", qc = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = Vc(this.refresh.bind(this), Hc);
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
      !_o || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), Wc ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !_o || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var n = t.propertyName, r = n === void 0 ? "" : n, o = Uc.some(function(i) {
        return !!~r.indexOf(i);
      });
      o && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), la = function(e, t) {
  for (var n = 0, r = Object.keys(t); n < r.length; n++) {
    var o = r[n];
    Object.defineProperty(e, o, {
      value: t[o],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, Xt = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || pr;
}, ca = Or(0, 0, 0, 0);
function mr(e) {
  return parseFloat(e) || 0;
}
function Bi(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, o) {
    var i = e["border-" + o + "-width"];
    return r + mr(i);
  }, 0);
}
function Kc(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, o = t; r < o.length; r++) {
    var i = o[r], s = e["padding-" + i];
    n[i] = mr(s);
  }
  return n;
}
function Yc(e) {
  var t = e.getBBox();
  return Or(0, 0, t.width, t.height);
}
function Gc(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return ca;
  var r = Xt(e).getComputedStyle(e), o = Kc(r), i = o.left + o.right, s = o.top + o.bottom, a = mr(r.width), l = mr(r.height);
  if (r.boxSizing === "border-box" && (Math.round(a + i) !== t && (a -= Bi(r, "left", "right") + i), Math.round(l + s) !== n && (l -= Bi(r, "top", "bottom") + s)), !Jc(e)) {
    var u = Math.round(a + i) - t, c = Math.round(l + s) - n;
    Math.abs(u) !== 1 && (a -= u), Math.abs(c) !== 1 && (l -= c);
  }
  return Or(o.left, o.top, a, l);
}
var Xc = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof Xt(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof Xt(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function Jc(e) {
  return e === Xt(e).document.documentElement;
}
function Zc(e) {
  return _o ? Xc(e) ? Yc(e) : Gc(e) : ca;
}
function Qc(e) {
  var t = e.x, n = e.y, r = e.width, o = e.height, i = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, s = Object.create(i.prototype);
  return la(s, {
    x: t,
    y: n,
    width: r,
    height: o,
    top: n,
    right: t + r,
    bottom: o + n,
    left: t
  }), s;
}
function Or(e, t, n, r) {
  return { x: e, y: t, width: n, height: r };
}
var e0 = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Or(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = Zc(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), t0 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, n) {
      var r = Qc(n);
      la(this, { target: t, contentRect: r });
    }
    return e;
  }()
), n0 = (
  /** @class */
  function() {
    function e(t, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new aa(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Xt(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) || (n.set(t, new e0(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof Xt(t).Element))
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
          return new t0(r.target, r.broadcastRect());
        });
        this.callback_.call(t, n, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), ua = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new aa(), da = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = qc.getInstance(), r = new n0(t, n, this);
      ua.set(this, r);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  da.prototype[e] = function() {
    var t;
    return (t = ua.get(this))[e].apply(t, arguments);
  };
});
var fa = function() {
  return typeof pr.ResizeObserver < "u" ? pr.ResizeObserver : da;
}(), Li;
(function(e) {
  e[e.ELEMENT = 1] = "ELEMENT", e[e.FUNCTIONAL_COMPONENT = 2] = "FUNCTIONAL_COMPONENT", e[e.STATEFUL_COMPONENT = 4] = "STATEFUL_COMPONENT", e[e.COMPONENT = 6] = "COMPONENT", e[e.TEXT_CHILDREN = 8] = "TEXT_CHILDREN", e[e.ARRAY_CHILDREN = 16] = "ARRAY_CHILDREN", e[e.SLOTS_CHILDREN = 32] = "SLOTS_CHILDREN", e[e.TELEPORT = 64] = "TELEPORT", e[e.SUSPENSE = 128] = "SUSPENSE", e[e.COMPONENT_SHOULD_KEEP_ALIVE = 256] = "COMPONENT_SHOULD_KEEP_ALIVE", e[e.COMPONENT_KEPT_ALIVE = 512] = "COMPONENT_KEPT_ALIVE";
})(Li || (Li = {}));
var Ni;
(function(e) {
  e[e.TEXT = 1] = "TEXT", e[e.CLASS = 2] = "CLASS", e[e.STYLE = 4] = "STYLE", e[e.PROPS = 8] = "PROPS", e[e.FULL_PROPS = 16] = "FULL_PROPS", e[e.HYDRATE_EVENTS = 32] = "HYDRATE_EVENTS", e[e.STABLE_FRAGMENT = 64] = "STABLE_FRAGMENT", e[e.KEYED_FRAGMENT = 128] = "KEYED_FRAGMENT", e[e.UNKEYED_FRAGMENT = 256] = "UNKEYED_FRAGMENT", e[e.NEED_PATCH = 512] = "NEED_PATCH", e[e.DYNAMIC_SLOTS = 1024] = "DYNAMIC_SLOTS", e[e.DEV_ROOT_FRAGMENT = 2048] = "DEV_ROOT_FRAGMENT", e[e.HOISTED = -1] = "HOISTED", e[e.BAIL = -2] = "BAIL";
})(Ni || (Ni = {}));
const Wo = (e) => !!(e && e.shapeFlag & 1), qo = (e, t) => !!(e && e.shapeFlag & 6), pa = (e, t) => !!(e && e.shapeFlag & 16), r0 = (e, t) => !!(e && e.shapeFlag & 32), nr = (e) => {
  var t, n;
  if (e)
    for (const r of e) {
      if (Wo(r) || qo(r))
        return r;
      if (pa(r, r.children)) {
        const o = nr(r.children);
        if (o)
          return o;
      } else if (r0(r, r.children)) {
        const o = (n = (t = r.children).default) == null ? void 0 : n.call(t);
        if (o) {
          const i = nr(o);
          if (i)
            return i;
        }
      } else if (Uo(r)) {
        const o = nr(r);
        if (o)
          return o;
      }
    }
}, o0 = (e) => {
  if (!e)
    return !0;
  for (const t of e)
    if (t.children)
      return !1;
  return !0;
}, ma = (e, t) => {
  if (e && e.length > 0)
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      if (Wo(r) || qo(r)) {
        const i = pt(t) ? t(r) : t;
        return e[n] = Js(r, i, !0), !0;
      }
      const o = ha(r);
      if (o && o.length > 0 && ma(o, t))
        return !0;
    }
  return !1;
}, ha = (e) => {
  if (pa(e, e.children))
    return e.children;
  if (Uo(e))
    return e;
}, va = (e) => {
  var t, n;
  if (Wo(e))
    return e.el;
  if (qo(e)) {
    if (((t = e.el) == null ? void 0 : t.nodeType) === 1)
      return e.el;
    if ((n = e.component) != null && n.subTree) {
      const r = va(e.component.subTree);
      if (r)
        return r;
    }
  } else {
    const r = ha(e);
    return ya(r);
  }
}, ya = (e) => {
  if (e && e.length > 0)
    for (const t of e) {
      const n = va(t);
      if (n)
        return n;
    }
}, gn = (e) => {
  if (e)
    return pt(e) ? e : () => e;
}, ga = typeof window > "u" ? global : window, i0 = ga.requestAnimationFrame, Ri = ga.cancelAnimationFrame;
function Fi(e) {
  let t = 0;
  const n = (...r) => {
    t && Ri(t), t = i0(() => {
      e(...r), t = 0;
    });
  };
  return n.cancel = () => {
    Ri(t), t = 0;
  }, n;
}
const Ko = () => {
}, ba = () => {
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
}, Yo = (() => {
  try {
    return !(typeof window < "u" && document !== void 0);
  } catch {
    return !0;
  }
})(), Mt = Yo ? Ko : (e, t, n, r = !1) => {
  e.addEventListener(t, n, r);
}, kn = Yo ? Ko : (e, t, n, r = !1) => {
  e.removeEventListener(t, n, r);
}, s0 = (e, t) => {
  if (!e || !t)
    return !1;
  let n = t;
  for (; n; ) {
    if (n === e)
      return !0;
    n = n.parentNode;
  }
  return !1;
}, wa = (e) => {
  const t = document.createElement("div");
  return t.setAttribute("class", `arco-overlay arco-overlay-${e}`), t;
}, a0 = (e, t) => {
  var n;
  return Yo ? Ko() : (n = document.querySelector(e)) != null ? n : void 0;
}, Co = (e, t) => {
  if (Tr(e)) {
    const n = e[0] === "#" ? `[id='${e.slice(1)}']` : e;
    return a0(n);
  }
  return e;
}, l0 = (e) => e.tagName === "BODY" ? document.documentElement.scrollHeight > window.innerHeight : e.scrollHeight > e.offsetHeight, c0 = (e) => e.tagName === "BODY" ? window.innerWidth - ba().width : e.offsetWidth - e.clientWidth;
var Fe = (e, t) => {
  for (const [n, r] of t)
    e[n] = r;
  return e;
};
const u0 = be({
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
      prefixCls: Pe("icon-hover")
    };
  }
});
function d0(e, t, n, r, o, i) {
  return x(), Q("span", {
    class: fe([
      e.prefixCls,
      {
        [`${e.prefix}-icon-hover`]: e.prefix,
        [`${e.prefixCls}-size-${e.size}`]: e.size !== "medium",
        [`${e.prefixCls}-disabled`]: e.disabled
      }
    ])
  }, [
    Oe(e.$slots, "default")
  ], 2);
}
var Go = /* @__PURE__ */ Fe(u0, [["render", d0]]);
const f0 = be({
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
    const n = Pe("icon"), r = Z(() => [n, `${n}-close`, { [`${n}-spin`]: e.spin }]), o = Z(() => {
      const s = {};
      return e.size && (s.fontSize = mt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: o,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), p0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], m0 = /* @__PURE__ */ j("path", { d: "M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142" }, null, -1), h0 = [
  m0
];
function v0(e, t, n, r, o, i) {
  return x(), Q("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: fe(e.cls),
    style: Ye(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, h0, 14, p0);
}
var jr = /* @__PURE__ */ Fe(f0, [["render", v0]]);
const Xo = Object.assign(jr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + jr.name, jr);
  }
}), y0 = be({
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
    const n = Pe("icon"), r = Z(() => [n, `${n}-info-circle-fill`, { [`${n}-spin`]: e.spin }]), o = Z(() => {
      const s = {};
      return e.size && (s.fontSize = mt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: o,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), g0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], b0 = /* @__PURE__ */ j("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm2-30a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Zm0 17h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), w0 = [
  b0
];
function E0(e, t, n, r, o, i) {
  return x(), Q("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: fe(e.cls),
    style: Ye(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, w0, 14, g0);
}
var Vr = /* @__PURE__ */ Fe(y0, [["render", E0]]);
const Ea = Object.assign(Vr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Vr.name, Vr);
  }
}), S0 = be({
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
    const n = Pe("icon"), r = Z(() => [n, `${n}-check-circle-fill`, { [`${n}-spin`]: e.spin }]), o = Z(() => {
      const s = {};
      return e.size && (s.fontSize = mt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: o,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), _0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], C0 = /* @__PURE__ */ j("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm10.207-24.379a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0L22 26.172l-4.878-4.88a1 1 0 0 0-1.415 0l-1.414 1.415a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414 0l11.5-11.5Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), k0 = [
  C0
];
function T0(e, t, n, r, o, i) {
  return x(), Q("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: fe(e.cls),
    style: Ye(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, k0, 14, _0);
}
var Hr = /* @__PURE__ */ Fe(S0, [["render", T0]]);
const Sa = Object.assign(Hr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Hr.name, Hr);
  }
}), O0 = be({
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
    const n = Pe("icon"), r = Z(() => [n, `${n}-exclamation-circle-fill`, { [`${n}-spin`]: e.spin }]), o = Z(() => {
      const s = {};
      return e.size && (s.fontSize = mt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: o,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), A0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], P0 = /* @__PURE__ */ j("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm-2-11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2Zm4-18a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V15Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), D0 = [
  P0
];
function $0(e, t, n, r, o, i) {
  return x(), Q("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: fe(e.cls),
    style: Ye(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, D0, 14, A0);
}
var Ur = /* @__PURE__ */ Fe(O0, [["render", $0]]);
const _a = Object.assign(Ur, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Ur.name, Ur);
  }
}), x0 = be({
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
    const n = Pe("icon"), r = Z(() => [n, `${n}-close-circle-fill`, { [`${n}-spin`]: e.spin }]), o = Z(() => {
      const s = {};
      return e.size && (s.fontSize = mt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: o,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), I0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], M0 = /* @__PURE__ */ j("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm4.955-27.771-4.95 4.95-4.95-4.95a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l4.95 4.95-4.95 4.95a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-4.95-4.95 4.95-4.95a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), B0 = [
  M0
];
function L0(e, t, n, r, o, i) {
  return x(), Q("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: fe(e.cls),
    style: Ye(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, B0, 14, I0);
}
var Wr = /* @__PURE__ */ Fe(x0, [["render", L0]]);
const Ca = Object.assign(Wr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Wr.name, Wr);
  }
}), ka = ["info", "success", "warning", "error"], N0 = be({
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
    const n = Pe("icon"), r = Z(() => [n, `${n}-loading`, { [`${n}-spin`]: e.spin }]), o = Z(() => {
      const s = {};
      return e.size && (s.fontSize = mt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: o,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), R0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], F0 = /* @__PURE__ */ j("path", { d: "M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6" }, null, -1), z0 = [
  F0
];
function j0(e, t, n, r, o, i) {
  return x(), Q("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: fe(e.cls),
    style: Ye(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, z0, 14, R0);
}
var qr = /* @__PURE__ */ Fe(N0, [["render", j0]]);
const Ln = Object.assign(qr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + qr.name, qr);
  }
});
var V0 = Object.defineProperty, zi = Object.getOwnPropertySymbols, H0 = Object.prototype.hasOwnProperty, U0 = Object.prototype.propertyIsEnumerable, ji = (e, t, n) => t in e ? V0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, W0 = (e, t) => {
  for (var n in t || (t = {}))
    H0.call(t, n) && ji(e, n, t[n]);
  if (zi)
    for (var n of zi(t))
      U0.call(t, n) && ji(e, n, t[n]);
  return e;
};
const Ta = (e, t) => {
  const n = W0({}, e);
  for (const r of t)
    r in n && delete n[r];
  return n;
}, q0 = Symbol("ArcoFormItemContext"), K0 = ({
  size: e,
  disabled: t,
  error: n,
  uninject: r
} = {}) => {
  const o = r ? {} : St(q0, {}), i = Z(() => {
    var c;
    return (c = e == null ? void 0 : e.value) != null ? c : o.size;
  }), s = Z(() => (t == null ? void 0 : t.value) || o.disabled), a = Z(() => (n == null ? void 0 : n.value) || o.error), l = Si(o, "feedback"), u = Si(o, "eventHandlers");
  return {
    formItemCtx: o,
    mergedSize: i,
    mergedDisabled: s,
    mergedError: a,
    feedback: l,
    eventHandlers: u
  };
}, Oa = (e, { defaultValue: t = "medium" } = {}) => {
  const n = St(Bn, void 0);
  return {
    mergedSize: Z(() => {
      var o, i;
      return (i = (o = e == null ? void 0 : e.value) != null ? o : n == null ? void 0 : n.size) != null ? i : t;
    })
  };
}, Aa = Symbol("ArcoButtonGroup"), Y0 = be({
  name: "Button",
  components: {
    IconLoading: Ln
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
    const { size: n, disabled: r } = $n(e), o = Pe("btn"), i = St(Aa, void 0), s = Z(() => {
      var w;
      return (w = n.value) != null ? w : i == null ? void 0 : i.size;
    }), a = Z(() => !!(r.value || i != null && i.disabled)), { mergedSize: l, mergedDisabled: u } = K0({
      size: s,
      disabled: a
    }), { mergedSize: c } = Oa(l), p = Z(() => {
      var w, d, h, E, T, P;
      return [
        o,
        `${o}-${(d = (w = e.type) != null ? w : i == null ? void 0 : i.type) != null ? d : "secondary"}`,
        `${o}-shape-${(E = (h = e.shape) != null ? h : i == null ? void 0 : i.shape) != null ? E : "square"}`,
        `${o}-size-${c.value}`,
        `${o}-status-${(P = (T = e.status) != null ? T : i == null ? void 0 : i.status) != null ? P : "normal"}`,
        {
          [`${o}-long`]: e.long,
          [`${o}-loading`]: e.loading,
          [`${o}-disabled`]: u.value,
          [`${o}-link`]: Tr(e.href)
        }
      ];
    });
    return {
      prefixCls: o,
      cls: p,
      mergedDisabled: u,
      handleClick: (w) => {
        if (e.disabled || e.loading) {
          w.preventDefault();
          return;
        }
        t("click", w);
      }
    };
  }
}), G0 = ["href"], X0 = ["type", "disabled", "autofocus"];
function J0(e, t, n, r, o, i) {
  const s = Te("icon-loading");
  return e.href ? (x(), Q("a", {
    key: 0,
    class: fe([
      e.cls,
      { [`${e.prefixCls}-only-icon`]: e.$slots.icon && !e.$slots.default }
    ]),
    href: e.mergedDisabled || e.loading ? void 0 : e.href,
    onClick: t[0] || (t[0] = (...a) => e.handleClick && e.handleClick(...a))
  }, [
    e.loading || e.$slots.icon ? (x(), Q("span", {
      key: 0,
      class: fe(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (x(), ve(s, {
        key: 0,
        spin: "true"
      })) : Oe(e.$slots, "icon", { key: 1 })
    ], 2)) : me("v-if", !0),
    Oe(e.$slots, "default")
  ], 10, G0)) : (x(), Q("button", {
    key: 1,
    class: fe([
      e.cls,
      { [`${e.prefixCls}-only-icon`]: e.$slots.icon && !e.$slots.default }
    ]),
    type: e.htmlType,
    disabled: e.mergedDisabled,
    autofocus: e.autofocus,
    onClick: t[1] || (t[1] = (...a) => e.handleClick && e.handleClick(...a))
  }, [
    e.loading || e.$slots.icon ? (x(), Q("span", {
      key: 0,
      class: fe(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (x(), ve(s, {
        key: 0,
        spin: !0
      })) : Oe(e.$slots, "icon", { key: 1 })
    ], 2)) : me("v-if", !0),
    Oe(e.$slots, "default")
  ], 10, X0));
}
var Kr = /* @__PURE__ */ Fe(Y0, [["render", J0]]);
const Z0 = be({
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
    const { type: t, size: n, status: r, disabled: o, shape: i } = $n(e), s = Pe("btn-group");
    return Zs(Aa, _r({
      type: t,
      size: n,
      shape: i,
      status: r,
      disabled: o
    })), {
      prefixCls: s
    };
  }
});
function Q0(e, t, n, r, o, i) {
  return x(), Q("div", {
    class: fe(e.prefixCls)
  }, [
    Oe(e.$slots, "default")
  ], 2);
}
var rr = /* @__PURE__ */ Fe(Z0, [["render", Q0]]);
const nt = Object.assign(Kr, {
  Group: rr,
  install: (e, t) => {
    jt(e, t);
    const n = zt(t);
    e.component(n + Kr.name, Kr), e.component(n + rr.name, rr);
  }
});
var eu = Object.defineProperty, Vi = Object.getOwnPropertySymbols, tu = Object.prototype.hasOwnProperty, nu = Object.prototype.propertyIsEnumerable, Hi = (e, t, n) => t in e ? eu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, hn = (e, t) => {
  for (var n in t || (t = {}))
    tu.call(t, n) && Hi(e, n, t[n]);
  if (Vi)
    for (var n of Vi(t))
      nu.call(t, n) && Hi(e, n, t[n]);
  return e;
};
const ru = () => {
  const { height: e, width: t } = ba();
  return {
    width: Math.min(t, window.innerWidth),
    height: Math.min(e, window.innerHeight)
  };
}, Ui = (e, t) => {
  var n, r;
  const o = e.getBoundingClientRect();
  return {
    top: o.top,
    bottom: o.bottom,
    left: o.left,
    right: o.right,
    scrollTop: o.top - t.top,
    scrollBottom: o.bottom - t.top,
    scrollLeft: o.left - t.left,
    scrollRight: o.right - t.left,
    width: (n = e.offsetWidth) != null ? n : e.clientWidth,
    height: (r = e.offsetHeight) != null ? r : e.clientHeight
  };
}, ou = (e) => {
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
}, qn = (e, t) => {
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
}, iu = (e, t, {
  containerRect: n,
  triggerRect: r,
  popupRect: o,
  offset: i,
  translate: s
}) => {
  const a = ou(e), l = ru(), u = {
    top: n.top + t.top,
    bottom: l.height - (n.top + t.top + o.height),
    left: n.left + t.left,
    right: l.width - (n.left + t.left + o.width)
  };
  let c = e;
  if (a === "top" && u.top < 0)
    if (r.top > o.height)
      t.top = -n.top;
    else {
      const p = vn("bottom", r, o, {
        offset: i,
        translate: s
      });
      l.height - (n.top + p.top + o.height) > 0 && (c = qn(e, "bottom"), t.top = p.top);
    }
  if (a === "bottom" && u.bottom < 0)
    if (l.height - r.bottom > o.height)
      t.top = -n.top + (l.height - o.height);
    else {
      const p = vn("top", r, o, {
        offset: i,
        translate: s
      });
      n.top + p.top > 0 && (c = qn(e, "top"), t.top = p.top);
    }
  if (a === "left" && u.left < 0)
    if (r.left > o.width)
      t.left = -n.left;
    else {
      const p = vn("right", r, o, {
        offset: i,
        translate: s
      });
      l.width - (n.left + p.left + o.width) > 0 && (c = qn(e, "right"), t.left = p.left);
    }
  if (a === "right" && u.right < 0)
    if (l.width - r.right > o.width)
      t.left = -n.left + (l.width - o.width);
    else {
      const p = vn("left", r, o, {
        offset: i,
        translate: s
      });
      n.left + p.left > 0 && (c = qn(e, "left"), t.left = p.left);
    }
  return (a === "top" || a === "bottom") && (u.left < 0 ? t.left = -n.left : u.right < 0 && (t.left = -n.left + (l.width - o.width))), (a === "left" || a === "right") && (u.top < 0 ? t.top = -n.top : u.bottom < 0 && (t.top = -n.top + (l.height - o.height))), {
    popupPosition: t,
    position: c
  };
}, vn = (e, t, n, {
  offset: r = 0,
  translate: o = [0, 0]
} = {}) => {
  var i;
  const s = (i = Uo(o) ? o : o[e]) != null ? i : [0, 0];
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
}, su = (e) => {
  let t = "0";
  ["top", "bottom"].includes(e) ? t = "50%" : ["left", "lt", "lb", "tr", "br"].includes(e) && (t = "100%");
  let n = "0";
  return ["left", "right"].includes(e) ? n = "50%" : ["top", "tl", "tr", "lb", "rb"].includes(e) && (n = "100%"), `${t} ${n}`;
}, au = (e, t, n, r, {
  offset: o = 0,
  translate: i = [0, 0],
  customStyle: s = {},
  autoFitPosition: a = !1
} = {}) => {
  let l = e, u = vn(e, n, r, {
    offset: o,
    translate: i
  });
  if (a) {
    const p = iu(e, u, {
      containerRect: t,
      popupRect: r,
      triggerRect: n,
      offset: o,
      translate: i
    });
    u = p.popupPosition, l = p.position;
  }
  return {
    style: hn({
      left: `${u.left}px`,
      top: `${u.top}px`
    }, s),
    position: l
  };
}, lu = (e, t, n, {
  customStyle: r = {}
}) => {
  if (["top", "tl", "tr", "bottom", "bl", "br"].includes(e)) {
    let i = Math.abs(t.scrollLeft + t.width / 2 - n.scrollLeft);
    return i > n.width - 8 && (t.width > n.width ? i = n.width / 2 : i = n.width - 8), ["top", "tl", "tr"].includes(e) ? hn({
      left: `${i}px`,
      bottom: "0",
      transform: "translate(-50%,50%) rotate(45deg)"
    }, r) : hn({
      left: `${i}px`,
      top: "0",
      transform: "translate(-50%,-50%) rotate(45deg)"
    }, r);
  }
  let o = Math.abs(t.scrollTop + t.height / 2 - n.scrollTop);
  return o > n.height - 8 && (t.height > n.height ? o = n.height / 2 : o = n.height - 8), ["left", "lt", "lb"].includes(e) ? hn({
    top: `${o}px`,
    right: "0",
    transform: "translate(50%,-50%) rotate(45deg)"
  }, r) : hn({
    top: `${o}px`,
    left: "0",
    transform: "translate(-50%,-50%) rotate(45deg)"
  }, r);
}, cu = (e) => e.scrollHeight > e.offsetHeight || e.scrollWidth > e.offsetWidth, Wi = (e) => {
  var t;
  const n = [];
  let r = e;
  for (; r && r !== document.documentElement; )
    cu(r) && n.push(r), r = (t = r.parentElement) != null ? t : void 0;
  return n;
}, Pa = () => {
  const e = {}, t = re(), n = () => {
    const r = ya(e.value);
    r !== t.value && (t.value = r);
  };
  return lt(() => n()), Cr(() => n()), {
    children: e,
    firstElement: t
  };
};
var qi = be({
  name: "ResizeObserver",
  props: {
    watchOnUpdated: Boolean
  },
  emits: [
    "resize"
  ],
  setup(e, { emit: t, slots: n }) {
    const { children: r, firstElement: o } = Pa();
    let i;
    const s = (l) => {
      l && (i = new fa((u) => {
        const c = u[0];
        t("resize", c);
      }), i.observe(l));
    }, a = () => {
      i && (i.disconnect(), i = null);
    };
    return Re(o, (l) => {
      i && a(), l && s(l);
    }), tn(() => {
      i && a();
    }), () => {
      var l;
      return r.value = (l = n.default) == null ? void 0 : l.call(n), r.value;
    };
  }
});
function uu(e, t) {
  const n = re(e[t]);
  return Cr(() => {
    const r = e[t];
    n.value !== r && (n.value = r);
  }), n;
}
const Ki = Symbol("ArcoTrigger"), du = 1e3, fu = 5e3, pu = 1;
class mu {
  constructor() {
    this.popupStack = {
      popup: /* @__PURE__ */ new Set(),
      dialog: /* @__PURE__ */ new Set(),
      message: /* @__PURE__ */ new Set()
    }, this.getNextZIndex = (t) => (t === "message" ? Array.from(this.popupStack.message).pop() || fu : Array.from(this.popupStack.popup).pop() || du) + pu, this.add = (t) => {
      const n = this.getNextZIndex(t);
      return this.popupStack[t].add(n), t === "dialog" && this.popupStack.popup.add(n), n;
    }, this.delete = (t, n) => {
      this.popupStack[n].delete(t), n === "dialog" && this.popupStack.popup.delete(t);
    }, this.isLastDialog = (t) => this.popupStack.dialog.size > 1 ? t === Array.from(this.popupStack.dialog).pop() : !0;
  }
}
const Yr = new mu();
function Jo(e, {
  visible: t,
  runOnMounted: n
} = {}) {
  const r = re(0), o = () => {
    r.value = Yr.add(e);
  }, i = () => {
    Yr.delete(r.value, e);
  }, s = () => e === "dialog" ? Yr.isLastDialog(r.value) : !1;
  return Re(() => t == null ? void 0 : t.value, (a) => {
    a ? o() : i();
  }, {
    immediate: !0
  }), n && (lt(() => {
    o();
  }), tn(() => {
    i();
  })), {
    zIndex: Kl(r),
    open: o,
    close: i,
    isLastDialog: s
  };
}
const hu = ({
  elementRef: e,
  onResize: t
}) => {
  let n;
  return {
    createResizeObserver: () => {
      e.value && (n = new fa((i) => {
        const s = i[0];
        pt(t) && t(s);
      }), n.observe(e.value));
    },
    destroyResizeObserver: () => {
      n && (n.disconnect(), n = null);
    }
  };
};
var Da = be({
  name: "ClientOnly",
  setup(e, {
    slots: t
  }) {
    const n = re(!1);
    return lt(() => n.value = !0), () => {
      var r;
      return n.value ? (r = t.default) == null ? void 0 : r.call(t) : null;
    };
  }
});
const $a = ({
  popupContainer: e,
  visible: t,
  defaultContainer: n = "body",
  documentContainer: r
}) => {
  const o = re(e.value), i = re(), s = () => {
    const a = Co(e.value), l = a ? e.value : n, u = a ?? (r ? document.documentElement : Co(n));
    l !== o.value && (o.value = l), u !== i.value && (i.value = u);
  };
  return lt(() => s()), Re(t, (a) => {
    o.value !== e.value && a && s();
  }), {
    teleportContainer: o,
    containerRef: i
  };
};
var vu = Object.defineProperty, yu = Object.defineProperties, gu = Object.getOwnPropertyDescriptors, Yi = Object.getOwnPropertySymbols, bu = Object.prototype.hasOwnProperty, wu = Object.prototype.propertyIsEnumerable, Gi = (e, t, n) => t in e ? vu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Eu = (e, t) => {
  for (var n in t || (t = {}))
    bu.call(t, n) && Gi(e, n, t[n]);
  if (Yi)
    for (var n of Yi(t))
      wu.call(t, n) && Gi(e, n, t[n]);
  return e;
}, Su = (e, t) => yu(e, gu(t));
const _u = ["onClick", "onMouseenter", "onMouseleave", "onFocusin", "onFocusout", "onContextmenu"];
var Gr = be({
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
      popupContainer: o
    } = $n(e), i = Pe("trigger"), s = Z(() => Ta(r, _u)), a = St(Bn, void 0), l = Z(() => [].concat(e.trigger)), u = /* @__PURE__ */ new Set(), c = St(Ki, void 0), {
      children: p,
      firstElement: g
    } = Pa(), w = re(), d = re(e.defaultPopupVisible), h = re(e.position), E = re({}), T = re({}), P = re({}), R = re(), f = re({
      top: 0,
      left: 0
    });
    let L = null, A = null;
    const v = Z(() => {
      var N;
      return (N = e.popupVisible) != null ? N : d.value;
    }), {
      teleportContainer: m,
      containerRef: y
    } = $a({
      popupContainer: o,
      visible: v,
      documentContainer: !0
    }), {
      zIndex: O
    } = Jo("popup", {
      visible: v
    });
    let _ = 0, S = !1, M = !1;
    const X = () => {
      _ && (window.clearTimeout(_), _ = 0);
    }, ce = (N) => {
      if (e.alignPoint) {
        const {
          pageX: ee,
          pageY: xe
        } = N;
        f.value = {
          top: xe,
          left: ee
        };
      }
    }, ne = () => {
      if (!g.value || !w.value || !y.value)
        return;
      const N = y.value.getBoundingClientRect(), ee = e.alignPoint ? {
        top: f.value.top,
        bottom: f.value.top,
        left: f.value.left,
        right: f.value.left,
        scrollTop: f.value.top,
        scrollBottom: f.value.top,
        scrollLeft: f.value.left,
        scrollRight: f.value.left,
        width: 0,
        height: 0
      } : Ui(g.value, N), xe = () => Ui(w.value, N), gt = xe(), {
        style: ut,
        position: bt
      } = au(e.position, N, ee, gt, {
        offset: e.popupOffset,
        translate: e.popupTranslate,
        customStyle: e.popupStyle,
        autoFitPosition: e.autoFitPosition
      });
      e.autoFitTransformOrigin && (T.value = {
        transformOrigin: su(bt)
      }), e.autoFitPopupMinWidth ? ut.minWidth = `${ee.width}px` : e.autoFitPopupWidth && (ut.width = `${ee.width}px`), h.value !== bt && (h.value = bt), E.value = ut, e.showArrow && dr(() => {
        P.value = lu(bt, ee, xe(), {
          customStyle: e.arrowStyle
        });
      });
    }, V = (N, ee) => {
      if (N === v.value && _ === 0)
        return;
      const xe = () => {
        d.value = N, t("update:popupVisible", N), t("popupVisibleChange", N), N && dr(() => {
          ne();
        });
      };
      N || (L = null, A = null), ee ? (X(), N !== v.value && (_ = window.setTimeout(xe, ee))) : xe();
    }, ue = (N) => {
      var ee;
      (ee = r.onClick) == null || ee.call(r, N), !(e.disabled || v.value && !e.clickToClose) && (l.value.includes("click") ? (ce(N), V(!v.value)) : l.value.includes("contextMenu") && v.value && V(!1));
    }, $ = (N) => {
      var ee;
      (ee = r.onMouseenter) == null || ee.call(r, N), !(e.disabled || !l.value.includes("hover")) && (ce(N), V(!0, e.mouseEnterDelay));
    }, D = (N) => {
      c == null || c.onMouseenter(N), $(N);
    }, q = (N) => {
      var ee;
      (ee = r.onMouseleave) == null || ee.call(r, N), !(e.disabled || !l.value.includes("hover")) && V(!1, e.mouseLeaveDelay);
    }, K = (N) => {
      c == null || c.onMouseleave(N), q(N);
    }, pe = (N) => {
      var ee;
      (ee = r.onFocusin) == null || ee.call(r, N), !(e.disabled || !l.value.includes("focus")) && V(!0, e.focusDelay);
    }, ae = (N) => {
      var ee;
      (ee = r.onFocusout) == null || ee.call(r, N), !(e.disabled || !l.value.includes("focus")) && e.blurToClose && V(!1);
    }, Y = (N) => {
      var ee;
      (ee = r.onContextmenu) == null || ee.call(r, N), !(e.disabled || !l.value.includes("contextMenu") || v.value && !e.clickToClose) && (ce(N), V(!v.value), N.preventDefault());
    };
    Zs(Ki, _r({
      onMouseenter: D,
      onMouseleave: K,
      addChildRef: (N) => {
        u.add(N), c == null || c.addChildRef(N);
      },
      removeChildRef: (N) => {
        u.delete(N), c == null || c.removeChildRef(N);
      }
    }));
    const Ce = () => {
      kn(document.documentElement, "mousedown", B), S = !1;
    }, Ie = uu(n, "content"), b = Z(() => {
      var N;
      return e.hideEmpty && o0((N = Ie.value) == null ? void 0 : N.call(Ie));
    }), B = (N) => {
      var ee, xe, gt;
      if (!((ee = g.value) != null && ee.contains(N.target) || (xe = w.value) != null && xe.contains(N.target))) {
        for (const ut of u)
          if ((gt = ut.value) != null && gt.contains(N.target))
            return;
        Ce(), V(!1);
      }
    }, F = (N, ee) => {
      const [xe, gt] = N, {
        scrollTop: ut,
        scrollLeft: bt
      } = ee;
      return Math.abs(ut - xe) >= e.scrollToCloseDistance || Math.abs(bt - gt) >= e.scrollToCloseDistance;
    }, G = Fi((N) => {
      if (v.value)
        if (e.scrollToClose || a != null && a.scrollToClose) {
          const ee = N.target;
          L || (L = [ee.scrollTop, ee.scrollLeft]), F(L, ee) ? V(!1) : ne();
        } else
          ne();
    }), U = () => {
      kn(window, "scroll", z), M = !1;
    }, z = Fi((N) => {
      const ee = N.target.documentElement;
      A || (A = [ee.scrollTop, ee.scrollLeft]), F(A, ee) && (V(!1), U());
    }), de = () => {
      v.value && ne();
    }, we = () => {
      de(), t("resize");
    }, De = (N) => {
      e.preventFocus && N.preventDefault();
    };
    c == null || c.addChildRef(w);
    const ct = Z(() => v.value ? e.openedClass : void 0);
    let ke;
    Re(v, (N) => {
      if (e.clickOutsideToClose && (!N && S ? Ce() : N && !S && (Mt(document.documentElement, "mousedown", B), S = !0)), (e.scrollToClose || a != null && a.scrollToClose) && (Mt(window, "scroll", z), M = !0), e.updateAtScroll || a != null && a.updateAtScroll) {
        if (N) {
          ke = Wi(g.value);
          for (const ee of ke)
            ee.addEventListener("scroll", G);
        } else if (ke) {
          for (const ee of ke)
            ee.removeEventListener("scroll", G);
          ke = void 0;
        }
      }
      N && (Ze.value = !0);
    }), Re(() => [e.autoFitPopupWidth, e.autoFitPopupMinWidth], () => {
      v.value && ne();
    });
    const {
      createResizeObserver: _e,
      destroyResizeObserver: Ot
    } = hu({
      elementRef: y,
      onResize: de
    });
    lt(() => {
      if (_e(), v.value && (ne(), e.clickOutsideToClose && !S && (Mt(document.documentElement, "mousedown", B), S = !0), e.updateAtScroll || a != null && a.updateAtScroll)) {
        ke = Wi(g.value);
        for (const N of ke)
          N.addEventListener("scroll", G);
      }
    }), Cr(() => {
      v.value && ne();
    }), Yl(() => {
      V(!1);
    }), tn(() => {
      if (c == null || c.removeChildRef(w), Ot(), S && Ce(), M && U(), ke) {
        for (const N of ke)
          N.removeEventListener("scroll", G);
        ke = void 0;
      }
    });
    const Ze = re(v.value), et = re(!1), At = () => {
      et.value = !0;
    }, Vt = () => {
      et.value = !1, v.value && t("show");
    }, Ht = () => {
      et.value = !1, v.value || (Ze.value = !1, t("hide"));
    };
    return () => {
      var N, ee;
      return p.value = (ee = (N = n.default) == null ? void 0 : N.call(n)) != null ? ee : [], ma(p.value, {
        class: ct.value,
        onClick: ue,
        onMouseenter: $,
        onMouseleave: q,
        onFocusin: pe,
        onFocusout: ae,
        onContextmenu: Y
      }), H(_t, null, [e.autoFixPosition ? H(qi, {
        onResize: we
      }, {
        default: () => [p.value]
      }) : p.value, H(Da, null, {
        default: () => [H(Qs, {
          to: m.value,
          disabled: !e.renderToBody
        }, {
          default: () => [(!e.unmountOnClose || v.value || Ze.value) && !b.value && H(qi, {
            onResize: de
          }, {
            default: () => [H("div", yn({
              ref: w,
              class: [`${i}-popup`, `${i}-position-${h.value}`],
              style: Su(Eu({}, E.value), {
                zIndex: O.value,
                pointerEvents: et.value ? "none" : "auto"
              }),
              "trigger-placement": h.value,
              onMouseenter: D,
              onMouseleave: K,
              onMousedown: De
            }, s.value), [H(bo, {
              name: e.animationName,
              duration: e.duration,
              appear: !0,
              onBeforeEnter: At,
              onAfterEnter: Vt,
              onBeforeLeave: At,
              onAfterLeave: Ht
            }, {
              default: () => {
                var xe;
                return [rt(H("div", {
                  class: `${i}-popup-wrapper`,
                  style: T.value
                }, [H("div", {
                  class: [`${i}-content`, e.contentClass],
                  style: e.contentStyle
                }, [(xe = n.content) == null ? void 0 : xe.call(n)]), e.showArrow && H("div", {
                  ref: R,
                  class: [`${i}-arrow`, e.arrowClass],
                  style: P.value
                }, null)]), [[ot, v.value]])];
              }
            })])]
          })]
        })]
      })]);
    };
  }
});
const Cu = Object.assign(Gr, {
  install: (e, t) => {
    jt(e, t);
    const n = zt(t);
    e.component(n + Gr.name, Gr);
  }
}), ku = 5;
var Tu = be({
  name: "DotLoading",
  props: {
    size: {
      type: Number
    }
  },
  setup(e) {
    const t = Pe("dot-loading");
    return () => {
      const n = e.size ? {
        width: `${e.size}px`,
        height: `${e.size}px`
      } : {};
      return H("div", {
        class: t,
        style: {
          width: e.size ? `${e.size * 7}px` : void 0,
          height: e.size ? `${e.size}px` : void 0
        }
      }, [Array(ku).fill(1).map((r, o) => H("div", {
        class: `${t}-item`,
        key: o,
        style: n
      }, null))]);
    };
  }
}), Xr = be({
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
    const n = Pe("spin"), r = St(Bn, void 0), o = Z(() => [n, {
      [`${n}-loading`]: e.loading,
      [`${n}-with-tip`]: e.tip && !t.default
    }]), i = () => {
      if (t.icon) {
        const a = nr(t.icon());
        if (a)
          return Js(a, {
            spin: !0
          });
      }
      return t.element ? t.element() : e.dot ? H(Tu, {
        size: e.size
      }, null) : r != null && r.slots.loading ? r.slots.loading() : H(Ln, {
        spin: !0,
        size: e.size
      }, null);
    }, s = () => {
      var a, l, u;
      const c = e.size ? {
        fontSize: `${e.size}px`
      } : void 0, p = !!((a = t.tip) != null ? a : e.tip);
      return H(_t, null, [!e.hideIcon && H("div", {
        class: `${n}-icon`,
        style: c
      }, [i()]), p && H("div", {
        class: `${n}-tip`
      }, [(u = (l = t.tip) == null ? void 0 : l.call(t)) != null ? u : e.tip])]);
    };
    return () => H("div", {
      class: o.value
    }, [t.default ? H(_t, null, [t.default(), e.loading && H("div", {
      class: `${n}-mask`
    }, [H("div", {
      class: `${n}-mask-icon`
    }, [s()])])]) : s()]);
  }
});
const Zo = Object.assign(Xr, {
  install: (e, t) => {
    jt(e, t);
    const n = zt(t);
    e.component(n + Xr.name, Xr);
  }
}), Ou = {
  ENTER: "Enter",
  ESC: "Escape",
  BACKSPACE: "Backspace",
  TAB: "Tab",
  SPACE: " ",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight"
}, Au = be({
  name: "Popover",
  components: {
    Trigger: Cu
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
    const n = Pe("popover"), r = re(e.defaultPopupVisible), o = Z(() => {
      var l;
      return (l = e.popupVisible) != null ? l : r.value;
    }), i = (l) => {
      r.value = l, t("update:popupVisible", l), t("popupVisibleChange", l);
    }, s = Z(() => [
      `${n}-popup-content`,
      e.contentClass
    ]), a = Z(() => [
      `${n}-popup-arrow`,
      e.arrowClass
    ]);
    return {
      prefixCls: n,
      computedPopupVisible: o,
      contentCls: s,
      arrowCls: a,
      handlePopupVisibleChange: i
    };
  }
});
function Pu(e, t, n, r, o, i) {
  const s = Te("trigger");
  return x(), ve(s, {
    class: fe(e.prefixCls),
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
    content: ie(() => [
      j("div", {
        class: fe(`${e.prefixCls}-title`)
      }, [
        Oe(e.$slots, "title", {}, () => [
          Ne(se(e.title), 1)
        ])
      ], 2),
      j("div", {
        class: fe(`${e.prefixCls}-content`)
      }, [
        Oe(e.$slots, "content", {}, () => [
          Ne(se(e.content), 1)
        ])
      ], 2)
    ]),
    default: ie(() => [
      Oe(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "trigger", "position", "popup-visible", "content-class", "content-style", "arrow-class", "arrow-style", "popup-container", "onPopupVisibleChange"]);
}
var Jr = /* @__PURE__ */ Fe(Au, [["render", Pu]]);
const $t = Object.assign(Jr, {
  install: (e, t) => {
    jt(e, t);
    const n = zt(t);
    e.component(n + Jr.name, Jr);
  }
});
function Du(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
const Xi = [
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
], $u = be({
  name: "Tag",
  components: {
    IconHover: Go,
    IconClose: Xo,
    IconLoading: Ln
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
    const { size: n } = $n(e), r = Pe("tag"), o = Z(() => e.color && Xi.includes(e.color)), i = Z(() => e.color && !Xi.includes(e.color)), s = re(e.defaultVisible), a = re(e.defaultChecked), l = Z(() => {
      var E;
      return (E = e.visible) != null ? E : s.value;
    }), u = Z(() => {
      var E;
      return e.checkable ? (E = e.checked) != null ? E : a.value : !0;
    }), { mergedSize: c } = Oa(n), p = Z(() => c.value === "mini" ? "small" : c.value), g = (E) => {
      s.value = !1, t("update:visible", !1), t("close", E);
    }, w = (E) => {
      if (e.checkable) {
        const T = !u.value;
        a.value = T, t("update:checked", T), t("check", T, E);
      }
    }, d = Z(() => [
      r,
      `${r}-size-${p.value}`,
      {
        [`${r}-loading`]: e.loading,
        [`${r}-hide`]: !l.value,
        [`${r}-${e.color}`]: o.value,
        [`${r}-bordered`]: e.bordered,
        [`${r}-checkable`]: e.checkable,
        [`${r}-checked`]: u.value,
        [`${r}-custom-color`]: i.value
      }
    ]), h = Z(() => {
      if (i.value)
        return {
          backgroundColor: e.color
        };
    });
    return {
      prefixCls: r,
      cls: d,
      style: h,
      computedVisible: l,
      computedChecked: u,
      handleClick: w,
      handleClose: g
    };
  }
});
function xu(e, t, n, r, o, i) {
  const s = Te("icon-close"), a = Te("icon-hover"), l = Te("icon-loading");
  return e.computedVisible ? (x(), Q("span", {
    key: 0,
    class: fe(e.cls),
    style: Ye(e.style),
    onClick: t[0] || (t[0] = (...u) => e.handleClick && e.handleClick(...u))
  }, [
    e.$slots.icon ? (x(), Q("span", {
      key: 0,
      class: fe(`${e.prefixCls}-icon`)
    }, [
      Oe(e.$slots, "icon")
    ], 2)) : me("v-if", !0),
    e.nowrap ? (x(), Q("span", {
      key: 1,
      class: fe(`${e.prefixCls}-text`)
    }, [
      Oe(e.$slots, "default")
    ], 2)) : Oe(e.$slots, "default", { key: 2 }),
    e.closable ? (x(), ve(a, {
      key: 3,
      role: "button",
      "aria-label": "Close",
      prefix: e.prefixCls,
      class: fe(`${e.prefixCls}-close-btn`),
      onClick: wo(e.handleClose, ["stop"])
    }, {
      default: ie(() => [
        Oe(e.$slots, "close-icon", {}, () => [
          H(s)
        ])
      ]),
      _: 3
    }, 8, ["prefix", "class", "onClick"])) : me("v-if", !0),
    e.loading ? (x(), Q("span", {
      key: 4,
      class: fe(`${e.prefixCls}-loading-icon`)
    }, [
      H(l)
    ], 2)) : me("v-if", !0)
  ], 6)) : me("v-if", !0);
}
var Zr = /* @__PURE__ */ Fe($u, [["render", xu]]);
const hr = Object.assign(Zr, {
  install: (e, t) => {
    jt(e, t);
    const n = zt(t);
    e.component(n + Zr.name, Zr);
  }
});
function Iu(e, t, n) {
  return Z(() => !!(e[n] || t[n]));
}
const Mu = be({
  name: "IconLink",
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
    const n = Pe("icon"), r = Z(() => [n, `${n}-link`, { [`${n}-spin`]: e.spin }]), o = Z(() => {
      const s = {};
      return e.size && (s.fontSize = mt(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: r,
      innerStyle: o,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), Bu = ["stroke-width", "stroke-linecap", "stroke-linejoin"], Lu = /* @__PURE__ */ j("path", { d: "m14.1 25.414-4.95 4.95a6 6 0 0 0 8.486 8.485l8.485-8.485a6 6 0 0 0 0-8.485m7.779.707 4.95-4.95a6 6 0 1 0-8.486-8.485l-8.485 8.485a6 6 0 0 0 0 8.485" }, null, -1), Nu = [
  Lu
];
function Ru(e, t, n, r, o, i) {
  return x(), Q("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: fe(e.cls),
    style: Ye(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, Nu, 14, Bu);
}
var Qr = /* @__PURE__ */ Fe(Mu, [["render", Ru]]);
const Fu = Object.assign(Qr, {
  install: (e, t) => {
    var n;
    const r = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(r + Qr.name, Qr);
  }
}), zu = be({
  name: "Link",
  components: { IconLink: Fu, IconLoading: Ln },
  props: {
    href: String,
    status: {
      type: String,
      default: "normal"
    },
    hoverable: {
      type: Boolean,
      default: !0
    },
    icon: Boolean,
    loading: Boolean,
    disabled: Boolean
  },
  emits: {
    click: (e) => !0
  },
  setup(e, { slots: t, emit: n }) {
    const r = Pe("link"), o = Iu(e, t, "icon"), i = (a) => {
      if (e.disabled || e.loading) {
        a.preventDefault();
        return;
      }
      n("click", a);
    };
    return {
      cls: Z(() => [
        r,
        `${r}-status-${e.status}`,
        {
          [`${r}-disabled`]: e.disabled,
          [`${r}-loading`]: e.loading,
          [`${r}-hoverless`]: !e.hoverable,
          [`${r}-with-icon`]: e.loading || o.value
        }
      ]),
      prefixCls: r,
      showIcon: o,
      handleClick: i
    };
  }
}), ju = ["href"];
function Vu(e, t, n, r, o, i) {
  const s = Te("icon-loading"), a = Te("icon-link");
  return x(), Q("a", {
    href: e.disabled ? void 0 : e.href,
    class: fe(e.cls),
    onClick: t[0] || (t[0] = (...l) => e.handleClick && e.handleClick(...l))
  }, [
    e.loading || e.showIcon ? (x(), Q("span", {
      key: 0,
      class: fe(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (x(), ve(s, { key: 0 })) : Oe(e.$slots, "icon", { key: 1 }, () => [
        H(a)
      ])
    ], 2)) : me("v-if", !0),
    Oe(e.$slots, "default")
  ], 10, ju);
}
var eo = /* @__PURE__ */ Fe(zu, [["render", Vu]]);
const Hu = Object.assign(eo, {
  install: (e, t) => {
    jt(e, t);
    const n = zt(t);
    e.component(n + eo.name, eo);
  }
}), Uu = (e) => {
  const t = re(!1), n = {
    overflow: "",
    width: "",
    boxSizing: ""
  };
  return {
    setOverflowHidden: () => {
      if (e.value) {
        const i = e.value;
        if (!t.value && i.style.overflow !== "hidden") {
          const s = c0(i);
          (s > 0 || l0(i)) && (n.overflow = i.style.overflow, n.width = i.style.width, n.boxSizing = i.style.boxSizing, i.style.overflow = "hidden", i.style.width = `${i.offsetWidth - s}px`, i.style.boxSizing = "border-box", t.value = !0);
        }
      }
    },
    resetOverflow: () => {
      if (e.value && t.value) {
        const i = e.value;
        i.style.overflow = n.overflow, i.style.width = n.width, i.style.boxSizing = n.boxSizing, t.value = !1;
      }
    }
  };
}, Wu = be({
  name: "Message",
  components: {
    AIconHover: Go,
    IconInfoCircleFill: Ea,
    IconCheckCircleFill: Sa,
    IconExclamationCircleFill: _a,
    IconCloseCircleFill: Ca,
    IconClose: Xo,
    IconLoading: Ln
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
    const n = Pe("message");
    let r = 0;
    const o = () => {
      t("close");
    }, i = () => {
      e.duration > 0 && (r = window.setTimeout(o, e.duration));
    }, s = () => {
      r && (window.clearTimeout(r), r = 0);
    };
    return lt(() => {
      i();
    }), Cr(() => {
      e.resetOnUpdate && (s(), i());
    }), ea(() => {
      s();
    }), {
      handleMouseEnter: () => {
        e.resetOnHover && s();
      },
      handleMouseLeave: () => {
        e.resetOnHover && i();
      },
      prefixCls: n,
      handleClose: o
    };
  }
});
function qu(e, t, n, r, o, i) {
  const s = Te("icon-info-circle-fill"), a = Te("icon-check-circle-fill"), l = Te("icon-exclamation-circle-fill"), u = Te("icon-close-circle-fill"), c = Te("icon-loading"), p = Te("icon-close"), g = Te("a-icon-hover");
  return x(), Q("li", {
    role: "alert",
    class: fe([
      e.prefixCls,
      `${e.prefixCls}-${e.type}`,
      { [`${e.prefixCls}-closable`]: e.closable }
    ]),
    onMouseenter: t[1] || (t[1] = (...w) => e.handleMouseEnter && e.handleMouseEnter(...w)),
    onMouseleave: t[2] || (t[2] = (...w) => e.handleMouseLeave && e.handleMouseLeave(...w))
  }, [
    e.showIcon && !(e.type === "normal" && !e.$slots.icon) ? (x(), Q("span", {
      key: 0,
      class: fe(`${e.prefixCls}-icon`)
    }, [
      Oe(e.$slots, "icon", {}, () => [
        e.type === "info" ? (x(), ve(s, { key: 0 })) : e.type === "success" ? (x(), ve(a, { key: 1 })) : e.type === "warning" ? (x(), ve(l, { key: 2 })) : e.type === "error" ? (x(), ve(u, { key: 3 })) : e.type === "loading" ? (x(), ve(c, { key: 4 })) : me("v-if", !0)
      ])
    ], 2)) : me("v-if", !0),
    j("span", {
      class: fe(`${e.prefixCls}-content`)
    }, [
      Oe(e.$slots, "default")
    ], 2),
    e.closable ? (x(), Q("span", {
      key: 1,
      class: fe(`${e.prefixCls}-close-btn`),
      onClick: t[0] || (t[0] = (...w) => e.handleClose && e.handleClose(...w))
    }, [
      H(g, null, {
        default: ie(() => [
          H(p)
        ]),
        _: 1
      })
    ], 2)) : me("v-if", !0)
  ], 34);
}
var Ku = /* @__PURE__ */ Fe(Wu, [["render", qu]]);
function Yu(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Xl(e);
}
var Gu = be({
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
    const n = Pe("message-list"), {
      zIndex: r
    } = Jo("message", {
      runOnMounted: !0
    });
    return () => {
      let o;
      return H(Gl, {
        class: [n, `${n}-${e.position}`],
        name: "fade-message",
        tag: "ul",
        style: {
          zIndex: r.value
        },
        onAfterLeave: () => t.emit("afterClose")
      }, Yu(o = e.messages.map((i) => {
        const s = {
          default: gn(i.content),
          icon: gn(i.icon)
        };
        return H(Ku, {
          key: i.id,
          type: i.type,
          duration: i.duration,
          closable: i.closable,
          resetOnUpdate: i.resetOnUpdate,
          resetOnHover: i.resetOnHover,
          onClose: () => t.emit("close", i.id)
        }, s);
      })) ? o : {
        default: () => [o]
      });
    };
  }
}), Xu = Object.defineProperty, Ju = Object.defineProperties, Zu = Object.getOwnPropertyDescriptors, Ji = Object.getOwnPropertySymbols, Qu = Object.prototype.hasOwnProperty, e1 = Object.prototype.propertyIsEnumerable, Zi = (e, t, n) => t in e ? Xu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, vr = (e, t) => {
  for (var n in t || (t = {}))
    Qu.call(t, n) && Zi(e, n, t[n]);
  if (Ji)
    for (var n of Ji(t))
      e1.call(t, n) && Zi(e, n, t[n]);
  return e;
}, xa = (e, t) => Ju(e, Zu(t));
class t1 {
  constructor(t, n) {
    this.messageCount = 0, this.add = (i) => {
      var s;
      this.messageCount++;
      const a = (s = i.id) != null ? s : `__arco_message_${this.messageCount}`;
      if (this.messageIds.has(a))
        return this.update(a, i);
      const l = _r(vr({ id: a }, i));
      return this.messages.value.push(l), this.messageIds.add(a), {
        close: () => this.remove(a)
      };
    }, this.update = (i, s) => {
      for (let a = 0; a < this.messages.value.length; a++)
        if (this.messages.value[a].id === i) {
          const l = !Tc(s.duration);
          Object.assign(this.messages.value[a], xa(vr({}, s), { id: i, resetOnUpdate: l }));
          break;
        }
      return {
        close: () => this.remove(i)
      };
    }, this.remove = (i) => {
      for (let s = 0; s < this.messages.value.length; s++) {
        const a = this.messages.value[s];
        if (a.id === i) {
          pt(a.onClose) && a.onClose(i), this.messages.value.splice(s, 1), this.messageIds.delete(i);
          break;
        }
      }
    }, this.clear = () => {
      this.messages.value.splice(0);
    }, this.destroy = () => {
      this.messages.value.length === 0 && this.container && (fr(null, this.container), document.body.removeChild(this.container), this.container = null, Yt[this.position] = void 0);
    };
    const { position: r = "top" } = t;
    this.container = wa("message"), this.messageIds = /* @__PURE__ */ new Set(), this.messages = re([]), this.position = r;
    const o = H(Gu, {
      messages: this.messages.value,
      position: r,
      onClose: this.remove,
      onAfterClose: this.destroy
    });
    (n ?? xt._context) && (o.appContext = n ?? xt._context), fr(o, this.container), document.body.appendChild(this.container);
  }
}
const Yt = {}, Ia = [...ka, "loading", "normal"], or = Ia.reduce((e, t) => (e[t] = (n, r) => {
  Tr(n) && (n = { content: n });
  const o = vr({ type: t }, n), { position: i = "top" } = o;
  return Yt[i] || (Yt[i] = new t1(o, r)), Yt[i].add(o);
}, e), {});
or.clear = (e) => {
  var t;
  e ? (t = Yt[e]) == null || t.clear() : Object.values(Yt).forEach((n) => n == null ? void 0 : n.clear());
};
const xt = xa(vr({}, or), {
  install: (e) => {
    const t = {
      clear: or.clear
    };
    for (const n of Ia)
      t[n] = (r, o = e._context) => or[n](r, o);
    e.config.globalProperties.$message = t;
  },
  _context: null
}), n1 = ({
  modalRef: e,
  wrapperRef: t,
  draggable: n,
  alignCenter: r
}) => {
  const o = re(!1), i = re([0, 0]), s = re([0, 0]), a = re(), l = re([0, 0]), u = re([0, 0]), c = () => {
    var d, h, E;
    if (t.value && e.value) {
      const { top: T, left: P } = t.value.getBoundingClientRect(), { clientWidth: R, clientHeight: f } = t.value, { top: L, left: A, width: v, height: m } = e.value.getBoundingClientRect(), y = r.value ? 0 : (d = e.value) == null ? void 0 : d.offsetTop, O = A - P, _ = L - T - y;
      (O !== ((h = s.value) == null ? void 0 : h[0]) || _ !== ((E = s.value) == null ? void 0 : E[1])) && (s.value = [O, _]);
      const S = R > v ? R - v : 0, M = f > m ? f - m - y : 0;
      (S !== u.value[0] || M !== u.value[1]) && (u.value = [S, M]), y && (l.value = [0, 0 - y]);
    }
  }, p = (d) => {
    n.value && (d.preventDefault(), o.value = !0, c(), i.value = [d.x, d.y], Mt(window, "mousemove", g), Mt(window, "mouseup", w), Mt(window, "contextmenu", w));
  }, g = (d) => {
    if (o.value) {
      const h = d.x - i.value[0], E = d.y - i.value[1];
      let T = s.value[0] + h, P = s.value[1] + E;
      T < l.value[0] && (T = l.value[0]), T > u.value[0] && (T = u.value[0]), P < l.value[1] && (P = l.value[1]), P > u.value[1] && (P = u.value[1]), a.value = [T, P];
    }
  }, w = () => {
    o.value = !1, kn(window, "mousemove", g), kn(window, "mouseup", w);
  };
  return {
    position: a,
    handleMoveDown: p
  };
};
var r1 = Object.defineProperty, Qi = Object.getOwnPropertySymbols, o1 = Object.prototype.hasOwnProperty, i1 = Object.prototype.propertyIsEnumerable, es = (e, t, n) => t in e ? r1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, s1 = (e, t) => {
  for (var n in t || (t = {}))
    o1.call(t, n) && es(e, n, t[n]);
  if (Qi)
    for (var n of Qi(t))
      i1.call(t, n) && es(e, n, t[n]);
  return e;
}, a1 = be({
  name: "Modal",
  components: {
    ClientOnly: Da,
    ArcoButton: nt,
    IconHover: Go,
    IconClose: Xo,
    IconInfoCircleFill: Ea,
    IconCheckCircleFill: Sa,
    IconExclamationCircleFill: _a,
    IconCloseCircleFill: Ca
  },
  inheritAttrs: !1,
  props: {
    visible: {
      type: Boolean,
      default: void 0
    },
    defaultVisible: {
      type: Boolean,
      default: !1
    },
    width: {
      type: [Number, String]
    },
    top: {
      type: [Number, String]
    },
    mask: {
      type: Boolean,
      default: !0
    },
    title: {
      type: String
    },
    titleAlign: {
      type: String,
      default: "center"
    },
    alignCenter: {
      type: Boolean,
      default: !0
    },
    unmountOnClose: Boolean,
    maskClosable: {
      type: Boolean,
      default: !0
    },
    hideCancel: {
      type: Boolean,
      default: !1
    },
    simple: {
      type: Boolean,
      default: (e) => e.notice
    },
    closable: {
      type: Boolean,
      default: !0
    },
    okText: String,
    cancelText: String,
    okLoading: {
      type: Boolean,
      default: !1
    },
    okButtonProps: {
      type: Object
    },
    cancelButtonProps: {
      type: Object
    },
    footer: {
      type: Boolean,
      default: !0
    },
    renderToBody: {
      type: Boolean,
      default: !0
    },
    popupContainer: {
      type: [String, Object],
      default: "body"
    },
    maskStyle: {
      type: Object
    },
    modalClass: {
      type: [String, Array]
    },
    modalStyle: {
      type: Object
    },
    onBeforeOk: {
      type: Function
    },
    onBeforeCancel: {
      type: Function
    },
    escToClose: {
      type: Boolean,
      default: !0
    },
    draggable: {
      type: Boolean,
      default: !1
    },
    fullscreen: {
      type: Boolean,
      default: !1
    },
    maskAnimationName: {
      type: String,
      default: (e) => e.fullscreen ? "fade-in-standard" : "fade-modal"
    },
    modalAnimationName: {
      type: String,
      default: (e) => e.fullscreen ? "zoom-in" : "zoom-modal"
    },
    bodyClass: {
      type: [String, Array]
    },
    bodyStyle: {
      type: [String, Object, Array]
    },
    messageType: {
      type: String
    },
    hideTitle: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    "update:visible": (e) => !0,
    ok: (e) => !0,
    cancel: (e) => !0,
    open: () => !0,
    close: () => !0,
    beforeOpen: () => !0,
    beforeClose: () => !0
  },
  setup(e, {
    emit: t
  }) {
    const {
      fullscreen: n,
      popupContainer: r,
      alignCenter: o
    } = $n(e), i = Pe("modal"), {
      t: s
    } = Dc(), a = re(), l = re(), u = re(e.defaultVisible), c = Z(() => {
      var Y;
      return (Y = e.visible) != null ? Y : u.value;
    }), p = re(!1), g = Z(() => e.okLoading || p.value), w = Z(() => e.draggable && !e.fullscreen), {
      teleportContainer: d,
      containerRef: h
    } = $a({
      popupContainer: r,
      visible: c
    }), E = re(c.value), T = Z(() => e.okText || s("modal.okText")), P = Z(() => e.cancelText || s("modal.cancelText")), {
      zIndex: R,
      isLastDialog: f
    } = Jo("dialog", {
      visible: c
    });
    let L = !1;
    const A = (Y) => {
      e.escToClose && Y.key === Ou.ESC && f() && X(Y);
    }, v = () => {
      e.escToClose && !L && (L = !0, Mt(document.documentElement, "keydown", A));
    }, m = () => {
      L = !1, kn(document.documentElement, "keydown", A);
    };
    let y = 0;
    const {
      position: O,
      handleMoveDown: _
    } = n1({
      wrapperRef: a,
      modalRef: l,
      draggable: w,
      alignCenter: o
    }), S = () => {
      y++, p.value && (p.value = !1), u.value = !1, t("update:visible", !1);
    }, M = async (Y) => {
      const ye = y, ge = await new Promise(async (Ce) => {
        var Ie;
        if (pt(e.onBeforeOk)) {
          let b = e.onBeforeOk((B = !0) => Ce(B));
          if ((xi(b) || !$i(b)) && (p.value = !0), xi(b))
            try {
              b = (Ie = await b) != null ? Ie : !0;
            } catch {
              b = !1;
            }
          $i(b) && Ce(b);
        } else
          Ce(!0);
      });
      ye === y && (ge ? (t("ok", Y), S()) : p.value && (p.value = !1));
    }, X = (Y) => {
      var ye;
      let ge = !0;
      pt(e.onBeforeCancel) && (ge = (ye = e.onBeforeCancel()) != null ? ye : !1), ge && (t("cancel", Y), S());
    }, ce = re(!1), ne = (Y) => {
      Y.target === a.value && (ce.value = !0);
    }, V = (Y) => {
      e.mask && e.maskClosable && ce.value && X(Y);
    }, ue = () => {
      c.value && (!s0(a.value, document.activeElement) && document.activeElement instanceof HTMLElement && document.activeElement.blur(), t("open"));
    }, $ = () => {
      c.value || (w.value && (O.value = void 0), E.value = !1, q(), t("close"));
    }, {
      setOverflowHidden: D,
      resetOverflow: q
    } = Uu(h);
    lt(() => {
      h.value = Co(e.popupContainer), c.value && (D(), e.escToClose && v());
    }), tn(() => {
      q(), m();
    }), Re(c, (Y) => {
      u.value !== Y && (u.value = Y), Y ? (t("beforeOpen"), E.value = !0, ce.value = !1, D(), v()) : (t("beforeClose"), m());
    }), Re(n, () => {
      O.value && (O.value = void 0);
    });
    const K = Z(() => [`${i}-wrapper`, {
      [`${i}-wrapper-align-center`]: e.alignCenter && !e.fullscreen,
      [`${i}-wrapper-moved`]: !!O.value
    }]), pe = Z(() => [`${i}`, e.modalClass, {
      [`${i}-simple`]: e.simple,
      [`${i}-draggable`]: w.value,
      [`${i}-fullscreen`]: e.fullscreen
    }]), ae = Z(() => {
      var Y;
      const ye = s1({}, (Y = e.modalStyle) != null ? Y : {});
      return e.width && !e.fullscreen && (ye.width = mt(e.width) ? `${e.width}px` : e.width), !e.alignCenter && e.top && (ye.top = mt(e.top) ? `${e.top}px` : e.top), O.value && (ye.transform = `translate(${O.value[0]}px, ${O.value[1]}px)`), ye;
    });
    return {
      prefixCls: i,
      mounted: E,
      computedVisible: c,
      containerRef: h,
      wrapperRef: a,
      mergedModalStyle: ae,
      okDisplayText: T,
      cancelDisplayText: P,
      zIndex: R,
      handleOk: M,
      handleCancel: X,
      handleMaskClick: V,
      handleMaskMouseDown: ne,
      handleOpen: ue,
      handleClose: $,
      mergedOkLoading: g,
      modalRef: l,
      wrapperCls: K,
      modalCls: pe,
      teleportContainer: d,
      handleMoveDown: _
    };
  }
});
function l1(e, t, n, r, o, i) {
  const s = Te("icon-info-circle-fill"), a = Te("icon-check-circle-fill"), l = Te("icon-exclamation-circle-fill"), u = Te("icon-close-circle-fill"), c = Te("icon-close"), p = Te("icon-hover"), g = Te("arco-button"), w = Te("client-only");
  return x(), ve(w, null, {
    default: ie(() => [
      (x(), ve(Qs, {
        to: e.teleportContainer,
        disabled: !e.renderToBody
      }, [
        !e.unmountOnClose || e.computedVisible || e.mounted ? rt((x(), Q("div", yn({
          key: 0,
          class: `${e.prefixCls}-container`,
          style: { zIndex: e.zIndex }
        }, e.$attrs), [
          H(bo, {
            name: e.maskAnimationName,
            appear: ""
          }, {
            default: ie(() => [
              e.mask ? rt((x(), Q("div", {
                key: 0,
                ref: "maskRef",
                class: fe(`${e.prefixCls}-mask`),
                style: Ye(e.maskStyle)
              }, null, 6)), [
                [ot, e.computedVisible]
              ]) : me("v-if", !0)
            ]),
            _: 1
          }, 8, ["name"]),
          j("div", {
            ref: "wrapperRef",
            class: fe(e.wrapperCls),
            onClick: t[2] || (t[2] = wo((...d) => e.handleMaskClick && e.handleMaskClick(...d), ["self"])),
            onMousedown: t[3] || (t[3] = wo((...d) => e.handleMaskMouseDown && e.handleMaskMouseDown(...d), ["self"]))
          }, [
            H(bo, {
              name: e.modalAnimationName,
              appear: "",
              onAfterEnter: e.handleOpen,
              onAfterLeave: e.handleClose
            }, {
              default: ie(() => [
                rt(j("div", {
                  ref: "modalRef",
                  class: fe(e.modalCls),
                  style: Ye(e.mergedModalStyle)
                }, [
                  !e.hideTitle && (e.$slots.title || e.title || e.closable) ? (x(), Q("div", {
                    key: 0,
                    class: fe(`${e.prefixCls}-header`),
                    onMousedown: t[1] || (t[1] = (...d) => e.handleMoveDown && e.handleMoveDown(...d))
                  }, [
                    e.$slots.title || e.title ? (x(), Q("div", {
                      key: 0,
                      class: fe([
                        `${e.prefixCls}-title`,
                        `${e.prefixCls}-title-align-${e.titleAlign}`
                      ])
                    }, [
                      e.messageType ? (x(), Q("div", {
                        key: 0,
                        class: fe(`${e.prefixCls}-title-icon`)
                      }, [
                        e.messageType === "info" ? (x(), ve(s, { key: 0 })) : me("v-if", !0),
                        e.messageType === "success" ? (x(), ve(a, { key: 1 })) : me("v-if", !0),
                        e.messageType === "warning" ? (x(), ve(l, { key: 2 })) : me("v-if", !0),
                        e.messageType === "error" ? (x(), ve(u, { key: 3 })) : me("v-if", !0)
                      ], 2)) : me("v-if", !0),
                      Oe(e.$slots, "title", {}, () => [
                        Ne(se(e.title), 1)
                      ])
                    ], 2)) : me("v-if", !0),
                    !e.simple && e.closable ? (x(), Q("div", {
                      key: 1,
                      tabindex: "-1",
                      role: "button",
                      "aria-label": "Close",
                      class: fe(`${e.prefixCls}-close-btn`),
                      onClick: t[0] || (t[0] = (...d) => e.handleCancel && e.handleCancel(...d))
                    }, [
                      H(p, null, {
                        default: ie(() => [
                          H(c)
                        ]),
                        _: 1
                      })
                    ], 2)) : me("v-if", !0)
                  ], 34)) : me("v-if", !0),
                  j("div", {
                    class: fe([`${e.prefixCls}-body`, e.bodyClass]),
                    style: Ye(e.bodyStyle)
                  }, [
                    Oe(e.$slots, "default")
                  ], 6),
                  e.footer ? (x(), Q("div", {
                    key: 1,
                    class: fe(`${e.prefixCls}-footer`)
                  }, [
                    Oe(e.$slots, "footer", {}, () => [
                      e.hideCancel ? me("v-if", !0) : (x(), ve(g, yn({ key: 0 }, e.cancelButtonProps, { onClick: e.handleCancel }), {
                        default: ie(() => [
                          Ne(se(e.cancelDisplayText), 1)
                        ]),
                        _: 1
                      }, 16, ["onClick"])),
                      H(g, yn({ type: "primary" }, e.okButtonProps, {
                        loading: e.mergedOkLoading,
                        onClick: e.handleOk
                      }), {
                        default: ie(() => [
                          Ne(se(e.okDisplayText), 1)
                        ]),
                        _: 1
                      }, 16, ["loading", "onClick"])
                    ])
                  ], 2)) : me("v-if", !0)
                ], 6), [
                  [ot, e.computedVisible]
                ])
              ]),
              _: 3
            }, 8, ["name", "onAfterEnter", "onAfterLeave"])
          ], 34)
        ], 16)), [
          [ot, e.computedVisible || e.mounted]
        ]) : me("v-if", !0)
      ], 8, ["to", "disabled"]))
    ]),
    _: 3
  });
}
var ir = /* @__PURE__ */ Fe(a1, [["render", l1]]), c1 = Object.defineProperty, u1 = Object.defineProperties, d1 = Object.getOwnPropertyDescriptors, ts = Object.getOwnPropertySymbols, f1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.propertyIsEnumerable, ns = (e, t, n) => t in e ? c1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Bt = (e, t) => {
  for (var n in t || (t = {}))
    f1.call(t, n) && ns(e, n, t[n]);
  if (ts)
    for (var n of ts(t))
      p1.call(t, n) && ns(e, n, t[n]);
  return e;
}, m1 = (e, t) => u1(e, d1(t));
const to = (e, t) => {
  let n = wa("modal");
  const r = () => {
    u.component && (u.component.props.visible = !1), pt(e.onOk) && e.onOk();
  }, o = () => {
    u.component && (u.component.props.visible = !1), pt(e.onCancel) && e.onCancel();
  }, i = async () => {
    await dr(), n && (fr(null, n), document.body.removeChild(n)), n = null, pt(e.onClose) && e.onClose();
  }, s = () => {
    u.component && (u.component.props.visible = !1);
  }, a = (c) => {
    u.component && Object.entries(c).forEach(([p, g]) => {
      u.component.props[p] = g;
    });
  }, u = H(ir, Bt(Bt(Bt({}, {
    visible: !0,
    renderToBody: !1,
    unmountOnClose: !0,
    onOk: r,
    onCancel: o,
    onClose: i
  }), Ta(e, ["content", "title", "footer", "visible", "unmountOnClose", "onOk", "onCancel", "onClose"])), {
    footer: typeof e.footer == "boolean" ? e.footer : void 0
  }), {
    default: gn(e.content),
    title: gn(e.title),
    footer: typeof e.footer != "boolean" ? gn(e.footer) : void 0
  });
  return (t ?? ko._context) && (u.appContext = t ?? ko._context), fr(u, n), document.body.appendChild(n), {
    close: s,
    update: a
  };
}, no = Bt({
  open: to,
  confirm: (e, t) => {
    const n = Bt({
      simple: !0,
      messageType: "warning"
    }, e);
    return to(n, t);
  }
}, ka.reduce((e, t) => (e[t] = (n, r) => {
  const o = Bt({
    simple: !0,
    hideCancel: !0,
    messageType: t
  }, n);
  return to(o, r);
}, e), {})), ko = Object.assign(ir, m1(Bt({}, no), {
  install: (e, t) => {
    jt(e, t);
    const n = zt(t);
    e.component(n + ir.name, ir);
    const r = {};
    for (const o of Object.keys(no))
      r[o] = (i, s = e._context) => no[o](i, s);
    e.config.globalProperties.$modal = r;
  },
  _context: null
}));
function h1(e, t) {
  return t = { exports: {} }, e(t, t.exports), t.exports;
}
var v1 = h1(function(e) {
  var t = e.exports = function(n, r) {
    if (r || (r = 16), n === void 0 && (n = 128), n <= 0) return "0";
    for (var o = Math.log(Math.pow(2, n)) / Math.log(r), i = 2; o === 1 / 0; i *= 2)
      o = Math.log(Math.pow(2, n / i)) / Math.log(r) * i;
    for (var s = o - Math.floor(o), a = "", i = 0; i < Math.floor(o); i++) {
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
  t.rack = function(n, r, o) {
    var i = function(a) {
      var l = 0;
      do {
        if (l++ > 10)
          if (o) n += o;
          else throw new Error("too many ID collisions, use more bits");
        var u = t(n, r);
      } while (Object.hasOwnProperty.call(s, u));
      return s[u] = a, u;
    }, s = i.hats = {};
    return i.get = function(a) {
      return i.hats[a];
    }, i.set = function(a, l) {
      return i.hats[a] = l, i;
    }, i.bits = n || 128, i.base = r || 16, i;
  };
});
function ht(e) {
  if (!(this instanceof ht))
    return new ht(e);
  e = e || [128, 36, 1], this._seed = e.length ? v1.rack(e[0], e[1], e[2]) : e;
}
ht.prototype.next = function(e) {
  return this._seed(e || !0);
};
ht.prototype.nextPrefixed = function(e, t) {
  var n;
  do
    n = e + this.next(!0);
  while (this.assigned(n));
  return this.claim(n, t), n;
};
ht.prototype.claim = function(e, t) {
  this._seed.set(e, t || !0);
};
ht.prototype.assigned = function(e) {
  return this._seed.get(e) || !1;
};
ht.prototype.unclaim = function(e) {
  delete this._seed.hats[e];
};
ht.prototype.clear = function() {
  var e = this._seed.hats, t;
  for (t in e)
    this.unclaim(t);
};
const y1 = Object.prototype.toString;
function rs(e) {
  return e === void 0;
}
function g1(e) {
  return y1.call(e) === "[object Object]";
}
function Ma(e, t, n) {
  const r = e.get("scopeIds", !1) || new ht([32, 36]), o = {}, i = {}, s = new b1(), a = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map();
  function g(b) {
    return !b.parent || b.parent === b ? b : g(b.parent);
  }
  q("tick", function() {
    for (const b of a)
      D("elementChanged", {
        element: b
      });
    a.clear();
  });
  function w(b, B) {
    if (l.push([B, b]), l.length !== 1)
      return;
    let F;
    for (; F = l[0]; ) {
      const [G, U] = F;
      U.destroyed || G(), l.shift();
    }
    D("tick");
  }
  function d(b) {
    return i[b.type] || s;
  }
  function h(b) {
    const {
      element: B,
      parentScope: F,
      initiator: G = null,
      scope: U = Y({
        element: B,
        parent: F,
        initiator: G
      })
    } = b;
    return w(U, function() {
      U.running || U.start(), V("signal", {
        ...b,
        scope: U
      }), d(B).signal({
        ...b,
        scope: U
      }), U.parent && $(U.parent);
    }), U;
  }
  function E(b) {
    const { element: B, scope: F, initiator: G = F } = b, U = Y({
      element: B,
      parent: F,
      initiator: G
    });
    return w(U, function() {
      if (U.running || U.start(), Le(B, "bpmn:SequenceFlow")) {
        const z = g(U), de = B.id;
        let we = p.get(z.id);
        rs(we) && p.set(z.id, /* @__PURE__ */ new Map()), we = p.get(z.id);
        let De = we.get(de);
        if (rs(De) && (De = 1), De > 2)
          return;
        De++, we.set(de, De);
      }
      V("enter", b), d(B).enter({
        ...b,
        initiator: G,
        scope: U
      }), U.parent && $(U.parent);
    }), U;
  }
  function T(b) {
    const { element: B, scope: F, initiator: G = F } = b;
    w(F, function() {
      V("exit", b), d(B).exit({
        ...b,
        initiator: G
      }), F.running && F.complete(), ne(F, G), F.parent && $(F.parent);
    });
  }
  function P(b) {
    const { event: B, initiator: F, scope: G } = b, U = v(B), z = G.subscriptions, de = Un(
      z,
      (_e) => Ti(U, _e.event)
    ), we = de.filter(
      (_e) => !_e.event.interrupting
    ), De = de.filter(
      (_e) => _e.event.interrupting
    );
    if (!De.length)
      return we.map((_e) => _e.triggerFn(F)).flat();
    const ct = De.find((_e) => !_e.event.boundary) || De[0], ke = Un(
      z,
      (_e) => _e.event.persistent || w1(_e.event, ct.event)
    );
    return z.forEach((_e) => {
      ke.includes(_e) || _e.remove();
    }), [ct.triggerFn(F)].flat().filter((_e) => _e);
  }
  function R(b, B, F) {
    B = v(B);
    const G = B.element, U = {
      scope: b,
      event: B,
      element: G,
      triggerFn: F,
      remove() {
        f(U);
      }
    };
    return c.add(U), b.subscriptions.add(U), G && ue(G), U;
  }
  function f(b) {
    const { scope: B, event: F } = b;
    c.delete(b), B.subscriptions.delete(b), F.element && ue(F.element);
  }
  function L(b) {
    return Le(b, "bpmn:StartEvent") || Le(b, "bpmn:IntermediateCatchEvent") || Le(b, "bpmn:ReceiveTask") || S1(b) ? cc(b).name || b.id : null;
  }
  function A(b) {
    return {
      element: b,
      interrupting: !1,
      boundary: !1,
      iref: b.id,
      type: "none"
    };
  }
  function v(b) {
    if (!b.businessObject)
      return b;
    const B = lc(b), F = tr(b), G = L(b), U = {
      element: b,
      interrupting: B,
      boundary: F,
      ...G ? { iref: G } : {}
    }, z = Ba(b)[0];
    if (!z)
      return {
        ...U,
        type: E1(b) ? "message" : "none"
      };
    if (Le(z, "bpmn:LinkEventDefinition"))
      return {
        ...U,
        type: "link",
        name: z.name
      };
    if (Le(z, "bpmn:SignalEventDefinition"))
      return {
        ...U,
        type: "signal",
        ref: z.signalRef
      };
    if (Le(z, "bpmn:TimerEventDefinition"))
      return {
        ...U,
        type: "timer"
      };
    if (Le(z, "bpmn:ConditionalEventDefinition"))
      return {
        ...U,
        type: "condition"
      };
    if (Le(z, "bpmn:EscalationEventDefinition"))
      return {
        ...U,
        type: "escalation",
        ref: z.escalationRef
      };
    if (Le(z, "bpmn:CancelEventDefinition"))
      return {
        ...U,
        type: "cancel"
      };
    if (Le(z, "bpmn:ErrorEventDefinition"))
      return {
        ...U,
        type: "error",
        ref: z.errorRef
      };
    if (Le(z, "bpmn:MessageEventDefinition"))
      return {
        ...U,
        type: "message",
        ref: z.messageRef
      };
    if (Le(z, "bpmn:CompensateEventDefinition")) {
      let de = z.activityRef && n.get(z.activityRef.id);
      return de || (Fr(b) && Oi(b.parent) ? de = b.parent.parent : tr(b) ? de = b.host : de = b.parent), {
        ...U,
        type: "compensate",
        ref: de,
        persistent: !0
      };
    }
    throw new Error("unknown event definition", z);
  }
  function m(b, B = !0) {
    const { element: F, parent: G, initiator: U } = b;
    B && V("createScope", {
      element: F,
      scope: G
    });
    const z = new ac(r.next(), F, G, U);
    return G && G.children.push(z), u.add(z), B && D("createScope", {
      scope: z
    }), ue(F), G && ue(G.element), z;
  }
  function y(b) {
    if (typeof b == "function")
      return b;
    const { event: B, element: F, scope: G } = b, U = b.elements || F && [F], z = B && v(B);
    return (de) => (!z || Ti(z, de.event)) && (!U || U.includes(de.element)) && (!G || G === de.scope);
  }
  function O(b) {
    const B = b === "function" ? b : y(b);
    return (F) => Array.from(F.subscriptions).some(B);
  }
  function _(b) {
    if (typeof b == "function")
      return b;
    const { element: B, waitsOnElement: F, parent: G, trait: U = Ci.RUNNING, subscribedTo: z } = b, de = z ? O(z) : () => !0;
    return (we) => (!B || we.element === B) && (!G || we.parent === G) && (!F || we.getTokensByElement(F) > 0) && we.hasTrait(U) && de(we);
  }
  function S(b) {
    return Un(c, y(b));
  }
  function M(b) {
    return ki(c, y(b));
  }
  function X(b) {
    return Un(u, _(b));
  }
  function ce(b) {
    return ki(u, _(b));
  }
  function ne(b, B = null) {
    if (!b.destroyed) {
      b.destroy(B);
      for (const F of b.subscriptions) {
        const G = F.event.traits || Ci.ACTIVE;
        b.hasTrait(G) || f(F);
      }
      if (b.destroyed) {
        for (const F of b.children)
          F.destroyed || ne(F, B);
        V("destroyScope", {
          element: b.element,
          scope: b
        }), u.delete(b), D("destroyScope", {
          scope: b
        });
      }
      ue(b.element), b.parent && ue(b.parent.element);
    }
  }
  function V(b, B) {
    D("trace", {
      ...B,
      action: b
    });
  }
  function ue(b) {
    a.add(b), l.length || D("tick");
  }
  function $(b) {
    D("scopeChanged", {
      scope: b
    });
  }
  function D(b, B = {}) {
    return t.fire(`tokenSimulation.simulator.${b}`, B);
  }
  function q(b, B) {
    t.on("tokenSimulation.simulator." + b, B);
  }
  function K(b, B) {
    t.off("tokenSimulation.simulator." + b, B);
  }
  function pe(b, B) {
    const F = ye(b);
    o[b.id || b] = {
      ...F,
      ...B
    }, ue(b);
  }
  function ae() {
    const b = [];
    return n.forEach((B) => {
      if (!oa(B, ["bpmn:Process", "bpmn:Participant"]))
        return;
      const F = m(
        {
          element: B
        },
        !1
      );
      b.push(F);
      const G = B.children.filter(Fr), U = B.children.filter(uc);
      for (const z of G) {
        const de = {
          ...v(z),
          interrupting: !1
        };
        R(
          F,
          de,
          (we) => h({
            element: B,
            startEvent: z,
            initiator: we
          })
        );
      }
      if (!G.length)
        for (const z of U) {
          const de = A(z);
          R(
            F,
            de,
            (we) => h({
              element: B,
              initiator: we
            })
          );
        }
    }), b;
  }
  function Y(b) {
    const { element: B } = b, F = m(b), { children: G = [], attachers: U = [] } = B;
    for (const z of G)
      if (Oi(z)) {
        const de = z.children.filter(
          (we) => Fr(we) && !Ai(we)
        );
        for (const we of de)
          R(F, we, (De) => h({
            element: z,
            parentScope: F,
            startEvent: we,
            initiator: De
          }));
      }
    for (const z of U)
      tr(z) && !Ai(z) && R(F, z, (de) => h({
        element: z,
        parentScope: F.parent,
        hostScope: F,
        initiator: de
      }));
    return F;
  }
  function ye(b) {
    return o[b.id || b] || {};
  }
  function ge(b, B) {
    if (!B.length)
      return;
    const F = {
      type: "all-completed",
      persistent: !1
    }, G = new Set(B), U = (z) => {
      G.delete(z.scope), G.size === 0 && (K("destroyScope", U), P({
        scope: b,
        event: F
      }));
    };
    return q("destroyScope", U), F;
  }
  function Ce(b, B = !0) {
    pe(b, {
      wait: B
    });
  }
  function Ie() {
    for (const b of u)
      ne(b);
    for (const b of ae())
      u.add(b);
    p.clear(), D("tick"), D("reset");
  }
  this.createScope = m, this.destroyScope = ne, this.findScope = ce, this.findScopes = X, this.findSubscription = M, this.findSubscriptions = S, this.waitAtElement = Ce, this.waitForScopes = ge, this.setConfig = pe, this.getConfig = ye, this.signal = h, this.enter = E, this.exit = T, this.subscribe = R, this.trigger = P, this.reset = Ie, this.on = q, this.off = K, this.registerBehavior = function(b, B) {
    i[b] = B;
  };
}
Ma.$inject = ["injector", "eventBus", "elementRegistry"];
function b1() {
  this.signal = function(e) {
    console.log("ignored #exit", e.element);
  }, this.exit = function(e) {
    console.log("ignored #exit", e.element);
  }, this.enter = function(e) {
    console.log("ignored #enter", e.element);
  };
}
function w1(e, t) {
  return e.type === t.type && e.boundary && !t.boundary;
}
function E1(e) {
  return Le(e, "bpmn:ReceiveTask") || e.incoming.some((t) => Le(t, "bpmn:MessageFlow"));
}
function S1(e) {
  if (!tr(e))
    return !1;
  const t = Ba(e);
  return !t[0] || oa(t[0], ["bpmn:ConditionalEventDefinition", "bpmn:TimerEventDefinition"]);
}
function Ba(e) {
  return e.businessObject.get("eventDefinitions") || [];
}
const _1 = 5e3, C1 = {
  __depends__: [dc],
  __init__: [
    [
      "eventBus",
      "simulator",
      function(e, t) {
        e.on(
          ["tokenSimulation.toggleMode", "tokenSimulation.resetSimulation"],
          _1,
          (n) => {
            t.reset();
          }
        );
      }
    ]
  ],
  simulator: ["type", Ma]
};
var ro, os;
function k1() {
  if (os) return ro;
  os = 1;
  const e = {
    legend: [1, "<fieldset>", "</fieldset>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    _default: [0, "", ""]
  };
  e.td = e.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"], e.option = e.optgroup = [1, '<select multiple="multiple">', "</select>"], e.thead = e.tbody = e.colgroup = e.caption = e.tfoot = [1, "<table>", "</table>"], e.polyline = e.ellipse = e.polygon = e.circle = e.text = e.line = e.path = e.rect = e.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', "</svg>"];
  function t(n, r = globalThis.document) {
    var p;
    if (typeof n != "string")
      throw new TypeError("String expected");
    const o = /^<!--(.*?)-->$/s.exec(n);
    if (o)
      return r.createComment(o[1]);
    const i = (p = /<([\w:]+)/.exec(n)) == null ? void 0 : p[1];
    if (!i)
      return r.createTextNode(n);
    if (n = n.trim(), i === "body") {
      const g = r.createElement("html");
      g.innerHTML = n;
      const { lastChild: w } = g;
      return w.remove(), w;
    }
    let [s, a, l] = Object.hasOwn(e, i) ? e[i] : e._default, u = r.createElement("div");
    for (u.innerHTML = a + n + l; s--; )
      u = u.lastChild;
    if (u.firstChild === u.lastChild) {
      const { firstChild: g } = u;
      return g.remove(), g;
    }
    const c = r.createDocumentFragment();
    return c.append(...u.childNodes), c;
  }
  return ro = t, ro;
}
var T1 = /* @__PURE__ */ k1();
const ft = /* @__PURE__ */ Du(T1);
function O1(e, t) {
  return t.forEach(function(n) {
    n && typeof n != "string" && !Array.isArray(n) && Object.keys(n).forEach(function(r) {
      if (r !== "default" && !(r in e)) {
        var o = Object.getOwnPropertyDescriptor(n, r);
        Object.defineProperty(e, r, o.get ? o : {
          enumerable: !0,
          get: function() {
            return n[r];
          }
        });
      }
    });
  }), Object.freeze(e);
}
const A1 = Object.prototype.toString;
function Me(e) {
  return new Ct(e);
}
function Ct(e) {
  if (!e || !e.nodeType)
    throw new Error("A DOM element reference is required");
  this.el = e, this.list = e.classList;
}
Ct.prototype.add = function(e) {
  return this.list.add(e), this;
};
Ct.prototype.remove = function(e) {
  return A1.call(e) == "[object RegExp]" ? this.removeMatching(e) : (this.list.remove(e), this);
};
Ct.prototype.removeMatching = function(e) {
  const t = this.array();
  for (let n = 0; n < t.length; n++)
    e.test(t[n]) && this.remove(t[n]);
  return this;
};
Ct.prototype.toggle = function(e, t) {
  return typeof t < "u" ? t !== this.list.toggle(e, t) && this.list.toggle(e) : this.list.toggle(e), this;
};
Ct.prototype.array = function() {
  return Array.from(this.list);
};
Ct.prototype.has = Ct.prototype.contains = function(e) {
  return this.list.contains(e);
};
function P1(e, t, n) {
  var r = n ? e : e.parentNode;
  return r && typeof r.closest == "function" && r.closest(t) || null;
}
var yr = {}, gr, To, Qo;
function La() {
  gr = window.addEventListener ? "addEventListener" : "attachEvent", To = window.removeEventListener ? "removeEventListener" : "detachEvent", Qo = gr !== "addEventListener" ? "on" : "";
}
var D1 = yr.bind = function(e, t, n, r) {
  return gr || La(), e[gr](Qo + t, n, r || !1), n;
}, $1 = yr.unbind = function(e, t, n, r) {
  return To || La(), e[To](Qo + t, n, r || !1), n;
}, Et = /* @__PURE__ */ O1({
  __proto__: null,
  bind: D1,
  default: yr,
  unbind: $1
}, [yr]), Na = ["focus", "blur"];
function x1(e, t, n, r, o) {
  return Na.indexOf(n) !== -1 && (o = !0), Et.bind(e, n, function(i) {
    var s = i.target || i.srcElement;
    i.delegateTarget = P1(s, t, !0), i.delegateTarget && r.call(e, i);
  }, o);
}
function I1(e, t, n, r) {
  return Na.indexOf(t) !== -1 && (r = !0), Et.unbind(e, t, n, r);
}
var M1 = {
  bind: x1,
  unbind: I1
};
function Kn(e, t) {
  return t = t || document, t.querySelector(e);
}
function B1(e, t) {
  return t = t || document, t.querySelectorAll(e);
}
const L1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/></svg>', N1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>', R1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"/></svg>', F1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/></svg>', z1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>', j1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z"/></svg>', V1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>', H1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>', U1 = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="arco-icon arco-icon-empty" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"><path d="M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"></path></svg>';
function yt(e) {
  return function(n = "") {
    return `<span class="bts-icon ${n}">${e}</span>`;
  };
}
const is = yt(L1), W1 = yt(U1), ss = yt(N1), Ra = yt(R1), q1 = yt(F1), K1 = yt(z1), Y1 = yt(j1), G1 = yt(V1), as = yt(H1), X1 = K1(), J1 = q1(), ls = 1500;
class ei {
  constructor(t, n, r, o, i) {
    J(this, "_eventBus");
    J(this, "_tokenSimulationPalette");
    J(this, "_notifications");
    J(this, "_translate");
    J(this, "canvasParent");
    J(this, "_paletteEntry");
    J(this, "isActive");
    J(this, "isPaused");
    J(this, "playMarkup");
    J(this, "pauseMarkup");
    this._eventBus = t, this._tokenSimulationPalette = n, this._notifications = r, this._translate = i, this.canvasParent = o.getContainer().parentNode, this.isActive = !1, this.isPaused = !0, this.playMarkup = () => `${X1}<span>${i("Play Simulation")}</span>`, this.pauseMarkup = () => `${J1}<span>${i("Pause Simulation")}</span>`, this._init(), t.on(kr, ls, (a) => {
      this.activate(), this.unpause();
    }), t.on([In, nn], () => {
      this.deactivate(), this.pause();
    }), t.on(ia, ls, (a) => {
      this.unpause();
    });
    const s = this;
    t.on("i18n.changed", function() {
      s._updateEntry();
    });
  }
  _init() {
    const t = this._translate("Play/Pause Simulation");
    this._paletteEntry = ft(
      `<div class="bts-entry disabled" title="${t}">${this.playMarkup()}</div>`
    ), Et.bind(this._paletteEntry, "click", this.toggle.bind(this)), this._tokenSimulationPalette.addEntry(this._paletteEntry, 1);
  }
  _updateEntry() {
    this._paletteEntry && (this._paletteEntry.innerHTML = this.isPaused ? this.playMarkup() : this.pauseMarkup());
  }
  pause() {
    this.isActive && (Me(this._paletteEntry).remove("active"), Me(this.canvasParent).add("paused"), this._paletteEntry.innerHTML = this.playMarkup(), this._eventBus.fire(fc), this._notifications.showNotification({
      text: "Pause Simulation"
    }), this.isPaused = !0);
  }
  unpause() {
    !this.isActive || !this.isPaused || (Me(this._paletteEntry).add("active"), Me(this.canvasParent).remove("paused"), this._paletteEntry.innerHTML = this.pauseMarkup(), this._eventBus.fire(pc), this._notifications.showNotification({
      text: "Play Simulation"
    }), this.isPaused = !1);
  }
  toggle() {
    this.isPaused ? this.unpause() : this.pause();
  }
  activate() {
    this.isActive = !0, Me(this._paletteEntry).remove("disabled");
  }
  deactivate() {
    this.isActive = !1, Me(this._paletteEntry).remove("active"), Me(this._paletteEntry).add("disabled");
  }
}
J(ei, "$inject");
ei.$inject = [
  "eventBus",
  "tokenSimulationPalette",
  "notifications",
  "canvas",
  "translate"
];
const Z1 = 2e3, Q1 = Ra();
class ti {
  constructor(t, n, r, o) {
    J(this, "_eventBus");
    J(this, "_canvas");
    J(this, "_scopeFilter");
    J(this, "_translate");
    J(this, "container");
    this._eventBus = t, this._canvas = n, this._scopeFilter = r, this._translate = o, this._init(), t.on([nn, In], (i) => {
      this.clear();
    });
  }
  _init() {
    this.container = ft('<div class="bts-notifications"></div>'), this._canvas.getContainer().appendChild(this.container);
  }
  clear() {
    for (; this.container.children.length; )
      this.container.children[0].remove();
  }
  showNotification(t) {
    const n = this._translate, {
      text: r,
      type: o = "info",
      icon: i = Q1,
      scope: s,
      ttl: a = Z1
    } = t;
    if (s && !this._scopeFilter.isShown(s))
      return;
    const l = i.startsWith("<") ? i : `<i class="${i}"></i>`, u = s && s.colors, c = u ? `style="color: ${u.auxiliary}; background: ${u.primary}"` : "", p = n(r), g = ft(`
    <div class="bts-notification ${o}">
      <span class="bts-icon">${l}</span>
      <span class="bts-text" title="${p}">${p}</span>
      ${s ? `<span class="bts-scope" ${c}>${s.id}</span>` : ""}
    </div>
  `);
    for (this.container.appendChild(g); this.container.children.length > 4; )
      this.container.children[0].remove();
    setTimeout(function() {
      g.remove();
    }, a);
  }
}
J(ti, "$inject");
ti.$inject = ["eventBus", "canvas", "scopeFilter", "translate"];
const Ar = {
  __depends__: [sa],
  notifications: ["type", ti]
}, ed = {
  __depends__: [Ar],
  __init__: ["pauseSimulation"],
  pauseSimulation: ["type", ei]
};
class ni {
  constructor(t, n, r, o) {
    J(this, "_eventBus");
    J(this, "_tokenSimulationPalette");
    J(this, "_notifications");
    J(this, "_translate");
    J(this, "_paletteEntry");
    J(this, "_active");
    this._eventBus = t, this._tokenSimulationPalette = n, this._notifications = r, this._translate = o, this._init(), t.on(kr, () => {
      Me(this._paletteEntry).remove("disabled");
    }), t.on(nn, (s) => {
      this._active = s.active, this._active || this.resetSimulation();
    });
    const i = this;
    t.on("i18n.changed", function() {
      i._updateEntry();
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
    this._paletteEntry = ft(`
    <div class="bts-entry disabled" title="${t}">
      ${Y1()}
      <span class="bts-entry-text">${t}</span>
    </div>
  `), Et.bind(this._paletteEntry, "click", () => {
      this.resetSimulation(), this._notifications.showNotification({
        text: "Reset Simulation",
        type: "info"
      });
    }), this._tokenSimulationPalette.addEntry(this._paletteEntry, 2);
  }
  resetSimulation() {
    Me(this._paletteEntry).add("disabled"), this._eventBus.fire(In);
  }
}
J(ni, "$inject");
ni.$inject = ["eventBus", "tokenSimulationPalette", "notifications", "translate"];
const td = {
  __depends__: [Ar],
  __init__: ["resetSimulation"],
  resetSimulation: ["type", ni]
};
var go;
let Fa = (go = class {
  constructor(t, n, r) {
    J(this, "_elementRegistry");
    J(this, "_elementColors");
    this._elementRegistry = n, this._elementColors = r;
  }
  _setNeutralColors() {
  }
}, J(go, "$inject"), go);
Fa.$inject = ["eventBus", "elementRegistry", "elementColors"];
const nd = {
  __depends__: [vc],
  __init__: ["neutralElementColors"],
  neutralElementColors: ["type", Fa]
}, rd = -15, od = 15;
class ri {
  constructor(t, n, r) {
    J(this, "_overlays");
    J(this, "_translate");
    this._overlays = t, this._translate = r, n.on([In, kr, nn], () => {
      this.clear();
    });
  }
  addElementNotification(t, n) {
    const r = {
      top: rd,
      right: od
    }, { type: o, icon: i, text: s, scope: a = {} } = n, l = a.colors, u = l ? `style="color: ${l.auxiliary}; background: ${l.primary}"` : "", c = this._translate(s), p = ft(`
    <div class="bts-element-notification ${o || ""}" ${u}>
      ${i || ""}
      <span class="bts-text">${c}</span>
    </div>
  `);
    this._overlays.add(t, "bts-element-notification", {
      position: r,
      html: p,
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
J(ri, "$inject");
ri.$inject = ["overlays", "eventBus", "translate"];
const id = {
  elementNotifications: ["type", ri]
}, sd = {
  __depends__: [id, Ar],
  __init__: ["elementSupport"],
  elementSupport: ["type", yc]
}, ad = {
  copy: "fbpmn-icon-copy-service-task",
  sc: "fbpmn-icon-sc-service-task",
  dubbo: "fbpmn-icon-dubbo-service-task",
  dmn: "fbpmn-icon-dmn-service-task",
  mq: "fbpmn-icon-mq-service-task",
  rest: "fbpmn-icon-rest-service-task",
  http: "fbpmn-icon-http-service-task",
  email: "fbpmn-icon-mail-service-task",
  camel: "fbpmn-icon-camel-service-task",
  shell: "ibpmn-icon-shell-service-task",
  ws: "ibpmn-icon-ws-service-task"
}, ld = {
  copy: "Copy Service Task",
  sc: "Sc Service Task",
  dubbo: "Dubbo Service Task",
  dmn: "Dmn Service Task",
  mq: "Mq Service Task",
  rest: "Rest Service Task",
  http: "Http Service Task",
  email: "Email Service Task",
  camel: "Camel Service Task",
  shell: "Shell Service Task",
  ws: "Web Service Task",
  sql: "SQL Service Task"
};
function cd(e) {
  if (!e)
    return;
  const t = e.get("extensionElements");
  if (t)
    return t.get("values");
}
function Pr(e, t) {
  const n = cd(e);
  return !n || !n.length ? [] : t ? n.filter((r) => oe(r, t)) : n;
}
function za(e, t) {
  return Pr(e, `flowable:${t}`);
}
const ud = Ra(), dd = W1("a-lager-icon");
function oo(e) {
  const t = e && e.businessObject.name;
  return t && gc(t);
}
function io(e, t) {
  const n = Oo(e);
  return n === "none" ? "bpmn-icon-intermediate-event-none" : `bpmn-icon-intermediate-event-${t}-${n}`;
}
function Oo(e) {
  const t = xn(e);
  if (za(
    t,
    "VariableListenerEventDefinition"
  ).length)
    return "multiple";
  if (t.get("eventDefinitions").length === 0)
    return "none";
  const r = t.eventDefinitions[0];
  return oe(r, "bpmn:MessageEventDefinition") ? "message" : oe(r, "bpmn:TimerEventDefinition") ? "timer" : oe(r, "bpmn:SignalEventDefinition") ? "signal" : oe(r, "bpmn:ErrorEventDefinition") ? "error" : oe(r, "bpmn:EscalationEventDefinition") ? "escalation" : oe(r, "bpmn:CompensateEventDefinition") ? "compensation" : oe(r, "bpmn:ConditionalEventDefinition") ? "condition" : oe(r, "bpmn:LinkEventDefinition") ? "link" : oe(r, "bpmn:CancelEventDefinition") ? "cancel" : oe(r, "bpmn:TerminateEventDefinition") ? "terminate" : "none";
}
class oi {
  constructor(t, n, r, o, i, s, a) {
    J(this, "_notifications");
    J(this, "_tokenSimulationPalette");
    J(this, "_canvas");
    J(this, "_scopeFilter");
    J(this, "_translate");
    J(this, "_container");
    J(this, "_placeholder");
    J(this, "_content");
    J(this, "_close");
    J(this, "_icon");
    J(this, "_emptyMarkup");
    J(this, "_emptyMarkupInner");
    J(this, "_showMarkup");
    J(this, "_hideMarkup");
    J(this, "_paletteEntry");
    this._notifications = n, this._tokenSimulationPalette = r, this._canvas = o, this._scopeFilter = i, this._translate = a, this._emptyMarkupInner = () => `${dd}<span>${a("No Entries")}</span>`, this._emptyMarkup = () => `<p class="bts-entry placeholder">${this._emptyMarkupInner()}</span></p>`, this._showMarkup = () => `${is()}<span>${a("Show Simulation Log")}</span>`, this._hideMarkup = () => `${is()}<span>${a("Hide Simulation Log")}</span>`, this._init(), t.on(mc, (u) => {
      B1(".bts-entry[data-scope-id]", this._container).forEach((p) => {
        const g = p.dataset.scopeId;
        Me(p).toggle("inactive", !this._scopeFilter.isShown(g));
      });
    }), t.on(hc, (u) => {
      const { scope: c } = u, { element: p } = c, g = c.completed;
      if (!["bpmn:Process", "bpmn:Participant", "bpmn:SubProcess"].includes(p.type))
        return;
      const h = `${oe(p, "bpmn:SubProcess") ? oo(p) || "SubProcess" : "Process"} ${g ? "finished" : "canceled"}`;
      this.log({
        text: h,
        icon: g ? ss() : G1(),
        scope: c
      });
    }), t.on(kr, (u) => {
      const { scope: c } = u, { element: p } = c;
      if (!["bpmn:Process", "bpmn:Participant", "bpmn:SubProcess"].includes(p.type))
        return;
      const d = `${oe(p, "bpmn:SubProcess") ? oo(p) || "SubProcess" : "Process"} started`;
      this.log({
        text: d,
        icon: ss(),
        scope: c
      });
    }), t.on(ia, (u) => {
      const { action: c, scope: p, element: g } = u;
      if (c !== "exit")
        return;
      const w = p.parent, d = oo(g);
      if (oe(g, "bpmn:ServiceTask")) {
        const h = g.businessObject.type;
        return this.log({
          text: d || h && ld[h] || "Service task",
          icon: h && ad[h] || "bpmn-icon-service",
          scope: w
        });
      }
      if (oe(g, "bpmn:UserTask"))
        return this.log({
          text: d || "User task",
          icon: "bpmn-icon-user",
          scope: w
        });
      if (oe(g, "bpmn:CallActivity"))
        return this.log({
          text: d || "Call Activity",
          icon: "bpmn-icon-call-activity",
          scope: w
        });
      if (oe(g, "bpmn:ScriptTask"))
        return this.log({
          text: d || "Script task",
          icon: "bpmn-icon-script",
          scope: w
        });
      if (oe(g, "bpmn:BusinessRuleTask"))
        return this.log({
          text: d || "Business Rule task",
          icon: "bpmn-icon-business-rule",
          scope: w
        });
      if (oe(g, "bpmn:ManualTask"))
        return this.log({
          text: d || "Manual task",
          icon: "bpmn-icon-manual-task",
          scope: w
        });
      if (oe(g, "bpmn:ReceiveTask"))
        return this.log({
          text: d || "Receive task",
          icon: "bpmn-icon-receive",
          scope: w
        });
      if (oe(g, "bpmn:SendTask"))
        return this.log({
          text: d || "Send task",
          icon: "bpmn-icon-send",
          scope: w
        });
      if (oe(g, "bpmn:Task"))
        return this.log({
          text: d || "Task",
          icon: "bpmn-icon-task",
          scope: w
        });
      if (oe(g, "bpmn:ExclusiveGateway"))
        return this.log({
          text: d || "Exclusive gateway",
          icon: "bpmn-icon-gateway-xor",
          scope: w
        });
      if (oe(g, "bpmn:ParallelGateway"))
        return this.log({
          text: d || "Parallel gateway",
          icon: "bpmn-icon-gateway-parallel",
          scope: w
        });
      if (oe(g, "bpmn:InclusiveGateway"))
        return this.log({
          text: d || "Inclusive gateway",
          icon: "bpmn-icon-gateway-or",
          scope: w
        });
      if (oe(g, "bpmn:StartEvent"))
        return this.log({
          text: d || "Start event",
          icon: `bpmn-icon-start-event-${Oo(g)}`,
          scope: w
        });
      if (oe(g, "bpmn:IntermediateCatchEvent"))
        return this.log({
          text: d || "Intermediate event",
          icon: io(g, "catch"),
          scope: w
        });
      if (oe(g, "bpmn:IntermediateThrowEvent"))
        return this.log({
          text: d || "Intermediate event",
          icon: io(g, "throw"),
          scope: w
        });
      if (oe(g, "bpmn:BoundaryEvent"))
        return this.log({
          text: d || "Boundary event",
          icon: io(g, "catch"),
          scope: w
        });
      if (oe(g, "bpmn:EndEvent"))
        return this.log({
          text: d || "End event",
          icon: `bpmn-icon-end-event-${Oo(g)}`,
          scope: w
        });
    }), t.on(In, () => {
      this.clear(), this.toggle(!0);
    }), t.on(nn, ({ active: u }) => {
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
          ${as()}
        </button>`, r = this._container.querySelector(".bts-log .bts-header");
    r && (r.innerHTML = n, this._close = Kn(".bts-close", this._container), Et.bind(this._close, "click", () => {
      this.toggle(!1);
    })), this._placeholder && (this._placeholder.innerHTML = this._emptyMarkupInner());
  }
  _init() {
    const t = this._translate;
    this._container = ft(`
    <div class="bts-log djs-scrollable hidden">
      <div class="bts-header">
        ${t("Simulation Log")}
        <button class="bts-close" aria-label="Close">
          ${as()}
        </button>
      </div>
      <div class="bts-content">
        ${this._emptyMarkup}
      </div>
    </div>
  `), this._placeholder = Kn(".bts-placeholder", this._container), this._content = Kn(".bts-content", this._container), Et.bind(this._content, "mousedown", (r) => {
      r.stopPropagation();
    }), this._close = Kn(".bts-close", this._container), Et.bind(this._close, "click", () => {
      this.toggle(!1);
    }), this._canvas.getContainer().appendChild(this._container);
    const n = t("Toggle Simulation Log");
    this._paletteEntry = ft(`
    <div class="bts-entry" title="${n}">${this._showMarkup}</div>
  `), Et.bind(this._paletteEntry, "click", () => {
      this.toggle();
    }), this._tokenSimulationPalette.addEntry(this._paletteEntry, 3);
  }
  log(t) {
    const n = this._translate, { text: r, type: o = "info", icon: i = ud, scope: s } = t, a = this._content;
    this._placeholder && Me(this._placeholder).add("hidden"), this.isShown() || this._notifications.showNotification(t);
    const l = i.startsWith("<") ? i : `<i class="${i}"></i>`, u = s && s.colors, c = u ? `style="background: ${u.primary}; color: ${u.auxiliary}"` : "", p = n(r), g = ft(`
    <p class="bts-entry ${o} ${s && this._scopeFilter.isShown(s) ? "" : "inactive"}" ${s ? `data-scope-id="${s.id}"` : ""}>
      <span class="bts-icon">${l}</span>
      <span class="bts-text" title="${p}">${p}</span>
      ${s ? `<span class="bts-scope" data-scope-id="${s.id}" ${c}>${s.id}</span>` : ""}
    </p>
  `);
    M1.bind(g, ".bts-scope[data-scope-id]", "click", (d) => {
      this._scopeFilter.toggle(s);
    });
    const w = Math.abs(a.clientHeight + a.scrollTop - a.scrollHeight) < 2;
    a.appendChild(g), w && (a.scrollTop = a.scrollHeight);
  }
  isShown() {
    const t = this._container;
    return !Me(t).has("hidden");
  }
  toggle(t = !this.isShown()) {
    const n = this._container;
    t ? (Me(n).remove("hidden"), this._paletteEntry.innerHTML = this._hideMarkup()) : (Me(n).add("hidden"), this._paletteEntry.innerHTML = this._showMarkup()), this._updateContent();
  }
  clear() {
    if (this._content) {
      for (; this._content.firstChild; )
        this._content.removeChild(this._content.firstChild);
      this._placeholder = ft(this._emptyMarkup()), this._content.appendChild(this._placeholder);
    }
  }
}
J(oi, "$inject");
oi.$inject = [
  "eventBus",
  "notifications",
  "tokenSimulationPalette",
  "canvas",
  "scopeFilter",
  "simulator",
  "translate"
];
const fd = {
  __depends__: [Ar, sa],
  __init__: ["log"],
  log: ["type", oi]
}, pd = {
  __depends__: [
    Zl,
    Ql,
    ec,
    tc,
    nc,
    sd,
    ed,
    td,
    rc,
    // SetAnimationSpeedModule,
    oc,
    nd,
    ic,
    sc,
    C1,
    fd
  ]
};
class ii {
  constructor(t, n) {
    J(this, "_active");
    J(this, "_eventBus");
    J(this, "_canvas");
    J(this, "_canvasParent");
    this._eventBus = t, this._canvas = n, this._active = !1, t.on("import.parse.start", () => {
      this._active && (this.toggleMode(!1), t.once("import.done", () => {
        this.toggleMode(!0);
      }));
    }), t.on("diagram.init", () => {
      this._canvasParent = this._canvas.getContainer().parentNode;
    });
  }
  toggleMode(t = !this._active) {
    t !== this._active && (t ? Me(this._canvasParent).add("simulation") : Me(this._canvasParent).remove("simulation"), this._eventBus.fire(nn, {
      active: t
    }), this._active = t);
  }
}
J(ii, "$inject");
ii.$inject = ["eventBus", "canvas"];
const md = {
  __init__: ["toggleMode"],
  toggleMode: ["type", ii]
}, hd = {
  __depends__: [pd, md]
};
function vd(e, t) {
  if (e.ownerDocument !== t.ownerDocument)
    try {
      return t.ownerDocument.importNode(e, !0);
    } catch {
    }
  return e;
}
function yd(e, t) {
  return t.appendChild(vd(e, t));
}
function so(e, t) {
  return yd(t, e), e;
}
var Ao = 2, ja = {
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
  "font-size": Ao,
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
  "stroke-width": Ao,
  "text-anchor": 1,
  "text-decoration": 1,
  "text-rendering": 1,
  "unicode-bidi": 1,
  visibility: 1,
  "word-spacing": 1,
  "writing-mode": 1
};
function gd(e, t) {
  return ja[t] ? e.style[t] : e.getAttributeNS(null, t);
}
function bd(e, t, n) {
  var r = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), o = ja[r];
  o ? (o === Ao && typeof n == "number" && (n = String(n) + "px"), e.style[r] = n) : e.setAttributeNS(null, t, n);
}
function wd(e, t) {
  var n = Object.keys(t), r, o;
  for (r = 0, o; o = n[r]; r++)
    bd(e, o, t[o]);
}
function Ed(e, t, n) {
  return typeof t == "string" ? gd(e, t) : (wd(e, t), e);
}
var si = {
  svg: "http://www.w3.org/2000/svg"
}, cs = '<svg xmlns="' + si.svg + '"';
function Sd(e) {
  var t = !1;
  e.substring(0, 4) === "<svg" ? e.indexOf(si.svg) === -1 && (e = cs + e.substring(4)) : (e = cs + ">" + e + "</svg>", t = !0);
  var n = _d(e);
  if (!t)
    return n;
  for (var r = document.createDocumentFragment(), o = n.firstChild; o.firstChild; )
    r.appendChild(o.firstChild);
  return r;
}
function _d(e) {
  var t;
  return t = new DOMParser(), t.async = !1, t.parseFromString(e, "text/xml");
}
function Yn(e, t) {
  var n;
  return e = e.trim(), e.charAt(0) === "<" ? (n = Sd(e).firstChild, n = document.importNode(n, !0)) : n = document.createElementNS(si.svg, e), t && Ed(n, t), n;
}
const us = 0.95, Cd = 1, ds = 3;
class kd extends wc {
  constructor(n, r, o, i, s, a, l) {
    super(n, r, o, i, s, a, l);
    J(this, "_overrideColor");
    const u = this.handlers, c = n && n.defaultFillColor, p = n && n.defaultStrokeColor;
    this._overrideColor = (n == null ? void 0 : n.overrideColor) || !1;
    function g(v) {
      return o.computeStyle(v, ["no-fill"], {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: Di,
        strokeWidth: 2
      });
    }
    function w(v) {
      return o.computeStyle(v, {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: Di,
        strokeWidth: 2,
        fill: "white"
      });
    }
    function d(v, m, y) {
      y = g(y);
      const O = Yn("path", { ...y, d: m });
      return so(v, O), O;
    }
    function h(v, m, y) {
      const O = Yn("text", y);
      return O.innerHTML = m, so(v, O), O;
    }
    function E(v, m, y, O, _) {
      g1(O) && (_ = O, O = 0), O = O || 0, _ = w(_);
      const S = m / 2, M = y / 2, X = Yn("circle", {
        cx: S,
        cy: M,
        r: Math.round((m + y) / 4 - O),
        ..._
      });
      return so(v, X), X;
    }
    const T = {
      "bpmn:MessageEventDefinition": function(v, m, y = {}, O) {
        const _ = i.getScaledPath("EVENT_MESSAGE", {
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.235,
            my: 0.315
          }
        }), S = O ? Ee(m, p, y.stroke) : $e(m, c, y.fill), M = O ? $e(m, c, y.fill) : Ee(m, p, y.stroke);
        return d(v, _, {
          fill: S,
          stroke: M,
          strokeWidth: 1
        });
      },
      "bpmn:TimerEventDefinition": function(v, m, y = {}) {
        const O = E(v, m.width, m.height, 0.2 * m.height, {
          fill: $e(m, c, y.fill),
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 2
        }), _ = i.getScaledPath("EVENT_TIMER_WH", {
          xScaleFactor: 0.75,
          yScaleFactor: 0.75,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.5,
            my: 0.5
          }
        });
        d(v, _, {
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 2
        });
        for (let S = 0; S < 12; S++) {
          const M = i.getScaledPath("EVENT_TIMER_LINE", {
            xScaleFactor: 0.75,
            yScaleFactor: 0.75,
            containerWidth: m.width,
            containerHeight: m.height,
            position: {
              mx: 0.5,
              my: 0.5
            }
          }), X = m.width / 2, ce = m.height / 2;
          d(v, M, {
            strokeWidth: 1,
            stroke: Ee(m, p, y.stroke),
            transform: "rotate(" + S * 30 + "," + ce + "," + X + ")"
          });
        }
        return O;
      },
      "bpmn:EscalationEventDefinition": function(v, m, y = {}, O) {
        const _ = i.getScaledPath("EVENT_ESCALATION", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.5,
            my: 0.2
          }
        }), S = O ? Ee(m, p, y.stroke) : $e(m, c, y.fill);
        return d(v, _, {
          fill: S,
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:ConditionalEventDefinition": function(v, m, y = {}) {
        const O = i.getScaledPath("EVENT_CONDITIONAL", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.5,
            my: 0.222
          }
        });
        return d(v, O, {
          fill: $e(m, c, y.fill),
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:LinkEventDefinition": function(v, m, y = {}, O) {
        const _ = i.getScaledPath("EVENT_LINK", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.57,
            my: 0.263
          }
        }), S = O ? Ee(m, p, y.stroke) : $e(m, c, y.fill);
        return d(v, _, {
          fill: S,
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:ErrorEventDefinition": function(v, m, y = {}, O) {
        const _ = i.getScaledPath("EVENT_ERROR", {
          xScaleFactor: 1.1,
          yScaleFactor: 1.1,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.2,
            my: 0.722
          }
        }), S = O ? Ee(m, p, y.stroke) : $e(m, c, y.fill);
        return d(v, _, {
          fill: S,
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:CancelEventDefinition": function(v, m, y = {}, O) {
        const _ = i.getScaledPath("EVENT_CANCEL_45", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.638,
            my: -0.055
          }
        }), S = O ? Ee(m, p, y.stroke) : "none", M = d(v, _, {
          fill: S,
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 1
        });
        return Sc(M, 45), M;
      },
      "bpmn:CompensateEventDefinition": function(v, m, y = {}, O) {
        const _ = i.getScaledPath("EVENT_COMPENSATION", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.22,
            my: 0.5
          }
        }), S = O ? Ee(m, p, y.stroke) : $e(m, c, y.fill);
        return d(v, _, {
          fill: S,
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:SignalEventDefinition": function(v, m, y = {}, O) {
        const _ = i.getScaledPath("EVENT_SIGNAL", {
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.5,
            my: 0.2
          }
        }), S = O ? Ee(m, p, y.stroke) : $e(m, c, y.fill);
        return d(v, _, {
          strokeWidth: 1,
          fill: S,
          stroke: Ee(m, p, y.stroke)
        });
      },
      "bpmn:MultipleEventDefinition": function(v, m, y = {}, O) {
        const _ = i.getScaledPath("EVENT_MULTIPLE", {
          xScaleFactor: 1.1,
          yScaleFactor: 1.1,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.222,
            my: 0.36
          }
        }), { stroke: S } = y, M = O ? Ee(m, p, S) : $e(m, c, y.fill);
        return d(v, _, {
          fill: M,
          stroke: S,
          strokeWidth: 1
        });
      },
      "bpmn:ParallelMultipleEventDefinition": function(v, m, y = {}) {
        const O = i.getScaledPath("EVENT_PARALLEL_MULTIPLE", {
          xScaleFactor: 1.2,
          yScaleFactor: 1.2,
          containerWidth: m.width,
          containerHeight: m.height,
          position: {
            mx: 0.458,
            my: 0.194
          }
        });
        return d(v, O, {
          fill: $e(m, c, y.fill),
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:TerminateEventDefinition": function(v, m, y = {}) {
        return E(v, m.width, m.height, 8, {
          fill: Ee(m, p, y.stroke),
          stroke: Ee(m, p, y.stroke),
          strokeWidth: 4
        });
      }
    };
    function P(v, m, y = {}) {
      const O = zr(v), _ = Ec(O);
      return za(
        O,
        "VariableListenerEventDefinition"
      ).length ? T["bpmn:MultipleEventDefinition"](
        m,
        v,
        y,
        _
      ) : O.get("eventDefinitions") && O.get("eventDefinitions").length > 1 && O.get("parallelMultiple") ? T["bpmn:ParallelMultipleEventDefinition"](
        m,
        v,
        y
      ) : tt(O, "bpmn:MessageEventDefinition") ? T["bpmn:MessageEventDefinition"](
        m,
        v,
        y,
        _
      ) : tt(O, "bpmn:TimerEventDefinition") ? T["bpmn:TimerEventDefinition"](m, v, y) : tt(O, "bpmn:ConditionalEventDefinition") ? T["bpmn:ConditionalEventDefinition"](m, v, y) : tt(O, "bpmn:SignalEventDefinition") ? T["bpmn:SignalEventDefinition"](
        m,
        v,
        y,
        _
      ) : tt(O, "bpmn:EscalationEventDefinition") ? T["bpmn:EscalationEventDefinition"](
        m,
        v,
        y,
        _
      ) : tt(O, "bpmn:LinkEventDefinition") ? T["bpmn:LinkEventDefinition"](m, v, y, _) : tt(O, "bpmn:ErrorEventDefinition") ? T["bpmn:ErrorEventDefinition"](
        m,
        v,
        y,
        _
      ) : tt(O, "bpmn:CancelEventDefinition") ? T["bpmn:CancelEventDefinition"](
        m,
        v,
        y,
        _
      ) : tt(O, "bpmn:CompensateEventDefinition") ? T["bpmn:CompensateEventDefinition"](
        m,
        v,
        y,
        _
      ) : tt(O, "bpmn:TerminateEventDefinition") ? T["bpmn:TerminateEventDefinition"](m, v, y) : null;
    }
    const R = (v, m, y = {}) => {
      y = Gn(y, ["fill", "stroke"]);
      const O = u["bpmn:Task"](v, m, y), _ = m.businessObject.get("type"), S = {
        class: "custom-service",
        fill: Ee(m, c, y.stroke),
        stroke: Ee(m, p, y.stroke),
        strokeWidth: 0
      }, M = Yn("g", { class: "custom-node-marker" });
      switch (v.insertBefore(M, null), _) {
        case "shell":
          const X = i.getStaticPath("SERVICE_SHELL");
          d(v, X, S);
          break;
        case "copy":
          const ce = i.getStaticPath("SERVICE_COPY");
          d(v, ce, S);
          break;
        case "camel":
          const ne = i.getStaticPath("SERVICE_CAMEL");
          d(v, ne, S);
          break;
        case "dmn":
          const V = i.getStaticPath("SERVICE_DMN");
          d(v, V, S);
          break;
        case "http":
          const ue = i.getStaticPath("SERVICE_HTTP_1");
          d(v, ue, S);
          const $ = i.getStaticPath("SERVICE_HTTP_2");
          d(v, $, S);
          break;
        case "ws":
          const D = i.getStaticPath("SERVICE_WS_1");
          d(v, D, S);
          const q = i.getStaticPath("SERVICE_WS_2");
          d(v, q, S);
          break;
        case "email":
          const K = i.getStaticPath("SERVICE_MAIL_1");
          d(v, K, S);
          const pe = i.getStaticPath("SERVICE_MAIL_2");
          d(v, pe, S);
          break;
        case "mq":
          const ae = i.getStaticPath("SERVICE_MQ_1");
          d(v, ae, S);
          const Y = i.getStaticPath("SERVICE_MQ_2");
          d(v, Y, S);
          break;
        case "sc":
          const ye = i.getStaticPath("SERVICE_SC_1");
          d(v, ye, S);
          const ge = i.getStaticPath("SERVICE_SC_2");
          d(v, ge, S);
          break;
        case "sql":
          const Ce = i.getStaticPath("SERVICE_DB_1");
          d(v, Ce, S);
          const Ie = i.getStaticPath("SERVICE_DB_2");
          d(v, Ie, S);
          const b = i.getStaticPath("SERVICE_DB_3");
          d(v, b, S);
          break;
        case "dubbo":
          const B = i.getStaticPath("SERVICE_SC_1");
          d(v, B, S);
          const F = i.getStaticPath("SERVICE_SC_2");
          d(v, F, {
            ...S,
            transform: "scale(0.8 0.8) translate(4 0)"
          }), h(v, "dubbo", { ...S, x: 8, y: 17, fontSize: 4 });
          break;
        case "rest":
          const G = i.getStaticPath("SERVICE_REST_1");
          d(v, G, S);
          const U = i.getStaticPath("SERVICE_REST_2");
          d(v, U, S);
          break;
        default:
          E(v, 10, 10, 0, {
            fill: $e(m, c, y.fill),
            stroke: "none",
            transform: "translate(6, 6)"
          });
          const z = i.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
              x: 12,
              y: 18
            }
          });
          d(v, z, {
            fill: $e(m, c, y.fill),
            stroke: Ee(m, p, y.stroke),
            strokeWidth: 1
          }), E(v, 10, 10, 0, {
            fill: $e(m, c, y.fill),
            stroke: "none",
            transform: "translate(11, 10)"
          });
          const de = i.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
              x: 17,
              y: 22
            }
          });
          d(v, de, {
            fill: $e(m, c, y.fill),
            stroke: Ee(m, p, y.stroke),
            strokeWidth: 1
          });
      }
      return O;
    }, f = (v, m, y = {}) => {
      const { renderIcon: O = !0 } = y;
      y = Gn(y, ["fill", "stroke"]), zr(m).get("isInterrupting") === !1 && (y = {
        ...y,
        strokeDasharray: "6"
      });
      const S = E(v, m.width, m.height, {
        fillOpacity: us,
        ...y,
        fill: $e(m, c, y.fill),
        stroke: Ee(m, p, y.stroke)
      });
      return O && P(m, v, y), S;
    }, L = (v, m, y = {}) => {
      const { renderIcon: O = !0 } = y;
      y = Gn(y, ["fill", "stroke"]);
      const _ = zr(m), S = _.get("cancelActivity");
      y = {
        strokeWidth: 1.5,
        fill: $e(m, c, y.fill),
        fillOpacity: Cd,
        stroke: Ee(m, p, y.stroke)
      }, S === !1 && (y.strokeDasharray = "6");
      const M = E(v, m.width, m.height, y);
      return E(v, m.width, m.height, ds, {
        ...y,
        fill: "none"
      }), O && P(m, v, y), M;
    }, A = (v, m, y = {}) => {
      const { renderIcon: O = !0 } = y;
      y = Gn(y, ["fill", "stroke"]);
      const _ = E(v, m.width, m.height, {
        fillOpacity: us,
        ...y,
        fill: $e(m, c, y.fill),
        stroke: Ee(m, p, y.stroke),
        strokeWidth: 1.5
      });
      return E(v, m.width, m.height, ds, {
        fill: "none",
        stroke: Ee(m, p, y.stroke),
        strokeWidth: 1.5
      }), O && P(m, v, y), _;
    };
    this.handlers["bpmn:ServiceTask"] = R, this.handlers["bpmn:StartEvent"] = f, this.handlers["bpmn:BoundaryEvent"] = L, this.handlers["bpmn:IntermediateEvent"] = A;
  }
  drawShape(n, r, o = {}) {
    let i, s = "var(--color-bg-5)";
    if (!this._overrideColor) {
      const a = Pi(r);
      i = a.get("color:border-color") || a.get("bioc:stroke"), s = a.get("color:background-color") || a.get("bioc:fill") || "var(--color-bg-5)";
    }
    return oe(r, "bpmn:Activity") ? (o = { stroke: i || "var(--color-activity)", fill: s, ...o }, super.drawShape(n, r, o)) : oe(r, "bpmn:StartEvent") ? (o = { stroke: i || "var(--color-start-event)", fill: s, ...o }, super.drawShape(n, r, o)) : oe(r, "bpmn:EndEvent") ? (o = { stroke: i || "var(--color-end-event)", fill: s, ...o }, super.drawShape(n, r, o)) : oe(r, "bpmn:BoundaryEvent") ? (o = { stroke: i || "var(--color-boundary-event)", fill: s, ...o }, super.drawShape(n, r, o)) : oe(r, "bpmn:CatchEvent") || oe(r, "bpmn:ThrowEvent") ? (o = { stroke: i || "var(--color-catch-event)", fill: s, ...o }, super.drawShape(n, r, o)) : oe(r, "bpmn:Gateway") ? (o = { stroke: i || "var(--color-gateway)", fill: s, ...o }, super.drawShape(n, r, o)) : oe(r, "bpmn:Group") ? (o = { stroke: i || "var(--color-element)", fill: "none", ...o }, super.drawShape(n, r, o)) : super.drawShape(n, r, {
      stroke: i || "var(--color-element)",
      fill: s,
      ...o
    });
  }
  drawConnection(n, r, o = {}) {
    let i;
    if (!this._overrideColor) {
      const s = Pi(r);
      i = s.get("color:border-color") || s.get("bioc:stroke");
    }
    return bc(r, ["bpmn:SequenceFlow", "bpmn:MessageFlow", "bpmn:Association"]) ? (o = { stroke: i || "#9cafcf", ...o }, super.drawConnection(n, r, o)) : super.drawConnection(n, r, o);
  }
}
function Gn(e, t = []) {
  return t.reduce((n, r) => (e[r] && (n[r] = e[r]), n), {});
}
class Td extends _c {
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
    }, this.pathMap.SERVICE_WS_1 = {
      d: "m23.00814,16.21811c0,-0.40507 0.32065,-0.55788 0.64129,-0.55788c0.75485,0 0.77267,0.55788 0.77267,1.00419l1.05992,0.00728c0,-0.73495 -0.22935,-2.02536 -1.92388,-2.02536c-0.91518,0 -1.74129,0.55788 -1.74129,1.51841c0,2.40617 2.6342,1.7731 2.6342,3.0635c0,0.48026 -0.34291,0.70827 -0.93967,0.70827c-0.68805,0 -0.91518,-0.58214 -0.91518,-1.03815l-1.12226,0c0,1.59603 1.00647,2.15149 2.26679,2.15149c1.03097,0 1.83258,-0.70827 1.83258,-1.64454c0,-2.78214 -2.56517,-1.69548 -2.56517,-3.18721zm-3.6763,2.38192l-0.97753,-3.95369l-1.28036,0l-0.97975,3.95369l-0.76822,-3.95369l-1.11781,0l1.30485,6.40595l1.2336,0l1.02429,-4.60375l1.04878,4.60375l1.16457,0l1.30485,-6.40595l-1.11781,0l-0.83947,3.95369l0.00001,0z"
    }, this.pathMap.SERVICE_WS_2 = {
      d: "m14.63788,22.47019s-0.40199,0.0244 -0.61901,0.0244c-2.28368,0 -3.19864,-3.67442 -3.50691,-5.19201l3.17151,0c0.07152,-0.35622 0.19236,-0.82223 0.3354,-1.10769l-3.71407,0c-0.21702,-1.6347 -0.22442,-3.13765 -0.00986,-4.77236l7.30977,-0.00976c0.07152,0.63924 0.10358,1.22237 0.10358,1.86161c0.36006,-0.07075 0.64614,-0.15615 1.0062,-0.22691c0,-0.56849 -0.05672,-1.06866 -0.12824,-1.63714l3.71161,0c0.19976,0.6856 0.46364,1.73474 0.46364,2.41546c0,0.05124 0.01233,0.02684 0.85577,0.71976c0.05919,-5.36768 -3.86451,-10.2352 -9.64524,-10.2352c-5.31956,0.00732 -9.65018,4.46737 -9.65018,9.60083c0,5.97765 5.40341,10.17908 11.30252,9.452c-0.54749,-0.3611 -0.77931,-0.48797 -0.98648,-0.89299l0,0zm7.32703,-12.01141l-3.50938,0c-0.28608,-1.67374 -0.93468,-3.47923 -2.02967,-4.81384c2.38973,0.6856 4.65369,2.51061 5.53905,4.81384zm-8.05949,-5.12614c2.33548,0 3.0926,3.45971 3.51924,5.12614l-6.98916,0c0.33293,-1.63226 1.25036,-5.12614 3.46992,-5.12614zm-2.46372,0.3123c-0.66341,0.81003 -1.10978,1.65178 -1.46738,2.61797c-0.14057,0.38306 -0.67327,2.19587 -0.67327,2.19587l-3.45512,0c0.86809,-2.26419 3.18138,-4.28927 5.59577,-4.81384l0,0zm-6.24191,8.21256c-0.03946,-0.99058 0.21702,-2.0446 0.36006,-2.4667l3.7412,0c-0.21702,1.61763 -0.24169,3.21573 -0.02466,4.83335l-3.71654,0c-0.14304,-0.42453 -0.32307,-1.21749 -0.36006,-2.36666l0,0zm0.72013,3.44752l3.43046,0c0.28608,1.6713 0.94455,3.42312 2.03707,4.75772c-2.41686,-0.59044 -4.52298,-2.54721 -5.46753,-4.75772z"
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
    }, this.pathMap.SERVICE_DB_1 = {
      d: "m4.22941,21.952l1.52269,-0.07918c0.03301,0.20316 0.10076,0.35833 0.20152,0.46392c0.1659,0.17196 0.40043,0.25835 0.70705,0.25835c0.22932,0 0.40478,-0.04479 0.52812,-0.13118c0.12335,-0.08878 0.18589,-0.19116 0.18589,-0.30714c0,-0.10958 -0.05906,-0.20876 -0.1772,-0.29514c-0.11726,-0.08719 -0.39088,-0.16877 -0.8191,-0.24635c-0.70271,-0.12958 -1.20304,-0.30154 -1.50184,-0.5151c-0.30141,-0.21516 -0.45255,-0.48791 -0.45255,-0.82064c0,-0.21836 0.07644,-0.42472 0.23106,-0.61828c0.15462,-0.19436 0.38653,-0.34714 0.69663,-0.45832s0.73398,-0.16717 1.27426,-0.16717c0.66102,0 1.16655,0.10078 1.51313,0.30314c0.34745,0.20156 0.55418,0.52391 0.62106,0.96382l-1.50966,0.07199c-0.03908,-0.19116 -0.12422,-0.32954 -0.2519,-0.41672s-0.30575,-0.13037 -0.5316,-0.13037c-0.18675,0 -0.3266,0.03279 -0.42128,0.09679a0.31097,0.28634 0 0 0 -0.14071,0.23676c0,0.06719 0.03822,0.12797 0.11639,0.18156c0.0747,0.05599 0.2545,0.10798 0.53681,0.15757c0.69924,0.12318 1.20044,0.24795 1.50358,0.37433c0.30315,0.12717 0.5229,0.28314 0.66102,0.47111c0.13811,0.18796 0.20673,0.39753 0.20673,0.62868c0,0.27355 -0.09207,0.52391 -0.27535,0.75346a1.69902,1.5645 0 0 1 -0.77047,0.5231c-0.33007,0.11837 -0.74615,0.17836 -1.24733,0.17836c-0.88078,0 -1.49142,-0.13917 -1.83105,-0.41752a1.70249,1.56771 0 0 1 -0.57589,-1.0598m10.10725,0.78465c0.20065,0.11278 0.33094,0.18476 0.39262,0.21356c0.0912,0.04239 0.21542,0.09278 0.3709,0.14797l-0.44561,0.73666a5.38109,4.95507 0 0 1 -0.6645,-0.31754a5.89271,5.42618 0 0 1 -0.4595,-0.27595c-0.35353,0.12477 -0.79566,0.18716 -1.32811,0.18716c-0.78783,0 -1.40803,-0.16717 -1.86319,-0.5039c-0.53681,-0.39753 -0.80608,-0.95662 -0.80608,-1.67808c0,-0.69907 0.2354,-1.24217 0.70532,-1.62929c0.46993,-0.38793 1.1266,-0.58149 1.97003,-0.58149c0.85993,0 1.52443,0.18877 1.99174,0.5687c0.46731,0.37833 0.70184,0.91983 0.70184,1.6253c0,0.62788 -0.18849,1.13019 -0.56547,1.50691m-1.22649,-0.67268c0.12682,-0.18716 0.1911,-0.46791 0.1911,-0.84064c0,-0.42872 -0.09729,-0.73506 -0.29186,-0.91823c-0.19457,-0.18396 -0.4621,-0.27515 -0.80434,-0.27515c-0.31792,0 -0.57589,0.09359 -0.77394,0.28075c-0.19804,0.18796 -0.2962,0.48071 -0.2962,0.87824c0,0.46311 0.09555,0.78865 0.28925,0.97662c0.1937,0.18716 0.45863,0.28075 0.79566,0.28075c0.10858,0 0.21108,-0.008 0.30749,-0.02559c-0.13464,-0.10718 -0.34658,-0.20636 -0.6367,-0.30235l0.25103,-0.47111c0.14158,0.0208 0.2519,0.04719 0.33094,0.07759c0.07818,0.0304 0.23192,0.11198 0.46124,0.24395c0.05385,0.0304 0.11292,0.06239 0.17633,0.09518m2.6545,-2.95624l1.60087,0l0,3.2026l2.49815,0l0,1.04621l-4.09901,0l0,-4.2488l0,0l-0.00001,0zm-10.66665,-9.67019l19.10962,0l0,1.5997l-19.10962,0l0,-1.5997zm13.02929,-3.1994l3.47447,0l0,1.5997l-3.47447,0l0,-1.5997zm0,6.3988l3.47447,0l0,1.5997l-3.47447,0l0,-1.5997z"
    }, this.pathMap.SERVICE_DB_2 = {
      d: "m23.56012,4.22238l-18.64632,0a0.84755,0.74416 0 0 0 -0.84755,0.74416l0,12.65081l1.69512,0l0,-11.90664l16.9512,0l0,16.37163l-0.84841,0l0,1.48833l1.69596,0a0.84755,0.74416 0 0 0 0.84755,-0.74416l0,-17.85996a0.84755,0.74416 0 0 0 -0.84755,-0.74416"
    }, this.pathMap.SERVICE_DB_3 = {
      d: "m4.49867,17.06941l19.65831,0l0,-1.49066l-19.65831,0l0,1.49066z"
    };
  }
  getStaticPath(t) {
    var n;
    return ((n = this.pathMap[t]) == null ? void 0 : n.d) || "";
  }
}
const Od = {
  bpmnRenderer: ["type", kd],
  pathMap: ["type", Td]
}, Ad = {
  "Copy Service Task": "抄送任务",
  "Camel Service Task": "骆驼任务",
  "Sc Service Task": "微服务任务",
  "Dubbo Service Task": "Dubbo 任务",
  "Rest Service Task": "Rest 任务",
  "Dmn Service Task": "决策任务",
  "Http Service Task": "Http 任务",
  "Web Service Task": "Web Service 任务",
  "Sql Service Task": "SQL 任务",
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
}, Va = "__bpmn-designer__";
function Pd(e) {
  const t = window.localStorage.getItem(`${Va}${e}`);
  return t ? JSON.parse(t) : null;
}
function ai(e, t) {
  window.localStorage.setItem(`${Va}${e}`, JSON.stringify(t || ""));
}
function Dd(e, t) {
  return t = t || {}, Pd("local-lang") !== "en_US" && (e = Ad[e] || Cc[e] || e), e.replace(/{([^}]+)}/g, function(n, r) {
    return t[r] || "{" + r + "}";
  });
}
const $d = [
  {
    translate: ["value", Dd]
  }
], xd = "Flowable", Id = "http://flowable.org/bpmn", Md = "flowable", Bd = { tagAlias: "lowerCase" }, Ld = [], Nd = JSON.parse('[{"name":"Definitions","isAbstract":true,"extends":["bpmn:Definitions"],"properties":[{"name":"diagramRelationId","isAttr":true,"type":"String"}]},{"name":"InOutBinding","superClass":["Element"],"isAbstract":true,"properties":[{"name":"source","isAttr":true,"type":"String"},{"name":"sourceExpression","isAttr":true,"type":"String"},{"name":"target","isAttr":true,"type":"String"},{"name":"businessKey","isAttr":true,"type":"String"},{"name":"local","isAttr":true,"type":"Boolean","default":false},{"name":"variables","isAttr":true,"type":"String"}]},{"name":"In","superClass":["InOutBinding"],"meta":{"allowedIn":["bpmn:CallActivity","bpmn:SignalEventDefinition"]}},{"name":"Out","superClass":["InOutBinding"],"meta":{"allowedIn":["bpmn:CallActivity"]}},{"name":"AsyncCapable","isAbstract":true,"extends":["bpmn:Activity","bpmn:Gateway","bpmn:Event"],"properties":[{"name":"async","isAttr":true,"type":"Boolean","default":false},{"name":"asyncBefore","isAttr":true,"type":"Boolean","default":false},{"name":"asyncAfter","isAttr":true,"type":"Boolean","default":false},{"name":"exclusive","isAttr":true,"type":"Boolean","default":true}]},{"name":"Scope","extends":["bpmn:Signal"],"properties":[{"name":"scope","isAttr":true,"type":"String"}]},{"name":"ErrorEventDefinitionExtension","isAbstract":true,"extends":["bpmn:ErrorEventDefinition"],"properties":[{"name":"errorCodeVariable","isAttr":true,"type":"String"},{"name":"errorMessageVariable","isAttr":true,"type":"String"},{"name":"errorVariableLocalScope","isAttr":true,"type":"Boolean"},{"name":"errorVariableTransient","isAttr":true,"type":"Boolean"}]},{"name":"ErrorEventDefinition","superClass":["bpmn:ErrorEventDefinition","Element"],"properties":[{"name":"expression","isAttr":true,"type":"String"}],"meta":{"allowedIn":["bpmn:ServiceTask"]}},{"name":"Error","isAbstract":true,"extends":["bpmn:Error"],"properties":[{"name":"flowable:errorMessage","isAttr":true,"type":"String"}]},{"name":"FormSupported","isAbstract":true,"extends":["bpmn:StartEvent","bpmn:UserTask"],"properties":[{"name":"formKey","isAttr":true,"type":"String"}]},{"name":"Initiator","isAbstract":true,"extends":["bpmn:StartEvent"],"properties":[{"name":"initiator","isAttr":true,"type":"String"}]},{"name":"ScriptTask","isAbstract":true,"extends":["bpmn:ScriptTask"],"properties":[{"name":"resultVariable","isAttr":true,"type":"String"},{"name":"autoStoreVariables","isAttr":true,"type":"Boolean"},{"name":"resource","isAttr":true,"type":"String"}]},{"name":"Process","isAbstract":true,"extends":["bpmn:Process"],"properties":[{"name":"candidateStarterGroups","isAttr":true,"type":"String"},{"name":"candidateStarterUsers","isAttr":true,"type":"String"}]},{"name":"FormalExpression","isAbstract":true,"extends":["bpmn:FormalExpression"],"properties":[{"name":"resource","isAttr":true,"type":"String"}]},{"name":"Assignable","extends":["bpmn:UserTask"],"properties":[{"name":"assignee","isAttr":true,"type":"String"},{"name":"candidateUsers","isAttr":true,"type":"String"},{"name":"candidateGroups","isAttr":true,"type":"String"},{"name":"dueDate","isAttr":true,"type":"String"},{"name":"priority","isAttr":true,"type":"String"}]},{"name":"CallActivity","extends":["bpmn:CallActivity"],"properties":[{"name":"inheritVariables","isAttr":true,"type":"Boolean"},{"name":"calledElementType","isAttr":true,"type":"String"},{"name":"processInstanceName","isAttr":true,"type":"String"}]},{"name":"ServiceTaskLike","extends":["bpmn:ServiceTask","bpmn:BusinessRuleTask","bpmn:SendTask","bpmn:MessageEventDefinition"],"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"resultVariable","isAttr":true,"type":"String"}]},{"name":"DmnCapable","extends":["bpmn:BusinessRuleTask"],"properties":[{"name":"decisionRef","isAttr":true,"type":"String"}]},{"name":"ExternalCapable","extends":["flowable:ServiceTaskLike"],"properties":[{"name":"type","isAttr":true,"type":"String"},{"name":"topic","isAttr":true,"type":"String"}]},{"name":"TaskPriorized","extends":["bpmn:Process","flowable:ExternalCapable"],"properties":[{"name":"taskPriority","isAttr":true,"type":"String"}]},{"name":"Properties","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"values","type":"Property","isMany":true}]},{"name":"Property","superClass":["Element"],"properties":[{"name":"id","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true},{"name":"value","type":"String","isAttr":true}]},{"name":"Connector","superClass":["Element"],"meta":{"allowedIn":["flowable:ServiceTaskLike"]},"properties":[{"name":"inputOutput","type":"InputOutput"},{"name":"connectorId","type":"String"}]},{"name":"InputOutput","superClass":["Element"],"meta":{"allowedIn":["bpmn:FlowNode","flowable:Connector"]},"properties":[{"name":"inputOutput","type":"InputOutput"},{"name":"connectorId","type":"String"},{"name":"inputParameters","isMany":true,"type":"InputParameter"},{"name":"outputParameters","isMany":true,"type":"OutputParameter"}]},{"name":"InputOutputParameter","properties":[{"name":"name","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"},{"name":"definition","type":"InputOutputParameterDefinition"}]},{"name":"InputOutputParameterDefinition","isAbstract":true},{"name":"List","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"items","isMany":true,"type":"InputOutputParameterDefinition"}]},{"name":"Map","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"entries","isMany":true,"type":"Entry"}]},{"name":"Entry","properties":[{"name":"key","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"},{"name":"definition","type":"InputOutputParameterDefinition"}]},{"name":"Value","superClass":["Element"],"properties":[{"name":"id","isAttr":true,"type":"String"},{"name":"name","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"}]},{"name":"Script","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"scriptFormat","isAttr":true,"type":"String"},{"name":"resource","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"}]},{"name":"Field","superClass":["Element"],"meta":{"allowedIn":["flowable:ServiceTaskLike","flowable:ExecutionListener","flowable:TaskListener"]},"properties":[{"name":"name","isAttr":true,"type":"String"},{"name":"expression","type":"String"},{"name":"stringValue","isAttr":true,"type":"String"},{"name":"string","type":"String"}]},{"name":"InputParameter","superClass":["InputOutputParameter"]},{"name":"OutputParameter","superClass":["InputOutputParameter"]},{"name":"Collectable","isAbstract":true,"extends":["bpmn:MultiInstanceLoopCharacteristics"],"superClass":["flowable:AsyncCapable"],"properties":[{"name":"collection","isAttr":true,"type":"String"},{"name":"elementVariable","isAttr":true,"type":"String"}]},{"name":"FailedJobRetryTimeCycle","superClass":["Element"],"meta":{"allowedIn":["flowable:AsyncCapable","bpmn:MultiInstanceLoopCharacteristics"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"ExecutionListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:Task","bpmn:ServiceTask","bpmn:UserTask","bpmn:BusinessRuleTask","bpmn:ScriptTask","bpmn:ReceiveTask","bpmn:ManualTask","bpmn:ExclusiveGateway","bpmn:SequenceFlow","bpmn:ParallelGateway","bpmn:InclusiveGateway","bpmn:EventBasedGateway","bpmn:StartEvent","bpmn:IntermediateCatchEvent","bpmn:IntermediateThrowEvent","bpmn:EndEvent","bpmn:BoundaryEvent","bpmn:CallActivity","bpmn:SubProcess","bpmn:Process"]},"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"onTransaction","isAttr":true,"type":"String"},{"name":"event","isAttr":true,"type":"String"},{"name":"script","type":"Script"},{"name":"fields","type":"Field","isMany":true}]},{"name":"TaskListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"event","isAttr":true,"type":"String"},{"name":"script","type":"Script"},{"name":"fields","type":"Field","isMany":true},{"name":"id","type":"String","isAttr":true},{"name":"eventDefinitions","type":"bpmn:TimerEventDefinition","isMany":true}]},{"name":"EventListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:Process"]},"properties":[{"name":"events","isAttr":true,"type":"String"},{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"throwEvent","isAttr":true,"type":"String"},{"name":"entityType","isAttr":true,"type":"String"},{"name":"signalName","isAttr":true,"type":"String"},{"name":"errorCode","isAttr":true,"type":"String"},{"name":"messageName","isAttr":true,"type":"String"}]},{"name":"FormProperty","superClass":["Element"],"meta":{"allowedIn":["bpmn:StartEvent","bpmn:UserTask"]},"properties":[{"name":"id","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true},{"name":"type","type":"String","isAttr":true},{"name":"required","type":"String","isAttr":true},{"name":"readable","type":"String","isAttr":true},{"name":"writable","type":"String","isAttr":true},{"name":"variable","type":"String","isAttr":true},{"name":"expression","type":"String","isAttr":true},{"name":"datePattern","type":"String","isAttr":true},{"name":"default","type":"String","isAttr":true},{"name":"values","type":"Value","isMany":true}]},{"name":"FormData","superClass":["Element"],"meta":{"allowedIn":["bpmn:StartEvent","bpmn:UserTask"]},"properties":[{"name":"fields","type":"FormField","isMany":true},{"name":"businessKey","type":"String","isAttr":true}]},{"name":"FormField","superClass":["Element"],"properties":[{"name":"id","type":"String","isAttr":true},{"name":"label","type":"String","isAttr":true},{"name":"type","type":"String","isAttr":true},{"name":"datePattern","type":"String","isAttr":true},{"name":"defaultValue","type":"String","isAttr":true},{"name":"properties","type":"Properties"},{"name":"validation","type":"Validation"},{"name":"values","type":"Value","isMany":true}]},{"name":"Validation","superClass":["Element"],"properties":[{"name":"constraints","type":"Constraint","isMany":true}]},{"name":"Constraint","superClass":["Element"],"properties":[{"name":"name","type":"String","isAttr":true},{"name":"config","type":"String","isAttr":true}]},{"name":"ConditionalEventDefinitionExtension","isAbstract":true,"extends":["bpmn:ConditionalEventDefinition"],"properties":[{"name":"variableName","isAttr":true,"type":"String"},{"name":"variableEvents","isAttr":true,"type":"String"}]},{"name":"AssigneeType","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"MultiCompletionCondition","superClass":["Element"],"meta":{"allowedIn":["bpmn:Activity"]},"properties":[{"name":"type","type":"String","isAttr":true},{"name":"conditionType","type":"String","isAttr":true},{"name":"num","type":"Number","isAttr":true},{"name":"body","type":"String","isBody":true}]},{"name":"IdmAssignee","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"IdmCandidateUsers","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask","bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"IdmCandidateGroups","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask","bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NextSequenceFlow","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NextUser","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ModelBpmnExtension","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ProcessNameExp","superClass":["Element"],"meta":{"allowedIn":["bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"Localization","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"locale","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true}]},{"name":"NodeFormExp","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NodeFormType","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"StaticAssigneeVariables","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"MultiInstanceVariables","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ServiceTask","extends":["bpmn:ServiceTask"],"properties":[{"name":"parallelInSameTransaction","type":"Boolean","isAttr":true}]},{"name":"TimeDate","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"BoundaryEvent","extends":["bpmn:BoundaryEvent"],"properties":[{"name":"timerEventDefinition","isBody":true,"type":"flowable:TimerEventDefinition"},{"name":"cancelActivity","isAttr":true,"type":"Boolean","redefines":"bpmn:BoundaryEvent#cancelActivity"}]},{"name":"TimerEventDefinition","superClass":["TimerEventDefinition"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"TimeDuration","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"TimeCycle","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","flowable:endDate","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"},{"name":"endDate","isAttr":true,"type":"String"}]},{"name":"SkipUserTask","extends":["bpmn:UserTask"],"properties":[{"name":"skipExpression","type":"String","isAttr":true}]},{"name":"TransferToUsers","superClass":["Element"],"meta":{"allowedIn":["bpmn:ServiceTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"AuthPoint","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"FormFieldValidation","extends":["bpmn:UserTask","bpmn:StartEvent"],"properties":[{"name":"formFieldValidation","type":"String","isAttr":true}]},{"name":"DataObject","extends":["bpmn:DataObject"],"meta":{"allowedIn":["bpmn:Process","bpmn:SubProcess"]},"properties":[{"name":"itemSubjectRef","type":"String","isAttr":true,"redefines":"bpmn:DataObject#itemSubjectRef"}]},{"name":"InterruptingStartEvent","extends":["bpmn:StartEvent"],"properties":[{"name":"isInterrupting","isAttr":true,"type":"Boolean","redefines":"bpmn:StartEvent#isInterrupting"}]},{"name":"VariableListenerEventDefinition","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"variableName","type":"String","isAttr":true},{"name":"variableChangeType","type":"String","isAttr":true}]},{"name":"TerminateEventDefinition","extends":["bpmn:TerminateEventDefinition"],"properties":[{"name":"terminateAll","isAttr":true,"type":"Boolean"}]},{"name":"AdHoc","extends":["bpmn:AdHocSubProcess"],"properties":[{"name":"cancelRemainingInstances","isAttr":true,"type":"Boolean","redefines":"bpmn:AdHocSubProcess#cancelRemainingInstances"}]}]'), Rd = [], Ha = {
  name: xd,
  uri: Id,
  prefix: Md,
  xml: Bd,
  associations: Ld,
  types: Nd,
  emumerations: Rd
}, Ua = [Od, $d], Th = /* @__PURE__ */ be({
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
    const r = e, o = n, { locale: i } = rn(), s = re(void 0), a = Cn(), l = () => {
      a.value = new na({
        container: s.value,
        moddleExtensions: {
          flowable: Ha
        },
        additionalModules: [hd, ra, ...Ua],
        bpmnRenderer: {
          overrideColor: !0
        },
        gridLine: { gridLineOpacity: 0.1, gridLineStroke: 1 }
      }), o("mocker-init", a.value);
    }, u = () => {
      var d, h;
      (d = a.value) == null || d.clear(), (h = a.value) == null || h.destroy(), a.value = void 0, o("mocker-destroy", a.value);
    }, c = async (d) => {
      var h, E, T, P;
      try {
        a.value || l(), await ((h = a.value) == null ? void 0 : h.importXML(d)), (E = a.value) == null || E.get("canvas").zoom("fit-viewport", "center");
        const R = (T = a.value) == null ? void 0 : T.get("toggleMode");
        !R._active && R.toggleMode(!0);
        const f = (P = a.value) == null ? void 0 : P.get("eventBus");
        f == null || f.fire("tokenSimulation.resetSimulation");
      } catch (R) {
        console.error(R);
      }
    }, p = (d) => {
      var f;
      const h = (f = a.value) == null ? void 0 : f.get("elementRegistry");
      if (!h) return;
      const E = h.filter((L) => oe(L, "bpmn:ExclusiveGateway")), T = a.value.get("simulator"), P = a.value.get("elementColors"), R = a.value.get("simulationStyles");
      for (const L of E) {
        const A = L.outgoing.find((y) => d.indexOf(y.id) !== -1), v = "--token-simulation-grey-darken-30", m = "--token-simulation-grey-lighten-56";
        A && T.setConfig(L, { activeOutgoing: A }), L.outgoing.forEach((y) => {
          const O = d.indexOf(y.id) !== -1 ? v : m, _ = R.get(O);
          P.add(y, "exclusive-gateway-settings", { stroke: _ }, 2001);
        });
      }
    }, g = (d) => {
      if (d)
        return document.body.setAttribute("arco-theme", d);
      const h = document.body.getAttribute("arco-theme") === "dark";
      document.body.setAttribute("arco-theme", h ? "light" : "dark");
    }, w = (d) => {
      var h;
      d ? i.value = d : i.value = i.value === "zh_CN" ? "en_US" : "zh_CN", ai("local-lang", i.value), (h = a.value) == null || h.get("eventBus").fire("i18n.changed");
    };
    return lt(() => {
      l(), r.xml && c(r.xml);
    }), tn(() => u()), Re(() => r.local, w, { immediate: !0 }), Re(() => r.theme, g, { immediate: !0 }), t({ createNewProcess: c, setSequenceFlows: p, toggleLang: w, toggleTheme: g }), (d, h) => (x(), ve(I(Zo), {
      style: { width: "100%", height: "100%" },
      loading: e.loading
    }, {
      default: ie(() => [
        j("div", {
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
var Xn = {
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
const Fd = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const on = (e, t) => ({ size: n, strokeWidth: r = 2, absoluteStrokeWidth: o, color: i, class: s, ...a }, { attrs: l, slots: u }) => _i(
  "svg",
  {
    ...Xn,
    width: n || Xn.width,
    height: n || Xn.height,
    stroke: i || Xn.stroke,
    "stroke-width": o ? Number(r) * 24 / Number(n) : r,
    ...l,
    class: ["lucide", `lucide-${Fd(e)}`],
    ...a
  },
  [...t.map((c) => _i(...c)), ...u.default ? [u.default()] : []]
);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zd = on("CircleCheckBigIcon", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jd = on("Clock4Icon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vd = on("DownloadIcon", [
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
const Hd = on("FullscreenIcon", [
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
const Ud = on("ZoomInIcon", [
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
const Wd = on("ZoomOutIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]);
function fs(e, t, n) {
  const r = encodeURIComponent(n);
  return {
    filename: `${t}.${e.toLowerCase()}`,
    href: `data:application/${e === "svg" ? "text/xml" : "bpmn20-xml"};charset=UTF-8,${r}`,
    data: n
  };
}
function ao(e, t) {
  if (e && t) {
    const n = document.createElement("a");
    n.download = t, n.href = e, n.click(), URL.revokeObjectURL(n.href);
  }
}
function qd(e) {
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
    const o = document.createElement("canvas"), i = o.getContext("2d"), s = new XMLSerializer().serializeToString(r), a = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(s))), l = new Image();
    l.onload = function() {
      let u, c;
      t.width === "auto" && t.height !== "auto" ? u = l.width / l.height * t.height : t.width === "auto" ? u = l.naturalWidth : u = t.width, t.height === "auto" && t.width !== "auto" ? c = l.height / l.width * t.width : t.height === "auto" ? c = l.naturalHeight : c = t.height, o.width = u, o.height = c, i.drawImage(l, 0, 0, u, c), e.outputFormat == "blob" ? o.toBlob(
        function(p) {
          n(p);
        },
        t.mimetype,
        t.quality
      ) : n(o.toDataURL(t.mimetype, t.quality));
    }, l.src = a;
  });
}
const Gt = document.documentElement;
let lo = Gt.querySelector("head");
const ps = document.createElement("style");
let ms = !1, un = !1, sr = "requestFullscreen", ar = "exitFullscreen", bn = "fullscreenElement", wn = "fullscreenchange";
function Wa(e) {
  return e instanceof HTMLElement ? e : Gt;
}
function sn() {
  return ms ? un : (ms = !0, "webkitRequestFullScreen" in Gt ? (sr = "webkitRequestFullScreen", ar = "webkitExitFullscreen", bn = "webkitFullscreenElement", wn = "webkitfullscreenchange", un = !0) : "msRequestFullscreen" in Gt ? (sr = "msRequestFullscreen", ar = "msExitFullscreen", bn = "msFullscreenElement", wn = "MSFullscreenChange", un = !0) : "mozRequestFullScreen" in Gt ? (sr = "mozRequestFullScreen", ar = "mozCancelFullScreen", bn = "mozFullScreenElement", wn = "mozfullscreenchange", un = !0) : (console.error("当前浏览器不支持 Fullscreen API !"), un = !1));
}
function Kd(e, t) {
  if (sn())
    return Wa(e)[sr]();
}
function Yd() {
  if (sn())
    return Gt.contains(ps) && (lo == null || lo.removeChild(ps)), document[ar]();
}
function Gd(e) {
  return sn() ? Wa(e) === document[bn] : !1;
}
function hs(e, t) {
  return sn() ? Gd(e) ? (Yd(), !1) : (Kd(e), !0) : !1;
}
function Xd(e) {
  if (!sn())
    return;
  const t = () => {
    e(!!document[bn]);
  };
  return window.addEventListener(wn, t), () => {
    window.removeEventListener(wn, t);
  };
}
const Jd = {
  id: "bpmn-viewer__wrap",
  class: "bpmn-viewer"
}, Zd = {
  key: 0,
  class: "bpmn-viewer__toolbar"
}, Qd = { style: { "text-align": "center", display: "inline-block", width: "40px" } }, ef = { class: "button-list_column" }, tf = /* @__PURE__ */ be({
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
    fullElement: {
      type: Object
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
    const r = e, o = n, { locale: i, t: s } = rn(), a = re(void 0), l = Cn(), u = {
      opacity: 0.5,
      fill: "#C8E6C9",
      stroke: "#338136"
    }, c = {
      fill: "#FFE0B2",
      stroke: "#6B3C00"
    }, p = () => {
      l.value = new na({
        container: a.value,
        moddleExtensions: {
          flowable: Ha
        },
        additionalModules: [kc, ra, ...Ua],
        gridLine: { gridLineOpacity: 0.1, gridLineStroke: 1 }
      }), l.value.on("element.hover", ({ element: $, gfx: D }) => {
        o("element-hover", $, D);
      }), l.value.on("canvas.viewbox.changed", ({ viewbox: $ }) => {
        m.value = $.scale || 1;
      }), o("viewer-init", l.value);
    }, g = () => {
      var $, D;
      ($ = l.value) == null || $.clear(), (D = l.value) == null || D.destroy(), l.value = void 0, o("viewer-destroy", l.value);
    }, w = () => l.value, d = ($) => $ ? r.translatePrefix + $ : "-", h = async ($) => {
      var D, q;
      try {
        l.value || p(), await ((D = l.value) == null ? void 0 : D.importXML($)), (q = l.value) == null || q.get("canvas").zoom("fit-viewport", "center");
      } catch (K) {
        console.error(K);
      }
    }, E = ($) => {
      var ae, Y, ye;
      const D = $.reduce(
        (ge, Ce) => (ge[Ce] = !0) && ge,
        {}
      ), q = (ae = l.value) == null ? void 0 : ae.get("elementRegistry"), K = (Y = l.value) == null ? void 0 : Y.get("canvas");
      if (!q) return;
      const pe = q.filter((ge) => D[ge.id]);
      (ye = l.value) == null || ye.get("modeling").setColor(pe, u);
      for (const ge of pe)
        K == null || K.addMarker(ge, "on-viewer"), K == null || K.addMarker(ge, "on-passed");
    }, T = ($) => (typeof $ == "string" && ($ = l.value.get("elementRegistry").get($)), l.value.get("canvas").hasMarker($, "on-passed")), P = ($) => {
      var ae, Y, ye;
      const D = $.reduce(
        (ge, Ce) => (ge[Ce] = !0) && ge,
        {}
      ), q = (ae = l.value) == null ? void 0 : ae.get("elementRegistry"), K = (Y = l.value) == null ? void 0 : Y.get("canvas");
      if (!q) return;
      const pe = q.filter((ge) => D[ge.id]);
      (ye = l.value) == null || ye.get("modeling").setColor(pe, c);
      for (const ge of pe)
        K == null || K.addMarker(ge, "on-viewer"), K == null || K.addMarker(ge, "on-active");
    }, R = ($) => (typeof $ == "string" && ($ = l.value.get("elementRegistry").get($)), l.value.get("canvas").hasMarker($, "on-active")), f = ($) => {
      var pe;
      const D = $.reduce(
        (ae, Y) => (ae[Y] = !0) && ae,
        {}
      ), q = (pe = l.value) == null ? void 0 : pe.get("elementRegistry");
      if (!q) return;
      const K = l.value.get("canvas");
      q.forEach((ae) => {
        if (D[ae.id]) {
          const Y = ae.type.split(":")[1];
          K.addMarker(ae, Y), K.addMarker(ae, "on-processing"), K.addMarker(ae, "on-viewer");
        }
      });
    }, L = ($) => (typeof $ == "string" && ($ = l.value.get("elementRegistry").get($)), l.value.get("canvas").hasMarker($, "on-processing")), A = ($) => {
      if (r.inPreset) return;
      if ($)
        return document.body.setAttribute("arco-theme", $);
      const D = document.body.getAttribute("arco-theme") === "dark";
      document.body.setAttribute("arco-theme", D ? "light" : "dark");
    }, v = ($) => {
      var D;
      r.inPreset || ($ ? i.value = $ : i.value = i.value === "zh_CN" ? "en_US" : "zh_CN", ai("local-lang", i.value), (D = l.value) == null || D.get("eventBus").fire("i18n.changed"));
    }, m = re(1), y = ($) => {
      const D = l.value.get("canvas");
      $ === "fit-viewport" ? D.zoom("fit-viewport", "center") : D.zoom($, { x: 0, y: 0 });
    }, O = ($) => {
      m.value = Math.floor(m.value * 100 - 0.1 * 100) / 100, y(m.value);
    }, _ = ($) => {
      m.value = Math.floor(m.value * 100 + 0.1 * 100) / 100, y(m.value);
    }, S = re(sn()), M = re(!1), X = () => {
      r.inPreset ? hs(
        r.fullElement || document.querySelector("#bpmn-viewer__wrap")
      ) : hs(document.querySelector("#bpmn-viewer__wrap"));
    };
    Xd(($) => {
      M.value = $;
    });
    const ce = ($) => {
      function D(K) {
        const pe = /var\(--([^)]+)\)/g;
        return K.replace(pe, (ae, Y) => q(Y) || ae);
      }
      function q(K) {
        if (K.includes("color-bg"))
          return "none";
        const pe = document.querySelector(".djs-container.djs-parent");
        return window.getComputedStyle(pe).getPropertyValue(`--${K}`);
      }
      return D($);
    }, ne = () => {
      var q, K, pe;
      const $ = l.value.get("elementRegistry");
      let D = (q = $.find((ae) => ae.type === "bpmn:Process")) == null ? void 0 : q.businessObject;
      return D || (D = (pe = (K = $.find((ae) => ae.type === "bpmn:Participant")) == null ? void 0 : K.businessObject) == null ? void 0 : pe.processRef), (D == null ? void 0 : D.name) || (D == null ? void 0 : D.id) || "diagram";
    }, V = async ($, D) => {
      try {
        const q = D || r.fileName || ne();
        if ($ === "xml" || $ === "bpmn") {
          const { error: K, xml: pe } = await l.value.saveXML({ format: !0 });
          K && console.error(`[Process Designer Warn ]: ${K.message || K}`);
          const { href: ae, filename: Y } = fs($.toUpperCase(), q, pe);
          ao(ae, Y);
        } else if ($ === "svg") {
          const { svg: K } = await l.value.saveSVG(), pe = ce(K), { href: ae, filename: Y } = fs("SVG", q, pe);
          ao(ae, Y);
        } else
          ue(q);
      } catch (q) {
        console.error(`[Process Designer Warn ]: ${q.message || q}`);
      }
    }, ue = async ($) => {
      const { svg: D } = await l.value.saveSVG(), q = ce(D), K = await qd({ svg: q, outputFormat: "blob" });
      K instanceof Blob && ao(URL.createObjectURL(K), $);
    };
    return lt(() => {
      p(), r.xml && h(r.xml);
    }), tn(() => g()), Re(() => r.theme, A, { immediate: !0 }), Re(() => r.local, v, { immediate: !0 }), t({
      createNewProcess: h,
      setPassedNodes: E,
      setActiveNodes: P,
      setProcessingMarker: f,
      isPassedNode: T,
      isActiveNode: R,
      isProcessingNode: L,
      getModeler: w,
      toggleLang: v,
      toggleTheme: A,
      downloadProcess: V,
      downloadProcessAsPng: ue
    }), ($, D) => (x(), Q("div", Jd, [
      e.toolbar ? (x(), Q("div", Zd, [
        H(I(rr), { size: "mini" }, {
          default: ie(() => [
            H(I($t), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ie(() => [
                Ne(se(I(s)(d("zoomOut"))), 1)
              ]),
              default: ie(() => [
                H(I(nt), {
                  onClick: D[0] || (D[0] = (q) => O())
                }, {
                  default: ie(() => [
                    H(I(Wd), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            H(I($t), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ie(() => [
                Ne(se(I(s)(d("zoomReset"))), 1)
              ]),
              default: ie(() => [
                H(I(nt), {
                  onClick: D[1] || (D[1] = (q) => y("fit-viewport"))
                }, {
                  default: ie(() => [
                    j("span", Qd, se(Math.floor(m.value * 10) * 10 + "%"), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            H(I($t), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ie(() => [
                Ne(se(I(s)(d("zoomIn"))), 1)
              ]),
              default: ie(() => [
                H(I(nt), {
                  onClick: D[2] || (D[2] = (q) => _())
                }, {
                  default: ie(() => [
                    H(I(Ud), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            e.showDownload ? (x(), ve(I($t), {
              key: 0,
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ie(() => [
                j("div", ef, [
                  H(I(nt), {
                    onClick: D[3] || (D[3] = (q) => V("bpmn"))
                  }, {
                    default: ie(() => [
                      Ne(se(I(s)(d("exportAsBPMN"))), 1)
                    ]),
                    _: 1
                  }),
                  H(I(nt), {
                    onClick: D[4] || (D[4] = (q) => V("xml"))
                  }, {
                    default: ie(() => [
                      Ne(se(I(s)(d("exportAsXML"))), 1)
                    ]),
                    _: 1
                  }),
                  H(I(nt), {
                    onClick: D[5] || (D[5] = (q) => V("svg"))
                  }, {
                    default: ie(() => [
                      Ne(se(I(s)(d("exportAsSVG"))), 1)
                    ]),
                    _: 1
                  }),
                  H(I(nt), {
                    onClick: D[6] || (D[6] = (q) => V("png"))
                  }, {
                    default: ie(() => [
                      Ne(se(I(s)(d("exportAsPNG"))), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: ie(() => [
                H(I(nt), null, {
                  default: ie(() => [
                    H(I(Vd), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : me("", !0),
            S.value ? (x(), ve(I($t), {
              key: 1,
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ie(() => [
                Ne(se(M.value ? I(s)(d("notFullscreen")) : I(s)(d("onFullscreen"))), 1)
              ]),
              default: ie(() => [
                H(I(nt), {
                  class: fe({ "is-unable": M.value }),
                  onClick: D[7] || (D[7] = (q) => X())
                }, {
                  default: ie(() => [
                    H(I(Hd), {
                      name: "Fullscreen",
                      size: 16
                    })
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _: 1
            })) : me("", !0)
          ]),
          _: 1
        })
      ])) : me("", !0),
      H(I(Zo), {
        style: { width: "100%", height: "100%" },
        loading: e.loading
      }, {
        default: ie(() => [
          j("div", {
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
var ze = "top", Xe = "bottom", Je = "right", je = "left", li = "auto", Nn = [ze, Xe, Je, je], Jt = "start", Tn = "end", nf = "clippingParents", qa = "viewport", dn = "popper", rf = "reference", vs = /* @__PURE__ */ Nn.reduce(function(e, t) {
  return e.concat([t + "-" + Jt, t + "-" + Tn]);
}, []), Ka = /* @__PURE__ */ [].concat(Nn, [li]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Jt, t + "-" + Tn]);
}, []), of = "beforeRead", sf = "read", af = "afterRead", lf = "beforeMain", cf = "main", uf = "afterMain", df = "beforeWrite", ff = "write", pf = "afterWrite", mf = [of, sf, af, lf, cf, uf, df, ff, pf];
function at(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function qe(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Rt(e) {
  var t = qe(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ge(e) {
  var t = qe(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ci(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = qe(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function hf(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ge(i) || !at(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var a = o[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function vf(e) {
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
      var o = t.elements[r], i = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), a = s.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !Ge(o) || !at(o) || (Object.assign(o.style, a), Object.keys(i).forEach(function(l) {
        o.removeAttribute(l);
      }));
    });
  };
}
const Ya = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: hf,
  effect: vf,
  requires: ["computeStyles"]
};
function st(e) {
  return e.split("-")[0];
}
var Lt = Math.max, br = Math.min, Zt = Math.round;
function Po() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ga() {
  return !/^((?!chrome|android).)*safari/i.test(Po());
}
function Qt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ge(e) && (o = e.offsetWidth > 0 && Zt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Zt(r.height) / e.offsetHeight || 1);
  var s = Rt(e) ? qe(e) : window, a = s.visualViewport, l = !Ga() && n, u = (r.left + (l && a ? a.offsetLeft : 0)) / o, c = (r.top + (l && a ? a.offsetTop : 0)) / i, p = r.width / o, g = r.height / i;
  return {
    width: p,
    height: g,
    top: c,
    right: u + p,
    bottom: c + g,
    left: u,
    x: u,
    y: c
  };
}
function ui(e) {
  var t = Qt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Xa(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && ci(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function vt(e) {
  return qe(e).getComputedStyle(e);
}
function yf(e) {
  return ["table", "td", "th"].indexOf(at(e)) >= 0;
}
function kt(e) {
  return ((Rt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Dr(e) {
  return at(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ci(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    kt(e)
  );
}
function ys(e) {
  return !Ge(e) || // https://github.com/popperjs/popper-core/issues/837
  vt(e).position === "fixed" ? null : e.offsetParent;
}
function gf(e) {
  var t = /firefox/i.test(Po()), n = /Trident/i.test(Po());
  if (n && Ge(e)) {
    var r = vt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Dr(e);
  for (ci(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(at(o)) < 0; ) {
    var i = vt(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Rn(e) {
  for (var t = qe(e), n = ys(e); n && yf(n) && vt(n).position === "static"; )
    n = ys(n);
  return n && (at(n) === "html" || at(n) === "body" && vt(n).position === "static") ? t : n || gf(e) || t;
}
function di(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function En(e, t, n) {
  return Lt(e, br(t, n));
}
function bf(e, t, n) {
  var r = En(e, t, n);
  return r > n ? n : r;
}
function Ja() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Za(e) {
  return Object.assign({}, Ja(), e);
}
function Qa(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var wf = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Za(typeof t != "number" ? t : Qa(t, Nn));
};
function Ef(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, a = st(n.placement), l = di(a), u = [je, Je].indexOf(a) >= 0, c = u ? "height" : "width";
  if (!(!i || !s)) {
    var p = wf(o.padding, n), g = ui(i), w = l === "y" ? ze : je, d = l === "y" ? Xe : Je, h = n.rects.reference[c] + n.rects.reference[l] - s[l] - n.rects.popper[c], E = s[l] - n.rects.reference[l], T = Rn(i), P = T ? l === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, R = h / 2 - E / 2, f = p[w], L = P - g[c] - p[d], A = P / 2 - g[c] / 2 + R, v = En(f, A, L), m = l;
    n.modifiersData[r] = (t = {}, t[m] = v, t.centerOffset = v - A, t);
  }
}
function Sf(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Xa(t.elements.popper, o) && (t.elements.arrow = o));
}
const _f = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ef,
  effect: Sf,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function en(e) {
  return e.split("-")[1];
}
var Cf = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function kf(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Zt(n * o) / o || 0,
    y: Zt(r * o) / o || 0
  };
}
function gs(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, a = e.position, l = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, p = e.isFixed, g = s.x, w = g === void 0 ? 0 : g, d = s.y, h = d === void 0 ? 0 : d, E = typeof c == "function" ? c({
    x: w,
    y: h
  }) : {
    x: w,
    y: h
  };
  w = E.x, h = E.y;
  var T = s.hasOwnProperty("x"), P = s.hasOwnProperty("y"), R = je, f = ze, L = window;
  if (u) {
    var A = Rn(n), v = "clientHeight", m = "clientWidth";
    if (A === qe(n) && (A = kt(n), vt(A).position !== "static" && a === "absolute" && (v = "scrollHeight", m = "scrollWidth")), A = A, o === ze || (o === je || o === Je) && i === Tn) {
      f = Xe;
      var y = p && A === L && L.visualViewport ? L.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        A[v]
      );
      h -= y - r.height, h *= l ? 1 : -1;
    }
    if (o === je || (o === ze || o === Xe) && i === Tn) {
      R = Je;
      var O = p && A === L && L.visualViewport ? L.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        A[m]
      );
      w -= O - r.width, w *= l ? 1 : -1;
    }
  }
  var _ = Object.assign({
    position: a
  }, u && Cf), S = c === !0 ? kf({
    x: w,
    y: h
  }, qe(n)) : {
    x: w,
    y: h
  };
  if (w = S.x, h = S.y, l) {
    var M;
    return Object.assign({}, _, (M = {}, M[f] = P ? "0" : "", M[R] = T ? "0" : "", M.transform = (L.devicePixelRatio || 1) <= 1 ? "translate(" + w + "px, " + h + "px)" : "translate3d(" + w + "px, " + h + "px, 0)", M));
  }
  return Object.assign({}, _, (t = {}, t[f] = P ? h + "px" : "", t[R] = T ? w + "px" : "", t.transform = "", t));
}
function Tf(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, a = n.roundOffsets, l = a === void 0 ? !0 : a, u = {
    placement: st(t.placement),
    variation: en(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, gs(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, gs(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Of = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Tf,
  data: {}
};
var Jn = {
  passive: !0
};
function Af(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, a = s === void 0 ? !0 : s, l = qe(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(c) {
    c.addEventListener("scroll", n.update, Jn);
  }), a && l.addEventListener("resize", n.update, Jn), function() {
    i && u.forEach(function(c) {
      c.removeEventListener("scroll", n.update, Jn);
    }), a && l.removeEventListener("resize", n.update, Jn);
  };
}
const Pf = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Af,
  data: {}
};
var Df = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function lr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Df[t];
  });
}
var $f = {
  start: "end",
  end: "start"
};
function bs(e) {
  return e.replace(/start|end/g, function(t) {
    return $f[t];
  });
}
function fi(e) {
  var t = qe(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function pi(e) {
  return Qt(kt(e)).left + fi(e).scrollLeft;
}
function xf(e, t) {
  var n = qe(e), r = kt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, a = 0, l = 0;
  if (o) {
    i = o.width, s = o.height;
    var u = Ga();
    (u || !u && t === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a + pi(e),
    y: l
  };
}
function If(e) {
  var t, n = kt(e), r = fi(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = Lt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Lt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + pi(e), l = -r.scrollTop;
  return vt(o || n).direction === "rtl" && (a += Lt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: l
  };
}
function mi(e) {
  var t = vt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function el(e) {
  return ["html", "body", "#document"].indexOf(at(e)) >= 0 ? e.ownerDocument.body : Ge(e) && mi(e) ? e : el(Dr(e));
}
function Sn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = el(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = qe(r), s = o ? [i].concat(i.visualViewport || [], mi(r) ? r : []) : r, a = t.concat(s);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(Sn(Dr(s)))
  );
}
function Do(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Mf(e, t) {
  var n = Qt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ws(e, t, n) {
  return t === qa ? Do(xf(e, n)) : Rt(t) ? Mf(t, n) : Do(If(kt(e)));
}
function Bf(e) {
  var t = Sn(Dr(e)), n = ["absolute", "fixed"].indexOf(vt(e).position) >= 0, r = n && Ge(e) ? Rn(e) : e;
  return Rt(r) ? t.filter(function(o) {
    return Rt(o) && Xa(o, r) && at(o) !== "body";
  }) : [];
}
function Lf(e, t, n, r) {
  var o = t === "clippingParents" ? Bf(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], a = i.reduce(function(l, u) {
    var c = ws(e, u, r);
    return l.top = Lt(c.top, l.top), l.right = br(c.right, l.right), l.bottom = br(c.bottom, l.bottom), l.left = Lt(c.left, l.left), l;
  }, ws(e, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function tl(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? st(r) : null, i = r ? en(r) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, l;
  switch (o) {
    case ze:
      l = {
        x: s,
        y: t.y - n.height
      };
      break;
    case Xe:
      l = {
        x: s,
        y: t.y + t.height
      };
      break;
    case Je:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case je:
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
  var u = o ? di(o) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (i) {
      case Jt:
        l[u] = l[u] - (t[c] / 2 - n[c] / 2);
        break;
      case Tn:
        l[u] = l[u] + (t[c] / 2 - n[c] / 2);
        break;
    }
  }
  return l;
}
function On(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, a = n.boundary, l = a === void 0 ? nf : a, u = n.rootBoundary, c = u === void 0 ? qa : u, p = n.elementContext, g = p === void 0 ? dn : p, w = n.altBoundary, d = w === void 0 ? !1 : w, h = n.padding, E = h === void 0 ? 0 : h, T = Za(typeof E != "number" ? E : Qa(E, Nn)), P = g === dn ? rf : dn, R = e.rects.popper, f = e.elements[d ? P : g], L = Lf(Rt(f) ? f : f.contextElement || kt(e.elements.popper), l, c, s), A = Qt(e.elements.reference), v = tl({
    reference: A,
    element: R,
    strategy: "absolute",
    placement: o
  }), m = Do(Object.assign({}, R, v)), y = g === dn ? m : A, O = {
    top: L.top - y.top + T.top,
    bottom: y.bottom - L.bottom + T.bottom,
    left: L.left - y.left + T.left,
    right: y.right - L.right + T.right
  }, _ = e.modifiersData.offset;
  if (g === dn && _) {
    var S = _[o];
    Object.keys(O).forEach(function(M) {
      var X = [Je, Xe].indexOf(M) >= 0 ? 1 : -1, ce = [ze, Xe].indexOf(M) >= 0 ? "y" : "x";
      O[M] += S[ce] * X;
    });
  }
  return O;
}
function Nf(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, a = n.flipVariations, l = n.allowedAutoPlacements, u = l === void 0 ? Ka : l, c = en(r), p = c ? a ? vs : vs.filter(function(d) {
    return en(d) === c;
  }) : Nn, g = p.filter(function(d) {
    return u.indexOf(d) >= 0;
  });
  g.length === 0 && (g = p);
  var w = g.reduce(function(d, h) {
    return d[h] = On(e, {
      placement: h,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[st(h)], d;
  }, {});
  return Object.keys(w).sort(function(d, h) {
    return w[d] - w[h];
  });
}
function Rf(e) {
  if (st(e) === li)
    return [];
  var t = lr(e);
  return [bs(e), t, bs(t)];
}
function Ff(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !0 : s, l = n.fallbackPlacements, u = n.padding, c = n.boundary, p = n.rootBoundary, g = n.altBoundary, w = n.flipVariations, d = w === void 0 ? !0 : w, h = n.allowedAutoPlacements, E = t.options.placement, T = st(E), P = T === E, R = l || (P || !d ? [lr(E)] : Rf(E)), f = [E].concat(R).reduce(function(ae, Y) {
      return ae.concat(st(Y) === li ? Nf(t, {
        placement: Y,
        boundary: c,
        rootBoundary: p,
        padding: u,
        flipVariations: d,
        allowedAutoPlacements: h
      }) : Y);
    }, []), L = t.rects.reference, A = t.rects.popper, v = /* @__PURE__ */ new Map(), m = !0, y = f[0], O = 0; O < f.length; O++) {
      var _ = f[O], S = st(_), M = en(_) === Jt, X = [ze, Xe].indexOf(S) >= 0, ce = X ? "width" : "height", ne = On(t, {
        placement: _,
        boundary: c,
        rootBoundary: p,
        altBoundary: g,
        padding: u
      }), V = X ? M ? Je : je : M ? Xe : ze;
      L[ce] > A[ce] && (V = lr(V));
      var ue = lr(V), $ = [];
      if (i && $.push(ne[S] <= 0), a && $.push(ne[V] <= 0, ne[ue] <= 0), $.every(function(ae) {
        return ae;
      })) {
        y = _, m = !1;
        break;
      }
      v.set(_, $);
    }
    if (m)
      for (var D = d ? 3 : 1, q = function(Y) {
        var ye = f.find(function(ge) {
          var Ce = v.get(ge);
          if (Ce)
            return Ce.slice(0, Y).every(function(Ie) {
              return Ie;
            });
        });
        if (ye)
          return y = ye, "break";
      }, K = D; K > 0; K--) {
        var pe = q(K);
        if (pe === "break") break;
      }
    t.placement !== y && (t.modifiersData[r]._skip = !0, t.placement = y, t.reset = !0);
  }
}
const zf = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Ff,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Es(e, t, n) {
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
function Ss(e) {
  return [ze, Je, Xe, je].some(function(t) {
    return e[t] >= 0;
  });
}
function jf(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = On(t, {
    elementContext: "reference"
  }), a = On(t, {
    altBoundary: !0
  }), l = Es(s, r), u = Es(a, o, i), c = Ss(l), p = Ss(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: p
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": p
  });
}
const Vf = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: jf
};
function Hf(e, t, n) {
  var r = st(e), o = [je, ze].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], a = i[1];
  return s = s || 0, a = (a || 0) * o, [je, Je].indexOf(r) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function Uf(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Ka.reduce(function(c, p) {
    return c[p] = Hf(p, t.rects, i), c;
  }, {}), a = s[t.placement], l = a.x, u = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
const Wf = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Uf
};
function qf(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = tl({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Kf = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: qf,
  data: {}
};
function Yf(e) {
  return e === "x" ? "y" : "x";
}
function Gf(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !1 : s, l = n.boundary, u = n.rootBoundary, c = n.altBoundary, p = n.padding, g = n.tether, w = g === void 0 ? !0 : g, d = n.tetherOffset, h = d === void 0 ? 0 : d, E = On(t, {
    boundary: l,
    rootBoundary: u,
    padding: p,
    altBoundary: c
  }), T = st(t.placement), P = en(t.placement), R = !P, f = di(T), L = Yf(f), A = t.modifiersData.popperOffsets, v = t.rects.reference, m = t.rects.popper, y = typeof h == "function" ? h(Object.assign({}, t.rects, {
    placement: t.placement
  })) : h, O = typeof y == "number" ? {
    mainAxis: y,
    altAxis: y
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, y), _ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, S = {
    x: 0,
    y: 0
  };
  if (A) {
    if (i) {
      var M, X = f === "y" ? ze : je, ce = f === "y" ? Xe : Je, ne = f === "y" ? "height" : "width", V = A[f], ue = V + E[X], $ = V - E[ce], D = w ? -m[ne] / 2 : 0, q = P === Jt ? v[ne] : m[ne], K = P === Jt ? -m[ne] : -v[ne], pe = t.elements.arrow, ae = w && pe ? ui(pe) : {
        width: 0,
        height: 0
      }, Y = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ja(), ye = Y[X], ge = Y[ce], Ce = En(0, v[ne], ae[ne]), Ie = R ? v[ne] / 2 - D - Ce - ye - O.mainAxis : q - Ce - ye - O.mainAxis, b = R ? -v[ne] / 2 + D + Ce + ge + O.mainAxis : K + Ce + ge + O.mainAxis, B = t.elements.arrow && Rn(t.elements.arrow), F = B ? f === "y" ? B.clientTop || 0 : B.clientLeft || 0 : 0, G = (M = _ == null ? void 0 : _[f]) != null ? M : 0, U = V + Ie - G - F, z = V + b - G, de = En(w ? br(ue, U) : ue, V, w ? Lt($, z) : $);
      A[f] = de, S[f] = de - V;
    }
    if (a) {
      var we, De = f === "x" ? ze : je, ct = f === "x" ? Xe : Je, ke = A[L], _e = L === "y" ? "height" : "width", Ot = ke + E[De], Ze = ke - E[ct], et = [ze, je].indexOf(T) !== -1, At = (we = _ == null ? void 0 : _[L]) != null ? we : 0, Vt = et ? Ot : ke - v[_e] - m[_e] - At + O.altAxis, Ht = et ? ke + v[_e] + m[_e] - At - O.altAxis : Ze, N = w && et ? bf(Vt, ke, Ht) : En(w ? Vt : Ot, ke, w ? Ht : Ze);
      A[L] = N, S[L] = N - ke;
    }
    t.modifiersData[r] = S;
  }
}
const Xf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Gf,
  requiresIfExists: ["offset"]
};
function Jf(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Zf(e) {
  return e === qe(e) || !Ge(e) ? fi(e) : Jf(e);
}
function Qf(e) {
  var t = e.getBoundingClientRect(), n = Zt(t.width) / e.offsetWidth || 1, r = Zt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function ep(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ge(t), o = Ge(t) && Qf(t), i = kt(t), s = Qt(e, o, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((at(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  mi(i)) && (a = Zf(t)), Ge(t) ? (l = Qt(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : i && (l.x = pi(i))), {
    x: s.left + a.scrollLeft - l.x,
    y: s.top + a.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function tp(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(a) {
      if (!n.has(a)) {
        var l = t.get(a);
        l && o(l);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function np(e) {
  var t = tp(e);
  return mf.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function rp(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function op(e) {
  var t = e.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var _s = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Cs() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function ip(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? _s : o;
  return function(a, l, u) {
    u === void 0 && (u = i);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, _s, i),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, p = [], g = !1, w = {
      state: c,
      setOptions: function(T) {
        var P = typeof T == "function" ? T(c.options) : T;
        h(), c.options = Object.assign({}, i, c.options, P), c.scrollParents = {
          reference: Rt(a) ? Sn(a) : a.contextElement ? Sn(a.contextElement) : [],
          popper: Sn(l)
        };
        var R = np(op([].concat(r, c.options.modifiers)));
        return c.orderedModifiers = R.filter(function(f) {
          return f.enabled;
        }), d(), w.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var T = c.elements, P = T.reference, R = T.popper;
          if (Cs(P, R)) {
            c.rects = {
              reference: ep(P, Rn(R), c.options.strategy === "fixed"),
              popper: ui(R)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(O) {
              return c.modifiersData[O.name] = Object.assign({}, O.data);
            });
            for (var f = 0; f < c.orderedModifiers.length; f++) {
              if (c.reset === !0) {
                c.reset = !1, f = -1;
                continue;
              }
              var L = c.orderedModifiers[f], A = L.fn, v = L.options, m = v === void 0 ? {} : v, y = L.name;
              typeof A == "function" && (c = A({
                state: c,
                options: m,
                name: y,
                instance: w
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: rp(function() {
        return new Promise(function(E) {
          w.forceUpdate(), E(c);
        });
      }),
      destroy: function() {
        h(), g = !0;
      }
    };
    if (!Cs(a, l))
      return w;
    w.setOptions(u).then(function(E) {
      !g && u.onFirstUpdate && u.onFirstUpdate(E);
    });
    function d() {
      c.orderedModifiers.forEach(function(E) {
        var T = E.name, P = E.options, R = P === void 0 ? {} : P, f = E.effect;
        if (typeof f == "function") {
          var L = f({
            state: c,
            name: T,
            instance: w,
            options: R
          }), A = function() {
          };
          p.push(L || A);
        }
      });
    }
    function h() {
      p.forEach(function(E) {
        return E();
      }), p = [];
    }
    return w;
  };
}
var sp = [Pf, Kf, Of, Ya, Wf, zf, Xf, _f, Vf], ap = /* @__PURE__ */ ip({
  defaultModifiers: sp
}), lp = "tippy-box", nl = "tippy-content", cp = "tippy-backdrop", rl = "tippy-arrow", ol = "tippy-svg-arrow", Dt = {
  passive: !0,
  capture: !0
}, il = function() {
  return document.body;
};
function up(e, t) {
  return {}.hasOwnProperty.call(e, t);
}
function co(e, t, n) {
  if (Array.isArray(e)) {
    var r = e[t];
    return r ?? (Array.isArray(n) ? n[t] : n);
  }
  return e;
}
function hi(e, t) {
  var n = {}.toString.call(e);
  return n.indexOf("[object") === 0 && n.indexOf(t + "]") > -1;
}
function sl(e, t) {
  return typeof e == "function" ? e.apply(void 0, t) : e;
}
function ks(e, t) {
  if (t === 0)
    return e;
  var n;
  return function(r) {
    clearTimeout(n), n = setTimeout(function() {
      e(r);
    }, t);
  };
}
function dp(e, t) {
  var n = Object.assign({}, e);
  return t.forEach(function(r) {
    delete n[r];
  }), n;
}
function fp(e) {
  return e.split(/\s+/).filter(Boolean);
}
function Kt(e) {
  return [].concat(e);
}
function Ts(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function pp(e) {
  return e.filter(function(t, n) {
    return e.indexOf(t) === n;
  });
}
function mp(e) {
  return e.split("-")[0];
}
function wr(e) {
  return [].slice.call(e);
}
function Os(e) {
  return Object.keys(e).reduce(function(t, n) {
    return e[n] !== void 0 && (t[n] = e[n]), t;
  }, {});
}
function _n() {
  return document.createElement("div");
}
function An(e) {
  return ["Element", "Fragment"].some(function(t) {
    return hi(e, t);
  });
}
function hp(e) {
  return hi(e, "NodeList");
}
function al(e) {
  return hi(e, "MouseEvent");
}
function vp(e) {
  return !!(e && e._tippy && e._tippy.reference === e);
}
function yp(e) {
  return An(e) ? [e] : hp(e) ? wr(e) : Array.isArray(e) ? e : wr(document.querySelectorAll(e));
}
function uo(e, t) {
  e.forEach(function(n) {
    n && (n.style.transitionDuration = t + "ms");
  });
}
function As(e, t) {
  e.forEach(function(n) {
    n && n.setAttribute("data-state", t);
  });
}
function ll(e) {
  var t, n = Kt(e), r = n[0];
  return r != null && (t = r.ownerDocument) != null && t.body ? r.ownerDocument : document;
}
function gp(e, t) {
  var n = t.clientX, r = t.clientY;
  return e.every(function(o) {
    var i = o.popperRect, s = o.popperState, a = o.props, l = a.interactiveBorder, u = mp(s.placement), c = s.modifiersData.offset;
    if (!c)
      return !0;
    var p = u === "bottom" ? c.top.y : 0, g = u === "top" ? c.bottom.y : 0, w = u === "right" ? c.left.x : 0, d = u === "left" ? c.right.x : 0, h = i.top - r + p > l, E = r - i.bottom - g > l, T = i.left - n + w > l, P = n - i.right - d > l;
    return h || E || T || P;
  });
}
function fo(e, t, n) {
  var r = t + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(o) {
    e[r](o, n);
  });
}
function Ps(e, t) {
  for (var n = t; n; ) {
    var r;
    if (e.contains(n))
      return !0;
    n = n.getRootNode == null || (r = n.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var it = {
  isTouch: !1
}, Ds = 0;
function bp() {
  it.isTouch || (it.isTouch = !0, window.performance && document.addEventListener("mousemove", cl));
}
function cl() {
  var e = performance.now();
  e - Ds < 20 && (it.isTouch = !1, document.removeEventListener("mousemove", cl)), Ds = e;
}
function wp() {
  var e = document.activeElement;
  if (vp(e)) {
    var t = e._tippy;
    e.blur && !t.state.isVisible && e.blur();
  }
}
function Ep() {
  document.addEventListener("touchstart", bp, Dt), window.addEventListener("blur", wp);
}
var Sp = typeof window < "u" && typeof document < "u", _p = Sp ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function qt(e) {
  var t = e === "destroy" ? "n already-" : " ";
  return [e + "() was called on a" + t + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function $s(e) {
  var t = /[ \t]{2,}/g, n = /^[ \t]*/gm;
  return e.replace(t, " ").replace(n, "").trim();
}
function Cp(e) {
  return $s(`
  %ctippy.js

  %c` + $s(e) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function ul(e) {
  return [
    Cp(e),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var Pn;
process.env.NODE_ENV !== "production" && kp();
function kp() {
  Pn = /* @__PURE__ */ new Set();
}
function dt(e, t) {
  if (e && !Pn.has(t)) {
    var n;
    Pn.add(t), (n = console).warn.apply(n, ul(t));
  }
}
function $o(e, t) {
  if (e && !Pn.has(t)) {
    var n;
    Pn.add(t), (n = console).error.apply(n, ul(t));
  }
}
function Tp(e) {
  var t = !e, n = Object.prototype.toString.call(e) === "[object Object]" && !e.addEventListener;
  $o(t, ["tippy() was passed", "`" + String(e) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), $o(n, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var dl = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, Op = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, Ue = Object.assign({
  appendTo: il,
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
}, dl, Op), Ap = Object.keys(Ue), Pp = function(t) {
  process.env.NODE_ENV !== "production" && pl(t, []);
  var n = Object.keys(t);
  n.forEach(function(r) {
    Ue[r] = t[r];
  });
};
function fl(e) {
  var t = e.plugins || [], n = t.reduce(function(r, o) {
    var i = o.name, s = o.defaultValue;
    if (i) {
      var a;
      r[i] = e[i] !== void 0 ? e[i] : (a = Ue[i]) != null ? a : s;
    }
    return r;
  }, {});
  return Object.assign({}, e, n);
}
function Dp(e, t) {
  var n = t ? Object.keys(fl(Object.assign({}, Ue, {
    plugins: t
  }))) : Ap, r = n.reduce(function(o, i) {
    var s = (e.getAttribute("data-tippy-" + i) || "").trim();
    if (!s)
      return o;
    if (i === "content")
      o[i] = s;
    else
      try {
        o[i] = JSON.parse(s);
      } catch {
        o[i] = s;
      }
    return o;
  }, {});
  return r;
}
function xs(e, t) {
  var n = Object.assign({}, t, {
    content: sl(t.content, [e])
  }, t.ignoreAttributes ? {} : Dp(e, t.plugins));
  return n.aria = Object.assign({}, Ue.aria, n.aria), n.aria = {
    expanded: n.aria.expanded === "auto" ? t.interactive : n.aria.expanded,
    content: n.aria.content === "auto" ? t.interactive ? null : "describedby" : n.aria.content
  }, n;
}
function pl(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = []);
  var n = Object.keys(e);
  n.forEach(function(r) {
    var o = dp(Ue, Object.keys(dl)), i = !up(o, r);
    i && (i = t.filter(function(s) {
      return s.name === r;
    }).length === 0), dt(i, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var $p = function() {
  return "innerHTML";
};
function xo(e, t) {
  e[$p()] = t;
}
function Is(e) {
  var t = _n();
  return e === !0 ? t.className = rl : (t.className = ol, An(e) ? t.appendChild(e) : xo(t, e)), t;
}
function Ms(e, t) {
  An(t.content) ? (xo(e, ""), e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? xo(e, t.content) : e.textContent = t.content);
}
function Io(e) {
  var t = e.firstElementChild, n = wr(t.children);
  return {
    box: t,
    content: n.find(function(r) {
      return r.classList.contains(nl);
    }),
    arrow: n.find(function(r) {
      return r.classList.contains(rl) || r.classList.contains(ol);
    }),
    backdrop: n.find(function(r) {
      return r.classList.contains(cp);
    })
  };
}
function ml(e) {
  var t = _n(), n = _n();
  n.className = lp, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
  var r = _n();
  r.className = nl, r.setAttribute("data-state", "hidden"), Ms(r, e.props), t.appendChild(n), n.appendChild(r), o(e.props, e.props);
  function o(i, s) {
    var a = Io(t), l = a.box, u = a.content, c = a.arrow;
    s.theme ? l.setAttribute("data-theme", s.theme) : l.removeAttribute("data-theme"), typeof s.animation == "string" ? l.setAttribute("data-animation", s.animation) : l.removeAttribute("data-animation"), s.inertia ? l.setAttribute("data-inertia", "") : l.removeAttribute("data-inertia"), l.style.maxWidth = typeof s.maxWidth == "number" ? s.maxWidth + "px" : s.maxWidth, s.role ? l.setAttribute("role", s.role) : l.removeAttribute("role"), (i.content !== s.content || i.allowHTML !== s.allowHTML) && Ms(u, e.props), s.arrow ? c ? i.arrow !== s.arrow && (l.removeChild(c), l.appendChild(Is(s.arrow))) : l.appendChild(Is(s.arrow)) : c && l.removeChild(c);
  }
  return {
    popper: t,
    onUpdate: o
  };
}
ml.$$tippy = !0;
var xp = 1, Zn = [], po = [];
function Ip(e, t) {
  var n = xs(e, Object.assign({}, Ue, fl(Os(t)))), r, o, i, s = !1, a = !1, l = !1, u = !1, c, p, g, w = [], d = ks(U, n.interactiveDebounce), h, E = xp++, T = null, P = pp(n.plugins), R = {
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
  }, f = {
    // properties
    id: E,
    reference: e,
    popper: _n(),
    popperInstance: T,
    props: n,
    state: R,
    plugins: P,
    // methods
    clearDelayTimeouts: Vt,
    setProps: Ht,
    setContent: N,
    show: ee,
    hide: xe,
    hideWithInteractivity: gt,
    enable: et,
    disable: At,
    unmount: ut,
    destroy: bt
  };
  if (!n.render)
    return process.env.NODE_ENV !== "production" && $o(!0, "render() function has not been supplied."), f;
  var L = n.render(f), A = L.popper, v = L.onUpdate;
  A.setAttribute("data-tippy-root", ""), A.id = "tippy-" + f.id, f.popper = A, e._tippy = f, A._tippy = f;
  var m = P.map(function(k) {
    return k.fn(f);
  }), y = e.hasAttribute("aria-expanded");
  return B(), D(), V(), ue("onCreate", [f]), n.showOnCreate && Ot(), A.addEventListener("mouseenter", function() {
    f.props.interactive && f.state.isVisible && f.clearDelayTimeouts();
  }), A.addEventListener("mouseleave", function() {
    f.props.interactive && f.props.trigger.indexOf("mouseenter") >= 0 && X().addEventListener("mousemove", d);
  }), f;
  function O() {
    var k = f.props.touch;
    return Array.isArray(k) ? k : [k, 0];
  }
  function _() {
    return O()[0] === "hold";
  }
  function S() {
    var k;
    return !!((k = f.props.render) != null && k.$$tippy);
  }
  function M() {
    return h || e;
  }
  function X() {
    var k = M().parentNode;
    return k ? ll(k) : document;
  }
  function ce() {
    return Io(A);
  }
  function ne(k) {
    return f.state.isMounted && !f.state.isVisible || it.isTouch || c && c.type === "focus" ? 0 : co(f.props.delay, k ? 0 : 1, Ue.delay);
  }
  function V(k) {
    k === void 0 && (k = !1), A.style.pointerEvents = f.props.interactive && !k ? "" : "none", A.style.zIndex = "" + f.props.zIndex;
  }
  function ue(k, W, te) {
    if (te === void 0 && (te = !0), m.forEach(function(he) {
      he[k] && he[k].apply(he, W);
    }), te) {
      var Se;
      (Se = f.props)[k].apply(Se, W);
    }
  }
  function $() {
    var k = f.props.aria;
    if (k.content) {
      var W = "aria-" + k.content, te = A.id, Se = Kt(f.props.triggerTarget || e);
      Se.forEach(function(he) {
        var Be = he.getAttribute(W);
        if (f.state.isVisible)
          he.setAttribute(W, Be ? Be + " " + te : te);
        else {
          var Ke = Be && Be.replace(te, "").trim();
          Ke ? he.setAttribute(W, Ke) : he.removeAttribute(W);
        }
      });
    }
  }
  function D() {
    if (!(y || !f.props.aria.expanded)) {
      var k = Kt(f.props.triggerTarget || e);
      k.forEach(function(W) {
        f.props.interactive ? W.setAttribute("aria-expanded", f.state.isVisible && W === M() ? "true" : "false") : W.removeAttribute("aria-expanded");
      });
    }
  }
  function q() {
    X().removeEventListener("mousemove", d), Zn = Zn.filter(function(k) {
      return k !== d;
    });
  }
  function K(k) {
    if (!(it.isTouch && (l || k.type === "mousedown"))) {
      var W = k.composedPath && k.composedPath()[0] || k.target;
      if (!(f.props.interactive && Ps(A, W))) {
        if (Kt(f.props.triggerTarget || e).some(function(te) {
          return Ps(te, W);
        })) {
          if (it.isTouch || f.state.isVisible && f.props.trigger.indexOf("click") >= 0)
            return;
        } else
          ue("onClickOutside", [f, k]);
        f.props.hideOnClick === !0 && (f.clearDelayTimeouts(), f.hide(), a = !0, setTimeout(function() {
          a = !1;
        }), f.state.isMounted || ye());
      }
    }
  }
  function pe() {
    l = !0;
  }
  function ae() {
    l = !1;
  }
  function Y() {
    var k = X();
    k.addEventListener("mousedown", K, !0), k.addEventListener("touchend", K, Dt), k.addEventListener("touchstart", ae, Dt), k.addEventListener("touchmove", pe, Dt);
  }
  function ye() {
    var k = X();
    k.removeEventListener("mousedown", K, !0), k.removeEventListener("touchend", K, Dt), k.removeEventListener("touchstart", ae, Dt), k.removeEventListener("touchmove", pe, Dt);
  }
  function ge(k, W) {
    Ie(k, function() {
      !f.state.isVisible && A.parentNode && A.parentNode.contains(A) && W();
    });
  }
  function Ce(k, W) {
    Ie(k, W);
  }
  function Ie(k, W) {
    var te = ce().box;
    function Se(he) {
      he.target === te && (fo(te, "remove", Se), W());
    }
    if (k === 0)
      return W();
    fo(te, "remove", p), fo(te, "add", Se), p = Se;
  }
  function b(k, W, te) {
    te === void 0 && (te = !1);
    var Se = Kt(f.props.triggerTarget || e);
    Se.forEach(function(he) {
      he.addEventListener(k, W, te), w.push({
        node: he,
        eventType: k,
        handler: W,
        options: te
      });
    });
  }
  function B() {
    _() && (b("touchstart", G, {
      passive: !0
    }), b("touchend", z, {
      passive: !0
    })), fp(f.props.trigger).forEach(function(k) {
      if (k !== "manual")
        switch (b(k, G), k) {
          case "mouseenter":
            b("mouseleave", z);
            break;
          case "focus":
            b(_p ? "focusout" : "blur", de);
            break;
          case "focusin":
            b("focusout", de);
            break;
        }
    });
  }
  function F() {
    w.forEach(function(k) {
      var W = k.node, te = k.eventType, Se = k.handler, he = k.options;
      W.removeEventListener(te, Se, he);
    }), w = [];
  }
  function G(k) {
    var W, te = !1;
    if (!(!f.state.isEnabled || we(k) || a)) {
      var Se = ((W = c) == null ? void 0 : W.type) === "focus";
      c = k, h = k.currentTarget, D(), !f.state.isVisible && al(k) && Zn.forEach(function(he) {
        return he(k);
      }), k.type === "click" && (f.props.trigger.indexOf("mouseenter") < 0 || s) && f.props.hideOnClick !== !1 && f.state.isVisible ? te = !0 : Ot(k), k.type === "click" && (s = !te), te && !Se && Ze(k);
    }
  }
  function U(k) {
    var W = k.target, te = M().contains(W) || A.contains(W);
    if (!(k.type === "mousemove" && te)) {
      var Se = _e().concat(A).map(function(he) {
        var Be, Ke = he._tippy, Ut = (Be = Ke.popperInstance) == null ? void 0 : Be.state;
        return Ut ? {
          popperRect: he.getBoundingClientRect(),
          popperState: Ut,
          props: n
        } : null;
      }).filter(Boolean);
      gp(Se, k) && (q(), Ze(k));
    }
  }
  function z(k) {
    var W = we(k) || f.props.trigger.indexOf("click") >= 0 && s;
    if (!W) {
      if (f.props.interactive) {
        f.hideWithInteractivity(k);
        return;
      }
      Ze(k);
    }
  }
  function de(k) {
    f.props.trigger.indexOf("focusin") < 0 && k.target !== M() || f.props.interactive && k.relatedTarget && A.contains(k.relatedTarget) || Ze(k);
  }
  function we(k) {
    return it.isTouch ? _() !== k.type.indexOf("touch") >= 0 : !1;
  }
  function De() {
    ct();
    var k = f.props, W = k.popperOptions, te = k.placement, Se = k.offset, he = k.getReferenceClientRect, Be = k.moveTransition, Ke = S() ? Io(A).arrow : null, Ut = he ? {
      getBoundingClientRect: he,
      contextElement: he.contextElement || M()
    } : e, Ei = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Vn) {
        var Wt = Vn.state;
        if (S()) {
          var Hl = ce(), Rr = Hl.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(Hn) {
            Hn === "placement" ? Rr.setAttribute("data-placement", Wt.placement) : Wt.attributes.popper["data-popper-" + Hn] ? Rr.setAttribute("data-" + Hn, "") : Rr.removeAttribute("data-" + Hn);
          }), Wt.attributes.popper = {};
        }
      }
    }, Pt = [{
      name: "offset",
      options: {
        offset: Se
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
        adaptive: !Be
      }
    }, Ei];
    S() && Ke && Pt.push({
      name: "arrow",
      options: {
        element: Ke,
        padding: 3
      }
    }), Pt.push.apply(Pt, (W == null ? void 0 : W.modifiers) || []), f.popperInstance = ap(Ut, A, Object.assign({}, W, {
      placement: te,
      onFirstUpdate: g,
      modifiers: Pt
    }));
  }
  function ct() {
    f.popperInstance && (f.popperInstance.destroy(), f.popperInstance = null);
  }
  function ke() {
    var k = f.props.appendTo, W, te = M();
    f.props.interactive && k === il || k === "parent" ? W = te.parentNode : W = sl(k, [te]), W.contains(A) || W.appendChild(A), f.state.isMounted = !0, De(), process.env.NODE_ENV !== "production" && dt(f.props.interactive && k === Ue.appendTo && te.nextElementSibling !== A, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function _e() {
    return wr(A.querySelectorAll("[data-tippy-root]"));
  }
  function Ot(k) {
    f.clearDelayTimeouts(), k && ue("onTrigger", [f, k]), Y();
    var W = ne(!0), te = O(), Se = te[0], he = te[1];
    it.isTouch && Se === "hold" && he && (W = he), W ? r = setTimeout(function() {
      f.show();
    }, W) : f.show();
  }
  function Ze(k) {
    if (f.clearDelayTimeouts(), ue("onUntrigger", [f, k]), !f.state.isVisible) {
      ye();
      return;
    }
    if (!(f.props.trigger.indexOf("mouseenter") >= 0 && f.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(k.type) >= 0 && s)) {
      var W = ne(!1);
      W ? o = setTimeout(function() {
        f.state.isVisible && f.hide();
      }, W) : i = requestAnimationFrame(function() {
        f.hide();
      });
    }
  }
  function et() {
    f.state.isEnabled = !0;
  }
  function At() {
    f.hide(), f.state.isEnabled = !1;
  }
  function Vt() {
    clearTimeout(r), clearTimeout(o), cancelAnimationFrame(i);
  }
  function Ht(k) {
    if (process.env.NODE_ENV !== "production" && dt(f.state.isDestroyed, qt("setProps")), !f.state.isDestroyed) {
      ue("onBeforeUpdate", [f, k]), F();
      var W = f.props, te = xs(e, Object.assign({}, W, Os(k), {
        ignoreAttributes: !0
      }));
      f.props = te, B(), W.interactiveDebounce !== te.interactiveDebounce && (q(), d = ks(U, te.interactiveDebounce)), W.triggerTarget && !te.triggerTarget ? Kt(W.triggerTarget).forEach(function(Se) {
        Se.removeAttribute("aria-expanded");
      }) : te.triggerTarget && e.removeAttribute("aria-expanded"), D(), V(), v && v(W, te), f.popperInstance && (De(), _e().forEach(function(Se) {
        requestAnimationFrame(Se._tippy.popperInstance.forceUpdate);
      })), ue("onAfterUpdate", [f, k]);
    }
  }
  function N(k) {
    f.setProps({
      content: k
    });
  }
  function ee() {
    process.env.NODE_ENV !== "production" && dt(f.state.isDestroyed, qt("show"));
    var k = f.state.isVisible, W = f.state.isDestroyed, te = !f.state.isEnabled, Se = it.isTouch && !f.props.touch, he = co(f.props.duration, 0, Ue.duration);
    if (!(k || W || te || Se) && !M().hasAttribute("disabled") && (ue("onShow", [f], !1), f.props.onShow(f) !== !1)) {
      if (f.state.isVisible = !0, S() && (A.style.visibility = "visible"), V(), Y(), f.state.isMounted || (A.style.transition = "none"), S()) {
        var Be = ce(), Ke = Be.box, Ut = Be.content;
        uo([Ke, Ut], 0);
      }
      g = function() {
        var Pt;
        if (!(!f.state.isVisible || u)) {
          if (u = !0, A.offsetHeight, A.style.transition = f.props.moveTransition, S() && f.props.animation) {
            var Nr = ce(), Vn = Nr.box, Wt = Nr.content;
            uo([Vn, Wt], he), As([Vn, Wt], "visible");
          }
          $(), D(), Ts(po, f), (Pt = f.popperInstance) == null || Pt.forceUpdate(), ue("onMount", [f]), f.props.animation && S() && Ce(he, function() {
            f.state.isShown = !0, ue("onShown", [f]);
          });
        }
      }, ke();
    }
  }
  function xe() {
    process.env.NODE_ENV !== "production" && dt(f.state.isDestroyed, qt("hide"));
    var k = !f.state.isVisible, W = f.state.isDestroyed, te = !f.state.isEnabled, Se = co(f.props.duration, 1, Ue.duration);
    if (!(k || W || te) && (ue("onHide", [f], !1), f.props.onHide(f) !== !1)) {
      if (f.state.isVisible = !1, f.state.isShown = !1, u = !1, s = !1, S() && (A.style.visibility = "hidden"), q(), ye(), V(!0), S()) {
        var he = ce(), Be = he.box, Ke = he.content;
        f.props.animation && (uo([Be, Ke], Se), As([Be, Ke], "hidden"));
      }
      $(), D(), f.props.animation ? S() && ge(Se, f.unmount) : f.unmount();
    }
  }
  function gt(k) {
    process.env.NODE_ENV !== "production" && dt(f.state.isDestroyed, qt("hideWithInteractivity")), X().addEventListener("mousemove", d), Ts(Zn, d), d(k);
  }
  function ut() {
    process.env.NODE_ENV !== "production" && dt(f.state.isDestroyed, qt("unmount")), f.state.isVisible && f.hide(), f.state.isMounted && (ct(), _e().forEach(function(k) {
      k._tippy.unmount();
    }), A.parentNode && A.parentNode.removeChild(A), po = po.filter(function(k) {
      return k !== f;
    }), f.state.isMounted = !1, ue("onHidden", [f]));
  }
  function bt() {
    process.env.NODE_ENV !== "production" && dt(f.state.isDestroyed, qt("destroy")), !f.state.isDestroyed && (f.clearDelayTimeouts(), f.unmount(), F(), delete e._tippy, f.state.isDestroyed = !0, ue("onDestroy", [f]));
  }
}
function Fn(e, t) {
  t === void 0 && (t = {});
  var n = Ue.plugins.concat(t.plugins || []);
  process.env.NODE_ENV !== "production" && (Tp(e), pl(t, n)), Ep();
  var r = Object.assign({}, t, {
    plugins: n
  }), o = yp(e);
  if (process.env.NODE_ENV !== "production") {
    var i = An(r.content), s = o.length > 1;
    dt(i && s, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var a = o.reduce(function(l, u) {
    var c = u && Ip(u, r);
    return c && l.push(c), l;
  }, []);
  return An(e) ? a[0] : a;
}
Fn.defaultProps = Ue;
Fn.setDefaultProps = Pp;
Fn.currentInput = it;
Object.assign({}, Ya, {
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
var Mo = {
  clientX: 0,
  clientY: 0
}, Qn = [];
function hl(e) {
  var t = e.clientX, n = e.clientY;
  Mo = {
    clientX: t,
    clientY: n
  };
}
function Mp(e) {
  e.addEventListener("mousemove", hl);
}
function Bp(e) {
  e.removeEventListener("mousemove", hl);
}
var Lp = {
  name: "followCursor",
  defaultValue: !1,
  fn: function(t) {
    var n = t.reference, r = ll(t.props.triggerTarget || n), o = !1, i = !1, s = !0, a = t.props;
    function l() {
      return t.props.followCursor === "initial" && t.state.isVisible;
    }
    function u() {
      r.addEventListener("mousemove", g);
    }
    function c() {
      r.removeEventListener("mousemove", g);
    }
    function p() {
      o = !0, t.setProps({
        getReferenceClientRect: null
      }), o = !1;
    }
    function g(h) {
      var E = h.target ? n.contains(h.target) : !0, T = t.props.followCursor, P = h.clientX, R = h.clientY, f = n.getBoundingClientRect(), L = P - f.left, A = R - f.top;
      (E || !t.props.interactive) && t.setProps({
        // @ts-ignore - unneeded DOMRect properties
        getReferenceClientRect: function() {
          var m = n.getBoundingClientRect(), y = P, O = R;
          T === "initial" && (y = m.left + L, O = m.top + A);
          var _ = T === "horizontal" ? m.top : O, S = T === "vertical" ? m.right : y, M = T === "horizontal" ? m.bottom : O, X = T === "vertical" ? m.left : y;
          return {
            width: S - X,
            height: M - _,
            top: _,
            right: S,
            bottom: M,
            left: X
          };
        }
      });
    }
    function w() {
      t.props.followCursor && (Qn.push({
        instance: t,
        doc: r
      }), Mp(r));
    }
    function d() {
      Qn = Qn.filter(function(h) {
        return h.instance !== t;
      }), Qn.filter(function(h) {
        return h.doc === r;
      }).length === 0 && Bp(r);
    }
    return {
      onCreate: w,
      onDestroy: d,
      onBeforeUpdate: function() {
        a = t.props;
      },
      onAfterUpdate: function(E, T) {
        var P = T.followCursor;
        o || P !== void 0 && a.followCursor !== P && (d(), P ? (w(), t.state.isMounted && !i && !l() && u()) : (c(), p()));
      },
      onMount: function() {
        t.props.followCursor && !i && (s && (g(Mo), s = !1), l() || u());
      },
      onTrigger: function(E, T) {
        al(T) && (Mo = {
          clientX: T.clientX,
          clientY: T.clientY
        }), i = T.type === "focus";
      },
      onHidden: function() {
        t.props.followCursor && (p(), c(), s = !0);
      }
    };
  }
};
Fn.setDefaultProps({
  render: ml
});
const Np = /* @__PURE__ */ be({
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
    appendTo: {
      type: [Boolean, Object],
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
    const t = e, n = Cn(null), r = Cn(null), o = () => {
      const s = {
        ignoreAttributes: !0,
        allowHTML: !1,
        showOnCreate: !1
        // sticky: false
      };
      return s.appendTo = t.appendTo === !0 ? () => document.body : t.appendTo || "parent", s.arrow = t.arrow, s.theme = t.theme, s.delay = t.delay, s.duration = t.duration, s.hideOnClick = t.hideOnClick, s.followCursor = t.followCursor, s.inertia = t.inertia, s.interactive = t.interactive, s.interactiveBorder = t.interactiveBorder, s.interactiveDebounce = t.interactiveDebounce, s.maxWidth = t.maxWidth, s.zIndex = t.zIndex, s.offset = t.offset, s.placement = t.placement, s.animation = t.animation, s.trigger = t.trigger, s.triggerTarget = t.triggerTarget, s;
    }, i = () => {
      if (!t.target)
        return console.warn("Tippy target can not be null");
      const s = typeof t.target == "string" ? t.selectorParent.querySelector(t.target) : t.target, a = o();
      s && (r.value = Fn(s, {
        ...a,
        content: n.value,
        plugins: [Lp]
      }));
    };
    return lt(() => {
      i();
    }), ea(() => {
      r.value && (Array.isArray(r.value) ? r.value.forEach((s) => {
        s.unmount(), s.destroy();
      }) : (r.value.unmount(), r.value.destroy()));
    }), Re(() => t.target, i), (s, a) => (x(), Q("div", {
      ref_key: "tippyWrapper",
      ref: n,
      class: "tippy-wrapper"
    }, [
      Oe(s.$slots, "default")
    ], 512));
  }
}), Rp = { class: "node-details-info" }, Fp = { class: "details_header" }, zp = { class: "details_label" }, jp = { class: "details_value" }, Vp = { key: 1 }, Hp = /* @__PURE__ */ be({
  __name: "CommonNode",
  props: {
    nodeInfo: {
      type: Object,
      default: () => ({})
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = rn(), r = (o) => o ? t.translatePrefix + o : "-";
    return (o, i) => {
      var s;
      return x(), Q("div", Rp, [
        j("div", Fp, se((s = e.nodeInfo.i18n) != null && s.includes("header") ? I(n)(e.nodeInfo.header) : e.nodeInfo.header), 1),
        (x(!0), Q(_t, null, Ho(e.nodeInfo.attrs, (a) => {
          var l, u, c, p, g;
          return x(), Q(_t, { key: a }, [
            j("div", zp, se(I(n)(r(a))), 1),
            j("div", jp, [
              (l = e.nodeInfo.tags) != null && l[a] ? (x(), ve(I(hr), {
                key: 0,
                size: "small",
                color: ((u = e.nodeInfo.tags) == null ? void 0 : u[a]) || "arcoblue"
              }, {
                default: ie(() => {
                  var w, d, h;
                  return [
                    Ne(se((w = e.nodeInfo.i18n) != null && w.includes(a) ? I(n)(r((d = e.nodeInfo.values) == null ? void 0 : d[a])) : ((h = e.nodeInfo.values) == null ? void 0 : h[a]) || "-"), 1)
                  ];
                }),
                _: 2
              }, 1032, ["color"])) : (x(), Q("span", Vp, se((c = e.nodeInfo.i18n) != null && c.includes(a) ? I(n)(r((p = e.nodeInfo.values) == null ? void 0 : p[a])) : ((g = e.nodeInfo.values) == null ? void 0 : g[a]) || "-"), 1))
            ])
          ], 64);
        }), 128))
      ]);
    };
  }
}), Up = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Wp = {}, qp = {
  focusable: "false",
  "data-icon": "partition",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, Kp = /* @__PURE__ */ j("path", { d: "M640.6 429.8h257.1c7.9 0 14.3-6.4 14.3-14.3V158.3c0-7.9-6.4-14.3-14.3-14.3H640.6c-7.9 0-14.3 6.4-14.3 14.3v92.9H490.6c-3.9 0-7.1 3.2-7.1 7.1v221.5h-85.7v-96.5c0-7.9-6.4-14.3-14.3-14.3H126.3c-7.9 0-14.3 6.4-14.3 14.3v257.2c0 7.9 6.4 14.3 14.3 14.3h257.1c7.9 0 14.3-6.4 14.3-14.3V544h85.7v221.5c0 3.9 3.2 7.1 7.1 7.1h135.7v92.9c0 7.9 6.4 14.3 14.3 14.3h257.1c7.9 0 14.3-6.4 14.3-14.3v-257c0-7.9-6.4-14.3-14.3-14.3h-257c-7.9 0-14.3 6.4-14.3 14.3v100h-78.6v-393h78.6v100c0 7.9 6.4 14.3 14.3 14.3zm53.5-217.9h150V362h-150V211.9zM329.9 587h-150V437h150v150zm364.2 75.1h150v150.1h-150V662.1z" }, null, -1), Yp = [
  Kp
];
function Gp(e, t) {
  return x(), Q("svg", qp, Yp);
}
const Xp = /* @__PURE__ */ Up(Wp, [["render", Gp]]), Jp = { class: "node-details-info" }, Zp = { class: "details_header" }, Qp = { class: "details_label" }, e2 = { class: "details_value flex items-center" }, t2 = /* @__PURE__ */ j("span", null, "查看流程图", -1), n2 = { class: "details_label" }, r2 = { class: "details_value" }, o2 = { class: "child-process-viewer" }, i2 = /* @__PURE__ */ be({
  __name: "CallActivity",
  props: {
    nodeInfo: {
      type: Object,
      default: () => ({})
    },
    translatePrefix: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "light"
    },
    local: {
      type: String,
      default: "zh_CN"
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
  setup(e) {
    const t = e, { t: n } = rn(), r = re(!1), o = (i) => i ? t.translatePrefix + i : "-";
    return (i, s) => {
      const a = Xp, l = W4;
      return x(), Q("div", Jp, [
        j("div", Zp, se(e.nodeInfo.name), 1),
        j("div", Qp, se(I(n)(o("calledInstance"))), 1),
        j("div", e2, [
          H(I(hr), { color: "arcoblue" }, {
            default: ie(() => [
              j("span", null, se(e.nodeInfo.modelName || "-"), 1)
            ]),
            _: 1
          }),
          H(I($t), {
            style: { zIndex: 9999 },
            "render-to-body": !0
          }, {
            content: ie(() => [
              t2
            ]),
            default: ie(() => [
              H(I(Hu), {
                style: { "margin-left": "0.5rem" },
                onClick: s[0] || (s[0] = (u) => r.value = !0)
              }, {
                default: ie(() => [
                  H(a)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        j("div", n2, se(I(n)(o("inheritVariables"))), 1),
        j("div", r2, se(e.nodeInfo.inheritVariables || "-"), 1),
        H(I(ko), {
          visible: I(r),
          "onUpdate:visible": s[1] || (s[1] = (u) => Jl(r) ? r.value = u : null),
          title: e.nodeInfo.modelName,
          footer: !1,
          "modal-style": {
            zIndex: 9999,
            width: "60vw",
            maxWidth: "960px",
            padding: "0"
          },
          "body-style": {
            width: "60vw",
            maxWidth: "960px",
            height: "40vh",
            maxHeight: "640px",
            position: "relative",
            padding: "0"
          },
          "title-align": "start",
          draggable: ""
        }, {
          default: ie(() => [
            j("div", o2, [
              I(r) ? (x(), ve(l, {
                key: 0,
                toolbar: !1,
                local: e.local,
                "file-name": e.fileName,
                "translate-prefix": e.translatePrefix,
                theme: e.theme,
                "proc-inst-id": e.nodeInfo.instanceId,
                "model-key": e.nodeInfo.modelKey
              }, null, 8, ["local", "file-name", "translate-prefix", "theme", "proc-inst-id", "model-key"])) : me("", !0)
            ])
          ]),
          _: 1
        }, 8, ["visible", "title"])
      ]);
    };
  }
}), s2 = ["width", "height", "stroke-width", "stroke"], a2 = /* @__PURE__ */ j("path", { d: "M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }, null, -1), l2 = /* @__PURE__ */ j("path", { d: "M12 14v7" }, null, -1), c2 = /* @__PURE__ */ j("path", { d: "M9 18h6" }, null, -1), u2 = [
  a2,
  l2,
  c2
], d2 = /* @__PURE__ */ be({
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
    return (t, n) => (x(), Q("svg", {
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
    }, u2, 8, s2));
  }
}), f2 = ["width", "height", "stroke-width", "stroke"], p2 = /* @__PURE__ */ j("path", { d: "M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }, null, -1), m2 = /* @__PURE__ */ j("path", { d: "M19 5l-5.4 5.4" }, null, -1), h2 = /* @__PURE__ */ j("path", { d: "M19 5h-5" }, null, -1), v2 = /* @__PURE__ */ j("path", { d: "M19 5v5" }, null, -1), y2 = [
  p2,
  m2,
  h2,
  v2
], g2 = /* @__PURE__ */ be({
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
    return (t, n) => (x(), Q("svg", {
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
    }, y2, 8, f2));
  }
}), b2 = {
  class: "icon-image",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  width: "72",
  height: "72"
}, w2 = /* @__PURE__ */ ta('<path d="M288.921053 707.654248c-152.288409 12.659309-99.539384-170.917798-51.367801-420.713709C268.191292 68.17078 384.956012 0.707734 515.144851 0.81047c154.674158 0.125566 213.530243 78.695472 262.47805 305.124741 64.118431 367.428176 100.977683 417.152208-17.1226 417.015227-102.005039-0.125566-471.579248-15.29619-471.579248-15.29619z"></path><path d="M73.689965 1023.269436l50.374691-320.295365 260.994091-81.161126h233.803403l281.061779 81.172541 50.386106 320.28395H73.689965z" fill="#AAD5DC"></path><path d="M618.816489 622.543509l280.513857 81.046975L949.499565 1022.561702H74.55751l50.16922-318.982633 260.446168-81.046975h233.643591m0.205472-1.472544h-234.008874L123.402582 702.403318 72.82242 1024h878.35516l-50.591577-321.596682-281.621118-81.332353z"></path><path d="M591.100707 1019.125766H415.468486l-46.721869-387.724165 71.127282-25.729561 137.094955-2.054712 70.625019 31.311528-56.493166 384.19691zM667.958353 265.640024c68.992665-29.416628 96.936749 101.171739 5.262346 153.030388z" fill="#FFCFB5"></path><path d="M585.016476 815.640782H425.194123l7.419794-206.841014-20.958063-131.22761 173.91996 4.006688-12.145631 110.440774 11.586293 223.621162z" fill="#FFCFB5"></path><path d="M677.763895 329.564399c1.141507-100.635231-39.096604-173.577509-39.096604-173.577508l-60.168818 11.98582a496.407018 496.407018 0 0 1-81.378013 9.200544 496.270038 496.270038 0 0 1-81.378012-9.200544l-60.180234-11.98582s-40.181036 72.942278-39.085189 173.577508l-1.141507 92.81591c0 68.17078 101.046173 155.244911 181.739282 155.244911 59.244198 0 181.727867-87.062716 181.727866-155.244911z" fill="#FFE7D9"></path><path d="M320.632109 269.361336c-68.98125-29.428043-96.925334 101.171739-5.25093 153.018973z" fill="#FFCFB5"></path><path d="M515.144851 91.526007c-27.944084 83.158763-124.230174 172.961095-167.801485 177.835329s-71.54964-4.269235-71.54964-4.269235S337.811785 61.287495 515.144851 91.526007z"></path><path d="M445.307471 133.796c9.942523 95.190244 227.833322 186.659176 234.008874 180.848907 20.421555-78.821038 55.831093-7.648095 55.831092-7.648095l-54.4727-202.046686-122.483668-49.084788h-67.953894"></path><path d="M416.119145 1018.383787l-28.537668-236.919715c23.423717 24.348338 90.612802 33.103694 141.980604 33.103694 44.233385 0 80.932825-5.97008 93.101286-14.976568l-32.190489 218.792589z" fill="#FFFFFF"></path><path d="M388.563173 783.484538c10.638842 10.068089 29.302477 18.001561 55.557131 23.629189 24.451074 5.239516 54.792322 8.127528 85.430362 8.127528 43.445745 0 78.558491-5.467817 92.11959-14.131853l-31.836622 216.543821H416.769804L388.563173 783.484538m-1.997637-4.234989l28.90295 239.933293h175.643636s28.537667-194.227365 32.544356-221.38381c-10.684503 10.033844-50.032239 15.981094-94.105812 15.981094-57.075335 0-122.209707-10.079504-142.98513-34.519162z"></path><path d="M370.538782 631.401601l-79.871224 26.905313-3.789802 120.942635h41.710655l-32.453035 39.758678 72.611241 199.535371 48.514034 0.582168-46.721869-387.724165zM647.593873 634.928856l85.670078 24.565225 27.202105 79.996789-54.415625 22.088155 54.415625 17.670524-103.431922 238.951597-65.933427 0.92462 56.493166-384.19691z" fill="#A6D3DB"></path>', 12), E2 = [
  w2
], S2 = /* @__PURE__ */ be({
  name: "EmptyFemaleImage",
  __name: "EmptyFemaleImage",
  setup(e) {
    return (t, n) => (x(), Q("svg", b2, E2));
  }
}), _2 = {
  class: "icon-image",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  width: "72",
  height: "72"
}, C2 = /* @__PURE__ */ ta('<path d="M384.177143 618.594286l-263.142857 81.828571L70.131429 1024h883.737142l-50.902857-323.577143-283.337143-81.828571H384.177143z" fill="#262626"></path><path d="M422.828571 493.2h160.8v185.554286h-160.8z" fill="#EAA063"></path><path d="M734.52 196.205714c0 131.165714 11.725714 212.102857-225.771429 210.788572-230.011429-1.268571-249.222857-79.622857-249.222857-210.788572S380.828571 0 511.994286 0s222.525714 65.04 222.525714 196.205714z" fill="#834B12"></path><path d="M678.771429 325.302857c1.142857-101.257143-39.325714-174.64-39.325715-174.64l-60.571428 12.057143a500.48 500.48 0 0 1-81.874286 9.257143 500.571429 500.571429 0 0 1-81.885714-9.257143l-60.571429-12.057143s-40.377143 73.382857-39.325714 174.64l-1.142857 93.382857c0 68.571429 50.491429 80.354286 103.348571 116.068572 27.428571 18.491429 47.92 35.737143 79.508572 40.114285 31.577143-4.377143 52.114286-21.622857 79.497142-40.114285 52.857143-35.714286 103.348571-47.474286 103.348572-116.068572z" fill="#FFBF82"></path><path d="M319.457143 264.731429c-69.382857-29.554286-97.531429 101.794286-5.291429 153.954285zM670.714286 255.577143c69.417143-29.611429 97.531429 101.794286 5.291428 153.954286z" fill="#EAA063"></path><path d="M385.514286 625.382857l116.388571 49.577143 116.502857-49.622857-106.468571 316.24-126.422857-316.194286z" fill="#FFFFFF"></path><path d="M617.171429 626.662857l-105.291429 312.777143-125.017143-312.674286 114.445714 48.754286 0.582858 0.24 0.582857-0.24 114.697143-48.857143m2.445714-2.651428l-117.714286 50.148571-117.714286-50.148571 127.805715 319.737142 107.622857-319.702857z"></path><path d="M479.068571 935.611429l11.108572-235.988572h26.857143l11.108571 235.988572h-49.074286z" fill="#B292CB"></path><path d="M516.634286 700.022857l11.074285 235.188572h-48.217142l11.062857-235.188572h26.08m0.777143-0.8H489.788571l-11.142857 236.8h49.92l-11.154285-236.845714z"></path><path d="M484.52 735.177143a11.828571 11.828571 0 0 1-11.428571-8.937143l-7.268572-28.742857a11.828571 11.828571 0 0 1 11.428572-14.731429h49.28a11.828571 11.828571 0 0 1 11.428571 14.731429L530.702857 726.24a11.851429 11.851429 0 0 1-11.485714 8.937143z" fill="#B292CB"></path><path d="M526.531429 683.177143a11.428571 11.428571 0 0 1 11.085714 14.24l-7.268572 28.731428a11.428571 11.428571 0 0 1-11.085714 8.64h-34.742857a11.428571 11.428571 0 0 1-11.085714-8.64l-7.268572-28.731428a11.428571 11.428571 0 0 1 11.085715-14.24h49.28m0-0.811429h-49.28a12.24 12.24 0 0 0-11.862858 15.245715l7.257143 28.742857a12.24 12.24 0 0 0 11.874286 9.234285h34.742857a12.24 12.24 0 0 0 11.874286-9.234285l7.268571-28.742857a12.251429 12.251429 0 0 0-11.874285-15.245715z"></path><path d="M415.845714 583.931429l86.057143 94.822857-68.502857 60.262857-49.222857-120.422857 31.668571-34.662857z" fill="#FFFFFF"></path><path d="M587.948571 583.931429l-86.045714 94.822857 68.491429 60.262857 49.234285-120.422857-31.68-34.662857z" fill="#FFFFFF"></path><path d="M380.36 619.782857l-58.742857 18.285714 17.268571 94.194286 91.085715 44.685714-87.188572 36.16 169.668572 144.445715a5.028571 5.028571 0 0 0 7.885714-5.782857z" fill="#676568"></path><path d="M623.468571 619.714286l76.137143 21.977143a4.251429 4.251429 0 0 1 3.062857 4.08v128.228571a4.251429 4.251429 0 0 1-2.068571 3.645714l-92.4 55.097143a4.251429 4.251429 0 0 0 0.548571 7.565714l72.24 29.954286a4.251429 4.251429 0 0 1 0.8 7.405714L489.434286 1011.714286a4.24 4.24 0 0 1-6.422857-4.891429l135.28-384.445714a4.228571 4.228571 0 0 1 5.177142-2.662857z" fill="#676568"></path>', 15), k2 = [
  C2
], T2 = /* @__PURE__ */ be({
  name: "EmptyMaleImage",
  __name: "EmptyMaleImage",
  setup(e) {
    return (t, n) => (x(), Q("svg", _2, k2));
  }
}), O2 = { class: "node-details-info" }, A2 = { class: "details_header" }, P2 = { class: "details_label" }, D2 = { class: "details_value" }, $2 = { style: { "padding-right": "8px" } }, x2 = { class: "person-information-grid" }, I2 = { class: "details_special" }, M2 = { class: "header-person-img" }, B2 = ["src"], L2 = { class: "details_label" }, N2 = {
  class: "details_value",
  style: { display: "inline-flex", "align-items": "center" }
}, R2 = { class: "details_label" }, F2 = { class: "details_value" }, z2 = { class: "details_label" }, j2 = { class: "details_value" }, V2 = { class: "details_label" }, H2 = { class: "details_value long" }, U2 = { class: "details_label" }, W2 = { class: "details_value long" }, q2 = { key: 1 }, K2 = { class: "details_label" }, Y2 = { class: "details_value" }, G2 = /* @__PURE__ */ be({
  name: "UserTask",
  __name: "UserTask",
  props: {
    nodeInfo: {
      type: Object,
      default: () => ({})
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, { t: n } = rn(), r = {
      processing: "arcoblue",
      finish: "green",
      pending: "orangered"
    }, o = (a) => a ? t.translatePrefix + a : "-", i = Z(() => t.nodeInfo.status !== "pending"), s = Z(() => t.nodeInfo.status === "finish");
    return (a, l) => {
      var w, d;
      const u = T2, c = S2, p = g2, g = d2;
      return x(), Q("div", O2, [
        j("div", A2, se(e.nodeInfo.name), 1),
        j("div", P2, se(I(n)(o("approver"))), 1),
        j("div", D2, [
          j("div", {
            class: "approval-user-list",
            style: Ye({ "--approval-num": (w = e.nodeInfo.approvalVos) == null ? void 0 : w.length })
          }, [
            (d = e.nodeInfo.approvalVos) != null && d.length ? (x(!0), Q(_t, { key: 0 }, Ho(e.nodeInfo.approvalVos, (h) => (x(), ve(I($t), {
              key: h.code,
              position: "bottom",
              style: { zIndex: 9999 },
              "render-to-body": !0,
              title: I(n)(o("Personnel information"))
            }, {
              content: ie(() => [
                j("div", x2, [
                  j("div", I2, [
                    j("div", M2, [
                      h.headerImg ? (x(), Q("img", {
                        key: 0,
                        src: h.headerImg,
                        alt: "image"
                      }, null, 8, B2)) : me("", !0),
                      !h.headerImg && h.sex === 1 ? (x(), ve(u, { key: 1 })) : me("", !0),
                      !h.headerImg && h.sex === 2 ? (x(), ve(c, { key: 2 })) : me("", !0)
                    ])
                  ]),
                  j("div", L2, se(I(n)(o("Person name"))), 1),
                  j("div", N2, [
                    j("span", null, se(h.name), 1),
                    h.sex === 1 ? (x(), ve(p, {
                      key: 0,
                      color: "#0099FF"
                    })) : me("", !0),
                    h.sex === 2 ? (x(), ve(g, {
                      key: 1,
                      color: "#FF99CC"
                    })) : me("", !0)
                  ]),
                  j("div", R2, se(I(n)(o("Job number"))), 1),
                  j("div", F2, se(h.code), 1),
                  j("div", z2, se(I(n)(o("Mobile phone"))), 1),
                  j("div", j2, se(h.mobile || "-"), 1),
                  j("div", V2, se(I(n)(o("Mail"))), 1),
                  j("div", H2, se(h.email || "-"), 1),
                  j("div", U2, se(I(n)(o("Affiliation"))), 1),
                  j("div", W2, se(`${h.companyName || "-"}${h.deptName ? " - " + h.deptName : ""}`), 1)
                ])
              ]),
              default: ie(() => [
                H(I(hr), {
                  size: "small",
                  color: h.status ? "arcoblue" : "orangered"
                }, {
                  default: ie(() => [
                    j("span", $2, se(h.name), 1),
                    h.status ? (x(), ve(I(zd), {
                      key: 0,
                      size: 12
                    })) : (x(), ve(I(jd), {
                      key: 1,
                      size: 12
                    }))
                  ]),
                  _: 2
                }, 1032, ["color"])
              ]),
              _: 2
            }, 1032, ["title"]))), 128)) : (x(), Q("span", q2, "-"))
          ], 4)
        ]),
        j("div", K2, se(I(n)(o("statusName"))), 1),
        j("div", Y2, [
          H(I(hr), {
            color: r[e.nodeInfo.status] || "arcoblue"
          }, {
            default: ie(() => [
              Ne(se(e.nodeInfo.statusName || "-"), 1)
            ]),
            _: 1
          }, 8, ["color"])
        ]),
        rt(j("div", { class: "details_label" }, se(I(n)(o("startDate"))), 513), [
          [ot, I(i)]
        ]),
        rt(j("div", { class: "details_value" }, se(e.nodeInfo.startDate || "-"), 513), [
          [ot, I(i)]
        ]),
        rt(j("div", { class: "details_label" }, se(I(n)(o("endDate"))), 513), [
          [ot, I(s)]
        ]),
        rt(j("div", { class: "details_value" }, se(e.nodeInfo.status === "processing" ? "-" : e.nodeInfo.endDate || "-"), 513), [
          [ot, I(s)]
        ]),
        rt(j("div", { class: "details_label" }, se(I(n)(o("duration"))), 513), [
          [ot, I(s)]
        ]),
        rt(j("div", { class: "details_value" }, se(e.nodeInfo.status === "processing" ? "-" : e.nodeInfo.duration || "-"), 513), [
          [ot, I(s)]
        ])
      ]);
    };
  }
});
function vl(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: X2 } = Object.prototype, { getPrototypeOf: vi } = Object, $r = /* @__PURE__ */ ((e) => (t) => {
  const n = X2.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Qe = (e) => (e = e.toLowerCase(), (t) => $r(t) === e), xr = (e) => (t) => typeof t === e, { isArray: an } = Array, Dn = xr("undefined");
function J2(e) {
  return e !== null && !Dn(e) && e.constructor !== null && !Dn(e.constructor) && We(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const yl = Qe("ArrayBuffer");
function Z2(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && yl(e.buffer), t;
}
const Q2 = xr("string"), We = xr("function"), gl = xr("number"), Ir = (e) => e !== null && typeof e == "object", em = (e) => e === !0 || e === !1, cr = (e) => {
  if ($r(e) !== "object")
    return !1;
  const t = vi(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, tm = Qe("Date"), nm = Qe("File"), rm = Qe("Blob"), om = Qe("FileList"), im = (e) => Ir(e) && We(e.pipe), sm = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || We(e.append) && ((t = $r(e)) === "formdata" || // detect form-data instance
  t === "object" && We(e.toString) && e.toString() === "[object FormData]"));
}, am = Qe("URLSearchParams"), [lm, cm, um, dm] = ["ReadableStream", "Request", "Response", "Headers"].map(Qe), fm = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function zn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), an(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = i.length;
    let a;
    for (r = 0; r < s; r++)
      a = i[r], t.call(null, e[a], a, e);
  }
}
function bl(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const It = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, wl = (e) => !Dn(e) && e !== It;
function Bo() {
  const { caseless: e } = wl(this) && this || {}, t = {}, n = (r, o) => {
    const i = e && bl(t, o) || o;
    cr(t[i]) && cr(r) ? t[i] = Bo(t[i], r) : cr(r) ? t[i] = Bo({}, r) : an(r) ? t[i] = r.slice() : t[i] = r;
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && zn(arguments[r], n);
  return t;
}
const pm = (e, t, n, { allOwnKeys: r } = {}) => (zn(t, (o, i) => {
  n && We(o) ? e[i] = vl(o, n) : e[i] = o;
}, { allOwnKeys: r }), e), mm = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), hm = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, vm = (e, t, n, r) => {
  let o, i, s;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      s = o[i], (!r || r(s, e, t)) && !a[s] && (t[s] = e[s], a[s] = !0);
    e = n !== !1 && vi(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, ym = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, gm = (e) => {
  if (!e) return null;
  if (an(e)) return e;
  let t = e.length;
  if (!gl(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, bm = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && vi(Uint8Array)), wm = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, Em = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Sm = Qe("HTMLFormElement"), _m = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, o) {
    return r.toUpperCase() + o;
  }
), Bs = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Cm = Qe("RegExp"), El = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  zn(n, (o, i) => {
    let s;
    (s = t(o, i, e)) !== !1 && (r[i] = s || o);
  }), Object.defineProperties(e, r);
}, km = (e) => {
  El(e, (t, n) => {
    if (We(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (We(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Tm = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((i) => {
      n[i] = !0;
    });
  };
  return an(e) ? r(e) : r(String(e).split(t)), n;
}, Om = () => {
}, Am = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, mo = "abcdefghijklmnopqrstuvwxyz", Ls = "0123456789", Sl = {
  DIGIT: Ls,
  ALPHA: mo,
  ALPHA_DIGIT: mo + mo.toUpperCase() + Ls
}, Pm = (e = 16, t = Sl.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function Dm(e) {
  return !!(e && We(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const $m = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (Ir(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[o] = r;
        const i = an(r) ? [] : {};
        return zn(r, (s, a) => {
          const l = n(s, o + 1);
          !Dn(l) && (i[a] = l);
        }), t[o] = void 0, i;
      }
    }
    return r;
  };
  return n(e, 0);
}, xm = Qe("AsyncFunction"), Im = (e) => e && (Ir(e) || We(e)) && We(e.then) && We(e.catch), _l = ((e, t) => e ? setImmediate : t ? ((n, r) => (It.addEventListener("message", ({ source: o, data: i }) => {
  o === It && i === n && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), It.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  We(It.postMessage)
), Mm = typeof queueMicrotask < "u" ? queueMicrotask.bind(It) : typeof process < "u" && process.nextTick || _l, C = {
  isArray: an,
  isArrayBuffer: yl,
  isBuffer: J2,
  isFormData: sm,
  isArrayBufferView: Z2,
  isString: Q2,
  isNumber: gl,
  isBoolean: em,
  isObject: Ir,
  isPlainObject: cr,
  isReadableStream: lm,
  isRequest: cm,
  isResponse: um,
  isHeaders: dm,
  isUndefined: Dn,
  isDate: tm,
  isFile: nm,
  isBlob: rm,
  isRegExp: Cm,
  isFunction: We,
  isStream: im,
  isURLSearchParams: am,
  isTypedArray: bm,
  isFileList: om,
  forEach: zn,
  merge: Bo,
  extend: pm,
  trim: fm,
  stripBOM: mm,
  inherits: hm,
  toFlatObject: vm,
  kindOf: $r,
  kindOfTest: Qe,
  endsWith: ym,
  toArray: gm,
  forEachEntry: wm,
  matchAll: Em,
  isHTMLForm: Sm,
  hasOwnProperty: Bs,
  hasOwnProp: Bs,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: El,
  freezeMethods: km,
  toObjectSet: Tm,
  toCamelCase: _m,
  noop: Om,
  toFiniteNumber: Am,
  findKey: bl,
  global: It,
  isContextDefined: wl,
  ALPHABET: Sl,
  generateString: Pm,
  isSpecCompliantForm: Dm,
  toJSONObject: $m,
  isAsyncFn: xm,
  isThenable: Im,
  setImmediate: _l,
  asap: Mm
};
function le(e, t, n, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
C.inherits(le, Error, {
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
      config: C.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Cl = le.prototype, kl = {};
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
  kl[e] = { value: e };
});
Object.defineProperties(le, kl);
Object.defineProperty(Cl, "isAxiosError", { value: !0 });
le.from = (e, t, n, r, o, i) => {
  const s = Object.create(Cl);
  return C.toFlatObject(e, s, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), le.call(s, e.message, t, n, r, o), s.cause = e, s.name = e.name, i && Object.assign(s, i), s;
};
const Bm = null;
function Lo(e) {
  return C.isPlainObject(e) || C.isArray(e);
}
function Tl(e) {
  return C.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ns(e, t, n) {
  return e ? e.concat(t).map(function(o, i) {
    return o = Tl(o), !n && i ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function Lm(e) {
  return C.isArray(e) && !e.some(Lo);
}
const Nm = C.toFlatObject(C, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Mr(e, t, n) {
  if (!C.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = C.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, E) {
    return !C.isUndefined(E[h]);
  });
  const r = n.metaTokens, o = n.visitor || c, i = n.dots, s = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && C.isSpecCompliantForm(t);
  if (!C.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(d) {
    if (d === null) return "";
    if (C.isDate(d))
      return d.toISOString();
    if (!l && C.isBlob(d))
      throw new le("Blob is not supported. Use a Buffer instead.");
    return C.isArrayBuffer(d) || C.isTypedArray(d) ? l && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function c(d, h, E) {
    let T = d;
    if (d && !E && typeof d == "object") {
      if (C.endsWith(h, "{}"))
        h = r ? h : h.slice(0, -2), d = JSON.stringify(d);
      else if (C.isArray(d) && Lm(d) || (C.isFileList(d) || C.endsWith(h, "[]")) && (T = C.toArray(d)))
        return h = Tl(h), T.forEach(function(R, f) {
          !(C.isUndefined(R) || R === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? Ns([h], f, i) : s === null ? h : h + "[]",
            u(R)
          );
        }), !1;
    }
    return Lo(d) ? !0 : (t.append(Ns(E, h, i), u(d)), !1);
  }
  const p = [], g = Object.assign(Nm, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: Lo
  });
  function w(d, h) {
    if (!C.isUndefined(d)) {
      if (p.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + h.join("."));
      p.push(d), C.forEach(d, function(T, P) {
        (!(C.isUndefined(T) || T === null) && o.call(
          t,
          T,
          C.isString(P) ? P.trim() : P,
          h,
          g
        )) === !0 && w(T, h ? h.concat(P) : [P]);
      }), p.pop();
    }
  }
  if (!C.isObject(e))
    throw new TypeError("data must be an object");
  return w(e), t;
}
function Rs(e) {
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
function yi(e, t) {
  this._pairs = [], e && Mr(e, this, t);
}
const Ol = yi.prototype;
Ol.append = function(t, n) {
  this._pairs.push([t, n]);
};
Ol.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Rs);
  } : Rs;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function Rm(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Al(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || Rm, o = n && n.serialize;
  let i;
  if (o ? i = o(t, n) : i = C.isURLSearchParams(t) ? t.toString() : new yi(t, n).toString(r), i) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Fs {
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
    C.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Pl = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Fm = typeof URLSearchParams < "u" ? URLSearchParams : yi, zm = typeof FormData < "u" ? FormData : null, jm = typeof Blob < "u" ? Blob : null, Vm = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Fm,
    FormData: zm,
    Blob: jm
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, gi = typeof window < "u" && typeof document < "u", No = typeof navigator == "object" && navigator || void 0, Hm = gi && (!No || ["ReactNative", "NativeScript", "NS"].indexOf(No.product) < 0), Um = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Wm = gi && window.location.href || "http://localhost", qm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: gi,
  hasStandardBrowserEnv: Hm,
  hasStandardBrowserWebWorkerEnv: Um,
  navigator: No,
  origin: Wm
}, Symbol.toStringTag, { value: "Module" })), Ve = {
  ...qm,
  ...Vm
};
function Km(e, t) {
  return Mr(e, new Ve.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, o, i) {
      return Ve.isNode && C.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Ym(e) {
  return C.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Gm(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let i;
  for (r = 0; r < o; r++)
    i = n[r], t[i] = e[i];
  return t;
}
function Dl(e) {
  function t(n, r, o, i) {
    let s = n[i++];
    if (s === "__proto__") return !0;
    const a = Number.isFinite(+s), l = i >= n.length;
    return s = !s && C.isArray(o) ? o.length : s, l ? (C.hasOwnProp(o, s) ? o[s] = [o[s], r] : o[s] = r, !a) : ((!o[s] || !C.isObject(o[s])) && (o[s] = []), t(n, r, o[s], i) && C.isArray(o[s]) && (o[s] = Gm(o[s])), !a);
  }
  if (C.isFormData(e) && C.isFunction(e.entries)) {
    const n = {};
    return C.forEachEntry(e, (r, o) => {
      t(Ym(r), o, n, 0);
    }), n;
  }
  return null;
}
function Xm(e, t, n) {
  if (C.isString(e))
    try {
      return (t || JSON.parse)(e), C.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const jn = {
  transitional: Pl,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, i = C.isObject(t);
    if (i && C.isHTMLForm(t) && (t = new FormData(t)), C.isFormData(t))
      return o ? JSON.stringify(Dl(t)) : t;
    if (C.isArrayBuffer(t) || C.isBuffer(t) || C.isStream(t) || C.isFile(t) || C.isBlob(t) || C.isReadableStream(t))
      return t;
    if (C.isArrayBufferView(t))
      return t.buffer;
    if (C.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (i) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Km(t, this.formSerializer).toString();
      if ((a = C.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Mr(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return i || o ? (n.setContentType("application/json", !1), Xm(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || jn.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (C.isResponse(t) || C.isReadableStream(t))
      return t;
    if (t && C.isString(t) && (r && !this.responseType || o)) {
      const s = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? le.from(a, le.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: Ve.classes.FormData,
    Blob: Ve.classes.Blob
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
C.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  jn.headers[e] = {};
});
const Jm = C.toObjectSet([
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
]), Zm = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(s) {
    o = s.indexOf(":"), n = s.substring(0, o).trim().toLowerCase(), r = s.substring(o + 1).trim(), !(!n || t[n] && Jm[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, zs = Symbol("internals");
function fn(e) {
  return e && String(e).trim().toLowerCase();
}
function ur(e) {
  return e === !1 || e == null ? e : C.isArray(e) ? e.map(ur) : String(e);
}
function Qm(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const e4 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ho(e, t, n, r, o) {
  if (C.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!C.isString(t)) {
    if (C.isString(r))
      return t.indexOf(r) !== -1;
    if (C.isRegExp(r))
      return r.test(t);
  }
}
function t4(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function n4(e, t) {
  const n = C.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(o, i, s) {
        return this[r].call(this, t, o, i, s);
      },
      configurable: !0
    });
  });
}
class He {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function i(a, l, u) {
      const c = fn(l);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const p = C.findKey(o, c);
      (!p || o[p] === void 0 || u === !0 || u === void 0 && o[p] !== !1) && (o[p || l] = ur(a));
    }
    const s = (a, l) => C.forEach(a, (u, c) => i(u, c, l));
    if (C.isPlainObject(t) || t instanceof this.constructor)
      s(t, n);
    else if (C.isString(t) && (t = t.trim()) && !e4(t))
      s(Zm(t), n);
    else if (C.isHeaders(t))
      for (const [a, l] of t.entries())
        i(l, a, r);
    else
      t != null && i(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = fn(t), t) {
      const r = C.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n)
          return o;
        if (n === !0)
          return Qm(o);
        if (C.isFunction(n))
          return n.call(this, o, r);
        if (C.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = fn(t), t) {
      const r = C.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || ho(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function i(s) {
      if (s = fn(s), s) {
        const a = C.findKey(r, s);
        a && (!n || ho(r, r[a], a, n)) && (delete r[a], o = !0);
      }
    }
    return C.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || ho(this, this[i], i, t, !0)) && (delete this[i], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return C.forEach(this, (o, i) => {
      const s = C.findKey(r, i);
      if (s) {
        n[s] = ur(o), delete n[i];
        return;
      }
      const a = t ? t4(i) : String(i).trim();
      a !== i && delete n[i], n[a] = ur(o), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return C.forEach(this, (r, o) => {
      r != null && r !== !1 && (n[o] = t && C.isArray(r) ? r.join(", ") : r);
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
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[zs] = this[zs] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(s) {
      const a = fn(s);
      r[a] || (n4(o, s), r[a] = !0);
    }
    return C.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
He.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
C.reduceDescriptors(He.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
C.freezeMethods(He);
function vo(e, t) {
  const n = this || jn, r = t || n, o = He.from(r.headers);
  let i = r.data;
  return C.forEach(e, function(a) {
    i = a.call(n, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function $l(e) {
  return !!(e && e.__CANCEL__);
}
function ln(e, t, n) {
  le.call(this, e ?? "canceled", le.ERR_CANCELED, t, n), this.name = "CanceledError";
}
C.inherits(ln, le, {
  __CANCEL__: !0
});
function xl(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new le(
    "Request failed with status code " + n.status,
    [le.ERR_BAD_REQUEST, le.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function r4(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function o4(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let o = 0, i = 0, s;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const u = Date.now(), c = r[i];
    s || (s = u), n[o] = l, r[o] = u;
    let p = i, g = 0;
    for (; p !== o; )
      g += n[p++], p = p % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), u - s < t)
      return;
    const w = c && u - c;
    return w ? Math.round(g * 1e3 / w) : void 0;
  };
}
function i4(e, t) {
  let n = 0, r = 1e3 / t, o, i;
  const s = (u, c = Date.now()) => {
    n = c, o = null, i && (clearTimeout(i), i = null), e.apply(null, u);
  };
  return [(...u) => {
    const c = Date.now(), p = c - n;
    p >= r ? s(u, c) : (o = u, i || (i = setTimeout(() => {
      i = null, s(o);
    }, r - p)));
  }, () => o && s(o)];
}
const Er = (e, t, n = 3) => {
  let r = 0;
  const o = o4(50, 250);
  return i4((i) => {
    const s = i.loaded, a = i.lengthComputable ? i.total : void 0, l = s - r, u = o(l), c = s <= a;
    r = s;
    const p = {
      loaded: s,
      total: a,
      progress: a ? s / a : void 0,
      bytes: l,
      rate: u || void 0,
      estimated: u && a && c ? (a - s) / u : void 0,
      event: i,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, js = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, Vs = (e) => (...t) => C.asap(() => e(...t)), s4 = Ve.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = Ve.navigator && /(msie|trident)/i.test(Ve.navigator.userAgent), n = document.createElement("a");
    let r;
    function o(i) {
      let s = i;
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
    return r = o(window.location.href), function(s) {
      const a = C.isString(s) ? o(s) : s;
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
), a4 = Ve.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, o, i) {
      const s = [e + "=" + encodeURIComponent(t)];
      C.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), C.isString(r) && s.push("path=" + r), C.isString(o) && s.push("domain=" + o), i === !0 && s.push("secure"), document.cookie = s.join("; ");
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
function l4(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function c4(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Il(e, t) {
  return e && !l4(t) ? c4(e, t) : t;
}
const Hs = (e) => e instanceof He ? { ...e } : e;
function Ft(e, t) {
  t = t || {};
  const n = {};
  function r(u, c, p) {
    return C.isPlainObject(u) && C.isPlainObject(c) ? C.merge.call({ caseless: p }, u, c) : C.isPlainObject(c) ? C.merge({}, c) : C.isArray(c) ? c.slice() : c;
  }
  function o(u, c, p) {
    if (C.isUndefined(c)) {
      if (!C.isUndefined(u))
        return r(void 0, u, p);
    } else return r(u, c, p);
  }
  function i(u, c) {
    if (!C.isUndefined(c))
      return r(void 0, c);
  }
  function s(u, c) {
    if (C.isUndefined(c)) {
      if (!C.isUndefined(u))
        return r(void 0, u);
    } else return r(void 0, c);
  }
  function a(u, c, p) {
    if (p in t)
      return r(u, c);
    if (p in e)
      return r(void 0, u);
  }
  const l = {
    url: i,
    method: i,
    data: i,
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
    headers: (u, c) => o(Hs(u), Hs(c), !0)
  };
  return C.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const p = l[c] || o, g = p(e[c], t[c], c);
    C.isUndefined(g) && p !== a || (n[c] = g);
  }), n;
}
const Ml = (e) => {
  const t = Ft({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: i, headers: s, auth: a } = t;
  t.headers = s = He.from(s), t.url = Al(Il(t.baseURL, t.url), e.params, e.paramsSerializer), a && s.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let l;
  if (C.isFormData(n)) {
    if (Ve.hasStandardBrowserEnv || Ve.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if ((l = s.getContentType()) !== !1) {
      const [u, ...c] = l ? l.split(";").map((p) => p.trim()).filter(Boolean) : [];
      s.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (Ve.hasStandardBrowserEnv && (r && C.isFunction(r) && (r = r(t)), r || r !== !1 && s4(t.url))) {
    const u = o && i && a4.read(i);
    u && s.set(o, u);
  }
  return t;
}, u4 = typeof XMLHttpRequest < "u", d4 = u4 && function(e) {
  return new Promise(function(n, r) {
    const o = Ml(e);
    let i = o.data;
    const s = He.from(o.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: u } = o, c, p, g, w, d;
    function h() {
      w && w(), d && d(), o.cancelToken && o.cancelToken.unsubscribe(c), o.signal && o.signal.removeEventListener("abort", c);
    }
    let E = new XMLHttpRequest();
    E.open(o.method.toUpperCase(), o.url, !0), E.timeout = o.timeout;
    function T() {
      if (!E)
        return;
      const R = He.from(
        "getAllResponseHeaders" in E && E.getAllResponseHeaders()
      ), L = {
        data: !a || a === "text" || a === "json" ? E.responseText : E.response,
        status: E.status,
        statusText: E.statusText,
        headers: R,
        config: e,
        request: E
      };
      xl(function(v) {
        n(v), h();
      }, function(v) {
        r(v), h();
      }, L), E = null;
    }
    "onloadend" in E ? E.onloadend = T : E.onreadystatechange = function() {
      !E || E.readyState !== 4 || E.status === 0 && !(E.responseURL && E.responseURL.indexOf("file:") === 0) || setTimeout(T);
    }, E.onabort = function() {
      E && (r(new le("Request aborted", le.ECONNABORTED, e, E)), E = null);
    }, E.onerror = function() {
      r(new le("Network Error", le.ERR_NETWORK, e, E)), E = null;
    }, E.ontimeout = function() {
      let f = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const L = o.transitional || Pl;
      o.timeoutErrorMessage && (f = o.timeoutErrorMessage), r(new le(
        f,
        L.clarifyTimeoutError ? le.ETIMEDOUT : le.ECONNABORTED,
        e,
        E
      )), E = null;
    }, i === void 0 && s.setContentType(null), "setRequestHeader" in E && C.forEach(s.toJSON(), function(f, L) {
      E.setRequestHeader(L, f);
    }), C.isUndefined(o.withCredentials) || (E.withCredentials = !!o.withCredentials), a && a !== "json" && (E.responseType = o.responseType), u && ([g, d] = Er(u, !0), E.addEventListener("progress", g)), l && E.upload && ([p, w] = Er(l), E.upload.addEventListener("progress", p), E.upload.addEventListener("loadend", w)), (o.cancelToken || o.signal) && (c = (R) => {
      E && (r(!R || R.type ? new ln(null, e, E) : R), E.abort(), E = null);
    }, o.cancelToken && o.cancelToken.subscribe(c), o.signal && (o.signal.aborted ? c() : o.signal.addEventListener("abort", c)));
    const P = r4(o.url);
    if (P && Ve.protocols.indexOf(P) === -1) {
      r(new le("Unsupported protocol " + P + ":", le.ERR_BAD_REQUEST, e));
      return;
    }
    E.send(i || null);
  });
}, f4 = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const i = function(u) {
      if (!o) {
        o = !0, a();
        const c = u instanceof Error ? u : this.reason;
        r.abort(c instanceof le ? c : new ln(c instanceof Error ? c.message : c));
      }
    };
    let s = t && setTimeout(() => {
      s = null, i(new le(`timeout ${t} of ms exceeded`, le.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(i) : u.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", i));
    const { signal: l } = r;
    return l.unsubscribe = () => C.asap(a), l;
  }
}, p4 = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, m4 = async function* (e, t) {
  for await (const n of h4(e))
    yield* p4(n, t);
}, h4 = async function* (e) {
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
}, Us = (e, t, n, r) => {
  const o = m4(e, t);
  let i = 0, s, a = (l) => {
    s || (s = !0, r && r(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: u, value: c } = await o.next();
        if (u) {
          a(), l.close();
          return;
        }
        let p = c.byteLength;
        if (n) {
          let g = i += p;
          n(g);
        }
        l.enqueue(new Uint8Array(c));
      } catch (u) {
        throw a(u), u;
      }
    },
    cancel(l) {
      return a(l), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Br = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Bl = Br && typeof ReadableStream == "function", v4 = Br && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Ll = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, y4 = Bl && Ll(() => {
  let e = !1;
  const t = new Request(Ve.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Ws = 64 * 1024, Ro = Bl && Ll(() => C.isReadableStream(new Response("").body)), Sr = {
  stream: Ro && ((e) => e.body)
};
Br && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Sr[t] && (Sr[t] = C.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new le(`Response type '${t}' is not supported`, le.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const g4 = async (e) => {
  if (e == null)
    return 0;
  if (C.isBlob(e))
    return e.size;
  if (C.isSpecCompliantForm(e))
    return (await new Request(Ve.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (C.isArrayBufferView(e) || C.isArrayBuffer(e))
    return e.byteLength;
  if (C.isURLSearchParams(e) && (e = e + ""), C.isString(e))
    return (await v4(e)).byteLength;
}, b4 = async (e, t) => {
  const n = C.toFiniteNumber(e.getContentLength());
  return n ?? g4(t);
}, w4 = Br && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: o,
    cancelToken: i,
    timeout: s,
    onDownloadProgress: a,
    onUploadProgress: l,
    responseType: u,
    headers: c,
    withCredentials: p = "same-origin",
    fetchOptions: g
  } = Ml(e);
  u = u ? (u + "").toLowerCase() : "text";
  let w = f4([o, i && i.toAbortSignal()], s), d;
  const h = w && w.unsubscribe && (() => {
    w.unsubscribe();
  });
  let E;
  try {
    if (l && y4 && n !== "get" && n !== "head" && (E = await b4(c, r)) !== 0) {
      let L = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), A;
      if (C.isFormData(r) && (A = L.headers.get("content-type")) && c.setContentType(A), L.body) {
        const [v, m] = js(
          E,
          Er(Vs(l))
        );
        r = Us(L.body, Ws, v, m);
      }
    }
    C.isString(p) || (p = p ? "include" : "omit");
    const T = "credentials" in Request.prototype;
    d = new Request(t, {
      ...g,
      signal: w,
      method: n.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: T ? p : void 0
    });
    let P = await fetch(d);
    const R = Ro && (u === "stream" || u === "response");
    if (Ro && (a || R && h)) {
      const L = {};
      ["status", "statusText", "headers"].forEach((y) => {
        L[y] = P[y];
      });
      const A = C.toFiniteNumber(P.headers.get("content-length")), [v, m] = a && js(
        A,
        Er(Vs(a), !0)
      ) || [];
      P = new Response(
        Us(P.body, Ws, v, () => {
          m && m(), h && h();
        }),
        L
      );
    }
    u = u || "text";
    let f = await Sr[C.findKey(Sr, u) || "text"](P, e);
    return !R && h && h(), await new Promise((L, A) => {
      xl(L, A, {
        data: f,
        headers: He.from(P.headers),
        status: P.status,
        statusText: P.statusText,
        config: e,
        request: d
      });
    });
  } catch (T) {
    throw h && h(), T && T.name === "TypeError" && /fetch/i.test(T.message) ? Object.assign(
      new le("Network Error", le.ERR_NETWORK, e, d),
      {
        cause: T.cause || T
      }
    ) : le.from(T, T && T.code, e, d);
  }
}), Fo = {
  http: Bm,
  xhr: d4,
  fetch: w4
};
C.forEach(Fo, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const qs = (e) => `- ${e}`, E4 = (e) => C.isFunction(e) || e === null || e === !1, Nl = {
  getAdapter: (e) => {
    e = C.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const o = {};
    for (let i = 0; i < t; i++) {
      n = e[i];
      let s;
      if (r = n, !E4(n) && (r = Fo[(s = String(n)).toLowerCase()], r === void 0))
        throw new le(`Unknown adapter '${s}'`);
      if (r)
        break;
      o[s || "#" + i] = r;
    }
    if (!r) {
      const i = Object.entries(o).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = t ? i.length > 1 ? `since :
` + i.map(qs).join(`
`) : " " + qs(i[0]) : "as no adapter specified";
      throw new le(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: Fo
};
function yo(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ln(null, e);
}
function Ks(e) {
  return yo(e), e.headers = He.from(e.headers), e.data = vo.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Nl.getAdapter(e.adapter || jn.adapter)(e).then(function(r) {
    return yo(e), r.data = vo.call(
      e,
      e.transformResponse,
      r
    ), r.headers = He.from(r.headers), r;
  }, function(r) {
    return $l(r) || (yo(e), r && r.response && (r.response.data = vo.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = He.from(r.response.headers))), Promise.reject(r);
  });
}
const Rl = "1.7.7", bi = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  bi[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ys = {};
bi.transitional = function(t, n, r) {
  function o(i, s) {
    return "[Axios v" + Rl + "] Transitional option '" + i + "'" + s + (r ? ". " + r : "");
  }
  return (i, s, a) => {
    if (t === !1)
      throw new le(
        o(s, " has been removed" + (n ? " in " + n : "")),
        le.ERR_DEPRECATED
      );
    return n && !Ys[s] && (Ys[s] = !0, console.warn(
      o(
        s,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(i, s, a) : !0;
  };
};
function S4(e, t, n) {
  if (typeof e != "object")
    throw new le("options must be an object", le.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const i = r[o], s = t[i];
    if (s) {
      const a = e[i], l = a === void 0 || s(a, i, e);
      if (l !== !0)
        throw new le("option " + i + " must be " + l, le.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new le("Unknown option " + i, le.ERR_BAD_OPTION);
  }
}
const zo = {
  assertOptions: S4,
  validators: bi
}, wt = zo.validators;
class Nt {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Fs(),
      response: new Fs()
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
        let o;
        Error.captureStackTrace ? Error.captureStackTrace(o = {}) : o = new Error();
        const i = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? i && !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + i) : r.stack = i;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Ft(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: i } = n;
    r !== void 0 && zo.assertOptions(r, {
      silentJSONParsing: wt.transitional(wt.boolean),
      forcedJSONParsing: wt.transitional(wt.boolean),
      clarifyTimeoutError: wt.transitional(wt.boolean)
    }, !1), o != null && (C.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : zo.assertOptions(o, {
      encode: wt.function,
      serialize: wt.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = i && C.merge(
      i.common,
      i[n.method]
    );
    i && C.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete i[d];
      }
    ), n.headers = He.concat(s, i);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(n) === !1 || (l = l && h.synchronous, a.unshift(h.fulfilled, h.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(h) {
      u.push(h.fulfilled, h.rejected);
    });
    let c, p = 0, g;
    if (!l) {
      const d = [Ks.bind(this), void 0];
      for (d.unshift.apply(d, a), d.push.apply(d, u), g = d.length, c = Promise.resolve(n); p < g; )
        c = c.then(d[p++], d[p++]);
      return c;
    }
    g = a.length;
    let w = n;
    for (p = 0; p < g; ) {
      const d = a[p++], h = a[p++];
      try {
        w = d(w);
      } catch (E) {
        h.call(this, E);
        break;
      }
    }
    try {
      c = Ks.call(this, w);
    } catch (d) {
      return Promise.reject(d);
    }
    for (p = 0, g = u.length; p < g; )
      c = c.then(u[p++], u[p++]);
    return c;
  }
  getUri(t) {
    t = Ft(this.defaults, t);
    const n = Il(t.baseURL, t.url);
    return Al(n, t.params, t.paramsSerializer);
  }
}
C.forEach(["delete", "get", "head", "options"], function(t) {
  Nt.prototype[t] = function(n, r) {
    return this.request(Ft(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
C.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(i, s, a) {
      return this.request(Ft(a || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: s
      }));
    };
  }
  Nt.prototype[t] = n(), Nt.prototype[t + "Form"] = n(!0);
});
class wi {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; )
        r._listeners[i](o);
      r._listeners = null;
    }), this.promise.then = (o) => {
      let i;
      const s = new Promise((a) => {
        r.subscribe(a), i = a;
      }).then(o);
      return s.cancel = function() {
        r.unsubscribe(i);
      }, s;
    }, t(function(i, s, a) {
      r.reason || (r.reason = new ln(i, s, a), n(r.reason));
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
      token: new wi(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function _4(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function C4(e) {
  return C.isObject(e) && e.isAxiosError === !0;
}
const jo = {
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
Object.entries(jo).forEach(([e, t]) => {
  jo[t] = e;
});
function Fl(e) {
  const t = new Nt(e), n = vl(Nt.prototype.request, t);
  return C.extend(n, Nt.prototype, t, { allOwnKeys: !0 }), C.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return Fl(Ft(e, o));
  }, n;
}
const Ae = Fl(jn);
Ae.Axios = Nt;
Ae.CanceledError = ln;
Ae.CancelToken = wi;
Ae.isCancel = $l;
Ae.VERSION = Rl;
Ae.toFormData = Mr;
Ae.AxiosError = le;
Ae.Cancel = Ae.CanceledError;
Ae.all = function(t) {
  return Promise.all(t);
};
Ae.spread = _4;
Ae.isAxiosError = C4;
Ae.mergeConfig = Ft;
Ae.AxiosHeaders = He;
Ae.formToJSON = (e) => Dl(C.isHTMLForm(e) ? new FormData(e) : e);
Ae.getAdapter = Nl.getAdapter;
Ae.HttpStatusCode = jo;
Ae.default = Ae;
const cn = Ae.create({
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
cn.interceptors.request.use(
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
cn.interceptors.response.use(
  (e) => {
    if (e && e.status == 200) {
      const t = e.data.code, n = e.data.msg;
      return t === "100" ? Promise.resolve(e.data) : t == 400 ? Promise.reject(n) : t === "101" ? (xt.error(n), Promise.reject(n)) : Promise.reject(e.data);
    } else
      return Promise.reject(e == null ? void 0 : e.data);
  },
  (e) => Promise.reject(e)
);
const k4 = "", pn = k4 + "/flow/query", Lr = {
  /**
   * 通过业务单据id获取当前任务的审批人列表
   */
  GetCurrTaskApplyersByBusinessKey: pn + "/getCurrTaskApplyersByBusinessKey",
  /**
   * 预览自定义流程图
   */
  GetCustomFlowSequenceFlows: pn + "/getCustomFlowSequenceFlows",
  /**
   * 获取高亮线和节点
   */
  GetHighLightedNodeVoByProcessInstanceId: pn + "/getHighLightedNodeVoByProcessInstanceId",
  /**
   * 查询节点信息
   */
  GetOneActivityVoByProcessInstanceIdAndActivityId: pn + "/getOneActivityVoByProcessInstanceIdAndActivityId",
  /**
   * 根据ModelKey查询模板信息
   */
  GetBpmnByModelKey: pn + "/getBpmnByModelKey",
  /**
   * 查询调用任务绑定 xml
   */
  GetCallActivityProcessInstance: "/flow/bpmnDesigner/prod/api/getCallActivityProcessInstanceIdByRootProcessInstanceId"
};
function T4(e) {
  return cn({
    method: "GET",
    url: `${Lr.GetHighLightedNodeVoByProcessInstanceId}/${e}`,
    params: {}
  });
}
function O4(e) {
  return cn({
    method: "GET",
    url: `${Lr.GetOneActivityVoByProcessInstanceIdAndActivityId}/${e.procInstId}/${e.elementId}`,
    params: {}
  });
}
function A4(e) {
  return cn({
    method: "GET",
    url: `${Lr.GetBpmnByModelKey}/${e}`,
    params: {}
  });
}
function P4(e, t) {
  return cn({
    method: "GET",
    url: `${Lr.GetCallActivityProcessInstance}/${e}/${t}`,
    params: {}
  });
}
function D4(e) {
  return Pr(e, "flowable:Field");
}
function $4(e, t) {
  return Pr(e).find((n) => oe(n, t));
}
function mn(e, t, n = {}) {
  const r = D4(e), o = t.reduce((s, a) => {
    const [l, u = "string"] = a.split(".");
    return s[l] = u, s;
  }, {}), i = {};
  for (const s of r) {
    const a = s.get("name");
    if (o[a]) {
      const l = n[a];
      l ? i[a] = l(s) : i[a] = s.get(o[a]);
    }
  }
  return i;
}
function x4(e) {
  return Tt(e, "bpmn:ErrorEventDefinition");
}
function I4(e) {
  if (!e)
    return;
  if (typeof e.get("timeDate") < "u")
    return "timeDate";
  if (typeof e.get("timeCycle") < "u")
    return "timeCycle";
  if (typeof e.get("timeDuration") < "u")
    return "timeDuration";
}
function M4(e) {
  return Tt(e, "bpmn:TimerEventDefinition");
}
function Tt(e, t) {
  return (xn(e).get("eventDefinitions") || []).find((o) => oe(o, t));
}
function B4(e) {
  return oe(e, "bpmn:ReceiveTask") ? xn(e) : Tt(e, "bpmn:MessageEventDefinition");
}
function L4(e) {
  return Tt(e, "bpmn:SignalEventDefinition");
}
function Vo(e) {
  return Tt(e, "bpmn:ConditionalEventDefinition");
}
function N4(e) {
  return Tt(e, "bpmn:EscalationEventDefinition");
}
function R4(e) {
  return Tt(e, "bpmn:CompensateEventDefinition");
}
function F4(e) {
  return Tt(e, "bpmn:TerminateEventDefinition");
}
function zl(e) {
  return Pr(
    xn(e),
    "flowable:VariableListenerEventDefinition"
  )[0];
}
const z4 = ["bpmn:UserTask", "bpmn:CallActivity"], jl = [
  "bpmn:ServiceTask",
  "bpmn:SequenceFlow",
  "bpmn:ScriptTask",
  // 'bpmn:CallActivity',
  "bpmn:StartEvent",
  "bpmn:EndEvent",
  "bpmn:IntermediateThrowEvent",
  "bpmn:IntermediateCatchEvent"
], Gs = (e) => e.type !== "label" && Eo(e, z4), Xs = (e) => e.type === "label" ? !1 : oe(e, "bpmn:SequenceFlow") ? Vl(e) : Eo(e, [
  "bpmn:EndEvent",
  "bpmn:StartEvent",
  "bpmn:IntermediateThrowEvent",
  "bpmn:IntermediateCatchEvent"
]) ? !H4(e) : Eo(e, jl), j4 = {
  "bpmn:ServiceTask": (e) => {
    var u;
    const t = e.businessObject, n = t.get("name"), r = n || e.type.replace(/bpmn:|flowable:/, ""), o = ["nodeType"], i = {
      nodeType: e.type
    }, s = {}, a = [];
    n || a.push("header");
    const l = t.get("type");
    if (l)
      switch (o.push("serviceType"), a.push("serviceType"), i.serviceType = l, s.serviceType = "arcoblue", l) {
        case "ws":
        case "sc":
        case "dubbo":
        case "rest":
        case "sql":
          o.push("apiName"), Object.assign(i, mn(t, ["apiName"])), console.log(i);
          break;
        case "copy":
          o.push("transferToUserNos");
          const c = $4(t, "flowable:IdmCandidateUsers"), p = c == null ? void 0 : c.get("body");
          p ? i.transferToUserNos = (u = JSON.parse(p)) == null ? void 0 : u.map((g) => g.name).join(",") : Object.assign(i, mn(t, ["transferToUserNos"])), s.transferToUserNos = "arcoblue";
          break;
        case "http":
          o.push("requestUrl", "requestMethod"), Object.assign(i, mn(t, ["requestUrl", "requestMethod"]));
          break;
        case "dmn":
          o.push("decisionTableReferenceName"), Object.assign(i, mn(t, ["decisionTableReferenceName"])), s.decisionTableReferenceName = "arcoblue";
          break;
        case "email":
          o.push("mailTo", "subject", "mailContent"), Object.assign(
            i,
            mn(t, ["to.expression", "subject", "html.expression"])
          );
          break;
      }
    return { loading: !1, header: r, attrs: o, values: i, tags: s, i18n: a };
  },
  "bpmn:ScriptTask": (e) => {
    const t = e.businessObject, n = t.get("name"), r = n || e.type.replace("bpmn:", ""), o = ["scriptFormat"], i = {
      scriptFormat: t.scriptFormat
    }, s = {}, a = [];
    return n || a.push("header"), { loading: !1, header: r, attrs: o, values: i, tags: s, i18n: a };
  },
  // 'bpmn:CallActivity': (element: BpmnElement) => {
  //   const nodeBo = element.businessObject
  //   const nodeName = nodeBo.get('name')
  //   const header = nodeName || element.type.replace('bpmn:', '')
  //   const attrs: string[] = ['calledInstance', 'inheritVariables']
  //   const values: Record<string, string> = {
  //     calledInstance: nodeBo.get('processInstanceName'),
  //     inheritVariables: nodeBo.get('inheritVariables') || 'false'
  //   }
  //   const tags: Record<string, string> = { calledInstance: 'arcoblue' }
  //   const i18n: string[] = ['inheritVariables']
  //
  //   if (!nodeName) {
  //     i18n.push('header')
  //   }
  //
  //   return { loading: false, header, attrs, values, tags, i18n }
  // },
  "bpmn:SequenceFlow": (e) => {
    const n = e.businessObject.get("name"), r = n || e.type.replace("bpmn:", ""), o = ["condition"], i = Vl(e), s = {
      condition: i == null ? void 0 : i.get("body")
    }, a = {}, l = [];
    return n || l.push("header"), { loading: !1, header: r, attrs: o, values: s, tags: a, i18n: l };
  },
  "bpmn:StartEvent": er,
  "bpmn:EndEvent": er,
  "bpmn:IntermediateThrowEvent": er,
  "bpmn:IntermediateCatchEvent": er
};
function er(e) {
  var P, R, f, L, A;
  const n = e.businessObject.get("name"), r = !1, o = n || e.type.replace("bpmn:", ""), i = ["eventDefinition"], s = {}, a = { eventDefinition: "arcoblue" }, l = ["eventDefinition"];
  n || l.push("header");
  const u = x4(e);
  if (u)
    return i.push("eventDefinitionName"), s.eventDefinition = "Error", s.eventDefinitionName = ((P = u.get("errorRef")) == null ? void 0 : P.name) || "-", { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  const c = L4(e);
  if (c)
    return i.push("eventDefinitionName"), s.eventDefinition = "Signal", s.eventDefinitionName = ((R = c.get("signalRef")) == null ? void 0 : R.name) || "-", { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  const p = B4(e);
  if (p)
    return i.push("eventDefinitionName"), s.eventDefinition = "Message", s.eventDefinitionName = ((f = p.get("messageRef")) == null ? void 0 : f.name) || "-", { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  const g = N4(e);
  if (g)
    return i.push("eventDefinitionName"), s.eventDefinition = "Escalation", s.eventDefinitionName = ((L = g.get("escalationRef")) == null ? void 0 : L.name) || "-", { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  if (R4(e))
    return s.eventDefinition = "Compensate", { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  if (F4(e))
    return i.push("terminateAll"), s.eventDefinition = "Terminate", s.terminateAll = g.terminateAll || "-", { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  const h = zl(e);
  if (h)
    return i.push("variableName", "variableChangeType"), l.push("variableChangeType"), s.eventDefinition = "VariableListener", s.variableName = h.get("variableName") || "-", s.variableChangeType = `var-${h.get("variableChangeType") || "-"}`, { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  const E = Vo(e);
  if (E)
    return i.push("conditionExpression"), s.eventDefinition = "Conditional", s.conditionExpression = ((A = E.get("condition")) == null ? void 0 : A.body) || "-", { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  const T = M4(e);
  if (T) {
    s.eventDefinition = "Timer", i.push("timerDefinitionType", "timerEventDefValue"), l.push("timerDefinitionType");
    const v = I4(T) || "";
    return s.timerDefinitionType = v, s.timerEventDefValue = v ? V4(T.get(v)) : "-", { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
  }
  return { loading: r, i18n: l, header: o, attrs: i, values: s, tags: a };
}
function V4(e) {
  return e && e.get("body") || "";
}
function H4(e) {
  return zl(e) ? !1 : !e.businessObject.eventDefinitions || !e.businessObject.eventDefinitions.length;
}
function Vl(e) {
  const t = xn(e);
  if (oe(t, "bpmn:SequenceFlow"))
    return t.get("conditionExpression");
  if (Vo(t))
    return Vo(t).get("condition");
}
const U4 = {
  key: 0,
  class: "node-details_wrap"
}, W4 = /* @__PURE__ */ be({
  name: "BpmnPresetViewer",
  __name: "index",
  props: {
    // 运行时实例 Id
    procInstId: {
      type: String,
      default: ""
    },
    // 流程的模型 Key
    modelKey: {
      type: String,
      default: ""
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
    const r = n, o = e, { locale: i, t: s } = rn(), a = re(), l = re(), u = Cn(), c = re(!1), p = re([]), g = re({}), w = re(), d = (_) => {
      if (_)
        return w.value = _, document.body.setAttribute("arco-theme", _);
      const S = document.body.getAttribute("arco-theme") === "dark";
      w.value = S ? "light" : "dark", document.body.setAttribute("arco-theme", w.value);
    }, h = (_) => {
      var S;
      _ ? i.value = _ : i.value = i.value === "zh_CN" ? "en_US" : "zh_CN", ai("local-lang", i.value), (S = u.value) == null || S.get("eventBus").fire("i18n.changed");
    }, E = (_) => (u.value = _) && r("viewer-init", _), T = () => {
      var M;
      const _ = (M = u.value) == null ? void 0 : M.get("elementRegistry");
      if (!_) {
        p.value = [];
        return;
      }
      const S = [];
      _.forEach((X) => {
        if (Xs(X)) {
          S.push(X.id);
          return;
        }
        if (Gs(X)) {
          if (X.type === "bpmn:UserTask") {
            o.procInstId && S.push(X.id);
            return;
          }
          S.push(X.id);
        }
      }), p.value = S;
    };
    async function P(_) {
      g.value[_.id] = {
        type: "CallActivity",
        loading: !0,
        custom: !0
      };
      const S = _.businessObject, M = S.calledElement;
      if (!M)
        return;
      const X = S.name, ce = S.processInstanceName, ne = S.inheritVariables ? "是" : "否";
      if (o.procInstId && (l.value.isActiveNode(_) || l.value.isPassedNode(_))) {
        const { data: V, success: ue } = await P4(
          o.procInstId,
          M
        );
        if (ue && V) {
          g.value[_.id] = {
            type: "CallActivity",
            loading: !1,
            instanceId: V,
            name: X,
            inheritVariables: ne,
            modelName: ce,
            custom: !0
          };
          return;
        }
      }
      g.value[_.id] = {
        type: "CallActivity",
        loading: !1,
        name: X,
        modelKey: M,
        inheritVariables: ne,
        modelName: ce,
        custom: !0
      };
    }
    async function R(_) {
      if (!o.procInstId)
        return;
      g.value[_] = {
        type: "UserTask",
        loading: !0,
        custom: !0
      };
      const { data: S = {} } = await O4({
        procInstId: o.procInstId,
        elementId: _
      });
      g.value[_] = {
        type: "UserTask",
        loading: !1,
        custom: !0,
        ...S
      };
    }
    async function f(_) {
      const { type: S, id: M } = _;
      try {
        S === "bpmn:UserTask" && await R(M), S === "bpmn:CallActivity" && await P(_);
      } catch (X) {
        xt.error((X == null ? void 0 : X.message) || "请求失败");
      } finally {
        g.value[M].loading = !1;
      }
    }
    function L(_) {
      if (!g.value[_.id]) {
        if (Gs(_))
          return g.value[_.id] = { loading: !0 }, f(_);
        if (Xs(_)) {
          for (const S of jl)
            if (oe(_, S)) {
              g.value[_.id] = j4[S](_);
              return;
            }
        }
      }
    }
    async function A(_, S) {
      var M;
      if ((M = u.value) == null || M.clear(), !_ && !S) {
        xt.error("modelKey和procInstId不能同时为空！");
        return;
      }
      try {
        await dr(), p.value = [], g.value = {}, c.value = !0, S ? await v(S) : await m(_);
      } finally {
        c.value = !1;
      }
    }
    async function v(_) {
      var ce, ne, V, ue;
      const { data: S, success: M, msg: X } = await T4(_);
      if (M) {
        const {
          activeActivityIds: $ = [],
          hisActiveActivityIds: D = [],
          modelXml: q,
          highLightedFlows: K = []
        } = S || {};
        if (!q) return;
        await ((ce = l.value) == null ? void 0 : ce.createNewProcess(q)), (ne = l.value) == null || ne.setPassedNodes([...K, ...D]), (V = l.value) == null || V.setActiveNodes([...$]), (ue = l.value) == null || ue.setProcessingMarker([...$]), T();
      } else
        xt.error(X);
      return r("data-change", S), S;
    }
    async function m(_) {
      var ce;
      const { data: S, success: M, msg: X } = await A4(_);
      if (M) {
        const { modelXml: ne } = S || {};
        if (!ne) return;
        await ((ce = l.value) == null ? void 0 : ce.createNewProcess(ne)), T();
      } else
        xt.error(X);
      r("data-change", S);
    }
    return Re(
      () => o.local,
      (_) => h(_),
      { immediate: !0 }
    ), Re(
      () => o.theme,
      (_) => d(_),
      { immediate: !0 }
    ), Re(
      () => ({ procInstId: o.procInstId, modelKey: o.modelKey }),
      ({ procInstId: _, modelKey: S }) => A(S, _),
      { immediate: !0 }
    ), t({ reloadViewerXML: A, downloadProcess: async (_, S) => {
      var M;
      (M = l.value) == null || M.downloadProcess(_, S);
    }, toggleTheme: d, toggleLang: h, downloadProcessAsPng: async (_) => {
      var S;
      (S = l.value) == null || S.downloadProcessAsPng(_);
    } }), (_, S) => {
      const M = G2, X = i2, ce = Hp, ne = Np;
      return x(), Q("div", {
        ref_key: "viewerWrapper",
        ref: a,
        class: "bpmn-preset-viewer"
      }, [
        H(tf, {
          ref_key: "viewer",
          ref: l,
          loading: I(c),
          theme: e.theme,
          local: e.local,
          "translate-prefix": e.translatePrefix,
          "show-download": e.showDownload,
          toolbar: e.toolbar,
          "file-name": e.fileName,
          "full-element": I(a),
          "in-preset": "",
          onViewerInit: E,
          onViewerDestroy: E,
          onElementHover: L
        }, null, 8, ["loading", "theme", "local", "translate-prefix", "show-download", "toolbar", "file-name", "full-element"]),
        (x(!0), Q(_t, null, Ho(I(p), (V) => (x(), ve(ne, {
          key: V,
          "selector-parent": I(l).$el,
          "append-to": I(a),
          offset: [0, 10],
          "z-index": 8888,
          "max-width": 1e3,
          target: `[data-element-id=${V}]`
        }, {
          default: ie(() => [
            H(I(Zo), {
              loading: I(g)[V] && I(g)[V].loading
            }, {
              default: ie(() => [
                I(g)[V] ? (x(), Q("div", U4, [
                  I(g)[V].custom ? (x(), Q(_t, { key: 0 }, [
                    I(g)[V].type === "UserTask" ? (x(), ve(M, {
                      key: 0,
                      "node-info": I(g)[V],
                      "translate-prefix": e.translatePrefix
                    }, null, 8, ["node-info", "translate-prefix"])) : me("", !0),
                    I(g)[V].type === "CallActivity" ? (x(), ve(X, yn({
                      key: 1,
                      ref_for: !0
                    }, o, {
                      theme: I(w),
                      "node-info": I(g)[V]
                    }), null, 16, ["theme", "node-info"])) : me("", !0)
                  ], 64)) : (x(), ve(ce, {
                    key: 1,
                    "node-info": I(g)[V],
                    "translate-prefix": e.translatePrefix
                  }, null, 8, ["node-info", "translate-prefix"]))
                ])) : me("", !0)
              ]),
              _: 2
            }, 1032, ["loading"])
          ]),
          _: 2
        }, 1032, ["selector-parent", "append-to", "target"]))), 128))
      ], 512);
    };
  }
});
export {
  Th as BpmnMocker,
  W4 as BpmnPresetViewer,
  tf as BpmnViewer,
  Np as TippyPopover
};
