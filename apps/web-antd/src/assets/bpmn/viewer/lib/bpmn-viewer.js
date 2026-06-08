var hu = Object.defineProperty;
var mu = (e, t, n) => t in e ? hu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var y = (e, t, n) => mu(e, typeof t != "symbol" ? t + "" : t, n);
import { inject as xt, computed as X, reactive as er, ref as te, getCurrentInstance as vu, cloneVNode as _a, openBlock as P, createElementBlock as Y, normalizeClass as le, renderSlot as _e, defineComponent as he, normalizeStyle as Ke, createElementVNode as R, toRef as ds, resolveComponent as we, createBlock as ue, createCommentVNode as ce, toRefs as ni, provide as Ca, onMounted as ft, onUpdated as tr, watch as xe, onBeforeUnmount as kn, readonly as gu, onDeactivated as yu, createVNode as V, Fragment as ct, Teleport as ka, mergeProps as zn, Transition as to, withDirectives as st, vShow as at, nextTick as zi, withCtx as ne, createTextVNode as De, toDisplayString as ie, withModifiers as no, onUnmounted as Ta, TransitionGroup as bu, isVNode as Eu, render as ji, shallowRef as Kn, unref as x, h as fs, renderList as Vi, isRef as wu, createStaticVNode as Aa } from "vue";
import Oa from "bpmn-js/lib/NavigatedViewer";
import { is as O, getBusinessObject as Te, isAny as nn } from "bpmn-js/lib/util/ModelUtil";
import { isAny as Su } from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import _u from "bpmn-js/lib/draw/BpmnRenderer";
import { getDi as ps, getStrokeColor as pe, getFillColor as ke, getSemantic as wr, isThrowEvent as Cu, isTypedEvent as it, black as hs } from "bpmn-js/lib/draw/BpmnRenderUtil";
import { rotate as ku } from "diagram-js/lib/util/SvgTransformUtil";
import Tu from "bpmn-js/lib/draw/PathMap";
import Au from "bpmn-js-i18n-zh/lib/bpmn-js";
import Ou from "diagram-js-grid-bg";
import { useI18n as Tn } from "vue-i18n";
import { getPlaneIdFromShape as Bu } from "bpmn-js/lib/util/DrilldownUtil";
import { escapeHTML as Du } from "diagram-js/lib/util/EscapeUtil";
import Iu from "bpmn-js/lib/features/modeling";
const ii = Object.prototype.toString;
function Oo(e) {
  return ii.call(e) === "[object Array]";
}
function ms(e) {
  return ii.call(e) === "[object Boolean]";
}
const vs = (e) => ii.call(e) === "[object Promise]";
function nr(e) {
  return ii.call(e) === "[object String]";
}
function _t(e) {
  return ii.call(e) === "[object Number]" && e === e;
}
function Pu(e) {
  return e === void 0;
}
function wt(e) {
  return typeof e == "function";
}
const ri = Symbol("ArcoConfigProvider"), gi = {
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
}, $u = {
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
  calendar: gi,
  datePicker: {
    view: gi.view,
    month: gi.month,
    week: gi.week,
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
}, xu = te("zh-CN"), Fu = er({
  "zh-CN": $u
}), Mu = () => {
  const e = xt(ri, void 0), t = X(
    () => {
      var r;
      return (r = e == null ? void 0 : e.locale) != null ? r : Fu[xu.value];
    }
  ), n = X(() => t.value.locale);
  return {
    i18nMessage: t,
    locale: n,
    t: (r, ...o) => {
      const s = r.split(".");
      let a = t.value;
      for (const l of s) {
        if (!a[l])
          return r;
        a = a[l];
      }
      return nr(a) && o.length > 0 ? a.replace(/{(\d+)}/g, (l, u) => {
        var c;
        return (c = o[u]) != null ? c : l;
      }) : a;
    }
  };
}, Nu = "A", Lu = "arco", io = "$arco", sn = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : Nu;
}, an = (e, t) => {
  var n;
  t && t.classPrefix && (e.config.globalProperties[io] = {
    ...(n = e.config.globalProperties[io]) != null ? n : {},
    classPrefix: t.classPrefix
  });
}, Ae = (e) => {
  var t, n, i;
  const r = vu(), o = xt(ri, void 0), s = (i = (n = o == null ? void 0 : o.prefixCls) != null ? n : (t = r == null ? void 0 : r.appContext.config.globalProperties[io]) == null ? void 0 : t.classPrefix) != null ? i : Lu;
  return e ? `${s}-${e}` : s;
};
var Ba = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, n) {
    var i = -1;
    return t.some(function(r, o) {
      return r[0] === n ? (i = o, !0) : !1;
    }), i;
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
        var i = e(this.__entries__, n), r = this.__entries__[i];
        return r && r[1];
      }, t.prototype.set = function(n, i) {
        var r = e(this.__entries__, n);
        ~r ? this.__entries__[r][1] = i : this.__entries__.push([n, i]);
      }, t.prototype.delete = function(n) {
        var i = this.__entries__, r = e(i, n);
        ~r && i.splice(r, 1);
      }, t.prototype.has = function(n) {
        return !!~e(this.__entries__, n);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(n, i) {
        i === void 0 && (i = null);
        for (var r = 0, o = this.__entries__; r < o.length; r++) {
          var s = o[r];
          n.call(i, s[1], s[0]);
        }
      }, t;
    }()
  );
}(), ro = typeof window < "u" && typeof document < "u" && window.document === document, Ui = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), Ru = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Ui) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), zu = 2;
function ju(e, t) {
  var n = !1, i = !1, r = 0;
  function o() {
    n && (n = !1, e()), i && a();
  }
  function s() {
    Ru(o);
  }
  function a() {
    var l = Date.now();
    if (n) {
      if (l - r < zu)
        return;
      i = !0;
    } else
      n = !0, i = !1, setTimeout(s, t);
    r = l;
  }
  return a;
}
var Vu = 20, Uu = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], Hu = typeof MutationObserver < "u", qu = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = ju(this.refresh.bind(this), Vu);
    }
    return e.prototype.addObserver = function(t) {
      ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();
    }, e.prototype.removeObserver = function(t) {
      var n = this.observers_, i = n.indexOf(t);
      ~i && n.splice(i, 1), !n.length && this.connected_ && this.disconnect_();
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
      !ro || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), Hu ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !ro || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var n = t.propertyName, i = n === void 0 ? "" : n, r = Uu.some(function(o) {
        return !!~i.indexOf(o);
      });
      r && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), Da = function(e, t) {
  for (var n = 0, i = Object.keys(t); n < i.length; n++) {
    var r = i[n];
    Object.defineProperty(e, r, {
      value: t[r],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, bn = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || Ui;
}, Ia = ir(0, 0, 0, 0);
function Hi(e) {
  return parseFloat(e) || 0;
}
function gs(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(i, r) {
    var o = e["border-" + r + "-width"];
    return i + Hi(o);
  }, 0);
}
function Wu(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, i = 0, r = t; i < r.length; i++) {
    var o = r[i], s = e["padding-" + o];
    n[o] = Hi(s);
  }
  return n;
}
function Gu(e) {
  var t = e.getBBox();
  return ir(0, 0, t.width, t.height);
}
function Ku(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return Ia;
  var i = bn(e).getComputedStyle(e), r = Wu(i), o = r.left + r.right, s = r.top + r.bottom, a = Hi(i.width), l = Hi(i.height);
  if (i.boxSizing === "border-box" && (Math.round(a + o) !== t && (a -= gs(i, "left", "right") + o), Math.round(l + s) !== n && (l -= gs(i, "top", "bottom") + s)), !Xu(e)) {
    var u = Math.round(a + o) - t, c = Math.round(l + s) - n;
    Math.abs(u) !== 1 && (a -= u), Math.abs(c) !== 1 && (l -= c);
  }
  return ir(r.left, r.top, a, l);
}
var Yu = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof bn(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof bn(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function Xu(e) {
  return e === bn(e).document.documentElement;
}
function Ju(e) {
  return ro ? Yu(e) ? Gu(e) : Ku(e) : Ia;
}
function Zu(e) {
  var t = e.x, n = e.y, i = e.width, r = e.height, o = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, s = Object.create(o.prototype);
  return Da(s, {
    x: t,
    y: n,
    width: i,
    height: r,
    top: n,
    right: t + i,
    bottom: r + n,
    left: t
  }), s;
}
function ir(e, t, n, i) {
  return { x: e, y: t, width: n, height: i };
}
var Qu = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = ir(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = Ju(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), e0 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, n) {
      var i = Zu(n);
      Da(this, { target: t, contentRect: i });
    }
    return e;
  }()
), t0 = (
  /** @class */
  function() {
    function e(t, n, i) {
      if (this.activeObservations_ = [], this.observations_ = new Ba(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = n, this.callbackCtx_ = i;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof bn(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) || (n.set(t, new Qu(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof bn(t).Element))
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
        var t = this.callbackCtx_, n = this.activeObservations_.map(function(i) {
          return new e0(i.target, i.broadcastRect());
        });
        this.callback_.call(t, n, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), Pa = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Ba(), $a = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = qu.getInstance(), i = new t0(t, n, this);
      Pa.set(this, i);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  $a.prototype[e] = function() {
    var t;
    return (t = Pa.get(this))[e].apply(t, arguments);
  };
});
var xa = function() {
  return typeof Ui.ResizeObserver < "u" ? Ui.ResizeObserver : $a;
}();
const Bo = (e) => !!(e && e.shapeFlag & 1), Do = (e, t) => !!(e && e.shapeFlag & 6), Fa = (e, t) => !!(e && e.shapeFlag & 16), n0 = (e, t) => !!(e && e.shapeFlag & 32), Oi = (e) => {
  var t, n;
  if (e)
    for (const i of e) {
      if (Bo(i) || Do(i))
        return i;
      if (Fa(i, i.children)) {
        const r = Oi(i.children);
        if (r)
          return r;
      } else if (n0(i, i.children)) {
        const r = (n = (t = i.children).default) == null ? void 0 : n.call(t);
        if (r) {
          const o = Oi(r);
          if (o)
            return o;
        }
      } else if (Oo(i)) {
        const r = Oi(i);
        if (r)
          return r;
      }
    }
}, i0 = (e) => {
  if (!e)
    return !0;
  for (const t of e)
    if (t.children)
      return !1;
  return !0;
}, Ma = (e, t) => {
  if (e && e.length > 0)
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      if (Bo(i) || Do(i)) {
        const o = wt(t) ? t(i) : t;
        return e[n] = _a(i, o, !0), !0;
      }
      const r = Na(i);
      if (r && r.length > 0 && Ma(r, t))
        return !0;
    }
  return !1;
}, Na = (e) => {
  if (Fa(e, e.children))
    return e.children;
  if (Oo(e))
    return e;
}, La = (e) => {
  var t, n;
  if (Bo(e))
    return e.el;
  if (Do(e)) {
    if (((t = e.el) == null ? void 0 : t.nodeType) === 1)
      return e.el;
    if ((n = e.component) != null && n.subTree) {
      const i = La(e.component.subTree);
      if (i)
        return i;
    }
  } else {
    const i = Na(e);
    return Ra(i);
  }
}, Ra = (e) => {
  if (e && e.length > 0)
    for (const t of e) {
      const n = La(t);
      if (n)
        return n;
    }
}, jn = (e) => {
  if (e)
    return wt(e) ? e : () => e;
}, za = typeof window > "u" ? global : window, r0 = za.requestAnimationFrame, ys = za.cancelAnimationFrame;
function bs(e) {
  let t = 0;
  const n = (...i) => {
    t && ys(t), t = r0(() => {
      e(...i), t = 0;
    });
  };
  return n.cancel = () => {
    ys(t), t = 0;
  }, n;
}
const Io = () => {
}, ja = () => {
  const { body: e } = document, t = document.documentElement;
  let n;
  try {
    n = (window.top || window.self || window).document.body;
  } catch {
  }
  return {
    height: Math.max(
      e.scrollHeight,
      e.offsetHeight,
      t.clientHeight,
      t.scrollHeight,
      t.offsetHeight,
      (n == null ? void 0 : n.scrollHeight) || 0,
      (n == null ? void 0 : n.clientHeight) || 0
    ),
    width: Math.max(
      e.scrollWidth,
      e.offsetWidth,
      t.clientWidth,
      t.scrollWidth,
      t.offsetWidth,
      (n == null ? void 0 : n.scrollWidth) || 0,
      (n == null ? void 0 : n.clientWidth) || 0
    )
  };
}, Po = (() => {
  try {
    return !(typeof window < "u" && document !== void 0);
  } catch {
    return !0;
  }
})(), Zt = Po ? Io : (e, t, n, i = !1) => {
  e.addEventListener(
    t,
    n,
    i
  );
}, Yn = Po ? Io : (e, t, n, i = !1) => {
  e.removeEventListener(
    t,
    n,
    i
  );
}, o0 = (e, t) => {
  if (!e || !t)
    return !1;
  let n = t;
  for (; n; ) {
    if (n === e)
      return !0;
    n = n.parentNode;
  }
  return !1;
}, Va = (e) => {
  const t = document.createElement("div");
  return t.setAttribute("class", `arco-overlay arco-overlay-${e}`), t;
}, s0 = (e, t) => {
  var n;
  return Po ? Io() : (n = document.querySelector(e)) != null ? n : void 0;
}, oo = (e, t) => {
  if (nr(e)) {
    const n = e[0] === "#" ? `[id='${e.slice(1)}']` : e;
    return s0(n);
  }
  return e;
}, a0 = (e) => e.tagName === "BODY" ? document.documentElement.scrollHeight > window.innerHeight : e.scrollHeight > e.offsetHeight, l0 = (e) => e.tagName === "BODY" ? window.innerWidth - ja().width : e.offsetWidth - e.clientWidth;
var Fe = (e, t) => {
  for (const [n, i] of t)
    e[n] = i;
  return e;
};
const c0 = he({
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
      prefixCls: Ae("icon-hover")
    };
  }
});
function u0(e, t, n, i, r, o) {
  return P(), Y("span", {
    class: le([
      e.prefixCls,
      {
        [`${e.prefix}-icon-hover`]: e.prefix,
        [`${e.prefixCls}-size-${e.size}`]: e.size !== "medium",
        [`${e.prefixCls}-disabled`]: e.disabled
      }
    ])
  }, [
    _e(e.$slots, "default")
  ], 2);
}
var $o = /* @__PURE__ */ Fe(c0, [["render", u0]]);
const d0 = he({
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
    const n = Ae("icon"), i = X(() => [n, `${n}-close`, { [`${n}-spin`]: e.spin }]), r = X(() => {
      const s = {};
      return e.size && (s.fontSize = _t(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: i,
      innerStyle: r,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), f0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"];
function p0(e, t, n, i, r, o) {
  return P(), Y("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: le(e.cls),
    style: Ke(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, t[1] || (t[1] = [
    R("path", { d: "M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142" }, null, -1)
  ]), 14, f0);
}
var Sr = /* @__PURE__ */ Fe(d0, [["render", p0]]);
const xo = Object.assign(Sr, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + Sr.name, Sr);
  }
}), h0 = he({
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
    const n = Ae("icon"), i = X(() => [n, `${n}-info-circle-fill`, { [`${n}-spin`]: e.spin }]), r = X(() => {
      const s = {};
      return e.size && (s.fontSize = _t(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: i,
      innerStyle: r,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), m0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"];
function v0(e, t, n, i, r, o) {
  return P(), Y("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: le(e.cls),
    style: Ke(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, t[1] || (t[1] = [
    R("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm2-30a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Zm0 17h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11Z",
      fill: "currentColor",
      stroke: "none"
    }, null, -1)
  ]), 14, m0);
}
var _r = /* @__PURE__ */ Fe(h0, [["render", v0]]);
const Ua = Object.assign(_r, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + _r.name, _r);
  }
}), g0 = he({
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
    const n = Ae("icon"), i = X(() => [n, `${n}-check-circle-fill`, { [`${n}-spin`]: e.spin }]), r = X(() => {
      const s = {};
      return e.size && (s.fontSize = _t(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: i,
      innerStyle: r,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), y0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"];
function b0(e, t, n, i, r, o) {
  return P(), Y("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: le(e.cls),
    style: Ke(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, t[1] || (t[1] = [
    R("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm10.207-24.379a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0L22 26.172l-4.878-4.88a1 1 0 0 0-1.415 0l-1.414 1.415a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414 0l11.5-11.5Z",
      fill: "currentColor",
      stroke: "none"
    }, null, -1)
  ]), 14, y0);
}
var Cr = /* @__PURE__ */ Fe(g0, [["render", b0]]);
const Ha = Object.assign(Cr, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + Cr.name, Cr);
  }
}), E0 = he({
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
    const n = Ae("icon"), i = X(() => [n, `${n}-exclamation-circle-fill`, { [`${n}-spin`]: e.spin }]), r = X(() => {
      const s = {};
      return e.size && (s.fontSize = _t(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: i,
      innerStyle: r,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), w0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"];
function S0(e, t, n, i, r, o) {
  return P(), Y("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: le(e.cls),
    style: Ke(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, t[1] || (t[1] = [
    R("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm-2-11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2Zm4-18a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V15Z",
      fill: "currentColor",
      stroke: "none"
    }, null, -1)
  ]), 14, w0);
}
var kr = /* @__PURE__ */ Fe(E0, [["render", S0]]);
const qa = Object.assign(kr, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + kr.name, kr);
  }
}), _0 = he({
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
    const n = Ae("icon"), i = X(() => [n, `${n}-close-circle-fill`, { [`${n}-spin`]: e.spin }]), r = X(() => {
      const s = {};
      return e.size && (s.fontSize = _t(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: i,
      innerStyle: r,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), C0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"];
function k0(e, t, n, i, r, o) {
  return P(), Y("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: le(e.cls),
    style: Ke(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, t[1] || (t[1] = [
    R("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm4.955-27.771-4.95 4.95-4.95-4.95a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l4.95 4.95-4.95 4.95a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-4.95-4.95 4.95-4.95a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0Z",
      fill: "currentColor",
      stroke: "none"
    }, null, -1)
  ]), 14, C0);
}
var Tr = /* @__PURE__ */ Fe(_0, [["render", k0]]);
const Wa = Object.assign(Tr, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + Tr.name, Tr);
  }
}), Ga = ["info", "success", "warning", "error"], T0 = he({
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
    const n = Ae("icon"), i = X(() => [n, `${n}-loading`, { [`${n}-spin`]: e.spin }]), r = X(() => {
      const s = {};
      return e.size && (s.fontSize = _t(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: i,
      innerStyle: r,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), A0 = ["stroke-width", "stroke-linecap", "stroke-linejoin"];
function O0(e, t, n, i, r, o) {
  return P(), Y("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: le(e.cls),
    style: Ke(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, t[1] || (t[1] = [
    R("path", { d: "M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6" }, null, -1)
  ]), 14, A0);
}
var Ar = /* @__PURE__ */ Fe(T0, [["render", O0]]);
const oi = Object.assign(Ar, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + Ar.name, Ar);
  }
}), Ka = (e, t) => {
  const n = { ...e };
  for (const i of t)
    i in n && delete n[i];
  return n;
}, B0 = Symbol(
  "ArcoFormItemContext"
), D0 = ({
  size: e,
  disabled: t,
  error: n,
  uninject: i
} = {}) => {
  const r = i ? {} : xt(B0, {}), o = X(() => {
    var c;
    return (c = e == null ? void 0 : e.value) != null ? c : r.size;
  }), s = X(
    () => (t == null ? void 0 : t.value) || r.disabled
  ), a = X(() => (n == null ? void 0 : n.value) || r.error), l = ds(r, "feedback"), u = ds(r, "eventHandlers");
  return {
    formItemCtx: r,
    mergedSize: o,
    mergedDisabled: s,
    mergedError: a,
    feedback: l,
    eventHandlers: u
  };
}, Ya = (e, { defaultValue: t = "medium" } = {}) => {
  const n = xt(ri, void 0);
  return {
    mergedSize: X(
      () => {
        var r, o;
        return (o = (r = e == null ? void 0 : e.value) != null ? r : n == null ? void 0 : n.size) != null ? o : t;
      }
    )
  };
}, Xa = Symbol("ArcoButtonGroup"), I0 = he({
  name: "Button",
  components: {
    IconLoading: oi
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
    const { size: n, disabled: i } = ni(e), r = Ae("btn"), o = xt(Xa, void 0), s = X(() => {
      var E;
      return (E = n.value) != null ? E : o == null ? void 0 : o.size;
    }), a = X(
      () => !!(i.value || o != null && o.disabled)
    ), { mergedSize: l, mergedDisabled: u } = D0({
      size: s,
      disabled: a
    }), { mergedSize: c } = Ya(l), d = X(() => {
      var E, f, p, g, C, B;
      return [
        r,
        `${r}-${(f = (E = e.type) != null ? E : o == null ? void 0 : o.type) != null ? f : "secondary"}`,
        `${r}-shape-${(g = (p = e.shape) != null ? p : o == null ? void 0 : o.shape) != null ? g : "square"}`,
        `${r}-size-${c.value}`,
        `${r}-status-${(B = (C = e.status) != null ? C : o == null ? void 0 : o.status) != null ? B : "normal"}`,
        {
          [`${r}-long`]: e.long,
          [`${r}-loading`]: e.loading,
          [`${r}-disabled`]: u.value,
          [`${r}-link`]: nr(e.href)
        }
      ];
    });
    return {
      prefixCls: r,
      cls: d,
      mergedDisabled: u,
      handleClick: (E) => {
        if (e.disabled || e.loading) {
          E.preventDefault();
          return;
        }
        t("click", E);
      }
    };
  }
}), P0 = ["href"], $0 = ["type", "disabled", "autofocus"];
function x0(e, t, n, i, r, o) {
  const s = we("icon-loading");
  return e.href ? (P(), Y("a", {
    key: 0,
    class: le([
      e.cls,
      { [`${e.prefixCls}-only-icon`]: e.$slots.icon && !e.$slots.default }
    ]),
    href: e.mergedDisabled || e.loading ? void 0 : e.href,
    onClick: t[0] || (t[0] = (...a) => e.handleClick && e.handleClick(...a))
  }, [
    e.loading || e.$slots.icon ? (P(), Y("span", {
      key: 0,
      class: le(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (P(), ue(s, {
        key: 0,
        spin: "true"
      })) : _e(e.$slots, "icon", { key: 1 })
    ], 2)) : ce("v-if", !0),
    _e(e.$slots, "default")
  ], 10, P0)) : (P(), Y("button", {
    key: 1,
    class: le([
      e.cls,
      { [`${e.prefixCls}-only-icon`]: e.$slots.icon && !e.$slots.default }
    ]),
    type: e.htmlType,
    disabled: e.mergedDisabled,
    autofocus: e.autofocus,
    onClick: t[1] || (t[1] = (...a) => e.handleClick && e.handleClick(...a))
  }, [
    e.loading || e.$slots.icon ? (P(), Y("span", {
      key: 0,
      class: le(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (P(), ue(s, {
        key: 0,
        spin: !0
      })) : _e(e.$slots, "icon", { key: 1 })
    ], 2)) : ce("v-if", !0),
    _e(e.$slots, "default")
  ], 10, $0));
}
var Or = /* @__PURE__ */ Fe(I0, [["render", x0]]);
const F0 = he({
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
    const { type: t, size: n, status: i, disabled: r, shape: o } = ni(e), s = Ae("btn-group");
    return Ca(
      Xa,
      er({
        type: t,
        size: n,
        shape: o,
        status: i,
        disabled: r
      })
    ), {
      prefixCls: s
    };
  }
});
function M0(e, t, n, i, r, o) {
  return P(), Y("div", {
    class: le(e.prefixCls)
  }, [
    _e(e.$slots, "default")
  ], 2);
}
var Bi = /* @__PURE__ */ Fe(F0, [["render", M0]]);
const ot = Object.assign(Or, {
  Group: Bi,
  install: (e, t) => {
    an(e, t);
    const n = sn(t);
    e.component(n + Or.name, Or), e.component(n + Bi.name, Bi);
  }
}), N0 = () => {
  const { height: e, width: t } = ja();
  return {
    width: Math.min(t, window.innerWidth),
    height: Math.min(e, window.innerHeight)
  };
}, Es = (e, t) => {
  var n, i;
  const r = e.getBoundingClientRect();
  return {
    top: r.top,
    bottom: r.bottom,
    left: r.left,
    right: r.right,
    scrollTop: r.top - t.top,
    scrollBottom: r.bottom - t.top,
    scrollLeft: r.left - t.left,
    scrollRight: r.right - t.left,
    width: (n = e.offsetWidth) != null ? n : e.clientWidth,
    height: (i = e.offsetHeight) != null ? i : e.clientHeight
  };
}, L0 = (e) => {
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
}, yi = (e, t) => {
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
}, R0 = (e, t, {
  containerRect: n,
  triggerRect: i,
  popupRect: r,
  offset: o,
  translate: s
}) => {
  const a = L0(e), l = N0(), u = {
    top: n.top + t.top,
    bottom: l.height - (n.top + t.top + r.height),
    left: n.left + t.left,
    right: l.width - (n.left + t.left + r.width)
  };
  let c = e;
  if (a === "top" && u.top < 0)
    if (i.top > r.height)
      t.top = -n.top;
    else {
      const d = Rn("bottom", i, r, {
        offset: o,
        translate: s
      });
      l.height - (n.top + d.top + r.height) > 0 && (c = yi(e, "bottom"), t.top = d.top);
    }
  if (a === "bottom" && u.bottom < 0)
    if (l.height - i.bottom > r.height)
      t.top = -n.top + (l.height - r.height);
    else {
      const d = Rn("top", i, r, {
        offset: o,
        translate: s
      });
      n.top + d.top > 0 && (c = yi(e, "top"), t.top = d.top);
    }
  if (a === "left" && u.left < 0)
    if (i.left > r.width)
      t.left = -n.left;
    else {
      const d = Rn("right", i, r, {
        offset: o,
        translate: s
      });
      l.width - (n.left + d.left + r.width) > 0 && (c = yi(e, "right"), t.left = d.left);
    }
  if (a === "right" && u.right < 0)
    if (l.width - i.right > r.width)
      t.left = -n.left + (l.width - r.width);
    else {
      const d = Rn("left", i, r, {
        offset: o,
        translate: s
      });
      n.left + d.left > 0 && (c = yi(e, "left"), t.left = d.left);
    }
  return (a === "top" || a === "bottom") && (u.left < 0 ? t.left = -n.left : u.right < 0 && (t.left = -n.left + (l.width - r.width))), (a === "left" || a === "right") && (u.top < 0 ? t.top = -n.top : u.bottom < 0 && (t.top = -n.top + (l.height - r.height))), {
    popupPosition: t,
    position: c
  };
}, Rn = (e, t, n, {
  offset: i = 0,
  translate: r = [0, 0]
} = {}) => {
  var o;
  const s = (o = Oo(r) ? r : r[e]) != null ? o : [0, 0];
  switch (e) {
    case "top":
      return {
        left: t.scrollLeft + Math.round(t.width / 2) - Math.round(n.width / 2) + s[0],
        top: t.scrollTop - n.height - i + s[1]
      };
    case "tl":
      return {
        left: t.scrollLeft + s[0],
        top: t.scrollTop - n.height - i + s[1]
      };
    case "tr":
      return {
        left: t.scrollRight - n.width + s[0],
        top: t.scrollTop - n.height - i + s[1]
      };
    case "bottom":
      return {
        left: t.scrollLeft + Math.round(t.width / 2) - Math.round(n.width / 2) + s[0],
        top: t.scrollBottom + i + s[1]
      };
    case "bl":
      return {
        left: t.scrollLeft + s[0],
        top: t.scrollBottom + i + s[1]
      };
    case "br":
      return {
        left: t.scrollRight - n.width + s[0],
        top: t.scrollBottom + i + s[1]
      };
    case "left":
      return {
        left: t.scrollLeft - n.width - i + s[0],
        top: t.scrollTop + Math.round(t.height / 2) - Math.round(n.height / 2) + s[1]
      };
    case "lt":
      return {
        left: t.scrollLeft - n.width - i + s[0],
        top: t.scrollTop + s[1]
      };
    case "lb":
      return {
        left: t.scrollLeft - n.width - i + s[0],
        top: t.scrollBottom - n.height + s[1]
      };
    case "right":
      return {
        left: t.scrollRight + i + s[0],
        top: t.scrollTop + Math.round(t.height / 2) - Math.round(n.height / 2) + s[1]
      };
    case "rt":
      return {
        left: t.scrollRight + i + s[0],
        top: t.scrollTop + s[1]
      };
    case "rb":
      return {
        left: t.scrollRight + i + s[0],
        top: t.scrollBottom - n.height + s[1]
      };
    default:
      return {
        left: 0,
        top: 0
      };
  }
}, z0 = (e) => {
  let t = "0";
  ["top", "bottom"].includes(e) ? t = "50%" : ["left", "lt", "lb", "tr", "br"].includes(e) && (t = "100%");
  let n = "0";
  return ["left", "right"].includes(e) ? n = "50%" : ["top", "tl", "tr", "lb", "rb"].includes(e) && (n = "100%"), `${t} ${n}`;
}, j0 = (e, t, n, i, {
  offset: r = 0,
  translate: o = [0, 0],
  customStyle: s = {},
  autoFitPosition: a = !1
} = {}) => {
  let l = e, u = Rn(e, n, i, {
    offset: r,
    translate: o
  });
  if (a) {
    const d = R0(e, u, {
      containerRect: t,
      popupRect: i,
      triggerRect: n,
      offset: r,
      translate: o
    });
    u = d.popupPosition, l = d.position;
  }
  return {
    style: {
      left: `${u.left}px`,
      top: `${u.top}px`,
      ...s
    },
    position: l
  };
}, V0 = (e, t, n, {
  customStyle: i = {}
}) => {
  if (["top", "tl", "tr", "bottom", "bl", "br"].includes(e)) {
    let o = Math.abs(
      t.scrollLeft + t.width / 2 - n.scrollLeft
    );
    return o > n.width - 8 && (t.width > n.width ? o = n.width / 2 : o = n.width - 8), ["top", "tl", "tr"].includes(e) ? {
      left: `${o}px`,
      bottom: "0",
      transform: "translate(-50%,50%) rotate(45deg)",
      ...i
    } : {
      left: `${o}px`,
      top: "0",
      transform: "translate(-50%,-50%) rotate(45deg)",
      ...i
    };
  }
  let r = Math.abs(
    t.scrollTop + t.height / 2 - n.scrollTop
  );
  return r > n.height - 8 && (t.height > n.height ? r = n.height / 2 : r = n.height - 8), ["left", "lt", "lb"].includes(e) ? {
    top: `${r}px`,
    right: "0",
    transform: "translate(50%,-50%) rotate(45deg)",
    ...i
  } : {
    top: `${r}px`,
    left: "0",
    transform: "translate(-50%,-50%) rotate(45deg)",
    ...i
  };
}, U0 = (e) => e.scrollHeight > e.offsetHeight || e.scrollWidth > e.offsetWidth, ws = (e) => {
  var t;
  const n = [];
  let i = e;
  for (; i && i !== document.documentElement; )
    U0(i) && n.push(i), i = (t = i.parentElement) != null ? t : void 0;
  return n;
}, Ja = () => {
  const e = {}, t = te(), n = () => {
    const i = Ra(e.value);
    i !== t.value && (t.value = i);
  };
  return ft(() => n()), tr(() => n()), {
    children: e,
    firstElement: t
  };
};
var Ss = he({
  name: "ResizeObserver",
  props: {
    watchOnUpdated: Boolean
  },
  emits: [
    "resize"
  ],
  setup(e, { emit: t, slots: n }) {
    const { children: i, firstElement: r } = Ja();
    let o;
    const s = (l) => {
      l && (o = new xa((u) => {
        const c = u[0];
        t("resize", c);
      }), o.observe(l));
    }, a = () => {
      o && (o.disconnect(), o = null);
    };
    return xe(r, (l) => {
      o && a(), l && s(l);
    }), kn(() => {
      o && a();
    }), () => {
      var l;
      return i.value = (l = n.default) == null ? void 0 : l.call(n), i.value;
    };
  }
});
function H0(e, t) {
  const n = te(e[t]);
  return tr(() => {
    const i = e[t];
    n.value !== i && (n.value = i);
  }), n;
}
const _s = Symbol("ArcoTrigger"), q0 = 1e3, W0 = 5e3, G0 = 1;
class K0 {
  constructor() {
    this.popupStack = {
      popup: /* @__PURE__ */ new Set(),
      dialog: /* @__PURE__ */ new Set(),
      message: /* @__PURE__ */ new Set()
    }, this.getNextZIndex = (t) => (t === "message" ? Array.from(this.popupStack.message).pop() || W0 : Array.from(this.popupStack.popup).pop() || q0) + G0, this.add = (t) => {
      const n = this.getNextZIndex(t);
      return this.popupStack[t].add(n), t === "dialog" && this.popupStack.popup.add(n), n;
    }, this.delete = (t, n) => {
      this.popupStack[n].delete(t), n === "dialog" && this.popupStack.popup.delete(t);
    }, this.isLastDialog = (t) => this.popupStack.dialog.size > 1 ? t === Array.from(this.popupStack.dialog).pop() : !0;
  }
}
const Br = new K0();
function Fo(e, {
  visible: t,
  runOnMounted: n
} = {}) {
  const i = te(0), r = () => {
    i.value = Br.add(e);
  }, o = () => {
    Br.delete(i.value, e);
  }, s = () => e === "dialog" ? Br.isLastDialog(i.value) : !1;
  return xe(
    () => t == null ? void 0 : t.value,
    (a) => {
      a ? r() : o();
    },
    {
      immediate: !0
    }
  ), n && (ft(() => {
    r();
  }), kn(() => {
    o();
  })), {
    zIndex: gu(i),
    open: r,
    close: o,
    isLastDialog: s
  };
}
const Y0 = ({
  elementRef: e,
  onResize: t
}) => {
  let n;
  return {
    createResizeObserver: () => {
      e.value && (n = new xa((o) => {
        const s = o[0];
        wt(t) && t(s);
      }), n.observe(e.value));
    },
    destroyResizeObserver: () => {
      n && (n.disconnect(), n = null);
    }
  };
};
var Za = he({
  name: "ClientOnly",
  setup(e, {
    slots: t
  }) {
    const n = te(!1);
    return ft(() => n.value = !0), () => {
      var i;
      return n.value ? (i = t.default) == null ? void 0 : i.call(t) : null;
    };
  }
});
const Qa = ({
  popupContainer: e,
  visible: t,
  defaultContainer: n = "body",
  documentContainer: i
}) => {
  const r = te(e.value), o = te(), s = () => {
    const a = oo(e.value), l = a ? e.value : n, u = a ?? (i ? document.documentElement : oo(n));
    l !== r.value && (r.value = l), u !== o.value && (o.value = u);
  };
  return ft(() => s()), xe(t, (a) => {
    r.value !== e.value && a && s();
  }), {
    teleportContainer: r,
    containerRef: o
  };
}, X0 = ["onClick", "onMouseenter", "onMouseleave", "onFocusin", "onFocusout", "onContextmenu"];
var Dr = he({
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
    attrs: i
  }) {
    const {
      popupContainer: r
    } = ni(e), o = Ae("trigger"), s = X(() => Ka(i, X0)), a = xt(ri, void 0), l = X(() => [].concat(e.trigger)), u = /* @__PURE__ */ new Set(), c = xt(_s, void 0), {
      children: d,
      firstElement: h
    } = Ja(), E = te(), f = te(e.defaultPopupVisible), p = te(e.position), g = te({}), C = te({}), B = te({}), $ = te(), v = te({
      top: 0,
      left: 0
    });
    let F = null, k = null;
    const I = X(() => {
      var L;
      return (L = e.popupVisible) != null ? L : f.value;
    }), {
      teleportContainer: G,
      containerRef: K
    } = Qa({
      popupContainer: r,
      visible: I,
      documentContainer: !0
    }), {
      zIndex: w
    } = Fo("popup", {
      visible: I
    });
    let b = 0, m = !1, S = !1;
    const D = () => {
      b && (window.clearTimeout(b), b = 0);
    }, A = (L) => {
      if (e.alignPoint) {
        const {
          pageX: Z,
          pageY: Oe
        } = L;
        v.value = {
          top: Oe,
          left: Z
        };
      }
    }, H = () => {
      if (!h.value || !E.value || !K.value)
        return;
      const L = K.value.getBoundingClientRect(), Z = e.alignPoint ? {
        top: v.value.top,
        bottom: v.value.top,
        left: v.value.left,
        right: v.value.left,
        scrollTop: v.value.top,
        scrollBottom: v.value.top,
        scrollLeft: v.value.left,
        scrollRight: v.value.left,
        width: 0,
        height: 0
      } : Es(h.value, L), Oe = () => Es(E.value, L), Ot = Oe(), {
        style: yt,
        position: Bt
      } = j0(e.position, L, Z, Ot, {
        offset: e.popupOffset,
        translate: e.popupTranslate,
        customStyle: e.popupStyle,
        autoFitPosition: e.autoFitPosition
      });
      e.autoFitTransformOrigin && (C.value = {
        transformOrigin: z0(Bt)
      }), e.autoFitPopupMinWidth ? yt.minWidth = `${Z.width}px` : e.autoFitPopupWidth && (yt.width = `${Z.width}px`), p.value !== Bt && (p.value = Bt), g.value = yt, e.showArrow && zi(() => {
        B.value = V0(Bt, Z, Oe(), {
          customStyle: e.arrowStyle
        });
      });
    }, q = (L, Z) => {
      if (L === I.value && b === 0)
        return;
      const Oe = () => {
        f.value = L, t("update:popupVisible", L), t("popupVisibleChange", L), L && zi(() => {
          H();
        });
      };
      L || (F = null, k = null), Z ? (D(), L !== I.value && (b = window.setTimeout(Oe, Z))) : Oe();
    }, Q = (L) => {
      var Z;
      (Z = i.onClick) == null || Z.call(i, L), !(e.disabled || I.value && !e.clickToClose) && (l.value.includes("click") ? (A(L), q(!I.value)) : l.value.includes("contextMenu") && I.value && q(!1));
    }, me = (L) => {
      var Z;
      (Z = i.onMouseenter) == null || Z.call(i, L), !(e.disabled || !l.value.includes("hover")) && (A(L), q(!0, e.mouseEnterDelay));
    }, be = (L) => {
      c == null || c.onMouseenter(L), me(L);
    }, N = (L) => {
      var Z;
      (Z = i.onMouseleave) == null || Z.call(i, L), !(e.disabled || !l.value.includes("hover")) && q(!1, e.mouseLeaveDelay);
    }, M = (L) => {
      c == null || c.onMouseleave(L), N(L);
    }, W = (L) => {
      var Z;
      (Z = i.onFocusin) == null || Z.call(i, L), !(e.disabled || !l.value.includes("focus")) && q(!0, e.focusDelay);
    }, z = (L) => {
      var Z;
      (Z = i.onFocusout) == null || Z.call(i, L), !(e.disabled || !l.value.includes("focus")) && e.blurToClose && q(!1);
    }, j = (L) => {
      var Z;
      (Z = i.onContextmenu) == null || Z.call(i, L), !(e.disabled || !l.value.includes("contextMenu") || I.value && !e.clickToClose) && (A(L), q(!I.value), L.preventDefault());
    };
    Ca(_s, er({
      onMouseenter: be,
      onMouseleave: M,
      addChildRef: (L) => {
        u.add(L), c == null || c.addChildRef(L);
      },
      removeChildRef: (L) => {
        u.delete(L), c == null || c.removeChildRef(L);
      }
    }));
    const ve = () => {
      Yn(document.documentElement, "mousedown", Be), m = !1;
    }, se = H0(n, "content"), ye = X(() => {
      var L;
      return e.hideEmpty && i0((L = se.value) == null ? void 0 : L.call(se));
    }), Be = (L) => {
      var Z, Oe, Ot;
      if (!((Z = h.value) != null && Z.contains(L.target) || (Oe = E.value) != null && Oe.contains(L.target))) {
        for (const yt of u)
          if ((Ot = yt.value) != null && Ot.contains(L.target))
            return;
        ve(), q(!1);
      }
    }, ht = (L, Z) => {
      const [Oe, Ot] = L, {
        scrollTop: yt,
        scrollLeft: Bt
      } = Z;
      return Math.abs(yt - Oe) >= e.scrollToCloseDistance || Math.abs(Bt - Ot) >= e.scrollToCloseDistance;
    }, He = bs((L) => {
      if (I.value)
        if (e.scrollToClose || a != null && a.scrollToClose) {
          const Z = L.target;
          F || (F = [Z.scrollTop, Z.scrollLeft]), ht(F, Z) ? q(!1) : H();
        } else
          H();
    }), mt = () => {
      Yn(window, "scroll", vt), S = !1;
    }, vt = bs((L) => {
      const Z = L.target.documentElement;
      k || (k = [Z.scrollTop, Z.scrollLeft]), ht(k, Z) && (q(!1), mt());
    }), Ze = () => {
      I.value && H();
    }, gt = () => {
      Ze(), t("resize");
    }, Tt = (L) => {
      e.preventFocus && L.preventDefault();
    };
    c == null || c.addChildRef(E);
    const At = X(() => I.value ? e.openedClass : void 0);
    let Ee;
    xe(I, (L) => {
      if (e.clickOutsideToClose && (!L && m ? ve() : L && !m && (Zt(document.documentElement, "mousedown", Be), m = !0)), (e.scrollToClose || a != null && a.scrollToClose) && (Zt(window, "scroll", vt), S = !0), e.updateAtScroll || a != null && a.updateAtScroll) {
        if (L) {
          Ee = ws(h.value);
          for (const Z of Ee)
            Z.addEventListener("scroll", He);
        } else if (Ee) {
          for (const Z of Ee)
            Z.removeEventListener("scroll", He);
          Ee = void 0;
        }
      }
      L && (Qe.value = !0);
    }), xe(() => [e.autoFitPopupWidth, e.autoFitPopupMinWidth], () => {
      I.value && H();
    });
    const {
      createResizeObserver: qe,
      destroyResizeObserver: zt
    } = Y0({
      elementRef: K,
      onResize: Ze
    });
    ft(() => {
      if (qe(), I.value && (H(), e.clickOutsideToClose && !m && (Zt(document.documentElement, "mousedown", Be), m = !0), e.updateAtScroll || a != null && a.updateAtScroll)) {
        Ee = ws(h.value);
        for (const L of Ee)
          L.addEventListener("scroll", He);
      }
    }), tr(() => {
      I.value && H();
    }), yu(() => {
      q(!1);
    }), kn(() => {
      if (c == null || c.removeChildRef(E), zt(), m && ve(), S && mt(), Ee) {
        for (const L of Ee)
          L.removeEventListener("scroll", He);
        Ee = void 0;
      }
    });
    const Qe = te(I.value), nt = te(!1), jt = () => {
      nt.value = !0;
    }, un = () => {
      nt.value = !1, I.value && t("show");
    }, dn = () => {
      nt.value = !1, I.value || (Qe.value = !1, t("hide"));
    };
    return () => {
      var L, Z;
      return d.value = (Z = (L = n.default) == null ? void 0 : L.call(n)) != null ? Z : [], Ma(d.value, {
        class: At.value,
        onClick: Q,
        onMouseenter: me,
        onMouseleave: N,
        onFocusin: W,
        onFocusout: z,
        onContextmenu: j
      }), V(ct, null, [e.autoFixPosition ? V(Ss, {
        onResize: gt
      }, {
        default: () => [d.value]
      }) : d.value, V(Za, null, {
        default: () => [V(ka, {
          to: G.value,
          disabled: !e.renderToBody
        }, {
          default: () => [(!e.unmountOnClose || I.value || Qe.value) && !ye.value && V(Ss, {
            onResize: Ze
          }, {
            default: () => [V("div", zn({
              ref: E,
              class: [`${o}-popup`, `${o}-position-${p.value}`],
              style: {
                ...g.value,
                zIndex: w.value,
                pointerEvents: nt.value ? "none" : "auto"
              },
              "trigger-placement": p.value,
              onMouseenter: be,
              onMouseleave: M,
              onMousedown: Tt
            }, s.value), [V(to, {
              name: e.animationName,
              duration: e.duration,
              appear: !0,
              onBeforeEnter: jt,
              onAfterEnter: un,
              onBeforeLeave: jt,
              onAfterLeave: dn
            }, {
              default: () => {
                var Oe;
                return [st(V("div", {
                  class: `${o}-popup-wrapper`,
                  style: C.value
                }, [V("div", {
                  class: [`${o}-content`, e.contentClass],
                  style: e.contentStyle
                }, [(Oe = n.content) == null ? void 0 : Oe.call(n)]), e.showArrow && V("div", {
                  ref: $,
                  class: [`${o}-arrow`, e.arrowClass],
                  style: B.value
                }, null)]), [[at, I.value]])];
              }
            })])]
          })]
        })]
      })]);
    };
  }
});
const J0 = Object.assign(Dr, {
  install: (e, t) => {
    an(e, t);
    const n = sn(t);
    e.component(n + Dr.name, Dr);
  }
}), Z0 = 5;
var Q0 = he({
  name: "DotLoading",
  props: {
    size: {
      type: Number
    }
  },
  setup(e) {
    const t = Ae("dot-loading");
    return () => {
      const n = e.size ? {
        width: `${e.size}px`,
        height: `${e.size}px`
      } : {};
      return V("div", {
        class: t,
        style: {
          width: e.size ? `${e.size * 7}px` : void 0,
          height: e.size ? `${e.size}px` : void 0
        }
      }, [Array(Z0).fill(1).map((i, r) => V("div", {
        class: `${t}-item`,
        key: r,
        style: n
      }, null))]);
    };
  }
}), Ir = he({
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
    const n = Ae("spin"), i = xt(ri, void 0), r = X(() => [n, {
      [`${n}-loading`]: e.loading,
      [`${n}-with-tip`]: e.tip && !t.default
    }]), o = () => {
      if (t.icon) {
        const a = Oi(t.icon());
        if (a)
          return _a(a, {
            spin: !0
          });
      }
      return t.element ? t.element() : e.dot ? V(Q0, {
        size: e.size
      }, null) : i != null && i.slots.loading ? i.slots.loading() : V(oi, {
        spin: !0,
        size: e.size
      }, null);
    }, s = () => {
      var a, l, u;
      const c = e.size ? {
        fontSize: `${e.size}px`
      } : void 0, d = !!((a = t.tip) != null ? a : e.tip);
      return V(ct, null, [!e.hideIcon && V("div", {
        class: `${n}-icon`,
        style: c
      }, [o()]), d && V("div", {
        class: `${n}-tip`
      }, [(u = (l = t.tip) == null ? void 0 : l.call(t)) != null ? u : e.tip])]);
    };
    return () => V("div", {
      class: r.value
    }, [t.default ? V(ct, null, [t.default(), e.loading && V("div", {
      class: `${n}-mask`
    }, [V("div", {
      class: `${n}-mask-icon`
    }, [s()])])]) : s()]);
  }
});
const Mo = Object.assign(Ir, {
  install: (e, t) => {
    an(e, t);
    const n = sn(t);
    e.component(n + Ir.name, Ir);
  }
}), ed = {
  ESC: "Escape"
}, td = he({
  name: "Popover",
  components: {
    Trigger: J0
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
    const n = Ae("popover"), i = te(e.defaultPopupVisible), r = X(
      () => {
        var l;
        return (l = e.popupVisible) != null ? l : i.value;
      }
    ), o = (l) => {
      i.value = l, t("update:popupVisible", l), t("popupVisibleChange", l);
    }, s = X(() => [
      `${n}-popup-content`,
      e.contentClass
    ]), a = X(() => [
      `${n}-popup-arrow`,
      e.arrowClass
    ]);
    return {
      prefixCls: n,
      computedPopupVisible: r,
      contentCls: s,
      arrowCls: a,
      handlePopupVisibleChange: o
    };
  }
});
function nd(e, t, n, i, r, o) {
  const s = we("trigger");
  return P(), ue(s, {
    class: le(e.prefixCls),
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
    content: ne(() => [
      R("div", {
        class: le(`${e.prefixCls}-title`)
      }, [
        _e(e.$slots, "title", {}, () => [
          De(ie(e.title), 1)
        ])
      ], 2),
      R("div", {
        class: le(`${e.prefixCls}-content`)
      }, [
        _e(e.$slots, "content", {}, () => [
          De(ie(e.content), 1)
        ])
      ], 2)
    ]),
    default: ne(() => [
      _e(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "trigger", "position", "popup-visible", "content-class", "content-style", "arrow-class", "arrow-style", "popup-container", "onPopupVisibleChange"]);
}
var Pr = /* @__PURE__ */ Fe(td, [["render", nd]]);
const Gt = Object.assign(Pr, {
  install: (e, t) => {
    an(e, t);
    const n = sn(t);
    e.component(n + Pr.name, Pr);
  }
});
function id(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
const Cs = [
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
], rd = he({
  name: "Tag",
  components: {
    IconHover: $o,
    IconClose: xo,
    IconLoading: oi
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
    const { size: n } = ni(e), i = Ae("tag"), r = X(
      () => e.color && Cs.includes(e.color)
    ), o = X(
      () => e.color && !Cs.includes(e.color)
    ), s = te(e.defaultVisible), a = te(e.defaultChecked), l = X(() => {
      var g;
      return (g = e.visible) != null ? g : s.value;
    }), u = X(
      () => {
        var g;
        return e.checkable ? (g = e.checked) != null ? g : a.value : !0;
      }
    ), { mergedSize: c } = Ya(n), d = X(() => c.value === "mini" ? "small" : c.value), h = (g) => {
      s.value = !1, t("update:visible", !1), t("close", g);
    }, E = (g) => {
      if (e.checkable) {
        const C = !u.value;
        a.value = C, t("update:checked", C), t("check", C, g);
      }
    }, f = X(() => [
      i,
      `${i}-size-${d.value}`,
      {
        [`${i}-loading`]: e.loading,
        [`${i}-hide`]: !l.value,
        [`${i}-${e.color}`]: r.value,
        [`${i}-bordered`]: e.bordered,
        [`${i}-checkable`]: e.checkable,
        [`${i}-checked`]: u.value,
        [`${i}-custom-color`]: o.value
      }
    ]), p = X(() => {
      if (o.value)
        return {
          backgroundColor: e.color
        };
    });
    return {
      prefixCls: i,
      cls: f,
      style: p,
      computedVisible: l,
      computedChecked: u,
      handleClick: E,
      handleClose: h
    };
  }
});
function od(e, t, n, i, r, o) {
  const s = we("icon-close"), a = we("icon-hover"), l = we("icon-loading");
  return e.computedVisible ? (P(), Y("span", {
    key: 0,
    class: le(e.cls),
    style: Ke(e.style),
    onClick: t[0] || (t[0] = (...u) => e.handleClick && e.handleClick(...u))
  }, [
    e.$slots.icon ? (P(), Y("span", {
      key: 0,
      class: le(`${e.prefixCls}-icon`)
    }, [
      _e(e.$slots, "icon")
    ], 2)) : ce("v-if", !0),
    e.nowrap ? (P(), Y("span", {
      key: 1,
      class: le(`${e.prefixCls}-text`)
    }, [
      _e(e.$slots, "default")
    ], 2)) : _e(e.$slots, "default", { key: 2 }),
    e.closable ? (P(), ue(a, {
      key: 3,
      role: "button",
      "aria-label": "Close",
      prefix: e.prefixCls,
      class: le(`${e.prefixCls}-close-btn`),
      onClick: no(e.handleClose, ["stop"])
    }, {
      default: ne(() => [
        _e(e.$slots, "close-icon", {}, () => [
          V(s)
        ])
      ]),
      _: 3
    }, 8, ["prefix", "class", "onClick"])) : ce("v-if", !0),
    e.loading ? (P(), Y("span", {
      key: 4,
      class: le(`${e.prefixCls}-loading-icon`)
    }, [
      V(l)
    ], 2)) : ce("v-if", !0)
  ], 6)) : ce("v-if", !0);
}
var $r = /* @__PURE__ */ Fe(rd, [["render", od]]);
const Xn = Object.assign($r, {
  install: (e, t) => {
    an(e, t);
    const n = sn(t);
    e.component(n + $r.name, $r);
  }
});
function sd(e, t, n) {
  return X(() => !!(e[n] || t[n]));
}
const ad = he({
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
    const n = Ae("icon"), i = X(() => [n, `${n}-link`, { [`${n}-spin`]: e.spin }]), r = X(() => {
      const s = {};
      return e.size && (s.fontSize = _t(e.size) ? `${e.size}px` : e.size), e.rotate && (s.transform = `rotate(${e.rotate}deg)`), s;
    });
    return {
      cls: i,
      innerStyle: r,
      onClick: (s) => {
        t("click", s);
      }
    };
  }
}), ld = ["stroke-width", "stroke-linecap", "stroke-linejoin"];
function cd(e, t, n, i, r, o) {
  return P(), Y("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: le(e.cls),
    style: Ke(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...s) => e.onClick && e.onClick(...s))
  }, t[1] || (t[1] = [
    R("path", { d: "m14.1 25.414-4.95 4.95a6 6 0 0 0 8.486 8.485l8.485-8.485a6 6 0 0 0 0-8.485m7.779.707 4.95-4.95a6 6 0 1 0-8.486-8.485l-8.485 8.485a6 6 0 0 0 0 8.485" }, null, -1)
  ]), 14, ld);
}
var xr = /* @__PURE__ */ Fe(ad, [["render", cd]]);
const ud = Object.assign(xr, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + xr.name, xr);
  }
}), dd = he({
  name: "Link",
  components: { IconLink: ud, IconLoading: oi },
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
    const i = Ae("link"), r = sd(e, t, "icon"), o = (a) => {
      if (e.disabled || e.loading) {
        a.preventDefault();
        return;
      }
      n("click", a);
    };
    return {
      cls: X(() => [
        i,
        `${i}-status-${e.status}`,
        {
          [`${i}-disabled`]: e.disabled,
          [`${i}-loading`]: e.loading,
          [`${i}-hoverless`]: !e.hoverable,
          [`${i}-with-icon`]: e.loading || r.value
        }
      ]),
      prefixCls: i,
      showIcon: r,
      handleClick: o
    };
  }
}), fd = ["href"];
function pd(e, t, n, i, r, o) {
  const s = we("icon-loading"), a = we("icon-link");
  return P(), Y("a", {
    href: e.disabled ? void 0 : e.href,
    class: le(e.cls),
    onClick: t[0] || (t[0] = (...l) => e.handleClick && e.handleClick(...l))
  }, [
    e.loading || e.showIcon ? (P(), Y("span", {
      key: 0,
      class: le(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (P(), ue(s, { key: 0 })) : _e(e.$slots, "icon", { key: 1 }, () => [
        V(a)
      ])
    ], 2)) : ce("v-if", !0),
    _e(e.$slots, "default")
  ], 10, fd);
}
var Fr = /* @__PURE__ */ Fe(dd, [["render", pd]]);
const hd = Object.assign(Fr, {
  install: (e, t) => {
    an(e, t);
    const n = sn(t);
    e.component(n + Fr.name, Fr);
  }
}), md = (e) => {
  const t = te(!1), n = {
    overflow: "",
    width: "",
    boxSizing: ""
  };
  return {
    setOverflowHidden: () => {
      if (e.value) {
        const o = e.value;
        if (!t.value && o.style.overflow !== "hidden") {
          const s = l0(o);
          (s > 0 || a0(o)) && (n.overflow = o.style.overflow, n.width = o.style.width, n.boxSizing = o.style.boxSizing, o.style.overflow = "hidden", o.style.width = `${o.offsetWidth - s}px`, o.style.boxSizing = "border-box", t.value = !0);
        }
      }
    },
    resetOverflow: () => {
      if (e.value && t.value) {
        const o = e.value;
        o.style.overflow = n.overflow, o.style.width = n.width, o.style.boxSizing = n.boxSizing, t.value = !1;
      }
    }
  };
}, vd = he({
  name: "Message",
  components: {
    AIconHover: $o,
    IconInfoCircleFill: Ua,
    IconCheckCircleFill: Ha,
    IconExclamationCircleFill: qa,
    IconCloseCircleFill: Wa,
    IconClose: xo,
    IconLoading: oi
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
    const n = Ae("message");
    let i = 0;
    const r = () => {
      t("close");
    }, o = () => {
      e.duration > 0 && (i = window.setTimeout(r, e.duration));
    }, s = () => {
      i && (window.clearTimeout(i), i = 0);
    };
    return ft(() => {
      o();
    }), tr(() => {
      e.resetOnUpdate && (s(), o());
    }), Ta(() => {
      s();
    }), {
      handleMouseEnter: () => {
        e.resetOnHover && s();
      },
      handleMouseLeave: () => {
        e.resetOnHover && o();
      },
      prefixCls: n,
      handleClose: r
    };
  }
});
function gd(e, t, n, i, r, o) {
  const s = we("icon-info-circle-fill"), a = we("icon-check-circle-fill"), l = we("icon-exclamation-circle-fill"), u = we("icon-close-circle-fill"), c = we("icon-loading"), d = we("icon-close"), h = we("a-icon-hover");
  return P(), Y("li", {
    role: "alert",
    class: le([
      e.prefixCls,
      `${e.prefixCls}-${e.type}`,
      { [`${e.prefixCls}-closable`]: e.closable }
    ]),
    onMouseenter: t[1] || (t[1] = (...E) => e.handleMouseEnter && e.handleMouseEnter(...E)),
    onMouseleave: t[2] || (t[2] = (...E) => e.handleMouseLeave && e.handleMouseLeave(...E))
  }, [
    e.showIcon && !(e.type === "normal" && !e.$slots.icon) ? (P(), Y("span", {
      key: 0,
      class: le(`${e.prefixCls}-icon`)
    }, [
      _e(e.$slots, "icon", {}, () => [
        e.type === "info" ? (P(), ue(s, { key: 0 })) : e.type === "success" ? (P(), ue(a, { key: 1 })) : e.type === "warning" ? (P(), ue(l, { key: 2 })) : e.type === "error" ? (P(), ue(u, { key: 3 })) : e.type === "loading" ? (P(), ue(c, { key: 4 })) : ce("v-if", !0)
      ])
    ], 2)) : ce("v-if", !0),
    R("span", {
      class: le(`${e.prefixCls}-content`)
    }, [
      _e(e.$slots, "default")
    ], 2),
    e.closable ? (P(), Y("span", {
      key: 1,
      class: le(`${e.prefixCls}-close-btn`),
      onClick: t[0] || (t[0] = (...E) => e.handleClose && e.handleClose(...E))
    }, [
      V(h, null, {
        default: ne(() => [
          V(d)
        ]),
        _: 1
      })
    ], 2)) : ce("v-if", !0)
  ], 34);
}
var yd = /* @__PURE__ */ Fe(vd, [["render", gd]]);
function bd(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Eu(e);
}
var Ed = he({
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
    const n = Ae("message-list"), {
      zIndex: i
    } = Fo("message", {
      runOnMounted: !0
    });
    return () => {
      let r;
      return V(bu, {
        class: [n, `${n}-${e.position}`],
        name: "fade-message",
        tag: "ul",
        style: {
          zIndex: i.value
        },
        onAfterLeave: () => t.emit("afterClose")
      }, bd(r = e.messages.map((o) => {
        const s = {
          default: jn(o.content),
          icon: jn(o.icon)
        };
        return V(yd, {
          key: o.id,
          type: o.type,
          duration: o.duration,
          closable: o.closable,
          resetOnUpdate: o.resetOnUpdate,
          resetOnHover: o.resetOnHover,
          onClose: () => t.emit("close", o.id)
        }, s);
      })) ? r : {
        default: () => [r]
      });
    };
  }
});
class wd {
  constructor(t, n) {
    this.messageCount = 0, this.add = (o) => {
      var s;
      this.messageCount++;
      const a = (s = o.id) != null ? s : `__arco_message_${this.messageCount}`;
      if (this.messageIds.has(a))
        return this.update(a, o);
      const l = er({ id: a, ...o });
      return this.messages.value.push(l), this.messageIds.add(a), {
        close: () => this.remove(a)
      };
    }, this.update = (o, s) => {
      for (let a = 0; a < this.messages.value.length; a++)
        if (this.messages.value[a].id === o) {
          const l = !Pu(s.duration);
          Object.assign(this.messages.value[a], { ...s, id: o, resetOnUpdate: l });
          break;
        }
      return {
        close: () => this.remove(o)
      };
    }, this.remove = (o) => {
      for (let s = 0; s < this.messages.value.length; s++) {
        const a = this.messages.value[s];
        if (a.id === o) {
          wt(a.onClose) && a.onClose(o), this.messages.value.splice(s, 1), this.messageIds.delete(o);
          break;
        }
      }
    }, this.clear = () => {
      this.messages.value.splice(0);
    }, this.destroy = () => {
      this.messages.value.length === 0 && this.container && (ji(null, this.container), document.body.removeChild(this.container), this.container = null, gn[this.position] = void 0);
    };
    const { position: i = "top" } = t;
    this.container = Va("message"), this.messageIds = /* @__PURE__ */ new Set(), this.messages = te([]), this.position = i;
    const r = V(Ed, {
      messages: this.messages.value,
      position: i,
      onClose: this.remove,
      onAfterClose: this.destroy
    });
    (n ?? It._context) && (r.appContext = n ?? It._context), ji(r, this.container), document.body.appendChild(this.container);
  }
}
const gn = {}, el = [...Ga, "loading", "normal"], Di = el.reduce((e, t) => (e[t] = (n, i) => {
  nr(n) && (n = { content: n });
  const r = { type: t, ...n }, { position: o = "top" } = r;
  return gn[o] || (gn[o] = new wd(r, i)), gn[o].add(r);
}, e), {});
Di.clear = (e) => {
  var t;
  e ? (t = gn[e]) == null || t.clear() : Object.values(gn).forEach((n) => n == null ? void 0 : n.clear());
};
const It = {
  ...Di,
  install: (e) => {
    const t = {
      clear: Di.clear
    };
    for (const n of el)
      t[n] = (i, r = e._context) => Di[n](i, r);
    e.config.globalProperties.$message = t;
  },
  _context: null
}, Sd = ({
  modalRef: e,
  wrapperRef: t,
  draggable: n,
  alignCenter: i
}) => {
  const r = te(!1), o = te([0, 0]), s = te([0, 0]), a = te(), l = te([0, 0]), u = te([0, 0]), c = () => {
    var f, p, g;
    if (t.value && e.value) {
      const { top: C, left: B } = t.value.getBoundingClientRect(), { clientWidth: $, clientHeight: v } = t.value, { top: F, left: k, width: I, height: G } = e.value.getBoundingClientRect(), K = i.value ? 0 : (f = e.value) == null ? void 0 : f.offsetTop, w = k - B, b = F - C - K;
      (w !== ((p = s.value) == null ? void 0 : p[0]) || b !== ((g = s.value) == null ? void 0 : g[1])) && (s.value = [w, b]);
      const m = $ > I ? $ - I : 0, S = v > G ? v - G - K : 0;
      (m !== u.value[0] || S !== u.value[1]) && (u.value = [m, S]), K && (l.value = [0, 0 - K]);
    }
  }, d = (f) => {
    n.value && (f.preventDefault(), r.value = !0, c(), o.value = [f.x, f.y], Zt(window, "mousemove", h), Zt(window, "mouseup", E), Zt(window, "contextmenu", E));
  }, h = (f) => {
    if (r.value) {
      const p = f.x - o.value[0], g = f.y - o.value[1];
      let C = s.value[0] + p, B = s.value[1] + g;
      C < l.value[0] && (C = l.value[0]), C > u.value[0] && (C = u.value[0]), B < l.value[1] && (B = l.value[1]), B > u.value[1] && (B = u.value[1]), a.value = [C, B];
    }
  }, E = () => {
    r.value = !1, Yn(window, "mousemove", h), Yn(window, "mouseup", E);
  };
  return {
    position: a,
    handleMoveDown: d
  };
};
var _d = he({
  name: "Modal",
  components: {
    ClientOnly: Za,
    ArcoButton: ot,
    IconHover: $o,
    IconClose: xo,
    IconInfoCircleFill: Ua,
    IconCheckCircleFill: Ha,
    IconExclamationCircleFill: qa,
    IconCloseCircleFill: Wa
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
      popupContainer: i,
      alignCenter: r
    } = ni(e), o = Ae("modal"), {
      t: s
    } = Mu(), a = te(), l = te(), u = te(e.defaultVisible), c = X(() => {
      var j;
      return (j = e.visible) != null ? j : u.value;
    }), d = te(!1), h = X(() => e.okLoading || d.value), E = X(() => e.draggable && !e.fullscreen), {
      teleportContainer: f,
      containerRef: p
    } = Qa({
      popupContainer: i,
      visible: c
    }), g = te(c.value), C = X(() => e.okText || s("modal.okText")), B = X(() => e.cancelText || s("modal.cancelText")), {
      zIndex: $,
      isLastDialog: v
    } = Fo("dialog", {
      visible: c
    });
    let F = !1;
    const k = (j) => {
      e.escToClose && j.key === ed.ESC && v() && D(j);
    }, I = () => {
      e.escToClose && !F && (F = !0, Zt(document.documentElement, "keydown", k));
    }, G = () => {
      F = !1, Yn(document.documentElement, "keydown", k);
    };
    let K = 0;
    const {
      position: w,
      handleMoveDown: b
    } = Sd({
      wrapperRef: a,
      modalRef: l,
      draggable: E,
      alignCenter: r
    }), m = () => {
      K++, d.value && (d.value = !1), u.value = !1, t("update:visible", !1);
    }, S = async (j) => {
      const J = K, de = await new Promise(
        async (ve) => {
          var se;
          if (wt(e.onBeforeOk)) {
            let ye = e.onBeforeOk((Be = !0) => ve(Be));
            if ((vs(ye) || !ms(ye)) && (d.value = !0), vs(ye))
              try {
                ye = (se = await ye) != null ? se : !0;
              } catch (Be) {
                throw ye = !1, Be;
              }
            ms(ye) && ve(ye);
          } else
            ve(!0);
        }
      );
      J === K && (de ? (t("ok", j), m()) : d.value && (d.value = !1));
    }, D = (j) => {
      var J;
      let de = !0;
      wt(e.onBeforeCancel) && (de = (J = e.onBeforeCancel()) != null ? J : !1), de && (t("cancel", j), m());
    }, A = te(!1), H = (j) => {
      j.target === a.value && (A.value = !0);
    }, q = (j) => {
      e.mask && e.maskClosable && A.value && D(j);
    }, Q = () => {
      c.value && (!o0(a.value, document.activeElement) && document.activeElement instanceof HTMLElement && document.activeElement.blur(), t("open"));
    }, me = () => {
      c.value || (E.value && (w.value = void 0), g.value = !1, N(), t("close"));
    }, {
      setOverflowHidden: be,
      resetOverflow: N
    } = md(p);
    ft(() => {
      p.value = oo(e.popupContainer), c.value && (be(), e.escToClose && I());
    }), kn(() => {
      N(), G();
    }), xe(c, (j) => {
      u.value !== j && (u.value = j), j ? (t("beforeOpen"), g.value = !0, A.value = !1, be(), I()) : (t("beforeClose"), G());
    }), xe(n, () => {
      w.value && (w.value = void 0);
    });
    const M = X(() => [`${o}-wrapper`, {
      [`${o}-wrapper-align-center`]: e.alignCenter && !e.fullscreen,
      [`${o}-wrapper-moved`]: !!w.value
    }]), W = X(() => [`${o}`, e.modalClass, {
      [`${o}-simple`]: e.simple,
      [`${o}-draggable`]: E.value,
      [`${o}-fullscreen`]: e.fullscreen
    }]), z = X(() => {
      var j;
      const J = {
        ...(j = e.modalStyle) != null ? j : {}
      };
      return e.width && !e.fullscreen && (J.width = _t(e.width) ? `${e.width}px` : e.width), !e.alignCenter && e.top && (J.top = _t(e.top) ? `${e.top}px` : e.top), w.value && (J.transform = `translate(${w.value[0]}px, ${w.value[1]}px)`), J;
    });
    return {
      prefixCls: o,
      mounted: g,
      computedVisible: c,
      containerRef: p,
      wrapperRef: a,
      mergedModalStyle: z,
      okDisplayText: C,
      cancelDisplayText: B,
      zIndex: $,
      handleOk: S,
      handleCancel: D,
      handleMaskClick: q,
      handleMaskMouseDown: H,
      handleOpen: Q,
      handleClose: me,
      mergedOkLoading: h,
      modalRef: l,
      wrapperCls: M,
      modalCls: W,
      teleportContainer: f,
      handleMoveDown: b
    };
  }
});
function Cd(e, t, n, i, r, o) {
  const s = we("icon-info-circle-fill"), a = we("icon-check-circle-fill"), l = we("icon-exclamation-circle-fill"), u = we("icon-close-circle-fill"), c = we("icon-close"), d = we("icon-hover"), h = we("arco-button"), E = we("client-only");
  return P(), ue(E, null, {
    default: ne(() => [
      (P(), ue(ka, {
        to: e.teleportContainer,
        disabled: !e.renderToBody
      }, [
        !e.unmountOnClose || e.computedVisible || e.mounted ? st((P(), Y("div", zn({
          key: 0,
          class: `${e.prefixCls}-container`,
          style: { zIndex: e.zIndex }
        }, e.$attrs), [
          V(to, {
            name: e.maskAnimationName,
            appear: ""
          }, {
            default: ne(() => [
              e.mask ? st((P(), Y("div", {
                key: 0,
                ref: "maskRef",
                class: le(`${e.prefixCls}-mask`),
                style: Ke(e.maskStyle)
              }, null, 6)), [
                [at, e.computedVisible]
              ]) : ce("v-if", !0)
            ]),
            _: 1
          }, 8, ["name"]),
          R("div", {
            ref: "wrapperRef",
            class: le(e.wrapperCls),
            onClick: t[2] || (t[2] = no((...f) => e.handleMaskClick && e.handleMaskClick(...f), ["self"])),
            onMousedown: t[3] || (t[3] = no((...f) => e.handleMaskMouseDown && e.handleMaskMouseDown(...f), ["self"]))
          }, [
            V(to, {
              name: e.modalAnimationName,
              appear: "",
              onAfterEnter: e.handleOpen,
              onAfterLeave: e.handleClose,
              persisted: ""
            }, {
              default: ne(() => [
                st(R("div", {
                  ref: "modalRef",
                  class: le(e.modalCls),
                  style: Ke(e.mergedModalStyle)
                }, [
                  !e.hideTitle && (e.$slots.title || e.title || e.closable) ? (P(), Y("div", {
                    key: 0,
                    class: le(`${e.prefixCls}-header`),
                    onMousedown: t[1] || (t[1] = (...f) => e.handleMoveDown && e.handleMoveDown(...f))
                  }, [
                    e.$slots.title || e.title ? (P(), Y("div", {
                      key: 0,
                      class: le([
                        `${e.prefixCls}-title`,
                        `${e.prefixCls}-title-align-${e.titleAlign}`
                      ])
                    }, [
                      e.messageType ? (P(), Y("div", {
                        key: 0,
                        class: le(`${e.prefixCls}-title-icon`)
                      }, [
                        e.messageType === "info" ? (P(), ue(s, { key: 0 })) : ce("v-if", !0),
                        e.messageType === "success" ? (P(), ue(a, { key: 1 })) : ce("v-if", !0),
                        e.messageType === "warning" ? (P(), ue(l, { key: 2 })) : ce("v-if", !0),
                        e.messageType === "error" ? (P(), ue(u, { key: 3 })) : ce("v-if", !0)
                      ], 2)) : ce("v-if", !0),
                      _e(e.$slots, "title", {}, () => [
                        De(ie(e.title), 1)
                      ])
                    ], 2)) : ce("v-if", !0),
                    !e.simple && e.closable ? (P(), Y("div", {
                      key: 1,
                      tabindex: "-1",
                      role: "button",
                      "aria-label": "Close",
                      class: le(`${e.prefixCls}-close-btn`),
                      onClick: t[0] || (t[0] = (...f) => e.handleCancel && e.handleCancel(...f))
                    }, [
                      V(d, null, {
                        default: ne(() => [
                          V(c)
                        ]),
                        _: 1
                      })
                    ], 2)) : ce("v-if", !0)
                  ], 34)) : ce("v-if", !0),
                  R("div", {
                    class: le([`${e.prefixCls}-body`, e.bodyClass]),
                    style: Ke(e.bodyStyle)
                  }, [
                    _e(e.$slots, "default")
                  ], 6),
                  e.footer ? (P(), Y("div", {
                    key: 1,
                    class: le(`${e.prefixCls}-footer`)
                  }, [
                    _e(e.$slots, "footer", {}, () => [
                      e.hideCancel ? ce("v-if", !0) : (P(), ue(h, zn({ key: 0 }, e.cancelButtonProps, { onClick: e.handleCancel }), {
                        default: ne(() => [
                          De(ie(e.cancelDisplayText), 1)
                        ]),
                        _: 1
                      }, 16, ["onClick"])),
                      V(h, zn({ type: "primary" }, e.okButtonProps, {
                        loading: e.mergedOkLoading,
                        onClick: e.handleOk
                      }), {
                        default: ne(() => [
                          De(ie(e.okDisplayText), 1)
                        ]),
                        _: 1
                      }, 16, ["loading", "onClick"])
                    ])
                  ], 2)) : ce("v-if", !0)
                ], 6), [
                  [at, e.computedVisible]
                ])
              ]),
              _: 3
            }, 8, ["name", "onAfterEnter", "onAfterLeave"])
          ], 34)
        ], 16)), [
          [at, e.computedVisible || e.mounted]
        ]) : ce("v-if", !0)
      ], 8, ["to", "disabled"]))
    ]),
    _: 3
  });
}
var Ii = /* @__PURE__ */ Fe(_d, [["render", Cd]]);
const Mr = (e, t) => {
  let n = Va("modal");
  const i = () => {
    u.component && (u.component.props.visible = !1), wt(e.onOk) && e.onOk();
  }, r = () => {
    u.component && (u.component.props.visible = !1), wt(e.onCancel) && e.onCancel();
  }, o = async () => {
    await zi(), n && (ji(null, n), document.body.removeChild(n)), n = null, wt(e.onClose) && e.onClose();
  }, s = () => {
    u.component && (u.component.props.visible = !1);
  }, a = (c) => {
    u.component && Object.entries(c).forEach(([d, h]) => {
      u.component.props[d] = h;
    });
  }, u = V(Ii, {
    ...{
      visible: !0,
      renderToBody: !1,
      unmountOnClose: !0,
      onOk: i,
      onCancel: r,
      onClose: o
    },
    ...Ka(e, ["content", "title", "footer", "visible", "unmountOnClose", "onOk", "onCancel", "onClose"]),
    footer: typeof e.footer == "boolean" ? e.footer : void 0
  }, {
    default: jn(e.content),
    title: jn(e.title),
    footer: typeof e.footer != "boolean" ? jn(e.footer) : void 0
  });
  return (t ?? so._context) && (u.appContext = t ?? so._context), ji(u, n), document.body.appendChild(n), {
    close: s,
    update: a
  };
}, Nr = {
  open: Mr,
  confirm: (e, t) => {
    const n = {
      simple: !0,
      messageType: "warning",
      ...e
    };
    return Mr(n, t);
  },
  ...Ga.reduce((e, t) => (e[t] = (n, i) => {
    const r = {
      simple: !0,
      hideCancel: !0,
      messageType: t,
      ...n
    };
    return Mr(r, i);
  }, e), {})
}, so = Object.assign(Ii, {
  ...Nr,
  install: (e, t) => {
    an(e, t);
    const n = sn(t);
    e.component(n + Ii.name, Ii);
    const i = {};
    for (const r of Object.keys(Nr))
      i[r] = (o, s = e._context) => Nr[r](o, s);
    e.config.globalProperties.$modal = i;
  },
  _context: null
});
function kd(e, t) {
  if (e.ownerDocument !== t.ownerDocument)
    try {
      return t.ownerDocument.importNode(e, !0);
    } catch {
    }
  return e;
}
function ao(e, t) {
  return t.appendChild(kd(e, t));
}
function bi(e, t) {
  return ao(t, e), e;
}
var lo = 2, tl = {
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
  "font-size": lo,
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
  "stroke-width": lo,
  "text-anchor": 1,
  "text-decoration": 1,
  "text-rendering": 1,
  "unicode-bidi": 1,
  visibility: 1,
  "word-spacing": 1,
  "writing-mode": 1
};
function Td(e, t) {
  return tl[t] ? e.style[t] : e.getAttributeNS(null, t);
}
function nl(e, t, n) {
  var i = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), r = tl[i];
  r ? (r === lo && typeof n == "number" && (n = String(n) + "px"), e.style[i] = n) : e.setAttributeNS(null, t, n);
}
function Ad(e, t) {
  var n = Object.keys(t), i, r;
  for (i = 0, r; r = n[i]; i++)
    nl(e, r, t[r]);
}
function Pi(e, t, n) {
  if (typeof t == "string")
    if (n !== void 0)
      nl(e, t, n);
    else
      return Td(e, t);
  else
    Ad(e, t);
  return e;
}
var No = {
  svg: "http://www.w3.org/2000/svg"
}, ks = '<svg xmlns="' + No.svg + '"';
function Od(e) {
  var t = !1;
  e.substring(0, 4) === "<svg" ? e.indexOf(No.svg) === -1 && (e = ks + e.substring(4)) : (e = ks + ">" + e + "</svg>", t = !0);
  var n = Bd(e);
  if (!t)
    return n;
  for (var i = document.createDocumentFragment(), r = n.firstChild; r.firstChild; )
    i.appendChild(r.firstChild);
  return i;
}
function Bd(e) {
  var t;
  return t = new DOMParser(), t.async = !1, t.parseFromString(e, "text/xml");
}
function Pt(e, t) {
  var n;
  return e = e.trim(), e.charAt(0) === "<" ? (n = Od(e).firstChild, n = document.importNode(n, !0)) : n = document.createElementNS(No.svg, e), t && Pi(n, t), n;
}
function Dd(e) {
  var t = e.parentNode;
  return t && t.removeChild(e), e;
}
const Lo = Object.prototype.toString, Id = Object.prototype.hasOwnProperty;
function Pd(e) {
  return e === void 0;
}
function $d(e) {
  return Lo.call(e) === "[object Array]";
}
function xd(e) {
  return Lo.call(e) === "[object Object]";
}
function Fd(e) {
  const t = Lo.call(e);
  return t === "[object Function]" || t === "[object AsyncFunction]" || t === "[object GeneratorFunction]" || t === "[object AsyncGeneratorFunction]" || t === "[object Proxy]";
}
function Md(e, t) {
  return Id.call(e, t);
}
function Nd(e, t) {
  const n = zd(t);
  let i;
  return Ld(e, function(r, o) {
    if (n(r, o))
      return i = r, !1;
  }), i;
}
function Ld(e, t) {
  let n, i;
  if (Pd(e))
    return;
  const r = $d(e) ? Vd : jd;
  for (let o in e)
    if (Md(e, o) && (n = e[o], i = t(n, r(o)), i === !1))
      return n;
}
function Rd(e, t) {
  return !!Nd(e, t);
}
function zd(e) {
  return Fd(e) ? e : (t) => t === e;
}
function jd(e) {
  return e;
}
function Vd(e) {
  return Number(e);
}
function Ud(e, t) {
  return t = { exports: {} }, e(t, t.exports), t.exports;
}
var Hd = Ud(function(e) {
  var t = e.exports = function(n, i) {
    if (i || (i = 16), n === void 0 && (n = 128), n <= 0) return "0";
    for (var r = Math.log(Math.pow(2, n)) / Math.log(i), o = 2; r === 1 / 0; o *= 2)
      r = Math.log(Math.pow(2, n / o)) / Math.log(i) * o;
    for (var s = r - Math.floor(r), a = "", o = 0; o < Math.floor(r); o++) {
      var l = Math.floor(Math.random() * i).toString(i);
      a = l + a;
    }
    if (s) {
      var u = Math.pow(i, s), l = Math.floor(Math.random() * u).toString(i);
      a = l + a;
    }
    var c = parseInt(a, i);
    return c !== 1 / 0 && c >= Math.pow(2, n) ? t(n, i) : a;
  };
  t.rack = function(n, i, r) {
    var o = function(a) {
      var l = 0;
      do {
        if (l++ > 10)
          if (r) n += r;
          else throw new Error("too many ID collisions, use more bits");
        var u = t(n, i);
      } while (Object.hasOwnProperty.call(s, u));
      return s[u] = a, u;
    }, s = o.hats = {};
    return o.get = function(a) {
      return o.hats[a];
    }, o.set = function(a, l) {
      return o.hats[a] = l, o;
    }, o.bits = n || 128, o.base = i || 16, o;
  };
});
function Ct(e) {
  if (!(this instanceof Ct))
    return new Ct(e);
  e = e || [128, 36, 1], this._seed = e.length ? Hd.rack(e[0], e[1], e[2]) : e;
}
Ct.prototype.next = function(e) {
  return this._seed(e || !0);
};
Ct.prototype.nextPrefixed = function(e, t) {
  var n;
  do
    n = e + this.next(!0);
  while (this.assigned(n));
  return this.claim(n, t), n;
};
Ct.prototype.claim = function(e, t) {
  this._seed.set(e, t || !0);
};
Ct.prototype.assigned = function(e) {
  return this._seed.get(e) || !1;
};
Ct.prototype.unclaim = function(e) {
  delete this._seed.hats[e];
};
Ct.prototype.clear = function() {
  var e = this._seed.hats, t;
  for (t in e)
    this.unclaim(t);
};
function qd(e) {
  if (!e)
    return;
  const t = e.get("extensionElements");
  if (t)
    return t.get("values");
}
function rr(e, t) {
  const n = qd(e);
  return !n || !n.length ? [] : t ? n.filter((i) => O(i, t)) : n;
}
function or(e, t) {
  return rr(e, `flowable:${t}`);
}
const Dt = {
  Activity: "var(--color-activity)",
  StartEvent: "var(--color-start-event)",
  EndEvent: "var(--color-end-event)",
  BoundaryEvent: "var(--color-boundary-event)",
  CatchEvent: "var(--color-catch-event)",
  Gateway: "var(--color-gateway)",
  Group: "var(--color-element)",
  default: "var(--color-element)"
}, Wd = {
  Connection: "var(--color-connection)"
}, Lr = 0.95, Gd = 1, Ts = 3;
class Kd extends _u {
  constructor(n, i, r, o, s, a, l) {
    super(n, i, r, o, s, a, l);
    y(this, "_overrideColor");
    const u = this.handlers, c = n && n.defaultFillColor, d = n && n.defaultStrokeColor;
    this._overrideColor = (n == null ? void 0 : n.overrideColor) || !1;
    function h(w) {
      return r.computeStyle(w, ["no-fill"], {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: hs,
        strokeWidth: 2
      });
    }
    function E(w) {
      return r.computeStyle(w, {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: hs,
        strokeWidth: 2,
        fill: "white"
      });
    }
    function f(w, b, m) {
      m = h(m);
      const S = Pt("path", { ...m, d: b });
      return bi(w, S), S;
    }
    function p(w, b, m) {
      const S = Pt("text", m);
      return S.innerHTML = b, bi(w, S), S;
    }
    function g(w, b, m, S, D) {
      xd(S) && (D = S, S = 0), S = S || 0, D = E(D);
      const A = b / 2, H = m / 2, q = Pt("circle", {
        cx: A,
        cy: H,
        r: Math.round((b + m) / 4 - S),
        ...D
      });
      return bi(w, q), q;
    }
    function C(w, b, m, S) {
      const D = b / 2, A = m / 2, q = [
        { x: D, y: 0 },
        { x: b, y: A },
        { x: D, y: m },
        { x: 0, y: A }
      ].map(function(me) {
        return me.x + "," + me.y;
      }).join(" ");
      S = E(S);
      const Q = Pt("polygon", {
        ...S,
        points: q
      });
      return bi(w, Q), Q;
    }
    function B(w, b, m = {}) {
      return C(w, b.width, b.height, {
        fill: ke(b, c, m.fill),
        fillOpacity: Lr,
        stroke: pe(b, d, m.stroke)
      });
    }
    const $ = {
      "bpmn:MessageEventDefinition": function(w, b, m = {}, S) {
        const D = o.getScaledPath("EVENT_MESSAGE", {
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.235,
            my: 0.315
          }
        }), A = S ? pe(b, d, m.stroke) : ke(b, c, m.fill), H = S ? ke(b, c, m.fill) : pe(b, d, m.stroke);
        return f(w, D, {
          fill: A,
          stroke: H,
          strokeWidth: 1
        });
      },
      "bpmn:TimerEventDefinition": function(w, b, m = {}) {
        const S = g(w, b.width, b.height, 0.2 * b.height, {
          fill: ke(b, c, m.fill),
          stroke: pe(b, d, m.stroke),
          strokeWidth: 2
        }), D = o.getScaledPath("EVENT_TIMER_WH", {
          xScaleFactor: 0.75,
          yScaleFactor: 0.75,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.5,
            my: 0.5
          }
        });
        f(w, D, {
          stroke: pe(b, d, m.stroke),
          strokeWidth: 2
        });
        for (let A = 0; A < 12; A++) {
          const H = o.getScaledPath("EVENT_TIMER_LINE", {
            xScaleFactor: 0.75,
            yScaleFactor: 0.75,
            containerWidth: b.width,
            containerHeight: b.height,
            position: {
              mx: 0.5,
              my: 0.5
            }
          }), q = b.width / 2, Q = b.height / 2;
          f(w, H, {
            strokeWidth: 1,
            stroke: pe(b, d, m.stroke),
            transform: "rotate(" + A * 30 + "," + Q + "," + q + ")"
          });
        }
        return S;
      },
      "bpmn:EscalationEventDefinition": function(w, b, m = {}, S) {
        const D = o.getScaledPath("EVENT_ESCALATION", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.5,
            my: 0.2
          }
        }), A = S ? pe(b, d, m.stroke) : ke(b, c, m.fill);
        return f(w, D, {
          fill: A,
          stroke: pe(b, d, m.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:ConditionalEventDefinition": function(w, b, m = {}) {
        const S = o.getScaledPath("EVENT_CONDITIONAL", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.5,
            my: 0.222
          }
        });
        return f(w, S, {
          fill: ke(b, c, m.fill),
          stroke: pe(b, d, m.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:LinkEventDefinition": function(w, b, m = {}, S) {
        const D = o.getScaledPath("EVENT_LINK", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.57,
            my: 0.263
          }
        }), A = S ? pe(b, d, m.stroke) : ke(b, c, m.fill);
        return f(w, D, {
          fill: A,
          stroke: pe(b, d, m.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:ErrorEventDefinition": function(w, b, m = {}, S) {
        const D = o.getScaledPath("EVENT_ERROR", {
          xScaleFactor: 1.1,
          yScaleFactor: 1.1,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.2,
            my: 0.722
          }
        }), A = S ? pe(b, d, m.stroke) : ke(b, c, m.fill);
        return f(w, D, {
          fill: A,
          stroke: pe(b, d, m.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:CancelEventDefinition": function(w, b, m = {}, S) {
        const D = o.getScaledPath("EVENT_CANCEL_45", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.638,
            my: -0.055
          }
        }), A = S ? pe(b, d, m.stroke) : "none", H = f(w, D, {
          fill: A,
          stroke: pe(b, d, m.stroke),
          strokeWidth: 1
        });
        return ku(H, 45), H;
      },
      "bpmn:CompensateEventDefinition": function(w, b, m = {}, S) {
        const D = o.getScaledPath("EVENT_COMPENSATION", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.22,
            my: 0.5
          }
        }), A = S ? pe(b, d, m.stroke) : ke(b, c, m.fill);
        return f(w, D, {
          fill: A,
          stroke: pe(b, d, m.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:SignalEventDefinition": function(w, b, m = {}, S) {
        const D = o.getScaledPath("EVENT_SIGNAL", {
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.5,
            my: 0.2
          }
        }), A = S ? pe(b, d, m.stroke) : ke(b, c, m.fill);
        return f(w, D, {
          strokeWidth: 1,
          fill: A,
          stroke: pe(b, d, m.stroke)
        });
      },
      "bpmn:MultipleEventDefinition": function(w, b, m = {}, S) {
        const D = o.getScaledPath("EVENT_MULTIPLE", {
          xScaleFactor: 1.1,
          yScaleFactor: 1.1,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.222,
            my: 0.36
          }
        }), { stroke: A } = m, H = S ? pe(b, d, A) : ke(b, c, m.fill);
        return f(w, D, {
          fill: H,
          stroke: A,
          strokeWidth: 1
        });
      },
      "bpmn:ParallelMultipleEventDefinition": function(w, b, m = {}) {
        const S = o.getScaledPath("EVENT_PARALLEL_MULTIPLE", {
          xScaleFactor: 1.2,
          yScaleFactor: 1.2,
          containerWidth: b.width,
          containerHeight: b.height,
          position: {
            mx: 0.458,
            my: 0.194
          }
        });
        return f(w, S, {
          fill: ke(b, c, m.fill),
          stroke: pe(b, d, m.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:TerminateEventDefinition": function(w, b, m = {}) {
        return g(w, b.width, b.height, 8, {
          fill: pe(b, d, m.stroke),
          stroke: pe(b, d, m.stroke),
          strokeWidth: 4
        });
      }
    };
    function v(w, b, m = {}) {
      const S = wr(w), D = Cu(S);
      return or(
        S,
        "VariableListenerEventDefinition"
      ).length ? $["bpmn:MultipleEventDefinition"](
        b,
        w,
        m,
        D
      ) : S.get("eventDefinitions") && S.get("eventDefinitions").length > 1 && S.get("parallelMultiple") ? $["bpmn:ParallelMultipleEventDefinition"](
        b,
        w,
        m
      ) : it(S, "bpmn:MessageEventDefinition") ? $["bpmn:MessageEventDefinition"](
        b,
        w,
        m,
        D
      ) : it(S, "bpmn:TimerEventDefinition") ? $["bpmn:TimerEventDefinition"](b, w, m) : it(S, "bpmn:ConditionalEventDefinition") ? $["bpmn:ConditionalEventDefinition"](b, w, m) : it(S, "bpmn:SignalEventDefinition") ? $["bpmn:SignalEventDefinition"](
        b,
        w,
        m,
        D
      ) : it(S, "bpmn:EscalationEventDefinition") ? $["bpmn:EscalationEventDefinition"](
        b,
        w,
        m,
        D
      ) : it(S, "bpmn:LinkEventDefinition") ? $["bpmn:LinkEventDefinition"](b, w, m, D) : it(S, "bpmn:ErrorEventDefinition") ? $["bpmn:ErrorEventDefinition"](
        b,
        w,
        m,
        D
      ) : it(S, "bpmn:CancelEventDefinition") ? $["bpmn:CancelEventDefinition"](
        b,
        w,
        m,
        D
      ) : it(S, "bpmn:CompensateEventDefinition") ? $["bpmn:CompensateEventDefinition"](
        b,
        w,
        m,
        D
      ) : it(S, "bpmn:TerminateEventDefinition") ? $["bpmn:TerminateEventDefinition"](b, w, m) : null;
    }
    const F = (w, b, m = {}) => {
      m = $n(m, ["fill", "stroke"]);
      const S = u["bpmn:Task"](w, b, m), D = b.businessObject.get("type"), A = {
        class: "custom-service",
        fill: pe(b, c, m.stroke),
        stroke: pe(b, d, m.stroke),
        strokeWidth: 0
      }, H = Pt("g", { class: "custom-node-marker" });
      switch (w.insertBefore(H, null), D) {
        case "ai":
          const q = o.getStaticPath("SERVICE_AI");
          f(w, q, A);
          break;
        case "shell":
          const Q = o.getStaticPath("SERVICE_SHELL");
          f(w, Q, A);
          break;
        case "copy":
          const me = o.getStaticPath("SERVICE_COPY");
          f(w, me, A);
          break;
        case "camel":
          const be = o.getStaticPath("SERVICE_CAMEL");
          f(w, be, A);
          break;
        case "dmn":
          const N = o.getStaticPath("SERVICE_DMN");
          f(w, N, A);
          break;
        case "http":
          const M = o.getStaticPath("SERVICE_HTTP_1");
          f(w, M, A);
          const W = o.getStaticPath("SERVICE_HTTP_2");
          f(w, W, A);
          break;
        case "ws":
          const z = o.getStaticPath("SERVICE_WS_1");
          f(w, z, A);
          const j = o.getStaticPath("SERVICE_WS_2");
          f(w, j, A);
          break;
        case "email":
          const J = o.getStaticPath("SERVICE_MAIL_1");
          f(w, J, A);
          const de = o.getStaticPath("SERVICE_MAIL_2");
          f(w, de, A);
          break;
        case "mq":
          const ve = o.getStaticPath("SERVICE_MQ_1");
          f(w, ve, A);
          const se = o.getStaticPath("SERVICE_MQ_2");
          f(w, se, A);
          break;
        case "mqtt":
          const ye = o.getStaticPath("SERVICE_MQTT");
          f(w, ye, A);
          break;
        case "sc":
          const Be = o.getStaticPath("SERVICE_SC_1");
          f(w, Be, A);
          const ht = o.getStaticPath("SERVICE_SC_2");
          f(w, ht, A);
          break;
        case "sql":
          const He = o.getStaticPath("SERVICE_DB_1");
          f(w, He, A);
          const mt = o.getStaticPath("SERVICE_DB_2");
          f(w, mt, A);
          const vt = o.getStaticPath("SERVICE_DB_3");
          f(w, vt, A);
          break;
        case "dubbo":
          const Ze = o.getStaticPath("SERVICE_SC_1");
          f(w, Ze, A);
          const gt = o.getStaticPath("SERVICE_SC_2");
          f(w, gt, {
            ...A,
            transform: "scale(0.8 0.8) translate(4 0)"
          }), p(w, "dubbo", { ...A, x: 8, y: 17, fontSize: 4 });
          break;
        case "rest":
          const Tt = o.getStaticPath("SERVICE_REST_1");
          f(w, Tt, A);
          const At = o.getStaticPath("SERVICE_REST_2");
          f(w, At, A);
          break;
        default:
          g(w, 10, 10, 0, {
            fill: ke(b, c, m.fill),
            stroke: "none",
            transform: "translate(6, 6)"
          });
          const Ee = o.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
              x: 12,
              y: 18
            }
          });
          f(w, Ee, {
            fill: ke(b, c, m.fill),
            stroke: pe(b, d, m.stroke),
            strokeWidth: 1
          }), g(w, 10, 10, 0, {
            fill: ke(b, c, m.fill),
            stroke: "none",
            transform: "translate(11, 10)"
          });
          const qe = o.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
              x: 17,
              y: 22
            }
          });
          f(w, qe, {
            fill: ke(b, c, m.fill),
            stroke: pe(b, d, m.stroke),
            strokeWidth: 1
          });
      }
      return S;
    }, k = (w, b, m = {}) => {
      const { renderIcon: S = !0 } = m;
      m = $n(m, ["fill", "stroke"]), wr(b).get("isInterrupting") === !1 && (m = {
        ...m,
        strokeDasharray: "6"
      });
      const A = g(w, b.width, b.height, {
        fillOpacity: Lr,
        ...m,
        fill: ke(b, c, m.fill),
        stroke: pe(b, d, m.stroke)
      });
      return S && v(b, w, m), A;
    }, I = (w, b, m = {}) => {
      const { renderIcon: S = !0 } = m;
      m = $n(m, ["fill", "stroke"]);
      const D = wr(b), A = D.get("cancelActivity");
      m = {
        strokeWidth: 1.5,
        fill: ke(b, c, m.fill),
        fillOpacity: Gd,
        stroke: pe(b, d, m.stroke)
      }, A === !1 && (m.strokeDasharray = "6");
      const H = g(w, b.width, b.height, m);
      return g(w, b.width, b.height, Ts, {
        ...m,
        fill: "none"
      }), S && v(b, w, m), H;
    }, G = (w, b, m = {}) => {
      const { renderIcon: S = !0 } = m;
      m = $n(m, ["fill", "stroke"]);
      const D = g(w, b.width, b.height, {
        fillOpacity: Lr,
        ...m,
        fill: ke(b, c, m.fill),
        stroke: pe(b, d, m.stroke),
        strokeWidth: 1.5
      });
      return g(w, b.width, b.height, Ts, {
        fill: "none",
        stroke: pe(b, d, m.stroke),
        strokeWidth: 1.5
      }), S && v(b, w, m), D;
    }, K = (w, b, m = {}) => {
      m = $n(m, ["fill", "stroke"]);
      const S = B(w, b, m), D = o.getScaledPath("GATEWAY_EXCLUSIVE", {
        xScaleFactor: 0.4,
        yScaleFactor: 0.4,
        containerWidth: b.width,
        containerHeight: b.height,
        position: {
          mx: 0.32,
          my: 0.3
        }
      });
      return f(w, D, {
        fill: pe(b, d, m.stroke),
        stroke: pe(b, d, m.stroke),
        strokeWidth: 1
      }), S;
    };
    this.handlers["bpmn:ServiceTask"] = F, this.handlers["bpmn:StartEvent"] = k, this.handlers["bpmn:BoundaryEvent"] = I, this.handlers["bpmn:IntermediateEvent"] = G, this.handlers["bpmn:ExclusiveGateway"] = K;
  }
  drawShape(n, i, r = {}) {
    let o, s = "var(--color-bg-5)";
    if (!this._overrideColor) {
      const a = ps(i);
      o = a.get("color:border-color") || a.get("bioc:stroke"), s = a.get("color:background-color") || a.get("bioc:fill") || "var(--color-bg-5)";
    }
    return O(i, "bpmn:Activity") ? (r = { stroke: o || Dt.Activity, fill: s, ...r }, super.drawShape(n, i, r)) : O(i, "bpmn:StartEvent") ? (r = { stroke: o || Dt.StartEvent, fill: s, ...r }, super.drawShape(n, i, r)) : O(i, "bpmn:EndEvent") ? (r = { stroke: o || Dt.EndEvent, fill: s, ...r }, super.drawShape(n, i, r)) : O(i, "bpmn:BoundaryEvent") ? (r = { stroke: o || Dt.BoundaryEvent, fill: s, ...r }, super.drawShape(n, i, r)) : O(i, "bpmn:CatchEvent") || O(i, "bpmn:ThrowEvent") ? (r = { stroke: o || Dt.CatchEvent, fill: s, ...r }, super.drawShape(n, i, r)) : O(i, "bpmn:Gateway") ? (r = { stroke: o || Dt.Gateway, fill: s, ...r }, super.drawShape(n, i, r)) : O(i, "bpmn:Group") ? (r = { stroke: o || Dt.Group, fill: "none", ...r }, super.drawShape(n, i, r)) : super.drawShape(n, i, {
      stroke: o || Dt.default,
      fill: s,
      ...r
    });
  }
  drawConnection(n, i, r = {}) {
    let o;
    if (!this._overrideColor) {
      const s = ps(i);
      o = s.get("color:border-color") || s.get("bioc:stroke");
    }
    return Su(i, ["bpmn:SequenceFlow", "bpmn:MessageFlow", "bpmn:Association"]) ? (r = { stroke: o || Wd.Connection, ...r }, super.drawConnection(n, i, r)) : super.drawConnection(n, i, r);
  }
}
function $n(e, t = []) {
  return t.reduce((n, i) => (e[i] && (n[i] = e[i]), n), {});
}
class Yd extends Tu {
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
    }, this.pathMap.SERVICE_AI = {
      d: "M19.5764 4.0874l-.2276.5502c-.3887.9385-1.1142 1.6879-2.0259 2.0936l-.646.2874c-.3692.1645-.3692.702 0 .8666l.6838.3041c.8889.3954 1.6013 1.1183 1.9968 2.0259l.2224.5089c.1624.3728.6778.3728.8402 0l.2224-.5089c.3956-.9076 1.108-1.6305 1.9968-2.0259l.6829-.3041c.3697-.1644.3697-.7022 0-.8666l-.6451-.2874c-.9118-.4056-1.6372-1.155-2.0259-2.0936l-.2276-.5502c-.1589-.3832-.6884-.3832-.8473 0ZM7.8983 14.6 10.1 9.0963 12.3017 14.6H7.8983ZM20.9 12.8H19.1v8.1h1.8V12.8Zm-4.1396 8.1L11 6.5H9.2L3.4396 20.9H5.3785l1.8-4.5h5.843l1.8 4.5h1.9389Z"
    }, this.pathMap.SERVICE_MQTT = {
      d: "M5.134 3.009c8.231 1.112 14.745 7.626 15.857 15.857a1 1 0 01-1.982.268c-.992-7.34-6.804-13.151-14.143-14.143a1 1 0 01.268-1.982m.065 9.16a8.51 8.51 0 016.631 6.632A1 1 0 0110.85 20H5a1 1 0 01-1-1v-5.85a1 1 0 011.2-.98m-.04-4.496A13.51 13.51 0 0116.328 18.84a1 1 0 01-1.975.318A11.51 11.51 0 004.841 9.646a1 1 0 01.318-1.974M6 14.499v3.5h3.501A6.52 6.52 0 006 14.5M19.999 3a1 1 0 011 1v4.007l-.012.157a1 1 0 01-1.774.46 22.6 22.6 0 00-3.83-3.832 1 1 0 01.616-1.786z"
    };
  }
  getStaticPath(t) {
    var n;
    return ((n = this.pathMap[t]) == null ? void 0 : n.d) || "";
  }
}
const Xd = {
  bpmnRenderer: ["type", Kd],
  pathMap: ["type", Yd]
}, Jd = {
  "Copy Service Task": "抄送任务",
  "Camel Service Task": "骆驼任务",
  "Sc Service Task": "微服务任务",
  "Dubbo Service Task": "Dubbo 任务",
  "Rest Service Task": "Rest 任务",
  "Dmn Service Task": "决策任务",
  "Ai Service Task": "AI 任务",
  "Http Service Task": "Http 任务",
  "Web Service Task": "Web Service 任务",
  "Sql Service Task": "SQL 任务",
  "Mq Service Task": "消息任务",
  "Mqtt Service Task": "MQTT 任务",
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
  "Hide Simulation Log": "隐藏日志",
  "The high-contrast path connection represents the current flow path": "高对比色路径连线代表当前流转路径",
  Close: "关闭",
  Play: "播放",
  Pause: "暂停",
  Reset: "重置",
  Restart: "重新开始",
  "Simulation Started": "模拟已启动",
  "Simulation Paused": "模拟已暂停",
  "Simulation Reset": "模拟已重置",
  "Simulation Resumed": "模拟已恢复",
  Process: "流程",
  SubProcess: "子流程",
  started: "已启动",
  finished: "已完成",
  canceled: "已取消",
  "Start Event": "开始事件",
  "End Event": "结束事件",
  "Intermediate Event": "中间事件",
  "Boundary Event": "边界事件",
  Task: "任务",
  "User Task": "用户任务",
  "Service Task": "服务任务",
  "Send Task": "发送任务",
  "Receive Task": "接收任务",
  "Manual Task": "手动任务",
  "Script Task": "脚本任务",
  "Business Rule Task": "业务规则任务",
  "Call Activity": "调用活动",
  "Exclusive Gateway": "排他网关",
  "Parallel Gateway": "并行网关",
  "Inclusive Gateway": "包容网关",
  CC: "抄送人",
  Assignee: "分配人",
  "Assignee Users": "分配人员",
  "Assignee Groups": "分配角色",
  "Candidate Users": "候选人员",
  "Candidate Groups": "候选角色",
  Specify: "指定人",
  Candidate: "候选人",
  Starter: "发起人"
}, il = "__bpmn-designer__";
function Zd(e) {
  const t = window.localStorage.getItem(`${il}${e}`);
  return t ? JSON.parse(t) : null;
}
function Ro(e, t) {
  window.localStorage.setItem(`${il}${e}`, JSON.stringify(t || ""));
}
function Qd(e, t) {
  return t = t || {}, Zd("local-lang") !== "en_US" && (e = Jd[e] || Au[e] || e), e.replace(/{([^}]+)}/g, function(n, i) {
    return t[i] || "{" + i + "}";
  });
}
const ef = [
  {
    translate: ["value", Qd]
  }
], tf = "Flowable", nf = "http://flowable.org/bpmn", rf = "flowable", of = {
  tagAlias: "lowerCase"
}, sf = [], af = [
  {
    name: "Definitions",
    isAbstract: !0,
    extends: [
      "bpmn:Definitions"
    ],
    properties: [
      {
        name: "diagramRelationId",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "InOutBinding",
    superClass: [
      "Element"
    ],
    isAbstract: !0,
    properties: [
      {
        name: "source",
        isAttr: !0,
        type: "String"
      },
      {
        name: "sourceExpression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "target",
        isAttr: !0,
        type: "String"
      },
      {
        name: "businessKey",
        isAttr: !0,
        type: "String"
      },
      {
        name: "local",
        isAttr: !0,
        type: "Boolean",
        default: !1
      },
      {
        name: "variables",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "In",
    superClass: [
      "InOutBinding"
    ],
    meta: {
      allowedIn: [
        "bpmn:CallActivity",
        "bpmn:SignalEventDefinition"
      ]
    }
  },
  {
    name: "Out",
    superClass: [
      "InOutBinding"
    ],
    meta: {
      allowedIn: [
        "bpmn:CallActivity"
      ]
    }
  },
  {
    name: "AsyncCapable",
    isAbstract: !0,
    extends: [
      "bpmn:Activity",
      "bpmn:Gateway",
      "bpmn:Event"
    ],
    properties: [
      {
        name: "async",
        isAttr: !0,
        type: "Boolean",
        default: !1
      },
      {
        name: "asyncBefore",
        isAttr: !0,
        type: "Boolean",
        default: !1
      },
      {
        name: "asyncAfter",
        isAttr: !0,
        type: "Boolean",
        default: !1
      },
      {
        name: "exclusive",
        isAttr: !0,
        type: "Boolean",
        default: !0
      }
    ]
  },
  {
    name: "Scope",
    extends: [
      "bpmn:Signal"
    ],
    properties: [
      {
        name: "scope",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "ErrorEventDefinitionExtension",
    isAbstract: !0,
    extends: [
      "bpmn:ErrorEventDefinition"
    ],
    properties: [
      {
        name: "errorCodeVariable",
        isAttr: !0,
        type: "String"
      },
      {
        name: "errorMessageVariable",
        isAttr: !0,
        type: "String"
      },
      {
        name: "errorVariableLocalScope",
        isAttr: !0,
        type: "Boolean"
      },
      {
        name: "errorVariableTransient",
        isAttr: !0,
        type: "Boolean"
      }
    ]
  },
  {
    name: "ErrorEventDefinition",
    superClass: [
      "bpmn:ErrorEventDefinition",
      "Element"
    ],
    properties: [
      {
        name: "expression",
        isAttr: !0,
        type: "String"
      }
    ],
    meta: {
      allowedIn: [
        "bpmn:ServiceTask"
      ]
    }
  },
  {
    name: "Error",
    isAbstract: !0,
    extends: [
      "bpmn:Error"
    ],
    properties: [
      {
        name: "flowable:errorMessage",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "FormSupported",
    isAbstract: !0,
    extends: [
      "bpmn:StartEvent",
      "bpmn:UserTask"
    ],
    properties: [
      {
        name: "formKey",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "Initiator",
    isAbstract: !0,
    extends: [
      "bpmn:StartEvent"
    ],
    properties: [
      {
        name: "initiator",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "ScriptTask",
    isAbstract: !0,
    extends: [
      "bpmn:ScriptTask"
    ],
    properties: [
      {
        name: "resultVariable",
        isAttr: !0,
        type: "String"
      },
      {
        name: "autoStoreVariables",
        isAttr: !0,
        type: "Boolean"
      },
      {
        name: "resource",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "Process",
    isAbstract: !0,
    extends: [
      "bpmn:Process"
    ],
    properties: [
      {
        name: "candidateStarterGroups",
        isAttr: !0,
        type: "String"
      },
      {
        name: "candidateStarterUsers",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "FormalExpression",
    isAbstract: !0,
    extends: [
      "bpmn:FormalExpression"
    ],
    properties: [
      {
        name: "resource",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "Assignable",
    extends: [
      "bpmn:UserTask"
    ],
    properties: [
      {
        name: "assignee",
        isAttr: !0,
        type: "String"
      },
      {
        name: "candidateUsers",
        isAttr: !0,
        type: "String"
      },
      {
        name: "candidateGroups",
        isAttr: !0,
        type: "String"
      },
      {
        name: "dueDate",
        isAttr: !0,
        type: "String"
      },
      {
        name: "priority",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "CallActivity",
    extends: [
      "bpmn:CallActivity"
    ],
    properties: [
      {
        name: "inheritVariables",
        isAttr: !0,
        type: "Boolean"
      },
      {
        name: "calledElementType",
        isAttr: !0,
        type: "String"
      },
      {
        name: "processInstanceName",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "ServiceTaskLike",
    extends: [
      "bpmn:ServiceTask",
      "bpmn:BusinessRuleTask",
      "bpmn:SendTask",
      "bpmn:MessageEventDefinition"
    ],
    properties: [
      {
        name: "expression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "class",
        isAttr: !0,
        type: "String"
      },
      {
        name: "delegateExpression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "resultVariable",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "DmnCapable",
    extends: [
      "bpmn:BusinessRuleTask"
    ],
    properties: [
      {
        name: "decisionRef",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "ExternalCapable",
    extends: [
      "flowable:ServiceTaskLike"
    ],
    properties: [
      {
        name: "type",
        isAttr: !0,
        type: "String"
      },
      {
        name: "topic",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "TaskPriorized",
    extends: [
      "bpmn:Process",
      "flowable:ExternalCapable"
    ],
    properties: [
      {
        name: "taskPriority",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "Properties",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "*"
      ]
    },
    properties: [
      {
        name: "values",
        type: "Property",
        isMany: !0
      }
    ]
  },
  {
    name: "Property",
    superClass: [
      "Element"
    ],
    properties: [
      {
        name: "id",
        type: "String",
        isAttr: !0
      },
      {
        name: "name",
        type: "String",
        isAttr: !0
      },
      {
        name: "value",
        type: "String",
        isAttr: !0
      }
    ]
  },
  {
    name: "Connector",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "flowable:ServiceTaskLike"
      ]
    },
    properties: [
      {
        name: "inputOutput",
        type: "InputOutput"
      },
      {
        name: "connectorId",
        type: "String"
      }
    ]
  },
  {
    name: "InputOutput",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:FlowNode",
        "flowable:Connector"
      ]
    },
    properties: [
      {
        name: "inputOutput",
        type: "InputOutput"
      },
      {
        name: "connectorId",
        type: "String"
      },
      {
        name: "inputParameters",
        isMany: !0,
        type: "InputParameter"
      },
      {
        name: "outputParameters",
        isMany: !0,
        type: "OutputParameter"
      }
    ]
  },
  {
    name: "InputOutputParameter",
    properties: [
      {
        name: "name",
        isAttr: !0,
        type: "String"
      },
      {
        name: "value",
        isBody: !0,
        type: "String"
      },
      {
        name: "definition",
        type: "InputOutputParameterDefinition"
      }
    ]
  },
  {
    name: "InputOutputParameterDefinition",
    isAbstract: !0
  },
  {
    name: "List",
    superClass: [
      "InputOutputParameterDefinition"
    ],
    properties: [
      {
        name: "items",
        isMany: !0,
        type: "InputOutputParameterDefinition"
      }
    ]
  },
  {
    name: "Map",
    superClass: [
      "InputOutputParameterDefinition"
    ],
    properties: [
      {
        name: "entries",
        isMany: !0,
        type: "Entry"
      }
    ]
  },
  {
    name: "Entry",
    properties: [
      {
        name: "key",
        isAttr: !0,
        type: "String"
      },
      {
        name: "value",
        isBody: !0,
        type: "String"
      },
      {
        name: "definition",
        type: "InputOutputParameterDefinition"
      }
    ]
  },
  {
    name: "Value",
    superClass: [
      "Element"
    ],
    properties: [
      {
        name: "id",
        isAttr: !0,
        type: "String"
      },
      {
        name: "name",
        isAttr: !0,
        type: "String"
      },
      {
        name: "value",
        isBody: !0,
        type: "String"
      }
    ]
  },
  {
    name: "Script",
    superClass: [
      "InputOutputParameterDefinition"
    ],
    properties: [
      {
        name: "scriptFormat",
        isAttr: !0,
        type: "String"
      },
      {
        name: "resource",
        isAttr: !0,
        type: "String"
      },
      {
        name: "value",
        isBody: !0,
        type: "String"
      }
    ]
  },
  {
    name: "Field",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "flowable:ServiceTaskLike",
        "flowable:ExecutionListener",
        "flowable:TaskListener"
      ]
    },
    properties: [
      {
        name: "name",
        isAttr: !0,
        type: "String"
      },
      {
        name: "expression",
        type: "String"
      },
      {
        name: "stringValue",
        isAttr: !0,
        type: "String"
      },
      {
        name: "string",
        type: "String"
      }
    ]
  },
  {
    name: "InputParameter",
    superClass: [
      "InputOutputParameter"
    ]
  },
  {
    name: "OutputParameter",
    superClass: [
      "InputOutputParameter"
    ]
  },
  {
    name: "Collectable",
    isAbstract: !0,
    extends: [
      "bpmn:MultiInstanceLoopCharacteristics"
    ],
    superClass: [
      "flowable:AsyncCapable"
    ],
    properties: [
      {
        name: "collection",
        isAttr: !0,
        type: "String"
      },
      {
        name: "elementVariable",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "FailedJobRetryTimeCycle",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "flowable:AsyncCapable",
        "bpmn:MultiInstanceLoopCharacteristics"
      ]
    },
    properties: [
      {
        name: "body",
        isBody: !0,
        type: "String"
      }
    ]
  },
  {
    name: "ExecutionListener",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:Task",
        "bpmn:ServiceTask",
        "bpmn:UserTask",
        "bpmn:BusinessRuleTask",
        "bpmn:ScriptTask",
        "bpmn:ReceiveTask",
        "bpmn:ManualTask",
        "bpmn:ExclusiveGateway",
        "bpmn:SequenceFlow",
        "bpmn:ParallelGateway",
        "bpmn:InclusiveGateway",
        "bpmn:EventBasedGateway",
        "bpmn:StartEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:IntermediateThrowEvent",
        "bpmn:EndEvent",
        "bpmn:BoundaryEvent",
        "bpmn:CallActivity",
        "bpmn:SubProcess",
        "bpmn:Process"
      ]
    },
    properties: [
      {
        name: "expression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "class",
        isAttr: !0,
        type: "String"
      },
      {
        name: "delegateExpression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "onTransaction",
        isAttr: !0,
        type: "String"
      },
      {
        name: "event",
        isAttr: !0,
        type: "String"
      },
      {
        name: "script",
        type: "Script"
      },
      {
        name: "fields",
        type: "Field",
        isMany: !0
      }
    ]
  },
  {
    name: "TaskListener",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "expression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "class",
        isAttr: !0,
        type: "String"
      },
      {
        name: "delegateExpression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "event",
        isAttr: !0,
        type: "String"
      },
      {
        name: "script",
        type: "Script"
      },
      {
        name: "fields",
        type: "Field",
        isMany: !0
      },
      {
        name: "id",
        type: "String",
        isAttr: !0
      },
      {
        name: "eventDefinitions",
        type: "bpmn:TimerEventDefinition",
        isMany: !0
      }
    ]
  },
  {
    name: "EventListener",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:Process"
      ]
    },
    properties: [
      {
        name: "events",
        isAttr: !0,
        type: "String"
      },
      {
        name: "expression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "class",
        isAttr: !0,
        type: "String"
      },
      {
        name: "delegateExpression",
        isAttr: !0,
        type: "String"
      },
      {
        name: "throwEvent",
        isAttr: !0,
        type: "String"
      },
      {
        name: "entityType",
        isAttr: !0,
        type: "String"
      },
      {
        name: "signalName",
        isAttr: !0,
        type: "String"
      },
      {
        name: "errorCode",
        isAttr: !0,
        type: "String"
      },
      {
        name: "messageName",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "FormProperty",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:StartEvent",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "id",
        type: "String",
        isAttr: !0
      },
      {
        name: "name",
        type: "String",
        isAttr: !0
      },
      {
        name: "type",
        type: "String",
        isAttr: !0
      },
      {
        name: "required",
        type: "String",
        isAttr: !0
      },
      {
        name: "readable",
        type: "String",
        isAttr: !0
      },
      {
        name: "writable",
        type: "String",
        isAttr: !0
      },
      {
        name: "variable",
        type: "String",
        isAttr: !0
      },
      {
        name: "expression",
        type: "String",
        isAttr: !0
      },
      {
        name: "datePattern",
        type: "String",
        isAttr: !0
      },
      {
        name: "default",
        type: "String",
        isAttr: !0
      },
      {
        name: "values",
        type: "Value",
        isMany: !0
      }
    ]
  },
  {
    name: "FormData",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:StartEvent",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "fields",
        type: "FormField",
        isMany: !0
      },
      {
        name: "businessKey",
        type: "String",
        isAttr: !0
      }
    ]
  },
  {
    name: "FormField",
    superClass: [
      "Element"
    ],
    properties: [
      {
        name: "id",
        type: "String",
        isAttr: !0
      },
      {
        name: "label",
        type: "String",
        isAttr: !0
      },
      {
        name: "type",
        type: "String",
        isAttr: !0
      },
      {
        name: "datePattern",
        type: "String",
        isAttr: !0
      },
      {
        name: "defaultValue",
        type: "String",
        isAttr: !0
      },
      {
        name: "properties",
        type: "Properties"
      },
      {
        name: "validation",
        type: "Validation"
      },
      {
        name: "values",
        type: "Value",
        isMany: !0
      }
    ]
  },
  {
    name: "Validation",
    superClass: [
      "Element"
    ],
    properties: [
      {
        name: "constraints",
        type: "Constraint",
        isMany: !0
      }
    ]
  },
  {
    name: "Constraint",
    superClass: [
      "Element"
    ],
    properties: [
      {
        name: "name",
        type: "String",
        isAttr: !0
      },
      {
        name: "config",
        type: "String",
        isAttr: !0
      }
    ]
  },
  {
    name: "ConditionalEventDefinitionExtension",
    isAbstract: !0,
    extends: [
      "bpmn:ConditionalEventDefinition"
    ],
    properties: [
      {
        name: "variableName",
        isAttr: !0,
        type: "String"
      },
      {
        name: "variableEvents",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "AssigneeType",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "MultiCompletionCondition",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:Activity"
      ]
    },
    properties: [
      {
        name: "type",
        type: "String",
        isAttr: !0
      },
      {
        name: "conditionType",
        type: "String",
        isAttr: !0
      },
      {
        name: "num",
        type: "Number",
        isAttr: !0
      },
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "IdmAssignee",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "IdmCandidateUsers",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask",
        "bpmn:Process"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "IdmCandidateGroups",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask",
        "bpmn:Process"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "NextSequenceFlow",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "NextUser",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "ModelBpmnExtension",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "ProcessNameExp",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:Process"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "Localization",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "*"
      ]
    },
    properties: [
      {
        name: "locale",
        type: "String",
        isAttr: !0
      },
      {
        name: "name",
        type: "String",
        isAttr: !0
      }
    ]
  },
  {
    name: "NodeFormExp",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:Event",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "NodeFormType",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:Event",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "StaticAssigneeVariables",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:Event",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "MultiInstanceVariables",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "*"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "ServiceTask",
    extends: [
      "bpmn:ServiceTask"
    ],
    properties: [
      {
        name: "parallelInSameTransaction",
        type: "Boolean",
        isAttr: !0
      }
    ]
  },
  {
    name: "TimeDate",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:BoundaryEvent",
        "bpmn:TimerEventDefinition",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        isBody: !0,
        type: "String"
      }
    ]
  },
  {
    name: "BoundaryEvent",
    extends: [
      "bpmn:BoundaryEvent"
    ],
    properties: [
      {
        name: "timerEventDefinition",
        isBody: !0,
        type: "flowable:TimerEventDefinition"
      },
      {
        name: "cancelActivity",
        isAttr: !0,
        type: "Boolean",
        redefines: "bpmn:BoundaryEvent#cancelActivity"
      }
    ]
  },
  {
    name: "TimerEventDefinition",
    superClass: [
      "TimerEventDefinition"
    ],
    meta: {
      allowedIn: [
        "bpmn:BoundaryEvent",
        "bpmn:TimerEventDefinition",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        isBody: !0,
        type: "String"
      }
    ]
  },
  {
    name: "TimeDuration",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:BoundaryEvent",
        "bpmn:TimerEventDefinition",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        isBody: !0,
        type: "String"
      }
    ]
  },
  {
    name: "TimeCycle",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:BoundaryEvent",
        "bpmn:TimerEventDefinition",
        "flowable:endDate",
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        isBody: !0,
        type: "String"
      },
      {
        name: "endDate",
        isAttr: !0,
        type: "String"
      }
    ]
  },
  {
    name: "SkipUserTask",
    extends: [
      "bpmn:UserTask"
    ],
    properties: [
      {
        name: "skipExpression",
        type: "String",
        isAttr: !0
      }
    ]
  },
  {
    name: "TransferToUsers",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:ServiceTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "AuthPoint",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "bpmn:UserTask"
      ]
    },
    properties: [
      {
        name: "body",
        type: "String",
        isBody: !0
      }
    ]
  },
  {
    name: "FormFieldValidation",
    extends: [
      "bpmn:UserTask",
      "bpmn:StartEvent"
    ],
    properties: [
      {
        name: "formFieldValidation",
        type: "String",
        isAttr: !0
      }
    ]
  },
  {
    name: "DataObject",
    extends: [
      "bpmn:DataObject"
    ],
    meta: {
      allowedIn: [
        "bpmn:Process",
        "bpmn:SubProcess"
      ]
    },
    properties: [
      {
        name: "itemSubjectRef",
        type: "String",
        isAttr: !0,
        redefines: "bpmn:DataObject#itemSubjectRef"
      }
    ]
  },
  {
    name: "InterruptingStartEvent",
    extends: [
      "bpmn:StartEvent"
    ],
    properties: [
      {
        name: "isInterrupting",
        isAttr: !0,
        type: "Boolean",
        redefines: "bpmn:StartEvent#isInterrupting"
      }
    ]
  },
  {
    name: "VariableListenerEventDefinition",
    superClass: [
      "Element"
    ],
    meta: {
      allowedIn: [
        "*"
      ]
    },
    properties: [
      {
        name: "variableName",
        type: "String",
        isAttr: !0
      },
      {
        name: "variableChangeType",
        type: "String",
        isAttr: !0
      }
    ]
  },
  {
    name: "TerminateEventDefinition",
    extends: [
      "bpmn:TerminateEventDefinition"
    ],
    properties: [
      {
        name: "terminateAll",
        isAttr: !0,
        type: "Boolean"
      }
    ]
  },
  {
    name: "AdHoc",
    extends: [
      "bpmn:AdHocSubProcess"
    ],
    properties: [
      {
        name: "cancelRemainingInstances",
        isAttr: !0,
        type: "Boolean",
        redefines: "bpmn:AdHocSubProcess#cancelRemainingInstances"
      }
    ]
  }
], lf = [], rl = {
  name: tf,
  uri: nf,
  prefix: rf,
  xml: of,
  associations: sf,
  types: af,
  emumerations: lf
}, ol = [Xd, ef, Ou], Se = {
  legend: [1, "<fieldset>", "</fieldset>"],
  tr: [2, "<table><tbody>", "</tbody></table>"],
  col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
  _default: [0, "", ""]
};
Se.td = Se.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"];
Se.option = Se.optgroup = [1, '<select multiple="multiple">', "</select>"];
Se.thead = Se.tbody = Se.colgroup = Se.caption = Se.tfoot = [1, "<table>", "</table>"];
Se.polyline = Se.ellipse = Se.polygon = Se.circle = Se.text = Se.line = Se.path = Se.rect = Se.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', "</svg>"];
function cf(e, t = globalThis.document) {
  var u;
  if (typeof e != "string")
    throw new TypeError("String expected");
  const n = /^<!--(.*?)-->$/s.exec(e);
  if (n)
    return t.createComment(n[1]);
  const i = (u = /<([\w:]+)/.exec(e)) == null ? void 0 : u[1];
  if (!i)
    return t.createTextNode(e);
  if (e = e.trim(), i === "body") {
    const c = t.createElement("html");
    c.innerHTML = e;
    const { lastChild: d } = c;
    return d.remove(), d;
  }
  let [r, o, s] = Object.hasOwn(Se, i) ? Se[i] : Se._default, a = t.createElement("div");
  for (a.innerHTML = o + e + s; r--; )
    a = a.lastChild;
  if (a.firstChild === a.lastChild) {
    const { firstChild: c } = a;
    return c.remove(), c;
  }
  const l = t.createDocumentFragment();
  return l.append(...a.childNodes), l;
}
var uf = cf;
const Ge = /* @__PURE__ */ id(uf);
function df(e, t) {
  return t.forEach(function(n) {
    n && typeof n != "string" && !Array.isArray(n) && Object.keys(n).forEach(function(i) {
      if (i !== "default" && !(i in e)) {
        var r = Object.getOwnPropertyDescriptor(n, i);
        Object.defineProperty(e, i, r.get ? r : {
          enumerable: !0,
          get: function() {
            return n[i];
          }
        });
      }
    });
  }), Object.freeze(e);
}
const ff = Object.prototype.toString;
function ae(e) {
  return new Ft(e);
}
function Ft(e) {
  if (!e || !e.nodeType)
    throw new Error("A DOM element reference is required");
  this.el = e, this.list = e.classList;
}
Ft.prototype.add = function(e) {
  return this.list.add(e), this;
};
Ft.prototype.remove = function(e) {
  return ff.call(e) == "[object RegExp]" ? this.removeMatching(e) : (this.list.remove(e), this);
};
Ft.prototype.removeMatching = function(e) {
  const t = this.array();
  for (let n = 0; n < t.length; n++)
    e.test(t[n]) && this.remove(t[n]);
  return this;
};
Ft.prototype.toggle = function(e, t) {
  return typeof t < "u" ? t !== this.list.toggle(e, t) && this.list.toggle(e) : this.list.toggle(e), this;
};
Ft.prototype.array = function() {
  return Array.from(this.list);
};
Ft.prototype.has = Ft.prototype.contains = function(e) {
  return this.list.contains(e);
};
function pf(e) {
  for (var t; t = e.firstChild; )
    e.removeChild(t);
  return e;
}
var qi = {}, Wi, co, zo;
function sl() {
  Wi = window.addEventListener ? "addEventListener" : "attachEvent", co = window.removeEventListener ? "removeEventListener" : "detachEvent", zo = Wi !== "addEventListener" ? "on" : "";
}
var hf = qi.bind = function(e, t, n, i) {
  return Wi || sl(), e[Wi](zo + t, n, i || !1), n;
}, mf = qi.unbind = function(e, t, n, i) {
  return co || sl(), e[co](zo + t, n, i || !1), n;
}, Et = /* @__PURE__ */ df({
  __proto__: null,
  bind: hf,
  default: qi,
  unbind: mf
}, [qi]);
function $e(e, t) {
  return t = t || document, t.querySelector(e);
}
function al(e, t) {
  return t = t || document, t.querySelectorAll(e);
}
const Me = "tokenSimulation.toggleMode", Gi = "tokenSimulation.playSimulation", jo = "tokenSimulation.pauseSimulation", et = "tokenSimulation.resetSimulation", vf = "tokenSimulation.animationCreated", uo = "tokenSimulation.simulator.elementChanged", St = "tokenSimulation.simulator.destroyScope", Vo = "tokenSimulation.simulator.scopeChanged", ln = "tokenSimulation.simulator.createScope", sr = "tokenSimulation.scopeFilterChanged", ar = "tokenSimulation.simulator.trace", xn = "tokenSimulation.simulator.tick", gf = "tokenSimulation.simulator.configChanged", ll = "tokenSimulation.simulator.reset", cl = "tokenSimulation.simulationFinished";
class ul {
  constructor(t, n) {
    y(this, "_active", !1);
    y(this, "_canvasParent");
    this._eventBus = t, this._canvas = n, this._eventBus.on("diagram.init", () => {
      this._canvasParent = this._canvas.getContainer().parentNode;
    }), this._eventBus.on("import.parse.start", () => {
      this._active && (this.toggleMode(!1), this._eventBus.once("import.done", () => {
        this.toggleMode(!0);
      }));
    });
  }
  toggleMode(t = !this._active) {
    t !== this._active && (this._canvasParent && (t ? ae(this._canvasParent).add("simulation") : ae(this._canvasParent).remove("simulation")), this._eventBus.fire(Me, {
      active: t
    }), this._active = t);
  }
}
y(ul, "$inject", ["eventBus", "canvas"]);
const yf = {
  __init__: ["toggleMode"],
  toggleMode: ["type", ul]
}, Uo = 1, dl = 2, fl = 4, pl = 8, bf = 16, Ef = 32, wf = 64, Sf = 128, _f = 256, Cf = 512, kf = Uo | dl | fl, Tf = Uo | pl, oe = Object.freeze({
  ACTIVATED: Uo,
  RUNNING: dl,
  ENDING: fl,
  ENDED: pl,
  DESTROYED: bf,
  FAILED: Ef,
  TERMINATED: wf,
  CANCELED: Sf,
  COMPLETED: _f,
  COMPENSABLE: Cf,
  ACTIVE: kf,
  NOT_DEAD: Tf
}), si = {};
function Ut(e, t) {
  throw new Error(`illegal transition: ${e.name} -> ${t}`);
}
function Ht(e, t) {
  return e === si ? t : e;
}
class Ue {
  constructor(t, n, i = {}) {
    y(this, "name");
    y(this, "traits");
    y(this, "_start");
    y(this, "_compensable");
    y(this, "_cancel");
    y(this, "_complete");
    y(this, "_destroy");
    y(this, "_fail");
    y(this, "_terminate");
    this.name = t, this.traits = n, this.setTransitions(i);
  }
  setTransitions({
    start: t,
    cancel: n,
    complete: i,
    destroy: r,
    fail: o,
    terminate: s,
    compensable: a
  }) {
    this._start = Ht(t, this), this._compensable = Ht(a, this), this._cancel = Ht(n, this), this._complete = Ht(i, this), this._destroy = Ht(r, this), this._fail = Ht(o, this), this._terminate = Ht(s, this);
  }
  hasTrait(t) {
    return (this.traits & t) !== 0;
  }
  complete() {
    return this._complete || Ut(this, "complete");
  }
  destroy() {
    return this._destroy || Ut(this, "destroy");
  }
  cancel() {
    return this._cancel || Ut(this, "cancel");
  }
  fail() {
    return this._fail || Ut(this, "fail");
  }
  terminate() {
    return this._terminate || Ut(this, "terminate");
  }
  compensable() {
    return this._compensable || Ut(this, "compensable");
  }
  start() {
    return this._start || Ut(this, "start");
  }
}
const lr = new Ue("failed", oe.DESTROYED | oe.FAILED), cr = new Ue(
  "terminated",
  oe.DESTROYED | oe.TERMINATED | oe.COMPLETED
), Ho = new Ue("completed", oe.DESTROYED | oe.COMPLETED), Nt = new Ue(
  "terminating",
  oe.ENDING | oe.TERMINATED | oe.COMPLETED,
  {
    destroy: cr
  }
), An = new Ue(
  "canceling",
  oe.ENDING | oe.FAILED | oe.CANCELED,
  {
    destroy: lr,
    complete: si,
    terminate: Nt
  }
), qo = new Ue("completing", oe.ENDING | oe.COMPLETED, {
  destroy: Ho,
  cancel: An,
  terminate: Nt
}), hl = new Ue("failing", oe.ENDING | oe.FAILED, {
  cancel: An,
  complete: qo,
  destroy: lr,
  terminate: Nt
}), Wo = new Ue(
  "compensable:completed",
  oe.ENDED | oe.COMPLETED
), ml = new Ue(
  "compensable:completing",
  oe.ENDING | oe.COMPLETED,
  {
    destroy: Wo,
    terminate: Nt,
    compensable: si
  }
), vl = new Ue(
  "compensable:failing",
  oe.ENDING | oe.FAILED,
  {
    complete: ml,
    terminate: Nt,
    destroy: lr
  }
);
Wo.setTransitions({
  cancel: An,
  fail: vl,
  destroy: Ho,
  compensable: si
});
const Af = new Ue(
  "compensable:running",
  oe.RUNNING | oe.COMPENSABLE,
  {
    cancel: An,
    complete: ml,
    compensable: si,
    destroy: Wo,
    fail: vl,
    terminate: Nt
  }
), gl = new Ue("running", oe.RUNNING, {
  cancel: An,
  complete: qo,
  compensable: Af,
  destroy: cr,
  fail: hl,
  terminate: Nt
}), Of = new Ue("activated", oe.ACTIVATED, {
  start: gl,
  destroy: cr
}), Bf = Object.freeze({
  ACTIVATED: Of,
  RUNNING: gl,
  CANCELING: An,
  COMPLETING: qo,
  COMPLETED: Ho,
  FAILING: hl,
  FAILED: lr,
  TERMINATING: Nt,
  TERMINATED: cr
});
class Df {
  /**
   * @param {string} id - 唯一标识符
   * @param {any} element - 对应的 BPMN 元素
   * @param {Scope} [parent=null] - 父作用域
   * @param {Scope} [initiator=null] - 发起者作用域
   */
  constructor(t, n, i = null, r = null) {
    y(this, "id");
    y(this, "element");
    y(this, "parent");
    y(this, "initiator");
    y(this, "subscriptions");
    y(this, "children");
    y(this, "state");
    // 这些属性在特定状态转换时会被设置 (Set during transitions)
    y(this, "failInitiator");
    y(this, "cancelInitiator");
    y(this, "terminateInitiator");
    y(this, "destroyInitiator");
    this.id = t, this.element = n, this.parent = i, this.initiator = r, this.subscriptions = /* @__PURE__ */ new Set(), this.children = [], this.state = Bf.ACTIVATED;
  }
  /**
   * 是否正在运行
   * (Is the scope running)
   */
  get running() {
    return this.hasTrait(oe.RUNNING);
  }
  /**
   * 是否已销毁
   * (Is the scope destroyed)
   */
  get destroyed() {
    return this.hasTrait(oe.DESTROYED);
  }
  /**
   * 是否已完成
   * (Is the scope completed)
   */
  get completed() {
    return this.hasTrait(oe.COMPLETED);
  }
  /**
   * 是否已取消
   * (Is the scope canceled)
   */
  get canceled() {
    return this.hasTrait(oe.CANCELED);
  }
  /**
   * 是否已失败
   * (Is the scope failed)
   */
  get failed() {
    return this.hasTrait(oe.FAILED);
  }
  /**
   * 是否处于活跃状态
   * (Is the scope active)
   */
  get active() {
    return this.hasTrait(oe.ACTIVE);
  }
  /**
   * 检查是否具有某个特征
   * (Check if has trait)
   *
   * @param {number} trait
   * @return {boolean}
   */
  hasTrait(t) {
    return this.state.hasTrait(t);
  }
  /**
   * 启动作用域
   * (Start the scope)
   *
   * @return {Scope}
   */
  start() {
    return this.state = this.state.start(), this;
  }
  /**
   * 使该作用域可被补偿
   * (Make this scope compensable)
   *
   * @return {Scope}
   */
  compensable() {
    return this.state = this.state.compensable(), this;
  }
  /**
   * @param {Scope | null} initiator
   *
   * @return {Scope}
   */
  fail(t) {
    return this.failed || (this.state = this.state.fail(), this.failInitiator = t), this;
  }
  cancel(t) {
    return this.canceled || (this.state = this.state.cancel(), this.cancelInitiator = t), this;
  }
  /**
   * 终止作用域
   * (Terminate the scope)
   *
   * @param {Scope | null} initiator
   *
   * @return {Scope}
   */
  terminate(t) {
    return this.state = this.state.terminate(), this.terminateInitiator = t, this;
  }
  /**
   * 完成作用域
   * (Complete the scope)
   *
   * @return {Scope}
   */
  complete() {
    return this.state = this.state.complete(), this;
  }
  /**
   * 销毁作用域
   * (Destroy the scope)
   *
   * @param {Scope | null} initiator
   *
   * @return {Scope}
   */
  destroy(t) {
    return this.state = this.state.destroy(), this.destroyInitiator = t, this;
  }
  /**
   * 获取子 Token 数量
   * (Get number of child tokens)
   *
   * @return {number}
   */
  getTokens() {
    return this.children.filter((t) => !t.destroyed).length;
  }
  /**
   * 获取指定元素的子 Token 数量
   * (Get number of child tokens by element)
   *
   * @param {any} element
   *
   * @return {number}
   */
  getTokensByElement(t) {
    return this.children.filter((n) => !n.destroyed && n.element === t).length;
  }
}
function mn(e, t) {
  const n = [];
  for (const i of e)
    t(i) && n.push(i);
  return n;
}
function As(e, t) {
  for (const n of e)
    if (t(n))
      return n;
  return null;
}
function fo(e, t) {
  const n = ["type", "name", "iref"].every((r) => !(r in e) || e[r] === t[r]), i = !t.ref && (t.type === "error" || t.type === "escalation");
  return n && (i || yl(e, t));
}
function yl(e, t) {
  const n = "ref";
  return !(n in e) || e[n] === t[n];
}
function Vn(e) {
  return e.filter((t) => O(t, "bpmn:SequenceFlow"));
}
function Rr(e) {
  return O(e, "bpmn:MessageFlow");
}
function Yt(e) {
  return O(e, "bpmn:SequenceFlow");
}
function Go(e) {
  return Ko(e) && ur(e, "bpmn:LinkEventDefinition");
}
function If(e) {
  return O(e, "bpmn:IntermediateThrowEvent") && ur(e, "bpmn:LinkEventDefinition");
}
function Ki(e) {
  return Ko(e) && ur(e, "bpmn:CompensateEventDefinition");
}
function bl(e) {
  return O(e, "bpmn:Activity") && Te(e).isForCompensation;
}
function Ko(e) {
  return (O(e, "bpmn:CatchEvent") || O(e, "bpmn:ReceiveTask")) && !ai(e);
}
function Ei(e) {
  return O(e, "bpmn:BoundaryEvent") && !ai(e);
}
function El(e) {
  return $t(e) && !ur(e);
}
function Yi(e) {
  return !(ai(e) || !Xt(e, [
    "bpmn:Activity",
    "bpmn:IntermediateCatchEvent",
    "bpmn:IntermediateThrowEvent",
    "bpmn:Gateway",
    "bpmn:EndEvent"
  ]) || Go(e) || e.incoming.find(Yt) || bl(e) || Mt(e));
}
function $t(e) {
  return O(e, "bpmn:StartEvent") && !ai(e);
}
function ai(e) {
  return !!e.labelTarget;
}
function Mt(e) {
  return Te(e).triggeredByEvent;
}
function wl(e) {
  return O(e, "bpmn:StartEvent") && Te(e).isInterrupting || O(e, "bpmn:BoundaryEvent") && Te(e).cancelActivity;
}
function Xt(e, t) {
  return t.some((n) => O(e, n));
}
function ur(e, t) {
  return Rd(Te(e).eventDefinitions, (n) => t ? O(n, t) : !0);
}
function Qt(e, t) {
  if (e.children && e.children.length !== 0)
    return e.children;
  if (O(e, "bpmn:SubProcess") && !e.di.isExpanded) {
    const n = Bu(e);
    if (!n)
      return [];
    const i = t.get(n);
    return i ? i.children : [];
  }
  return [];
}
class Pf {
  signal(t) {
    console.log("ignored #signal", t.element);
  }
  exit(t) {
    console.log("ignored #exit", t.element);
  }
  enter(t) {
    console.log("ignored #enter", t.element);
  }
}
class Sl {
  constructor(t, n, i) {
    y(this, "ids");
    y(this, "configuration", {});
    y(this, "behaviors", {});
    y(this, "noopBehavior", new Pf());
    y(this, "changedElements", /* @__PURE__ */ new Set());
    y(this, "jobs", []);
    y(this, "scopes", /* @__PURE__ */ new Set());
    y(this, "subscriptions", /* @__PURE__ */ new Set());
    y(this, "_injector");
    this.injector = t, this.eventBus = n, this.elementRegistry = i, this.ids = t.get("scopeIds", !1) || new Ct([32, 36]), this._injector = t, this.on(xn, () => {
      for (const r of this.changedElements)
        this.emit(uo, {
          element: r
        });
      this.changedElements.clear();
    });
  }
  /**
   * 将任务加入队列
   */
  queue(t, n) {
    if (this.jobs.push([n, t]), this.jobs.length !== 1)
      return;
    let i;
    for (; i = this.jobs[0]; ) {
      const [r, o] = i;
      o.destroyed || r(), this.jobs.shift();
    }
    this.emit(xn);
  }
  getBehavior(t) {
    return this.behaviors[t.type] || this.noopBehavior;
  }
  /**
   * 发送信号以推进流程
   */
  signal(t) {
    const {
      element: n,
      parentScope: i,
      initiator: r = null,
      scope: o = this.initializeScope({
        element: n,
        parent: i,
        initiator: r
      })
    } = t;
    return this.queue(o, () => {
      o.running || o.start(), this.trace("signal", {
        ...t,
        scope: o
      }), this.getBehavior(n).signal({
        ...t,
        scope: o
      }), o.parent && this.scopeChanged(o.parent);
    }), o;
  }
  /**
   * 进入某个元素 (激活)
   */
  enter(t) {
    const { element: n, scope: i, initiator: r = i } = t, o = this.initializeScope({
      element: n,
      parent: i || null,
      initiator: r || null
    });
    return this.queue(o, () => {
      o.running || o.start(), this.trace("enter", t), this.getBehavior(n).enter({
        ...t,
        initiator: r,
        scope: o
      }), o.parent && this.scopeChanged(o.parent);
    }), o;
  }
  /**
   * 离开某个元素 (完成)
   */
  exit(t) {
    const { element: n, scope: i, initiator: r = i } = t;
    i && this.queue(i, () => {
      this.trace("exit", t), this.getBehavior(n).exit({
        ...t,
        initiator: r
      }), i.running && i.complete(), this.destroyScope(i, r || null), i.parent && this.scopeChanged(i.parent);
    });
  }
  /**
   * 触发事件 (尝试消费事件订阅)
   */
  trigger(t) {
    const { event: n, initiator: i, scope: r } = t, o = this.getEvent(n), s = r.subscriptions;
    let a = mn(
      s,
      (h) => fo(o, h.event)
    );
    if (o.type === "error" || o.type === "escalation") {
      const h = mn(
        a,
        (E) => yl(o, E.event)
      );
      (a.every((E) => E.event.boundary) && h.some(
        (E) => E.event.boundary
      ) || h.some((E) => !E.event.boundary)) && (a = h);
    }
    const l = a.filter(
      (h) => !h.event.interrupting
    ), u = a.filter(
      (h) => h.event.interrupting
    );
    if (!u.length)
      return l.map((h) => h.triggerFn(i || null)).flat();
    const c = u.find((h) => !h.event.boundary) || u[0], d = mn(
      s,
      (h) => h.event.persistent || this.isRethrow(h.event, c.event)
    );
    return s.forEach((h) => {
      d.includes(h) || h.remove();
    }), [c.triggerFn(i || null)].flat().filter((h) => h);
  }
  /**
   * 订阅事件
   */
  subscribe(t, n, i) {
    const r = this.getEvent(n), o = r.element, s = {
      scope: t,
      event: r,
      element: o,
      triggerFn: i,
      remove: () => {
        this.unsubscribe(s);
      }
    };
    return this.subscriptions.add(s), t.subscriptions.add(s), o && this.elementChanged(o), s;
  }
  unsubscribe(t) {
    const { scope: n, event: i } = t;
    this.subscriptions.delete(t), n.subscriptions.delete(t), i.element && this.elementChanged(i.element);
  }
  createInternalRef(t) {
    return O(t, "bpmn:StartEvent") || O(t, "bpmn:IntermediateCatchEvent") || O(t, "bpmn:ReceiveTask") || this.isSpecialBoundaryEvent(t) ? Te(t).name || t.id : null;
  }
  getNoneEvent(t) {
    return {
      element: t,
      interrupting: !1,
      boundary: !1,
      iref: t.id,
      type: "none"
    };
  }
  getEvent(t) {
    if (!t.businessObject)
      return t;
    const n = wl(t), i = Ei(t), r = this.createInternalRef(t), o = {
      element: t,
      interrupting: n,
      boundary: i,
      ...r ? { iref: r } : {}
    }, s = this.getEventDefinitions(t)[0];
    if (!s)
      return {
        ...o,
        type: this.isImplicitMessageCatch(t) ? "message" : "none"
      };
    if (O(s, "bpmn:LinkEventDefinition"))
      return {
        ...o,
        type: "link",
        name: s.name
      };
    if (O(s, "bpmn:SignalEventDefinition"))
      return {
        ...o,
        type: "signal",
        ref: s.signalRef
      };
    if (O(s, "bpmn:TimerEventDefinition"))
      return {
        ...o,
        type: "timer"
      };
    if (O(s, "bpmn:ConditionalEventDefinition"))
      return {
        ...o,
        type: "condition"
      };
    if (O(s, "bpmn:EscalationEventDefinition"))
      return {
        ...o,
        type: "escalation",
        ref: s.escalationRef
      };
    if (O(s, "bpmn:CancelEventDefinition"))
      return {
        ...o,
        type: "cancel"
      };
    if (O(s, "bpmn:ErrorEventDefinition"))
      return {
        ...o,
        type: "error",
        ref: s.errorRef
      };
    if (O(s, "bpmn:MessageEventDefinition"))
      return {
        ...o,
        type: "message",
        ref: s.messageRef
      };
    if (O(s, "bpmn:CompensateEventDefinition")) {
      let a = s.activityRef && this.elementRegistry.get(s.activityRef.id);
      return a || ($t(t) && Mt(t.parent) ? a = t.parent.parent : Ei(t) ? a = t.host : a = t.parent), {
        ...o,
        type: "compensate",
        ref: a,
        persistent: !0
      };
    }
    throw new Error("unknown event definition");
  }
  createScope(t, n = !0) {
    const { element: i, parent: r = null, initiator: o = null } = t;
    n && this.trace("createScope", {
      element: i,
      scope: r
    });
    const s = new Df(this.ids.next(), i, r, o);
    return r && r.children.push(s), this.scopes.add(s), n && this.emit(ln, {
      scope: s
    }), this.elementChanged(i), r && this.elementChanged(r.element), s;
  }
  subscriptionFilter(t) {
    if (typeof t == "function")
      return t;
    const { event: n, element: i, scope: r } = t, o = t.elements || i && [i], s = n && this.getEvent(n);
    return (a) => (!s || fo(s, a.event)) && (!o || o.includes(a.element)) && (!r || r === a.scope);
  }
  scopeSubscriptionFilter(t) {
    const n = typeof t == "function" ? t : this.subscriptionFilter(t);
    return (i) => Array.from(i.subscriptions).some(n);
  }
  scopeFilter(t) {
    if (typeof t == "function")
      return t;
    const { element: n, waitsOnElement: i, parent: r, trait: o = oe.RUNNING, subscribedTo: s } = t, a = s ? this.scopeSubscriptionFilter(s) : () => !0;
    return (l) => (!n || l.element === n) && (!r || l.parent === r) && (!i || l.getTokensByElement(i) > 0) && l.hasTrait(o) && a(l);
  }
  findSubscriptions(t) {
    return mn(this.subscriptions, this.subscriptionFilter(t));
  }
  findSubscription(t) {
    return As(this.subscriptions, this.subscriptionFilter(t));
  }
  findScopes(t) {
    return mn(this.scopes, this.scopeFilter(t));
  }
  findScope(t) {
    return As(this.scopes, this.scopeFilter(t));
  }
  destroyScope(t, n = null, i = !1) {
    if (!t.destroyed) {
      t.destroy(n);
      for (const r of t.subscriptions) {
        const o = r.event.traits || oe.ACTIVE;
        t.hasTrait(o) || this.unsubscribe(r);
      }
      if (t.destroyed) {
        for (const r of t.children)
          r.destroyed || this.destroyScope(r, n, i);
        this.trace("destroyScope", {
          element: t.element,
          scope: t
        }), this.scopes.delete(t), this.emit(St, {
          scope: t,
          forced: i
        });
      }
      this.elementChanged(t.element), t.parent && this.elementChanged(t.parent.element);
    }
  }
  trace(t, n) {
    this.emit(ar, {
      ...n,
      action: t
    });
  }
  elementChanged(t) {
    this.changedElements.add(t), this.jobs.length || this.emit(xn);
  }
  scopeChanged(t) {
    this.emit(Vo, {
      scope: t
    });
  }
  emit(t, n = {}) {
    return this.eventBus.fire(t, n);
  }
  on(t, n) {
    this.eventBus.on(t, n);
  }
  off(t, n) {
    this.eventBus.off(t, n);
  }
  setConfig(t, n) {
    const i = this.getConfig(t);
    this.configuration[t.id || t] = {
      ...i,
      ...n
    }, this.emit(gf, {
      element: t,
      config: this.configuration[t.id || t]
    }), this.elementChanged(t);
  }
  // 设置网关的激活 outgoing
  setGatewayActiveOutgoingByFlowIds(t) {
    const n = this._injector.get("elementRegistry"), i = this._injector.get("exclusiveGatewaySettings"), r = new Set(t), o = n.filter(
      (s) => O(s, "bpmn:ExclusiveGateway") || O(s, "bpmn:InclusiveGateway")
    );
    console.log(`找到 ${o.length} 个网关`), o.forEach((s) => {
      const a = s.outgoing.filter(
        (d) => O(d, "bpmn:SequenceFlow")
      );
      if (a.length < 2) {
        console.log(
          `网关 ${s.id} 只有 ${a.length} 个出口，跳过`
        );
        return;
      }
      const l = a.filter((d) => r.has(d.id)), u = O(s, "bpmn:ExclusiveGateway"), c = O(s, "bpmn:InclusiveGateway");
      if (u)
        if (l.length > 0) {
          const d = l[0];
          console.log(
            `设置排他网关 ${s.id} 的激活出口为: ${d.id}`
          ), i.setSequenceFlowTo(s, d), l.length > 1 && console.warn(
            `排他网关 ${s.id} 在 flowIds 中有多个出口 [${l.map((h) => h.id).join(", ")}]，仅激活第一个: ${d.id}`
          );
        } else
          console.log(`排他网关 ${s.id} 没有匹配的出口，保持默认配置`);
      else c && (l.length > 0 ? (console.log(
        `设置包容网关 ${s.id} 的激活出口为: [${l.map((d) => d.id).join(", ")}]`
      ), this.setConfig(s, {
        activeOutgoing: l
      }), a.forEach((d) => {
        const h = this._injector.get("canvas");
        l.includes(d) ? h.addMarker(d, "token-simulation-gateway-selected") : h.removeMarker(d, "token-simulation-gateway-selected");
      })) : console.log(
        `包容网关 ${s.id} 没有匹配的出口，保持默认配置（全部激活）`
      ));
    }), console.log("网关激活出口设置完成");
  }
  /**
   * 直接解析模拟流转路径（不依赖动画）
   * - list: 节点顺序（包含重复节点，便于表达回环）
   * - messages: 解析日志
   * - errors: 解析错误
   */
  async getSimulationPath(t = {}) {
    const n = Number.isFinite(t.maxLoopCount) ? Math.max(1, Math.floor(t.maxLoopCount)) : 2, i = Math.min(2, n), r = {
      list: [],
      messages: [],
      errors: [],
      maxLoopCount: i,
      reachedEndNode: !1,
      errorSet: /* @__PURE__ */ new Set(),
      flowVisitCount: /* @__PURE__ */ new Map(),
      started: !1,
      aborted: !1
    }, o = "__SIMULATION_PATH_LOOP_ABORT__", s = this.eventBus, a = this.createSilentEventBus();
    this.eventBus = a, this.on(xn, () => {
      for (const d of this.changedElements)
        this.emit(uo, {
          element: d,
          silentPathSimulation: !0
        });
      this.changedElements.clear();
    });
    const l = (d, h) => {
      const E = h == null ? void 0 : h.element;
      d !== "exit" || !this.isPathNodeElement(E) || (r.list.push(E), r.messages.push(`经过节点: ${this.describeElement(E)}`), O(E, "bpmn:EndEvent") && (r.reachedEndNode = !0));
    }, u = this.trace;
    this.trace = (d, h) => {
      l(d, h);
    };
    const c = this.patchBehaviorsForPathSimulation(r, o);
    try {
      this.reset();
      const d = this.findScopes((p) => !p.parent && !p.destroyed);
      d.length || this.pushSimulationError(r, "没有找到可解析的流程根节点（Process/Participant）");
      for (const p of d)
        this.startPathSimulationForRootScope(p, r);
      r.started || this.pushSimulationError(r, "没有找到开始节点"), await Promise.resolve();
      const h = this.findScopes((p) => !p.destroyed), E = h.filter((p) => !p.parent), f = h.length > 0 && h.length === E.length && E.every((p) => p.children.length === 0);
      if (r.reachedEndNode || this.pushSimulationError(r, "没有结束节点，或无法到达结束节点"), r.started && !f && !r.aborted) {
        const p = h.filter((C) => C.parent), g = p.length > 0 ? p.slice(0, 5).map((C) => this.describeElement(C.element)).join(", ") : "无可识别等待节点";
        this.pushSimulationError(r, `模拟未自然结束，存在等待中的流转: ${g}`);
      }
    } catch (d) {
      d && d.message === o ? r.aborted = !0 : this.pushSimulationError(r, `路径解析异常: ${(d == null ? void 0 : d.message) || String(d)}`);
    } finally {
      this.trace = u, c(), this.eventBus = s, this.changedElements.clear();
    }
    return {
      list: r.list,
      messages: r.messages,
      errors: r.errors
    };
  }
  initializeRootScopes() {
    const t = [];
    return this.elementRegistry.forEach((n) => {
      if (!Xt(n, ["bpmn:Process", "bpmn:Participant"]))
        return;
      const i = this.createScope(
        {
          element: n
        },
        !1
      );
      t.push(i);
      const r = n.children.filter($t), o = n.children.filter(Yi);
      for (const s of r) {
        const a = {
          ...this.getEvent(s),
          interrupting: !1
        };
        this.subscribe(i, a, (l) => {
          if (this.findScopes((c) => c.running).length > 0) {
            this.reset();
            const c = this.findScope((d) => d.element === n);
            if (c)
              return this.signal({
                element: n,
                startEvent: s,
                initiator: l,
                scope: c
              });
          }
          return this.signal({
            element: n,
            startEvent: s,
            initiator: l
          });
        });
      }
      if (!r.length)
        for (const s of o) {
          const a = this.getNoneEvent(s);
          this.subscribe(i, a, (l) => {
            if (this.findScopes((c) => c.running).length > 0) {
              this.reset();
              const c = this.findScope((d) => d.element === n);
              if (c)
                return this.signal({
                  element: n,
                  initiator: l,
                  scope: c
                });
            }
            return this.signal({
              element: n,
              initiator: l
            });
          });
        }
    }), t;
  }
  initializeScope(t) {
    const { element: n } = t, i = this.createScope(t), { attachers: r = [] } = n, o = Qt(n, this.elementRegistry);
    for (const s of o)
      if (Mt(s)) {
        const a = Qt(s, this.elementRegistry).filter(
          (l) => $t(l) && !Ki(l)
        );
        for (const l of a)
          this.subscribe(i, l, (u) => this.signal({
            element: s,
            parentScope: i,
            startEvent: l,
            initiator: u
          }));
      }
    for (const s of r)
      Ei(s) && !Ki(s) && this.subscribe(i, s, (a) => this.signal({
        element: s,
        parentScope: i.parent,
        hostScope: i,
        initiator: a
      }));
    return i;
  }
  getConfig(t) {
    return this.configuration[t.id || t] || {};
  }
  waitForScopes(t, n) {
    if (!n.length)
      return;
    const i = {
      type: "all-completed",
      persistent: !1
    }, r = new Set(n), o = (s) => {
      r.delete(s.scope), r.size === 0 && (this.off(St, o), this.trigger({
        scope: t,
        event: i
      }));
    };
    return this.on(St, o), i;
  }
  waitAtElement(t, n = !0) {
    this.setConfig(t, {
      wait: n
    });
  }
  reset() {
    for (const t of this.scopes)
      this.destroyScope(t, null, !0);
    this.jobs.length = 0;
    for (const t of this.initializeRootScopes())
      this.scopes.add(t);
    this.emit(xn), this.emit(ll);
  }
  registerBehavior(t, n) {
    this.behaviors[t] = n;
  }
  isRethrow(t, n) {
    return t.boundary && !n.boundary;
  }
  startPathSimulationForRootScope(t, n) {
    const i = t.element, r = i.children || Qt(i, this.elementRegistry), o = r.filter((a) => $t(a));
    if (o.length) {
      for (const a of o)
        n.started = !0, this.signal({
          element: i,
          startEvent: a,
          scope: t
        });
      return;
    }
    r.filter((a) => Yi(a)).length && (n.started = !0, this.signal({
      element: i,
      scope: t
    }));
  }
  patchBehaviorsForPathSimulation(t, n) {
    var a, l, u, c;
    const i = [], r = this.behaviors["bpmn:SequenceFlow"];
    if (r) {
      const d = (a = r.enter) == null ? void 0 : a.bind(r), h = (l = r.exit) == null ? void 0 : l.bind(r);
      r.enter = (E) => {
        this.exit(E);
      }, r.exit = (E) => {
        var C, B;
        const f = E == null ? void 0 : E.element, p = (f == null ? void 0 : f.id) || `${((C = f == null ? void 0 : f.source) == null ? void 0 : C.id) || "unknown"}->${((B = f == null ? void 0 : f.target) == null ? void 0 : B.id) || "unknown"}`, g = t.flowVisitCount.get(p) || 0;
        if (g >= t.maxLoopCount)
          throw this.pushSimulationError(
            t,
            `检测到多次回环路径: ${p}（最多允许 ${t.maxLoopCount} 次）`
          ), t.aborted = !0, new Error(n);
        return t.flowVisitCount.set(p, g + 1), t.messages.push(
          `经过连线: ${p}（第 ${g + 1}/${t.maxLoopCount} 次）`
        ), this.validateLaneTransition(f, t), h ? h(E) : void 0;
      }, i.push(() => {
        d && (r.enter = d), h && (r.exit = h);
      });
    }
    const o = this.behaviors["bpmn:MessageFlow"];
    if (o) {
      const d = (u = o.signal) == null ? void 0 : u.bind(o);
      o.signal = (h) => {
        this.exit(h);
      }, i.push(() => {
        d && (o.signal = d);
      });
    }
    const s = this.behaviors["bpmn:EventBasedGateway"];
    if (s) {
      const d = (c = s.enter) == null ? void 0 : c.bind(s);
      s.enter = (h) => {
        d == null || d(h);
        const { element: E, scope: f } = h, p = f == null ? void 0 : f.parent;
        if (!p || !(E != null && E.outgoing))
          return;
        const g = E.outgoing.map((F) => F == null ? void 0 : F.target).filter((F) => Xt(F, ["bpmn:IntermediateCatchEvent", "bpmn:ReceiveTask"]));
        if (!g.length)
          return;
        const C = g.map(
          (F) => this.findSubscription({
            scope: p,
            element: F
          })
        ).filter((F) => !!F);
        if (!C.length)
          return;
        const { activeOutgoing: B } = this.getConfig(E), $ = (B == null ? void 0 : B.target) || B, v = C.find((F) => F.element === $) || C[0];
        t.messages.push(
          `事件网关 ${this.describeElement(E)} 自动选择出口: ${this.describeElement(v.element)}`
        ), v.triggerFn(f);
      }, i.push(() => {
        d && (s.enter = d);
      });
    }
    return () => {
      i.forEach((d) => d());
    };
  }
  validateLaneTransition(t, n) {
    if (!t)
      return;
    const i = this.getAncestorByType(t.source, "bpmn:Lane"), r = this.getAncestorByType(t.target, "bpmn:Lane");
    i && r && i !== r && this.pushSimulationError(
      n,
      `泳道间异常流转: ${t.id || "unknown-flow"} (${i.id} -> ${r.id})`
    );
  }
  getAncestorByType(t, n) {
    let i = t;
    for (; i; ) {
      if (O(i, n))
        return i;
      i = i.parent;
    }
    return null;
  }
  describeElement(t) {
    if (!t)
      return "unknown";
    const n = Te(t).name, i = n ? `${n}` : t.type;
    return `${t.id}(${i})`;
  }
  isPathNodeElement(t) {
    return !(!t || ai(t) || Xt(t, [
      "bpmn:SequenceFlow",
      "bpmn:MessageFlow",
      "bpmn:Association",
      "bpmn:Process",
      "bpmn:Participant",
      "bpmn:Lane"
    ]));
  }
  pushSimulationError(t, n) {
    t.errorSet.has(n) || (t.errorSet.add(n), t.errors.push(n));
  }
  createSilentEventBus() {
    const t = /* @__PURE__ */ new Map(), n = (i) => Array.isArray(i) ? i : [i];
    return {
      on: (i, r) => {
        for (const o of n(i)) {
          const s = t.get(o) || /* @__PURE__ */ new Set();
          s.add(r), t.set(o, s);
        }
      },
      off: (i, r) => {
        for (const o of n(i)) {
          const s = t.get(o);
          s && (s.delete(r), s.size || t.delete(o));
        }
      },
      fire: (i, r = {}) => {
        const o = t.get(i);
        if (!o)
          return r;
        for (const s of o)
          s(r);
        return r;
      }
    };
  }
  isImplicitMessageCatch(t) {
    return O(t, "bpmn:ReceiveTask") || t.incoming && t.incoming.some((n) => O(n, "bpmn:MessageFlow"));
  }
  isSpecialBoundaryEvent(t) {
    if (!Ei(t))
      return !1;
    const n = this.getEventDefinitions(t);
    return !n[0] || Xt(n[0], ["bpmn:ConditionalEventDefinition", "bpmn:TimerEventDefinition"]);
  }
  getEventDefinitions(t) {
    return t.businessObject.get("eventDefinitions") || [];
  }
}
y(Sl, "$inject", ["injector", "eventBus", "elementRegistry"]);
class _l {
  constructor(t, n) {
    y(this, "_simulator");
    y(this, "_activityBehavior");
    this._simulator = t, this._activityBehavior = n, t.registerBehavior("bpmn:StartEvent", this);
  }
  signal(t) {
    this._simulator.exit(t);
  }
  exit(t) {
    this._activityBehavior.exit(t);
  }
}
y(_l, "$inject", ["simulator", "activityBehavior"]);
class Cl {
  constructor(t, n, i) {
    y(this, "_intermediateThrowEventBehavior");
    y(this, "_scopeBehavior");
    this._intermediateThrowEventBehavior = i, this._scopeBehavior = n, t.registerBehavior("bpmn:EndEvent", this);
  }
  enter(t) {
    this._intermediateThrowEventBehavior.enter(t);
  }
  signal(t) {
    this._intermediateThrowEventBehavior.signal(t);
  }
  exit(t) {
    const { scope: n } = t;
    this._scopeBehavior.tryExit(n.parent, n);
  }
}
y(Cl, "$inject", ["simulator", "scopeBehavior", "intermediateThrowEventBehavior"]);
class kl {
  constructor(t, n, i) {
    y(this, "_simulator");
    y(this, "_activityBehavior");
    y(this, "_scopeBehavior");
    this._simulator = t, this._activityBehavior = n, this._scopeBehavior = i, t.registerBehavior("bpmn:BoundaryEvent", this);
  }
  signal(t) {
    const {
      element: n,
      scope: i,
      hostScope: r = this._simulator.findScope({
        parent: i.parent,
        element: n.host
      })
    } = t;
    if (!r)
      throw new Error("host scope not found");
    if (Te(n).cancelActivity) {
      this._scopeBehavior.interrupt(r, i);
      const s = this._scopeBehavior.tryExit(r, i);
      if (s) {
        const a = this._simulator.subscribe(r, s, (l) => (a.remove(), this._simulator.exit(t)));
        return;
      }
    }
    this._simulator.exit(t);
  }
  exit(t) {
    this._activityBehavior.exit(t);
  }
}
y(kl, "$inject", ["simulator", "activityBehavior", "scopeBehavior"]);
class Tl {
  constructor(t, n) {
    y(this, "_simulator");
    y(this, "_activityBehavior");
    this._simulator = t, this._activityBehavior = n, t.registerBehavior("bpmn:IntermediateCatchEvent", this), t.registerBehavior("bpmn:ReceiveTask", this);
  }
  signal(t) {
    return this._simulator.exit(t);
  }
  enter(t) {
    return this._simulator.signal(t);
  }
  exit(t) {
    this._activityBehavior.exit(t);
  }
}
y(Tl, "$inject", ["simulator", "activityBehavior"]);
class Al {
  constructor(t, n, i) {
    y(this, "_simulator");
    y(this, "_activityBehavior");
    y(this, "_eventBehaviors");
    this._simulator = t, this._activityBehavior = n, this._eventBehaviors = i, t.registerBehavior("bpmn:IntermediateThrowEvent", this), t.registerBehavior("bpmn:SendTask", this);
  }
  enter(t) {
    const { element: n } = t, i = this._eventBehaviors.get(n);
    if (i) {
      const r = i(t);
      if (r)
        return this._activityBehavior.signalOnEvent(t, r);
    }
    this._activityBehavior.enter(t);
  }
  signal(t) {
    this._activityBehavior.signal(t);
  }
  exit(t) {
    this._activityBehavior.exit(t);
  }
}
y(Al, "$inject", ["simulator", "activityBehavior", "eventBehaviors"]);
class Ol {
  constructor(t, n) {
    y(this, "_simulator");
    y(this, "_scopeBehavior");
    this._scopeBehavior = n, this._simulator = t, t.registerBehavior("bpmn:ExclusiveGateway", this);
  }
  enter(t) {
    this._simulator.exit(t);
  }
  exit(t) {
    const { element: n, scope: i } = t, r = Vn(n.outgoing);
    if (r.length === 1)
      return this._simulator.enter({
        element: r[0],
        scope: i.parent
      });
    const { activeOutgoing: o } = this._simulator.getConfig(n);
    let s = r.find((a) => a === o);
    return s || (n.businessObject.default && (s = r.find((a) => a.id === n.businessObject.default.id)), s || (s = r[0])), s ? this._simulator.enter({
      element: s,
      scope: i.parent
    }) : this._scopeBehavior.tryExit(i.parent, i);
  }
}
y(Ol, "$inject", ["simulator", "scopeBehavior"]);
class Bl {
  constructor(t, n) {
    y(this, "_simulator");
    y(this, "_activityBehavior");
    this._simulator = t, this._activityBehavior = n, t.registerBehavior("bpmn:ParallelGateway", this);
  }
  enter(t) {
    const { scope: n } = t, i = this._findJoiningScopes(t);
    if (i.length) {
      for (const r of i)
        r !== n && this._simulator.destroyScope(r.complete(), n);
      this._simulator.exit(t);
    }
  }
  /**
   * Find scopes that will be joined by this transition.
   *
   * @param {Object} enterContext
   * @return {Scope[]} scopes joined by this transition
   */
  _findJoiningScopes(t) {
    const { scope: n, element: i } = t, r = Vn(i.incoming), { parent: o } = n, s = this._simulator.findScopes({
      parent: o,
      element: i
    }), a = r.map((l) => s.find((u) => u.initiator.element === l)).filter((l) => l);
    return a.length === r.length ? a : [];
  }
  exit(t) {
    this._activityBehavior.exit(t);
  }
}
y(Bl, "$inject", ["simulator", "activityBehavior"]);
class Dl {
  constructor(t) {
    y(this, "_simulator");
    this._simulator = t, t.registerBehavior("bpmn:EventBasedGateway", this);
  }
  enter(t) {
    const { element: n, scope: i } = t, r = i.parent, s = $f(n).map(
      (a) => this._simulator.subscribe(r, a, (l) => (s.forEach((u) => u.remove()), this._simulator.destroyScope(i, l), this._simulator.signal({
        element: a,
        parentScope: r,
        initiator: l
      })))
    );
  }
}
y(Dl, "$inject", ["simulator"]);
function $f(e) {
  return e.outgoing.map((t) => t.target).filter((t) => Xt(t, ["bpmn:IntermediateCatchEvent", "bpmn:ReceiveTask"]));
}
function Yo(e, t) {
  return (Te(e).eventDefinitions || []).find(
    (r) => O(r, t)
  );
}
function xf(e, t) {
  return !!Yo(e, t);
}
class Il {
  constructor(t, n) {
    y(this, "_simulator");
    y(this, "_activityBehavior");
    this._simulator = t, this._activityBehavior = n, t.registerBehavior("bpmn:InclusiveGateway", this);
  }
  enter(t) {
    this._tryJoin(t);
  }
  exit(t) {
    const { element: n, scope: i } = t, r = Vn(n.outgoing);
    if (r.length > 1) {
      const { activeOutgoing: o = [] } = this._simulator.getConfig(n);
      o.length || o.push(...r);
      for (const s of o)
        this._simulator.enter({
          element: s,
          scope: i.parent
        });
    } else
      this._activityBehavior.exit(t);
  }
  _tryJoin(t) {
    var n = t.exclude || [];
    const { scope: i, element: r } = t, { parent: o } = i, s = Vn(r.incoming), a = this._simulator.findScopes({
      parent: o,
      element: r
    }).filter((g) => !n.includes(g)), l = s.filter(
      (g) => !a.find((C) => C.initiator.element === g)
    ), u = s.filter(
      (g) => a.find((C) => C.initiator.element === g)
    ), h = this._getRemainingScopes(t).filter(
      (g) => l.some((C) => this._canReachElement(t, g.element, C))
    ).filter(
      (g) => !u.some((C) => this._canReachElement(t, g.element, C))
    );
    if (h.length || this._join(t, u, a, n), this._simulator.findScopes({
      parent: o,
      element: r
    }).filter((g) => !n.includes(g))[0] !== i)
      return;
    const f = this._simulator.waitForScopes(i, h), p = this._simulator.subscribe(i, f, () => {
      p.remove(), this._tryJoin(t);
    });
  }
  /**
   * Get scopes that may potentially be waited for,
   * in the context of an inclusive gateway.
   *
   * @param {object} context
   * @return {object[]}
   */
  _getRemainingScopes(t) {
    const { scope: n, element: i } = t, { parent: r } = n;
    return this._simulator.findScopes(
      (o) => o.parent === r && o.element !== i
    );
  }
  /**
   * Activates the inclusive gateway join.
   *
   * @param {object} context
   * @param {object[]} incomingFlowsWithToken
   * @param {object[]} gatewayScopes
   * @param {object[]} exclude
   *
   * @return {object[]} scopes
   */
  _join(t, n, i, r) {
    const { scope: o } = t, s = n.map(
      (l) => i.find((u) => u.initiator.element === l)
    );
    for (const l of s)
      l !== o && this._simulator.destroyScope(l.complete(), o);
    this._simulator.exit(t), r.push(o);
    const a = i.filter((l) => !s.includes(l));
    a.length && this._tryJoin({
      initiator: a[0].initiator,
      element: a[0].element,
      scope: a[0],
      exclude: r
    });
  }
  /**
   * Return true if the target element can be reached
   * from the current element, searching the execution
   * graph backwards.
   *
   * @param {object[]} context
   * @param {object} targetElement
   * @param {object} currentElement
   * @param {Set<object>} traversed
   *
   * @return {boolean}
   */
  _canReachElement(t, n, i, r = /* @__PURE__ */ new Set()) {
    return t.element === i || r.has(i) ? !1 : (r.add(i), n === i ? !0 : Yt(i) ? this._canReachElement(t, n, i.source, r) : Go(i) ? Ff(
      i.parent.children,
      Pl(i)
    ).some(
      (a) => this._canReachElement(t, n, a, r)
    ) : Vn(i.incoming).some(
      (s) => this._canReachElement(t, n, s, r)
    ));
  }
}
y(Il, "$inject", ["simulator", "activityBehavior"]);
function Pl(e) {
  return Yo(e, "bpmn:LinkEventDefinition").name;
}
function Ff(e, t) {
  return e.filter((n) => If(n) && Pl(n) === t);
}
class $l {
  constructor(t, n, i) {
    this._simulator = t, this._scopeBehavior = n, this._transactionBehavior = i;
    const r = [
      "bpmn:BusinessRuleTask",
      "bpmn:CallActivity",
      "bpmn:ManualTask",
      "bpmn:ScriptTask",
      "bpmn:ServiceTask",
      "bpmn:Task",
      "bpmn:UserTask"
    ];
    for (const o of r)
      t.registerBehavior(o, this);
  }
  signal(t) {
    const n = this._triggerMessages(t);
    if (n)
      return this.signalOnEvent(t, n);
    this._simulator.exit(t);
  }
  enter(t) {
    const { element: n } = t, i = this.waitAtElement(n);
    if (i)
      return this.signalOnEvent(t, i);
    const r = this._triggerMessages(t);
    if (r)
      return this.signalOnEvent(t, r);
    this._simulator.exit(t);
  }
  exit(t) {
    const { element: n, scope: i } = t, r = i.parent, o = i.active && !i.failed;
    o && !Mt(n) && this._transactionBehavior.registerCompensation(i);
    const s = o ? n.outgoing.filter(Yt) : [];
    s.forEach(
      (a) => this._simulator.enter({
        element: a,
        scope: r
      })
    ), s.length === 0 && this._scopeBehavior.tryExit(r, i);
  }
  signalOnEvent(t, n) {
    const { scope: i, element: r } = t, o = this._simulator.subscribe(i, n, (s) => (o.remove(), this._simulator.signal({
      scope: i,
      element: r,
      initiator: s
    })));
  }
  waitAtElement(t) {
    return this._simulator.getConfig(t).wait && {
      element: t,
      type: "continue",
      interrupting: !1,
      boundary: !1
    };
  }
  _getMessageContexts(t, n = null) {
    const i = n ? (o) => o.referencePoint.x > n.x : () => !0, r = (o, s) => o.referencePoint.x - s.referencePoint.x;
    return [
      ...t.incoming.filter(Rr).map((o) => ({
        incoming: o,
        referencePoint: this.last(o.waypoints)
      })),
      ...t.outgoing.filter(Rr).map((o) => ({
        outgoing: o,
        referencePoint: this.first(o.waypoints)
      }))
    ].sort(r).filter(i);
  }
  _triggerMessages(t) {
    const { element: n, initiator: i, scope: r } = t;
    let o = r.messageContexts;
    o || (o = r.messageContexts = this._getMessageContexts(n));
    const s = i && i.element;
    if (!(Rr(s) && r.expectedIncoming !== s))
      for (; o.length; ) {
        const { incoming: a, outgoing: l } = o.shift();
        if (a) {
          if (!i) continue;
          return r.expectedIncoming = a, {
            element: n,
            type: "message",
            name: a.id,
            interrupting: !1,
            boundary: !1
          };
        }
        this._simulator.signal({ element: l });
      }
  }
  first(t) {
    return t && t[0];
  }
  last(t) {
    return t && t[t.length - 1];
  }
}
y($l, "$inject", ["simulator", "scopeBehavior", "transactionBehavior"]);
class xl {
  constructor(t, n, i, r, o) {
    y(this, "_simulator");
    y(this, "_activityBehavior");
    y(this, "_scopeBehavior");
    y(this, "_transactionBehavior");
    y(this, "_elementRegistry");
    this._simulator = t, this._activityBehavior = n, this._scopeBehavior = i, this._transactionBehavior = r, this._elementRegistry = o, t.registerBehavior("bpmn:SubProcess", this), t.registerBehavior("bpmn:Transaction", this), t.registerBehavior("bpmn:AdHocSubProcess", this);
  }
  signal(t) {
    this._start(t);
  }
  enter(t) {
    const { element: n } = t, i = this._activityBehavior.waitAtElement(n);
    if (i)
      return this._activityBehavior.signalOnEvent(t, i);
    this._start(t);
  }
  exit(t) {
    const { scope: n } = t, i = n.parent;
    i.failInitiator === n && i.complete(), this._activityBehavior.exit(t);
  }
  _start(t) {
    const { element: n, startEvent: i, scope: r } = t, o = r.parent;
    if (Mt(n)) {
      if (!i)
        throw new Error("missing <startEvent>: required for event sub-process");
    } else if (i)
      throw new Error("unexpected <startEvent>: not allowed for sub-process");
    if (o.destroyed)
      return;
    Mf(n) && this._transactionBehavior.setup(t), i && wl(i) && this._scopeBehavior.interrupt(o, r);
    const s = this._findStarts(n, i);
    for (const a of s)
      $t(a) ? this._simulator.signal({
        element: a,
        parentScope: r,
        initiator: r
      }) : this._simulator.enter({
        element: a,
        scope: r,
        initiator: r
      });
    s.length || this._simulator.exit(t);
  }
  _findStarts(t, n) {
    const i = n ? (r) => n === r : (r) => El(r);
    return Qt(t, this._elementRegistry).filter(
      (r) => i(r) || Yi(r)
    );
  }
}
y(xl, "$inject", [
  "simulator",
  "activityBehavior",
  "scopeBehavior",
  "transactionBehavior",
  "elementRegistry"
]);
function Mf(e) {
  return O(e, "bpmn:Transaction");
}
const zr = {
  type: "cancel",
  interrupting: !0,
  boundary: !1,
  persistent: !0
};
class Fl {
  constructor(t, n, i) {
    y(this, "_simulator");
    y(this, "_scopeBehavior");
    y(this, "_elementRegistry");
    this._simulator = t, this._scopeBehavior = n, this._elementRegistry = i;
  }
  setup(t) {
    const { scope: n } = t, i = this._simulator.subscribe(n, zr, (s) => (i.remove(), this.cancel({
      scope: n,
      initiator: s
    }))), r = {
      type: "compensate",
      ref: n.element,
      persistent: !0,
      traits: oe.NOT_DEAD
    }, o = this._simulator.subscribe(
      n,
      r,
      (s) => n.canceled ? (o.remove(), this.compensate({
        scope: n,
        element: n.element,
        initiator: s
      })) : this._simulator.trigger({
        event: zr,
        scope: n
      })
    );
  }
  cancel(t) {
    const { scope: n, initiator: i } = t;
    if (!n.destroyed)
      return n.cancel(i), this._simulator.trigger({
        event: {
          type: "compensate",
          ref: n.element
        },
        initiator: i,
        scope: n
      }), this._simulator.trigger({
        scope: n,
        initiator: i,
        event: zr
      });
  }
  registerCompensation(t) {
    const { element: n } = t, r = Qt(n, this._elementRegistry).filter(Mt).map(
      (a) => Qt(a, this._elementRegistry).find(
        (l) => $t(l) && Ki(l)
      )
    ).filter((a) => a), o = n.attachers.filter(Ki);
    if (!r.length && !o.length)
      return;
    const s = this.findTransactionScope(t);
    O(s.element, "bpmn:Transaction") || this.makeCompensable(s);
    for (const a of r) {
      const l = {
        element: a,
        type: "compensate",
        persistent: !0,
        interrupting: !0,
        ref: n,
        traits: oe.NOT_DEAD
      }, u = a.parent, c = this._simulator.subscribe(t, l, (d) => (c.remove(), this._simulator.signal({
        initiator: d,
        element: u,
        startEvent: a,
        parentScope: t
      })));
    }
    for (const a of o) {
      const l = {
        element: a,
        type: "compensate",
        persistent: !0,
        ref: n,
        traits: oe.NOT_DEAD
      }, u = a.outgoing.map((d) => d.target).find(bl);
      if (!u)
        continue;
      const c = this._simulator.subscribe(
        s,
        l,
        (d) => (c.remove(), this._simulator.enter({
          initiator: d,
          element: u,
          scope: s
        }))
      );
    }
  }
  makeCompensable(t) {
    if (t.hasTrait(oe.COMPENSABLE) || !t.parent)
      return;
    const n = {
      type: "compensate",
      ref: t.element,
      interrupting: !0,
      persistent: !0,
      traits: oe.NOT_DEAD
    };
    t.compensable();
    const i = this._simulator.subscribe(t, n, (s) => (i.remove(), t.fail(s), this.compensate({
      scope: t,
      element: t.element,
      initiator: s
    }), this._scopeBehavior.tryExit(t, s), t)), r = t.parent;
    if (!r)
      return;
    const o = this._simulator.subscribe(r, n, (s) => (o.remove(), this._simulator.trigger({
      scope: t,
      event: n,
      initiator: s
    })));
    this.makeCompensable(r);
  }
  findTransactionScope(t) {
    let n = t;
    for (; n; ) {
      const i = n.element;
      if (O(i, "bpmn:SubProcess") && !Mt(i) || Xt(i, ["bpmn:Transaction", "bpmn:Process", "bpmn:Participant"]))
        return n;
      n = n.parent;
    }
    throw Nf(t);
  }
  compensate(t) {
    const { scope: n, element: i } = t, r = mn(
      n.subscriptions,
      (a) => fo({ type: "compensate" }, a.event)
    ), o = r.filter(
      (a) => a.event.ref === i
    ), s = r.filter(
      (a) => a.event.ref !== i
    );
    for (const a of o)
      this._scopeBehavior.preExit(n, (l) => this._simulator.trigger(a));
    for (const a of s.reverse())
      this._scopeBehavior.preExit(n, (l) => this._simulator.trigger(a));
  }
}
y(Fl, "$inject", ["simulator", "scopeBehavior", "elementRegistry"]);
function Nf(e) {
  throw new Error(`no transaction context for <${e.id}>`);
}
class Xo {
  constructor(t, n) {
    y(this, "_simulator");
    y(this, "_scopeBehavior");
    this._simulator = t, this._scopeBehavior = n, t.registerBehavior("bpmn:SequenceFlow", this);
  }
  enter(t) {
    this._simulator.exit(t);
  }
  exit(t) {
    const { element: n, scope: i } = t;
    this._simulator.enter({
      initiator: i,
      element: n.target,
      scope: i.parent
    });
  }
}
y(Xo, "$inject", ["simulator", "scopeBehavior"]);
class Jo {
  constructor(t) {
    y(this, "_simulator");
    this._simulator = t, t.registerBehavior("bpmn:MessageFlow", this);
  }
  signal(t) {
    this._simulator.exit(t);
  }
  exit(t) {
    const { element: n, scope: i } = t, r = n.target, o = Ko(r) ? r : {
      type: "message",
      element: n,
      name: n.id
    }, s = this._simulator.findSubscription({
      event: o,
      elements: [r, r.parent]
    });
    s && this._simulator.trigger({
      event: o,
      initiator: i,
      scope: s.scope
    });
  }
}
y(Jo, "$inject", ["simulator"]);
class Ml {
  constructor(t, n, i) {
    y(this, "_simulator");
    y(this, "_elementRegistry");
    y(this, "_scopeBehavior");
    this._simulator = t, this._elementRegistry = n, this._scopeBehavior = i;
  }
  get(t) {
    const i = Object.entries({
      "bpmn:LinkEventDefinition": (r) => {
        const { element: o, scope: s } = r, a = Os(o), l = s.parent, u = l.element, d = Qt(u, this._elementRegistry).filter(
          (h) => Go(h) && Os(h).name === a.name
        );
        for (const h of d)
          this._simulator.signal({
            element: h,
            parentScope: l,
            initiator: s
          });
      },
      "bpmn:SignalEventDefinition": (r) => {
        const { element: o, scope: s } = r, a = this._simulator.findSubscriptions({
          event: o
        }), l = /* @__PURE__ */ new Set();
        for (const u of a) {
          const c = u.scope;
          l.has(c) || (l.add(c), this._simulator.trigger({
            event: o,
            scope: c,
            initiator: s
          }));
        }
      },
      "bpmn:EscalationEventDefinition": (r) => {
        const { element: o, scope: s } = r, a = this._simulator.findScopes({
          subscribedTo: {
            event: o
          },
          trait: oe.ACTIVE
        });
        let l = s;
        for (; l = l.parent; )
          if (a.includes(l)) {
            this._simulator.trigger({
              event: o,
              scope: l,
              initiator: s
            });
            break;
          }
      },
      "bpmn:ErrorEventDefinition": (r) => {
        const { element: o, scope: s } = r, a = this._simulator.findScopes({
          subscribedTo: {
            event: o
          },
          trait: oe.ACTIVE
        });
        let l = s;
        for (; l = l.parent; )
          if (a.includes(l)) {
            this._simulator.trigger({
              event: o,
              scope: l,
              initiator: s
            });
            break;
          }
      },
      "bpmn:TerminateEventDefinition": (r) => {
        const { scope: o } = r;
        this._scopeBehavior.terminate(o.parent, o);
      },
      "bpmn:CancelEventDefinition": (r) => {
        const { scope: o, element: s } = r;
        this._simulator.trigger({
          event: s,
          initiator: o,
          scope: Bs(o)
        });
      },
      "bpmn:CompensateEventDefinition": (r) => {
        const { scope: o, element: s } = r;
        return this._simulator.waitForScopes(
          o,
          this._simulator.trigger({
            event: s,
            scope: Bs(o)
          })
        );
      }
    }).find((r) => xf(t, r[0]));
    return i && i[1];
  }
}
y(Ml, "$inject", ["simulator", "elementRegistry", "scopeBehavior"]);
function Os(e) {
  return Yo(e, "bpmn:LinkEventDefinition");
}
function Bs(e) {
  for (; Mt(e.parent.element); )
    e = e.parent;
  return e.parent;
}
const Ds = {
  type: "pre-exit",
  persistent: !0,
  interrupting: !0,
  boundary: !1
}, jr = {
  type: "exit",
  interrupting: !0,
  boundary: !1,
  persistent: !0
};
class Nl {
  constructor(t) {
    y(this, "_simulator");
    this._simulator = t;
  }
  /**
   * Is the given scope finished?
   *
   * @param {Scope}  scope
   * @param {Scope|Function} [excludeScope=null]
   *
   * @return {boolean}
   */
  isFinished(t, n = null) {
    const i = Is(n);
    return t.children.every((r) => r.destroyed || r.completed || i(r));
  }
  /**
   * Destroy all scope children.
   *
   * @param {Scope} scope
   * @param {Scope} initiator
   * @param {Scope|Function} [excludeScope=null]
   */
  destroyChildren(t, n, i = null) {
    const r = Is(i);
    t.children.filter((o) => !o.destroyed && !r(o)).map((o) => {
      this._simulator.destroyScope(o, n);
    });
  }
  terminate(t, n) {
    this.destroyChildren(t, n), t.terminate(n), this.tryExit(t, n);
  }
  interrupt(t, n) {
    this.destroyChildren(t, n, n), t.fail(n);
  }
  tryExit(t, n) {
    if (!t)
      throw new Error("missing <scope>");
    if (n || (n = t), !this.isFinished(t, n))
      return jr;
    const i = this._simulator.findSubscriptions({
      event: Ds,
      scope: t
    });
    for (const r of i) {
      const { event: o, scope: s } = r;
      if (this._simulator.trigger({
        event: o,
        scope: s,
        initiator: n
      }).length)
        return jr;
    }
    this._simulator.trigger({
      event: jr,
      scope: t,
      initiator: n
    }), this.exit({
      scope: t,
      initiator: n
    });
  }
  exit(t) {
    const { scope: n, initiator: i } = t;
    if (!i)
      throw new Error("missing <initiator>");
    this._simulator.exit({
      element: n.element,
      scope: n,
      initiator: i
    });
  }
  preExit(t, n) {
    const i = this._simulator.subscribe(t, Ds, (r) => (i.remove(), n(r)));
    return i;
  }
}
y(Nl, "$inject", ["simulator"]);
function Is(e) {
  return typeof e == "function" ? e : (t) => t === e;
}
class Ll {
  constructor(t, n) {
    y(this, "_simulator");
    y(this, "_scopeBehavior");
    this._simulator = t, this._scopeBehavior = n, t.registerBehavior("bpmn:Process", this), t.registerBehavior("bpmn:Participant", this);
  }
  signal(t) {
    const {
      element: n,
      startEvent: i,
      startNodes: r = this._findStarts(n, i),
      scope: o
    } = t;
    if (!r.length)
      throw new Error("missing <startNodes> or <startEvent>");
    for (const s of r)
      $t(s) ? this._simulator.signal({
        element: s,
        parentScope: o
      }) : this._simulator.enter({
        element: s,
        scope: o
      });
  }
  exit(t) {
    const { scope: n, initiator: i } = t;
    this._scopeBehavior.destroyChildren(n, i);
  }
  _findStarts(t, n) {
    const i = n ? (r) => n === r : (r) => El(r);
    return t.children.filter((r) => i(r) || Yi(r));
  }
}
y(Ll, "$inject", ["simulator", "scopeBehavior"]);
const Lf = {
  __init__: [
    "startEventBehavior",
    "endEventBehavior",
    "boundaryEventBehavior",
    "intermediateCatchEventBehavior",
    "intermediateThrowEventBehavior",
    "exclusiveGatewayBehavior",
    "parallelGatewayBehavior",
    "eventBasedGatewayBehavior",
    "inclusiveGatewayBehavior",
    "subProcessBehavior",
    "sequenceFlowBehavior",
    "messageFlowBehavior",
    "processBehavior"
  ],
  startEventBehavior: ["type", _l],
  endEventBehavior: ["type", Cl],
  boundaryEventBehavior: ["type", kl],
  intermediateCatchEventBehavior: ["type", Tl],
  intermediateThrowEventBehavior: ["type", Al],
  exclusiveGatewayBehavior: ["type", Ol],
  parallelGatewayBehavior: ["type", Bl],
  eventBasedGatewayBehavior: ["type", Dl],
  inclusiveGatewayBehavior: ["type", Il],
  activityBehavior: ["type", $l],
  subProcessBehavior: ["type", xl],
  sequenceFlowBehavior: ["type", Xo],
  messageFlowBehavior: ["type", Jo],
  eventBehaviors: ["type", Ml],
  scopeBehavior: ["type", Nl],
  processBehavior: ["type", Ll],
  transactionBehavior: ["type", Fl]
}, Rf = 5e3, Rl = {
  __depends__: [Lf],
  __init__: [
    [
      "eventBus",
      "simulator",
      function(e, t) {
        e.on([Me, et], Rf, () => {
          t.reset();
        });
      }
    ]
  ],
  simulator: ["type", Sl]
};
class zl extends Jo {
  constructor(n, i) {
    super(n.get("simulator"));
    y(this, "_animation");
    this._animation = i;
  }
  signal(n) {
    const { element: i, scope: r } = n;
    this._animation.animate(i, r, () => {
      super.signal(n);
    });
  }
}
y(zl, "$inject", ["injector", "animation"]);
class jl extends Xo {
  constructor(n, i) {
    super(n.get("simulator"), n.get("scopeBehavior"));
    y(this, "_animation");
    this._animation = i;
  }
  enter(n) {
    const { element: i, scope: r } = n;
    this._animation.animate(i, r, () => {
      super.enter(n);
    });
  }
}
y(jl, "$inject", ["injector", "animation"]);
const zf = {
  sequenceFlowBehavior: ["type", jl],
  messageFlowBehavior: ["type", zl]
}, Ps = (e) => !0;
class Vl {
  constructor(t, n) {
    y(this, "_eventBus");
    y(this, "_simulator");
    y(this, "_filter");
    y(this, "_scope");
    this._eventBus = t, this._simulator = n, this._filter = Ps;
    const i = this;
    t.on([Me, et], function() {
      i._filter = Ps;
    }), t.on(St, function(r) {
      const { scope: o } = r;
      i._scope === o && o.parent && i.toggle(o.parent);
    }), t.on(ln, function(r) {
      const { scope: o } = r;
      !o.parent && i._scope && !$s(i._scope, o) && i.toggle(null);
    });
  }
  /**
   * 切换过滤特定的作用域
   * (Toggle filtering for specific scope)
   *
   * @param {Scope} [scope] - 目标作用域，若为空则清除过滤
   */
  toggle(t) {
    const n = this._scope !== t;
    this._scope = n ? t : null, this._filter = this._scope ? (i) => $s(this._scope, i) : (i) => !0, this._eventBus.fire(sr, {
      filter: this._filter,
      scope: this._scope
    });
  }
  /**
   * 检查作用域是否显示
   * (Check if scope is shown)
   *
   * @param {Scope|String} scope
   * @return {Boolean}
   */
  isShown(t) {
    return typeof t == "string" && (t = this._simulator.findScope((n) => n.id === t)), t && this._filter(t);
  }
  isFocused(t) {
    var i;
    const n = t.id || t;
    return ((i = this._scope) == null ? void 0 : i.id) === n;
  }
  findScope(t) {
    return this._simulator.findScopes(t).filter((n) => this.isShown(n))[0];
  }
}
y(Vl, "$inject", ["eventBus", "simulator"]);
function $s(e, t) {
  do
    if (e === t)
      return !0;
  while (t = t.parent);
  return !1;
}
const li = {
  scopeFilter: ["type", Vl]
}, Ul = getComputedStyle(document.documentElement), jf = Ul.getPropertyValue("--token-simulation-green-base-44"), Vf = Ul.getPropertyValue("--token-simulation-white");
function Uf() {
}
function Hf(e, t) {
  return t.length === 2 ? Kf : e === 1 ? Wf : e === t.length - 1 ? Gf : qf;
}
const qf = function(e) {
  return e;
}, Wf = function(e) {
  return -Math.cos(e * Math.PI / 2) + 1;
}, Gf = function(e) {
  return Math.sin(e * Math.PI / 2);
}, Kf = function(e) {
  return -Math.cos(e * Math.PI) / 2 + 0.5;
}, Kt = 20;
class Hl {
  constructor(t, n, i, r) {
    y(this, "_eventBus");
    y(this, "_scopeFilter");
    y(this, "_canvas");
    y(this, "_randomize");
    y(this, "_animations");
    this._eventBus = i, this._scopeFilter = r, this._canvas = n, this._randomize = t && t.randomize !== !1, this._animations = /* @__PURE__ */ new Set(), i.on(["diagram.destroy", et], () => {
      this.clearAnimations();
    }), i.on(jo, () => {
      this.pause();
    }), i.on(Gi, () => {
      this.play();
    }), i.on(sr, (o) => {
      this.each((s) => {
        this._scopeFilter.isShown(s.scope) ? s.show() : s.hide();
      });
    }), i.on(St, (o) => {
      const { scope: s } = o;
      this.clearAnimations(s);
    });
  }
  /**
   * 播放动画
   * (Animate token flow)
   *
   * @param {Connection} connection - 连线
   * @param {Scope} scope - 作用域
   * @param {Function} done - 完成回调
   */
  animate(t, n, i) {
    this.createAnimation(t, n, i);
  }
  pause() {
    this.each((t) => t.pause());
  }
  play() {
    this.each((t) => t.play());
  }
  each(t) {
    this._animations.forEach(t);
  }
  /**
   * 创建动画实例
   * (Create animation instance)
   *
   * @param {Connection} connection - 连线
   * @param {Scope} scope - 作用域
   * @param {Function} done - 完成回调
   *
   * @return {TokenAnimation} 动画实例
   */
  createAnimation(t, n, i = Uf) {
    const r = this._getGroup(n);
    if (!r)
      return;
    const o = this._createTokenGfx(r, n), s = new Yf(
      o,
      t.waypoints,
      this._randomize,
      () => {
        this._clearAnimation(s), i();
      }
    );
    return s.setSpeed(1), this._scopeFilter.isShown(n) || s.hide(), s.scope = n, s.element = t, this._animations.add(s), this._eventBus.fire(vf, {
      animation: s
    }), s.play(), s;
  }
  // Remove setAnimationSpeed and getAnimationSpeed
  clearAnimations(t) {
    this.each((n) => {
      (!t || n.scope === t) && this._clearAnimation(n);
    });
  }
  _clearAnimation(t) {
    t.remove(), this._animations.delete(t);
  }
  _createTokenGfx(t, n) {
    const i = Pt(this._getTokenSVG(n).trim());
    return ao(i, t);
  }
  _getTokenSVG(t) {
    const n = jf, i = Vf;
    return `
      <g class="bts-token">
        <circle
          class="bts-circle"
          r="${Kt / 2}"
          cx="${Kt / 2}"
          cy="${Kt / 2}"
          fill="${n}"
        />
        <path
          class="bts-icon"
          transform="translate(${Kt / 2 - 4}, ${Kt / 2 - 5})"
          d="M0 0 L8 5 L0 10 Z"
          fill="${i}"
        />
      </g>
    `;
  }
  _getGroup(t) {
    var n = this._canvas, i, r;
    "findRoot" in n ? (r = n.findRoot(t.element), i = n._findPlaneForRoot(r).layer) : i = $e(".viewport", n._svg);
    var o = $e(".bts-animation-tokens", i);
    return o || (o = Pt('<g class="bts-animation-tokens" />'), ao(o, i)), o;
  }
}
y(Hl, "$inject", ["config.animation", "canvas", "eventBus", "scopeFilter"]);
class Yf {
  constructor(t, n, i, r) {
    y(this, "gfx");
    y(this, "waypoints");
    y(this, "done");
    y(this, "randomize");
    y(this, "scope");
    y(this, "element");
    y(this, "_paused", !0);
    y(this, "_t", 0);
    y(this, "_parts", []);
    y(this, "_scheduled", !1);
    y(this, "_speed", 1);
    y(this, "_path");
    this.gfx = t, this.waypoints = n, this.done = r, this.randomize = i, this._paused = !0, this._t = 0, this._parts = [], this.create();
  }
  /**
   * 暂停动画
   * (Pause animation)
   */
  pause() {
    this._paused = !0;
  }
  /**
   * 播放动画
   * (Play animation)
   */
  play() {
    this._paused && (this._paused = !1, this.tick(0)), this.schedule();
  }
  /**
   * 调度动画帧
   * (Schedule animation frame)
   */
  schedule() {
    if (this._paused || this._scheduled)
      return;
    const t = Date.now();
    this._scheduled = !0, requestAnimationFrame(() => {
      this._scheduled = !1, !this._paused && (this.tick((Date.now() - t) * this._speed), this.schedule());
    });
  }
  /**
   * 动画帧处理
   * (Animation tick)
   *
   * @param {number} tElapsed - 逝去的时间
   */
  tick(t) {
    const n = this._t = this._t + t, i = this._parts, r = i[i.length - 1].endTime;
    if (n >= r) {
      const d = i[i.length - 1].endLength, h = this._path.getPointAtLength(d);
      return this.move(h.x, h.y), this.completed();
    }
    const o = i.find((c) => c.startTime <= n && c.endTime > n);
    if (!o)
      return this.completed();
    const s = n - o.startTime, a = o.length * o.easing(s / o.duration), l = o.startLength + a, u = this._path.getPointAtLength(l);
    this.move(u.x, u.y);
  }
  move(t, n) {
    Pi(this.gfx, "transform", `translate(${t}, ${n})`);
  }
  /**
   * 创建 SVG 路径和动画参数
   * (Create SVG path and animation parameters)
   */
  create() {
    const t = this.waypoints, n = t.reduce((s, a, l) => {
      const u = t[l - 1];
      if (u) {
        const c = s[s.length - 1], d = c && c.endLength || 0, h = Zf(u, a);
        s.push({
          startLength: d,
          endLength: d + h,
          length: h,
          easing: Hf(l, t)
        });
      }
      return s;
    }, []), i = n.reduce(function(s, a) {
      return s + a.length;
    }, 0), r = t.reduce((s, a, l) => {
      const u = a.x - Kt / 2, c = a.y - Kt / 2;
      return s.push([l > 0 ? "L" : "M", u, c]), s;
    }, []).flat().join(" "), o = Xf(i, this.randomize);
    this._parts = n.reduce((s, a, l) => {
      const u = o / i * a.length, c = l > 0 ? s[l - 1].endTime : 0, d = c + u;
      return [
        ...s,
        {
          ...a,
          startTime: c,
          endTime: d,
          duration: u
        }
      ];
    }, []), this._path = Pt(`<path d="${r}" />`), this._t = 0;
  }
  show() {
    Pi(this.gfx, "display", "");
  }
  hide() {
    Pi(this.gfx, "display", "none");
  }
  completed() {
    this.done();
  }
  remove() {
    this.pause(), Dd(this.gfx);
  }
  setSpeed(t) {
    this._speed = t;
  }
}
function Xf(e, t = !1) {
  const n = Math.log(e) * (t ? Jf(250, 300) : 250), i = e * 1.2;
  return n + i;
}
function Jf(e, t) {
  return e + Math.floor(Math.random() * (t - e));
}
function Zf(e, t) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
const Qf = {
  __depends__: [Rl, zf, li],
  animation: ["type", Hl]
};
function pt(e, t, n = "") {
  return `<svg ${t ? `class="${t}" ` : ""}viewBox="0 0 24 24" ${n}>${e}</svg>`;
}
function xs(e = void 0) {
  return pt('<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>', e);
}
function ql(e = void 0) {
  return pt('<path d="M8 5v14l11-7z"/>', e);
}
function Wl(e = void 0) {
  return pt('<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>', e);
}
function po(e = void 0) {
  return pt(
    '<path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>',
    e
  );
}
function ep(e = void 0) {
  return pt(
    '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>',
    e
  );
}
function ho(e = void 0) {
  return pt(
    '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
    e
  );
}
function tp(e = void 0) {
  return pt(
    '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>',
    e
  );
}
function np(e = void 0) {
  return pt(
    '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
    e
  );
}
function ip(e = void 0) {
  return np(e);
}
function Fs(e = void 0) {
  return pt('<path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"/>', e);
}
function rp(e = void 0) {
  return pt(
    '<path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"/><path d="M0 0h24v24H0z" fill="none"/>',
    e
  );
}
class Gl {
  constructor(t, n, i, r) {
    y(this, "_active", !1);
    const o = this;
    t.on(Me, function(s) {
      o._active = s.active;
    }), t.on(St, function(s) {
      const { scope: a, forced: l } = s;
      if (!o._active || l)
        return;
      const { destroyInitiator: u, element: c } = a;
      !a.completed || !u || !["bpmn:Process", "bpmn:Participant"].includes(c.type) || i.addElementNotification(u.element, {
        type: "success",
        icon: ho(),
        text: r("Finished"),
        i18nKey: "Finished",
        scope: a
      });
    });
  }
}
y(Gl, "$inject", ["eventBus", "simulator", "elementNotifications", "translate"]);
const op = -15, sp = 15;
class Kl {
  constructor(t, n) {
    y(this, "_overlays");
    this._overlays = t;
    const i = this;
    n.on([et, ln, Me], function() {
      i.clear();
    });
  }
  /**
   * 添加元素通知
   * (Add element notification)
   *
   * @param {Element} element
   * @param {Object} options
   */
  addElementNotification(t, n) {
    const { text: i, type: r = "info", icon: o, ttl: s = 2e3 } = n, a = Ge(`
      <div class="bts-element-notification ${r}">
        ${o ? `<span class="bts-icon">${o}</span>` : ""}
        <span class="bts-text">${i}</span>
      </div>
    `), l = this._overlays.add(t, "bts-element-notification", {
      position: {
        top: op,
        right: sp
      },
      show: {
        minZoom: 0.5
      },
      html: a
    });
    s !== -1 && setTimeout(() => {
      this._overlays.remove(l);
    }, s);
  }
  /**
   * 清除所有通知
   * (Clear notifications)
   */
  clear() {
    this._overlays.remove({ type: "bts-element-notification" });
  }
}
y(Kl, "$inject", ["overlays", "eventBus"]);
const Yl = {
  __init__: ["elementNotifications"],
  elementNotifications: ["type", Kl]
}, ap = 2e3;
class Xl {
  constructor(t, n, i, r) {
    y(this, "container");
    y(this, "_interceptors", []);
    this._eventBus = t, this._canvas = n, this._scopeFilter = i, this._translate = r;
    try {
      this._init();
    } catch (o) {
      console.error("Notifications init failed", o);
    }
    this._eventBus.on(["i18n.changed", "simpleTokenSimulation.config.changed"], () => {
      this._updateTexts();
    });
  }
  registerInterceptor(t) {
    this._interceptors.push(t);
  }
  _init() {
    this.container = Ge('<div class="bts-notifications"></div>'), this._canvas.getContainer().appendChild(this.container);
  }
  _updateTexts() {
    if (!this.container) return;
    const t = this.container.querySelectorAll(
      ".bts-notification .bts-text[data-i18n-key]"
    );
    for (const n of Array.from(t)) {
      const i = n, r = i.dataset.i18nKey;
      if (r) {
        const o = this._translate(r);
        i.textContent = o, i.title = o;
      }
    }
  }
  /**
   * 显示通知
   * (Show notification)
   */
  showNotification(t) {
    for (const f of this._interceptors) {
      const p = f(t);
      if (p === !1) return;
      p && (t = p);
    }
    const {
      text: n,
      type: i = "info",
      icon: r,
      scope: o,
      ttl: s = ap,
      i18nKey: a,
      details: l
    } = t;
    if (o && !this._scopeFilter.isShown(o) || !this.container) return;
    this.clear();
    const u = r || "", c = u.startsWith("<") ? u : `<i class="${u}"></i>`, d = o && o.colors, h = d ? `style="color: ${d.auxiliary}; background: ${d.primary}"` : "", E = Ge(`
      <div class="bts-notification ${i}">
        <span class="bts-icon">${c}</span>
        <span class="bts-text" title="${n}" ${a ? `data-i18n-key="${a}"` : ""}>${n}${l || ""}</span>
        ${t.slot ? `<span class="bts-scope bts-slot" ${h}>${t.slot}</span>` : ""}
      </div>
    `);
    this.container.appendChild(E), setTimeout(() => {
      E.classList.add("hidden"), setTimeout(() => {
        E.parentNode && E.remove();
      }, 500);
    }, s);
  }
  /**
   * 清除所有通知
   * (Clear all notifications)
   */
  clear() {
    if (this.container)
      for (; this.container.children.length; )
        this.container.children[0].remove();
  }
}
y(Xl, "$inject", ["eventBus", "canvas", "scopeFilter", "translate"]);
const On = {
  __depends__: [li],
  notifications: ["type", Xl]
}, lp = {
  __depends__: [Yl, On],
  __init__: ["simulationState"],
  simulationState: ["type", Gl]
};
class Jl {
  constructor(t, n, i) {
    y(this, "_eventBus");
    y(this, "_canvas");
    y(this, "_scopeFilter");
    y(this, "_highlight");
    y(this, "_container");
    this._eventBus = t, this._canvas = n, this._scopeFilter = i, this._highlight = null, this._init();
    const r = this;
    t.on(Me, function(o) {
      o.active ? ae(r._container).remove("hidden") : (ae(r._container).add("hidden"), pf(r._container), r.unhighlightScope());
    }), t.on(sr, function(o) {
      const s = r.getScopeElements();
      for (const a of s) {
        const l = a.dataset.scopeId;
        l && (ae(a).toggle("inactive", !r._scopeFilter.isShown(l)), ae(a).toggle("focussed", r._scopeFilter.isFocused(l)));
      }
    }), t.on(ln, function(o) {
      r.addScope(o.scope);
    }), t.on(St, function(o) {
      r.removeScope(o.scope);
    }), t.on(Vo, function(o) {
      r.updateScope(o.scope);
    }), t.on(et, function() {
      r.removeAllInstances();
    });
  }
  _init() {
    this._container = Ge('<div class="bts-scopes hidden"></div>'), this._canvas.getContainer().appendChild(this._container);
  }
  addScope(t) {
    const n = ["bpmn:Process", "bpmn:SubProcess", "bpmn:Participant"], { element: i } = t;
    if (!nn(i, n))
      return;
    const r = Ge(`
      <div data-scope-id="${t.id}" class="bts-scope"
           title="Focus process instance ${t.id}">
        ${t.getTokens()}
      </div>
    `);
    Et.bind(r, "click", () => {
      this._scopeFilter.toggle(t);
    }), Et.bind(r, "mouseenter", () => {
      this.highlightScope(i);
    }), Et.bind(r, "mouseleave", () => {
      this.unhighlightScope();
    }), this._scopeFilter.isShown(t) || ae(r).add("inactive"), ae(r).toggle("focussed", this._scopeFilter.isFocused(t)), this._container.appendChild(r);
  }
  getScopeElements() {
    return al("[data-scope-id]", this._container);
  }
  getScopeElement(t) {
    return $e(`[data-scope-id="${t.id}"]`, this._container);
  }
  updateScope(t) {
    const n = this.getScopeElement(t);
    n && (n.textContent = t.getTokens());
  }
  removeScope(t) {
    const n = this.getScopeElement(t);
    n && n.remove();
  }
  removeAllInstances() {
    this._container.innerHTML = "";
  }
  highlightScope(t) {
    this.unhighlightScope(), this._highlight = t, this._canvas.addMarker(t, "token-simulation-scope-highlight"), t.parent || ae(this._canvas.getContainer()).add("highlight");
  }
  unhighlightScope() {
    if (!this._highlight)
      return;
    const t = this._highlight;
    this._canvas.removeMarker(t, "token-simulation-scope-highlight"), t.parent || ae(this._canvas.getContainer()).remove("highlight"), this._highlight = null;
  }
}
y(Jl, "$inject", ["eventBus", "canvas", "scopeFilter"]);
const cp = {
  __depends__: [li],
  __init__: ["showScopes"],
  showScopes: ["type", Jl]
}, up = {
  copy: "fbpmn-icon-copy-service-task",
  sc: "fbpmn-icon-sc-service-task",
  dubbo: "fbpmn-icon-dubbo-service-task",
  dmn: "fbpmn-icon-dmn-service-task",
  ai: "fbpmn-icon-ai-service-task",
  mq: "fbpmn-icon-mq-service-task",
  mqtt: "fbpmn-icon-mqtt-service-task",
  rest: "fbpmn-icon-rest-service-task",
  http: "fbpmn-icon-http-service-task",
  email: "fbpmn-icon-mail-service-task",
  camel: "fbpmn-icon-camel-service-task",
  shell: "ibpmn-icon-shell-service-task",
  ws: "ibpmn-icon-ws-service-task"
}, dp = {
  copy: "Copy Service Task",
  sc: "Sc Service Task",
  dubbo: "Dubbo Service Task",
  dmn: "Dmn Service Task",
  ai: "Ai Service Task",
  mq: "Mq Service Task",
  mqtt: "Mqtt Service Task",
  rest: "Rest Service Task",
  http: "Http Service Task",
  email: "Email Service Task",
  camel: "Camel Service Task",
  shell: "Shell Service Task",
  ws: "Web Service Task",
  sql: "SQL Service Task"
};
function Zl(e) {
  return Lt(e, "bpmn:ErrorEventDefinition");
}
function Ql(e) {
  if (!e)
    return;
  if (typeof e.get("timeDate") < "u")
    return "timeDate";
  if (typeof e.get("timeCycle") < "u")
    return "timeCycle";
  if (typeof e.get("timeDuration") < "u")
    return "timeDuration";
}
function ec(e) {
  return Lt(e, "bpmn:TimerEventDefinition");
}
function Lt(e, t) {
  return (Te(e).get("eventDefinitions") || []).find((r) => O(r, t));
}
function tc(e) {
  return O(e, "bpmn:ReceiveTask") ? Te(e) : Lt(e, "bpmn:MessageEventDefinition");
}
function nc(e) {
  return Lt(e, "bpmn:SignalEventDefinition");
}
function En(e) {
  return Lt(e, "bpmn:ConditionalEventDefinition");
}
function ic(e) {
  return Lt(e, "bpmn:EscalationEventDefinition");
}
function fp(e) {
  return Lt(e, "bpmn:CompensateEventDefinition");
}
function pp(e) {
  return Lt(e, "bpmn:TerminateEventDefinition");
}
function Zo(e) {
  return rr(
    Te(e),
    "flowable:VariableListenerEventDefinition"
  )[0];
}
function hp(e) {
  return or(e, "Field");
}
function Fn(e, t) {
  const n = or(e, t);
  return n && n.length > 0 ? n[0] : void 0;
}
function wi(e, t, n = {}) {
  const i = hp(e), r = t.reduce((s, a) => {
    const [l, u = "string"] = a.split(".");
    return s[l] = u, s;
  }, {}), o = {};
  for (const s of i) {
    const a = s.name;
    if (r[a]) {
      const l = n[a];
      if (l)
        o[a] = l(s);
      else {
        const u = r[a];
        o[a] = s[u];
      }
    }
  }
  return o;
}
function Ms(e) {
  return e && e.body || "";
}
function mp(e) {
  const t = e.businessObject;
  if (O(t, "bpmn:SequenceFlow"))
    return t.conditionExpression;
  if (En(t))
    return En(t).condition;
}
function vp(e, t) {
  const n = Te(e), i = [];
  if (O(e, "bpmn:ServiceTask")) {
    const d = n.type;
    if (!d)
      return "";
    switch (d) {
      case "http": {
        const h = wi(n, ["requestUrl", "requestMethod"]);
        h.requestMethod && i.push(`Method: ${h.requestMethod}`), h.requestUrl && i.push(`URL: ${h.requestUrl}`);
        break;
      }
      case "email": {
        const h = wi(n, ["to.expression", "subject", "html.expression"]);
        h.to && i.push(`To: ${h.to}`), h.subject && i.push(`Subject: ${h.subject}`);
        break;
      }
      case "ws":
      case "sc":
      case "dubbo":
      case "rest":
      case "sql": {
        const h = wi(n, ["apiName"]);
        h.apiName && i.push(`API: ${h.apiName}`);
        break;
      }
      case "copy": {
        const h = Fn(n, "TransferToUsers"), E = h && h.body;
        if (E)
          try {
            const f = JSON.parse(E).map((p) => p.name).join(",");
            i.push(`${t("CC")}: ${f}`);
          } catch {
            i.push(`${t("CC")}: ${E}`);
          }
        break;
      }
      case "dmn": {
        const h = wi(n, ["decisionTableReferenceName"]);
        h.decisionTableReferenceName && i.push(`DMN: ${h.decisionTableReferenceName}`);
        break;
      }
    }
  }
  if (O(e, "bpmn:ScriptTask") && n.scriptFormat && i.push(`Format: ${n.scriptFormat}`), O(e, "bpmn:UserTask")) {
    if (n.assignee === "${starterCode}")
      i.push(`${t("Assignee")}: ${t("Starter")}`);
    else {
      const p = Fn(n, "StaticAssigneeVariables"), g = Fn(n, "IdmAssignee");
      let C = "";
      if (p && p.body)
        try {
          const B = JSON.parse(p.body);
          Array.isArray(B) && B.length > 0 && (C = B.map(($) => $.name || $.value).join(","));
        } catch (B) {
          console.error("Parse StaticAssigneeVariables failed", B);
        }
      else if (g && g.body)
        try {
          const B = JSON.parse(g.body);
          Array.isArray(B) && B.length > 0 && (C = B.map(($) => $.name || $.code || $.username).join(","));
        } catch (B) {
          console.error("Parse IdmAssignee failed", B);
        }
      C && i.push(`${t("Assignee")}: ${C}`);
    }
    const d = Fn(n, "IdmCandidateUsers");
    let h = "";
    if (d && d.body)
      try {
        const p = JSON.parse(d.body);
        Array.isArray(p) && p.length > 0 && (h = p.map((g) => g.name || g.username || g.code || g.value).join(","));
      } catch (p) {
        console.error("Parse IdmCandidateUsers failed", p);
      }
    h && i.push(`${t("Candidate Users")}: ${h}`);
    const E = Fn(n, "IdmCandidateGroups");
    let f = "";
    if (E && E.body)
      try {
        const p = JSON.parse(E.body);
        Array.isArray(p) && p.length > 0 && (f = p.map((g) => g.name || g.sn).join(","));
      } catch (p) {
        console.error("Parse IdmCandidateGroups failed", p);
      }
    f && i.push(`${t("Candidate Groups")}: ${f}`);
  }
  if (O(e, "bpmn:CallActivity") && n.calledElement && i.push(`Called: ${n.calledElement}`), O(e, "bpmn:SequenceFlow")) {
    const d = mp(e), h = d && d.body;
    h && i.push(`Cond: ${h}`);
  }
  const r = Zl(e);
  if (r) {
    const d = r.errorRef;
    d && d.name && i.push(`Error: ${d.name}`);
  }
  const o = nc(e);
  if (o) {
    const d = o.signalRef;
    d && d.name && i.push(`Signal: ${d.name}`);
  }
  const s = tc(e);
  if (s) {
    const d = s.messageRef;
    d && d.name && i.push(`Message: ${d.name}`);
  }
  const a = ic(e);
  if (a) {
    const d = a.escalationRef;
    d && d.name && i.push(`Escalation: ${d.name}`);
  }
  const l = ec(e);
  if (l) {
    const d = Ql(l);
    if (d) {
      const h = Ms(l[d]);
      h && i.push(`Timer: ${h}`);
    }
  }
  const u = Zo(e);
  u && u.variableName && i.push(`Var: ${u.variableName}`);
  const c = En(e);
  if (c) {
    const d = Ms(c.condition);
    d && i.push(`Condition: ${d}`);
  }
  return i.length > 0 ? i.map(
    (d) => `<span class="bts-detail">${d}</span>`
  ).join("") : "";
}
const gp = ep();
function Vr(e) {
  const t = e && e.businessObject.name;
  return t && Du(t);
}
function Ur(e, t) {
  const n = mo(e);
  return n === "none" ? "bpmn-icon-intermediate-event-none" : `bpmn-icon-intermediate-event-${t}-${n}`;
}
function mo(e) {
  const t = Te(e), n = or(
    t,
    "VariableListenerEventDefinition"
  );
  if (n && n.length)
    return "multiple";
  if (t.get("eventDefinitions").length === 0)
    return "none";
  const i = t.eventDefinitions[0];
  return O(i, "bpmn:MessageEventDefinition") ? "message" : O(i, "bpmn:TimerEventDefinition") ? "timer" : O(i, "bpmn:SignalEventDefinition") ? "signal" : O(i, "bpmn:ErrorEventDefinition") ? "error" : O(i, "bpmn:EscalationEventDefinition") ? "escalation" : O(i, "bpmn:CompensateEventDefinition") ? "compensation" : O(i, "bpmn:ConditionalEventDefinition") ? "condition" : O(i, "bpmn:LinkEventDefinition") ? "link" : O(i, "bpmn:CancelEventDefinition") ? "cancel" : O(i, "bpmn:TerminateEventDefinition") ? "terminate" : "none";
}
class rc {
  constructor(t, n, i, r, o, s, a, l) {
    y(this, "_notifications");
    y(this, "_tokenSimulationPalette");
    y(this, "_canvas");
    y(this, "_eventBus");
    y(this, "_scopeFilter");
    y(this, "_translate");
    y(this, "_showLabel");
    y(this, "_container");
    y(this, "_placeholder");
    y(this, "_content");
    y(this, "_close");
    y(this, "_icon");
    y(this, "paletteEntry");
    y(this, "_interceptors", []);
    this._notifications = n, this._tokenSimulationPalette = i, this._canvas = r, this._eventBus = t, this._scopeFilter = o, this._translate = a;
    const u = l || {};
    this._showLabel = u.showLabel !== !1, this._init();
    const c = this;
    t.on(sr, function(d) {
      const h = al(".bts-entry[data-scope-id]", c._container);
      for (const E of h) {
        const f = E.dataset.scopeId;
        ae(E).toggle("inactive", !c._scopeFilter.isShown(f));
      }
    }), t.on(St, function(d) {
      const { scope: h, forced: E } = d;
      if (E)
        return;
      const { element: f } = h, p = h.completed;
      if (!nn(f, ["bpmn:Process", "bpmn:Participant", "bpmn:SubProcess"]))
        return;
      const B = `${O(f, "bpmn:SubProcess") ? Vr(f) || c._translate("SubProcess") : c._translate("Process")} ${p ? c._translate("finished") : c._translate("canceled")}`;
      c.log({
        text: B,
        icon: p ? ho() : tp(),
        scope: h,
        scopeElement: f
      });
    }), t.on(ln, function(d) {
      const { scope: h } = d, { element: E } = h;
      if (!nn(E, ["bpmn:Process", "bpmn:Participant", "bpmn:SubProcess"]))
        return;
      const g = `${O(E, "bpmn:SubProcess") ? Vr(E) || c._translate("SubProcess") : c._translate("Process")} ${c._translate("started")}`;
      c.log({
        text: g,
        icon: ho(),
        scope: h,
        scopeElement: E
      });
    }), t.on(ar, function(d) {
      const { action: h, scope: E, element: f } = d;
      if (h !== "exit")
        return;
      const p = E.parent, g = Vr(f), C = vp(f, c._translate);
      if (O(f, "bpmn:ServiceTask")) {
        const B = f.businessObject.type;
        return c.log({
          text: g || B && dp[B] || c._translate("Service Task"),
          icon: B && up[B] || "bpmn-icon-service",
          scope: p,
          details: C,
          element: f
        });
      }
      if (O(f, "bpmn:UserTask"))
        return c.log({
          text: g || c._translate("User Task"),
          icon: "bpmn-icon-user",
          scope: p,
          details: C,
          element: f
        });
      if (O(f, "bpmn:CallActivity"))
        return c.log({
          text: g || c._translate("Call Activity"),
          icon: "bpmn-icon-call-activity",
          scope: p,
          details: C,
          element: f
        });
      if (O(f, "bpmn:ScriptTask"))
        return c.log({
          text: g || c._translate("Script Task"),
          icon: "bpmn-icon-script",
          scope: p,
          details: C,
          element: f
        });
      if (O(f, "bpmn:BusinessRuleTask"))
        return c.log({
          text: g || c._translate("Business Rule Task"),
          icon: "bpmn-icon-business-rule",
          scope: p,
          element: f
        });
      if (O(f, "bpmn:ManualTask"))
        return c.log({
          text: g || c._translate("Manual Task"),
          icon: "bpmn-icon-manual-task",
          scope: p,
          element: f
        });
      if (O(f, "bpmn:ReceiveTask"))
        return c.log({
          text: g || c._translate("Receive Task"),
          icon: "bpmn-icon-receive",
          scope: p,
          element: f
        });
      if (O(f, "bpmn:SendTask"))
        return c.log({
          text: g || c._translate("Send Task"),
          icon: "bpmn-icon-send",
          scope: p,
          element: f
        });
      if (O(f, "bpmn:Task"))
        return c.log({
          text: g || c._translate("Task"),
          icon: "bpmn-icon-task",
          scope: p,
          element: f
        });
      if (O(f, "bpmn:ExclusiveGateway"))
        return c.log({
          text: g || c._translate("Exclusive Gateway"),
          icon: "bpmn-icon-gateway-xor",
          scope: p,
          element: f
        });
      if (O(f, "bpmn:ParallelGateway"))
        return c.log({
          text: g || c._translate("Parallel Gateway"),
          icon: "bpmn-icon-gateway-parallel",
          scope: p,
          element: f
        });
      if (O(f, "bpmn:InclusiveGateway"))
        return c.log({
          text: g || c._translate("Inclusive Gateway"),
          icon: "bpmn-icon-gateway-or",
          scope: p,
          element: f
        });
      if (O(f, "bpmn:StartEvent"))
        return c.log({
          text: g || c._translate("Start Event"),
          icon: `bpmn-icon-start-event-${mo(f)}`,
          scope: p,
          details: C
        });
      if (O(f, "bpmn:IntermediateCatchEvent"))
        return c.log({
          text: g || c._translate("Intermediate Event"),
          icon: Ur(f, "catch"),
          scope: p,
          details: C,
          element: f
        });
      if (O(f, "bpmn:IntermediateThrowEvent"))
        return c.log({
          text: g || c._translate("Intermediate Event"),
          icon: Ur(f, "throw"),
          scope: p,
          details: C,
          element: f
        });
      if (O(f, "bpmn:BoundaryEvent"))
        return c.log({
          text: g || c._translate("Boundary Event"),
          icon: Ur(f, "catch"),
          scope: p,
          details: C,
          element: f
        });
      if (O(f, "bpmn:EndEvent"))
        return c.log({
          text: g || c._translate("End Event"),
          icon: `bpmn-icon-end-event-${mo(f)}`,
          scope: p,
          details: C,
          element: f
        });
    }), t.on(Me, function(d) {
      c.clear(), d.active ? c.toggle(!0) : c.toggle(!1);
    }), t.on(et, function() {
      c.clear();
    }), t.on(["i18n.changed", "simpleTokenSimulation.config.changed"], function() {
      c._updateTexts();
    });
  }
  registerInterceptor(t) {
    this._interceptors.push(t);
  }
  /**
   * 更新界面文本 (i18n)
   * (Update UI texts)
   */
  _updateTexts() {
    if (this.paletteEntry) {
      const t = this.paletteEntry.querySelector(".bts-text");
      t && (t.textContent = this._translate("Simulation Log")), this.paletteEntry.title = this._translate("Toggle Simulation Log");
    }
    if (this._container) {
      const t = $e(".bts-header .bts-title", this._container);
      t && (t.textContent = this._translate("Simulation Log"));
      const n = $e(".bts-close", this._container);
      n && n.setAttribute("aria-label", this._translate("Close")), this._placeholder && (this._placeholder.textContent = this._translate("No Entries"));
    }
  }
  /**
   * 初始化日志界面
   * (Initialize Log UI)
   */
  _init() {
    this._container = Ge(`
      <div class="bts-log hidden djs-scrollable">
        <div class="bts-header">
          ${Fs("bts-log-icon")}
          <span class="bts-title">${this._translate("Simulation Log")}</span>
          <button class="bts-close" title="${this._translate("Close Log")}" aria-label="${this._translate("Close")}">
            ${ip("bts-log-icon")}
          </button>
        </div>
        <div class="bts-content">
          <p class="bts-entry placeholder">${this._translate("No Entries")}</p>
        </div>
      </div>
    `), this._placeholder = $e(".bts-entry.placeholder", this._container), this._content = $e(".bts-content", this._container), Et.bind(this._container, "mousedown", (n) => {
      n.stopPropagation();
    }), Et.bind(this._container, "wheel", (n) => {
      n.stopPropagation();
    }), this._close = $e(".bts-close", this._container), Et.bind(this._close, "click", () => {
      this.toggle(!1);
    }), this._icon = $e(".bts-log-icon", this._container), this._canvas.getContainer().appendChild(this._container);
    const t = this._showLabel ? `<span class="bts-text">${this._translate("Simulation Log")}</span>` : "";
    this.paletteEntry = Ge(`
      <div class="bts-entry" title="${this._translate("Toggle Simulation Log")}">
        <span class="bts-icon bts-icon-log">${Fs()}</span>
        <span class="bts-icon bts-icon-log-slash hidden">${rp()}</span>
        ${t}
      </div>
    `), Et.bind(this.paletteEntry, "click", () => {
      this.toggle();
    }), this._tokenSimulationPalette.addEntry(this.paletteEntry, 3);
  }
  /**
   * 检查日志面板是否显示
   * (Check if log is shown)
   *
   * @return {Boolean}
   */
  isShown() {
    const t = this._container;
    return !ae(t).has("hidden");
  }
  /**
   * 切换日志面板显示状态
   * (Toggle log visibility)
   *
   * @param {Boolean} [shown] - 目标状态
   */
  toggle(t = !this.isShown()) {
    const n = this._container, i = this.paletteEntry;
    if (t) {
      if (ae(n).remove("hidden"), i) {
        ae(i).add("active");
        const r = $e(".bts-icon-log", i), o = $e(".bts-icon-log-slash", i), s = $e(".bts-text", i);
        r && ae(r).add("hidden"), o && ae(o).remove("hidden"), s && (s.textContent = this._translate("Hide Simulation Log")), i.title = this._translate("Hide Simulation Log");
      }
    } else if (ae(n).add("hidden"), i) {
      ae(i).remove("active");
      const r = $e(".bts-icon-log", i), o = $e(".bts-icon-log-slash", i), s = $e(".bts-text", i);
      r && ae(r).remove("hidden"), o && ae(o).add("hidden"), s && (s.textContent = this._translate("Show Simulation Log")), i.title = this._translate("Show Simulation Log");
    }
  }
  /**
   * 记录日志条目
   * (Log an entry)
   *
   * @param {Object} options - 日志选项
   * @param {String} options.text - 文本内容
   * @param {String} [options.type='info'] - 类型
   * @param {String} [options.icon] - 图标
   * @param {Scope} [options.scope] - 相关作用域
   */
  log(t) {
    for (const f of this._interceptors) {
      const p = f(t);
      if (p === !1) return;
      p && (t = p);
    }
    const { text: n, type: i = "info", icon: r = gp, scope: o, details: s } = t, a = this._content;
    ae(this._placeholder).add("hidden"), this.isShown() || this._notifications.showNotification(t);
    const l = r.startsWith("<") ? r : `<i class="${r}"></i>`, u = !!r, c = !!s, d = !!t.slot, h = Ge(`
      <div class="bts-entry bts-timeline-entry ${i} ${o && this._scopeFilter.isShown(o) ? "" : "inactive"}" ${o ? `data-scope-id="${o.id}"` : ""}>
        <div class="bts-timeline-node">
          <span class="bts-timeline-dot"></span>
          <span class="bts-timeline-line"></span>
        </div>
        <div class="bts-timeline-body">
          <div class="bts-timeline-row bts-timeline-title">
            ${u ? `<span class="bts-icon">${l}</span>` : ""}
            <span class="bts-text" title="${n}">${n}</span>
          </div>
          ${c ? `<div class="bts-timeline-row bts-timeline-details">${s}</div>` : ""}
          ${d ? `<div class="bts-timeline-row bts-timeline-slot"><div class="bts-slot-scroll">${t.slot}</div></div>` : ""}
        </div>
      </div>
    `), E = Math.abs(a.clientHeight + a.scrollTop - a.scrollHeight) < 2;
    a.appendChild(h), a.childElementCount > 100 && a.removeChild(a.firstChild), E && (a.scrollTop = a.scrollHeight);
  }
  /**
   * 清空日志
   * (Clear log)
   */
  clear() {
    for (; this._content.firstChild; )
      this._content.removeChild(this._content.firstChild);
    this._placeholder = Ge(
      `<p class="bts-entry placeholder">${this._translate("No Entries")}</p>`
    ), this._content.appendChild(this._placeholder);
  }
}
y(rc, "$inject", [
  "eventBus",
  "notifications",
  "tokenSimulationPalette",
  "canvas",
  "scopeFilter",
  "simulator",
  "translate",
  "config.simpleTokenSimulation"
]);
const yp = {
  __depends__: [On, li],
  __init__: ["log"],
  log: ["type", rc]
}, bp = ["bpmn:ComplexGateway"];
function Ep(e) {
  return e.labelTarget;
}
class oc {
  constructor(t, n, i, r, o) {
    y(this, "_eventBus");
    y(this, "_elementRegistry");
    y(this, "_elementNotifications");
    y(this, "_notifications");
    y(this, "_canvasParent");
    y(this, "_unsupportedElements", []);
    this._eventBus = t, this._elementRegistry = n, this._elementNotifications = o, this._notifications = r, this._canvasParent = i.getContainer().parentNode;
    const s = this;
    t.on(Me, function(a) {
      a.active ? s.enable() : s.clear();
    });
  }
  getUnsupportedElements() {
    return this._unsupportedElements;
  }
  enable() {
    const t = [];
    this._elementRegistry.forEach((n) => {
      Ep(n) || nn(n, bp) && (this.showWarning(n), t.push(n));
    }), t.length && this._notifications.showNotification({
      text: "Found unsupported elements",
      icon: xs(),
      type: "warning",
      ttl: 5e3
    }), this._unsupportedElements = t;
  }
  clear() {
    ae(this._canvasParent).remove("warning");
  }
  showWarning(t) {
    this._elementNotifications.addElementNotification(t, {
      type: "warning",
      icon: xs(),
      text: "Not supported"
    });
  }
}
y(oc, "$inject", [
  "eventBus",
  "elementRegistry",
  "canvas",
  "notifications",
  "elementNotifications"
]);
const wp = {
  __depends__: [Yl, On],
  __init__: ["elementSupport"],
  elementSupport: ["type", oc]
}, Sp = ql(), _p = Wl(), Ns = 1500;
class sc {
  constructor(t, n, i, r, o, s, a) {
    y(this, "_eventBus");
    y(this, "_notifications");
    y(this, "_translate");
    y(this, "_simulator");
    y(this, "_elementRegistry");
    y(this, "_resetSimulation");
    y(this, "_canvasParent");
    /** 是否处于激活态（模拟模式开启中） */
    y(this, "_isActive", !1);
    /** 是否处于暂停态 */
    y(this, "_isPaused", !0);
    /** 模拟是否已启动过（用于完成检测） */
    y(this, "_hasStarted", !1);
    /** 模拟是否已完成 */
    y(this, "_isFinished", !1);
    /** 防止 play → triggerStart → SCOPE_CREATE → play 递归 */
    y(this, "_isStarting", !1);
    this._eventBus = t, this._notifications = n, this._translate = r, this._simulator = o, this._elementRegistry = s, this._resetSimulation = a, this._canvasParent = i.getContainer().parentNode, t.on(ln, Ns, () => {
      this._hasStarted = !0, this._isFinished = !1, this._activate(), this._isPaused && (this._isPaused = !1, ae(this._canvasParent).remove("paused"), this._eventBus.fire(Gi));
    }), t.on([et, Me], 1e4, () => {
      this._deactivate();
    }), t.on(ar, Ns, () => {
      this._isActive && this.play();
    }), t.on([Vo, St], () => {
      setTimeout(() => this._checkFinished(), 0);
    });
  }
  // ─── 公开 API ────────────────────────────────────
  /**
   * 播放按钮点击的统一入口
   * 内部转交 toggle()，依靠其内部强大的 play() 将自动分发重启、启动或是恢复动画。
   */
  playOrToggle() {
    this.toggle();
  }
  /**
   * 切换暂停/播放状态
   */
  toggle() {
    this._isPaused || this._isFinished ? this.play() : this.pause();
  }
  /**
   * 播放/恢复模拟
   *
   * 可直接调用，会自动激活模拟状态。
   * 若模拟未启动则自动触发启动；若已在播放中则跳过。
   */
  play() {
    if (this._activate(), (!this._hasStarted || this._isFinished) && !this._isStarting) {
      this._isStarting = !0;
      try {
        this._isFinished ? this.restart() : this.triggerStart();
      } finally {
        this._isStarting = !1;
      }
      return;
    }
    this._isPaused && (ae(this._canvasParent).remove("paused"), this._eventBus.fire(Gi), this._notifications.showNotification({
      text: this._translate("Simulation Resumed"),
      i18nKey: "Simulation Resumed",
      icon: Sp
    }), this._isPaused = !1);
  }
  /**
   * 暂停模拟
   *
   * 仅在已激活且正在播放时生效。
   */
  pause() {
    !this._isActive || this._isPaused || (ae(this._canvasParent).add("paused"), this._eventBus.fire(jo), this._notifications.showNotification({
      text: this._translate("Simulation Paused"),
      i18nKey: "Simulation Paused",
      icon: _p
    }), this._isPaused = !0);
  }
  /**
   * 触发启动（自动寻找第一个开始事件）
   */
  triggerStart() {
    const t = this._elementRegistry.filter((n) => O(n, "bpmn:StartEvent") && (O(n.parent, "bpmn:Process") || O(n.parent, "bpmn:Participant")));
    if (t.length) {
      const n = t[0], i = this._simulator.findSubscriptions({ element: n });
      i.length && this._simulator.trigger({
        event: i[0].event,
        scope: i[0].scope
      });
    }
  }
  /**
   * 重启模拟（先重置再启动）
   */
  restart() {
    this._resetSimulation.resetSimulation(), setTimeout(() => {
      this.triggerStart();
    }, 100);
  }
  /**
   * 模拟是否已完成
   */
  get isFinished() {
    return this._isFinished;
  }
  // ─── 私有方法 ────────────────────────────────────
  /**
   * 激活模拟状态
   */
  _activate() {
    this._isActive = !0;
  }
  /**
   * 停用模拟状态并重置所有标记
   */
  _deactivate() {
    this._isActive = !1, this._isPaused = !0, this._hasStarted = !1, this._isFinished = !1, ae(this._canvasParent).remove("paused");
  }
  /**
   * 检测模拟是否已完成
   *
   * 完成条件：
   * 1. 存在运行中的 scope
   * 2. 所有运行中的 scope 都是根 scope（无活跃的子任务）
   * 3. 所有根 scope 没有子节点
   */
  _checkFinished() {
    if (!this._hasStarted)
      return;
    const t = this._simulator.findScopes((r) => !r.destroyed), n = t.filter((r) => !r.parent);
    t.length > 0 && t.length === n.length && n.every((r) => r.children.length === 0) && (this._isFinished = !0, this._hasStarted = !1, this._eventBus.fire(cl));
  }
}
y(sc, "$inject", [
  "eventBus",
  "notifications",
  "canvas",
  "translate",
  "simulator",
  "elementRegistry",
  "resetSimulation"
]);
class ac {
  constructor(t, n, i, r) {
    y(this, "_eventBus");
    y(this, "_notifications");
    y(this, "_translate");
    y(this, "_showLabel");
    y(this, "_active", !1);
    this._eventBus = t, this._notifications = n, this._translate = i;
    const o = r || {};
    this._showLabel = o.showLabel !== !1, t.on(Me, (s) => {
      this._active = s.active, this._active || this._eventBus.fire(et);
    });
  }
  /**
   * 重置模拟
   * (Reset simulation)
   */
  resetSimulation() {
    this._eventBus.fire(et), this._notifications.showNotification({
      text: this._translate("Simulation Reset"),
      i18nKey: "Simulation Reset",
      icon: po()
    });
  }
}
y(ac, "$inject", ["eventBus", "notifications", "translate", "config.simpleTokenSimulation"]);
const lc = {
  __depends__: [On],
  __init__: ["resetSimulation"],
  resetSimulation: ["type", ac]
}, Cp = {
  __depends__: [On, lc],
  __init__: ["pauseSimulation"],
  pauseSimulation: ["type", sc]
};
function kp(e, t) {
  var n = e.outgoing.filter($i), i = n.indexOf(t || e.sequenceFlow);
  return n[i + 1] ? n[i + 1] : n[0];
}
function $i(e) {
  return O(e, "bpmn:SequenceFlow");
}
class cc {
  constructor(t, n, i, r) {
    y(this, "_elementRegistry");
    y(this, "_canvas");
    y(this, "_simulator");
    this._elementRegistry = n, this._canvas = i, this._simulator = r;
    const o = this;
    t.on(Me, function(s) {
      s.active ? o.setSequenceFlowsDefault() : o.resetSequenceFlows();
    });
  }
  setSequenceFlowsDefault() {
    const t = this._elementRegistry.filter((n) => O(n, "bpmn:ExclusiveGateway"));
    for (const n of t)
      this.setSequenceFlow(n);
  }
  resetSequenceFlows() {
    this._elementRegistry.filter((n) => O(n, "bpmn:ExclusiveGateway")).forEach((n) => {
      n.outgoing.filter($i).length && this.resetSequenceFlow(n);
    });
  }
  resetSequenceFlow(t) {
    this._simulator.setConfig(t, { activeOutgoing: void 0 });
  }
  setSequenceFlow(t) {
    const n = t.outgoing.filter($i);
    if (n.length < 2)
      return;
    const { activeOutgoing: i } = this._simulator.getConfig(t);
    let r;
    if (i)
      r = kp(t, i);
    else {
      const o = t.businessObject.default;
      o && (r = n.find((s) => s.businessObject === o)), r || (r = n[0]);
    }
    this._simulator.setConfig(t, { activeOutgoing: r }), t.outgoing.forEach((o) => {
      o === r ? this._canvas.addMarker(o, "token-simulation-gateway-selected") : this._canvas.removeMarker(o, "token-simulation-gateway-selected");
    });
  }
  setSequenceFlowTo(t, n) {
    if (!t.outgoing.filter($i).includes(n))
      throw new Error("flow is not outgoing from gateway");
    this._simulator.setConfig(t, { activeOutgoing: n }), t.outgoing.forEach((r) => {
      r === n ? this._canvas.addMarker(r, "token-simulation-gateway-selected") : this._canvas.removeMarker(r, "token-simulation-gateway-selected");
    });
  }
}
y(cc, "$inject", ["eventBus", "elementRegistry", "canvas", "simulator"]);
const Tp = {
  __depends__: [],
  exclusiveGatewaySettings: ["type", cc]
};
class uc {
  constructor(t, n, i, r) {
    y(this, "_elementRegistry");
    y(this, "_canvas");
    y(this, "_simulator");
    this._elementRegistry = n, this._canvas = i, this._simulator = r;
    const o = this;
    t.on(Me, function(s) {
      s.active ? o.setDefaults() : o.reset();
    });
  }
  setDefaults() {
    this._elementRegistry.filter((n) => O(n, "bpmn:InclusiveGateway")).forEach((n) => {
      n.outgoing.filter(Yt).length > 1 && this._setGatewayDefaults(n);
    });
  }
  reset() {
    this._elementRegistry.filter((n) => O(n, "bpmn:InclusiveGateway")).forEach((n) => {
      n.outgoing.filter(Yt).length > 1 && this._resetGateway(n);
    });
  }
  toggleSequenceFlow(t, n) {
    const i = this._getActiveOutgoing(t), r = dc(t), o = Ap(t);
    let s;
    i.includes(n) ? s = Op(i, n) : s = i.concat(n), s.length || (r ? s = [r] : s = [o.find((a) => a !== n)]), this._setActiveOutgoing(t, s);
  }
  _getActiveOutgoing(t) {
    const { activeOutgoing: n } = this._simulator.getConfig(t);
    return n;
  }
  _setActiveOutgoing(t, n) {
    this._simulator.setConfig(t, { activeOutgoing: n }), t.outgoing.filter(Yt).forEach((r) => {
      !n || n.includes(r) ? this._canvas.addMarker(r, "token-simulation-gateway-selected") : this._canvas.removeMarker(r, "token-simulation-gateway-selected");
    });
  }
  _setGatewayDefaults(t) {
    const n = t.outgoing.filter(Yt);
    this._setActiveOutgoing(t, n);
  }
  _resetGateway(t) {
    this._simulator.setConfig(t, { activeOutgoing: void 0 });
  }
}
y(uc, "$inject", ["eventBus", "elementRegistry", "canvas", "simulator"]);
function dc(e) {
  const t = Te(e).default;
  if (t)
    return e.outgoing.find((n) => Te(n) === t);
}
function Ap(e) {
  const t = dc(e);
  return e.outgoing.filter((n) => Te(n) !== t);
}
function Op(e, t) {
  return e.filter((n) => n !== t);
}
const Bp = {
  __depends__: [],
  inclusiveGatewaySettings: ["type", uc]
};
class fc {
  constructor(t, n, i, r, o, s) {
    y(this, "_eventBus");
    y(this, "_canvas");
    y(this, "_translate");
    y(this, "_pauseSimulation");
    y(this, "_resetSimulation");
    y(this, "_showLabel");
    y(this, "entries", []);
    y(this, "container");
    y(this, "playEntry");
    y(this, "resetEntry");
    this._eventBus = t, this._canvas = n, this._translate = i, this._pauseSimulation = r, this._resetSimulation = o;
    const a = s || {};
    this._showLabel = a.showLabel !== !1, this._init(), t.on(Me, (l) => {
      l.active ? ae(this.container).remove("hidden") : (ae(this.container).add("hidden"), this._togglePlayPause(!1));
    }), t.on(Gi, () => {
      this._togglePlayPause(!0);
    }), t.on(jo, () => {
      this._togglePlayPause(!1);
    }), t.on(et, () => {
      this._setSimulationFinished(!1), this._togglePlayPause(!1);
    }), t.on(ln, () => {
      this._setSimulationFinished(!1), this._togglePlayPause(!0);
    }), t.on(cl, () => {
      this._setSimulationFinished(!0);
    }), t.on(["i18n.changed", "simpleTokenSimulation.config.changed"], () => {
      this._updateTexts();
    });
  }
  // ─── 初始化 ────────────────────────────────────
  /**
   * 初始化 Palette DOM
   */
  _init() {
    this.container = Ge('<div class="bts-palette hidden"></div>');
    const t = this._showLabel ? `<span class="bts-text">${this._translate("Play")}</span>` : "";
    this.playEntry = Ge(`
      <div class="bts-entry" title="${this._translate("Play/Pause Simulation")}">
        <span class="bts-icon bts-icon-start">${ql()}</span>
        <span class="bts-icon bts-icon-pause hidden">${Wl()}</span>
        <span class="bts-icon bts-icon-restart hidden">${po()}</span>
        ${t}
      </div>
    `), Et.bind(this.playEntry, "click", () => {
      this._pauseSimulation.playOrToggle();
    }), this.addEntry(this.playEntry, 1);
    const n = this._showLabel ? `<span class="bts-text">${this._translate("Reset")}</span>` : "";
    this.resetEntry = Ge(`
      <div class="bts-entry" title="${this._translate("Reset Simulation")}">
        <span class="bts-icon bts-icon-reset">${po()}</span>
        ${n}
      </div>
    `), Et.bind(this.resetEntry, "click", () => {
      this._resetSimulation.resetSimulation();
    }), this.addEntry(this.resetEntry, 2), this._canvas.getContainer().appendChild(this.container), this._eventBus.fire("simpleTokenSimulation.palette.created", {
      palette: this
    });
  }
  addEntry(t, n) {
    var i = 0;
    this.entries.forEach(function(r) {
      n >= r.index && i++;
    }), this.container.insertBefore(t, this.container.childNodes[i]), this.entries.push({
      entry: t,
      index: n
    });
  }
  // ─── UI 更新（私有） ─────────────────────────────
  /**
   * 切换播放/暂停图标状态
   */
  _togglePlayPause(t) {
    const n = this.playEntry.querySelector(".bts-icon-start"), i = this.playEntry.querySelector(".bts-icon-pause"), r = this.playEntry.querySelector(".bts-icon-restart"), o = this.playEntry.querySelector(".bts-text");
    r && ae(r).add("hidden"), t ? (n && ae(n).add("hidden"), i && ae(i).remove("hidden"), o && (o.textContent = this._translate("Pause"))) : (n && ae(n).remove("hidden"), i && ae(i).add("hidden"), o && (o.textContent = this._translate("Play")));
  }
  /**
   * 设置模拟结束状态的图标
   */
  _setSimulationFinished(t) {
    const n = this.playEntry.querySelector(".bts-icon-start"), i = this.playEntry.querySelector(".bts-icon-pause"), r = this.playEntry.querySelector(".bts-icon-restart"), o = this.playEntry.querySelector(".bts-text");
    t && (n && ae(n).add("hidden"), i && ae(i).add("hidden"), r && ae(r).remove("hidden"), o && (o.textContent = this._translate("Restart")));
  }
  /**
   * 更新文本（多语言切换时调用）
   */
  _updateTexts() {
    if (this.playEntry) {
      const t = this.playEntry.querySelector(".bts-text"), n = this.playEntry.querySelector(".bts-icon-pause"), i = this.playEntry.querySelector(".bts-icon-restart"), r = n && !ae(n).has("hidden"), o = i && !ae(i).has("hidden");
      t && (o ? t.textContent = this._translate("Restart") : t.textContent = r ? this._translate("Pause") : this._translate("Play")), this.playEntry.title = this._translate("Play/Pause/Restart Simulation");
    }
    if (this.resetEntry) {
      const t = this.resetEntry.querySelector(".bts-text");
      t && (t.textContent = this._translate("Reset")), this.resetEntry.title = this._translate("Reset Simulation");
    }
  }
}
y(fc, "$inject", [
  "eventBus",
  "canvas",
  "translate",
  "pauseSimulation",
  "resetSimulation",
  "config.simpleTokenSimulation"
]);
const Dp = {
  __init__: ["tokenSimulationPalette"],
  tokenSimulationPalette: ["type", fc]
}, Ls = "token-simulation-path-prediction";
class pc {
  constructor(t, n, i, r) {
    y(this, "_eventBus");
    y(this, "_elementRegistry");
    y(this, "_canvas");
    y(this, "_simulator");
    y(this, "_isActive", !1);
    y(this, "_highlightedElements", /* @__PURE__ */ new Set());
    this._eventBus = t, this._elementRegistry = n, this._canvas = i, this._simulator = r;
    const o = this;
    t.on(Me, function(s) {
      o._isActive = s.active, o._isActive ? o.highlightPaths() : o.clearHighlights();
    }), t.on(uo, function(s) {
      o._isActive && Ip(s.element) && o.highlightPaths();
    });
  }
  /**
   * 计算并高亮预测路径
   * (Calculate and highlight predicted paths)
   */
  highlightPaths() {
    this.clearHighlights();
    const n = [...this._elementRegistry.filter((r) => O(r, "bpmn:StartEvent") && !O(r.parent, "bpmn:SubProcess"))], i = /* @__PURE__ */ new Set();
    for (; n.length; ) {
      const r = n.shift();
      if (i.has(r))
        continue;
      i.add(r), this.highlight(r);
      const o = this.getOutgoingFlows(r);
      if (O(r, "bpmn:SubProcess")) {
        const a = (r.children || []).filter((l) => O(l, "bpmn:StartEvent"));
        for (const l of a)
          i.has(l) || n.push(l);
      }
      for (const s of o)
        i.has(s) || (i.add(s), this.highlight(s), s.target && n.push(s.target));
    }
  }
  /**
   * 获取元素的有效输出路径
   * (Get active outgoing flows)
   *
   * @param {Element} element
   * @return {Array<SequenceFlow>}
   */
  getOutgoingFlows(t) {
    if (O(t, "bpmn:SequenceFlow"))
      return [];
    if (O(t, "bpmn:ExclusiveGateway")) {
      const n = this._simulator.getConfig(t);
      if (n.activeOutgoing)
        return [n.activeOutgoing];
      const i = t.businessObject.default;
      if (i) {
        const o = t.outgoing.find((s) => s.businessObject === i);
        if (o)
          return [o];
      }
      const r = t.outgoing.find((o) => O(o, "bpmn:SequenceFlow"));
      return r ? [r] : [];
    }
    if (O(t, "bpmn:InclusiveGateway")) {
      const n = this._simulator.getConfig(t);
      return n.activeOutgoing ? Array.isArray(n.activeOutgoing) ? n.activeOutgoing : [n.activeOutgoing] : t.outgoing.filter((i) => O(i, "bpmn:SequenceFlow"));
    }
    return t.outgoing.filter((n) => O(n, "bpmn:SequenceFlow"));
  }
  /**
   * 高亮元素
   * (Highlight element)
   *
   * @param {Element} element
   */
  highlight(t) {
    this._canvas.addMarker(t, Ls), this._highlightedElements.add(t);
  }
  /**
   * 清除所有高亮
   * (Clear all highlights)
   */
  clearHighlights() {
    for (const t of this._highlightedElements)
      this._canvas.removeMarker(t, Ls);
    this._highlightedElements.clear();
  }
}
y(pc, "$inject", ["eventBus", "elementRegistry", "canvas", "simulator"]);
function Ip(e) {
  return O(e, "bpmn:Gateway");
}
const Pp = {
  __init__: ["pathHighlighter"],
  pathHighlighter: ["type", pc]
}, Hr = "token-simulation-active", qr = "token-simulation-visited";
class hc {
  constructor(t, n, i) {
    y(this, "_elementRegistry");
    y(this, "_canvas");
    this._elementRegistry = n, this._canvas = i, this._init(t);
  }
  _init(t) {
    const n = this;
    t.on(ar, function(r) {
      const { element: o, action: s } = r;
      o && (s === "enter" ? (n._canvas.addMarker(o, Hr), n._canvas.removeMarker(o, qr)) : s === "exit" && (n._canvas.removeMarker(o, Hr), n._canvas.addMarker(o, qr)));
    });
    const i = [ll, et, Me];
    t.on(i, function() {
      n._elementRegistry.forEach((r) => {
        n._canvas.removeMarker(r, Hr), n._canvas.removeMarker(r, qr);
      });
    });
  }
}
y(hc, "$inject", ["eventBus", "elementRegistry", "canvas"]);
const $p = {
  __init__: ["elementHighlight"],
  elementHighlight: ["type", hc]
}, xp = {
  __depends__: [
    Rl,
    Qf,
    li,
    lp,
    cp,
    yp,
    On,
    wp,
    Cp,
    lc,
    Tp,
    Bp,
    Dp,
    Pp,
    $p
  ]
}, Fp = {
  __depends__: [xp, yf]
}, Lv = /* @__PURE__ */ he({
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
    const i = e, r = n, { locale: o } = Tn(), s = te(void 0), a = Kn(), l = () => {
      a.value = new Oa({
        container: s.value,
        moddleExtensions: {
          flowable: rl
        },
        additionalModules: [Fp, ...ol],
        bpmnRenderer: {
          // overrideColor: true
        },
        gridLine: { gridLineOpacity: 0.1, gridLineStroke: 1 }
      }), a.value.get("log").registerInterceptor(f), r("mocker-init", a.value);
    }, u = () => {
      var k, I;
      (k = a.value) == null || k.clear(), (I = a.value) == null || I.destroy(), a.value = void 0, r("mocker-destroy", a.value);
    }, c = async (k) => {
      var I, G, K, w;
      try {
        a.value || l(), await ((I = a.value) == null ? void 0 : I.importXML(k)), (G = a.value) == null || G.get("canvas").zoom("fit-viewport", "center");
        const b = (K = a.value) == null ? void 0 : K.get("toggleMode");
        !b._active && b.toggleMode(!0);
        const m = (w = a.value) == null ? void 0 : w.get("eventBus");
        m == null || m.fire("tokenSimulation.resetSimulation");
      } catch (b) {
        console.error(b);
      }
    }, d = (k) => {
      if (!a.value.get("elementRegistry")) return;
      a.value.get("simulator").setGatewayActiveOutgoingByFlowIds(k);
    }, h = te({}), E = (k) => {
      h.value = { ...k };
    }, f = (k) => {
      const { element: I } = k;
      if (I && I.type === "bpmn:UserTask") {
        const G = h.value[I.id];
        G != null && G.length ? k.slot = G.map((K) => `<span class="arco-tag arco-tag-size-medium arco-tag-green arco-tag-checked">${K}</span>`).join("") : Te(I).assignee !== "${initiator}" && (k.type = "warning");
      }
      return k;
    }, p = (k) => {
      if (k)
        return document.body.setAttribute("arco-theme", k);
      const I = document.body.getAttribute("arco-theme") === "dark";
      document.body.setAttribute("arco-theme", I ? "light" : "dark"), document.documentElement.setAttribute("arco-theme", I ? "light" : "dark");
    }, g = (k) => {
      var I;
      k ? o.value = k : o.value = o.value === "zh_CN" ? "en_US" : "zh_CN", Ro("local-lang", o.value), (I = a.value) == null || I.get("eventBus").fire("i18n.changed");
    }, C = () => {
      var k;
      (k = a.value) == null || k.get("canvas").zoom("fit-viewport", "auto");
    }, B = () => {
      var k;
      ((k = a.value) == null ? void 0 : k.get("pauseSimulation")).play();
    }, $ = () => {
      var k;
      ((k = a.value) == null ? void 0 : k.get("pauseSimulation")).pause();
    }, v = () => {
      var k;
      ((k = a.value) == null ? void 0 : k.get("resetSimulation")).resetSimulation();
    }, F = () => {
      var k;
      return ((k = a.value) == null ? void 0 : k.get("simulator")).getSimulationPath();
    };
    return ft(() => {
      l(), i.xml && c(i.xml);
    }), kn(() => u()), xe(() => i.local, g, { immediate: !0 }), xe(() => i.theme, p, { immediate: !0 }), t({
      createNewProcess: c,
      setSequenceFlows: d,
      setTaskUserInfos: E,
      getSimulationPath: F,
      toggleLang: g,
      toggleTheme: p,
      resetViewport: C,
      playMock: B,
      pauseMock: $,
      resetMock: v
    }), (k, I) => (P(), ue(x(Mo), {
      style: { width: "100%", height: "100%" },
      loading: e.loading
    }, {
      default: ne(() => [
        R("div", {
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
var Si = {
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
const Mp = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bn = (e, t) => ({ size: n, strokeWidth: i = 2, absoluteStrokeWidth: r, color: o, class: s, ...a }, { attrs: l, slots: u }) => fs(
  "svg",
  {
    ...Si,
    width: n || Si.width,
    height: n || Si.height,
    stroke: o || Si.stroke,
    "stroke-width": r ? Number(i) * 24 / Number(n) : i,
    ...l,
    class: ["lucide", `lucide-${Mp(e)}`],
    ...a
  },
  [...t.map((c) => fs(...c)), ...u.default ? [u.default()] : []]
);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Np = Bn("CircleCheckBigIcon", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lp = Bn("Clock4Icon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rp = Bn("DownloadIcon", [
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
const zp = Bn("FullscreenIcon", [
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
const jp = Bn("ZoomInIcon", [
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
const Vp = Bn("ZoomOutIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]);
function Rs(e, t, n) {
  const i = encodeURIComponent(n);
  return {
    filename: `${t}.${e.toLowerCase()}`,
    href: `data:application/${e === "svg" ? "text/xml" : "bpmn20-xml"};charset=UTF-8,${i}`,
    data: n
  };
}
function Wr(e, t) {
  if (e && t) {
    const n = document.createElement("a");
    n.download = t, n.href = e, n.click(), URL.revokeObjectURL(n.href);
  }
}
function Up(e) {
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
    let i;
    if (typeof t.svg == "string") {
      const u = document.createElement("div");
      u.style.display = "none", u.innerHTML = t.svg, i = u.firstElementChild;
    } else
      i = t.svg;
    const r = document.createElement("canvas"), o = r.getContext("2d"), s = new XMLSerializer().serializeToString(i), a = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(s))), l = new Image();
    l.onload = function() {
      let u, c;
      t.width === "auto" && t.height !== "auto" ? u = l.width / l.height * t.height : t.width === "auto" ? u = l.naturalWidth : u = t.width, t.height === "auto" && t.width !== "auto" ? c = l.height / l.width * t.width : t.height === "auto" ? c = l.naturalHeight : c = t.height, r.width = u, r.height = c, o.drawImage(l, 0, 0, u, c), e.outputFormat == "blob" ? r.toBlob(
        function(d) {
          n(d);
        },
        t.mimetype,
        t.quality
      ) : n(r.toDataURL(t.mimetype, t.quality));
    }, l.src = a;
  });
}
const yn = document.documentElement;
let Gr = yn.querySelector("head");
const zs = document.createElement("style");
let js = !1, Mn = !1, xi = "requestFullscreen", Fi = "exitFullscreen", Un = "fullscreenElement", Hn = "fullscreenchange";
function mc(e) {
  return e instanceof HTMLElement ? e : yn;
}
function Dn() {
  return js ? Mn : (js = !0, "webkitRequestFullScreen" in yn ? (xi = "webkitRequestFullScreen", Fi = "webkitExitFullscreen", Un = "webkitFullscreenElement", Hn = "webkitfullscreenchange", Mn = !0) : "msRequestFullscreen" in yn ? (xi = "msRequestFullscreen", Fi = "msExitFullscreen", Un = "msFullscreenElement", Hn = "MSFullscreenChange", Mn = !0) : "mozRequestFullScreen" in yn ? (xi = "mozRequestFullScreen", Fi = "mozCancelFullScreen", Un = "mozFullScreenElement", Hn = "mozfullscreenchange", Mn = !0) : (console.error("当前浏览器不支持 Fullscreen API !"), Mn = !1));
}
function Hp(e, t) {
  if (Dn())
    return mc(e)[xi]();
}
function qp() {
  if (Dn())
    return yn.contains(zs) && (Gr == null || Gr.removeChild(zs)), document[Fi]();
}
function Wp(e) {
  return Dn() ? mc(e) === document[Un] : !1;
}
function Vs(e, t) {
  return Dn() ? Wp(e) ? (qp(), !1) : (Hp(e), !0) : !1;
}
function Gp(e) {
  if (!Dn())
    return;
  const t = () => {
    e(!!document[Un]);
  };
  return window.addEventListener(Hn, t), () => {
    window.removeEventListener(Hn, t);
  };
}
const Kp = {
  id: "bpmn-viewer__wrap",
  class: "bpmn-viewer"
}, Yp = {
  key: 0,
  class: "bpmn-viewer__toolbar"
}, Xp = { style: { "text-align": "center", display: "inline-block", width: "40px" } }, Jp = { class: "button-list_column" }, Zp = /* @__PURE__ */ he({
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
    const i = e, r = n, { locale: o, t: s } = Tn(), a = te(void 0), l = Kn(), u = {
      opacity: 0.5,
      fill: "#C5E2C9",
      stroke: "#219260"
    }, c = {
      opacity: 0.8,
      fill: "#ffffff",
      stroke: "#2948ff"
    }, d = {
      opacity: 0.8,
      fill: "#FAFAFA",
      // 接近白色的淡灰色
      stroke: "#2948ff"
      // 浅灰色描边
    }, h = () => {
      l.value = new Oa({
        container: a.value,
        moddleExtensions: {
          flowable: rl
        },
        additionalModules: [Iu, ...ol],
        gridLine: { gridLineOpacity: 0.1, gridLineStroke: 1 }
      }), l.value.on("element.hover", ({ element: N, gfx: M }) => {
        r("element-hover", N, M);
      }), l.value.on("canvas.viewbox.changed", ({ viewbox: N }) => {
        w.value = N.scale || 1;
      }), r("viewer-init", l.value);
    }, E = () => {
      var N, M;
      (N = l.value) == null || N.clear(), (M = l.value) == null || M.destroy(), l.value = void 0, r("viewer-destroy", l.value);
    }, f = () => l.value, p = (N) => N ? i.translatePrefix + N : "-", g = async (N) => {
      var M, W;
      try {
        l.value || h(), await ((M = l.value) == null ? void 0 : M.importXML(N)), (W = l.value) == null || W.get("canvas").zoom("fit-viewport", "center");
      } catch (z) {
        console.error(z);
      }
    }, C = (N) => {
      var J, de, ve;
      const M = N.reduce(
        (se, ye) => (se[ye] = !0) && se,
        {}
      ), W = (J = l.value) == null ? void 0 : J.get("elementRegistry"), z = (de = l.value) == null ? void 0 : de.get("canvas");
      if (!W) return;
      const j = W.filter((se) => M[se.id]);
      (ve = l.value) == null || ve.get("modeling").setColor(j, u);
      for (const se of j)
        z == null || z.addMarker(se, "on-viewer"), z == null || z.addMarker(se, "on-passed");
    }, B = (N) => {
      var J, de, ve;
      const M = N.reduce(
        (se, ye) => (se[ye] = !0) && se,
        {}
      ), W = (J = l.value) == null ? void 0 : J.get("elementRegistry"), z = (de = l.value) == null ? void 0 : de.get("canvas");
      if (!W) return;
      const j = W.filter((se) => M[se.id]);
      (ve = l.value) == null || ve.get("modeling").setColor(j, d);
      for (const se of j)
        z == null || z.addMarker(se, "on-viewer"), z == null || z.addMarker(se, "on-future");
    }, $ = (N) => (typeof N == "string" && (N = l.value.get("elementRegistry").get(N)), l.value.get("canvas").hasMarker(N, "on-passed")), v = (N) => {
      var J, de, ve;
      const M = N.reduce(
        (se, ye) => (se[ye] = !0) && se,
        {}
      ), W = (J = l.value) == null ? void 0 : J.get("elementRegistry"), z = (de = l.value) == null ? void 0 : de.get("canvas");
      if (!W) return;
      const j = W.filter((se) => M[se.id]);
      (ve = l.value) == null || ve.get("modeling").setColor(j, c);
      for (const se of j)
        z == null || z.addMarker(se, "on-viewer"), z == null || z.addMarker(se, "on-active");
    }, F = (N) => (typeof N == "string" && (N = l.value.get("elementRegistry").get(N)), l.value.get("canvas").hasMarker(N, "on-active")), k = (N) => {
      var j;
      const M = N.reduce(
        (J, de) => (J[de] = !0) && J,
        {}
      ), W = (j = l.value) == null ? void 0 : j.get("elementRegistry");
      if (!W) return;
      const z = l.value.get("canvas");
      W.forEach((J) => {
        if (M[J.id]) {
          const de = J.type.split(":")[1];
          z.addMarker(J, de), z.addMarker(J, "on-processing"), z.addMarker(J, "on-viewer");
        }
      });
    }, I = (N) => (typeof N == "string" && (N = l.value.get("elementRegistry").get(N)), l.value.get("canvas").hasMarker(N, "on-processing")), G = (N) => {
      if (i.inPreset) return;
      if (N)
        return document.body.setAttribute("arco-theme", N);
      const M = document.body.getAttribute("arco-theme") === "dark";
      document.body.setAttribute("arco-theme", M ? "light" : "dark"), document.documentElement.setAttribute("arco-theme", M ? "light" : "dark");
    }, K = (N) => {
      var M;
      i.inPreset || (N ? o.value = N : o.value = o.value === "zh_CN" ? "en_US" : "zh_CN", Ro("local-lang", o.value), (M = l.value) == null || M.get("eventBus").fire("i18n.changed"));
    }, w = te(1), b = (N) => {
      const M = l.value.get("canvas");
      N === "fit-viewport" ? M.zoom("fit-viewport", "center") : M.zoom(N, { x: 0, y: 0 });
    }, m = (N) => {
      w.value = Math.floor(w.value * 100 - 0.1 * 100) / 100, b(w.value);
    }, S = (N) => {
      w.value = Math.floor(w.value * 100 + 0.1 * 100) / 100, b(w.value);
    }, D = te(Dn()), A = te(!1), H = () => {
      i.inPreset ? Vs(
        i.fullElement || document.querySelector("#bpmn-viewer__wrap")
      ) : Vs(document.querySelector("#bpmn-viewer__wrap"));
    };
    Gp((N) => {
      A.value = N;
    });
    const q = (N) => {
      function M(z) {
        const j = /var\(--([^)]+)\)/g;
        return z.replace(j, (J, de) => W(de) || J);
      }
      function W(z) {
        if (z.includes("color-bg"))
          return "none";
        const j = document.querySelector(".djs-container.djs-parent");
        return window.getComputedStyle(j).getPropertyValue(`--${z}`);
      }
      return M(N);
    }, Q = () => {
      var W, z, j;
      const N = l.value.get("elementRegistry");
      let M = (W = N.find((J) => J.type === "bpmn:Process")) == null ? void 0 : W.businessObject;
      return M || (M = (j = (z = N.find((J) => J.type === "bpmn:Participant")) == null ? void 0 : z.businessObject) == null ? void 0 : j.processRef), (M == null ? void 0 : M.name) || (M == null ? void 0 : M.id) || "diagram";
    }, me = async (N, M) => {
      try {
        const W = M || i.fileName || Q();
        if (N === "xml" || N === "bpmn") {
          const { error: z, xml: j } = await l.value.saveXML({ format: !0 });
          z && console.error(`[Process Designer Warn ]: ${z.message || z}`);
          const { href: J, filename: de } = Rs(N.toUpperCase(), W, j);
          Wr(J, de);
        } else if (N === "svg") {
          const { svg: z } = await l.value.saveSVG(), j = q(z), { href: J, filename: de } = Rs("SVG", W, j);
          Wr(J, de);
        } else
          be(W);
      } catch (W) {
        console.error(`[Process Designer Warn ]: ${W.message || W}`);
      }
    }, be = async (N) => {
      const { svg: M } = await l.value.saveSVG(), W = q(M), z = await Up({ svg: W, outputFormat: "blob" });
      z instanceof Blob && Wr(URL.createObjectURL(z), N);
    };
    return ft(() => {
      h(), i.xml && g(i.xml);
    }), kn(() => E()), xe(() => i.theme, G, { immediate: !0 }), xe(() => i.local, K, { immediate: !0 }), t({
      createNewProcess: g,
      setPassedNodes: C,
      setFutureNodes: B,
      setActiveNodes: v,
      setProcessingMarker: k,
      isPassedNode: $,
      isActiveNode: F,
      isProcessingNode: I,
      getModeler: f,
      toggleLang: K,
      toggleTheme: G,
      downloadProcess: me,
      downloadProcessAsPng: be
    }), (N, M) => (P(), Y("div", Kp, [
      e.toolbar ? (P(), Y("div", Yp, [
        V(x(Bi), { size: "mini" }, {
          default: ne(() => [
            V(x(Gt), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ne(() => [
                De(ie(x(s)(p("zoomOut"))), 1)
              ]),
              default: ne(() => [
                V(x(ot), {
                  onClick: M[0] || (M[0] = (W) => m())
                }, {
                  default: ne(() => [
                    V(x(Vp), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            V(x(Gt), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ne(() => [
                De(ie(x(s)(p("zoomReset"))), 1)
              ]),
              default: ne(() => [
                V(x(ot), {
                  onClick: M[1] || (M[1] = (W) => b("fit-viewport"))
                }, {
                  default: ne(() => [
                    R("span", Xp, ie(Math.floor(w.value * 10) * 10 + "%"), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            V(x(Gt), {
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ne(() => [
                De(ie(x(s)(p("zoomIn"))), 1)
              ]),
              default: ne(() => [
                V(x(ot), {
                  onClick: M[2] || (M[2] = (W) => S())
                }, {
                  default: ne(() => [
                    V(x(jp), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            e.showDownload ? (P(), ue(x(Gt), {
              key: 0,
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ne(() => [
                R("div", Jp, [
                  V(x(ot), {
                    onClick: M[3] || (M[3] = (W) => me("bpmn"))
                  }, {
                    default: ne(() => [
                      De(ie(x(s)(p("exportAsBPMN"))), 1)
                    ]),
                    _: 1
                  }),
                  V(x(ot), {
                    onClick: M[4] || (M[4] = (W) => me("xml"))
                  }, {
                    default: ne(() => [
                      De(ie(x(s)(p("exportAsXML"))), 1)
                    ]),
                    _: 1
                  }),
                  V(x(ot), {
                    onClick: M[5] || (M[5] = (W) => me("svg"))
                  }, {
                    default: ne(() => [
                      De(ie(x(s)(p("exportAsSVG"))), 1)
                    ]),
                    _: 1
                  }),
                  V(x(ot), {
                    onClick: M[6] || (M[6] = (W) => me("png"))
                  }, {
                    default: ne(() => [
                      De(ie(x(s)(p("exportAsPNG"))), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: ne(() => [
                V(x(ot), null, {
                  default: ne(() => [
                    V(x(Rp), { size: 16 })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : ce("", !0),
            D.value ? (P(), ue(x(Gt), {
              key: 1,
              position: "bl",
              "popup-container": "#bpmn-viewer__wrap"
            }, {
              content: ne(() => [
                De(ie(A.value ? x(s)(p("notFullscreen")) : x(s)(p("onFullscreen"))), 1)
              ]),
              default: ne(() => [
                V(x(ot), {
                  class: le({ "is-unable": A.value }),
                  onClick: M[7] || (M[7] = (W) => H())
                }, {
                  default: ne(() => [
                    V(x(zp), {
                      name: "Fullscreen",
                      size: 16
                    })
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _: 1
            })) : ce("", !0)
          ]),
          _: 1
        })
      ])) : ce("", !0),
      V(x(Mo), {
        style: { width: "100%", height: "100%" },
        loading: e.loading
      }, {
        default: ne(() => [
          R("div", {
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
var Ne = "top", Xe = "bottom", Je = "right", Le = "left", Qo = "auto", ci = [Ne, Xe, Je, Le], wn = "start", Jn = "end", Qp = "clippingParents", vc = "viewport", Nn = "popper", e1 = "reference", Us = /* @__PURE__ */ ci.reduce(function(e, t) {
  return e.concat([t + "-" + wn, t + "-" + Jn]);
}, []), gc = /* @__PURE__ */ [].concat(ci, [Qo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + wn, t + "-" + Jn]);
}, []), t1 = "beforeRead", n1 = "read", i1 = "afterRead", r1 = "beforeMain", o1 = "main", s1 = "afterMain", a1 = "beforeWrite", l1 = "write", c1 = "afterWrite", u1 = [t1, n1, i1, r1, o1, s1, a1, l1, c1];
function dt(e) {
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
function rn(e) {
  var t = Ve(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ye(e) {
  var t = Ve(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function es(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ve(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function d1(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var i = t.styles[n] || {}, r = t.attributes[n] || {}, o = t.elements[n];
    !Ye(o) || !dt(o) || (Object.assign(o.style, i), Object.keys(r).forEach(function(s) {
      var a = r[s];
      a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function f1(e) {
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
    Object.keys(t.elements).forEach(function(i) {
      var r = t.elements[i], o = t.attributes[i] || {}, s = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : n[i]), a = s.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !Ye(r) || !dt(r) || (Object.assign(r.style, a), Object.keys(o).forEach(function(l) {
        r.removeAttribute(l);
      }));
    });
  };
}
const yc = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: d1,
  effect: f1,
  requires: ["computeStyles"]
};
function ut(e) {
  return e.split("-")[0];
}
var en = Math.max, Xi = Math.min, Sn = Math.round;
function vo() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function bc() {
  return !/^((?!chrome|android).)*safari/i.test(vo());
}
function _n(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var i = e.getBoundingClientRect(), r = 1, o = 1;
  t && Ye(e) && (r = e.offsetWidth > 0 && Sn(i.width) / e.offsetWidth || 1, o = e.offsetHeight > 0 && Sn(i.height) / e.offsetHeight || 1);
  var s = rn(e) ? Ve(e) : window, a = s.visualViewport, l = !bc() && n, u = (i.left + (l && a ? a.offsetLeft : 0)) / r, c = (i.top + (l && a ? a.offsetTop : 0)) / o, d = i.width / r, h = i.height / o;
  return {
    width: d,
    height: h,
    top: c,
    right: u + d,
    bottom: c + h,
    left: u,
    x: u,
    y: c
  };
}
function ts(e) {
  var t = _n(e), n = e.offsetWidth, i = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: i
  };
}
function Ec(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && es(n)) {
    var i = t;
    do {
      if (i && e.isSameNode(i))
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function kt(e) {
  return Ve(e).getComputedStyle(e);
}
function p1(e) {
  return ["table", "td", "th"].indexOf(dt(e)) >= 0;
}
function Rt(e) {
  return ((rn(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function dr(e) {
  return dt(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (es(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Rt(e)
  );
}
function Hs(e) {
  return !Ye(e) || // https://github.com/popperjs/popper-core/issues/837
  kt(e).position === "fixed" ? null : e.offsetParent;
}
function h1(e) {
  var t = /firefox/i.test(vo()), n = /Trident/i.test(vo());
  if (n && Ye(e)) {
    var i = kt(e);
    if (i.position === "fixed")
      return null;
  }
  var r = dr(e);
  for (es(r) && (r = r.host); Ye(r) && ["html", "body"].indexOf(dt(r)) < 0; ) {
    var o = kt(r);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function ui(e) {
  for (var t = Ve(e), n = Hs(e); n && p1(n) && kt(n).position === "static"; )
    n = Hs(n);
  return n && (dt(n) === "html" || dt(n) === "body" && kt(n).position === "static") ? t : n || h1(e) || t;
}
function ns(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function qn(e, t, n) {
  return en(e, Xi(t, n));
}
function m1(e, t, n) {
  var i = qn(e, t, n);
  return i > n ? n : i;
}
function wc() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Sc(e) {
  return Object.assign({}, wc(), e);
}
function _c(e, t) {
  return t.reduce(function(n, i) {
    return n[i] = e, n;
  }, {});
}
var v1 = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Sc(typeof t != "number" ? t : _c(t, ci));
};
function g1(e) {
  var t, n = e.state, i = e.name, r = e.options, o = n.elements.arrow, s = n.modifiersData.popperOffsets, a = ut(n.placement), l = ns(a), u = [Le, Je].indexOf(a) >= 0, c = u ? "height" : "width";
  if (!(!o || !s)) {
    var d = v1(r.padding, n), h = ts(o), E = l === "y" ? Ne : Le, f = l === "y" ? Xe : Je, p = n.rects.reference[c] + n.rects.reference[l] - s[l] - n.rects.popper[c], g = s[l] - n.rects.reference[l], C = ui(o), B = C ? l === "y" ? C.clientHeight || 0 : C.clientWidth || 0 : 0, $ = p / 2 - g / 2, v = d[E], F = B - h[c] - d[f], k = B / 2 - h[c] / 2 + $, I = qn(v, k, F), G = l;
    n.modifiersData[i] = (t = {}, t[G] = I, t.centerOffset = I - k, t);
  }
}
function y1(e) {
  var t = e.state, n = e.options, i = n.element, r = i === void 0 ? "[data-popper-arrow]" : i;
  r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || Ec(t.elements.popper, r) && (t.elements.arrow = r));
}
const b1 = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: g1,
  effect: y1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Cn(e) {
  return e.split("-")[1];
}
var E1 = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function w1(e, t) {
  var n = e.x, i = e.y, r = t.devicePixelRatio || 1;
  return {
    x: Sn(n * r) / r || 0,
    y: Sn(i * r) / r || 0
  };
}
function qs(e) {
  var t, n = e.popper, i = e.popperRect, r = e.placement, o = e.variation, s = e.offsets, a = e.position, l = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, d = e.isFixed, h = s.x, E = h === void 0 ? 0 : h, f = s.y, p = f === void 0 ? 0 : f, g = typeof c == "function" ? c({
    x: E,
    y: p
  }) : {
    x: E,
    y: p
  };
  E = g.x, p = g.y;
  var C = s.hasOwnProperty("x"), B = s.hasOwnProperty("y"), $ = Le, v = Ne, F = window;
  if (u) {
    var k = ui(n), I = "clientHeight", G = "clientWidth";
    if (k === Ve(n) && (k = Rt(n), kt(k).position !== "static" && a === "absolute" && (I = "scrollHeight", G = "scrollWidth")), k = k, r === Ne || (r === Le || r === Je) && o === Jn) {
      v = Xe;
      var K = d && k === F && F.visualViewport ? F.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        k[I]
      );
      p -= K - i.height, p *= l ? 1 : -1;
    }
    if (r === Le || (r === Ne || r === Xe) && o === Jn) {
      $ = Je;
      var w = d && k === F && F.visualViewport ? F.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        k[G]
      );
      E -= w - i.width, E *= l ? 1 : -1;
    }
  }
  var b = Object.assign({
    position: a
  }, u && E1), m = c === !0 ? w1({
    x: E,
    y: p
  }, Ve(n)) : {
    x: E,
    y: p
  };
  if (E = m.x, p = m.y, l) {
    var S;
    return Object.assign({}, b, (S = {}, S[v] = B ? "0" : "", S[$] = C ? "0" : "", S.transform = (F.devicePixelRatio || 1) <= 1 ? "translate(" + E + "px, " + p + "px)" : "translate3d(" + E + "px, " + p + "px, 0)", S));
  }
  return Object.assign({}, b, (t = {}, t[v] = B ? p + "px" : "", t[$] = C ? E + "px" : "", t.transform = "", t));
}
function S1(e) {
  var t = e.state, n = e.options, i = n.gpuAcceleration, r = i === void 0 ? !0 : i, o = n.adaptive, s = o === void 0 ? !0 : o, a = n.roundOffsets, l = a === void 0 ? !0 : a, u = {
    placement: ut(t.placement),
    variation: Cn(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: r,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, qs(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, qs(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const _1 = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: S1,
  data: {}
};
var _i = {
  passive: !0
};
function C1(e) {
  var t = e.state, n = e.instance, i = e.options, r = i.scroll, o = r === void 0 ? !0 : r, s = i.resize, a = s === void 0 ? !0 : s, l = Ve(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && u.forEach(function(c) {
    c.addEventListener("scroll", n.update, _i);
  }), a && l.addEventListener("resize", n.update, _i), function() {
    o && u.forEach(function(c) {
      c.removeEventListener("scroll", n.update, _i);
    }), a && l.removeEventListener("resize", n.update, _i);
  };
}
const k1 = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: C1,
  data: {}
};
var T1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Mi(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return T1[t];
  });
}
var A1 = {
  start: "end",
  end: "start"
};
function Ws(e) {
  return e.replace(/start|end/g, function(t) {
    return A1[t];
  });
}
function is(e) {
  var t = Ve(e), n = t.pageXOffset, i = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: i
  };
}
function rs(e) {
  return _n(Rt(e)).left + is(e).scrollLeft;
}
function O1(e, t) {
  var n = Ve(e), i = Rt(e), r = n.visualViewport, o = i.clientWidth, s = i.clientHeight, a = 0, l = 0;
  if (r) {
    o = r.width, s = r.height;
    var u = bc();
    (u || !u && t === "fixed") && (a = r.offsetLeft, l = r.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: a + rs(e),
    y: l
  };
}
function B1(e) {
  var t, n = Rt(e), i = is(e), r = (t = e.ownerDocument) == null ? void 0 : t.body, o = en(n.scrollWidth, n.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), s = en(n.scrollHeight, n.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), a = -i.scrollLeft + rs(e), l = -i.scrollTop;
  return kt(r || n).direction === "rtl" && (a += en(n.clientWidth, r ? r.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: a,
    y: l
  };
}
function os(e) {
  var t = kt(e), n = t.overflow, i = t.overflowX, r = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + r + i);
}
function Cc(e) {
  return ["html", "body", "#document"].indexOf(dt(e)) >= 0 ? e.ownerDocument.body : Ye(e) && os(e) ? e : Cc(dr(e));
}
function Wn(e, t) {
  var n;
  t === void 0 && (t = []);
  var i = Cc(e), r = i === ((n = e.ownerDocument) == null ? void 0 : n.body), o = Ve(i), s = r ? [o].concat(o.visualViewport || [], os(i) ? i : []) : i, a = t.concat(s);
  return r ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(Wn(dr(s)))
  );
}
function go(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function D1(e, t) {
  var n = _n(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Gs(e, t, n) {
  return t === vc ? go(O1(e, n)) : rn(t) ? D1(t, n) : go(B1(Rt(e)));
}
function I1(e) {
  var t = Wn(dr(e)), n = ["absolute", "fixed"].indexOf(kt(e).position) >= 0, i = n && Ye(e) ? ui(e) : e;
  return rn(i) ? t.filter(function(r) {
    return rn(r) && Ec(r, i) && dt(r) !== "body";
  }) : [];
}
function P1(e, t, n, i) {
  var r = t === "clippingParents" ? I1(e) : [].concat(t), o = [].concat(r, [n]), s = o[0], a = o.reduce(function(l, u) {
    var c = Gs(e, u, i);
    return l.top = en(c.top, l.top), l.right = Xi(c.right, l.right), l.bottom = Xi(c.bottom, l.bottom), l.left = en(c.left, l.left), l;
  }, Gs(e, s, i));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function kc(e) {
  var t = e.reference, n = e.element, i = e.placement, r = i ? ut(i) : null, o = i ? Cn(i) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, l;
  switch (r) {
    case Ne:
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
    case Le:
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
  var u = r ? ns(r) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (o) {
      case wn:
        l[u] = l[u] - (t[c] / 2 - n[c] / 2);
        break;
      case Jn:
        l[u] = l[u] + (t[c] / 2 - n[c] / 2);
        break;
    }
  }
  return l;
}
function Zn(e, t) {
  t === void 0 && (t = {});
  var n = t, i = n.placement, r = i === void 0 ? e.placement : i, o = n.strategy, s = o === void 0 ? e.strategy : o, a = n.boundary, l = a === void 0 ? Qp : a, u = n.rootBoundary, c = u === void 0 ? vc : u, d = n.elementContext, h = d === void 0 ? Nn : d, E = n.altBoundary, f = E === void 0 ? !1 : E, p = n.padding, g = p === void 0 ? 0 : p, C = Sc(typeof g != "number" ? g : _c(g, ci)), B = h === Nn ? e1 : Nn, $ = e.rects.popper, v = e.elements[f ? B : h], F = P1(rn(v) ? v : v.contextElement || Rt(e.elements.popper), l, c, s), k = _n(e.elements.reference), I = kc({
    reference: k,
    element: $,
    placement: r
  }), G = go(Object.assign({}, $, I)), K = h === Nn ? G : k, w = {
    top: F.top - K.top + C.top,
    bottom: K.bottom - F.bottom + C.bottom,
    left: F.left - K.left + C.left,
    right: K.right - F.right + C.right
  }, b = e.modifiersData.offset;
  if (h === Nn && b) {
    var m = b[r];
    Object.keys(w).forEach(function(S) {
      var D = [Je, Xe].indexOf(S) >= 0 ? 1 : -1, A = [Ne, Xe].indexOf(S) >= 0 ? "y" : "x";
      w[S] += m[A] * D;
    });
  }
  return w;
}
function $1(e, t) {
  t === void 0 && (t = {});
  var n = t, i = n.placement, r = n.boundary, o = n.rootBoundary, s = n.padding, a = n.flipVariations, l = n.allowedAutoPlacements, u = l === void 0 ? gc : l, c = Cn(i), d = c ? a ? Us : Us.filter(function(f) {
    return Cn(f) === c;
  }) : ci, h = d.filter(function(f) {
    return u.indexOf(f) >= 0;
  });
  h.length === 0 && (h = d);
  var E = h.reduce(function(f, p) {
    return f[p] = Zn(e, {
      placement: p,
      boundary: r,
      rootBoundary: o,
      padding: s
    })[ut(p)], f;
  }, {});
  return Object.keys(E).sort(function(f, p) {
    return E[f] - E[p];
  });
}
function x1(e) {
  if (ut(e) === Qo)
    return [];
  var t = Mi(e);
  return [Ws(e), t, Ws(t)];
}
function F1(e) {
  var t = e.state, n = e.options, i = e.name;
  if (!t.modifiersData[i]._skip) {
    for (var r = n.mainAxis, o = r === void 0 ? !0 : r, s = n.altAxis, a = s === void 0 ? !0 : s, l = n.fallbackPlacements, u = n.padding, c = n.boundary, d = n.rootBoundary, h = n.altBoundary, E = n.flipVariations, f = E === void 0 ? !0 : E, p = n.allowedAutoPlacements, g = t.options.placement, C = ut(g), B = C === g, $ = l || (B || !f ? [Mi(g)] : x1(g)), v = [g].concat($).reduce(function(z, j) {
      return z.concat(ut(j) === Qo ? $1(t, {
        placement: j,
        boundary: c,
        rootBoundary: d,
        padding: u,
        flipVariations: f,
        allowedAutoPlacements: p
      }) : j);
    }, []), F = t.rects.reference, k = t.rects.popper, I = /* @__PURE__ */ new Map(), G = !0, K = v[0], w = 0; w < v.length; w++) {
      var b = v[w], m = ut(b), S = Cn(b) === wn, D = [Ne, Xe].indexOf(m) >= 0, A = D ? "width" : "height", H = Zn(t, {
        placement: b,
        boundary: c,
        rootBoundary: d,
        altBoundary: h,
        padding: u
      }), q = D ? S ? Je : Le : S ? Xe : Ne;
      F[A] > k[A] && (q = Mi(q));
      var Q = Mi(q), me = [];
      if (o && me.push(H[m] <= 0), a && me.push(H[q] <= 0, H[Q] <= 0), me.every(function(z) {
        return z;
      })) {
        K = b, G = !1;
        break;
      }
      I.set(b, me);
    }
    if (G)
      for (var be = f ? 3 : 1, N = function(j) {
        var J = v.find(function(de) {
          var ve = I.get(de);
          if (ve)
            return ve.slice(0, j).every(function(se) {
              return se;
            });
        });
        if (J)
          return K = J, "break";
      }, M = be; M > 0; M--) {
        var W = N(M);
        if (W === "break") break;
      }
    t.placement !== K && (t.modifiersData[i]._skip = !0, t.placement = K, t.reset = !0);
  }
}
const M1 = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: F1,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ks(e, t, n) {
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
function Ys(e) {
  return [Ne, Je, Xe, Le].some(function(t) {
    return e[t] >= 0;
  });
}
function N1(e) {
  var t = e.state, n = e.name, i = t.rects.reference, r = t.rects.popper, o = t.modifiersData.preventOverflow, s = Zn(t, {
    elementContext: "reference"
  }), a = Zn(t, {
    altBoundary: !0
  }), l = Ks(s, i), u = Ks(a, r, o), c = Ys(l), d = Ys(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: d
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": d
  });
}
const L1 = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: N1
};
function R1(e, t, n) {
  var i = ut(e), r = [Le, Ne].indexOf(i) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = o[0], a = o[1];
  return s = s || 0, a = (a || 0) * r, [Le, Je].indexOf(i) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function z1(e) {
  var t = e.state, n = e.options, i = e.name, r = n.offset, o = r === void 0 ? [0, 0] : r, s = gc.reduce(function(c, d) {
    return c[d] = R1(d, t.rects, o), c;
  }, {}), a = s[t.placement], l = a.x, u = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += u), t.modifiersData[i] = s;
}
const j1 = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: z1
};
function V1(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = kc({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const U1 = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: V1,
  data: {}
};
function H1(e) {
  return e === "x" ? "y" : "x";
}
function q1(e) {
  var t = e.state, n = e.options, i = e.name, r = n.mainAxis, o = r === void 0 ? !0 : r, s = n.altAxis, a = s === void 0 ? !1 : s, l = n.boundary, u = n.rootBoundary, c = n.altBoundary, d = n.padding, h = n.tether, E = h === void 0 ? !0 : h, f = n.tetherOffset, p = f === void 0 ? 0 : f, g = Zn(t, {
    boundary: l,
    rootBoundary: u,
    padding: d,
    altBoundary: c
  }), C = ut(t.placement), B = Cn(t.placement), $ = !B, v = ns(C), F = H1(v), k = t.modifiersData.popperOffsets, I = t.rects.reference, G = t.rects.popper, K = typeof p == "function" ? p(Object.assign({}, t.rects, {
    placement: t.placement
  })) : p, w = typeof K == "number" ? {
    mainAxis: K,
    altAxis: K
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, K), b = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, m = {
    x: 0,
    y: 0
  };
  if (k) {
    if (o) {
      var S, D = v === "y" ? Ne : Le, A = v === "y" ? Xe : Je, H = v === "y" ? "height" : "width", q = k[v], Q = q + g[D], me = q - g[A], be = E ? -G[H] / 2 : 0, N = B === wn ? I[H] : G[H], M = B === wn ? -G[H] : -I[H], W = t.elements.arrow, z = E && W ? ts(W) : {
        width: 0,
        height: 0
      }, j = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : wc(), J = j[D], de = j[A], ve = qn(0, I[H], z[H]), se = $ ? I[H] / 2 - be - ve - J - w.mainAxis : N - ve - J - w.mainAxis, ye = $ ? -I[H] / 2 + be + ve + de + w.mainAxis : M + ve + de + w.mainAxis, Be = t.elements.arrow && ui(t.elements.arrow), ht = Be ? v === "y" ? Be.clientTop || 0 : Be.clientLeft || 0 : 0, He = (S = b == null ? void 0 : b[v]) != null ? S : 0, mt = q + se - He - ht, vt = q + ye - He, Ze = qn(E ? Xi(Q, mt) : Q, q, E ? en(me, vt) : me);
      k[v] = Ze, m[v] = Ze - q;
    }
    if (a) {
      var gt, Tt = v === "x" ? Ne : Le, At = v === "x" ? Xe : Je, Ee = k[F], qe = F === "y" ? "height" : "width", zt = Ee + g[Tt], Qe = Ee - g[At], nt = [Ne, Le].indexOf(C) !== -1, jt = (gt = b == null ? void 0 : b[F]) != null ? gt : 0, un = nt ? zt : Ee - I[qe] - G[qe] - jt + w.altAxis, dn = nt ? Ee + I[qe] + G[qe] - jt - w.altAxis : Qe, L = E && nt ? m1(un, Ee, dn) : qn(E ? un : zt, Ee, E ? dn : Qe);
      k[F] = L, m[F] = L - Ee;
    }
    t.modifiersData[i] = m;
  }
}
const W1 = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: q1,
  requiresIfExists: ["offset"]
};
function G1(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function K1(e) {
  return e === Ve(e) || !Ye(e) ? is(e) : G1(e);
}
function Y1(e) {
  var t = e.getBoundingClientRect(), n = Sn(t.width) / e.offsetWidth || 1, i = Sn(t.height) / e.offsetHeight || 1;
  return n !== 1 || i !== 1;
}
function X1(e, t, n) {
  n === void 0 && (n = !1);
  var i = Ye(t), r = Ye(t) && Y1(t), o = Rt(t), s = _n(e, r, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (i || !i && !n) && ((dt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  os(o)) && (a = K1(t)), Ye(t) ? (l = _n(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : o && (l.x = rs(o))), {
    x: s.left + a.scrollLeft - l.x,
    y: s.top + a.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function J1(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), i = [];
  e.forEach(function(o) {
    t.set(o.name, o);
  });
  function r(o) {
    n.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function(a) {
      if (!n.has(a)) {
        var l = t.get(a);
        l && r(l);
      }
    }), i.push(o);
  }
  return e.forEach(function(o) {
    n.has(o.name) || r(o);
  }), i;
}
function Z1(e) {
  var t = J1(e);
  return u1.reduce(function(n, i) {
    return n.concat(t.filter(function(r) {
      return r.phase === i;
    }));
  }, []);
}
function Q1(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function eh(e) {
  var t = e.reduce(function(n, i) {
    var r = n[i.name];
    return n[i.name] = r ? Object.assign({}, r, i, {
      options: Object.assign({}, r.options, i.options),
      data: Object.assign({}, r.data, i.data)
    }) : i, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var Xs = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Js() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function th(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, i = n === void 0 ? [] : n, r = t.defaultOptions, o = r === void 0 ? Xs : r;
  return function(a, l, u) {
    u === void 0 && (u = o);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Xs, o),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, d = [], h = !1, E = {
      state: c,
      setOptions: function(C) {
        var B = typeof C == "function" ? C(c.options) : C;
        p(), c.options = Object.assign({}, o, c.options, B), c.scrollParents = {
          reference: rn(a) ? Wn(a) : a.contextElement ? Wn(a.contextElement) : [],
          popper: Wn(l)
        };
        var $ = Z1(eh([].concat(i, c.options.modifiers)));
        return c.orderedModifiers = $.filter(function(v) {
          return v.enabled;
        }), f(), E.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!h) {
          var C = c.elements, B = C.reference, $ = C.popper;
          if (Js(B, $)) {
            c.rects = {
              reference: X1(B, ui($), c.options.strategy === "fixed"),
              popper: ts($)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(w) {
              return c.modifiersData[w.name] = Object.assign({}, w.data);
            });
            for (var v = 0; v < c.orderedModifiers.length; v++) {
              if (c.reset === !0) {
                c.reset = !1, v = -1;
                continue;
              }
              var F = c.orderedModifiers[v], k = F.fn, I = F.options, G = I === void 0 ? {} : I, K = F.name;
              typeof k == "function" && (c = k({
                state: c,
                options: G,
                name: K,
                instance: E
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Q1(function() {
        return new Promise(function(g) {
          E.forceUpdate(), g(c);
        });
      }),
      destroy: function() {
        p(), h = !0;
      }
    };
    if (!Js(a, l))
      return E;
    E.setOptions(u).then(function(g) {
      !h && u.onFirstUpdate && u.onFirstUpdate(g);
    });
    function f() {
      c.orderedModifiers.forEach(function(g) {
        var C = g.name, B = g.options, $ = B === void 0 ? {} : B, v = g.effect;
        if (typeof v == "function") {
          var F = v({
            state: c,
            name: C,
            instance: E,
            options: $
          }), k = function() {
          };
          d.push(F || k);
        }
      });
    }
    function p() {
      d.forEach(function(g) {
        return g();
      }), d = [];
    }
    return E;
  };
}
var nh = [k1, U1, _1, yc, j1, M1, W1, b1, L1], ih = /* @__PURE__ */ th({
  defaultModifiers: nh
}), rh = "tippy-box", Tc = "tippy-content", oh = "tippy-backdrop", Ac = "tippy-arrow", Oc = "tippy-svg-arrow", Wt = {
  passive: !0,
  capture: !0
}, Bc = function() {
  return document.body;
};
function sh(e, t) {
  return {}.hasOwnProperty.call(e, t);
}
function Kr(e, t, n) {
  if (Array.isArray(e)) {
    var i = e[t];
    return i ?? (Array.isArray(n) ? n[t] : n);
  }
  return e;
}
function ss(e, t) {
  var n = {}.toString.call(e);
  return n.indexOf("[object") === 0 && n.indexOf(t + "]") > -1;
}
function Dc(e, t) {
  return typeof e == "function" ? e.apply(void 0, t) : e;
}
function Zs(e, t) {
  if (t === 0)
    return e;
  var n;
  return function(i) {
    clearTimeout(n), n = setTimeout(function() {
      e(i);
    }, t);
  };
}
function ah(e, t) {
  var n = Object.assign({}, e);
  return t.forEach(function(i) {
    delete n[i];
  }), n;
}
function lh(e) {
  return e.split(/\s+/).filter(Boolean);
}
function vn(e) {
  return [].concat(e);
}
function Qs(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function ch(e) {
  return e.filter(function(t, n) {
    return e.indexOf(t) === n;
  });
}
function uh(e) {
  return e.split("-")[0];
}
function Ji(e) {
  return [].slice.call(e);
}
function ea(e) {
  return Object.keys(e).reduce(function(t, n) {
    return e[n] !== void 0 && (t[n] = e[n]), t;
  }, {});
}
function Gn() {
  return document.createElement("div");
}
function Qn(e) {
  return ["Element", "Fragment"].some(function(t) {
    return ss(e, t);
  });
}
function dh(e) {
  return ss(e, "NodeList");
}
function Ic(e) {
  return ss(e, "MouseEvent");
}
function fh(e) {
  return !!(e && e._tippy && e._tippy.reference === e);
}
function ph(e) {
  return Qn(e) ? [e] : dh(e) ? Ji(e) : Array.isArray(e) ? e : Ji(document.querySelectorAll(e));
}
function Yr(e, t) {
  e.forEach(function(n) {
    n && (n.style.transitionDuration = t + "ms");
  });
}
function ta(e, t) {
  e.forEach(function(n) {
    n && n.setAttribute("data-state", t);
  });
}
function Pc(e) {
  var t, n = vn(e), i = n[0];
  return i != null && (t = i.ownerDocument) != null && t.body ? i.ownerDocument : document;
}
function hh(e, t) {
  var n = t.clientX, i = t.clientY;
  return e.every(function(r) {
    var o = r.popperRect, s = r.popperState, a = r.props, l = a.interactiveBorder, u = uh(s.placement), c = s.modifiersData.offset;
    if (!c)
      return !0;
    var d = u === "bottom" ? c.top.y : 0, h = u === "top" ? c.bottom.y : 0, E = u === "right" ? c.left.x : 0, f = u === "left" ? c.right.x : 0, p = o.top - i + d > l, g = i - o.bottom - h > l, C = o.left - n + E > l, B = n - o.right - f > l;
    return p || g || C || B;
  });
}
function Xr(e, t, n) {
  var i = t + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(r) {
    e[i](r, n);
  });
}
function na(e, t) {
  for (var n = t; n; ) {
    var i;
    if (e.contains(n))
      return !0;
    n = n.getRootNode == null || (i = n.getRootNode()) == null ? void 0 : i.host;
  }
  return !1;
}
var lt = {
  isTouch: !1
}, ia = 0;
function mh() {
  lt.isTouch || (lt.isTouch = !0, window.performance && document.addEventListener("mousemove", $c));
}
function $c() {
  var e = performance.now();
  e - ia < 20 && (lt.isTouch = !1, document.removeEventListener("mousemove", $c)), ia = e;
}
function vh() {
  var e = document.activeElement;
  if (fh(e)) {
    var t = e._tippy;
    e.blur && !t.state.isVisible && e.blur();
  }
}
function gh() {
  document.addEventListener("touchstart", mh, Wt), window.addEventListener("blur", vh);
}
var yh = typeof window < "u" && typeof document < "u", bh = yh ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function hn(e) {
  var t = e === "destroy" ? "n already-" : " ";
  return [e + "() was called on a" + t + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function ra(e) {
  var t = /[ \t]{2,}/g, n = /^[ \t]*/gm;
  return e.replace(t, " ").replace(n, "").trim();
}
function Eh(e) {
  return ra(`
  %ctippy.js

  %c` + ra(e) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function xc(e) {
  return [
    Eh(e),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var ei;
process.env.NODE_ENV !== "production" && wh();
function wh() {
  ei = /* @__PURE__ */ new Set();
}
function bt(e, t) {
  if (e && !ei.has(t)) {
    var n;
    ei.add(t), (n = console).warn.apply(n, xc(t));
  }
}
function yo(e, t) {
  if (e && !ei.has(t)) {
    var n;
    ei.add(t), (n = console).error.apply(n, xc(t));
  }
}
function Sh(e) {
  var t = !e, n = Object.prototype.toString.call(e) === "[object Object]" && !e.addEventListener;
  yo(t, ["tippy() was passed", "`" + String(e) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), yo(n, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var Fc = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, _h = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, je = Object.assign({
  appendTo: Bc,
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
}, Fc, _h), Ch = Object.keys(je), kh = function(t) {
  process.env.NODE_ENV !== "production" && Nc(t, []);
  var n = Object.keys(t);
  n.forEach(function(i) {
    je[i] = t[i];
  });
};
function Mc(e) {
  var t = e.plugins || [], n = t.reduce(function(i, r) {
    var o = r.name, s = r.defaultValue;
    if (o) {
      var a;
      i[o] = e[o] !== void 0 ? e[o] : (a = je[o]) != null ? a : s;
    }
    return i;
  }, {});
  return Object.assign({}, e, n);
}
function Th(e, t) {
  var n = t ? Object.keys(Mc(Object.assign({}, je, {
    plugins: t
  }))) : Ch, i = n.reduce(function(r, o) {
    var s = (e.getAttribute("data-tippy-" + o) || "").trim();
    if (!s)
      return r;
    if (o === "content")
      r[o] = s;
    else
      try {
        r[o] = JSON.parse(s);
      } catch {
        r[o] = s;
      }
    return r;
  }, {});
  return i;
}
function oa(e, t) {
  var n = Object.assign({}, t, {
    content: Dc(t.content, [e])
  }, t.ignoreAttributes ? {} : Th(e, t.plugins));
  return n.aria = Object.assign({}, je.aria, n.aria), n.aria = {
    expanded: n.aria.expanded === "auto" ? t.interactive : n.aria.expanded,
    content: n.aria.content === "auto" ? t.interactive ? null : "describedby" : n.aria.content
  }, n;
}
function Nc(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = []);
  var n = Object.keys(e);
  n.forEach(function(i) {
    var r = ah(je, Object.keys(Fc)), o = !sh(r, i);
    o && (o = t.filter(function(s) {
      return s.name === i;
    }).length === 0), bt(o, ["`" + i + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var Ah = function() {
  return "innerHTML";
};
function bo(e, t) {
  e[Ah()] = t;
}
function sa(e) {
  var t = Gn();
  return e === !0 ? t.className = Ac : (t.className = Oc, Qn(e) ? t.appendChild(e) : bo(t, e)), t;
}
function aa(e, t) {
  Qn(t.content) ? (bo(e, ""), e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? bo(e, t.content) : e.textContent = t.content);
}
function Eo(e) {
  var t = e.firstElementChild, n = Ji(t.children);
  return {
    box: t,
    content: n.find(function(i) {
      return i.classList.contains(Tc);
    }),
    arrow: n.find(function(i) {
      return i.classList.contains(Ac) || i.classList.contains(Oc);
    }),
    backdrop: n.find(function(i) {
      return i.classList.contains(oh);
    })
  };
}
function Lc(e) {
  var t = Gn(), n = Gn();
  n.className = rh, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
  var i = Gn();
  i.className = Tc, i.setAttribute("data-state", "hidden"), aa(i, e.props), t.appendChild(n), n.appendChild(i), r(e.props, e.props);
  function r(o, s) {
    var a = Eo(t), l = a.box, u = a.content, c = a.arrow;
    s.theme ? l.setAttribute("data-theme", s.theme) : l.removeAttribute("data-theme"), typeof s.animation == "string" ? l.setAttribute("data-animation", s.animation) : l.removeAttribute("data-animation"), s.inertia ? l.setAttribute("data-inertia", "") : l.removeAttribute("data-inertia"), l.style.maxWidth = typeof s.maxWidth == "number" ? s.maxWidth + "px" : s.maxWidth, s.role ? l.setAttribute("role", s.role) : l.removeAttribute("role"), (o.content !== s.content || o.allowHTML !== s.allowHTML) && aa(u, e.props), s.arrow ? c ? o.arrow !== s.arrow && (l.removeChild(c), l.appendChild(sa(s.arrow))) : l.appendChild(sa(s.arrow)) : c && l.removeChild(c);
  }
  return {
    popper: t,
    onUpdate: r
  };
}
Lc.$$tippy = !0;
var Oh = 1, Ci = [], Jr = [];
function Bh(e, t) {
  var n = oa(e, Object.assign({}, je, Mc(ea(t)))), i, r, o, s = !1, a = !1, l = !1, u = !1, c, d, h, E = [], f = Zs(mt, n.interactiveDebounce), p, g = Oh++, C = null, B = ch(n.plugins), $ = {
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
  }, v = {
    // properties
    id: g,
    reference: e,
    popper: Gn(),
    popperInstance: C,
    props: n,
    state: $,
    plugins: B,
    // methods
    clearDelayTimeouts: un,
    setProps: dn,
    setContent: L,
    show: Z,
    hide: Oe,
    hideWithInteractivity: Ot,
    enable: nt,
    disable: jt,
    unmount: yt,
    destroy: Bt
  };
  if (!n.render)
    return process.env.NODE_ENV !== "production" && yo(!0, "render() function has not been supplied."), v;
  var F = n.render(v), k = F.popper, I = F.onUpdate;
  k.setAttribute("data-tippy-root", ""), k.id = "tippy-" + v.id, v.popper = k, e._tippy = v, k._tippy = v;
  var G = B.map(function(T) {
    return T.fn(v);
  }), K = e.hasAttribute("aria-expanded");
  return Be(), be(), q(), Q("onCreate", [v]), n.showOnCreate && zt(), k.addEventListener("mouseenter", function() {
    v.props.interactive && v.state.isVisible && v.clearDelayTimeouts();
  }), k.addEventListener("mouseleave", function() {
    v.props.interactive && v.props.trigger.indexOf("mouseenter") >= 0 && D().addEventListener("mousemove", f);
  }), v;
  function w() {
    var T = v.props.touch;
    return Array.isArray(T) ? T : [T, 0];
  }
  function b() {
    return w()[0] === "hold";
  }
  function m() {
    var T;
    return !!((T = v.props.render) != null && T.$$tippy);
  }
  function S() {
    return p || e;
  }
  function D() {
    var T = S().parentNode;
    return T ? Pc(T) : document;
  }
  function A() {
    return Eo(k);
  }
  function H(T) {
    return v.state.isMounted && !v.state.isVisible || lt.isTouch || c && c.type === "focus" ? 0 : Kr(v.props.delay, T ? 0 : 1, je.delay);
  }
  function q(T) {
    T === void 0 && (T = !1), k.style.pointerEvents = v.props.interactive && !T ? "" : "none", k.style.zIndex = "" + v.props.zIndex;
  }
  function Q(T, U, ee) {
    if (ee === void 0 && (ee = !0), G.forEach(function(fe) {
      fe[T] && fe[T].apply(fe, U);
    }), ee) {
      var ge;
      (ge = v.props)[T].apply(ge, U);
    }
  }
  function me() {
    var T = v.props.aria;
    if (T.content) {
      var U = "aria-" + T.content, ee = k.id, ge = vn(v.props.triggerTarget || e);
      ge.forEach(function(fe) {
        var Pe = fe.getAttribute(U);
        if (v.state.isVisible)
          fe.setAttribute(U, Pe ? Pe + " " + ee : ee);
        else {
          var We = Pe && Pe.replace(ee, "").trim();
          We ? fe.setAttribute(U, We) : fe.removeAttribute(U);
        }
      });
    }
  }
  function be() {
    if (!(K || !v.props.aria.expanded)) {
      var T = vn(v.props.triggerTarget || e);
      T.forEach(function(U) {
        v.props.interactive ? U.setAttribute("aria-expanded", v.state.isVisible && U === S() ? "true" : "false") : U.removeAttribute("aria-expanded");
      });
    }
  }
  function N() {
    D().removeEventListener("mousemove", f), Ci = Ci.filter(function(T) {
      return T !== f;
    });
  }
  function M(T) {
    if (!(lt.isTouch && (l || T.type === "mousedown"))) {
      var U = T.composedPath && T.composedPath()[0] || T.target;
      if (!(v.props.interactive && na(k, U))) {
        if (vn(v.props.triggerTarget || e).some(function(ee) {
          return na(ee, U);
        })) {
          if (lt.isTouch || v.state.isVisible && v.props.trigger.indexOf("click") >= 0)
            return;
        } else
          Q("onClickOutside", [v, T]);
        v.props.hideOnClick === !0 && (v.clearDelayTimeouts(), v.hide(), a = !0, setTimeout(function() {
          a = !1;
        }), v.state.isMounted || J());
      }
    }
  }
  function W() {
    l = !0;
  }
  function z() {
    l = !1;
  }
  function j() {
    var T = D();
    T.addEventListener("mousedown", M, !0), T.addEventListener("touchend", M, Wt), T.addEventListener("touchstart", z, Wt), T.addEventListener("touchmove", W, Wt);
  }
  function J() {
    var T = D();
    T.removeEventListener("mousedown", M, !0), T.removeEventListener("touchend", M, Wt), T.removeEventListener("touchstart", z, Wt), T.removeEventListener("touchmove", W, Wt);
  }
  function de(T, U) {
    se(T, function() {
      !v.state.isVisible && k.parentNode && k.parentNode.contains(k) && U();
    });
  }
  function ve(T, U) {
    se(T, U);
  }
  function se(T, U) {
    var ee = A().box;
    function ge(fe) {
      fe.target === ee && (Xr(ee, "remove", ge), U());
    }
    if (T === 0)
      return U();
    Xr(ee, "remove", d), Xr(ee, "add", ge), d = ge;
  }
  function ye(T, U, ee) {
    ee === void 0 && (ee = !1);
    var ge = vn(v.props.triggerTarget || e);
    ge.forEach(function(fe) {
      fe.addEventListener(T, U, ee), E.push({
        node: fe,
        eventType: T,
        handler: U,
        options: ee
      });
    });
  }
  function Be() {
    b() && (ye("touchstart", He, {
      passive: !0
    }), ye("touchend", vt, {
      passive: !0
    })), lh(v.props.trigger).forEach(function(T) {
      if (T !== "manual")
        switch (ye(T, He), T) {
          case "mouseenter":
            ye("mouseleave", vt);
            break;
          case "focus":
            ye(bh ? "focusout" : "blur", Ze);
            break;
          case "focusin":
            ye("focusout", Ze);
            break;
        }
    });
  }
  function ht() {
    E.forEach(function(T) {
      var U = T.node, ee = T.eventType, ge = T.handler, fe = T.options;
      U.removeEventListener(ee, ge, fe);
    }), E = [];
  }
  function He(T) {
    var U, ee = !1;
    if (!(!v.state.isEnabled || gt(T) || a)) {
      var ge = ((U = c) == null ? void 0 : U.type) === "focus";
      c = T, p = T.currentTarget, be(), !v.state.isVisible && Ic(T) && Ci.forEach(function(fe) {
        return fe(T);
      }), T.type === "click" && (v.props.trigger.indexOf("mouseenter") < 0 || s) && v.props.hideOnClick !== !1 && v.state.isVisible ? ee = !0 : zt(T), T.type === "click" && (s = !ee), ee && !ge && Qe(T);
    }
  }
  function mt(T) {
    var U = T.target, ee = S().contains(U) || k.contains(U);
    if (!(T.type === "mousemove" && ee)) {
      var ge = qe().concat(k).map(function(fe) {
        var Pe, We = fe._tippy, fn = (Pe = We.popperInstance) == null ? void 0 : Pe.state;
        return fn ? {
          popperRect: fe.getBoundingClientRect(),
          popperState: fn,
          props: n
        } : null;
      }).filter(Boolean);
      hh(ge, T) && (N(), Qe(T));
    }
  }
  function vt(T) {
    var U = gt(T) || v.props.trigger.indexOf("click") >= 0 && s;
    if (!U) {
      if (v.props.interactive) {
        v.hideWithInteractivity(T);
        return;
      }
      Qe(T);
    }
  }
  function Ze(T) {
    v.props.trigger.indexOf("focusin") < 0 && T.target !== S() || v.props.interactive && T.relatedTarget && k.contains(T.relatedTarget) || Qe(T);
  }
  function gt(T) {
    return lt.isTouch ? b() !== T.type.indexOf("touch") >= 0 : !1;
  }
  function Tt() {
    At();
    var T = v.props, U = T.popperOptions, ee = T.placement, ge = T.offset, fe = T.getReferenceClientRect, Pe = T.moveTransition, We = m() ? Eo(k).arrow : null, fn = fe ? {
      getBoundingClientRect: fe,
      contextElement: fe.contextElement || S()
    } : e, us = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(mi) {
        var pn = mi.state;
        if (m()) {
          var pu = A(), Er = pu.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(vi) {
            vi === "placement" ? Er.setAttribute("data-placement", pn.placement) : pn.attributes.popper["data-popper-" + vi] ? Er.setAttribute("data-" + vi, "") : Er.removeAttribute("data-" + vi);
          }), pn.attributes.popper = {};
        }
      }
    }, Vt = [{
      name: "offset",
      options: {
        offset: ge
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
        adaptive: !Pe
      }
    }, us];
    m() && We && Vt.push({
      name: "arrow",
      options: {
        element: We,
        padding: 3
      }
    }), Vt.push.apply(Vt, (U == null ? void 0 : U.modifiers) || []), v.popperInstance = ih(fn, k, Object.assign({}, U, {
      placement: ee,
      onFirstUpdate: h,
      modifiers: Vt
    }));
  }
  function At() {
    v.popperInstance && (v.popperInstance.destroy(), v.popperInstance = null);
  }
  function Ee() {
    var T = v.props.appendTo, U, ee = S();
    v.props.interactive && T === Bc || T === "parent" ? U = ee.parentNode : U = Dc(T, [ee]), U.contains(k) || U.appendChild(k), v.state.isMounted = !0, Tt(), process.env.NODE_ENV !== "production" && bt(v.props.interactive && T === je.appendTo && ee.nextElementSibling !== k, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function qe() {
    return Ji(k.querySelectorAll("[data-tippy-root]"));
  }
  function zt(T) {
    v.clearDelayTimeouts(), T && Q("onTrigger", [v, T]), j();
    var U = H(!0), ee = w(), ge = ee[0], fe = ee[1];
    lt.isTouch && ge === "hold" && fe && (U = fe), U ? i = setTimeout(function() {
      v.show();
    }, U) : v.show();
  }
  function Qe(T) {
    if (v.clearDelayTimeouts(), Q("onUntrigger", [v, T]), !v.state.isVisible) {
      J();
      return;
    }
    if (!(v.props.trigger.indexOf("mouseenter") >= 0 && v.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(T.type) >= 0 && s)) {
      var U = H(!1);
      U ? r = setTimeout(function() {
        v.state.isVisible && v.hide();
      }, U) : o = requestAnimationFrame(function() {
        v.hide();
      });
    }
  }
  function nt() {
    v.state.isEnabled = !0;
  }
  function jt() {
    v.hide(), v.state.isEnabled = !1;
  }
  function un() {
    clearTimeout(i), clearTimeout(r), cancelAnimationFrame(o);
  }
  function dn(T) {
    if (process.env.NODE_ENV !== "production" && bt(v.state.isDestroyed, hn("setProps")), !v.state.isDestroyed) {
      Q("onBeforeUpdate", [v, T]), ht();
      var U = v.props, ee = oa(e, Object.assign({}, U, ea(T), {
        ignoreAttributes: !0
      }));
      v.props = ee, Be(), U.interactiveDebounce !== ee.interactiveDebounce && (N(), f = Zs(mt, ee.interactiveDebounce)), U.triggerTarget && !ee.triggerTarget ? vn(U.triggerTarget).forEach(function(ge) {
        ge.removeAttribute("aria-expanded");
      }) : ee.triggerTarget && e.removeAttribute("aria-expanded"), be(), q(), I && I(U, ee), v.popperInstance && (Tt(), qe().forEach(function(ge) {
        requestAnimationFrame(ge._tippy.popperInstance.forceUpdate);
      })), Q("onAfterUpdate", [v, T]);
    }
  }
  function L(T) {
    v.setProps({
      content: T
    });
  }
  function Z() {
    process.env.NODE_ENV !== "production" && bt(v.state.isDestroyed, hn("show"));
    var T = v.state.isVisible, U = v.state.isDestroyed, ee = !v.state.isEnabled, ge = lt.isTouch && !v.props.touch, fe = Kr(v.props.duration, 0, je.duration);
    if (!(T || U || ee || ge) && !S().hasAttribute("disabled") && (Q("onShow", [v], !1), v.props.onShow(v) !== !1)) {
      if (v.state.isVisible = !0, m() && (k.style.visibility = "visible"), q(), j(), v.state.isMounted || (k.style.transition = "none"), m()) {
        var Pe = A(), We = Pe.box, fn = Pe.content;
        Yr([We, fn], 0);
      }
      h = function() {
        var Vt;
        if (!(!v.state.isVisible || u)) {
          if (u = !0, k.offsetHeight, k.style.transition = v.props.moveTransition, m() && v.props.animation) {
            var br = A(), mi = br.box, pn = br.content;
            Yr([mi, pn], fe), ta([mi, pn], "visible");
          }
          me(), be(), Qs(Jr, v), (Vt = v.popperInstance) == null || Vt.forceUpdate(), Q("onMount", [v]), v.props.animation && m() && ve(fe, function() {
            v.state.isShown = !0, Q("onShown", [v]);
          });
        }
      }, Ee();
    }
  }
  function Oe() {
    process.env.NODE_ENV !== "production" && bt(v.state.isDestroyed, hn("hide"));
    var T = !v.state.isVisible, U = v.state.isDestroyed, ee = !v.state.isEnabled, ge = Kr(v.props.duration, 1, je.duration);
    if (!(T || U || ee) && (Q("onHide", [v], !1), v.props.onHide(v) !== !1)) {
      if (v.state.isVisible = !1, v.state.isShown = !1, u = !1, s = !1, m() && (k.style.visibility = "hidden"), N(), J(), q(!0), m()) {
        var fe = A(), Pe = fe.box, We = fe.content;
        v.props.animation && (Yr([Pe, We], ge), ta([Pe, We], "hidden"));
      }
      me(), be(), v.props.animation ? m() && de(ge, v.unmount) : v.unmount();
    }
  }
  function Ot(T) {
    process.env.NODE_ENV !== "production" && bt(v.state.isDestroyed, hn("hideWithInteractivity")), D().addEventListener("mousemove", f), Qs(Ci, f), f(T);
  }
  function yt() {
    process.env.NODE_ENV !== "production" && bt(v.state.isDestroyed, hn("unmount")), v.state.isVisible && v.hide(), v.state.isMounted && (At(), qe().forEach(function(T) {
      T._tippy.unmount();
    }), k.parentNode && k.parentNode.removeChild(k), Jr = Jr.filter(function(T) {
      return T !== v;
    }), v.state.isMounted = !1, Q("onHidden", [v]));
  }
  function Bt() {
    process.env.NODE_ENV !== "production" && bt(v.state.isDestroyed, hn("destroy")), !v.state.isDestroyed && (v.clearDelayTimeouts(), v.unmount(), ht(), delete e._tippy, v.state.isDestroyed = !0, Q("onDestroy", [v]));
  }
}
function di(e, t) {
  t === void 0 && (t = {});
  var n = je.plugins.concat(t.plugins || []);
  process.env.NODE_ENV !== "production" && (Sh(e), Nc(t, n)), gh();
  var i = Object.assign({}, t, {
    plugins: n
  }), r = ph(e);
  if (process.env.NODE_ENV !== "production") {
    var o = Qn(i.content), s = r.length > 1;
    bt(o && s, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var a = r.reduce(function(l, u) {
    var c = u && Bh(u, i);
    return c && l.push(c), l;
  }, []);
  return Qn(e) ? a[0] : a;
}
di.defaultProps = je;
di.setDefaultProps = kh;
di.currentInput = lt;
Object.assign({}, yc, {
  effect: function(t) {
    var n = t.state, i = {
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
    Object.assign(n.elements.popper.style, i.popper), n.styles = i, n.elements.arrow && Object.assign(n.elements.arrow.style, i.arrow);
  }
});
var wo = {
  clientX: 0,
  clientY: 0
}, ki = [];
function Rc(e) {
  var t = e.clientX, n = e.clientY;
  wo = {
    clientX: t,
    clientY: n
  };
}
function Dh(e) {
  e.addEventListener("mousemove", Rc);
}
function Ih(e) {
  e.removeEventListener("mousemove", Rc);
}
var Ph = {
  name: "followCursor",
  defaultValue: !1,
  fn: function(t) {
    var n = t.reference, i = Pc(t.props.triggerTarget || n), r = !1, o = !1, s = !0, a = t.props;
    function l() {
      return t.props.followCursor === "initial" && t.state.isVisible;
    }
    function u() {
      i.addEventListener("mousemove", h);
    }
    function c() {
      i.removeEventListener("mousemove", h);
    }
    function d() {
      r = !0, t.setProps({
        getReferenceClientRect: null
      }), r = !1;
    }
    function h(p) {
      var g = p.target ? n.contains(p.target) : !0, C = t.props.followCursor, B = p.clientX, $ = p.clientY, v = n.getBoundingClientRect(), F = B - v.left, k = $ - v.top;
      (g || !t.props.interactive) && t.setProps({
        // @ts-ignore - unneeded DOMRect properties
        getReferenceClientRect: function() {
          var G = n.getBoundingClientRect(), K = B, w = $;
          C === "initial" && (K = G.left + F, w = G.top + k);
          var b = C === "horizontal" ? G.top : w, m = C === "vertical" ? G.right : K, S = C === "horizontal" ? G.bottom : w, D = C === "vertical" ? G.left : K;
          return {
            width: m - D,
            height: S - b,
            top: b,
            right: m,
            bottom: S,
            left: D
          };
        }
      });
    }
    function E() {
      t.props.followCursor && (ki.push({
        instance: t,
        doc: i
      }), Dh(i));
    }
    function f() {
      ki = ki.filter(function(p) {
        return p.instance !== t;
      }), ki.filter(function(p) {
        return p.doc === i;
      }).length === 0 && Ih(i);
    }
    return {
      onCreate: E,
      onDestroy: f,
      onBeforeUpdate: function() {
        a = t.props;
      },
      onAfterUpdate: function(g, C) {
        var B = C.followCursor;
        r || B !== void 0 && a.followCursor !== B && (f(), B ? (E(), t.state.isMounted && !o && !l() && u()) : (c(), d()));
      },
      onMount: function() {
        t.props.followCursor && !o && (s && (h(wo), s = !1), l() || u());
      },
      onTrigger: function(g, C) {
        Ic(C) && (wo = {
          clientX: C.clientX,
          clientY: C.clientY
        }), o = C.type === "focus";
      },
      onHidden: function() {
        t.props.followCursor && (d(), c(), s = !0);
      }
    };
  }
};
di.setDefaultProps({
  render: Lc
});
const $h = /* @__PURE__ */ he({
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
    const t = e, n = Kn(null), i = Kn(null), r = () => {
      const s = {
        ignoreAttributes: !0,
        allowHTML: !1,
        showOnCreate: !1
        // sticky: false
      };
      return s.appendTo = t.appendTo === !0 ? () => document.body : t.appendTo || "parent", s.arrow = t.arrow, s.theme = t.theme, s.delay = t.delay, s.duration = t.duration, s.hideOnClick = t.hideOnClick, s.followCursor = t.followCursor, s.inertia = t.inertia, s.interactive = t.interactive, s.interactiveBorder = t.interactiveBorder, s.interactiveDebounce = t.interactiveDebounce, s.maxWidth = t.maxWidth, s.zIndex = t.zIndex, s.offset = t.offset, s.placement = t.placement, s.animation = t.animation, s.trigger = t.trigger, s.triggerTarget = t.triggerTarget, s;
    }, o = () => {
      if (!t.target)
        return console.warn("Tippy target can not be null");
      const s = typeof t.target == "string" ? t.selectorParent.querySelector(t.target) : t.target, a = r();
      s && (i.value = di(s, {
        ...a,
        content: n.value,
        plugins: [Ph]
      }));
    };
    return ft(() => {
      o();
    }), Ta(() => {
      i.value && (Array.isArray(i.value) ? i.value.forEach((s) => {
        s.unmount(), s.destroy();
      }) : (i.value.unmount(), i.value.destroy()));
    }), xe(() => t.target, o), (s, a) => (P(), Y("div", {
      ref_key: "tippyWrapper",
      ref: n,
      class: "tippy-wrapper"
    }, [
      _e(s.$slots, "default")
    ], 512));
  }
}), xh = (e) => Object.prototype.toString.call(e);
function Fh(e) {
  return xh(e).slice(8, -1).toLowerCase();
}
const Mh = Array.isArray || ((e) => Fh(e) === "array"), Nh = { class: "node-details-info" }, Lh = { class: "details_header" }, Rh = { class: "details_label" }, zh = { class: "details_value" }, jh = { key: 1 }, Vh = /* @__PURE__ */ he({
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
    const t = e, { t: n } = Tn(), i = (r, o) => r ? `${t.translatePrefix}${o || ""}${r}` : "-";
    return (r, o) => {
      var s;
      return P(), Y("div", Nh, [
        R("div", Lh, ie((s = e.nodeInfo.i18n) != null && s.includes("header") ? x(n)(e.nodeInfo.header) : e.nodeInfo.header), 1),
        (P(!0), Y(ct, null, Vi(e.nodeInfo.attrs, (a) => {
          var l, u, c, d, h, E;
          return P(), Y(ct, { key: a }, [
            R("div", Rh, ie(x(n)(i(a, e.nodeInfo.prefix))), 1),
            R("div", zh, [
              (l = e.nodeInfo.tags) != null && l[a] ? (P(), Y(ct, { key: 0 }, [
                x(Mh)((u = e.nodeInfo.values) == null ? void 0 : u[a]) ? (P(!0), Y(ct, { key: 0 }, Vi(e.nodeInfo.values[a], (f) => {
                  var p;
                  return P(), ue(x(Xn), {
                    key: f,
                    size: "small",
                    color: ((p = e.nodeInfo.tags) == null ? void 0 : p[a]) || "arcoblue"
                  }, {
                    default: ne(() => [
                      De(ie(f || "-"), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"]);
                }), 128)) : (P(), ue(x(Xn), {
                  key: 1,
                  size: "small",
                  color: ((c = e.nodeInfo.tags) == null ? void 0 : c[a]) || "arcoblue"
                }, {
                  default: ne(() => {
                    var f, p, g;
                    return [
                      De(ie((f = e.nodeInfo.i18n) != null && f.includes(a) ? x(n)(i((p = e.nodeInfo.values) == null ? void 0 : p[a])) : ((g = e.nodeInfo.values) == null ? void 0 : g[a]) || "-"), 1)
                    ];
                  }),
                  _: 2
                }, 1032, ["color"]))
              ], 64)) : (P(), Y("span", jh, ie((d = e.nodeInfo.i18n) != null && d.includes(a) ? x(n)(i((h = e.nodeInfo.values) == null ? void 0 : h[a])) : ((E = e.nodeInfo.values) == null ? void 0 : E[a]) || "-"), 1))
            ])
          ], 64);
        }), 128))
      ]);
    };
  }
}), Uh = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, Hh = {}, qh = {
  focusable: "false",
  "data-icon": "partition",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
function Wh(e, t) {
  return P(), Y("svg", qh, [...t[0] || (t[0] = [
    R("path", { d: "M640.6 429.8h257.1c7.9 0 14.3-6.4 14.3-14.3V158.3c0-7.9-6.4-14.3-14.3-14.3H640.6c-7.9 0-14.3 6.4-14.3 14.3v92.9H490.6c-3.9 0-7.1 3.2-7.1 7.1v221.5h-85.7v-96.5c0-7.9-6.4-14.3-14.3-14.3H126.3c-7.9 0-14.3 6.4-14.3 14.3v257.2c0 7.9 6.4 14.3 14.3 14.3h257.1c7.9 0 14.3-6.4 14.3-14.3V544h85.7v221.5c0 3.9 3.2 7.1 7.1 7.1h135.7v92.9c0 7.9 6.4 14.3 14.3 14.3h257.1c7.9 0 14.3-6.4 14.3-14.3v-257c0-7.9-6.4-14.3-14.3-14.3h-257c-7.9 0-14.3 6.4-14.3 14.3v100h-78.6v-393h78.6v100c0 7.9 6.4 14.3 14.3 14.3zm53.5-217.9h150V362h-150V211.9zM329.9 587h-150V437h150v150zm364.2 75.1h150v150.1h-150V662.1z" }, null, -1)
  ])]);
}
const Gh = /* @__PURE__ */ Uh(Hh, [["render", Wh]]), Kh = { class: "node-details-info" }, Yh = { class: "details_header" }, Xh = { class: "details_label" }, Jh = { class: "details_value flex items-center" }, Zh = { class: "details_label" }, Qh = { class: "details_value" }, em = { class: "child-process-viewer" }, tm = /* @__PURE__ */ he({
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
    const t = e, { t: n } = Tn(), i = te(!1), r = (o) => o ? t.translatePrefix + o : "-";
    return (o, s) => {
      const a = Gh, l = Sv;
      return P(), Y("div", Kh, [
        R("div", Yh, ie(e.nodeInfo.name), 1),
        R("div", Xh, ie(x(n)(r("calledInstance"))), 1),
        R("div", Jh, [
          V(x(Xn), { color: "arcoblue" }, {
            default: ne(() => [
              R("span", null, ie(e.nodeInfo.modelName || "-"), 1)
            ]),
            _: 1
          }),
          V(x(Gt), {
            style: { zIndex: 9999 },
            "render-to-body": !0
          }, {
            content: ne(() => [...s[2] || (s[2] = [
              R("span", null, "查看流程图", -1)
            ])]),
            default: ne(() => [
              V(x(hd), {
                style: { "margin-left": "0.5rem" },
                onClick: s[0] || (s[0] = (u) => i.value = !0)
              }, {
                default: ne(() => [
                  V(a)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        R("div", Zh, ie(x(n)(r("inheritVariables"))), 1),
        R("div", Qh, ie(e.nodeInfo.inheritVariables || "-"), 1),
        V(x(so), {
          visible: x(i),
          "onUpdate:visible": s[1] || (s[1] = (u) => wu(i) ? i.value = u : null),
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
          default: ne(() => [
            R("div", em, [
              x(i) ? (P(), ue(l, {
                key: 0,
                toolbar: !1,
                local: e.local,
                "file-name": e.fileName,
                "translate-prefix": e.translatePrefix,
                theme: e.theme,
                "proc-inst-id": e.nodeInfo.instanceId,
                "model-key": e.nodeInfo.modelKey
              }, null, 8, ["local", "file-name", "translate-prefix", "theme", "proc-inst-id", "model-key"])) : ce("", !0)
            ])
          ]),
          _: 1
        }, 8, ["visible", "title"])
      ]);
    };
  }
}), nm = ["width", "height", "stroke-width", "stroke"], im = /* @__PURE__ */ he({
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
    return (t, n) => (P(), Y("svg", {
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
    }, [...n[0] || (n[0] = [
      R("path", { d: "M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }, null, -1),
      R("path", { d: "M12 14v7" }, null, -1),
      R("path", { d: "M9 18h6" }, null, -1)
    ])], 8, nm));
  }
}), rm = ["width", "height", "stroke-width", "stroke"], om = /* @__PURE__ */ he({
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
    return (t, n) => (P(), Y("svg", {
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
    }, [...n[0] || (n[0] = [
      R("path", { d: "M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }, null, -1),
      R("path", { d: "M19 5l-5.4 5.4" }, null, -1),
      R("path", { d: "M19 5h-5" }, null, -1),
      R("path", { d: "M19 5v5" }, null, -1)
    ])], 8, rm));
  }
}), sm = {
  class: "icon-image",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  width: "72",
  height: "72"
}, am = /* @__PURE__ */ he({
  name: "EmptyFemaleImage",
  __name: "EmptyFemaleImage",
  setup(e) {
    return (t, n) => (P(), Y("svg", sm, [...n[0] || (n[0] = [
      Aa('<path d="M288.921053 707.654248c-152.288409 12.659309-99.539384-170.917798-51.367801-420.713709C268.191292 68.17078 384.956012 0.707734 515.144851 0.81047c154.674158 0.125566 213.530243 78.695472 262.47805 305.124741 64.118431 367.428176 100.977683 417.152208-17.1226 417.015227-102.005039-0.125566-471.579248-15.29619-471.579248-15.29619z"></path><path d="M73.689965 1023.269436l50.374691-320.295365 260.994091-81.161126h233.803403l281.061779 81.172541 50.386106 320.28395H73.689965z" fill="#AAD5DC"></path><path d="M618.816489 622.543509l280.513857 81.046975L949.499565 1022.561702H74.55751l50.16922-318.982633 260.446168-81.046975h233.643591m0.205472-1.472544h-234.008874L123.402582 702.403318 72.82242 1024h878.35516l-50.591577-321.596682-281.621118-81.332353z"></path><path d="M591.100707 1019.125766H415.468486l-46.721869-387.724165 71.127282-25.729561 137.094955-2.054712 70.625019 31.311528-56.493166 384.19691zM667.958353 265.640024c68.992665-29.416628 96.936749 101.171739 5.262346 153.030388z" fill="#FFCFB5"></path><path d="M585.016476 815.640782H425.194123l7.419794-206.841014-20.958063-131.22761 173.91996 4.006688-12.145631 110.440774 11.586293 223.621162z" fill="#FFCFB5"></path><path d="M677.763895 329.564399c1.141507-100.635231-39.096604-173.577509-39.096604-173.577508l-60.168818 11.98582a496.407018 496.407018 0 0 1-81.378013 9.200544 496.270038 496.270038 0 0 1-81.378012-9.200544l-60.180234-11.98582s-40.181036 72.942278-39.085189 173.577508l-1.141507 92.81591c0 68.17078 101.046173 155.244911 181.739282 155.244911 59.244198 0 181.727867-87.062716 181.727866-155.244911z" fill="#FFE7D9"></path><path d="M320.632109 269.361336c-68.98125-29.428043-96.925334 101.171739-5.25093 153.018973z" fill="#FFCFB5"></path><path d="M515.144851 91.526007c-27.944084 83.158763-124.230174 172.961095-167.801485 177.835329s-71.54964-4.269235-71.54964-4.269235S337.811785 61.287495 515.144851 91.526007z"></path><path d="M445.307471 133.796c9.942523 95.190244 227.833322 186.659176 234.008874 180.848907 20.421555-78.821038 55.831093-7.648095 55.831092-7.648095l-54.4727-202.046686-122.483668-49.084788h-67.953894"></path><path d="M416.119145 1018.383787l-28.537668-236.919715c23.423717 24.348338 90.612802 33.103694 141.980604 33.103694 44.233385 0 80.932825-5.97008 93.101286-14.976568l-32.190489 218.792589z" fill="#FFFFFF"></path><path d="M388.563173 783.484538c10.638842 10.068089 29.302477 18.001561 55.557131 23.629189 24.451074 5.239516 54.792322 8.127528 85.430362 8.127528 43.445745 0 78.558491-5.467817 92.11959-14.131853l-31.836622 216.543821H416.769804L388.563173 783.484538m-1.997637-4.234989l28.90295 239.933293h175.643636s28.537667-194.227365 32.544356-221.38381c-10.684503 10.033844-50.032239 15.981094-94.105812 15.981094-57.075335 0-122.209707-10.079504-142.98513-34.519162z"></path><path d="M370.538782 631.401601l-79.871224 26.905313-3.789802 120.942635h41.710655l-32.453035 39.758678 72.611241 199.535371 48.514034 0.582168-46.721869-387.724165zM647.593873 634.928856l85.670078 24.565225 27.202105 79.996789-54.415625 22.088155 54.415625 17.670524-103.431922 238.951597-65.933427 0.92462 56.493166-384.19691z" fill="#A6D3DB"></path>', 12)
    ])]));
  }
}), lm = {
  class: "icon-image",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  width: "72",
  height: "72"
}, cm = /* @__PURE__ */ he({
  name: "EmptyMaleImage",
  __name: "EmptyMaleImage",
  setup(e) {
    return (t, n) => (P(), Y("svg", lm, [...n[0] || (n[0] = [
      Aa('<path d="M384.177143 618.594286l-263.142857 81.828571L70.131429 1024h883.737142l-50.902857-323.577143-283.337143-81.828571H384.177143z" fill="#262626"></path><path d="M422.828571 493.2h160.8v185.554286h-160.8z" fill="#EAA063"></path><path d="M734.52 196.205714c0 131.165714 11.725714 212.102857-225.771429 210.788572-230.011429-1.268571-249.222857-79.622857-249.222857-210.788572S380.828571 0 511.994286 0s222.525714 65.04 222.525714 196.205714z" fill="#834B12"></path><path d="M678.771429 325.302857c1.142857-101.257143-39.325714-174.64-39.325715-174.64l-60.571428 12.057143a500.48 500.48 0 0 1-81.874286 9.257143 500.571429 500.571429 0 0 1-81.885714-9.257143l-60.571429-12.057143s-40.377143 73.382857-39.325714 174.64l-1.142857 93.382857c0 68.571429 50.491429 80.354286 103.348571 116.068572 27.428571 18.491429 47.92 35.737143 79.508572 40.114285 31.577143-4.377143 52.114286-21.622857 79.497142-40.114285 52.857143-35.714286 103.348571-47.474286 103.348572-116.068572z" fill="#FFBF82"></path><path d="M319.457143 264.731429c-69.382857-29.554286-97.531429 101.794286-5.291429 153.954285zM670.714286 255.577143c69.417143-29.611429 97.531429 101.794286 5.291428 153.954286z" fill="#EAA063"></path><path d="M385.514286 625.382857l116.388571 49.577143 116.502857-49.622857-106.468571 316.24-126.422857-316.194286z" fill="#FFFFFF"></path><path d="M617.171429 626.662857l-105.291429 312.777143-125.017143-312.674286 114.445714 48.754286 0.582858 0.24 0.582857-0.24 114.697143-48.857143m2.445714-2.651428l-117.714286 50.148571-117.714286-50.148571 127.805715 319.737142 107.622857-319.702857z"></path><path d="M479.068571 935.611429l11.108572-235.988572h26.857143l11.108571 235.988572h-49.074286z" fill="#B292CB"></path><path d="M516.634286 700.022857l11.074285 235.188572h-48.217142l11.062857-235.188572h26.08m0.777143-0.8H489.788571l-11.142857 236.8h49.92l-11.154285-236.845714z"></path><path d="M484.52 735.177143a11.828571 11.828571 0 0 1-11.428571-8.937143l-7.268572-28.742857a11.828571 11.828571 0 0 1 11.428572-14.731429h49.28a11.828571 11.828571 0 0 1 11.428571 14.731429L530.702857 726.24a11.851429 11.851429 0 0 1-11.485714 8.937143z" fill="#B292CB"></path><path d="M526.531429 683.177143a11.428571 11.428571 0 0 1 11.085714 14.24l-7.268572 28.731428a11.428571 11.428571 0 0 1-11.085714 8.64h-34.742857a11.428571 11.428571 0 0 1-11.085714-8.64l-7.268572-28.731428a11.428571 11.428571 0 0 1 11.085715-14.24h49.28m0-0.811429h-49.28a12.24 12.24 0 0 0-11.862858 15.245715l7.257143 28.742857a12.24 12.24 0 0 0 11.874286 9.234285h34.742857a12.24 12.24 0 0 0 11.874286-9.234285l7.268571-28.742857a12.251429 12.251429 0 0 0-11.874285-15.245715z"></path><path d="M415.845714 583.931429l86.057143 94.822857-68.502857 60.262857-49.222857-120.422857 31.668571-34.662857z" fill="#FFFFFF"></path><path d="M587.948571 583.931429l-86.045714 94.822857 68.491429 60.262857 49.234285-120.422857-31.68-34.662857z" fill="#FFFFFF"></path><path d="M380.36 619.782857l-58.742857 18.285714 17.268571 94.194286 91.085715 44.685714-87.188572 36.16 169.668572 144.445715a5.028571 5.028571 0 0 0 7.885714-5.782857z" fill="#676568"></path><path d="M623.468571 619.714286l76.137143 21.977143a4.251429 4.251429 0 0 1 3.062857 4.08v128.228571a4.251429 4.251429 0 0 1-2.068571 3.645714l-92.4 55.097143a4.251429 4.251429 0 0 0 0.548571 7.565714l72.24 29.954286a4.251429 4.251429 0 0 1 0.8 7.405714L489.434286 1011.714286a4.24 4.24 0 0 1-6.422857-4.891429l135.28-384.445714a4.228571 4.228571 0 0 1 5.177142-2.662857z" fill="#676568"></path>', 15)
    ])]));
  }
}), um = { class: "node-details-info" }, dm = { class: "details_header" }, fm = { class: "details_label" }, pm = { class: "details_value" }, hm = { style: { "padding-right": "8px" } }, mm = { class: "person-information-grid" }, vm = { class: "details_special" }, gm = { class: "header-person-img" }, ym = ["src"], bm = { class: "details_label" }, Em = {
  class: "details_value",
  style: { display: "inline-flex", "align-items": "center" }
}, wm = { class: "details_label" }, Sm = { class: "details_value" }, _m = { class: "details_label" }, Cm = { class: "details_value" }, km = { class: "details_label" }, Tm = { class: "details_value long" }, Am = { class: "details_label" }, Om = { class: "details_value long" }, Bm = { key: 1 }, Dm = { class: "details_label" }, Im = { class: "details_value" }, Pm = /* @__PURE__ */ he({
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
    const t = e, { t: n } = Tn(), i = {
      processing: "arcoblue",
      finish: "green",
      pending: "orangered"
    }, r = (a) => a ? t.translatePrefix + a : "-", o = X(() => t.nodeInfo.status !== "pending"), s = X(() => t.nodeInfo.status === "finish");
    return (a, l) => {
      var E, f;
      const u = cm, c = am, d = om, h = im;
      return P(), Y("div", um, [
        R("div", dm, ie(e.nodeInfo.name), 1),
        R("div", fm, ie(x(n)(r("approver"))), 1),
        R("div", pm, [
          R("div", {
            class: "approval-user-list",
            style: Ke({ "--approval-num": (E = e.nodeInfo.approvalVos) == null ? void 0 : E.length })
          }, [
            (f = e.nodeInfo.approvalVos) != null && f.length ? (P(!0), Y(ct, { key: 0 }, Vi(e.nodeInfo.approvalVos, (p) => (P(), ue(x(Gt), {
              key: p.code,
              position: "bottom",
              style: { zIndex: 9999 },
              "render-to-body": !0,
              title: x(n)(r("Personnel information"))
            }, {
              content: ne(() => [
                R("div", mm, [
                  R("div", vm, [
                    R("div", gm, [
                      p.headImg ? (P(), Y("img", {
                        key: 0,
                        src: p.headImg,
                        alt: "image"
                      }, null, 8, ym)) : ce("", !0),
                      !p.headImg && p.sex === 1 ? (P(), ue(u, { key: 1 })) : ce("", !0),
                      !p.headImg && p.sex === 2 ? (P(), ue(c, { key: 2 })) : ce("", !0)
                    ])
                  ]),
                  R("div", bm, ie(x(n)(r("Person name"))), 1),
                  R("div", Em, [
                    R("span", null, ie(p.name), 1),
                    p.sex === 1 ? (P(), ue(d, {
                      key: 0,
                      color: "#0099FF"
                    })) : ce("", !0),
                    p.sex === 2 ? (P(), ue(h, {
                      key: 1,
                      color: "#FF99CC"
                    })) : ce("", !0)
                  ]),
                  R("div", wm, ie(x(n)(r("Job number"))), 1),
                  R("div", Sm, ie(p.code), 1),
                  R("div", _m, ie(x(n)(r("Mobile phone"))), 1),
                  R("div", Cm, ie(p.mobile || "-"), 1),
                  R("div", km, ie(x(n)(r("Mail"))), 1),
                  R("div", Tm, ie(p.email || "-"), 1),
                  R("div", Am, ie(x(n)(r("Affiliation"))), 1),
                  R("div", Om, ie(`${p.companyName || "-"}${p.deptName ? " - " + p.deptName : ""}`), 1)
                ])
              ]),
              default: ne(() => [
                V(x(Xn), {
                  size: "small",
                  color: p.status ? "arcoblue" : "orangered"
                }, {
                  default: ne(() => [
                    R("span", hm, ie(p.name), 1),
                    p.status ? (P(), ue(x(Np), {
                      key: 0,
                      size: 12
                    })) : (P(), ue(x(Lp), {
                      key: 1,
                      size: 12
                    }))
                  ]),
                  _: 2
                }, 1032, ["color"])
              ]),
              _: 2
            }, 1032, ["title"]))), 128)) : (P(), Y("span", Bm, "-"))
          ], 4)
        ]),
        R("div", Dm, ie(x(n)(r("statusName"))), 1),
        R("div", Im, [
          V(x(Xn), {
            color: i[e.nodeInfo.status] || "arcoblue"
          }, {
            default: ne(() => [
              De(ie(e.nodeInfo.statusName || "-"), 1)
            ]),
            _: 1
          }, 8, ["color"])
        ]),
        st(R("div", { class: "details_label" }, ie(x(n)(r("startDate"))), 513), [
          [at, x(o)]
        ]),
        st(R("div", { class: "details_value" }, ie(e.nodeInfo.startDate || "-"), 513), [
          [at, x(o)]
        ]),
        st(R("div", { class: "details_label" }, ie(x(n)(r("endDate"))), 513), [
          [at, x(s)]
        ]),
        st(R("div", { class: "details_value" }, ie(e.nodeInfo.status === "processing" ? "-" : e.nodeInfo.endDate || "-"), 513), [
          [at, x(s)]
        ]),
        st(R("div", { class: "details_label" }, ie(x(n)(r("duration"))), 513), [
          [at, x(s)]
        ]),
        st(R("div", { class: "details_value" }, ie(e.nodeInfo.status === "processing" ? "-" : e.nodeInfo.duration || "-"), 513), [
          [at, x(s)]
        ])
      ]);
    };
  }
});
function zc(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: $m } = Object.prototype, { getPrototypeOf: as } = Object, { iterator: fr, toStringTag: jc } = Symbol, pr = /* @__PURE__ */ ((e) => (t) => {
  const n = $m.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), tt = (e) => (e = e.toLowerCase(), (t) => pr(t) === e), hr = (e) => (t) => typeof t === e, { isArray: In } = Array, ti = hr("undefined");
function xm(e) {
  return e !== null && !ti(e) && e.constructor !== null && !ti(e.constructor) && Re(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Vc = tt("ArrayBuffer");
function Fm(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Vc(e.buffer), t;
}
const Mm = hr("string"), Re = hr("function"), Uc = hr("number"), mr = (e) => e !== null && typeof e == "object", Nm = (e) => e === !0 || e === !1, Ni = (e) => {
  if (pr(e) !== "object")
    return !1;
  const t = as(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(jc in e) && !(fr in e);
}, Lm = tt("Date"), Rm = tt("File"), zm = tt("Blob"), jm = tt("FileList"), Vm = (e) => mr(e) && Re(e.pipe), Um = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Re(e.append) && ((t = pr(e)) === "formdata" || // detect form-data instance
  t === "object" && Re(e.toString) && e.toString() === "[object FormData]"));
}, Hm = tt("URLSearchParams"), [qm, Wm, Gm, Km] = ["ReadableStream", "Request", "Response", "Headers"].map(tt), Ym = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function fi(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let i, r;
  if (typeof e != "object" && (e = [e]), In(e))
    for (i = 0, r = e.length; i < r; i++)
      t.call(null, e[i], i, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o.length;
    let a;
    for (i = 0; i < s; i++)
      a = o[i], t.call(null, e[a], a, e);
  }
}
function Hc(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let i = n.length, r;
  for (; i-- > 0; )
    if (r = n[i], t === r.toLowerCase())
      return r;
  return null;
}
const Jt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, qc = (e) => !ti(e) && e !== Jt;
function So() {
  const { caseless: e } = qc(this) && this || {}, t = {}, n = (i, r) => {
    const o = e && Hc(t, r) || r;
    Ni(t[o]) && Ni(i) ? t[o] = So(t[o], i) : Ni(i) ? t[o] = So({}, i) : In(i) ? t[o] = i.slice() : t[o] = i;
  };
  for (let i = 0, r = arguments.length; i < r; i++)
    arguments[i] && fi(arguments[i], n);
  return t;
}
const Xm = (e, t, n, { allOwnKeys: i } = {}) => (fi(t, (r, o) => {
  n && Re(r) ? e[o] = zc(r, n) : e[o] = r;
}, { allOwnKeys: i }), e), Jm = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Zm = (e, t, n, i) => {
  e.prototype = Object.create(t.prototype, i), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Qm = (e, t, n, i) => {
  let r, o, s;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      s = r[o], (!i || i(s, e, t)) && !a[s] && (t[s] = e[s], a[s] = !0);
    e = n !== !1 && as(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, e2 = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const i = e.indexOf(t, n);
  return i !== -1 && i === n;
}, t2 = (e) => {
  if (!e) return null;
  if (In(e)) return e;
  let t = e.length;
  if (!Uc(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, n2 = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && as(Uint8Array)), i2 = (e, t) => {
  const i = (e && e[fr]).call(e);
  let r;
  for (; (r = i.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, r2 = (e, t) => {
  let n;
  const i = [];
  for (; (n = e.exec(t)) !== null; )
    i.push(n);
  return i;
}, o2 = tt("HTMLFormElement"), s2 = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, i, r) {
    return i.toUpperCase() + r;
  }
), la = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), a2 = tt("RegExp"), Wc = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), i = {};
  fi(n, (r, o) => {
    let s;
    (s = t(r, o, e)) !== !1 && (i[o] = s || r);
  }), Object.defineProperties(e, i);
}, l2 = (e) => {
  Wc(e, (t, n) => {
    if (Re(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const i = e[n];
    if (Re(i)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, c2 = (e, t) => {
  const n = {}, i = (r) => {
    r.forEach((o) => {
      n[o] = !0;
    });
  };
  return In(e) ? i(e) : i(String(e).split(t)), n;
}, u2 = () => {
}, d2 = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function f2(e) {
  return !!(e && Re(e.append) && e[jc] === "FormData" && e[fr]);
}
const p2 = (e) => {
  const t = new Array(10), n = (i, r) => {
    if (mr(i)) {
      if (t.indexOf(i) >= 0)
        return;
      if (!("toJSON" in i)) {
        t[r] = i;
        const o = In(i) ? [] : {};
        return fi(i, (s, a) => {
          const l = n(s, r + 1);
          !ti(l) && (o[a] = l);
        }), t[r] = void 0, o;
      }
    }
    return i;
  };
  return n(e, 0);
}, h2 = tt("AsyncFunction"), m2 = (e) => e && (mr(e) || Re(e)) && Re(e.then) && Re(e.catch), Gc = ((e, t) => e ? setImmediate : t ? ((n, i) => (Jt.addEventListener("message", ({ source: r, data: o }) => {
  r === Jt && o === n && i.length && i.shift()();
}, !1), (r) => {
  i.push(r), Jt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Re(Jt.postMessage)
), v2 = typeof queueMicrotask < "u" ? queueMicrotask.bind(Jt) : typeof process < "u" && process.nextTick || Gc, g2 = (e) => e != null && Re(e[fr]), _ = {
  isArray: In,
  isArrayBuffer: Vc,
  isBuffer: xm,
  isFormData: Um,
  isArrayBufferView: Fm,
  isString: Mm,
  isNumber: Uc,
  isBoolean: Nm,
  isObject: mr,
  isPlainObject: Ni,
  isReadableStream: qm,
  isRequest: Wm,
  isResponse: Gm,
  isHeaders: Km,
  isUndefined: ti,
  isDate: Lm,
  isFile: Rm,
  isBlob: zm,
  isRegExp: a2,
  isFunction: Re,
  isStream: Vm,
  isURLSearchParams: Hm,
  isTypedArray: n2,
  isFileList: jm,
  forEach: fi,
  merge: So,
  extend: Xm,
  trim: Ym,
  stripBOM: Jm,
  inherits: Zm,
  toFlatObject: Qm,
  kindOf: pr,
  kindOfTest: tt,
  endsWith: e2,
  toArray: t2,
  forEachEntry: i2,
  matchAll: r2,
  isHTMLForm: o2,
  hasOwnProperty: la,
  hasOwnProp: la,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Wc,
  freezeMethods: l2,
  toObjectSet: c2,
  toCamelCase: s2,
  noop: u2,
  toFiniteNumber: d2,
  findKey: Hc,
  global: Jt,
  isContextDefined: qc,
  isSpecCompliantForm: f2,
  toJSONObject: p2,
  isAsyncFn: h2,
  isThenable: m2,
  setImmediate: Gc,
  asap: v2,
  isIterable: g2
};
function re(e, t, n, i, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), i && (this.request = i), r && (this.response = r, this.status = r.status ? r.status : null);
}
_.inherits(re, Error, {
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
      config: _.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Kc = re.prototype, Yc = {};
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
  Yc[e] = { value: e };
});
Object.defineProperties(re, Yc);
Object.defineProperty(Kc, "isAxiosError", { value: !0 });
re.from = (e, t, n, i, r, o) => {
  const s = Object.create(Kc);
  return _.toFlatObject(e, s, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), re.call(s, e.message, t, n, i, r), s.cause = e, s.name = e.name, o && Object.assign(s, o), s;
};
const y2 = null;
function _o(e) {
  return _.isPlainObject(e) || _.isArray(e);
}
function Xc(e) {
  return _.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ca(e, t, n) {
  return e ? e.concat(t).map(function(r, o) {
    return r = Xc(r), !n && o ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function b2(e) {
  return _.isArray(e) && !e.some(_o);
}
const E2 = _.toFlatObject(_, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function vr(e, t, n) {
  if (!_.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = _.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, g) {
    return !_.isUndefined(g[p]);
  });
  const i = n.metaTokens, r = n.visitor || c, o = n.dots, s = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && _.isSpecCompliantForm(t);
  if (!_.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(f) {
    if (f === null) return "";
    if (_.isDate(f))
      return f.toISOString();
    if (!l && _.isBlob(f))
      throw new re("Blob is not supported. Use a Buffer instead.");
    return _.isArrayBuffer(f) || _.isTypedArray(f) ? l && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function c(f, p, g) {
    let C = f;
    if (f && !g && typeof f == "object") {
      if (_.endsWith(p, "{}"))
        p = i ? p : p.slice(0, -2), f = JSON.stringify(f);
      else if (_.isArray(f) && b2(f) || (_.isFileList(f) || _.endsWith(p, "[]")) && (C = _.toArray(f)))
        return p = Xc(p), C.forEach(function($, v) {
          !(_.isUndefined($) || $ === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? ca([p], v, o) : s === null ? p : p + "[]",
            u($)
          );
        }), !1;
    }
    return _o(f) ? !0 : (t.append(ca(g, p, o), u(f)), !1);
  }
  const d = [], h = Object.assign(E2, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: _o
  });
  function E(f, p) {
    if (!_.isUndefined(f)) {
      if (d.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      d.push(f), _.forEach(f, function(C, B) {
        (!(_.isUndefined(C) || C === null) && r.call(
          t,
          C,
          _.isString(B) ? B.trim() : B,
          p,
          h
        )) === !0 && E(C, p ? p.concat(B) : [B]);
      }), d.pop();
    }
  }
  if (!_.isObject(e))
    throw new TypeError("data must be an object");
  return E(e), t;
}
function ua(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(i) {
    return t[i];
  });
}
function ls(e, t) {
  this._pairs = [], e && vr(e, this, t);
}
const Jc = ls.prototype;
Jc.append = function(t, n) {
  this._pairs.push([t, n]);
};
Jc.toString = function(t) {
  const n = t ? function(i) {
    return t.call(this, i, ua);
  } : ua;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function w2(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Zc(e, t, n) {
  if (!t)
    return e;
  const i = n && n.encode || w2;
  _.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let o;
  if (r ? o = r(t, n) : o = _.isURLSearchParams(t) ? t.toString() : new ls(t, n).toString(i), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class da {
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
  use(t, n, i) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
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
    _.forEach(this.handlers, function(i) {
      i !== null && t(i);
    });
  }
}
const Qc = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, S2 = typeof URLSearchParams < "u" ? URLSearchParams : ls, _2 = typeof FormData < "u" ? FormData : null, C2 = typeof Blob < "u" ? Blob : null, k2 = {
  isBrowser: !0,
  classes: {
    URLSearchParams: S2,
    FormData: _2,
    Blob: C2
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, cs = typeof window < "u" && typeof document < "u", Co = typeof navigator == "object" && navigator || void 0, T2 = cs && (!Co || ["ReactNative", "NativeScript", "NS"].indexOf(Co.product) < 0), A2 = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", O2 = cs && window.location.href || "http://localhost", B2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: cs,
  hasStandardBrowserEnv: T2,
  hasStandardBrowserWebWorkerEnv: A2,
  navigator: Co,
  origin: O2
}, Symbol.toStringTag, { value: "Module" })), Ie = {
  ...B2,
  ...k2
};
function D2(e, t) {
  return vr(e, new Ie.classes.URLSearchParams(), Object.assign({
    visitor: function(n, i, r, o) {
      return Ie.isNode && _.isBuffer(n) ? (this.append(i, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function I2(e) {
  return _.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function P2(e) {
  const t = {}, n = Object.keys(e);
  let i;
  const r = n.length;
  let o;
  for (i = 0; i < r; i++)
    o = n[i], t[o] = e[o];
  return t;
}
function eu(e) {
  function t(n, i, r, o) {
    let s = n[o++];
    if (s === "__proto__") return !0;
    const a = Number.isFinite(+s), l = o >= n.length;
    return s = !s && _.isArray(r) ? r.length : s, l ? (_.hasOwnProp(r, s) ? r[s] = [r[s], i] : r[s] = i, !a) : ((!r[s] || !_.isObject(r[s])) && (r[s] = []), t(n, i, r[s], o) && _.isArray(r[s]) && (r[s] = P2(r[s])), !a);
  }
  if (_.isFormData(e) && _.isFunction(e.entries)) {
    const n = {};
    return _.forEachEntry(e, (i, r) => {
      t(I2(i), r, n, 0);
    }), n;
  }
  return null;
}
function $2(e, t, n) {
  if (_.isString(e))
    try {
      return (t || JSON.parse)(e), _.trim(e);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (n || JSON.stringify)(e);
}
const pi = {
  transitional: Qc,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const i = n.getContentType() || "", r = i.indexOf("application/json") > -1, o = _.isObject(t);
    if (o && _.isHTMLForm(t) && (t = new FormData(t)), _.isFormData(t))
      return r ? JSON.stringify(eu(t)) : t;
    if (_.isArrayBuffer(t) || _.isBuffer(t) || _.isStream(t) || _.isFile(t) || _.isBlob(t) || _.isReadableStream(t))
      return t;
    if (_.isArrayBufferView(t))
      return t.buffer;
    if (_.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (o) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return D2(t, this.formSerializer).toString();
      if ((a = _.isFileList(t)) || i.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return vr(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return o || r ? (n.setContentType("application/json", !1), $2(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || pi.transitional, i = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (_.isResponse(t) || _.isReadableStream(t))
      return t;
    if (t && _.isString(t) && (i && !this.responseType || r)) {
      const s = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? re.from(a, re.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: Ie.classes.FormData,
    Blob: Ie.classes.Blob
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
_.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  pi.headers[e] = {};
});
const x2 = _.toObjectSet([
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
]), F2 = (e) => {
  const t = {};
  let n, i, r;
  return e && e.split(`
`).forEach(function(s) {
    r = s.indexOf(":"), n = s.substring(0, r).trim().toLowerCase(), i = s.substring(r + 1).trim(), !(!n || t[n] && x2[n]) && (n === "set-cookie" ? t[n] ? t[n].push(i) : t[n] = [i] : t[n] = t[n] ? t[n] + ", " + i : i);
  }), t;
}, fa = Symbol("internals");
function Ln(e) {
  return e && String(e).trim().toLowerCase();
}
function Li(e) {
  return e === !1 || e == null ? e : _.isArray(e) ? e.map(Li) : String(e);
}
function M2(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = n.exec(e); )
    t[i[1]] = i[2];
  return t;
}
const N2 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Zr(e, t, n, i, r) {
  if (_.isFunction(i))
    return i.call(this, t, n);
  if (r && (t = n), !!_.isString(t)) {
    if (_.isString(i))
      return t.indexOf(i) !== -1;
    if (_.isRegExp(i))
      return i.test(t);
  }
}
function L2(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, i) => n.toUpperCase() + i);
}
function R2(e, t) {
  const n = _.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(e, i + n, {
      value: function(r, o, s) {
        return this[i].call(this, t, r, o, s);
      },
      configurable: !0
    });
  });
}
let ze = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, i) {
    const r = this;
    function o(a, l, u) {
      const c = Ln(l);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const d = _.findKey(r, c);
      (!d || r[d] === void 0 || u === !0 || u === void 0 && r[d] !== !1) && (r[d || l] = Li(a));
    }
    const s = (a, l) => _.forEach(a, (u, c) => o(u, c, l));
    if (_.isPlainObject(t) || t instanceof this.constructor)
      s(t, n);
    else if (_.isString(t) && (t = t.trim()) && !N2(t))
      s(F2(t), n);
    else if (_.isObject(t) && _.isIterable(t)) {
      let a = {}, l, u;
      for (const c of t) {
        if (!_.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        a[u = c[0]] = (l = a[u]) ? _.isArray(l) ? [...l, c[1]] : [l, c[1]] : c[1];
      }
      s(a, n);
    } else
      t != null && o(n, t, i);
    return this;
  }
  get(t, n) {
    if (t = Ln(t), t) {
      const i = _.findKey(this, t);
      if (i) {
        const r = this[i];
        if (!n)
          return r;
        if (n === !0)
          return M2(r);
        if (_.isFunction(n))
          return n.call(this, r, i);
        if (_.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Ln(t), t) {
      const i = _.findKey(this, t);
      return !!(i && this[i] !== void 0 && (!n || Zr(this, this[i], i, n)));
    }
    return !1;
  }
  delete(t, n) {
    const i = this;
    let r = !1;
    function o(s) {
      if (s = Ln(s), s) {
        const a = _.findKey(i, s);
        a && (!n || Zr(i, i[a], a, n)) && (delete i[a], r = !0);
      }
    }
    return _.isArray(t) ? t.forEach(o) : o(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let i = n.length, r = !1;
    for (; i--; ) {
      const o = n[i];
      (!t || Zr(this, this[o], o, t, !0)) && (delete this[o], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, i = {};
    return _.forEach(this, (r, o) => {
      const s = _.findKey(i, o);
      if (s) {
        n[s] = Li(r), delete n[o];
        return;
      }
      const a = t ? L2(o) : String(o).trim();
      a !== o && delete n[o], n[a] = Li(r), i[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return _.forEach(this, (i, r) => {
      i != null && i !== !1 && (n[r] = t && _.isArray(i) ? i.join(", ") : i);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const i = new this(t);
    return n.forEach((r) => i.set(r)), i;
  }
  static accessor(t) {
    const i = (this[fa] = this[fa] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function o(s) {
      const a = Ln(s);
      i[a] || (R2(r, s), i[a] = !0);
    }
    return _.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
ze.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
_.reduceDescriptors(ze.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(i) {
      this[n] = i;
    }
  };
});
_.freezeMethods(ze);
function Qr(e, t) {
  const n = this || pi, i = t || n, r = ze.from(i.headers);
  let o = i.data;
  return _.forEach(e, function(a) {
    o = a.call(n, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function tu(e) {
  return !!(e && e.__CANCEL__);
}
function Pn(e, t, n) {
  re.call(this, e ?? "canceled", re.ERR_CANCELED, t, n), this.name = "CanceledError";
}
_.inherits(Pn, re, {
  __CANCEL__: !0
});
function nu(e, t, n) {
  const i = n.config.validateStatus;
  !n.status || !i || i(n.status) ? e(n) : t(new re(
    "Request failed with status code " + n.status,
    [re.ERR_BAD_REQUEST, re.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function z2(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function j2(e, t) {
  e = e || 10;
  const n = new Array(e), i = new Array(e);
  let r = 0, o = 0, s;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const u = Date.now(), c = i[o];
    s || (s = u), n[r] = l, i[r] = u;
    let d = o, h = 0;
    for (; d !== r; )
      h += n[d++], d = d % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), u - s < t)
      return;
    const E = c && u - c;
    return E ? Math.round(h * 1e3 / E) : void 0;
  };
}
function V2(e, t) {
  let n = 0, i = 1e3 / t, r, o;
  const s = (u, c = Date.now()) => {
    n = c, r = null, o && (clearTimeout(o), o = null), e.apply(null, u);
  };
  return [(...u) => {
    const c = Date.now(), d = c - n;
    d >= i ? s(u, c) : (r = u, o || (o = setTimeout(() => {
      o = null, s(r);
    }, i - d)));
  }, () => r && s(r)];
}
const Zi = (e, t, n = 3) => {
  let i = 0;
  const r = j2(50, 250);
  return V2((o) => {
    const s = o.loaded, a = o.lengthComputable ? o.total : void 0, l = s - i, u = r(l), c = s <= a;
    i = s;
    const d = {
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
    e(d);
  }, n);
}, pa = (e, t) => {
  const n = e != null;
  return [(i) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: i
  }), t[1]];
}, ha = (e) => (...t) => _.asap(() => e(...t)), U2 = Ie.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Ie.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Ie.origin),
  Ie.navigator && /(msie|trident)/i.test(Ie.navigator.userAgent)
) : () => !0, H2 = Ie.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, i, r, o) {
      const s = [e + "=" + encodeURIComponent(t)];
      _.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), _.isString(i) && s.push("path=" + i), _.isString(r) && s.push("domain=" + r), o === !0 && s.push("secure"), document.cookie = s.join("; ");
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
function q2(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function W2(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function iu(e, t, n) {
  let i = !q2(t);
  return e && (i || n == !1) ? W2(e, t) : t;
}
const ma = (e) => e instanceof ze ? { ...e } : e;
function on(e, t) {
  t = t || {};
  const n = {};
  function i(u, c, d, h) {
    return _.isPlainObject(u) && _.isPlainObject(c) ? _.merge.call({ caseless: h }, u, c) : _.isPlainObject(c) ? _.merge({}, c) : _.isArray(c) ? c.slice() : c;
  }
  function r(u, c, d, h) {
    if (_.isUndefined(c)) {
      if (!_.isUndefined(u))
        return i(void 0, u, d, h);
    } else return i(u, c, d, h);
  }
  function o(u, c) {
    if (!_.isUndefined(c))
      return i(void 0, c);
  }
  function s(u, c) {
    if (_.isUndefined(c)) {
      if (!_.isUndefined(u))
        return i(void 0, u);
    } else return i(void 0, c);
  }
  function a(u, c, d) {
    if (d in t)
      return i(u, c);
    if (d in e)
      return i(void 0, u);
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
    headers: (u, c, d) => r(ma(u), ma(c), d, !0)
  };
  return _.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const d = l[c] || r, h = d(e[c], t[c], c);
    _.isUndefined(h) && d !== a || (n[c] = h);
  }), n;
}
const ru = (e) => {
  const t = on({}, e);
  let { data: n, withXSRFToken: i, xsrfHeaderName: r, xsrfCookieName: o, headers: s, auth: a } = t;
  t.headers = s = ze.from(s), t.url = Zc(iu(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && s.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let l;
  if (_.isFormData(n)) {
    if (Ie.hasStandardBrowserEnv || Ie.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if ((l = s.getContentType()) !== !1) {
      const [u, ...c] = l ? l.split(";").map((d) => d.trim()).filter(Boolean) : [];
      s.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (Ie.hasStandardBrowserEnv && (i && _.isFunction(i) && (i = i(t)), i || i !== !1 && U2(t.url))) {
    const u = r && o && H2.read(o);
    u && s.set(r, u);
  }
  return t;
}, G2 = typeof XMLHttpRequest < "u", K2 = G2 && function(e) {
  return new Promise(function(n, i) {
    const r = ru(e);
    let o = r.data;
    const s = ze.from(r.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: u } = r, c, d, h, E, f;
    function p() {
      E && E(), f && f(), r.cancelToken && r.cancelToken.unsubscribe(c), r.signal && r.signal.removeEventListener("abort", c);
    }
    let g = new XMLHttpRequest();
    g.open(r.method.toUpperCase(), r.url, !0), g.timeout = r.timeout;
    function C() {
      if (!g)
        return;
      const $ = ze.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), F = {
        data: !a || a === "text" || a === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: $,
        config: e,
        request: g
      };
      nu(function(I) {
        n(I), p();
      }, function(I) {
        i(I), p();
      }, F), g = null;
    }
    "onloadend" in g ? g.onloadend = C : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(C);
    }, g.onabort = function() {
      g && (i(new re("Request aborted", re.ECONNABORTED, e, g)), g = null);
    }, g.onerror = function() {
      i(new re("Network Error", re.ERR_NETWORK, e, g)), g = null;
    }, g.ontimeout = function() {
      let v = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const F = r.transitional || Qc;
      r.timeoutErrorMessage && (v = r.timeoutErrorMessage), i(new re(
        v,
        F.clarifyTimeoutError ? re.ETIMEDOUT : re.ECONNABORTED,
        e,
        g
      )), g = null;
    }, o === void 0 && s.setContentType(null), "setRequestHeader" in g && _.forEach(s.toJSON(), function(v, F) {
      g.setRequestHeader(F, v);
    }), _.isUndefined(r.withCredentials) || (g.withCredentials = !!r.withCredentials), a && a !== "json" && (g.responseType = r.responseType), u && ([h, f] = Zi(u, !0), g.addEventListener("progress", h)), l && g.upload && ([d, E] = Zi(l), g.upload.addEventListener("progress", d), g.upload.addEventListener("loadend", E)), (r.cancelToken || r.signal) && (c = ($) => {
      g && (i(!$ || $.type ? new Pn(null, e, g) : $), g.abort(), g = null);
    }, r.cancelToken && r.cancelToken.subscribe(c), r.signal && (r.signal.aborted ? c() : r.signal.addEventListener("abort", c)));
    const B = z2(r.url);
    if (B && Ie.protocols.indexOf(B) === -1) {
      i(new re("Unsupported protocol " + B + ":", re.ERR_BAD_REQUEST, e));
      return;
    }
    g.send(o || null);
  });
}, Y2 = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let i = new AbortController(), r;
    const o = function(u) {
      if (!r) {
        r = !0, a();
        const c = u instanceof Error ? u : this.reason;
        i.abort(c instanceof re ? c : new Pn(c instanceof Error ? c.message : c));
      }
    };
    let s = t && setTimeout(() => {
      s = null, o(new re(`timeout ${t} of ms exceeded`, re.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(o) : u.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", o));
    const { signal: l } = i;
    return l.unsubscribe = () => _.asap(a), l;
  }
}, X2 = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let i = 0, r;
  for (; i < n; )
    r = i + t, yield e.slice(i, r), i = r;
}, J2 = async function* (e, t) {
  for await (const n of Z2(e))
    yield* X2(n, t);
}, Z2 = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: i } = await t.read();
      if (n)
        break;
      yield i;
    }
  } finally {
    await t.cancel();
  }
}, va = (e, t, n, i) => {
  const r = J2(e, t);
  let o = 0, s, a = (l) => {
    s || (s = !0, i && i(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: u, value: c } = await r.next();
        if (u) {
          a(), l.close();
          return;
        }
        let d = c.byteLength;
        if (n) {
          let h = o += d;
          n(h);
        }
        l.enqueue(new Uint8Array(c));
      } catch (u) {
        throw a(u), u;
      }
    },
    cancel(l) {
      return a(l), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, gr = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ou = gr && typeof ReadableStream == "function", Q2 = gr && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), su = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, ev = ou && su(() => {
  let e = !1;
  const t = new Request(Ie.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), ga = 64 * 1024, ko = ou && su(() => _.isReadableStream(new Response("").body)), Qi = {
  stream: ko && ((e) => e.body)
};
gr && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Qi[t] && (Qi[t] = _.isFunction(e[t]) ? (n) => n[t]() : (n, i) => {
      throw new re(`Response type '${t}' is not supported`, re.ERR_NOT_SUPPORT, i);
    });
  });
})(new Response());
const tv = async (e) => {
  if (e == null)
    return 0;
  if (_.isBlob(e))
    return e.size;
  if (_.isSpecCompliantForm(e))
    return (await new Request(Ie.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (_.isArrayBufferView(e) || _.isArrayBuffer(e))
    return e.byteLength;
  if (_.isURLSearchParams(e) && (e = e + ""), _.isString(e))
    return (await Q2(e)).byteLength;
}, nv = async (e, t) => {
  const n = _.toFiniteNumber(e.getContentLength());
  return n ?? tv(t);
}, iv = gr && (async (e) => {
  let {
    url: t,
    method: n,
    data: i,
    signal: r,
    cancelToken: o,
    timeout: s,
    onDownloadProgress: a,
    onUploadProgress: l,
    responseType: u,
    headers: c,
    withCredentials: d = "same-origin",
    fetchOptions: h
  } = ru(e);
  u = u ? (u + "").toLowerCase() : "text";
  let E = Y2([r, o && o.toAbortSignal()], s), f;
  const p = E && E.unsubscribe && (() => {
    E.unsubscribe();
  });
  let g;
  try {
    if (l && ev && n !== "get" && n !== "head" && (g = await nv(c, i)) !== 0) {
      let F = new Request(t, {
        method: "POST",
        body: i,
        duplex: "half"
      }), k;
      if (_.isFormData(i) && (k = F.headers.get("content-type")) && c.setContentType(k), F.body) {
        const [I, G] = pa(
          g,
          Zi(ha(l))
        );
        i = va(F.body, ga, I, G);
      }
    }
    _.isString(d) || (d = d ? "include" : "omit");
    const C = "credentials" in Request.prototype;
    f = new Request(t, {
      ...h,
      signal: E,
      method: n.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: i,
      duplex: "half",
      credentials: C ? d : void 0
    });
    let B = await fetch(f);
    const $ = ko && (u === "stream" || u === "response");
    if (ko && (a || $ && p)) {
      const F = {};
      ["status", "statusText", "headers"].forEach((K) => {
        F[K] = B[K];
      });
      const k = _.toFiniteNumber(B.headers.get("content-length")), [I, G] = a && pa(
        k,
        Zi(ha(a), !0)
      ) || [];
      B = new Response(
        va(B.body, ga, I, () => {
          G && G(), p && p();
        }),
        F
      );
    }
    u = u || "text";
    let v = await Qi[_.findKey(Qi, u) || "text"](B, e);
    return !$ && p && p(), await new Promise((F, k) => {
      nu(F, k, {
        data: v,
        headers: ze.from(B.headers),
        status: B.status,
        statusText: B.statusText,
        config: e,
        request: f
      });
    });
  } catch (C) {
    throw p && p(), C && C.name === "TypeError" && /Load failed|fetch/i.test(C.message) ? Object.assign(
      new re("Network Error", re.ERR_NETWORK, e, f),
      {
        cause: C.cause || C
      }
    ) : re.from(C, C && C.code, e, f);
  }
}), To = {
  http: y2,
  xhr: K2,
  fetch: iv
};
_.forEach(To, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const ya = (e) => `- ${e}`, rv = (e) => _.isFunction(e) || e === null || e === !1, au = {
  getAdapter: (e) => {
    e = _.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, i;
    const r = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let s;
      if (i = n, !rv(n) && (i = To[(s = String(n)).toLowerCase()], i === void 0))
        throw new re(`Unknown adapter '${s}'`);
      if (i)
        break;
      r[s || "#" + o] = i;
    }
    if (!i) {
      const o = Object.entries(r).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = t ? o.length > 1 ? `since :
` + o.map(ya).join(`
`) : " " + ya(o[0]) : "as no adapter specified";
      throw new re(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return i;
  },
  adapters: To
};
function eo(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Pn(null, e);
}
function ba(e) {
  return eo(e), e.headers = ze.from(e.headers), e.data = Qr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), au.getAdapter(e.adapter || pi.adapter)(e).then(function(i) {
    return eo(e), i.data = Qr.call(
      e,
      e.transformResponse,
      i
    ), i.headers = ze.from(i.headers), i;
  }, function(i) {
    return tu(i) || (eo(e), i && i.response && (i.response.data = Qr.call(
      e,
      e.transformResponse,
      i.response
    ), i.response.headers = ze.from(i.response.headers))), Promise.reject(i);
  });
}
const lu = "1.9.0", yr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  yr[e] = function(i) {
    return typeof i === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ea = {};
yr.transitional = function(t, n, i) {
  function r(o, s) {
    return "[Axios v" + lu + "] Transitional option '" + o + "'" + s + (i ? ". " + i : "");
  }
  return (o, s, a) => {
    if (t === !1)
      throw new re(
        r(s, " has been removed" + (n ? " in " + n : "")),
        re.ERR_DEPRECATED
      );
    return n && !Ea[s] && (Ea[s] = !0, console.warn(
      r(
        s,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, s, a) : !0;
  };
};
yr.spelling = function(t) {
  return (n, i) => (console.warn(`${i} is likely a misspelling of ${t}`), !0);
};
function ov(e, t, n) {
  if (typeof e != "object")
    throw new re("options must be an object", re.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(e);
  let r = i.length;
  for (; r-- > 0; ) {
    const o = i[r], s = t[o];
    if (s) {
      const a = e[o], l = a === void 0 || s(a, o, e);
      if (l !== !0)
        throw new re("option " + o + " must be " + l, re.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new re("Unknown option " + o, re.ERR_BAD_OPTION);
  }
}
const Ri = {
  assertOptions: ov,
  validators: yr
}, rt = Ri.validators;
let tn = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new da(),
      response: new da()
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
    } catch (i) {
      if (i instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const o = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? o && !String(i.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + o) : i.stack = o;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = on(this.defaults, n);
    const { transitional: i, paramsSerializer: r, headers: o } = n;
    i !== void 0 && Ri.assertOptions(i, {
      silentJSONParsing: rt.transitional(rt.boolean),
      forcedJSONParsing: rt.transitional(rt.boolean),
      clarifyTimeoutError: rt.transitional(rt.boolean)
    }, !1), r != null && (_.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : Ri.assertOptions(r, {
      encode: rt.function,
      serialize: rt.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Ri.assertOptions(n, {
      baseUrl: rt.spelling("baseURL"),
      withXsrfToken: rt.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = o && _.merge(
      o.common,
      o[n.method]
    );
    o && _.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete o[f];
      }
    ), n.headers = ze.concat(s, o);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(n) === !1 || (l = l && p.synchronous, a.unshift(p.fulfilled, p.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(p) {
      u.push(p.fulfilled, p.rejected);
    });
    let c, d = 0, h;
    if (!l) {
      const f = [ba.bind(this), void 0];
      for (f.unshift.apply(f, a), f.push.apply(f, u), h = f.length, c = Promise.resolve(n); d < h; )
        c = c.then(f[d++], f[d++]);
      return c;
    }
    h = a.length;
    let E = n;
    for (d = 0; d < h; ) {
      const f = a[d++], p = a[d++];
      try {
        E = f(E);
      } catch (g) {
        p.call(this, g);
        break;
      }
    }
    try {
      c = ba.call(this, E);
    } catch (f) {
      return Promise.reject(f);
    }
    for (d = 0, h = u.length; d < h; )
      c = c.then(u[d++], u[d++]);
    return c;
  }
  getUri(t) {
    t = on(this.defaults, t);
    const n = iu(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Zc(n, t.params, t.paramsSerializer);
  }
};
_.forEach(["delete", "get", "head", "options"], function(t) {
  tn.prototype[t] = function(n, i) {
    return this.request(on(i || {}, {
      method: t,
      url: n,
      data: (i || {}).data
    }));
  };
});
_.forEach(["post", "put", "patch"], function(t) {
  function n(i) {
    return function(o, s, a) {
      return this.request(on(a || {}, {
        method: t,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  tn.prototype[t] = n(), tn.prototype[t + "Form"] = n(!0);
});
let sv = class cu {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const i = this;
    this.promise.then((r) => {
      if (!i._listeners) return;
      let o = i._listeners.length;
      for (; o-- > 0; )
        i._listeners[o](r);
      i._listeners = null;
    }), this.promise.then = (r) => {
      let o;
      const s = new Promise((a) => {
        i.subscribe(a), o = a;
      }).then(r);
      return s.cancel = function() {
        i.unsubscribe(o);
      }, s;
    }, t(function(o, s, a) {
      i.reason || (i.reason = new Pn(o, s, a), n(i.reason));
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
    const t = new AbortController(), n = (i) => {
      t.abort(i);
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
      token: new cu(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function av(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function lv(e) {
  return _.isObject(e) && e.isAxiosError === !0;
}
const Ao = {
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
Object.entries(Ao).forEach(([e, t]) => {
  Ao[t] = e;
});
function uu(e) {
  const t = new tn(e), n = zc(tn.prototype.request, t);
  return _.extend(n, tn.prototype, t, { allOwnKeys: !0 }), _.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return uu(on(e, r));
  }, n;
}
const Ce = uu(pi);
Ce.Axios = tn;
Ce.CanceledError = Pn;
Ce.CancelToken = sv;
Ce.isCancel = tu;
Ce.VERSION = lu;
Ce.toFormData = vr;
Ce.AxiosError = re;
Ce.Cancel = Ce.CanceledError;
Ce.all = function(t) {
  return Promise.all(t);
};
Ce.spread = av;
Ce.isAxiosError = lv;
Ce.mergeConfig = on;
Ce.AxiosHeaders = ze;
Ce.formToJSON = (e) => eu(_.isHTMLForm(e) ? new FormData(e) : e);
Ce.getAdapter = au.getAdapter;
Ce.HttpStatusCode = Ao;
Ce.default = Ce;
const {
  Axios: jv,
  AxiosError: Vv,
  CanceledError: Uv,
  isCancel: Hv,
  CancelToken: qv,
  VERSION: Wv,
  all: Gv,
  Cancel: Kv,
  isAxiosError: Yv,
  spread: Xv,
  toFormData: Jv,
  AxiosHeaders: Zv,
  HttpStatusCode: Qv,
  formToJSON: e4,
  getAdapter: t4,
  mergeConfig: n4
} = Ce, cn = Ce.create({
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
    if (window.__bpmnRequestInterceptor && typeof window.__bpmnRequestInterceptor == "function")
      return window.__bpmnRequestInterceptor(e);
    try {
      if (parent.window) {
        const t = parent.window.localStorage.getItem("authorizationKey"), n = parent.window.localStorage.getItem("authorizationValue");
        parent.window.localStorage.getItem("flowtoken"), e.headers.flowtoken = parent.window.localStorage.getItem("flowtoken"), e.headers[t] = n;
      } else
        console.error("只在在流程中心用iframe打开，才能获取token!");
    } catch (t) {
      console.error("获取父窗口的token失败，开始读取本地 token！" + t), e.headers.flowtoken = localStorage.getItem("flowtoken");
      const n = window.localStorage.getItem("authorizationKey");
      e.headers[n] = window.localStorage.getItem("authorizationValue");
    }
    return e;
  },
  (e) => Promise.reject(e)
);
cn.interceptors.response.use(
  (e) => {
    const { isShowGlobalMessage: t = !0 } = e.config;
    if (window.__bpmnResponseInterceptor && typeof window.__bpmnResponseInterceptor == "function")
      return window.__bpmnResponseInterceptor(e);
    if (e && e.status == 200) {
      const n = e.data.code, i = e.data.msg;
      return n === "100" ? Promise.resolve(e.data) : n == 400 ? Promise.reject(i) : n === "101" ? (t && It.error(i), Promise.reject(i)) : Promise.reject(e.data);
    } else
      return Promise.reject(e == null ? void 0 : e.data);
  },
  (e) => Promise.reject(e)
);
const cv = "", Ti = cv + "/flow/query", hi = {
  /**
   * 获取高亮线和节点
   */
  GetHighLightedNodeVoByProcessInstanceId: Ti + "/getHighLightedNodeVoByProcessInstanceId",
  /**
   * 查询节点信息
   */
  GetOneActivityVoByProcessInstanceIdAndActivityId: Ti + "/getOneActivityVoByProcessInstanceIdAndActivityId",
  /**
   * 根据ModelKey查询模板信息
   */
  GetBpmnByModelKey: Ti + "/getBpmnByModelKey",
  /**
   * 根据ModelKey查询模板信息
   */
  GetBpmnByDefId: Ti + "/getBpmnByDefId",
  /**
   * 查询调用任务绑定 xml
   */
  GetCallActivityProcessInstance: "/flow/bpmnDesigner/prod/api/getCallActivityProcessInstanceIdByRootProcessInstanceId"
};
function uv(e) {
  return cn({
    method: "GET",
    url: `${hi.GetHighLightedNodeVoByProcessInstanceId}/${e}`,
    params: {}
  });
}
function dv(e) {
  return cn({
    method: "GET",
    url: `${hi.GetOneActivityVoByProcessInstanceIdAndActivityId}/${e.procInstId}/${e.elementId}`,
    params: {}
  });
}
function fv(e) {
  return cn({
    method: "GET",
    url: `${hi.GetBpmnByModelKey}/${e}`,
    params: {}
  });
}
function pv(e) {
  return cn({
    method: "GET",
    url: `${hi.GetBpmnByDefId}/${e}`,
    params: {}
  });
}
function hv(e, t) {
  return cn({
    method: "GET",
    url: `${hi.GetCallActivityProcessInstance}/${e}/${t}`,
    params: {}
  });
}
function mv(e) {
  return rr(e, "flowable:Field");
}
function vv(e, t) {
  return rr(e).find((n) => O(n, t));
}
function qt(e, t, n = {}) {
  const i = mv(e), r = t.reduce((s, a) => {
    const [l, u = "string"] = a.split(".");
    return s[l] = u, s;
  }, {}), o = {};
  for (const s of i) {
    const a = s.get("name");
    if (r[a]) {
      const l = n[a];
      l ? o[a] = l(s) : o[a] = s.get(r[a]);
    }
  }
  return o;
}
const gv = ["bpmn:UserTask", "bpmn:CallActivity"], du = [
  "bpmn:ServiceTask",
  "bpmn:SequenceFlow",
  "bpmn:ScriptTask",
  // 'bpmn:CallActivity',
  "bpmn:StartEvent",
  "bpmn:EndEvent",
  "bpmn:IntermediateThrowEvent",
  "bpmn:IntermediateCatchEvent"
], wa = (e) => e.type !== "label" && nn(e, gv), Sa = (e) => e.type === "label" ? !1 : O(e, "bpmn:SequenceFlow") ? fu(e) : nn(e, [
  "bpmn:EndEvent",
  "bpmn:StartEvent",
  "bpmn:IntermediateThrowEvent",
  "bpmn:IntermediateCatchEvent"
]) ? !Ev(e) : nn(e, du), yv = {
  "bpmn:ServiceTask": (e) => {
    var u;
    const t = e.businessObject, n = t.get("name"), i = n || e.type.replace(/bpmn:|flowable:/, ""), r = ["nodeType"], o = {
      nodeType: e.type
    }, s = {}, a = [];
    n || a.push("header");
    const l = t.get("type");
    if (l)
      switch (r.push("serviceType"), a.push("serviceType"), o.serviceType = l, s.serviceType = "arcoblue", l) {
        case "ws":
        case "sc":
        case "dubbo":
        case "rest":
        case "sql":
          return r.push("apiName"), Object.assign(o, qt(t, ["apiName"])), { loading: !1, header: i, attrs: r, values: o, tags: s, i18n: a };
        case "ai":
          return r.push("content", "outputVariableName", "flag"), Object.assign(o, qt(t, ["content", "outputVariableName", "flag"])), { loading: !1, prefix: "ai-", header: i, attrs: r, values: o, tags: s, i18n: a };
        case "mqtt":
          return r.push("topic", "payload"), Object.assign(o, qt(t, ["topic", "payload"])), { loading: !1, prefix: "mqtt-", header: i, attrs: r, values: o, tags: s, i18n: a };
        case "copy":
          r.push("transferToUserNos", "content"), Object.assign(o, qt(t, ["transferToUserNos", "content"]));
          const c = vv(t, "flowable:TransferToUsers"), d = c == null ? void 0 : c.get("body");
          return d && (o.transferToUserNos = (u = JSON.parse(d)) == null ? void 0 : u.map((h) => h.name)), s.transferToUserNos = "arcoblue", { loading: !1, header: i, attrs: r, values: o, tags: s, i18n: a };
        case "http":
          return r.push("requestUrl", "requestMethod"), Object.assign(o, qt(t, ["requestUrl", "requestMethod"])), { loading: !1, header: i, attrs: r, values: o, tags: s, i18n: a };
        case "dmn":
          return r.push("decisionTableReferenceName"), Object.assign(o, qt(t, ["decisionTableReferenceName"])), s.decisionTableReferenceName = "arcoblue", { loading: !1, header: i, attrs: r, values: o, tags: s, i18n: a };
        case "email":
          return r.push("mailTo", "subject", "mailContent"), Object.assign(
            o,
            qt(t, ["to.expression", "subject", "html.expression"])
          ), { loading: !1, header: i, attrs: r, values: o, tags: s, i18n: a };
      }
    return { loading: !1, header: i, attrs: r, values: o, tags: s, i18n: a };
  },
  "bpmn:ScriptTask": (e) => {
    const t = e.businessObject, n = t.get("name"), i = n || e.type.replace("bpmn:", ""), r = ["scriptFormat"], o = {
      scriptFormat: t.scriptFormat
    }, s = {}, a = [];
    return n || a.push("header"), { loading: !1, header: i, attrs: r, values: o, tags: s, i18n: a };
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
    const n = e.businessObject.get("name"), i = n || e.type.replace("bpmn:", ""), r = ["condition"], o = fu(e), s = {
      condition: o == null ? void 0 : o.get("body")
    }, a = {}, l = [];
    return n || l.push("header"), { loading: !1, header: i, attrs: r, values: s, tags: a, i18n: l };
  },
  "bpmn:StartEvent": Ai,
  "bpmn:EndEvent": Ai,
  "bpmn:IntermediateThrowEvent": Ai,
  "bpmn:IntermediateCatchEvent": Ai
};
function Ai(e) {
  var B, $, v, F, k;
  const n = e.businessObject.get("name"), i = !1, r = n || e.type.replace("bpmn:", ""), o = ["eventDefinition"], s = {}, a = { eventDefinition: "arcoblue" }, l = ["eventDefinition"];
  n || l.push("header");
  const u = Zl(e);
  if (u)
    return o.push("eventDefinitionName"), s.eventDefinition = "Error", s.eventDefinitionName = ((B = u.get("errorRef")) == null ? void 0 : B.name) || "-", { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  const c = nc(e);
  if (c)
    return o.push("eventDefinitionName"), s.eventDefinition = "Signal", s.eventDefinitionName = (($ = c.get("signalRef")) == null ? void 0 : $.name) || "-", { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  const d = tc(e);
  if (d)
    return o.push("eventDefinitionName"), s.eventDefinition = "Message", s.eventDefinitionName = ((v = d.get("messageRef")) == null ? void 0 : v.name) || "-", { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  const h = ic(e);
  if (h)
    return o.push("eventDefinitionName"), s.eventDefinition = "Escalation", s.eventDefinitionName = ((F = h.get("escalationRef")) == null ? void 0 : F.name) || "-", { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  if (fp(e))
    return s.eventDefinition = "Compensate", { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  if (pp(e))
    return o.push("terminateAll"), s.eventDefinition = "Terminate", s.terminateAll = h.terminateAll || "-", { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  const p = Zo(e);
  if (p)
    return o.push("variableName", "variableChangeType"), l.push("variableChangeType"), s.eventDefinition = "VariableListener", s.variableName = p.get("variableName") || "-", s.variableChangeType = `var-${p.get("variableChangeType") || "-"}`, { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  const g = En(e);
  if (g)
    return o.push("conditionExpression"), s.eventDefinition = "Conditional", s.conditionExpression = ((k = g.get("condition")) == null ? void 0 : k.body) || "-", { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  const C = ec(e);
  if (C) {
    s.eventDefinition = "Timer", o.push("timerDefinitionType", "timerEventDefValue"), l.push("timerDefinitionType");
    const I = Ql(C) || "";
    return s.timerDefinitionType = I, s.timerEventDefValue = I ? bv(C.get(I)) : "-", { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
  }
  return { loading: i, i18n: l, header: r, attrs: o, values: s, tags: a };
}
function bv(e) {
  return e && e.get("body") || "";
}
function Ev(e) {
  return Zo(e) ? !1 : !e.businessObject.eventDefinitions || !e.businessObject.eventDefinitions.length;
}
function fu(e) {
  const t = Te(e);
  if (O(t, "bpmn:SequenceFlow"))
    return t.get("conditionExpression");
  if (En(t))
    return En(t).get("condition");
}
const wv = {
  key: 0,
  class: "node-details_wrap"
}, Sv = /* @__PURE__ */ he({
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
    // 流程的模型定义 ID
    defId: {
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
    const i = n, r = e, { locale: o, t: s } = Tn(), a = te(), l = te(), u = Kn(), c = te(!1), d = te([]), h = te({}), E = te(), f = (m) => {
      if (m)
        return E.value = m, document.body.setAttribute("arco-theme", m);
      const S = document.body.getAttribute("arco-theme") === "dark";
      E.value = S ? "light" : "dark", document.body.setAttribute("arco-theme", E.value);
    }, p = (m) => {
      var S;
      m ? o.value = m : o.value = o.value === "zh_CN" ? "en_US" : "zh_CN", Ro("local-lang", o.value), (S = u.value) == null || S.get("eventBus").fire("i18n.changed");
    }, g = (m) => (u.value = m) && i("viewer-init", m), C = () => {
      var D;
      const m = (D = u.value) == null ? void 0 : D.get("elementRegistry");
      if (!m) {
        d.value = [];
        return;
      }
      const S = [];
      m.forEach((A) => {
        if (Sa(A)) {
          S.push({ id: A.id, type: A.type });
          return;
        }
        if (wa(A)) {
          if (A.type === "bpmn:UserTask") {
            r.procInstId && S.push({ id: A.id, type: A.type });
            return;
          }
          S.push({ id: A.id, type: A.type });
        }
      }), d.value = S;
    };
    async function B(m) {
      h.value[m.id] = {
        type: "CallActivity",
        loading: !0,
        custom: !0
      };
      const S = m.businessObject, D = S.calledElement;
      if (!D)
        return;
      const A = S.name, H = S.processInstanceName, q = S.inheritVariables ? "是" : "否";
      if (r.procInstId && (l.value.isActiveNode(m) || l.value.isPassedNode(m))) {
        const { data: Q, success: me } = await hv(
          r.procInstId,
          D
        );
        if (me && Q) {
          h.value[m.id] = {
            type: "CallActivity",
            loading: !1,
            instanceId: Q,
            name: A,
            inheritVariables: q,
            modelName: H,
            custom: !0
          };
          return;
        }
      }
      h.value[m.id] = {
        type: "CallActivity",
        loading: !1,
        name: A,
        modelKey: D,
        inheritVariables: q,
        modelName: H,
        custom: !0
      };
    }
    async function $(m) {
      if (!r.procInstId)
        return;
      h.value[m] = {
        type: "UserTask",
        loading: !0,
        custom: !0
      };
      const { data: S = {} } = await dv({
        procInstId: r.procInstId,
        elementId: m
      });
      h.value[m] = {
        type: "UserTask",
        loading: !1,
        custom: !0,
        ...S
      };
    }
    async function v(m) {
      const { type: S, id: D } = m;
      try {
        S === "bpmn:UserTask" && await $(D), S === "bpmn:CallActivity" && await B(m);
      } catch (A) {
        It.error((A == null ? void 0 : A.message) || "请求失败");
      } finally {
        h.value[D].loading = !1;
      }
    }
    function F(m) {
      if (!h.value[m.id]) {
        if (wa(m))
          return h.value[m.id] = { loading: !0 }, v(m);
        if (Sa(m)) {
          for (const S of du)
            if (O(m, S)) {
              h.value[m.id] = yv[S](m);
              return;
            }
        }
      }
    }
    async function k(m, S, D) {
      var A;
      if ((A = u.value) == null || A.clear(), !m && !S && !D) {
        It.error("modelKey和procInstId和procDefId不能同时为空！");
        return;
      }
      try {
        if (await zi(), d.value = [], h.value = {}, c.value = !0, S) {
          await I(S);
          return;
        }
        if (D) {
          await K(D);
          return;
        }
        await G(m);
      } finally {
        c.value = !1;
      }
    }
    async function I(m) {
      var H;
      const { data: S, success: D, msg: A } = await uv(m);
      if (D) {
        const {
          activeActivityIds: q = [],
          hisActiveActivityIds: Q = [],
          modelXml: me,
          highLightedFlows: be = [],
          noHighLightedFlows: N = []
        } = S || {};
        if (!me) return;
        await ((H = l.value) == null ? void 0 : H.createNewProcess(me)), setTimeout(() => {
          var M, W, z, j;
          (M = l.value) == null || M.setPassedNodes([...be, ...Q]), N && ((W = l.value) == null || W.setFutureNodes([...N])), q && ((z = l.value) == null || z.setActiveNodes([...q])), q && ((j = l.value) == null || j.setProcessingMarker([...q])), C();
        }, 100);
      } else
        It.error(A);
      return i("data-change", S), S;
    }
    async function G(m) {
      var H;
      const { data: S, success: D, msg: A } = await fv(m);
      if (D) {
        const { modelXml: q } = S || {};
        if (!q) return;
        await ((H = l.value) == null ? void 0 : H.createNewProcess(q)), C();
      } else
        It.error(A);
      i("data-change", S);
    }
    async function K(m) {
      var H;
      const { data: S, success: D, msg: A } = await pv(m);
      if (D) {
        const { modelXml: q } = S || {};
        if (!q) return;
        await ((H = l.value) == null ? void 0 : H.createNewProcess(q)), C();
      } else
        It.error(A);
      i("data-change", S);
    }
    return xe(
      () => r.local,
      (m) => p(m),
      { immediate: !0 }
    ), xe(
      () => r.theme,
      (m) => f(m),
      { immediate: !0 }
    ), xe(
      () => ({ procInstId: r.procInstId, modelKey: r.modelKey, defId: r.defId }),
      ({ procInstId: m, modelKey: S, defId: D }) => k(S, m, D),
      { immediate: !0 }
    ), t({ reloadViewerXML: k, downloadProcess: async (m, S) => {
      var D;
      (D = l.value) == null || D.downloadProcess(m, S);
    }, toggleTheme: f, toggleLang: p, downloadProcessAsPng: async (m) => {
      var S;
      (S = l.value) == null || S.downloadProcessAsPng(m);
    } }), (m, S) => {
      const D = Pm, A = tm, H = Vh, q = $h;
      return P(), Y("div", {
        ref_key: "viewerWrapper",
        ref: a,
        class: "bpmn-preset-viewer"
      }, [
        V(Zp, {
          ref_key: "viewer",
          ref: l,
          loading: x(c),
          theme: e.theme,
          local: e.local,
          "translate-prefix": e.translatePrefix,
          "show-download": e.showDownload,
          toolbar: e.toolbar,
          "file-name": e.fileName,
          "full-element": x(a),
          "in-preset": "",
          onViewerInit: g,
          onViewerDestroy: g,
          onElementHover: F
        }, null, 8, ["loading", "theme", "local", "translate-prefix", "show-download", "toolbar", "file-name", "full-element"]),
        (P(!0), Y(ct, null, Vi(x(d), (Q) => (P(), ue(q, {
          key: Q.id,
          "selector-parent": x(l).$el,
          "append-to": x(a),
          offset: [0, 10],
          "z-index": 8888,
          "max-width": 1e3,
          target: `[data-element-id=${Q.id}]`,
          "follow-cursor": Q.type === "bpmn:SequenceFlow" ? "initial" : !1
        }, {
          default: ne(() => [
            V(x(Mo), {
              loading: x(h)[Q.id] && x(h)[Q.id].loading
            }, {
              default: ne(() => [
                x(h)[Q.id] ? (P(), Y("div", wv, [
                  x(h)[Q.id].custom ? (P(), Y(ct, { key: 0 }, [
                    x(h)[Q.id].type === "UserTask" ? (P(), ue(D, {
                      key: 0,
                      "node-info": x(h)[Q.id],
                      "translate-prefix": e.translatePrefix
                    }, null, 8, ["node-info", "translate-prefix"])) : ce("", !0),
                    x(h)[Q.id].type === "CallActivity" ? (P(), ue(A, zn({
                      key: 1,
                      ref_for: !0
                    }, r, {
                      theme: x(E),
                      "node-info": x(h)[Q.id]
                    }), null, 16, ["theme", "node-info"])) : ce("", !0)
                  ], 64)) : (P(), ue(H, {
                    key: 1,
                    "node-info": x(h)[Q.id],
                    "translate-prefix": e.translatePrefix
                  }, null, 8, ["node-info", "translate-prefix"]))
                ])) : ce("", !0)
              ]),
              _: 2
            }, 1032, ["loading"])
          ]),
          _: 2
        }, 1032, ["selector-parent", "append-to", "target", "follow-cursor"]))), 128))
      ], 512);
    };
  }
});
export {
  Lv as BpmnMocker,
  Sv as BpmnPresetViewer,
  Zp as BpmnViewer,
  $h as TippyPopover
};
