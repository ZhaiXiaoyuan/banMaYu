<!--退出账号快捷链接-->
<template>
    <div class="logout">
      <p>?token={{token}}&number={{number}}</p>
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
              contentData:null,
              token:null,
              number:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          logout:function () {
            Vue.cookie.delete('number');
            Vue.cookie.delete('token');
            Vue.cookie.delete('userInfo');
            alert('退出成功');
           /* this.$router.push({name:'home'});*/
          }
        },

        created: function () {
        },
        mounted: function () {
          this.token=Vue.cookie.get('token');
          this.number=Vue.cookie.get('number');
          this.logout();
        },

    };
</script>
