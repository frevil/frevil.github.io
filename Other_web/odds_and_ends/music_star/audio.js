var canvas  = document.getElementsByTagName('canvas')[0];
	canvas.width = window.screen.availWidth;
	canvas.height = window.screen.availHeight;
var width = canvas.width;
var height  = canvas.height;
var ctx = canvas.getContext('2d');
ctx.translate(width/2,height/2);
ctx.fillStyle = '#000';
var line_max_width = 4;
var line_scale = 1;
var line_scale_default = 1;
var line_number = 256;
// var radius = 200;
var radius_min = 80;
var wave_no = 10;
var is_rotate = false;
var is_soft = true;
var init = function () {
	// 兼容
	window.AudioContext = window.AudioContext||window.webkitContext||window.mswebkitContext||window.mozContext;
	// 创建容器
	AC  = new AudioContext();
	analyser = AC.createAnalyser();
	gainnode = AC.createGain();
	// 获取文件元素
	var file = document.getElementsByClassName('file')[0];
	file.onchange = function () {
		if (file.files.length != 0) {
			to_buffer(file.files[0]);
		}
	}
}

var to_buffer = function (file) {
	// 创建reader
	var file_reader = new FileReader();
	file_reader.onload = function (e) {
		var result =  e.target.result;
		AC.decodeAudioData(result,
			function (buffer) {
				play_music(buffer);
			},
			function () {
				console.log('解析失败');
			});

	}	
	file_reader.readAsArrayBuffer(file);
}
var play_music = function (buffer) {
	source = AC.createBufferSource();
	source.buffer = buffer;
	source.start();
	// source.connect(buffer);
	//连接analyserNode
	source.connect(analyser);

	//再连接到gainNode
	analyser.connect(gainnode);

	//最终输出到音频播放器
	gainnode.connect(AC.destination);

	

	draw_audio();

	function draw_audio() {
		array  = is_rotate?new Uint8Array(1023):new Uint8Array(1024);
		analyser.getByteFrequencyData(array);
		ctx.clearRect(-width,-height,2*width,2*height);
		ctx.beginPath();
		ctx.arc(0,0,100,0,2*Math.PI);
		ctx.stroke();
		// canvas.height=canvas.height;
		for (var i = 0; i < array.length; i++) {
			let radius = radius_min+array[i];
			let line_width = array[i]/128*line_max_width;
			line_scale = is_soft?(array[i]+1)/128:line_scale_default;
			// line_scale =(array[i]+1)/128;
			ctx.rotate(Math.PI/line_number*i);
			ctx.fillStyle = 'rgba(150,'+(255-array[i]*2)+','+array[i]*2+',1)';
			// ctx.fillStyle = 'rgba(150,'+(255-array[i]*2)+','+array[i]*2+','+((128-array[i])/(radius_min+128)+0.5)+')';
			ctx.fillRect(-line_width,-(radius+array[i]/line_scale),line_width*2,3);
			// ctx.fillRect(-line_width,-(radius+array[i]/line_scale),line_width*2,1.3*array[i]/line_scale);

		}
		// console.log(test);

		requestAnimationFrame(draw_audio);
	}
}



// ctx.save();
// ctx.translate(500,250);
document.onkeydown = function (event) {
	e = event||window.event;
	console.log(e.keyCode);
	switch(e.keyCode){
		case 39:line_number = line_number*2;console.log(line_number);break;//left
		case 37:line_number = ~~(line_number/2);console.log(line_number);break;//right
		case 38:line_max_width += 1;console.log(line_max_width);break;//up
		case 40:line_max_width -= 1;console.log(line_max_width);break;//down
		case 96:is_rotate = !is_rotate;console.log(is_rotate);break;//0
		case 83:is_soft = !is_soft;console.log(is_soft);break;//s
	}
	// ctx.clearRect(-width,-height,2*width,2*height);
	// ctx.rotate(Math.PI/6);
	// ctx.fillRect(-3,-100,6,80);
}
	// ctx.restore();