<!--商品详情-->
<template>
    <div class="goods-detail">
      <div class="banner-panel">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in bannerList" :key="item.id">
            <a style="display:block;width: 100%;height: 100%" v-bind:href="item.url" :style="{background: 'url('+item.imageUrl+') no-repeat center',backgroundSize: 'cover'}"></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="info-panel">
        <div class="block basic-block">
          <p class="title">斑马鱼剪卡管理精选中老年超高性价比体检套餐
            检套餐检套餐</p>
          <div class="info-row">
            <ul class="label-list">
              <li>男女适用</li>
              <li>60~85岁</li>
            </ul>
            <span class="count">已售1234567份</span>
          </div>
          <div class="info-row">
            <span class="price"><i class="icon">￥</i>3000.00</span>
            <div class="cm-number-box">
              <div class="wrap">
                <i class="icon minus-icon cm-solid-btn"></i><span class="num">1</span><i class="icon add-icon cm-solid-btn"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="link-btn arrows-right">
            <span class="label">套餐须知</span>
          </div>
        </div>
        <div class="block detail-block">
          <div class="block-hd">
            <span class="title">产品详情</span>
          </div>
          <div class="block-bd">
            这是详情文案
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
              swiperOption: {
                autoplay:true,
                pagination: {
                  el: '.swiper-pagination'
                }
              },
              bannerList:[{
                id:'0',
                url:'http://www.baidu.com',
                imageUrl:'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=39cf61b64b2309f7e76faa144a356bce/9e3df8dcd100baa1bb9433994a10b912c8fc2e53.jpg'
              },{
                id:'1',
                url:'http://www.baidu.com',
                imageUrl:'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=46aa30c88ccb39dbc5c06054e01609a7/728da9773912b31b2b3f990b8b18367adab4e145.jpg'
              },],
            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {

        },

    };
</script>
