//这是管理购物车相关数据的vuex子模块

//引入请求api
import {
    reqCartList,
    reqAddToCart,
    reqCheckCartItem,
    reqDeleteCartItem
} from '@/api'

// 默认暴露vuex

export default {
    state: {
        cartList: [], //购物车列表
    },
    mutations: {
        RECEIVE_CART_LIST(state, {
            cartList
        }) {
            state.cartList = cartList
        }
    },
    actions: {
        //获取购物车列表的异步action
        async getCartList({
            commit
        }) {
            const result = await reqCartList()
            if (result.code === 200) {
                const cartList = result.data
                commit('RECEIVE_CART_LIST', {
                    cartList //这边想mutation提交n个对象,因为购物车列表是个数组,提交n个对象,便于管理
                })
            }
        },
        /* 
    删除购物项的状态的异步
        */
        async deleteCartItem({}, skuId) {
            // 异步请求
            const result = await reqDeleteCartItem(skuId)

            if (result.code !== 200) { // 操作失败
                throw new Error(result.message || '修改勾选状态操作成功')
            }
        },
        //删除所有购物项的异步action
        //这个action需要触发调用多个其他action
        //思路:几个分发的所有action都成功,当前action才成功,只要有一个失败,就不能选中
        async deleteAllCartItem({
            state,
            commit,
            dispatch,
            getters
        }, isChecked) {
            const promises = []

            //遍历所有购物项
            state.cartList.forEach(item => {
                const skuId = item.skuId
                if (item.isChecked == '1') {
                    const promise = dispatch('deleteCartItem', skuId)
                    //将每个异步action的promise添加到数组中
                    promises.push(promise)
                }
            })
            //利用promise.all方法来判断
            return Promise.all(promises)
        },


        /* 
    改变购物项的勾选状态的异步
    */
        async checkCartItem({}, {
            skuId,
            isChecked
        }) {
            // 异步请求
            const result = await reqCheckCartItem(skuId, isChecked)

            if (result.code !== 200) { // 操作失败
                throw new Error(result.message || '修改勾选状态操作成功')
            }
        },
        //全选按钮的异步action,这个action需要触发调用多个其他action
        //思路:几个分发的所有action都成功,当前action才成功,只要有一个失败,就不能选中
        async checkAllCartItem({
            state,
            commit,
            dispatch,
            getters
        }, checked) {

            const isChecked = checked ? 1 : 0
            const promises = []

            //遍历所有购物项
            state.cartList.forEach(item => {
                //假如当前的购物项勾选状态和要更新的状态一样的话,不需要发送请求
                if (item.isChecked === isChecked) return
                //每个购物项,分发给checkAllCartItem ,让他去请求某个购物项的勾选状态
                const promise = dispatch('checkCartItem', {
                    skuId: item.skuId,
                    isChecked
                })
                //将每个异步action的promise添加到数组中
                promises.push(promise)

            })
            //利用promise.all方法来判断
            return Promise.all(promises)
        },
        /* 
    添加商品到购物车的异步action
    */
        async addToCart({
            commit
        }, {
            skuId,
            skuNum,
            callback
        }) {
            const result = await reqAddToCart(skuId, skuNum)
            if (result.code === 200) { // 添加到购物车成功
                console.log('添加到购物车成功')
                callback() // 成功了不传递错误信息
                // callback({status: 0, message: '添加到购物车成功'})
            } else { // 失败
                console.log('添加到购物车失败')
                callback('添加到购物车失败') // 失败了, 需要传递错误信息
                // callback({status: 1, message: '添加到购物车失败'})
            }
        },


        async addToCart2({
            commit
        }, {
            skuId,
            skuNum
        }) {
            const result = await reqAddToCart(skuId, skuNum)
            if (result.code === 200) { // 添加到购物车成功
                // console.log('添加到购物车成功')
                return '' // async函数的promise是成功的, value是''
            } else { // 失败
                // console.log('添加到购物车失败')
                return '添加到购物车失败' // async函数的promise是成功的, value为errorMsg
            }
        },

        /* 
      添加到购物车的异步action
      如果是已经存在的购物项, 那是改变购物项中商品的数量
  
      skuId: 商品的id
      skuNum: 增加或者减少的数量
      */
        async addToCart3({
            commit
        }, {
            skuId,
            skuNum
        }) {
            const result = await reqAddToCart(skuId, skuNum)
            if (result.code !== 200) { // 失败
                // console.log('添加到购物车失败')
                throw new Error('添加到购物车失败') // async函数的promise就是失败的
            }
        }
    },
    getters: {
        totalCount(state) {

            let total = 0
            state.cartList.forEach(item => {
                const {
                    isChecked,
                    skuNum
                } = item
                // 只有在当前购物项选中才累加
                if (isChecked === 1) {
                    total += skuNum
                }
            })

            return total

            // 使用array的reduce()来做累计累加操作
            /*  return state.cartList.reduce((pre, item) => {
               return item.isChecked===1 ? pre + item.skuNum : pre
             }, 0) */
        },
        /* 
    已选中的商品的总价格
    */
        totalPrice(state) {
            let total = 0
            state.cartList.forEach(item => {
                const {
                    isChecked,
                    cartPrice,
                    skuNum
                } = item
                // 只有在当前购物项选中才累加
                if (isChecked === 1) {
                    total += cartPrice * skuNum
                }
            })
            return total

            /* 
            return state.cartList.reduce((pre, item) => {
              return item.isChecked===1 ? pre + item.skuNum*item*cartPrice : pre
            }, 0) */
        }
    }
}