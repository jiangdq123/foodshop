<template>
  <section class="msite">
    <!-- 头部title -->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to='/search'>
        <i class="iconfont icon-search"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id? '/userInfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录/注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-yonghumnig"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!-- 轮播图 -->
    <nav class="msite_nav">
      <!-- Swiper的容器div -->
      <div class="swiper-container" v-if="categorys.length">
        <!-- Swiper的包裹层div -->
        <div class="swiper-wrapper">
          <!-- 轮播div -->
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:;" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Swiper轮播圆点 -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- svg显示加载中提示界面 -->
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!-- 附近商家列表 -->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex'
export default {
  name: 'Msite',
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com',
      title:"外卖"
    };
  },
  components:{
    HeaderTop,
    ShopList
  },
  mounted:function(){
    this.$store.dispatch('getCategorys');
    this.$store.dispatch('getShops');
  },
  computed:{
    ...mapState(['address','categorys','userInfo']),
    /*
    根据categorys一维数组生成一个二维数组
    小数组中元素数量最大为8
    */
    categorysArr () {
      const {categorys} = this
      // 准备空的二维数组
      const arr = []
      let minArr = []
      // 遍历categorys
      categorys.forEach(c => {
        if (minArr.length===8) {
          arr.push(minArr)
          minArr = []
        }
        minArr.push(c)
      })
      if (minArr) {
        arr.push(minArr)
      }
      return arr
    }
  },
  methods:{
    goTo(path){
      this.$router.push(path)
    }
  },
  watch:{
    categorys (value) { 
      // categorys数组中有数据了，在异步更新界面之前执行
      // 希望界面更新就立即创建swiper对象
      this.$nextTick(() => { // 一旦界面更新立即调用(要写在数据更新之后)
        // 创建一个swiper实例对象实现轮播
        new Swiper('.swiper-container',{
          // 循环轮播
          loop: true, 
          // 分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>
