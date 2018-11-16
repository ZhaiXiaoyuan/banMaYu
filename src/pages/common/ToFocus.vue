<!--文章模板-->
<template>
    <div class="to-focus">
      <div class="page-content">

      </div>
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
              userInfo:null,
              content:[],
              curContent:{},
            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {
          window.location.href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3ODQ1NjAxNQ==&scene=110#wechat_redirect';
        },

    };
</script>
