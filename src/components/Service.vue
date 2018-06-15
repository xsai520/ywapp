<template>
    <div class="service">
      <mt-loadmore>
          <div v-for="(item,index) in list" :key="index">
            <div class="title">{{item.title}}</div>
            <ul class="serviceList">
              <li v-for="(subItem,subIndex) in item.data">
                <span>{{subItem.img}}</span>
                <span>{{subItem.name}}</span>
              </li>
            </ul>
          </div>
      </mt-loadmore>
    </div>
</template>
<script>
  import MtLoadmore from "../../node_modules/mint-ui/packages/loadmore/src/loadmore";
    export default {
      components: {MtLoadmore},
      data(){
          return {
              list:[
                {"title":"ITSM 服务","data":[
                  {img:"11",name:"时间管理"},
                  {img:"11",name:"问题管理"},
                  {img:"22",name:"变更管理"},
                  {img:"22",name:"配置管理"},
                  {img:"555",name:"哈哈管理"}
                ]}
              ]
          }
      }
    }
</script>
<style scoped>
  .service{
    height: 100%;
  }
  .service .title{
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.45rem;
    padding: 0 2% ;
  }
  .service .serviceList li{
    float: left;
    width: 50%;
    height:1.6rem;
    line-height: 1.6rem;
    margin-bottom:0.3rem;
    border-top: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
    border-right:1px solid #dadada;
    background: #ffffff;
    box-sizing: border-box;
    font-size: 0.42rem;
  }
  .service .serviceList li:nth-child(2n){
    border-right:1px solid rgba(0,0,0,0);
  }
</style>
