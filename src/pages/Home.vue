<!--首页-->
<template>
    <div class="home">
      <div class="btn-list">
        <router-link tag="div" :to="{ name: 'memberData', params: {mainId:'M'}}" class="cm-btn btn-item data-btn">
          <p>基本资料</p>
          <p>完善您的资料</p>
        </router-link>
        <div class="cm-btn btn-item report-btn">
          <p>我的体质</p>
          <p>解析健康指标</p>
        </div>
        <router-link tag="div" :to="{ name: 'search', params: {},query:{type:'Physical'}}" class="cm-btn btn-item stethoscope-btn">
          <p>体检预约</p>
          <p>快捷预约体检</p>
        </router-link>
        <router-link tag="div" :to="{ name: 'search', params: {},query:{type:'Food'}}" class="cm-btn btn-item product-btn">
          <p>干预产品</p>
          <p>保护您的健康</p>
        </router-link>
        <div class="cm-btn btn-item msg-btn">
          <p>消息中心</p>
          <p>消息一目了然</p>
        </div>
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

        },

    };
</script>
