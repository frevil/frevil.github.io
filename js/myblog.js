function init_content_wrap(){
	content_wrap_width=document.getElementById("nav_left_wraper").offsetWidth;
	document.getElementsByClassName("content_wrap")[0].style.marginLeft=(content_wrap_width+60)+"px";
	document.getElementById("footer").style.marginLeft=(content_wrap_width+60)+"px";
	preventScroll("nav_left");
}
function preventScroll(id){  
    var _this = document.getElementById(id);  
    if(navigator.userAgent.indexOf("Firefox")>0){  
        _this.addEventListener('DOMMouseScroll',function(e){  
            _this.scrollTop += e.detail > 0 ? 60 : -60;     
            e.preventDefault();  
        },false);   
    }else{  
        _this.onmousewheel = function(e){     
            e = e || window.event;     
            _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;     
            return false;  
        };  
    }  
    return this;  
}  
