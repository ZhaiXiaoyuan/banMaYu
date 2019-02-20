<!--登录-->
<template>
    <div class="member-data login">
      <div class="slogan">
        <p>科学严谨的体控服务</p>
        <p>助您享受更久的健康时光</p>
      </div>
      <div class="panel">
        <div class="panel-hd">
        </div>
        <div class="panel-bd">
          <div class="items">
            <div class="item">
              <div class="label">手机号码</div>
              <div class="value">
                <input type="text" v-model="member.mobilephone" placeholder="请输入手机号码">
              </div>
            </div>
            <div class="item">
              <div class="label">短信验证码</div>
              <div class="value">
                <input type="text" v-model="member.mcode" placeholder="请输入短信验证码" style="padding-right: 2.4rem;">
                <gen-code :phone="member.mobilephone" url="/cs/cus/auth/lcode"></gen-code>
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <div class="cm-btn btn" @click="save()">登&nbsp;&nbsp;录</div>
          </div>
          <div class="switch">
            <router-link :to="{ name: 'register', params: {}}" class="cm-btn switch-btn">去注册</router-link>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .login{
    .slogan{
      font-size: 0.36rem;
      color: #666;
      text-align: center;
      padding: 0.3rem 0rem;
      background: #fff;
      line-height: 0.58rem;
    }
    .page-title{
      font-size: 16px;
      color: #666;
      padding: 0.4rem 0.2rem 0.2rem 0.3rem;
    }
    .btn-wrap{
      margin-top: 0.8rem;
      position: relative;
      background: none;
      border: none;
      padding: 0.2rem 0rem;
      .btn{
        width: 100%;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.32rem;
      }
    }
    .panel{
     box-shadow: none;
    }
    .items{
      border-bottom: 1px solid #eee;
    }
    .switch{
      text-align: right;
      padding: 0.4rem 0rem;
      .switch-btn{
        font-size: 0.32rem;
        color: #0facff;
        text-decoration: underline;
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
