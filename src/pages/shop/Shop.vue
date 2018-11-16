<!--商城-->
<template>
    <div class="shop">
      <div class="page-content">
        <div class="search-box">
          <div class="input-item">
            <i class="icon search-icon" @click="search()"></i>
            <input type="text" v-model="keyword" @keypress="enterSearch" placeholder="搜索全部商品">
          </div>
        </div>
        <div class="banner-panel">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in bannerList" :key="item.id">
              <a style="display:block;width: 100%;height: 100%" v-bind:href="item.url" :style="{background: 'url('+item.imageUrl+') no-repeat center',backgroundSize: 'cover'}"></a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="product-panel">
          <div class="panel-hd">
            <span class="title title-1">体控检测</span>
            <router-link :to="{ name: 'search', params: {},query:{type:'Physical'}}" class="link arrows-right">查看更多</router-link>
          </div>
          <div class="panel-bd">
            <div class="item-list">
              <router-link :to="{ name: 'goodsDetail', params: {type:'physical',id: item.id }}" class="item" v-for="item in physicals" :key="item.id">
                <img :src="item.pic1">
                <p class="title">{{item.name}}</p>
                <p class="price"><span class="icon">￥</span><span>{{item.price.toFixed(2)}}</span></p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="product-panel">
          <div class="panel-hd">
            <span class="title title-2">栋食系列</span>
            <router-link  :to="{ name: 'search', params: {},query:{type:'Food'}}" class="link arrows-right">查看更多</router-link>
          </div>
          <div class="panel-bd">
            <div class="item-list">
              <router-link  :to="{ name: 'goodsDetail', params: {type:'food',id: item.id }}"  class="item" v-for="item in foods" :key="item.id">
                <img :src="item.pic1">
                <p class="title">{{item.name}}</p>
                <p class="price"><span class="icon">￥</span><span>{{item.price.toFixed(2)}}</span></p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="product-panel">
          <div class="panel-hd">
            <span class="title title-3">健康食品</span>
            <router-link :to="{ name: 'search', params: {},query:{type:'Health'}}" class="link arrows-right">查看更多</router-link>
          </div>
          <div class="panel-bd">
            <div class="item-list">
              <router-link :to="{ name: 'goodsDetail', params: {type:'health',id: item.id }}" class="item" v-for="item in healths" :key="item.id">
                <img :src="item.pic1">
                <p class="title">{{item.name}}</p>
                <p class="price"><span class="icon">￥</span><span>{{item.price.toFixed(2)}}</span></p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <nav-bar></nav-bar>
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
              keyword:null,
              swiperOption: {
                autoplay:true,
                pagination: {
                  el: '.swiper-pagination'
                }
              },
              bannerList:[
               /* {
                  id:'233',
                  url:'http://www.baidu.com',
                  imageUrl:'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=39cf61b64b2309f7e76faa144a356bce/9e3df8dcd100baa1bb9433994a10b912c8fc2e53.jpg'
                }*/
              ],
              physicals:[],
              foods:[],
              healths:[],
            }
        },
        computed: {},
        watch: {},
        methods: {
          getGoodsList:function () {
            Vue.api.getShopHomeData({timestamp:Vue.tools.genTimestamp()}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                console.log('data:',data);
                //初始化轮播数据
                let advData=data.advers[0];
                for(let i=1;i<7;i++){
                  if(advData['codedname'+i]){
                    this.bannerList.push({
                      id:i,
                      url:advData['pointto'+i],
                      imageUrl:advData['codedname'+i]
                    })
                  }
                }
                this.physicals=data.physicals;
                this.foods=data.foods;
                this.healths=data.healths;

              }
            })
          },
          search:function () {
            this.$router.push({name:'search',params:{},query:{keyword:this.keyword}})
          },
          enterSearch:function (event) {
            if (event.keyCode == 13) { //如果按的是enter键 13是enter
              event.preventDefault(); //禁止默认事件（默认是换行）
              this.search();
            }
          }
        },

        created: function () {
        },
        mounted: function () {
          //
          this.getGoodsList();
          //
          this.configCmShare();
        },

    };
</script>
