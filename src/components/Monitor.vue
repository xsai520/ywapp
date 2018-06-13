<template>
    <div class="monitor">
      <header>
        <div>
          <p>平台告警总数</p>
          <canvas id="warning" :width="canvasW" :height="canvasH"></canvas>
        </div>
      </header>
    </div>
</template>
<script>
  export default{
      data(){
          let obj = this.getPhoneWidth();
          return {
            canvasW:obj.canvasW,
            canvasH:obj.canvasH
          }
      },
    mounted(){
      this.getCircle()
    },
    methods:{
        getCircle(){
          let c=document.getElementById("warning");
          let ctx=c.getContext("2d");
          let w = c.width;
          let r = w/2;
          let lineWidth = 5;
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
       getPhoneWidth(){
        //获取手机屏幕的宽度
         let obj = {};
         let phoneWidth = document.body.clientWidth;
         //修改canvas的宽高
         obj.canvasW = Math.ceil(0.38*phoneWidth);
         obj.canvasH = Math.ceil(0.38*phoneWidth);
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
    width:48%;
    height: 100%;
    color: #fff;
    font-size:0.45rem;
  }
  .monitor>header>canvas{
    width:52%;
    height: 100%;
  }
</style>

