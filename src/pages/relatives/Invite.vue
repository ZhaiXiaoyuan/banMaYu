<!--邀请好友-->
<template>
    <div class="invite">
      <div class="banner-panel">
        <img :src="banner" alt="">
      </div>
      <div class="input-panel">
        <div class="number">邀请手机号码：{{userInfo.mobilephone}}</div>
      </div>
      <div class="rule-panel">
        <div class="panel-hd">活动规则</div>
        <div class="panel-bd">
          <div class="item">
            <span class="value">推荐客户与推荐客户年龄差20岁以内，被推荐客户成功进行第一次体检，推荐客户获得100积分，被推荐者奖励50积分。</span>
          </div>
          <div class="item">
            <span class="value">被推荐客户与推荐客年龄差20岁以上，被推荐客户成功进行第一次体检，推荐客户获得200积分，被推荐客户获得100积分</span>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn btn" @click="shareGuide()"></div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>

<script>
    import Vue from 'vue'
    import  { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        components: {

        },
        data: function () {
            return {
              banner:require('../../images/relatives/banner.jpg'),
              userInfo:{},
            }
        },
        computed: {},
        watch: {},
        methods: {
          shareConfig:function () {
            /*微信分享配置*/
            Vue.tools.shareConfig({
              /*    title: '邀请好友',
               desc:'无偿邀请好友，分享健康更久的新科学',*/
              title:'斑马鱼体控服务，助您享受更久的健康时光！',
              desc:'',
              link: window.location.href.split('#')[0]+'#/home?sourceNumber='+this.userInfo.mobilephone,
              imgUrl: 'http://test.zebfish.com/logo.jpg',
              callback:()=>{
                this.operationFeedback({type:'complete',text:'分享成功'})
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};

          if(this.isIOS()){
            setTimeout(()=>{
              this.shareConfig();
            },1000);
          }else{
            Vue.tools.wxConfig({
              debug:false,
              url:window.location.href,
              jsApiList:['hideMenuItems','onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              callback:(data)=>{
                if(data){
                  this.shareConfig();
                }
              }
            });
          }

        },

    };
</script>
