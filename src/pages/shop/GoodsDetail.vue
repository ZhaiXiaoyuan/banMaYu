<!--商品详情-->
<template>
    <div class="goods-detail">
      <div class="banner-panel">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in bannerList" :key="item.id">
            <a style="display:block;width: 100%;height: 100%" v-bind:href="item.url" :style="{background: 'url('+item.imageUrl+') no-repeat center',backgroundSize: 'cover'}"></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" v-if="bannerList.length>1"></div>
        </swiper>
      </div>
      <div class="info-panel">
        <div class="block basic-block">
          <p class="title">{{detail.name}}</p>
          <div class="info-row">
            <ul class="label-list" v-if="detail.suits">
              <li>{{detail.suits}}</li>
            </ul>
            <span class="count">已售{{detail.sellamt}}份</span>
          </div>
          <div class="info-row">
            <span class="price" v-if="detail.price"><i class="icon">￥</i>{{detail.price.toFixed(2)}}</span>
           <!-- <div class="cm-number-box" v-if="pageType!='physical'">
              <div class="wrap">
                <i class="icon minus-icon cm-solid-btn" :class="{'cm-disabled':curCount<=1}"  @click="minus()"></i><span class="num">{{curCount}}</span><i class="icon add-icon cm-solid-btn" :class="{'cm-disabled':curCount>=5}" @click="add()"></i>
              </div>
            </div>-->
            <span @click="toOrder()" class="cm-btn handle-btn" v-if="pageType=='physical'">立即预定</span>
            <span @click="toBuy()" class="cm-btn handle-btn" v-if="pageType!='physical'">立即购买</span>
          </div>
          <div class="info-row tips-row" v-if="detail.tips">温馨提示：{{detail.tips}}</div>
        </div>
        <div class="block" v-if="detail.notice">
          <div class="link-btn arrows-right" @click="()=>{ this.alert({type:'tips',title:'套餐须知',html:detail.notice});}">
            <span class="label">套餐须知</span>
          </div>
        </div>
        <div class="block detail-block">
          <div class="block-hd">
            <span class="title">产品详情</span>
          </div>
          <div class="block-bd" v-html="detail.content">

          </div>
        </div>
      </div>

      <mt-popup
        v-model="protocolModalFlag"
        position="right" class="protocol-modal">
        <div class="modal-content">
          <div class="modal-body">
            <div class="text-content">
              <p class="page-title">体控知情同意书（测试版）</p>
              <p class="para">您的信任对我们非常重要，我们深知个人信息对您的重要性，我们将按法律法规要求，采取安全保护措施，保护您的个人信息安全。鉴此，斑马鱼公众号（简称“我方”）制定本《体控知情同意书》（下称“本同意书”）并提醒您：</p>
              <p class="para">在使用我们各项产品或服务前，请您务必仔细阅读并透彻理解本知情同意书，在确认充分理解并同意后使用相关产品或服务。一旦您开始使用我方各项产品或服务，即表示您已充分理解并同意本知情同意书。</p>
              <p class="title">1. 信息</p>
              <p>（1）在您注册我方账号时，阁下根据我方要求提供的个人注册信息；</p>
              <p>（2）我方通过检测获知阁下的个人体质数据信息。</p>
              <p class="title">2. 信息使用范围及禁止</p>
              <p>（1）阁下的体质数据仅供我们为您分析体质状况及健康科学研究之用。</p>
              <p>（2）我方不会向任何无关第三方提供、出售或交易您的个人信息，除非事先得到您的许可。</p>
              <p>（3）我方亦不允许任何第三方以任何手段收集、传播您的个人信息。任何我方用户如从事上述活动，一经发现，我方有权立即终止与该用户的服务协议。</p>
              <p>（4）阁下的健康数据或用于科学研究时，该研究不记名，仅限用于科学研究的基础数据。</p>
              <p class="title">3. 信息安全</p>
              <p>（1）我方帐号的注册与登录使用的是微信OpenID安全校验与阿里云短信验证码校验的双重保护，确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。</p>
              <p>（2）在使用我方服务时，请阁下妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，请您立即联络我们客服，以便我们采取相应措施。</p>
              <p class="title">4.  免责申明</p>
              <p>（1）使用者因为违反本声明的规定而触犯中华人民共和国法律的，一切后果自己负责，我方不承担任何责任。</p>
              <p>（2）对您使用与我方相关的任何内容、服务或其它链接至我方的站点、内容均不作直接、间接、法定、约定的保证。</p>
              <p>（3）无论在任何原因下（包括但不限于疏忽原因），对您或任何人通过使用我方上的信息或由我方链接的信息，或其他与我方链接的网站信息所导致的损失或损害（包括直接、间接、特别或后果性的损失或损害，电脑系统之损坏或数据丢失等后果），责任均由使用者自行承担（包括但不限于疏忽责任）。</p>
              <p>（4）本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。</p>
              <p class="title">5.  解释权</p>
              <p>本知情同意书的最终解释权归斑马鱼公众号所有。</p>
              <p class="strong" style="text-align: right;padding-right: 1rem;margin-top: 0.4rem;"> 请确认无误后签字：     </p>
              <p class="strong" style="text-align: right;padding-right: 1rem;">日期：</p>
            </div>
            <div class="check-wrap">
              <div class="cm-check" :class="{'checked':checkedProtocol}" @click="checkedProtocol=!checkedProtocol">
                <div class="wrapper">
                  <span class="status"><i class="icon"></i></span>
                  <span class="text">我已阅读并同意体控检查声明保证页全部条款</span>
                </div>
              </div>
            </div>
            <div class="btn-wrap">
              <span class="cm-btn btn cancel-btn" @click="protocolModalFlag=false">返回</span>
              <span class="cm-btn btn ok-btn" @click="agree()">同意签署</span>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .protocol-modal{
    width: 100%;
    height: 100%;
    .modal-content{
      width: 100%;
      height: 100%;
      background: #fff;
      .modal-body{
        overflow: auto;
        width: 100%;
        height: 100%;
      }
      .text-content{
        min-height: 70%;
        padding: 0.4rem;
        font-size: 0.28rem;
        color: #666;
        line-height: 0.48rem;
        .page-title{
          font-size: 0.4rem;
          color: #333;
          text-align: center;
          padding-bottom: 0.2rem;
          font-weight: bold;
        }
        .para{
          text-indent: 2em;
        }
        .title{
          padding: 0.2rem 0rem 0rem 0rem;
          color: #333;
          font-size: 0.32rem;
          font-weight: bold;
        }
        .strong{
          color: #333;
          font-weight: bold;
        }
      }
      .check-wrap{
        margin-top: 0.4rem;
        padding: 0rem 0.4rem;
      }
      .btn-wrap{
        margin-top: 0.4rem;
        width: 100%;
        padding: 0.2rem 0.3rem;
        background: none;
        text-align: center;
        /*border-top: 1px solid #eee;*/
        .btn{
          display: inline-block;
          width: 3rem;
          height: 1rem;
          text-align: center;
          line-height: 1rem;
          font-size: 0.38rem;
          color: #fff;
          border-radius: 0.1rem;
          background: linear-gradient(to right, #0091e0 , #017ecc);
          &+.btn{
            margin-left: 0.4rem;
          }
        }
        .cancel-btn{
          color: #999;
          border: 1px solid #ccc;
          background: none;
        }
      }
    }
  }
</style>

<script>
    import Vue from 'vue'
    import  { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        components: {
          swiper,
          swiperSlide
        },
        data: function () {
            return {
              userInfo:null,
              pageType:null,
              swiperOption: {
                autoplay:true,
                pagination: {
                  el: '.swiper-pagination'
                }
              },
              bannerList:[
              /*  {
                id:'0',
                url:'http://www.baidu.com',
                imageUrl:'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=39cf61b64b2309f7e76faa144a356bce/9e3df8dcd100baa1bb9433994a10b912c8fc2e53.jpg'
              }*/
              ],
              detail:{},
              curCount:1,
              protocolModalFlag:false,
              checkedProtocol:false,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getGoodsDetail:function () {
            if(this.pageType=='physical'){
              Vue.api.getPhysicalDetail({...Vue.tools.sessionInfo(),id:this.$route.params.id}).then((resp)=>{
                if(resp.status=='success'){
                  let data=JSON.parse(resp.message);
                  this.detail=data;
                  this.bannerList.push({
                    id:0,
                    url:null,
                    imageUrl:data.pic1
                  })
                  console.log('data:',data);
                }
              });
            }else if(this.pageType='food'){
              Vue.api.getFoodDetail({...Vue.tools.sessionInfo(),id:this.$route.params.id}).then((resp)=>{
                if(resp.status=='success'){
                  let data=JSON.parse(resp.message);
                  this.detail=data;
                  this.bannerList.push({
                    id:0,
                    url:null,
                    imageUrl:data.pic1
                  })
                  console.log('data:',data);
                }
              });
            }else if(this.pageType=='health'){
              Vue.api.getHealthDetail({...Vue.tools.sessionInfo(),id:this.$route.params.id}).then((resp)=>{
                if(resp.status=='success'){
                  let data=JSON.parse(resp.message);
                  this.detail=data;
                  this.bannerList.push({
                    id:0,
                    url:null,
                    imageUrl:data.pic1
                  })
                  console.log('data:',data);
                }
              });
            }
          },
          add:function () {
            if(this.curCount<5){
              this.curCount++;
            }
          },
          minus:function () {
            if(this.curCount>1){
              this.curCount--;
            }
          },
          toOrder:function () {
            if(this.userInfo.isphysical =='N'){
              this.protocolModalFlag=true;
            }else{
              window.location.href=window.location.href.split('#')[0]+'#/order?id='+this.detail.id;
            }
          },
          toBuy:function () {
            window.location.href=window.location.href.split('#')[0]+'#/pay?id='+this.detail.id+'&pageType='+this.pageType;
          /*  this.$router.push({ name: 'pay',query: {id:this.detail.id,pageType:this.pageType}});*/
          },
          agree:function () {
            if(!this.checkedProtocol){
              this.operationFeedback({type:'warn',text:'请先阅读并同意体控检查声明保证页全部条款'});
              return;
            }
            Vue.api.agreePhysicalProtocol({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.userInfo.isphysical='Y';
                Vue.cookie.set('userInfo',JSON.stringify(this.userInfo),{ expires: '12h' });
                this.toOrder();
              }else{
                this.operationFeedback({type:'warn',text:resp.message});
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          //授权登录后如果跳转到当前页面时要再次刷新，以刷新地址栏，让支付正常进行临时测试
         /* if(sessionStorage.getItem('loginTarget')==this.$route.name){
            sessionStorage.removeItem('loginTarget');
            alert(sessionStorage.getItem('loginTarget'));
      /!*      window.location.reload();
            return;*!/
          }*/
          //
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};

          this.pageType=this.$route.params.type;

          //
          this.getGoodsDetail();
          if(this.pageType=='physical'){

          }else if(this.pageType='food'){

          }else if(this.pageType=='health'){

          }

          //

        },

    };
</script>
