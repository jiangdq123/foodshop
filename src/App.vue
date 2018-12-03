<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-if="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {mapActions} from 'vuex'
  export default {
    name: 'App',
    components:{
      FooterGuide
    },
    date(){
      return {
        title:"您的外卖"
      }
    },
    mounted(){
      this.getAddress();
      this.getUserInfo();
    },
    methods:{
      ...mapActions(['getAddress','getUserInfo','getShops'])
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 整个应用组件的样式
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
