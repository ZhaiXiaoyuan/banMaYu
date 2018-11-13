<!--邀请好友-->
<template>
    <div class="invite">
      <div class="bg-panel"></div>
      <div class="phone-panel">
        {{userInfo.mobilephone}}
      </div>
      <div class="rule-panel">
        <div class="panel-hd"></div>
        <div class="panel-bd">
          <div class="item">
            <i class="icon"></i>
            <span class="value">推荐客户与推荐客户年龄差20岁以内，被推荐客户成功进行第一次体检，推荐客户获得100积分，被推荐者奖励50积分。</span>
          </div>
          <div class="item">
            <i class="icon"></i>
            <span class="value">被推荐客户与推荐客年龄差20岁以上，被推荐客户成功进行第一次体检，推荐客户获得200积分，被推荐客户获得100积分</span>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn btn" @click="shareGuide()">分&nbsp;&nbsp;享</div>
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
              userInfo:{},
            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};

          /*微信分享配置*/
          Vue.tools.shareConfig({
            title: '邀请好友',
            desc:'无偿邀请好友，分享健康更久的新科学',
            link: window.location.href.split('#')[0]+'#/register?sourceNumber='+this.userInfo.mobilephone,
            imgUrl: 'http://test.zebfish.com/logo.jpg',
            callback:()=>{
              this.operationFeedback({type:'complete',text:'分享成功'})
            }
          });

        },

    };
</script>
