/**
 * 获取 SessionStorage
 * @param {String}  key
 * @returns {obj}
 */
const getStorage = key => {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key,
			success: res => {
				resolve({[key]:res.data})
			},
			fail: () => {
				// reject({[key]:null})
			}
		});
	}).catch(err=>{
		return {[key]:null}
	})
}

/**
 * 设置 SessionStorage
 * @param {String}  key
 * @param {String}  val
 * @returns {obj}
 */
const setStorage = (key, val) => {
	return new Promise((resolve, reject) => {
		uni.setStorage({
			key,
			data: val,
			success: () => {
				resolve({
					[key]: val
				})
			},
			fail: () => {
				
			}
		});
	}).catch(err=>{
		reject({[key]:null})
	})
}

/**
 * 删除 SessionStorage
 * @param {String}  key
 */
const removeStorage = key => {
	return new Promise((resolve, reject) => {
		uni.removeStorage({
			key: key,
			success: res => {
				resolve(res)
			},
			fail: () => {
				reject(null)
			}
		});
	}).catch(err=>{
		reject({[key]:null})
	})
}

// 清空 sessionStorage
const clearStorage = () => {
	uni.clearStorage();
}

export {
	getStorage,
	removeStorage,
	setStorage,
	clearStorage
}
