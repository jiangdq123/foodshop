import Vue from 'vue';
import Router from 'vue-router';
// import Msite from '../pages/Msite/Msite.vue';
// import Search from '../pages/Search/Search.vue';
// import Profile from '../pages/Profile/Profile.vue';
// import Order from '../pages/Order/Order.vue';
import Login from '../pages/Login/Login.vue';
import Shop from '../pages/Shop/Shop.vue';
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue';
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue';
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue';

// 路由懒加载
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')


Vue.use(Router);

export default new Router({
  // 去掉地址中的哈希#
  mode: 'history',
  routes: [
    {
      path: '/msite',
      component: Msite,
	  meta: {
		 showFooter: true,
      },
    },
    {
	  path: '/search',
      component: Search,
      meta: {
        showFooter: true,
      },
    },
    {
		path: '/profile',
		component: Profile,
		meta: {
			showFooter: true,
		},
    },
    {
		path: '/order',
		component: Order,
		meta: {
			showFooter: true,
		},
    },
    {
    	path: '/login',
    	component: Login,
    	meta: {
    		showFooter: false,
    	},
    },
    {
      path: '/shop',
      component: Shop,
      meta: {
        showFooter: true,
      },
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods,
        },
        {
          path: '/shop/info',
          component: ShopInfo,
        },
        {
          path: '/shop/ratings',
          component: ShopRatings,
        },
        {
          path: '',
          redirect: '/shop/goods',
        },
      ],
    },
    {
 	  path: '/',
	  redirect: '/msite',
    },
  ],
});
