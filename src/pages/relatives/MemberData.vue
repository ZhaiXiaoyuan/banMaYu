<!--基本资料-->
<template>
    <div class="member-data">
      <div class="panel">
        <div class="panel-bd">
          <div class="item avatar-item arrows-right">
            <div class="label">头像</div>
            <div class="value">
              <img :src="member.touxiang?member.touxiang:defaultAvatar">
              <input type="file" id="file-input" accept="image/*" @change="selectFile()">
            </div>
          </div>
          <div class="item">
            <div class="label">真实姓名</div>
            <div class="value">
              <input type="text" v-model="member.realname" placeholder="请输入真实姓名">
            </div>
          </div>
          <div class="item" v-if="mainId!='M'">
            <div class="label">关系</div>
            <div class="value">
              <input type="text" v-model="member.relative" placeholder="请输入与亲友的关系">
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-bd">
          <div class="item">
            <div class="label">性别</div>
            <div class="value">
              <input type="text" readonly v-model="member.genderText" @click="genderModalFlag=true" placeholder="请选择性别">
            </div>
          </div>
          <div class="item">
            <div class="label">出生年月日</div>
            <div class="value">
              <input type="text" readonly unselectable="on" onfocus="this.blur()" v-model="member.birthday" @click="openPicker" placeholder="请选择出生年月日">
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
              <input type="text" v-model="member.mobilephone" placeholder="请输入手机号码，非必填">
            </div>
          </div>
          <div class="item">
            <div class="label">短信验证码</div>
            <div class="value">
              <input type="text" v-model="member.mcode" placeholder="请输入短信验证码" style="padding-right: 2.4rem;">
              <gen-code :phone="member.mobilephone"></gen-code>
            </div>
          </div>
        <!--  <div class="item">
            <div class="label">体重（kg）</div>
            <div class="value">
              <input type="text" placeholder="请输入体重">
            </div>
          </div>
          <div class="item">
            <div class="label">身高（cm）</div>
            <div class="value">
              <input type="text" placeholder="请输入体重">
            </div>
          </div>-->
          <div class="item">
            <div class="label">血型</div>
            <div class="value">
              <input type="text" readonly v-model="member.blood" placeholder="请选择血型" @click="bloodPickerOptions.show=true">
            </div>
          </div>
          <div class="item">
            <div class="label">家庭地址</div>
            <div class="value">
              <input type="text" v-model="member.address" placeholder="请输入家庭地址">
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-bd">
          <div class="item textarea-item">
            <div class="label">过往病史</div>
            <div class="value">
              <textarea cols="30" rows="10" v-model="member.hismedical" placeholder="请输入过往病史，糖尿病、高血压、心脑血管、癌症等，若没有，请填无"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-bd">
          <div class="item textarea-item">
            <div class="label">药物过敏史</div>
            <div class="value">
              <textarea cols="30" rows="10" v-model="member.allergic" placeholder="请输入药物过敏史，若没有，请填无"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn btn cancel-btn" @click="$router.go(-1)">返&nbsp;&nbsp;回</div>
        <div class="cm-btn btn" @click="save()">保&nbsp;&nbsp;存</div>
      </div>

      <!--弹窗-->
      <mt-popup
        v-model="genderModalFlag"
        position="bottom" style="width: 100%;">
        <mt-picker :slots="slots" value-key="label" @change="genderChange"></mt-picker>
      </mt-popup>

      <cm-picker :options="bloodPickerOptions" ref="bloodPicker"></cm-picker>

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
</style>

<script>
    import Vue from 'vue'
    import * as qiniu from 'qiniu-js'
    import CmPicker from '../../components/CmPicker.vue'


    export default {
        components: {
          CmPicker
        },
        data: function () {
            return {
              userInfo:{},
              mainId:null,
              id:null,
              member:{
                gender:'男',
                genderText:'男',
                blood:null,
                birthday:null,
              },
              oldPhone:null,
              defaultAvatar:require('../../images/common/default-avatar.png'),
              genderModalFlag:false,
              selectedGender:null,
              slots: [
                {
                  values: [{label:'男',value:'男'},{label:'女',value:'女'}],
                  textAlign: 'center',
                  defaultIndex:0
                }
              ],
              uploading:false,

              bloodData:null,
              bloodPickerOptions:{
                show:false,
                slots:[
                  {
                    values: [{label:'A',value:'A'},{label:'B',value:'B'},{label:'O',value:'O'},{label:'AB',value:'AB'},{label:'不清楚',value:null}],
                    textAlign: 'center',
                    defaultIndex:0
                  },
                  {
                    values: [{label:'RH+',value:'RH+'},{label:'RH-',value:'RH-'},{label:'不清楚',value:null}],
                    textAlign: 'center',
                    defaultIndex:0
                  }
                ],
                ok:(data)=>{
                  console.log('bloodData:',data);
                  this.bloodData=data;
                  this.member.blood=this.bloodData[0].label+','+this.bloodData[1].label
                }
              },

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
          getUserData:function () {
            Vue.api.getUserData({...Vue.tools.sessionInfo(),id:this.id}).then((resp)=>{
              if(resp.status=='success'){
                this.member=JSON.parse(resp.message);
                this.oldPhone=this.member.mobilephone;
                if(!this.member.gender){
                  this.member.gender='男';
                  this.member.genderText='男';
                }
                this.slots[0].values.find((item,i)=>{
                  if(item.value==this.member.gender){
                    this.slots[0].defaultIndex=i;
                    this.member.genderText=item.label;
                  }
                });
               /* if(bloodArr.length==0){
                  bloodArr=[null,null];
                }else if(bloodArr.length==1){
                  bloodArr.push(null);
                }*/
               if(this.member.blood){
                 let bloodArr=this.member.blood.split(',');
                 this.$refs.bloodPicker.setDefault(bloodArr);
               }
                //
                if(this.member.birthday){
                  this.selectedBirth=new Date(this.member.birthday.replace(/-/g,"/"),)
                }
              }else{

              }
            });
          },
          genderChange(picker, values) {
            let item=values[0];
            this.member.gender=item.value;
            this.member.genderText=item.label;
            this.genderModalFlag=false;
          },
          saveUser:function () {
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
            if(this.member.mobilephone&&this.member.mobilephone!=this.oldPhone&&!this.member.mcode){
              this.operationFeedback({type:'warn',text:'更改手机号码，请输入短信验证码'});
              return;
            }
            if(!this.member.blood){
              this.operationFeedback({type:'warn',text:'请选择血型'});
              return;
            }
            if(!this.member.address){
              this.operationFeedback({type:'warn',text:'请输入家庭地址'});
              return;
            }
          /*  if(!this.member.hismedical){
              this.operationFeedback({type:'warn',text:'请输入过往病史'});
              return;
            }*/
          /*  if(!this.member.allergic){
              this.operationFeedback({type:'warn',text:'请输入过敏史'});
              return;
            }*/
            let fb=this.operationFeedback({text:'保存中...'});
            let params={
              ...Vue.tools.sessionInfo(),
              ...this.member
            }
            Vue.api.saveUserInfo(params).then((resp)=>{
              if(resp.status=='success'){
                Vue.cookie.set('number',this.member.mobilephone,{ expires: '12h' });
                fb.setOptions({type:'complete',text:'保存成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          },
          saveRelative:function () {
            let that=this;
            if(!this.member.realname){
              this.operationFeedback({type:'warn',text:'请输入真实姓名'});
              return;
            }
            if(!this.member.relative){
              this.operationFeedback({type:'warn',text:'请输入与亲友的关系'});
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
           /* if(!this.member.mobilephone){
              this.operationFeedback({type:'warn',text:'请输入手机号码'});
              return;
            }*/
            if(this.member.mobilephone&&this.member.mobilephone!=this.oldPhone&&!this.member.mcode){
              this.operationFeedback({type:'warn',text:'更改手机号码，请输入短信验证码'});
              return;
            }
            if(!this.member.blood){
              this.operationFeedback({type:'warn',text:'请选择血型'});
              return;
            }
            if(!this.member.address){
              this.operationFeedback({type:'warn',text:'请输入家庭地址'});
              return;
            }
            let fb=this.operationFeedback({text:'保存中...'});
            let params={
              ...Vue.tools.sessionInfo(),
              ...this.member
            }
            if(params.id){
              Vue.api.updateRelative(params).then((resp)=>{
                if(resp.status=='success'){
                  fb.setOptions({type:'complete',text:'保存成功'});
                  this.$router.go(-1);
                }else{
                  fb.setOptions({type:'warn',text:resp.message});
                }
              });
            }else{
              Vue.api.addRelative(params).then((resp)=>{
                if(resp.status=='success'){
                  fb.setOptions({type:'complete',text:'保存成功'});
                  this.$router.go(-1);
                }else{
                  fb.setOptions({type:'warn',text:resp.message});
                }
              });
            }
          },
          save:function () {
            if(this.mainId=='M'){
              this.saveUser();
            }else{
              this.saveRelative();
            }
          },
          selectFile:function () {
            let that=this;
            let file=document.getElementById('file-input').files[0];
            Vue.tools.fileToBlob(file,(data)=>{
              this.cropModal({
                img:data,
                ok:(data)=>{
                  Vue.api.getUploadKey({...Vue.tools.sessionInfo(),filename:file.name}).then((resp)=>{
                    if(resp.status=='success'){
                      let keyData=JSON.parse(resp.message);
                      console.log('keyData:',keyData);
                      var observable = qiniu.upload(data, keyData.codedname, keyData.token, {fname: file.name, params: {}, mimeType: [] || null
                      }, {useCdnDomain: true, region: qiniu.region.z2});
                      var subscription = observable.subscribe(function (data) {
                      }, function (error) {
                      }, function (reslult) {//上传成功
                        that.member.touxiang=keyData.filepath;
                      })
                    }
                  });
                }
              });
            });
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
          //
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};
          //
          this.mainId=this.$route.params.mainId;
          this.id=this.$route.params.id?this.$route.params.id:(this.mainId=='M'?this.userInfo.id:null);
          if(this.id){
            this.getUserData();
            //
            if(this.$route.query.source=='relatives'){
              localStorage.setItem('curId',this.id);
            }
          }else{
            if(this.mainId!='M'){
              document.title='添加亲友';
            }
            Vue.tools.sessionInfo()
          }
        },

    };
</script>
