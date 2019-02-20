<template>
  <div class="gen-code" :class="{'cm-disabled':time<60||!phone}" @click="genCode()">
    {{time==60?'获取验证码':time+'S'}}
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .gen-code{
    position: absolute;
    width: 1.9rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #0091e0;
    font-size: 0.24rem;
    color: #fff;
    text-align: center;
    top:0rem;
    bottom:0rem;
    right: 0rem;
    margin: auto;
    cursor: pointer;
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      type:{
        type:String,
        default:'register',
      },
      phone:{
        type:String,
      },
      url:{
        type:String,
      }
    },
    data: function () {
      return {
        time:60,
        isRequesting:false,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      genCode:function () {
        let that=this;
        if(!regex.phone.test(this.phone)){
          this.operationFeedback({type:'warn',text:regex.phoneAlert})
          return;
        }
        if(this.isRequesting||this.time<60){
          return;
        }
        this.isRequesting=true;
        let params={
          timestamp:Vue.tools.genTimestamp(),
          number:this.phone,
          token: Vue.cookie.get('token')
        }
        let fb=this.operationFeedback({text:'发送中...'});
        Vue.api.genCode(params,{url:this.url}).then(function (resp) {
          that.isRequesting=false;
          if(resp.status=='success'){
            fb.setOptions({type:'complete','text':'发送成功'});
            var interval=setInterval(function () {
              if(that.time==0){
                that.time=60;
                clearInterval(interval);
              }else{
                that.time--;
              }
            },1000);
          }else{
            fb.setOptions({type:'warn','text':resp.description});
          }
        });
      }
    },
    created: function () {

    },
    mounted: function () {
      /*修改父dom的position*/
      this.$el.parentNode.style.position='relative';
    }
  };
</script>
