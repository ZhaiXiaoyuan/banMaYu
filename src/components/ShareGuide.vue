<template>
  <div class="share-guide" @click="close()">
    <div class="mask">
      <i class="icon share-guide-icon"></i>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .share-guide{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top:0rem;
    left: 0rem;
    .mask{
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
    .share-guide-icon{
      position: absolute;
      top: 0rem;
      right: 0.52rem;
      display: inline-block;
      background: url("../images/common/share-guide-icon.png") no-repeat;
      width: 5.06rem;
      height: 4.08rem;
      background-size: 100% 100%;
    }
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{

    },
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {

    },
    methods: {
      close:function () {
        this.$el.remove();
        this.$destroy();
      }
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
