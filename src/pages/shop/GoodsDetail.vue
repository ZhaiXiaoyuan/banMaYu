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
            <router-link :to="{ name: 'pay',query: {id:detail.id,pageType:pageType}}" class="cm-btn handle-btn" v-if="pageType!='physical'">立即购买</router-link>
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
              协议文案
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
        font-size: 0.32rem;
        color: #666;
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
              this.$router.push({ name: 'order', query: {id:this.detail.id}});
            }
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
