<!--首页-->
<template>
    <div class="home">
      <div class="btn-list">
        <router-link tag="div" :to="{ name: 'memberData', params: {mainId:'M'}}" class="cm-btn btn-item data-btn">
          <p>基本资料</p>
          <p>完善您的资料</p>
        </router-link>
        <router-link tag="div" :to="{ name: 'physicalList', params: {},query:{}}" class="cm-btn btn-item stethoscope-btn">
          <p>体检预约</p>
          <p>快捷预约体检</p>
        </router-link>
        <router-link tag="div" :to="{ name: 'reportList', params: {},query:{}}" class="cm-btn btn-item report-btn" style="border-top-right-radius: 0.16rem;">
          <p>我的体质</p>
          <p>解析健康指标</p>
        </router-link>
        <router-link tag="div" :to="{ name: 'search', params: {},query:{type:'Food'}}" class="cm-btn btn-item product-btn">
          <p>干预产品</p>
          <p>保护您的健康</p>
        </router-link>
        <router-link tag="div" :to="{ name: 'msg', params: {},query:{}}" class="cm-btn btn-item msg-btn">
          <p>消息中心</p>
          <p>消息一目了然</p>
        </router-link>
      </div>
      <nav-bar></nav-bar>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {

            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {
          setTimeout(()=>{
            /*微信分享配置*/
            Vue.tools.shareConfig({
              title: '斑马鱼体控服务，助您享受更久健康！',
              desc:' ',
              link: window.location.href.split('#')[0]+'#/home',
              imgUrl: 'http://test.zebfish.com/logo.jpg',
              callback:()=>{
                this.operationFeedback({type:'complete',text:'分享成功'})
              }
            });
          },1000)
        },

    };
</script>
