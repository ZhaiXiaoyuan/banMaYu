<template>
  <div class="region-picker">
    <mt-popup
      v-model="options.show"
      position="bottom" style="width: 100%;">
      <mt-picker :slots="slots" value-key="label" :showToolbar="true" @change="change">
        <div class="picker-hd"><span class="cm-btn btn cancel-btn" @click="options.show=false">取消</span><span class="cm-btn btn ok-btn" @click="sure()">确定</span></div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .region-picker{
    .picker-hd{
      .btn{
        display: inline-block;
        padding: 0.2rem 0.2rem;
        font-size: 0.32rem;
      }
      .ok-btn{
        float: right;
        color: #0091e0;
      }
    }
    .picker-slot{
      width: auto;
    }
    .picker-items{
      width: 100%;
    }
  }
</style>
<script>
  import Vue from 'vue'
  import Districts from './districts'

  export default {
    components: {

    },
    props:{
      options: {
        type: Object,
        default:function () {
          return {
           show:true,
            ok:null,
            default:null,//  {provinceCode:null,cityCode:null,areaCode:null}
          }
        }
      }
    },
    data: function () {
      return {
        picker:null,
        selectedGender:null,
        pickerFlag:false,
        slots: null,
        regionConfigData:[],
        provinceList:[],
        curProvince:{},
        curCity:{},
        curArea:{},
        changeCounter:0,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      change(picker, values) {
        if(!values[0]){
          this.$nextTick(()=>{
            this.picker=picker;
            if(this.options.default){
              // 赋默认值
              this.setDefault();
            }else{
              this.curProvince=this.provinceList[0];
              this.curCity=this.provinceList[0].childs[0];
              this.curArea=this.provinceList[0].childs[0].childs[0];
            }
          });
        }else{
          this.curProvince=values[0];
          this.curCity=values[1];
          this.curArea=values[2];
          picker.setSlotValues(1, values[0].childs);
          let town = [];
          if(values[1]){
            town = values[1].childs;
          }
          picker.setSlotValues(2,town);
        }

      },
      setDefault:function (data) {
        if(data){
          this.options.default=data;
        }
        this.curProvince=this.provinceList.find((item,i)=>{
          return item.value==this.options.default.provinceCode;
        });
        this.curCity=this.curProvince.childs.find((item,i)=>{
          return item.value==this.options.default.cityCode;
        });
        this.curArea=this.curCity.childs.find((item,i)=>{
          return item.value==this.options.default.areaCode;
        });
        this.picker.setValues([this.curProvince,this.curCity,this.curArea]);
      },
      close:function () {
        this.$el.remove();
        this.$destroy();
      },
      sure:function () {
        this.options.ok&&this.options.ok({province:this.curProvince,city:this.curCity,area:this.curArea});
        this.options.show=false;
      },
    },
    created: function () {

    },
    mounted: function () {
      let provinceObj=Districts[100000];
      this.provinceList=[];
      for(let key in provinceObj){
        let p={label:provinceObj[key],value:key,type:'p',childs:[]};
        //
        let cityObj=Districts[key];
        for(let key in cityObj){
          let c={label:cityObj[key],value:key,type:'c',childs:[]};
          //
          let areaOjb=Districts[key];
          for(let key in areaOjb){
            let a={label:areaOjb[key],value:key,type:'a'};
            c.childs.push(a);
          }
          //
          p.childs.push(c);
        }
        //
        this.provinceList.push(p);
      }
      this.slots=[
        {
          flex: 1,
          values: this.provinceList,
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: this.provinceList[0].childs,
          className: 'slot2',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: this.provinceList[0].childs[0].childs,
          className: 'slot3',
          textAlign: 'center'
        }
      ]

    }
  };
</script>
