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
              <canvas class="total_canvas" :width="totalCanvasW" :height="totalCanvasH" :per="item.value"></canvas>
              <div>{{item.name}}：{{item.num}}</div>
            </li>
          </ul>
        </div>
        <div class="type">
          <div class="title"><i class="icon iconfont">&#xe62f;</i>告警分类</div>
          <ul>
            <li v-for="(item,index) in type" :key="index">
              <canvas class="type_canvas" :width="typeCanvasW" :height="typeCanvasW" :per="item.value"></canvas>
              <div>{{item.name}}：{{item.num}}</div>
            </li>
          </ul>
        </div>

      </main>
    </div>
</template>
<script>
  export default{
      data(){
          let obj = this.getPhoneWidth();
          return {
            canvasW:obj.canvasW,
            canvasH:obj.canvasH,
            totalCanvasW:obj.totalCanvasW,
            totalCanvasH:obj.totalCanvasH,
            typeCanvasW:obj.typeCanvasW,
            typeCanvasH:obj.typeCanvasH,
            total:[{name:"紧急",value:0.6,num:123},{name:"严重",value:0.2,num:123},{name:"一般",value:0.2,num:123}],  //紧急 严重 一般,
            type:[{name:"新能告警1",value:0.5,num:123},{name:"新能告警2",value:0.5,num:123},{name:"新能告警3",value:0.5,num:123},
              {name:"新能告警4",value:0.5,num:123},{name:"新能告警1",value:0.5,num:123},{name:"新能告警1",value:0.5,num:123},
              {name:"新能告警1",value:0.5,num:123},{name:"新能告警1",value:0.5,num:123},{name:"新能告警1",value:0.5,num:123},
              {name:"新能告警1",value:0.5,num:123},{name:"新能告警1",value:0.5,num:123},{name:"新能告警1",value:0.5,num:123},
              {name:"新能告警1",value:0.5,num:123},{name:"新能告警1",value:0.5,num:123},{name:"新能告警1",value:0.5,num:123}],
          }
      },
    mounted(){
      this.getCircle(); //requestAnimationFrame()产生动画效果的函数，待做
      this.getTotal();
      this.getType();
    },
    methods:{
        getCircle(){
          let c=document.getElementById("warning");
          let ctx = c.getContext("2d");
          let w = c.width;
          let r = w/2;
          let lineWidth = 4;
          //周围光环的长度大概是lineWidth的2倍
          let lightLength = 1.8*lineWidth;
          //发散光环与圆环大概的距离是1.5的lineWidth 需要设置内gap 和外gap
          let outGap=lineWidth;
          let inGap =1.5*lineWidth;
          let gap = outGap+inGap;
          let cR = (w-2*lineWidth)/2 - lightLength - gap;//圆环的半径要减去发散环和gap
          ctx.lineWidth = lineWidth;
          //绘制透明层的圆环
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255,255,255,0.5)";
          ctx.arc(r,r,cR,0,2*Math.PI);
          //绘制圆环内的文本 start
          ctx.font="25px Arial";
          ctx.textAlign="center";
          ctx.fillStyle = "#fff";
          ctx.fillText("666",r,r);
          ctx.textAlign="center";
          ctx.font="16px Arial";
          ctx.fillStyle = "#fff";
          ctx.fillText("个数",r,r+2*r/5);
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
          g.addColorStop(1, 'rgba(60,233,180)'); //添加颜色点 60,233,180
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
//            if(i< 6){
//              ctx.strokeStyle="rgba(60,233,180)";
//            }else if(i>6 && i<10){
//              ctx.strokeStyle="#e3faee";
//            }else if(i>10 && i<13){
//              ctx.strokeStyle="#d0e183";
//            }else{
//              ctx.strokeStyle="#ead217";
//            }
            ctx.strokeStyle="rgba(60,233,180)";
            ctx.lineCap="round";
            ctx.moveTo($x0,$y0);
            ctx.lineTo($x1,$y1);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            ctx.save();
          }
        },
        getTotal(){
          let c = document.getElementsByClassName("total_canvas");
          //下面的灰色圆环
          let greyColor = "#d6d2cf";
          let colors = ["#da2424","#ffaf02","#5ba513"];
          for(let i=0;i<c.length;i++){
            let per = `${Number(c[i].getAttribute("per"))*100}%`;
            this.progressbar(c[i],per,colors[i])
          }
        },
        getType(){
          let c = document.getElementsByClassName("type_canvas");
          let $greyColor = "#d6d2cf";
          for(let i=0;i<c.length;i++){
            let $per = `${Number(c[i].getAttribute("per"))*100}%`;
            this.progressbar(c[i],$per,"#45a1f6")
          }
        },
        progressbar(c,per,color){
          let ctx = c.getContext("2d");
          let w = c.width;
          let r = w/2;
          let lineWidth = 8;
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
          let m = Math.abs(Math.sin(2*Math.PI/3)*r);
          let n = Math.abs(Math.cos(2*Math.PI/3)*r)+r; //m n作为起始点写死
          let m1 = Math.abs(Math.sin(3*Math.PI/2)*r);
          let n1 = Math.abs(Math.cos(3*Math.PI/2)*r);
          ctx.strokeStyle = color;
          ctx.beginPath();
          ctx.lineCap="round";
          ctx.arc(r,r,cR,2*Math.PI/3,3*Math.PI/2,true);
          //绘制圆环内文字
          ctx.font = "23px Arial";
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
         obj.canvasW = Math.ceil(0.35*phoneWidth);
         obj.canvasH = Math.ceil(0.35*phoneWidth);
         obj.totalCanvasW = Math.floor(phoneWidth/3)*0.8;
         obj.totalCanvasH = Math.floor(phoneWidth/3)*0.8;
         obj.typeCanvasW = Math.floor(phoneWidth/3)*0.8;
         obj.typeCanvasH = Math.floor(phoneWidth/3)*0.8;
          return  obj;
      }
    }
  }
</script>
<style>
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
    border-top:1px solid #dadada;
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
    font-size: 0.4rem;
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
    min-height: calc(100% - 5.1rem);
    background: #fff;
    border-top: 1px solid #dadada;
  }
  .monitor>main .type ul li{
    height: 4rem;
    float: left;
    width: 33.3333%;
    background: #ffffff;
    border-top: 1px solid #dadada;
    border-right:1px solid #dadada;
    box-sizing: border-box;
  }
  .monitor>main .type ul li:nth-child(3n){
    border-right:1px solid rgba(0,0,0,0);
  }
</style>

