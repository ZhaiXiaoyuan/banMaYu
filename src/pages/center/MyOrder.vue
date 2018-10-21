<!--我的订单-->
<template>
    <div class="my-order">
      <div class="panel nav-panel" id="nav-panel">
        <ul class="nav-list">
          <li @click="setPageType('10')" :class="{'active':pageType=='10'}">待付款</li>
          <li @click="setPageType('20')" :class="{'active':pageType=='20'}">已付款</li>
          <li @click="setPageType('60')" :class="{'active':pageType=='60'}">已发货</li>
          <li @click="setPageType('30')" :class="{'active':pageType=='30'}">已取消</li>
          <li @click="setPageType('40')" :class="{'active':pageType=='40'}">退款中</li>
          <li @click="setPageType('50')" :class="{'active':pageType=='50'}">已退款</li>
          <li @click="setPageType('70')" :class="{'active':pageType=='70'}">已完成</li>
        </ul>
      </div>
      <div class="panel list-panel">
        <ul class="entry-list">
          <li class="entry" v-for="(entry,index) in entryList" :key="entry.id">
            <div class="entry-content" v-if="entry.producttype=='体检套餐'">
              <div class="entry-hd">
                <span class="title-text">订单号：{{entry.orderno}}</span>
                <span class="status">{{entry.paystatus}}</span>
              </div>
              <div class="entry-bd">
                <div class="item product-item">
                  <img :src="entry.productpicture">
                  <div class="text-info">
                    <p class="title">{{entry.productname}}</p>
                    <p class="num-row">
                      <span class="price"><i class="icon">￥</i>{{parseFloat(entry.productprice).toFixed(2)}}</span>
                      <span class="count">&times;{{entry.quantity}}</span>
                    </p>
                  </div>
                </div>
                <div class="item">
                  <div class="wrapper">
                    <div class="label">体检人</div>
                    <div class="value">
                      {{entry.realname}}
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="wrapper">
                    <div class="label">体检时间</div>
                    <div class="value">
                      {{entry.examdate}}
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="wrapper">
                    <div class="label">体检地点</div>
                    <div class="value">
                      {{entry.storeaddress}}
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="wrapper">
                    <div class="label">联系电话</div>
                    <div class="value">
                      {{entry.storephone}}
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="wrapper">
                    <div class="label">支付方式</div>
                    <div class="value">
                      {{entry.paytype}}
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="wrapper">
                    <div class="label"></div>
                    <div class="value">
                      合计：<span class="price"><i class="icon">￥</i>{{entry.orgamt.toFixed(2)}}</span>
                    </div>
                  </div>
                </div>
                <div class="item handle-item">
                  <div class="wrapper">
                    <div class="label"></div>
                    <div class="value">
                      <span class="cm-btn btn cancel-btn" v-if="pageType==10" @click="cancelOrder(index)">取消订单</span>
                      <span class="cm-btn btn" v-if="pageType==10&&entry.paytype!='到店支付'" @click="toPay(entry)">马上付款</span>
                      <span class="cm-btn btn" v-if="pageType==10||pageType==20" @click="openPicker(entry)">修改预约时间</span>
                      <span class="cm-btn btn" v-if="pageType==20" @click="refund(index)">申请退款</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="entry-content" v-if="entry.producttype!='体检套餐'">
              <div class="entry-hd">
                <span class="title-text">订单号：{{entry.orderno}}</span>
                <span class="status">{{entry.paystatus}}</span>
              </div>
              <div class="entry-bd">
                <div class="item product-item">
                  <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4013702356,2914973056&fm=58&bpow=655&bpoh=655">
                  <div class="text-info">
                    <p class="title">{{entry.productname}}</p>
                    <p class="num-row">
                      <span class="price"><i class="icon">￥</i>{{parseFloat(entry.productprice).toFixed(2)}}</span>
                      <span class="count">&times;{{entry.quantity}}</span>
                    </p>
                  </div>
                </div>
                <div class="item" v-if="entry.way=='到店自取'">
                  <div class="wrapper">
                    <div class="label">自取地址</div>
                    <div class="value">
                      {{entry.storeaddress}}
                    </div>
                  </div>
                </div>
                <div class="item" v-if="entry.way=='到店自取'">
                  <div class="wrapper">
                    <div class="label">联系电话</div>
                    <div class="value">
                      {{entry.storephone}}
                    </div>
                  </div>
                </div>
                <div class="item" v-if="entry.way=='快递送货'">
                  <div class="wrapper">
                    <div class="label">收件地址</div>
                    <div class="value">
                      {{entry.csaddress}}
                    </div>
                  </div>
                </div>
                <div class="item" v-if="entry.way=='快递送货'">
                  <div class="wrapper">
                    <div class="label">收件人</div>
                    <div class="value">
                      {{entry.csname}}
                    </div>
                  </div>
                </div>
                <div class="item" v-if="entry.way=='快递送货'">
                  <div class="wrapper">
                    <div class="label">联系电话</div>
                    <div class="value">
                      {{entry.csphone}}
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="wrapper">
                    <div class="label">支付方式</div>
                    <div class="value">
                      {{entry.paytype}}
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="wrapper">
                    <div class="label"></div>
                    <div class="value">
                      合计：<span class="price"><i class="icon">￥</i>{{entry.orgamt.toFixed(2)}}</span>
                    </div>
                  </div>
                </div>
                <div class="item handle-item">
                  <div class="wrapper">
                    <div class="label"></div>
                    <div class="value">
                      <span class="cm-btn btn cancel-btn" v-if="pageType==10"  @click="cancelOrder(index)">取消订单</span>
                      <span class="cm-btn btn" v-if="pageType==10"  @click="toPay(entry)">马上付款</span>
                      <span class="cm-btn btn" v-if="pageType==20" @click="refund(index)">申请退款</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <scroll-load :page="pager" @scrolling="getList()"></scroll-load>

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


    export default {
        components: {

        },
        data: function () {
            return {
              pageType:10,//10:未付款,20:已付款,30:已取消,40:申请退款中,50:已退款,60:已发货,70:已完成
              curEntry:null,
              pager:{
                pageNum: 1,
                pageSize: 20,
                isLoading:false,
                isFinished:false
              },
              entryList:[],

              dateTime:null,
              startDate: new Date(),
            }
        },
        computed: {},
        watch: {},
        methods: {
          getList:function (isInit) {
            if(isInit){
              this.pager.pageNum = 1;
              this.entryList = [];
            }
            let pager={
              'pager.pageNumber':this.pager.pageNum,
              'pager.pageSize':this.pager.pageSize
            }
            let params={
              ...Vue.tools.sessionInfo(),
              status:this.pageType,
              ...pager
            }
            Vue.api.getOrderList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                let pager=data.pager;
                this.pager.pageNum=pager.pageNumber+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(data.result);
                console.log('this.entryList:',this.entryList);
              }
            })
          },
          setPageType:function (value) {
            this.pageType=value;
            this.getList(true);
            if(value=='50'||value=='70'){
              let dom=document.getElementById('nav-panel');
              dom.scrollTo(100, dom.scrollTop);
            }
          },
          cancelOrder:function (index) {
            let item=this.entryList[index];
            this.confirm({
              html:'确定取消该订单？',
              ok:()=>{
                let params={
                  ...Vue.tools.sessionInfo(),
                  ordezid:item.id
                }
                let fb=this.operationFeedback({text:'取消中...'});
                Vue.api.cancelOrder(params).then((resp)=>{
                  if(resp.status=='success'){
                    this.entryList.splice(index,1);
                    fb.setOptions({type:'complete',text:'取消成功'});
                  }else{
                    fb.setOptions({type:'warn',text:resp.message});
                  }
                });
              }
            });
          },
          refund:function (index) {
            let item=this.entryList[index];
            this.confirm({
              html:'确定对该订单申请退款？',
              ok:()=>{
                let params={
                  ...Vue.tools.sessionInfo(),
                  ordezid:item.id
                }
                let fb=this.operationFeedback({text:'申请中...'});
                Vue.api.refund(params).then((resp)=>{
                  if(resp.status=='success'){
                    this.entryList.splice(index,1);
                    fb.setOptions({type:'complete',text:'申请成功'});
                  }else{
                    fb.setOptions({type:'warn',text:resp.message});
                  }
                });
              }
            });
          },
          openPicker (item) {
            this.curEntry=item;
            this.$refs.picker.open()
          },
          handleConfirm (data) {
            let year=data.getFullYear();
            let month=data.getMonth()+1;
            let date=data.getDate();
            month=month<10?'0'+month:month;
            date=date<10?'0'+date:date;
            let dateStr=month+'.'+date;
            if(this.curEntry&&this.curEntry.closedate.indexOf(dateStr)>-1){
              this.operationFeedback({type:'warn',text:'该体控中心当天不营业，请选择其他日期'});
              return;
            }else{
              this.dateTime = Vue.tools.formatDate(data,'yyyy-MM-dd');
            }

            this.dateTime = Vue.tools.formatDate(data,'yyyy-MM-dd');
            if(this.dateTime){
              this.updateOrderTime(this.curEntry);
            }
          },
          updateOrderTime:function (item) {
            let params={
              ...Vue.tools.sessionInfo(),
              orderno:item.orderno,
              examdate:this.dateTime
            }
            let fb=this.operationFeedback({text:'保存中...'});
            Vue.api.updateOrderTime(params).then((resp)=>{
              if(resp.status=='success'){
                this.defaultEntry=item;
                fb.setOptions({type:'complete',text:'保存成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          },
          toPay:function (item) {
            this.wechatPay({
              orderId:item.id,
              success:()=>{
                this.setPageType('20');
              },
              fail:()=>{
              /*  this.operationFeedback({type:'warn',text:''});*/
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {

          //
          this.setPageType(this.$route.query.pageType?this.$route.query.pageType:'10');
        },

    };
</script>
