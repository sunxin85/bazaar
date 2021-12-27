import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'

export default {
  addCart(content, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      let oldProduct = content.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        // oldProduct.count += 1
        content.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1
        // content.state.cartList.push(payload)
        content.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}