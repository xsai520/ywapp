<template>
  <div class="home">
    <mt-swipe :auto="4000">
        <mt-swipe-item>
          <ul class="leftWrap">
            <li>
              <span class="enName">Maintenance</span><span> 掌上运维</span>
            </li>
            <li><div>移动掌上运维 方便办公好助手</div></li>
            <li><router-link to='/notice' class="goIn">欢迎进入</router-link></li>
          </ul>
          <div class="rightWrap">
            <img src="@/assets/img/swipe01.png" width="100%">
          </div>
        </mt-swipe-item>
    </mt-swipe>
    <ul class="list">
      <li v-for="(item ,index) in items" :key="index">
        <a class="img"><img :src="item.img" width="100%"></a>
        <a class="text">{{item.text}}</a>
      </li>
    </ul>
    <div class="equipment">
      <div class="bar"></div>
      <div class="clearfix">
        <div class="equipmentManage">
          <div class="text">
            <div>设备管理<p>设备使用管理，设备录入数量更新</p></div>
          </div>
          <div class="img">
            <img src="@/assets/img/sbgl.png" width="68%"/>
          </div>
        </div>
        <ul class="equipmentState">
          <li class="on-shelves">
            <div class="text">
              <div>设备下架<p>设备使用管理与检修</p></div>
            </div>
            <div class="img">
              <img src="@/assets/img/on-shelves.png" width="90%">
            </div>
          </li>
          <li class="off-shelves">
            <div class="text">
              <div>设备上架<p>设备使用管理与检修</p></div>
            </div>
            <div class="img">
              <img src="@/assets/img/off-shelves.png" width="90%">
            </div>
          </li>
        </ul>
      </div>
      <ul class="clearfix">
        <li>
          <div class="imgBox"><img src="@/assets/img/use01.png" width="60%"></div>
          <div class="text">
            <div>设备去链接<p>设备使用管理与检修</p></div>
          </div>
        </li>
        <li>
          <div class="imgBox"><img src="@/assets/img/use02.png" width="60%"></div>
          <div class="text">
            <div>设备物理链接<p>设备使用管理与检修</p></div>
          </div>
        </li>
        <li>
          <div class="imgBox"><img src="@/assets/img/use03.png" width="70%"></div>
          <div class="text">
            <div>设备进出机房<p>设备使用管理与检修</p></div>

          </div>
        </li>
      </ul>
      <div class="bar"></div>
    </div>
  </div>
</template>
<script>
  import MtSwipe from "../../node_modules/mint-ui/packages/swipe/src/swipe";
  import MtSwipeItem from "../../node_modules/mint-ui/packages/swipe/src/swipe-item";
  import list01 from '@/assets/img/list_01.png'
  import list02 from '@/assets/img/list_02.png'
  import list03 from '@/assets/img/list_03.png'
  import list04 from '@/assets/img/list_04.png'
    export default{
      components: {MtSwipeItem, MtSwipe}, name:'Home',
        data(){
            return {
                "items":[
                       {img:list01,text:"我的待办"},
                       {img:list02,text:"告警通知"},
                       {img:list03,text:"日常巡检"},
                       {img:list04,text:"值班管理"}]
            }
        }
    }
</script>
<style>
  .home{
    width: 100%;
    height: 100%;
  }
  .home .mint-swipe{
    height:28.7%;
    background: url("../assets/img/headBg.png") no-repeat;
    background-size: cover;
    overflow: hidden;
    color: #fff;
  }
  .home .mint-swipe-item{
    padding: 11% 5% 5% 7%;
    box-sizing: border-box;
  }
  .home .mint-swipe-items-wrap .leftWrap{
      color: #fff;
      float: left;
      width: 58%;
  }
  .home .mint-swipe-items-wrap .leftWrap li{
    padding-top: 0.4rem;
    font-size: 0.35rem;
  }
  .home .mint-swipe-items-wrap .leftWrap span{
    font-size: 0.42rem;
  }
  .home .mint-swipe-items-wrap .leftWrap .enName{
    font-size: 0.5rem;
    letter-spacing: 1px;
  }
  .home .mint-swipe-items-wrap .leftWrap .goIn{
    display: block;
    width: 2.5rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 5px;
    text-decoration: none;
    color:#fff;
  }
  .home .mint-swipe-items-wrap .rightWrap{
      float: left;
      width: 42%;
  }
  .home .list{
    width: 100%;
    height:16.3%;
    background: #fff;
    clear: both;
  }
  .home .list li{
    float: left;
    width: 25%;
    height:100%;
    padding: 0.8em;
    box-sizing: border-box;
  }
  .home .list .img{
    display: block;
    width: 80%;
    height: 80%;
    margin:0 auto;
  }
  .home .list a{
    display: block;
    text-align: center;
    font-size: 0.35rem;
  }
  .home .equipment{
    height: 55%;
  }
  .home .equipment .bar{
    height:3%;
    background: #f7f7f7;
  }
  .home .equipment>div{
    background: #fff;
    height: 52.5%;
    border-top:1px solid #e6e6e6;
    box-sizing: border-box;
  }
  .home .equipment .equipmentManage{
    float: left;
    width: 45.2%;
    height: 100%;
    border-right:1px solid #e6e6e6;
    box-sizing: border-box;
  }
  .home .equipmentManage> .text{
    padding:12%;
  }
  .home  .equipmentManage> .img img{
    display: block;
    float: right;
    padding-right: 5%;
  }
  .home .equipment .equipmentState{
    float: left;
    height: 100%;
    width: 54.8%;
  }
  .home .equipment .equipmentState li{
    height: 50%;
  }
  .home .equipment .equipmentState .on-shelves{
    border-bottom: 1px solid #e6e6e6;
  }
  .home .equipmentState .on-shelves .text,
  .home .equipmentState .off-shelves .text{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    float: left;
    width: 60%;
    height:100%;
  }
  .home .equipmentState .on-shelves .text>div,
  .home .equipmentState .off-shelves .text>div{
    width:100% ;
    padding-left: 9%;
    flex-direction: row;
  }
  .home .equipmentState .on-shelves .img,
  .home .equipmentState .off-shelves .img{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    float: left;
    width: 40%;
    height:100%;
  }
  .home .equipment>ul{
    background: #fff;
    height: 41.5%;
    border-top:1px solid #e6e6e6;
    border-bottom:1px solid #e6e6e6;
    box-sizing: border-box;
  }
  .home .equipment>ul>li{
    float: left;
    width: 33.3333%;
    height: 100%;
  }
  .home .equipment>ul>li .imgBox{
    height:65%;
  }
  .home .equipment .imgBox img{
    padding: 22% 10% 0 10%;
    margin: 0 auto;
    display: block;
  }
  .home .equipment>ul>li:not(:last-child) {
    border-right: 1px solid #e6e6e6;
    box-sizing: border-box;
  }
  .home .equipment>ul>li:nth-child(3) img{
     padding-top: 3%;
  }

  .home .equipment>ul>li>div{
    text-align: center;
  }
  .home .equipment .text>div:nth-child(1){
    color:#4d96fb;
    font-size: 0.4rem;
  }
  .home .equipment .text>div>p{
    color:#888;
    font-size: 0.33rem;
  }
</style>
