/**
 * @desc polyfill
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/8/22 下午2:20
 */

(function() {
  if (!Object.hasOwn) {
    Object.hasOwn = function(target, key) {
      return target.hasOwnProperty(key)
    }
  }

  if (!window.structuredClone) {
    window.structuredClone = function(obj, options, hash = new WeakMap()) {
      // 检查是否为对象或数组
      if (typeof obj !== 'object' || obj === null) {
        return obj; // 如果不是对象或数组，直接返回
      }

      // 处理循环引用
      if (hash.has(obj)) {
        return hash.get(obj);
      }

      // 处理特殊对象类型
      if (obj instanceof Date) {
        return new Date(obj);
      }

      if (obj instanceof RegExp) {
        return new RegExp(obj);
      }

      // 创建一个新对象或数组
      let copy = Array.isArray(obj) ? [] : {};

      // 存储当前对象在 hash 表中
      hash.set(obj, copy);

      // 递归地复制每一个属性
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = structuredClone(obj[key], options, hash); // 递归调用
        }
      }

      return copy;
    }
  }
})()
