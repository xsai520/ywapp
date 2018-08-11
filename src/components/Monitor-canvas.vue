<template>
    <div class="monitor">
      <header>
        <div class="clearfix">
          <p>平台告警总数</p>
          <canvas id="warning" :width="canvasW" :height="canvasH"></canvas>
        </div>
      </header>
      <main>
        <div class="total">
          <div class="title"><i class="icon iconfont">&#xe72a;</i>告警总和</div>
          <ul>
            <li v-for="(item,index) in total" :key="index">
              <canvas class="total_canvas" :width="totalCanvasW" :height="totalCanvasH"></canvas>
              <div>{{item.AlarmLevelName}}：{{item.count}}</div>
            </li>
          </ul>
        </div>
        <div class="type">
          <div class="title"><i class="icon iconfont">&#xe62f;</i>告警分类</div>
          <ul>
            <li v-for="(item,index) in type" :key="index">
              <canvas class="type_canvas" :width="typeCanvasW" :height="typeCanvasW"></canvas>
              <div>{{item.AlarmTypeName}}：{{item.count}}</div>
            </li>
          </ul>
        </div>

      </main>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import polyfill from  'polyfill'
  export default{
      data(){
          let obj = this.getPhoneWidth();
          return {
            canvasW:0,
            canvasH:0,
            totalCanvasW:obj.totalCanvasW,
            totalCanvasH:obj.totalCanvasH,
            typeCanvasW:obj.typeCanvasW,
            typeCanvasH:obj.typeCanvasH,
            total:[],  //紧急 严重 一般,
            type:[],
            tScale:window.devicePixelRatio
          }
      },
    mounted(){
      this.getCircle(); //requestAnimationFrame()产生动画效果的函数，待做
//      this.getTotal();
//      this.getType();
    },
    methods:{
       getPixelRatio(context) {
        let backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
      },
        getCircle(){
          let _this = this;
          this.$http.post(`/AlarmActive/count`).then(function (res) {
            debugger
            let data = res.data.data ;
            let c=document.getElementById("warning");
            let ctx = c.getContext("2d");
            let ratio = _this.getPixelRatio(ctx);
            let phoneWidth = document.body.clientWidth;
            _this.canvasW = Math.ceil(0.37*phoneWidth*ratio);
            _this.canvasH = Math.ceil(0.37*phoneWidth*ratio);
            let w = c.width*ratio;
            let r = w/2*ratio;
            let lineWidth = 4*ratio;
            //周围光环的长度大概是lineWidth的2倍
            let lightLength = 1.8*lineWidth;
            //发散光环与圆环大概的距离是1.5的lineWidth 需要设置内gap 和外gap
            let outGap=lineWidth;
            let inGap =1.5*lineWidth;
            let gap = outGap+inGap;
            let cR = (w-2*lineWidth)/2 - lightLength - gap;//圆环的半径要减去发散环和gap
            ctx.lineWidth = lineWidth;
            //--------------绘制透明层的圆环-------------------
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.arc(r,r,cR,0,2*Math.PI);
            //--------------绘制透明层的圆环-------------------
            //----------------绘制圆环内的文本 start
            ctx.font="25px Arial";
            ctx.textAlign="center";
            ctx.fillStyle = "#fff";
            ctx.fillText(data,r,r);
            ctx.textAlign="center";
            ctx.font="16px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("个数",r,r+2*r/5);
            //----------------绘制圆环内的文本 end
            //绘制圆环内的文本 end
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            ctx.save();
            //绘制百分比的圆环 ctx.createLinearGradient(x0.y0,x1,y1)x0,y0渐变开始点的坐标，x1,y1渐变结束点的坐标
            let x0 = Math.abs(Math.sin(2*Math.PI/3)*r);
            let y0 = Math.abs(Math.cos(2*Math.PI/3)*r)+r; //x0 y0作为起始点写死
            let x1 = Math.abs(Math.sin(3*Math.PI/2)*r);
            let y1 = Math.abs(Math.cos(3*Math.PI/2)*r);
            let g = ctx.createLinearGradient(x0,y0,x1,y1);
            g.addColorStop(0, 'rgba(60,233,180,0.3)'); //添加颜色点
            g.addColorStop("0.05", 'rgba(60,233,180,0.5)'); //添加颜色点
            g.addColorStop("0.2", 'rgba(60,233,180,0.6)'); //添加颜色点
            g.addColorStop("0.4", 'rgba(60,233,180,0.7)'); //添加颜色点
            g.addColorStop("0.6", 'rgba(60,233,180,0.8)'); //添加颜色点
            g.addColorStop("0.8", 'rgba(60,233,180,0.9)'); //添加颜色点
            g.addColorStop(1, 'rgba(60,233,180,1)'); //添加颜色点 60,233,180
            ctx.strokeStyle = g;     //使用渐变对象作为圆环的颜色
            ctx.beginPath();
            ctx.arc(r,r,cR,2*Math.PI/3,3*Math.PI/2,true);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            ctx.save();
            //绘制发光圆球
            ctx.beginPath();
            ctx.fillStyle = "#3ce9b5";
            ctx.shadowColor="#fff";
            ctx.shadowBlur = 20;
            ctx.arc(x1,y1+lightLength+gap+4,8,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            ctx.save();
            //绘制圆环外边的发散线
            ctx.beginPath();
            //每隔20度画一条线，则总共要画18条线
            for(let i=0;i<18;i++){
              let sinRad = Math.sin(Math.PI/9*i);
              let cosRad = Math.cos(Math.PI/9*i);
              let $x0 = Math.floor(r + (cR + lineWidth + inGap) * cosRad);
              let $y0 = Math.floor(r - (cR + lineWidth + inGap) * sinRad);
              let $x1 = Math.floor(r + (cR + lineWidth + inGap + lightLength) * cosRad);
              let $y1 = Math.floor(r - (cR + lineWidth + inGap + lightLength) * sinRad);
              ctx.strokeStyle="rgba(60,233,180,1)";
              ctx.lineCap="round";
              ctx.moveTo($x0,$y0);
              ctx.lineTo($x1,$y1);
              ctx.stroke();
              ctx.closePath();
              ctx.restore();
              ctx.save();
            }
          })
//            .catch(function(error){
//            MessageBox('提示', '获取失败');
//          })
//          this.$http.post("/AlarmActive/count").then((res)=>{
//
//          }).catch((error)=>{
//
//          })
        },
        getTotal(){
          let c = document.getElementsByClassName("total_canvas");
          //下面的灰色圆环
          let greyColor = "#d6d2cf";
          let colors = ["#da2424","#ffaf02","#5ba513"];
          this.$http.post("/AlarmActive/levelcount").then((res)=>{
            var data = res.data.data;
            let per={};
            let tempPer=0;
            let count=0;
            let arr=[];
            for(let j=0;j<data.length;j++){
              let obj={};
              switch (data[j].AlarmLevelID){
                case 1: //紧急
                  per[data[j].AlarmLevelName]=data[j].percent;
                  obj.AlarmLevelName=data[j].AlarmLevelName;
                  obj.count=data[j].count;
                  arr.push(obj);
                  break;
                case 2://严重
                  per[data[j].AlarmLevelName]=data[j].percent;
                  obj.AlarmLevelName=data[j].AlarmLevelName;
                  obj.count=data[j].count;
                  arr.push(obj);
                  break;
                default:
                  tempPer += Number(data[j].percent.substr(0,data[j].percent.length-1));
                  count+= Number(data[j].count);
                  break;
              }
            }
            arr.push({AlarmLevelName:"其他","count":count});
            per['其他']=`${tempPer}%`;
            this.total = arr;
            this.$nextTick(()=>{
              for(let key in per){
                switch (key){
                  case "紧急":this.progressbar(c[0],per[key],colors[0]);
                    break;
                  case "严重": this.progressbar(c[1],per[key],colors[1]);
                    break;
                  case "其他": this.progressbar(c[2],per[key],colors[2]);
                    break;
                }

              }
            });

          })
        },

        getType(){
          let c = document.getElementsByClassName("type_canvas");
          let $greyColor = "#d6d2cf";
          this.$http.post("/AlarmActive/typecount").then((res)=>{
            let data = res.data.data;
            this.type = data;
            this.$nextTick(()=>{
              for(let i=0;i<data.length;i++){
                this.progressbar(c[i],data[i].percent,"#45a1f6")
              }
            });

          })
        },
        progressbar(c,per,color){
          let end = Number(per.substr(0,per.length-1));
          let ctx = c.getContext("2d");
          let w = c.width;
          let r = w/2;
          let lineWidth = 8*this;
          let cR = (w-2*lineWidth)/2;
          ctx.lineWidth = lineWidth;
          //绘制第一层圆环
          ctx.beginPath();
          ctx.strokeStyle = "#d6d2cf";
          ctx.arc(r,r,cR,0,2*Math.PI);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
          ctx.save();
          //绘制百分比的圆环
          let m = Math.abs(Math.sin(2*Math.PI/3)*r);//m作为起始点写死
          let n = Math.abs(Math.cos(2*Math.PI/3)*r)+r;
          let m1 = Math.abs(Math.sin(2*Math.PI*end)*r);
          let n1 = Math.abs(Math.cos(2*Math.PI*end)*r);
          ctx.strokeStyle = color;
          ctx.beginPath();
          ctx.lineCap="round";
          if(end){
            ctx.arc(r,r,cR, 0+2*Math.PI/3,-2*Math.PI*end*0.01+2*Math.PI/3,true);
          }
          //绘制圆环内文字
          ctx.font = "22px Arial";
          ctx.textAlign="center";
          ctx.textBaseline="middle";
          ctx.fillStyle = "#454545";
          ctx.fillText(per,r,r);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
          ctx.save();
        },
        getPhoneWidth(){
        //获取手机屏幕的宽度
         let obj = {};
         let phoneWidth = document.body.clientWidth;
         //修改canvas的宽高
//         obj.canvasW = Math.ceil(0.37*phoneWidth);
//         obj.canvasH = Math.ceil(0.37*phoneWidth);
//         obj.totalCanvasW = Math.floor(phoneWidth/3)*0.78;
//         obj.totalCanvasH = Math.floor(phoneWidth/3)*0.78;
//         obj.typeCanvasW = Math.floor(phoneWidth/3)*0.78;
//         obj.typeCanvasH = Math.floor(phoneWidth/3)*0.78;
          return  obj;
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
    width:51%;
    height: 100%;
    color: #fff;
    font-size:0.45rem;
  }
  .monitor>header>canvas{
    width:49%;
    height: 100%;
  }
  .monitor>main{
    height:71.3%;
    overflow: scroll;
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
    border-bottom: 1px solid #dadada;
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
    border-bottom:1px solid #dadada;
  }
  .monitor>main ul li{
    flex-grow:1;
    border-right:1px solid #dadada;
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
    margin-bottom: 3%;
  }
  .monitor>main .type{
    /*min-height: calc(100% - 5.1rem);*/
    background: #fff;
    border-top: 1px solid #dadada;
  }
  .monitor>main .type ul li{
    height: 4rem;
    float: left;
    width: 33.3333%;
    background: #ffffff;
    /*border-top: 1px solid #dadada;*/
    border-right:1px solid #dadada;
    border-bottom:1px solid #dadada;
    box-sizing: border-box;
  }
  /*如果这个li超过第三个则不用加border-top*/
  /*.monitor>main .type ul li:nth-child(n+4){*/
    /*border-top: 0px solid #dadada;*/
  /*}*/
  .monitor>main .type ul li:nth-child(3n){
    border-right:1px solid rgba(0,0,0,0);
  }
</style>

