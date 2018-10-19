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
          <div class="item">
            <div class="label">性别</div>
            <div class="value">
              {{curMember.gender}}
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
          <div class="item">
            <div class="label">血型</div>
            <div class="value">
              {{curMember.blood}}
            </div>
          </div>
          <div class="item">
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
          </div>
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
              <div class="cm-btn selector" @click="openPicker()">
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
      <div class="submit-panel">
        <span class="total-price" v-if="goods"><i class="icon">￥</i>{{goods.price.toFixed(2)}}</span>
        <div class="btn-list">
          <span class="cm-btn btn cancel-btn" @click="cancel()">取消返回</span>
          <span class="cm-btn btn" @click="createOrder()">立即预定</span>
        </div>
      </div>

      <list-selector :options="selectMemberModalOptions"></list-selector>
      <list-selector :options="payMethodModalOptions"></list-selector>

      <mt-datetime-picker
        type="date"
        ref="picker"
        year-format="{value}年"
        month-format="{value}月"
        date-format="{value}日"
        @confirm="handleConfirm"
        :startDate="startDate"
      >
      </mt-datetime-picker>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>

<script>
    import Vue from 'vue'
    import ListSelector from '../../components/ListSelector.vue'
   /* import Calendar from 'vue2-slot-calendar';*/


    export default {
        components: {
          ListSelector,
        /*  Calendar*/
        },
        data: function () {
            return {
              id:null,
              goods:null,
              curMember:{},
              relativeList:[],
              selectMemberModalOptions:{
                show:false,
                list:[],
                ok:(data)=>{
                  if(data){
                    this.curMember=data;
                    this.getUserData(data.id)
                  }
                }
              },
              curStore:{},
              curDate:new Date(),
              dateTime: null,
              startDate: new Date(),
              payMethodModalOptions:{
                show:false,
                list:[{label:'在线支付',value:'WeixinPay '},{label:'到店支付',value:'ArrivalPay '}],
                ok:(data)=>{
                  if(data){
                    this.selectedMethod=data;
                  }
                }
              },
              selectedMethod:{label:'在线支付',value:'WeixinPay'},
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
                console.log('data:',data);
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
                console.log('rList:',data);
                this.relativeList=data.result.reverse();
                this.relativeList.forEach((item,i)=>{
                  item.label=item.realname;
                  item.value=item.id
                })
                this.curMember=this.relativeList[0];
                this.selectMemberModalOptions.list=this.relativeList;
                this.getUserData(this.curMember.id);
              }
            })
          },
          getUserData:function (id) {
            Vue.api.getUserData({...Vue.tools.sessionInfo(),id:id}).then((resp)=>{
              if(resp.status=='success'){
                let member=JSON.parse(resp.message);
                this.curMember={...this.curMember,...member};
                localStorage.setItem('curMember',JSON.stringify(this.curMember));
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
              examdate:this.dateTime
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
            localStorage.clear('selectedStore');
          },
          toMyOrder:function (type) {
            this.$router.replace({name:'myOrder',query:{pageType:type}});
          }
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
          /*if(localStorage.getItem('curMember')){
            this.curMember=JSON.parse(localStorage.getItem('curMember'));
            console.log('this.curMember:',this.curMember);
          }*/
          if(localStorage.getItem('selectedStore')){
            this.curStore=JSON.parse(localStorage.getItem('selectedStore'));
            console.log('this.curStore:',this.curStore);
          }
        },

    };
</script>
