/*
 * @Author: etongfu
 * @Date: 2018-10-11 10:10:21
 * @Last Modified by: etongfu
 * @Last Modified time: 2018-12-13 10:54:27
 * 为API中的list处理的mixins
 * 列表页面中使用到多次复用的mixins
 */
const listMixins = {
  data () {
    return {
      loading: false, // 伴随loading状态
      pageNo: 1, // 页码
      pageSize: 15, // 页长
      totalCount: 0, // 总个数
      pageSizes: [15, 20, 25, 30], // 页长数
      pageLayout: 'total, sizes, prev, pager, next, jumper', // 分页布局
      list: []
    }
  },
  methods: {
    // 分页回掉事件
    handleSizeChange (val) {
      this.pageSize = val
      this.load()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.load()
    },
    /**
     * 表格数据请求成功的回调
     * @param {*} apiResult
     * @returns {*} promise
     */
    listSuccessCb (apiResult = {}) {
      return new Promise((resolve, reject) => {
        let tempList = [
          { name: 'demo', id: 'demo', age: 'demo' }
        ] // 临时list
        try {
          this.loading = false
          // 直接抛出
          resolve([tempList])
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * 处理异常情况
     * ==> 简单处理  仅仅是对表格处理为空以及取消loading
     */
    listExceptionCb (error) {
      this.loading = false
      console.error(error)
    }
  },
  created () {
    console.log(`list mixin creatd`)
  }
}
export default listMixins
