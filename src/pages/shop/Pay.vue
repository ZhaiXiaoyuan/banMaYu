<!--确认订单-->
<template>
    <div class="pay">
      <router-link  :to="{ name: 'address', params: {id:address.id }}" tag="div" class="panel address-panel arrows-right" v-if="way=='E'">
        <div class="row">
          <div class="label">{{address.username}}</div>
          <div class="value">{{address.mobilephone|phoneTextFormat}}</div>
        </div>
        <div class="row">
          <div class="label">地&nbsp;&nbsp;址</div>
          <div class="value">{{address.detail}}</div>
        </div>
        <div class="icon border-icon"></div>
      </router-link>
      <div class="panel" v-if="pageType=='food'">
        <div class="panel-bd">
          <div class="item" style="padding-right: 0.3rem;">
            <div class="label">食用者</div>
            <div class="value column-value">
              <div v-if="curMember.id">
                <p>{{curMember.realname}}</p>
                <p class="tips">（本月可购买数量：{{curMember.count}}盒）</p>
              </div>
              <span  class="cm-btn btn" v-if="!curMember.id">请选择食用者</span>
            </div>
          </div>
        </div>
      </div>
      <div class="panel product-panel">
        <div class="panel-bd">
          <img :src="detail.pic1">
          <div class="text-info">
            <p class="title cm-ellipsis">{{detail.name}}</p>
            <p class="price" v-if="detail.price"><i class="icon">￥</i>{{detail.price.toFixed(2)}}</p>
            <div class="handle">
              <div class="cm-number-box">
                <div class="wrap">
                  <i class="icon minus-icon cm-solid-btn" :class="{'cm-disabled':curCount<=1}"  @click="minus()"></i><span class="num">{{curCount}}</span><i class="icon add-icon cm-solid-btn" :class="{'cm-disabled':pageType=='food'&&curCount>=curMember.count}" @click="add()"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-ft" v-if="pageType=='food'">温馨提示：{{detail.tips}}</div>
      </div>
      <div class="panel take-panel">
        <ul class="list-picker">
          <li :class="{'active':way=='M'}" @click="selectWay('M')">
            <span class="label">门店自取</span>
            <div class="value">
              <div class="status">
                <i class="icon selected-icon"></i>
              </div>
            </div>
          </li>
          <li  :class="{'active':way=='E'}"  @click="selectWay('E')">
            <span class="label">快递送货</span>
            <div class="value">
              <div class="status">
                <i class="icon selected-icon"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="panel" v-if="way=='M'">
        <div class="panel-bd">
          <div class="item">
            <div class="label">地址</div>
            <router-link :to="{ name: 'store', params: {userId:userInfo.id},query:{storeId:curStore.id,pageType:'selector'}}" tag="div"  class="value column-value">
              <div v-if="curStore.id">
                <p>{{curStore.fullname}}</p>
                <p class="tips">*温馨提示：可在亲友或个人中心变更控所</p>
              </div>
              <span  class="cm-btn btn" v-if="!curStore.id">请选择体控所</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="cm-bottom-fixed submit-panel">
        <div class="wrapper">
          <span class="total-price"><i class="icon">￥</i>{{total.toFixed(2)}}</span>
          <div class="btn-list">
            <span class="cm-btn btn cancel-btn" @click="cancel()">取消返回</span>
            <span class="cm-btn btn" @click="createOrder()">微信支付</span>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>

<script>
    import Vue from 'vue'
    import ListSelector from '../../components/ListSelector.vue'


    export default {
        components: {
          ListSelector,
        },
        data: function () {
            return {
              userInfo:{},
              id:null,
              pageType:null,
              curCount:1,
              detail:{},
              way:'E',//	取货方式 （E为快递送货 M为到店自取）,
              address:{},
              curStore:{},
              paymentInfo:null,
              orderFb:null,
              curMember:{},
            }
        },
        computed: {
          total:function () {
            return this.detail.price*this.curCount;
          }
        },
        watch: {},
        methods: {
          getGoodsDetail:function () {
            if(this.pageType=='food'){
              Vue.api.getFoodDetail({...Vue.tools.sessionInfo(),id:this.id}).then((resp)=>{
                if(resp.status=='success'){
                  let data=JSON.parse(resp.message);
                  this.detail=data;
                  console.log('data:',data);
                }
              });
            }else if(this.pageType=='health'){
              Vue.api.getHealthDetail({...Vue.tools.sessionInfo(),id:this.id}).then((resp)=>{
                if(resp.status=='success'){
                  let data=JSON.parse(resp.message);
                  this.detail=data;
                  console.log('data:',data);
                }
              });
            }
          },
          getUserFoodQualificationList:function () {
            Vue.api.getUserFoodQualificationList({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
               /* if(localStorage.getItem('curMember')){
                  this.curMember=JSON.parse(localStorage.getItem('curMember'));
                }else{
                  this.curMember=data[0];
                }
                if(this.curMember.count==0){
                  this.curCount=0;
                }*/
                this.curMember=data;//功能改版，取消选择使用者功能，固定选择当前登录的用户
              }
            })
          },
          add:function () {
            if(this.pageType=='food'&&this.curCount>=this.curMember.count){
              return;
            }
            this.curCount++;
            this.saveTemData();
          },
          minus:function () {
            if(this.curCount>1){
              this.curCount--;
              this.saveTemData();
            }
          },
          saveTemData:function () {
            localStorage.setItem(this.id,JSON.stringify({curCount:this.curCount,way:this.way}));
          },
          getTemData:function () {
            let str=localStorage.getItem(this.id);
            console.log('str:',str);
            if(localStorage.getItem(this.id)){
              let data=JSON.parse(localStorage.getItem(this.id));
              this.curCount=data.curCount;
              this.way=data.way;
            }
          },
          clearTemData:function () {
            localStorage.clear(this.id);
            localStorage.clear('selectedAddress');
            localStorage.clear('selectedStore');
            localStorage.clear('curMember');
          },
          selectWay:function (value) {
            this.way=value;
            this.saveTemData();
          },
          getDefaultAddress:function () {
            Vue.api.getDefaultAddress({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                if(resp.message){
                  this.address=JSON.parse(resp.message);

                }
              }
            });
          },
          createOrder:function () {
            let products=[{productid:this.detail.id,quantity:this.curCount}];
            if(!this.curCount){
              this.operationFeedback({type:'warn',text:'购买数量不能小于1'});
              return;
            }
            if(this.way=='E'&&!this.address.id){
              this.operationFeedback({type:'warn',text:'请选择收货人'});
              return;
            }
            if(this.way=='M'&&!this.curStore.id){
              this.operationFeedback({type:'warn',text:'请选择选择取货的门店'});
              return;
            }
            let params={
              ...Vue.tools.sessionInfo(),
              products:JSON.stringify(products),
              way:this.way,
              paytype:'WeixinPay ',
              addressid:this.way=='E'&&this.address?this.address.id:null,
              storeid:this.way=='M'&&this.curStore?this.curStore.id:null,
            }
            if(this.pageType=='food'){
              params.customerid=this.curMember.id;
            }
            let fb=this.operationFeedback({text:'操作中...'});
            Vue.api.createOrder(params).then((resp)=>{
              if(resp.status=='success'){
                fb.setOptions({type:'success',text:'订单生成成功',delayForDelete:0});
                let data=JSON.parse(resp.message);
                this.clearTemData();
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
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          },
          cancel:function () {
            this.clearTemData();
            this.$router.go(-1);
          },
          getDefaultStore:function () {
            Vue.api.getMyData({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                console.log('this.userData:',this.userData);
                if(localStorage.getItem('selectedStore')){
                  this.curStore=JSON.parse(localStorage.getItem('selectedStore'));
                }else{
                  Vue.api.getStoreDetail({...Vue.tools.sessionInfo(),storeid:data.storeid}).then((resp)=>{
                    if(resp.status=='success'){
                      this.curStore=JSON.parse(resp.message);
                    }
                  });
                }
              }
            });
          },
          toMyOrder:function (type) {
            this.$router.replace({name:'myOrder',query:{pageType:type}});
          },

        },

        created: function () {
        },
        mounted: function () {
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};

          this.id=this.$route.query.id;
          this.pageType=this.$route.query.pageType;
          //
          this.getGoodsDetail();
          this.getDefaultStore();

          //
          if(localStorage.getItem('selectedAddress')){
            this.address=JSON.parse(localStorage.getItem('selectedAddress'))
          }else{
            this.getDefaultAddress();
          }
          //
          if(this.pageType=='food'){
            this.getUserFoodQualificationList();
          }
          //
          if(localStorage.getItem('selectedStore')){
            this.curStore=JSON.parse(localStorage.getItem('selectedStore'));
          }
          this.getTemData();
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
