<!--预约-->
<script src="../../../node_modules/vue2-slot-calendar/lib/calendar.min.js"></script>
<template>
    <div class="order">
      <div class="panel">
        <div class="panel-hd">
          <i class="icon title-icon"></i>
          <span class="title-text">预约套餐</span>
        </div>
        <div class="panel-bd">
          <div class="item text-item" v-if="goods">
            <div class="label">{{goods.name}}</div>
            <div class="value"><i class="icon money-icon">￥</i><span>{{goods.price.toFixed(2)}}</span></div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-hd">
          <i class="icon title-icon"></i>
          <span class="title-text">预约信息</span>
        </div>
        <div class="panel-bd">
          <div class="item">
            <div class="label">体检者姓名</div>
            <div class="value">
              <div class="cm-btn selector" @click="selectMemberModalOptions.show=true">
                <span class="cur-value">{{curMember.realname}}</span>
                <i class="icon selector-icon"></i>
              </div>
              <router-link :to="{ name: 'memberData', params: {mainId:'S'}}" tag="span" v-if="relativeList.length<6" class="cm-btn btn">新建体检者</router-link>
            </div>
          </div>
          <div class="item" @click="genderModalFlag=true">
            <div class="label">性别</div>
            <div class="value">
              {{curMember.gender}}
            </div>
          </div>
          <div class="item">
            <div class="label">身份证</div>
            <div class="value">
              <input type="tel" v-model="curMember.idno">
            </div>
          </div>
       <!--   <div class="item">
            <div class="label">年龄</div>
            <div class="value">
              42岁
            </div>
          </div>-->
          <div class="item">
            <div class="label">手机号</div>
            <div class="value">
              {{curMember.mobilephone}}
            </div>
          </div>
          <div class="item" @click="bloodPickerOptions.show=true">
            <div class="label">血型</div>
            <div class="value">
              {{curMember.blood}}
            </div>
          </div>
         <!-- <div class="item">
            <div class="label">药物过敏史</div>
            <div class="value">
              {{curMember.allergic}}
            </div>
          </div>
          <div class="item">
            <div class="label">过往病史</div>
            <div class="value">
              {{curMember.hismedical}}
            </div>
          </div>-->
        </div>
      </div>
      <div class="panel">
        <div class="panel-bd">
          <div class="item">
            <div class="label">地址</div>
            <router-link :to="{ name: 'store', params: {userId:curMember.id},query:{storeId:curStore.id,pageType:'selector',productId:goods?goods.id:''}}" tag="div"  class="value column-value">
              <div v-if="curStore.id">
                <p>{{curStore.fullname}}</p>
                <p class="tips">*温馨提示：可在亲友或个人中心变更控所</p>
              </div>
              <span  class="cm-btn btn" v-if="!curStore.id">请选择体控所</span>
            </router-link>
          </div>
          <div class="item">
            <div class="label">预约时间</div>
            <div class="value column-value">
              <div class="cm-btn selector" @click="datePickerOptions.show=true">
                <span class="cur-value">{{dateTime?dateTime:'请选择日期'}}</span>
                <i class="icon selector-icon"></i>
              </div>
              <p class="tips" v-if="curStore.id">*营业时间：{{curStore.begintime}}～{{curStore.endtime}}</p>
            </div>
        <!--    <calendar
              :value="selectedDate"
              :has-input="false"
              :special-days="specialDays"
            ></calendar>-->
          </div>
          <div class="item" @click="payMethodModalOptions.show=true;">
            <div class="label">支付方式</div>
            <div class="value">
              <div class="cm-btn selector">
                <span class="cur-value">{{selectedMethod.label}}</span>
                <i class="icon selector-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cm-bottom-fixed submit-panel">
       <div class="wrapper">
         <span class="total-price" v-if="goods"><i class="icon">￥</i>{{goods.price.toFixed(2)}}</span>
         <div class="btn-list">
           <span class="cm-btn btn cancel-btn" @click="cancel()">取消返回</span>
           <span class="cm-btn btn" @click="createOrder()">立即预定</span>
         </div>
       </div>
      </div>

      <list-selector :options="selectMemberModalOptions"></list-selector>
      <list-selector :options="payMethodModalOptions"></list-selector>

<!--      <mt-datetime-picker
        type="date"
        ref="picker"
        year-format="{value}年"
        month-format="{value}月"
        date-format="{value}日"
        @confirm="handleConfirm"
        :startDate="startDate"
      >
      </mt-datetime-picker>-->

      <date-picker :options="datePickerOptions"></date-picker>
      <cm-picker :options="bloodPickerOptions" ref="bloodPicker"></cm-picker>
      <mt-popup
        v-model="genderModalFlag"
        position="bottom" style="width: 100%;">
        <mt-picker :slots="slots" value-key="label" @change="genderChange"></mt-picker>
      </mt-popup>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>

<script>
    import Vue from 'vue'
    import ListSelector from '../../components/ListSelector.vue'
    import CmPicker from '../../components/CmPicker.vue'

    export default {
        components: {
          ListSelector,
          CmPicker
        },
        data: function () {
            return {
              id:null,
              goods:null,
              isInitMember:false,
              curMember:{},
              relativeList:[],
              selectMemberModalOptions:{
                show:false,
                list:[],
                ok:(data)=>{
                  if(data){
                    if(!this.isInitMember&&localStorage.getItem('curMember')){
                      this.curMember=JSON.parse(localStorage.getItem('curMember'));
                      console.log('this.curMember:',this.curMember);
                      this.setDefaultBlood();
                      this.setDefaultGender();
                    }else{
                      this.getUserData(data.id);
                    }
                    this.isInitMember=true;
                  }
                }
              },
              curStore:{},
              curDate:new Date(),
              dateTime: null,
              startDate: new Date(),
              payMethodModalOptions:{
                show:false,
                list:[{label:'在线支付',value:'WeixinPay'},{label:'到店支付',value:'ArrivalPay'}],
                ok:(data)=>{
                  if(data){
                    this.selectedMethod=data;
                  }
                }
              },
              selectedMethod:{label:'在线支付',value:'WeixinPay'},
              datePickerOptions:{
                begin:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()],
                value:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()],
                show:false,
                ok:(data)=>{
                  let year=data[0];
                  let month=data[1];
                  let date=data[2];
                  month=month<10?'0'+month:month;
                  date=date<10?'0'+date:date;
                  let dateStr=month+'.'+date;
                  if(!this.curStore.id){
                    this.operationFeedback({type:'warn',text:'请先选择体控所'});
                  }else{
                    if(this.curStore.closedate.indexOf(dateStr)>-1){
                      this.operationFeedback({type:'warn',text:'该体控中心当天不营业，请选择其他日期'});
                    }else{
                      this.dateTime = year+'-'+month+'-'+date;
                    }
                  }
                }
              },

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
                  this.curMember.blood=this.bloodData[0].label+','+this.bloodData[1].label
                }
              },

              genderModalFlag:false,
              slots: [
                {
                  values: [{label:'男',value:'男'},{label:'女',value:'女'}],
                  textAlign: 'center',
                  defaultIndex:0
                }
              ],
            }
        },
        computed: {},
        watch: {},
        methods: {
          getPhysicalDetail:function () {
            Vue.api.getPhysicalDetail({...Vue.tools.sessionInfo(),id:this.id}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.goods=data;
              }
            });
          },
          getRelativeList:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              'pager.pageSize':6,
              'pager.pageNumber':1
            }
            Vue.api.getRelativeList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.relativeList=data.result.reverse();
                this.relativeList.forEach((item,i)=>{
                  item.label=item.realname;
                  item.value=item.id
                })
                this.curMember=this.relativeList[0];
                this.selectMemberModalOptions.list=this.relativeList;
              }
            })
          },
          getUserData:function (id) {
            Vue.api.getUserData({...Vue.tools.sessionInfo(),id:id}).then((resp)=>{
              if(resp.status=='success'){
                let member=JSON.parse(resp.message);
               /* if(localStorage.getItem('curMember')){
                  this.curMember=JSON.parse(localStorage.getItem('curMember'));
                  console.log('this.curMember:',this.curMember);
                }*/
               //

                //
                this.curMember={...this.curMember,...member};
                localStorage.setItem('curMember',JSON.stringify(this.curMember));

                this.setDefaultBlood();
                this.setDefaultGender();
                //
                if(localStorage.getItem('selectedStore')){
                  this.curStore=JSON.parse(localStorage.getItem('selectedStore'));
                }else{
                  Vue.api.getStoreDetail({...Vue.tools.sessionInfo(),storeid:this.curMember.storeid}).then((resp)=>{
                    if(resp.status=='success'){
                      this.curStore=JSON.parse(resp.message);
                    }
                  });
                }
              }else{

              }
            });
          },
          openPicker () {
            if(!this.curStore){
              this.operationFeedback({type:'warn',text:'请先选择体控所！'});
              return;
            }
            this.$refs.picker.open()
          },
          handleConfirm (data) {
            let year=data.getFullYear();
            let month=data.getMonth()+1;
            let date=data.getDate();
            month=month<10?'0'+month:month;
            date=date<10?'0'+date:date;
            let dateStr=month+'.'+date;
            if(this.curStore&&this.curStore.closedate.indexOf(dateStr)>-1){
              this.operationFeedback({type:'warn',text:'该体控中心当天不营业，请选择其他日期'});
            }else{
              this.dateTime = Vue.tools.formatDate(data,'yyyy-MM-dd');
            }
          },
          cancel:function () {
            this.clearCache();
            this.$router.go(-1);
          },
          createOrder:function () {
            if(!this.curMember.gender){
              this.operationFeedback({type:'warn',text:'请选择性别'});
              return;
            }
            if(!this.curMember.blood){
              this.operationFeedback({type:'warn',text:'请选择血型'});
              return;
            }
            if(!this.curMember.idno){
              this.operationFeedback({type:'warn',text:'请输入身份证号码'});
              return;
            }
            if(!this.curStore){
              this.operationFeedback({type:'warn',text:'请先选择体控所！'});
              return;
            }
            if(!this.dateTime){
              this.operationFeedback({type:'warn',text:'请先选择预约时间'});
              return;
            }
            let params={
              ...Vue.tools.sessionInfo(),
              productid:this.goods.id,
              customerid:this.curMember.id,
              storeid:this.curStore.id,
              paytype:this.selectedMethod.value,
              examdate:this.dateTime,

              gender:this.curMember.gender,
              blood:this.curMember.blood,
              idno:this.curMember.idno,
            }
            let fb=this.operationFeedback({text:'预约中...'});
            Vue.api.createPhysicalOrder(params).then((resp)=>{
              if(resp.status=='success'){
                fb.setOptions({type:'success',text:'订单生成成功',delayForDelete:0});
                let data=JSON.parse(resp.message);
                this.clearCache();
                fb.setOptions({type:'complete',text:'预约成功'});
                if(this.selectedMethod.value=='WeixinPay'){
                  this.wechatPay({
                    orderId:data.id,
                    success:()=>{
                      this.toMyOrder('20');
                    },
                    fail:()=>{
                      this.toMyOrder('10');
                    }
                  });
                }else{
                  this.$router.replace({name:'tips',query:{}});
                }
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          },
          clearCache:function () {
            localStorage.clear('curMember');
            localStorage.clear('selectedStore');
          },
          toMyOrder:function (type) {
            this.$router.replace({name:'myOrder',query:{pageType:type}});
          },
          setDefaultBlood:function () {
            if(this.curMember.blood){
              let bloodArr=this.curMember.blood.split(',');
              this.$refs.bloodPicker.setDefault(bloodArr);
            }
          },
          setDefaultGender:function () {
            if(!this.curMember.gender){
              this.curMember.gender='男';
              this.curMember.genderText='男';
            }
            this.slots[0].values.find((item,i)=>{
              if(item.value==this.curMember.gender){
                this.slots[0].defaultIndex=i;
                this.curMember.genderText=item.label;
              }
            });
          },
          genderChange(picker, values) {
            let item=values[0];
            this.curMember.gender=item.value;
            this.curMember.genderText=item.label;
           /* if(this.genderModalFlag&&item){
              this.save('gender');
            }*/
            this.genderModalFlag=false;
            console.log('values:',values);
          },
        },
        created: function () {
        },
        mounted: function () {
          this.id=this.$route.query.id;
          //
          this.getPhysicalDetail();
          //
          this.getRelativeList();
          //
          if(localStorage.getItem('selectedStore')){
            this.curStore=JSON.parse(localStorage.getItem('selectedStore'));
            console.log('this.curStore:',this.curStore);
          }
          //
          this.checkFocus('realTime');
          //
         /* this.datePicker({
            show:true,
            value:[2018,9,1],
            ok:(data)=>{
              console.log('data:',data);
            }
          })*/
        },
      beforeRouteEnter (to, from, next) {
        //刷新页面，否则支付时会报路径错误
        if(sessionStorage.getItem('loginTarget')=='goodsDetail'){
          sessionStorage.removeItem('loginTarget');
          window.location.reload();
        }else{
          next();
        }
      },

    };
</script>
