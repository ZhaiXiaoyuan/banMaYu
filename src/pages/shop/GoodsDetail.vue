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
            <router-link :to="{ name: 'order', query: {id:detail.id}}" class="cm-btn handle-btn" v-if="pageType=='physical'">立即预定</router-link>
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
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
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

        },

        created: function () {
        },
        mounted: function () {
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
