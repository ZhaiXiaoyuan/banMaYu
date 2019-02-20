<!--登录-->
<template>
    <div class="member-data entrance">
      <div class="panel">
        <div class="panel-bd">
          <div class="btn-wrap">
            <router-link :to="{ name: 'register', params: {}}" class="cm-btn btn">注&nbsp;&nbsp;册</router-link>
          </div>
          <div class="gap">或</div>
          <div class="btn-wrap">
            <router-link :to="{ name: 'login', params: {}}" class="cm-btn btn login-btn">登&nbsp;&nbsp;录</router-link>
          </div>
          <p class="tips">
            说明：已有账号，可使用手机号直接登录
          </p>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .entrance{
    .btn-wrap{
      margin: 0rem;
      position: relative;
      background: none;
      border: none;
      padding: 0rem;
      .btn{
        width: 100%;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.32rem;
      }
      .login-btn{
        background: none;
        border: 1px solid #0091e0;
        color: #0091e0;
      }
    }
    .panel{
      box-shadow: none;
      padding: 0.8rem 0.3rem;
    }
    .tips{
      margin-top: 0.2rem;
      font-size: 0.28rem;
      color: #999;
    }
    .gap{
      position: relative;
      padding: 0.4rem 0rem;
      font-size: 0.32rem;
      color: #999;
      text-align: center;
      &:before,&:after{
        content:'';
        position: absolute;
        top:0rem;
        bottom: 0rem;
        left: 0rem;
        margin: auto;
        width: 42%;
        height: 1px;
        background: #999;
      }
      &:after{
        left: auto;
        right: 0rem;
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
              member:{
                mobilephone:null,
              },
            }
        },
        computed: {},
        watch: {},
        methods: {
          save:function () {
            if(!this.member.mobilephone){
              this.operationFeedback({type:'warn',text:'请输入手机号码'});
              return;
            }
            if(!this.member.mcode){
              this.operationFeedback({type:'warn',text:'请输入短信验证码'});
              return;
            }
            let fb=this.operationFeedback({text:'登录中...'});
            let params={
              timestamp:Vue.tools.genTimestamp(),
              token: Vue.cookie.get('token'),
              number:this.member.mobilephone,
              ...this.member,
            }
            Vue.api.login(params).then((resp)=>{
              if(resp.status=='success'){
                //
                fb.setOptions({type:'complete',text:'登录成功'});
                //拼上number和token跳转，路由拦截后会根据这两值生成前端的登录状态
                this.$router.push({name:'my',params:{},query:{number:params.number,token:Vue.cookie.get('token')}});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          },
          genderChange(picker, values) {
            let item=values[0];
            this.member.gender=item.value;
            this.member.genderText=item.label;
            this.genderModalFlag=false;
          },
          openPicker () {
            this.$refs.birthPicker.open();
            this.closeTouch();
          },
          birthConfirm:function (data) {
            this.member.birthday=this.formatDate(data,'yyyy-MM-dd');
            this.openTouch();
          },
          birthCancel:function () {
            this.$refs.birthPicker.close();
            this.openTouch();
          },
          /*解决iphone页面层级相互影响滑动的问题*/
          closeTouch:function(){
            document.getElementsByTagName("body")[0].addEventListener('touchmove',
              this.handler,{passive:false});//阻止默认事件
          },
          openTouch:function(){
            document.getElementsByTagName("body")[0].removeEventListener('touchmove',
              this.handler,{passive:false});//打开默认事件
          }
        },

        created: function () {
        },
        mounted: function () {
        },

    };
</script>
