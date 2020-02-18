/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */
import user from './user'
import bookmanage from './bookmanage'
import site from './site'

// 默认全部导出
export default {
  user,
  bookmanage,
  site
}
