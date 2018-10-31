/**
 * Created by Designer on 2017/12/21.
 */
import router from '../router'


export default {
  install: function (Vue, options) {


    Vue.http.options.emulateJSON = true;
    Vue.http.interceptors.push((request, next)  =>{

      next((response) => {
        //对于有作登录状态的接口你，未未登录时跳转到登录页
        if(response.status==401){
         /* router.push({name:''});*/
        }
        return response
      });

    });
    /*自定义ajax函数，自带的不好用*/
    Vue.http.ajax = async function (options) {
      if(options.method.toUpperCase() == 'GET'){
        let res = await Vue.http.get(options.url, {params: options.params});
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }else if(options.method.toUpperCase() == 'POST'){
        let res = await Vue.http.post(options.url, options.params);
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }
    }

    /**/
    let basicUrl=false&&process.env.NODE_ENV=='development'?'/api':'http://pexam.elecplus.tech/pewxs';
   // let basicUrl=process.env.NODE_ENV=='development'?'/api':'http://www.mk-dingneng.com/dmjywxs';
    Vue.api={
      //获取首页信息
      getHomeData:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/auth/ind',
          params: params
        });
      },
      //获取商城首页数据
      getShopHomeData:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/auth/sind',
          params: params
        });
      },
      //获取用户信息
      getUserInfo:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/auth/lwx',
          params: params
        });
      },
      //发送短信验证码
      genCode:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/auth/mcode',
          params: params
        });
      },
      //注册
      register:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/auth/cpinfo1',
          params: params
        });
      },
      //用户信息完善/修改（已完成）
      saveUserInfo:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/cusinfo',
          params: params
        });
      },
      //体检套餐详情
      getPhysicalDetail:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/pd/pro/info/vphysical',
          params: params
        });
      },
      //栋食产品详情
      getFoodDetail:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/pd/pro/info/vfood',
          params: params
        });
      },
      //健康食品详情
      getHealthDetail:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/pd/pro/info/vhealth',
          params: params
        });
      },
      //我的介绍
      getMyData:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/vintroduce',
          params: params
        });
      },
      //查看账户基本资料
      getUserData:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/viewcus',
          params: params
        });
      },
      //获取七牛云图片上传接口
      getUploadKey:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/bs/base/info/gqnutk',
          params: params
        });
      },
      //获取亲友列表
      getRelativeList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/fa/fam/man/getmb',
          params: params
        });
      },
      //获取子账号亲友列表
      getSubAccountRelativeList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'//fa/fam/man/lmb',
          params: params
        });
      },
      //添加亲友账户
      addRelative:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/fa/fam/man/addmb',
          params: params
        });
      },
     //分页获取体控所列表
      getStoreList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/zb/sto/man/gstore',
          params: params
        });
      },
      //体检预约时分页获取体控所列表
      getStoreListByProductId:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/zb/sto/man/getstores',
          params: params
        });
      },
      //更改绑定体控所
      bindStore:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/udstore',
          params: params
        });
      },
      //子账户解绑
      unbindRelative:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/ubf',
          params: params
        });
      },
      //创建体检订单
      createPhysicalOrder:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/ex/phy/book/add',
          params: params
        });
      },
      //创建订单
      createOrder:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/sh/ord/man/genord',
          params: params
        });
      },
      //获取送货地址列表
      getAddressList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/addr/getaddr',
          params: params
        });
      },
      //添加送货地址
      addAddress:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/addr/add',
          params: params
        });
      },
      //编辑送货地址
      saveAddress:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/addr/uaddr',
          params: params
        });
      },
      //删除送货地址
      deleteAddress:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/addr/daddr',
          params: params
        });
      },
      //获取默认送货地址
      getDefaultAddress:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/addr/gdfaddr',
          params: params
        });
      },
      //获取订单列表
      getOrderList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/sh/ord/man/getords',
          params: params
        });
      },
      //取消订单
      cancelOrder:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/sh/ord/man/cancelord',
          params: params
        });
      },
      //获取体控所信息
      getStoreDetail:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/zb/sto/man/vstore',
          params: params
        });
      },
      //消息中心
      getMsgList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/gnews',
          params: params
        });
      },
      //查看积分明细
      getScoreList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/vscore',
          params: params
        });
      },
      //获取反馈信息列表
      getFeedbackList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/bs/fback/man/qfb',
          params: params
        });
      },
      //新增用户反馈
      addFeeback:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/bs/fback/man/afb',
          params: params
        });
      },
      //删除用户反馈
      deleteFeedback:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/bs/fback/man/dfb',
          params: params
        });
      },
      //子账户信息完善/修改
      updateRelative:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/fa/fam/man/umb',
          params: params
        });
      },
      //设置默认地址
      setDefaultAddress:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/addr/sdfaddr',
          params: params
        });
      },
      //修改预约时间
      updateOrderTime:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/ex/phy/book/uexamdate',
          params: params
        });
      },
      //搜索全部商品
      getGoodsList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/pd/pro/info/gallpro',
          params: params
        });
      },
      //预支付
      getPaymentInfo:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/sh/ord/man/prepay',
          params: params
        });
      },
      //申请退款
      refund:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/sh/ord/man/refund',
          params: params
        });
      },
      //获取食用日记
      getDiary:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/ex/eaten/info/gsign',
          params: params
        });
      },
      //点击签到
      sign:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/ex/eaten/info/sign',
          params: params
        });
      },
      //获取公众号参数
      getWechatConfig:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/auth/gwjc',
          params: params
        });
      },
      //分页获取体检预约信息列表
      getPhysicalList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/ex/phy/book/gphy',
          params: params
        });
      },
      //同意体检声明
      agreePhysicalProtocol:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/ex/phy/book/uisphysical',
          params: params
        });
      },
      //体检套餐列表
      getPhysicalGoodsList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/pd/pro/info/gphysical',
          params: params
        });
      },
      //关于我们
      getAbout:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/gnotice',
          params: params
        });
      },
      //确认收货
      completeOrder:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/sh/ord/man/confirm',
          params: params
        });
      },
      //用户是否已关注公众号
      checkFocus:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cs/cus/info/issub',
          params: params
        });
      },
      //查看我的全部体检记录
      getReportList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/ex/phy/exam/list',
          params: params
        });
      },
      //查看我的体检异常记录
      getReportDetail:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/ex/phy/exam/vexp',
          params: params
        });
      },
    }
  },

}
