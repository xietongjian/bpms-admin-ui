var d4 = Object.defineProperty;
var m4 = (e, t, n) => t in e ? d4(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var M = (e, t, n) => m4(e, typeof t != "symbol" ? t + "" : t, n);
import { ref as P, reactive as t1, inject as l0, computed as _, getCurrentInstance as Ue, cloneVNode as p4, defineComponent as j, openBlock as w, createElementBlock as F, normalizeClass as H, renderSlot as K, normalizeStyle as s0, createElementVNode as R, resolveComponent as X, createBlock as V, createCommentVNode as Y, toRef as p2, toRefs as T0, watch as b0, createVNode as E, mergeProps as A0, createTextVNode as Q, nextTick as T1, provide as d1, Fragment as z0, createSlots as v4, withCtx as T, withModifiers as j1, onMounted as L0, onUpdated as X1, onBeforeUnmount as m1, readonly as h4, onDeactivated as f4, Teleport as mt, Transition as R1, withDirectives as E1, vShow as C1, toDisplayString as q, onUnmounted as b4, TransitionGroup as y4, isVNode as g4, render as W1, watchEffect as M1, unref as x, h as v2, renderList as pt, resolveDynamicComponent as vt, shallowRef as x1, onBeforeMount as E4, isRef as G0 } from "vue";
import { useI18n as Z0 } from "vue-i18n";
import C4 from "bpmn-js/lib/Modeler";
import w4 from "diagram-js-minimap";
import { CreateAppendAnythingModule as k4 } from "bpmn-js-create-append-anything";
import S4 from "diagram-js-grid-bg";
import { is as D, isAny as _4, getBusinessObject as u0 } from "bpmn-js/lib/util/ModelUtil";
import { isAny as Oe } from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import T4 from "bpmn-js/lib/draw/BpmnRenderer";
import { getDi as h2, getStrokeColor as J, getFillColor as r0, getSemantic as se, isThrowEvent as x4, isTypedEvent as M0, black as f2 } from "bpmn-js/lib/draw/BpmnRenderUtil";
import { rotate as $4 } from "diagram-js/lib/util/SvgTransformUtil";
import M4 from "bpmn-js/lib/draw/PathMap";
import P4 from "bpmn-js-i18n-zh/lib/bpmn-js";
import A4 from "diagram-js/lib/command/CommandInterceptor";
import K0 from "bpmn-js/lib/features/rules/BpmnRules";
import { isEventSubProcess as X0, isHorizontal as ht, isExpanded as P0, isInterrupting as b2 } from "bpmn-js/lib/util/DiUtil";
import { getBoundaryAttachment as Z4 } from "bpmn-js/lib/features/snapping/BpmnSnappingUtil";
import B4 from "bpmn-js/lib/features/context-pad/ContextPadProvider";
import N4 from "bpmn-js/lib/features/popup-menu/ReplaceMenuProvider";
import { getChildLanes as L4 } from "bpmn-js/lib/features/modeling/util/LaneUtil";
import { getPropertyNames as y2 } from "bpmn-js/lib/features/copy-paste/ModdleCopy";
import D4 from "diagram-js/lib/features/popup-menu/PopupMenu";
import { isPlane as I4 } from "bpmn-js/lib/util/DrilldownUtil";
import { add as O4 } from "diagram-js/lib/util/Collections";
const n1 = Object.prototype.toString;
function qe(e) {
  return n1.call(e) === "[object Array]";
}
function ft(e) {
  return n1.call(e) === "[object Null]";
}
function g2(e) {
  return n1.call(e) === "[object Boolean]";
}
function ce(e) {
  return n1.call(e) === "[object Object]";
}
const E2 = (e) => n1.call(e) === "[object Promise]";
function J1(e) {
  return n1.call(e) === "[object String]";
}
function p0(e) {
  return n1.call(e) === "[object Number]" && e === e;
}
function l1(e) {
  return e === void 0;
}
function _0(e) {
  return typeof e == "function";
}
const c1 = Symbol("ArcoConfigProvider"), Z1 = {
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
}, V4 = {
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
  calendar: Z1,
  datePicker: {
    view: Z1.view,
    month: Z1.month,
    week: Z1.week,
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
}, z4 = P("zh-CN"), F4 = t1({
  "zh-CN": V4
}), H4 = () => {
  const e = l0(c1, void 0), t = _(() => {
    var a;
    return (a = e == null ? void 0 : e.locale) != null ? a : F4[z4.value];
  }), n = _(() => t.value.locale);
  return {
    i18nMessage: t,
    locale: n,
    t: (a, ...l) => {
      const o = a.split(".");
      let s = t.value;
      for (const r of o) {
        if (!s[r])
          return a;
        s = s[r];
      }
      return J1(s) && l.length > 0 ? s.replace(/{(\d+)}/g, (r, c) => {
        var u;
        return (u = l[c]) != null ? u : r;
      }) : s;
    }
  };
};
var j4 = Object.defineProperty, R4 = Object.defineProperties, W4 = Object.getOwnPropertyDescriptors, C2 = Object.getOwnPropertySymbols, U4 = Object.prototype.hasOwnProperty, q4 = Object.prototype.propertyIsEnumerable, w2 = (e, t, n) => t in e ? j4(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, K4 = (e, t) => {
  for (var n in t || (t = {}))
    U4.call(t, n) && w2(e, n, t[n]);
  if (C2)
    for (var n of C2(t))
      q4.call(t, n) && w2(e, n, t[n]);
  return e;
}, G4 = (e, t) => R4(e, W4(t));
const Y4 = "A", X4 = "arco", Ve = "$arco", F0 = (e) => {
  var t;
  return (t = e == null ? void 0 : e.componentPrefix) != null ? t : Y4;
}, H0 = (e, t) => {
  var n;
  t && t.classPrefix && (e.config.globalProperties[Ve] = G4(K4({}, (n = e.config.globalProperties[Ve]) != null ? n : {}), {
    classPrefix: t.classPrefix
  }));
}, e0 = (e) => {
  var t, n, i;
  const a = Ue(), l = l0(c1, void 0), o = (i = (n = l == null ? void 0 : l.prefixCls) != null ? n : (t = a == null ? void 0 : a.appContext.config.globalProperties[Ve]) == null ? void 0 : t.classPrefix) != null ? i : X4;
  return e ? `${o}-${e}` : o;
};
var bt = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, n) {
    var i = -1;
    return t.some(function(a, l) {
      return a[0] === n ? (i = l, !0) : !1;
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
        var i = e(this.__entries__, n), a = this.__entries__[i];
        return a && a[1];
      }, t.prototype.set = function(n, i) {
        var a = e(this.__entries__, n);
        ~a ? this.__entries__[a][1] = i : this.__entries__.push([n, i]);
      }, t.prototype.delete = function(n) {
        var i = this.__entries__, a = e(i, n);
        ~a && i.splice(a, 1);
      }, t.prototype.has = function(n) {
        return !!~e(this.__entries__, n);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(n, i) {
        i === void 0 && (i = null);
        for (var a = 0, l = this.__entries__; a < l.length; a++) {
          var o = l[a];
          n.call(i, o[1], o[0]);
        }
      }, t;
    }()
  );
}(), ze = typeof window < "u" && typeof document < "u" && window.document === document, U1 = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), J4 = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(U1) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), Q4 = 2;
function e3(e, t) {
  var n = !1, i = !1, a = 0;
  function l() {
    n && (n = !1, e()), i && s();
  }
  function o() {
    J4(l);
  }
  function s() {
    var r = Date.now();
    if (n) {
      if (r - a < Q4)
        return;
      i = !0;
    } else
      n = !0, i = !1, setTimeout(o, t);
    a = r;
  }
  return s;
}
var t3 = 20, n3 = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], i3 = typeof MutationObserver < "u", a3 = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = e3(this.refresh.bind(this), t3);
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
      !ze || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), i3 ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !ze || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var n = t.propertyName, i = n === void 0 ? "" : n, a = n3.some(function(l) {
        return !!~i.indexOf(l);
      });
      a && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), yt = function(e, t) {
  for (var n = 0, i = Object.keys(t); n < i.length; n++) {
    var a = i[n];
    Object.defineProperty(e, a, {
      value: t[a],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, u1 = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || U1;
}, gt = Q1(0, 0, 0, 0);
function q1(e) {
  return parseFloat(e) || 0;
}
function k2(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(i, a) {
    var l = e["border-" + a + "-width"];
    return i + q1(l);
  }, 0);
}
function l3(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, i = 0, a = t; i < a.length; i++) {
    var l = a[i], o = e["padding-" + l];
    n[l] = q1(o);
  }
  return n;
}
function o3(e) {
  var t = e.getBBox();
  return Q1(0, 0, t.width, t.height);
}
function r3(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return gt;
  var i = u1(e).getComputedStyle(e), a = l3(i), l = a.left + a.right, o = a.top + a.bottom, s = q1(i.width), r = q1(i.height);
  if (i.boxSizing === "border-box" && (Math.round(s + l) !== t && (s -= k2(i, "left", "right") + l), Math.round(r + o) !== n && (r -= k2(i, "top", "bottom") + o)), !c3(e)) {
    var c = Math.round(s + l) - t, u = Math.round(r + o) - n;
    Math.abs(c) !== 1 && (s -= c), Math.abs(u) !== 1 && (r -= u);
  }
  return Q1(a.left, a.top, s, r);
}
var s3 = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof u1(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof u1(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function c3(e) {
  return e === u1(e).document.documentElement;
}
function u3(e) {
  return ze ? s3(e) ? o3(e) : r3(e) : gt;
}
function d3(e) {
  var t = e.x, n = e.y, i = e.width, a = e.height, l = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(l.prototype);
  return yt(o, {
    x: t,
    y: n,
    width: i,
    height: a,
    top: n,
    right: t + i,
    bottom: a + n,
    left: t
  }), o;
}
function Q1(e, t, n, i) {
  return { x: e, y: t, width: n, height: i };
}
var m3 = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Q1(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = u3(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), p3 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, n) {
      var i = d3(n);
      yt(this, { target: t, contentRect: i });
    }
    return e;
  }()
), v3 = (
  /** @class */
  function() {
    function e(t, n, i) {
      if (this.activeObservations_ = [], this.observations_ = new bt(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = n, this.callbackCtx_ = i;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof u1(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) || (n.set(t, new m3(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof u1(t).Element))
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
          return new p3(i.target, i.broadcastRect());
        });
        this.callback_.call(t, n, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), Et = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new bt(), Ct = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = a3.getInstance(), i = new v3(t, n, this);
      Et.set(this, i);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Ct.prototype[e] = function() {
    var t;
    return (t = Et.get(this))[e].apply(t, arguments);
  };
});
var wt = function() {
  return typeof U1.ResizeObserver < "u" ? U1.ResizeObserver : Ct;
}(), S2;
(function(e) {
  e[e.ELEMENT = 1] = "ELEMENT", e[e.FUNCTIONAL_COMPONENT = 2] = "FUNCTIONAL_COMPONENT", e[e.STATEFUL_COMPONENT = 4] = "STATEFUL_COMPONENT", e[e.COMPONENT = 6] = "COMPONENT", e[e.TEXT_CHILDREN = 8] = "TEXT_CHILDREN", e[e.ARRAY_CHILDREN = 16] = "ARRAY_CHILDREN", e[e.SLOTS_CHILDREN = 32] = "SLOTS_CHILDREN", e[e.TELEPORT = 64] = "TELEPORT", e[e.SUSPENSE = 128] = "SUSPENSE", e[e.COMPONENT_SHOULD_KEEP_ALIVE = 256] = "COMPONENT_SHOULD_KEEP_ALIVE", e[e.COMPONENT_KEPT_ALIVE = 512] = "COMPONENT_KEPT_ALIVE";
})(S2 || (S2 = {}));
var _2;
(function(e) {
  e[e.TEXT = 1] = "TEXT", e[e.CLASS = 2] = "CLASS", e[e.STYLE = 4] = "STYLE", e[e.PROPS = 8] = "PROPS", e[e.FULL_PROPS = 16] = "FULL_PROPS", e[e.HYDRATE_EVENTS = 32] = "HYDRATE_EVENTS", e[e.STABLE_FRAGMENT = 64] = "STABLE_FRAGMENT", e[e.KEYED_FRAGMENT = 128] = "KEYED_FRAGMENT", e[e.UNKEYED_FRAGMENT = 256] = "UNKEYED_FRAGMENT", e[e.NEED_PATCH = 512] = "NEED_PATCH", e[e.DYNAMIC_SLOTS = 1024] = "DYNAMIC_SLOTS", e[e.DEV_ROOT_FRAGMENT = 2048] = "DEV_ROOT_FRAGMENT", e[e.HOISTED = -1] = "HOISTED", e[e.BAIL = -2] = "BAIL";
})(_2 || (_2 = {}));
const kt = (e) => !!(e && e.shapeFlag & 1), St = (e, t) => !!(e && e.shapeFlag & 6), h3 = (e, t) => !!(e && e.shapeFlag & 16), f3 = (e) => {
  if (!e)
    return !0;
  for (const t of e)
    if (t.children)
      return !1;
  return !0;
}, _t = (e, t) => {
  if (e && e.length > 0)
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      if (kt(i) || St(i)) {
        const l = _0(t) ? t(i) : t;
        return e[n] = p4(i, l, !0), !0;
      }
      const a = Tt(i);
      if (a && a.length > 0 && _t(a, t))
        return !0;
    }
  return !1;
}, Tt = (e) => {
  if (h3(e, e.children))
    return e.children;
  if (qe(e))
    return e;
}, xt = (e) => {
  var t, n;
  if (kt(e))
    return e.el;
  if (St(e)) {
    if (((t = e.el) == null ? void 0 : t.nodeType) === 1)
      return e.el;
    if ((n = e.component) != null && n.subTree) {
      const i = xt(e.component.subTree);
      if (i)
        return i;
    }
  } else {
    const i = Tt(e);
    return $t(i);
  }
}, $t = (e) => {
  if (e && e.length > 0)
    for (const t of e) {
      const n = xt(t);
      if (n)
        return n;
    }
}, w1 = (e) => {
  if (e)
    return _0(e) ? e : () => e;
}, Mt = typeof window > "u" ? global : window, b3 = Mt.requestAnimationFrame, T2 = Mt.cancelAnimationFrame;
function x2(e) {
  let t = 0;
  const n = (...i) => {
    t && T2(t), t = b3(() => {
      e(...i), t = 0;
    });
  };
  return n.cancel = () => {
    T2(t), t = 0;
  }, n;
}
const Ke = () => {
}, Pt = () => {
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
}, Ge = (() => {
  try {
    return !(typeof window < "u" && document !== void 0);
  } catch {
    return !0;
  }
})(), J0 = Ge ? Ke : (e, t, n, i = !1) => {
  e.addEventListener(t, n, i);
}, $1 = Ge ? Ke : (e, t, n, i = !1) => {
  e.removeEventListener(t, n, i);
}, y3 = (e, t) => {
  if (!e || !t)
    return !1;
  let n = t;
  for (; n; ) {
    if (n === e)
      return !0;
    n = n.parentNode;
  }
  return !1;
}, At = (e) => {
  const t = document.createElement("div");
  return t.setAttribute("class", `arco-overlay arco-overlay-${e}`), t;
}, g3 = (e, t) => {
  var n;
  return Ge ? Ke() : (n = document.querySelector(e)) != null ? n : void 0;
}, Fe = (e, t) => {
  if (J1(e)) {
    const n = e[0] === "#" ? `[id='${e.slice(1)}']` : e;
    return g3(n);
  }
  return e;
}, E3 = (e) => e.tagName === "BODY" ? document.documentElement.scrollHeight > window.innerHeight : e.scrollHeight > e.offsetHeight, C3 = (e) => e.tagName === "BODY" ? window.innerWidth - Pt().width : e.offsetWidth - e.clientWidth;
var n0 = (e, t) => {
  for (const [n, i] of t)
    e[n] = i;
  return e;
};
const w3 = j({
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
      prefixCls: e0("icon-hover")
    };
  }
});
function k3(e, t, n, i, a, l) {
  return w(), F("span", {
    class: H([
      e.prefixCls,
      {
        [`${e.prefix}-icon-hover`]: e.prefix,
        [`${e.prefixCls}-size-${e.size}`]: e.size !== "medium",
        [`${e.prefixCls}-disabled`]: e.disabled
      }
    ])
  }, [
    K(e.$slots, "default")
  ], 2);
}
var p1 = /* @__PURE__ */ n0(w3, [["render", k3]]);
const S3 = j({
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
    const n = e0("icon"), i = _(() => [n, `${n}-close`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), _3 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], T3 = /* @__PURE__ */ R("path", { d: "M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142" }, null, -1), x3 = [
  T3
];
function $3(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, x3, 14, _3);
}
var ue = /* @__PURE__ */ n0(S3, [["render", $3]]);
const Ye = Object.assign(ue, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + ue.name, ue);
  }
}), M3 = j({
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
    const n = e0("icon"), i = _(() => [n, `${n}-info-circle-fill`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), P3 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], A3 = /* @__PURE__ */ R("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm2-30a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Zm0 17h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), Z3 = [
  A3
];
function B3(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, Z3, 14, P3);
}
var de = /* @__PURE__ */ n0(M3, [["render", B3]]);
const Zt = Object.assign(de, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + de.name, de);
  }
}), N3 = j({
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
    const n = e0("icon"), i = _(() => [n, `${n}-check-circle-fill`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), L3 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], D3 = /* @__PURE__ */ R("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm10.207-24.379a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0L22 26.172l-4.878-4.88a1 1 0 0 0-1.415 0l-1.414 1.415a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414 0l11.5-11.5Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), I3 = [
  D3
];
function O3(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, I3, 14, L3);
}
var me = /* @__PURE__ */ n0(N3, [["render", O3]]);
const ee = Object.assign(me, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + me.name, me);
  }
}), V3 = j({
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
    const n = e0("icon"), i = _(() => [n, `${n}-exclamation-circle-fill`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), z3 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], F3 = /* @__PURE__ */ R("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm-2-11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2Zm4-18a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V15Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), H3 = [
  F3
];
function j3(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, H3, 14, z3);
}
var pe = /* @__PURE__ */ n0(V3, [["render", j3]]);
const te = Object.assign(pe, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + pe.name, pe);
  }
}), R3 = j({
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
    const n = e0("icon"), i = _(() => [n, `${n}-close-circle-fill`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), W3 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], U3 = /* @__PURE__ */ R("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm4.955-27.771-4.95 4.95-4.95-4.95a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l4.95 4.95-4.95 4.95a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-4.95-4.95 4.95-4.95a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), q3 = [
  U3
];
function K3(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, q3, 14, W3);
}
var ve = /* @__PURE__ */ n0(R3, [["render", K3]]);
const Xe = Object.assign(ve, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + ve.name, ve);
  }
}), Bt = ["info", "success", "warning", "error"], $2 = [
  "onFocus",
  "onFocusin",
  "onFocusout",
  "onBlur",
  "onChange",
  "onBeforeinput",
  "onInput",
  "onReset",
  "onSubmit",
  "onInvalid",
  "onKeydown",
  "onKeypress",
  "onKeyup",
  "onCopy",
  "onCut",
  "onPaste",
  "onCompositionstart",
  "onCompositionupdate",
  "onCompositionend",
  "onSelect",
  "autocomplete",
  "autofocus",
  "maxlength",
  "minlength",
  "name",
  "pattern",
  "readonly",
  "required"
], G3 = j({
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
    const n = e0("icon"), i = _(() => [n, `${n}-loading`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), Y3 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], X3 = /* @__PURE__ */ R("path", { d: "M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6" }, null, -1), J3 = [
  X3
];
function Q3(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, J3, 14, Y3);
}
var he = /* @__PURE__ */ n0(G3, [["render", Q3]]);
const P1 = Object.assign(he, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + he.name, he);
  }
}), e5 = j({
  name: "FeedbackIcon",
  components: {
    IconLoading: P1,
    IconCheckCircleFill: ee,
    IconExclamationCircleFill: te,
    IconCloseCircleFill: Xe
  },
  props: {
    type: {
      type: String
    }
  },
  setup(e) {
    const t = e0("feedback-icon");
    return {
      cls: _(() => [
        t,
        `${t}-status-${e.type}`
      ])
    };
  }
});
function t5(e, t, n, i, a, l) {
  const o = X("icon-loading"), s = X("icon-check-circle-fill"), r = X("icon-exclamation-circle-fill"), c = X("icon-close-circle-fill");
  return w(), F("span", {
    class: H(e.cls)
  }, [
    e.type === "validating" ? (w(), V(o, { key: 0 })) : e.type === "success" ? (w(), V(s, { key: 1 })) : e.type === "warning" ? (w(), V(r, { key: 2 })) : e.type === "error" ? (w(), V(c, { key: 3 })) : Y("v-if", !0)
  ], 2);
}
var n5 = /* @__PURE__ */ n0(e5, [["render", t5]]);
const i5 = {
  key: "Enter",
  code: "Enter"
};
var a5 = Object.defineProperty, M2 = Object.getOwnPropertySymbols, l5 = Object.prototype.hasOwnProperty, o5 = Object.prototype.propertyIsEnumerable, P2 = (e, t, n) => t in e ? a5(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, r5 = (e, t) => {
  for (var n in t || (t = {}))
    l5.call(t, n) && P2(e, n, t[n]);
  if (M2)
    for (var n of M2(t))
      o5.call(t, n) && P2(e, n, t[n]);
  return e;
};
const Je = (e, t) => {
  const n = r5({}, e);
  for (const i of t)
    i in n && delete n[i];
  return n;
};
function s5(e, t) {
  const n = {};
  return t.forEach((i) => {
    const a = i;
    i in e && (n[a] = e[a]);
  }), n;
}
const c5 = Symbol("ArcoFormItemContext"), Qe = ({
  size: e,
  disabled: t,
  error: n,
  uninject: i
} = {}) => {
  const a = i ? {} : l0(c5, {}), l = _(() => {
    var u;
    return (u = e == null ? void 0 : e.value) != null ? u : a.size;
  }), o = _(() => (t == null ? void 0 : t.value) || a.disabled), s = _(() => (n == null ? void 0 : n.value) || a.error), r = p2(a, "feedback"), c = p2(a, "eventHandlers");
  return {
    formItemCtx: a,
    mergedSize: l,
    mergedDisabled: o,
    mergedError: s,
    feedback: r,
    eventHandlers: c
  };
}, ne = (e, { defaultValue: t = "medium" } = {}) => {
  const n = l0(c1, void 0);
  return {
    mergedSize: _(() => {
      var a, l;
      return (l = (a = e == null ? void 0 : e.value) != null ? a : n == null ? void 0 : n.size) != null ? l : t;
    })
  };
};
function u5(e) {
  const t = P();
  function n() {
    if (!e.value)
      return;
    const { selectionStart: a, selectionEnd: l, value: o } = e.value;
    if (a == null || l == null)
      return;
    const s = o.slice(0, Math.max(0, a)), r = o.slice(Math.max(0, l));
    t.value = {
      selectionStart: a,
      selectionEnd: l,
      value: o,
      beforeTxt: s,
      afterTxt: r
    };
  }
  function i() {
    if (!e.value || !t.value)
      return;
    const { value: a } = e.value, { beforeTxt: l, afterTxt: o, selectionStart: s } = t.value;
    if (!l || !o || !s)
      return;
    let r = a.length;
    if (a.endsWith(o))
      r = a.length - o.length;
    else if (a.startsWith(l))
      r = l.length;
    else {
      const c = l[s - 1], u = a.indexOf(c, s - 1);
      u !== -1 && (r = u + 1);
    }
    e.value.setSelectionRange(r, r);
  }
  return [n, i];
}
var d5 = Object.defineProperty, A2 = Object.getOwnPropertySymbols, m5 = Object.prototype.hasOwnProperty, p5 = Object.prototype.propertyIsEnumerable, Z2 = (e, t, n) => t in e ? d5(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, B2 = (e, t) => {
  for (var n in t || (t = {}))
    m5.call(t, n) && Z2(e, n, t[n]);
  if (A2)
    for (var n of A2(t))
      p5.call(t, n) && Z2(e, n, t[n]);
  return e;
}, k1 = j({
  name: "Input",
  inheritAttrs: !1,
  props: {
    modelValue: String,
    defaultValue: {
      type: String,
      default: ""
    },
    size: {
      type: String
    },
    allowClear: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    error: {
      type: Boolean,
      default: !1
    },
    placeholder: String,
    maxLength: {
      type: [Number, Object],
      default: 0
    },
    showWordLimit: {
      type: Boolean,
      default: !1
    },
    wordLength: {
      type: Function
    },
    wordSlice: {
      type: Function
    },
    inputAttrs: {
      type: Object
    },
    type: {
      type: String,
      default: "text"
    }
  },
  emits: {
    "update:modelValue": (e) => !0,
    input: (e, t) => !0,
    change: (e, t) => !0,
    pressEnter: (e) => !0,
    clear: (e) => !0,
    focus: (e) => !0,
    blur: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: n,
    attrs: i
  }) {
    const {
      size: a,
      disabled: l,
      error: o,
      modelValue: s
    } = T0(e), r = e0("input"), c = P(), {
      mergedSize: u,
      mergedDisabled: m,
      mergedError: h,
      feedback: f,
      eventHandlers: v
    } = Qe({
      size: a,
      disabled: l,
      error: o
    }), {
      mergedSize: y
    } = ne(u), [g, A] = u5(c), Z = P(e.defaultValue), N = _(() => {
      var O;
      return (O = e.modelValue) != null ? O : Z.value;
    });
    b0(s, (O) => {
      (l1(O) || ft(O)) && (Z.value = "");
    });
    let k = N.value;
    const I = P(!1), C = _(() => e.allowClear && !e.readonly && !m.value && !!N.value), p = P(!1), d = P(""), b = (O) => {
      var G;
      return _0(e.wordLength) ? e.wordLength(O) : (G = O.length) != null ? G : 0;
    }, S = _(() => b(N.value)), L = _(() => h.value || !!(ce(e.maxLength) && e.maxLength.errorOnly && S.value > U.value)), B = _(() => ce(e.maxLength) && !!e.maxLength.errorOnly), U = _(() => ce(e.maxLength) ? e.maxLength.length : e.maxLength), v0 = _(() => {
      const O = b("a");
      return Math.floor(U.value / O);
    }), d0 = (O) => {
      var G, i0;
      U.value && !B.value && b(O) > U.value && (O = (i0 = (G = e.wordSlice) == null ? void 0 : G.call(e, O, U.value)) != null ? i0 : O.slice(0, v0.value)), Z.value = O, t("update:modelValue", O);
    }, y0 = (O) => {
      c.value && O.target !== c.value && (O.preventDefault(), c.value.focus());
    }, a0 = (O, G) => {
      var i0, g0;
      O !== k && (k = O, t("change", O, G), (g0 = (i0 = v.value) == null ? void 0 : i0.onChange) == null || g0.call(i0, G));
    }, R0 = (O) => {
      var G, i0;
      I.value = !0, k = N.value, t("focus", O), (i0 = (G = v.value) == null ? void 0 : G.onFocus) == null || i0.call(G, O);
    }, I0 = (O) => {
      var G, i0;
      I.value = !1, a0(N.value, O), t("blur", O), (i0 = (G = v.value) == null ? void 0 : G.onBlur) == null || i0.call(G, O);
    }, k0 = (O) => {
      var G, i0, g0;
      const {
        value: h1,
        selectionStart: le,
        selectionEnd: oe
      } = O.target;
      if (O.type === "compositionend") {
        if (p.value = !1, d.value = "", U.value && !B.value && S.value >= U.value && b(h1) > U.value && le === oe) {
          C0();
          return;
        }
        d0(h1), t("input", h1, O), (i0 = (G = v.value) == null ? void 0 : G.onInput) == null || i0.call(G, O), C0();
      } else
        p.value = !0, d.value = N.value + ((g0 = O.data) != null ? g0 : "");
    }, C0 = () => {
      g(), T1(() => {
        c.value && N.value !== c.value.value && (c.value.value = N.value, A());
      });
    }, O0 = (O) => {
      var G, i0;
      const {
        value: g0
      } = O.target;
      if (!p.value) {
        if (U.value && !B.value && S.value >= U.value && b(g0) > U.value && O.inputType === "insertText") {
          C0();
          return;
        }
        d0(g0), t("input", g0, O), (i0 = (G = v.value) == null ? void 0 : G.onInput) == null || i0.call(G, O), C0();
      }
    }, W0 = (O) => {
      d0(""), a0("", O), t("clear", O);
    }, U0 = (O) => {
      const G = O.key || O.code;
      !p.value && G === i5.key && (a0(N.value, O), t("pressEnter", O));
    }, t0 = _(() => [`${r}-outer`, `${r}-outer-size-${y.value}`, {
      [`${r}-outer-has-suffix`]: !!n.suffix,
      [`${r}-outer-disabled`]: m.value
    }]), h0 = _(() => [`${r}-wrapper`, {
      [`${r}-error`]: L.value,
      [`${r}-disabled`]: m.value,
      [`${r}-focus`]: I.value
    }]), B0 = _(() => [r, `${r}-size-${y.value}`]), w0 = _(() => Je(i, $2)), N0 = _(() => s5(i, $2)), f0 = _(() => {
      const O = B2(B2({}, N0.value), e.inputAttrs);
      return L.value && (O["aria-invalid"] = !0), O;
    }), S0 = (O) => {
      var G;
      return E("span", A0({
        class: h0.value,
        onMousedown: y0
      }, O ? void 0 : w0.value), [n.prefix && E("span", {
        class: `${r}-prefix`
      }, [n.prefix()]), E("input", A0({
        ref: c,
        class: B0.value,
        value: N.value,
        type: e.type,
        placeholder: e.placeholder,
        readonly: e.readonly,
        disabled: m.value,
        onInput: O0,
        onKeydown: U0,
        onFocus: R0,
        onBlur: I0,
        onCompositionstart: k0,
        onCompositionupdate: k0,
        onCompositionend: k0
      }, f0.value), null), C.value && E(p1, {
        prefix: r,
        class: `${r}-clear-btn`,
        onClick: W0
      }, {
        default: () => [E(Ye, null, null)]
      }), (n.suffix || !!e.maxLength && e.showWordLimit || !!f.value) && E("span", {
        class: [`${r}-suffix`, {
          [`${r}-suffix-has-feedback`]: f.value
        }]
      }, [!!e.maxLength && e.showWordLimit && E("span", {
        class: `${r}-word-limit`
      }, [S.value, Q("/"), U.value]), (G = n.suffix) == null ? void 0 : G.call(n), !!f.value && E(n5, {
        type: f.value
      }, null)])]);
    };
    return {
      inputRef: c,
      render: () => n.prepend || n.append ? E("span", A0({
        class: t0.value
      }, w0.value), [n.prepend && E("span", {
        class: `${r}-prepend`
      }, [n.prepend()]), S0(!0), n.append && E("span", {
        class: `${r}-append`
      }, [n.append()])]) : S0()
    };
  },
  methods: {
    focus() {
      var e;
      (e = this.inputRef) == null || e.focus();
    },
    blur() {
      var e;
      (e = this.inputRef) == null || e.blur();
    }
  },
  render() {
    return this.render();
  }
});
const v5 = j({
  name: "IconSearch",
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
    const n = e0("icon"), i = _(() => [n, `${n}-search`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), h5 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], f5 = /* @__PURE__ */ R("path", { d: "M33.072 33.071c6.248-6.248 6.248-16.379 0-22.627-6.249-6.249-16.38-6.249-22.628 0-6.248 6.248-6.248 16.379 0 22.627 6.248 6.248 16.38 6.248 22.628 0Zm0 0 8.485 8.485" }, null, -1), b5 = [
  f5
];
function y5(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, b5, 14, h5);
}
var fe = /* @__PURE__ */ n0(v5, [["render", y5]]);
const N2 = Object.assign(fe, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + fe.name, fe);
  }
}), Nt = Symbol("ArcoButtonGroup"), g5 = j({
  name: "Button",
  components: {
    IconLoading: P1
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
    const { size: n, disabled: i } = T0(e), a = e0("btn"), l = l0(Nt, void 0), o = _(() => {
      var f;
      return (f = n.value) != null ? f : l == null ? void 0 : l.size;
    }), s = _(() => !!(i.value || l != null && l.disabled)), { mergedSize: r, mergedDisabled: c } = Qe({
      size: o,
      disabled: s
    }), { mergedSize: u } = ne(r), m = _(() => {
      var f, v, y, g, A, Z;
      return [
        a,
        `${a}-${(v = (f = e.type) != null ? f : l == null ? void 0 : l.type) != null ? v : "secondary"}`,
        `${a}-shape-${(g = (y = e.shape) != null ? y : l == null ? void 0 : l.shape) != null ? g : "square"}`,
        `${a}-size-${u.value}`,
        `${a}-status-${(Z = (A = e.status) != null ? A : l == null ? void 0 : l.status) != null ? Z : "normal"}`,
        {
          [`${a}-long`]: e.long,
          [`${a}-loading`]: e.loading,
          [`${a}-disabled`]: c.value,
          [`${a}-link`]: J1(e.href)
        }
      ];
    });
    return {
      prefixCls: a,
      cls: m,
      mergedDisabled: c,
      handleClick: (f) => {
        if (e.disabled || e.loading) {
          f.preventDefault();
          return;
        }
        t("click", f);
      }
    };
  }
}), E5 = ["href"], C5 = ["type", "disabled", "autofocus"];
function w5(e, t, n, i, a, l) {
  const o = X("icon-loading");
  return e.href ? (w(), F("a", {
    key: 0,
    class: H([
      e.cls,
      { [`${e.prefixCls}-only-icon`]: e.$slots.icon && !e.$slots.default }
    ]),
    href: e.mergedDisabled || e.loading ? void 0 : e.href,
    onClick: t[0] || (t[0] = (...s) => e.handleClick && e.handleClick(...s))
  }, [
    e.loading || e.$slots.icon ? (w(), F("span", {
      key: 0,
      class: H(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (w(), V(o, {
        key: 0,
        spin: "true"
      })) : K(e.$slots, "icon", { key: 1 })
    ], 2)) : Y("v-if", !0),
    K(e.$slots, "default")
  ], 10, E5)) : (w(), F("button", {
    key: 1,
    class: H([
      e.cls,
      { [`${e.prefixCls}-only-icon`]: e.$slots.icon && !e.$slots.default }
    ]),
    type: e.htmlType,
    disabled: e.mergedDisabled,
    autofocus: e.autofocus,
    onClick: t[1] || (t[1] = (...s) => e.handleClick && e.handleClick(...s))
  }, [
    e.loading || e.$slots.icon ? (w(), F("span", {
      key: 0,
      class: H(`${e.prefixCls}-icon`)
    }, [
      e.loading ? (w(), V(o, {
        key: 0,
        spin: !0
      })) : K(e.$slots, "icon", { key: 1 })
    ], 2)) : Y("v-if", !0),
    K(e.$slots, "default")
  ], 10, C5));
}
var be = /* @__PURE__ */ n0(g5, [["render", w5]]);
const k5 = j({
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
    const { type: t, size: n, status: i, disabled: a, shape: l } = T0(e), o = e0("btn-group");
    return d1(Nt, t1({
      type: t,
      size: n,
      shape: l,
      status: i,
      disabled: a
    })), {
      prefixCls: o
    };
  }
});
function S5(e, t, n, i, a, l) {
  return w(), F("div", {
    class: H(e.prefixCls)
  }, [
    K(e.$slots, "default")
  ], 2);
}
var Q0 = /* @__PURE__ */ n0(k5, [["render", S5]]);
const D0 = Object.assign(be, {
  Group: Q0,
  install: (e, t) => {
    H0(e, t);
    const n = F0(t);
    e.component(n + be.name, be), e.component(n + Q0.name, Q0);
  }
});
var ye = j({
  name: "InputSearch",
  props: {
    searchButton: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String
    },
    buttonText: {
      type: String
    },
    buttonProps: {
      type: Object
    }
  },
  emits: {
    search: (e, t) => !0
  },
  setup(e, {
    emit: t,
    slots: n
  }) {
    const {
      size: i
    } = T0(e), a = e0("input-search"), {
      mergedSize: l
    } = ne(i), o = P(), s = (m) => {
      o.value.inputRef && t("search", o.value.inputRef.value, m);
    }, r = () => {
      var m;
      return E(z0, null, [e.loading ? E(P1, null, null) : E(p1, {
        onClick: s
      }, {
        default: () => [E(N2, null, null)]
      }), (m = n.suffix) == null ? void 0 : m.call(n)]);
    }, c = () => {
      var m;
      let h = {};
      return e.buttonText || n["button-default"] || n["button-icon"] ? h = {
        default: (m = n["button-default"]) != null ? m : e.buttonText ? () => e.buttonText : void 0,
        icon: n["button-icon"]
      } : h = {
        icon: () => E(N2, null, null)
      }, E(D0, A0({
        type: "primary",
        class: `${a}-btn`,
        disabled: e.disabled,
        size: l.value,
        loading: e.loading
      }, e.buttonProps, {
        onClick: s
      }), h);
    };
    return {
      inputRef: o,
      render: () => E(k1, {
        ref: o,
        class: a,
        size: l.value,
        disabled: e.disabled
      }, {
        prepend: n.prepend,
        prefix: n.prefix,
        suffix: e.searchButton ? n.suffix : r,
        append: e.searchButton ? c : n.append
      })
    };
  },
  methods: {
    focus() {
      var e;
      (e = this.inputRef) == null || e.focus();
    },
    blur() {
      var e;
      (e = this.inputRef) == null || e.blur();
    }
  },
  render() {
    return this.render();
  }
});
const _5 = j({
  name: "IconEye",
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
    const n = e0("icon"), i = _(() => [n, `${n}-eye`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), T5 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], x5 = /* @__PURE__ */ R("path", {
  "clip-rule": "evenodd",
  d: "M24 37c6.627 0 12.627-4.333 18-13-5.373-8.667-11.373-13-18-13-6.627 0-12.627 4.333-18 13 5.373 8.667 11.373 13 18 13Z"
}, null, -1), $5 = /* @__PURE__ */ R("path", { d: "M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" }, null, -1), M5 = [
  x5,
  $5
];
function P5(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, M5, 14, T5);
}
var ge = /* @__PURE__ */ n0(_5, [["render", P5]]);
const A5 = Object.assign(ge, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + ge.name, ge);
  }
}), Z5 = j({
  name: "IconEyeInvisible",
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
    const n = e0("icon"), i = _(() => [n, `${n}-eye-invisible`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), B5 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], N5 = /* @__PURE__ */ R("path", { d: "M14 14.5c-2.69 2-5.415 5.33-8 9.5 5.373 8.667 11.373 13 18 13 3.325 0 6.491-1.09 9.5-3.271M17.463 12.5C19 11 21.75 11 24 11c6.627 0 12.627 4.333 18 13-1.766 2.848-3.599 5.228-5.5 7.14" }, null, -1), L5 = /* @__PURE__ */ R("path", { d: "M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM6.852 7.103l34.294 34.294" }, null, -1), D5 = [
  N5,
  L5
];
function I5(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, D5, 14, B5);
}
var Ee = /* @__PURE__ */ n0(Z5, [["render", I5]]);
const O5 = Object.assign(Ee, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + Ee.name, Ee);
  }
});
function V5(e) {
  const t = P(e);
  return [t, (i) => {
    t.value = i;
  }];
}
function z5(e, t) {
  const { value: n } = T0(t), [i, a] = V5(l1(n.value) ? e : n.value);
  return b0(n, (o) => {
    l1(o) && a(void 0);
  }), [_(() => l1(n.value) ? i.value : n.value), a, i];
}
const F5 = j({
  name: "InputPassword",
  components: {
    IconEye: A5,
    IconEyeInvisible: O5,
    AIconHover: p1,
    AInput: k1
  },
  props: {
    visibility: {
      type: Boolean,
      default: void 0
    },
    defaultVisibility: {
      type: Boolean,
      default: !0
    },
    invisibleButton: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    "visibility-change",
    "update:visibility"
  ],
  setup(e, { emit: t }) {
    const { visibility: n, defaultVisibility: i } = T0(e), a = P(), l = () => {
      r(!o.value);
    }, [o, s] = z5(i.value, t1({
      value: n
    })), r = (c) => {
      c !== o.value && (t("visibility-change", c), t("update:visibility", c), s(c));
    };
    return {
      inputRef: a,
      mergedVisible: o,
      handleInvisible: l
    };
  },
  methods: {
    focus() {
      var e;
      (e = this.inputRef) == null || e.focus();
    },
    blur() {
      var e;
      (e = this.inputRef) == null || e.blur();
    }
  }
});
function H5(e, t, n, i, a, l) {
  const o = X("icon-eye"), s = X("icon-eye-invisible"), r = X("a-icon-hover"), c = X("a-input");
  return w(), V(c, {
    ref: "inputRef",
    type: e.mergedVisible ? "password" : "text"
  }, v4({ _: 2 }, [
    e.$slots.prepend ? {
      name: "prepend",
      fn: T(() => [
        K(e.$slots, "prepend")
      ])
    } : void 0,
    e.$slots.prefix ? {
      name: "prefix",
      fn: T(() => [
        K(e.$slots, "prefix")
      ])
    } : void 0,
    e.invisibleButton || e.$slots.suffix ? {
      name: "suffix",
      fn: T(() => [
        e.invisibleButton ? (w(), V(r, {
          key: 0,
          onClick: e.handleInvisible,
          onMousedown: t[0] || (t[0] = j1(() => {
          }, ["prevent"])),
          onMouseup: t[1] || (t[1] = j1(() => {
          }, ["prevent"]))
        }, {
          default: T(() => [
            e.mergedVisible ? (w(), V(s, { key: 1 })) : (w(), V(o, { key: 0 }))
          ]),
          _: 1
        }, 8, ["onClick"])) : Y("v-if", !0),
        K(e.$slots, "suffix")
      ])
    } : void 0,
    e.$slots.append ? {
      name: "append",
      fn: T(() => [
        K(e.$slots, "append")
      ])
    } : void 0
  ]), 1032, ["type"]);
}
var Ce = /* @__PURE__ */ n0(F5, [["render", H5]]);
const j5 = j({
  name: "InputGroup",
  setup() {
    return {
      prefixCls: e0("input-group")
    };
  }
});
function R5(e, t, n, i, a, l) {
  return w(), F("div", {
    class: H(e.prefixCls)
  }, [
    K(e.$slots, "default")
  ], 2);
}
var we = /* @__PURE__ */ n0(j5, [["render", R5]]);
const Lt = Object.assign(k1, {
  Search: ye,
  Password: Ce,
  Group: we,
  install: (e, t) => {
    H0(e, t);
    const n = F0(t);
    e.component(n + k1.name, k1), e.component(n + we.name, we), e.component(n + ye.name, ye), e.component(n + Ce.name, Ce);
  }
});
var W5 = Object.defineProperty, L2 = Object.getOwnPropertySymbols, U5 = Object.prototype.hasOwnProperty, q5 = Object.prototype.propertyIsEnumerable, D2 = (e, t, n) => t in e ? W5(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, y1 = (e, t) => {
  for (var n in t || (t = {}))
    U5.call(t, n) && D2(e, n, t[n]);
  if (L2)
    for (var n of L2(t))
      q5.call(t, n) && D2(e, n, t[n]);
  return e;
};
const K5 = () => {
  const { height: e, width: t } = Pt();
  return {
    width: Math.min(t, window.innerWidth),
    height: Math.min(e, window.innerHeight)
  };
}, I2 = (e, t) => {
  var n, i;
  const a = e.getBoundingClientRect();
  return {
    top: a.top,
    bottom: a.bottom,
    left: a.left,
    right: a.right,
    scrollTop: a.top - t.top,
    scrollBottom: a.bottom - t.top,
    scrollLeft: a.left - t.left,
    scrollRight: a.right - t.left,
    width: (n = e.offsetWidth) != null ? n : e.clientWidth,
    height: (i = e.offsetHeight) != null ? i : e.clientHeight
  };
}, G5 = (e) => {
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
}, B1 = (e, t) => {
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
}, Y5 = (e, t, {
  containerRect: n,
  triggerRect: i,
  popupRect: a,
  offset: l,
  translate: o
}) => {
  const s = G5(e), r = K5(), c = {
    top: n.top + t.top,
    bottom: r.height - (n.top + t.top + a.height),
    left: n.left + t.left,
    right: r.width - (n.left + t.left + a.width)
  };
  let u = e;
  if (s === "top" && c.top < 0)
    if (i.top > a.height)
      t.top = -n.top;
    else {
      const m = g1("bottom", i, a, {
        offset: l,
        translate: o
      });
      r.height - (n.top + m.top + a.height) > 0 && (u = B1(e, "bottom"), t.top = m.top);
    }
  if (s === "bottom" && c.bottom < 0)
    if (r.height - i.bottom > a.height)
      t.top = -n.top + (r.height - a.height);
    else {
      const m = g1("top", i, a, {
        offset: l,
        translate: o
      });
      n.top + m.top > 0 && (u = B1(e, "top"), t.top = m.top);
    }
  if (s === "left" && c.left < 0)
    if (i.left > a.width)
      t.left = -n.left;
    else {
      const m = g1("right", i, a, {
        offset: l,
        translate: o
      });
      r.width - (n.left + m.left + a.width) > 0 && (u = B1(e, "right"), t.left = m.left);
    }
  if (s === "right" && c.right < 0)
    if (r.width - i.right > a.width)
      t.left = -n.left + (r.width - a.width);
    else {
      const m = g1("left", i, a, {
        offset: l,
        translate: o
      });
      n.left + m.left > 0 && (u = B1(e, "left"), t.left = m.left);
    }
  return (s === "top" || s === "bottom") && (c.left < 0 ? t.left = -n.left : c.right < 0 && (t.left = -n.left + (r.width - a.width))), (s === "left" || s === "right") && (c.top < 0 ? t.top = -n.top : c.bottom < 0 && (t.top = -n.top + (r.height - a.height))), {
    popupPosition: t,
    position: u
  };
}, g1 = (e, t, n, {
  offset: i = 0,
  translate: a = [0, 0]
} = {}) => {
  var l;
  const o = (l = qe(a) ? a : a[e]) != null ? l : [0, 0];
  switch (e) {
    case "top":
      return {
        left: t.scrollLeft + Math.round(t.width / 2) - Math.round(n.width / 2) + o[0],
        top: t.scrollTop - n.height - i + o[1]
      };
    case "tl":
      return {
        left: t.scrollLeft + o[0],
        top: t.scrollTop - n.height - i + o[1]
      };
    case "tr":
      return {
        left: t.scrollRight - n.width + o[0],
        top: t.scrollTop - n.height - i + o[1]
      };
    case "bottom":
      return {
        left: t.scrollLeft + Math.round(t.width / 2) - Math.round(n.width / 2) + o[0],
        top: t.scrollBottom + i + o[1]
      };
    case "bl":
      return {
        left: t.scrollLeft + o[0],
        top: t.scrollBottom + i + o[1]
      };
    case "br":
      return {
        left: t.scrollRight - n.width + o[0],
        top: t.scrollBottom + i + o[1]
      };
    case "left":
      return {
        left: t.scrollLeft - n.width - i + o[0],
        top: t.scrollTop + Math.round(t.height / 2) - Math.round(n.height / 2) + o[1]
      };
    case "lt":
      return {
        left: t.scrollLeft - n.width - i + o[0],
        top: t.scrollTop + o[1]
      };
    case "lb":
      return {
        left: t.scrollLeft - n.width - i + o[0],
        top: t.scrollBottom - n.height + o[1]
      };
    case "right":
      return {
        left: t.scrollRight + i + o[0],
        top: t.scrollTop + Math.round(t.height / 2) - Math.round(n.height / 2) + o[1]
      };
    case "rt":
      return {
        left: t.scrollRight + i + o[0],
        top: t.scrollTop + o[1]
      };
    case "rb":
      return {
        left: t.scrollRight + i + o[0],
        top: t.scrollBottom - n.height + o[1]
      };
    default:
      return {
        left: 0,
        top: 0
      };
  }
}, X5 = (e) => {
  let t = "0";
  ["top", "bottom"].includes(e) ? t = "50%" : ["left", "lt", "lb", "tr", "br"].includes(e) && (t = "100%");
  let n = "0";
  return ["left", "right"].includes(e) ? n = "50%" : ["top", "tl", "tr", "lb", "rb"].includes(e) && (n = "100%"), `${t} ${n}`;
}, J5 = (e, t, n, i, {
  offset: a = 0,
  translate: l = [0, 0],
  customStyle: o = {},
  autoFitPosition: s = !1
} = {}) => {
  let r = e, c = g1(e, n, i, {
    offset: a,
    translate: l
  });
  if (s) {
    const m = Y5(e, c, {
      containerRect: t,
      popupRect: i,
      triggerRect: n,
      offset: a,
      translate: l
    });
    c = m.popupPosition, r = m.position;
  }
  return {
    style: y1({
      left: `${c.left}px`,
      top: `${c.top}px`
    }, o),
    position: r
  };
}, Q5 = (e, t, n, {
  customStyle: i = {}
}) => {
  if (["top", "tl", "tr", "bottom", "bl", "br"].includes(e)) {
    let l = Math.abs(t.scrollLeft + t.width / 2 - n.scrollLeft);
    return l > n.width - 8 && (t.width > n.width ? l = n.width / 2 : l = n.width - 8), ["top", "tl", "tr"].includes(e) ? y1({
      left: `${l}px`,
      bottom: "0",
      transform: "translate(-50%,50%) rotate(45deg)"
    }, i) : y1({
      left: `${l}px`,
      top: "0",
      transform: "translate(-50%,-50%) rotate(45deg)"
    }, i);
  }
  let a = Math.abs(t.scrollTop + t.height / 2 - n.scrollTop);
  return a > n.height - 8 && (t.height > n.height ? a = n.height / 2 : a = n.height - 8), ["left", "lt", "lb"].includes(e) ? y1({
    top: `${a}px`,
    right: "0",
    transform: "translate(50%,-50%) rotate(45deg)"
  }, i) : y1({
    top: `${a}px`,
    left: "0",
    transform: "translate(-50%,-50%) rotate(45deg)"
  }, i);
}, en = (e) => e.scrollHeight > e.offsetHeight || e.scrollWidth > e.offsetWidth, O2 = (e) => {
  var t;
  const n = [];
  let i = e;
  for (; i && i !== document.documentElement; )
    en(i) && n.push(i), i = (t = i.parentElement) != null ? t : void 0;
  return n;
}, Dt = () => {
  const e = {}, t = P(), n = () => {
    const i = $t(e.value);
    i !== t.value && (t.value = i);
  };
  return L0(() => n()), X1(() => n()), {
    children: e,
    firstElement: t
  };
};
var V2 = j({
  name: "ResizeObserver",
  props: {
    watchOnUpdated: Boolean
  },
  emits: [
    "resize"
  ],
  setup(e, { emit: t, slots: n }) {
    const { children: i, firstElement: a } = Dt();
    let l;
    const o = (r) => {
      r && (l = new wt((c) => {
        const u = c[0];
        t("resize", u);
      }), l.observe(r));
    }, s = () => {
      l && (l.disconnect(), l = null);
    };
    return b0(a, (r) => {
      l && s(), r && o(r);
    }), m1(() => {
      l && s();
    }), () => {
      var r;
      return i.value = (r = n.default) == null ? void 0 : r.call(n), i.value;
    };
  }
});
function tn(e, t) {
  const n = P(e[t]);
  return X1(() => {
    const i = e[t];
    n.value !== i && (n.value = i);
  }), n;
}
const z2 = Symbol("ArcoTrigger"), nn = 1e3, an = 5e3, ln = 1;
class on {
  constructor() {
    this.popupStack = {
      popup: /* @__PURE__ */ new Set(),
      dialog: /* @__PURE__ */ new Set(),
      message: /* @__PURE__ */ new Set()
    }, this.getNextZIndex = (t) => (t === "message" ? Array.from(this.popupStack.message).pop() || an : Array.from(this.popupStack.popup).pop() || nn) + ln, this.add = (t) => {
      const n = this.getNextZIndex(t);
      return this.popupStack[t].add(n), t === "dialog" && this.popupStack.popup.add(n), n;
    }, this.delete = (t, n) => {
      this.popupStack[n].delete(t), n === "dialog" && this.popupStack.popup.delete(t);
    }, this.isLastDialog = (t) => this.popupStack.dialog.size > 1 ? t === Array.from(this.popupStack.dialog).pop() : !0;
  }
}
const ke = new on();
function e2(e, {
  visible: t,
  runOnMounted: n
} = {}) {
  const i = P(0), a = () => {
    i.value = ke.add(e);
  }, l = () => {
    ke.delete(i.value, e);
  }, o = () => e === "dialog" ? ke.isLastDialog(i.value) : !1;
  return b0(() => t == null ? void 0 : t.value, (s) => {
    s ? a() : l();
  }, {
    immediate: !0
  }), n && (L0(() => {
    a();
  }), m1(() => {
    l();
  })), {
    zIndex: h4(i),
    open: a,
    close: l,
    isLastDialog: o
  };
}
const rn = ({
  elementRef: e,
  onResize: t
}) => {
  let n;
  return {
    createResizeObserver: () => {
      e.value && (n = new wt((l) => {
        const o = l[0];
        _0(t) && t(o);
      }), n.observe(e.value));
    },
    destroyResizeObserver: () => {
      n && (n.disconnect(), n = null);
    }
  };
};
var It = j({
  name: "ClientOnly",
  setup(e, {
    slots: t
  }) {
    const n = P(!1);
    return L0(() => n.value = !0), () => {
      var i;
      return n.value ? (i = t.default) == null ? void 0 : i.call(t) : null;
    };
  }
});
const Ot = ({
  popupContainer: e,
  visible: t,
  defaultContainer: n = "body",
  documentContainer: i
}) => {
  const a = P(e.value), l = P(), o = () => {
    const s = Fe(e.value), r = s ? e.value : n, c = s ?? (i ? document.documentElement : Fe(n));
    r !== a.value && (a.value = r), c !== l.value && (l.value = c);
  };
  return L0(() => o()), b0(t, (s) => {
    a.value !== e.value && s && o();
  }), {
    teleportContainer: a,
    containerRef: l
  };
};
var sn = Object.defineProperty, cn = Object.defineProperties, un = Object.getOwnPropertyDescriptors, F2 = Object.getOwnPropertySymbols, dn = Object.prototype.hasOwnProperty, mn = Object.prototype.propertyIsEnumerable, H2 = (e, t, n) => t in e ? sn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, pn = (e, t) => {
  for (var n in t || (t = {}))
    dn.call(t, n) && H2(e, n, t[n]);
  if (F2)
    for (var n of F2(t))
      mn.call(t, n) && H2(e, n, t[n]);
  return e;
}, vn = (e, t) => cn(e, un(t));
const hn = ["onClick", "onMouseenter", "onMouseleave", "onFocusin", "onFocusout", "onContextmenu"];
var Se = j({
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
      popupContainer: a
    } = T0(e), l = e0("trigger"), o = _(() => Je(i, hn)), s = l0(c1, void 0), r = _(() => [].concat(e.trigger)), c = /* @__PURE__ */ new Set(), u = l0(z2, void 0), {
      children: m,
      firstElement: h
    } = Dt(), f = P(), v = P(e.defaultPopupVisible), y = P(e.position), g = P({}), A = P({}), Z = P({}), N = P(), k = P({
      top: 0,
      left: 0
    });
    let I = null, C = null;
    const p = _(() => {
      var $;
      return ($ = e.popupVisible) != null ? $ : v.value;
    }), {
      teleportContainer: d,
      containerRef: b
    } = Ot({
      popupContainer: a,
      visible: p,
      documentContainer: !0
    }), {
      zIndex: S
    } = e2("popup", {
      visible: p
    });
    let L = 0, B = !1, U = !1;
    const v0 = () => {
      L && (window.clearTimeout(L), L = 0);
    }, d0 = ($) => {
      if (e.alignPoint) {
        const {
          pageX: z,
          pageY: m0
        } = $;
        k.value = {
          top: m0,
          left: z
        };
      }
    }, y0 = () => {
      if (!h.value || !f.value || !b.value)
        return;
      const $ = b.value.getBoundingClientRect(), z = e.alignPoint ? {
        top: k.value.top,
        bottom: k.value.top,
        left: k.value.left,
        right: k.value.left,
        scrollTop: k.value.top,
        scrollBottom: k.value.top,
        scrollLeft: k.value.left,
        scrollRight: k.value.left,
        width: 0,
        height: 0
      } : I2(h.value, $), m0 = () => I2(f.value, $), i1 = m0(), {
        style: q0,
        position: a1
      } = J5(e.position, $, z, i1, {
        offset: e.popupOffset,
        translate: e.popupTranslate,
        customStyle: e.popupStyle,
        autoFitPosition: e.autoFitPosition
      });
      e.autoFitTransformOrigin && (A.value = {
        transformOrigin: X5(a1)
      }), e.autoFitPopupMinWidth ? q0.minWidth = `${z.width}px` : e.autoFitPopupWidth && (q0.width = `${z.width}px`), y.value !== a1 && (y.value = a1), g.value = q0, e.showArrow && T1(() => {
        Z.value = Q5(a1, z, m0(), {
          customStyle: e.arrowStyle
        });
      });
    }, a0 = ($, z) => {
      if ($ === p.value && L === 0)
        return;
      const m0 = () => {
        v.value = $, t("update:popupVisible", $), t("popupVisibleChange", $), $ && T1(() => {
          y0();
        });
      };
      $ || (I = null, C = null), z ? (v0(), $ !== p.value && (L = window.setTimeout(m0, z))) : m0();
    }, R0 = ($) => {
      var z;
      (z = i.onClick) == null || z.call(i, $), !(e.disabled || p.value && !e.clickToClose) && (r.value.includes("click") ? (d0($), a0(!p.value)) : r.value.includes("contextMenu") && p.value && a0(!1));
    }, I0 = ($) => {
      var z;
      (z = i.onMouseenter) == null || z.call(i, $), !(e.disabled || !r.value.includes("hover")) && (d0($), a0(!0, e.mouseEnterDelay));
    }, k0 = ($) => {
      u == null || u.onMouseenter($), I0($);
    }, C0 = ($) => {
      var z;
      (z = i.onMouseleave) == null || z.call(i, $), !(e.disabled || !r.value.includes("hover")) && a0(!1, e.mouseLeaveDelay);
    }, O0 = ($) => {
      u == null || u.onMouseleave($), C0($);
    }, W0 = ($) => {
      var z;
      (z = i.onFocusin) == null || z.call(i, $), !(e.disabled || !r.value.includes("focus")) && a0(!0, e.focusDelay);
    }, U0 = ($) => {
      var z;
      (z = i.onFocusout) == null || z.call(i, $), !(e.disabled || !r.value.includes("focus")) && e.blurToClose && a0(!1);
    }, t0 = ($) => {
      var z;
      (z = i.onContextmenu) == null || z.call(i, $), !(e.disabled || !r.value.includes("contextMenu") || p.value && !e.clickToClose) && (d0($), a0(!p.value), $.preventDefault());
    };
    d1(z2, t1({
      onMouseenter: k0,
      onMouseleave: O0,
      addChildRef: ($) => {
        c.add($), u == null || u.addChildRef($);
      },
      removeChildRef: ($) => {
        c.delete($), u == null || u.removeChildRef($);
      }
    }));
    const w0 = () => {
      $1(document.documentElement, "mousedown", S0), B = !1;
    }, N0 = tn(n, "content"), f0 = _(() => {
      var $;
      return e.hideEmpty && f3(($ = N0.value) == null ? void 0 : $.call(N0));
    }), S0 = ($) => {
      var z, m0, i1;
      if (!((z = h.value) != null && z.contains($.target) || (m0 = f.value) != null && m0.contains($.target))) {
        for (const q0 of c)
          if ((i1 = q0.value) != null && i1.contains($.target))
            return;
        w0(), a0(!1);
      }
    }, ae = ($, z) => {
      const [m0, i1] = $, {
        scrollTop: q0,
        scrollLeft: a1
      } = z;
      return Math.abs(q0 - m0) >= e.scrollToCloseDistance || Math.abs(a1 - i1) >= e.scrollToCloseDistance;
    }, O = x2(($) => {
      if (p.value)
        if (e.scrollToClose || s != null && s.scrollToClose) {
          const z = $.target;
          I || (I = [z.scrollTop, z.scrollLeft]), ae(I, z) ? a0(!1) : y0();
        } else
          y0();
    }), G = () => {
      $1(window, "scroll", i0), U = !1;
    }, i0 = x2(($) => {
      const z = $.target.documentElement;
      C || (C = [z.scrollTop, z.scrollLeft]), ae(C, z) && (a0(!1), G());
    }), g0 = () => {
      p.value && y0();
    }, h1 = () => {
      g0(), t("resize");
    }, le = ($) => {
      e.preventFocus && $.preventDefault();
    };
    u == null || u.addChildRef(f);
    const oe = _(() => p.value ? e.openedClass : void 0);
    let $0;
    b0(p, ($) => {
      if (e.clickOutsideToClose && (!$ && B ? w0() : $ && !B && (J0(document.documentElement, "mousedown", S0), B = !0)), (e.scrollToClose || s != null && s.scrollToClose) && (J0(window, "scroll", i0), U = !0), e.updateAtScroll || s != null && s.updateAtScroll) {
        if ($) {
          $0 = O2(h.value);
          for (const z of $0)
            z.addEventListener("scroll", O);
        } else if ($0) {
          for (const z of $0)
            z.removeEventListener("scroll", O);
          $0 = void 0;
        }
      }
      $ && (re.value = !0);
    }), b0(() => [e.autoFitPopupWidth, e.autoFitPopupMinWidth], () => {
      p.value && y0();
    });
    const {
      createResizeObserver: r4,
      destroyResizeObserver: s4
    } = rn({
      elementRef: b,
      onResize: g0
    });
    L0(() => {
      if (r4(), p.value && (y0(), e.clickOutsideToClose && !B && (J0(document.documentElement, "mousedown", S0), B = !0), e.updateAtScroll || s != null && s.updateAtScroll)) {
        $0 = O2(h.value);
        for (const $ of $0)
          $.addEventListener("scroll", O);
      }
    }), X1(() => {
      p.value && y0();
    }), f4(() => {
      a0(!1);
    }), m1(() => {
      if (u == null || u.removeChildRef(f), s4(), B && w0(), U && G(), $0) {
        for (const $ of $0)
          $.removeEventListener("scroll", O);
        $0 = void 0;
      }
    });
    const re = P(p.value), A1 = P(!1), m2 = () => {
      A1.value = !0;
    }, c4 = () => {
      A1.value = !1, p.value && t("show");
    }, u4 = () => {
      A1.value = !1, p.value || (re.value = !1, t("hide"));
    };
    return () => {
      var $, z;
      return m.value = (z = ($ = n.default) == null ? void 0 : $.call(n)) != null ? z : [], _t(m.value, {
        class: oe.value,
        onClick: R0,
        onMouseenter: I0,
        onMouseleave: C0,
        onFocusin: W0,
        onFocusout: U0,
        onContextmenu: t0
      }), E(z0, null, [e.autoFixPosition ? E(V2, {
        onResize: h1
      }, {
        default: () => [m.value]
      }) : m.value, E(It, null, {
        default: () => [E(mt, {
          to: d.value,
          disabled: !e.renderToBody
        }, {
          default: () => [(!e.unmountOnClose || p.value || re.value) && !f0.value && E(V2, {
            onResize: g0
          }, {
            default: () => [E("div", A0({
              ref: f,
              class: [`${l}-popup`, `${l}-position-${y.value}`],
              style: vn(pn({}, g.value), {
                zIndex: S.value,
                pointerEvents: A1.value ? "none" : "auto"
              }),
              "trigger-placement": y.value,
              onMouseenter: k0,
              onMouseleave: O0,
              onMousedown: le
            }, o.value), [E(R1, {
              name: e.animationName,
              duration: e.duration,
              appear: !0,
              onBeforeEnter: m2,
              onAfterEnter: c4,
              onBeforeLeave: m2,
              onAfterLeave: u4
            }, {
              default: () => {
                var m0;
                return [E1(E("div", {
                  class: `${l}-popup-wrapper`,
                  style: A.value
                }, [E("div", {
                  class: [`${l}-content`, e.contentClass],
                  style: e.contentStyle
                }, [(m0 = n.content) == null ? void 0 : m0.call(n)]), e.showArrow && E("div", {
                  ref: N,
                  class: [`${l}-arrow`, e.arrowClass],
                  style: Z.value
                }, null)]), [[C1, p.value]])];
              }
            })])]
          })]
        })]
      })]);
    };
  }
});
const fn = Object.assign(Se, {
  install: (e, t) => {
    H0(e, t);
    const n = F0(t);
    e.component(n + Se.name, Se);
  }
}), bn = {
  ENTER: "Enter",
  ESC: "Escape",
  BACKSPACE: "Backspace",
  TAB: "Tab",
  SPACE: " ",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight"
}, yn = j({
  name: "Popover",
  components: {
    Trigger: fn
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
    const n = e0("popover"), i = P(e.defaultPopupVisible), a = _(() => {
      var r;
      return (r = e.popupVisible) != null ? r : i.value;
    }), l = (r) => {
      i.value = r, t("update:popupVisible", r), t("popupVisibleChange", r);
    }, o = _(() => [
      `${n}-popup-content`,
      e.contentClass
    ]), s = _(() => [
      `${n}-popup-arrow`,
      e.arrowClass
    ]);
    return {
      prefixCls: n,
      computedPopupVisible: a,
      contentCls: o,
      arrowCls: s,
      handlePopupVisibleChange: l
    };
  }
});
function gn(e, t, n, i, a, l) {
  const o = X("trigger");
  return w(), V(o, {
    class: H(e.prefixCls),
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
    content: T(() => [
      R("div", {
        class: H(`${e.prefixCls}-title`)
      }, [
        K(e.$slots, "title", {}, () => [
          Q(q(e.title), 1)
        ])
      ], 2),
      R("div", {
        class: H(`${e.prefixCls}-content`)
      }, [
        K(e.$slots, "content", {}, () => [
          Q(q(e.content), 1)
        ])
      ], 2)
    ]),
    default: T(() => [
      K(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "trigger", "position", "popup-visible", "content-class", "content-style", "arrow-class", "arrow-style", "popup-container", "onPopupVisibleChange"]);
}
var _e = /* @__PURE__ */ n0(yn, [["render", gn]]);
const j0 = Object.assign(_e, {
  install: (e, t) => {
    H0(e, t);
    const n = F0(t);
    e.component(n + _e.name, _e);
  }
}), Vt = Symbol("collapseCtx"), En = j({
  name: "Collapse",
  props: {
    activeKey: {
      type: Array,
      default: void 0
    },
    defaultActiveKey: {
      type: Array,
      default: () => []
    },
    accordion: {
      type: Boolean,
      default: !1
    },
    showExpandIcon: {
      type: Boolean,
      default: void 0
    },
    expandIconPosition: {
      type: String,
      default: "left"
    },
    bordered: {
      type: Boolean,
      default: !0
    },
    destroyOnHide: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    "update:activeKey": (e) => !0,
    change: (e, t) => !0
  },
  setup(e, { emit: t, slots: n }) {
    const { expandIconPosition: i, destroyOnHide: a, showExpandIcon: l } = T0(e), o = e0("collapse"), s = P(e.defaultActiveKey), r = _(() => {
      var m;
      const h = (m = e.activeKey) != null ? m : s.value;
      return qe(h) ? h : [h];
    });
    d1(Vt, t1({
      activeKeys: r,
      slots: n,
      showExpandIcon: l,
      expandIconPosition: i,
      destroyOnHide: a,
      handleClick: (m, h) => {
        let f = [];
        if (e.accordion)
          r.value.includes(m) || (f = [m]), s.value = f;
        else {
          f = [...r.value];
          const v = f.indexOf(m);
          v > -1 ? f.splice(v, 1) : e.accordion ? f = [m] : f.push(m), s.value = f;
        }
        t("update:activeKey", f), t("change", f, h);
      }
    }));
    const u = _(() => [
      o,
      {
        [`${o}-borderless`]: !e.bordered
      }
    ]);
    return {
      prefixCls: o,
      cls: u
    };
  }
});
function Cn(e, t, n, i, a, l) {
  return w(), F("div", {
    class: H(e.cls)
  }, [
    K(e.$slots, "default")
  ], 2);
}
var Te = /* @__PURE__ */ n0(En, [["render", Cn]]);
const wn = j({
  name: "IconCaretRight",
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
    const n = e0("icon"), i = _(() => [n, `${n}-caret-right`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), kn = ["stroke-width", "stroke-linecap", "stroke-linejoin"], Sn = /* @__PURE__ */ R("path", {
  d: "M34.829 23.063c.6.48.6 1.394 0 1.874L17.949 38.44c-.785.629-1.949.07-1.949-.937V10.497c0-1.007 1.164-1.566 1.95-.937l16.879 13.503Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), _n = [
  Sn
];
function Tn(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, _n, 14, kn);
}
var xe = /* @__PURE__ */ n0(wn, [["render", Tn]]);
const xn = Object.assign(xe, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + xe.name, xe);
  }
}), $n = j({
  name: "IconCaretLeft",
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
    const n = e0("icon"), i = _(() => [n, `${n}-caret-left`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), Mn = ["stroke-width", "stroke-linecap", "stroke-linejoin"], Pn = /* @__PURE__ */ R("path", {
  d: "M13.171 24.937a1.2 1.2 0 0 1 0-1.874L30.051 9.56c.785-.629 1.949-.07 1.949.937v27.006c0 1.006-1.164 1.566-1.95.937L13.171 24.937Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), An = [
  Pn
];
function Zn(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, An, 14, Mn);
}
var $e = /* @__PURE__ */ n0($n, [["render", Zn]]);
const Bn = Object.assign($e, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + $e.name, $e);
  }
});
var O1 = j({
  name: "CollapseItem",
  components: {
    IconHover: p1,
    IconCaretRight: xn,
    IconCaretLeft: Bn
  },
  props: {
    header: String,
    disabled: {
      type: Boolean,
      default: !1
    },
    showExpandIcon: {
      type: Boolean,
      default: !0
    },
    destroyOnHide: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, {
    slots: t
  }) {
    var n;
    const i = Ue(), a = e0("collapse-item"), l = l0(Vt, {}), o = i && p0(i == null ? void 0 : i.vnode.key) ? i.vnode.key : String((n = i == null ? void 0 : i.vnode.key) != null ? n : ""), s = _(() => {
      var k;
      return (k = l.activeKeys) == null ? void 0 : k.includes(o);
    }), r = _(() => l.destroyOnHide || e.destroyOnHide), c = _(() => {
      var k;
      return (k = l == null ? void 0 : l.showExpandIcon) != null ? k : e.showExpandIcon;
    }), u = P(r.value ? s.value : !0), m = _(() => {
      var k;
      return (k = l == null ? void 0 : l.expandIconPosition) != null ? k : "left";
    }), h = (k) => {
      var I;
      e.disabled || (I = l.handleClick) == null || I.call(l, o, k);
    };
    b0(s, (k) => {
      k && !u.value && (u.value = !0);
    });
    const f = {
      onEnter: (k) => {
        k.style.height = `${k.scrollHeight}px`;
      },
      onAfterEnter: (k) => {
        k.style.height = "auto";
      },
      onBeforeLeave: (k) => {
        k.style.height = `${k.scrollHeight}px`;
      },
      onLeave: (k) => {
        k.style.height = "0";
      },
      onAfterLeave: () => {
        r.value && (u.value = !1);
      }
    }, v = _(() => [a, {
      [`${a}-active`]: s.value
    }]), y = _(() => [`${a}-header`, `${a}-header-${l == null ? void 0 : l.expandIconPosition}`, {
      [`${a}-header-disabled`]: e.disabled
    }]), g = _(() => [{
      [`${a}-icon-right`]: (l == null ? void 0 : l.expandIconPosition) === "right"
    }]), A = _(() => [`${a}-content`, {
      [`${a}-content-expend`]: s.value
    }]), Z = () => m.value === "right" ? E(X("icon-caret-left"), {
      class: `${a}-expand-icon`
    }, null) : E(X("icon-caret-right"), {
      class: `${a}-expand-icon`
    }, null), N = () => c.value && E(X("icon-hover"), {
      prefix: a,
      class: g.value,
      disabled: e.disabled
    }, {
      default: () => {
        var k, I, C, p;
        return [(p = (C = (I = t["expand-icon"]) != null ? I : (k = l == null ? void 0 : l.slots) == null ? void 0 : k["expand-icon"]) == null ? void 0 : C({
          active: s.value,
          disabled: e.disabled,
          position: m.value
        })) != null ? p : Z()];
      }
    });
    return () => {
      var k, I, C;
      return E("div", {
        class: v.value
      }, [E("div", {
        role: "button",
        "aria-disabled": e.disabled,
        "aria-expanded": s.value,
        tabindex: "0",
        class: y.value,
        onClick: h
      }, [N(), E("div", {
        class: `${a}-header-title`
      }, [(I = (k = t.header) == null ? void 0 : k.call(t)) != null ? I : e.header]), t.extra && E("div", {
        class: `${a}-header-extra`
      }, [(C = t.extra) == null ? void 0 : C.call(t)])]), E(R1, A0({
        name: "collapse-slider"
      }, f), {
        default: () => {
          var p;
          return [E1(E("div", {
            role: "region",
            class: A.value
          }, [u.value && E("div", {
            ref: "contentBoxRef",
            class: `${a}-content-box`
          }, [(p = t.default) == null ? void 0 : p.call(t)])]), [[C1, s.value]])];
        }
      })]);
    };
  }
});
const Nn = Object.assign(Te, {
  Item: O1,
  install: (e, t) => {
    H0(e, t);
    const n = F0(t);
    e.component(n + Te.name, Te), e.component(n + O1.name, O1);
  }
}), Ln = j({
  name: "ConfigProvider",
  props: {
    prefixCls: {
      type: String,
      default: "arco"
    },
    locale: {
      type: Object
    },
    size: {
      type: String
    },
    global: {
      type: Boolean,
      default: !1
    },
    updateAtScroll: {
      type: Boolean,
      default: !1
    },
    scrollToClose: {
      type: Boolean,
      default: !1
    },
    exchangeTime: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, { slots: t }) {
    const {
      prefixCls: n,
      locale: i,
      size: a,
      updateAtScroll: l,
      scrollToClose: o,
      exchangeTime: s
    } = T0(e), r = t1({
      slots: t,
      prefixCls: n,
      locale: i,
      size: a,
      updateAtScroll: l,
      scrollToClose: o,
      exchangeTime: s
    });
    if (e.global) {
      const c = Ue();
      c && c.appContext.app.provide(c1, r);
    } else
      d1(c1, r);
  }
});
function Dn(e, t, n, i, a, l) {
  return K(e.$slots, "default");
}
var Me = /* @__PURE__ */ n0(Ln, [["render", Dn]]);
const In = Object.assign(Me, {
  install: (e, t) => {
    H0(e, t);
    const n = F0(t);
    e.component(n + Me.name, Me);
  }
}), On = (e) => {
  const t = P(!1), n = {
    overflow: "",
    width: "",
    boxSizing: ""
  };
  return {
    setOverflowHidden: () => {
      if (e.value) {
        const l = e.value;
        if (!t.value && l.style.overflow !== "hidden") {
          const o = C3(l);
          (o > 0 || E3(l)) && (n.overflow = l.style.overflow, n.width = l.style.width, n.boxSizing = l.style.boxSizing, l.style.overflow = "hidden", l.style.width = `${l.offsetWidth - o}px`, l.style.boxSizing = "border-box", t.value = !0);
        }
      }
    },
    resetOverflow: () => {
      if (e.value && t.value) {
        const l = e.value;
        l.style.overflow = n.overflow, l.style.width = n.width, l.style.boxSizing = n.boxSizing, t.value = !1;
      }
    }
  };
}, Vn = j({
  name: "Message",
  components: {
    AIconHover: p1,
    IconInfoCircleFill: Zt,
    IconCheckCircleFill: ee,
    IconExclamationCircleFill: te,
    IconCloseCircleFill: Xe,
    IconClose: Ye,
    IconLoading: P1
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
    const n = e0("message");
    let i = 0;
    const a = () => {
      t("close");
    }, l = () => {
      e.duration > 0 && (i = window.setTimeout(a, e.duration));
    }, o = () => {
      i && (window.clearTimeout(i), i = 0);
    };
    return L0(() => {
      l();
    }), X1(() => {
      e.resetOnUpdate && (o(), l());
    }), b4(() => {
      o();
    }), {
      handleMouseEnter: () => {
        e.resetOnHover && o();
      },
      handleMouseLeave: () => {
        e.resetOnHover && l();
      },
      prefixCls: n,
      handleClose: a
    };
  }
});
function zn(e, t, n, i, a, l) {
  const o = X("icon-info-circle-fill"), s = X("icon-check-circle-fill"), r = X("icon-exclamation-circle-fill"), c = X("icon-close-circle-fill"), u = X("icon-loading"), m = X("icon-close"), h = X("a-icon-hover");
  return w(), F("li", {
    role: "alert",
    class: H([
      e.prefixCls,
      `${e.prefixCls}-${e.type}`,
      { [`${e.prefixCls}-closable`]: e.closable }
    ]),
    onMouseenter: t[1] || (t[1] = (...f) => e.handleMouseEnter && e.handleMouseEnter(...f)),
    onMouseleave: t[2] || (t[2] = (...f) => e.handleMouseLeave && e.handleMouseLeave(...f))
  }, [
    e.showIcon && !(e.type === "normal" && !e.$slots.icon) ? (w(), F("span", {
      key: 0,
      class: H(`${e.prefixCls}-icon`)
    }, [
      K(e.$slots, "icon", {}, () => [
        e.type === "info" ? (w(), V(o, { key: 0 })) : e.type === "success" ? (w(), V(s, { key: 1 })) : e.type === "warning" ? (w(), V(r, { key: 2 })) : e.type === "error" ? (w(), V(c, { key: 3 })) : e.type === "loading" ? (w(), V(u, { key: 4 })) : Y("v-if", !0)
      ])
    ], 2)) : Y("v-if", !0),
    R("span", {
      class: H(`${e.prefixCls}-content`)
    }, [
      K(e.$slots, "default")
    ], 2),
    e.closable ? (w(), F("span", {
      key: 1,
      class: H(`${e.prefixCls}-close-btn`),
      onClick: t[0] || (t[0] = (...f) => e.handleClose && e.handleClose(...f))
    }, [
      E(h, null, {
        default: T(() => [
          E(m)
        ]),
        _: 1
      })
    ], 2)) : Y("v-if", !0)
  ], 34);
}
var Fn = /* @__PURE__ */ n0(Vn, [["render", zn]]);
function Hn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !g4(e);
}
var jn = j({
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
    const n = e0("message-list"), {
      zIndex: i
    } = e2("message", {
      runOnMounted: !0
    });
    return () => {
      let a;
      return E(y4, {
        class: [n, `${n}-${e.position}`],
        name: "fade-message",
        tag: "ul",
        style: {
          zIndex: i.value
        },
        onAfterLeave: () => t.emit("afterClose")
      }, Hn(a = e.messages.map((l) => {
        const o = {
          default: w1(l.content),
          icon: w1(l.icon)
        };
        return E(Fn, {
          key: l.id,
          type: l.type,
          duration: l.duration,
          closable: l.closable,
          resetOnUpdate: l.resetOnUpdate,
          resetOnHover: l.resetOnHover,
          onClose: () => t.emit("close", l.id)
        }, o);
      })) ? a : {
        default: () => [a]
      });
    };
  }
}), Rn = Object.defineProperty, Wn = Object.defineProperties, Un = Object.getOwnPropertyDescriptors, j2 = Object.getOwnPropertySymbols, qn = Object.prototype.hasOwnProperty, Kn = Object.prototype.propertyIsEnumerable, R2 = (e, t, n) => t in e ? Rn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, K1 = (e, t) => {
  for (var n in t || (t = {}))
    qn.call(t, n) && R2(e, n, t[n]);
  if (j2)
    for (var n of j2(t))
      Kn.call(t, n) && R2(e, n, t[n]);
  return e;
}, zt = (e, t) => Wn(e, Un(t));
class Gn {
  constructor(t, n) {
    this.messageCount = 0, this.add = (l) => {
      var o;
      this.messageCount++;
      const s = (o = l.id) != null ? o : `__arco_message_${this.messageCount}`;
      if (this.messageIds.has(s))
        return this.update(s, l);
      const r = t1(K1({ id: s }, l));
      return this.messages.value.push(r), this.messageIds.add(s), {
        close: () => this.remove(s)
      };
    }, this.update = (l, o) => {
      for (let s = 0; s < this.messages.value.length; s++)
        if (this.messages.value[s].id === l) {
          const r = !l1(o.duration);
          Object.assign(this.messages.value[s], zt(K1({}, o), { id: l, resetOnUpdate: r }));
          break;
        }
      return {
        close: () => this.remove(l)
      };
    }, this.remove = (l) => {
      for (let o = 0; o < this.messages.value.length; o++) {
        const s = this.messages.value[o];
        if (s.id === l) {
          _0(s.onClose) && s.onClose(l), this.messages.value.splice(o, 1), this.messageIds.delete(l);
          break;
        }
      }
    }, this.clear = () => {
      this.messages.value.splice(0);
    }, this.destroy = () => {
      this.messages.value.length === 0 && this.container && (W1(null, this.container), document.body.removeChild(this.container), this.container = null, o1[this.position] = void 0);
    };
    const { position: i = "top" } = t;
    this.container = At("message"), this.messageIds = /* @__PURE__ */ new Set(), this.messages = P([]), this.position = i;
    const a = E(jn, {
      messages: this.messages.value,
      position: i,
      onClose: this.remove,
      onAfterClose: this.destroy
    });
    (n ?? He._context) && (a.appContext = n ?? He._context), W1(a, this.container), document.body.appendChild(this.container);
  }
}
const o1 = {}, Ft = [...Bt, "loading", "normal"], V1 = Ft.reduce((e, t) => (e[t] = (n, i) => {
  J1(n) && (n = { content: n });
  const a = K1({ type: t }, n), { position: l = "top" } = a;
  return o1[l] || (o1[l] = new Gn(a, i)), o1[l].add(a);
}, e), {});
V1.clear = (e) => {
  var t;
  e ? (t = o1[e]) == null || t.clear() : Object.values(o1).forEach((n) => n == null ? void 0 : n.clear());
};
const He = zt(K1({}, V1), {
  install: (e) => {
    const t = {
      clear: V1.clear
    };
    for (const n of Ft)
      t[n] = (i, a = e._context) => V1[n](i, a);
    e.config.globalProperties.$message = t;
  },
  _context: null
}), Yn = ({
  modalRef: e,
  wrapperRef: t,
  draggable: n,
  alignCenter: i
}) => {
  const a = P(!1), l = P([0, 0]), o = P([0, 0]), s = P(), r = P([0, 0]), c = P([0, 0]), u = () => {
    var v, y, g;
    if (t.value && e.value) {
      const { top: A, left: Z } = t.value.getBoundingClientRect(), { clientWidth: N, clientHeight: k } = t.value, { top: I, left: C, width: p, height: d } = e.value.getBoundingClientRect(), b = i.value ? 0 : (v = e.value) == null ? void 0 : v.offsetTop, S = C - Z, L = I - A - b;
      (S !== ((y = o.value) == null ? void 0 : y[0]) || L !== ((g = o.value) == null ? void 0 : g[1])) && (o.value = [S, L]);
      const B = N > p ? N - p : 0, U = k > d ? k - d - b : 0;
      (B !== c.value[0] || U !== c.value[1]) && (c.value = [B, U]), b && (r.value = [0, 0 - b]);
    }
  }, m = (v) => {
    n.value && (v.preventDefault(), a.value = !0, u(), l.value = [v.x, v.y], J0(window, "mousemove", h), J0(window, "mouseup", f), J0(window, "contextmenu", f));
  }, h = (v) => {
    if (a.value) {
      const y = v.x - l.value[0], g = v.y - l.value[1];
      let A = o.value[0] + y, Z = o.value[1] + g;
      A < r.value[0] && (A = r.value[0]), A > c.value[0] && (A = c.value[0]), Z < r.value[1] && (Z = r.value[1]), Z > c.value[1] && (Z = c.value[1]), s.value = [A, Z];
    }
  }, f = () => {
    a.value = !1, $1(window, "mousemove", h), $1(window, "mouseup", f);
  };
  return {
    position: s,
    handleMoveDown: m
  };
};
var Xn = Object.defineProperty, W2 = Object.getOwnPropertySymbols, Jn = Object.prototype.hasOwnProperty, Qn = Object.prototype.propertyIsEnumerable, U2 = (e, t, n) => t in e ? Xn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, e6 = (e, t) => {
  for (var n in t || (t = {}))
    Jn.call(t, n) && U2(e, n, t[n]);
  if (W2)
    for (var n of W2(t))
      Qn.call(t, n) && U2(e, n, t[n]);
  return e;
}, t6 = j({
  name: "Modal",
  components: {
    ClientOnly: It,
    ArcoButton: D0,
    IconHover: p1,
    IconClose: Ye,
    IconInfoCircleFill: Zt,
    IconCheckCircleFill: ee,
    IconExclamationCircleFill: te,
    IconCloseCircleFill: Xe
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
      alignCenter: a
    } = T0(e), l = e0("modal"), {
      t: o
    } = H4(), s = P(), r = P(), c = P(e.defaultVisible), u = _(() => {
      var t0;
      return (t0 = e.visible) != null ? t0 : c.value;
    }), m = P(!1), h = _(() => e.okLoading || m.value), f = _(() => e.draggable && !e.fullscreen), {
      teleportContainer: v,
      containerRef: y
    } = Ot({
      popupContainer: i,
      visible: u
    }), g = P(u.value), A = _(() => e.okText || o("modal.okText")), Z = _(() => e.cancelText || o("modal.cancelText")), {
      zIndex: N,
      isLastDialog: k
    } = e2("dialog", {
      visible: u
    });
    let I = !1;
    const C = (t0) => {
      e.escToClose && t0.key === bn.ESC && k() && v0(t0);
    }, p = () => {
      e.escToClose && !I && (I = !0, J0(document.documentElement, "keydown", C));
    }, d = () => {
      I = !1, $1(document.documentElement, "keydown", C);
    };
    let b = 0;
    const {
      position: S,
      handleMoveDown: L
    } = Yn({
      wrapperRef: s,
      modalRef: r,
      draggable: f,
      alignCenter: a
    }), B = () => {
      b++, m.value && (m.value = !1), c.value = !1, t("update:visible", !1);
    }, U = async (t0) => {
      const h0 = b, B0 = await new Promise(async (w0) => {
        var N0;
        if (_0(e.onBeforeOk)) {
          let f0 = e.onBeforeOk((S0 = !0) => w0(S0));
          if ((E2(f0) || !g2(f0)) && (m.value = !0), E2(f0))
            try {
              f0 = (N0 = await f0) != null ? N0 : !0;
            } catch {
              f0 = !1;
            }
          g2(f0) && w0(f0);
        } else
          w0(!0);
      });
      h0 === b && (B0 ? (t("ok", t0), B()) : m.value && (m.value = !1));
    }, v0 = (t0) => {
      var h0;
      let B0 = !0;
      _0(e.onBeforeCancel) && (B0 = (h0 = e.onBeforeCancel()) != null ? h0 : !1), B0 && (t("cancel", t0), B());
    }, d0 = P(!1), y0 = (t0) => {
      t0.target === s.value && (d0.value = !0);
    }, a0 = (t0) => {
      e.mask && e.maskClosable && d0.value && v0(t0);
    }, R0 = () => {
      u.value && (!y3(s.value, document.activeElement) && document.activeElement instanceof HTMLElement && document.activeElement.blur(), t("open"));
    }, I0 = () => {
      u.value || (f.value && (S.value = void 0), g.value = !1, C0(), t("close"));
    }, {
      setOverflowHidden: k0,
      resetOverflow: C0
    } = On(y);
    L0(() => {
      y.value = Fe(e.popupContainer), u.value && (k0(), e.escToClose && p());
    }), m1(() => {
      C0(), d();
    }), b0(u, (t0) => {
      c.value !== t0 && (c.value = t0), t0 ? (t("beforeOpen"), g.value = !0, d0.value = !1, k0(), p()) : (t("beforeClose"), d());
    }), b0(n, () => {
      S.value && (S.value = void 0);
    });
    const O0 = _(() => [`${l}-wrapper`, {
      [`${l}-wrapper-align-center`]: e.alignCenter && !e.fullscreen,
      [`${l}-wrapper-moved`]: !!S.value
    }]), W0 = _(() => [`${l}`, e.modalClass, {
      [`${l}-simple`]: e.simple,
      [`${l}-draggable`]: f.value,
      [`${l}-fullscreen`]: e.fullscreen
    }]), U0 = _(() => {
      var t0;
      const h0 = e6({}, (t0 = e.modalStyle) != null ? t0 : {});
      return e.width && !e.fullscreen && (h0.width = p0(e.width) ? `${e.width}px` : e.width), !e.alignCenter && e.top && (h0.top = p0(e.top) ? `${e.top}px` : e.top), S.value && (h0.transform = `translate(${S.value[0]}px, ${S.value[1]}px)`), h0;
    });
    return {
      prefixCls: l,
      mounted: g,
      computedVisible: u,
      containerRef: y,
      wrapperRef: s,
      mergedModalStyle: U0,
      okDisplayText: A,
      cancelDisplayText: Z,
      zIndex: N,
      handleOk: U,
      handleCancel: v0,
      handleMaskClick: a0,
      handleMaskMouseDown: y0,
      handleOpen: R0,
      handleClose: I0,
      mergedOkLoading: h,
      modalRef: r,
      wrapperCls: O0,
      modalCls: W0,
      teleportContainer: v,
      handleMoveDown: L
    };
  }
});
function n6(e, t, n, i, a, l) {
  const o = X("icon-info-circle-fill"), s = X("icon-check-circle-fill"), r = X("icon-exclamation-circle-fill"), c = X("icon-close-circle-fill"), u = X("icon-close"), m = X("icon-hover"), h = X("arco-button"), f = X("client-only");
  return w(), V(f, null, {
    default: T(() => [
      (w(), V(mt, {
        to: e.teleportContainer,
        disabled: !e.renderToBody
      }, [
        !e.unmountOnClose || e.computedVisible || e.mounted ? E1((w(), F("div", A0({
          key: 0,
          class: `${e.prefixCls}-container`,
          style: { zIndex: e.zIndex }
        }, e.$attrs), [
          E(R1, {
            name: e.maskAnimationName,
            appear: ""
          }, {
            default: T(() => [
              e.mask ? E1((w(), F("div", {
                key: 0,
                ref: "maskRef",
                class: H(`${e.prefixCls}-mask`),
                style: s0(e.maskStyle)
              }, null, 6)), [
                [C1, e.computedVisible]
              ]) : Y("v-if", !0)
            ]),
            _: 1
          }, 8, ["name"]),
          R("div", {
            ref: "wrapperRef",
            class: H(e.wrapperCls),
            onClick: t[2] || (t[2] = j1((...v) => e.handleMaskClick && e.handleMaskClick(...v), ["self"])),
            onMousedown: t[3] || (t[3] = j1((...v) => e.handleMaskMouseDown && e.handleMaskMouseDown(...v), ["self"]))
          }, [
            E(R1, {
              name: e.modalAnimationName,
              appear: "",
              onAfterEnter: e.handleOpen,
              onAfterLeave: e.handleClose
            }, {
              default: T(() => [
                E1(R("div", {
                  ref: "modalRef",
                  class: H(e.modalCls),
                  style: s0(e.mergedModalStyle)
                }, [
                  !e.hideTitle && (e.$slots.title || e.title || e.closable) ? (w(), F("div", {
                    key: 0,
                    class: H(`${e.prefixCls}-header`),
                    onMousedown: t[1] || (t[1] = (...v) => e.handleMoveDown && e.handleMoveDown(...v))
                  }, [
                    e.$slots.title || e.title ? (w(), F("div", {
                      key: 0,
                      class: H([
                        `${e.prefixCls}-title`,
                        `${e.prefixCls}-title-align-${e.titleAlign}`
                      ])
                    }, [
                      e.messageType ? (w(), F("div", {
                        key: 0,
                        class: H(`${e.prefixCls}-title-icon`)
                      }, [
                        e.messageType === "info" ? (w(), V(o, { key: 0 })) : Y("v-if", !0),
                        e.messageType === "success" ? (w(), V(s, { key: 1 })) : Y("v-if", !0),
                        e.messageType === "warning" ? (w(), V(r, { key: 2 })) : Y("v-if", !0),
                        e.messageType === "error" ? (w(), V(c, { key: 3 })) : Y("v-if", !0)
                      ], 2)) : Y("v-if", !0),
                      K(e.$slots, "title", {}, () => [
                        Q(q(e.title), 1)
                      ])
                    ], 2)) : Y("v-if", !0),
                    !e.simple && e.closable ? (w(), F("div", {
                      key: 1,
                      tabindex: "-1",
                      role: "button",
                      "aria-label": "Close",
                      class: H(`${e.prefixCls}-close-btn`),
                      onClick: t[0] || (t[0] = (...v) => e.handleCancel && e.handleCancel(...v))
                    }, [
                      E(m, null, {
                        default: T(() => [
                          E(u)
                        ]),
                        _: 1
                      })
                    ], 2)) : Y("v-if", !0)
                  ], 34)) : Y("v-if", !0),
                  R("div", {
                    class: H([`${e.prefixCls}-body`, e.bodyClass]),
                    style: s0(e.bodyStyle)
                  }, [
                    K(e.$slots, "default")
                  ], 6),
                  e.footer ? (w(), F("div", {
                    key: 1,
                    class: H(`${e.prefixCls}-footer`)
                  }, [
                    K(e.$slots, "footer", {}, () => [
                      e.hideCancel ? Y("v-if", !0) : (w(), V(h, A0({ key: 0 }, e.cancelButtonProps, { onClick: e.handleCancel }), {
                        default: T(() => [
                          Q(q(e.cancelDisplayText), 1)
                        ]),
                        _: 1
                      }, 16, ["onClick"])),
                      E(h, A0({ type: "primary" }, e.okButtonProps, {
                        loading: e.mergedOkLoading,
                        onClick: e.handleOk
                      }), {
                        default: T(() => [
                          Q(q(e.okDisplayText), 1)
                        ]),
                        _: 1
                      }, 16, ["loading", "onClick"])
                    ])
                  ], 2)) : Y("v-if", !0)
                ], 6), [
                  [C1, e.computedVisible]
                ])
              ]),
              _: 3
            }, 8, ["name", "onAfterEnter", "onAfterLeave"])
          ], 34)
        ], 16)), [
          [C1, e.computedVisible || e.mounted]
        ]) : Y("v-if", !0)
      ], 8, ["to", "disabled"]))
    ]),
    _: 3
  });
}
var z1 = /* @__PURE__ */ n0(t6, [["render", n6]]), i6 = Object.defineProperty, a6 = Object.defineProperties, l6 = Object.getOwnPropertyDescriptors, q2 = Object.getOwnPropertySymbols, o6 = Object.prototype.hasOwnProperty, r6 = Object.prototype.propertyIsEnumerable, K2 = (e, t, n) => t in e ? i6(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, e1 = (e, t) => {
  for (var n in t || (t = {}))
    o6.call(t, n) && K2(e, n, t[n]);
  if (q2)
    for (var n of q2(t))
      r6.call(t, n) && K2(e, n, t[n]);
  return e;
}, s6 = (e, t) => a6(e, l6(t));
const Pe = (e, t) => {
  let n = At("modal");
  const i = () => {
    c.component && (c.component.props.visible = !1), _0(e.onOk) && e.onOk();
  }, a = () => {
    c.component && (c.component.props.visible = !1), _0(e.onCancel) && e.onCancel();
  }, l = async () => {
    await T1(), n && (W1(null, n), document.body.removeChild(n)), n = null, _0(e.onClose) && e.onClose();
  }, o = () => {
    c.component && (c.component.props.visible = !1);
  }, s = (u) => {
    c.component && Object.entries(u).forEach(([m, h]) => {
      c.component.props[m] = h;
    });
  }, c = E(z1, e1(e1(e1({}, {
    visible: !0,
    renderToBody: !1,
    unmountOnClose: !0,
    onOk: i,
    onCancel: a,
    onClose: l
  }), Je(e, ["content", "title", "footer", "visible", "unmountOnClose", "onOk", "onCancel", "onClose"])), {
    footer: typeof e.footer == "boolean" ? e.footer : void 0
  }), {
    default: w1(e.content),
    title: w1(e.title),
    footer: typeof e.footer != "boolean" ? w1(e.footer) : void 0
  });
  return (t ?? G1._context) && (c.appContext = t ?? G1._context), W1(c, n), document.body.appendChild(n), {
    close: o,
    update: s
  };
}, Ae = e1({
  open: Pe,
  confirm: (e, t) => {
    const n = e1({
      simple: !0,
      messageType: "warning"
    }, e);
    return Pe(n, t);
  }
}, Bt.reduce((e, t) => (e[t] = (n, i) => {
  const a = e1({
    simple: !0,
    hideCancel: !0,
    messageType: t
  }, n);
  return Pe(a, i);
}, e), {})), G1 = Object.assign(z1, s6(e1({}, Ae), {
  install: (e, t) => {
    H0(e, t);
    const n = F0(t);
    e.component(n + z1.name, z1);
    const i = {};
    for (const a of Object.keys(Ae))
      i[a] = (l, o = e._context) => Ae[a](l, o);
    e.config.globalProperties.$modal = i;
  },
  _context: null
})), c6 = j({
  name: "Switch",
  components: {
    IconLoading: P1
  },
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: void 0
    },
    defaultChecked: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    type: {
      type: String,
      default: "circle"
    },
    size: {
      type: String
    },
    checkedValue: {
      type: [String, Number, Boolean],
      default: !0
    },
    uncheckedValue: {
      type: [String, Number, Boolean],
      default: !1
    },
    checkedColor: {
      type: String
    },
    uncheckedColor: {
      type: String
    },
    beforeChange: {
      type: Function
    },
    checkedText: {
      type: String
    },
    uncheckedText: {
      type: String
    }
  },
  emits: {
    "update:modelValue": (e) => !0,
    change: (e, t) => !0,
    focus: (e) => !0,
    blur: (e) => !0
  },
  setup(e, { emit: t }) {
    const { disabled: n, size: i, modelValue: a } = T0(e), l = e0("switch"), { mergedSize: o } = ne(i), { mergedDisabled: s, mergedSize: r, eventHandlers: c } = Qe({
      disabled: n,
      size: o
    }), u = P(e.defaultChecked ? e.checkedValue : e.uncheckedValue), m = _(() => {
      var k;
      return ((k = e.modelValue) != null ? k : u.value) === e.checkedValue;
    }), h = P(!1), f = _(() => h.value || e.loading), v = (k, I) => {
      var C, p;
      u.value = k ? e.checkedValue : e.uncheckedValue, t("update:modelValue", u.value), t("change", u.value, I), (p = (C = c.value) == null ? void 0 : C.onChange) == null || p.call(C, I);
    }, y = async (k) => {
      if (f.value || s.value)
        return;
      const I = !m.value, C = I ? e.checkedValue : e.uncheckedValue, p = e.beforeChange;
      if (_0(p)) {
        h.value = !0;
        try {
          const d = await p(C);
          (d ?? !0) && v(I, k);
        } finally {
          h.value = !1;
        }
      } else
        v(I, k);
    }, g = (k) => {
      var I, C;
      t("focus", k), (C = (I = c.value) == null ? void 0 : I.onFocus) == null || C.call(I, k);
    }, A = (k) => {
      var I, C;
      t("blur", k), (C = (I = c.value) == null ? void 0 : I.onBlur) == null || C.call(I, k);
    };
    b0(a, (k) => {
      (l1(k) || ft(k)) && (u.value = e.uncheckedValue);
    });
    const Z = _(() => [
      l,
      `${l}-type-${e.type}`,
      {
        [`${l}-small`]: r.value === "small" || r.value === "mini",
        [`${l}-checked`]: m.value,
        [`${l}-disabled`]: s.value,
        [`${l}-loading`]: f.value,
        [`${l}-custom-color`]: e.type === "line" && (e.checkedColor || e.uncheckedColor)
      }
    ]), N = _(() => {
      if (m.value && e.checkedColor)
        return e.type === "line" ? { "--custom-color": e.checkedColor } : { backgroundColor: e.checkedColor };
      if (!m.value && e.uncheckedColor)
        return e.type === "line" ? { "--custom-color": e.uncheckedColor } : { backgroundColor: e.uncheckedColor };
    });
    return {
      prefixCls: l,
      cls: Z,
      mergedDisabled: s,
      buttonStyle: N,
      computedCheck: m,
      computedLoading: f,
      handleClick: y,
      handleFocus: g,
      handleBlur: A
    };
  }
}), u6 = ["aria-checked", "disabled"];
function d6(e, t, n, i, a, l) {
  const o = X("icon-loading");
  return w(), F("button", {
    type: "button",
    role: "switch",
    "aria-checked": e.computedCheck,
    class: H(e.cls),
    style: s0(e.buttonStyle),
    disabled: e.mergedDisabled,
    onClick: t[0] || (t[0] = (...s) => e.handleClick && e.handleClick(...s)),
    onFocus: t[1] || (t[1] = (...s) => e.handleFocus && e.handleFocus(...s)),
    onBlur: t[2] || (t[2] = (...s) => e.handleBlur && e.handleBlur(...s))
  }, [
    R("span", {
      class: H(`${e.prefixCls}-handle`)
    }, [
      R("span", {
        class: H(`${e.prefixCls}-handle-icon`)
      }, [
        e.computedLoading ? (w(), V(o, { key: 0 })) : (w(), F(z0, { key: 1 }, [
          e.computedCheck ? K(e.$slots, "checked-icon", { key: 0 }) : K(e.$slots, "unchecked-icon", { key: 1 })
        ], 2112))
      ], 2)
    ], 2),
    Y("  prettier-ignore  "),
    e.type !== "line" && e.size !== "small" && (e.$slots.checked || e.checkedText || e.$slots.unchecked || e.uncheckedText) ? (w(), F(z0, { key: 0 }, [
      R("span", {
        class: H(`${e.prefixCls}-text-holder`)
      }, [
        e.computedCheck ? K(e.$slots, "checked", { key: 0 }, () => [
          Q(q(e.checkedText), 1)
        ]) : K(e.$slots, "unchecked", { key: 1 }, () => [
          Q(q(e.uncheckedText), 1)
        ])
      ], 2),
      R("span", {
        class: H(`${e.prefixCls}-text`)
      }, [
        e.computedCheck ? K(e.$slots, "checked", { key: 0 }, () => [
          Q(q(e.checkedText), 1)
        ]) : K(e.$slots, "unchecked", { key: 1 }, () => [
          Q(q(e.uncheckedText), 1)
        ])
      ], 2)
    ], 64)) : Y("v-if", !0)
  ], 46, u6);
}
var Ze = /* @__PURE__ */ n0(c6, [["render", d6]]);
const m6 = Object.assign(Ze, {
  install: (e, t) => {
    H0(e, t);
    const n = F0(t);
    e.component(n + Ze.name, Ze);
  }
});
function p6(e) {
  return e != null;
}
function v6(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}
const h6 = (e) => Object.prototype.toString.call(e), f6 = (e) => h6(e) === "[object Object]";
function b6(e) {
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
const Ht = "__bpmn-designer__";
function jt(e) {
  const t = window.localStorage.getItem(`${Ht}${e}`);
  return t ? JSON.parse(t) : null;
}
function Rt(e, t) {
  window.localStorage.setItem(`${Ht}${e}`, JSON.stringify(t || ""));
}
const x0 = Symbol(), Wt = Symbol(), y6 = /* @__PURE__ */ j({
  __name: "SaveTool",
  props: {
    showLabel: {
      type: Boolean,
      default: !1
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e;
    let n = {};
    const { t: i } = Z0(), a = l0(x0), l = P(!1), o = async () => {
      try {
      } catch (c) {
        console.error(c);
      } finally {
        l.value = !1;
      }
    }, s = () => {
      const c = n.error || 0;
      c > 0 ? G1.warning({
        title: i(t.translatePrefix + "Warning"),
        content: `${i(t.translatePrefix + "Process has")} ${c} ${i(t.translatePrefix + "error, are you sure you want to save it")}？`,
        okText: i(t.translatePrefix + "Confirm"),
        cancelText: i(t.translatePrefix + "Cancel"),
        hideCancel: !1,
        onOk: o
      }) : o();
    }, r = (c) => {
      c.on("bpmn-linting.completed", ({ issues: u, count: m }) => {
        n = m;
      });
    };
    return M1(() => (a == null ? void 0 : a.value) && r(a.value)), (c, u) => {
      const m = X("LucideIcon"), h = D0, f = j0;
      return e.showLabel ? (w(), V(h, {
        key: 0,
        loading: x(l),
        secondary: "",
        onClick: s
      }, {
        default: T(() => [
          E(m, {
            name: "Save",
            size: 16
          }),
          R("span", null, q(x(i)(e.translatePrefix + "saveModel")), 1)
        ]),
        _: 1
      }, 8, ["loading"])) : (w(), V(f, {
        key: 1,
        "render-to-body": !1
      }, {
        content: T(() => [
          Q(q(x(i)(e.translatePrefix + "saveModel")), 1)
        ]),
        default: T(() => [
          E(h, {
            loading: x(l),
            secondary: "",
            onClick: s
          }, {
            default: T(() => [
              E(m, {
                name: "Save",
                size: 16
              })
            ]),
            _: 1
          }, 8, ["loading"])
        ]),
        _: 1
      }));
    };
  }
});
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var N1 = {
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
const g6 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o0 = (e, t) => ({ size: n, strokeWidth: i = 2, absoluteStrokeWidth: a, color: l, class: o, ...s }, { attrs: r, slots: c }) => v2(
  "svg",
  {
    ...N1,
    width: n || N1.width,
    height: n || N1.height,
    stroke: l || N1.stroke,
    "stroke-width": a ? Number(i) * 24 / Number(n) : i,
    ...r,
    class: ["lucide", `lucide-${g6(e)}`],
    ...s
  },
  [...t.map((u) => v2(...u)), ...c.default ? [c.default()] : []]
);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E6 = o0("AlignCenterHorizontalIcon", [
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4", key: "11f1s0" }],
  ["path", { d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4", key: "t14dx9" }],
  ["path", { d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1", key: "1w07xs" }],
  ["path", { d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1", key: "1apec2" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C6 = o0("AlignCenterVerticalIcon", [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4", key: "14d6g8" }],
  ["path", { d: "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4", key: "1e2lrw" }],
  ["path", { d: "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1", key: "1fkdwx" }],
  ["path", { d: "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1", key: "1euafb" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w6 = o0("AlignEndHorizontalIcon", [
  ["rect", { width: "6", height: "16", x: "4", y: "2", rx: "2", key: "z5wdxg" }],
  ["rect", { width: "6", height: "9", x: "14", y: "9", rx: "2", key: "um7a8w" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k6 = o0("AlignEndVerticalIcon", [
  ["rect", { width: "16", height: "6", x: "2", y: "4", rx: "2", key: "10wcwx" }],
  ["rect", { width: "9", height: "6", x: "9", y: "14", rx: "2", key: "4p5bwg" }],
  ["path", { d: "M22 22V2", key: "12ipfv" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S6 = o0("AlignStartHorizontalIcon", [
  ["rect", { width: "6", height: "16", x: "4", y: "6", rx: "2", key: "1n4dg1" }],
  ["rect", { width: "6", height: "9", x: "14", y: "6", rx: "2", key: "17khns" }],
  ["path", { d: "M22 2H2", key: "fhrpnj" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _6 = o0("AlignStartVerticalIcon", [
  ["rect", { width: "9", height: "6", x: "6", y: "14", rx: "2", key: "lpm2y7" }],
  ["rect", { width: "16", height: "6", x: "6", y: "4", rx: "2", key: "rdj6ps" }],
  ["path", { d: "M2 2v20", key: "1ivd8o" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T6 = o0("BoxIcon", [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x6 = o0("ChevronsLeftIcon", [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $6 = o0("DownloadIcon", [
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
const M6 = o0("EraserIcon", [
  [
    "path",
    {
      d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",
      key: "182aya"
    }
  ],
  ["path", { d: "M22 21H7", key: "t4ddhn" }],
  ["path", { d: "m5 11 9 9", key: "1mo9qw" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G2 = o0("EyeIcon", [
  ["path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y2 = o0("FolderIcon", [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P6 = o0("FullscreenIcon", [
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
const A6 = o0("MapIcon", [
  ["polygon", { points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21", key: "ok2ie8" }],
  ["line", { x1: "9", x2: "9", y1: "3", y2: "18", key: "w34qz5" }],
  ["line", { x1: "15", x2: "15", y1: "6", y2: "21", key: "volv9a" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z6 = o0("MouseIcon", [
  ["rect", { x: "5", y: "2", width: "14", height: "20", rx: "7", key: "11ol66" }],
  ["path", { d: "M12 6v4", key: "16clxf" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B6 = o0("Redo2Icon", [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13", key: "19mnr4" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N6 = o0("Undo2Icon", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11", key: "llx8ln" }]
]);
/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L6 = o0("ZoomInIcon", [
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
const D6 = o0("ZoomOutIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
]), I6 = /* @__PURE__ */ j({
  __name: "ImportsTool",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    showLabel: {
      type: Boolean,
      default: !1
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = P(null), n = l0(x0), { t: i } = Z0(), a = async (s) => {
      var u;
      const { warnings: r } = await n.value.importXML(s);
      if (r)
        for (const m of r) console.warn(m);
      n.value.get("canvas").zoom("fit-viewport", "center"), (u = n == null ? void 0 : n.value) == null || u.get("eventBus").fire("xml-imported", { xml: s });
    }, l = () => {
      t.value && t.value.click();
    }, o = () => {
      if (t.value && t.value.files) {
        const s = t.value.files[0], r = new FileReader();
        r.readAsText(s), r.onload = function() {
          const c = this.result;
          a(c);
        }, t.value.value = "", t.value.files = null;
      }
    };
    return (s, r) => {
      const c = D0, u = j0;
      return w(), F(z0, null, [
        e.showLabel ? (w(), V(c, {
          key: 0,
          disabled: e.disabled,
          secondary: "",
          onClick: l
        }, {
          default: T(() => [
            E(x(Y2), { size: 16 }),
            R("span", null, q(x(i)(e.translatePrefix + "openFile")), 1)
          ]),
          _: 1
        }, 8, ["disabled"])) : (w(), V(u, {
          key: 1,
          "render-to-body": !1
        }, {
          content: T(() => [
            Q(q(x(i)(e.translatePrefix + "openFile")), 1)
          ]),
          default: T(() => [
            E(c, {
              disabled: e.disabled,
              secondary: "",
              onClick: l
            }, {
              default: T(() => [
                E(x(Y2), { size: 16 })
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          _: 1
        })),
        R("input", {
          ref_key: "importRef",
          ref: t,
          type: "file",
          style: { display: "none" },
          accept: ".xml,.bpmn",
          onChange: o
        }, null, 544)
      ], 64);
    };
  }
});
function X2(e, t, n) {
  const i = encodeURIComponent(n);
  return {
    filename: `${t}.${e.toLowerCase()}`,
    href: `data:application/${e === "svg" ? "text/xml" : "bpmn20-xml"};charset=UTF-8,${i}`,
    data: n
  };
}
function Be(e, t) {
  if (e && t) {
    const n = document.createElement("a");
    n.download = t, n.href = e, n.click(), URL.revokeObjectURL(n.href);
  }
}
function O6(e) {
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
      const c = document.createElement("div");
      c.style.display = "none", c.innerHTML = t.svg, i = c.firstElementChild;
    } else
      i = t.svg;
    const a = document.createElement("canvas"), l = a.getContext("2d"), o = new XMLSerializer().serializeToString(i), s = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(o))), r = new Image();
    r.onload = function() {
      let c, u;
      t.width === "auto" && t.height !== "auto" ? c = r.width / r.height * t.height : t.width === "auto" ? c = r.naturalWidth : c = t.width, t.height === "auto" && t.width !== "auto" ? u = r.height / r.width * t.width : t.height === "auto" ? u = r.naturalHeight : u = t.height, a.width = c, a.height = u, l.drawImage(r, 0, 0, c, u), e.outputFormat == "blob" ? a.toBlob(
        function(m) {
          n(m);
        },
        t.mimetype,
        t.quality
      ) : n(a.toDataURL(t.mimetype, t.quality));
    }, r.src = s;
  });
}
const V6 = { class: "button-list_column" }, z6 = { key: 0 }, F6 = /* @__PURE__ */ j({
  __name: "ExportsTools",
  props: {
    showLabel: {
      type: Boolean,
      default: !1
    },
    fileName: {
      type: String,
      default: ""
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, n = l0(x0), { t: i } = Z0(), a = () => {
      var f, v, y;
      const m = n.value.get("elementRegistry");
      let h = (f = m.find((g) => g.type === "bpmn:Process")) == null ? void 0 : f.businessObject;
      return h || (h = (y = (v = m.find((g) => g.type === "bpmn:Participant")) == null ? void 0 : v.businessObject) == null ? void 0 : y.processRef), (h == null ? void 0 : h.name) || (h == null ? void 0 : h.id) || "diagram";
    }, l = async (m) => {
      try {
        const h = a();
        if (m === "xml" || m === "bpmn") {
          const { error: f, xml: v } = await n.value.saveXML({ format: !0 });
          f && console.error(`[Process Designer Warn ]: ${f.message || f}`);
          const { href: y, filename: g } = X2(m.toUpperCase(), t.fileName || h, v);
          Be(y, g);
        } else {
          const { svg: f } = await n.value.saveSVG(), v = u(f), { href: y, filename: g } = X2("SVG", t.fileName || h, v);
          Be(y, g);
        }
      } catch (h) {
        console.error(`[Process Designer Warn ]: ${h.message || h}`);
      }
    }, o = () => {
      l("xml");
    }, s = () => {
      l("bpmn");
    }, r = () => {
      l("svg");
    }, c = async () => {
      const { svg: m } = await n.value.saveSVG(), h = u(m), f = await O6({ svg: h, outputFormat: "blob" }), v = a();
      f instanceof Blob && Be(URL.createObjectURL(f), t.fileName || v);
    }, u = (m) => {
      function h(v) {
        const y = /var\(--([^)]+)\)/g;
        return v.replace(y, (g, A) => f(A) || g);
      }
      function f(v) {
        const y = document.querySelector(".djs-container.djs-parent");
        return window.getComputedStyle(y).getPropertyValue(`--${v}`);
      }
      return h(m);
    };
    return (m, h) => {
      const f = D0, v = j0;
      return w(), V(v, { "render-to-body": !1 }, {
        content: T(() => [
          R("div", V6, [
            E(f, { onClick: s }, {
              default: T(() => [
                Q(q(x(i)(e.translatePrefix + "exportAsBPMN")), 1)
              ]),
              _: 1
            }),
            E(f, { onClick: o }, {
              default: T(() => [
                Q(q(x(i)(e.translatePrefix + "exportAsXML")), 1)
              ]),
              _: 1
            }),
            E(f, { onClick: r }, {
              default: T(() => [
                Q(q(x(i)(e.translatePrefix + "exportAsSVG")), 1)
              ]),
              _: 1
            }),
            E(f, { onClick: c }, {
              default: T(() => [
                Q(q(x(i)(e.translatePrefix + "exportAsPNG")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: T(() => [
          E(f, { secondary: "" }, {
            default: T(() => [
              E(x($6), { size: 16 }),
              e.showLabel ? (w(), F("span", z6, q(x(i)(e.translatePrefix + "exportAs")), 1)) : Y("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}), H6 = { class: "preview-model" }, j6 = /* @__PURE__ */ j({
  __name: "PreviewsTools",
  props: {
    showLabel: {
      type: Boolean,
      default: !1
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = l0(x0), { t: n } = Z0(), i = P(!1), a = P(""), l = async () => {
      try {
        i.value = !0;
        const { xml: o } = await t.value.saveXML({ format: !0, preamble: !0 });
        a.value = o || "";
      } catch (o) {
        console.error(o);
      }
    };
    return (o, s) => {
      const r = D0, c = j0, u = X("highlightjs"), m = G1;
      return w(), F(z0, null, [
        e.showLabel ? (w(), V(r, {
          key: 0,
          secondary: "",
          onClick: l
        }, {
          default: T(() => [
            E(x(G2), {
              name: "Eye",
              size: 16
            }),
            R("span", null, q(x(n)(e.translatePrefix + "previewAsXML")), 1)
          ]),
          _: 1
        })) : (w(), V(c, {
          key: 1,
          "render-to-body": !1
        }, {
          content: T(() => [
            Q(q(x(n)(e.translatePrefix + "previewAsXML")), 1)
          ]),
          default: T(() => [
            E(r, {
              secondary: "",
              onClick: l
            }, {
              default: T(() => [
                E(x(G2), {
                  name: "Eye",
                  size: 16
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })),
        E(m, {
          visible: i.value,
          "onUpdate:visible": s[0] || (s[0] = (h) => i.value = h),
          footer: !1,
          title: x(n)(e.translatePrefix + "previewAs"),
          width: "64vw"
        }, {
          default: T(() => [
            R("div", H6, [
              E(u, {
                language: "xml",
                code: a.value
              }, null, 8, ["code"])
            ])
          ]),
          _: 1
        }, 8, ["visible", "title"])
      ], 64);
    };
  }
}), R6 = /* @__PURE__ */ j({
  __name: "AlignsTools",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, n = l0(x0), { t: i } = Z0(), a = _(() => [
      { name: i(t.translatePrefix + "alignLeft"), key: "left", icon: _6 },
      { name: i(t.translatePrefix + "alignCenter"), key: "center", icon: C6 },
      { name: i(t.translatePrefix + "alignRight"), key: "right", icon: k6 },
      { name: i(t.translatePrefix + "alignTop"), key: "top", icon: S6 },
      {
        name: i(t.translatePrefix + "alignMiddle"),
        key: "middle",
        icon: E6
      },
      { name: i(t.translatePrefix + "alignBottom"), key: "bottom", icon: w6 }
    ]), l = (o) => {
      const s = n.value.get("modeling"), r = n.value.get("selection"), c = n.value.get("alignElements");
      if (s && r) {
        const u = r.get();
        if (!u || u.length <= 1)
          return He.warning(i("Hold down the Shift key to select multiple element alignments"));
        c.trigger(u, o);
      }
    };
    return (o, s) => {
      const r = D0, c = j0, u = Q0;
      return w(), V(u, { disabled: e.disabled }, {
        default: T(() => [
          (w(!0), F(z0, null, pt(a.value, (m) => (w(), V(c, {
            key: m.key,
            "render-to-body": !1
          }, {
            content: T(() => [
              Q(q(m.name), 1)
            ]),
            default: T(() => [
              E(r, {
                onClick: (h) => l(m.key)
              }, {
                default: T(() => [
                  (w(), V(vt(m.icon), { size: 16 }))
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]),
            _: 2
          }, 1024))), 128))
        ]),
        _: 1
      }, 8, ["disabled"]);
    };
  }
}), r1 = document.documentElement;
let Ne = r1.querySelector("head");
const J2 = document.createElement("style");
let Q2 = !1, f1 = !1, F1 = "requestFullscreen", H1 = "exitFullscreen", S1 = "fullscreenElement", _1 = "fullscreenchange";
function Ut(e) {
  return e instanceof HTMLElement ? e : r1;
}
function v1() {
  return Q2 ? f1 : (Q2 = !0, "webkitRequestFullScreen" in r1 ? (F1 = "webkitRequestFullScreen", H1 = "webkitExitFullscreen", S1 = "webkitFullscreenElement", _1 = "webkitfullscreenchange", f1 = !0) : "msRequestFullscreen" in r1 ? (F1 = "msRequestFullscreen", H1 = "msExitFullscreen", S1 = "msFullscreenElement", _1 = "MSFullscreenChange", f1 = !0) : "mozRequestFullScreen" in r1 ? (F1 = "mozRequestFullScreen", H1 = "mozCancelFullScreen", S1 = "mozFullScreenElement", _1 = "mozfullscreenchange", f1 = !0) : (console.error("当前浏览器不支持 Fullscreen API !"), f1 = !1));
}
function W6(e, t) {
  if (v1())
    return Ut(e)[F1]();
}
function U6() {
  if (v1())
    return r1.contains(J2) && (Ne == null || Ne.removeChild(J2)), document[H1]();
}
function q6(e) {
  return v1() ? Ut(e) === document[S1] : !1;
}
function K6(e, t) {
  return v1() ? q6(e) ? (U6(), !1) : (W6(e), !0) : !1;
}
function G6(e) {
  if (!v1())
    return;
  const t = () => {
    e(!!document[S1]);
  };
  return window.addEventListener(_1, t), () => {
    window.removeEventListener(_1, t);
  };
}
const Y6 = { style: { "text-align": "center", display: "inline-block", width: "40px" } }, X6 = /* @__PURE__ */ j({
  __name: "ScalesTools",
  props: {
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = l0(x0), { t: n } = Z0(), i = P(1), a = P(!0), l = P(!0), o = P(v1()), s = P(!1), r = (y) => {
      const g = t.value.get("canvas");
      y === "fit-viewport" ? g.zoom("fit-viewport", "center") : g.zoom(y, { x: 0, y: 0 });
    }, c = (y) => {
      i.value = Math.floor(i.value * 100 - 0.1 * 100) / 100, r(i.value);
    }, u = (y) => {
      i.value = Math.floor(i.value * 100 + 0.1 * 100) / 100, r(i.value);
    }, m = () => {
      var y;
      (y = t.value.get("zoomScroll")) == null || y.toggle(), a.value = !a.value;
    }, h = () => {
      var y;
      (y = t.value.get("minimap")) == null || y.toggle(), l.value = !l.value, Rt("minimap", { enabled: l.value });
    }, f = () => {
      K6(document.querySelector("#business-designer"));
    };
    G6((y) => {
      s.value = y;
    });
    const v = (y) => {
      try {
        const g = y.get("canvas"), A = y.get("minimap");
        i.value = (g == null ? void 0 : g.zoom()) || 1, l.value = (A == null ? void 0 : A.isOpen()) || !1, y.on("canvas.viewbox.changed", ({ viewbox: Z }) => {
          i.value = Z.scale || 1;
        });
      } finally {
        i.value = 1;
      }
    };
    return M1(() => (t == null ? void 0 : t.value) && v(t.value)), (y, g) => {
      const A = D0, Z = j0, N = Q0;
      return w(), V(N, null, {
        default: T(() => [
          E(Z, { "render-to-body": !1 }, {
            content: T(() => [
              Q(q(x(n)(e.translatePrefix + "zoomOut")), 1)
            ]),
            default: T(() => [
              E(A, {
                onClick: g[0] || (g[0] = (k) => c())
              }, {
                default: T(() => [
                  E(x(D6), {
                    name: "ZoomOut",
                    size: 16
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          E(Z, { "render-to-body": !1 }, {
            content: T(() => [
              Q(q(x(n)(e.translatePrefix + "zoomReset")), 1)
            ]),
            default: T(() => [
              E(A, {
                onClick: g[1] || (g[1] = (k) => r("fit-viewport"))
              }, {
                default: T(() => [
                  R("span", Y6, q(Math.floor(i.value * 10) * 10 + "%"), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          E(Z, { "render-to-body": !1 }, {
            content: T(() => [
              Q(q(x(n)(e.translatePrefix + "zoomIn")), 1)
            ]),
            default: T(() => [
              E(A, {
                onClick: g[2] || (g[2] = (k) => u())
              }, {
                default: T(() => [
                  E(x(L6), {
                    name: "ZoomIn",
                    size: 16
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          E(Z, { "render-to-body": !1 }, {
            content: T(() => [
              Q(q(a.value ? x(n)(e.translatePrefix + "unableMouseControl") : x(n)(e.translatePrefix + "enableMouseControl")), 1)
            ]),
            default: T(() => [
              E(A, {
                class: H({ "is-unable": !a.value }),
                onClick: g[3] || (g[3] = (k) => m())
              }, {
                default: T(() => [
                  E(x(Z6), {
                    name: "Mouse",
                    size: 16
                  })
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          }),
          E(Z, { "render-to-body": !1 }, {
            content: T(() => [
              Q(q(l.value ? x(n)(e.translatePrefix + "unableMinimap") : x(n)(e.translatePrefix + "enableMinimap")), 1)
            ]),
            default: T(() => [
              E(A, {
                class: H({ "is-unable": !l.value }),
                onClick: g[4] || (g[4] = (k) => h())
              }, {
                default: T(() => [
                  E(x(A6), {
                    name: "Map",
                    size: 16
                  })
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          }),
          o.value ? (w(), V(Z, {
            key: 0,
            "render-to-body": !1
          }, {
            content: T(() => [
              Q(q(s.value ? x(n)(e.translatePrefix + "notFullscreen") : x(n)(e.translatePrefix + "onFullscreen")), 1)
            ]),
            default: T(() => [
              E(A, {
                class: H({ "is-unable": s.value }),
                onClick: g[5] || (g[5] = (k) => f())
              }, {
                default: T(() => [
                  E(x(P6), {
                    name: "Fullscreen",
                    size: 16
                  })
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          })) : Y("", !0)
        ]),
        _: 1
      });
    };
  }
}), qt = (e) => (e = "abckey123456", `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  targetNamespace="http://bpmn.io/schema/bpmn"
  id="Definitions_${e}">
  <bpmn:process id="${e}" name="测试流程" isExecutable="true"></bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${e}"></bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`), J6 = /* @__PURE__ */ j({
  __name: "CommandsTools",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = l0(x0), { t: n } = Z0(), i = P(!1), a = P(!1), l = (h, f) => {
      try {
        const v = t.value.get("commandStack");
        v && ((!v[`can${h}`] || v[`can${h}`]()) && v[h.toLowerCase()] && v[h.toLowerCase()](), f && f(), s(v));
      } catch (v) {
        console.error(v);
      }
    }, o = () => {
      var h;
      (h = t.value) == null || h.importXML(qt(Date.now().toString()));
    }, s = (h) => {
      i.value = h.canUndo(), a.value = h.canRedo();
    }, r = () => l("Undo"), c = () => l("Redo"), u = () => l("Clear", o), m = (h) => {
      const f = h.get("commandStack");
      s(f), h.on("commandStack.changed", () => {
        s(f);
      });
    };
    return M1(() => (t == null ? void 0 : t.value) && m(t.value)), (h, f) => {
      const v = D0, y = j0, g = Q0;
      return w(), V(g, { disabled: e.disabled }, {
        default: T(() => [
          E(y, { "render-to-body": !1 }, {
            content: T(() => [
              Q(q(x(n)(e.translatePrefix + "undo")), 1)
            ]),
            default: T(() => [
              E(v, {
                disabled: !i.value,
                onClick: r
              }, {
                default: T(() => [
                  E(x(N6), { size: 16 })
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 1
          }),
          E(y, { "render-to-body": !1 }, {
            content: T(() => [
              Q(q(x(n)(e.translatePrefix + "redo")), 1)
            ]),
            default: T(() => [
              E(v, {
                disabled: !a.value,
                onClick: c
              }, {
                default: T(() => [
                  E(x(B6), { size: 16 })
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 1
          }),
          E(y, { "render-to-body": !1 }, {
            content: T(() => [
              Q(q(x(n)(e.translatePrefix + "clear")), 1)
            ]),
            default: T(() => [
              E(v, { onClick: u }, {
                default: T(() => [
                  E(x(M6), { size: 16 })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["disabled"]);
    };
  }
}), Q6 = { class: "business-toolbar" }, e8 = /* @__PURE__ */ j({
  __name: "index",
  props: {
    useSave: {
      type: Boolean,
      default: !1
    },
    showLabel: {
      type: Boolean,
      default: !1
    },
    fileName: {
      type: String,
      default: ""
    },
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = l0(x0), n = P(!1), i = () => {
      t.value.on("tokenSimulation.toggleMode", ({ active: a }) => {
        n.value = a;
      });
    };
    return M1(() => {
      t != null && t.value && i();
    }), (a, l) => {
      const o = Q0;
      return w(), F("div", Q6, [
        E(o, null, {
          default: T(() => [
            e.useSave ? (w(), V(y6, {
              key: 0,
              "translate-prefix": e.translatePrefix
            }, null, 8, ["translate-prefix"])) : Y("", !0),
            E(I6, {
              disabled: x(n),
              "translate-prefix": e.translatePrefix
            }, null, 8, ["disabled", "translate-prefix"]),
            E(F6, {
              "translate-prefix": e.translatePrefix,
              "file-name": e.fileName
            }, null, 8, ["translate-prefix", "file-name"]),
            E(j6, { "translate-prefix": e.translatePrefix }, null, 8, ["translate-prefix"])
          ]),
          _: 1
        }),
        E(R6, {
          disabled: x(n),
          "translate-prefix": e.translatePrefix
        }, null, 8, ["disabled", "translate-prefix"]),
        E(X6, {
          disabled: x(n),
          "translate-prefix": e.translatePrefix
        }, null, 8, ["disabled", "translate-prefix"]),
        E(J6, {
          disabled: x(n),
          "translate-prefix": e.translatePrefix
        }, null, 8, ["disabled", "translate-prefix"]),
        K(a.$slots, "default")
      ]);
    };
  }
});
function t8(e, t) {
  if (e.ownerDocument !== t.ownerDocument)
    try {
      return t.ownerDocument.importNode(e, !0);
    } catch {
    }
  return e;
}
function n8(e, t) {
  return t.appendChild(t8(e, t));
}
function Le(e, t) {
  return n8(t, e), e;
}
var je = 2, Kt = {
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
  "font-size": je,
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
  "stroke-width": je,
  "text-anchor": 1,
  "text-decoration": 1,
  "text-rendering": 1,
  "unicode-bidi": 1,
  visibility: 1,
  "word-spacing": 1,
  "writing-mode": 1
};
function i8(e, t) {
  return Kt[t] ? e.style[t] : e.getAttributeNS(null, t);
}
function a8(e, t, n) {
  var i = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), a = Kt[i];
  a ? (a === je && typeof n == "number" && (n = String(n) + "px"), e.style[i] = n) : e.setAttributeNS(null, t, n);
}
function l8(e, t) {
  var n = Object.keys(t), i, a;
  for (i = 0, a; a = n[i]; i++)
    a8(e, a, t[a]);
}
function o8(e, t, n) {
  return typeof t == "string" ? i8(e, t) : (l8(e, t), e);
}
var t2 = {
  svg: "http://www.w3.org/2000/svg"
}, et = '<svg xmlns="' + t2.svg + '"';
function r8(e) {
  var t = !1;
  e.substring(0, 4) === "<svg" ? e.indexOf(t2.svg) === -1 && (e = et + e.substring(4)) : (e = et + ">" + e + "</svg>", t = !0);
  var n = s8(e);
  if (!t)
    return n;
  for (var i = document.createDocumentFragment(), a = n.firstChild; a.firstChild; )
    i.appendChild(a.firstChild);
  return i;
}
function s8(e) {
  var t;
  return t = new DOMParser(), t.async = !1, t.parseFromString(e, "text/xml");
}
function L1(e, t) {
  var n;
  return e = e.trim(), e.charAt(0) === "<" ? (n = r8(e).firstChild, n = document.importNode(n, !0)) : n = document.createElementNS(t2.svg, e), t && o8(n, t), n;
}
const n2 = Object.prototype.toString, c8 = Object.prototype.hasOwnProperty;
function i2(e) {
  return e === void 0;
}
function a2(e) {
  return n2.call(e) === "[object Array]";
}
function u8(e) {
  return n2.call(e) === "[object Object]";
}
function d8(e) {
  const t = n2.call(e);
  return t === "[object Function]" || t === "[object AsyncFunction]" || t === "[object GeneratorFunction]" || t === "[object AsyncGeneratorFunction]" || t === "[object Proxy]";
}
function Y0(e, t) {
  return c8.call(e, t);
}
function m8(e, t) {
  const n = Gt(t);
  let i;
  return l2(e, function(a, l) {
    if (n(a, l))
      return i = a, !1;
  }), i;
}
function c0(e, t) {
  const n = Gt(t);
  let i = [];
  return l2(e, function(a, l) {
    n(a, l) && i.push(a);
  }), i;
}
function l2(e, t) {
  let n, i;
  if (i2(e))
    return;
  const a = a2(e) ? v8 : p8;
  for (let l in e)
    if (Y0(e, l) && (n = e[l], i = t(n, a(l)), i === !1))
      return n;
}
function Gt(e) {
  return d8(e) ? e : (t) => t === e;
}
function p8(e) {
  return e;
}
function v8(e) {
  return Number(e);
}
function Y1(e, ...t) {
  return Object.assign(e, ...t);
}
function h8(e, t) {
  let n = {}, i = Object(e);
  return l2(t, function(a) {
    a in i && (n[a] = e[a]);
  }), n;
}
function s1(e, t) {
  if (!e)
    return [];
  const n = e.get("extensionElements");
  if (!n)
    return [];
  const i = n.get("values");
  return !i || !i.length ? [] : t ? i.filter((a) => D(a, t)) : i;
}
function f8(e, t) {
  return s1(e, `flowable:${t}`);
}
const tt = 0.95, b8 = 1, nt = 3;
class y8 extends T4 {
  constructor(n, i, a, l, o, s, r) {
    super(n, i, a, l, o, s, r);
    M(this, "_overrideColor");
    const c = this.handlers, u = n && n.defaultFillColor, m = n && n.defaultStrokeColor;
    this._overrideColor = (n == null ? void 0 : n.overrideColor) || !1;
    function h(p) {
      return a.computeStyle(p, ["no-fill"], {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: f2,
        strokeWidth: 2
      });
    }
    function f(p) {
      return a.computeStyle(p, {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: f2,
        strokeWidth: 2,
        fill: "white"
      });
    }
    function v(p, d, b) {
      b = h(b);
      const S = L1("path", { ...b, d });
      return Le(p, S), S;
    }
    function y(p, d, b) {
      const S = L1("text", b);
      return S.innerHTML = d, Le(p, S), S;
    }
    function g(p, d, b, S, L) {
      u8(S) && (L = S, S = 0), S = S || 0, L = f(L);
      const B = d / 2, U = b / 2, v0 = L1("circle", {
        cx: B,
        cy: U,
        r: Math.round((d + b) / 4 - S),
        ...L
      });
      return Le(p, v0), v0;
    }
    const A = {
      "bpmn:MessageEventDefinition": function(p, d, b = {}, S) {
        const L = l.getScaledPath("EVENT_MESSAGE", {
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.235,
            my: 0.315
          }
        }), B = S ? J(d, m, b.stroke) : r0(d, u, b.fill), U = S ? r0(d, u, b.fill) : J(d, m, b.stroke);
        return v(p, L, {
          fill: B,
          stroke: U,
          strokeWidth: 1
        });
      },
      "bpmn:TimerEventDefinition": function(p, d, b = {}) {
        const S = g(p, d.width, d.height, 0.2 * d.height, {
          fill: r0(d, u, b.fill),
          stroke: J(d, m, b.stroke),
          strokeWidth: 2
        }), L = l.getScaledPath("EVENT_TIMER_WH", {
          xScaleFactor: 0.75,
          yScaleFactor: 0.75,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.5,
            my: 0.5
          }
        });
        v(p, L, {
          stroke: J(d, m, b.stroke),
          strokeWidth: 2
        });
        for (let B = 0; B < 12; B++) {
          const U = l.getScaledPath("EVENT_TIMER_LINE", {
            xScaleFactor: 0.75,
            yScaleFactor: 0.75,
            containerWidth: d.width,
            containerHeight: d.height,
            position: {
              mx: 0.5,
              my: 0.5
            }
          }), v0 = d.width / 2, d0 = d.height / 2;
          v(p, U, {
            strokeWidth: 1,
            stroke: J(d, m, b.stroke),
            transform: "rotate(" + B * 30 + "," + d0 + "," + v0 + ")"
          });
        }
        return S;
      },
      "bpmn:EscalationEventDefinition": function(p, d, b = {}, S) {
        const L = l.getScaledPath("EVENT_ESCALATION", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.5,
            my: 0.2
          }
        }), B = S ? J(d, m, b.stroke) : r0(d, u, b.fill);
        return v(p, L, {
          fill: B,
          stroke: J(d, m, b.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:ConditionalEventDefinition": function(p, d, b = {}) {
        const S = l.getScaledPath("EVENT_CONDITIONAL", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.5,
            my: 0.222
          }
        });
        return v(p, S, {
          fill: r0(d, u, b.fill),
          stroke: J(d, m, b.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:LinkEventDefinition": function(p, d, b = {}, S) {
        const L = l.getScaledPath("EVENT_LINK", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.57,
            my: 0.263
          }
        }), B = S ? J(d, m, b.stroke) : r0(d, u, b.fill);
        return v(p, L, {
          fill: B,
          stroke: J(d, m, b.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:ErrorEventDefinition": function(p, d, b = {}, S) {
        const L = l.getScaledPath("EVENT_ERROR", {
          xScaleFactor: 1.1,
          yScaleFactor: 1.1,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.2,
            my: 0.722
          }
        }), B = S ? J(d, m, b.stroke) : r0(d, u, b.fill);
        return v(p, L, {
          fill: B,
          stroke: J(d, m, b.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:CancelEventDefinition": function(p, d, b = {}, S) {
        const L = l.getScaledPath("EVENT_CANCEL_45", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.638,
            my: -0.055
          }
        }), B = S ? J(d, m, b.stroke) : "none", U = v(p, L, {
          fill: B,
          stroke: J(d, m, b.stroke),
          strokeWidth: 1
        });
        return $4(U, 45), U;
      },
      "bpmn:CompensateEventDefinition": function(p, d, b = {}, S) {
        const L = l.getScaledPath("EVENT_COMPENSATION", {
          xScaleFactor: 1,
          yScaleFactor: 1,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.22,
            my: 0.5
          }
        }), B = S ? J(d, m, b.stroke) : r0(d, u, b.fill);
        return v(p, L, {
          fill: B,
          stroke: J(d, m, b.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:SignalEventDefinition": function(p, d, b = {}, S) {
        const L = l.getScaledPath("EVENT_SIGNAL", {
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.5,
            my: 0.2
          }
        }), B = S ? J(d, m, b.stroke) : r0(d, u, b.fill);
        return v(p, L, {
          strokeWidth: 1,
          fill: B,
          stroke: J(d, m, b.stroke)
        });
      },
      "bpmn:MultipleEventDefinition": function(p, d, b = {}, S) {
        const L = l.getScaledPath("EVENT_MULTIPLE", {
          xScaleFactor: 1.1,
          yScaleFactor: 1.1,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.222,
            my: 0.36
          }
        }), { stroke: B } = b, U = S ? J(d, m, B) : r0(d, u, b.fill);
        return v(p, L, {
          fill: U,
          stroke: B,
          strokeWidth: 1
        });
      },
      "bpmn:ParallelMultipleEventDefinition": function(p, d, b = {}) {
        const S = l.getScaledPath("EVENT_PARALLEL_MULTIPLE", {
          xScaleFactor: 1.2,
          yScaleFactor: 1.2,
          containerWidth: d.width,
          containerHeight: d.height,
          position: {
            mx: 0.458,
            my: 0.194
          }
        });
        return v(p, S, {
          fill: r0(d, u, b.fill),
          stroke: J(d, m, b.stroke),
          strokeWidth: 1
        });
      },
      "bpmn:TerminateEventDefinition": function(p, d, b = {}) {
        return g(p, d.width, d.height, 8, {
          fill: J(d, m, b.stroke),
          stroke: J(d, m, b.stroke),
          strokeWidth: 4
        });
      }
    };
    function Z(p, d, b = {}) {
      const S = se(p), L = x4(S);
      return f8(
        S,
        "VariableListenerEventDefinition"
      ).length ? A["bpmn:MultipleEventDefinition"](
        d,
        p,
        b,
        L
      ) : S.get("eventDefinitions") && S.get("eventDefinitions").length > 1 && S.get("parallelMultiple") ? A["bpmn:ParallelMultipleEventDefinition"](
        d,
        p,
        b
      ) : M0(S, "bpmn:MessageEventDefinition") ? A["bpmn:MessageEventDefinition"](
        d,
        p,
        b,
        L
      ) : M0(S, "bpmn:TimerEventDefinition") ? A["bpmn:TimerEventDefinition"](d, p, b) : M0(S, "bpmn:ConditionalEventDefinition") ? A["bpmn:ConditionalEventDefinition"](d, p, b) : M0(S, "bpmn:SignalEventDefinition") ? A["bpmn:SignalEventDefinition"](
        d,
        p,
        b,
        L
      ) : M0(S, "bpmn:EscalationEventDefinition") ? A["bpmn:EscalationEventDefinition"](
        d,
        p,
        b,
        L
      ) : M0(S, "bpmn:LinkEventDefinition") ? A["bpmn:LinkEventDefinition"](d, p, b, L) : M0(S, "bpmn:ErrorEventDefinition") ? A["bpmn:ErrorEventDefinition"](
        d,
        p,
        b,
        L
      ) : M0(S, "bpmn:CancelEventDefinition") ? A["bpmn:CancelEventDefinition"](
        d,
        p,
        b,
        L
      ) : M0(S, "bpmn:CompensateEventDefinition") ? A["bpmn:CompensateEventDefinition"](
        d,
        p,
        b,
        L
      ) : M0(S, "bpmn:TerminateEventDefinition") ? A["bpmn:TerminateEventDefinition"](d, p, b) : null;
    }
    const N = (p, d, b = {}) => {
      b = D1(b, ["fill", "stroke"]);
      const S = c["bpmn:Task"](p, d, b), L = d.businessObject.get("type"), B = {
        class: "custom-service",
        fill: J(d, u, b.stroke),
        stroke: J(d, m, b.stroke),
        strokeWidth: 0
      }, U = L1("g", { class: "custom-node-marker" });
      switch (p.insertBefore(U, null), L) {
        case "shell":
          const v0 = l.getStaticPath("SERVICE_SHELL");
          v(p, v0, B);
          break;
        case "copy":
          const d0 = l.getStaticPath("SERVICE_COPY");
          v(p, d0, B);
          break;
        case "camel":
          const y0 = l.getStaticPath("SERVICE_CAMEL");
          v(p, y0, B);
          break;
        case "dmn":
          const a0 = l.getStaticPath("SERVICE_DMN");
          v(p, a0, B);
          break;
        case "http":
          const R0 = l.getStaticPath("SERVICE_HTTP_1");
          v(p, R0, B);
          const I0 = l.getStaticPath("SERVICE_HTTP_2");
          v(p, I0, B);
          break;
        case "email":
          const k0 = l.getStaticPath("SERVICE_MAIL_1");
          v(p, k0, B);
          const C0 = l.getStaticPath("SERVICE_MAIL_2");
          v(p, C0, B);
          break;
        case "mq":
          const O0 = l.getStaticPath("SERVICE_MQ_1");
          v(p, O0, B);
          const W0 = l.getStaticPath("SERVICE_MQ_2");
          v(p, W0, B);
          break;
        case "sc":
          const U0 = l.getStaticPath("SERVICE_SC_1");
          v(p, U0, B);
          const t0 = l.getStaticPath("SERVICE_SC_2");
          v(p, t0, B);
          break;
        case "dubbo":
          const h0 = l.getStaticPath("SERVICE_SC_1");
          v(p, h0, B);
          const B0 = l.getStaticPath("SERVICE_SC_2");
          v(p, B0, {
            ...B,
            transform: "scale(0.8 0.8) translate(4 0)"
          }), y(p, "dubbo", { ...B, x: 8, y: 17, fontSize: 4 });
          break;
        case "rest":
          const w0 = l.getStaticPath("SERVICE_REST_1");
          v(p, w0, B);
          const N0 = l.getStaticPath("SERVICE_REST_2");
          v(p, N0, B);
          break;
        default:
          g(p, 10, 10, 0, {
            fill: r0(d, u, b.fill),
            stroke: "none",
            transform: "translate(6, 6)"
          });
          const f0 = l.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
              x: 12,
              y: 18
            }
          });
          v(p, f0, {
            fill: r0(d, u, b.fill),
            stroke: J(d, m, b.stroke),
            strokeWidth: 1
          }), g(p, 10, 10, 0, {
            fill: r0(d, u, b.fill),
            stroke: "none",
            transform: "translate(11, 10)"
          });
          const S0 = l.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
              x: 17,
              y: 22
            }
          });
          v(p, S0, {
            fill: r0(d, u, b.fill),
            stroke: J(d, m, b.stroke),
            strokeWidth: 1
          });
      }
      return S;
    }, k = (p, d, b = {}) => {
      const { renderIcon: S = !0 } = b;
      b = D1(b, ["fill", "stroke"]), se(d).get("isInterrupting") === !1 && (b = {
        ...b,
        strokeDasharray: "6"
      });
      const B = g(p, d.width, d.height, {
        fillOpacity: tt,
        ...b,
        fill: r0(d, u, b.fill),
        stroke: J(d, m, b.stroke)
      });
      return S && Z(d, p, b), B;
    }, I = (p, d, b = {}) => {
      const { renderIcon: S = !0 } = b;
      b = D1(b, ["fill", "stroke"]);
      const L = se(d), B = L.get("cancelActivity");
      b = {
        strokeWidth: 1.5,
        fill: r0(d, u, b.fill),
        fillOpacity: b8,
        stroke: J(d, m, b.stroke)
      }, B === !1 && (b.strokeDasharray = "6");
      const U = g(p, d.width, d.height, b);
      return g(p, d.width, d.height, nt, {
        ...b,
        fill: "none"
      }), S && Z(d, p, b), U;
    }, C = (p, d, b = {}) => {
      const { renderIcon: S = !0 } = b;
      b = D1(b, ["fill", "stroke"]);
      const L = g(p, d.width, d.height, {
        fillOpacity: tt,
        ...b,
        fill: r0(d, u, b.fill),
        stroke: J(d, m, b.stroke),
        strokeWidth: 1.5
      });
      return g(p, d.width, d.height, nt, {
        fill: "none",
        stroke: J(d, m, b.stroke),
        strokeWidth: 1.5
      }), S && Z(d, p, b), L;
    };
    this.handlers["bpmn:ServiceTask"] = N, this.handlers["bpmn:StartEvent"] = k, this.handlers["bpmn:BoundaryEvent"] = I, this.handlers["bpmn:IntermediateEvent"] = C;
  }
  drawShape(n, i, a = {}) {
    let l, o = "var(--color-bg-5)";
    if (!this._overrideColor) {
      const s = h2(i);
      l = s.get("color:border-color") || s.get("bioc:stroke"), o = s.get("color:background-color") || s.get("bioc:fill") || "var(--color-bg-5)";
    }
    return D(i, "bpmn:Activity") ? (a = { stroke: l || "var(--color-activity)", fill: o, ...a }, super.drawShape(n, i, a)) : D(i, "bpmn:StartEvent") ? (a = { stroke: l || "var(--color-start-event)", fill: o, ...a }, super.drawShape(n, i, a)) : D(i, "bpmn:EndEvent") ? (a = { stroke: l || "var(--color-end-event)", fill: o, ...a }, super.drawShape(n, i, a)) : D(i, "bpmn:BoundaryEvent") ? (a = { stroke: l || "var(--color-boundary-event)", fill: o, ...a }, super.drawShape(n, i, a)) : D(i, "bpmn:CatchEvent") || D(i, "bpmn:ThrowEvent") ? (a = { stroke: l || "var(--color-catch-event)", fill: o, ...a }, super.drawShape(n, i, a)) : D(i, "bpmn:Gateway") ? (a = { stroke: l || "var(--color-gateway)", fill: o, ...a }, super.drawShape(n, i, a)) : D(i, "bpmn:Group") ? (a = { stroke: l || "var(--color-element)", fill: "none", ...a }, super.drawShape(n, i, a)) : super.drawShape(n, i, {
      stroke: l || "var(--color-element)",
      fill: o,
      ...a
    });
  }
  drawConnection(n, i, a = {}) {
    let l;
    if (!this._overrideColor) {
      const o = h2(i);
      l = o.get("color:border-color") || o.get("bioc:stroke");
    }
    return Oe(i, ["bpmn:SequenceFlow", "bpmn:MessageFlow", "bpmn:Association"]) ? (a = { stroke: l || "#9cafcf", ...a }, super.drawConnection(n, i, a)) : super.drawConnection(n, i, a);
  }
}
function D1(e, t = []) {
  return t.reduce((n, i) => (e[i] && (n[i] = e[i]), n), {});
}
class g8 extends M4 {
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
const E8 = {
  bpmnRenderer: ["type", y8],
  pathMap: ["type", g8]
}, C8 = {
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
};
function w8(e, t) {
  return t = t || {}, jt("local-lang") !== "en_US" && (e = C8[e] || P4[e] || e), e.replace(/{([^}]+)}/g, function(n, i) {
    return t[i] || "{" + i + "}";
  });
}
const k8 = [
  {
    translate: ["value", w8]
  }
];
class o2 {
  constructor(t) {
    M(this, "_commandStack");
    this._commandStack = t;
  }
  preExecute(t = []) {
    const n = this._commandStack;
    for (const i of t)
      if (i) {
        let a = i.context;
        typeof a == "function" && (a = a()), n.execute(i.cmd, a);
      }
  }
}
M(o2, "$inject");
o2.$inject = ["commandStack"];
const it = {
  "panel.multi-command": o2
};
class r2 {
  constructor(t, n) {
    t.on("diagram.init", function() {
      Object.keys(it).forEach((i) => n.registerHandler(i, it[i]));
    });
  }
}
M(r2, "$inject");
r2.$inject = ["eventBus", "commandStack"];
class Yt extends A4 {
  constructor(t) {
    super(t), this.preExecute(["panel.multi-command"], function(n) {
    }), this.preExecuted(["panel.multi-command"], function(n) {
    }), this.execute(["panel.multi-command"], function(n) {
    }), this.executed(["panel.multi-command"], function(n) {
    }), this.postExecute(["panel.multi-command"], function(n) {
    }), this.postExecuted(["panel.multi-command"], function(n) {
    });
  }
}
Yt.$inject = ["eventBus"];
const S8 = {
  __init__: ["commandInitializer", "multiCommandInterceptor"],
  commandInitializer: ["type", r2],
  multiCommandInterceptor: ["type", Yt]
};
let Xt = class extends K0 {
  constructor(n) {
    super(n);
    M(this, "_baseCanCreate", K0.prototype.canCreate);
    M(this, "_canConnect", K0.prototype.canConnect);
    M(this, "_canAttach", K0.prototype.canAttach);
    M(this, "_canReplace", K0.prototype.canReplace);
    M(this, "_canMove", K0.prototype.canMove);
    M(this, "_canInsert", K0.prototype.canInsert);
    this.initCustom();
  }
  // 允许事件子流程绑定边界事件
  canAttachEventSubprocess(n, i, a, l) {
    return X0(i) ? (console.log("isEventSubProcess"), l && !Z4(l, i) ? !1 : "attach") : (console.log("isNotEventSubProcess"), this._canAttach(n, i, a, l));
  }
  initCustom() {
    this.addRule("shape.attach", 2e3, (n) => this.canAttachEventSubprocess(n.shape, n.target, null, n.position)), this.addRule("elements.move", 2e3, (n) => {
      const i = n.target, a = n.shapes, l = n.position;
      return this.canAttachEventSubprocess(a, i, null, l) || this._canReplace(a, i, l) || this._canMove(a, i) || this._canInsert(a, i, l);
    });
  }
};
Xt.$inject = ["eventBus"];
const _8 = {
  bpmnRules: ["type", Xt]
};
class T8 extends B4 {
  constructor(n, i, a, l, o, s, r, c, u, m, h, f, v) {
    super(
      n,
      i,
      a,
      l,
      o,
      s,
      r,
      c,
      u,
      m,
      h,
      f,
      // @ts-expect-error
      v
    );
    M(this, "_contextPad");
    M(this, "_modeling");
    M(this, "_elementFactory");
    M(this, "_connect");
    M(this, "_create");
    M(this, "_popupMenu");
    M(this, "_canvas");
    M(this, "_rules");
    M(this, "_translate");
    M(this, "_autoPlace");
    this._contextPad = l, this._modeling = o, this._elementFactory = s, this._connect = r, this._create = c, this._popupMenu = u, this._canvas = m, this._rules = h, this._translate = f, this._autoPlace = i.get("autoPlace", !1);
  }
  getContextPadEntries(n) {
    var u;
    const i = this._modeling, a = this._autoPlace, l = this._elementFactory, o = this._create, s = this._translate, r = super.getContextPadEntries(n);
    if ((D(n, "bpmn:Participant") || D(n, "bpmn:Lane")) && !ht(n) && (r["lane-insert-above"] && (r["lane-insert-above"].className += " is-vertical"), r["lane-divide-two"] && (r["lane-divide-two"].className += " is-vertical"), r["lane-divide-three"] && (r["lane-divide-three"].className += " is-vertical"), r["lane-insert-below"] && (r["lane-insert-below"].className += " is-vertical")), r["append.append-task"]) {
      const m = (f, v) => {
        const y = l.createShape({ type: "bpmn:UserTask" });
        o.start(f, y, {
          source: v
        });
      }, h = this._autoPlace ? (f, v) => {
        const y = l.createShape({ type: "bpmn:UserTask" });
        a.append(v, y);
      } : m;
      r["append.append-task"] = {
        group: "model",
        className: "bpmn-icon-user-task",
        title: s("Append user task"),
        // title: '追加用户任务',
        action: {
          dragstart: m,
          click: h
        }
      };
    }
    if (r["append.compensation-activity"]) {
      const m = (f, v) => {
        const y = l.createShape({ type: "bpmn:ServiceTask" });
        o.start(f, y, {
          source: v
        });
      }, h = this._autoPlace ? (f, v) => {
        const y = l.createShape({ type: "bpmn:ServiceTask" });
        a.append(v, y);
      } : m;
      r["append.compensation-activity"] = {
        group: "model",
        className: "bpmn-icon-service-task",
        title: s("Append compensation service task"),
        // title: '追加补偿服务任务',
        action: {
          dragstart: m,
          click: h
        }
      };
    }
    return $8(n) && ((u = n.businessObject.sourceRef) == null ? void 0 : u.default) !== n.businessObject && (r["edit.replace-default"] = {
      group: "edit",
      className: "bpmn-icon-default-flow",
      // title: '设为默认流',
      title: s("Set as the default flow"),
      action: {
        click: () => {
          i.updateProperties(n.source, { default: n.businessObject });
        }
      }
    }), r;
  }
}
const x8 = ["bpmn:ExclusiveGateway"];
function $8(e) {
  return D(e, "bpmn:SequenceFlow") && _4(e.source, x8);
}
class s2 {
  constructor(t, n, i, a, l, o, s, r) {
    M(this, "_palette");
    M(this, "_spaceTool");
    M(this, "_lassoTool");
    M(this, "_handTool");
    M(this, "_globalConnect");
    M(this, "_elementFactory");
    M(this, "_create");
    M(this, "_translate");
    this._palette = t, this._create = n, this._elementFactory = i, this._spaceTool = a, this._lassoTool = l, this._handTool = o, this._globalConnect = s, this._translate = r, t.registerProvider(this);
  }
  getPaletteEntries() {
    const t = {}, n = this._create, i = this._elementFactory, a = this._spaceTool, l = this._lassoTool, o = this._handTool, s = this._globalConnect, r = this._translate;
    function c(h, f, v, y, g) {
      function A(Z) {
        const N = i.createShape(Y1({ type: h }, g));
        n.start(Z, N);
      }
      return {
        group: f,
        className: v,
        title: y,
        action: {
          // @ts-expect-error
          dragstart: A,
          // @ts-expect-error
          click: A
        }
      };
    }
    function u(h) {
      const f = i.createShape({
        type: "bpmn:SubProcess",
        x: 0,
        y: 0,
        isExpanded: !0
      }), v = i.createShape({
        type: "bpmn:StartEvent",
        x: 40,
        y: 82,
        parent: f
      });
      n.start(h, [f, v], {
        hints: {
          autoSelect: [f]
        }
      });
    }
    function m(h) {
      n.start(h, i.createParticipantShape());
    }
    return Y1(t, {
      "hand-tool": {
        group: "tools",
        className: "bpmn-icon-hand-tool",
        title: r("Activate hand tool"),
        action: {
          click: function(h) {
            o.activateHand(h);
          }
        }
      },
      "lasso-tool": {
        group: "tools",
        className: "bpmn-icon-lasso-tool",
        title: r("Activate lasso tool"),
        action: {
          click: function(h) {
            l.activateSelection(h);
          }
        }
      },
      "space-tool": {
        group: "tools",
        className: "bpmn-icon-space-tool",
        title: r("Activate create/remove space tool"),
        action: {
          click: function(h) {
            a.activateSelection(h);
          }
        }
      },
      "global-connect-tool": {
        group: "tools",
        className: "bpmn-icon-connection-multi",
        title: r("Activate global connect tool"),
        action: {
          click: function(h) {
            s.start(h);
          }
        }
      },
      "tool-separator": {
        group: "tools",
        separator: !0
      },
      "create.start-event": c(
        "bpmn:StartEvent",
        "start-event",
        "bpmn-icon-start-event-none",
        r("Create start event")
      ),
      "create.user-task": c(
        "bpmn:UserTask",
        "activity",
        "bpmn-icon-user-task",
        r("Create user task")
      ),
      "create.exclusive-gateway": c(
        "bpmn:ExclusiveGateway",
        "gateway",
        "bpmn-icon-gateway-none",
        r("Create gateway")
      ),
      "create.end-event": c(
        "bpmn:EndEvent",
        "end-event",
        "bpmn-icon-end-event-none",
        r("Create end event")
      ),
      "create.intermediate-event": c(
        "bpmn:IntermediateThrowEvent",
        "im-event",
        "bpmn-icon-intermediate-event-none",
        r("Create intermediate/boundary event")
      ),
      "create.subprocess-expanded": {
        group: "sub-activity",
        className: "bpmn-icon-subprocess-expanded",
        title: r("Create expanded sub-process"),
        action: {
          dragstart: u,
          click: u
        }
      },
      "create.participant-expanded": {
        group: "collaboration",
        className: "bpmn-icon-participant",
        title: r("Create pool/participant"),
        action: {
          dragstart: m,
          click: m
        }
      }
    }), t;
  }
}
M(s2, "$inject");
s2.$inject = [
  "palette",
  "create",
  "elementFactory",
  "spaceTool",
  "lassoTool",
  "handTool",
  "globalConnect",
  "translate"
];
function at(e) {
  return function(t) {
    const n = t.target, i = u0(e), a = i.eventDefinitions && i.eventDefinitions[0], l = i.$type === n.type, o = (a && a.$type) === n.eventDefinitionType, s = !!n.triggeredByEvent == !!i.triggeredByEvent, r = n.isExpanded === void 0 || n.isExpanded === P0(e), c = !l || !o || !s || !r, u = i.get("type") === n.childType, m = s1(i, n.extensionElement)[0], h = (m && m.$type) === n.extensionElement;
    return D(e, "bpmn:ServiceTask") ? c || !u : D(e, "bpmn:Event") ? c || !h : c || i.get("type") !== n.childType;
  };
}
const M8 = [
  {
    label: "Start event",
    actionName: "replace-with-none-start",
    className: "bpmn-icon-start-event-none",
    target: {
      type: "bpmn:StartEvent"
    }
  },
  {
    label: "Intermediate throw event",
    actionName: "replace-with-none-intermediate-throwing",
    className: "bpmn-icon-intermediate-event-none",
    target: {
      type: "bpmn:IntermediateThrowEvent"
    }
  },
  {
    label: "End event",
    actionName: "replace-with-none-end",
    className: "bpmn-icon-end-event-none",
    target: {
      type: "bpmn:EndEvent"
    }
  },
  {
    label: "Message start event",
    actionName: "replace-with-message-start",
    className: "bpmn-icon-start-event-message",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:MessageEventDefinition"
    }
  },
  {
    label: "Timer start event",
    actionName: "replace-with-timer-start",
    className: "bpmn-icon-start-event-timer",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:TimerEventDefinition"
    }
  },
  {
    label: "Conditional start event",
    actionName: "replace-with-conditional-start",
    className: "bpmn-icon-start-event-condition",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:ConditionalEventDefinition"
    }
  },
  {
    label: "Signal start event",
    actionName: "replace-with-signal-start",
    className: "bpmn-icon-start-event-signal",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:SignalEventDefinition"
    }
  },
  {
    label: "Variable start event",
    actionName: "replace-with-multiple-start",
    className: "bpmn-icon-start-event-multiple",
    target: {
      type: "bpmn:StartEvent",
      extensionElement: "flowable:VariableListenerEventDefinition"
    }
  }
], P8 = [
  {
    label: "Start event",
    actionName: "replace-with-none-start",
    className: "bpmn-icon-start-event-none",
    target: {
      type: "bpmn:StartEvent"
    }
  },
  {
    label: "Intermediate throw event",
    actionName: "replace-with-none-intermediate-throwing",
    className: "bpmn-icon-intermediate-event-none",
    target: {
      type: "bpmn:IntermediateThrowEvent"
    }
  },
  {
    label: "End event",
    actionName: "replace-with-none-end",
    className: "bpmn-icon-end-event-none",
    target: {
      type: "bpmn:EndEvent"
    }
  }
], A8 = [
  {
    label: "Start event",
    actionName: "replace-with-none-start",
    className: "bpmn-icon-start-event-none",
    target: {
      type: "bpmn:StartEvent"
    }
  },
  {
    label: "Intermediate throw event",
    actionName: "replace-with-none-intermediate-throw",
    className: "bpmn-icon-intermediate-event-none",
    target: {
      type: "bpmn:IntermediateThrowEvent"
    }
  },
  {
    label: "End event",
    actionName: "replace-with-none-end",
    className: "bpmn-icon-end-event-none",
    target: {
      type: "bpmn:EndEvent"
    }
  },
  {
    label: "Message intermediate catch event",
    actionName: "replace-with-message-intermediate-catch",
    className: "bpmn-icon-intermediate-event-catch-message",
    target: {
      type: "bpmn:IntermediateCatchEvent",
      eventDefinitionType: "bpmn:MessageEventDefinition"
    }
  },
  {
    label: "Message intermediate throw event",
    actionName: "replace-with-message-intermediate-throw",
    className: "bpmn-icon-intermediate-event-throw-message",
    target: {
      type: "bpmn:IntermediateThrowEvent",
      eventDefinitionType: "bpmn:MessageEventDefinition"
    }
  },
  {
    label: "Timer intermediate catch event",
    actionName: "replace-with-timer-intermediate-catch",
    className: "bpmn-icon-intermediate-event-catch-timer",
    target: {
      type: "bpmn:IntermediateCatchEvent",
      eventDefinitionType: "bpmn:TimerEventDefinition"
    }
  },
  {
    label: "Escalation intermediate throw event",
    actionName: "replace-with-escalation-intermediate-throw",
    className: "bpmn-icon-intermediate-event-throw-escalation",
    target: {
      type: "bpmn:IntermediateThrowEvent",
      eventDefinitionType: "bpmn:EscalationEventDefinition"
    }
  },
  {
    label: "Conditional intermediate catch event",
    actionName: "replace-with-conditional-intermediate-catch",
    className: "bpmn-icon-intermediate-event-catch-condition",
    target: {
      type: "bpmn:IntermediateCatchEvent",
      eventDefinitionType: "bpmn:ConditionalEventDefinition"
    }
  },
  {
    label: "Link intermediate catch event",
    actionName: "replace-with-link-intermediate-catch",
    className: "bpmn-icon-intermediate-event-catch-link",
    target: {
      type: "bpmn:IntermediateCatchEvent",
      eventDefinitionType: "bpmn:LinkEventDefinition",
      eventDefinitionAttrs: {
        name: ""
      }
    }
  },
  {
    label: "Variable intermediate catch event",
    actionName: "replace-with-multiple-intermediate-catch",
    className: "bpmn-icon-intermediate-event-catch-multiple",
    target: {
      type: "bpmn:IntermediateCatchEvent",
      extensionElement: "flowable:VariableListenerEventDefinition"
    }
  },
  {
    label: "Link intermediate throw event",
    actionName: "replace-with-link-intermediate-throw",
    className: "bpmn-icon-intermediate-event-throw-link",
    target: {
      type: "bpmn:IntermediateThrowEvent",
      eventDefinitionType: "bpmn:LinkEventDefinition",
      eventDefinitionAttrs: {
        name: ""
      }
    }
  },
  {
    label: "Compensation intermediate throw event",
    actionName: "replace-with-compensation-intermediate-throw",
    className: "bpmn-icon-intermediate-event-throw-compensation",
    target: {
      type: "bpmn:IntermediateThrowEvent",
      eventDefinitionType: "bpmn:CompensateEventDefinition"
    }
  },
  {
    label: "Signal intermediate catch event",
    actionName: "replace-with-signal-intermediate-catch",
    className: "bpmn-icon-intermediate-event-catch-signal",
    target: {
      type: "bpmn:IntermediateCatchEvent",
      eventDefinitionType: "bpmn:SignalEventDefinition"
    }
  },
  {
    label: "Signal intermediate throw event",
    actionName: "replace-with-signal-intermediate-throw",
    className: "bpmn-icon-intermediate-event-throw-signal",
    target: {
      type: "bpmn:IntermediateThrowEvent",
      eventDefinitionType: "bpmn:SignalEventDefinition"
    }
  }
], Z8 = [
  {
    label: "Start event",
    actionName: "replace-with-none-start",
    className: "bpmn-icon-start-event-none",
    target: {
      type: "bpmn:StartEvent"
    }
  },
  {
    label: "Intermediate throw event",
    actionName: "replace-with-none-intermediate-throw",
    className: "bpmn-icon-intermediate-event-none",
    target: {
      type: "bpmn:IntermediateThrowEvent"
    }
  },
  {
    label: "End event",
    actionName: "replace-with-none-end",
    className: "bpmn-icon-end-event-none",
    target: {
      type: "bpmn:EndEvent"
    }
  },
  {
    label: "Message end event",
    actionName: "replace-with-message-end",
    className: "bpmn-icon-end-event-message",
    target: {
      type: "bpmn:EndEvent",
      eventDefinitionType: "bpmn:MessageEventDefinition"
    }
  },
  {
    label: "Escalation end event",
    actionName: "replace-with-escalation-end",
    className: "bpmn-icon-end-event-escalation",
    target: {
      type: "bpmn:EndEvent",
      eventDefinitionType: "bpmn:EscalationEventDefinition"
    }
  },
  {
    label: "Error end event",
    actionName: "replace-with-error-end",
    className: "bpmn-icon-end-event-error",
    target: {
      type: "bpmn:EndEvent",
      eventDefinitionType: "bpmn:ErrorEventDefinition"
    }
  },
  {
    label: "Cancel end event",
    actionName: "replace-with-cancel-end",
    className: "bpmn-icon-end-event-cancel",
    target: {
      type: "bpmn:EndEvent",
      eventDefinitionType: "bpmn:CancelEventDefinition"
    }
  },
  {
    label: "Compensation end event",
    actionName: "replace-with-compensation-end",
    className: "bpmn-icon-end-event-compensation",
    target: {
      type: "bpmn:EndEvent",
      eventDefinitionType: "bpmn:CompensateEventDefinition"
    }
  },
  {
    label: "Signal end event",
    actionName: "replace-with-signal-end",
    className: "bpmn-icon-end-event-signal",
    target: {
      type: "bpmn:EndEvent",
      eventDefinitionType: "bpmn:SignalEventDefinition"
    }
  },
  {
    label: "Terminate end event",
    actionName: "replace-with-terminate-end",
    className: "bpmn-icon-end-event-terminate",
    target: {
      type: "bpmn:EndEvent",
      eventDefinitionType: "bpmn:TerminateEventDefinition"
    }
  }
], B8 = [
  {
    label: "Exclusive gateway",
    actionName: "replace-with-exclusive-gateway",
    className: "bpmn-icon-gateway-xor",
    target: {
      type: "bpmn:ExclusiveGateway"
    }
  },
  {
    label: "Parallel gateway",
    actionName: "replace-with-parallel-gateway",
    className: "bpmn-icon-gateway-parallel",
    target: {
      type: "bpmn:ParallelGateway"
    }
  },
  {
    label: "Inclusive gateway",
    actionName: "replace-with-inclusive-gateway",
    className: "bpmn-icon-gateway-or",
    target: {
      type: "bpmn:InclusiveGateway"
    }
  },
  {
    label: "Complex gateway",
    actionName: "replace-with-complex-gateway",
    className: "bpmn-icon-gateway-complex",
    target: {
      type: "bpmn:ComplexGateway"
    }
  },
  {
    label: "Event-based gateway",
    actionName: "replace-with-event-based-gateway",
    className: "bpmn-icon-gateway-eventbased",
    target: {
      type: "bpmn:EventBasedGateway",
      instantiate: !1,
      eventGatewayType: "Exclusive"
    }
  }
  // Gateways deactivated until https://github.com/bpmn-io/bpmn-js/issues/194
  // {
  //   label: 'Event based instantiating Gateway',
  //   actionName: 'replace-with-exclusive-event-based-gateway',
  //   className: 'bpmn-icon-exclusive-event-based',
  //   target: {
  //     type: 'bpmn:EventBasedGateway'
  //   },
  //   options: {
  //     businessObject: { instantiate: true, eventGatewayType: 'Exclusive' }
  //   }
  // },
  // {
  //   label: 'Parallel Event based instantiating Gateway',
  //   actionName: 'replace-with-parallel-event-based-instantiate-gateway',
  //   className: 'bpmn-icon-parallel-event-based-instantiate-gateway',
  //   target: {
  //     type: 'bpmn:EventBasedGateway'
  //   },
  //   options: {
  //     businessObject: { instantiate: true, eventGatewayType: 'Parallel' }
  //   }
  // }
], N8 = [
  {
    label: "Transaction",
    actionName: "replace-with-transaction",
    className: "bpmn-icon-transaction",
    target: {
      type: "bpmn:Transaction",
      isExpanded: !0
    }
  },
  {
    label: "Event sub-process",
    actionName: "replace-with-event-subprocess",
    className: "bpmn-icon-event-subprocess-expanded",
    target: {
      type: "bpmn:SubProcess",
      triggeredByEvent: !0,
      isExpanded: !0
    }
  },
  {
    label: "Sub-process (collapsed)",
    actionName: "replace-with-collapsed-subprocess",
    className: "bpmn-icon-subprocess-collapsed",
    target: {
      type: "bpmn:SubProcess",
      isExpanded: !1
    }
  }
], Jt = [
  {
    label: "Transaction",
    actionName: "replace-with-transaction",
    className: "bpmn-icon-transaction",
    target: {
      type: "bpmn:Transaction",
      isExpanded: !0
    }
  },
  {
    label: "Sub-process",
    actionName: "replace-with-subprocess",
    className: "bpmn-icon-subprocess-expanded",
    target: {
      type: "bpmn:SubProcess",
      isExpanded: !0
    }
  },
  {
    label: "Event sub-process",
    actionName: "replace-with-event-subprocess",
    className: "bpmn-icon-event-subprocess-expanded",
    target: {
      type: "bpmn:SubProcess",
      triggeredByEvent: !0,
      isExpanded: !0
    }
  }
], L8 = Jt, lt = [
  //空任务没有任何意义，去掉
  // {
  //   label: 'Task',
  //   actionName: 'replace-with-task',
  //   className: 'bpmn-icon-task',
  //   target: {
  //     type: 'bpmn:Task'
  //   }
  // },
  {
    label: "User task",
    actionName: "replace-with-user-task",
    className: "bpmn-icon-user",
    target: {
      type: "bpmn:UserTask"
    }
  },
  {
    label: "Copy Service Task",
    actionName: "replace-with-copy-service-task",
    className: "fbpmn-icon-copy-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "copy"
    }
  },
  {
    label: "Sc Service Task",
    actionName: "replace-with-sc-service-task",
    className: "fbpmn-icon-sc-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "sc"
    }
  },
  {
    label: "Dubbo Service Task",
    actionName: "replace-with-dubbo-service-task",
    className: "fbpmn-icon-dubbo-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "dubbo"
    }
  },
  {
    label: "Service task",
    actionName: "replace-with-service-task",
    className: "bpmn-icon-service",
    target: {
      type: "bpmn:ServiceTask"
    }
  },
  {
    label: "Dmn Service Task",
    actionName: "replace-with-dmn-service-task",
    className: "fbpmn-icon-dmn-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "dmn"
    }
  },
  {
    label: "Mq Service Task",
    actionName: "replace-with-mq-service-task",
    className: "fbpmn-icon-mq-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "mq"
    }
  },
  {
    label: "Call activity",
    actionName: "replace-with-call-activity",
    className: "bpmn-icon-call-activity",
    target: {
      type: "bpmn:CallActivity"
    }
  },
  {
    label: "Sub-process (expanded)",
    actionName: "replace-with-expanded-subprocess",
    className: "bpmn-icon-subprocess-expanded",
    target: {
      type: "bpmn:SubProcess",
      isExpanded: !0
    }
  },
  {
    label: "Rest Service Task",
    actionName: "replace-with-rest-service-task",
    className: "fbpmn-icon-rest-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "rest"
    }
  },
  {
    label: "Http Service Task",
    actionName: "replace-with-http-service-task",
    className: "fbpmn-icon-http-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "http"
    }
  },
  {
    label: "Email Service Task",
    actionName: "replace-with-mail-service-task",
    className: "fbpmn-icon-mail-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "email"
    }
  },
  {
    label: "Script task",
    actionName: "replace-with-script-task",
    className: "bpmn-icon-script",
    target: {
      type: "bpmn:ScriptTask"
    }
  },
  {
    label: "Shell Service Task",
    actionName: "replace-with-shell-service-task",
    className: "fbpmn-icon-shell-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "shell"
    }
  },
  {
    label: "Send task",
    actionName: "replace-with-send-task",
    className: "bpmn-icon-send",
    target: {
      type: "bpmn:SendTask"
    }
  },
  {
    label: "Receive task",
    actionName: "replace-with-receive-task",
    className: "bpmn-icon-receive",
    target: {
      type: "bpmn:ReceiveTask"
    }
  },
  {
    label: "Manual task",
    actionName: "replace-with-manual-task",
    className: "bpmn-icon-manual",
    target: {
      type: "bpmn:ManualTask"
    }
  },
  //业务规则被DMN代替，所以这个组件作废了
  {
    label: "Camel Service Task",
    actionName: "replace-with-camel-service-task",
    className: "fbpmn-icon-camel-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "camel"
    }
  },
  {
    label: "Sub-process (collapsed)",
    actionName: "replace-with-collapsed-subprocess",
    className: "bpmn-icon-subprocess-collapsed",
    target: {
      type: "bpmn:SubProcess",
      isExpanded: !1
    }
  }
], D8 = [
  {
    label: "Data store reference",
    actionName: "replace-with-data-store-reference",
    className: "bpmn-icon-data-store",
    target: {
      type: "bpmn:DataStoreReference"
    }
  }
], I8 = [
  {
    label: "Data object reference",
    actionName: "replace-with-data-object-reference",
    className: "bpmn-icon-data-object",
    target: {
      type: "bpmn:DataObjectReference"
    }
  }
], O8 = [
  {
    label: "Message boundary event",
    actionName: "replace-with-message-boundary",
    className: "bpmn-icon-intermediate-event-catch-message",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:MessageEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Timer boundary event",
    actionName: "replace-with-timer-boundary",
    className: "bpmn-icon-intermediate-event-catch-timer",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:TimerEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Escalation boundary event",
    actionName: "replace-with-escalation-boundary",
    className: "bpmn-icon-intermediate-event-catch-escalation",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:EscalationEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Conditional boundary event",
    actionName: "replace-with-conditional-boundary",
    className: "bpmn-icon-intermediate-event-catch-condition",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:ConditionalEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Variable boundary event",
    actionName: "replace-with-multiple-boundary",
    className: "bpmn-icon-intermediate-event-catch-multiple",
    target: {
      type: "bpmn:BoundaryEvent",
      extensionElement: "flowable:VariableListenerEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Error boundary event",
    actionName: "replace-with-error-boundary",
    className: "bpmn-icon-intermediate-event-catch-error",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:ErrorEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Cancel boundary event",
    actionName: "replace-with-cancel-boundary",
    className: "bpmn-icon-intermediate-event-catch-cancel",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:CancelEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Signal boundary event",
    actionName: "replace-with-signal-boundary",
    className: "bpmn-icon-intermediate-event-catch-signal",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:SignalEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Compensation boundary event",
    actionName: "replace-with-compensation-boundary",
    className: "bpmn-icon-intermediate-event-catch-compensation",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:CompensateEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Message boundary event (non-interrupting)",
    actionName: "replace-with-non-interrupting-message-boundary",
    className: "bpmn-icon-intermediate-event-catch-non-interrupting-message",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:MessageEventDefinition",
      cancelActivity: !1
    }
  },
  {
    label: "Timer boundary event (non-interrupting)",
    actionName: "replace-with-non-interrupting-timer-boundary",
    className: "bpmn-icon-intermediate-event-catch-non-interrupting-timer",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:TimerEventDefinition",
      cancelActivity: !1
    }
  },
  {
    label: "Escalation boundary event (non-interrupting)",
    actionName: "replace-with-non-interrupting-escalation-boundary",
    className: "bpmn-icon-intermediate-event-catch-non-interrupting-escalation",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:EscalationEventDefinition",
      cancelActivity: !1
    }
  },
  {
    label: "Conditional boundary event (non-interrupting)",
    actionName: "replace-with-non-interrupting-conditional-boundary",
    className: "bpmn-icon-intermediate-event-catch-non-interrupting-condition",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:ConditionalEventDefinition",
      cancelActivity: !1
    }
  },
  {
    label: "Variable boundary event (non-interrupting)",
    actionName: "replace-with-non-interrupting-multiple-boundary",
    className: "bpmn-icon-intermediate-event-catch-non-interrupting-multiple",
    target: {
      type: "bpmn:BoundaryEvent",
      extensionElement: "flowable:VariableListenerEventDefinition",
      cancelActivity: !1
    }
  },
  {
    label: "Signal boundary event (non-interrupting)",
    actionName: "replace-with-non-interrupting-signal-boundary",
    className: "bpmn-icon-intermediate-event-catch-non-interrupting-signal",
    target: {
      type: "bpmn:BoundaryEvent",
      eventDefinitionType: "bpmn:SignalEventDefinition",
      cancelActivity: !1
    }
  }
], V8 = [
  {
    label: "Message start event",
    actionName: "replace-with-message-start",
    className: "bpmn-icon-start-event-message",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:MessageEventDefinition",
      isInterrupting: !0
    }
  },
  {
    label: "Timer start event",
    actionName: "replace-with-timer-start",
    className: "bpmn-icon-start-event-timer",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:TimerEventDefinition",
      isInterrupting: !0
    }
  },
  {
    label: "Conditional start event",
    actionName: "replace-with-conditional-start",
    className: "bpmn-icon-start-event-condition",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:ConditionalEventDefinition",
      isInterrupting: !0
    }
  },
  {
    label: "Signal start event",
    actionName: "replace-with-signal-start",
    className: "bpmn-icon-start-event-signal",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:SignalEventDefinition",
      isInterrupting: !0
    }
  },
  {
    label: "Error start event",
    actionName: "replace-with-error-start",
    className: "bpmn-icon-start-event-error",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:ErrorEventDefinition",
      isInterrupting: !0
    }
  },
  {
    label: "Escalation start event",
    actionName: "replace-with-escalation-start",
    className: "bpmn-icon-start-event-escalation",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:EscalationEventDefinition",
      isInterrupting: !0
    }
  },
  {
    label: "Compensation start event",
    actionName: "replace-with-compensation-start",
    className: "bpmn-icon-start-event-compensation",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:CompensateEventDefinition",
      isInterrupting: !0
    }
  },
  {
    label: "Variable start event",
    actionName: "replace-with-multiple-start",
    className: "bpmn-icon-start-event-multiple",
    target: {
      type: "bpmn:StartEvent",
      extensionElement: "flowable:VariableListenerEventDefinition"
    }
  },
  {
    label: "Message start event (non-interrupting)",
    actionName: "replace-with-non-interrupting-message-start",
    className: "bpmn-icon-start-event-non-interrupting-message",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:MessageEventDefinition",
      isInterrupting: !1
    }
  },
  {
    label: "Timer start event (non-interrupting)",
    actionName: "replace-with-non-interrupting-timer-start",
    className: "bpmn-icon-start-event-non-interrupting-timer",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:TimerEventDefinition",
      isInterrupting: !1
    }
  },
  {
    label: "Conditional start event (non-interrupting)",
    actionName: "replace-with-non-interrupting-conditional-start",
    className: "bpmn-icon-start-event-non-interrupting-condition",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:ConditionalEventDefinition",
      isInterrupting: !1
    }
  },
  {
    label: "Signal start event (non-interrupting)",
    actionName: "replace-with-non-interrupting-signal-start",
    className: "bpmn-icon-start-event-non-interrupting-signal",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:SignalEventDefinition",
      isInterrupting: !1
    }
  },
  {
    label: "Escalation start event (non-interrupting)",
    actionName: "replace-with-non-interrupting-escalation-start",
    className: "bpmn-icon-start-event-non-interrupting-escalation",
    target: {
      type: "bpmn:StartEvent",
      eventDefinitionType: "bpmn:EscalationEventDefinition",
      isInterrupting: !1
    }
  },
  {
    label: "Variable start event (non-interrupting)",
    actionName: "replace-with-non-interrupting-multiple-start",
    className: "bpmn-icon-start-event-non-interrupting-multiple",
    target: {
      type: "bpmn:StartEvent",
      extensionElement: "flowable:VariableListenerEventDefinition",
      isInterrupting: !1
    }
  }
], z8 = [
  {
    label: "Sequence flow",
    actionName: "replace-with-sequence-flow",
    className: "bpmn-icon-connection"
  },
  {
    label: "Default flow",
    actionName: "replace-with-default-flow",
    className: "bpmn-icon-default-flow"
  },
  {
    label: "Conditional flow",
    actionName: "replace-with-conditional-flow",
    className: "bpmn-icon-conditional-flow"
  }
], ot = [
  {
    label: "Horizontal expanded pool/participant",
    actionName: "replace-with-expanded-pool",
    className: "bpmn-icon-participant",
    target: {
      type: "bpmn:Participant",
      isEmpty: !1,
      isExpanded: !0,
      isHorizontal: !0
    }
  },
  {
    label: "Vertical expanded pool/participant",
    actionName: "replace-with-expanded-pool",
    className: "bpmn-icon-participant is-vertical",
    target: {
      type: "bpmn:Participant",
      isEmpty: !1,
      isExpanded: !0,
      isHorizontal: !1
    }
  },
  {
    label: function(e) {
      let t = "Empty pool/participant";
      return e.children && e.children.length && (t += " (removes content)"), t;
    },
    actionName: "replace-with-collapsed-pool",
    className: "bpmn-icon-lane",
    target: {
      type: "bpmn:Participant",
      isEmpty: !0,
      isExpanded: !1,
      isHorizontal: !0
    }
  }
];
class Qt extends N4 {
  constructor(n, i, a, l, o, s, r, c) {
    super(n, i, a, l, o, s, r, c);
    M(this, "_bpmnFactory");
    M(this, "_popupMenu");
    M(this, "_modeling");
    M(this, "_moddle");
    M(this, "_bpmnReplace");
    M(this, "_rules");
    M(this, "_translate");
    M(this, "_moddleCopy");
    M(this, "_createEntries");
    this._bpmnFactory = n, this._popupMenu = i, this._modeling = a, this._moddle = l, this._bpmnReplace = o, this._rules = s, this._translate = r, this._moddleCopy = c, this._register(), this._createEntries = super._createEntries;
  }
  _getLoopCharacteristicsHeaderEntries(n) {
    const i = this._translate, a = this._modeling, l = this._moddle, o = this._moddleCopy, s = (h, f) => {
      if (f.active) {
        a.updateProperties(n, { loopCharacteristics: void 0 });
        return;
      }
      const v = n.businessObject.get("loopCharacteristics"), y = l.create(f.options.loopCharacteristics);
      v && o.copyElement(v, y), y.set("isSequential", f.options.isSequential), a.updateProperties(n, { loopCharacteristics: y });
    }, r = u0(n), c = r.loopCharacteristics;
    let u, m;
    return c && (u = c.isSequential, m = c.isSequential !== void 0 && !c.isSequential), {
      "toggle-parallel-mi": {
        className: "bpmn-icon-parallel-mi-marker",
        title: i("Parallel multi-instance"),
        active: m,
        action: s,
        options: {
          loopCharacteristics: "bpmn:MultiInstanceLoopCharacteristics",
          isSequential: !1
        }
      },
      "toggle-sequential-mi": {
        className: "bpmn-icon-sequential-mi-marker",
        title: i("Sequential multi-instance"),
        active: u,
        action: s,
        options: {
          loopCharacteristics: "bpmn:MultiInstanceLoopCharacteristics",
          isSequential: !0
        }
      }
    };
  }
  getPopupMenuEntries(n) {
    const i = n.businessObject, a = this._rules;
    let l = [];
    if (a2(n) || !a.allowed("shape.replace", { element: n }))
      return {};
    const o = at(n);
    return D(i, "bpmn:DataObjectReference") ? this._createEntries(n, D8) : D(i, "bpmn:DataStoreReference") && !D(n.parent, "bpmn:Collaboration") ? this._createEntries(n, I8) : D(i, "bpmn:StartEvent") && !D(i.$parent, "bpmn:SubProcess") ? (l = c0(M8, o), this._createEntries(n, l)) : D(i, "bpmn:Participant") ? L4(n).length ? (l = c0(ot, function(r) {
      var c;
      return ((c = r.target) == null ? void 0 : c.isEmpty) === !0;
    }), this._createEntries(n, l)) : (l = c0(ot, function(r) {
      return P0(n) !== r.target.isExpanded || ht(n) !== r.target.isHorizontal;
    }), this._createEntries(n, l)) : D(i, "bpmn:StartEvent") && X0(i.$parent) ? (l = c0(
      V8,
      function(s) {
        const c = s.target.isInterrupting !== !1, u = i.isInterrupting === c;
        return o(s) || !o(s) && !u;
      }
    ), this._createEntries(n, l)) : D(i, "bpmn:StartEvent") && !X0(i.$parent) && D(i.$parent, "bpmn:SubProcess") ? (l = c0(P8, o), this._createEntries(n, l)) : D(i, "bpmn:EndEvent") ? (l = c0(Z8, function(s) {
      return s.target.eventDefinitionType == "bpmn:CancelEventDefinition" && !D(i.$parent, "bpmn:Transaction") ? !1 : o(s);
    }), this._createEntries(n, l)) : D(i, "bpmn:BoundaryEvent") ? (l = c0(O8, function(s) {
      const r = s.target;
      if (r.eventDefinitionType == "bpmn:CancelEventDefinition" && !D(i.attachedToRef, "bpmn:Transaction"))
        return !1;
      const c = r.cancelActivity !== !1, u = i.cancelActivity == c;
      return o(s) || !o(s) && !u;
    }), this._createEntries(n, l)) : D(i, "bpmn:IntermediateCatchEvent") || D(i, "bpmn:IntermediateThrowEvent") ? (l = c0(A8, o), this._createEntries(n, l)) : D(i, "bpmn:Gateway") ? (l = c0(B8, o), this._createEntries(n, l)) : D(i, "bpmn:Transaction") ? (l = c0(Jt, o), this._createEntries(n, l)) : X0(i) && P0(n) ? (l = c0(L8, o), this._createEntries(n, l)) : D(i, "bpmn:SubProcess") && P0(n) ? (l = c0(N8, o), this._createEntries(n, l)) : D(i, "bpmn:AdHocSubProcess") && !P0(n) ? (l = c0(lt, function(s) {
      const r = s.target, c = r.type === "bpmn:SubProcess", u = r.isExpanded === !0;
      return at(r) && (!c || u);
    }), this._createEntries(n, l)) : D(i, "bpmn:SequenceFlow") ? this._createSequenceFlowEntries(n, z8) : D(i, "bpmn:FlowNode") ? (l = c0(lt, o), D(i, "bpmn:SubProcess") && !P0(n) && (l = c0(l, function(s) {
      return s.label !== "Sub-process (collapsed)";
    })), this._createEntries(n, l)) : {};
  }
}
Qt.$inject = [
  "bpmnFactory",
  "popupMenu",
  "modeling",
  "moddle",
  "bpmnReplace",
  "rules",
  "translate",
  "moddleCopy"
];
const e4 = [
  {
    label: "Copy Service Task",
    actionName: "copy-service-task",
    className: "fbpmn-icon-copy-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "copy"
    }
  },
  {
    label: "Sc Service Task",
    actionName: "sc-service-task",
    className: "fbpmn-icon-sc-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "sc"
    }
  },
  {
    label: "Dubbo Service Task",
    actionName: "dubbo-service-task",
    className: "fbpmn-icon-dubbo-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "dubbo"
    }
  },
  {
    label: "Service task",
    actionName: "service-task",
    className: "bpmn-icon-service",
    target: {
      type: "bpmn:ServiceTask"
    }
  },
  {
    label: "Dmn Service Task",
    actionName: "dmn-service-task",
    className: "fbpmn-icon-dmn-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "dmn"
    }
  },
  {
    label: "Mq Service Task",
    actionName: "mq-service-task",
    className: "fbpmn-icon-mq-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "mq"
    }
  },
  {
    label: "Rest Service Task",
    actionName: "rest-service-task",
    className: "fbpmn-icon-rest-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "rest"
    }
  },
  {
    label: "Http Service Task",
    actionName: "http-service-task",
    className: "fbpmn-icon-http-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "http"
    }
  },
  {
    label: "Email Service Task",
    actionName: "mail-service-task",
    className: "fbpmn-icon-mail-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "email"
    }
  },
  {
    label: "Camel Service Task",
    actionName: "camel-service-task",
    className: "fbpmn-icon-camel-service-task",
    target: {
      type: "bpmn:ServiceTask",
      childType: "camel"
    }
  }
], F8 = [
  {
    label: "Variable start event",
    idx: 6,
    actionName: "variable-start-event",
    className: "bpmn-icon-start-event-multiple",
    target: {
      type: "bpmn:StartEvent",
      extensionElement: "flowable:VariableListenerEventDefinition"
    }
  }
], t4 = [
  {
    label: "Variable intermediate catch event",
    actionName: "variable-intermediate-catch",
    className: "bpmn-icon-intermediate-event-catch-multiple",
    target: {
      type: "bpmn:IntermediateCatchEvent",
      extensionElement: "flowable:VariableListenerEventDefinition"
    }
  },
  {
    label: "Variable boundary event",
    actionName: "variable-boundary-event",
    className: "bpmn-icon-intermediate-event-catch-multiple",
    target: {
      type: "bpmn:BoundaryEvent",
      extensionElement: "flowable:VariableListenerEventDefinition",
      cancelActivity: !0
    }
  },
  {
    label: "Variable boundary event (non-interrupting)",
    actionName: "non-interrupting-variable-boundary-event",
    className: "bpmn-icon-intermediate-event-catch-non-interrupting-multiple",
    target: {
      type: "bpmn:BoundaryEvent",
      extensionElement: "flowable:VariableListenerEventDefinition",
      cancelActivity: !1
    }
  }
];
class c2 {
  constructor(t, n, i, a, l, o, s, r) {
    M(this, "_elementFactory");
    M(this, "_bpmnFactory");
    M(this, "_popupMenu");
    M(this, "_create");
    M(this, "_autoPlace");
    M(this, "_mouse");
    M(this, "_moddle");
    M(this, "_translate");
    this._elementFactory = t, this._bpmnFactory = n, this._popupMenu = i, this._create = a, this._autoPlace = l, this._mouse = o, this._moddle = s, this._translate = r, this.register();
  }
  register() {
    this._popupMenu.registerProvider("bpmn-create", this);
  }
  getPopupMenuEntries() {
    const t = this._translate, n = {};
    for (const i of e4) {
      const a = {
        id: "tasks",
        name: t("Tasks")
      };
      this._assignEntry(n, { ...i, group: a });
    }
    for (const i of F8) {
      const a = {
        id: "events",
        name: t("Events")
      };
      this._assignEntry(n, { ...i, group: a });
    }
    for (const i of t4) {
      const a = {
        id: "events",
        name: t("Events")
      };
      this._assignEntry(n, { ...i, group: a });
    }
    return n;
  }
  _assignEntry(t, n) {
    const { className: i, actionName: a, label: l, target: o, group: s } = n, r = this._createEntryAction(o);
    t[`create-${a}`] = {
      label: this._translate(l),
      className: i,
      group: s,
      rank: 1,
      action: r
    };
  }
  _createEntryAction(t) {
    const n = this._create, i = this._mouse, a = this._moddle, l = this._popupMenu, o = this._elementFactory, s = this._bpmnFactory, { type: r, childType: c, extensionElement: u } = t;
    return (m) => {
      l.close();
      let h;
      if (c) {
        const f = s.create(r, { "flowable:type": c });
        h = o.create("shape", { type: r, businessObject: f });
      } else if (u) {
        const f = a.create(u), v = a.create("bpmn:ExtensionElements", { values: [f] }), y = s.create(r, { extensionElements: v });
        h = o.create("shape", { type: r, businessObject: y });
      } else
        h = o.create("shape", { ...t });
      return m instanceof KeyboardEvent && (m = i.getLastMoveEvent()), n.start(m, h);
    };
  }
}
M(c2, "$inject");
c2.$inject = [
  "elementFactory",
  "bpmnFactory",
  "popupMenu",
  "create",
  "autoPlace",
  "mouse",
  "moddle",
  "translate"
];
class u2 {
  constructor(t, n, i, a, l, o, s, r, c) {
    M(this, "_elementFactory");
    M(this, "_bpmnFactory");
    M(this, "_popupMenu");
    M(this, "_create");
    M(this, "_autoPlace");
    M(this, "_rules");
    M(this, "_mouse");
    M(this, "_moddle");
    M(this, "_translate");
    this._elementFactory = t, this._bpmnFactory = n, this._popupMenu = i, this._create = a, this._autoPlace = l, this._rules = o, this._mouse = s, this._moddle = r, this._translate = c, this.register();
  }
  register() {
    this._popupMenu.registerProvider("bpmn-append", this);
  }
  getPopupMenuEntries(t) {
    const n = this._rules, i = this._translate, a = {};
    if (!n.allowed("shape.append", { element: t }))
      return [];
    for (const l of e4) {
      const o = {
        id: "tasks",
        name: i("Tasks")
      };
      this._assignEntry(t, a, { ...l, group: o });
    }
    for (const l of t4) {
      const o = {
        id: "events",
        name: i("Events")
      };
      this._assignEntry(t, a, { ...l, group: o });
    }
    return a;
  }
  _assignEntry(t, n, i) {
    const { className: a, actionName: l, label: o, target: s, group: r } = i, c = this._createEntryAction(t, s);
    n[`append-${l}`] = {
      label: this._translate(o),
      className: a,
      group: r,
      rank: 1,
      action: c
    };
  }
  _createEntryAction(t, n) {
    const i = this._elementFactory, a = this._moddle, l = this._bpmnFactory, o = this._autoPlace, s = this._create, r = this._mouse, { type: c, childType: u, extensionElement: m } = n, h = () => {
      const v = l.create(c, { "flowable:type": u }), y = i.create("shape", { type: c, businessObject: v });
      o.append(t, y);
    }, f = (v) => {
      let y;
      if (u) {
        const g = l.create(c, { "flowable:type": u });
        y = i.create("shape", { type: c, businessObject: g });
      } else if (m) {
        const g = a.create(m), A = a.create("bpmn:ExtensionElements", { values: [g] }), Z = l.create(c, { extensionElements: A });
        y = i.create("shape", { type: c, businessObject: Z });
      } else
        y = i.create("shape", { ...n });
      return v instanceof KeyboardEvent && (v = r.getLastMoveEvent()), s.start(v, y, {
        source: t
      });
    };
    return {
      // @ts-expect-error
      click: this._canAutoPlaceElement(n) ? h : f,
      dragstart: f
    };
  }
  _canAutoPlaceElement(t) {
    const { type: n } = t;
    return !(n === "bpmn:BoundaryEvent" || n === "bpmn:SubProcess" && t.triggeredByEvent || n === "bpmn:IntermediateCatchEvent" && t.eventDefinitionType === "bpmn:LinkEventDefinition");
  }
}
M(u2, "$inject");
u2.$inject = [
  "elementFactory",
  "bpmnFactory",
  "popupMenu",
  "create",
  "autoPlace",
  "rules",
  "mouse",
  "moddle",
  "translate"
];
const H8 = [
  {
    __init__: ["customCreatePopupProvider", "customAppendPopupProvider"],
    // 覆盖部分
    contextPadProvider: ["type", T8],
    replaceMenuProvider: ["type", Qt],
    paletteProvider: ["type", s2],
    // 新增部分
    customCreatePopupProvider: ["type", c2],
    customAppendPopupProvider: ["type", u2]
  }
];
function j8(e, t, n) {
  a2(n) || (n = [n]), n.forEach((i) => {
    i2(e[i]) || (t[i] = e[i]);
  });
}
const R8 = [
  "cancelActivity",
  "instantiate",
  "eventGatewayType",
  "triggeredByEvent",
  "isInterrupting"
];
function W8(e, t) {
  const n = e && Y0(e, "collapsed") ? e.collapsed : !P0(e);
  let i;
  return t && (Y0(t, "collapsed") || Y0(t, "isExpanded")) ? i = Y0(t, "collapsed") ? t.collapsed : !t.isExpanded : i = n, n !== i;
}
function I1(e) {
  return D(e, "bpmn:SubProcess");
}
function rt(e, t) {
  const n = u0(e);
  return t && n.get("eventDefinitions").some((i) => D(i, t));
}
function U8(e, t) {
  return e.filter((n) => t.includes(n));
}
var Ie;
let n4 = (Ie = class {
  constructor(t, n, i, a, l, o, s) {
    M(this, "replaceElement");
    function r(c, u, m = {}) {
      const h = u.type, f = u.childType, v = c.businessObject;
      if (I1(v) && h === "bpmn:SubProcess" && W8(c, u))
        return l.toggleCollapse(c), c;
      let y = t.create(h);
      const g = {
        type: h,
        businessObject: y
      };
      y.type = f, y.parallelInSameTransaction = f === "http" || void 0, g.di = {}, h === "bpmn:ExclusiveGateway" && (g.di.isMarkerVisible = !0), j8(c.di, g.di, [
        "fill",
        "stroke",
        "background-color",
        "border-color",
        "color"
      ]);
      const A = y2(v.$descriptor), Z = y2(y.$descriptor, !0), N = U8(A, Z);
      Y1(y, h8(u, R8));
      const k = c0(N, (d) => c.type === "bpmn:ServiceTask" && g.type === "bpmn:ServiceTask" ? !1 : d === "eventDefinitions" ? rt(c, u.eventDefinitionType) : d === "loopCharacteristics" ? !X0(y) : Y0(y, d) || d === "processRef" && u.isExpanded === !1 || d === "triggeredByEvent" ? !1 : d === "isForCompensation" ? !X0(y) : !0);
      if (y = a.copyElement(v, y, k), u.eventDefinitionType && (rt(y, u.eventDefinitionType) || (g.eventDefinitionType = u.eventDefinitionType, g.eventDefinitionAttrs = u.eventDefinitionAttrs)), D(v, "bpmn:Activity")) {
        if (I1(v))
          g.isExpanded = P0(c);
        else if (u && Y0(u, "isExpanded")) {
          g.isExpanded = u.isExpanded;
          const d = n.getDefaultSize(y, {
            isExpanded: g.isExpanded
          });
          g.width = d.width, g.height = d.height, g.x = c.x - (g.width - c.width) / 2, g.y = c.y - (g.height - c.height) / 2;
        }
        P0(c) && !D(v, "bpmn:Task") && g.isExpanded && (g.width = c.width, g.height = c.height);
      }
      if (I1(v) && !I1(y) && (m.moveChildren = !1), D(v, "bpmn:Participant")) {
        u.isExpanded === !0 ? y.processRef = t.create("bpmn:Process") : m.moveChildren = !1;
        const d = i2(u.isHorizontal) ? !0 : u.isHorizontal;
        g.di.isHorizontal = d, g.width = c.width, g.height = n.getDefaultSize(g, void 0).height;
      }
      s.allowed("shape.resize", { shape: y }) || (g.height = n.getDefaultSize(g, void 0).height, g.width = n.getDefaultSize(g, void 0).width), y.name = v.name, Oe(v, [
        "bpmn:ExclusiveGateway",
        "bpmn:InclusiveGateway",
        "bpmn:Activity"
      ]) && Oe(y, [
        "bpmn:ExclusiveGateway",
        "bpmn:InclusiveGateway",
        "bpmn:Activity"
      ]) && (y.default = v.default), u.host && !D(v, "bpmn:BoundaryEvent") && D(y, "bpmn:BoundaryEvent") && (g.host = u.host), (g.type === "bpmn:DataStoreReference" || g.type === "bpmn:DataObjectReference") && (g.x = c.x + (c.width - g.width) / 2), (v.type || u.childType) && y.extensionElements && s1(v) && (y.extensionElements.values = y.extensionElements.values.filter(
        (d) => d.$type === "bpmn:Properties" || d.$type === "flowable:ExecutionListener"
      ));
      const I = s1(
        v,
        u.extensionElement
      )[0], C = s1(
        y,
        u.extensionElement
      )[0], p = y.extensionElements;
      if (!u.extensionElement && I && p != null && p.values && (p.values = p.values.filter(
        (d) => d.$type !== I.$type
      )), u.extensionElement && !C) {
        y.extensionElements || (y.extensionElements = i.create("bpmn:ExtensionElements", {
          values: []
        }));
        const d = i.create(u.extensionElement);
        y.extensionElements.values.push(d);
      }
      return o.replaceElement(c, g, { ...m, targetElement: u });
    }
    this.replaceElement = r;
  }
}, M(Ie, "$inject"), Ie);
n4.$inject = [
  "bpmnFactory",
  "elementFactory",
  "moddle",
  "moddleCopy",
  "modeling",
  "replace",
  "rules"
];
const q8 = {
  bpmnReplace: ["type", n4]
}, K8 = ["append-task", "append-rule-task", "create-task", "create-rule-task"];
class i4 extends D4 {
  constructor(n, i, a) {
    super(n, i, a);
    M(this, "_current");
    this._current = null;
  }
  _render() {
    const { entries: n } = this._current;
    for (const i in n)
      n[i].rank = K8.includes(i) ? -1 : 1;
    super._render();
  }
}
i4.$inject = ["config.popupMenu", "eventBus", "canvas"];
const G8 = {
  __init__: ["popupMenu"],
  popupMenu: ["type", i4]
};
class d2 {
  constructor(t, n, i, a, l, o, s, r) {
    M(this, "_palette");
    M(this, "_spaceTool");
    M(this, "_lassoTool");
    M(this, "_handTool");
    M(this, "_globalConnect");
    M(this, "_elementFactory");
    M(this, "_create");
    M(this, "_translate");
    this._palette = t, this._create = n, this._elementFactory = i, this._spaceTool = a, this._lassoTool = l, this._handTool = o, this._globalConnect = s, this._translate = r, t.registerProvider(this);
  }
  getPaletteEntries() {
    const t = {}, n = this._create, i = this._elementFactory;
    this._spaceTool, this._lassoTool, this._handTool, this._globalConnect;
    const a = this._translate;
    function l(o, s, r, c, u) {
      function m(h) {
        const f = i.createShape(Y1({ type: o }, u));
        n.start(h, f);
      }
      return {
        group: s,
        className: r,
        title: c,
        action: {
          // @ts-expect-error
          dragstart: m,
          // @ts-expect-error
          click: m
        }
      };
    }
    return t["create.data-object"] = l(
      "bpmn:DataObjectReference",
      "sub-activity",
      "bpmn-icon-data-object",
      a("Create data object reference")
    ), t["create.data-store"] = l(
      "bpmn:DataStoreReference",
      "sub-activity",
      "bpmn-icon-data-store",
      a("Create data store reference")
    ), t["create.group"] = l(
      "bpmn:Group",
      "sub-activity",
      "bpmn-icon-group",
      a("Create group")
    ), t;
  }
}
M(d2, "$inject");
d2.$inject = [
  "palette",
  "create",
  "elementFactory",
  "spaceTool",
  "lassoTool",
  "handTool",
  "globalConnect",
  "translate"
];
const Y8 = [
  w4,
  k4,
  S4,
  E8,
  k8,
  _8,
  S8,
  H8,
  q8,
  G8,
  {
    __init__: ["additionPaletteProvider"],
    additionPaletteProvider: ["type", d2]
  }
], X8 = "Flowable", J8 = "http://flowable.org/bpmn", Q8 = "flowable", e7 = { tagAlias: "lowerCase" }, t7 = [], n7 = JSON.parse('[{"name":"Definitions","isAbstract":true,"extends":["bpmn:Definitions"],"properties":[{"name":"diagramRelationId","isAttr":true,"type":"String"}]},{"name":"InOutBinding","superClass":["Element"],"isAbstract":true,"properties":[{"name":"source","isAttr":true,"type":"String"},{"name":"sourceExpression","isAttr":true,"type":"String"},{"name":"target","isAttr":true,"type":"String"},{"name":"businessKey","isAttr":true,"type":"String"},{"name":"local","isAttr":true,"type":"Boolean","default":false},{"name":"variables","isAttr":true,"type":"String"}]},{"name":"In","superClass":["InOutBinding"],"meta":{"allowedIn":["bpmn:CallActivity","bpmn:SignalEventDefinition"]}},{"name":"Out","superClass":["InOutBinding"],"meta":{"allowedIn":["bpmn:CallActivity"]}},{"name":"AsyncCapable","isAbstract":true,"extends":["bpmn:Activity","bpmn:Gateway","bpmn:Event"],"properties":[{"name":"async","isAttr":true,"type":"Boolean","default":false},{"name":"asyncBefore","isAttr":true,"type":"Boolean","default":false},{"name":"asyncAfter","isAttr":true,"type":"Boolean","default":false},{"name":"exclusive","isAttr":true,"type":"Boolean","default":true}]},{"name":"Scope","extends":["bpmn:Signal"],"properties":[{"name":"scope","isAttr":true,"type":"String"}]},{"name":"ErrorEventDefinitionExtension","isAbstract":true,"extends":["bpmn:ErrorEventDefinition"],"properties":[{"name":"errorCodeVariable","isAttr":true,"type":"String"},{"name":"errorMessageVariable","isAttr":true,"type":"String"},{"name":"errorVariableLocalScope","isAttr":true,"type":"Boolean"},{"name":"errorVariableTransient","isAttr":true,"type":"Boolean"}]},{"name":"ErrorEventDefinition","superClass":["bpmn:ErrorEventDefinition","Element"],"properties":[{"name":"expression","isAttr":true,"type":"String"}],"meta":{"allowedIn":["bpmn:ServiceTask"]}},{"name":"Error","isAbstract":true,"extends":["bpmn:Error"],"properties":[{"name":"flowable:errorMessage","isAttr":true,"type":"String"}]},{"name":"FormSupported","isAbstract":true,"extends":["bpmn:StartEvent","bpmn:UserTask"],"properties":[{"name":"formKey","isAttr":true,"type":"String"}]},{"name":"Initiator","isAbstract":true,"extends":["bpmn:StartEvent"],"properties":[{"name":"initiator","isAttr":true,"type":"String"}]},{"name":"ScriptTask","isAbstract":true,"extends":["bpmn:ScriptTask"],"properties":[{"name":"resultVariable","isAttr":true,"type":"String"},{"name":"autoStoreVariables","isAttr":true,"type":"Boolean"},{"name":"resource","isAttr":true,"type":"String"}]},{"name":"Process","isAbstract":true,"extends":["bpmn:Process"],"properties":[{"name":"candidateStarterGroups","isAttr":true,"type":"String"},{"name":"candidateStarterUsers","isAttr":true,"type":"String"}]},{"name":"FormalExpression","isAbstract":true,"extends":["bpmn:FormalExpression"],"properties":[{"name":"resource","isAttr":true,"type":"String"}]},{"name":"Assignable","extends":["bpmn:UserTask"],"properties":[{"name":"assignee","isAttr":true,"type":"String"},{"name":"candidateUsers","isAttr":true,"type":"String"},{"name":"candidateGroups","isAttr":true,"type":"String"},{"name":"dueDate","isAttr":true,"type":"String"},{"name":"priority","isAttr":true,"type":"String"}]},{"name":"CallActivity","extends":["bpmn:CallActivity"],"properties":[{"name":"inheritVariables","isAttr":true,"type":"Boolean"},{"name":"calledElementType","isAttr":true,"type":"String"},{"name":"processInstanceName","isAttr":true,"type":"String"}]},{"name":"ServiceTaskLike","extends":["bpmn:ServiceTask","bpmn:BusinessRuleTask","bpmn:SendTask","bpmn:MessageEventDefinition"],"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"resultVariable","isAttr":true,"type":"String"}]},{"name":"DmnCapable","extends":["bpmn:BusinessRuleTask"],"properties":[{"name":"decisionRef","isAttr":true,"type":"String"}]},{"name":"ExternalCapable","extends":["flowable:ServiceTaskLike"],"properties":[{"name":"type","isAttr":true,"type":"String"},{"name":"topic","isAttr":true,"type":"String"}]},{"name":"TaskPriorized","extends":["bpmn:Process","flowable:ExternalCapable"],"properties":[{"name":"taskPriority","isAttr":true,"type":"String"}]},{"name":"Properties","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"values","type":"Property","isMany":true}]},{"name":"Property","superClass":["Element"],"properties":[{"name":"id","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true},{"name":"value","type":"String","isAttr":true}]},{"name":"Connector","superClass":["Element"],"meta":{"allowedIn":["flowable:ServiceTaskLike"]},"properties":[{"name":"inputOutput","type":"InputOutput"},{"name":"connectorId","type":"String"}]},{"name":"InputOutput","superClass":["Element"],"meta":{"allowedIn":["bpmn:FlowNode","flowable:Connector"]},"properties":[{"name":"inputOutput","type":"InputOutput"},{"name":"connectorId","type":"String"},{"name":"inputParameters","isMany":true,"type":"InputParameter"},{"name":"outputParameters","isMany":true,"type":"OutputParameter"}]},{"name":"InputOutputParameter","properties":[{"name":"name","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"},{"name":"definition","type":"InputOutputParameterDefinition"}]},{"name":"InputOutputParameterDefinition","isAbstract":true},{"name":"List","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"items","isMany":true,"type":"InputOutputParameterDefinition"}]},{"name":"Map","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"entries","isMany":true,"type":"Entry"}]},{"name":"Entry","properties":[{"name":"key","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"},{"name":"definition","type":"InputOutputParameterDefinition"}]},{"name":"Value","superClass":["Element"],"properties":[{"name":"id","isAttr":true,"type":"String"},{"name":"name","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"}]},{"name":"Script","superClass":["InputOutputParameterDefinition"],"properties":[{"name":"scriptFormat","isAttr":true,"type":"String"},{"name":"resource","isAttr":true,"type":"String"},{"name":"value","isBody":true,"type":"String"}]},{"name":"Field","superClass":["Element"],"meta":{"allowedIn":["flowable:ServiceTaskLike","flowable:ExecutionListener","flowable:TaskListener"]},"properties":[{"name":"name","isAttr":true,"type":"String"},{"name":"expression","type":"String"},{"name":"stringValue","isAttr":true,"type":"String"},{"name":"string","type":"String"}]},{"name":"InputParameter","superClass":["InputOutputParameter"]},{"name":"OutputParameter","superClass":["InputOutputParameter"]},{"name":"Collectable","isAbstract":true,"extends":["bpmn:MultiInstanceLoopCharacteristics"],"superClass":["flowable:AsyncCapable"],"properties":[{"name":"collection","isAttr":true,"type":"String"},{"name":"elementVariable","isAttr":true,"type":"String"}]},{"name":"FailedJobRetryTimeCycle","superClass":["Element"],"meta":{"allowedIn":["flowable:AsyncCapable","bpmn:MultiInstanceLoopCharacteristics"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"ExecutionListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:Task","bpmn:ServiceTask","bpmn:UserTask","bpmn:BusinessRuleTask","bpmn:ScriptTask","bpmn:ReceiveTask","bpmn:ManualTask","bpmn:ExclusiveGateway","bpmn:SequenceFlow","bpmn:ParallelGateway","bpmn:InclusiveGateway","bpmn:EventBasedGateway","bpmn:StartEvent","bpmn:IntermediateCatchEvent","bpmn:IntermediateThrowEvent","bpmn:EndEvent","bpmn:BoundaryEvent","bpmn:CallActivity","bpmn:SubProcess","bpmn:Process"]},"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"onTransaction","isAttr":true,"type":"String"},{"name":"event","isAttr":true,"type":"String"},{"name":"script","type":"Script"},{"name":"fields","type":"Field","isMany":true}]},{"name":"TaskListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"event","isAttr":true,"type":"String"},{"name":"script","type":"Script"},{"name":"fields","type":"Field","isMany":true},{"name":"id","type":"String","isAttr":true},{"name":"eventDefinitions","type":"bpmn:TimerEventDefinition","isMany":true}]},{"name":"EventListener","superClass":["Element"],"meta":{"allowedIn":["bpmn:Process"]},"properties":[{"name":"events","isAttr":true,"type":"String"},{"name":"expression","isAttr":true,"type":"String"},{"name":"class","isAttr":true,"type":"String"},{"name":"delegateExpression","isAttr":true,"type":"String"},{"name":"throwEvent","isAttr":true,"type":"String"},{"name":"entityType","isAttr":true,"type":"String"},{"name":"signalName","isAttr":true,"type":"String"},{"name":"errorCode","isAttr":true,"type":"String"},{"name":"messageName","isAttr":true,"type":"String"}]},{"name":"FormProperty","superClass":["Element"],"meta":{"allowedIn":["bpmn:StartEvent","bpmn:UserTask"]},"properties":[{"name":"id","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true},{"name":"type","type":"String","isAttr":true},{"name":"required","type":"String","isAttr":true},{"name":"readable","type":"String","isAttr":true},{"name":"writable","type":"String","isAttr":true},{"name":"variable","type":"String","isAttr":true},{"name":"expression","type":"String","isAttr":true},{"name":"datePattern","type":"String","isAttr":true},{"name":"default","type":"String","isAttr":true},{"name":"values","type":"Value","isMany":true}]},{"name":"FormData","superClass":["Element"],"meta":{"allowedIn":["bpmn:StartEvent","bpmn:UserTask"]},"properties":[{"name":"fields","type":"FormField","isMany":true},{"name":"businessKey","type":"String","isAttr":true}]},{"name":"FormField","superClass":["Element"],"properties":[{"name":"id","type":"String","isAttr":true},{"name":"label","type":"String","isAttr":true},{"name":"type","type":"String","isAttr":true},{"name":"datePattern","type":"String","isAttr":true},{"name":"defaultValue","type":"String","isAttr":true},{"name":"properties","type":"Properties"},{"name":"validation","type":"Validation"},{"name":"values","type":"Value","isMany":true}]},{"name":"Validation","superClass":["Element"],"properties":[{"name":"constraints","type":"Constraint","isMany":true}]},{"name":"Constraint","superClass":["Element"],"properties":[{"name":"name","type":"String","isAttr":true},{"name":"config","type":"String","isAttr":true}]},{"name":"ConditionalEventDefinitionExtension","isAbstract":true,"extends":["bpmn:ConditionalEventDefinition"],"properties":[{"name":"variableName","isAttr":true,"type":"String"},{"name":"variableEvents","isAttr":true,"type":"String"}]},{"name":"AssigneeType","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"MultiCompletionCondition","superClass":["Element"],"meta":{"allowedIn":["bpmn:Activity"]},"properties":[{"name":"type","type":"String","isAttr":true},{"name":"conditionType","type":"String","isAttr":true},{"name":"num","type":"Number","isAttr":true},{"name":"body","type":"String","isBody":true}]},{"name":"IdmAssignee","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"IdmCandidateUsers","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask","bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"IdmCandidateGroups","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask","bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NextSequenceFlow","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NextUser","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ModelBpmnExtension","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ProcessNameExp","superClass":["Element"],"meta":{"allowedIn":["bpmn:Process"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"Localization","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"locale","type":"String","isAttr":true},{"name":"name","type":"String","isAttr":true}]},{"name":"NodeFormExp","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"NodeFormType","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"StaticAssigneeVariables","superClass":["Element"],"meta":{"allowedIn":["bpmn:Event","bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"MultiInstanceVariables","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"ServiceTask","extends":["bpmn:ServiceTask"],"properties":[{"name":"parallelInSameTransaction","type":"Boolean","isAttr":true}]},{"name":"TimeDate","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"BoundaryEvent","extends":["bpmn:BoundaryEvent"],"properties":[{"name":"timerEventDefinition","isBody":true,"type":"flowable:TimerEventDefinition"},{"name":"cancelActivity","isAttr":true,"type":"Boolean","redefines":"bpmn:BoundaryEvent#cancelActivity"}]},{"name":"TimerEventDefinition","superClass":["TimerEventDefinition"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"TimeDuration","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"}]},{"name":"TimeCycle","superClass":["Element"],"meta":{"allowedIn":["bpmn:BoundaryEvent","bpmn:TimerEventDefinition","flowable:endDate","bpmn:UserTask"]},"properties":[{"name":"body","isBody":true,"type":"String"},{"name":"endDate","isAttr":true,"type":"String"}]},{"name":"SkipUserTask","extends":["bpmn:UserTask"],"properties":[{"name":"skipExpression","type":"String","isAttr":true}]},{"name":"TransferToUsers","superClass":["Element"],"meta":{"allowedIn":["bpmn:ServiceTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"AuthPoint","superClass":["Element"],"meta":{"allowedIn":["bpmn:UserTask"]},"properties":[{"name":"body","type":"String","isBody":true}]},{"name":"FormFieldValidation","extends":["bpmn:UserTask","bpmn:StartEvent"],"properties":[{"name":"formFieldValidation","type":"String","isAttr":true}]},{"name":"DataObject","extends":["bpmn:DataObject"],"meta":{"allowedIn":["bpmn:Process","bpmn:SubProcess"]},"properties":[{"name":"itemSubjectRef","type":"String","isAttr":true,"redefines":"bpmn:DataObject#itemSubjectRef"}]},{"name":"InterruptingStartEvent","extends":["bpmn:StartEvent"],"properties":[{"name":"isInterrupting","isAttr":true,"type":"Boolean","redefines":"bpmn:StartEvent#isInterrupting"}]},{"name":"VariableListenerEventDefinition","superClass":["Element"],"meta":{"allowedIn":["*"]},"properties":[{"name":"variableName","type":"String","isAttr":true},{"name":"variableChangeType","type":"String","isAttr":true}]},{"name":"TerminateEventDefinition","extends":["bpmn:TerminateEventDefinition"],"properties":[{"name":"terminateAll","isAttr":true,"type":"Boolean"}]},{"name":"AdHoc","extends":["bpmn:AdHocSubProcess"],"properties":[{"name":"cancelRemainingInstances","isAttr":true,"type":"Boolean","redefines":"bpmn:AdHocSubProcess#cancelRemainingInstances"}]}]'), i7 = [], a7 = {
  name: X8,
  uri: J8,
  prefix: Q8,
  xml: e7,
  associations: t7,
  types: n7,
  emumerations: i7
}, l7 = /* @__PURE__ */ j({
  name: "BusinessDesigner",
  __name: "index",
  props: {
    xml: {
      type: String,
      default: void 0
    }
  },
  emits: ["modeler-init", "modeler-destroy", "root-init"],
  setup(e, { expose: t, emit: n }) {
    var m;
    const i = e, a = n, l = P(void 0), o = x1(), s = ((m = jt("minimap")) == null ? void 0 : m.enabled) ?? !0, r = () => {
      o.value = new C4({
        container: l.value,
        moddleExtensions: {
          flowable: a7
        },
        additionalModules: Y8,
        // 其他插件配置
        keyboard: { bind: !0 },
        minimap: { open: s },
        gridLine: { gridLineOpacity: 0.1, gridLineStroke: 1 }
      }), a("modeler-init", o.value);
    }, c = async (h) => {
      try {
        o.value || r(), await o.value.importXML(h || i.xml || qt(`process_${Date.now()}`)), o.value.get("canvas").zoom("fit-viewport", "center");
      } catch (f) {
        console.error(f);
      }
    }, u = () => {
      var h, f;
      a("modeler-destroy", o.value), (h = o.value) == null || h.clear(), (f = o.value) == null || f.destroy(), o.value = void 0;
    };
    return L0(() => {
      r(), c(i.xml);
    }), m1(() => u()), t({ initModeler: r, destroyModeler: u, createNewProcess: c }), (h, f) => (w(), F("div", {
      ref_key: "canvasEl",
      ref: l,
      class: "business-designer"
    }, [
      K(h.$slots, "default")
    ], 512));
  }
}), o7 = j({
  name: "BpmnIcon",
  inheritAttrs: !0,
  props: {
    name: {
      type: String,
      default: "bpmn-icon-process"
    },
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: "var(--color-text-1)"
    }
  },
  computed: {
    computedSize() {
      return { width: `${this.size}px`, height: `${this.size}px` };
    }
  }
}), a4 = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, a] of t)
    n[i] = a;
  return n;
}, r7 = ["href", "fill"];
function s7(e, t, n, i, a, l) {
  return w(), F("svg", {
    class: "bpmn-icon",
    "aria-hidden": "true",
    style: s0(e.computedSize)
  }, [
    R("use", {
      href: `#${e.name}`,
      fill: e.color
    }, null, 8, r7)
  ], 4);
}
const c7 = /* @__PURE__ */ a4(o7, [["render", s7]]);
function u7(e) {
  return s1(
    u0(e),
    "flowable:VariableListenerEventDefinition"
  )[0];
}
function d7(e) {
  const { type: t } = e;
  let n = l4(t);
  if (u7(e))
    return n = `VariableListener${n}`, (D(e, "bpmn:StartEvent") && !b2(e) || D(e, "bpmn:BoundaryEvent") && !st(e)) && (n = `${n}NonInterrupting`), n;
  const a = m7(e);
  return a ? (n = `${p7(a)}${n}`, (D(e, "bpmn:StartEvent") && !b2(e) || D(e, "bpmn:BoundaryEvent") && !st(e)) && (n = `${n}NonInterrupting`), n) : (D(e, "bpmn:SubProcess") && !D(e, "bpmn:Transaction") && (X0(e) ? n = `Event${n}` : n = `${P0(e) && !I4(e) ? "Expanded" : "Collapsed"}${n}`), v7(e) && (n = "DefaultFlow"), h7(e) && (n = "ConditionalFlow"), D(e, "bpmn:ServiceTask") && (n = `${b6(e.businessObject.get("type"))}ServiceTask`), n);
}
function l4(e) {
  return e.split(":")[1];
}
function m7(e) {
  const t = u0(e), n = t.eventDefinitions;
  return n && n[0];
}
function p7(e) {
  return l4(e.$type).replace("EventDefinition", "");
}
function st(e) {
  const t = u0(e);
  return t && t.cancelActivity !== !1;
}
function v7(e) {
  const t = u0(e), n = u0(e.source);
  return !D(e, "bpmn:SequenceFlow") || !n ? !1 : n.default && n.default === t && (D(n, "bpmn:Gateway") || D(n, "bpmn:Activity"));
}
function h7(e) {
  const t = u0(e), n = u0(e.source);
  return !D(e, "bpmn:SequenceFlow") || !n ? !1 : t.conditionExpression && D(n, "bpmn:Activity");
}
const f7 = Math.max, b7 = Math.min;
function Re(e, t) {
  let n, i, a, l, o, s, r = 0, c = !1, u = !1, m = !0;
  const h = e.delay || 0;
  f6(e) && (c = !!e.leading, u = "maxWait" in e, a = u ? f7(e.maxWait || 0, h) : 0, m = "trailing" in e ? !!e.trailing : m);
  function f(C) {
    const p = n, d = i;
    return n = i = void 0, r = C, l = t.apply(d, p), l;
  }
  function v(C) {
    return r = C, o = setTimeout(A, h), c ? f(C) : l;
  }
  function y(C) {
    const p = C - s, d = C - r, b = h - p;
    return u ? b7(b, a - d) : b;
  }
  function g(C) {
    const p = C - s, d = C - r;
    return s === void 0 || p >= h || p < 0 || u && d >= a;
  }
  function A() {
    const C = Date.now();
    if (g(C)) return Z(C);
    o = setTimeout(A, y(C));
  }
  function Z(C) {
    return o = void 0, m && n ? f(C) : (n = i = void 0, l);
  }
  function N() {
    o !== void 0 && clearTimeout(o), r = 0, n = s = i = o = void 0;
  }
  function k() {
    return o === void 0 ? l : Z(Date.now());
  }
  function I(...C) {
    const p = Date.now(), d = g(p);
    if (n = C, i = this, s = p, d) {
      if (o === void 0) return v(s);
      if (u)
        return o = setTimeout(A, h), f(s);
    }
    return o === void 0 && (o = setTimeout(A, h)), l;
  }
  return I.cancel = N, I.flush = k, I;
}
const ct = {
  Association: "bpmn-icon-association",
  BusinessRuleTask: "bpmn-icon-business-rule-task",
  CallActivity: "bpmn-icon-call-activity",
  Collaboration: "bpmn-icon-collaboration",
  ConditionalFlow: "bpmn-icon-conditional-flow",
  SequenceFlow: "bpmn-icon-connection",
  DataInput: "bpmn-icon-data-input",
  DataInputAssociation: "bpmn-icon-data-input-output-association",
  DataOutput: "bpmn-icon-data-output",
  DataOutputAssociation: "bpmn-icon-data-input-output-association",
  DataObjectReference: "bpmn-icon-data-object",
  DataStoreReference: "bpmn-icon-data-store",
  DefaultFlow: "bpmn-icon-default-flow",
  CancelEndEvent: "bpmn-icon-end-event-cancel",
  CompensateEndEvent: "bpmn-icon-end-event-compensation",
  ErrorEndEvent: "bpmn-icon-end-event-error",
  EscalationEndEvent: "bpmn-icon-end-event-escalation",
  LinkEndEvent: "bpmn-icon-end-event-link",
  MessageEndEvent: "bpmn-icon-end-event-message",
  MultipleEndEvent: "bpmn-icon-end-event-multiple",
  EndEvent: "bpmn-icon-end-event-none",
  SignalEndEvent: "bpmn-icon-end-event-signal",
  TerminateEndEvent: "bpmn-icon-end-event-terminate",
  EventSubProcess: "bpmn-icon-event-subprocess-expanded",
  ComplexGateway: "bpmn-icon-gateway-complex",
  EventBasedGateway: "bpmn-icon-gateway-eventbased",
  ExclusiveGateway: "bpmn-icon-gateway-xor",
  Gateway: "bpmn-icon-gateway-none",
  InclusiveGateway: "bpmn-icon-gateway-or",
  ParallelGateway: "bpmn-icon-gateway-parallel",
  Group: "bpmn-icon-group",
  CancelIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-cancel",
  CompensateIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-compensation",
  ConditionalIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-condition",
  ErrorIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-error",
  EscalationIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-escalation",
  LinkIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-link",
  MessageIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-message",
  MultipleIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-multiple",
  ConditionalIntermediateCatchEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-condition",
  EscalationIntermediateCatchEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-escalation",
  MessageIntermediateCatchEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-message",
  MultipleIntermediateCatchEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-multiple",
  ParallelIntermediateCatchEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-parallel",
  SignalIntermediateCatchEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-signal",
  TimerIntermediateCatchEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-timer",
  ParallelMultipleIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-parallel-multiple",
  SignalIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-signal",
  TimerIntermediateCatchEvent: "bpmn-icon-intermediate-event-catch-timer",
  IntermediateThrowEvent: "bpmn-icon-intermediate-event-none",
  CompensateIntermediateThrowEvent: "bpmn-icon-intermediate-event-throw-compensation",
  EscalationIntermediateThrowEvent: "bpmn-icon-intermediate-event-throw-escalation",
  LinkIntermediateThrowEvent: "bpmn-icon-intermediate-event-throw-link",
  MessageIntermediateThrowEvent: "bpmn-icon-intermediate-event-throw-message",
  MultipleIntermediateThrowEvent: "bpmn-icon-intermediate-event-throw-multiple",
  SignalIntermediateThrowEvent: "bpmn-icon-intermediate-event-throw-signal",
  Lane: "bpmn-icon-lane",
  ManualTask: "bpmn-icon-manual-task",
  MessageFlow: "bpmn-icon-message-flow",
  Participant: "bpmn-icon-participant",
  Process: "bpmn-icon-process",
  ReceiveTask: "bpmn-icon-receive-task",
  ScriptTask: "bpmn-icon-script-task",
  SendTask: "bpmn-icon-send-task",
  ServiceTask: "bpmn-icon-service-task",
  CompensateStartEvent: "bpmn-icon-start-event-compensation",
  ConditionalStartEvent: "bpmn-icon-start-event-condition",
  ErrorStartEvent: "bpmn-icon-start-event-error",
  EscalationStartEvent: "bpmn-icon-start-event-escalation",
  MessageStartEvent: "bpmn-icon-start-event-message",
  MultipleStartEvent: "bpmn-icon-start-event-multiple",
  ConditionalStartEventNonInterrupting: "bpmn-icon-start-event-non-interrupting-condition",
  EscalationStartEventNonInterrupting: "bpmn-icon-start-event-non-interrupting-escalation",
  MessageStartEventNonInterrupting: "bpmn-icon-start-event-non-interrupting-message",
  MultipleStartEventNonInterrupting: "bpmn-icon-start-event-non-interrupting-multiple",
  ParallelMultipleStartEventNonInterrupting: "bpmn-icon-start-event-non-interrupting-parallel-multiple",
  SignalStartEventNonInterrupting: "bpmn-icon-start-event-non-interrupting-signal",
  TimerStartEventNonInterrupting: "bpmn-icon-start-event-non-interrupting-timer",
  CancelBoundaryEvent: "bpmn-icon-intermediate-event-catch-cancel",
  CompensateBoundaryEvent: "bpmn-icon-intermediate-event-catch-compensation",
  ConditionalBoundaryEvent: "bpmn-icon-intermediate-event-catch-condition",
  ErrorBoundaryEvent: "bpmn-icon-intermediate-event-catch-error",
  EscalationBoundaryEvent: "bpmn-icon-intermediate-event-catch-escalation",
  LinkBoundaryEvent: "bpmn-icon-intermediate-event-catch-link",
  MessageBoundaryEvent: "bpmn-icon-intermediate-event-catch-message",
  MultipleBoundaryEvent: "bpmn-icon-intermediate-event-catch-multiple",
  BoundaryEvent: "bpmn-icon-intermediate-event-none",
  ConditionalBoundaryEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-condition",
  EscalationBoundaryEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-escalation",
  MessageBoundaryEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-message",
  MultipleBoundaryEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-multiple",
  ParallelBoundaryEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-parallel",
  SignalBoundaryEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-signal",
  TimerBoundaryEventNonInterrupting: "bpmn-icon-intermediate-event-catch-non-interrupting-timer",
  ParallelMultipleBoundaryEvent: "bpmn-icon-intermediate-event-catch-parallel-multiple",
  SignalBoundaryEvent: "bpmn-icon-intermediate-event-catch-signal",
  TimerBoundaryEvent: "bpmn-icon-intermediate-event-catch-timer",
  StartEvent: "bpmn-icon-start-event-none",
  ParallelMultipleStartEvent: "bpmn-icon-start-event-parallel-multiple",
  SignalStartEvent: "bpmn-icon-start-event-signal",
  TimerStartEvent: "bpmn-icon-start-event-timer",
  CollapsedSubProcess: "bpmn-icon-subprocess-collapsed",
  CollapsedAdHocSubProcess: "bpmn-icon-subprocess-collapsed",
  ExpandedSubProcess: "bpmn-icon-subprocess-expanded",
  ExpandedAdHocSubProcess: "bpmn-icon-subprocess-expanded",
  Task: "bpmn-icon-task-none",
  TextAnnotation: "bpmn-icon-text-annotation",
  Transaction: "bpmn-icon-transaction",
  UserTask: "bpmn-icon-user-task",
  CopyServiceTask: "copy-service-task",
  CamelServiceTask: "camel-service-task",
  DmnServiceTask: "dmn-service-task",
  ScServiceTask: "sc-service-task",
  DubboServiceTask: "dubbo-service-task",
  RestServiceTask: "rest-service-task",
  HttpServiceTask: "http-service-task",
  MqServiceTask: "mq-service-task",
  EmailServiceTask: "email-service-task",
  ShellServiceTask: "shell-service-task"
}, ut = (e) => v6(e) === "array", E0 = (e) => !p6(e), W = class W {
  constructor() {
  }
  static _addListener(t, n, i, a) {
    if (typeof n != "function")
      throw new TypeError("fn must be a function");
    n.context = i, n.once = !!a;
    const l = W._events[t];
    return E0(l) ? W._events[t] = n : typeof l == "function" ? W._events[t] = [l, n] : ut(l) && W._events[t].push(n), W;
  }
  static addListener(t, n, i) {
    return W._addListener(t, n, i);
  }
  static hasListener(t, n) {
    return W._events[t] && W._events[t].indexOf && W._events[t].indexOf(n) > -1;
  }
  static on(t, n, i) {
    return W.addListener(t, n, i);
  }
  static once(t, n, i) {
    return W._addListener(t, n, i, !0);
  }
  static emit(t, ...n) {
    if (E0(t))
      throw new Error("emit must receive at lease one argument");
    const i = W._events[t];
    return E0(i) ? !1 : (typeof i == "function" ? (i.call(i.context || null, ...n), i.once && W.removeListener(t, i)) : ut(i) && i.map((a) => {
      a.call(a.context || null, ...n), a.once && W.removeListener(t, a);
    }), !0);
  }
  static removeListener(t, n) {
    if (E0(W._events) || E0(t)) return W;
    if (typeof n != "function")
      throw new Error("fn must be a function");
    const i = W._events[t];
    if (!i)
      return W;
    if (typeof i == "function")
      i === n && delete W._events[t];
    else {
      const a = i.findIndex((l) => l === n);
      if (a === -1) return W;
      a === 0 ? i.shift() : i.splice(a, 1), i.length === 1 && (W._events[t] = i[0]);
    }
    return W;
  }
  static removeAllListeners(t) {
    if (E0(W._events)) return W;
    E0(t) && (W._events = /* @__PURE__ */ Object.create(null));
    const n = W._events[t];
    return E0(n) || (Object.keys(W._events).length === 1 ? W._events = /* @__PURE__ */ Object.create(null) : delete W._events[t]), W;
  }
  static listeners(t) {
    if (E0(W._events)) return [];
    const n = W._events[t];
    return E0(n) ? [] : typeof n == "function" ? [n] : n.map((i) => i);
  }
  static listenerCount(t) {
    if (E0(W._events)) return 0;
    const n = W._events[t];
    return E0(n) ? 0 : typeof n == "function" ? 1 : n.length;
  }
  static eventNames() {
    return E0(W._events) ? [] : Object.keys(W._events);
  }
};
M(W, "_events", {});
let V0 = W;
function y7(e) {
  const t = e;
  let n = !1;
  const i = () => {
    n = !0;
  }, a = () => {
    V0.removeListener("element-update", t), V0.removeListener("element-update", i);
  };
  return E4(() => {
    V0.hasListener("element-update", t) || (V0.on("element-update", t), V0.on("element-update", i));
  }), L0(() => {
    !n && t();
  }), m1(() => a()), [t, a];
}
const g7 = j({
  name: "IconQuestionCircleFill",
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
    const n = e0("icon"), i = _(() => [n, `${n}-question-circle-fill`, { [`${n}-spin`]: e.spin }]), a = _(() => {
      const o = {};
      return e.size && (o.fontSize = p0(e.size) ? `${e.size}px` : e.size), e.rotate && (o.transform = `rotate(${e.rotate}deg)`), o;
    });
    return {
      cls: i,
      innerStyle: a,
      onClick: (o) => {
        t("click", o);
      }
    };
  }
}), E7 = ["stroke-width", "stroke-linecap", "stroke-linejoin"], C7 = /* @__PURE__ */ R("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm-3.862-24.021a.461.461 0 0 0 .462-.462 2.37 2.37 0 0 1 .636-1.615C21.64 17.48 22.43 17 23.988 17c1.465 0 2.483.7 3.002 1.493.555.848.446 1.559.182 1.914-.328.444-.736.853-1.228 1.296-.15.135-.335.296-.533.468-.354.308-.75.654-1.067.955C23.22 24.195 22 25.686 22 28v.013a1 1 0 0 0 1.006.993l2.008-.012a.993.993 0 0 0 .986-1c.002-.683.282-1.19 1.101-1.97.276-.262.523-.477.806-.722.21-.18.439-.379.713-.626.57-.513 1.205-1.13 1.767-1.888 1.516-2.047 1.161-4.634-.05-6.485C29.092 14.398 26.825 13 23.988 13c-2.454 0-4.357.794-5.642 2.137-1.25 1.307-1.742 2.954-1.746 4.37 0 .26.21.472.47.472h3.068Zm1.868 14.029a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V32a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2.008Z",
  fill: "currentColor",
  stroke: "none"
}, null, -1), w7 = [
  C7
];
function k7(e, t, n, i, a, l) {
  return w(), F("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    class: H(e.cls),
    style: s0(e.innerStyle),
    "stroke-width": e.strokeWidth,
    "stroke-linecap": e.strokeLinecap,
    "stroke-linejoin": e.strokeLinejoin,
    onClick: t[0] || (t[0] = (...o) => e.onClick && e.onClick(...o))
  }, w7, 14, E7);
}
var De = /* @__PURE__ */ n0(g7, [["render", k7]]);
const S7 = Object.assign(De, {
  install: (e, t) => {
    var n;
    const i = (n = t == null ? void 0 : t.iconPrefix) != null ? n : "";
    e.component(i + De.name, De);
  }
}), _7 = { class: "edit-item_label" }, T7 = {
  key: 0,
  style: { "max-width": "40vw", "word-break": "break-word", "white-space": "normal", display: "inline-block", overflow: "hidden" }
}, x7 = { class: "edit-item_content" }, $7 = { class: "edit-item_form-item" }, M7 = {
  key: 0,
  class: "edit-item_description"
}, P7 = { key: 0 }, A7 = /* @__PURE__ */ j({
  name: "EditItem",
  __name: "EditItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    tooltip: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "horizontal"
    },
    prefix: {
      type: [String, Boolean],
      default: "："
    },
    textAlign: {
      type: String,
      default: "right",
      validator: (e) => ["left", "center", "right"].includes(e)
    },
    labelWidth: {
      type: [Number, String],
      default: 120
    }
  },
  setup(e) {
    const t = e, n = _(() => ({
      "--label-width": typeof t.labelWidth == "string" ? t.labelWidth : `${t.labelWidth}px`,
      "--text-align": t.textAlign,
      "--el-align": t.align === "vertical" ? "column" : "row"
    })), i = _(() => t.prefix ? typeof t.prefix == "string" ? `${t.label}${t.prefix}` : `${t.label}：` : t.label);
    return (a, l) => (w(), F("div", {
      class: "edit-item",
      style: s0(n.value)
    }, [
      R("div", _7, [
        e.tooltip || a.$slots.tooltip ? (w(), V(x(j0), {
          key: 0,
          position: "tr"
        }, {
          content: T(() => [
            a.$slots.tooltip ? Y("", !0) : (w(), F("div", T7, q(e.tooltip), 1)),
            K(a.$slots, "tooltip", {}, void 0, !0)
          ]),
          default: T(() => [
            E(x(S7), { style: { "margin-right": "6px" } })
          ]),
          _: 3
        })) : Y("", !0),
        R("span", null, q(i.value), 1)
      ]),
      R("div", x7, [
        R("div", $7, [
          K(a.$slots, "default", {}, void 0, !0)
        ]),
        e.description || a.$slots.description ? (w(), F("div", M7, [
          e.description ? (w(), F("span", P7, q(e.description), 1)) : Y("", !0),
          K(a.$slots, "description", {}, void 0, !0)
        ])) : Y("", !0)
      ])
    ], 4));
  }
}), b1 = /* @__PURE__ */ a4(A7, [["__scopeId", "data-v-c9d2b818"]]), dt = /* @__PURE__ */ j({
  name: "ValidateInput",
  __name: "ValidateInput",
  props: {
    modelValue: {
      type: String,
      default: void 0
    },
    validator: {
      type: Function,
      default: void 0
    }
  },
  emits: ["update:modelValue", "input"],
  setup(e, { emit: t }) {
    const n = e, i = t, a = _({
      get: () => n.modelValue,
      set: (o) => {
        i("update:modelValue", o), i("input", o);
      }
    }), l = _(() => {
      var o;
      return n.validator && typeof n.validator == "function" ? n.validator() : !!((o = a.value) != null && o.length);
    });
    return (o, s) => {
      const r = Lt;
      return w(), V(r, A0({
        modelValue: x(a),
        "onUpdate:modelValue": s[0] || (s[0] = (c) => G0(a) ? a.value = c : null)
      }, o.$attrs, {
        class: x(l) ? "feedback-success" : "feedback-error"
      }), {
        suffix: T(() => [
          x(l) ? (w(), V(x(ee), {
            key: 0,
            size: "16"
          })) : (w(), V(x(te), {
            key: 1,
            size: "16"
          }))
        ]),
        _: 1
      }, 16, ["modelValue", "class"]);
    };
  }
}), Z7 = /\s/, B7 = /^([a-z][\w-.]*:)?[a-z_][\w-.]*$/i, N7 = /^[a-z_][\w-.]*$/i;
function L7(e) {
  return Z7.test(e);
}
function We(e, t) {
  if (!e)
    return;
  const n = D7(t);
  if (n)
    return n;
  const i = e.$model.ids.assigned(t);
  if (i && i !== e)
    return "ID 必须是唯一的";
}
function D7(e) {
  if (L7(e))
    return "ID 不能包含空格";
  if (!N7.test(e))
    return B7.test(e) ? "ID 不能包含前缀(不能有 : 存在)" : "ID 必须以字母或者_作为开头，只能存在字母、数字、_ 和 -";
}
const ie = (e, t, n, i, a, l = !0) => {
  e == null || e.updateModdleProperties(t, n, {
    [i]: l ? I7(a) : a
  });
}, I7 = (e) => {
  if (e !== "")
    return e;
};
function O7(e) {
  return D(e, "bpmn:Participant") && e.businessObject.get("processRef");
}
function V7(e, t) {
  const n = t.create("bpmn:CategoryValue"), i = t.create("bpmn:Category", {
    categoryValue: [n]
  });
  return O4(e.get("rootElements"), i, -1), u0(i).$parent = e, u0(n).$parent = i, n;
}
function z7(e, t, n) {
  const i = u0(t).$parent;
  e.categoryValueRef = V7(i, n);
}
function F7(e) {
  if (D(e, "bpmn:TextAnnotation"))
    return e.businessObject.text;
  if (D(e, "bpmn:Group")) {
    const t = u0(e), n = t == null ? void 0 : t.categoryValueRef;
    return n == null ? void 0 : n.value;
  }
  return e.businessObject.name;
}
function H7(e, t, n, i) {
  const a = We(n, i);
  if (a && a.length)
    return a;
  D(t, "bpmn:Collaboration") ? ie(e.get("modeling"), t, n, "id", i) : e.get("modeling").updateProperties(t, { id: i });
}
function j7(e, t, n) {
  const i = t.businessObject.get("processRef");
  ie(e.get("modeling"), t, i, "id", n);
}
function R7(e, t, n) {
  const i = t.businessObject.get("processRef");
  ie(e.get("modeling"), t, i, "name", n);
}
function W7(e, t, n, i) {
  ie(e.get("modeling"), t, n, "isExecutable", i);
}
const U7 = /* @__PURE__ */ j({
  name: "ShapeGeneration",
  __name: "ShapeGeneration",
  props: {
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const { t } = Z0(), n = l0(Wt), i = l0(x0), a = () => {
      const C = n == null ? void 0 : n.value;
      let p = u0(C);
      D(C, "bpmn:Participant") && (p = C.businessObject.get("processRef"));
      const d = i.value.get("modeling");
      return { element: C, businessObject: p, modeling: d, modeler: i.value };
    }, l = P(), o = P(), s = (C) => {
      o.value = F7(C), l.value = C.businessObject.id;
    }, r = () => {
      const { element: C } = a();
      return !We(C.businessObject, l.value);
    }, c = Re({ delay: 0, trailing: !0 }, () => {
      const { element: C, modeling: p, modeler: d } = a();
      if (D(C, "bpmn:TextAnnotation"))
        return p.updateProperties(C, { text: o.value });
      if (D(C, "bpmn:Group")) {
        const b = u0(C), S = b.categoryValueRef, L = d.get("canvas"), B = d.get("bpmnFactory");
        return S || z7(b, L.getRootElement(), B), p.updateLabel(C, o.value);
      }
      return p.updateProperties(C, { name: o.value });
    }), u = Re({ delay: 0, trailing: !0 }, () => {
      const { element: C, modeler: p } = a();
      H7(p, C, C.businessObject, l.value);
    }), m = P(!1), h = P(!1), f = P(), v = P(), y = P(), g = (C) => {
      const { businessObject: p } = a();
      h.value = D(C, "bpmn:Process"), m.value = O7(C), m.value && (f.value = p.get("id"), v.value = p.get("name")), (h.value || m.value) && (y.value = p.get("isExecutable"));
    }, A = () => {
      const { businessObject: C } = a();
      return !We(C, f.value);
    }, Z = (C) => {
      const { element: p, modeler: d } = a();
      j7(d, p, C);
    }, N = (C) => {
      const { element: p, modeler: d } = a();
      R7(d, p, C);
    }, k = (C) => {
      const { element: p, businessObject: d } = a();
      W7(i.value, p, d, C);
    }, I = () => {
      const { element: C } = a();
      C && (s(C), g(C));
    };
    return y7(() => I()), (C, p) => {
      const d = Lt, b = m6, S = O1;
      return w(), V(S, { key: "ShapeGeneration" }, {
        header: T(() => [
          E(x(T6), { size: 14 }),
          Q(q(x(t)(e.translatePrefix + "ShapeGeneration")), 1)
        ]),
        default: T(() => [
          E(b1, {
            label: x(t)(e.translatePrefix + "Id"),
            tooltip: x(t)(
              e.translatePrefix + "IDs must conform to BPMN 2.0 rules, must start with a letter or _, can only have letters, numbers, _ and -, and must be unique within a single process"
            )
          }, {
            default: T(() => [
              E(dt, {
                modelValue: x(l),
                "onUpdate:modelValue": p[0] || (p[0] = (L) => G0(l) ? l.value = L : null),
                validator: r,
                onInput: x(u)
              }, null, 8, ["modelValue", "onInput"])
            ]),
            _: 1
          }, 8, ["label", "tooltip"]),
          E(b1, {
            label: x(t)(e.translatePrefix + "Name")
          }, {
            default: T(() => [
              E(d, {
                "model-value": x(o),
                "onUpdate:modelValue": p[1] || (p[1] = (L) => G0(o) ? o.value = L : null),
                maxlength: 32,
                placeholder: x(t)(e.translatePrefix + "Please enter a name"),
                clearable: "",
                onInput: x(c)
              }, null, 8, ["model-value", "placeholder", "onInput"])
            ]),
            _: 1
          }, 8, ["label"]),
          x(m) ? (w(), V(b1, {
            key: 0,
            label: x(t)(e.translatePrefix + "ProcessId"),
            tooltip: x(t)(
              e.translatePrefix + "IDs must conform to BPMN 2.0 rules, must start with a letter or _, can only have letters, numbers, _ and -, and must be unique within a single process"
            )
          }, {
            default: T(() => [
              E(dt, {
                modelValue: x(f),
                "onUpdate:modelValue": p[2] || (p[2] = (L) => G0(f) ? f.value = L : null),
                validator: A,
                onInput: Z
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["label", "tooltip"])) : Y("", !0),
          x(m) ? (w(), V(b1, {
            key: 1,
            label: x(t)(e.translatePrefix + "ProcessName")
          }, {
            default: T(() => [
              E(d, {
                modelValue: x(v),
                "onUpdate:modelValue": p[3] || (p[3] = (L) => G0(v) ? v.value = L : null),
                maxlength: "32",
                clearable: "",
                onChange: N
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["label"])) : Y("", !0),
          x(h) || x(m) ? (w(), V(b1, {
            key: 2,
            label: x(t)(e.translatePrefix + "Executable")
          }, {
            default: T(() => [
              E(b, {
                modelValue: x(y),
                "onUpdate:modelValue": p[4] || (p[4] = (L) => G0(y) ? y.value = L : null),
                onChange: k
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["label"])) : Y("", !0)
        ]),
        _: 1
      });
    };
  }
}), q7 = (e) => Object.prototype.toString.call(e), K7 = (e) => typeof e > "u", o4 = (e) => q7(e) === "[object Object]", G7 = Math.max, Y7 = Math.min;
function X7(e, t, n) {
  let i, a, l, o, s, r, c = 0, u = !1, m = !1, h = !0;
  t = t || 0, o4(n) && (u = !!n.leading, m = "maxWait" in n, l = m ? G7(n.maxWait || 0, t) : 0, h = "trailing" in n ? !!n.trailing : h);
  function f(C) {
    const p = i, d = a;
    return i = a = void 0, c = C, o = e.apply(d, p), o;
  }
  function v(C) {
    return c = C, s = setTimeout(A, t), u ? f(C) : o;
  }
  function y(C) {
    const p = C - r, d = C - c, b = t - p;
    return m ? Y7(b, l - d) : b;
  }
  function g(C) {
    const p = C - r, d = C - c;
    return r === void 0 || p >= t || p < 0 || m && d >= l;
  }
  function A() {
    const C = Date.now();
    if (g(C))
      return Z(C);
    s = setTimeout(A, y(C));
  }
  function Z(C) {
    return s = void 0, h && i ? f(C) : (i = a = void 0, o);
  }
  function N() {
    s !== void 0 && clearTimeout(s), c = 0, i = r = a = s = void 0;
  }
  function k() {
    return s === void 0 ? o : Z(Date.now());
  }
  function I(...C) {
    const p = Date.now(), d = g(p);
    if (i = C, a = this, r = p, d) {
      if (s === void 0)
        return v(r);
      if (m)
        return s = setTimeout(A, t), f(r);
    }
    return s === void 0 && (s = setTimeout(A, t)), o;
  }
  return I.cancel = N, I.flush = k, I;
}
function J7(e, t, n) {
  let i = !0, a = !0;
  return o4(n) && (i = "leading" in n ? !!n.leading : i, a = "trailing" in n ? !!n.trailing : a), X7(e, t, {
    leading: i,
    maxWait: t,
    trailing: a
  });
}
const Q7 = { class: "properties-penal_header" }, ei = { class: "properties-penal_content" }, ti = /* @__PURE__ */ j({
  name: "BusinessPanel",
  __name: "index",
  props: {
    translatePrefix: {
      type: String,
      default: ""
    }
  },
  setup(e, { expose: t }) {
    const { t: n } = Z0(), i = l0(x0), a = P(!0), l = (Z) => {
      K7(Z) ? a.value = !a.value : a.value = Z;
    }, o = ["ShapeGeneration"], s = P([...o]), r = x1(), c = P(""), u = P(""), m = P(""), h = x1([]);
    function f(Z, N) {
      return m8(Z, (k) => k === N);
    }
    function v(Z) {
      return Z && i.value.get("elementRegistry").get(Z.id);
    }
    function y() {
      const Z = [U7];
      h.value = Z;
    }
    const g = Re({ delay: 200 }, (Z) => {
      try {
        let N = Z;
        if (!N && (N = i.value.get("canvas").getRootElement(), !N || !N.type))
          return console.warn("No Element found!");
        N.type === "label" && (N = N.labelTarget);
        let k = d7(N);
        D(N, "bpmn:Collaboration") ? (u.value = "Process", m.value = ct.Process) : (u.value = k, m.value = ct[k]), r.value = N, c.value = N.id, y(), T1(() => V0.emit("element-update", r.value));
      } catch (N) {
        console.error(N);
      }
    });
    function A() {
      i != null && i.value || console.log("属性面板初始化异常", "bpmnModeler is undefined");
      let Z = !1;
      i.value.on(
        ["connectionSegment.move.start", "shape.move.start", "bendpoint.move.start"],
        () => {
          Z = !0;
        }
      ), i.value.on(
        ["connectionSegment.move.end", "shape.move.end", "bendpoint.move.end"],
        2e3,
        () => {
          Z = !1;
        }
      ), i.value.on("root.added", ({ element: N }) => {
        g(N);
      }), i.value.on("elementTemplates.changed", () => {
        g();
      }), i.value.on("elements.changed", ({ elements: N = [] }) => {
        const k = f(N, r.value);
        k && v(k) && g(k);
      }), i.value.on("selection.changed", ({ newSelection: N = [] }) => {
        Z || r.value === N[0] || (g(N[0]), N[0] ? s.value = [...o] : s.value = ["ShapeGeneration"]);
      });
    }
    return M1(() => {
      i != null && i.value && A();
    }), d1(Wt, r), t({
      togglePanel: l
    }), (Z, N) => {
      const k = Nn;
      return w(), F("div", {
        class: H(["business-panel", { open: x(a) }])
      }, [
        R("div", {
          class: "toggle-btn",
          onClick: N[0] || (N[0] = (I) => l())
        }, [
          E(x(x6), { size: 12 })
        ]),
        R("div", Q7, [
          E(c7, {
            name: x(m),
            size: 30
          }, null, 8, ["name"]),
          R("p", null, q(x(n)(e.translatePrefix + x(u))), 1)
        ]),
        R("div", ei, [
          E(k, {
            "active-key": x(s),
            "onUpdate:activeKey": N[1] || (N[1] = (I) => G0(s) ? s.value = I : null),
            bordered: !1,
            "expand-icon-position": "right",
            size: "small",
            style: { "border-radius": "0" }
          }, {
            default: T(() => [
              (w(!0), F(z0, null, pt(x(h), (I) => (w(), V(vt(I), {
                key: I.__name,
                "translate-prefix": e.translatePrefix
              }, null, 8, ["translate-prefix"]))), 128))
            ]),
            _: 1
          }, 8, ["active-key"])
        ])
      ], 2);
    };
  }
});
if (typeof window < "u") {
  let e = function() {
    var t = document.body, n = document.getElementById("__svg__icons__dom__");
    n || (n = document.createElementNS("http://www.w3.org/2000/svg", "svg"), n.style.position = "absolute", n.style.width = "0", n.style.height = "0", n.id = "__svg__icons__dom__", n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), n.setAttribute("xmlns:link", "http://www.w3.org/1999/xlink")), n.innerHTML = '<symbol   viewBox="0 0 64 64" id="bpmn-empty-state"><defs><rect id="bpmn-empty-state_a" width="57" height="47" x="3" y="8" rx="7" /><mask id="bpmn-empty-state_b" width="57" height="47" x="0" y="0" fill="#fff" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox"><use xlink:href="#bpmn-empty-state_a" /></mask></defs><g fill="none" fill-rule="evenodd"><path fill="#818798" d="M52 11a5 5 0 0 1 5 5v31a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V16a5 5 0 0 1 5-5h41Zm0 2H11a3 3 0 0 0-2.995 2.824L8 16v31a3 3 0 0 0 2.824 2.995L11 50h41a3 3 0 0 0 2.995-2.824L55 47V16a3 3 0 0 0-2.824-2.995L52 13Z" /><path fill="#D5D7DD" d="M16 24h31v6H16zM21 33h21v6H21z" /><use stroke="currentColor" stroke-dasharray="5 2" stroke-width="2" mask="url(#bpmn-empty-state_b)" xlink:href="#bpmn-empty-state_a" /></g></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-association"><path stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="3.3,6" stroke-linecap="square" d="m1.5 30.5 29-29" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-business-rule-task"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494Zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5ZM5.296 7.398v12.665h16.87V7.398H5.296Zm.718 4.386h15.433v3.44H9.985v-3.432h-.719v3.431H6.014v-3.44Zm0 4.158h3.252v3.403H6.014v-3.403Zm3.97 0h11.463v3.403H9.985v-3.403Z" /><path d="M6.079 8.209v3.587H21.44V8.209z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-call-activity"><path d="M24.978 3c3.761 0 6.89 2.979 7.018 6.695l.004.238V22.4c0 3.747-3.05 6.804-6.783 6.93l-.24.003H7.023c-3.761 0-6.89-2.978-7.018-6.695L0 22.4V9.933C0 6.187 3.05 3.13 6.783 3.004L7.023 3h17.955Zm0 3.667H7.022c-1.842 0-3.255 1.344-3.35 3.079l-.005.187V22.4c0 1.761 1.35 3.167 3.16 3.262l.195.005L10 25.666V15h12v10.666h2.978c1.842 0 3.255-1.344 3.35-3.079l.005-.187V9.933c0-1.761-1.35-3.166-3.16-3.261l-.195-.005Zm-3.732 9.087H10.754v9.912h10.491v-9.912Zm-4.475 1.817v2.658h2.658v1.542H16.77v2.658H15.23V21.77H12.57V20.23h2.658V17.57h1.542Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-collaboration"><g fill-rule="evenodd"><path fill-rule="nonzero" d="M0 0v8.62h32V0H0zm1.655 7.054v-5.37h28.62v5.37H1.656zM0 23.38V32h32v-8.62H0zm1.655 7.054v-5.37h28.62v5.37H1.656z" /><path d="m24 8 4 7h-8l4-7Zm0 2-2.28 4h4.56L24 10ZM23.5 21h1v3h-1zM23.5 15h1v3h-1zM8 24l-4-7h8l-4 7Zm0-2 2.28-4H5.72L8 22ZM7.5 8h1v3h-1zM7.5 14h1v3h-1z" /></g></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-conditional-flow"><path d="M32 .041S20.42 5.95 14.537 8.713c1.26 1.15 2.432 2.392 3.648 3.588-5.703 5.78-3.15 3.303-8.087 8.316l-8.472 1.377L0 32l10.006-1.626.098-.598 1.279-7.873c4.975-5.052 2.403-2.555 8.118-8.346 1.218 1.214 2.43 2.435 3.648 3.648C26.29 11.018 32 .041 32 .041ZM9.603 22.397 8.54 28.91 2.03 29.97l1.061-6.515 6.512-1.058Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-connection"><path d="M32 .06S20.33 6.014 14.403 8.798c1.27 1.16 2.451 2.41 3.676 3.616L0 30.734 1.325 32l18.08-18.32c1.227 1.223 2.448 2.453 3.676 3.676C26.247 11.12 32 .06 32 .06Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-data-input-output-association"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="1.1,4.3" d="M1.5 30.5 27 5" /><path d="M31.803.197 26.5 16.107l-1.52-1.52 3.783-11.35-11.35 3.783-1.52-1.52z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-data-input"><path d="M20.833 0H3.488v32H28V7.36L20.833 0Zm-2.105 1.818v7.507h7.454v20.857H5.306V1.818h13.422Zm1.818.493 5.06 5.196h-5.06V2.311Zm-9.182.86v3.744H7.081v3.222h4.283v3.743l5.7-5.354-5.7-5.354Zm.808 1.868 3.711 3.487-3.71 3.487V9.329H7.888V7.723h4.283V5.039Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-data-object"><path d="M21.345 0H4v32h24.512V7.36L21.345 0ZM19.24 1.818v7.507h7.454v20.857H5.818V1.818H19.24Zm1.818.493 5.06 5.196h-5.06V2.311Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-data-output"><path d="M20.833 0H3.488v32H28V7.36L20.833 0Zm-2.105 1.818v7.507h7.454v20.857H5.306V1.818h13.422Zm1.818.493 5.06 5.196h-5.06V2.311Zm-9.182.86v3.744H7.081v3.222h4.283v3.743l5.7-5.354-5.7-5.354Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-data-store"><path d="M16.008 1c-3.712 0-7.417.306-10.319.939-1.45.316-2.7.71-3.68 1.226C1.065 3.662.297 4.304.061 5.23a.823.823 0 0 0-.035.15L0 5.502l.017.084c-.012 7.41 0 14.46 0 22.08l.017.082c.203.985.995 1.656 1.975 2.172.98.517 2.23.91 3.68 1.226 2.902.633 6.607.94 10.319.94 3.711 0 7.416-.307 10.318-.94 1.451-.316 2.701-.71 3.68-1.226.98-.516 1.772-1.187 1.975-2.172l.017-.082V5.541a.825.825 0 0 0 0-.106v-.016l-.002-.013a.823.823 0 0 0-.046-.197c-.244-.916-1.007-1.55-1.943-2.044-.98-.516-2.23-.91-3.68-1.226C23.423 1.306 19.718 1 16.006 1Zm0 1.646c3.62 0 7.245.308 9.968.901 1.36.297 2.497.67 3.263 1.074.612.323.932.643 1.063.882-.131.24-.451.56-1.063.882-.766.404-1.902.777-3.263 1.074-2.723.594-6.349.901-9.968.901-3.62 0-7.245-.307-9.968-.901-1.361-.297-2.497-.67-3.264-1.074-.611-.322-.931-.642-1.062-.882.13-.24.451-.56 1.062-.882.767-.403 1.903-.777 3.264-1.074 2.723-.593 6.348-.9 9.968-.9ZM1.664 7.647c.112.067.227.132.345.194.98.517 2.23.91 3.68 1.226 2.902.633 6.607.94 10.319.94 3.711 0 7.416-.307 10.318-.94 1.451-.316 2.701-.71 3.68-1.226.119-.062.234-.127.346-.194v1.93c-.08.245-.398.619-1.113.995-.766.404-1.902.777-3.263 1.074-2.723.594-6.349.901-9.968.901-3.62 0-7.245-.307-9.968-.9-1.361-.298-2.497-.671-3.264-1.075-.714-.376-1.032-.75-1.112-.995v-1.93Zm0 4.187c.112.067.227.132.345.195.98.516 2.23.91 3.68 1.226 2.902.632 6.607.938 10.319.938 3.711 0 7.416-.306 10.318-.938 1.451-.317 2.701-.71 3.68-1.226.119-.063.234-.128.346-.195v1.93c-.08.245-.398.619-1.113.995-.766.404-1.902.777-3.263 1.074-2.723.594-6.349.901-9.968.901-3.62 0-7.245-.307-9.968-.9-1.361-.298-2.497-.67-3.264-1.075-.714-.376-1.032-.75-1.112-.995v-1.93Zm0 4.188c.112.067.227.131.345.194.98.516 2.23.91 3.68 1.226 2.902.633 6.607.939 10.319.939 3.711 0 7.416-.306 10.318-.94 1.451-.316 2.701-.709 3.68-1.225.119-.063.234-.127.346-.194V27.47c-.08.245-.398.618-1.113.995-.766.404-1.902.777-3.263 1.074-2.723.594-6.349.9-9.968.9-3.62 0-7.245-.306-9.968-.9-1.361-.297-2.497-.67-3.264-1.074-.714-.377-1.032-.75-1.112-.995V16.022Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-default-flow"><path d="M32 .06S20.33 6.014 14.403 8.798c1.27 1.16 2.451 2.41 3.676 3.616L6.84 23.804H.046v1.755h5.063L0 30.735 1.325 32l6.357-6.441h7.145v-1.756H9.414l9.99-10.123c1.228 1.223 2.45 2.453 3.677 3.676C26.247 11.12 32 .06 32 .06Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-cancel"><path d="M15.676.051C7.943.058.834 6.501.104 14.21c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 5.009 23.394.364 16.978.083A18.532 18.532 0 0 0 15.676.05Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm-3.955 3.918L8.94 12.072l3.985 3.985-3.913 3.913 3.048 3.047 3.913-3.913 3.987 3.987 3.096-3.096-3.987-3.987 3.913-3.913-3.047-3.048-3.913 3.913-3.985-3.985Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-compensation"><path d="M15.676.051C7.943.058.834 6.501.104 14.21c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 5.009 23.394.364 16.978.083A18.532 18.532 0 0 0 15.676.05Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm-.56 5.744-7.407 5.23 7.408 5.234v-5.057c2.384 1.687 4.771 3.371 7.157 5.057V10.801l-7.157 5.054v-5.054Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-error"><path d="M15.676.051C7.943.058.834 6.501.104 14.21c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 5.009 23.394.364 16.978.083A18.532 18.532 0 0 0 15.676.05Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm6.132 4.166-3.633 7.363-4.516-5.874-4.102 12.131 4.599-5.91 4.743 5.427 2.909-13.137Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-escalation"><path d="M15.676.051C7.943.058.834 6.501.104 14.21c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 5.009 23.394.364 16.978.083A18.532 18.532 0 0 0 15.676.05Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm.006 3.9c-1.672 4.653-2.733 9.5-4.406 14.153 1.535-1.525 2.872-3.234 4.406-4.759l4.406 4.76c-1.497-4.71-2.91-9.445-4.406-14.155Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-link"><path d="M15.676 0C7.943.007.834 6.45.104 14.16c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 4.958 23.394.313 16.978.032A18.532 18.532 0 0 0 15.676 0Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm1.78 4.065v3.555H9.779v6.713h7.994v3.554l5.828-6.91-5.828-6.912Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-message"><path d="M15.676 0C7.943.007.834 6.45.104 14.16c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 4.958 23.394.313 16.978.032A18.532 18.532 0 0 0 15.676 0Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm-5.91 5.448 6.041 4.9 6.04-4.9H10.084Zm-1.34 1.137v9.92h14.513v-9.718l-7.132 5.786-7.381-5.988Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-multiple"><path d="M15.676 0C7.943.007.834 6.45.104 14.16c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 4.958 23.394.313 16.978.032A18.529 18.529 0 0 0 15.676 0Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm.011 3.039-7.619 5.53 2.91 8.95h9.418l2.91-8.95-7.619-5.53Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-none"><path d="M15.84.042C8.654-.01 1.913 5.437.4 12.454-1.057 18.62 1.554 25.495 6.784 29.09c5.076 3.636 12.31 3.92 17.59.544 5.309-3.251 8.435-9.744 7.445-15.921C30.91 7.307 25.795 1.738 19.442.422a16.064 16.064 0 0 0-3.602-.38Zm.382 5.01c5.28-.017 10.13 4.353 10.669 9.61.687 5.025-2.552 10.281-7.423 11.792-4.754 1.617-10.486-.447-12.962-4.856-2.74-4.575-1.574-11.094 2.768-14.27a11.05 11.05 0 0 1 6.948-2.276Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-signal"><path d="M15.676.051C7.943.058.834 6.501.104 14.21c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 5.009 23.394.364 16.978.083A18.532 18.532 0 0 0 15.676.05Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm.006 3.492c-2.261 4.07-4.532 8.136-6.797 12.204h13.595L15.999 8.55Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-end-event-terminate"><path d="M15.676.051C7.943.058.834 6.501.104 14.21c-.783 6.565 2.912 13.427 8.942 16.216 5.6 2.737 12.789 1.87 17.434-2.344 4.725-4.09 6.79-11.06 4.714-17.006C29.22 5.009 23.394.364 16.978.083A18.532 18.532 0 0 0 15.676.05Zm.317 5.006c5.695-.165 10.916 4.858 10.983 10.555.246 5.212-3.67 10.33-8.864 11.204-5.026 1.007-10.6-1.898-12.36-6.777-1.894-4.826.039-10.928 4.649-13.46a11.082 11.082 0 0 1 5.592-1.522Zm.006 2.859c-5.264-.2-9.495 5.551-7.755 10.516 1.366 5.085 8.108 7.436 12.339 4.301 4.455-2.807 4.708-9.943.462-13.058A8.128 8.128 0 0 0 16 7.915Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-event-subprocess-expanded"><path d="M7.295 4.78h1.779V3.003h-1.78V4.78Zm3.558 0h1.779V3.003h-1.78V4.78Zm3.557 0h1.78V3.003h-1.78V4.78Zm3.558 0h1.78V3.003h-1.78V4.78Zm3.558 0h1.779V3.003h-1.779V4.78Zm3.558 0c.55.014 1.106-.034 1.654.045l.245-1.762c-.629-.096-1.266-.05-1.9-.061V4.78ZM5.732 3.004a5.933 5.933 0 0 0-.915.093c.111.582.226 1.164.315 1.75.358-.101.947.098.746-.483-.096-.382.164-1.208-.146-1.36Zm22.372 2.281c.427.234.812.547 1.13.915.42-.4 1.002-.777 1.33-1.18a5.863 5.863 0 0 0-1.593-1.289l-.867 1.554Zm-25.27-1.44c-.587.354-1.11.811-1.539 1.345.47.333.96.86 1.417 1.077.299-.362.66-.673 1.065-.913-.328-.493-.55-1.055-.944-1.509ZM30.515 7.26c-.563.046-.557.342-.378.784.154.25-.097.862.25.85.525-.023 1.14.043 1.612-.032a5.891 5.891 0 0 0-.362-2.027l-1.122.425ZM.268 7.114A6.042 6.042 0 0 0 0 9.052h1.78c-.013-.5.047-1.003.208-1.478L.296 7.027l-.026.079-.002.008ZM30.22 12.45H32v-1.779h-1.779v1.779Zm-30.22.16h1.78v-1.779H0v1.78Zm30.22 3.398H32v-1.78h-1.779v1.78Zm-30.22.16h1.78v-1.779H0v1.779Zm30.22 3.398H32v-1.78h-1.779v1.78Zm-30.22.16h1.78v-1.78H0v1.78Zm30.22 3.397H32v-1.779h-1.779v1.78Zm-30.22.16h1.78v-1.778H0v1.778Zm30.137 1.47a4.059 4.059 0 0 1-.522 1.32c.506.283 1.046.715 1.53.908a5.836 5.836 0 0 0 .744-1.918c-.576-.094-1.209-.264-1.752-.31Zm-29.984.51c.157.676.435 1.325.82 1.904l1.486-.977a4.065 4.065 0 0 1-.577-1.347l-1.73.42Zm28.427 1.943c-.371.277-.79.49-1.234.627l.548 1.693a5.84 5.84 0 0 0 1.835-.96l-1.082-1.412-.066.05-.001.002Zm-26.164 1.47c.567.413 1.21.722 1.886.907.14-.569.343-1.175.444-1.722a4.062 4.062 0 0 1-1.283-.624l-1.047 1.438Zm3.88 1.119h1.779v-1.78h-1.78v1.78Zm3.55 0h1.787v-1.78H9.846v1.78Zm3.565 0h1.78v-1.78h-1.78v1.78Zm3.558 0h1.78v-1.78h-1.78v1.78Zm3.451 0h1.743v-1.78h-1.743v1.78Zm3.665 0h1.779v-1.78h-1.78v1.78Zm-1.922-.545V16.776H9.846V29.25h12.318ZM10.967 17.905h10.068V27.97H10.967V17.905Zm1.336 3.998v1.711h7.396v-1.711h-7.396Z" opacity=".97" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-gateway-complex"><path d="M16.001 0a1.29 1.29 0 0 0-.917.373L.373 15.084a1.316 1.316 0 0 0 .002 1.834l14.71 14.709a1.313 1.313 0 0 0 1.833 0l14.711-14.711a1.316 1.316 0 0 0-.002-1.834L16.917.372A1.294 1.294 0 0 0 16.002 0ZM16 2.181l13.821 13.821L16 29.823 2.179 16.003 16 2.18Zm-.327 6.79v.007l-.145.027-.118.08-.083.123-.028.145v4.954L11.793 10.8l-.125-.08-.14-.029-.144.027-.122.082-.46.46-.085.125-.026.142.028.14.08.125 3.505 3.505H9.347l-.001-.002-.145.032-.118.08-.083.122-.028.146v.652l.029.147.082.119.12.08.144.032h4.956L10.8 20.207v-.001l-.084.124-.026.142.028.14.08.124.46.461.126.082.14.029.143-.027.124-.084L15.3 17.69v4.964-.001l.028.147.082.12.12.08.144.031h.652l.148-.03.118-.08.083-.12.028-.146v-4.962l3.505 3.505.126.082.14.027.142-.027.124-.084.461-.46.083-.123s.028-.144.027-.146l-.028-.14-.082-.126-3.496-3.496h4.948l.148-.03.119-.08.082-.12.028-.147v-.652l-.028-.145-.083-.122-.119-.08s-.147-.033-.147-.031h-4.964l3.512-3.512.082-.122.029-.144-.028-.14-.084-.124-.46-.461-.123-.082-.14-.027-.145.027-.122.082-3.507 3.507V9.348l-.028-.146-.082-.122-.12-.08-.147-.029h-.652Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-gateway-eventbased"><path d="M16 0a1.29 1.29 0 0 0-.918.373L.371 15.084a1.316 1.316 0 0 0 .002 1.834l14.71 14.709a1.313 1.313 0 0 0 1.833 0l14.711-14.711a1.316 1.316 0 0 0-.002-1.834L16.915.372A1.294 1.294 0 0 0 16 0Zm-.002 2.181 13.821 13.821-13.821 13.821-13.821-13.82L15.998 2.18Zm0 5.876-.254.185-7.377 5.355 2.915 8.964h9.433l2.915-8.964-7.631-5.54Zm0 1.07 6.614 4.8-2.526 7.769h-8.175l-2.526-7.768 6.614-4.802Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-gateway-none"><path d="M.373 15.084a1.316 1.316 0 0 0 .002 1.834l14.71 14.709a1.313 1.313 0 0 0 1.833 0l14.711-14.711a1.316 1.316 0 0 0-.002-1.834L16.917.373a1.313 1.313 0 0 0-1.833 0L.373 15.084Zm1.806.918L16 2.182l13.821 13.82L16 29.823 2.179 16.003Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-gateway-or"><path d="M16.001 0a1.29 1.29 0 0 0-.917.373L.373 15.084a1.316 1.316 0 0 0 .002 1.834l14.71 14.709a1.313 1.313 0 0 0 1.833 0l14.711-14.711a1.316 1.316 0 0 0-.002-1.834L16.917.372A1.294 1.294 0 0 0 16.002 0ZM16 2.181l13.821 13.821L16 29.823 2.179 16.003 16 2.18Zm0 6.379a7.447 7.447 0 0 0-7.44 7.441A7.447 7.447 0 0 0 16 23.443 7.447 7.447 0 0 0 23.443 16a7.447 7.447 0 0 0-7.441-7.441Zm0 .825a6.61 6.61 0 0 1 6.617 6.616A6.61 6.61 0 0 1 16 22.618 6.61 6.61 0 0 1 9.385 16 6.61 6.61 0 0 1 16 9.385Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-gateway-parallel"><path d="M16.001 0a1.29 1.29 0 0 0-.917.373L.373 15.084a1.316 1.316 0 0 0 .002 1.834l14.71 14.709a1.313 1.313 0 0 0 1.833 0l14.711-14.711a1.316 1.316 0 0 0-.002-1.834L16.917.372A1.294 1.294 0 0 0 16.002 0ZM16 2.181l13.821 13.821L16 29.823 2.179 16.003 16 2.18Zm-.377 5.708-.168.032-.136.092-.096.14-.032.168v6.868h-6.87l-.002-.002-.166.037-.137.092v-.002l-.095.141-.033.167v.753s.032.169.034.17l.094.138.138.092.167.036h6.87v6.867l-.001-.001.033.17.095.138.138.092s.166.035.167.037h.752l.17-.036.137-.092.095-.137.033-.17v-6.867h6.868l.17-.035.137-.092.095-.137.033-.17v-.753s-.033-.165-.032-.167l-.096-.14-.138-.093s-.17-.037-.17-.035H16.81V8.323l-.033-.168-.094-.14-.138-.092-.17-.034h-.752Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-gateway-xor"><path d="M16 0a1.29 1.29 0 0 0-.918.373L.371 15.084a1.316 1.316 0 0 0 .002 1.834l14.71 14.709a1.313 1.313 0 0 0 1.833 0l14.711-14.711a1.316 1.316 0 0 0-.002-1.834L16.915.372A1.294 1.294 0 0 0 16 0Zm-.002 2.181 13.821 13.821-13.821 13.821-13.821-13.82L15.998 2.18Zm-5.162 7.69-.166.032-.141.096-.532.532s-.097.142-.097.144l-.03.164.032.162.093.144 4.857 4.858-4.855 4.855v-.001L9.9 21l-.03.164.032.162s.093.142.093.144l.531.532.146.095.162.032.164-.03.144-.097 4.855-4.856 4.857 4.857.145.095.162.032.164-.03.144-.097.531-.532.095-.14.033-.168-.033-.162-.095-.146L17.144 16 22 11.144l.095-.14.033-.166-.033-.163-.097-.144-.532-.532-.14-.095-.163-.032-.166.032-.141.095L16 14.855l-4.858-4.858v-.002l-.144-.092-.162-.032Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-group"><path d="M6.34.016c-2.333.025-4.684 1.77-5.29 4.17C.608 5.848.88 7.608.804 9.314v2.922h2.041c.038-2.332-.076-4.673.062-7C3.14 3.355 4.869 1.938 6.643 2.04h8.956V.009c-3.086 0-6.173-.02-9.258 0v.007Zm13.094 2.023h1.92V.009h-1.92v2.03Zm5.756 0c1.265-.069 2.66.045 3.602 1.055 1.036.983 1.201 2.523 1.122 3.91v6.313h2.078c-.03-2.677.062-5.36-.047-8.032-.17-2.743-2.62-5.111-5.215-5.236-.511-.064-1.027-.02-1.54-.033v2.023ZM.803 18.319h2.041v-2.026H.804v2.026Zm29.11 1.084h2.08v-2.03h-2.08v2.03ZM.804 26.148c.004 2.218 1.393 4.366 3.313 5.28 1.728.853 3.681.448 5.521.544.43-.112 1.29.231 1.435-.183v-1.847c-1.788-.043-3.584.094-5.365-.082-1.67-.354-2.919-2.048-2.863-3.844v-3.644H.804v3.777Zm29.11-.068c.04 1.961-1.508 3.787-3.381 3.842-1.954.06-3.914.02-5.87.026v2.03c2.118-.042 4.242.08 6.355-.063 2.524-.264 4.818-2.644 4.94-5.323.08-1.039.014-2.085.035-3.126h-2.078v2.613Zm-15.006 5.898h1.92v-2.03h-1.92v2.03Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-cancel"><path d="M15.975.049C8.195-.111.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.454 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.215-2.282-2.022-5.3-3.217-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.082 11.082 0 0 1 16 5.021Zm-3.956 3.946-3.096 3.097 3.985 3.985-3.913 3.913 3.047 3.048 3.913-3.913 3.988 3.987 3.097-3.096L19.076 16l3.914-3.913-3.048-3.048-3.913 3.913-3.986-3.985Zm-.002 1.222 3.988 3.987 3.913-3.913 1.826 1.826-3.913 3.913 3.985 3.986-1.873 1.873-3.985-3.985-3.913 3.913-1.827-1.827 3.914-3.913-3.988-3.987 1.873-1.873Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-compensation"><path d="M15.975.049C8.195-.11.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.453 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 5.021Zm-.56 5.772-7.408 5.231 7.409 5.234v-5.057c2.385 1.687 4.771 3.371 7.157 5.057V10.793l-7.157 5.055v-5.055Zm-.865 1.665v7.125l-5.048-3.562 5.048-3.563Zm7.161 0v7.132l-5.048-3.566 5.048-3.566Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-condition"><path d="M15.97.04h-.127C8.713-.018 2.003 5.334.437 12.286c-1.51 6.123.98 13.005 6.136 16.665 5.125 3.788 12.546 4.105 17.912.623 5.272-3.276 8.33-9.766 7.325-15.916-.904-6.241-5.79-11.7-11.95-13.143A16.082 16.082 0 0 0 15.97.04Zm-.181 1.724c.115 0 .23 0 .347.003 6.625-.066 12.823 5.149 13.89 11.69 1.13 5.91-1.908 12.349-7.262 15.138-5.473 3.013-12.866 1.884-17.116-2.726C1.291 21.372.444 13.914 3.802 8.602c2.493-4.112 7.169-6.819 11.987-6.838Zm.283 1.554c-.117 0-.234.002-.351.005-6.1 0-11.691 5.049-12.346 11.114-.78 5.684 2.795 11.612 8.218 13.52 5.139 1.943 11.416.101 14.624-4.38 3.461-4.583 3.262-11.538-.596-15.831-2.36-2.747-5.924-4.423-9.549-4.428Zm-.078 1.695c.078 0 .156 0 .234.003 5.4 0 10.321 4.556 10.734 9.942.563 5.13-2.958 10.364-7.971 11.678-4.832 1.41-10.457-.935-12.746-5.446-2.463-4.559-1.2-10.795 3.014-13.883a11.072 11.072 0 0 1 6.735-2.294Zm-5.352 4.266V22.761h10.716V9.279H10.642Zm.863.866h8.987v11.75h-8.987v-11.75Zm.927 1.323v.862h7.133v-.862h-7.133Zm0 2.602v.866h7.133v-.866h-7.133Zm0 3.008v.862h7.133v-.862h-7.133Zm0 2.717v.863h7.133v-.863h-7.133Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-error"><path d="M15.975.049C8.195-.11.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.453 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 5.021Zm6.132 4.194c-1.21 2.455-2.422 4.91-3.633 7.364l-4.516-5.875-4.103 12.133 4.6-5.912c1.58 1.81 3.162 3.619 4.744 5.429L22.13 9.215ZM14.383 13.1l4.295 5.445 1.073-2.387-1.027 4.131-4.384-5.157-1.778 2.75 1.821-4.782Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-escalation"><path d="M15.975.049C8.195-.11.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.453 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 5.021Zm.006 3.927c-1.672 4.654-2.734 9.502-4.406 14.155 1.534-1.525 2.872-3.234 4.406-4.759l4.406 4.76c-1.496-4.71-2.91-9.446-4.406-14.156Zm.032 2.929c.822 2.586 1.598 5.186 2.42 7.771l-2.42-2.612c-.682.597-2.452 2.884-2.338 2.388.87-2.487 1.447-5.067 2.338-7.547Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-link"><path d="M15.975.049C8.195-.11.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.453 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 5.021Zm1.78 4.093v3.555H9.785v6.714h7.994v3.554l5.829-6.911-5.83-6.912Zm.974 2.584 3.61 4.295-3.61 4.294v-1.933h-7.88v-4.688h7.88v-1.968Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-message"><path d="M15.975.049C8.195-.11.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.453 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 5.021Zm-7.245 5.475v11.06h14.502v-11.06H8.754Zm3.222 1.728h8.057c-1.427.878-2.854 2.806-4.281 3.016l-3.776-3.016Zm9.554 1.017v6.587H10.48V13.24l5.524 4.414 5.526-4.414Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-multiple"><path d="M15.975.003C8.195-.156.935 6.24.125 13.985c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.884 23.445.407 17.201.049c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.174.872 11.679 4.985 6.916c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 4.975c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 4.975Zm.006 3.073-7.62 5.531 2.91 8.95h9.42l2.91-8.95-7.62-5.53Zm0 1.067 6.604 4.794-2.523 7.757h-8.162l-2.522-7.757 6.603-4.794Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-non-interrupting-condition"><path d="M10.638 9.563V23.056h10.724V9.563H10.638Zm.863.866h8.995v11.76H11.5V10.43Zm.928 1.324v.862h7.139v-.862h-7.14Zm0 2.605v.866h7.139v-.866h-7.14Zm0 3.01v.863h7.139v-.863h-7.14Zm0 2.72v.863h7.139v-.864h-7.14ZM15.999.308h-.004l-.188.001h-.011l-.188.004h-.011L15.41.32h-.011l-.187.008h-.005L15.2.33l-.187.01h-.005l-.005.001-.187.013h-.011L14.62.37h-.01l-.186.018h-.011l-.185.02-.005.001h-.006l-.185.022-.005.001h-.005l-.185.025h-.005l-.005.001-.185.027h-.005l-.005.001-.184.029h-.005l-.005.001-.183.031-.006.001-.005.001-.182.033-.006.001-.005.001-.182.035-.005.001-.005.001-.182.038h-.005l-.005.002-.181.04h-.005l-.005.002-.18.042-.006.001-.005.001-.18.044-.005.002h-.005l-.17.045-.152.054-.139.082-.121.106-.1.127-.074.143-.046.155-.017.16.013.16.043.156.07.145.097.13.119.108.137.085.15.058.159.03.16-.001.133-.023.165-.043.168-.041.171-.04.171-.037.172-.036.17-.033.173-.03.17-.03.177-.027.171-.025.175-.022.175-.02.175-.02.176-.016.175-.014.177-.012.176-.01.177-.007.174-.006.177-.003.178-.001h.177l.178.004.174.006.177.007.176.01.177.012.175.014.176.017.175.018.175.02.175.023.171.025.176.027.17.03.174.03.17.033.171.036.154.033.16.02.161-.01.156-.04.146-.069.131-.094.111-.117.087-.135.061-.15.032-.158.002-.16-.027-.16-.057-.15L20 1.023l-.108-.12-.128-.097-.145-.073-.128-.038-.158-.035-.005-.001-.005-.001L19.14.62h-.005l-.005-.002-.182-.035h-.006L18.938.58l-.182-.033h-.006l-.005-.002-.183-.03-.005-.001-.006-.001-.183-.029h-.005l-.006-.001-.184-.027h-.005l-.005-.001-.185-.024h-.005L17.968.43 17.783.41l-.006-.001h-.005l-.185-.02h-.006l-.005-.001L17.39.37h-.005L17.38.368l-.187-.015h-.005l-.005-.001-.187-.013h-.011L16.8.328h-.011L16.6.32h-.011l-.187-.006h-.011L16.204.31h-.011L16.005.31H16Zm9.016 2.935-.16.004-.158.033-.15.062-.134.09-.116.111-.093.132-.067.147-.038.156-.01.161.022.16.05.153.078.141.103.124.102.087.045.034.142.106.137.105.14.11.136.11.135.112.134.115.134.117.13.115.132.122.128.12.127.122.126.125.124.126.124.128.121.13.118.128.118.132.117.133.113.134.113.136.11.136.109.137.109.142.104.14.103.14.101.142.1.144.099.146.095.145.094.147.093.15.092.15.087.149.087.15.084.152.084.155.08.152.08.155.04.081.084.138.11.119.128.096.145.072.155.043.16.013.16-.016.155-.046.144-.074.127-.099.106-.12.083-.14.055-.151.026-.16-.004-.16-.034-.158-.05-.124-.042-.085-.002-.004-.003-.005-.084-.165-.002-.004-.003-.005-.086-.164-.002-.004-.003-.005-.088-.162-.002-.005-.003-.005-.09-.161-.002-.005-.003-.004-.092-.16-.003-.005-.002-.005-.094-.16-.003-.004-.003-.004-.096-.159-.002-.004-.003-.005-.098-.157-.003-.004-.003-.005-.1-.156-.003-.004-.003-.005-.101-.154-.003-.005-.003-.004-.104-.154-.003-.004-.003-.005-.106-.152-.003-.005-.003-.004-.108-.151-.003-.004-.003-.005-.11-.15-.003-.004-.003-.004-.111-.15-.004-.003-.003-.005-.113-.147-.004-.004-.003-.005-.115-.146-.004-.004-.003-.004-.117-.145-.004-.004-.003-.004-.12-.144-.003-.004-.003-.004-.121-.142-.004-.004-.003-.004-.123-.141-.003-.004-.004-.004-.125-.14-.003-.004-.004-.004-.127-.138-.003-.004-.004-.004-.128-.136-.004-.004-.004-.004-.13-.135-.004-.004-.004-.004-.132-.134-.003-.004-.004-.003-.134-.133-.004-.003-.004-.004-.135-.13-.004-.004-.004-.004-.136-.128-.004-.004-.004-.004-.138-.126-.004-.004-.004-.003-.14-.125-.004-.004-.004-.003-.14-.123-.005-.004-.004-.003-.142-.121-.004-.004-.004-.003-.144-.12-.004-.003-.004-.003-.145-.117-.004-.004-.004-.003-.147-.115-.004-.004-.004-.003-.148-.113-.004-.003-.004-.004-.149-.111-.004-.003-.004-.004-.05-.036-.14-.083-.15-.055-.16-.027Zm-18.381.344-.161.008-.157.037-.147.066-.111.074-.04.032-.005.003-.004.004-.145.117-.004.003-.004.004-.144.119-.004.003-.004.004-.142.12-.004.004-.004.004-.141.123-.004.003-.004.004-.14.125-.004.003-.004.004-.138.126-.004.004-.004.004-.136.128-.004.004-.004.004-.135.13-.004.004-.004.003-.134.133-.004.003L4.682 5l-.132.134-.003.004-.004.004-.13.135-.004.004-.004.004-.128.136-.004.004-.004.004-.126.138-.004.004-.003.004-.125.14-.004.004-.003.004-.123.14-.004.005-.003.004-.121.142-.004.004-.003.004-.12.144-.003.004-.003.004-.117.145-.004.004-.003.004-.115.146-.004.005-.003.004-.113.147-.003.005-.004.004-.111.149-.003.004-.004.004-.11.15-.002.005-.003.004-.108.151-.003.004-.003.005-.106.152-.003.005-.003.004-.104.154-.003.004-.003.005-.102.154-.003.005-.002.004-.1.156-.003.005-.003.004-.098.157-.003.005-.003.004-.096.159-.002.004-.003.005-.094.16-.003.004-.002.004-.092.16-.003.005-.003.005-.09.161-.002.005-.003.005-.088.162-.002.005-.003.004-.086.164-.002.005-.002.004-.084.165-.003.005-.002.004-.082.166-.002.004-.003.005-.08.167-.002.004-.002.005-.078.168-.002.004-.002.005-.045.1-.053.153-.023.16.007.16.037.157.065.148.092.132.114.114.134.09.148.064.157.035.161.006.16-.025.152-.054.14-.08.121-.106.1-.126.065-.118.043-.095.074-.16.075-.155.077-.157.08-.155.08-.152.083-.155.085-.152.086-.15.088-.149.091-.15.094-.15.094-.147.095-.145.099-.146.1-.144.1-.142.104-.14.104-.14.11-.142.107-.137.11-.136.114-.136.113-.134.117-.133.118-.132.117-.129.122-.13.124-.127.123-.126.127-.125.127-.122.128-.12.132-.122.13-.115.133-.117.135-.115.135-.111.136-.11.037-.03.117-.11.094-.132.068-.146.04-.156.01-.161-.02-.16-.05-.154-.076-.141-.102-.125-.123-.104-.14-.08-.153-.051-.16-.023ZM16 3.595h-.005l-.148.001h-.01l-.147.003h-.011l-.147.005h-.011l-.146.007h-.011l-.146.009h-.011l-.146.01h-.005l-.005.001-.146.012h-.011l-.145.014h-.006l-.005.001-.05.006-.158.031-.15.06-.135.088-.117.111-.094.13-.069.147-.04.156-.01.16.019.16.049.154.076.142.102.125.123.105.14.08.152.051.16.023.134-.003.045-.005.135-.013.133-.01.136-.01.135-.007.137-.006.136-.004.136-.003h.274l.136.003.136.004.136.006.136.007.136.01.133.01.135.013.135.014.135.016.134.018.132.018.134.021.133.023.133.024.133.025.13.027.132.03.132.03.129.031.13.034.129.035.129.036.13.04.126.038.128.042.126.042.128.045.127.047.126.047.12.048.127.051.123.052.006.002.147.048.16.021.16-.009.157-.038.147-.067.131-.093.112-.116.089-.135.062-.149.033-.158.004-.16-.027-.16-.055-.151-.083-.139-.107-.12-.127-.099-.118-.063-.004-.001-.005-.003-.005-.002-.133-.056-.005-.002-.005-.002-.134-.054-.004-.002-.005-.002-.135-.053-.005-.002-.005-.002-.135-.051-.005-.002-.005-.002-.135-.05-.005-.001-.005-.002-.137-.048-.005-.001-.005-.002-.137-.046-.005-.002-.005-.002-.137-.044-.005-.002-.005-.001-.138-.043-.006-.002-.005-.001-.138-.042-.005-.001-.005-.002-.14-.04H19.4l-.005-.002-.14-.038-.005-.001-.005-.002-.14-.036-.005-.001-.005-.001-.141-.035-.005-.001-.005-.001-.142-.033-.005-.001-.005-.001-.142-.031-.005-.002h-.005l-.142-.03-.005-.001-.005-.001-.143-.028h-.005l-.005-.002-.143-.025-.006-.001-.005-.001-.143-.024-.005-.001-.006-.001-.143-.022-.006-.001h-.005l-.144-.022h-.005l-.006-.001-.144-.019h-.005l-.006-.001-.144-.017h-.006l-.005-.001-.145-.016h-.011l-.145-.014H17.1l-.005-.001-.146-.012h-.01l-.146-.01-.006-.001h-.005l-.146-.009h-.011l-.147-.006h-.01L16.32 3.6h-.011l-.147-.003h-.011l-.147-.001H16Zm-5.482 1.366-.16.008-.157.037-.123.053-.06.032-.005.002-.004.003-.128.069-.004.002-.005.003-.126.07-.005.003-.004.002-.126.072-.005.003-.004.003-.125.073-.004.003-.005.003-.124.075-.004.003-.005.002-.123.077-.004.003-.005.003-.122.078-.004.003-.005.003-.121.08-.004.002-.005.003-.12.082-.005.003-.004.003-.12.083-.004.003-.004.003-.118.084-.005.003-.004.003-.118.086-.004.003-.004.003-.117.088-.004.003-.004.003-.116.089-.004.003-.004.004-.114.09-.005.003-.004.003-.113.092-.004.004-.004.003-.113.093-.004.004-.004.003-.111.095-.005.003-.004.004-.11.096-.004.004-.004.003-.11.098-.003.003-.004.004-.108.1-.004.003-.004.003-.107.101-.004.004-.004.003-.106.102-.004.004-.003.004-.105.103-.004.004-.004.004-.103.105-.004.004-.004.003-.102.106-.003.004-.004.004-.1.107-.004.004-.004.004-.099.108-.004.004-.003.004-.098.11-.003.003-.004.004-.096.11-.004.005-.003.004-.095.111-.003.004-.004.004-.093.113-.003.004-.004.004-.092.113-.003.004-.003.005-.09.114-.004.004-.003.004-.089.116-.003.004-.003.004-.088.117-.003.004-.003.004-.086.118-.003.004-.003.005-.084.118-.003.004-.003.005-.083.12-.003.003-.003.005-.082.12-.003.005-.002.004-.068.103-.076.142-.048.154-.018.16.011.161.041.156.07.146.095.13.117.11.136.086.15.06.158.03.162.002.158-.03.15-.057.138-.085.119-.109.082-.105.065-.099.075-.11.077-.113.077-.107.08-.11.08-.108.084-.108.083-.105.086-.106.086-.104.088-.104.089-.101.09-.102.093-.101.093-.099.094-.097.095-.096.098-.097.098-.095.099-.093.1-.092.103-.091.101-.089.104-.088.104-.086.106-.086.106-.083.106-.082.109-.082.108-.079.11-.078.11-.076.112-.076.112-.074.113-.072.113-.071.115-.07.115-.068.118-.067.117-.065.12-.065.054-.029.135-.088.116-.111.094-.132.068-.146.04-.156.009-.161-.02-.16-.05-.153-.078-.142-.102-.125-.123-.103-.141-.079-.153-.051-.16-.022Zm13.91 2.116-.162.008-.157.037-.147.066-.132.092-.113.116-.09.134-.063.148-.034.157-.005.162.025.159.055.152.082.138.086.103.09.09.094.098.092.099.093.1.091.103.089.101.088.104.086.104.086.106.083.105.083.108.08.108.081.11.077.107.077.112.075.111.075.114.072.113.071.113.07.114.068.118.067.115.065.118.064.117.062.117.061.121.059.119.059.122.056.121.054.12.055.125.051.123.051.125.048.123.048.127.047.126.044.125.043.128.042.129.039.126.038.13.022.076.058.15.085.137.11.119.129.096.145.07.155.043.16.013.161-.017.154-.046.144-.075.126-.1.106-.12.082-.14.055-.151.025-.16-.005-.16-.026-.132-.023-.082-.002-.005-.001-.005-.042-.139-.001-.005-.002-.005-.043-.138-.001-.005-.002-.005-.044-.137-.002-.005-.002-.005-.046-.137-.002-.005-.001-.005-.048-.137-.002-.005-.002-.005-.05-.135-.001-.005-.002-.005-.051-.135-.002-.005-.002-.005-.053-.135-.002-.005-.002-.005-.054-.133-.002-.005-.002-.005-.057-.133-.002-.005-.002-.005-.057-.132-.003-.005-.002-.005-.06-.132-.001-.005-.002-.004-.061-.132-.003-.004-.002-.005-.063-.13-.002-.005-.002-.005-.064-.13-.003-.004-.002-.005-.066-.129-.002-.004-.003-.005-.067-.128-.002-.005-.003-.004-.069-.128-.002-.004-.003-.005-.07-.126-.003-.005-.003-.004-.072-.126-.002-.005-.003-.004-.074-.125-.002-.004-.003-.005-.075-.124-.003-.004-.003-.005-.076-.123-.003-.004-.003-.005-.078-.122-.003-.004-.003-.005-.08-.121-.003-.004-.003-.005-.081-.12-.003-.005-.003-.004-.083-.12-.003-.004-.003-.004-.084-.118-.003-.005-.003-.004-.086-.118-.003-.004-.004-.004-.087-.117-.003-.004-.003-.004-.09-.116-.002-.004-.004-.004-.09-.114-.003-.005-.004-.004-.091-.113-.004-.004-.003-.004-.094-.113-.003-.004-.003-.004-.095-.111-.004-.004-.003-.004-.096-.11-.004-.005-.003-.004-.098-.11-.004-.003-.003-.004-.1-.108-.003-.004-.004-.004-.1-.107-.004-.004-.004-.004-.102-.106-.003-.003-.004-.004-.093-.095-.124-.103-.14-.08-.153-.05-.16-.023ZM4.45 13.135l-.161.002-.158.032-.15.06-.135.088-.118.11-.094.131-.069.146-.035.129-.026.132v.005l-.002.005-.025.143-.001.005-.001.006-.024.143-.001.005-.001.006-.022.143-.001.006-.001.005-.02.144-.001.005-.001.005-.019.145v.005l-.001.006-.017.144v.006l-.001.005-.016.145v.011l-.014.145v.005l-.001.006-.012.146v.01l-.01.146-.001.006v.005l-.009.146v.011l-.007.146v.011l-.004.147v.011l-.003.147v.01l-.002.148v.01l.001.148v.01l.003.147v.011l.005.147v.01l.007.147v.011l.009.146v.011l.01.146v.01l.013.146v.011l.014.145v.005l.001.006.016.145v.011l.018.144v.006l.001.005.019.144v.006l.001.005.021.144v.005l.002.006.022.143v.006l.002.005.024.143v.005l.002.006.025.143.001.005.001.005.028.143.001.005.001.005.03.142v.005l.002.006.03.141.002.005.001.005.033.142v.005l.002.005.035.14v.006l.002.005.036.14.002.005.001.005.038.14.001.005.002.005.04.14v.005l.002.005.042.138.001.006.002.005.042.138.002.005.002.005.017.054.064.148.09.134.114.114.132.092.148.065.157.037.16.007.16-.023.153-.052.14-.08.123-.104.102-.125.076-.142.049-.153.02-.16-.011-.161-.031-.13-.017-.051-.039-.126-.038-.13-.037-.128-.035-.13-.033-.128-.033-.134-.03-.13-.029-.131-.026-.13-.026-.133-.024-.133-.023-.133-.02-.132-.02-.136-.017-.132-.016-.135-.014-.135-.012-.133-.012-.138-.009-.133-.007-.136-.006-.138-.004-.134-.003-.136v-.274l.003-.136.004-.134.006-.139.007-.136.01-.133.01-.138.013-.132.014-.135.016-.135.017-.132.02-.137.02-.13.023-.134.024-.133.024-.126.016-.16-.014-.161-.044-.155-.072-.145-.098-.128-.12-.108-.137-.084-.15-.057-.16-.029Zm26.698 1.601-.161.01-.157.04-.146.067-.131.093-.112.117-.088.135-.061.149-.033.157-.005.134.006.14.006.176.003.177.001.178-.001.177-.003.178-.006.177-.007.176-.01.177-.012.176-.015.176-.016.173-.018.175-.02.175-.024.174-.025.175-.026.17-.03.174-.03.173-.033.17-.036.172-.037.17-.04.17-.042.172-.043.168-.045.166-.048.169-.05.167-.052.168-.053.164-.056.166-.058.166-.06.16-.062.165-.062.158-.066.165-.068.16-.07.16-.07.158-.075.159-.074.155-.079.158-.08.158-.06.15-.03.158-.001.161.029.159.058.15.085.137.108.119.13.097.144.07.156.044.16.013.16-.017.155-.046.143-.074.127-.1.107-.12.07-.115.083-.164.003-.005.002-.004.082-.166.002-.005.003-.004.08-.167.002-.005.002-.004.078-.168.002-.005.002-.004.076-.169.002-.004.002-.005.074-.17.002-.004.002-.005.072-.17.002-.005.002-.005.07-.171.001-.005.002-.005.068-.172.002-.004.002-.005.065-.173.002-.005.002-.005.063-.173.002-.005.002-.005.06-.174.003-.005.001-.005.06-.175.001-.005.002-.005.057-.176.001-.005.002-.005.055-.177.001-.005.002-.005.052-.177.002-.005.001-.005.051-.178.001-.005.002-.005.048-.179.002-.005v-.005l.047-.179.001-.005.002-.005.044-.18v-.005l.002-.005.042-.18.001-.006.001-.005.04-.181.001-.005.001-.005.037-.182.002-.005v-.005l.036-.182v-.006l.002-.005.033-.182v-.006l.002-.005.03-.183.001-.005.001-.005.029-.184v-.005l.001-.006.027-.184v-.005l.001-.005.024-.185v-.005l.001-.005.022-.185v-.006l.001-.005.02-.185v-.006l.001-.005.017-.186v-.005l.001-.005.015-.187v-.005l.001-.005.013-.187v-.01l.01-.187.001-.006v-.005l.009-.187v-.011l.006-.187V16.7l.004-.188v-.011l.001-.188v-.01l-.001-.188v-.011l-.004-.188v-.011l-.006-.187v-.011l-.007-.145-.022-.16-.05-.152-.08-.141-.103-.124-.125-.102-.141-.077-.153-.05-.16-.02Zm-30.21.572-.161.001-.158.032-.15.06-.136.087-.117.11-.095.131-.068.146-.04.156-.012.133-.001.14v.01l.001.188v.011l.004.188v.011l.006.187v.011l.008.187v.011l.011.187v.005l.001.005.013.187v.01l.016.187v.01l.018.186v.011l.02.185.001.005v.006l.022.185.001.005v.005l.025.185v.005l.001.005.027.184v.006l.001.005.029.184v.005l.001.005.031.183.001.005.001.006.033.182.001.005.001.006.035.182.001.005.001.005.038.182v.005l.002.005.04.181v.005l.002.005.042.18.001.006.001.005.044.18.002.005v.005l.047.18.001.004.002.005.048.179.002.005.001.005.05.178.002.005.001.005.053.177.002.005.001.005.055.177.002.005.001.005.057.176.002.005.001.005.06.175.001.005.002.005.061.174.002.005.002.005.063.173.002.005.002.005.065.173.002.005.002.004.067.172.002.005.002.005.07.171.002.005.002.005.072.17.002.005.002.004.074.17.002.005.002.004.076.169.002.004.002.005.078.168.002.004.002.005.08.167.003.004.002.005.082.166.002.004.003.005.02.04.086.136.11.118.13.095.146.07.156.041.16.012.16-.019.155-.048.142-.075.126-.1.105-.123.08-.14.054-.152.024-.16-.006-.16-.036-.158-.051-.123-.018-.034-.078-.158-.074-.155-.074-.16-.071-.157-.07-.16-.068-.16-.067-.165-.062-.158-.062-.164-.059-.161-.058-.166-.056-.166-.053-.164-.052-.168-.05-.167-.048-.17-.045-.165-.043-.168-.043-.172-.039-.17-.037-.17-.036-.172-.033-.17-.03-.173-.03-.174-.027-.17-.025-.175-.022-.174-.021-.175-.018-.175-.017-.173-.014-.176-.012-.176-.01-.177-.007-.176-.006-.177-.003-.178-.001-.177v-.134l-.013-.16-.044-.156-.072-.144-.097-.129-.12-.108-.137-.085-.15-.057-.159-.028Zm26.798 2.024-.16.007-.157.038-.148.066-.132.092-.113.115-.09.134-.062.148-.03.127-.001.004-.023.134-.024.133-.026.133-.026.13-.03.132-.03.129-.032.134-.033.128-.035.13-.037.128-.038.13-.04.126-.04.128-.044.128-.044.126-.046.126-.048.126-.05.125-.05.125-.051.122-.054.123-.055.122-.056.12-.058.122-.06.12-.061.12-.063.119-.062.116-.067.119-.066.116-.069.115-.069.115-.07.113-.073.113-.074.112-.076.113-.077.112-.077.107-.08.11-.08.107-.085.11-.044.056-.088.135-.06.15-.033.158-.002.16.027.16.057.15.083.138.108.12.128.098.144.072.155.045.16.015.161-.016.155-.044.144-.073.128-.098.09-.099.05-.061.003-.004.003-.005.089-.115.003-.004.003-.005.088-.116.003-.004.003-.005.086-.117.003-.004.003-.005.084-.118.003-.004.003-.005.083-.12.003-.004.003-.004.081-.12.003-.005.003-.004.08-.121.003-.005.003-.004.078-.122.003-.005.003-.004.077-.123.002-.005.003-.004.075-.124.003-.005.003-.004.073-.125.003-.005.003-.004.072-.126.002-.004.003-.005.07-.126.003-.005.002-.005.07-.127.002-.004.002-.005.068-.128.002-.005.002-.004.066-.13.003-.004.002-.005.064-.13.002-.004.003-.005.062-.13.002-.005.003-.005.06-.13.003-.005.002-.005.06-.132.002-.005.002-.005.057-.132.003-.005.002-.005.056-.133.002-.005.002-.005.054-.134.002-.004.002-.005.053-.135.002-.005.002-.005.051-.135.002-.005.002-.005.05-.135.001-.005.002-.005.048-.137.001-.005.002-.005.046-.137.002-.005.002-.005.044-.137.002-.005.002-.005.042-.138.002-.005.001-.006.042-.138.001-.005.002-.005.04-.14v-.005l.002-.005.038-.14.001-.005.002-.005.036-.14.001-.005.001-.005.035-.141.001-.005.001-.005.033-.142.001-.005.001-.005.031-.141.001-.006.002-.005.029-.142v-.005l.002-.005.028-.143v-.005l.002-.005.025-.143.001-.006.001-.005.024-.143.001-.005.001-.006.001-.006.01-.161-.02-.16-.05-.154-.077-.141-.102-.125-.123-.104-.141-.079-.153-.051-.16-.022ZM6.841 23.019l-.16.024-.152.053-.14.08-.122.105-.101.126-.076.142-.048.154-.018.16.011.161.041.156.07.146.077.109.04.048.003.004.003.004.095.111.003.004.004.004.096.11.004.005.003.004.098.109.003.004.004.004.1.108.003.004.003.004.101.107.004.004.003.004.102.105.004.004.004.004.103.105.004.004.004.003.105.104.003.004.004.003.106.102.004.004.004.004.107.1.004.004.004.004.108.099.004.003.004.004.11.098.003.003.004.004.11.096.004.003.005.004.11.095.005.003.004.004.113.093.004.003.004.004.113.091.004.004.005.003.114.09.004.004.004.003.116.089.004.003.004.003.117.088.004.003.004.003.118.086.004.003.005.003.118.084.004.003.005.003.119.083.004.003.005.003.12.081.005.003.004.003.121.08.005.003.004.003.122.078.005.003.004.003.123.076.005.003.004.003.124.075.005.003.004.003.125.073.004.003.005.002.126.073.004.002.005.003.126.07.005.003.004.002.128.07.004.002.005.002.128.067.005.003.004.002.13.066.004.002.005.003.13.064.004.002.005.003.13.062.005.002.004.003.132.06.004.003.005.002.132.06.005.002.005.002.132.057.005.002.005.002.133.057.005.002.005.002.133.054.005.002.005.002.13.05.154.045.16.016.16-.015.156-.045.144-.072.128-.098.108-.12.083-.138.057-.15.028-.16-.003-.16-.032-.159-.061-.149-.088-.135-.11-.117-.132-.094-.12-.058-.124-.049-.126-.051-.122-.051-.122-.054-.12-.054-.126-.058-.119-.057-.12-.06-.12-.06-.118-.063-.117-.064-.119-.066-.116-.066-.115-.068-.115-.07-.113-.07-.115-.074-.112-.074-.11-.075-.11-.076-.112-.08-.11-.08-.109-.081-.106-.082-.104-.082-.106-.086-.105-.087-.101-.086-.105-.091-.1-.09-.1-.091-.1-.094-.097-.094-.1-.098-.093-.095-.096-.1-.093-.098-.092-.101-.089-.1-.09-.102-.088-.104-.036-.043-.114-.114-.133-.091-.148-.065-.157-.036-.161-.006Zm15.063 2.701-.16.014-.156.044-.12.057-.06.034-.12.066-.117.064-.118.062-.12.061-.12.06-.118.057-.126.058-.12.054-.122.054-.122.05-.126.052-.125.05-.124.046-.127.047-.125.044-.129.043-.126.04-.13.042-.128.038-.127.035-.13.036-.131.034-.129.031-.132.03-.13.03-.135.027-.133.026-.13.023-.13.022-.137.021-.132.02-.134.017-.132.015-.138.015-.135.013-.133.01-.138.01-.136.007-.134.006-.136.004-.14.003-.16.018-.155.047-.142.076-.127.1-.105.122-.08.14-.054.151-.025.16.006.16.035.158.064.148.09.134.114.114.133.092.147.065.157.036.134.008.145-.002h.011l.147-.005h.01l.147-.007h.011l.146-.009h.011l.146-.01h.005l.005-.001.146-.012h.011l.145-.014h.005l.006-.001.145-.016h.011l.144-.018h.006l.005-.001.144-.02h.011l.144-.021.005-.001h.006l.143-.023.006-.001h.005l.143-.025h.005l.006-.002.143-.026h.005l.005-.002.143-.027.005-.001.005-.001.142-.03h.005l.005-.002.142-.03.005-.002.005-.001.142-.033.005-.001.005-.001.14-.035.006-.001.005-.001.14-.037h.005l.005-.002.14-.038.005-.002h.005l.14-.04.005-.002.005-.001.138-.042.005-.001.006-.002.138-.043.005-.001.005-.002.137-.044.005-.002.005-.002.137-.046.005-.002.005-.001.137-.048.005-.002.005-.002.135-.05.005-.001.005-.002.135-.051.005-.002.005-.002.135-.053.005-.002.004-.002.134-.054.005-.002.005-.002.133-.057.005-.002.005-.002.132-.057.005-.003.005-.002.132-.06.005-.001.004-.002.131-.061.005-.003.005-.002.13-.062.005-.003.005-.002.13-.064.004-.003.005-.002.128-.066.005-.002.005-.003.128-.067.005-.002.004-.003.127-.069.005-.002.005-.003.126-.07.005-.003.004-.003.065-.037.132-.093.112-.115.089-.135.062-.149.034-.157.003-.161-.026-.16-.055-.15-.082-.14-.107-.12-.127-.1-.144-.073-.154-.046-.16-.016ZM6.33 27.127l-.16.023-.152.053-.14.08-.122.105-.101.126-.076.142-.048.154-.02.16.012.161.041.156.07.146.094.13.096.093.032.026.004.003.004.004.145.117.004.003.004.004.146.115.005.003.004.004.147.113.005.003.004.004.149.111.004.003.004.003.15.11.005.003.004.003.151.108.004.003.005.003.152.106.005.003.004.003.154.104.004.003.005.003.154.102.005.002.004.003.156.1.005.003.004.003.157.098.005.003.004.002.159.096.004.003.005.003.16.094.004.003.004.002.16.092.005.003.005.002.161.09.005.003.005.002.162.088.005.003.004.002.164.086.005.003.004.002.165.084.005.003.004.002.166.082.004.002.005.003.167.08.004.002.005.002.168.078.004.002.005.002.168.076.005.002.005.002.17.074.004.002.005.002.17.072.005.002.005.002.17.07.006.002.005.001.171.068.005.002.005.002.173.065.005.002.005.002.173.063.005.002.005.002.174.06.005.003.005.001.175.06.005.001.005.002.176.057.005.001.005.002.176.055.006.001.005.002.177.052.005.002.005.001.178.05.005.002.005.002.178.048.006.001.005.002.179.046.005.001.005.002.18.044h.005l.005.002.18.042.006.001.005.001.159.035.16.02.16-.01.157-.04.146-.069.13-.094.112-.117.087-.136.06-.149.033-.158.002-.161-.028-.159-.057-.15-.084-.138-.108-.12-.128-.098-.144-.072-.128-.039-.154-.033-.168-.04-.171-.041-.17-.044-.168-.046-.167-.047-.168-.05-.165-.051-.166-.054-.166-.056-.163-.057-.165-.06-.161-.062-.164-.064-.16-.065-.16-.068-.162-.07-.157-.07-.157-.074-.157-.075-.156-.077-.153-.079-.156-.082-.153-.082-.154-.086-.15-.086-.152-.09-.148-.09-.147-.092-.149-.095-.145-.095-.144-.098-.145-.1-.143-.102-.14-.103-.14-.104-.14-.108-.139-.11-.136-.11-.027-.022-.133-.091-.148-.065-.157-.036-.161-.006Zm19.215.087-.16.01-.157.039-.146.067-.11.076-.064.051-.139.11-.14.108-.14.104-.14.103-.143.101-.145.101-.144.098-.145.095-.149.095-.148.093-.147.089-.152.09-.15.086-.154.086-.153.082-.156.082-.153.079-.156.077-.157.075-.158.073-.157.071-.16.07-.16.068-.161.065-.164.064-.161.061-.165.06-.163.058-.166.056-.166.054-.166.051-.167.05-.167.047-.17.046-.168.044-.171.042-.168.039-.17.037-.11.023-.154.047-.143.075-.126.1-.106.122-.081.139-.054.152-.025.16.006.16.035.158.063.148.09.133.114.115.132.092.148.065.157.037.16.007.133-.016.115-.024.005-.001.005-.001.181-.04h.005l.005-.002.18-.042.006-.001.005-.001.18-.044.005-.002.005-.001.18-.046.004-.002h.005l.179-.05h.005l.005-.002.178-.05.005-.002.005-.002.177-.052.005-.002.005-.001.177-.055.005-.002.005-.001.176-.057.005-.002.005-.002.175-.059.005-.001.005-.002.174-.061.005-.002.005-.002.173-.063.005-.002.005-.002.173-.065.004-.002.005-.002.172-.068.005-.002.005-.002.171-.07.005-.001.005-.002.17-.072.005-.002.004-.002.17-.074.005-.002.004-.002.169-.076.004-.002.005-.002.168-.078.004-.002.005-.003.167-.08.004-.002.005-.002.166-.082.004-.002.005-.003.165-.084.004-.002.005-.003.163-.086.005-.002.005-.003.162-.088.005-.002.005-.003.161-.09.005-.002.004-.003.16-.092.005-.003.005-.002.16-.094.004-.003.004-.003.158-.096.005-.002.004-.003.158-.098.004-.003.005-.003.156-.1.004-.003.004-.003.155-.101.005-.003.004-.003.154-.104.004-.003.004-.003.153-.106.004-.003.005-.003.151-.108.004-.003.005-.003.15-.11.004-.003.004-.003.149-.112.004-.003.004-.003.148-.113.004-.004.004-.003.147-.115.004-.004.004-.003.068-.055.116-.113.092-.132.066-.147.038-.157.008-.16-.022-.16-.05-.153-.08-.14-.103-.125-.124-.102-.142-.077-.153-.05-.16-.02Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-non-interrupting-escalation"><path d="M16.012 9.222c-1.673 4.657-2.735 9.508-4.409 14.164 1.536-1.526 2.874-3.236 4.41-4.762l4.408 4.762c-1.497-4.712-2.911-9.451-4.409-14.164Zm.032 2.93c.823 2.588 1.599 5.19 2.421 7.777l-2.42-2.614c-.683.598-2.454 2.886-2.34 2.39.871-2.489 1.448-5.07 2.34-7.552ZM16.012.312c-1.448.02-2.93.157-4.302.628-.852.447-.255 1.863.66 1.574 2.255-.608 4.648-.607 6.922-.108.934.075 1.228-1.376.338-1.67C18.451.44 17.227.317 16.012.311Zm9.012 2.934c-.913-.104-1.272 1.258-.454 1.648 1.834 1.36 3.293 3.185 4.31 5.22.526.776 1.842.098 1.515-.78a15.522 15.522 0 0 0-5.06-6.006c-.1-.044-.203-.07-.31-.082ZM6.65 3.59c-.762.089-1.24.809-1.805 1.267C3.38 6.295 2.163 8.007 1.37 9.905c-.266.898 1.094 1.484 1.564.675a14.825 14.825 0 0 1 4.327-5.56c.476-.515.09-1.419-.612-1.431Zm9.362.007c-.698.066-1.689-.16-2.033.635-.282.733.535 1.358 1.217 1.125 1.806-.147 3.63.203 5.293.907.902.255 1.472-1.112.656-1.573-1.6-.735-3.374-1.089-5.133-1.094Zm-5.479 1.365c-.835.15-1.517.76-2.21 1.226-1.203.94-2.318 2.061-3.057 3.402-.33.904 1.063 1.552 1.547.723 1.045-1.656 2.596-2.925 4.285-3.873.545-.499.171-1.463-.565-1.478Zm13.903 2.115c-.875-.07-1.22 1.173-.501 1.627 1.325 1.34 2.188 3.062 2.748 4.84.468.84 1.869.21 1.557-.699-.604-2.118-1.751-4.097-3.351-5.615a.93.93 0 0 0-.453-.153ZM4.467 13.132c-.822-.07-.996.826-1.046 1.455-.256 1.93-.094 3.933.562 5.769.406.844 1.807.365 1.612-.551a11.498 11.498 0 0 1-.334-5.808.874.874 0 0 0-.794-.865Zm26.687 1.6c-.746-.037-1.014.785-.879 1.395.043 2.393-.57 4.771-1.66 6.894-.31.884 1.02 1.536 1.53.75a15.632 15.632 0 0 0 1.821-8.372.876.876 0 0 0-.812-.667Zm-30.197.571c-.782-.073-1.044.775-.933 1.404.068 2.414.661 4.833 1.809 6.962.534.77 1.842.076 1.505-.798a14.833 14.833 0 0 1-1.603-6.861.876.876 0 0 0-.778-.707Zm26.787 2.024c-.777-.048-.952.797-1.021 1.392-.354 1.692-1.202 3.231-2.216 4.608-.407.872.925 1.638 1.48.852 1.361-1.733 2.296-3.827 2.582-6.017a.874.874 0 0 0-.825-.835ZM6.857 23.012c-.808.018-1.082 1.122-.47 1.59 1.393 1.607 3.187 2.886 5.194 3.599.91.222 1.43-1.165.598-1.596a11.495 11.495 0 0 1-4.723-3.396.899.899 0 0 0-.599-.197Zm15.057 2.7c-.81.194-1.504.76-2.325.972-1.203.458-2.5.536-3.758.664-.869.307-.573 1.728.346 1.663 2.201-.034 4.412-.626 6.293-1.778.604-.495.227-1.532-.556-1.521ZM6.346 27.118c-.833.008-1.11 1.218-.395 1.617 1.986 1.602 4.358 2.749 6.868 3.226.933.076 1.227-1.376.338-1.67a14.838 14.838 0 0 1-6.345-3.066.929.929 0 0 0-.466-.107Zm19.208.087c-.766.09-1.241.841-1.922 1.158-1.516.991-3.251 1.58-4.996 2.005-.872.405-.346 1.849.584 1.604 2.543-.526 4.98-1.66 6.963-3.344.47-.52.072-1.42-.63-1.423Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-non-interrupting-message"><path d="M8.742 10.464v11.072h14.516V10.464H8.742Zm3.224 1.73h8.066a69569 69569 0 0 0-4.034 3.22l-4.032-3.22Zm9.565 1.018v6.594H10.469v-6.593L16 17.63l5.532-4.419ZM16 0h-.005l-.188.001h-.011l-.188.004h-.011l-.187.006h-.011l-.187.008h-.005L15.2.02l-.187.01h-.005l-.005.001-.187.013h-.011L14.62.06h-.01l-.186.018h-.011l-.185.02-.005.001h-.006l-.185.022-.005.001h-.005l-.185.025h-.005l-.005.001-.185.027h-.005l-.005.001-.184.029h-.005l-.005.001-.183.031-.006.001-.005.001-.182.033-.006.001-.005.001-.182.035-.005.001-.005.001-.182.038h-.005l-.005.002-.181.04h-.005l-.005.002-.18.042-.006.001-.005.001-.18.044-.005.002h-.005l-.17.045-.152.054-.139.082-.121.106-.1.127-.074.143-.046.155-.017.16.013.16.043.156.07.145.097.13.119.108.137.085.15.058.159.03.16-.001.133-.023.165-.043.168-.041.171-.04.171-.037.172-.036.17-.033.173-.03.17-.03.177-.027.171-.025.175-.022.175-.02.175-.02.176-.016.175-.014.177-.012.176-.01.177-.007.174-.006.177-.003L16 1.73h.177l.178.004.174.006.177.007.176.01.177.012.175.014.176.017.175.018.175.02.175.023.171.025.176.027.17.03.174.03.17.033.171.036.154.033.16.02.161-.01.156-.04.146-.069.131-.094.111-.117.087-.135.061-.15.032-.158.002-.16-.027-.16-.057-.15L20 .714l-.108-.12-.128-.097-.145-.073-.128-.038-.158-.035-.005-.001-.005-.001L19.14.31h-.005l-.005-.002-.182-.035h-.006l-.005-.002-.182-.033h-.006l-.005-.002-.183-.03-.005-.001-.006-.001-.183-.029h-.005l-.006-.001-.184-.027h-.005l-.005-.001-.185-.024h-.005L17.968.12 17.783.1l-.006-.001h-.005l-.185-.02h-.006l-.005-.001L17.39.06h-.005L17.38.06l-.187-.015h-.005l-.005-.001-.187-.013h-.011L16.8.02h-.011L16.6.01h-.011l-.187-.006h-.011L16.204 0h-.011L16.005 0H16Zm9.015 2.935-.16.004-.158.033-.15.062-.134.09-.116.111-.093.132-.067.147-.038.156-.01.161.022.16.05.153.078.141.103.124.102.087.045.034.142.106.137.105.14.11.136.11.135.112.134.115.134.117.13.115.132.122.128.12.127.122.126.125.124.126.124.128.121.13.118.128.118.132.117.133.113.134.113.136.11.136.109.137.109.142.104.14.103.14.101.142.1.144.099.146.095.145.094.147.093.15.092.15.087.149.087.15.084.152.084.155.08.152.08.155.04.081.084.138.11.119.128.096.145.072.155.043.16.013.16-.016.155-.046.144-.074.127-.099.106-.12.083-.14.055-.151.026-.16-.004-.16-.034-.158-.05-.124-.042-.085-.002-.004-.003-.005-.084-.165-.002-.004-.003-.005-.086-.164-.002-.004-.003-.005-.088-.162-.002-.005-.003-.005-.09-.161-.002-.005-.003-.004-.092-.16-.003-.005-.002-.005-.094-.16-.003-.004-.003-.004-.096-.159-.002-.004-.003-.005-.098-.157-.003-.004-.003-.005-.1-.156-.003-.004-.003-.005-.101-.154-.003-.005-.003-.004-.104-.154-.003-.004-.003-.005-.106-.152-.003-.005-.003-.004-.108-.151-.003-.004-.003-.005-.11-.15-.003-.004-.003-.004-.111-.15-.004-.003-.003-.005-.113-.147-.004-.004-.003-.005-.115-.146-.004-.004-.003-.004-.117-.145-.004-.004-.003-.004-.12-.144-.003-.004-.003-.004-.121-.142-.004-.004-.003-.004-.123-.141-.003-.004-.004-.004-.125-.14-.003-.004-.004-.004-.127-.138-.003-.004-.004-.004-.128-.136-.004-.004-.004-.004-.13-.135-.004-.004-.004-.004-.132-.134-.003-.004-.004-.003-.134-.133-.004-.003-.004-.004-.135-.13-.004-.004-.004-.004-.136-.128-.004-.004-.004-.004-.138-.126-.004-.004-.004-.003-.14-.125-.004-.004-.004-.003-.14-.123-.005-.004-.004-.003-.142-.121-.004-.004-.004-.003-.144-.12-.004-.003-.004-.003-.145-.117-.004-.004-.004-.003-.147-.115-.004-.004-.004-.003-.148-.113-.004-.003-.004-.004-.149-.111-.004-.003-.004-.004-.05-.036-.14-.083-.15-.055-.16-.027ZM6.634 3.28l-.161.008-.157.037-.147.066-.111.074-.04.032-.005.003-.004.004-.145.117-.004.003-.004.004-.144.119-.004.003-.004.004-.142.12-.004.004-.004.004-.141.123-.004.003-.004.004-.14.125-.004.003-.004.004-.138.126-.004.004-.004.004-.136.128-.004.004-.004.004-.135.13-.004.004-.004.003-.134.133-.004.003-.004.004-.132.134-.003.004-.004.004-.13.135-.004.004-.004.004-.128.136-.004.004-.004.004-.126.138-.004.004-.003.004-.125.14-.004.004-.003.004-.123.14-.004.005-.003.004-.121.142-.004.004-.003.004-.12.144-.003.004-.003.004-.117.145-.004.004-.003.004-.115.146-.004.005-.003.004-.113.147-.003.005-.004.004-.111.149-.003.004-.004.004-.11.15-.002.005-.003.004-.108.151-.003.004-.003.005-.106.152-.003.005-.003.004-.104.154-.003.004-.003.005-.102.154-.003.005-.002.004-.1.156-.003.005-.003.004-.098.157-.003.005-.003.004-.096.159-.002.004-.003.005-.094.16-.003.004-.002.004-.092.16-.003.005-.003.005-.09.161-.002.005-.003.005-.088.162-.002.005-.003.004-.086.164-.002.005-.002.004-.084.165-.003.005-.002.004-.082.166-.002.004-.003.005-.08.167-.002.004-.002.005-.078.168-.002.004-.002.005-.045.1-.053.153-.023.16.007.16.037.157.065.148.092.132.114.114.134.09.148.064.157.035.161.006.16-.025.152-.054.14-.08.121-.106.1-.126.065-.118.043-.095.074-.16.075-.155.077-.157.08-.155.08-.152.083-.155.085-.152.086-.15.088-.149.091-.15.094-.15.094-.147.095-.145.099-.146.1-.144.1-.142.104-.14.104-.14.11-.142.107-.137.11-.136.114-.136.113-.134.117-.133.118-.132.117-.129.122-.13.124-.127.123-.126.127-.125.127-.122.128-.12.132-.122.13-.115.133-.117.135-.115.135-.111.136-.11.037-.03.117-.11.094-.132.068-.146.04-.156.01-.161-.02-.16-.05-.154-.076-.141-.102-.125-.123-.104-.14-.08-.153-.051-.16-.023ZM16 3.286h-.005l-.148.001h-.01l-.147.003h-.011l-.147.005h-.011l-.146.007h-.011l-.146.009h-.011l-.146.01h-.005l-.005.001-.146.012h-.011l-.145.014h-.006l-.005.001-.05.006-.158.031-.15.06-.135.088-.117.111-.094.13-.069.147-.04.156-.01.16.019.16.049.154.076.142.102.125.123.105.14.08.152.051.16.023.134-.003.045-.005.135-.013.133-.01.136-.01.135-.007.137-.006.136-.004.136-.003h.274l.136.003.136.004.136.006.136.007.136.01.133.01.135.013.135.014.135.016.134.018.132.018.134.021.133.023.133.024.133.025.13.027.132.03.132.03.129.031.13.034.129.035.129.036.13.04.126.038.128.042.126.042.128.045.127.047.126.047.12.048.127.051.123.052.006.002.147.048.16.021.16-.009.157-.038.147-.067.131-.093.112-.116.089-.135.062-.149.033-.158.004-.16-.027-.16-.055-.151-.083-.139-.107-.12-.127-.099-.118-.063-.004-.001-.005-.003-.005-.002-.133-.056-.005-.002-.005-.002-.134-.054-.004-.002-.005-.002-.135-.053-.005-.002-.005-.002-.135-.051-.005-.002-.005-.002-.135-.05-.005-.001-.005-.002-.137-.048-.005-.001-.005-.002-.137-.046-.005-.002-.005-.002-.137-.044-.005-.002-.005-.001-.138-.043-.006-.002-.005-.001-.138-.042-.005-.001-.005-.002-.14-.04H19.4l-.005-.002-.14-.038-.005-.001-.005-.002-.14-.036-.005-.001-.005-.001-.141-.035-.005-.001-.005-.001-.142-.033-.005-.001-.005-.001-.142-.031-.005-.002h-.005l-.142-.03-.005-.001-.005-.001-.143-.028h-.005l-.005-.002-.143-.025-.006-.001-.005-.001-.143-.024-.005-.001-.006-.001-.143-.022-.006-.001h-.005l-.144-.022h-.005l-.006-.001-.144-.019h-.005l-.006-.001-.144-.017h-.006l-.005-.001-.145-.016h-.011l-.145-.014H17.1l-.005-.001-.146-.012h-.01l-.146-.01-.006-.001h-.005l-.146-.009h-.011l-.147-.006h-.01l-.147-.005h-.011l-.147-.003h-.011l-.147-.001H16Zm-5.482 1.366-.16.008-.157.037-.123.053-.06.032-.005.002-.004.003-.128.069-.004.002-.005.003-.126.07-.005.003-.004.002-.126.072-.005.003-.004.003-.125.073-.004.003-.005.003-.124.075-.004.003-.005.002-.123.077-.004.003-.005.003-.122.078-.004.003-.005.003-.121.08-.004.002-.005.003-.12.082-.005.003-.004.003-.12.083-.004.003-.004.003-.118.084-.005.003-.004.003-.118.086-.004.003-.004.003-.117.088-.004.003-.004.003-.116.089-.004.003-.004.004-.114.09-.005.003-.004.003-.113.092-.004.004-.004.003-.113.093-.004.004-.004.003-.111.095-.005.003-.004.004-.11.096-.004.004-.004.003-.11.098-.003.003-.004.004-.108.1-.004.003-.004.003-.107.101-.004.004-.004.003-.106.102-.004.004-.003.004-.105.103-.004.004-.004.004-.103.105-.004.004-.004.003-.102.106-.003.004-.004.004-.1.107-.004.004-.004.004-.099.108-.004.004-.003.004-.098.11-.003.003-.004.004-.096.11-.004.005-.003.004-.095.111-.003.004-.004.004-.093.113-.003.004-.004.004-.092.113-.003.004-.003.005-.09.114-.004.004-.003.004-.089.116-.003.004-.003.004-.088.117-.003.004-.003.004-.086.118-.003.004-.003.005-.084.118-.003.004-.003.005-.083.12-.003.003-.003.005-.082.12-.003.005-.002.004-.068.103-.076.142-.048.154-.018.16.011.161.041.156.07.146.095.13.117.11.136.086.15.06.158.03.162.002.158-.03.15-.057.138-.085.119-.109.082-.105.065-.099.075-.11.077-.113.077-.107.08-.11.08-.108.084-.108.083-.105.086-.106.086-.104.088-.104.089-.101.09-.102.093-.101.093-.099.094-.097.095-.096.098-.097.098-.095.099-.093.1-.092.103-.091.101-.089.104-.088.104-.086.106-.086.106-.083.106-.082.109-.082.108-.079.11-.078.11-.076.112-.076.112-.074.113-.072.113-.071.115-.07.115-.068.118-.067.117-.065.12-.065.054-.029.135-.088.116-.111.094-.132.068-.146.04-.156.009-.161-.02-.16-.05-.153-.078-.142-.102-.125-.123-.103-.141-.079-.153-.051-.16-.022Zm13.91 2.116-.162.008-.157.037-.147.066-.132.092-.113.116-.09.134-.063.148-.034.157-.005.162.025.159.055.152.082.138.086.103.09.09.094.098.092.099.093.1.091.103.089.101.088.104.086.104.086.106.083.105.083.108.08.108.081.11.077.107.077.112.075.111.075.114.072.113.071.113.07.114.068.118.067.115.065.118.064.117.062.117.061.121.059.119.059.122.056.121.054.12.055.125.051.123.051.125.048.123.048.127.047.126.044.125.043.128.042.129.039.126.038.13.022.076.058.15.085.137.11.119.129.096.145.07.155.043.16.013.161-.017.154-.046.144-.075.126-.1.106-.12.082-.14.055-.151.025-.16-.005-.16-.026-.132-.023-.082-.002-.005-.001-.005-.042-.139-.001-.005-.002-.005-.043-.138-.001-.005-.002-.005-.044-.137-.002-.005-.002-.005-.046-.137-.002-.005-.001-.005-.048-.137-.002-.005-.002-.005-.05-.135-.001-.005-.002-.005-.051-.135-.002-.005-.002-.005-.053-.135-.002-.005-.002-.005-.054-.133-.002-.005-.002-.005-.057-.133-.002-.005-.002-.005-.057-.132-.003-.005-.002-.005-.06-.132-.001-.005-.002-.004-.061-.132-.003-.004-.002-.005-.063-.13-.002-.005-.002-.005-.064-.13-.003-.004-.002-.005-.066-.129-.002-.004-.003-.005-.067-.128-.002-.005-.003-.004-.069-.128-.002-.004-.003-.005-.07-.126-.003-.005-.003-.004-.072-.126-.002-.005-.003-.004-.074-.125-.002-.004-.003-.005-.075-.124-.003-.004-.003-.005-.076-.123-.003-.004-.003-.005-.078-.122-.003-.004-.003-.005-.08-.121-.003-.004-.003-.005-.081-.12-.003-.005-.003-.004-.083-.12-.003-.004-.003-.004-.084-.118-.003-.005-.003-.004-.086-.118-.003-.004-.004-.004-.087-.117-.003-.004-.003-.004-.09-.116-.002-.004-.004-.004-.09-.114-.003-.005-.004-.004-.091-.113-.004-.004-.003-.004-.094-.113-.003-.004-.003-.004-.095-.111-.004-.004-.003-.004-.096-.11-.004-.005-.003-.004-.098-.11-.004-.003-.003-.004-.1-.108-.003-.004-.004-.004-.1-.107-.004-.004-.004-.004-.102-.106-.003-.003-.004-.004-.093-.095-.124-.103-.14-.08-.153-.05-.16-.023ZM4.45 12.826l-.161.002-.158.032-.15.06-.135.088-.118.11-.094.131-.069.146-.035.129-.026.132v.005l-.002.005-.025.143-.001.005-.001.006-.024.143-.001.005-.001.006-.022.143-.001.006-.001.005-.02.144-.001.005-.001.005-.019.145v.005l-.001.006-.017.144v.006l-.001.005-.016.145v.011l-.014.145v.005l-.001.006-.012.146v.01l-.01.146-.001.006v.005l-.009.146v.011l-.007.146v.011l-.004.147v.011l-.003.147v.01l-.002.148v.01l.001.148v.01l.003.147v.011l.005.147v.01l.007.147v.011l.009.146v.011l.01.146v.01l.013.146v.011l.014.145v.005l.001.006.016.145v.011l.018.144v.006l.001.005.019.144v.006l.001.005.021.144v.005l.002.006.022.143v.006l.002.005.024.143v.005l.002.006.025.143.001.005.001.005.028.143.001.005.001.005.03.142v.005l.002.006.03.141.002.005.001.005.033.142v.005l.002.005.035.14v.006l.002.005.036.14.002.005.001.005.038.14.001.005.002.005.04.14v.005l.002.005.042.138.001.006.002.005.042.138.002.005.002.005.017.054.064.148.09.134.114.114.132.092.148.065.157.037.16.007.16-.023.153-.052.14-.08.123-.104.102-.125.076-.142.049-.153.02-.16-.011-.161-.031-.13-.017-.051-.039-.126-.038-.13-.037-.128-.035-.13-.033-.128-.033-.134-.03-.13-.029-.131-.026-.13-.026-.133-.024-.133-.023-.133-.02-.132-.02-.136-.017-.132-.016-.135-.014-.135-.012-.133-.012-.138-.009-.133-.007-.136-.006-.138-.004-.134-.003-.136v-.274l.003-.136.004-.134.006-.139.007-.136.01-.133.01-.138.013-.132.014-.135.016-.135.017-.132.02-.137.02-.13.023-.134.024-.133.024-.126.016-.16-.014-.161-.044-.155-.072-.145-.098-.128-.12-.108-.137-.084-.15-.057-.16-.029Zm26.698 1.601-.161.01-.157.04-.146.067-.131.093-.112.117-.088.135-.061.149-.033.157-.005.134.006.14.006.176.003.177.001.178-.001.177-.003.178-.006.177-.007.176-.01.177-.012.176-.015.176-.016.173-.018.175-.02.175-.024.174-.025.175-.026.17-.03.174-.03.173-.033.17-.036.172-.037.17-.04.17-.042.172-.043.168-.045.166-.048.169-.05.167-.052.168-.053.164-.056.166-.058.166-.06.16-.062.165-.062.158-.066.165-.068.16-.07.16-.07.158-.075.159-.074.155-.079.158-.08.158-.06.15-.03.158-.001.161.029.159.058.15.085.137.108.119.13.097.144.07.156.044.16.013.16-.017.155-.046.143-.074.127-.1.107-.12.07-.115.083-.164.003-.005.002-.004.082-.166.002-.005.003-.004.08-.167.002-.005.002-.004.078-.168.002-.005.002-.004.076-.169.002-.004.002-.005.074-.17.002-.004.002-.005.072-.17.002-.005.002-.005.07-.171.001-.005.002-.005.068-.172.002-.004.002-.005.065-.173.002-.005.002-.005.063-.173.002-.005.002-.005.06-.174.003-.005.001-.005.06-.175.001-.005.002-.005.057-.176.001-.005.002-.005.055-.177.001-.005.002-.005.052-.177.002-.005.001-.005.051-.178.001-.005.002-.005.048-.179.002-.005v-.005l.047-.179.001-.005.002-.005.044-.18v-.005l.002-.005.042-.18.001-.006.001-.005.04-.181.001-.005.001-.005.037-.182.002-.005v-.005l.036-.182v-.006l.002-.005.033-.182v-.006l.002-.005.03-.183.001-.005.001-.005.029-.184v-.005l.001-.006.027-.184v-.005l.001-.005.024-.185v-.005l.001-.005.022-.185v-.006l.001-.005.02-.185v-.006l.001-.005.017-.186v-.005l.001-.005.015-.187v-.005l.001-.005.013-.187v-.01l.01-.187.001-.006v-.005l.009-.187v-.011l.006-.187v-.011l.004-.188v-.011l.001-.188v-.01l-.001-.188v-.011l-.004-.188v-.011l-.006-.187v-.011l-.007-.145-.022-.16-.05-.152-.08-.141-.103-.124-.125-.102-.141-.077-.153-.05-.16-.02ZM.938 15 .777 15l-.158.032-.15.06-.136.087-.117.11-.095.131-.068.146-.04.156-.012.133-.001.14v.01l.001.188v.011l.004.188v.011l.006.187v.011l.008.187v.011l.011.187v.005l.001.005.013.187v.01l.016.187v.01l.018.186v.011l.02.185.001.005v.006l.022.185.001.005v.005l.025.185v.005l.001.005.027.184v.006l.001.005.029.184v.005l.001.005.031.183.001.005.001.006.033.182.001.005.001.006.035.182.001.005.001.005.038.182v.005l.002.005.04.181v.005l.002.005.042.18.001.006.001.005.044.18.002.005v.005l.047.18.001.004.002.005.048.179.002.005.001.005.05.178.002.005.001.005.053.177.002.005.001.005.055.177.002.005.001.005.057.176.002.005.001.005.06.175.001.005.002.005.061.174.002.005.002.005.063.173.002.005.002.005.065.173.002.005.002.004.067.172.002.005.002.005.07.171.002.005.002.005.072.17.002.005.002.004.074.17.002.005.002.004.076.169.002.004.002.005.078.168.002.004.002.005.08.167.003.004.002.005.082.166.002.004.003.005.02.04.086.136.11.118.13.095.146.07.156.041.16.012.16-.019.155-.048.142-.075.126-.1.105-.123.08-.14.054-.152.024-.16-.006-.16-.036-.158-.051-.123-.018-.034-.078-.158L3.1 22.1l-.074-.16-.071-.157-.07-.16-.068-.16-.067-.165-.062-.158-.062-.164-.059-.161-.058-.166-.056-.166-.053-.164-.052-.168-.05-.167-.048-.17-.045-.165-.043-.168-.043-.172-.039-.17-.037-.17-.036-.172-.033-.17-.03-.173-.03-.174-.027-.17-.025-.175-.022-.174-.021-.175-.018-.175-.017-.173-.014-.176-.012-.176-.01-.177-.007-.176-.006-.177-.003-.178L1.73 16v-.134l-.013-.16-.044-.156-.072-.144-.097-.129-.12-.108-.137-.085-.15-.057L.938 15Zm26.798 2.024-.16.007-.157.038-.148.066-.132.092-.113.115-.09.134-.062.148-.03.127-.001.004-.023.134-.024.133-.026.133-.026.13-.03.132-.03.129-.032.134-.033.128-.035.13-.037.128-.038.13-.04.126-.04.128-.044.128-.044.126-.046.126-.048.126-.05.125-.05.125-.051.122-.054.123-.055.122-.056.12-.058.122-.06.12-.061.12-.063.119-.062.116-.067.119-.066.116-.069.115-.069.115-.07.113-.073.113-.074.112-.076.113-.077.112-.077.107-.08.11-.08.107-.085.11-.044.056-.088.135-.06.15-.033.158-.002.16.027.16.057.15.083.138.108.12.128.098.144.072.155.045.16.015.161-.016.155-.044.144-.073.128-.098.09-.099.05-.061.003-.004.003-.005.089-.115.003-.004.003-.005.088-.116.003-.004.003-.005.086-.117.003-.004.003-.005.084-.118.003-.004.003-.005.083-.12.003-.004.003-.004.081-.12.003-.005.003-.004.08-.121.003-.005.003-.004.078-.122.003-.005.003-.004.077-.123.002-.005.003-.004.075-.124.003-.005.003-.004.073-.125.003-.005.003-.004.072-.126.002-.004.003-.005.07-.126.003-.005.002-.005.07-.127.002-.004.002-.005.068-.128.002-.005.002-.004.066-.13.003-.004.002-.005.064-.13.002-.004.003-.005.062-.13.002-.005.003-.005.06-.13.003-.005.002-.005.06-.132.002-.005.002-.005.057-.132.003-.005.002-.005.056-.133.002-.005.002-.005.054-.134.002-.004.002-.005.053-.135.002-.005.002-.005.051-.135.002-.005.002-.005.05-.135.001-.005.002-.005.048-.137.001-.005.002-.005.046-.137.002-.005.002-.005.044-.137.002-.005.002-.005.042-.138.002-.005.001-.006.042-.138.001-.005.002-.005.04-.14V19.4l.002-.005.038-.14.001-.005.002-.005.036-.14.001-.005.001-.005.035-.141.001-.005.001-.005.033-.142.001-.005.001-.005.031-.141.001-.006.002-.005.029-.142v-.005l.002-.005.028-.143v-.005l.002-.005.025-.143.001-.006.001-.005.024-.143.001-.005.001-.006.001-.006.01-.161-.02-.16-.05-.154-.077-.141-.102-.125-.123-.104-.141-.079-.153-.051-.16-.022ZM6.841 22.71l-.16.024-.152.053-.14.08-.122.105-.101.126-.076.142-.048.154-.018.16.011.161.041.156.07.146.077.109.04.048.003.004.003.004.095.111.003.004.004.004.096.11.004.005.003.004.098.109.003.004.004.004.1.108.003.004.003.004.101.107.004.004.003.004.102.105.004.004.004.004.103.105.004.004.004.003.105.104.003.004.004.003.106.102.004.004.004.004.107.1.004.004.004.004.108.099.004.003.004.004.11.098.003.003.004.004.11.096.004.003.005.004.11.095.005.003.004.004.113.093.004.003.004.004.113.091.004.004.005.003.114.09.004.004.004.003.116.089.004.003.004.003.117.088.004.003.004.003.118.086.004.003.005.003.118.084.004.003.005.003.119.083.004.003.005.003.12.081.005.003.004.003.121.08.005.003.004.003.122.078.005.003.004.003.123.076.005.003.004.003.124.075.005.003.004.003.125.073.004.003.005.002.126.073.004.002.005.003.126.07.005.003.004.002.128.07.004.002.005.002.128.067.005.003.004.002.13.066.004.002.005.003.13.064.004.002.005.003.13.062.005.002.004.003.132.06.004.003.005.002.132.06.005.002.005.002.132.057.005.002.005.002.133.057.005.002.005.002.133.054.005.002.005.002.13.05.154.045.16.016.16-.015.156-.045.144-.072.128-.098.108-.12.083-.138.057-.15.028-.16-.003-.16-.032-.159-.061-.149-.088-.135-.11-.117-.132-.094-.12-.058-.124-.049-.126-.051-.122-.051-.122-.054-.12-.054-.126-.058-.119-.057-.12-.06-.12-.06-.118-.063-.117-.064-.119-.066-.116-.066-.115-.068-.115-.07-.113-.07-.115-.074-.112-.074-.11-.075-.11-.076-.112-.08-.11-.08-.109-.081-.106-.082-.104-.082-.106-.086-.105-.087-.101-.086-.105-.091-.1-.09-.1-.091-.1-.094-.097-.094-.1-.098-.093-.095-.096-.1-.093-.098-.092-.101-.089-.1-.09-.102-.088-.104-.036-.043-.114-.114-.133-.091-.148-.065-.157-.036-.161-.006Zm15.063 2.701-.16.014-.156.044-.12.057-.06.034-.12.066-.117.064-.118.062-.12.061-.12.06-.118.057-.126.058-.12.054-.122.054-.122.05-.126.052-.125.05-.124.046-.127.047-.125.044-.129.043-.126.04-.13.042-.128.038-.127.035-.13.036-.131.034-.129.031-.132.03-.13.03-.135.027-.133.026-.13.023-.13.022-.137.021-.132.02-.134.017-.132.015-.138.015-.135.013-.133.01-.138.01-.136.007-.134.006-.136.004-.14.003-.16.018-.155.047-.142.076-.127.1-.105.122-.08.14-.054.151-.025.16.006.16.035.158.064.148.09.134.114.114.133.092.147.065.157.036.134.008.145-.002h.011l.147-.005h.01l.147-.007h.011l.146-.009h.011l.146-.01h.005l.005-.001.146-.012h.011l.145-.014h.005l.006-.001.145-.016h.011l.144-.018h.006l.005-.001.144-.02h.011l.144-.021.005-.001h.006l.143-.023.006-.001h.005l.143-.025h.005l.006-.002.143-.026h.005l.005-.002.143-.027.005-.001.005-.001.142-.03h.005l.005-.002.142-.03.005-.002.005-.001.142-.033.005-.001.005-.001.14-.035.006-.001.005-.001.14-.037h.005l.005-.002.14-.038.005-.002h.005l.14-.04.005-.002.005-.001.138-.042.005-.001.006-.002.138-.043.005-.001.005-.002.137-.044.005-.002.005-.002.137-.046.005-.002.005-.001.137-.048.005-.002.005-.002.135-.05.005-.001.005-.002.135-.051.005-.002.005-.002.135-.053.005-.002.004-.002.134-.054.005-.002.005-.002.133-.057.005-.002.005-.002.132-.057.005-.003.005-.002.132-.06.005-.001.004-.002.131-.061.005-.003.005-.002.13-.062.005-.003.005-.002.13-.064.004-.003.005-.002.128-.066.005-.002.005-.003.128-.067.005-.002.004-.003.127-.069.005-.002.005-.003.126-.07.005-.003.004-.003.065-.037.132-.093.112-.115.089-.135.062-.149.034-.157.003-.161-.026-.16-.055-.15-.082-.14-.107-.12-.127-.1-.144-.073-.154-.046-.16-.016ZM6.33 26.818l-.16.023-.152.053-.14.08-.122.105-.101.126-.076.142-.048.154-.02.16.012.161.041.156.07.146.094.13.096.093.032.026.004.003.004.004.145.117.004.003.004.004.146.115.005.003.004.004.147.113.005.003.004.004.149.111.004.003.004.003.15.11.005.003.004.003.151.108.004.003.005.003.152.106.005.003.004.003.154.104.004.003.005.003.154.102.005.002.004.003.156.1.005.003.004.003.157.098.005.003.004.002.159.096.004.003.005.003.16.094.004.003.004.002.16.092.005.003.005.002.161.09.005.003.005.002.162.088.005.003.004.002.164.086.005.003.004.002.165.084.005.003.004.002.166.082.004.002.005.003.167.08.004.002.005.002.168.078.004.002.005.002.168.076.005.002.005.002.17.074.004.002.005.002.17.072.005.002.005.002.17.07.006.002.005.001.171.068.005.002.005.002.173.065.005.002.005.002.173.063.005.002.005.002.174.06.005.003.005.001.175.06.005.001.005.002.176.057.005.001.005.002.176.055.006.001.005.002.177.052.005.002.005.001.178.05.005.002.005.002.178.048.006.001.005.002.179.046.005.001.005.002.18.044h.005l.005.002.18.042.006.001.005.001.159.035.16.02.16-.01.157-.04.146-.069.13-.094.112-.117.087-.136.06-.149.033-.158.002-.161-.028-.159-.057-.15-.084-.138-.108-.12-.128-.098-.144-.072-.128-.039-.154-.033-.168-.04-.171-.041-.17-.044-.168-.046-.167-.047-.168-.05-.165-.051-.166-.054-.166-.056-.163-.057-.165-.06-.161-.062-.164-.064-.16-.065-.16-.068-.162-.07-.157-.07-.157-.074-.157-.075-.156-.077-.153-.079-.156-.082-.153-.082-.154-.086-.15-.086-.152-.09-.148-.09-.147-.092-.149-.095-.145-.095-.144-.098-.145-.1-.143-.102-.14-.103-.14-.104-.14-.108-.139-.11-.136-.11-.027-.022-.133-.091-.148-.065-.157-.036-.161-.006Zm19.215.087-.16.01-.157.039-.146.067-.11.076-.064.051-.139.11-.14.108-.14.104-.14.103-.143.101-.145.101-.144.098-.145.095-.149.095-.148.093-.147.089-.152.09-.15.086-.154.086-.153.082-.156.082-.153.079-.156.077-.157.075-.158.073-.157.071-.16.07-.16.068-.161.065-.164.064-.161.061-.165.06-.163.058-.166.056-.166.054-.166.051-.167.05-.167.047-.17.046-.168.044-.171.042-.168.039-.17.037-.11.023-.154.047-.143.075-.126.1-.106.122-.081.139-.054.152-.025.16.006.16.035.158.063.148.09.133.114.115.132.092.148.065.157.037.16.007.133-.016.115-.024.005-.001.005-.001.181-.04h.005l.005-.002.18-.042.006-.001.005-.001.18-.044.005-.002.005-.001.18-.046.004-.002h.005l.179-.05h.005l.005-.002.178-.05.005-.002.005-.002.177-.052.005-.002.005-.001.177-.055.005-.002.005-.001.176-.057.005-.002.005-.002.175-.059.005-.001.005-.002.174-.061.005-.002.005-.002.173-.063.005-.002.005-.002.173-.065.004-.002.005-.002.172-.068.005-.002.005-.002.171-.07.005-.001.005-.002.17-.072.005-.002.004-.002.17-.074.005-.002.004-.002.169-.076.004-.002.005-.002.168-.078.004-.002.005-.003.167-.08.004-.002.005-.002.166-.082.004-.002.005-.003.165-.084.004-.002.005-.003.163-.086.005-.002.005-.003.162-.088.005-.002.005-.003.161-.09.005-.002.004-.003.16-.092.005-.003.005-.002.16-.094.004-.003.004-.003.158-.096.005-.002.004-.003.158-.098.004-.003.005-.003.156-.1.004-.003.004-.003.155-.101.005-.003.004-.003.154-.104.004-.003.004-.003.153-.106.004-.003.005-.003.151-.108.004-.003.005-.003.15-.11.004-.003.004-.003.149-.112.004-.003.004-.003.148-.113.004-.004.004-.003.147-.115.004-.004.004-.003.068-.055.116-.113.092-.132.066-.147.038-.157.008-.16-.022-.16-.05-.153-.08-.14-.103-.125-.124-.102-.142-.077-.153-.05-.16-.02Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-non-interrupting-multiple"><path d="m23.637 13.902-7.625-5.535-7.624 5.535 2.912 8.956h9.425l2.912-8.956Zm-1.017.33-2.524 7.762H11.93l-2.524-7.762 6.607-4.796 6.608 4.796ZM16.012.311c-1.448.02-2.93.157-4.302.628-.852.447-.255 1.863.66 1.574 2.255-.608 4.648-.607 6.922-.108.934.075 1.228-1.376.338-1.67C18.451.44 17.227.317 16.012.311Zm9.012 2.934c-.913-.104-1.272 1.258-.454 1.648 1.834 1.36 3.293 3.185 4.31 5.22.526.776 1.842.098 1.515-.78a15.522 15.522 0 0 0-5.06-6.006c-.1-.044-.203-.07-.31-.082ZM6.65 3.59c-.762.089-1.24.809-1.805 1.267C3.38 6.295 2.163 8.007 1.37 9.905c-.266.898 1.094 1.484 1.564.675a14.825 14.825 0 0 1 4.327-5.56c.476-.515.09-1.419-.612-1.431Zm9.362.007c-.698.066-1.689-.16-2.033.635-.282.733.535 1.358 1.217 1.125 1.806-.147 3.63.203 5.293.907.902.255 1.472-1.112.656-1.573-1.6-.735-3.374-1.089-5.133-1.094Zm-5.479 1.365c-.835.15-1.517.76-2.21 1.226-1.203.94-2.318 2.061-3.057 3.402-.33.904 1.063 1.552 1.547.723 1.045-1.656 2.596-2.925 4.285-3.873.545-.499.171-1.463-.565-1.478Zm13.903 2.115c-.875-.07-1.22 1.173-.501 1.627 1.325 1.34 2.188 3.062 2.748 4.84.468.84 1.869.21 1.557-.699-.604-2.118-1.751-4.097-3.351-5.615a.93.93 0 0 0-.453-.153ZM4.467 13.132c-.822-.07-.996.826-1.046 1.455-.256 1.93-.094 3.933.562 5.769.406.844 1.807.365 1.612-.551a11.498 11.498 0 0 1-.334-5.808.874.874 0 0 0-.794-.865Zm26.687 1.6c-.746-.037-1.014.785-.879 1.395.043 2.393-.57 4.771-1.66 6.894-.31.884 1.02 1.536 1.53.75a15.632 15.632 0 0 0 1.821-8.372.876.876 0 0 0-.812-.667Zm-30.197.571c-.782-.073-1.044.775-.933 1.404.068 2.414.661 4.833 1.809 6.962.534.77 1.842.076 1.505-.798a14.833 14.833 0 0 1-1.603-6.861.876.876 0 0 0-.778-.707Zm26.787 2.024c-.777-.048-.952.797-1.021 1.392-.354 1.692-1.202 3.231-2.216 4.608-.407.872.925 1.638 1.48.852 1.361-1.733 2.296-3.827 2.582-6.017a.874.874 0 0 0-.825-.835ZM6.857 23.012c-.808.018-1.082 1.122-.47 1.59 1.393 1.607 3.187 2.886 5.194 3.599.91.222 1.43-1.165.598-1.596a11.495 11.495 0 0 1-4.723-3.396.899.899 0 0 0-.599-.197Zm15.057 2.7c-.81.194-1.504.76-2.325.972-1.203.458-2.5.536-3.758.664-.869.307-.573 1.728.346 1.663 2.201-.034 4.412-.626 6.293-1.778.604-.495.227-1.532-.556-1.521ZM6.346 27.118c-.833.008-1.11 1.218-.395 1.617 1.986 1.602 4.358 2.749 6.868 3.226.933.076 1.227-1.376.338-1.67a14.838 14.838 0 0 1-6.345-3.066.929.929 0 0 0-.466-.107Zm19.208.087c-.766.09-1.241.841-1.922 1.158-1.516.991-3.251 1.58-4.996 2.005-.872.405-.346 1.849.584 1.604 2.543-.526 4.98-1.66 6.963-3.344.47-.52.072-1.42-.63-1.423Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-non-interrupting-parallel"><path d="M13.51 9.081v4.428H9.08v4.982h4.428v4.428h4.982V18.49h4.428v-4.982H18.49V9.081h-4.982Zm.83.83h3.32v4.428h4.429v3.322H17.66v4.428h-3.32v-4.454H9.91v-3.296h4.428V9.911ZM16 0h-.005l-.188.001h-.011l-.188.004h-.011l-.187.006h-.011l-.187.008h-.005L15.2.02l-.187.01h-.005l-.005.001-.187.013h-.011L14.62.06h-.01l-.186.018h-.011l-.185.02-.005.001h-.006l-.185.022-.005.001h-.005l-.185.025h-.005l-.005.001-.185.027h-.005l-.005.001-.184.029h-.005l-.005.001-.183.031-.006.001-.005.001-.182.033-.006.001-.005.001-.182.035-.005.001-.005.001-.182.038h-.005l-.005.002-.181.04h-.005l-.005.002-.18.042-.006.001-.005.001-.18.044-.005.002h-.005l-.17.045-.152.054-.139.082-.121.106-.1.127-.074.143-.046.155-.017.16.013.16.043.156.07.145.097.13.119.108.137.085.15.058.159.03.16-.001.133-.023.165-.043.168-.041.171-.04.171-.037.172-.036.17-.033.173-.03.17-.03.177-.027.171-.025.175-.022.175-.02.175-.02.176-.016.175-.014.177-.012.176-.01.177-.007.174-.006.177-.003L16 1.73h.177l.178.004.174.006.177.007.176.01.177.012.175.014.176.017.175.018.175.02.175.023.171.025.176.027.17.03.174.03.17.033.171.036.154.033.16.02.161-.01.156-.04.146-.069.131-.094.111-.117.087-.135.061-.15.032-.158.002-.16-.027-.16-.057-.15L20 .714l-.108-.12-.128-.097-.145-.073-.128-.038-.158-.035-.005-.001-.005-.001L19.14.31h-.005l-.005-.002-.182-.035h-.006l-.005-.002-.182-.033h-.006l-.005-.002-.183-.03-.005-.001-.006-.001-.183-.029h-.005l-.006-.001-.184-.027h-.005l-.005-.001-.185-.024h-.005L17.968.12 17.783.1l-.006-.001h-.005l-.185-.02h-.006l-.005-.001L17.39.06h-.005L17.38.06l-.187-.015h-.005l-.005-.001-.187-.013h-.011L16.8.02h-.011L16.6.01h-.011l-.187-.006h-.011L16.204 0h-.011L16.005 0H16Zm9.015 2.935-.16.004-.158.033-.15.062-.134.09-.116.111-.093.132-.067.147-.038.156-.01.161.022.16.05.153.078.141.103.124.102.087.045.034.142.106.137.105.14.11.136.11.135.112.134.115.134.117.13.115.132.122.128.12.127.122.126.125.124.126.124.128.121.13.118.128.118.132.117.133.113.134.113.136.11.136.109.137.109.142.104.14.103.14.101.142.1.144.099.146.095.145.094.147.093.15.092.15.087.149.087.15.084.152.084.155.08.152.08.155.04.081.084.138.11.119.128.096.145.072.155.043.16.013.16-.016.155-.046.144-.074.127-.099.106-.12.083-.14.055-.151.026-.16-.004-.16-.034-.158-.05-.124-.042-.085-.002-.004-.003-.005-.084-.165-.002-.004-.003-.005-.086-.164-.002-.004-.003-.005-.088-.162-.002-.005-.003-.005-.09-.161-.002-.005-.003-.004-.092-.16-.003-.005-.002-.005-.094-.16-.003-.004-.003-.004-.096-.159-.002-.004-.003-.005-.098-.157-.003-.004-.003-.005-.1-.156-.003-.004-.003-.005-.101-.154-.003-.005-.003-.004-.104-.154-.003-.004-.003-.005-.106-.152-.003-.005-.003-.004-.108-.151-.003-.004-.003-.005-.11-.15-.003-.004-.003-.004-.111-.15-.004-.003-.003-.005-.113-.147-.004-.004-.003-.005-.115-.146-.004-.004-.003-.004-.117-.145-.004-.004-.003-.004-.12-.144-.003-.004-.003-.004-.121-.142-.004-.004-.003-.004-.123-.141-.003-.004-.004-.004-.125-.14-.003-.004-.004-.004-.127-.138-.003-.004-.004-.004-.128-.136-.004-.004-.004-.004-.13-.135-.004-.004-.004-.004-.132-.134-.003-.004-.004-.003-.134-.133-.004-.003-.004-.004-.135-.13-.004-.004-.004-.004-.136-.128-.004-.004-.004-.004-.138-.126-.004-.004-.004-.003-.14-.125-.004-.004-.004-.003-.14-.123-.005-.004-.004-.003-.142-.121-.004-.004-.004-.003-.144-.12-.004-.003-.004-.003-.145-.117-.004-.004-.004-.003-.147-.115-.004-.004-.004-.003-.148-.113-.004-.003-.004-.004-.149-.111-.004-.003-.004-.004-.05-.036-.14-.083-.15-.055-.16-.027ZM6.634 3.28l-.161.008-.157.037-.147.066-.111.074-.04.032-.005.003-.004.004-.145.117-.004.003-.004.004-.144.119-.004.003-.004.004-.142.12-.004.004-.004.004-.141.123-.004.003-.004.004-.14.125-.004.003-.004.004-.138.126-.004.004-.004.004-.136.128-.004.004-.004.004-.135.13-.004.004-.004.003-.134.133-.004.003-.004.004-.132.134-.003.004-.004.004-.13.135-.004.004-.004.004-.128.136-.004.004-.004.004-.126.138-.004.004-.003.004-.125.14-.004.004-.003.004-.123.14-.004.005-.003.004-.121.142-.004.004-.003.004-.12.144-.003.004-.003.004-.117.145-.004.004-.003.004-.115.146-.004.005-.003.004-.113.147-.003.005-.004.004-.111.149-.003.004-.004.004-.11.15-.002.005-.003.004-.108.151-.003.004-.003.005-.106.152-.003.005-.003.004-.104.154-.003.004-.003.005-.102.154-.003.005-.002.004-.1.156-.003.005-.003.004-.098.157-.003.005-.003.004-.096.159-.002.004-.003.005-.094.16-.003.004-.002.004-.092.16-.003.005-.003.005-.09.161-.002.005-.003.005-.088.162-.002.005-.003.004-.086.164-.002.005-.002.004-.084.165-.003.005-.002.004-.082.166-.002.004-.003.005-.08.167-.002.004-.002.005-.078.168-.002.004-.002.005-.045.1-.053.153-.023.16.007.16.037.157.065.148.092.132.114.114.134.09.148.064.157.035.161.006.16-.025.152-.054.14-.08.121-.106.1-.126.065-.118.043-.095.074-.16.075-.155.077-.157.08-.155.08-.152.083-.155.085-.152.086-.15.088-.149.091-.15.094-.15.094-.147.095-.145.099-.146.1-.144.1-.142.104-.14.104-.14.11-.142.107-.137.11-.136.114-.136.113-.134.117-.133.118-.132.117-.129.122-.13.124-.127.123-.126.127-.125.127-.122.128-.12.132-.122.13-.115.133-.117.135-.115.135-.111.136-.11.037-.03.117-.11.094-.132.068-.146.04-.156.01-.161-.02-.16-.05-.154-.076-.141-.102-.125-.123-.104-.14-.08-.153-.051-.16-.023ZM16 3.286h-.005l-.148.001h-.01l-.147.003h-.011l-.147.005h-.011l-.146.007h-.011l-.146.009h-.011l-.146.01h-.005l-.005.001-.146.012h-.011l-.145.014h-.006l-.005.001-.05.006-.158.031-.15.06-.135.088-.117.111-.094.13-.069.147-.04.156-.01.16.019.16.049.154.076.142.102.125.123.105.14.08.152.051.16.023.134-.003.045-.005.135-.013.133-.01.136-.01.135-.007.137-.006.136-.004.136-.003h.274l.136.003.136.004.136.006.136.007.136.01.133.01.135.013.135.014.135.016.134.018.132.018.134.021.133.023.133.024.133.025.13.027.132.03.132.03.129.031.13.034.129.035.129.036.13.04.126.038.128.042.126.042.128.045.127.047.126.047.12.048.127.051.123.052.006.002.147.048.16.021.16-.009.157-.038.147-.067.131-.093.112-.116.089-.135.062-.149.033-.158.004-.16-.027-.16-.055-.151-.083-.139-.107-.12-.127-.099-.118-.063-.004-.001-.005-.003-.005-.002-.133-.056-.005-.002-.005-.002-.134-.054-.004-.002-.005-.002-.135-.053-.005-.002-.005-.002-.135-.051-.005-.002-.005-.002-.135-.05-.005-.001-.005-.002-.137-.048-.005-.001-.005-.002-.137-.046-.005-.002-.005-.002-.137-.044-.005-.002-.005-.001-.138-.043-.006-.002-.005-.001-.138-.042-.005-.001-.005-.002-.14-.04H19.4l-.005-.002-.14-.038-.005-.001-.005-.002-.14-.036-.005-.001-.005-.001-.141-.035-.005-.001-.005-.001-.142-.033-.005-.001-.005-.001-.142-.031-.005-.002h-.005l-.142-.03-.005-.001-.005-.001-.143-.028h-.005l-.005-.002-.143-.025-.006-.001-.005-.001-.143-.024-.005-.001-.006-.001-.143-.022-.006-.001h-.005l-.144-.022h-.005l-.006-.001-.144-.019h-.005l-.006-.001-.144-.017h-.006l-.005-.001-.145-.016h-.011l-.145-.014H17.1l-.005-.001-.146-.012h-.01l-.146-.01-.006-.001h-.005l-.146-.009h-.011l-.147-.006h-.01l-.147-.005h-.011l-.147-.003h-.011l-.147-.001H16Zm-5.482 1.366-.16.008-.157.037-.123.053-.06.032-.005.002-.004.003-.128.069-.004.002-.005.003-.126.07-.005.003-.004.002-.126.072-.005.003-.004.003-.125.073-.004.003-.005.003-.124.075-.004.003-.005.002-.123.077-.004.003-.005.003-.122.078-.004.003-.005.003-.121.08-.004.002-.005.003-.12.082-.005.003-.004.003-.12.083-.004.003-.004.003-.118.084-.005.003-.004.003-.118.086-.004.003-.004.003-.117.088-.004.003-.004.003-.116.089-.004.003-.004.004-.114.09-.005.003-.004.003-.113.092-.004.004-.004.003-.113.093-.004.004-.004.003-.111.095-.005.003-.004.004-.11.096-.004.004-.004.003-.11.098-.003.003-.004.004-.108.1-.004.003-.004.003-.107.101-.004.004-.004.003-.106.102-.004.004-.003.004-.105.103-.004.004-.004.004-.103.105-.004.004-.004.003-.102.106-.003.004-.004.004-.1.107-.004.004-.004.004-.099.108-.004.004-.003.004-.098.11-.003.003-.004.004-.096.11-.004.005-.003.004-.095.111-.003.004-.004.004-.093.113-.003.004-.004.004-.092.113-.003.004-.003.005-.09.114-.004.004-.003.004-.089.116-.003.004-.003.004-.088.117-.003.004-.003.004-.086.118-.003.004-.003.005-.084.118-.003.004-.003.005-.083.12-.003.003-.003.005-.082.12-.003.005-.002.004-.068.103-.076.142-.048.154-.018.16.011.161.041.156.07.146.095.13.117.11.136.086.15.06.158.03.162.002.158-.03.15-.057.138-.085.119-.109.082-.105.065-.099.075-.11.077-.113.077-.107.08-.11.08-.108.084-.108.083-.105.086-.106.086-.104.088-.104.089-.101.09-.102.093-.101.093-.099.094-.097.095-.096.098-.097.098-.095.099-.093.1-.092.103-.091.101-.089.104-.088.104-.086.106-.086.106-.083.106-.082.109-.082.108-.079.11-.078.11-.076.112-.076.112-.074.113-.072.113-.071.115-.07.115-.068.118-.067.117-.065.12-.065.054-.029.135-.088.116-.111.094-.132.068-.146.04-.156.009-.161-.02-.16-.05-.153-.078-.142-.102-.125-.123-.103-.141-.079-.153-.051-.16-.022Zm13.91 2.116-.162.008-.157.037-.147.066-.132.092-.113.116-.09.134-.063.148-.034.157-.005.162.025.159.055.152.082.138.086.103.09.09.094.098.092.099.093.1.091.103.089.101.088.104.086.104.086.106.083.105.083.108.08.108.081.11.077.107.077.112.075.111.075.114.072.113.071.113.07.114.068.118.067.115.065.118.064.117.062.117.061.121.059.119.059.122.056.121.054.12.055.125.051.123.051.125.048.123.048.127.047.126.044.125.043.128.042.129.039.126.038.13.022.076.058.15.085.137.11.119.129.096.145.07.155.043.16.013.161-.017.154-.046.144-.075.126-.1.106-.12.082-.14.055-.151.025-.16-.005-.16-.026-.132-.023-.082-.002-.005-.001-.005-.042-.139-.001-.005-.002-.005-.043-.138-.001-.005-.002-.005-.044-.137-.002-.005-.002-.005-.046-.137-.002-.005-.001-.005-.048-.137-.002-.005-.002-.005-.05-.135-.001-.005-.002-.005-.051-.135-.002-.005-.002-.005-.053-.135-.002-.005-.002-.005-.054-.133-.002-.005-.002-.005-.057-.133-.002-.005-.002-.005-.057-.132-.003-.005-.002-.005-.06-.132-.001-.005-.002-.004-.061-.132-.003-.004-.002-.005-.063-.13-.002-.005-.002-.005-.064-.13-.003-.004-.002-.005-.066-.129-.002-.004-.003-.005-.067-.128-.002-.005-.003-.004-.069-.128-.002-.004-.003-.005-.07-.126-.003-.005-.003-.004-.072-.126-.002-.005-.003-.004-.074-.125-.002-.004-.003-.005-.075-.124-.003-.004-.003-.005-.076-.123-.003-.004-.003-.005-.078-.122-.003-.004-.003-.005-.08-.121-.003-.004-.003-.005-.081-.12-.003-.005-.003-.004-.083-.12-.003-.004-.003-.004-.084-.118-.003-.005-.003-.004-.086-.118-.003-.004-.004-.004-.087-.117-.003-.004-.003-.004-.09-.116-.002-.004-.004-.004-.09-.114-.003-.005-.004-.004-.091-.113-.004-.004-.003-.004-.094-.113-.003-.004-.003-.004-.095-.111-.004-.004-.003-.004-.096-.11-.004-.005-.003-.004-.098-.11-.004-.003-.003-.004-.1-.108-.003-.004-.004-.004-.1-.107-.004-.004-.004-.004-.102-.106-.003-.003-.004-.004-.093-.095-.124-.103-.14-.08-.153-.05-.16-.023ZM4.45 12.826l-.161.002-.158.032-.15.06-.135.088-.118.11-.094.131-.069.146-.035.129-.026.132v.005l-.002.005-.025.143-.001.005-.001.006-.024.143-.001.005-.001.006-.022.143-.001.006-.001.005-.02.144-.001.005-.001.005-.019.145v.005l-.001.006-.017.144v.006l-.001.005-.016.145v.011l-.014.145v.005l-.001.006-.012.146v.01l-.01.146-.001.006v.005l-.009.146v.011l-.007.146v.011l-.004.147v.011l-.003.147v.01l-.002.148v.01l.001.148v.01l.003.147v.011l.005.147v.01l.007.147v.011l.009.146v.011l.01.146v.01l.013.146v.011l.014.145v.005l.001.006.016.145v.011l.018.144v.006l.001.005.019.144v.006l.001.005.021.144v.005l.002.006.022.143v.006l.002.005.024.143v.005l.002.006.025.143.001.005.001.005.028.143.001.005.001.005.03.142v.005l.002.006.03.141.002.005.001.005.033.142v.005l.002.005.035.14v.006l.002.005.036.14.002.005.001.005.038.14.001.005.002.005.04.14v.005l.002.005.042.138.001.006.002.005.042.138.002.005.002.005.017.054.064.148.09.134.114.114.132.092.148.065.157.037.16.007.16-.023.153-.052.14-.08.123-.104.102-.125.076-.142.049-.153.02-.16-.011-.161-.031-.13-.017-.051-.039-.126-.038-.13-.037-.128-.035-.13-.033-.128-.033-.134-.03-.13-.029-.131-.026-.13-.026-.133-.024-.133-.023-.133-.02-.132-.02-.136-.017-.132-.016-.135-.014-.135-.012-.133-.012-.138-.009-.133-.007-.136-.006-.138-.004-.134-.003-.136v-.274l.003-.136.004-.134.006-.139.007-.136.01-.133.01-.138.013-.132.014-.135.016-.135.017-.132.02-.137.02-.13.023-.134.024-.133.024-.126.016-.16-.014-.161-.044-.155-.072-.145-.098-.128-.12-.108-.137-.084-.15-.057-.16-.029Zm26.698 1.601-.161.01-.157.04-.146.067-.131.093-.112.117-.088.135-.061.149-.033.157-.005.134.006.14.006.176.003.177.001.178-.001.177-.003.178-.006.177-.007.176-.01.177-.012.176-.015.176-.016.173-.018.175-.02.175-.024.174-.025.175-.026.17-.03.174-.03.173-.033.17-.036.172-.037.17-.04.17-.042.172-.043.168-.045.166-.048.169-.05.167-.052.168-.053.164-.056.166-.058.166-.06.16-.062.165-.062.158-.066.165-.068.16-.07.16-.07.158-.075.159-.074.155-.079.158-.08.158-.06.15-.03.158-.001.161.029.159.058.15.085.137.108.119.13.097.144.07.156.044.16.013.16-.017.155-.046.143-.074.127-.1.107-.12.07-.115.083-.164.003-.005.002-.004.082-.166.002-.005.003-.004.08-.167.002-.005.002-.004.078-.168.002-.005.002-.004.076-.169.002-.004.002-.005.074-.17.002-.004.002-.005.072-.17.002-.005.002-.005.07-.171.001-.005.002-.005.068-.172.002-.004.002-.005.065-.173.002-.005.002-.005.063-.173.002-.005.002-.005.06-.174.003-.005.001-.005.06-.175.001-.005.002-.005.057-.176.001-.005.002-.005.055-.177.001-.005.002-.005.052-.177.002-.005.001-.005.051-.178.001-.005.002-.005.048-.179.002-.005v-.005l.047-.179.001-.005.002-.005.044-.18v-.005l.002-.005.042-.18.001-.006.001-.005.04-.181.001-.005.001-.005.037-.182.002-.005v-.005l.036-.182v-.006l.002-.005.033-.182v-.006l.002-.005.03-.183.001-.005.001-.005.029-.184v-.005l.001-.006.027-.184v-.005l.001-.005.024-.185v-.005l.001-.005.022-.185v-.006l.001-.005.02-.185v-.006l.001-.005.017-.186v-.005l.001-.005.015-.187v-.005l.001-.005.013-.187v-.01l.01-.187.001-.006v-.005l.009-.187v-.011l.006-.187v-.011l.004-.188v-.011l.001-.188v-.01l-.001-.188v-.011l-.004-.188v-.011l-.006-.187v-.011l-.007-.145-.022-.16-.05-.152-.08-.141-.103-.124-.125-.102-.141-.077-.153-.05-.16-.02ZM.938 15 .777 15l-.158.032-.15.06-.136.087-.117.11-.095.131-.068.146-.04.156-.012.133-.001.14v.01l.001.188v.011l.004.188v.011l.006.187v.011l.008.187v.011l.011.187v.005l.001.005.013.187v.01l.016.187v.01l.018.186v.011l.02.185.001.005v.006l.022.185.001.005v.005l.025.185v.005l.001.005.027.184v.006l.001.005.029.184v.005l.001.005.031.183.001.005.001.006.033.182.001.005.001.006.035.182.001.005.001.005.038.182v.005l.002.005.04.181v.005l.002.005.042.18.001.006.001.005.044.18.002.005v.005l.047.18.001.004.002.005.048.179.002.005.001.005.05.178.002.005.001.005.053.177.002.005.001.005.055.177.002.005.001.005.057.176.002.005.001.005.06.175.001.005.002.005.061.174.002.005.002.005.063.173.002.005.002.005.065.173.002.005.002.004.067.172.002.005.002.005.07.171.002.005.002.005.072.17.002.005.002.004.074.17.002.005.002.004.076.169.002.004.002.005.078.168.002.004.002.005.08.167.003.004.002.005.082.166.002.004.003.005.02.04.086.136.11.118.13.095.146.07.156.041.16.012.16-.019.155-.048.142-.075.126-.1.105-.123.08-.14.054-.152.024-.16-.006-.16-.036-.158-.051-.123-.018-.034-.078-.158L3.1 22.1l-.074-.16-.071-.157-.07-.16-.068-.16-.067-.165-.062-.158-.062-.164-.059-.161-.058-.166-.056-.166-.053-.164-.052-.168-.05-.167-.048-.17-.045-.165-.043-.168-.043-.172-.039-.17-.037-.17-.036-.172-.033-.17-.03-.173-.03-.174-.027-.17-.025-.175-.022-.174-.021-.175-.018-.175-.017-.173-.014-.176-.012-.176-.01-.177-.007-.176-.006-.177-.003-.178L1.73 16v-.134l-.013-.16-.044-.156-.072-.144-.097-.129-.12-.108-.137-.085-.15-.057L.938 15Zm26.798 2.024-.16.007-.157.038-.148.066-.132.092-.113.115-.09.134-.062.148-.03.127-.001.004-.023.134-.024.133-.026.133-.026.13-.03.132-.03.129-.032.134-.033.128-.035.13-.037.128-.038.13-.04.126-.04.128-.044.128-.044.126-.046.126-.048.126-.05.125-.05.125-.051.122-.054.123-.055.122-.056.12-.058.122-.06.12-.061.12-.063.119-.062.116-.067.119-.066.116-.069.115-.069.115-.07.113-.073.113-.074.112-.076.113-.077.112-.077.107-.08.11-.08.107-.085.11-.044.056-.088.135-.06.15-.033.158-.002.16.027.16.057.15.083.138.108.12.128.098.144.072.155.045.16.015.161-.016.155-.044.144-.073.128-.098.09-.099.05-.061.003-.004.003-.005.089-.115.003-.004.003-.005.088-.116.003-.004.003-.005.086-.117.003-.004.003-.005.084-.118.003-.004.003-.005.083-.12.003-.004.003-.004.081-.12.003-.005.003-.004.08-.121.003-.005.003-.004.078-.122.003-.005.003-.004.077-.123.002-.005.003-.004.075-.124.003-.005.003-.004.073-.125.003-.005.003-.004.072-.126.002-.004.003-.005.07-.126.003-.005.002-.005.07-.127.002-.004.002-.005.068-.128.002-.005.002-.004.066-.13.003-.004.002-.005.064-.13.002-.004.003-.005.062-.13.002-.005.003-.005.06-.13.003-.005.002-.005.06-.132.002-.005.002-.005.057-.132.003-.005.002-.005.056-.133.002-.005.002-.005.054-.134.002-.004.002-.005.053-.135.002-.005.002-.005.051-.135.002-.005.002-.005.05-.135.001-.005.002-.005.048-.137.001-.005.002-.005.046-.137.002-.005.002-.005.044-.137.002-.005.002-.005.042-.138.002-.005.001-.006.042-.138.001-.005.002-.005.04-.14V19.4l.002-.005.038-.14.001-.005.002-.005.036-.14.001-.005.001-.005.035-.141.001-.005.001-.005.033-.142.001-.005.001-.005.031-.141.001-.006.002-.005.029-.142v-.005l.002-.005.028-.143v-.005l.002-.005.025-.143.001-.006.001-.005.024-.143.001-.005.001-.006.001-.006.01-.161-.02-.16-.05-.154-.077-.141-.102-.125-.123-.104-.141-.079-.153-.051-.16-.022ZM6.841 22.71l-.16.024-.152.053-.14.08-.122.105-.101.126-.076.142-.048.154-.018.16.011.161.041.156.07.146.077.109.04.048.003.004.003.004.095.111.003.004.004.004.096.11.004.005.003.004.098.109.003.004.004.004.1.108.003.004.003.004.101.107.004.004.003.004.102.105.004.004.004.004.103.105.004.004.004.003.105.104.003.004.004.003.106.102.004.004.004.004.107.1.004.004.004.004.108.099.004.003.004.004.11.098.003.003.004.004.11.096.004.003.005.004.11.095.005.003.004.004.113.093.004.003.004.004.113.091.004.004.005.003.114.09.004.004.004.003.116.089.004.003.004.003.117.088.004.003.004.003.118.086.004.003.005.003.118.084.004.003.005.003.119.083.004.003.005.003.12.081.005.003.004.003.121.08.005.003.004.003.122.078.005.003.004.003.123.076.005.003.004.003.124.075.005.003.004.003.125.073.004.003.005.002.126.073.004.002.005.003.126.07.005.003.004.002.128.07.004.002.005.002.128.067.005.003.004.002.13.066.004.002.005.003.13.064.004.002.005.003.13.062.005.002.004.003.132.06.004.003.005.002.132.06.005.002.005.002.132.057.005.002.005.002.133.057.005.002.005.002.133.054.005.002.005.002.13.05.154.045.16.016.16-.015.156-.045.144-.072.128-.098.108-.12.083-.138.057-.15.028-.16-.003-.16-.032-.159-.061-.149-.088-.135-.11-.117-.132-.094-.12-.058-.124-.049-.126-.051-.122-.051-.122-.054-.12-.054-.126-.058-.119-.057-.12-.06-.12-.06-.118-.063-.117-.064-.119-.066-.116-.066-.115-.068-.115-.07-.113-.07-.115-.074-.112-.074-.11-.075-.11-.076-.112-.08-.11-.08-.109-.081-.106-.082-.104-.082-.106-.086-.105-.087-.101-.086-.105-.091-.1-.09-.1-.091-.1-.094-.097-.094-.1-.098-.093-.095-.096-.1-.093-.098-.092-.101-.089-.1-.09-.102-.088-.104-.036-.043-.114-.114-.133-.091-.148-.065-.157-.036-.161-.006Zm15.063 2.701-.16.014-.156.044-.12.057-.06.034-.12.066-.117.064-.118.062-.12.061-.12.06-.118.057-.126.058-.12.054-.122.054-.122.05-.126.052-.125.05-.124.046-.127.047-.125.044-.129.043-.126.04-.13.042-.128.038-.127.035-.13.036-.131.034-.129.031-.132.03-.13.03-.135.027-.133.026-.13.023-.13.022-.137.021-.132.02-.134.017-.132.015-.138.015-.135.013-.133.01-.138.01-.136.007-.134.006-.136.004-.14.003-.16.018-.155.047-.142.076-.127.1-.105.122-.08.14-.054.151-.025.16.006.16.035.158.064.148.09.134.114.114.133.092.147.065.157.036.134.008.145-.002h.011l.147-.005h.01l.147-.007h.011l.146-.009h.011l.146-.01h.005l.005-.001.146-.012h.011l.145-.014h.005l.006-.001.145-.016h.011l.144-.018h.006l.005-.001.144-.02h.011l.144-.021.005-.001h.006l.143-.023.006-.001h.005l.143-.025h.005l.006-.002.143-.026h.005l.005-.002.143-.027.005-.001.005-.001.142-.03h.005l.005-.002.142-.03.005-.002.005-.001.142-.033.005-.001.005-.001.14-.035.006-.001.005-.001.14-.037h.005l.005-.002.14-.038.005-.002h.005l.14-.04.005-.002.005-.001.138-.042.005-.001.006-.002.138-.043.005-.001.005-.002.137-.044.005-.002.005-.002.137-.046.005-.002.005-.001.137-.048.005-.002.005-.002.135-.05.005-.001.005-.002.135-.051.005-.002.005-.002.135-.053.005-.002.004-.002.134-.054.005-.002.005-.002.133-.057.005-.002.005-.002.132-.057.005-.003.005-.002.132-.06.005-.001.004-.002.131-.061.005-.003.005-.002.13-.062.005-.003.005-.002.13-.064.004-.003.005-.002.128-.066.005-.002.005-.003.128-.067.005-.002.004-.003.127-.069.005-.002.005-.003.126-.07.005-.003.004-.003.065-.037.132-.093.112-.115.089-.135.062-.149.034-.157.003-.161-.026-.16-.055-.15-.082-.14-.107-.12-.127-.1-.144-.073-.154-.046-.16-.016ZM6.33 26.818l-.16.023-.152.053-.14.08-.122.105-.101.126-.076.142-.048.154-.02.16.012.161.041.156.07.146.094.13.096.093.032.026.004.003.004.004.145.117.004.003.004.004.146.115.005.003.004.004.147.113.005.003.004.004.149.111.004.003.004.003.15.11.005.003.004.003.151.108.004.003.005.003.152.106.005.003.004.003.154.104.004.003.005.003.154.102.005.002.004.003.156.1.005.003.004.003.157.098.005.003.004.002.159.096.004.003.005.003.16.094.004.003.004.002.16.092.005.003.005.002.161.09.005.003.005.002.162.088.005.003.004.002.164.086.005.003.004.002.165.084.005.003.004.002.166.082.004.002.005.003.167.08.004.002.005.002.168.078.004.002.005.002.168.076.005.002.005.002.17.074.004.002.005.002.17.072.005.002.005.002.17.07.006.002.005.001.171.068.005.002.005.002.173.065.005.002.005.002.173.063.005.002.005.002.174.06.005.003.005.001.175.06.005.001.005.002.176.057.005.001.005.002.176.055.006.001.005.002.177.052.005.002.005.001.178.05.005.002.005.002.178.048.006.001.005.002.179.046.005.001.005.002.18.044h.005l.005.002.18.042.006.001.005.001.159.035.16.02.16-.01.157-.04.146-.069.13-.094.112-.117.087-.136.06-.149.033-.158.002-.161-.028-.159-.057-.15-.084-.138-.108-.12-.128-.098-.144-.072-.128-.039-.154-.033-.168-.04-.171-.041-.17-.044-.168-.046-.167-.047-.168-.05-.165-.051-.166-.054-.166-.056-.163-.057-.165-.06-.161-.062-.164-.064-.16-.065-.16-.068-.162-.07-.157-.07-.157-.074-.157-.075-.156-.077-.153-.079-.156-.082-.153-.082-.154-.086-.15-.086-.152-.09-.148-.09-.147-.092-.149-.095-.145-.095-.144-.098-.145-.1-.143-.102-.14-.103-.14-.104-.14-.108-.139-.11-.136-.11-.027-.022-.133-.091-.148-.065-.157-.036-.161-.006Zm19.215.087-.16.01-.157.039-.146.067-.11.076-.064.051-.139.11-.14.108-.14.104-.14.103-.143.101-.145.101-.144.098-.145.095-.149.095-.148.093-.147.089-.152.09-.15.086-.154.086-.153.082-.156.082-.153.079-.156.077-.157.075-.158.073-.157.071-.16.07-.16.068-.161.065-.164.064-.161.061-.165.06-.163.058-.166.056-.166.054-.166.051-.167.05-.167.047-.17.046-.168.044-.171.042-.168.039-.17.037-.11.023-.154.047-.143.075-.126.1-.106.122-.081.139-.054.152-.025.16.006.16.035.158.063.148.09.133.114.115.132.092.148.065.157.037.16.007.133-.016.115-.024.005-.001.005-.001.181-.04h.005l.005-.002.18-.042.006-.001.005-.001.18-.044.005-.002.005-.001.18-.046.004-.002h.005l.179-.05h.005l.005-.002.178-.05.005-.002.005-.002.177-.052.005-.002.005-.001.177-.055.005-.002.005-.001.176-.057.005-.002.005-.002.175-.059.005-.001.005-.002.174-.061.005-.002.005-.002.173-.063.005-.002.005-.002.173-.065.004-.002.005-.002.172-.068.005-.002.005-.002.171-.07.005-.001.005-.002.17-.072.005-.002.004-.002.17-.074.005-.002.004-.002.169-.076.004-.002.005-.002.168-.078.004-.002.005-.003.167-.08.004-.002.005-.002.166-.082.004-.002.005-.003.165-.084.004-.002.005-.003.163-.086.005-.002.005-.003.162-.088.005-.002.005-.003.161-.09.005-.002.004-.003.16-.092.005-.003.005-.002.16-.094.004-.003.004-.003.158-.096.005-.002.004-.003.158-.098.004-.003.005-.003.156-.1.004-.003.004-.003.155-.101.005-.003.004-.003.154-.104.004-.003.004-.003.153-.106.004-.003.005-.003.151-.108.004-.003.005-.003.15-.11.004-.003.004-.003.149-.112.004-.003.004-.003.148-.113.004-.004.004-.003.147-.115.004-.004.004-.003.068-.055.116-.113.092-.132.066-.147.038-.157.008-.16-.022-.16-.05-.153-.08-.14-.103-.125-.124-.102-.142-.077-.153-.05-.16-.02Z" opacity=".98" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-non-interrupting-signal"><path d="M16.012 8.816 9.21 21.026h13.606l-6.803-12.21Zm0 1.776 5.332 9.57H10.681l5.331-9.57Zm0-10.281c-1.448.02-2.93.157-4.302.628-.852.447-.255 1.863.66 1.574 2.255-.608 4.648-.607 6.922-.108.934.075 1.228-1.376.338-1.67C18.451.44 17.227.317 16.012.311Zm9.012 2.934c-.913-.104-1.272 1.258-.454 1.648 1.834 1.36 3.293 3.185 4.31 5.22.526.776 1.842.098 1.515-.78a15.522 15.522 0 0 0-5.06-6.006c-.1-.044-.203-.07-.31-.082ZM6.65 3.59c-.762.089-1.24.809-1.805 1.267C3.38 6.295 2.163 8.007 1.37 9.905c-.266.898 1.094 1.484 1.564.675a14.825 14.825 0 0 1 4.327-5.56c.476-.515.09-1.419-.612-1.431Zm9.362.007c-.698.066-1.689-.16-2.033.635-.282.733.535 1.358 1.217 1.125 1.806-.147 3.63.203 5.293.907.902.255 1.472-1.112.656-1.573-1.6-.735-3.374-1.089-5.133-1.094Zm-5.479 1.365c-.835.15-1.517.76-2.21 1.226-1.203.94-2.318 2.061-3.057 3.402-.33.904 1.063 1.552 1.547.723 1.045-1.656 2.596-2.925 4.285-3.873.545-.499.171-1.463-.565-1.478Zm13.903 2.115c-.875-.07-1.22 1.173-.501 1.627 1.325 1.34 2.188 3.062 2.748 4.84.468.84 1.869.21 1.557-.699-.604-2.118-1.751-4.097-3.351-5.615a.93.93 0 0 0-.453-.153ZM4.467 13.132c-.822-.07-.996.826-1.046 1.455-.256 1.93-.094 3.933.562 5.769.406.844 1.807.365 1.612-.551a11.498 11.498 0 0 1-.334-5.808.874.874 0 0 0-.794-.865Zm26.687 1.6c-.746-.037-1.014.785-.879 1.395.043 2.393-.57 4.771-1.66 6.894-.31.884 1.02 1.536 1.53.75a15.632 15.632 0 0 0 1.821-8.372.876.876 0 0 0-.812-.667Zm-30.197.571c-.782-.073-1.044.775-.933 1.404.068 2.414.661 4.833 1.809 6.962.534.77 1.842.076 1.505-.798a14.833 14.833 0 0 1-1.603-6.861.876.876 0 0 0-.778-.707Zm26.787 2.024c-.777-.048-.952.797-1.021 1.392-.354 1.692-1.202 3.231-2.216 4.608-.407.872.925 1.638 1.48.852 1.361-1.733 2.296-3.827 2.582-6.017a.874.874 0 0 0-.825-.835ZM6.857 23.012c-.808.018-1.082 1.122-.47 1.59 1.393 1.607 3.187 2.886 5.194 3.599.91.222 1.43-1.165.598-1.596a11.495 11.495 0 0 1-4.723-3.396.899.899 0 0 0-.599-.197Zm15.057 2.7c-.81.194-1.504.76-2.325.972-1.203.458-2.5.536-3.758.664-.869.307-.573 1.728.346 1.663 2.201-.034 4.412-.626 6.293-1.778.604-.495.227-1.532-.556-1.521ZM6.346 27.118c-.833.008-1.11 1.218-.395 1.617 1.986 1.602 4.358 2.749 6.868 3.226.933.076 1.227-1.376.338-1.67a14.838 14.838 0 0 1-6.345-3.066.929.929 0 0 0-.466-.107Zm19.208.087c-.766.09-1.241.841-1.922 1.158-1.516.991-3.251 1.58-4.996 2.005-.872.405-.346 1.849.584 1.604 2.543-.526 4.98-1.66 6.963-3.344.47-.52.072-1.42-.63-1.423Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-non-interrupting-timer"><path d="M15.998 8.406c-3.018-.041-5.92 1.926-7.031 4.727-1.138 2.695-.51 6.012 1.537 8.103 1.99 2.141 5.268 2.93 8.014 1.927 2.878-.98 4.992-3.827 5.068-6.87.153-2.957-1.624-5.88-4.3-7.137a7.552 7.552 0 0 0-3.288-.75Zm0 1.384c2.759-.052 5.373 1.973 6.015 4.655.704 2.578-.482 5.517-2.791 6.867-2.358 1.48-5.682 1.086-7.618-.918-2.043-1.971-2.407-5.381-.84-7.745 1.11-1.763 3.15-2.88 5.234-2.86Zm1.962 1.765-2.074 3.762c-.64.068-.793 1.04-.202 1.3.39.27.696-.18 1.052-.165h3.17v-.865h-3.182l1.993-3.615c-.252-.14-.505-.278-.757-.417Zm-1.965-8.268h-.158l-.147.003h-.011l-.147.005h-.011l-.146.007h-.011l-.146.009h-.011l-.146.01h-.005l-.005.001-.146.012h-.011l-.145.014h-.006l-.005.001-.05.006-.158.031-.15.06-.135.088-.117.111-.094.13-.069.147-.04.156-.01.16.019.16.049.154.076.142.102.125.123.105.14.08.152.051.16.023.134-.003.045-.005.135-.013.133-.01.136-.01.135-.007.137-.006.136-.004.136-.003h.274l.136.003.136.004.136.006.136.007.136.01.133.01.135.013.135.014.135.016.134.018.132.018.134.021.133.023.133.024.133.025.13.027.132.03.132.03.129.031.13.034.129.035.129.036.13.04.126.038.128.042.126.042.128.045.127.047.126.048.12.047.127.051.123.052.006.002.147.048.16.021.16-.009.157-.038.147-.067.131-.093.112-.116.089-.135.062-.149.033-.158.004-.16-.027-.16-.055-.151-.083-.138-.107-.121-.127-.099-.118-.063-.004-.001-.005-.003-.005-.002-.133-.056-.005-.002-.005-.002-.134-.054-.004-.002-.005-.002-.135-.053-.005-.002-.005-.002-.135-.051-.005-.002-.005-.002-.135-.05-.005-.001-.005-.002-.137-.048-.005-.001-.005-.002-.137-.046-.005-.002-.005-.002-.137-.044-.005-.002-.005-.001-.138-.043-.005-.002-.006-.001-.138-.042-.005-.001-.005-.002-.14-.04H19.4l-.005-.002-.14-.038-.005-.001-.005-.002-.14-.036-.005-.001-.005-.001-.141-.035-.005-.001-.005-.001-.142-.033-.005-.001-.005-.001-.141-.031-.006-.002h-.005l-.142-.03-.005-.001-.005-.001-.143-.028h-.005l-.005-.001-.143-.026-.006-.001-.005-.001-.143-.024-.005-.001-.006-.001-.143-.022-.006-.001h-.005l-.144-.022h-.005l-.006-.001-.144-.019h-.005l-.006-.001-.144-.017h-.006l-.005-.001-.145-.016h-.011l-.145-.014H17.1l-.005-.001-.146-.012h-.01l-.146-.01-.006-.001h-.005l-.146-.009h-.011l-.147-.006h-.01l-.147-.005h-.011l-.147-.003h-.01l-.148-.001h-.01ZM10.357 4.66l-.156.037-.123.053-.06.032-.005.002-.004.003-.128.069-.004.002-.005.003-.126.07-.005.003-.004.002-.126.072-.005.003-.004.003-.125.073-.004.003-.005.003-.124.075-.004.003-.005.002-.123.077-.004.003-.005.003-.122.078-.004.003-.005.003-.121.08-.004.002-.005.003-.12.082-.005.003-.004.003-.12.083-.004.003-.004.003-.118.084-.005.003-.004.003-.118.086-.004.003-.004.003-.117.088-.004.003-.004.003-.116.089-.004.003-.004.004-.114.09-.005.003-.004.003-.113.092-.004.004-.004.003-.113.093-.004.004-.004.003-.111.095-.004.003-.005.004-.11.096-.004.004-.004.003-.109.098-.004.003-.004.004-.108.1-.004.003-.004.003-.107.101-.004.004-.004.003-.106.102-.003.004-.004.004-.105.103-.004.004-.004.004-.103.105-.004.004-.004.003-.102.106-.003.004-.004.004-.1.107-.004.004-.004.004-.099.108-.004.004-.003.004-.098.11-.003.003-.004.004-.096.11-.004.005-.003.004-.095.111-.003.004-.004.004-.093.113-.003.004-.004.004-.092.113-.003.004-.003.005-.09.114-.004.004-.003.004-.089.116-.003.004-.003.004-.088.117-.003.004-.003.005-.086.117-.003.004-.003.005-.084.118-.003.004-.003.005-.083.12-.003.003-.003.005-.082.12-.003.005-.002.004-.068.103-.076.142-.048.154-.018.16.011.161.041.156.07.146.095.13.117.11.136.086.15.06.158.03.162.002.158-.029.15-.058.138-.085.119-.108.082-.106.065-.099.075-.11.077-.113.077-.107.08-.11.08-.108.084-.108.083-.105.086-.106.086-.104.088-.104.089-.101.09-.102.093-.101.093-.099.094-.097.095-.096.098-.097.098-.095.099-.093.1-.092.103-.091.101-.089.104-.088.104-.086.106-.086.106-.083.106-.082.109-.082.108-.079.11-.078.11-.076.112-.076.112-.074.113-.072.113-.071.115-.07.115-.068.118-.067.117-.065.12-.065.054-.029.135-.088.116-.111.094-.132.068-.146.04-.156.009-.161-.02-.16-.05-.153-.078-.142-.102-.125-.123-.103-.141-.079-.153-.051-.16-.022-.16.008Zm13.91 2.116-.158.037-.147.066-.132.092-.113.116-.09.134-.063.148-.034.157-.005.162.026.159.054.152.082.139.086.102.09.09.094.098.093.099.092.1.091.103.089.101.088.104.086.104.086.106.083.105.083.108.08.108.081.11.077.107.077.112.075.111.075.114.072.113.071.113.07.115.068.117.067.115.065.118.064.117.062.118.061.12.059.119.059.122.056.121.054.12.055.125.051.123.051.125.048.123.049.127.046.126.044.125.043.128.042.129.039.126.038.13.022.076.058.15.086.137.109.119.129.096.145.07.155.043.16.013.161-.017.155-.046.143-.074.126-.1.106-.122.082-.138.055-.152.025-.16-.005-.16-.026-.132-.023-.082-.002-.005-.001-.005-.042-.139-.001-.005-.002-.005-.043-.138-.001-.005-.002-.005-.044-.137-.002-.005-.002-.005-.046-.137-.002-.005-.001-.005-.048-.137-.002-.005-.002-.005-.05-.135-.001-.005-.002-.005-.051-.135-.002-.005-.002-.005-.053-.135-.002-.005-.002-.005-.054-.133-.002-.005-.002-.005-.057-.133-.002-.005-.002-.005-.057-.132-.003-.005-.002-.005-.059-.132-.002-.005-.002-.004-.061-.132-.003-.004-.002-.005-.062-.13-.003-.005-.002-.005-.064-.13-.003-.004-.002-.005-.066-.129-.002-.004-.003-.005-.067-.128-.002-.005-.003-.004-.069-.128-.002-.004-.003-.005-.07-.126-.003-.005-.003-.004-.072-.126-.002-.005-.003-.004-.073-.125-.003-.004-.003-.005-.075-.124-.003-.004-.003-.005-.076-.123-.003-.004-.003-.005-.078-.122-.003-.004-.003-.005-.08-.121-.003-.004-.003-.005-.08-.12-.004-.005-.003-.004-.083-.12-.003-.004-.003-.004-.084-.118-.003-.005-.003-.004-.086-.117-.003-.005-.003-.004-.088-.117-.003-.004-.003-.004-.09-.116-.002-.004-.004-.004-.09-.114-.003-.005-.004-.004-.091-.113-.004-.004-.003-.004-.093-.113-.004-.004-.003-.004-.095-.111-.004-.004-.003-.004-.096-.11-.004-.005-.003-.004-.098-.109-.004-.004-.003-.004-.1-.108-.003-.004-.004-.004-.1-.107-.004-.004-.004-.004-.102-.106-.003-.003-.004-.004-.093-.095-.124-.103-.14-.08-.153-.05-.16-.023-.16.008ZM4.288 12.828l-.158.032-.15.06-.135.088-.117.11-.095.131-.069.146-.035.129-.026.132v.005l-.002.005-.025.143-.001.005-.001.006-.024.143-.001.005-.001.006-.022.143-.001.006-.001.005-.02.144-.001.005-.001.006-.019.144v.005l-.001.006-.017.144v.006l-.001.005-.016.145v.011l-.014.145v.006l-.001.005-.012.146v.01l-.01.146-.001.006v.005l-.009.146v.011l-.007.146v.011l-.004.147v.011l-.003.147v.01l-.002.148v.01l.001.148v.01l.003.147v.011l.005.147v.01l.007.147v.011l.009.146v.011l.01.146v.01l.013.146v.011l.014.145v.005l.001.006.016.145v.011l.018.144v.006l.001.005.019.144v.006l.001.005.021.144v.005l.002.006.022.143v.006l.002.005.024.143v.005l.002.006.025.143.001.005.001.005.028.143.001.005.001.005.03.142v.005l.002.006.03.141.002.005.001.006.033.14v.006l.002.005.035.14v.006l.002.005.036.14.002.005.001.005.038.14.001.005.002.005.04.14v.005l.002.005.042.138.001.006.002.005.042.138.002.005.002.005.017.054.064.148.09.134.114.114.132.092.148.065.157.037.16.007.16-.023.153-.052.14-.08.123-.103.102-.126.076-.142.049-.153.02-.16-.01-.161-.032-.13-.017-.051-.039-.126-.038-.13-.037-.128-.035-.13-.033-.128-.033-.134-.03-.13-.029-.131-.026-.13-.026-.132-.024-.134-.023-.133-.02-.132-.02-.136-.017-.132-.016-.135-.014-.135-.012-.133-.012-.138-.009-.133-.007-.136-.006-.138-.004-.134-.003-.136v-.274l.003-.136.004-.134.006-.139.007-.136.01-.132.01-.139.013-.132.014-.135.016-.135.017-.132.02-.137.02-.13.023-.134.024-.133.024-.126.016-.16-.014-.161-.044-.155-.072-.145-.098-.128-.12-.108-.137-.084-.15-.057-.16-.029-.16.002Zm23.286 4.202-.156.038-.148.066-.132.092-.113.115-.09.134-.062.148-.03.127-.001.004-.023.134-.024.134-.026.132-.026.13-.03.132-.03.129-.032.134-.033.128-.035.13-.037.128-.038.13-.04.126-.04.128-.044.128-.044.126-.046.126-.048.126-.05.125-.05.125-.051.122-.054.123-.055.122-.056.12-.058.122-.06.12-.061.12-.062.119-.063.116-.067.119-.066.116-.068.115-.07.115-.07.113-.073.113-.074.112-.076.113-.077.112-.077.107-.08.11-.08.108-.085.109-.044.056-.088.135-.06.15-.033.158-.002.16.027.16.057.15.083.138.108.12.128.098.144.072.155.045.16.015.161-.016.155-.044.144-.073.128-.098.09-.099.05-.061.003-.004.003-.005.089-.115.003-.004.003-.005.088-.116.003-.004.003-.005.086-.117.003-.004.003-.005.084-.118.003-.004.003-.005.083-.12.003-.004.003-.004.082-.12.003-.005.002-.004.08-.121.003-.005.003-.004.078-.122.003-.005.003-.004.077-.123.002-.005.003-.004.075-.124.003-.005.003-.004.073-.125.003-.004.003-.005.072-.126.002-.004.003-.005.07-.126.003-.005.002-.005.07-.127.002-.004.002-.005.068-.128.002-.005.002-.004.066-.13.003-.004.002-.005.064-.13.002-.004.003-.005.062-.13.003-.005.002-.005.06-.13.003-.005.002-.005.06-.132.002-.005.002-.005.057-.132.003-.005.002-.005.056-.133.002-.005.002-.005.054-.134.002-.004.002-.005.053-.135.002-.005.002-.005.051-.135.002-.005.002-.005.05-.135.001-.005.002-.005.048-.137.001-.005.002-.005.046-.137.002-.005.002-.005.044-.137.002-.005.002-.005.042-.138.002-.005.002-.006.04-.138.002-.005.002-.005.04-.14V19.4l.002-.005.038-.14.001-.005.002-.005.036-.14.001-.005.001-.005.035-.141.001-.005.001-.005.033-.141.001-.006.001-.005.031-.141.002-.006v-.005l.03-.142.001-.005.001-.005.028-.143v-.005l.002-.005.025-.143.001-.006.001-.005.024-.143.001-.005.001-.006.001-.006.01-.161-.02-.16-.05-.154-.077-.141-.102-.125-.123-.104-.141-.079-.153-.051-.16-.022-.16.007ZM6.681 22.734l-.152.053-.14.08-.122.105-.101.126-.076.142-.048.154-.018.16.011.161.041.156.07.146.077.11.04.047.003.004.003.004.095.111.003.004.004.004.096.11.004.005.003.004.098.109.003.004.004.004.1.108.003.004.003.004.101.107.004.004.003.004.102.106.004.003.004.004.103.105.004.004.004.004.105.103.004.004.003.003.106.102.004.004.004.004.107.1.004.004.004.004.108.099.004.003.004.004.11.098.003.003.004.004.11.096.005.004.004.003.11.095.005.003.004.004.113.093.004.003.004.004.113.091.004.004.005.003.114.09.004.004.004.003.116.089.004.003.004.003.117.088.004.003.004.003.118.086.004.003.005.003.118.084.004.003.005.003.119.083.004.003.005.003.12.081.005.003.004.003.121.08.005.003.004.003.122.078.005.003.004.003.123.076.005.003.004.003.124.075.005.003.004.003.125.073.004.003.005.003.126.072.004.002.005.003.126.07.005.003.004.002.128.07.004.002.005.002.128.068.005.002.004.002.13.066.004.003.005.002.13.064.004.002.005.003.13.062.005.002.004.003.132.06.004.003.005.002.132.06.005.002.005.002.132.057.005.002.005.003.133.056.005.002.005.002.133.054.005.002.005.002.13.05.154.045.16.016.161-.015.155-.045.144-.072.128-.098.108-.12.083-.138.057-.15.028-.16-.003-.16-.032-.158-.061-.15-.088-.135-.11-.117-.132-.094-.12-.058-.124-.049-.126-.051-.122-.051-.122-.054-.12-.054-.126-.058-.119-.057-.12-.06-.12-.06-.118-.063-.117-.064-.119-.066-.116-.066-.115-.068-.115-.07-.113-.07-.115-.074-.112-.074-.11-.075-.11-.076-.112-.079-.11-.08-.109-.082-.106-.082-.104-.082-.106-.086-.105-.087-.101-.086-.105-.091-.1-.09-.1-.091-.1-.094-.097-.094-.1-.098-.093-.095-.096-.1-.093-.098-.092-.101-.089-.1-.09-.102-.088-.104-.036-.043-.114-.114-.133-.091-.148-.065-.157-.036-.161-.006-.16.024Zm15.063 2.691-.156.044-.12.057-.06.034-.12.066-.116.064-.119.062-.12.061-.12.06-.118.057-.126.058-.12.054-.122.054-.122.05-.126.052-.125.05-.124.046-.127.047-.125.044-.129.043-.126.04-.13.042-.128.038-.127.036-.13.035-.131.034-.129.031-.132.03-.13.03-.135.027-.133.026-.13.023-.13.022-.137.021-.132.02-.134.017-.132.015-.138.015-.135.013-.133.01-.138.01-.136.007-.134.006-.136.004-.14.003-.16.018-.155.047-.142.076-.127.1-.105.122-.08.14-.054.151-.025.16.006.16.035.158.064.148.09.134.114.114.133.092.147.065.157.036.134.008.145-.002h.011l.147-.005h.01l.147-.007h.011l.146-.009h.011l.146-.01h.005l.005-.001.146-.012h.011l.145-.014h.005l.006-.001.145-.016h.011l.144-.018h.006l.005-.001.144-.02h.011l.144-.021h.005l.006-.002.143-.022h.006l.005-.002.143-.024h.005l.006-.002.143-.026h.005l.005-.002.143-.027.005-.001.005-.001.142-.03h.005l.005-.002.142-.03.005-.002.005-.001.142-.033.005-.001.005-.001.14-.035.006-.001.005-.001.14-.036.005-.002.005-.001.14-.038.005-.001.005-.002.14-.04h.005l.005-.002.138-.042.005-.001.006-.002.138-.043.005-.001.005-.002.137-.044.005-.002.005-.002.137-.046.005-.002.005-.001.137-.048.005-.002.005-.002.135-.05.005-.001.005-.002.135-.051.005-.002.005-.002.135-.053.005-.002.004-.002.134-.054.005-.002.005-.002.133-.056.005-.003.005-.002.132-.057.005-.002.005-.003.132-.059.005-.002.004-.002.131-.061.005-.003.005-.002.13-.062.005-.003.005-.002.13-.064.004-.002.005-.003.129-.066.004-.002.005-.003.128-.067.005-.002.004-.003.127-.069.005-.002.005-.003.126-.07.005-.003.004-.002.065-.038.132-.093.112-.115.089-.135.062-.149.034-.157.004-.161-.027-.16-.055-.15-.082-.14-.107-.12-.127-.1-.144-.073-.154-.045-.16-.017-.161.014ZM15.994 0l-.187.001h-.011l-.188.004h-.011l-.187.006h-.011l-.187.008h-.005L15.2.02l-.187.01h-.005l-.005.001-.187.013h-.01L14.62.06h-.01l-.186.018h-.011l-.185.02-.005.001h-.006l-.185.022-.005.001h-.005l-.185.025h-.005l-.005.001-.184.027h-.006l-.005.001-.184.029h-.005l-.005.001-.183.031-.005.001-.006.001-.182.033-.006.001-.005.001-.182.035-.005.001-.005.001-.182.038h-.005l-.005.002-.181.04h-.005l-.005.002-.18.042-.006.001-.005.001-.18.044-.005.002h-.005l-.17.045-.152.054-.139.082-.121.106-.1.127-.074.143-.046.155-.017.16.013.16.043.156.07.145.097.13.119.108.137.085.15.058.159.03.16-.001.133-.023.165-.043.168-.041.171-.04.171-.037.172-.036.17-.033.173-.03.17-.03.177-.027.171-.025.175-.022.175-.02.175-.02.176-.016.175-.014.177-.012.176-.01.177-.007.174-.006.177-.003L16 1.73h.177l.178.004.174.006.177.007.176.01.177.012.175.014.176.017.175.018.175.02.175.023.171.025.177.027.17.03.173.03.17.033.171.036.154.033.16.02.161-.01.156-.04.146-.069.131-.094.111-.117.088-.135.06-.15.032-.158.002-.16-.027-.16-.057-.15L20 .714l-.108-.12-.128-.097-.144-.073-.129-.038-.158-.035-.005-.001-.005-.001L19.14.31h-.005l-.005-.002-.182-.035h-.006l-.005-.002-.182-.033h-.006l-.005-.002-.183-.03-.005-.001-.005-.001-.184-.029h-.005l-.006-.001-.184-.027h-.005l-.005-.001-.185-.024h-.005L17.968.12 17.783.1l-.006-.001h-.005l-.185-.02h-.006l-.005-.001L17.39.06 17.385.06h-.005l-.187-.015h-.005l-.005-.001-.187-.013h-.01L16.799.02h-.011L16.6.01h-.011l-.187-.006h-.011L16.204 0h-.011L16.005 0h-.01Zm8.86 2.939-.157.033-.15.062-.134.09-.116.111-.093.132-.067.147-.038.156-.01.161.022.16.05.153.078.141.103.124.102.087.045.034.142.106.137.105.14.11.136.11.135.112.134.115.134.117.13.115.132.122.128.12.127.122.127.125.123.126.124.128.121.13.118.128.118.132.117.133.113.134.113.136.11.136.109.137.109.142.104.14.103.14.101.142.1.144.099.146.095.145.094.147.093.15.092.15.087.149.087.15.085.152.083.155.08.152.08.155.04.081.084.138.11.119.128.096.145.072.155.043.16.013.161-.016.155-.046.143-.074.127-.099.106-.12.083-.14.055-.151.026-.16-.004-.16-.034-.158-.05-.124-.042-.085-.002-.004-.003-.005-.084-.165-.002-.004-.003-.005-.086-.164-.002-.004-.003-.005-.088-.162-.002-.005-.003-.005-.09-.161-.002-.005-.003-.004-.092-.16-.002-.005-.003-.005-.094-.16-.003-.004-.003-.004-.096-.159-.002-.004-.003-.005-.098-.157-.003-.004-.003-.005-.1-.156-.003-.004-.002-.005-.102-.154-.003-.005-.003-.004-.104-.154-.003-.004-.003-.005-.106-.152-.003-.004-.003-.005-.108-.151-.003-.004-.003-.005-.11-.15-.003-.004-.003-.004-.111-.15-.004-.003-.003-.005-.113-.147-.004-.004-.003-.005-.115-.146-.004-.004-.003-.004-.117-.145-.004-.004-.003-.004-.12-.144-.003-.004-.003-.004-.121-.142-.003-.004-.004-.004-.123-.141-.003-.004-.004-.004-.125-.14-.003-.004-.004-.004-.127-.138-.003-.004-.004-.004-.128-.136-.004-.004-.004-.004-.13-.135-.004-.004-.003-.004-.133-.134-.003-.004-.004-.003-.134-.133-.004-.003-.004-.004-.135-.13-.004-.004-.004-.004-.136-.128-.004-.004-.004-.004-.138-.126-.004-.004-.004-.003-.14-.125-.004-.004-.004-.003-.14-.123-.005-.004-.004-.003-.142-.121-.004-.004-.004-.003-.144-.12-.004-.003-.004-.003-.145-.117-.004-.004-.004-.003-.147-.115-.004-.004-.004-.003-.148-.113-.004-.003-.004-.004-.149-.111-.004-.003-.004-.004-.05-.036-.14-.083-.15-.055-.16-.027-.16.004Zm-18.381.348-.157.037-.147.066-.111.074-.04.032-.005.003-.004.004-.145.117-.004.003-.004.004-.144.119-.004.003-.004.004-.142.12-.004.004-.004.004-.141.123-.004.003-.004.004-.14.125-.004.003-.004.004-.138.126-.004.004-.004.004-.136.128-.004.004-.004.004-.135.13-.004.004-.004.003-.134.133-.004.003-.004.004-.132.134-.003.004-.004.004-.13.135-.004.004-.004.004-.128.136-.004.004-.004.004-.126.138-.004.004-.003.004-.125.14-.004.004-.003.004-.123.14-.004.005-.003.004-.121.142-.004.004-.003.004-.12.144-.003.004-.003.004-.117.145-.004.004-.003.004-.115.146-.004.005-.003.004-.113.147-.003.005-.004.004-.111.149-.003.004-.004.004-.11.15-.002.005-.003.004-.108.151-.003.005-.003.004-.106.152-.003.005-.003.004-.104.154-.003.004-.003.005-.102.154-.003.005-.002.004-.1.156-.003.005-.003.004-.098.157-.003.005-.003.004-.096.159-.002.004-.003.005-.094.16-.003.004-.002.004-.092.16-.003.005-.003.005-.09.161-.002.005-.003.005-.088.162-.002.005-.003.004-.086.164-.002.005-.002.004-.084.165-.003.005-.002.004-.082.166-.002.005-.003.004-.08.167-.002.004-.002.005-.078.168-.002.004-.002.005-.045.1-.053.153-.023.16.007.16.037.157.065.148.092.132.114.114.134.09.148.064.157.035.161.006.16-.025.152-.054.14-.08.121-.106.1-.126.065-.118.043-.095.074-.16.075-.155.077-.157.08-.155.08-.152.083-.155.085-.152.086-.15.088-.149.091-.15.094-.15.094-.147.095-.145.099-.146.1-.144.1-.142.104-.14.104-.14.11-.142.107-.137.11-.136.114-.136.113-.134.117-.133.118-.132.117-.129.122-.13.124-.127.123-.126.127-.125.127-.122.128-.12.132-.122.13-.115.133-.117.135-.115.135-.111.136-.11.037-.03.117-.11.094-.132.068-.146.04-.156.01-.161-.02-.16-.05-.154-.076-.141-.102-.125-.123-.104-.14-.08-.153-.051-.16-.023-.161.008Zm24.514 11.15-.157.04-.146.067-.131.093-.112.117-.088.135-.061.149-.033.157-.005.134.006.14.006.176.003.177.001.178-.001.177-.003.178-.006.177-.007.176-.01.177-.012.176-.015.176-.016.173-.018.175-.02.175-.024.174-.024.175-.027.17-.03.174-.03.173-.033.17-.036.172-.037.17-.04.17-.042.172-.043.168-.045.166-.048.169-.05.167-.052.168-.053.164-.056.166-.058.166-.06.161-.061.164-.063.158-.066.165-.068.16-.07.16-.07.158-.075.159-.074.155-.078.158-.081.158-.06.15-.03.158-.001.161.029.159.058.15.085.137.108.12.13.096.144.07.156.044.16.013.16-.017.155-.046.143-.074.127-.1.107-.12.07-.115.083-.164.003-.005.002-.004.082-.166.002-.005.003-.004.08-.167.002-.005.002-.004.078-.168.002-.004.002-.005.076-.169.002-.004.002-.005.074-.17.002-.004.002-.005.072-.17.002-.005.002-.005.07-.17.002-.006.001-.005.068-.172.002-.004.002-.005.065-.173.002-.005.002-.005.063-.173.002-.005.002-.005.06-.174.003-.005.001-.005.06-.175.001-.005.002-.005.057-.176.001-.005.002-.005.055-.177.001-.005.002-.005.052-.177.002-.005.001-.005.051-.178.001-.005.002-.005.048-.179.002-.005v-.005l.047-.179.001-.005.002-.005.044-.18v-.005l.002-.005.042-.18.001-.006.001-.005.04-.18.001-.006.001-.005.038-.182v-.005l.002-.005.035-.182v-.006l.002-.005.033-.182v-.006l.002-.005.03-.183.001-.005.001-.005.029-.184v-.005l.001-.006.027-.184v-.005l.001-.005.024-.185v-.005l.001-.005.022-.185v-.006l.001-.005.02-.185v-.006l.001-.005.017-.186v-.005l.001-.005.015-.187v-.005l.001-.005.013-.187v-.01l.01-.187.001-.006v-.005l.009-.187v-.011l.006-.187v-.011l.004-.188v-.011l.001-.188v-.01l-.001-.188v-.011l-.004-.188v-.011l-.006-.187v-.011l-.007-.145-.022-.16-.05-.152-.08-.141-.103-.124-.125-.102-.141-.077-.153-.05-.16-.02-.161.009ZM.777 15l-.158.032-.15.06-.136.087-.117.11-.095.131-.068.146-.04.156-.012.133-.001.14v.01l.001.188v.011l.004.188v.011l.006.187v.011l.008.187v.011l.011.187v.005l.001.005.013.187v.01l.016.187v.01l.018.186v.011l.02.185.001.005v.006l.022.185.001.005v.005l.025.185v.005l.001.005.027.184v.006l.001.005.029.184v.005l.001.005.031.183.001.005.001.006.033.182.001.005.001.006.035.182.001.005.001.005.038.182v.005l.002.005.04.181v.005l.002.005.042.18.001.006.001.005.044.18.002.005v.005l.047.18.001.004.002.005.048.179.002.005.001.005.05.178.002.005.001.005.053.177.002.005.001.005.055.177.002.005.001.005.057.176.002.005.001.005.06.175.001.005.002.005.061.174.002.005.002.005.063.173.002.005.002.005.065.173.002.005.002.004.067.172.002.005.002.005.07.171.002.005.002.005.072.17.002.005.002.005.074.169.002.005.002.004.076.169.002.005.002.004.078.168.002.004.002.005.08.167.003.004.002.005.082.166.002.004.003.005.02.04.086.136.11.118.13.095.146.07.156.041.16.012.16-.019.155-.048.142-.075.126-.1.105-.123.08-.14.054-.152.024-.16-.006-.16-.036-.158-.051-.123-.018-.034-.078-.158L3.1 22.1l-.074-.16-.071-.156-.07-.162-.068-.16-.067-.164-.062-.158-.062-.164-.059-.161-.058-.166-.056-.166-.053-.164-.052-.168-.05-.167-.048-.17-.045-.165-.043-.168-.043-.172-.039-.17-.037-.17-.036-.172-.033-.17-.03-.173-.03-.174-.027-.17-.025-.175-.022-.174-.021-.175-.018-.175-.017-.173-.014-.176-.012-.176-.01-.177-.007-.176-.006-.177-.003-.178L1.73 16v-.134l-.013-.16-.044-.156-.072-.144-.097-.129-.12-.108-.137-.085-.15-.057L.938 15 .777 15ZM6.17 26.842l-.152.052-.14.08-.122.105-.101.126-.076.142-.048.154-.02.16.012.161.041.156.07.146.094.13.096.093.032.026.004.003.004.004.145.117.004.003.004.004.146.115.005.003.004.004.147.113.005.003.004.004.149.111.004.003.004.003.15.11.005.003.004.003.151.108.005.003.004.003.152.106.005.003.004.003.154.104.004.003.005.003.154.102.005.002.004.003.156.1.005.003.004.003.157.098.005.003.004.002.159.096.004.003.005.003.16.094.004.003.004.002.16.092.005.003.005.002.161.09.005.003.005.003.162.088.005.002.004.002.164.087.005.002.004.002.165.084.005.003.004.002.166.082.004.002.005.003.167.08.004.002.005.002.168.078.004.002.005.002.169.076.004.002.005.002.17.074.004.002.005.002.17.072.005.002.005.002.17.07.006.002.005.001.171.068.005.002.005.002.173.065.005.002.005.002.173.063.005.002.005.002.174.061.005.002.005.001.175.06.005.001.005.002.176.057.005.001.005.002.177.055.005.001.005.002.177.052.005.002.005.001.178.051.005.001.005.002.178.048.006.002h.005l.179.047.005.001.005.002.18.044h.005l.005.002.18.042.006.001.005.001.159.035.16.02.16-.01.157-.04.146-.069.13-.094.112-.117.087-.136.06-.149.033-.158.002-.161-.028-.159-.057-.15-.084-.138-.108-.12-.128-.098-.144-.072-.128-.039-.154-.033-.168-.04-.171-.041-.169-.044-.17-.045-.166-.048-.168-.05-.165-.051-.166-.054-.166-.056-.163-.057-.165-.06-.161-.062-.164-.064-.16-.065-.16-.068-.162-.07-.157-.07-.157-.074-.157-.075-.156-.077-.153-.079-.156-.082-.153-.082-.154-.086-.15-.086-.152-.09-.148-.09-.147-.092-.149-.095-.145-.095-.144-.098-.145-.1-.143-.102-.14-.103-.14-.104-.14-.108-.139-.11-.136-.11-.027-.022-.133-.091-.148-.065-.157-.036-.161-.006-.16.024Zm19.214.073-.156.039-.146.067-.11.076-.064.051-.139.11-.14.108-.14.104-.14.103-.143.101-.145.101-.144.098-.145.095-.149.095-.148.093-.147.089-.152.09-.15.086-.154.086-.153.082-.156.082-.153.079-.156.077-.157.075-.157.073-.158.071-.16.07-.16.068-.161.065-.164.064-.161.061-.165.06-.163.058-.166.056-.166.054-.166.051-.167.05-.167.048-.17.045-.168.044-.171.042-.168.039-.17.037-.11.023-.154.047-.143.075-.126.1-.106.122-.081.139-.054.152-.025.16.006.16.035.158.063.148.09.133.114.115.132.092.148.065.157.037.16.008.133-.017.115-.024h.005l.005-.002.181-.04h.005l.005-.002.18-.042.006-.001.005-.001.18-.044.005-.002h.005l.18-.047.004-.001.005-.002.179-.048.005-.002.005-.001.178-.05.005-.002.005-.002.177-.052.005-.002.005-.001.177-.055.005-.002.005-.001.176-.057.005-.002.005-.002.175-.059.005-.001.005-.002.174-.061.005-.002.005-.002.173-.063.005-.002.005-.002.173-.065.005-.002.004-.002.172-.068.005-.001.005-.002.171-.07.005-.002.005-.002.17-.072.005-.002.005-.002.169-.074.005-.002.004-.002.169-.076.004-.002.005-.002.168-.078.004-.002.005-.002.167-.08.004-.003.005-.002.166-.082.004-.002.005-.003.165-.084.004-.002.005-.002.163-.087.005-.002.005-.002.162-.088.005-.003.005-.003.161-.09.005-.002.004-.003.16-.092.005-.002.005-.003.16-.094.004-.003.004-.003.158-.096.005-.002.004-.003.158-.098.004-.003.005-.003.156-.1.004-.003.004-.002.155-.102.005-.003.004-.003.154-.104.004-.003.005-.003.152-.106.004-.003.005-.003.151-.108.004-.003.005-.003.15-.11.004-.003.004-.003.149-.111.004-.004.004-.003.148-.113.004-.004.004-.003.147-.115.004-.004.004-.003.068-.055.116-.113.092-.132.066-.147.038-.157.008-.16-.022-.16-.05-.153-.08-.14-.103-.125-.124-.102-.142-.077-.153-.05-.16-.02-.16.009Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-parallel-multiple"><path d="M15.975.003C8.195-.157.935 6.24.125 13.985c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.884 23.445.408 17.201.049c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.174.872 11.679 4.985 6.916c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.215-2.282-2.022-5.3-3.217-8.357-3.22ZM16 4.975c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.082 11.082 0 0 1 16 4.975Zm-2.15 3.281v5.534H8.213v4.38h5.636v5.534h4.31V18.17h5.639v-4.38h-5.64V8.256h-4.31Zm.865.865h2.583v5.534h5.635v2.65h-5.635v5.533h-2.583v-5.534h-5.64v-2.649h5.64V9.121Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-signal"><path d="M15.975.049C8.195-.11.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.453 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 5.021Zm.006 3.521L9.206 20.745h13.598L16.005 8.542Zm0 1.775 5.329 9.564H10.677l5.328-9.564Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-catch-timer"><path d="M15.97.04h-.127C8.713-.018 2.003 5.334.437 12.286c-1.51 6.123.98 13.005 6.136 16.665 5.125 3.788 12.546 4.105 17.912.623 5.272-3.276 8.33-9.766 7.325-15.916-.904-6.241-5.79-11.7-11.95-13.143A16.082 16.082 0 0 0 15.97.04Zm-.181 1.724c.115 0 .23 0 .347.003 6.625-.066 12.823 5.149 13.89 11.69 1.13 5.91-1.908 12.349-7.262 15.138-5.473 3.013-12.866 1.884-17.116-2.726C1.291 21.372.444 13.914 3.802 8.602c2.493-4.112 7.169-6.819 11.987-6.838Zm.283 1.554c-.117 0-.234.002-.351.005-6.1 0-11.691 5.049-12.346 11.114-.78 5.684 2.795 11.612 8.218 13.52 5.139 1.943 11.416.101 14.624-4.38 3.461-4.583 3.262-11.538-.596-15.831-2.36-2.747-5.924-4.423-9.549-4.428Zm-.078 1.695c.078 0 .156 0 .234.003 5.4 0 10.321 4.556 10.734 9.942.563 5.13-2.958 10.364-7.971 11.678-4.832 1.41-10.457-.935-12.746-5.446-2.463-4.559-1.2-10.795 3.014-13.883a11.072 11.072 0 0 1 6.735-2.294Zm-.137 3.42c-2.965.02-5.792 1.968-6.884 4.722-1.137 2.693-.509 6.007 1.536 8.096 1.988 2.14 5.263 2.929 8.007 1.926 2.875-.98 4.987-3.824 5.063-6.865.154-2.954-1.622-5.875-4.295-7.13a7.545 7.545 0 0 0-3.427-.75Zm.27 1.381c2.708.013 5.249 2.014 5.88 4.652.704 2.576-.481 5.512-2.788 6.862-2.356 1.478-5.677 1.084-7.611-.918-2.042-1.97-2.405-5.376-.839-7.738 1.11-1.762 3.146-2.877 5.229-2.857h.13Zm1.831 1.764-2.072 3.76c-.64.068-.792 1.039-.202 1.298.39.27.696-.18 1.051-.164h3.168v-.864h-3.18l1.992-3.612-.757-.418Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-none"><path d="M15.848.001C8.113-.093.931 6.281.125 13.983c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.207C29.105 4.938 23.55.48 17.367.06A16.448 16.448 0 0 0 15.848 0v.001Zm.293 1.727c7.113-.099 13.662 5.97 14.077 13.08.56 6.299-3.516 12.735-9.582 14.679-5.798 2.004-12.806-.12-16.283-5.237C.717 19.159.874 11.638 5.016 6.876 7.722 3.638 11.902 1.63 16.14 1.728Zm-.415 1.555C9.157 3.258 3.256 9.156 3.278 15.729c-.16 5.965 4.365 11.725 10.293 12.737 5.409 1.065 11.37-1.744 13.775-6.753 2.534-4.986 1.386-11.627-2.953-15.251-2.364-2.077-5.512-3.27-8.667-3.18Zm.507 1.692c5.82-.026 11.013 5.318 10.79 11.143-.024 5.3-4.313 10.267-9.636 10.803-5.075.667-10.426-2.588-11.885-7.553-1.535-4.744.494-10.46 4.925-12.885a11.072 11.072 0 0 1 5.806-1.508Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-throw-compensation"><path d="M15.975.003C8.195-.156.935 6.24.125 13.985c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.884 23.445.407 17.201.049c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.174.872 11.679 4.985 6.916c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 4.975c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 4.975Zm-.56 5.772-7.408 5.231 7.409 5.234v-5.057c2.385 1.687 4.771 3.371 7.157 5.057V10.747l-7.157 5.055v-5.055Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-throw-escalation"><path d="M15.975.049C8.195-.11.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.453 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 5.021Zm.006 3.927c-1.672 4.654-2.734 9.502-4.406 14.155 1.534-1.525 2.872-3.234 4.406-4.759l4.406 4.76c-1.496-4.71-2.91-9.446-4.406-14.156Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-throw-link"><path d="M15.975.049C8.195-.11.935 6.286.125 14.03c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.93 23.445.453 17.201.095c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.22.872 11.725 4.985 6.962c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 5.021c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 5.021Zm1.78 4.093v3.555H9.785v6.714h7.994v3.554l5.829-6.911-5.83-6.912Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-throw-message"><path d="M15.975.003C8.195-.156.935 6.24.125 13.985c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.884 23.445.407 17.201.049c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.174.872 11.679 4.985 6.916c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 4.975c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 4.975Zm-5.91 5.475 6.04 4.901 6.042-4.9H10.088Zm-1.341 1.138v9.921h14.514V11.79l-7.132 5.787-7.382-5.99Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-throw-multiple"><path d="M15.975.003C8.195-.156.935 6.24.125 13.985c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.884 23.445.407 17.201.049c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.174.872 11.679 4.985 6.916c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 4.975c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 4.975Zm.006 3.073-7.62 5.532 2.91 8.95h9.42l2.91-8.95-7.62-5.532Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-intermediate-event-throw-signal"><path d="M15.975.003C8.195-.156.935 6.24.125 13.985c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.206C29.09 4.884 23.445.407 17.201.049c-.408-.03-.817-.046-1.226-.046Zm-.181 1.724c7.134-.269 13.84 5.68 14.399 12.804.686 6.283-3.267 12.792-9.283 14.862-5.847 2.162-13.025.06-16.557-5.141C.728 19.174.872 11.679 4.985 6.916c2.632-3.171 6.671-5.174 10.809-5.19Zm.283 1.553c-6.6-.21-12.671 5.585-12.79 12.185-.292 5.964 4.129 11.817 10.034 12.953 5.47 1.198 11.584-1.613 14.025-6.702 2.525-4.97 1.396-11.585-2.912-15.216-2.282-2.021-5.3-3.216-8.357-3.22ZM16 4.975c5.818-.154 11.117 5.082 11.024 10.905.103 5.384-4.23 10.5-9.636 11.043-5.075.667-10.426-2.587-11.885-7.552-1.53-4.73.48-10.428 4.888-12.864A11.083 11.083 0 0 1 16 4.975Zm.006 3.52c-2.261 4.07-4.533 8.136-6.798 12.205h13.596L16.005 8.495Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-lane"><path d="M0 7v18.62h32V7H0Zm1.655 17.056V8.684h28.62v15.372H1.656Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-manual-task"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494Zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5Zm4.43 1.328c-.222.005-.43.09-.606.203-.985.638-4.356 2.977-5.096 3.486-.67.46-1.12 1.153-1.38 1.974-.27.858-.235 1.793-.232 2.576.002.59.016 1.104.17 1.727.22.908.634 1.63 1.23 2.118.597.49 1.363.732 2.23.734 3.038.012 6.078.016 9.119 0 .327-.002.645-.127.848-.37.204-.241.287-.56.291-.914a1.732 1.732 0 0 0-.097-.625h.327c.335 0 .641-.11.852-.316.21-.206.317-.475.374-.754a1.783 1.783 0 0 0-.126-1.143 1.18 1.18 0 0 0 .877-.521c.196-.306.257-.666.258-1.025.001-.375-.088-.738-.293-1.033a1.179 1.179 0 0 0-.958-.512h-.478c.108-.237.156-.505.155-.782-.003-.373-.098-.721-.316-.99a1.21 1.21 0 0 0-.943-.43c-2.273-.004-4.236.018-6.412.012l-.19-.001c.102-.104.202-.205.312-.314.337-.336.662-.652.83-.869.4-.516.46-1.215.123-1.729-.178-.272-.439-.456-.72-.494a.93.93 0 0 0-.148-.008Zm.029.728.022.001c.055.008.115.027.209.172.132.201.126.606-.09.884-.079.102-.431.465-.767.8-.337.334-.657.643-.815.836-.153.186-.096.338-.056.435.04.096.085.212.298.263.063.014.066.01.086.012l.066.003c2.429.027 4.986-.004 7.223-.003.194 0 .293.056.379.162.086.105.151.286.153.533 0 .257-.065.467-.155.59-.09.124-.183.182-.37.183-1.706-.001-3.411-.005-5.117-.009v.731c2.23.004 4.461.01 6.692.012.17 0 .265.06.361.2.096.138.164.364.163.615 0 .268-.058.501-.143.634-.085.132-.162.193-.385.195-2.32-.001-4.554-.006-6.688-.003v.73c1.905 0 3.809.003 5.713.001.194.005.316.09.416.26.102.173.151.442.093.728-.04.193-.102.313-.17.38-.067.065-.148.108-.343.108h-5.71l.002.734c1.445 0 2.89-.01 4.334-.001.162 0 .232.041.297.123.064.081.123.238.12.488-.003.244-.061.385-.12.455-.06.07-.127.11-.296.11-3.037.016-6.076.012-9.113 0-.735-.002-1.316-.196-1.77-.568-.454-.372-.793-.935-.986-1.728-.134-.546-.146-.978-.148-1.558-.003-.796-.018-1.664.199-2.354.222-.705.582-1.24 1.096-1.593.75-.515 4.14-2.866 5.079-3.474a.504.504 0 0 1 .241-.087Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-message-flow"><path d="m4.073 26.607 1.295 1.296L1.325 32l-.662-.633L0 30.735l4.073-4.128Zm6.953-7.046 1.296 1.296L1.325 32l7.555-7.656-1.295-1.296 1.455-1.474 1.986-2.013ZM32 .06s-2.699 5.189-5.417 10.462l-.326.633c-1.14 2.214-2.265 4.407-3.176 6.2-1.228-1.222-2.449-2.452-3.676-3.675l-3.57 3.618-1.297-1.296 3.541-3.588c-.98-.964-1.932-1.958-2.923-2.91l-.753-.706c2.68-1.258 6.533-3.165 9.95-4.876l.617-.309C28.838 1.673 32 .06 32 .06Zm-4.126 4.06-.015.007-.115.057-.048.024-.115.057L17.7 9.172l5.017 4.948 5.157-10Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-participant"><path d="M0 5v22.069h32V5H0Zm30.276 1.684v18.82H6.62V6.684h23.655Zm-28.62 0h3.31v18.82h-3.31V6.684Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-process"><path fill-rule="evenodd" d="m16.177 0 .137.002c.452.009.9.037 1.342.082.346.036.62.303.68.646l.437 2.536c.055.319.296.57.608.655.986.269 1.923.653 2.796 1.14.28.155.624.145.885-.039l2.083-1.47a.775.775 0 0 1 .937.022c.86.699 1.645 1.484 2.343 2.343.22.27.223.653.023.937l-1.439 2.038a.833.833 0 0 0-.031.896c.512.889.92 1.846 1.204 2.855a.833.833 0 0 0 .653.601l2.435.42c.342.059.61.333.645.679a15.928 15.928 0 0 1 .08 2.064l-.003.114c-.012.382-.038.76-.077 1.134a.775.775 0 0 1-.645.68l-2.396.412a.835.835 0 0 0-.656.61 12.511 12.511 0 0 1-1.2 2.917.832.832 0 0 0 .034.892l1.396 1.978c.2.284.196.667-.023.936a16.104 16.104 0 0 1-2.343 2.343.775.775 0 0 1-.937.023l-1.99-1.404a.833.833 0 0 0-.88-.026c-.907.516-1.886.922-2.916 1.2a.833.833 0 0 0-.61.656l-.414 2.396a.775.775 0 0 1-.679.646 16.096 16.096 0 0 1-3.312 0 .775.775 0 0 1-.679-.646l-.423-2.452a.834.834 0 0 0-.598-.636 12.474 12.474 0 0 1-1.468-.514 12.49 12.49 0 0 1-1.417-.68.833.833 0 0 0-.878.03l-2.026 1.43a.775.775 0 0 1-.937-.023 16.069 16.069 0 0 1-2.342-2.342.774.774 0 0 1-.024-.936l1.402-1.986a.833.833 0 0 0 .032-.896 12.507 12.507 0 0 1-1.214-2.911.833.833 0 0 0-.655-.606l-2.386-.412a.775.775 0 0 1-.646-.678 16.097 16.097 0 0 1 0-3.314.775.775 0 0 1 .646-.678l2.386-.412a.833.833 0 0 0 .655-.606 12.507 12.507 0 0 1 1.214-2.911.833.833 0 0 0-.032-.896L3.552 6.853a.774.774 0 0 1 .023-.936 16.091 16.091 0 0 1 2.343-2.343.775.775 0 0 1 .937-.023l2.03 1.433c.26.177.6.182.874.028.915-.512 1.88-.9 2.87-1.167a.833.833 0 0 0 .612-.656l.424-2.46a.775.775 0 0 1 .679-.645C14.845.032 15.348.004 15.85 0h.326ZM16 6.4c-5.302 0-9.6 4.297-9.6 9.599 0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6-4.298-9.6-9.6-9.6Zm-3 4.283c0-1.425 1.637-2.203 2.715-1.29l5.69 4.815c.794.672.794 1.91 0 2.583l-5.69 4.815c-1.078.913-2.715.134-2.715-1.29Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-receive-task"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494Zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5ZM5.23 7.764v11.577h17.55V7.764H5.23Zm1.816.758h13.917l-6.959 4.577-6.958-4.577Zm-1.06.21 8.018 5.274 8.018-5.275v9.853H5.987V8.73Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-script-task"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494Zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5Zm2.99 3.077-.077.045-.026.015c-1.09.646-1.84 1.239-2.336 1.818-.496.579-.735 1.162-.742 1.725-.014 1.119.812 1.958 1.544 2.708.732.75 1.385 1.456 1.446 2.041.032.298-.039.598-.364 1.008-.324.408-.911.897-1.85 1.445l-1.388.808h8.56l.101-.059c.996-.58 1.667-1.116 2.094-1.655.429-.54.603-1.107.547-1.638-.11-1.052-.967-1.818-1.688-2.556-.721-.739-1.306-1.436-1.298-2.092.004-.331.132-.7.535-1.171.402-.47 1.08-1.02 2.119-1.636l1.362-.806h-8.54Zm.241.867h5.271a6.83 6.83 0 0 0-1.113 1.01c-.496.58-.736 1.163-.743 1.726-.014 1.119.812 1.958 1.544 2.708.732.75 1.385 1.456 1.446 2.041.032.298-.039.598-.364 1.008-.312.393-.872.862-1.753 1.386H8.728c.367-.286.658-.566.88-.847.43-.54.604-1.107.548-1.638-.11-1.052-.968-1.818-1.688-2.556-.721-.739-1.306-1.435-1.298-2.092.004-.331.132-.7.534-1.171.389-.454 1.04-.984 2.021-1.575Zm-1.233 1.48v.4h4.12v-.4h-4.12Zm-.154 2.158v.4H12.6v-.4H8.34Zm1.931 2.158v.4h4.126v-.4H10.27Zm.59 2.158v.4h4.276v-.4h-4.276Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-send-task"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494Zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5Zm-1.38 3.16 8.332 4.717L21.78 8.16H5.114Zm.021 1.745v9.309H21.8V9.905l-8.353 4.655-8.31-4.655Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-service-task"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494Zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5Zm1.22 1.681V7.84c-.329.093-.63.223-.914.382l-.83-.82-1.554 1.561.83.82c-.16.288-.285.594-.372.911l-1.177.002v2.2l1.189-.004c.109.431.345.819.58 1.165v-1.898l-1.038.004v-.737l1.034-.002.058-.294c.084-.429.252-.838.493-1.203l.165-.25-.727-.718.523-.526.728.719.247-.165c.379-.25.793-.417 1.206-.505l.291-.06-.002-1.01h.75L9.19 8.417H11.16c-.185-.221-.951-.508-1.237-.588L9.93 6.68H7.713Zm2.078 2.105.003 1.158a4.19 4.19 0 0 0-.915.383l-.83-.821-1.553 1.562.83.82c-.16.288-.286.593-.373.91l-1.176.003v2.2l1.188-.004c.094.326.224.624.383.905l-.85.847 1.57 1.543.847-.843c.29.161.599.286.919.373v1.198c.756.006 1.56.003 2.206.003V17.81a4.19 4.19 0 0 0 .915-.383l.847.835 1.554-1.56-.848-.836c.16-.288.286-.594.373-.912l1.152-.007V12.75l-1.165.007a4.09 4.09 0 0 0-.382-.905l.805-.807-1.57-1.546-.804.806a4.16 4.16 0 0 0-.915-.372l.007-1.147H9.792Zm.732.73h.751l-.006 1.005.297.058c.43.085.844.252 1.21.492l.25.162.701-.704.528.52-.702.704.169.25c.248.374.412.779.505 1.196l.061.292 1.016-.006v.737l-1.01.006-.058.292c-.085.43-.252.838-.494 1.205l-.165.25.744.733-.523.525-.743-.734-.248.165c-.378.247-.789.418-1.203.503l-.294.058v1.067h-.745v-1.059l-.295-.057a3.395 3.395 0 0 1-1.21-.492l-.248-.162-.747.743-.528-.52.747-.744-.17-.25a3.546 3.546 0 0 1-.506-1.196l-.06-.291-1.04.004v-.738l1.034-.002.058-.294c.085-.428.252-.837.493-1.203l.165-.25-.726-.718.522-.526.728.72.248-.166a3.546 3.546 0 0 1 1.205-.504l.292-.06-.003-1.01Zm.388 2.685a1.65 1.65 0 0 0-1.645 1.645c0 .904.74 1.645 1.645 1.645a1.65 1.65 0 0 0 1.645-1.645 1.65 1.65 0 0 0-1.645-1.645Zm0 .73a.91.91 0 0 1 .915.915.91.91 0 0 1-.915.914.91.91 0 0 1-.915-.914.91.91 0 0 1 .915-.915Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-compensation"><path d="M15.995.001C9.705-.084 3.643 3.964 1.257 9.775-1.235 15.485.06 22.577 4.42 27.03c4.193 4.513 11.102 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.269.403-6.227-3.26-12.44-8.87-15.153A15.924 15.924 0 0 0 15.994 0Zm0 1.73c6.213-.108 12.122 4.355 13.726 10.357 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.626C2.101 23.171.377 16.07 2.848 10.44c2.14-5.205 7.515-8.774 13.147-8.708Zm-.566 9.03-7.415 5.235 7.415 5.238v-5.062c2.386 1.689 4.775 3.375 7.163 5.062V10.761l-7.163 5.058v-5.058Zm-.866 1.666v7.13L9.51 15.993l5.052-3.565Zm7.166 0v7.137l-5.052-3.568 5.052-3.569Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-condition"><path d="M16 0C7.174 0 0 7.174 0 16s7.174 16 16 16 16-7.174 16-16S24.826 0 16 0Zm0 1.73c7.892 0 14.27 6.378 14.27 14.27 0 7.891-6.379 14.27-14.27 14.27S1.73 23.891 1.73 16C1.73 8.108 8.108 1.73 16 1.73Zm-5.362 7.523v13.493h10.724V9.253H10.638Zm.863.866h8.995V21.88H11.501V10.12Zm.928 1.324v.863h7.139v-.863h-7.139Zm0 2.605v.867h7.139v-.867h-7.139Zm0 3.01v.864h7.139v-.863h-7.139Zm0 2.72v.863h7.139v-.863h-7.139Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-error"><path d="M15.995.005C9.705-.08 3.643 3.968 1.257 9.78-1.235 15.49.06 22.581 4.42 27.034c4.193 4.513 11.102 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.269.403-6.227-3.26-12.44-8.87-15.153A15.924 15.924 0 0 0 15.994.005Zm0 1.73c6.213-.108 12.122 4.355 13.726 10.357 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.626-4.814-3.838-6.538-10.939-4.067-16.57 2.14-5.205 7.515-8.774 13.147-8.708Zm6.13 7.45-3.635 7.37-4.52-5.88c-1.37 4.048-2.738 8.095-4.106 12.143l4.603-5.917 4.748 5.433 2.91-13.149Zm-7.754 3.889 4.299 5.449 1.073-2.39-1.028 4.135-4.387-5.16-1.78 2.75 1.823-4.784Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-escalation"><path d="M15.995.001C9.705-.084 3.643 3.964 1.257 9.775-1.235 15.485.06 22.577 4.42 27.03c4.193 4.513 11.102 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.269.403-6.227-3.26-12.44-8.87-15.153A15.924 15.924 0 0 0 15.994 0Zm0 1.73c6.213-.108 12.122 4.355 13.726 10.357 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.626C2.101 23.171.377 16.07 2.848 10.44c2.14-5.205 7.515-8.774 13.147-8.708Zm0 7.183c-1.674 4.658-2.736 9.509-4.41 14.166 1.535-1.526 2.874-3.236 4.41-4.763l4.41 4.763c-1.499-4.713-2.913-9.453-4.41-14.166Zm.032 2.931c.822 2.588 1.598 5.19 2.42 7.778l-2.42-2.615c-.683.598-2.455 2.887-2.34 2.39.871-2.489 1.448-5.07 2.34-7.553Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-message"><path d="M15.995.001C9.705-.084 3.643 3.964 1.257 9.775-1.235 15.485.06 22.577 4.42 27.03c4.193 4.513 11.102 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.269.403-6.227-3.26-12.44-8.87-15.153A15.924 15.924 0 0 0 15.994 0Zm0 1.73c6.213-.108 12.122 4.355 13.726 10.357 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.626C2.101 23.171.377 16.07 2.848 10.44c2.14-5.205 7.515-8.774 13.147-8.708Zm-7.257 8.732v11.069h14.513v-11.07H8.738Zm3.224 1.73h8.064c-1.428.878-2.857 2.807-4.285 3.018l-3.779-3.019Zm9.562 1.017v6.593H10.465V13.21l5.528 4.417 5.53-4.418Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-multiple"><path d="M15.995.001C9.705-.084 3.643 3.964 1.257 9.775-1.235 15.485.06 22.577 4.42 27.03c4.193 4.513 11.102 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.269.403-6.227-3.26-12.44-8.87-15.153A15.924 15.924 0 0 0 15.994 0Zm0 1.73c6.213-.108 12.122 4.355 13.726 10.357 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.626C2.101 23.171.377 16.07 2.848 10.44c2.14-5.205 7.515-8.774 13.147-8.708Zm0 6.328-7.626 5.536c.97 2.986 1.942 5.971 2.913 8.957h9.426l2.912-8.957-7.625-5.536Zm0 1.068 6.609 4.798-2.525 7.763H11.91l-2.524-7.763 6.609-4.798Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-non-interrupting-condition"><path d="M10.632 9.189V22.68h10.723V9.189H10.632Zm.862.865h8.994v11.76H11.494v-11.76Zm.928 1.324v.863h7.138v-.863h-7.138Zm0 2.605v.866h7.138v-.866h-7.138Zm0 3.01v.863h7.138v-.863h-7.138Zm0 2.72v.862h7.138v-.863h-7.138ZM16.12 0h-.232l-.22.004h-.012l-.221.006h-.012l-.22.01h-.012l-.22.013h-.012l-.22.016h-.012l-.22.019h-.005l-.006.001-.22.021h-.006l-.005.001-.22.025h-.011l-.22.028h-.005l-.006.002-.219.03h-.005l-.006.001-.218.033-.006.001-.006.001-.217.036-.006.001-.006.001-.217.039-.006.001-.006.001-.216.042-.006.001-.006.001-.215.045-.006.001-.006.002-.215.047-.006.002-.006.001-.214.05-.006.002-.006.002-.115.029-.152.053-.14.081-.122.106-.1.126-.075.143-.047.154-.018.16.012.16.042.156.07.145.095.13.118.11.137.086.15.059.158.03h.161l.132-.022.11-.028.202-.047.203-.046.208-.043.202-.039.206-.037.206-.034.205-.03.208-.03.205-.025.209-.023.208-.02.21-.017.209-.015.207-.011.21-.009.21-.006.207-.003h.21l.21.002.207.005.207.008.212.011.207.014.208.017.209.019.208.022.205.025.206.028.207.03.208.035.205.036.202.039.052.01.16.018.16-.012.156-.042.146-.07.13-.096.109-.119.085-.136.06-.15.03-.159v-.16l-.03-.16-.059-.15-.086-.136-.109-.118-.13-.096-.145-.07-.128-.038-.057-.011-.006-.002h-.006l-.216-.042-.006-.001-.006-.001-.217-.039H18.9l-.006-.002-.217-.035-.006-.001-.006-.001-.218-.032-.006-.001-.006-.001-.218-.03h-.006l-.006-.001-.219-.027h-.011l-.22-.024-.005-.001h-.006l-.22-.021h-.006l-.006-.001-.22-.017-.005-.001h-.006L17.06.03h-.012l-.22-.012h-.012l-.22-.01h-.012l-.22-.005h-.012L16.132 0h-.012Zm8.715 2.783-.157.034-.149.063-.134.089-.116.112-.092.132-.067.147-.038.157-.008.16.021.16.051.153.079.141.103.124.102.087.052.038h.001l.087.064v.001l.082.061.002.001.076.059h.001l.084.065.082.066.002.001.079.063.002.002.077.063.081.067.002.002.077.065.076.065.001.002.08.07.078.07h.002l.075.068.077.072.002.001.073.069.077.073.072.07.002.001.077.076.07.07v.001l.075.076.07.073.002.001.074.079.002.002.069.074.069.075.074.082.07.08.002.001.068.079h.001l.067.079.068.082.065.078.001.002.068.083.067.084.063.081.001.002.067.087.002.002.063.084.001.001.064.087.008.01.008.01.095.12.093.121.09.119.087.119.088.122.086.123.084.12.081.122.001.002.084.126.08.126.08.127.077.126.079.131.074.127.075.131.073.131.07.13.07.133.069.133.045.09.086.137.109.119.13.096.144.07.156.042.16.013.16-.017.155-.047.143-.075.126-.1.106-.121.082-.14.054-.151.025-.16-.005-.16-.035-.158-.05-.124-.048-.095-.002-.004-.002-.004-.073-.14-.002-.005-.002-.004-.074-.14-.002-.004-.002-.004-.076-.14-.002-.003-.002-.004-.077-.139-.003-.004-.002-.004-.078-.138-.003-.004-.002-.003-.08-.137-.002-.004-.003-.004-.081-.136-.002-.004-.003-.004-.083-.136-.002-.003-.002-.004-.085-.135-.002-.004-.003-.003-.085-.134-.003-.004-.002-.004-.087-.132-.003-.004-.003-.004-.088-.132-.003-.003-.002-.004-.09-.13-.003-.005-.003-.003-.091-.13-.003-.004-.002-.004-.093-.129-.003-.003-.003-.004-.094-.128-.003-.004-.003-.003-.095-.127-.003-.004-.003-.004-.097-.125-.003-.004-.003-.004-.09-.114-.06-.082-.003-.003-.002-.003-.069-.091-.002-.004-.002-.003-.07-.09-.003-.003-.002-.003-.07-.09-.003-.003-.002-.003-.071-.09-.002-.003-.003-.002-.072-.089-.002-.003-.002-.003-.073-.088-.002-.003-.002-.002-.074-.087-.002-.003-.002-.003-.074-.086-.003-.003-.002-.003-.074-.086-.003-.002-.002-.003-.075-.085-.003-.003-.002-.002-.076-.084-.002-.003-.003-.003-.076-.083-.002-.003-.003-.003-.077-.082-.002-.003-.003-.002-.077-.082-.003-.003-.003-.002-.078-.081-.002-.003-.003-.003-.078-.08-.003-.002-.003-.003-.079-.08-.002-.002-.003-.002-.08-.08-.002-.002-.003-.002-.08-.078-.003-.003-.003-.002-.08-.077-.003-.003-.003-.002-.082-.077-.002-.002-.003-.002-.082-.076-.003-.002-.002-.003-.083-.075-.003-.002-.002-.003-.084-.074-.002-.002-.003-.002-.084-.074-.003-.002-.002-.002-.085-.073-.002-.002-.003-.003-.085-.071-.003-.003-.002-.002-.086-.07-.003-.003-.002-.002-.086-.07-.003-.003-.003-.002-.086-.07-.003-.002-.003-.002-.087-.069-.002-.002-.003-.002-.088-.068-.002-.002-.003-.002-.088-.067-.003-.003-.003-.002-.088-.066-.003-.002-.003-.002-.089-.066-.003-.002-.003-.002-.057-.042-.14-.082-.15-.055-.16-.026-.16.004ZM6.377 3.21l-.157.037-.148.066-.111.074-.007.006-.003.002-.003.002-.086.069-.003.002-.002.002-.086.07-.003.002-.002.002-.086.07-.002.003-.003.002-.085.071-.002.002-.003.003-.084.071-.003.003-.002.002-.084.072-.003.003-.002.002-.083.073-.003.003-.002.002-.083.074-.002.002-.003.003-.082.074-.003.003-.002.002-.081.076-.003.002-.003.002-.08.077-.003.002-.003.003-.08.076-.002.003-.003.002-.08.078-.002.002-.003.003-.079.078-.002.003-.003.002-.078.08-.003.002-.002.002-.078.08-.002.003-.003.002-.077.08-.003.004-.002.002-.077.081-.002.003-.003.003-.076.082-.002.002-.003.003-.075.082-.002.003-.003.003-.074.083-.003.003-.002.003-.074.084-.003.003-.002.002-.074.085-.002.003-.002.003-.073.085-.003.003-.002.003-.072.086-.002.003-.003.003-.071.087-.003.003-.002.002-.07.088-.003.003-.002.003-.07.088-.003.003-.002.003-.07.09-.002.002-.002.003-.069.09-.002.003-.003.003-.068.09-.002.003-.002.003-.067.092-.003.003-.002.003-.067.092-.002.003-.002.003-.066.092-.002.003-.002.004-.066.093-.002.003-.002.003-.065.094-.002.003-.002.004-.064.094-.002.003-.002.004-.063.095-.002.003-.002.003-.063.097-.002.003-.002.003-.046.073-.05.07-.003.002-.002.003-.067.093-.003.003-.002.003-.066.094-.002.003-.002.003-.066.094-.002.003-.002.003-.064.094-.002.004-.002.003-.064.094-.002.004-.002.003-.062.095-.002.003-.002.003-.062.096-.002.003-.002.003-.06.096-.003.003-.002.003-.06.096-.001.004-.002.003-.059.096-.002.004-.002.003-.058.097-.002.003-.001.003-.057.098-.002.003-.002.003-.056.098-.002.003-.002.003-.055.098-.002.004-.001.003-.055.098-.001.004-.002.003-.054.099-.001.003-.002.003-.052.1-.002.002-.002.004-.051.1-.002.002-.002.004-.05.1-.002.003-.002.003-.05.1v.003l-.002.004-.05.1v.003l-.002.004-.048.1-.002.004-.001.003-.047.101-.002.003-.001.004-.013.027-.052.152-.024.16.006.16.037.157.064.148.091.133.114.114.134.09.147.065.157.036.162.006.159-.024.152-.053.14-.08.122-.105.1-.126.066-.117.01-.023.044-.095.045-.095.002-.003.042-.087.048-.097.048-.095v-.001l.048-.092.001-.001.047-.09.05-.093.002-.002.049-.09.052-.092.001-.002.051-.089.001-.002.051-.087.053-.088.001-.002.055-.091.057-.091.057-.09.001-.002.057-.089.055-.083.001-.002.06-.09.06-.088.062-.089.001-.001.06-.084.063-.088.065-.089.017-.023.016-.025.06-.094.059-.09v-.002l.058-.086.057-.086.001-.001.062-.09.062-.088.001-.002.06-.085.002-.002.06-.082.063-.087.064-.084.002-.002.061-.08.065-.084.064-.08v-.001l.067-.083.067-.082.07-.083.069-.08.063-.074.074-.083.068-.077.002-.002.07-.076.07-.075.072-.077.001-.001.067-.07.076-.078.002-.002.07-.07.075-.075.002-.002.072-.07.075-.072.002-.002.073-.069.074-.068.001-.001.08-.073.076-.068.002-.002.072-.063v-.001l.078-.067.079-.068.002-.001.08-.068.002-.002.077-.063.082-.066.001-.001.075-.06.002-.002.006-.004.117-.111.094-.131.068-.146.04-.156.01-.161-.019-.16-.049-.154-.076-.141-.102-.125-.123-.105-.14-.079-.153-.052-.16-.023-.16.007Zm24.596 11.088-.156.04-.146.067-.131.094-.112.117-.087.135-.061.15-.033.157-.004.134.007.142.005.152.004.15.002.149v.153l.001.011v.015l.004.11.002.11v.002l.002.106v.321l-.003.102-.002.106-.004.107-.005.105-.006.106-.006.106-.008.106v.002l-.008.103v.002l-.01.1-.01.105-.01.105-.013.105-.012.099v.002l-.014.108-.014.1-.016.105-.016.103v.002l-.017.099-.018.104-.019.103v.002l-.019.097-.02.104-.022.103v.001l-.022.098-.023.103v.002l-.024.096-.025.103v.002l-.024.096-.027.102v.003l-.026.093v.001l-.029.103v.002l-.03.099-.028.097v.002l-.03.095-.03.096v.001l-.033.1-.031.095v.002l-.035.1v.003l-.034.094v.003l-.035.096v.001l-.034.09v.002l-.038.098-.036.093v.002l-.038.095-.079.194-.08.188-.085.189-.087.19-.09.184-.092.183-.095.184-.05.093-.064.148-.034.158-.005.16.026.16.054.151.082.14.106.12.127.1.143.075.154.046.16.017.161-.013.156-.042.144-.071.13-.096.109-.119.072-.112.053-.099.003-.005.003-.006.102-.195.003-.006.003-.006.098-.196.003-.006.003-.006.096-.197.002-.006.003-.006.093-.2.002-.006.003-.006.09-.2.002-.006.003-.007.086-.202.003-.006.002-.006.084-.203.002-.005.001-.005.04-.102.002-.003.001-.003.04-.103.001-.003.001-.003.04-.103v-.004l.001-.003.039-.103v-.003l.002-.003.037-.104.001-.003.001-.003.037-.104v-.004l.002-.003.035-.104.002-.003v-.004l.035-.104.002-.004v-.003l.034-.105.002-.003v-.003l.034-.105v-.004l.002-.003.032-.106.001-.003.001-.003.031-.106.001-.003.001-.004.031-.106.001-.003.001-.004.03-.106v-.003l.002-.004.028-.107.001-.003.001-.003.028-.107.001-.004.001-.003.027-.107.001-.004v-.003l.027-.108.001-.003v-.004l.026-.108.001-.003v-.004l.025-.108.001-.003v-.004l.025-.108v-.004l.001-.003.023-.109v-.003l.001-.004.022-.109v-.003l.002-.004.02-.109.001-.004v-.003l.02-.11.002-.003v-.004l.02-.11v-.007l.019-.11v-.003l.001-.004.017-.11v-.004l.001-.003.017-.11v-.008l.016-.11v-.004l.001-.004.015-.11v-.008l.015-.111v-.008l.013-.111v-.007l.013-.112v-.007l.011-.112v-.004l.001-.004.01-.112v-.007l.01-.112v-.008l.008-.112v-.008l.007-.113v-.007l.007-.113v-.008l.005-.113v-.007l.005-.114v-.007l.003-.114v-.007l.003-.114v-.129l.001-.114v-.13l-.003-.114v-.008l-.003-.115v-.007l-.003-.102v-.155l-.003-.158v-.01l-.004-.158v-.01l-.006-.158v-.01l-.007-.148-.023-.16-.051-.152-.08-.14-.103-.124-.125-.102-.142-.077-.153-.05-.16-.02-.161.01Zm-30.213.66-.157.034-.149.063-.134.09-.115.113-.092.132-.067.147-.037.156-.009.134.001.11V15.95l.006.22v.012l.01.22v.012l.012.22v.006l.001.006.015.22v.005l.001.006.018.22.001.006v.006l.022.219v.006l.001.006.024.219.001.006v.006l.028.218.001.006v.006l.031.218.001.006.001.006.033.218.001.006.001.005.037.218v.006l.002.005.04.217v.006l.001.006.043.216.001.006.001.006.046.216v.005l.002.006.048.215.002.006.001.006.051.214.002.006v.006l.055.214.002.005.001.006.057.213.002.006.001.005.06.213.002.005.001.006.063.212.002.005.001.006.066.21.002.006.002.006.068.21.002.005.002.005.07.21.003.005.002.005.074.208.002.006.002.005.077.207.002.006.002.005.08.206.002.005.002.006.082.204.002.006.002.005.086.204.002.005.002.006.088.202.002.005.003.006.09.2.003.006.002.005.094.2.002.006.003.005.096.199.002.005.003.005.03.062.086.137.11.118.128.097.145.07.156.043.16.013.16-.017.155-.047.143-.074.127-.1.106-.121.081-.14.055-.15.025-.16-.005-.161-.034-.158-.05-.124-.028-.055-.092-.19-.087-.188-.087-.192-.083-.19-.08-.193-.078-.194-.076-.196-.073-.195-.07-.197-.067-.198-.065-.199-.063-.2-.059-.2-.056-.2-.055-.204-.05-.201-.049-.202-.046-.205-.043-.206-.04-.203-.038-.207-.034-.204-.032-.207-.028-.205-.026-.207-.023-.208-.02-.207-.018-.207-.014-.208-.011-.207-.009-.208-.005-.207-.002-.104-.017-.16-.046-.155-.074-.143-.1-.126-.121-.107-.139-.081-.152-.055-.159-.025-.161.004Zm24.585 11.83-.156.039-.146.068-.11.076-.015.012-.163.129-.166.127-.168.125-.17.124-.17.12-.172.118-.173.115-.176.114-.177.111-.18.11-.178.105-.182.104-.182.101-.184.1-.184.095-.189.095-.186.09-.188.089-.19.086-.19.082-.193.081-.195.078-.191.074-.197.073-.195.07-.196.065-.198.064-.198.061-.2.058-.2.055-.2.052-.2.049-.151.035-.153.05-.141.078-.125.103-.103.124-.078.14-.05.154-.022.16.009.16.038.157.067.147.093.132.116.112.134.089.149.062.158.034.16.003.133-.02.158-.035.006-.002.006-.001.213-.052.006-.002.007-.001.212-.056.006-.001.006-.002.212-.058.006-.002.006-.002.211-.061.006-.002.006-.002.21-.064.006-.002.006-.002.21-.067.005-.002.006-.002.208-.07.006-.002.006-.003.207-.073.006-.002.006-.002.206-.077.006-.002.005-.002.206-.08.005-.001.006-.003.204-.082.006-.002.005-.002.203-.085.006-.003.005-.002.202-.088.006-.002.005-.003.2-.09.006-.003.006-.003.2-.093.005-.003.005-.002.198-.096.006-.003.005-.003.197-.099.005-.002.005-.003.196-.102.005-.002.005-.003.195-.105.005-.002.005-.003.193-.107.005-.003.005-.003.191-.11.005-.003.005-.003.19-.112.005-.003.005-.003.189-.115.005-.003.005-.003.187-.117.005-.003.004-.004.186-.12.005-.003.004-.003.184-.122.005-.003.005-.004.182-.125.004-.003.005-.003.18-.128.005-.003.005-.003.179-.13.004-.003.005-.004.177-.132.004-.004.005-.003.175-.135.005-.003.004-.004.173-.137.005-.003.004-.004.019-.015.115-.113.092-.132.066-.147.038-.157.008-.16-.022-.16-.052-.153-.079-.14-.103-.124-.125-.102-.142-.078-.153-.05-.16-.02-.16.01Zm-19.17.054-.153.051-.14.079-.124.103-.103.125-.077.141-.05.153-.02.16.009.161.04.156.067.147.093.131.095.094.047.04.005.004.005.004.17.14.005.004.005.004.172.137.004.004.005.003.086.067.003.002.003.002.087.067.003.002.003.002.088.066.002.003.003.002.089.065.002.002.003.002.09.065.002.002.003.002.09.064.002.002.003.002.09.063.003.002.003.002.09.063.003.002.003.002.092.062.002.002.003.002.092.061.003.002.003.002.092.06.003.003.003.001.093.06.003.002.003.002.093.06.003.001.003.002.094.058.003.002.003.002.095.058.003.001.003.002.095.057.003.002.003.002.095.056.003.002.003.002.096.055.004.002.003.001.096.055.003.002.003.002.098.053.003.002.003.002.097.053.004.002.003.001.098.053.003.001.003.002.099.052.003.001.003.002.1.05.003.002.003.002.1.05.003.002.003.001.1.05h.003l.004.003.1.048.004.001.003.002.101.048.003.001.004.002.101.046.004.002.003.001.102.046.004.002.003.001.103.045.003.002.003.001.103.045.004.001.003.002.104.043.003.001.004.002.104.042.003.002.004.001.104.042.004.001.003.002.105.04.004.002.003.001.106.04.003.002h.004l.106.04.004.001.003.002.107.038.003.001.004.001.107.038.003.001.004.001.107.037.004.001.004.001.108.036.003.001.004.001.108.035.004.001.003.001.11.034.003.001.004.001.109.033.004.002h.003l.11.033h.004l.003.002.11.031.004.001.004.001.084.023.081.028.004.001.003.001.109.037.003.001.004.001.109.036.003.001.004.001.109.035h.003l.004.002.11.033.003.001.003.001.11.033.003.001.004.001.109.031.004.002h.003l.11.031.003.001.004.001.11.03h.003l.003.001.11.029h.004l.003.002.11.027.003.001.004.001.11.027h.003l.004.001.004.001.16.022.16-.008.157-.038.147-.067.132-.092.112-.116.09-.134.062-.149.034-.157.004-.161-.025-.16-.055-.151-.082-.139-.107-.12-.127-.1-.143-.074-.124-.04h-.003l-.104-.025-.103-.026h-.002l-.095-.026h-.001l-.101-.027h-.002l-.1-.028h-.002l-.103-.03-.104-.032-.097-.03h-.002l-.103-.033-.102-.033-.101-.034-.106-.036-.027-.01-.027-.007-.107-.03-.104-.029-.104-.03h-.002l-.097-.03-.102-.032-.102-.032-.102-.034-.103-.035-.096-.034-.1-.036-.101-.037h-.002l-.094-.036-.096-.037-.097-.04h-.002l-.099-.04-.098-.042h-.002l-.092-.04-.097-.043-.095-.043-.097-.044h-.002l-.09-.043-.094-.045-.094-.046-.093-.047-.09-.046-.096-.05-.088-.047-.002-.001-.09-.049-.094-.052-.002-.002-.087-.049-.087-.05h-.002l-.088-.053h-.001l-.09-.055-.086-.052-.002-.001-.089-.055-.084-.054h-.002l-.09-.059h-.001l-.085-.056-.001-.001-.084-.056-.082-.056h-.001l-.086-.06-.082-.058H7.79l-.086-.062-.002-.002-.08-.058-.081-.06h-.001l-.085-.064-.002-.002-.076-.058-.002-.002-.082-.064-.161-.128-.162-.133-.04-.034-.132-.092-.147-.066-.157-.038-.16-.008-.16.022Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-non-interrupting-escalation"><path d="M16 9.209c-1.674 4.655-2.735 9.504-4.408 14.16 1.534-1.526 2.873-3.235 4.407-4.761l4.408 4.76c-1.497-4.71-2.91-9.448-4.408-14.16Zm.031 2.93c.822 2.586 1.598 5.187 2.42 7.774l-2.42-2.614c-.682.598-2.453 2.886-2.34 2.389.873-2.488 1.45-5.068 2.34-7.55ZM16.132.364c-1.51.016-3.055.139-4.492.614-.854.442-.266 1.861.651 1.578 2.266-.58 4.656-.596 6.944-.144.935.063 1.21-1.391.318-1.674-1.118-.26-2.274-.361-3.42-.374Zm8.865 2.777c-.931-.1-1.262 1.29-.425 1.666 1.863 1.364 3.222 3.298 4.322 5.296.617.737 1.875-.145 1.398-.979-1.184-2.275-2.808-4.384-4.923-5.866a.863.863 0 0 0-.372-.117ZM6.55 3.564c-.734.078-1.196.762-1.735 1.206C3.552 6.02 2.55 7.511 1.681 9.053c-.31.533-.71 1.33-.03 1.767.615.432 1.282-.132 1.446-.742.796-1.475 1.746-2.89 2.934-4.08.43-.548 1.292-.822 1.34-1.595a.874.874 0 0 0-.822-.839Zm24.582 11.078c-.771-.033-1.004.82-.873 1.437.13 2.395-.471 4.797-1.615 6.897-.33.876.984 1.559 1.512.785a14.276 14.276 0 0 0 1.761-8.54.865.865 0 0 0-.785-.579Zm-30.195.666c-.774-.06-1.032.785-.905 1.407.117 2.41.732 4.81 1.858 6.945.528.774 1.84.09 1.51-.786A15.932 15.932 0 0 1 1.728 16a.876.876 0 0 0-.79-.692Zm24.57 11.817c-.762.099-1.243.835-1.919 1.16-1.514 1.002-3.237 1.632-4.978 2.092-.864.423-.307 1.855.616 1.591 2.528-.578 4.93-1.75 6.913-3.421.469-.522.07-1.42-.631-1.422Zm-19.16.042c-.845.001-1.12 1.228-.395 1.628 1.665 1.401 3.667 2.348 5.76 2.912.618.178 1.482.565 1.893-.177.355-.628-.226-1.297-.87-1.326-1.972-.515-3.912-1.285-5.5-2.594-.26-.213-.522-.472-.888-.443Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-non-interrupting-message"><path d="M8.746 10.393v11.064h14.506V10.393H8.746Zm3.223 1.728h8.06c-1.428.879-2.856 2.807-4.283 3.018l-3.777-3.018Zm9.557 1.018v6.59H10.473v-6.59l5.525 4.416 5.528-4.416ZM16.132 0c-1.51.016-3.055.139-4.492.614-.854.442-.266 1.861.651 1.578 2.266-.58 4.656-.596 6.944-.144.935.063 1.21-1.391.318-1.674-1.118-.26-2.274-.361-3.42-.374Zm8.865 2.777c-.931-.1-1.262 1.29-.425 1.666 1.863 1.364 3.222 3.298 4.322 5.296.617.737 1.875-.145 1.398-.979-1.184-2.275-2.808-4.384-4.923-5.866a.863.863 0 0 0-.372-.117ZM6.55 3.2c-.734.078-1.196.762-1.735 1.206C3.552 5.656 2.55 7.147 1.681 8.69c-.31.533-.71 1.33-.03 1.767.615.432 1.282-.132 1.446-.742.796-1.475 1.746-2.89 2.934-4.08.43-.548 1.292-.822 1.34-1.595a.874.874 0 0 0-.822-.839Zm24.582 11.078c-.771-.033-1.004.82-.873 1.437.13 2.395-.471 4.797-1.615 6.897-.33.876.984 1.559 1.512.785a14.276 14.276 0 0 0 1.761-8.54.865.865 0 0 0-.785-.579Zm-30.195.666c-.774-.06-1.032.785-.905 1.407.117 2.41.732 4.81 1.858 6.945.528.774 1.84.09 1.51-.786a15.932 15.932 0 0 1-1.672-6.874.876.876 0 0 0-.79-.692Zm24.57 11.817c-.762.099-1.243.835-1.919 1.16-1.514 1.002-3.237 1.632-4.978 2.092-.864.423-.307 1.855.616 1.591 2.528-.578 4.93-1.75 6.913-3.421.469-.522.07-1.42-.631-1.422Zm-19.16.042c-.845.001-1.12 1.228-.395 1.628 1.665 1.401 3.667 2.348 5.76 2.912.618.178 1.482.565 1.893-.177.355-.628-.226-1.297-.87-1.326-1.972-.515-3.912-1.285-5.5-2.594-.26-.213-.522-.472-.888-.443Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-non-interrupting-multiple"><path d="M23.621 13.524 16 7.99l-7.622 5.534 2.911 8.952h9.422l2.911-8.952Zm-1.016.33-2.523 7.759h-8.165l-2.524-7.76L16 9.059l6.606 4.796ZM16.132 0c-1.51.016-3.055.139-4.492.614-.854.442-.266 1.861.651 1.578 2.266-.58 4.656-.596 6.944-.144.935.063 1.21-1.391.318-1.674-1.118-.26-2.274-.361-3.42-.374Zm8.865 2.777c-.931-.1-1.262 1.29-.425 1.666 1.863 1.364 3.222 3.298 4.322 5.296.617.737 1.875-.145 1.398-.979-1.184-2.275-2.808-4.384-4.923-5.866a.863.863 0 0 0-.372-.117ZM6.55 3.2c-.734.078-1.196.762-1.735 1.206C3.552 5.656 2.55 7.147 1.681 8.69c-.31.533-.71 1.33-.03 1.767.615.432 1.282-.132 1.446-.742.796-1.475 1.746-2.89 2.934-4.08.43-.548 1.292-.822 1.34-1.595a.874.874 0 0 0-.822-.839Zm24.582 11.078c-.771-.033-1.004.82-.873 1.437.13 2.395-.471 4.797-1.615 6.897-.33.876.984 1.559 1.512.785a14.276 14.276 0 0 0 1.761-8.54.865.865 0 0 0-.785-.579Zm-30.195.666c-.774-.06-1.032.785-.905 1.407.117 2.41.732 4.81 1.858 6.945.528.774 1.84.09 1.51-.786a15.932 15.932 0 0 1-1.672-6.874.876.876 0 0 0-.79-.692Zm24.57 11.817c-.762.099-1.243.835-1.919 1.16-1.514 1.002-3.237 1.632-4.978 2.092-.864.423-.307 1.855.616 1.591 2.528-.578 4.93-1.75 6.913-3.421.469-.522.07-1.42-.631-1.422Zm-19.16.042c-.845.001-1.12 1.228-.395 1.628 1.665 1.401 3.667 2.348 5.76 2.912.618.178 1.482.565 1.893-.177.355-.628-.226-1.297-.87-1.326-1.972-.515-3.912-1.285-5.5-2.594-.26-.213-.522-.472-.888-.443Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-non-interrupting-parallel-multiple"><path d="M13.503 9.016v4.428H9.075v4.98h4.428v4.428h4.98v-4.427h4.428v-4.981h-4.427V9.016h-4.981Zm.83.83h3.32v4.428h4.428v3.32h-4.428v4.428h-3.32v-4.454H9.905v-3.294h4.428V9.846ZM16.12 0h-.232l-.22.004h-.012l-.221.006h-.012l-.22.01h-.012l-.22.013h-.012l-.22.016h-.012l-.22.019h-.005l-.006.001-.22.021h-.006l-.005.001-.22.025h-.011l-.22.028h-.005l-.006.002-.219.03h-.005l-.006.001-.218.033-.006.001-.006.001-.217.036-.006.001-.006.001-.217.039-.006.001-.006.001-.216.042-.006.001-.006.001-.215.045-.006.001-.006.002-.215.047-.006.002-.006.001-.214.05-.006.002-.006.002-.115.029-.152.053-.14.081-.122.106-.1.126-.075.143-.047.154-.018.16.012.16.042.156.07.145.095.13.118.11.137.086.15.059.158.03h.161l.132-.022.11-.028.202-.047.203-.046.208-.043.202-.039.206-.037.206-.034.205-.03.208-.03.205-.025.209-.023.208-.02.21-.017.209-.015.207-.011.21-.009.21-.006.207-.003h.21l.21.002.207.005.207.008.212.011.207.014.208.017.209.019.208.022.205.025.206.028.207.03.208.035.205.036.202.039.052.01.16.018.16-.012.156-.042.146-.07.13-.096.109-.119.085-.136.06-.15.03-.159v-.16l-.03-.16-.059-.15-.086-.136-.109-.118-.13-.096-.145-.07-.128-.038-.057-.011-.006-.002h-.006l-.216-.042-.006-.001-.006-.001-.217-.039H18.9l-.006-.002-.217-.035-.006-.001-.006-.001-.218-.032-.006-.001-.006-.001-.218-.03h-.006l-.006-.001-.219-.027h-.011l-.22-.024-.005-.001h-.006l-.22-.021h-.006l-.006-.001-.22-.017-.005-.001h-.006L17.06.03h-.012l-.22-.012h-.012l-.22-.01h-.012l-.22-.005h-.012L16.132 0h-.012Zm8.715 2.783-.157.034-.149.063-.134.089-.116.112-.092.132-.067.147-.038.157-.008.16.021.16.051.153.079.141.103.124.102.087.052.038h.001l.087.064v.001l.082.061.002.001.076.059h.001l.084.065.082.066.002.001.079.063.002.002.077.063.081.067.002.002.077.065.076.065.001.002.08.07.078.07h.002l.075.068.077.072.002.001.073.069.077.073.072.07.002.001.077.076.07.07v.001l.075.076.07.073.002.001.074.079.002.002.069.074.069.075.074.082.07.08.002.001.068.079h.001l.067.079.068.082.065.078.001.002.068.083.067.084.063.081.001.002.067.087.002.002.063.084.001.001.064.087.008.01.008.01.095.12.093.121.09.119.087.119.088.122.086.123.084.12.081.122.001.002.084.126.08.126.08.127.077.126.079.131.074.127.075.131.073.131.07.13.07.133.069.133.045.09.086.137.109.119.13.096.144.07.156.042.16.013.16-.017.155-.047.143-.075.126-.1.106-.121.082-.14.054-.151.025-.16-.005-.16-.035-.158-.05-.124-.048-.095-.002-.004-.002-.004-.073-.14-.002-.005-.002-.004-.074-.14-.002-.004-.002-.004-.076-.14-.002-.003-.002-.004-.077-.139-.003-.004-.002-.004-.078-.138-.003-.004-.002-.003-.08-.137-.002-.004-.003-.004-.081-.136-.002-.004-.003-.004-.083-.136-.002-.003-.002-.004-.085-.135-.002-.004-.003-.003-.085-.134-.003-.004-.002-.004-.087-.132-.003-.004-.003-.004-.088-.132-.003-.003-.002-.004-.09-.13-.003-.005-.003-.003-.091-.13-.003-.004-.002-.004-.093-.129-.003-.003-.003-.004-.094-.128-.003-.004-.003-.003-.095-.127-.003-.004-.003-.004-.097-.125-.003-.004-.003-.004-.09-.114-.06-.082-.003-.003-.002-.003-.069-.091-.002-.004-.002-.003-.07-.09-.003-.003-.002-.003-.07-.09-.003-.003-.002-.003-.071-.09-.002-.003-.003-.002-.072-.089-.002-.003-.002-.003-.073-.088-.002-.003-.002-.002-.074-.087-.002-.003-.002-.003-.074-.086-.003-.003-.002-.003-.074-.086-.003-.002-.002-.003-.075-.085-.003-.003-.002-.002-.076-.084-.002-.003-.003-.003-.076-.083-.002-.003-.003-.003-.077-.082-.002-.003-.003-.002-.077-.082-.003-.003-.003-.002-.078-.081-.002-.003-.003-.003-.078-.08-.003-.002-.003-.003-.079-.08-.002-.002-.003-.002-.08-.08-.002-.002-.003-.002-.08-.078-.003-.003-.003-.002-.08-.077-.003-.003-.003-.002-.082-.077-.002-.002-.003-.002-.082-.076-.003-.002-.002-.003-.083-.075-.003-.002-.002-.003-.084-.074-.002-.002-.003-.002-.084-.074-.003-.002-.002-.002-.085-.073-.002-.002-.003-.003-.085-.071-.003-.003-.002-.002-.086-.07-.003-.003-.002-.002-.086-.07-.003-.003-.003-.002-.086-.07-.003-.002-.003-.002-.087-.069-.002-.002-.003-.002-.088-.068-.002-.002-.003-.002-.088-.067-.003-.003-.003-.002-.088-.066-.003-.002-.003-.002-.089-.066-.003-.002-.003-.002-.057-.042-.14-.082-.15-.055-.16-.026-.16.004ZM6.377 3.21l-.157.037-.148.066-.111.074-.007.006-.003.002-.003.002-.086.069-.003.002-.002.002-.086.07-.003.002-.002.002-.086.07-.002.003-.003.002-.085.071-.002.002-.003.003-.084.071-.003.003-.002.002-.084.072-.003.003-.002.002-.083.073-.003.003-.002.002-.083.074-.002.002-.003.003-.082.074-.003.003-.002.002-.081.076-.003.002-.003.002-.08.077-.003.002-.003.003-.08.076-.002.003-.003.002-.08.078-.002.002-.003.003-.079.078-.002.003-.003.002-.078.08-.003.002-.002.002-.078.08-.002.003-.003.002-.077.08-.003.004-.002.002-.077.081-.002.003-.003.003-.076.082-.002.002-.003.003-.075.082-.002.003-.003.003-.074.083-.003.003-.002.003-.074.084-.003.003-.002.002-.074.085-.002.003-.002.003-.073.085-.003.003-.002.003-.072.086-.002.003-.003.003-.071.087-.003.003-.002.002-.07.088-.003.003-.002.003-.07.088-.003.003-.002.003-.07.09-.002.002-.002.003-.069.09-.002.003-.003.003-.068.09-.002.003-.002.003-.067.092-.003.003-.002.003-.067.092-.002.003-.002.003-.066.092-.002.003-.002.004-.066.093-.002.003-.002.003-.065.094-.002.003-.002.004-.064.094-.002.003-.002.004-.063.095-.002.003-.002.003-.063.097-.002.003-.002.003-.046.073-.05.07-.003.002-.002.003-.067.093-.003.003-.002.003-.066.094-.002.003-.002.003-.066.094-.002.003-.002.003-.064.094-.002.004-.002.003-.064.094-.002.004-.002.003-.062.095-.002.003-.002.003-.062.096-.002.003-.002.003-.06.096-.003.003-.002.003-.06.096-.001.004-.002.003-.059.096-.002.004-.002.003-.058.097-.002.003-.001.003-.057.098-.002.003-.002.003-.056.098-.002.003-.002.003-.055.098-.002.004-.001.003-.055.098-.001.004-.002.003-.054.099-.001.003-.002.003-.052.1-.002.002-.002.004-.051.1-.002.002-.002.004-.05.1-.002.003-.002.003-.05.1v.003l-.002.004-.05.1v.003l-.002.004-.048.1-.002.004-.001.003-.047.101-.002.003-.001.004-.013.027-.052.152-.024.16.006.16.037.157.064.148.091.133.114.114.134.09.147.065.157.036.162.006.159-.024.152-.053.14-.08.122-.105.1-.126.066-.117.01-.023.044-.095.045-.095.002-.003.042-.087.048-.097.048-.095v-.001l.048-.092.001-.001.047-.09.05-.093.002-.002.049-.09.052-.092.001-.002.051-.089.001-.002.051-.087.053-.088.001-.002.055-.091.057-.091.057-.09.001-.002.057-.089.055-.083.001-.002.06-.09.06-.088.062-.089.001-.001.06-.084.063-.088.065-.089.017-.023.016-.025.06-.094.059-.09v-.002l.058-.086.057-.086.001-.001.062-.09.062-.088.001-.002.06-.085.002-.002.06-.082.063-.087.064-.084.002-.002.061-.08.065-.084.064-.08v-.001l.067-.083.067-.082.07-.083.069-.08.063-.074.074-.083.068-.077.002-.002.07-.076.07-.075.072-.077.001-.001.067-.07.076-.078.002-.002.07-.07.075-.075.002-.002.072-.07.075-.072.002-.002.073-.069.074-.068.001-.001.08-.073.076-.068.002-.002.072-.063v-.001l.078-.067.079-.068.002-.001.08-.068.002-.002.077-.063.082-.066.001-.001.075-.06.002-.002.006-.004.117-.111.094-.131.068-.146.04-.156.01-.161-.019-.16-.049-.154-.076-.141-.102-.125-.123-.105-.14-.079-.153-.052-.16-.023-.16.007Zm24.596 11.088-.156.04-.146.067-.131.094-.112.117-.087.135-.061.15-.033.157-.004.134.007.142.005.152.004.15.002.149v.153l.001.011v.015l.004.11.002.11v.002l.002.106v.321l-.003.102-.002.106-.004.107-.005.105-.006.106-.006.106-.008.106v.002l-.008.103v.002l-.01.1-.01.105-.01.105-.013.105-.012.099v.002l-.014.108-.014.1-.016.105-.016.103v.002l-.017.099-.018.104-.019.103v.002l-.019.097-.02.104-.022.103v.001l-.022.098-.023.103v.002l-.024.096-.025.103v.002l-.024.096-.027.102v.003l-.026.093v.001l-.029.103v.002l-.03.099-.028.097v.002l-.03.095-.03.096v.001l-.033.1-.031.095v.002l-.035.1v.003l-.034.094v.003l-.035.096v.001l-.034.09v.002l-.038.098-.036.093v.002l-.038.095-.079.194-.08.188-.085.189-.087.19-.09.184-.092.183-.095.184-.05.093-.064.148-.034.158-.005.16.026.16.054.151.082.14.106.12.127.1.143.075.154.046.16.017.161-.013.156-.042.144-.071.13-.096.109-.119.072-.112.053-.099.003-.005.003-.006.102-.195.003-.006.003-.006.098-.196.003-.006.003-.006.096-.197.002-.006.003-.006.093-.2.002-.006.003-.006.09-.2.002-.006.003-.007.086-.202.003-.006.002-.006.084-.203.002-.005.001-.005.04-.102.002-.003.001-.003.04-.103.001-.003.001-.003.04-.103v-.004l.001-.003.039-.103v-.003l.002-.003.037-.104.001-.003.001-.003.037-.104v-.004l.002-.003.035-.104.002-.003v-.004l.035-.104.002-.004v-.003l.034-.105.002-.003v-.003l.034-.105v-.004l.002-.003.032-.106.001-.003.001-.003.031-.106.001-.003.001-.004.031-.106.001-.003.001-.004.03-.106v-.003l.002-.004.028-.107.001-.003.001-.003.028-.107.001-.004.001-.003.027-.107.001-.004v-.003l.027-.108.001-.003v-.004l.026-.108.001-.003v-.004l.025-.108.001-.003v-.004l.025-.108v-.004l.001-.003.023-.109v-.003l.001-.004.022-.109v-.003l.002-.004.02-.109.001-.004v-.003l.02-.11.002-.003v-.004l.02-.11v-.007l.019-.11v-.003l.001-.004.017-.11v-.004l.001-.003.017-.11v-.008l.016-.11v-.004l.001-.004.015-.11v-.008l.015-.111v-.008l.013-.111v-.007l.013-.112v-.007l.011-.112v-.004l.001-.004.01-.112v-.007l.01-.112v-.008l.008-.112v-.008l.007-.113v-.007l.007-.113v-.008l.005-.113v-.007l.005-.114v-.007l.003-.114v-.007l.003-.114v-.129l.001-.114v-.13l-.003-.114v-.008l-.003-.115v-.007l-.003-.102v-.155l-.003-.158v-.01l-.004-.158v-.01l-.006-.158v-.01l-.007-.148-.023-.16-.051-.152-.08-.14-.103-.124-.125-.102-.142-.077-.153-.05-.16-.02-.161.01Zm-30.213.66-.157.034-.149.063-.134.09-.115.113-.092.132-.067.147-.037.156-.009.134.001.11V15.95l.006.22v.012l.01.22v.012l.012.22v.006l.001.006.015.22v.005l.001.006.018.22.001.006v.006l.022.219v.006l.001.006.024.219.001.006v.006l.028.218.001.006v.006l.031.218.001.006.001.006.033.218.001.006.001.005.037.218v.006l.002.005.04.217v.006l.001.006.043.216.001.006.001.006.046.216v.005l.002.006.048.215.002.006.001.006.051.214.002.006v.006l.055.214.002.005.001.006.057.213.002.006.001.005.06.213.002.005.001.006.063.212.002.005.001.006.066.21.002.006.002.006.068.21.002.005.002.005.07.21.003.005.002.005.074.208.002.006.002.005.077.207.002.006.002.005.08.206.002.005.002.006.082.204.002.006.002.005.086.204.002.005.002.006.088.202.002.005.003.006.09.2.003.006.002.005.094.2.002.006.003.005.096.199.002.005.003.005.03.062.086.137.11.118.128.097.145.07.156.043.16.013.16-.017.155-.047.143-.074.127-.1.106-.121.081-.14.055-.15.025-.16-.005-.161-.034-.158-.05-.124-.028-.055-.092-.19-.087-.188-.087-.192-.083-.19-.08-.193-.078-.194-.076-.196-.073-.195-.07-.197-.067-.198-.065-.199-.063-.2-.059-.2-.056-.2-.055-.204-.05-.201-.049-.202-.046-.205-.043-.206-.04-.203-.038-.207-.034-.204-.032-.207-.028-.205-.026-.207-.023-.208-.02-.207-.018-.207-.014-.208-.011-.207-.009-.208-.005-.207-.002-.104-.017-.16-.046-.155-.074-.143-.1-.126-.121-.107-.139-.081-.152-.055-.159-.025-.161.004Zm24.585 11.83-.156.039-.146.068-.11.076-.015.012-.163.129-.166.127-.168.125-.17.124-.17.12-.172.118-.173.115-.176.114-.177.111-.18.11-.178.105-.182.104-.182.101-.184.1-.184.095-.189.095-.186.09-.188.089-.19.086-.19.082-.193.081-.195.078-.191.074-.197.073-.195.07-.196.065-.198.064-.198.061-.2.058-.2.055-.2.052-.2.049-.151.035-.153.05-.141.078-.125.103-.103.124-.078.14-.05.154-.022.16.009.16.038.157.067.147.093.132.116.112.134.089.149.062.158.034.16.003.133-.02.158-.035.006-.002.006-.001.213-.052.006-.002.007-.001.212-.056.006-.001.006-.002.212-.058.006-.002.006-.002.211-.061.006-.002.006-.002.21-.064.006-.002.006-.002.21-.067.005-.002.006-.002.208-.07.006-.002.006-.003.207-.073.006-.002.006-.002.206-.077.006-.002.005-.002.206-.08.005-.001.006-.003.204-.082.006-.002.005-.002.203-.085.006-.003.005-.002.202-.088.006-.002.005-.003.2-.09.006-.003.006-.003.2-.093.005-.003.005-.002.198-.096.006-.003.005-.003.197-.099.005-.002.005-.003.196-.102.005-.002.005-.003.195-.105.005-.002.005-.003.193-.107.005-.003.005-.003.191-.11.005-.003.005-.003.19-.112.005-.003.005-.003.189-.115.005-.003.005-.003.187-.117.005-.003.004-.004.186-.12.005-.003.004-.003.184-.122.005-.003.005-.004.182-.125.004-.003.005-.003.18-.128.005-.003.005-.003.179-.13.004-.003.005-.004.177-.132.004-.004.005-.003.175-.135.005-.003.004-.004.173-.137.005-.003.004-.004.019-.015.115-.113.092-.132.066-.147.038-.157.008-.16-.022-.16-.052-.153-.079-.14-.103-.124-.125-.102-.142-.078-.153-.05-.16-.02-.16.01Zm-19.17.054-.153.051-.14.079-.124.103-.103.125-.077.141-.05.153-.02.16.009.161.04.156.067.147.093.131.095.094.047.04.005.004.005.004.17.14.005.004.005.004.172.137.004.004.005.003.086.067.003.002.003.002.087.067.003.002.003.002.088.066.002.003.003.002.089.065.002.002.003.002.09.065.002.002.003.002.09.064.002.002.003.002.09.063.003.002.003.002.09.063.003.002.003.002.092.062.002.002.003.002.092.061.003.002.003.002.092.06.003.003.003.001.093.06.003.002.003.002.093.06.003.001.003.002.094.058.003.002.003.002.095.058.003.001.003.002.095.057.003.002.003.002.095.056.003.002.003.002.096.055.004.002.003.001.096.055.003.002.003.002.098.053.003.002.003.002.097.053.004.002.003.001.098.053.003.001.003.002.099.052.003.001.003.002.1.05.003.002.003.002.1.05.003.002.003.001.1.05h.003l.004.003.1.048.004.001.003.002.101.048.003.001.004.002.101.046.004.002.003.001.102.046.004.002.003.001.103.045.003.002.003.001.103.045.004.001.003.002.104.043.003.001.004.002.104.042.003.002.004.001.104.042.004.001.003.002.105.04.004.002.003.001.106.04.003.002h.004l.106.04.004.001.003.002.107.038.003.001.004.001.107.038.003.001.004.001.107.037.004.001.004.001.108.036.003.001.004.001.108.035.004.001.003.001.11.034.003.001.004.001.109.033.004.002h.003l.11.033h.004l.003.002.11.031.004.001.004.001.084.023.081.028.004.001.003.001.109.037.003.001.004.001.109.036.003.001.004.001.109.035h.003l.004.002.11.033.003.001.003.001.11.033.003.001.004.001.109.031.004.002h.003l.11.031.003.001.004.001.11.03h.003l.003.001.11.029h.004l.003.002.11.027.003.001.004.001.11.027h.003l.004.001.004.001.16.022.16-.008.157-.038.147-.067.132-.092.112-.116.09-.134.062-.149.034-.157.004-.161-.025-.16-.055-.151-.082-.139-.107-.12-.127-.1-.143-.074-.124-.04h-.003l-.104-.025-.103-.026h-.002l-.095-.026h-.001l-.101-.027h-.002l-.1-.028h-.002l-.103-.03-.104-.032-.097-.03h-.002l-.103-.033-.102-.033-.101-.034-.106-.036-.027-.01-.027-.007-.107-.03-.104-.029-.104-.03h-.002l-.097-.03-.102-.032-.102-.032-.102-.034-.103-.035-.096-.034-.1-.036-.101-.037h-.002l-.094-.036-.096-.037-.097-.04h-.002l-.099-.04-.098-.042h-.002l-.092-.04-.097-.043-.095-.043-.097-.044h-.002l-.09-.043-.094-.045-.094-.046-.093-.047-.09-.046-.096-.05-.088-.047-.002-.001-.09-.049-.094-.052-.002-.002-.087-.049-.087-.05h-.002l-.088-.053h-.001l-.09-.055-.086-.052-.002-.001-.089-.055-.084-.054h-.002l-.09-.059h-.001l-.085-.056-.001-.001-.084-.056-.082-.056h-.001l-.086-.06-.082-.058H7.79l-.086-.062-.002-.002-.08-.058-.081-.06h-.001l-.085-.064-.002-.002-.076-.058-.002-.002-.082-.064-.161-.128-.162-.133-.04-.034-.132-.092-.147-.066-.157-.038-.16-.008-.16.022Z" opacity=".98" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-non-interrupting-signal"><path d="M16.007 8.82 9.21 21.022h13.596L16.007 8.82Zm0 1.775 5.328 9.563H10.68l5.327-9.563ZM16.14.386c-1.571.236-4.195-.284-4.9 1.381.619 1.703 2.745.069 4.085.365 1.421-.13 2.84.2 4.235.259C21.27.784 18.19.344 17 .413a20.456 20.456 0 0 0-.86-.027ZM25 3.162c-2.19.694.401 2.26 1.181 3.094 1.083 1.152 1.954 2.484 2.715 3.864 1.48 1.005 1.845-1.26.81-2.03-1.158-1.897-2.613-3.704-4.513-4.89l-.192-.038Zm-18.438.423c-1.793.712-2.909 2.548-4.01 4.061-.773.814-2.211 3.653.005 3.211 1.123-1.469 1.87-3.306 3.267-4.614.664-.7 2.73-2.013.738-2.658Zm24.57 11.072c-1.659.435-.468 2.667-.99 3.895a13.427 13.427 0 0 1-1.497 4.435c-.23 1.659 1.991 1.165 2.018-.199a14.277 14.277 0 0 0 1.254-7.552.865.865 0 0 0-.785-.579Zm-30.18.666c-1.677.386-.633 2.667-.608 3.876.371 1.623.792 3.35 1.79 4.696 2.382.321.571-2.338.292-3.492a15.92 15.92 0 0 1-.684-4.39.877.877 0 0 0-.79-.69Zm24.558 11.81c-1.755.865-3.303 2.266-5.274 2.765-1.162-.016-3.074 1.271-1.331 2.102 2.66-.447 5.163-1.733 7.236-3.445.472-.506.06-1.432-.631-1.421Zm-19.151.043c-2.004.786.416 2.405 1.43 2.913 1.608.904 3.379 1.636 5.208 1.877 1.77-.804-.228-2.094-1.357-2.073-1.75-.537-3.403-1.396-4.798-2.586l-.227-.104-.256-.027Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-non-interrupting-timer"><path d="M15.991 8.7c-3.018-.042-5.92 1.925-7.03 4.725-1.138 2.695-.509 6.011 1.537 8.102 1.99 2.142 5.267 2.93 8.013 1.927 2.877-.98 4.99-3.826 5.067-6.87.153-2.956-1.624-5.88-4.299-7.135a7.551 7.551 0 0 0-3.288-.75Zm0 1.383c2.758-.052 5.372 1.972 6.014 4.654.704 2.578-.482 5.516-2.79 6.867-2.358 1.48-5.682 1.085-7.617-.919-2.043-1.97-2.407-5.38-.84-7.743 1.11-1.764 3.149-2.88 5.233-2.86Zm1.962 1.764-2.074 3.762c-.64.068-.793 1.04-.202 1.3.39.27.696-.18 1.052-.165h3.17v-.865h-3.182l1.993-3.614-.757-.418ZM16.12.358h-.232l-.22.004h-.012l-.221.006h-.012l-.22.01h-.012l-.22.013h-.012l-.22.016h-.012l-.22.019h-.005l-.006.001-.22.021h-.006l-.005.001-.22.025h-.011l-.22.028h-.005l-.006.002-.219.03h-.005l-.006.001-.218.033-.006.001-.006.001-.217.036-.006.001-.006.001-.217.039-.006.001-.006.001-.216.042-.006.001-.006.001-.215.045-.006.001-.006.002-.215.047-.006.002-.006.001-.214.05-.006.002-.006.002-.115.029-.152.053-.14.081-.122.106-.1.126-.075.143-.047.154-.018.16.012.16.042.156.07.145.095.13.118.11.137.086.15.059.158.03h.161l.132-.022.11-.028.202-.047.203-.046.208-.043.202-.039.206-.037.206-.034.205-.03.208-.03.205-.025.209-.023.208-.02.21-.017.209-.015.207-.011.21-.009.21-.006.207-.003h.21l.21.002.207.005.207.008.212.011.207.014.208.017.209.019.208.022.205.025.206.028.207.03.208.035.205.036.202.039.052.01.16.018.16-.012.156-.042.146-.07.13-.096.109-.119.085-.136.06-.15.03-.159v-.16l-.03-.16-.059-.15-.086-.136L19.823.9l-.13-.096-.145-.07-.128-.038-.057-.011-.006-.002h-.006L19.135.64l-.006-.001-.006-.001-.217-.039H18.9l-.006-.002-.217-.035-.006-.001-.006-.001-.218-.032-.006-.001-.006-.001-.218-.03h-.006l-.006-.001-.219-.027h-.011l-.22-.024-.005-.001h-.006l-.22-.021h-.006L17.512.42l-.22-.017-.005-.001h-.006l-.22-.015h-.012l-.22-.012h-.012l-.22-.01h-.012l-.22-.005h-.012l-.221-.003h-.012Zm8.715 2.783-.157.034-.149.063-.134.089-.116.112-.092.132-.067.147-.038.157-.008.16.021.16.051.153.079.141.103.124.102.087.052.038h.001l.087.064v.001l.082.061.002.001.076.059h.001l.084.065.082.066.002.001.079.063.002.002.077.063.081.067.002.002.077.065.076.065.001.002.08.07.078.07h.002l.075.068.077.072.002.001.073.069.077.073.072.07.002.001.077.076.07.07v.001l.075.076.07.073.002.001.074.079.002.002.069.074.069.075.074.082.07.08.002.001.068.079h.001l.067.079.068.082.065.078.001.002.068.083.067.084.063.081.001.002.067.087.002.002.063.084.001.001.064.087.008.01.008.01.095.12.093.121.09.119.087.119.088.122.086.123.084.12.081.122.001.002.084.126.08.126.08.127.077.126.079.131.074.127.075.131.073.131.07.13.07.133.069.133.045.09.086.137.109.119.13.096.144.07.156.042.16.013.16-.017.155-.047.143-.075.126-.1.106-.121.082-.14.054-.151.025-.16-.005-.16-.035-.158-.05-.124-.048-.095-.002-.004-.002-.004-.073-.14-.002-.005-.002-.004-.074-.14-.002-.004-.002-.004-.076-.14-.002-.003-.002-.004-.077-.139-.003-.004-.002-.004-.078-.138-.003-.004-.002-.003-.08-.137-.002-.004-.003-.004-.081-.136-.002-.004-.003-.004-.083-.136-.002-.003-.002-.004-.085-.135-.002-.004-.003-.003-.085-.134-.003-.004-.002-.004-.087-.132-.003-.004-.003-.004-.088-.132-.003-.003-.002-.004-.09-.13-.003-.005-.003-.003-.091-.13-.003-.004-.002-.004-.093-.129-.003-.003-.003-.004-.094-.128-.003-.004-.003-.003-.095-.127-.003-.004-.003-.004-.097-.125-.003-.004-.003-.004-.09-.114-.06-.082-.003-.003-.002-.003-.069-.092-.002-.003-.002-.003-.07-.09-.003-.003-.002-.003-.07-.09-.003-.003-.002-.003-.071-.09-.002-.003-.003-.002-.072-.089-.002-.003-.002-.003-.073-.088-.002-.003-.002-.002-.074-.087-.002-.003-.002-.003-.074-.086-.003-.003-.002-.003-.074-.086-.003-.002-.002-.003-.075-.085-.003-.003-.002-.002-.076-.084-.002-.003-.003-.003-.076-.083-.002-.003-.003-.003-.077-.082-.002-.003-.003-.002-.077-.082-.003-.003-.003-.002-.078-.081-.002-.003-.003-.003-.078-.08-.003-.002-.003-.003-.079-.08-.002-.002-.003-.002-.08-.08-.002-.002-.003-.002-.08-.078-.003-.003-.003-.002-.08-.077-.003-.003-.003-.002-.082-.077-.002-.002-.003-.002-.082-.076-.003-.002-.002-.003-.083-.075-.003-.002-.002-.003-.084-.074-.002-.002-.003-.002-.084-.074-.003-.002-.002-.002-.085-.073-.002-.002-.003-.003-.085-.071-.003-.003-.002-.002-.086-.07-.003-.003-.002-.002-.086-.07-.003-.003-.003-.002-.086-.07-.003-.002-.003-.002-.087-.069-.002-.002-.003-.002-.088-.068-.002-.002-.003-.002-.088-.067-.003-.003-.003-.002-.088-.066-.003-.002-.003-.002-.089-.066-.003-.002-.003-.002-.057-.042-.14-.082-.15-.055-.16-.026-.16.004Zm-18.458.426-.157.037-.148.066-.111.074-.007.006-.003.002-.003.002-.086.069-.003.002-.002.002-.086.07-.003.002-.002.002-.086.07-.002.003-.003.002-.085.071-.002.002-.003.003-.084.071-.003.003-.002.002-.084.072-.003.003-.002.002-.083.073-.003.003-.002.002-.083.074-.002.002-.003.003-.082.074-.003.003-.002.002-.081.076-.003.002-.003.002-.08.077-.003.002-.003.003-.08.076-.002.003-.003.002-.08.078-.002.002-.003.003-.079.078-.002.003-.003.002-.078.08-.003.002-.002.002-.078.08-.002.003-.003.002-.077.08-.003.004-.002.002-.077.081-.002.003-.003.003-.076.082-.002.002-.003.003-.075.082-.002.003-.003.003-.074.083-.003.003-.002.003-.074.084-.003.003-.002.002-.074.085-.002.003-.002.003-.073.085-.003.003-.002.003-.072.086-.002.003-.003.003-.071.087-.003.003-.002.002-.07.088-.003.003-.002.003-.07.088-.003.003-.002.003-.07.09-.002.002-.002.003-.069.09-.002.003-.003.003-.068.09-.002.003-.002.003-.067.092-.003.003-.002.003-.067.092-.002.003-.002.003-.066.092-.002.003-.002.004-.066.093-.002.003-.002.003-.065.094-.002.003-.002.004-.064.094-.002.003-.002.004-.063.095-.002.003-.002.003-.063.097-.002.003-.002.003-.046.073-.05.07-.003.002-.002.003-.067.093-.003.003-.002.003-.066.094-.002.003-.002.003-.066.094-.002.003-.002.003-.064.094-.002.004-.002.003-.064.094-.002.004-.002.003-.062.095-.002.003-.002.003-.062.096-.002.003-.002.003-.06.096-.003.003-.002.003-.06.096-.001.004-.002.003-.059.096-.002.004-.002.003-.058.097-.002.003-.001.003-.057.098-.002.003-.002.003-.056.098-.002.003-.002.003-.055.098-.002.004-.001.003-.055.098-.001.004-.002.003-.054.099-.001.003-.002.003-.052.1-.002.002-.002.004-.051.1-.002.002-.002.004-.05.1-.002.003-.002.003-.05.1v.003l-.002.004-.05.1V9.5l-.002.004-.048.1-.002.004-.001.003-.047.101-.002.003-.001.004-.013.027-.052.152-.024.16.006.16.037.157.064.148.091.133.114.114.134.09.147.065.157.036.162.006.159-.024.152-.053.14-.08.122-.105.1-.126.066-.117.01-.023.044-.095.045-.095.002-.003.042-.087.048-.097.048-.095v-.001l.048-.092.001-.001.047-.09.05-.093.002-.002.049-.09.052-.092.001-.002.051-.089.001-.002.051-.087.053-.088.001-.002.055-.091.057-.091.057-.09.001-.002.057-.089.055-.083.001-.002.06-.09.06-.088.062-.089.001-.001.06-.084.063-.088.065-.089.017-.023.016-.025.06-.094.059-.09v-.002l.058-.086.057-.086.001-.001.062-.09.062-.088.001-.002.06-.085.002-.002.06-.082.063-.087.064-.084.002-.002.061-.08.065-.084.064-.08v-.001l.067-.083.067-.082.07-.083.069-.08.063-.074.074-.083.068-.077.002-.002.07-.076.07-.075.072-.077.001-.001.067-.07.076-.078.002-.002.07-.07.075-.075.002-.002.072-.07.075-.072.002-.002.073-.069.074-.068.001-.001.08-.073.076-.068.002-.002.072-.063v-.001l.078-.067.079-.068.002-.001.08-.068.002-.002.077-.063.082-.066.001-.001.075-.06.002-.002.006-.004.117-.111.094-.131.068-.146.04-.156.01-.161-.019-.16-.049-.154-.076-.141-.102-.125-.123-.105-.14-.079-.153-.052-.16-.023-.16.007Zm24.596 11.088-.156.04-.146.067-.131.094-.112.117-.087.135-.061.15-.033.157-.004.134.007.142.005.152.004.15.002.149v.153l.001.011v.015l.004.11.002.11v.002l.002.106v.321l-.003.102-.002.106-.004.107-.005.105-.006.106-.006.106-.008.106v.002l-.008.103v.002l-.01.1-.01.105-.01.105-.013.105-.012.099v.002l-.014.108-.014.1-.016.105-.016.103v.002l-.017.099-.018.104-.019.103v.002l-.019.097-.02.104-.022.103v.001l-.022.098-.023.103v.002l-.024.096-.025.103v.002l-.024.096-.027.102v.003l-.026.093v.001l-.029.103v.002l-.03.099-.028.097v.002l-.03.095-.03.096v.001l-.033.1-.031.095v.002l-.035.1v.003l-.034.094v.003l-.035.096v.001l-.034.09v.002l-.038.098-.036.093v.002l-.038.095-.079.194-.08.188-.085.189-.087.19-.09.184-.092.183-.095.184-.05.093-.064.148-.034.158-.005.16.026.16.054.151.082.14.106.12.127.1.143.075.154.046.16.017.161-.013.156-.042.144-.071.13-.096.109-.119.072-.112.053-.099.003-.005.003-.006.102-.195.003-.006.003-.006.098-.196.003-.006.003-.006.096-.197.002-.006.003-.006.093-.2.002-.006.003-.006.09-.2.002-.006.003-.007.086-.202.003-.006.002-.006.084-.203.002-.005.001-.005.04-.102.002-.003.001-.003.04-.103.001-.003.001-.003.04-.103v-.004l.001-.003.039-.103v-.003l.002-.003.037-.104.001-.003.001-.003.037-.104v-.004l.002-.003.035-.104.002-.003v-.004l.035-.104.002-.004v-.003l.034-.105.002-.003v-.003l.034-.105v-.004l.002-.003.032-.106.001-.003.001-.003.031-.106.001-.003.001-.004.031-.106.001-.003.001-.004.03-.106v-.003l.002-.004.028-.107.001-.003.001-.003.028-.107.001-.004.001-.003.027-.107.001-.004v-.003l.027-.108.001-.003v-.004l.026-.108.001-.003v-.004l.025-.108.001-.003v-.004l.025-.108v-.004l.001-.003.023-.109v-.003l.001-.004.022-.109v-.003l.002-.004.02-.109.001-.004v-.003l.02-.11.002-.003v-.004l.02-.11v-.007l.019-.11v-.003l.001-.004.017-.11v-.004l.001-.003.017-.11v-.008l.016-.11v-.004l.001-.004.015-.11v-.008l.015-.111v-.008l.013-.111v-.007l.013-.112v-.007l.011-.112v-.004l.001-.004.01-.112v-.007l.01-.112v-.008l.008-.112v-.008l.007-.113v-.007l.007-.113v-.008l.005-.113v-.007l.005-.114v-.007l.003-.114v-.007l.003-.114v-.129l.001-.114v-.13l-.003-.114V16.5l-.003-.115v-.007l-.003-.102v-.155l-.003-.158v-.01l-.004-.158v-.01l-.006-.158v-.01l-.007-.148-.023-.16-.051-.152-.08-.14-.103-.124-.125-.102-.142-.077-.153-.05-.16-.02-.161.01Zm-30.213.66-.157.034-.149.063-.134.09-.115.113-.092.132-.067.147-.037.156-.009.134.001.11V16.308l.006.22v.012l.01.22v.012l.012.22v.006l.001.006.015.22v.005l.001.006.018.22.001.006v.006l.022.219v.006l.001.006.024.219.001.006v.006l.028.218.001.006v.006l.031.218.001.006.001.006.033.218.001.006.001.005.037.218v.006l.002.005.04.217v.006l.001.006.043.216.001.006.001.006.046.216v.005l.002.006.048.215.002.006.001.006.051.214.002.006v.006l.055.214.002.005.001.006.057.213.002.006.001.005.06.213.002.005.001.006.063.212.002.005.001.006.066.21.002.006.002.006.068.21.002.005.002.005.07.21.003.005.002.005.074.208.002.006.002.005.077.207.002.006.002.005.08.206.002.005.002.006.082.204.002.006.002.005.086.204.002.005.002.006.088.202.002.005.003.006.09.2.003.006.002.005.094.2.002.006.003.005.096.199.002.005.003.005.03.062.086.137.11.118.128.097.145.07.156.043.16.013.16-.017.155-.047.143-.074.127-.1.106-.121.081-.14.055-.15.025-.16-.005-.161-.034-.158-.05-.124-.028-.055-.092-.19-.087-.188-.087-.192-.083-.19-.08-.193-.078-.194-.076-.196-.073-.195-.07-.197-.067-.198-.065-.199-.063-.2-.059-.2-.056-.2-.055-.204-.05-.201-.049-.202-.046-.205-.043-.206-.04-.203-.038-.207-.034-.204-.032-.207-.028-.205-.026-.207-.023-.208-.02-.207-.018-.207-.014-.208-.011-.207-.009-.208-.005-.207-.002-.104-.017-.16-.046-.155-.074-.143-.1-.126-.121-.107-.139-.081-.152-.055-.159-.025-.161.004Zm24.585 11.83-.156.039-.146.068-.11.076-.015.012-.163.129-.166.127-.168.125-.17.124-.17.12-.172.118-.173.115-.176.114-.177.111-.18.11-.178.105-.182.104-.182.101-.184.1-.184.095-.189.095-.186.09-.188.089-.19.086-.19.082-.193.081-.195.078-.191.074-.197.073-.195.07-.196.065-.198.064-.198.061-.2.058-.2.055-.2.052-.2.049-.151.035-.153.05-.141.078-.125.103-.103.124-.078.14-.05.154-.022.16.009.16.038.157.067.147.093.132.116.112.134.089.149.062.158.034.16.003.133-.02.158-.035.006-.002.006-.001.213-.052.006-.002.007-.001.212-.056.006-.001.006-.002.212-.058.006-.002.006-.002.211-.061.006-.002.006-.002.21-.064.006-.002.006-.002.21-.067.005-.002.006-.002.208-.07.006-.002.006-.003.207-.073.006-.002.006-.002.206-.077.006-.002.005-.002.206-.08.005-.001.006-.003.204-.082.006-.002.005-.002.203-.085.006-.003.005-.002.202-.088.006-.002.005-.003.2-.09.006-.003.006-.003.2-.093.005-.003.005-.002.198-.096.006-.003.005-.003.197-.099.005-.002.005-.003.196-.102.005-.002.005-.003.195-.105.005-.002.005-.003.193-.107.005-.003.005-.003.191-.11.005-.003.005-.003.19-.112.005-.003.005-.003.189-.115.005-.003.005-.003.187-.117.005-.003.004-.004.186-.12.005-.003.004-.003.184-.122.005-.003.005-.004.182-.125.004-.003.005-.003.18-.128.005-.003.005-.003.179-.13.004-.003.005-.004.177-.132.004-.004.005-.003.175-.135.005-.003.004-.004.173-.137.005-.003.004-.004.019-.015.115-.113.092-.132.066-.147.038-.157.008-.16-.022-.16-.052-.153-.079-.14-.103-.124-.125-.102-.142-.078-.153-.05-.16-.02-.16.01Zm-19.17.054-.153.051-.14.079-.124.103-.103.125-.077.141-.05.153-.02.16.009.161.04.156.067.147.093.131.095.094.047.04.005.004.005.004.17.14.005.004.005.004.172.137.004.004.005.003.086.067.003.002.003.002.087.067.003.002.003.002.088.066.002.003.003.002.089.065.002.002.003.002.09.065.002.002.003.002.09.064.002.002.003.002.09.063.003.002.003.002.09.063.003.002.003.002.092.062.002.002.003.002.092.061.003.002.003.002.092.06.003.003.003.001.093.06.003.002.003.002.093.06.003.001.003.002.094.058.003.002.003.002.095.058.003.001.003.002.095.057.003.002.003.002.095.056.003.002.003.002.096.055.004.002.003.001.096.055.003.002.003.002.098.053.003.002.003.002.097.053.004.002.003.001.098.053.003.001.003.002.099.052.003.001.003.002.1.05.003.002.003.002.1.05.003.002.003.001.1.05h.003l.004.003.1.048.004.001.003.002.101.048.003.001.004.002.101.046.004.002.003.001.102.046.004.002.003.001.103.045.003.002.003.001.103.045.004.001.003.002.104.043.003.001.004.002.104.042.003.002.004.001.104.042.004.001.003.002.105.04.004.002.003.001.106.04.003.002h.004l.106.04.004.001.003.002.107.038.003.001.004.001.107.038.003.001.004.001.107.037.004.001.004.001.108.036.003.001.004.001.108.035.004.001.003.001.11.034.003.001.004.001.109.033.004.002h.003l.11.033h.004l.003.002.11.031.004.001.004.001.084.023.081.028.004.001.003.001.109.037.003.001.004.001.109.036.003.001.004.001.109.035h.003l.004.002.11.033.003.001.003.001.11.033.003.001.004.001.109.031.004.002h.003l.11.031.003.001.004.001.11.03h.003l.003.001.11.029h.004l.003.002.11.027.003.001.004.001.11.027h.003l.004.001.004.001.16.022.16-.008.157-.038.147-.067.132-.092.112-.116.09-.134.062-.149.034-.157.004-.161-.025-.16-.055-.151-.082-.139-.107-.12-.127-.1-.143-.074-.124-.04h-.003l-.104-.025-.103-.026h-.002l-.095-.026h-.001l-.101-.027h-.002l-.1-.028h-.002l-.103-.03-.104-.032-.097-.03h-.002l-.103-.033-.102-.033-.101-.034-.106-.036-.027-.01-.027-.007-.107-.03-.104-.029-.104-.03h-.002l-.097-.03-.102-.032-.102-.032-.102-.034-.103-.035-.096-.034-.1-.036-.101-.037h-.002l-.094-.036-.096-.037-.097-.04h-.002l-.099-.04-.098-.042h-.002l-.092-.04-.097-.043-.095-.043-.097-.044h-.002l-.09-.043-.094-.045-.094-.046-.093-.047-.09-.046-.096-.05-.088-.047-.002-.001-.09-.049-.094-.052-.002-.002-.087-.049-.087-.05h-.002l-.088-.053h-.001l-.09-.055-.086-.052-.002-.001-.089-.055-.084-.054h-.002l-.09-.059h-.001l-.085-.056-.001-.001-.084-.056-.082-.056h-.001l-.086-.06-.082-.058H7.79l-.086-.062-.002-.002-.08-.058-.081-.06h-.001l-.085-.064-.002-.002-.076-.058-.002-.002-.082-.064-.161-.128-.162-.133-.04-.034-.132-.092-.147-.066-.157-.038-.16-.008-.16.022Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-none"><path d="M15.847.004C9.61-.016 3.624 4.014 1.257 9.78-1.235 15.49.06 22.581 4.42 27.034c4.193 4.513 11.101 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.268.403-6.228-3.26-12.441-8.87-15.154A15.924 15.924 0 0 0 15.846.004Zm.439 1.729c6.105.033 11.856 4.45 13.435 10.359 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.625-4.814-3.84-6.538-10.94-4.067-16.57 2.14-5.206 7.515-8.775 13.147-8.71.097-.001.194-.002.29-.001Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-parallel-multiple"><path d="M15.847 0C9.61-.02 3.624 4.01 1.257 9.775-1.235 15.485.06 22.577 4.42 27.03c4.193 4.513 11.101 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.268.403-6.228-3.26-12.441-8.87-15.154A15.924 15.924 0 0 0 15.846 0Zm.439 1.729c6.105.033 11.856 4.45 13.435 10.359 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.625C2.101 23.17.377 16.07 2.848 10.44c2.134-5.2 7.522-8.78 13.147-8.71.097-.001.194-.002.29-.001ZM13.504 9.08v4.427H9.077v4.98h4.427v4.427h4.98v-4.427h4.428v-4.98h-4.427V9.08h-4.98Zm.83.83h3.32v4.427h4.428v3.32h-4.427v4.427h-3.32v-4.453H9.906v-3.294h4.427V9.91Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-signal"><path d="M15.995.005C9.705-.08 3.643 3.968 1.257 9.78-1.235 15.49.06 22.581 4.42 27.034c4.193 4.513 11.102 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.269.403-6.227-3.26-12.44-8.87-15.153A15.924 15.924 0 0 0 15.994.005Zm0 1.73c6.213-.108 12.122 4.355 13.726 10.357 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.626-4.814-3.838-6.538-10.939-4.067-16.57 2.14-5.205 7.515-8.774 13.147-8.708Zm0 6.776L9.19 20.724H22.8L15.995 8.511Zm0 1.777 5.332 9.572H10.662l5.333-9.572Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-start-event-timer"><path d="M16 0C7.174 0 0 7.174 0 16s7.174 16 16 16 16-7.174 16-16S24.826 0 16 0Zm0 1.73c7.892 0 14.27 6.378 14.27 14.27 0 7.891-6.379 14.27-14.27 14.27S1.73 23.891 1.73 16C1.73 8.108 8.108 1.73 16 1.73Zm-.143 6.676c-2.967.02-5.797 1.97-6.89 4.727-1.138 2.695-.51 6.012 1.537 8.102 1.99 2.142 5.268 2.932 8.014 1.928 2.878-.98 4.992-3.827 5.068-6.87.153-2.957-1.624-5.881-4.3-7.137a7.552 7.552 0 0 0-3.43-.75Zm.27 1.383c2.71.012 5.254 2.015 5.886 4.656.704 2.577-.482 5.517-2.791 6.867-2.358 1.48-5.682 1.085-7.618-.918-2.043-1.971-2.407-5.381-.84-7.745 1.11-1.763 3.15-2.88 5.234-2.86h.13Zm1.833 1.765-2.074 3.763c-.64.068-.793 1.04-.202 1.3.39.27.696-.18 1.052-.165h3.17v-.865h-3.181l1.992-3.615-.757-.418Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-subprocess-collapsed"><path d="M5.637 3A5.644 5.644 0 0 0 0 8.637v15.417a5.644 5.644 0 0 0 5.637 5.637h20.726A5.644 5.644 0 0 0 32 24.054V8.637A5.644 5.644 0 0 0 26.363 3H5.637Zm0 1.778h20.726a3.83 3.83 0 0 1 3.859 3.859v15.417a3.83 3.83 0 0 1-3.859 3.858h-4.201V16.695H9.838v11.217H5.637a3.83 3.83 0 0 1-3.859-3.858V8.637a3.83 3.83 0 0 1 3.859-3.859Zm5.33 13.046h10.066v10.065H10.967V17.824Zm4.189 1.431V22.06H12.35v1.689h2.804V26.554h1.69V23.749h2.804V22.06h-2.804V19.255h-1.69Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-subprocess-expanded"><path d="M5.636 3A5.642 5.642 0 0 0 0 8.636v15.418a5.643 5.643 0 0 0 5.636 5.636h20.728A5.643 5.643 0 0 0 32 24.054V8.636A5.642 5.642 0 0 0 26.364 3H5.636Zm0 1.778h20.728a3.83 3.83 0 0 1 3.858 3.858v15.418a3.83 3.83 0 0 1-3.858 3.858h-4.203V16.723H9.84v11.189H5.636a3.83 3.83 0 0 1-3.858-3.858V8.636a3.83 3.83 0 0 1 3.858-3.858Zm5.331 13.074h10.066v10.06H10.967v-10.06Zm1.336 3.996v1.711h7.394v-1.71h-7.394Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-task-none"><path d="M6.494 2.667C2.916 2.667 0 5.57 0 9.142v13.383C0 26.097 2.916 29 6.494 29h19.012C29.084 29 32 26.097 32 22.525V9.142c0-3.572-2.916-6.475-6.494-6.475H6.494Zm0 2h19.012c2.509 0 4.494 1.98 4.494 4.475v13.383C30 25.02 28.015 27 25.506 27H6.494C3.985 27 2 25.02 2 22.525V9.142c0-2.495 1.985-4.475 4.494-4.475Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-text-annotation"><path d="M22.087 0v31.647H32v-1.788h-8.125V1.788H32V0h-9.913Zm-2.924 13.999-2.737 2.167 2.167 2.738 2.738-2.167-2.168-2.738Zm-5.475 4.335L10.95 20.5l2.168 2.738 2.737-2.168-2.167-2.737Zm-5.475 4.335-2.738 2.167 2.168 2.738 2.737-2.168-2.167-2.737Zm-5.476 4.335L0 29.17l2.167 2.738 2.738-2.168-2.168-2.737Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-transaction"><path d="M5.422 3A5.424 5.424 0 0 0 0 8.422v15.822a5.424 5.424 0 0 0 5.422 5.423h21.156A5.424 5.424 0 0 0 32 24.244V8.422A5.424 5.424 0 0 0 26.578 3H5.422Zm0 1.244h21.156a4.155 4.155 0 0 1 4.178 4.178v15.822a4.155 4.155 0 0 1-4.178 4.178H5.422a4.155 4.155 0 0 1-4.178-4.178V8.422a4.155 4.155 0 0 1 4.178-4.178Zm1.056 1.778a3.373 3.373 0 0 0-3.367 3.366v13.89a3.373 3.373 0 0 0 3.367 3.366h19.044a3.373 3.373 0 0 0 3.367-3.366V9.388a3.373 3.373 0 0 0-3.367-3.366H6.478Zm0 1.245h19.044c1.187 0 2.122.935 2.122 2.121v13.89a2.104 2.104 0 0 1-2.122 2.122H6.478a2.104 2.104 0 0 1-2.122-2.122V9.388c0-1.186.935-2.121 2.122-2.121Z" /></symbol><symbol  viewBox="0 0 32 32" id="bpmn-icon-user-task"><path fill-rule="evenodd" d="M10.263 7.468c-1.698 0-2.912 1.305-2.915 2.791v.001c0 .45.121.924.311 1.352.138.309.308.593.516.82-1.235.423-2.683 1.119-3.414 2.49l-.04.075v4.44h11.083v-4.44l-.04-.074c-.72-1.352-2.136-2.047-3.36-2.471.597-.608.774-1.392.774-2.192-.004-1.487-1.218-2.792-2.915-2.792Zm-1.16 1.583c.08 0 .165.003.26.008.757.045 1.012.181 1.207.31.196.13.334.252.851.268.404-.016.598-.087.737-.169.056-.033.103-.067.152-.1.128.275.197.578.198.893 0 .894-.154 1.52-.975 2.034l.08.604c.171.052.348.11.527.171.025.105.054.242.073.387.02.153.029.311.016.43a.422.422 0 0 1-.056.19c-.417.417-1.157.66-1.908.66-.75 0-1.49-.243-1.908-.66a.422.422 0 0 1-.056-.19 1.949 1.949 0 0 1 .016-.43c.02-.146.049-.284.074-.388.177-.062.352-.118.521-.17l.048-.648a.616.616 0 0 0-.126-.118c-.183-.138-.405-.44-.562-.793-.157-.353-.254-.757-.254-1.08 0-.387.105-.758.297-1.079l.11-.04c.143-.046.339-.09.679-.09Zm-1.448 4.304-.002.014c-.025.185-.04.387-.018.589.021.202.074.42.248.593.595.594 1.494.857 2.382.857.889 0 1.788-.263 2.382-.857.174-.174.227-.391.249-.593a2.496 2.496 0 0 0-.018-.59l-.002-.01c.903.396 1.776.963 2.258 1.81v3.599H13.53v-2.538h-.67v2.538H7.651v-2.538h-.67v2.538H5.39v-3.599c.483-.849 1.359-1.416 2.264-1.813ZM6.495 3C2.914 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494Zm0 2h19.01C28.016 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5Z" /></symbol><symbol   viewBox="0 0 128 64" id="bpmn-multiple-state"><defs><path id="bpmn-multiple-state_a" d="M9 9h110v47H9z" /><mask id="bpmn-multiple-state_b" width="110" height="47" x="0" y="0" fill="#fff" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox"><use xlink:href="#bpmn-multiple-state_a" /></mask></defs><g fill="none" fill-rule="evenodd"><path fill="#818798" d="M25 20.272 37.728 33 25 45.728 12.272 33 25 20.272Zm0 2.829L15.1 33l9.9 9.9 9.9-9.9-9.9-9.9Z" /><path fill="#D5D7DD" d="M17 47h16v6H17z" /><path fill="#818798" d="M35 32h27v2H35z" /><path fill="#818798" d="M60 30v6l6-3z" /><path fill="#D5D7DD" d="M80 34h21v6H80z" /><path fill="#818798" d="M111 12a5 5 0 0 1 5 5v31a5 5 0 0 1-5 5H70a5 5 0 0 1-5-5V17a5 5 0 0 1 5-5h41Zm0 2H70a3 3 0 0 0-3 3v31a3 3 0 0 0 3 3h41a3 3 0 0 0 3-3V17a3 3 0 0 0-3-3Z" /><path fill="#D5D7DD" d="M75 25h31v6H75z" /><use stroke="currentColor" stroke-dasharray="5 2" stroke-width="2" mask="url(#bpmn-multiple-state_b)" xlink:href="#bpmn-multiple-state_a" /></g></symbol><symbol viewBox="0 0 1024 1024"  id="camel-service-task"><path d="M884.16 653.12c-1.92-8.96-3.52-17.92-5.76-26.88-4.48-19.52-9.28-38.72-13.76-58.24-.32-1.6-1.6-2.88-2.56-5.12-7.36 16-4.48 31.36-.96 46.72 4.48 19.52 11.52 38.08 20.8 55.68 2.88 5.76 3.84 13.44 3.2 19.84-2.56 29.44-6.4 58.88-9.28 88.32-.64 5.76.64 11.84 2.24 17.6 4.16 15.04 2.56 30.08-.32 45.12-1.28 6.4-4.48 11.2-11.52 10.56-16.64-1.92-33.28-4.48-51.2-7.04 3.52-8.96 10.56-10.88 16.64-9.92 10.88 1.6 14.72-4.48 16.64-12.48 2.88-11.2 6.08-22.4 6.4-33.6 1.28-32.32.96-64.96-9.28-96.32-2.24-6.72-4.16-13.44-8-19.2-8.64-13.44-11.84-28.16-15.04-43.52-1.6-7.68-5.12-15.04-8.64-22.08-.96-2.24-4.8-4.8-6.72-4.48-1.92 0-4.8 3.84-4.8 6.4-.64 8.96-1.28 18.24-.64 27.52.64 9.6 1.92 19.2 3.52 28.8 1.6 9.6 3.2 19.2 6.08 28.48 2.56 8 2.24 15.04-1.6 22.4l-53.76 103.68c-2.88 5.44-5.12 11.52-7.04 17.28-5.12 14.72-16 22.08-31.04 23.04-9.6.64-19.52 0-29.12-1.28-3.52-.32-6.4-4.48-9.92-6.72 2.56-3.2 4.8-7.36 8-9.92 3.2-2.24 7.36-3.2 11.2-3.84 15.36-2.24 25.92-11.52 31.68-24.64 8.96-19.84 16.64-40.32 24-61.12 4.16-11.2 7.36-22.72 10.24-34.24 4.16-18.88-1.6-36.8-6.72-54.4-3.2-10.56-2.88-19.84.64-30.4 2.24-6.4 2.24-15.36-.96-21.44-12.48-25.28-24.32-50.88-31.68-78.08 0-.64-.96-1.28-1.92-2.24-2.24 1.28-4.8 2.24-7.04 3.52-24 13.76-48.64 24.96-74.88 33.28-5.44 1.6-10.24 4.8-15.68 7.04-2.88 1.28-6.08 2.24-9.28 2.56-38.4 2.24-76.8 3.2-114.24-9.28-5.44-1.92-11.2-2.56-16.64-4.16-8.64-2.24-13.76 1.28-13.76 10.24 0 25.92 2.24 51.84 8.96 77.12 5.12 19.2 8.64 38.72 8.64 58.88 0 14.4 4.8 28.8 7.36 43.2l13.44 73.28c1.6 8.96-5.12 18.88-15.68 20.48-9.28 1.6-18.88.96-28.16 1.28-5.12 0-10.56-.64-15.68-.96-6.4-.32-8-2.56-5.44-8.64 2.88-7.04 8.64-10.88 16-12.48 14.4-3.2 17.6-7.36 17.92-21.76.32-23.04-2.56-46.08-9.28-67.84-3.52-10.88-9.92-20.8-15.04-31.36-.96 0-1.6.32-2.56.64-.64 3.84-1.6 8-1.28 11.84 1.6 20.48 3.52 40.64 5.12 61.12.96 11.52 1.6 23.36 2.24 35.2 0 6.4-2.24 10.56-9.6 11.52-15.68 1.92-31.36 4.8-47.36 6.72-3.2.32-8.96-2.24-9.92-5.12-1.92-5.12 2.24-8.64 7.36-10.24 1.28-.32 2.56-.64 3.52-.96 11.52-4.48 21.44-10.56 22.4-24.96 1.28-20.48 3.52-40.64 4.48-61.12 0-6.08-1.28-12.8-3.84-17.92-8.32-16.96-10.24-34.24-5.44-52.16 3.52-12.8 3.84-25.6.64-38.4-.64-2.88 0-6.08-.64-8.96-1.28-6.4-1.6-13.76-4.8-18.88-8-12.8-13.76-26.56-16.32-41.28a26.208 26.208 0 0 0-9.6-16.32c-7.36-6.08-13.12-14.4-20.8-20.16-5.44-3.84-13.12-5.44-19.84-6.08-2.56 0-7.04 4.8-7.68 8.32-1.28 5.44-3.52 7.68-8.64 8.32-15.68 2.56-30.4-1.28-45.76-4.8-27.52-6.4-48-24.32-67.52-42.24-16-14.4-21.12-35.84-24.96-56.64-2.56-14.08-5.76-27.84-6.72-41.92-.64-12.48 1.6-25.28 2.24-37.76.64-7.68 1.28-15.36.64-23.04 0-2.88-3.52-6.08-6.08-8-11.84-7.36-23.04-15.68-38.08-16.32-6.72 0-12.16-9.28-9.92-18.88 1.92-9.6 4.8-19.52 10.24-27.52 3.2-5.12 11.2-8.32 17.6-9.6 14.72-2.56 29.12-5.76 43.2-11.84 14.4-6.08 28.16-7.04 40.96 5.12 6.72 6.4 15.68 8 25.28 6.72 3.84-.32 8.32 1.92 11.84 3.52.96.32 1.28 4.16.32 5.76-4.48 8.32-4.8 13.76 1.6 20.16 16 16 19.52 35.52 19.52 56.96 0 10.88.32 22.08 1.6 32.96 1.28 11.2 5.44 13.76 16.32 10.88 29.12-7.36 50.56-26.24 66.24-50.56 16-24.64 29.76-50.56 44.16-76.16 8-14.08 15.36-28.48 23.36-42.56 2.88-5.12 5.76-9.92 9.6-14.4 10.24-12.8 23.36-17.28 36.16-12.8 13.44 4.8 22.4 18.24 22.08 33.92 0 4.8-.64 9.6-1.6 14.08-2.24 8.96 0 16.64 3.84 24.64 5.76 12.8 11.2 25.92 16 39.36 3.84 9.92 7.36 20.16 16.64 25.92 4.48 2.88 10.56 4.16 16 5.12 5.76.64 10.24-3.2 10.24-8.64 0-24 9.28-45.76 14.4-68.16 2.24-10.24 1.92-20.8 4.16-31.04 3.84-17.28 16-26.88 32.64-30.08 15.36-2.88 27.84 2.56 38.4 15.04 6.08 7.04 13.44 13.76 21.76 17.6 27.84 13.12 47.04 34.24 60.16 61.12 7.36 15.04 14.72 30.08 20.48 45.76 3.84 9.92 5.76 20.48 7.36 31.04 1.92 13.44 8.64 21.12 21.76 24.96 19.84 6.08 36.16 17.28 48 34.88 6.72 9.92 9.28 20.8 8.96 32.64-.32 21.76 3.52 43.2 8 64.32 3.2 15.04 3.2 30.72 4.48 46.08 2.88 31.68 6.08 63.04 9.28 94.72 0 3.2.32 6.4.64 9.28-1.28 0-2.56.64-3.84.64z" /></symbol><symbol  viewBox="0 0 20 20" id="copy-service-task"><path d="M16.42 2.06a1.2 1.2 0 0 1 1.54 1.45l-.02.07-4.53 13.59c-.1.3-.32.55-.6.7-.57.29-1.26.07-1.58-.47l-.04-.07-2.84-5.68-5.68-2.84c-.23-.12-.42-.3-.54-.54l-.04-.08-.03-.08c-.2-.61.11-1.26.69-1.5l.07-.03 13.6-4.52Zm-.46 2.9-6.22 6.22 2.49 4.98 3.73-11.2Zm-.92-.92L3.83 7.78l4.98 2.49 6.23-6.22Z" /></symbol><symbol viewBox="0 0 1024 1024"  id="dmn-service-task"><path d="M138.88 186.56v650.88c0 26.56 21.44 48 48 48h650.56c26.56 0 48-21.44 48-48V186.88c0-26.56-21.44-48-48-48H186.56c-26.56 0-48 21.44-48 48zM372.16 838.4H201.28c-8.64 0-16-7.04-16-16V698.24h186.56v139.84zm0-186.56H185.28V512h186.56v139.84zM605.44 838.4H418.88V698.56h186.56V838.4zm0-186.56H418.88V512h186.56v139.84zM822.72 838.4H651.84V698.56H838.4v124.16c0 8.64-7.04 16-16 16zm16-186.56H652.16V512h186.56v139.84zm0-186.56H652.16V325.44h-46.72v139.84H418.88V325.44h-46.72v139.84H185.28V341.12c0-8.64 7.04-16 16-16h621.44c8.64 0 16 7.04 16 16v124.16z" /></symbol><symbol viewBox="0 0 1024 1024"  id="http-service-task"><path d="M511.68 83.84c-235.52 0-426.88 189.44-427.2 427.84-.32 235.84 189.12 428.16 426.56 428.48 235.84.32 426.88-189.12 428.48-427.84-.96-237.12-190.4-428.48-427.84-428.48zM238.72 462.4c8.64-7.68 16.64-16.32 25.92-23.36 12.16-9.28 26.88-12.8 41.92-12.8h120.96c20.8 0 39.36-8 56-20.16 17.92-13.12 35.84-26.24 53.76-39.04 18.88-13.44 38.08-26.88 56.96-40a30.4 30.4 0 0 1 5.44-3.2c.32.32.64.96.96 1.28-2.24 2.56-4.48 5.12-7.04 7.36-66.56 66.88-133.44 133.76-200 200.32a21.12 21.12 0 0 1-6.4 4.48c-27.52 8.96-49.92 25.28-70.08 45.44l-2.56 2.56c-.32.32-.96.64-2.24 1.28l-12.48-18.24c-20.8-31.04-41.6-62.4-62.4-93.44-3.52-5.12-3.2-8.32 1.28-12.16zm423.04-40.96c-18.88 27.2-38.08 54.4-57.28 81.6-4.48 6.08-9.6 11.84-13.76 17.92-12.48 18.24-17.6 38.72-17.6 60.8V694.4c0 21.12-7.36 39.04-22.08 53.76-5.12 5.12-10.56 10.24-15.36 15.68-2.56 2.88-4.8 2.88-8 .64-27.84-18.56-55.36-37.12-83.2-55.68-10.24-7.04-20.48-13.76-30.72-20.48 9.6-11.2 19.52-21.44 27.52-33.28 7.68-11.84 13.44-24.96 19.84-37.76 2.24-4.48 4.48-9.28 8-12.8C536.64 536.64 604.48 468.8 672 400.96c.96-.96 2.24-1.92 3.2-2.88.32.32.96.64 1.28.96-5.12 7.36-10.24 14.72-15.04 21.76zm88-131.52c-11.2 19.52-24 38.4-35.84 57.28-19.84 32-48.64 55.68-74.88 81.92C580.8 488 522.24 546.24 464 605.12c-1.92 1.92-3.2 4.16-4.16 6.72-8.64 29.12-27.2 52.16-48.32 72.96-5.76 5.76-11.84 11.2-17.28 17.28-3.2 3.52-5.44 3.2-8.32 0s-5.76-6.08-8.96-9.6c-3.84 3.52-6.72 6.72-9.6 9.6-5.12 5.12-9.28 6.72-15.68 2.56-6.72-4.48-12.16-10.56-18.24-16-.96-.96-1.6-2.24-2.88-3.84-3.52 2.88-6.72 5.76-10.24 8.64-4.8 3.52-9.6 7.36-15.04 10.56-2.56 1.6-6.4 1.28-9.6 1.6.32-3.2-.32-7.04 1.28-9.6 4.48-7.04 9.6-13.76 14.4-20.48 1.28-1.6 2.56-3.2 4.48-5.12-2.24-1.6-4.16-2.88-5.76-4.8-5.12-6.08-10.24-11.84-14.72-18.56-3.2-4.48-2.24-9.28 2.24-13.12 3.52-2.88 7.36-5.76 11.2-8.64v-3.52c-3.52-2.88-7.68-5.44-10.88-8.96-.96-.96-.96-4.8 0-5.76 20.8-20.8 40-43.2 66.56-56.64 7.04-3.52 14.72-6.08 21.76-9.6 3.84-1.92 8-3.52 10.56-6.4 74.88-74.88 149.76-150.08 224.96-224.64 11.52-11.2 25.6-19.84 38.72-29.44 18.56-13.44 37.12-26.88 58.88-34.56 8.64-2.88 17.6-5.12 26.56-5.12 8.96 0 13.12 5.44 13.44 14.72.64 12.48-3.84 24-9.6 34.24z" /><path d="M658.24 294.4c-1.6 0-3.84 1.6-4.8 2.88-3.2 6.08-5.76 12.48-8.96 19.52 11.84-1.28 21.76.32 29.76 8.32 8.32 8 9.92 18.24 9.28 29.12 1.6 0 2.24 0 2.56-.32 3.84-1.6 7.36-3.2 11.2-5.12 8-3.84 9.92-7.04 8.96-16-2.56-24.96-23.04-41.6-48-38.4z" /></symbol><symbol viewBox="0 0 1024 1024"  id="mail-service-task"><path d="M892.48 390.72V231.04c0-34.24-27.84-62.4-62.4-62.4h-216L539.2 108.8c-21.76-15.04-50.56-14.72-72 .64l-71.04 58.88H193.92c-34.24 0-62.4 27.84-62.4 62.4V388.8l-48 40v434.56c0 34.24 27.84 62.4 62.4 62.4h732.16c34.24 0 62.4-27.84 62.4-62.4V429.12l-48-38.4zm-41.6 88.64L512 618.88 173.12 479.36V231.04c0-11.52 9.28-20.8 20.8-20.8h636.16c11.52 0 20.8 9.28 20.8 20.8v248.32z" /><path d="M523.2 258.88c-40 0-73.28 12.16-99.84 36.48-25.6 23.36-38.72 51.52-38.72 84.48s11.2 57.28 33.28 77.44c24 21.44 56.64 32.32 97.92 32.32 35.84 0 68.16-9.6 97.28-28.48l-10.24-14.08c-25.28 16.96-53.76 25.28-85.76 25.28-30.4 0-54.4-8.32-72.32-24.64-18.56-16.96-27.84-40-27.84-69.12s9.6-53.12 28.48-72.64c20.48-20.8 46.4-31.04 77.76-31.04 28.48 0 51.84 7.04 70.4 21.76 19.52 15.36 29.44 35.52 29.44 60.16 0 17.92-5.44 33.92-16.64 48.32-11.84 15.36-26.24 23.36-43.2 23.36-4.8 0-7.36-2.24-7.36-6.72 0-6.4 5.44-28.8 16-67.52 6.4-21.76 11.52-38.72 16-49.92h-29.12l-1.28 3.2c-5.12-4.8-13.76-7.36-25.28-7.36-20.8 0-39.68 9.28-56.32 27.52-19.84 21.76-29.44 46.4-29.44 74.24s13.76 42.88 40.96 42.88c17.92 0 30.72-4.48 38.72-13.44 1.6-7.68 2.56-10.24 2.56-7.68 0 15.04 9.6 22.4 29.12 22.4 25.92 0 47.68-9.6 64.96-28.8 14.4-16.64 21.76-36.48 21.76-59.2 0-28.16-10.24-51.2-30.4-69.12-22.72-20.16-52.8-30.4-90.24-30.4zm8.96 127.36c-11.84 28.48-25.6 42.56-41.6 42.56-7.36 0-10.88-6.72-10.88-20.16 0-20.16 4.8-40 14.4-59.2 11.52-23.04 24.32-34.24 39.04-34.24 8.96 0 13.76 6.08 13.76 18.24s-4.8 30.4-14.4 53.12z" /></symbol><symbol viewBox="0 0 1024 1024"  id="mq-service-task"><path d="M834.24 186.56C638.72 54.72 376 241.92 265.28 324.8c-6.08 4.48 0 13.44 6.4 10.56 115.2-53.76 391.04-166.72 515.52-73.92 102.72 76.8 82.56 244.8 76.16 304.32-.64 4.48 5.44 6.4 7.68 2.56 32.96-58.88 131.2-248-36.8-381.76zm-81.6 502.08c-115.2 53.76-391.04 166.72-515.52 73.92-102.72-76.8-82.56-244.8-76.16-304.32.64-4.48-5.44-6.4-7.68-2.56-32.96 58.88-131.2 248 36.8 381.76C385.6 969.28 648.32 782.08 759.04 699.2c6.08-4.48 0-13.44-6.4-10.56z" /><path d="M264.32 436.8v222.72c0 14.72-2.56 23.36-7.68 26.56-4.48 2.24-13.44 4.16-26.56 5.44v21.12h93.12V691.2c-13.12-.96-22.08-2.88-26.88-6.08-4.48-3.2-6.72-11.84-6.72-25.92V433.92l80.32 278.72h17.92l80.32-278.08v224.32c0 15.04-2.56 24-7.68 26.88-3.84 2.24-12.8 4.16-26.88 5.44v21.12h101.12v-21.44c-14.72-1.28-24-3.2-28.16-6.08-4.48-3.2-6.72-12.16-6.72-26.24V435.84c0-14.72 2.56-23.36 8-26.88 4.8-2.88 13.76-5.12 26.88-6.08v-21.44h-76.16l-75.2 261.76-75.84-261.76H228.8v21.12c15.68 1.6 25.28 3.84 28.8 6.08 4.48 3.2 6.72 12.48 6.72 27.2zm522.24 226.88c-12.48 0-23.36-11.52-32.32-34.88 33.92-33.92 50.88-83.2 50.88-148.48 0-53.12-11.84-96.96-35.84-130.88-21.12-30.08-47.36-45.12-78.4-45.12s-57.6 15.04-78.72 45.12c-23.36 34.24-35.2 77.76-35.2 131.2s11.84 98.88 35.2 132.8c20.8 29.76 47.04 44.48 78.4 44.48 15.36 0 28.8-3.84 40.32-11.52 12.48 31.68 28.48 47.68 48.32 47.68 15.36 0 28.8-10.88 40.96-32.64l-9.92-17.28c-8.96 12.8-16.96 19.2-23.68 19.2zm-72.96-34.56c-6.72 3.2-13.12 4.8-19.84 4.8-19.52 0-29.12-11.52-29.12-34.24 0-9.28 2.24-16.96 6.4-23.04 4.16-5.76 8.96-8.64 14.4-8.64 13.44 0 25.92 19.52 38.4 58.24 0-.96-3.52 0-9.92 3.2zm31.68-27.52c-7.04-18.56-13.12-32.32-18.56-40.96-10.56-16.64-23.36-24.96-38.08-24.96-13.44 0-24 6.08-32.64 18.24-7.68 10.56-11.52 23.68-11.52 39.36 0 9.92 1.92 18.56 4.8 26.24-25.28-26.56-38.08-72.64-38.08-138.24 0-44.16 7.04-80 21.12-107.2 14.72-29.76 34.56-44.8 59.52-44.8 19.52 0 36.16 9.92 50.24 29.76 19.84 27.84 29.44 68.8 29.44 122.24s-8.64 95.36-25.92 120.32z" /></symbol><symbol viewBox="0 0 1024 1024"  id="rest-service-task"><path d="M915.84 446.4a31.712 31.712 0 0 0-33.92-28.8l-37.44 3.2c-17.28 1.6-36.48-10.56-43.2-26.56l-25.92-50.56c-9.28-14.4-8-37.12 3.2-50.24l24.32-28.8c11.2-13.12 9.6-33.28-3.84-44.16l-48-40.32a31.136 31.136 0 0 0-44.16 3.84l-24.32 28.8c-11.2 13.12-33.28 18.56-48.96 11.52l-54.08-16.96c-16.96-3.84-32-20.8-33.28-38.08l-3.2-37.44a31.712 31.712 0 0 0-33.92-28.8l-62.4 5.12c-17.28 1.6-30.08 16.64-28.8 33.92l3.2 37.44c1.6 17.28-10.56 36.48-26.56 43.2L344 248.64c-14.4 9.6-37.12 8-50.24-3.2l-28.8-24.32a31.136 31.136 0 0 0-44.16 3.84l-40.32 48c-11.2 13.12-9.6 32.96 3.84 44.16l28.8 24.32c13.12 11.2 18.56 33.28 11.52 48.96l-16.96 54.4c-3.84 16.96-20.8 31.68-38.08 33.28l-37.44 3.2c-17.28 1.6-30.08 16.64-28.8 33.92l5.12 62.4c1.6 17.28 16.64 30.08 33.92 28.8l37.44-3.2c17.28-1.28 36.48 10.56 42.88 26.56l25.92 50.56c9.28 14.4 8 37.12-3.2 50.24l-24.32 28.8c-11.2 13.12-9.6 32.96 3.84 44.16l48 40.32c13.12 11.2 32.96 9.6 44.16-3.84l24.32-28.8c11.2-13.12 33.28-18.24 48.96-11.52l54.4 17.28c16.96 3.84 31.68 20.8 33.28 38.08l3.2 37.44c1.6 17.28 16.64 30.08 33.92 28.8l62.4-5.12c17.28-1.6 30.08-16.64 28.8-33.92l-3.2-37.44c-1.6-17.28 10.56-36.48 26.56-42.88L680.32 776c14.4-9.6 37.12-8 50.24 3.2l28.8 24.32c13.12 11.2 33.28 9.6 44.16-3.84l40.64-48c11.2-13.12 9.6-33.28-3.84-44.16l-28.8-24.32C798.4 672 793.28 649.92 800 634.24l17.28-54.08c3.84-16.96 20.8-31.68 38.08-33.28l37.44-3.2c17.28-1.6 30.08-16.64 28.48-33.92l-5.12-62.72zM528.96 714.56c-112 9.28-210.24-73.6-219.84-185.6-9.28-112 73.6-210.24 185.6-219.84s210.24 73.6 219.84 185.6c9.28 112-73.6 210.24-185.6 219.84z" /><path d="M401.92 481.6c4.48 0 7.04-1.92 7.36-6.08V456l21.76 24s3.2 1.6 5.76 1.6c4.16 0 6.72-2.24 7.36-6.08a4.48 4.48 0 0 0-1.92-3.84l-16.32-16.32c11.52-2.24 17.6-7.68 17.92-16.64 0-13.44-8-20.16-24.32-20.16h-17.28c-4.8 0-7.36 2.24-7.36 7.04v49.92c0 4.16 2.56 6.08 7.36 6.08zm7.36-50.88h9.92c5.76 0 8.96 2.88 9.28 8 0 4.8-3.2 7.36-9.28 7.68h-9.92v-15.68zm82.56 44.8c0-3.84-2.56-5.76-6.72-5.76H467.2v-13.44h16c4.48 0 6.72-2.24 7.36-6.4-.64-3.84-2.88-6.08-7.36-6.08h-16v-12.8h17.28c4.16 0 6.72-2.24 6.72-6.08s-2.56-5.76-6.72-5.76h-24.32c-4.8 0-7.36 2.56-7.36 7.68v48.96c0 4.16 2.56 6.4 7.36 6.72h25.28c4.16 0 6.72-2.24 6.72-6.08zm28.8-5.44c-2.24 0-5.44-.64-9.6-1.92a25.472 25.472 0 0 0-6.72-1.28c-4.16 0-6.08 2.24-6.4 6.4 0 6.08 8 8.96 23.68 9.28 15.68-.64 24-7.36 25.28-19.84 0-9.28-7.36-15.68-21.76-19.84-7.36-1.92-10.88-4.16-10.88-6.72 0-3.52 2.88-5.44 8-5.44 1.92 0 4.48.32 7.68 1.28 2.56.64 4.16.96 5.44.96 4.16 0 6.08-2.56 6.4-6.72-.64-5.12-7.04-8-19.2-8.64-15.04.96-23.04 7.68-24 20.16 0 8 6.72 13.44 20.16 16.96 8 2.24 12.16 4.8 12.16 7.68 0 4.8-3.52 7.36-9.92 7.68zm59.2-39.36h10.56c4.16 0 6.08-2.24 6.4-6.08 0-3.84-2.56-5.76-6.4-5.76h-36.16c-3.52 0-5.44 2.24-5.76 5.76 0 4.16 2.24 6.08 5.76 6.08h10.56v44.8c0 4.16 2.56 6.08 7.36 6.08 4.8 0 7.36-1.92 7.68-6.08v-44.8zm-134.08 72.64c-3.84-8.32-9.92-12.48-18.24-12.48-8.32.32-14.08 4.48-17.6 12.48l-33.6 81.92v1.28s-.64 2.88-.64 4.16c.32 6.4 4.16 9.28 11.52 9.28 6.08 0 10.24-2.24 12.16-7.04l5.12-14.08h46.08l4.48 14.08c2.24 4.8 6.4 7.04 12.16 7.04 7.36 0 11.2-2.88 11.52-8.96 0-1.6-.32-3.52-1.28-5.76l-32.32-81.92zm-33.6 54.72 15.68-43.52 15.36 43.52h-31.04zm117.12-65.28h-29.76c-7.68.32-11.84 4.16-12.16 11.84v84.8c.32 7.04 4.48 10.56 12.16 10.56s11.84-3.52 12.16-10.56V564.8h18.24c25.92-1.6 39.68-13.44 41.28-35.84-1.6-22.4-15.68-34.24-41.92-35.84zm-.64 51.84h-16.96v-31.68h16.96c10.88.32 16.32 5.76 16.96 16-.96 9.92-6.4 15.04-16.96 16zm62.72-52.8c-7.68.32-11.84 4.16-12.16 11.84v85.76c.32 7.04 4.48 10.56 12.16 10.56s11.84-3.52 12.16-10.56v-85.76c-.32-7.36-4.48-11.52-12.16-11.84z" /></symbol><symbol viewBox="0 0 1024 1024"  id="sc-service-task"><path d="M513.28 824H283.52c-89.6-.32-157.12-40.32-200.64-118.4-10.24-18.24-15.36-39.36-20.8-59.52-3.84-14.08-6.08-29.44-5.76-44.16 1.6-68.48 27.84-126.08 80.32-170.88 29.44-24.96 63.36-40 100.8-48 7.04-1.6 13.44-8 18.56-13.44 24.64-26.24 47.36-54.72 73.6-79.36 23.68-22.08 53.12-35.84 83.2-48.32 50.56-20.8 103.04-22.72 155.2-15.68 55.68 7.36 106.88 30.4 147.84 69.44 55.04 46.72 83.52 99.2 97.28 132.48 3.52 6.4 8.96 12.8 15.36 15.68 53.12 25.28 88.64 65.6 108.16 121.28 12.48 35.84 14.08 72.32 4.48 107.52-15.04 56.32-47.68 101.12-100.8 128.64-31.68 16.32-64.96 23.68-100.8 23.04-75.52-.96-150.72 0-226.24 0zm-.96-37.12h234.24c21.44 0 41.92-3.52 61.76-11.52 76.16-30.72 119.04-115.84 95.04-194.56-15.04-49.6-46.4-86.08-95.36-105.92-11.84-4.8-21.76-12.16-25.92-24.64-11.84-39.36-35.2-71.04-62.72-101.12-40.64-44.48-89.6-73.92-148.16-85.12-65.92-12.8-129.28-2.24-187.52 32.64-41.92 24.96-73.6 60.48-101.12 99.84-10.88 15.36-24 22.4-41.92 24.64-11.2 1.6-23.04 4.16-33.28 8.64-64.64 29.12-102.72 79.68-113.6 149.12-6.72 43.2 3.84 84.8 27.52 121.28 37.76 57.28 90.88 87.36 160.64 86.72 76.48-.64 153.28 0 229.76 0z" /><path d="M640.32 403.84c5.12 15.04 10.56 27.52 13.44 40.64 9.6 40.32 17.92 81.28 13.76 123.2-5.12 49.6-23.04 92.48-71.68 113.92-16.64 7.36-35.2 12.8-53.12 13.76-39.36 1.92-79.04.64-119.36-1.28 9.28-3.52 18.24-7.68 27.84-10.24 76.8-21.12 129.28-70.72 163.2-141.44 4.16-8.64 12.8-19.2 4.48-32.96-3.52 4.8-6.72 8.32-8.96 12.48-25.92 45.76-63.36 80.32-109.44 104.32-23.04 11.84-49.28 18.56-74.24 26.88-13.76 4.48-28.48 6.08-42.24 10.56-35.2 11.52-52.8-6.08-58.88-37.12-10.56-55.04 13.76-96.64 61.76-118.72 20.16-9.28 44.48-10.24 67.2-14.08 24.96-4.16 50.88-4.16 74.88-10.56C570.88 472 605.12 448 632 413.44c1.92-2.56 4.48-5.12 8.32-9.6zM338.24 715.2c-7.68-.64-14.72-4.48-12.8-12.48 1.28-5.12 8-11.2 13.12-12.48 8.32-1.92 11.52 5.12 11.52 13.12 0 8.32-3.84 12.16-11.84 11.52z" /></symbol><symbol  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 32 32" id="shell-service-task"><path d="M26.021 22.356H5.223c-.672 0-1.223-.59-1.223-1.312V5.311C4 4.59 4.55 4 5.223 4h20.798c.673 0 1.223.59 1.223 1.311v15.733c0 .722-.55 1.312-1.223 1.312zM7.17 11.264a.734.734 0 0 0-.539.236.866.866 0 0 0 0 1.153l2.79 2.99-2.753 2.95c-.294.314-.294.839 0 1.153s.783.315 1.077 0l3.29-3.526a.866.866 0 0 0 0-1.154L7.708 11.5a.734.734 0 0 0-.538-.236zm10.753 0H11.72c-.416 0-.759.367-.759.812s.343.813.759.813h6.202c.416 0 .759-.367.759-.813s-.343-.812-.759-.812z" /></symbol>', t.insertBefore(n, t.lastChild);
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
const ni = {
  id: "business-designer",
  class: "business-designer__wrap"
}, Pi = /* @__PURE__ */ j({
  name: "IntegralDesigner",
  __name: "index",
  props: {
    xml: {
      type: String,
      default: void 0
    },
    useSave: {
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
    },
    minimap: {
      type: Boolean,
      default: void 0
    },
    panel: {
      type: Boolean,
      default: !0
    },
    translatePrefix: {
      type: String,
      default: ""
    },
    fileName: {
      type: String,
      default: ""
    },
    timeout: {
      type: Number,
      default: 5e3
    }
  },
  emits: ["xml-changed"],
  setup(e, { expose: t, emit: n }) {
    const i = e, a = n, { locale: l } = Z0(), o = x1(), s = P(), r = J7(() => {
      o.value.saveXML({ format: !0 }).then(({ xml: v }) => {
        a("xml-changed", v);
      });
    }, i.timeout), c = (v) => {
      o.value = v, v.on("commandStack.changed", r), v.on("xml-imported", ({ xml: y }) => a("xml-changed", y));
    }, u = (v) => {
      if (v)
        return document.body.setAttribute("arco-theme", v);
      const y = document.body.getAttribute("arco-theme") === "dark";
      document.body.setAttribute("arco-theme", y ? "light" : "dark");
    }, m = (v) => {
      var y;
      v ? l.value = v : l.value = l.value === "zh_CN" ? "en_US" : "zh_CN", Rt("local-lang", l.value), (y = o.value) == null || y.get("eventBus").fire("i18n.changed");
    }, h = x1();
    function f(v) {
      var y;
      (y = h.value) == null || y.togglePanel(v);
    }
    return b0(() => i.local, m, { immediate: !0 }), b0(() => i.theme, u, { immediate: !0 }), b0(() => i.panel, f, { immediate: !0 }), d1(x0, o), t({
      provideModeler: o,
      toggleLang: m,
      toggleTheme: u,
      togglePanel: f,
      createNewProcess: (v) => {
        var y;
        return (y = s.value) == null ? void 0 : y.createNewProcess(v);
      }
    }), (v, y) => {
      const g = In;
      return w(), V(g, { size: "mini" }, {
        default: T(() => [
          R("div", ni, [
            E(e8, {
              "use-save": e.useSave,
              "file-name": e.fileName,
              "translate-prefix": e.translatePrefix
            }, {
              default: T(() => [
                K(v.$slots, "toolbar")
              ]),
              _: 3
            }, 8, ["use-save", "file-name", "translate-prefix"]),
            E(l7, {
              xml: e.xml,
              onModelerInit: c
            }, {
              default: T(() => [
                K(v.$slots, "designer")
              ]),
              _: 3
            }, 8, ["xml"]),
            E(ti, {
              ref_key: "panelRef",
              ref: h,
              "translate-prefix": e.translatePrefix
            }, null, 8, ["translate-prefix"])
          ])
        ]),
        _: 3
      });
    };
  }
});
export {
  Pi as IntegralDesigner
};
