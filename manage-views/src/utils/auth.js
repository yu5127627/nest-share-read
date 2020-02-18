/**
 * 获取 SessionStorage
 * @param {String}  key
 * @returns {obj}
 */
const getSessionStorage = key => {
  return sessionStorage.getItem(key)
}

/**
 * 设置 SessionStorage
 * @param {String}  key
 * @param {String}  val
 * @returns {obj}
 */
const setSessionStorage = (key, val) => {
  return sessionStorage.setItem(key, val)
}

/**
 * 删除 SessionStorage
 * @param {String}  key
 */
const delSessionStorage = key => {
  sessionStorage.removeItem(key)
}

// 清空 sessionStorage
const clearLocalStorage = () => {
  sessionStorage.clear()
}

/**
 * 重置数据
 * @param {Object}  oldData
 * @param {Object}  newDate
 */
const resetData = (oldData, newDate) => {
  if (newDate) {
    for (const item in newDate) {
      oldData[item] = newDate[item]
    }
  } else {
    for (const item in oldData) {
      oldData[item] = ''
    }
  }
  return oldData
}

export {
  getSessionStorage,
  delSessionStorage,
  setSessionStorage,
  clearLocalStorage,
  resetData
}
