var xx=500,yy=250,
	x,y,
	flag=0,
	functiontype=1,
	angle_level=0.78,angle_vertical=1.0,
	mousept_down,mousept_now,mouseflag,mousemove=false;
$(document).ready(function(){
	 demo=$("canvas")[0];
	 canvas=$("#canvas");
	 // canvas.bind({
	 // 	mousemove:showmousept,
	 // 	mousedown:getmousept,
	 // 	mouseup:putmousept
	 // })
	 canvas.bind("mousemove",showmousept);
		 canvas.bind("mousedown",getmousept);
		 canvas.bind("mouseup",putmousept);
	 // canvas.bind("touchmove",showmousept);
	 // 	 canvas.bind("touchstart",getmousept);
	 // 	 canvas.bind("touchend",putmousept);
	 ctx=demo.getContext("2d");
	 show();
	 // ctx.globalCompositeOperation="xor";
});
// function mouseget(){
	// function showmousept(e){
	// 		 	E=e||event;
	// 		 	E.preventDefault();
	// 		 	var touch = E.targetTouches[0];
	// 		 	var pointx=touch.offsetX;
	// 		 	var pointy=touch.offsetY;
	// 		 	$(".label")[0].value=pointx+','+pointy;
	// 		 	mouseflag?change(pointx-mousept_down.mouseX,pointy-mousept_down.mouseY):0;
	// 		 }
	// 	function getmousept(e){
	// 		 	E=e||event;
	// 		 	E.preventDefault();
	// 		 	var touch = E.targetTouches[0];
	// 		 	var pointx=touch.offsetX;
	// 		 	var pointy=touch.offsetY;
	// 		 	mousept_down={mouseX:pointx,mouseY:pointy};
	// 		 	mouseflag=1;
	// 		 }	
	// 	function putmousept(e){
	// 			E.preventDefault();
	// 		 	mouseflag=0;
	// 		 }
function showmousept(e){
	 	E=e||event;
	 	E.preventDefault();
	 	var pointx=E.offsetX;
	 	var pointy=E.offsetY;
	 	$(".label")[0].value=pointx+','+pointy;
	 	mouseflag?change(pointx-mousept_down.mouseX,pointy-mousept_down.mouseY):0;
	 }
function getmousept(e){
	 	E=e||event;
	 	E.preventDefault();
	 	var pointx=E.offsetX;
	 	var pointy=E.offsetY;
	 	mousept_down={mouseX:pointx,mouseY:pointy};
	 	mouseflag=1;
	 }	
function putmousept(e){
		E.preventDefault();
	 	mouseflag=0;
	 }
function change(direction_x,direction_y){
		angle_level-=0.001*direction_x;
		angle_vertical+=0.001*direction_y;
		$("canvas")[0].width=1000;
		show();
	}
function outputpoint(px,py,pz){
	  // if(px==-40||px==40||py==20||py==-20||pz==20||pz==-20)flag++;
	  var x=parseInt(xx-px*Math.sin(angle_level)+py*Math.cos(angle_level));
	  var y=parseInt(yy+(px*Math.cos(angle_level)+py*Math.sin(angle_level))*Math.sin(angle_vertical)-pz*Math.sin((Math.atan(x/parseFloat(pz))+angle_vertical)));
	  // ctx.beginPath();
	  ctx.moveTo(x,y);
	  ctx.lineTo(x+1,y);
	  // ctx.strokeStyle="#f"+px+"22dd";
	  // ctx.stroke();
	  // ctx.closePath();
}
function show(){
	ctx.beginPath();
	for(var i=-80;i<=80;i++)
	  for(var j=-80;j<=80;j++)
  		// outputpoint(i,j,100*Math.sin(Math.sqrt((i/40.0)*(i/40.0)+(j/40.0)*(j/40.0)))); 
  	outputpoint(i,j,(i+j)/((i-j)/1.0));
	ctx.strokeStyle="#f53344";
	ctx.stroke();
  	ctx.closePath();
}