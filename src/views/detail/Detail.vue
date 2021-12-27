<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swier :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwier from "./childComps/DetailSwier";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, Goods, Shop, GoodsParams, getRecommend } from "network/detail";

import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwier,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themTopYs: [],
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      // 保存商品详情数据
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] || {};
      }
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();

      this.$nextTick(() => {
        this.themTopYs = [];
        this.themTopYs.push(0);
        this.themTopYs.push(this.$refs.params.$el.offsetTop);
        this.themTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themTopYs.push(Number.MAX_VALUE);
      });
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themTopYs[index], 200);
    },
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y
      // positionY和主题值对比
      let length = this.themTopYs.length

      // 方案一
      /* for (let i = 0; i < length; i++) {
        if(this.currentIndex !== i && ((i<length -1 && positionY >= this.themTopYs[i] && 
        positionY <this.themTopYs[i+1]) || (i === length -1 && positionY >= this.themTopYs[i]))) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      } */

      // 方案二(设置[Number.MAX_VALUE]方法实现)
      for(let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themTopYs[i] && positionY < this.themTopYs[i + 1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      this.listenShowBackTop(position)
    },
    addToCart() {
      // 获取购物车要展示的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 将商品添加到购物车
      this.$store.dispatch('addCart',product).then(res => {
        this.$toast.show(res,2000)
      })
    }
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.ItemImgLisrener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 33;
  background: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>