<!--关于我们-->
<template>
    <div class="about">
      <div class="page-content" v-if="contentData" v-html="contentData.value">

      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .about{
    .page-content{
      padding: 0.4rem 0.3rem;
      table{
      width: 100% !important;
      }
      img{
        width: 100%;
      }
    }
  }
</style>

<script>
    import Vue from 'vue'


    export default {
        components: {

        },
        data: function () {
            return {
              contentData:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getAbout:function () {
            Vue.api.getAbout({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.contentData=JSON.parse(resp.message);
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          this.getAbout();
        },

    };
</script>
