<!--注册-->
<template>
    <div class="member-data register">
      <p class="page-title">快速注册</p>
      <div class="panel">
        <div class="panel-bd">
          <div class="item">
            <div class="label">真实姓名</div>
            <div class="value">
              <input type="text" v-model="member.realname" placeholder="请输入真实姓名">
            </div>
          </div>
          <div class="item">
            <div class="label">身份证号码</div>
            <div class="value">
              <input type="text" v-model="member.idno" placeholder="请输入身份证号码">
            </div>
          </div>
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
              <gen-code :phone="member.mobilephone"></gen-code>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn btn" @click="save()">注&nbsp;&nbsp;册</div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .register{
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
      .btn{
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
              member:{

              },
            }
        },
        computed: {},
        watch: {},
        methods: {
          save:function () {
            let that=this;
            if(!this.member.realname){
              this.operationFeedback({type:'warn',text:'请输入真实姓名'});
              return;
            }
            if(!this.member.idno){
              this.operationFeedback({type:'warn',text:'请输入身份证号码'});
              return;
            }
            if(!this.member.mobilephone){
              this.operationFeedback({type:'warn',text:'请输入手机号码'});
              return;
            }
            if(!this.member.mcode){
              this.operationFeedback({type:'warn',text:'请输入短信验证码'});
              return;
            }
            let fb=this.operationFeedback({text:'注册中...'});
            let params={
              timestamp:Vue.tools.genTimestamp(),
              token: Vue.cookie.get('token'),
              number:this.member.mobilephone,
              ...this.member,
              recomVipcode:null,
            }
            Vue.api.register(params).then((resp)=>{
              if(resp.status=='success'){
                Vue.cookie.set('number',this.member.mobilephone,{ expires: '12h' });
                fb.setOptions({type:'complete',text:'注册成功'});
                this.$router.push({name:'my',params:{}});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          let userInfo=sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):null;
          Object.assign(this.member,userInfo);

          console.log('member:',this.member);
        },

    };
</script>
