<template>
  <div class="monitor">
    <header>
      <div class="clearfix">
        <p>平台告警总数</p>
        <!--<div class="sun">-->
          <!---->
          <!--&lt;!&ndash;<canvas id="warning" ></canvas>&ndash;&gt;-->
        <!--</div>-->
        <div class="sun" ref="sun">
          <svg :width="svgW" :height="svgH">
            <defs>
              <linearGradient :x1="x1" :y1="y1" :x2="x2" :y2="y2" id="gradient1">
                <stop offset="0%" stop-color="rgba(60,233,180,0.3)"></stop>
                <stop offset="100%" stop-color="rgba(60,233,180,0.9)"></stop>
              </linearGradient>
            </defs>
            <defs>
              <filter id="f1">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
            </defs>
            <text :x="cx" :y="cy" fill="#fff" text-anchor="middle" font-size="0.7rem">
              {{allTotal}}
            </text>
            <text :x="cx" :y="cy" fill="#fff" text-anchor="middle" font-size="0.4rem" dy="0.7rem">
              个数
            </text>
            <circle :cx="cx" :cy="cy" :r="cR0" stroke-width="2" stroke="rgba(255,255,255,0)" fill="none"></circle>
            <circle :cx="cx" :cy="cy" :r="cr" stroke-width="5" stroke="rgba(255,255,255,0.5)" fill="none"></circle>
            <circle :cx="cx" :cy="cy" :r="cr" stroke-width="5" stroke="url('#gradient1')" fill="none" :transform="transform"
                    :stroke-dasharray="perimeter"  :stroke-dashoffset="dashoffset" stroke-linecap="round"></circle>
            <circle :cx="cx" :cy="y2" :r="6"  stroke="#38e9b3" fill="#38e9b3" filter="url(#f1)"></circle>
              <line v-for="(line,index) in lineArr" :key="index" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
                    :stroke="line.color" stroke-linecap="round" stroke-width="3" />
          </svg>
        </div>

      </div>
    </header>
    <main>
      <div class="total">
        <div class="title"><i class="icon iconfont">&#xe72a;</i>告警总和</div>
        <ul>
          <li v-for="(item,index) in total" :key="index">
            <div class="text">{{item.percent}}</div>
            <svg width="3.3rem" height="3.3rem">
              <circle cx="1.65rem" cy="1.65rem" r="1rem" stroke-width="8" stroke="#d6d2cf" fill="none" ></circle>
              <circle class="svgTotal" cx="1.65rem" cy="1.65rem" r="1rem" stroke-width="8" fill="none" stroke="#ff0000"
                      :stroke-dasharray=item.dasharray :stroke-dashoffset=item.dashoffset stroke-linecap="round"></circle>
            </svg>
            <!--<canvas class="total_canvas" :width="totalCanvasW" :height="totalCanvasH"></canvas>-->
            <div>{{item.AlarmLevelName}}：{{item.count}}</div>
          </li>
        </ul>
      </div>
      <div class="gap"></div>
      <div class="type">
        <div class="title"><i class="icon iconfont">&#xe62f;</i>告警分类</div>
        <ul>
          <li v-for="(item,index) in type" :key="index">
            <div class="text">{{item.percent}}</div>
            <svg width="3.3rem" height="3.3rem">
              <circle cx="1.65rem" cy="1.65rem" r="1rem" stroke-width="8" stroke="#d6d2cf" fill="none" ></circle>
              <circle class="svgTotal" cx="1.65rem" cy="1.65rem" r="1rem" stroke-width="8" fill="none" stroke="#ff0000"
                      :stroke-dasharray=item.dasharray :stroke-dashoffset=item.dashoffset stroke-linecap="round"></circle>
            </svg>
            <!--<canvas class="type_canvas" :width="typeCanvasW" :height="typeCanvasW"></canvas>-->
            <div>{{item.AlarmTypeName}}：{{item.count}}</div>
          </li>
        </ul>
      </div>

    </main>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  export default{
    data(){
      return {
        svgW:0,
        svgH:0,
        cx:0,
        cy:0,
        cR0:0,
        cr:0,
        total:[],  //紧急 严重 一般,
        type:[],
        x1:0,
        y1:0,
        x2:0,
        y2:0,
        perimeter:0,
        dashoffset:0,
        lineArr:[],
        transform:"",
        allTotal:0
      }
    },
    mounted(){
      this.svgCircle();
     // this.svgPath();
      //this.coordinate =
//      this.getViewPort();
//      this.getCircle(); //requestAnimationFrame()产生动画效果的函数，待做
      this.getTotal();
      this.getType();
    },
    methods:{
      svgCircle(){
        //设置36个颜色
        let colors = [
          "#6fc874","#58e93c","#4de945","#47e956","#41e96d","#3ee985",
          "#3ce99f","#3be9b7","#3ae9cc","#38e9dc","#e4faee","#e0f7e3",
          "#dcf4d3","#d9efc4","#d6edb5","#d4e9a5","#d2e594","#d1e183",
          "#cfde74","#cfda64","#d7d057","#e5d139","#e7ce2b","#e8cc20",
          "#e8cc1a","#e8cc1c","#d5c43e","#e9d922","#e7e132","#e1e63d",
          "#d8e941","#cae940","#b8e93f","#a3e93e","#8fe93e","#7ae93d","#78bf7e"];
        //获取sun的宽度和高度
        let width = this.$refs.sun.offsetWidth;
        let height = this.$refs.sun.offsetHeight;
        if(width>=height){
          this.svgW = height;
          this.svgH = height;
        }else{
          this.svgW = width;
          this.svgH = width;
        }
        this.cx = this.svgW/2;
        this.cy = this.svgW/2;
        this.cr = this.svgW*0.28;
        this.cR0 = this.svgW*0.34;
        //计算圆的弧长 直径乘以Math.PI
        this.perimeter = this.cr*2*Math.PI;
        this.dashoffset = this.cr*2*Math.PI*2/5;
        this.x1 = this.cr - Math.abs(Math.cos(Math.PI/3)*this.cr);
        this.y1 = this.cr + Math.abs(Math.sin(Math.PI/3)*this.cr);
        this.x2 = this.cx;
        this.y2 = this.cy - this.cr;
        //总共需要36条直线，每隔10度，画一条直线
        for(let j=0;j<36;j++){
          let obj={};
          obj.x1=this.cx + Math.cos(j*2*Math.PI/36)*this.cR0;
          obj.y1=this.cy + Math.sin(j*2*Math.PI/36)*this.cR0;
          obj.x2=this.cx + Math.cos(j*2*Math.PI/36)*(this.cR0+5);
          obj.y2=this.cy + Math.sin(j*2*Math.PI/36)*(this.cR0+5);
          obj.color =colors[j];
          this.lineArr.push(obj);
          //旋转
          this.transform = `rotate(-90,${this.cx},${this.cy})`;
        }
        this.$http.post(`/AlarmActive/count`).then((res)=>{
          let data = res.data.data;
          this.allTotal = data;
        })
      },
      getTotal(){
//        let c = document.getElementsByClassName("total_canvas");
//        下面的灰色圆环
        let _this = this;
        this.$http.post("/AlarmActive/levelcount").then((res)=>{
          let data = res.data.data;
          let elsePer=0;
          let elseCount=0;
          let elseData={};
          this.$nextTick(()=>{
            for(let i=0;i<data.length;i++){
              let obj={};
              switch (data[i].AlarmLevelID){
                case 1: //紧急
                  obj.percent = data[i].percent;
                  obj.dasharray = (Math.PI*2).toFixed(2)+"rem";
                  obj.dashoffset=(Math.PI*2).toFixed(2)-((data[i].percent.substr(0,data[i].percent.length-1)*0.01)*Math.PI*2).toFixed(2)+"rem";
                  obj.AlarmLevelName = data[i].AlarmLevelName;
                  obj.count = data[i].count;
                  _this.total.push(obj);
                  break;
                case 2: //严重
                  obj.percent = data[i].percent;
                  obj.dasharray = (Math.PI*2).toFixed(2)+"rem";
                  obj.dashoffset=(Math.PI*2).toFixed(2)-((data[i].percent.substr(0,data[i].percent.length-1)*0.01)*Math.PI*2).toFixed(2)+"rem";
                  obj.AlarmLevelName = data[i].AlarmLevelName;
                  obj.count = data[i].count;
                  _this.total.push(obj);
                  break;
                default:
                  elsePer += Number(data[i].percent.substr(0,data[i].percent.length-1)*0.01);
                  elseCount+= data[i].count;
                  break;
              }
            }
            let newElsePer = (Math.PI*2).toFixed(2)-(elsePer*Math.PI*2).toFixed(2) +"rem";
            elseData.percent = elsePer*100+"%";
            elseData.dasharray = (Math.PI*2).toFixed(2)+"rem";
            elseData.dashoffset = newElsePer;
            elseData.count = elseCount;
            elseData.AlarmLevelName = "其他";
//          elseData = {"percent":elsePer*100+"%","dasharray":(Math.PI*2).toFixed(2)+"rem",
//            "dashoffset":newElsePer,"count":elseCount,"AlarmLevelName":"其他"};
            _this.total.push(elseData);
          });

        })
      },
      getType(){
//        let c = document.getElementsByClassName("type_canvas");
//        let $greyColor = "#d6d2cf";
        let _this = this;
        this.$http.post("/AlarmActive/typecount").then((res)=>{
          let data = res.data.data;
         // this.type = data;
          this.$nextTick(()=>{
            for(let i=0;i<data.length;i++){
              let obj={};
              obj.percent = data[i].percent;
              obj.dasharray = (Math.PI*2).toFixed(2)+"rem";
              obj.dashoffset=(Math.PI*2-(data[i].percent.substr(0,data[i].percent.length-1)*0.01)*Math.PI*2).toFixed(2)+"rem";
              obj.AlarmTypeName = data[i].AlarmTypeName;
              obj.count = data[i].count;
              _this.type.push(obj);
            }
          });

        })
      }
    }
  }
</script>
<style>
  #aaa{
    width: 50px;
    height:50px;
  }
  .monitor{
    width: 100%;
    height: 100%;
  }
  .monitor>header{
    height:28.7%;
    background: url("../assets/img/headBg.png") no-repeat;
    background-size: cover;
    overflow: hidden;

  }
  .monitor>header>div{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    width:100%;
    height: 100%;
  }
  .monitor>header>div>p{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    width:40%;
    height: 100%;
    color: #fff;
    font-size:0.45rem;
  }
  .monitor>header .sun{
    width:60%;
    height: 100%;
    /*zoom: 0.333333;*/
  }
  .monitor>main{
    height:71.3%;
    overflow: scroll;
    background: #fff;
  }
  .monitor>main .total{
    height:5.1rem;
    background: #fff;
  }
  .monitor>main .title{
    width:100%;
    height: 1.1rem;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    font-size: 0.45rem;
    border-bottom: 0.026rem solid #dadada;
  }
  .monitor>main .title i{
    font-size: 0.55rem;
    color: #000000;
    font-weight:600;
    padding-left: 0.2rem;
    padding-right: 0.15rem;
  }
  .monitor>main .total ul{
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    height:4rem;
    border-bottom:0.026rem solid #dadada;
  }
  .monitor>main ul li{
    position: relative;
    flex-grow:1;
    border-right:0.026rem solid #dadada;
    height: 100%;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
  .monitor>main ul li>canvas{
    display:block;
    margin: 0 auto;
  }
  .monitor>main  ul li>div{
    margin: 0 auto;
    text-align: center;
    height: 0.7rem;
    font-size: 0.35rem;
  }
  .monitor>main .total ul li:nth-child(1)>div{
    color: #da2424;
  }
  .monitor>main .total ul li:nth-child(2)>div{
    color: #ffaf02;
  }
  .monitor>main .total ul li:nth-child(3)>div{
    color: #5ba513;
  }
  .monitor>main .total ul li:nth-child(3){
    border-right:rgba(0,0,0,0);
  }
  .monitor>main .total{
    /*margin-bottom: 3%;*/
  }
  .monitor>main .gap{
    height:3%;
    background: #f7f7f7;
  }
  .monitor>main .type{
    /*min-height: calc(100% - 5.1rem);*/
    background: #fff;
    border-top: 0.026rem solid #dadada;
  }
  .monitor>main .type ul li{
    position: relative;
    height: 4rem;
    float: left;
    width: 33.3333%;
    background: #ffffff;
    border-right:0.026rem solid #dadada;
    border-bottom:0.026rem solid #dadada;
    box-sizing: border-box;
  }
  /*如果这个li超过第三个则不用加border-top*/
  /*.monitor>main .type ul li:nth-child(n+4){*/
  /*border-top: 0px solid #dadada;*/
  /*}*/
  .monitor>main .type ul li:nth-child(3n){
    border-right:0.026rem solid rgba(0,0,0,0);
  }
  .total .svgTotal{
    transition: stroke-dashoffset 1s linear;
  }
  .total .text,
  .type .text{
    width: 3.3rem;
    text-align: center;
    position: absolute;
    font-size: 0.5rem;
    top: 50%;
    margin-top: -0.6rem;
  }
</style>

