import { debounce } from 'common/utils'
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      ItemImgLisrener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.ItemImgLisrener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.ItemImgLisrener)
  },
}

export const backTopMixin = {
  
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  },
}