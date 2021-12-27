<template>
  <div class="btn-bar">
    <div class="check-content">
      <check-btn class="check-btn" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span class="span">全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算 ( {{checkLength}} ) </div>
  </div>
</template>

<script>
  import CheckBtn from 'components/content/checkBtn/CheckBtn'
  import { mapGetters } from 'vuex'
  export default {
    name: "CartBtnBar",
    components: { 
      CheckBtn,
    },
    methods: {
      checkClick() {
      
        if(this.isSelectAll) { // 全选
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品',2000)
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' +this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => !item.checked).length)
        return !this.cartList.find(item => !item.checked)
      }
    }
  }
</script>

<style scoped>
  .btn-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #eee;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 5px;
    width: 70px;
  }
  .check-btn {
    width: 28px;
    height: 28px;
  }
  .span {
    margin-left: 6px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    text-align: center;
    color: #fff;
    background: var(--color-tint);
  }
</style>