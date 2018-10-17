<template>
  <div class="wechat-pay">
    <div class="mask">
      <i class="icon share-guide-icon"></i>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .wechat-pay{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top:0rem;
    left: 0rem;
    .mask{
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.1);
    }
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options: {
        type: Object,
        default:function () {
          return {
            orderId:null,
            success:null,//成功的回调
            fail:null,//失败的回调
          }
        }
      }
    },
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {

    },
    methods: {
      getPaymentInfo:function (orderId) {
        Vue.api.getPaymentInfo({...Vue.tools.sessionInfo(),ordezid:orderId}).then((resp)=>{
          if(resp.status=='success'){
            let data=JSON.parse(resp.message);
            this.paymentInfo=data.param;
            this.weixinPay();
          }else{
            this.operationFeedback({type:'warn',text:resp.message});
            this.options.fail&&this.options.fail();
            this.close();
          }
        });
      },
      onBridgeReady:function (data) {
        let that=this;
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
          "appId": this.paymentInfo.appId,
          "timeStamp": this.paymentInfo.timeStamp,
          "nonceStr": this.paymentInfo.nonceStr,
          "package": this.paymentInfo.package,
          "signType": this.paymentInfo.signType,
          "paySign": this.paymentInfo.paySign
        }, function (payResult) {
          var errMsg = payResult.err_msg;
          that.close();
          if (errMsg == "get_brand_wcpay_request:ok") {
            that.options.success&&that.options.success();
          } else if (errMsg == "get_brand_wcpay_request:fail") {
            that.operationFeedback({type:'warn',text:errMsg});
            that.options.fail&&that.options.fail();
          } else if (errMsg == "get_brand_wcpay_request:cancel") {
            that.operationFeedback({type:'warn',text:'支付已取消'});
            that.options.fail&&that.options.fail();
          }
        });
      },
      weixinPay:function () {
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        }else{
          this.onBridgeReady();
        }
      },
      close:function () {
        this.$el.remove();
        this.$destroy();
      },
    },
    created: function () {

    },
    mounted: function () {
      if(this.options.orderId){
        this.getPaymentInfo(this.options.orderId);
      }
    }
  };
</script>
