<!--商品搜索-->
<template>
    <div class="shop">
      <div class="page-content">
        <div class="search-box">
          <div class="input-item">
            <i class="icon search-icon"></i>
            <input type="text" placeholder="搜索全部商品">
          </div>
        </div>
        <div class="product-panel">
          <div class="panel-hd">
            <span class="title title-1">体验套餐</span>
            <span class="desc">150项指标全方位检查</span>
            <span class="link arrows-right">查看更多</span>
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
            <span class="desc">斑马鱼专有栋食产品</span>
            <span class="link arrows-right">查看更多</span>
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
            <span class="desc">优选国外进口健康食品</span>
            <span class="link arrows-right">查看更多</span>
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
              physicals:[],
              foods:[],
              healths:[],
            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {
          //
        },

    };
</script>
