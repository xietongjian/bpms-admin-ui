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
})()