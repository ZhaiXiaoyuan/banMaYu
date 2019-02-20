<!--注册-->
<template>
    <div class="member-data register">
      <div class="slogan">
        <p>科学严谨的体控服务</p>
        <p>助您享受更久的健康时光</p>
      </div>
      <div class="panel">
        <div class="panel-hd">
        </div>
        <div class="panel-bd">
          <div class="item">
            <div class="label">姓名</div>
            <div class="value">
              <input type="text" v-model="member.realname" placeholder="请输入真实姓名">
            </div>
          </div>
          <div class="item">
            <div class="label">性别</div>
            <div class="value">
              <input type="text" readonly v-model="member.genderText" @click="genderModalFlag=true" placeholder="请选择性别">
            </div>
          </div>
          <div class="item">
            <div class="label">出生年月日</div>
            <div class="value">
              <input type="text" readonly unselectable="on" onfocus="this.blur()"  v-model="member.birthday" @click="openPicker" placeholder="请选择出生年月日">
            </div>
          </div>
          <div class="item">
            <div class="label">证件号</div>
            <div class="value">
              <input type="text" v-model="member.idno" placeholder="请输入证件号">
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
          <div class="item">
            <div class="label">推荐人手机</div>
            <div class="value">
              <input type="text" v-model="member.sourceNumber" placeholder="非必填">
            </div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn btn" @click="save()">注&nbsp;&nbsp;册</div>
      </div>
      <div class="switch">
        <router-link :to="{ name: 'login', params: {}}" class="cm-btn switch-btn">已有账号，去登录</router-link>
      </div>

      <!--弹窗-->
      <mt-popup
        v-model="genderModalFlag"
        position="bottom" style="width: 100%;">
        <mt-picker :slots="slots" value-key="label" @change="genderChange"></mt-picker>
      </mt-popup>

      <mt-datetime-picker
        ref="birthPicker"
        v-model="selectedBirth"
        type="date"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        :startDate="birthPickerStartDate"
        :endDate="birthPickerEndDate"
        @confirm="birthConfirm" @cancel="birthCancel">
      </mt-datetime-picker>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .register{
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
      margin-top: 0.6rem;
      position: relative;
      background: none;
      border: none;
      .btn{
        width: 100%;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.32rem;
      }
    }
    .switch{
      text-align: center;
      padding: 0.3rem 0.3rem 0.4rem 0.3rem;
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
                sourceNumber:localStorage.getItem('sourceNumber'),
                gender:'男',
                genderText:'男',
                birthday:null,
              },
              genderModalFlag:false,
              selectedGender:null,
              slots: [
                {
                  values: [{label:'男',value:'男'},{label:'女',value:'女'}],
                  textAlign: 'center',
                  defaultIndex:0
                }
              ],
              birthPickerStartDate:new Date('1900/01/01'),
              birthPickerEndDate:new Date(),
              selectedBirth:new Date('1991/01/01'),
              /*---------监听函数--------------*/
              handler:function(e){e.preventDefault();}
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
            if(!this.member.gender){
              this.operationFeedback({type:'warn',text:'请选择性别'});
              return;
            }
            if(!this.member.birthday){
              this.operationFeedback({type:'warn',text:'请选择出生年月日'});
              return;
            }
            if(!this.member.idno){
              this.operationFeedback({type:'warn',text:'请输入证件号'});
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
              recomphone:this.member.sourceNumber,
            }
            Vue.api.register(params).then((resp)=>{
              if(resp.status=='success'){
                //
                fb.setOptions({type:'complete',text:'注册成功'});
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
