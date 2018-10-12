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
      //添加亲友账户
      addRelative:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/fa/fam/man/addmb',
          params: params
        });
      },

    }
  },

}
