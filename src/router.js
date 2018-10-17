import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const routes=[ {
  path: '/',
  alias: '/home',
  name: 'home',
  component: resolve=>require(['./pages/Home'],resolve),
  meta:{
    title:'斑马鱼健康服务',
  },
},{
  path: '/shop',
  name: 'shop',
  component: resolve=>require(['./pages/shop/Shop'],resolve),
  meta:{
    title:'商城',
  },
},{
  path: '/goodsDetail/:type/:id',
  name: 'goodsDetail',
  component: resolve=>require(['./pages/shop/GoodsDetail'],resolve),
  meta:{
    title:'套餐详情',
  },
},{
  path: '/order',
  name: 'order',
  component: resolve=>require(['./pages/shop/Order'],resolve),
  meta:{
    title:'套餐预约',
  },
},{
  path: '/pay/:id?/:pageType?',
  name: 'pay',
  component: resolve=>require(['./pages/shop/Pay'],resolve),
  meta:{
    title:'确认订单',
  },
},{
  path: '/address/:id?',
  name: 'address',
  component: resolve=>require(['./pages/address/Address'],resolve),
  meta:{
    title:'地址管理',
  },
},{
  path: '/relatives',
  name: 'relatives',
  component: resolve=>require(['./pages/relatives/Relatives'],resolve),
  meta:{
    title:'亲友',
  },
},{
  path: '/report',
  name: 'report',
  component: resolve=>require(['./pages/relatives/Report'],resolve),
  meta:{
    title:'亲友',
  },
},{
  path: '/memberData/:mainId?/:id?',
  name: 'memberData',
  component: resolve=>require(['./pages/relatives/MemberData'],resolve),
  meta:{
    title:'基本资料',
  },
},{
  path: '/my',
  name: 'my',
  component: resolve=>require(['./pages/center/My'],resolve),
  meta:{
    title:'我的',
  },
},{
  path: '/diary',
  name: 'diary',
  component: resolve=>require(['./pages/center/Diary'],resolve),
  meta:{
    title:'食用日记',
  },
},{
  path: '/myOrder',
  name: 'myOrder',
  component: resolve=>require(['./pages/center/MyOrder'],resolve),
  meta:{
    title:'我的订单',
  },
},{
  path: '/invite',
  name: 'invite',
  component: resolve=>require(['./pages/relatives/Invite'],resolve),
  meta:{
    title:'邀请好友',
  },
},{
  path: '/register',
  name: 'register',
  component: resolve=>require(['./pages/center/Register'],resolve),
  meta:{
    title:'快速注册',
  },
},{
  path: '/store/:userId',
  name: 'store',
  component: resolve=>require(['./pages/shop/Store'],resolve),
  meta:{
    title:'体控所',
  },
},{
  path: '/search',
  name: 'search',
  component: resolve=>require(['./pages/shop/Search'],resolve),
  meta:{
    title:'商品搜索',
  },
},{
  path: '/msg',
  name: 'msg',
  component: resolve=>require(['./pages/Center/Msg'],resolve),
  meta:{
    title:'消息中心',
  },
},{
  path: '/score',
  name: 'score',
  component: resolve=>require(['./pages/Center/Score'],resolve),
  meta:{
    title:'积分明细',
  },
},{
  path: '/feedback',
  name: 'feedback',
  component: resolve=>require(['./pages/Center/Feedback'],resolve),
  meta:{
    title:'意见反馈',
  },
},{
  path: '/addFeedback',
  name: 'addFeedback',
  component: resolve=>require(['./pages/Center/addFeedback'],resolve),
  meta:{
    title:'新增反馈',
  },
}]

const router= new Router({
  routes:routes,
/*  mode: 'history',*/
  /* scrollBehavior: function (to, from, savedPosition) {
   return savedPosition || { x: 0, y: 0 }
   }*/
})

//注册全局导航守卫
router.beforeEach((to, from,next) => {
  let url=window.location.href;
 /* if(url.indexOf('?')==-1&&url.indexOf('&1=')>-1){
    window.location.replace(window.location.href.replace('&1=',''));
  }*/
 //当从微信跳转回前端时会在地址上拼接额外的参数，导致了地址格式错乱，故对此进行替换处理
  let linkAnalysis=url.match(/\/\?from(\S*)#\//);
  let wrongUrlData=linkAnalysis?linkAnalysis[0]:null;
  if(wrongUrlData&&wrongUrlData!=''){
    window.location.replace(url.replace(wrongUrlData,'/#/'))
  }
  let token=to.query.token;
  let number=to.query.number;
  if(token){
    Vue.cookie.set('token', token,{ expires: '12h' });
    Vue.cookie.set('number',number,{ expires: '12h' });
    if(number){
      Vue.api.getUserInfo({...Vue.tools.sessionInfo()}).then((resp)=>{
        if(resp.status=='success'){
          let userInfo=JSON.parse(resp.message);
          sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
          Vue.cookie.set('token',userInfo.token,{ expires: '12h' });
        }else{

        }
        next();
      })
    }else{
      next('/register');
    }
    //获取用户信息
  }else{
    next();
  }


})
router.afterEach((to, from) => {
  //修改页面title
  document.title = to.meta.title;
})
//
export default router
