<template>
    <div class="service">
      <mt-loadmore>
          <div class="service-warpper" v-for="(item,index) in list" :key="index">
            <div class="title">{{item.title}}</div>
            <ul class="serviceList">
              <li v-for="(subItem,subIndex) in item.data">
                <a href="www.baidu.com">
                  <span><img :src="subItem.img" width="47%"/></span>
                  <span>{{subItem.name}}</span>
                </a>
              </li>
            </ul>
          </div>
      </mt-loadmore>
    </div>
</template>
<script>
  import MtLoadmore from "../../node_modules/mint-ui/packages/loadmore/src/loadmore";
  import sjgl from '@/assets/img/sjgl.png'
  import wtgl from '@/assets/img/wtgl.png'
  import bggl from '@/assets/img/bggl.png'
  import pzgl from '@/assets/img/pzgl.png'
    export default {
      components: {MtLoadmore},
      data(){
          return {
              list:[
                {"title":"ITSM 服务","data":[
                  {img:sjgl,name:"时间管理"},
                  {img:wtgl,name:"问题管理"},
                  {img:bggl,name:"变更管理"},
                  {img:pzgl,name:"配置管理"},
                ]},
                {"title":"ITSM 服务","data":[
                  {img:sjgl,name:"时间管理"},
                  {img:wtgl,name:"问题管理"},
                  {img:bggl,name:"变更管理"},
                  {img:pzgl,name:"配置管理"},
                ]},
                {"title":"ITSM 服务","data":[
                  {img:sjgl,name:"时间管理"},
                  {img:wtgl,name:"问题管理"},
                  {img:bggl,name:"变更管理"},
                  {img:pzgl,name:"配置管理"},
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
    height: 1.1rem;
    line-height: 1.4rem;
    font-size: 0.45rem;
    padding: 0 2% ;
  }
  .service .serviceList li{
    float: left;
    width: 50%;
    height:1.8rem;
    line-height: 1.8rem;
    margin-top:0.3rem;
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
  .service .serviceList li a{
    display: block;
    width: 100%;
    height: 100%;
    color: #696969;
  }
  .service .serviceList li span{
    display: inline-block;
  }
  .service .serviceList li span:nth-child(1){
    width: 45%;
    text-align: center;
  }
  .service .serviceList li img{
    display: inline-block;
    vertical-align: middle;
  }
  .service-warpper{
    clear: both;
  }
</style>
