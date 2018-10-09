<template>
  <div class="sign-in-modal" v-if="signInModalFlag">
    <div class="mask"></div>
    <div class="modal-content">
      <div class="modal-header">
        <div class="close-btn">
          <i class="icon close-icon" @click="signInModalFlag=false"></i>
        </div>
      </div>
      <div class="modal-body">
        <i class="icon wealth-icon"></i>
        <div class="reward">
          <span>签到成功</span>
          <span class="num">+{{scoreIncremental}}</span>
          <i class="icon coin-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .sign-in-modal{
    position: fixed;
    top:0rem;
    left: 0rem;
    width: 100%;
    height: 100%;
    z-index: 100;
    .mask{
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
    .modal-content{
      position: fixed;
      width: 100%;
      top:2.7rem;
      left: 0rem;
    }
    .modal-header{
      display: flex;
      padding: 0rem 0.65rem;
      .close-btn{
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0.72rem;
        height: 0.72rem;
        border-radius: 50%;
        background: rgba(0,0,0,0.4);
        .icon{
          position: relative;
          top:0.02rem;
        }
      }
    }
    .modal-body{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-top: 0.78rem;
      text-align: center;
      .reward{
        padding: 0rem 0.28rem;
        margin-top: 0.3rem;
        color: #fff;
        font-size: 0.32rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.7rem;
        background: rgba(0,0,0,0.3);
        border-radius: 0.12rem;
        .num{
          position: relative;
          top:0.02rem;
          padding: 0rem 0.08rem;
          color: #FFB200;
        }
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options: {
        type: Object,
        default:function () {
          return {
            callback:null,
          }
        }
      }
    },
    data: function () {
      return {
        signInModalFlag:false,
        scoreIncremental:0,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      signIn:function () {
        let fb=this.operationFeedback({text:'签到中...'});
        Vue.api.signIn({...Vue.tools.sessionInfo()}).then((resp)=>{
          if(resp.status=='success'){
            this.canSign=false;
            this.signInModalFlag=true;
            this.scoreIncremental=resp.message;
            this.options.callback&&this.options.callback(this.scoreIncremental);
            fb.setOptions({type:'complete',text:'签到成功',delayForDelete:0});
          }else{
            fb.setOptions({type:'warn',text:resp.message});
          }
        });
      }
    },
    created: function () {

    },
    mounted: function () {
      /**/
      this.signIn();
    }
  };
</script>
